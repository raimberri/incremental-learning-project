from __future__ import annotations

import os
import shutil
import subprocess
from pathlib import Path

from .narration import sync_storyboard
from .paths import Course
from .utils import read_json


def course_config(course: Course) -> dict:
    path = course.root / "course.json"
    if path.exists():
        return read_json(path)
    return {}


def _env(course: Course) -> dict[str, str]:
    env = os.environ.copy()
    # This machine's global npm cache can be root-owned; keep installs local.
    env.setdefault("npm_config_cache", str(course.remotion / ".npm-cache"))
    return env


def ensure_project(course: Course, install: bool = True) -> None:
    if not (course.remotion / "package.json").exists():
        raise SystemExit("视频工程不存在。先运行：courseforge video <course>")
    if not (course.remotion / "node_modules").exists():
        if not install:
            raise SystemExit("node_modules 不存在；运行 npm install 或加 --install")
        subprocess.run(["npm", "install"], cwd=course.remotion, check=True, env=_env(course))
    sync_storyboard(course)
    if not course.timeline_path.exists():
        raise SystemExit("timeline.json 不存在。先运行：courseforge voice <course>")


def _npx(course: Course, args: list[str]) -> None:
    subprocess.run(["npx", "remotion", *args], cwd=course.remotion, check=True, env=_env(course))


def render(course: Course, crf: int = 20, concurrency: int = 8, preset: str = "fast", out: str | None = None) -> Path:
    ensure_project(course)
    cfg = course_config(course).get("video", {})
    comp = cfg.get("composition", "CourseVideo")
    name = out or f"{course.slug}.mp4"
    target = (course.out / name).resolve()
    target.parent.mkdir(parents=True, exist_ok=True)
    _npx(course, ["render", comp, str(target), f"--crf={crf}", f"--concurrency={concurrency}", f"--x264-preset={preset}"])
    return target


def still(course: Course, frame: int, out: str = "preview.jpg", composition: str | None = None) -> Path:
    ensure_project(course, install=False)
    comp = composition or course_config(course).get("video", {}).get("composition", "CourseVideo")
    target = (course.out / out).resolve()
    target.parent.mkdir(parents=True, exist_ok=True)
    _npx(course, ["still", comp, str(target), f"--frame={frame}"])
    return target


def thumbnail(course: Course, out: str = "poster.jpg") -> Path:
    ensure_project(course, install=False)
    comp = course_config(course).get("video", {}).get("thumbnail", "CourseThumbnail")
    target = (course.out / out).resolve()
    _npx(course, ["still", comp, str(target)])
    return target


def package(course: Course) -> Path:
    publish = course.out / "publish"
    publish.mkdir(parents=True, exist_ok=True)
    video = course.out / f"{course.slug}.mp4"
    if not video.exists():
        raise SystemExit(f"没有成片：{video}")
    shutil.copy2(video, publish / video.name)
    for name in ("poster.jpg",):
        p = course.out / name
        if p.exists():
            shutil.copy2(p, publish / name)
    for p in course.subs.glob(f"{course.slug}.*.srt"):
        shutil.copy2(p, publish / p.name)
    readme = publish / "README.md"
    cfg = course_config(course)
    readme.write_text(
        f"# {cfg.get('title', course.slug)} · 视频版\n\n"
        f"- 成片：`{video.name}`\n- 封面：`poster.jpg`\n- 字幕：`{course.slug}.zh.srt` / `{course.slug}.en.srt` / `{course.slug}.bilingual.srt`\n",
        encoding="utf-8",
    )
    return publish
