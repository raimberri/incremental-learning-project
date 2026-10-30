# Storyboard spec

The canonical schema is
`courseforge/templates/remotion/STORYBOARD.md`. This is the short version.

## Contract

- `video/script/narration.json` owns timing and bilingual lines.
- `video/script/storyboard.json` owns visuals.
- Scene ids and order must match exactly.
- The Remotion project is JSON-driven; do not write TSX for a new course unless
  the beat genuinely cannot be expressed with an existing scene type.
- `custom` is the escape hatch for node graphs, active-era timelines, or a
  2–3 phase scene. It names a component under `src/scenes/` and lists its
  images; `timeline.json` remains the only time source.

## Visual density bar

- One dedicated image per analysed concept; four reasons = four images.
- 2–3 visual phases per scene; no static layout for more than 8 seconds.
- At least one non-symmetric composition per chapter (hero image + side column,
  timeline + detail card, node graph, three/four-column comparison).
- No half-empty screens: reveal the full grid at one cue and highlight the
  active item instead of popping cards one by one.

## Scene types

| type | fields | use |
|---|---|---|
| `cover` | `title`, `highlight`, `subtitle`, `pills`, `image?`, `stamp?` | chapter opening |
| `bullets` | `items[{icon,title,sub,color}]` | 2–4 parallel concepts |
| `formula` | `formula`, `note`, `bullets`, `stamp?` | one formula/rule + reading |
| `curve` | `formula`, `bullets`, `chart` | quantitative shape |
| `compare` | `left`, `right`, `center` | two views / two cases |
| `steps` | `steps[{title,sub}]` | 2–4 step procedure |
| `photo` | `image`, `subtitle`, `bullets`, `pills`, `caption` | photo-led example |
| `timeline` | `events[{year,title,sub,color}]` | 3–6 historical nodes |
| `outro` | `title`, `subtitle`, `next{code,title,sub}`, `pills` | next chapter |
| `custom` | `component`, `images[]`, `beat?` | node graph / multi-phase / one-image-per-concept |

## Chart spec

```json
{
  "kind": "neglog",
  "xRange": [0.006, 1],
  "yMax": 5,
  "xLabel": "剩余比例 p →",
  "yLabel": "−log p ↑",
  "points": [{"x": 0.6, "label": "0.60 → 0.51", "color": "green", "dy": 24}]
}
```

Kinds:

- `neglog`: `y = −ln x`; use for decay, rare events, surprise, or any quantity
  that grows sharply as x approaches zero.
- `sigmoid`: `y = 1/(1+e^(−x/τ))`; use for thresholds, probability-like
  responses, or a parameterized S-curve.
- `gap`: a baseline plus an exponential band; use whenever a total can be
  decomposed into "base + increment".
- `bars`: categorical values; use for comparisons, distributions, or before/after.

Every chart needs an x label and a y label with a unit. Points near the right
edge need `anchor:"end"` and negative `dx`.

## Pacing

- Scene 1: cover, 2 lines.
- Scenes 2–3: intuition and mechanism, 4–6 lines each.
- Scenes 4–6: definition/formula, quantitative shape, worked example, 3–5 lines each.
- Scene 7: how to use it, 3–4 lines.
- Scene 8: limits / misconception, 3–5 lines.
- Scene 9: outro, 2 lines.

A 6–10 minute video is 60–100 lines. If a scene has fewer than 2 lines, merge it.
A concept with no quantitative shape does not need a `curve` scene; do not force
a chart where a diagram or a sequence of examples carries the idea better.

## Animation convention

Line 0 reveals the headline; line 1 reveals the main object; later lines reveal
bullets, points, or steps. Elements keep the last cue if a scene has fewer lines
than elements.
