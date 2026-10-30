from __future__ import annotations

import asyncio
import hashlib
import subprocess
import wave
from pathlib import Path

import numpy as np

from .config import (
    DEFAULT_LEAD_IN,
    DEFAULT_LINE_GAP,
    DEFAULT_PRE_ROLL,
    DEFAULT_SCENE_GAP,
    DEFAULT_TAIL,
)
from .narration import Narration, load_narration, sync_storyboard
from .paths import Course
from .utils import write_json

SR = 48000


def _cache_key(engine: str, voice: str, rate: str, text: str) -> str:
    return hashlib.sha1(f"{engine}|{voice}|{rate}|{text}".encode()).hexdigest()[:16]


async def _synth_edge(text: str, voice: str, rate: str, path: Path) -> None:
    try:
        import edge_tts
    except ImportError as exc:
        raise SystemExit("缺少 edge-tts。运行 courseforge doctor 查看环境。") from exc
    await edge_tts.Communicate(text, voice, rate=rate).save(str(path))


def _synth_say(text: str, voice: str, rate: str, path: Path) -> None:
    # macOS fallback. `rate` is a percentage string such as "+0%".
    words_per_min = 190
    try:
        pct = int(rate.strip("%+"))
        words_per_min = max(80, round(words_per_min * (1 + pct / 100)))
    except ValueError:
        pass
    subprocess.run(["say", "-v", voice, "-r", str(words_per_min), "-o", str(path), text], check=True)


def _decode(path: Path) -> np.ndarray:
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
        check=True,
        capture_output=True,
    ).stdout
    pcm = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
    loud = np.flatnonzero(np.abs(pcm) > 0.012)
    if len(loud) == 0:
        return pcm
    a = max(int(loud[0]) - int(0.03 * SR), 0)
    b = min(int(loud[-1]) + int(0.08 * SR), len(pcm))
    return pcm[a:b]


def _srt_time(t: float) -> str:
    ms = round(t * 1000)
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def _write_srt(path: Path, lines: list[dict], fmt) -> None:
    body = "\n".join(
        f"{n}\n{_srt_time(l['start'])} --> {_srt_time(l['end'] + 0.25)}\n{fmt(l)}\n"
        for n, l in enumerate(lines, 1)
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body, encoding="utf-8")


async def _synth_all(lines: list[tuple[str, str]], engine: str, voice: str, rate: str, cache: Path) -> list[Path]:
    cache.mkdir(parents=True, exist_ok=True)
    paths: list[Path] = []
    tasks = []
    for _, text in lines:
        suffix = ".mp3" if engine == "edge" else ".aiff"
        path = cache / f"{_cache_key(engine, voice, rate, text)}{suffix}"
        paths.append(path)
        if path.exists():
            continue
        if engine == "edge":
            tasks.append(_synth_edge(text, voice, rate, path))
        else:
            _synth_say(text, voice, rate, path)
    if tasks:
        await asyncio.gather(*tasks)
    return paths


def build_voice(
    course: Course,
    voice: str | None = None,
    rate: str | None = None,
    engine: str = "edge",
    lead_in: float = DEFAULT_LEAD_IN,
    line_gap: float = DEFAULT_LINE_GAP,
    scene_gap: float = DEFAULT_SCENE_GAP,
    pre_roll: float = DEFAULT_PRE_ROLL,
    tail: float = DEFAULT_TAIL,
) -> dict:
    spec: Narration = load_narration(course)
    voice = voice or spec.voice
    rate = rate or spec.rate
    if engine == "say" and voice.startswith("zh-CN-"):
        voice = "Tingting"

    flat = [(s["id"], zh) for s in spec.scenes for zh, _ in s["lines"]]
    cache = course.root / ".cache" / "tts"
    paths = asyncio.run(_synth_all(flat, engine, voice, rate, cache))
    clips = [_decode(p) for p in paths]

    t = lead_in
    scenes: list[dict] = []
    flat_lines: list[dict] = []
    k = 0
    for si, sc in enumerate(spec.scenes):
        if si:
            t += scene_gap
        start = t
        out_lines = []
        for zh, en in sc["lines"]:
            dur = len(clips[k]) / SR
            line = {"zh": zh, "en": en, "start": round(t, 3), "end": round(t + dur, 3)}
            out_lines.append(line)
            flat_lines.append(line)
            t += dur + line_gap
            k += 1
        scenes.append(
            {
                "id": sc["id"],
                "code": sc["code"],
                "zh": sc["zh"],
                "en": sc["en"],
                "start": round(start - (pre_roll if si else lead_in), 3),
                "lines": out_lines,
            }
        )
    total = t - line_gap + tail
    for a, b in zip(scenes, scenes[1:]):
        a["end"] = b["start"]
    scenes[-1]["end"] = round(total, 3)

    track = np.zeros(int(total * SR) + SR, dtype=np.float32)
    for line, clip in zip(flat_lines, clips):
        i = int(line["start"] * SR)
        track[i : i + len(clip)] += clip
    peak = float(np.abs(track).max())
    if peak > 0:
        track *= 0.89 / peak

    voice_path = course.remotion / "public" / "voice.wav"
    voice_path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(voice_path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((track * 32767).astype(np.int16).tobytes())

    timeline = {"total": round(total, 3), "scenes": scenes}
    write_json(course.timeline_path, timeline)
    write_json(course.out / "timeline.json", timeline)
    try:
        sync_storyboard(course)
    except SystemExit as exc:
        # A storyboard can be filled later; timing still succeeds.
        print(f"! 分镜未同步：{exc}")

    for name, fmt in {
        "zh": lambda l: l["zh"],
        "en": lambda l: l["en"],
        "bilingual": lambda l: f"{l['zh']}\n{l['en']}",
    }.items():
        _write_srt(course.subs / f"{course.slug}.{name}.srt", flat_lines, fmt)

    report = {
        "voice": voice,
        "rate": rate,
        "engine": engine,
        "lines": len(flat_lines),
        "scenes": len(scenes),
        "total": round(total, 3),
        "voice_wav": str(voice_path),
    }
    write_json(course.out / "voice-report.json", report)
    return report
