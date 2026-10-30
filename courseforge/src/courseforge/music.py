from __future__ import annotations

import json
import wave
from pathlib import Path

import numpy as np

from .paths import Course

SR = 48000


def hz(m: float) -> float:
    return 440 * 2 ** ((m - 69) / 12)


def _pad(total: float, bar: float, chords: list[list[int]], rng: np.random.Generator) -> np.ndarray:
    n = int(total * SR)
    out = np.zeros((n, 2), np.float32)
    seg = int(bar * SR)
    fade = int(2.0 * SR)
    k = 0
    for s in range(0, n, seg):
        chord = chords[k % len(chords)]
        k += 1
        a, b = max(s - fade, 0), min(s + seg + fade, n)
        t = np.arange(b - a) / SR
        x = np.arange(a, b)
        rise = np.clip((x - (s - fade)) / (2 * fade), 0, 1) if s > 0 else 1.0
        fall = np.clip((s + seg + fade - x) / (2 * fade), 0, 1)
        env = (np.sin(np.pi / 2 * rise) * np.sin(np.pi / 2 * fall)) ** 2
        for i, m in enumerate(chord[1:]):
            f = hz(m)
            for ch, det in enumerate((-0.0021, 0.0019)):
                wobble = 1 + 0.0012 * np.sin(2 * np.pi * (0.13 + 0.05 * i) * t + ch)
                ph = 2 * np.pi * f * (1 + det) * np.cumsum(wobble) / SR
                tone = sum(np.sin(h * ph) / h**1.6 for h in range(1, 7))
                out[a:b, ch] += 0.032 * tone * env
        sub = np.sin(2 * np.pi * hz(chord[0] - 12) * t) * 0.08 * env
        out[a:b] += sub[:, None]
    tt = np.arange(n) / SR
    out *= (0.82 + 0.18 * np.sin(2 * np.pi * tt / 23))[:, None]
    return out


def _arp(total: float, starts: list[float], bar: float, beat: float, chords: list[list[int]]) -> np.ndarray:
    n = int(total * SR)
    out = np.zeros((n, 2), np.float32)
    L = int(1.6 * SR)
    t = np.arange(L) / SR
    pattern = [0, 2, 1, 3, 2, 4, 3, 1]
    i = 0
    time = starts[1] if len(starts) > 1 else 8.0
    while time < total - 6:
        chord = chords[int(time // bar) % len(chords)][1:]
        m = chord[pattern[i % len(pattern)] % len(chord)]
        f = hz(m)
        note = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)) * np.exp(-t * 3.2) * np.minimum(1, t * 400)
        vel = 0.06 * (0.7 + 0.3 * (i % 4 == 0))
        pan = 0.5 + 0.35 * np.sin(i * 0.9)
        for tap, (d, g) in enumerate([(0, 1), (3 * beat, 0.4), (6 * beat, 0.16)]):
            s = int((time + d) * SR)
            e = min(s + L, n)
            if s >= n:
                break
            side = pan if tap % 2 == 0 else 1 - pan
            out[s:e, 0] += note[: e - s] * vel * g * (1 - side)
            out[s:e, 1] += note[: e - s] * vel * g * side
        time += beat
        i += 1
    return out


def _whoosh(at: float, rng: np.random.Generator) -> tuple[int, np.ndarray]:
    pre, post = 1.4, 1.2
    L = int((pre + post) * SR)
    t = np.arange(L) / SR
    noise = rng.standard_normal((L, 2)).astype(np.float32)
    cutoff = np.where(t < pre, 300 + 5000 * (t / pre) ** 3, 5300 * np.exp(-(t - pre) * 4))
    alpha = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(noise)
    acc = np.zeros(2, np.float32)
    for k in range(L):
        acc += alpha[k] * (noise[k] - acc)
        y[k] = acc
    env = np.where(t < pre, (t / pre) ** 2, np.exp(-(t - pre) * 5))
    y *= (0.09 * env)[:, None]
    return int((at - pre) * SR), y


def make_music(
    course: Course,
    bpm: float = 76,
    seed: int = 7,
    chords: list[list[int]] | None = None,
) -> Path:
    timeline = json.loads(course.timeline_path.read_text(encoding="utf-8"))
    total = float(timeline["total"]) + 1.0
    starts = [float(s["start"]) for s in timeline["scenes"]]
    beat = 60 / bpm
    bar = 16 * beat
    rng = np.random.default_rng(seed)
    chords = chords or [
        [48, 60, 64, 67, 74],
        [45, 60, 64, 67, 69],
        [41, 60, 64, 65, 69],
        [43, 59, 62, 64, 67],
    ]
    mix = _pad(total, bar, chords, rng) + _arp(total, starts, bar, beat, chords)
    for at in starts[1:]:
        s, y = _whoosh(at, rng)
        if s < 0:
            y = y[-s:]
            s = 0
        mix[s : s + len(y)] += y[: max(0, len(mix) - s)]

    n = len(mix)
    fade_in, fade_out = int(3 * SR), int(5 * SR)
    if n > fade_in + fade_out:
        mix[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
        mix[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None]
    mix = np.tanh(mix * 1.2)
    mix *= 0.85 / max(float(np.abs(mix).max()), 1e-6)
    path = course.remotion / "public" / "music.wav"
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((mix * 32767).astype(np.int16).tobytes())
    return path
