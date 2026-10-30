from __future__ import annotations

FPS = 30
DEFAULT_VOICE = "zh-CN-XiaoxiaoNeural"
DEFAULT_RATE = "+0%"
DEFAULT_LEAD_IN = 1.6
DEFAULT_LINE_GAP = 0.5
DEFAULT_SCENE_GAP = 2.4
DEFAULT_TAIL = 3.0
DEFAULT_PRE_ROLL = 1.9
DEFAULT_MUSIC_VOLUME = 0.2

ACCENTS = {
    "orange": "#e2724a",
    "blue": "#3f6fe0",
    "green": "#2f9e6e",
    "purple": "#7a5af0",
    "teal": "#1f97a6",
    "red": "#e0524f",
}

SCENE_TYPES = {
    "cover",
    "bullets",
    "formula",
    "curve",
    "compare",
    "steps",
    "photo",
    "timeline",
    "outro",
    # Escape hatch for diagram-heavy scenes: a named component under
    # src/scenes/. Still timed by timeline.json; see STORYBOARD.md.
    "custom",
}

# Rough guidance used by `check`: a teaching video is usually 4-15 minutes.
MIN_VIDEO_SECONDS = 90
MAX_VIDEO_SECONDS = 20 * 60
MAX_ZH_LINE = 60
MAX_EN_LINE = 180
