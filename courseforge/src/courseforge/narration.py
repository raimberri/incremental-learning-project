from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .config import SCENE_TYPES
from .paths import Course
from .utils import read_json, write_json


@dataclass
class Narration:
    voice: str
    rate: str
    scenes: list[dict[str, Any]]

    @property
    def line_count(self) -> int:
        return sum(len(s["lines"]) for s in self.scenes)


def load_narration(course: Course) -> Narration:
    data = read_json(course.narration_path)
    scenes = data.get("scenes") or []
    if not scenes:
        raise SystemExit("narration.json 没有 scenes")
    ids = [s.get("id") for s in scenes]
    if len(ids) != len(set(ids)):
        raise SystemExit("narration.json 的 scene id 重复")
    for s in scenes:
        for key in ("id", "code", "zh", "en", "lines"):
            if key not in s:
                raise SystemExit(f"场景 {s.get('id')} 缺少字段 {key}")
        for line in s["lines"]:
            if not isinstance(line, list) or len(line) != 2:
                raise SystemExit(f"场景 {s['id']} 的行必须是 [中文, English]")
    return Narration(voice=data.get("voice", "zh-CN-XiaoxiaoNeural"), rate=data.get("rate", "+0%"), scenes=scenes)


def load_storyboard(course: Course) -> dict[str, Any]:
    return read_json(course.storyboard_path)


def sync_storyboard(course: Course) -> None:
    board = load_storyboard(course)
    narration = load_narration(course)
    n_ids = [s["id"] for s in narration.scenes]
    b_ids = [s["id"] for s in board.get("scenes", [])]
    missing = [x for x in n_ids if x not in b_ids]
    extra = [x for x in b_ids if x not in n_ids]
    if missing or extra:
        raise SystemExit(f"storyboard 与 narration 的 scene id 不一致；缺少 {missing}，多余 {extra}")
    write_json(course.board_data_path, board)


def validate_board(course: Course, narration: Narration | None = None) -> list[str]:
    board = load_storyboard(course)
    errors: list[str] = []
    scenes = board.get("scenes") or []
    by_id = {s["id"]: s for s in scenes}
    narration = narration or load_narration(course)
    for s in narration.scenes:
        b = by_id.get(s["id"])
        if not b:
            errors.append(f"storyboard 缺少场景 {s['id']}")
            continue
        t = b.get("type")
        if t not in SCENE_TYPES:
            errors.append(f"场景 {s['id']} 的 type={t!r} 不在 {sorted(SCENE_TYPES)}")
        if t in {"bullets", "steps"} and not b.get("items") and not b.get("steps"):
            errors.append(f"场景 {s['id']} 的 {t} 缺少 items/steps")
        if t == "formula" and not b.get("formula"):
            errors.append(f"场景 {s['id']} 的 formula 为空")
        if t == "curve" and not b.get("chart"):
            errors.append(f"场景 {s['id']} 的 curve 缺少 chart")
        if t == "photo" and not b.get("image"):
            errors.append(f"场景 {s['id']} 的 photo 缺少 image")
        if t == "timeline" and not b.get("events"):
            errors.append(f"场景 {s['id']} 的 timeline 缺少 events")
        if t == "custom":
            comp = b.get("component")
            if not comp:
                errors.append(f"场景 {s['id']} 的 custom 缺少 component")
            elif not (course.remotion / "src" / "scenes" / f"{comp}.tsx").exists():
                errors.append(f"场景 {s['id']} 的组件不存在：src/scenes/{comp}.tsx")
            for img in b.get("images") or []:
                if not (course.remotion / "public" / img).exists():
                    errors.append(f"场景 {s['id']} 的图片不存在：public/{img}")
    return errors


def stub_storyboard(course: Course) -> None:
    """Create a storyboard skeleton from narration scenes."""
    narration = load_narration(course)
    types = ["cover", "bullets", "formula", "steps", "outro"]
    scenes = []
    for i, s in enumerate(narration.scenes):
        scenes.append(
            {
                "id": s["id"],
                "type": types[i] if i < len(types) else "bullets",
                "accent": ["orange", "blue", "teal", "purple", "green"][i % 5],
                "kicker": s["en"],
                "title": s["zh"],
                "items": [
                    {"icon": "①", "title": "待填", "sub": "待填", "color": "orange"},
                    {"icon": "②", "title": "待填", "sub": "待填", "color": "blue"},
                    {"icon": "③", "title": "待填", "sub": "待填", "color": "green"},
                ],
            }
        )
    write_json(course.storyboard_path, {"version": 1, "theme": "warm-paper", "courseTitle": course.root.name, "scenes": scenes})
