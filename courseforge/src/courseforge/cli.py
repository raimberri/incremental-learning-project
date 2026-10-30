from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from . import __version__
from .assets import add_to_course, copy_theme, load_catalog, prompt_sheet, rebuild_manifest, search, theme_names
from .music import make_music
from .narration import load_narration, sync_storyboard
from .paths import Course
from .render import package, render, still, thumbnail
from .research import check_ledger
from .scaffold import add_video, init_course
from .validate import check_course, doctor
from .voice import build_voice


def _parse_vars(items: list[str] | None) -> dict[str, str]:
    out = {}
    for item in items or []:
        if "=" not in item:
            raise SystemExit(f"--var 需要 KEY=VALUE：{item}")
        k, v = item.split("=", 1)
        out[k.strip().upper()] = v
    return out


def cmd_init(args: argparse.Namespace) -> int:
    course = init_course(
        Path(args.path),
        title=args.title,
        slug=args.slug,
        language=args.language,
        force=args.force,
        variables=_parse_vars(args.var),
    )
    print(f"✓ 课程脚手架：{course.root}")
    print("下一步：")
    print("  1. 填 brief.md / research/source-ledger.md")
    print("  2. 写 curriculum/ 与 video/script/narration.json")
    print("  3. 填 video/script/storyboard.json")
    print(f"  4. courseforge video {course.root}")
    print(f"  5. courseforge voice {course.root} && courseforge music {course.root}")
    print(f"  6. courseforge check {course.root} && courseforge render {course.root}")
    return 0


