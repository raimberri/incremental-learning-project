#!/usr/bin/env python3
"""Check local Markdown links without network access.

Generated media (*.mp4, *.wav, ...) is intentionally not committed; a link to
such a file is reported as a warning instead of a hard failure. Everything else
must resolve relative to the Markdown file (or the repository root for /paths).
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent

SKIP_DIRS = {
    ".git",
    ".venv",
    "venv",
    "node_modules",
    "__pycache__",
    ".cache",
    ".npm-cache",
    "build",
    "dist",
}

MEDIA_SUFFIXES = {".mp4", ".mov", ".webm", ".wav", ".mp3", ".m4a", ".flac"}

LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
HREF_RE = re.compile(r"""href=["']([^"']+)["']""")


def iter_markdown() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*.md"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        files.append(path)
    return sorted(files)


def strip_target(raw: str) -> str:
    target = raw.strip()
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    if ' "' in target:
        target = target.split(' "', 1)[0]
    if " '" in target:
        target = target.split(" '", 1)[0]
    return target.strip()


def is_external(target: str) -> bool:
    lower = target.lower()
    return (
        lower.startswith(("http://", "https://", "mailto:", "tel:", "data:", "ftp://"))
        or target.startswith("#")
        or target.startswith("//")
    )


def check_file(path: Path, broken: list[str], warnings: list[str]) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    in_fence = False
    for lineno, line in enumerate(text.splitlines(), start=1):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue

        targets = [m.group(1) for m in LINK_RE.finditer(line)]
        targets += [m.group(1) for m in HREF_RE.finditer(line)]

        for raw in targets:
            target = strip_target(raw)
            if not target or is_external(target):
                continue
            if target.startswith("{"):
                continue

            target = target.split("#", 1)[0].split("?", 1)[0]
            if not target:
                continue
            target = unquote(target)

            if target.startswith("/"):
                resolved = ROOT / target.lstrip("/")
            else:
                resolved = path.parent / target

            if resolved.exists():
                continue

            suffix = Path(target).suffix.lower()
            where = f"{path.relative_to(ROOT)}:{lineno}"
            if suffix in MEDIA_SUFFIXES:
                warnings.append(f"{where} -> {target} (generated media; publish via Release)")
            else:
                broken.append(f"{where} -> {target}")


def main() -> int:
    broken: list[str] = []
    warnings: list[str] = []
    files = iter_markdown()
    for path in files:
        check_file(path, broken, warnings)

    print(f"checked {len(files)} Markdown files")
    if warnings:
        print(f"{len(warnings)} media link(s) skipped:")
        for item in warnings[:20]:
            print(f"  - {item}")
        if len(warnings) > 20:
            print(f"  ... and {len(warnings) - 20} more")

    if broken:
        print(f"\n{len(broken)} broken link(s):", file=sys.stderr)
        for item in broken:
            print(f"  - {item}", file=sys.stderr)
        return 1

    print("all local links resolve")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
