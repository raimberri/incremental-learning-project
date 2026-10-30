from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

from .paths import Course, repo_root
from .utils import read_json, write_json


def library_root() -> Path:
    return repo_root() / "asset-library"


def load_catalog(root: Path | None = None) -> dict:
    root = root or library_root()
    path = root / "manifests" / "images.json"
    if not path.exists():
        raise SystemExit(f"素材库索引不存在：{path}")
    return read_json(path)


def search(query: str, tag: str | None = None, limit: int = 20) -> list[dict]:
    data = load_catalog()
    q = query.lower().strip()
    out = []
    for img in data["images"]:
        hay = " ".join([img["id"], img["description"], " ".join(img.get("tags", []))]).lower()
        if q and q not in hay:
            continue
        if tag and tag.lower() not in [t.lower() for t in img.get("tags", [])]:
            continue
        out.append(img)
    return out[:limit]


def add_to_course(course: Course, ids: list[str], target_dir: str = "img") -> list[dict]:
    data = load_catalog()
    by_id = {x["id"]: x for x in data["images"]}
    picked = []
    for i in ids:
        if i not in by_id:
            raise SystemExit(f"素材库里没有 id={i}")
        picked.append(by_id[i])
    dst = course.remotion / "public" / target_dir
    dst.mkdir(parents=True, exist_ok=True)
    for img in picked:
        src = library_root() / img["file"]
        shutil.copy2(src, dst / Path(img["file"]).name)
    credits = course.video / "asset-credits.md"
    rows = ["# 素材清单", "", "| id | 文件 | 说明 | 来源 | 许可 |", "|---|---|---|---|---|"]
    for img in picked:
        rows.append(f"| {img['id']} | {target_dir}/{Path(img['file']).name} | {img['description']} | {img['source']} | image_generate 原创 |")
    credits.write_text("\n".join(rows) + "\n", encoding="utf-8")
    return picked


def rebuild_manifest() -> int:
    """Refresh sizes and hashes while preserving tags/descriptions."""
    try:
        from PIL import Image
    except ImportError as exc:
        raise SystemExit("rebuild 需要 Pillow") from exc
    root = library_root()
    old = load_catalog(root)
    by_id = {x["id"]: x for x in old["images"]}
    rows = []
    for f in sorted((root / "images").glob("*.jpg")):
        key = f.stem
        meta = by_id.get(key, {
            "id": key,
            "tags": [],
            "description": key.replace("-", " "),
            "prompt": "",
            "source": "unknown",
            "license": "Generated with image_generate; no third-party rights.",
        })
        with Image.open(f) as im:
            w, h = im.size
        meta = dict(meta)
        meta.update({
            "file": f"images/{f.name}",
            "width": w,
            "height": h,
            "sha256": hashlib.sha256(f.read_bytes()).hexdigest(),
        })
        rows.append(meta)
    old["images"] = rows
    write_json(root / "manifests" / "images.json", old)
    return len(rows)


def theme_names() -> list[str]:
    return sorted(p.stem for p in (library_root() / "themes").glob("*.json"))


def prompt_sheet(subjects: list[str], style: str = "warm-paper") -> str:
    themes = {
        "warm-paper": "Warm editorial photograph, soft natural light, cream and oatmeal palette, muted colors, shallow depth of field, 35mm film look, calm minimal composition.",
        "cool-lab": "Clean editorial photograph, cool daylight, pale grey and blue palette, precise composition, shallow depth of field.",
    }
    base = themes.get(style, themes["warm-paper"])
    lines = ["# 图片生成计划", "", f"风格：`{style}`", "", "统一尾缀：No text, no watermark, no logos.", ""]
    lines += ["| # | 用途 | prompt | 建议名称 |", "|---|---|---|---|"]
    for i, s in enumerate(subjects, 1):
        lines.append(f"| {i} | {s} | {base} {s}. No text, no watermark, no logos. | {s[:18].replace(' ', '-')} |")
    return "\n".join(lines) + "\n"


def copy_theme(course: Course, name: str) -> Path:
    src = library_root() / "themes" / f"{name}.json"
    if not src.exists():
        raise SystemExit(f"没有主题 {name}；可用：{', '.join(theme_names())}")
    dst = course.video / "theme.json"
    shutil.copy2(src, dst)
    return dst