def cmd_video(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    add_video(course, force=args.force)
    print(f"✓ 视频工程：{course.remotion}")
    return 0


def cmd_voice(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    report = build_voice(course, voice=args.voice, rate=args.rate, engine=args.engine)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


def cmd_music(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    path = make_music(course, bpm=args.bpm, seed=args.seed)
    print(f"✓ 音乐：{path}")
    return 0


def cmd_check(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    report = check_course(course)
    report.print()
    return 0 if report.errors == [] else 1


def cmd_doctor(_: argparse.Namespace) -> int:
    return doctor()


def cmd_sync(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    sync_storyboard(course)
    print(f"✓ 分镜同步：{course.board_data_path}")
    return 0


def cmd_render(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    path = render(course, crf=args.crf, concurrency=args.concurrency, preset=args.preset, out=args.out)
    print(f"✓ 成片：{path}")
    return 0


def cmd_still(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    path = still(course, args.frame, out=args.out, composition=args.composition)
    print(f"✓ 静帧：{path}")
    return 0


def cmd_thumbnail(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    path = thumbnail(course, out=args.out)
    print(f"✓ 封面：{path}")
    return 0


def cmd_package(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    path = package(course)
    print(f"✓ 发布目录：{path}")
    return 0


def cmd_research(args: argparse.Namespace) -> int:
    course = Course.open(args.course)
    count, problems = check_ledger(course.root / "research" / "source-ledger.md")
    print(f"来源账本：{count} 条主张")
    for p in problems:
        print(f"! {p}")
    return 0 if count and not problems else 1


def cmd_assets(args: argparse.Namespace) -> int:
    if args.assets_cmd == "list":
        data = load_catalog()
        for img in data["images"]:
            print(f"{img['id']:<16} {', '.join(img['tags'][:4]):<40} {img['description'][:60]}")
        return 0
    if args.assets_cmd == "search":
        rows = search(args.query, tag=args.tag, limit=args.limit)
        for img in rows:
            print(f"{img['id']:<16} {img['file']:<28} {img['description'][:70]}")
        if not rows:
            print("没有匹配素材")
            return 1
        return 0
    if args.assets_cmd == "add":
        course = Course.open(args.course)
        picked = add_to_course(course, args.ids, target_dir=args.dir)
        print(f"✓ 复制 {len(picked)} 张到 public/{args.dir}")
        print(f"✓ 素材清单：{course.video / 'asset-credits.md'}")
        return 0
    if args.assets_cmd == "prompt":
        print(prompt_sheet(args.subjects, style=args.style))
        return 0
    if args.assets_cmd == "rebuild":
        n = rebuild_manifest()
        print(f"✓ 重建索引：{n} 张")
        return 0
    if args.assets_cmd == "themes":
        for t in theme_names():
            print(t)
        return 0
    if args.assets_cmd == "theme":
        course = Course.open(args.course)
        path = copy_theme(course, args.name)
        print(f"✓ 主题副本：{path}")
        return 0
    raise SystemExit("未知 assets 子命令")


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="courseforge", description="Incremental course + explainer video pipeline")
    p.add_argument("--version", action="version", version=__version__)
    sub = p.add_subparsers(dest="cmd", required=True)

    q = sub.add_parser("init", help="scaffold a new course package")
    q.add_argument("path")
    q.add_argument("--title", required=True)
    q.add_argument("--slug")
    q.add_argument("--language", default="中文")
    q.add_argument("--var", action="append", help="override template variable KEY=VALUE")
    q.add_argument("--force", action="store_true")
    q.set_defaults(func=cmd_init)

    q = sub.add_parser("video", help="add the Remotion project to a course")
    q.add_argument("course")
    q.add_argument("--force", action="store_true")
    q.set_defaults(func=cmd_video)

    q = sub.add_parser("voice", help="TTS + timeline + SRT")
    q.add_argument("course")
    q.add_argument("--voice")
    q.add_argument("--rate")
    q.add_argument("--engine", choices=["edge", "say"], default="edge")
    q.set_defaults(func=cmd_voice)

    q = sub.add_parser("music", help="synthesize background music")
    q.add_argument("course")
    q.add_argument("--bpm", type=float, default=76)
    q.add_argument("--seed", type=int, default=7)
    q.set_defaults(func=cmd_music)

    q = sub.add_parser("check", help="validate narration, storyboard, timing")
    q.add_argument("course")
    q.set_defaults(func=cmd_check)

    sub.add_parser("doctor", help="check local toolchain").set_defaults(func=cmd_doctor)

    q = sub.add_parser("sync", help="copy storyboard into the Remotion project")
    q.add_argument("course")
    q.set_defaults(func=cmd_sync)

    q = sub.add_parser("render", help="render the final MP4")
    q.add_argument("course")
    q.add_argument("--crf", type=int, default=20)
    q.add_argument("--concurrency", type=int, default=8)
    q.add_argument("--preset", default="fast")
    q.add_argument("--out")
    q.set_defaults(func=cmd_render)

    q = sub.add_parser("still", help="render one preview frame")
    q.add_argument("course")
    q.add_argument("--frame", type=int, required=True)
    q.add_argument("--out", default="preview.jpg")
    q.add_argument("--composition")
    q.set_defaults(func=cmd_still)

    q = sub.add_parser("thumbnail", help="render the cover")
    q.add_argument("course")
    q.add_argument("--out", default="poster.jpg")
    q.set_defaults(func=cmd_thumbnail)

    q = sub.add_parser("package", help="collect video, poster and SRTs")
    q.add_argument("course")
    q.set_defaults(func=cmd_package)

    q = sub.add_parser("research", help="check the source ledger")
    q.add_argument("course")
    q.set_defaults(func=cmd_research)

    a = sub.add_parser("assets", help="reusable image / theme library")
    asub = a.add_subparsers(dest="assets_cmd", required=True)
    asub.add_parser("list").set_defaults(func=cmd_assets)
    q = asub.add_parser("search")
    q.add_argument("query", nargs="?", default="")
    q.add_argument("--tag")
    q.add_argument("--limit", type=int, default=20)
    q.set_defaults(func=cmd_assets)
    q = asub.add_parser("add")
    q.add_argument("course")
    q.add_argument("ids", nargs="+")
    q.add_argument("--dir", default="img")
    q.set_defaults(func=cmd_assets)
    q = asub.add_parser("prompt")
    q.add_argument("subjects", nargs="+")
    q.add_argument("--style", default="warm-paper")
    q.set_defaults(func=cmd_assets)
    asub.add_parser("rebuild").set_defaults(func=cmd_assets)
    asub.add_parser("themes").set_defaults(func=cmd_assets)
    q = asub.add_parser("theme")
    q.add_argument("course")
    q.add_argument("name")
    q.set_defaults(func=cmd_assets)
    return p


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return args.func(args)
    except KeyboardInterrupt:
        return 130


if __name__ == "__main__":
    raise SystemExit(main())
