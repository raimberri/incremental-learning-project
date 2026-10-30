from __future__ import annotations

import os
import shutil
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path

from .config import MAX_EN_LINE, MAX_VIDEO_SECONDS, MAX_ZH_LINE, MIN_VIDEO_SECONDS, SCENE_TYPES
from .narration import load_narration, validate_board
from .paths import Course, repo_root
from .utils import which


@dataclass
class Report:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)

    def add_error(self, msg: str) -> None:
        self.errors.append(msg)

    def add_warn(self, msg: str) -> None:
        self.warnings.append(msg)

    def ok(self) -> bool:
        return not self.errors

    def print(self) -> None:
        for n in self.notes:
            print(f"· {n}")
        for w in self.warnings:
            print(f"! {w}")
        for e in self.errors:
            print(f"✗ {e}")
        if self.ok():
            print("✓ 检查通过")


def check_course(course: Course) -> Report:
    r = Report()
    if not course.root.exists():
        r.add_error(f"课程目录不存在：{course.root}")
        return r
    if not course.narration_path.exists():
        r.add_error(f"缺少旁白：{course.narration_path}")
        return r
    try:
        n = load_narration(course)
    except SystemExit as exc:
        r.add_error(str(exc))
        return r
    r.notes.append(f"旁白：{len(n.scenes)} 个场景 / {n.line_count} 句")

    if not course.storyboard_path.exists():
        r.add_error(f"缺少分镜：{course.storyboard_path}")
    else:
        r.errors.extend(validate_board(course, n))

    if course.timeline_path.exists():
        import json

        tl = json.loads(course.timeline_path.read_text(encoding="utf-8"))
        total = float(tl.get("total", 0))
        r.notes.append(f"时间轴：{total/60:.2f} 分钟")
        if total < MIN_VIDEO_SECONDS:
            r.add_warn(f"视频只有 {total:.0f}s，通常短于 {MIN_VIDEO_SECONDS}s")
        if total > MAX_VIDEO_SECONDS:
            r.add_error(f"视频超过 {MAX_VIDEO_SECONDS}s，建议拆章")
        for s in tl.get("scenes", []):
            for line in s.get("lines", []):
                if len(line["zh"]) > MAX_ZH_LINE:
                    r.add_warn(f"{s['id']} 中文行过长（{len(line['zh'])}）：{line['zh'][:30]}…")
                if len(line["en"]) > MAX_EN_LINE:
                    r.add_warn(f"{s['id']} 英文行过长（{len(line['en'])}）")
    else:
        r.add_warn("尚无 timeline.json；先运行 courseforge voice")

    for p in [course.subs / f"{course.slug}.zh.srt", course.remotion / "public" / "voice.wav", course.remotion / "public" / "music.wav"]:
        if not p.exists():
            r.add_warn(f"尚未生成：{p}")

    if course.storyboard_path.exists():
        import json

        board = json.loads(course.storyboard_path.read_text(encoding="utf-8"))
        for s in board.get("scenes", []):
            if s.get("type") in {"photo", "cover", "outro"}:
                img = s.get("image", "")
                if img and not (course.remotion / "public" / img).exists():
                    r.add_error(f"图片不存在：public/{img}（场景 {s.get('id')}）")
        unknown = {s.get("type") for s in board.get("scenes", [])} - SCENE_TYPES
        if unknown:
            r.add_error(f"未知场景类型：{sorted(unknown)}")
    return r


def _browser() -> str | None:
    """Resolve the browser Remotion will use, honoring REMOTION_BROWSER."""
    override = os.environ.get("REMOTION_BROWSER")
    if override:
        path = Path(override).expanduser()
        return str(path) if path.is_file() else None
    for name in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser"):
        found = which(name)
        if found:
            return found
    mac = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    return str(mac) if mac.exists() else None


def doctor() -> int:
    print("courseforge doctor")
    checks = [
        ("ffmpeg", which("ffmpeg")),
        ("node", which("node")),
        ("npm", which("npm")),
        ("npx", which("npx")),
        ("chrome", _browser()),
    ]
    for name, path in checks:
        print(f"  {'✓' if path else '✗'} {name:<8} {path or '未找到'}")
    try:
        import edge_tts  # noqa: F401
        import numpy  # noqa: F401

        print("  ✓ python   edge-tts + numpy")
    except ImportError as exc:
        print(f"  ✗ python   {exc}")
    template = repo_root() / "courseforge" / "templates" / "remotion"
    print(f"  {'✓' if template.exists() else '✗'} template {template}")
    ok = all(path for _, path in checks) and template.exists()
    return 0 if ok else 1
