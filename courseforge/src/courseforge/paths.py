from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Course:
    """A single course package on disk."""

    root: Path

    @classmethod
    def open(cls, path: str | Path) -> "Course":
        return cls(Path(path).expanduser().resolve())

    @property
    def video(self) -> Path:
        return self.root / "video"

    @property
    def script(self) -> Path:
        return self.video / "script"

    @property
    def remotion(self) -> Path:
        return self.video / "remotion"

    @property
    def out(self) -> Path:
        return self.video / "out"

    @property
    def subs(self) -> Path:
        return self.out / "subs"

    @property
    def narration_path(self) -> Path:
        return self.script / "narration.json"

    @property
    def storyboard_path(self) -> Path:
        return self.script / "storyboard.json"

    @property
    def timeline_path(self) -> Path:
        return self.remotion / "src" / "data" / "timeline.json"

    @property
    def board_data_path(self) -> Path:
        return self.remotion / "src" / "data" / "storyboard.json"

    @property
    def slug(self) -> str:
        import json

        meta = self.root / "course.json"
        if meta.exists():
            try:
                return json.loads(meta.read_text(encoding="utf-8")).get("slug") or self.root.name
            except (json.JSONDecodeError, OSError):
                pass
        return self.root.name

    def ensure(self) -> None:
        for p in (self.script, self.remotion, self.out, self.subs):
            p.mkdir(parents=True, exist_ok=True)


def repo_root(start: Path | None = None) -> Path:
    """Find the repo root by walking up to a directory containing courseforge/."""
    import os

    env = os.environ.get("COURSEFORGE_ROOT")
    if env and (Path(env) / "courseforge" / "templates").is_dir():
        return Path(env).resolve()
    here = (start or Path.cwd()).resolve()
    for p in [here, *here.parents]:
        if (p / "courseforge" / "templates").is_dir():
            return p
    return here
