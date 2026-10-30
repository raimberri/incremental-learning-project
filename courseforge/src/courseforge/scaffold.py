from __future__ import annotations

import json
import re
import shutil
from datetime import date
from pathlib import Path

from .paths import Course, repo_root
from .utils import slugify, write_json

TEMPLATES = repo_root() / "courseforge" / "templates"

DEFAULT_VARS = {
    "AUDIENCE": "完全没有接触过这个主题、但愿意每天花 30 分钟的人",
    "PRIOR": "只需要会算简单概率、看得懂初中数学符号",
    "OUTCOME": "能用自己的话解释核心机制，并判断一条新闻说得对不对",
    "MUST": "核心概念、关键机制、一个完整例子、一个常见误解",
    "SKIP": "不展开实现细节与工程调参",
    "LENGTH": "6 章，每章 30–45 分钟；视频每章 6–10 分钟",
    "LANG": "中文正文 + 中英双语字幕",
    "ONE_LINE": "用一句话说清这个主题在解决什么问题。",
    "ONE_LINE_EN": "Explain the problem this topic solves in one sentence.",
    "WHY": "回答「为什么值得学」和「学完能做什么」。",
    "CH1_TITLE": "第一章标题",
    "CH1_GOAL": "这一章的核心能力",
    "STEEP": "第 2 章与第 4 章",
    "CH1_NEW": "本章第一次出现的概念",
    "CH1_PRIOR": "导读",
    "CH1_SOURCES": "待填",
    "CH1_HOOK": "用一个具体问题开场，不要先讲定义。",
    "TERM": "核心概念",
    "TERM_DEF": "一句话定义，限定它不是什么。",
    "CH1_BODY": "按「输入 → 机制 → 输出」讲清因果链。",
    "CH1_EXAMPLE": "一个可以手算或手推的小例子。",
    "NEXT": "下一章会回答的问题。",
    "HIGHLIGHT": "核心词",
    "KEY1": "关键词一",
    "KEY1_SUB": "一句话解释",
    "KEY1_EN": "Key word one",
    "KEY2": "关键词二",
    "KEY2_SUB": "一句话解释",
    "KEY2_EN": "Key word two",
    "KEY3": "关键词三",
    "KEY3_SUB": "一句话解释",
    "KEY3_EN": "Key word three",
    "FORMULA": "y = f(x)",
    "FORMULA_NOTE": "先解释每个符号，再代一个数。",
}

PLACEHOLDER = re.compile(r"\{\{([A-Z0-9_]+)\}\}")


def render_text(text: str, variables: dict[str, str]) -> str:
    def sub(m: re.Match[str]) -> str:
        key = m.group(1)
        return variables.get(key, f"⟨{key}⟩")

    return PLACEHOLDER.sub(sub, text)


def _variables(title: str, language: str, extra: dict[str, str]) -> dict[str, str]:
    v = dict(DEFAULT_VARS)
    v.update({"TITLE": title, "LANG": language, "DATE": date.today().isoformat()})
    v.update(extra)
    return v


def init_course(
    target: Path,
    title: str,
    slug: str | None = None,
    language: str = "中文",
    force: bool = False,
    variables: dict[str, str] | None = None,
) -> Course:
    target = target.expanduser().resolve()
    if target.exists() and any(target.iterdir()) and not force:
        raise SystemExit(f"目标目录非空：{target}（加 --force 覆盖模板文件）")
    target.mkdir(parents=True, exist_ok=True)
    slug = slug or slugify(target.name)
    vars_ = _variables(title, language, variables or {})

    src = TEMPLATES / "course"
    for item in src.rglob("*"):
        rel = item.relative_to(src)
        dst = target / rel
        if item.is_dir():
            dst.mkdir(parents=True, exist_ok=True)
            continue
        dst.parent.mkdir(parents=True, exist_ok=True)
        if item.suffix in {".md", ".json", ".txt", ".srt"}:
            dst.write_text(render_text(item.read_text(encoding="utf-8"), vars_), encoding="utf-8")
        else:
            shutil.copy2(item, dst)

    write_json(
        target / "course.json",
        {
            "slug": slug,
            "title": title,
            "language": language,
            "created": date.today().isoformat(),
            "video": {
                "composition": "CourseVideo",
                "thumbnail": "CourseThumbnail",
                "width": 1920,
                "height": 1080,
                "fps": 30,
                "musicVolume": 0.2,
            },
        },
    )
    (target / "video" / "out" / "subs").mkdir(parents=True, exist_ok=True)
    return Course.open(target)


def add_video(course: Course, force: bool = False) -> Path:
    dst = course.remotion
    if dst.exists() and any(dst.iterdir()) and not force:
        raise SystemExit(f"视频工程已存在：{dst}")
    src = TEMPLATES / "remotion"
    shutil.copytree(
        src,
        dst,
        dirs_exist_ok=force,
        ignore=shutil.ignore_patterns("node_modules", ".cache", ".npm-cache", "out", "*.log", "__pycache__"),
    )
    (dst / "src" / "data").mkdir(parents=True, exist_ok=True)
    if course.storyboard_path.exists():
        from .narration import sync_storyboard

        sync_storyboard(course)
    return dst


def scaffold_summary(course: Course) -> str:
    return "\n".join(
        [
            f"课程目录: {course.root}",
            f"简报:     {course.root / 'brief.md'}",
            f"来源账本: {course.root / 'research' / 'source-ledger.md'}",
            f"课程正文: {course.root / 'curriculum'}",
            f"旁白:     {course.narration_path}",
            f"分镜:     {course.storyboard_path}",
            f"视频工程: {course.remotion}",
        ]
    )
