# courseforge

The reusable code library behind the incremental course workflow.

It turns a course package into:

```text
research ledger → curriculum / narration / storyboard → voice + timeline + SRT
                → background music → Remotion MP4 + poster
```

`courseforge` is topic-agnostic. `../courses/LLM/` is one reference
implementation; new courses do not need its structure, length, or subject.

## Install

From the repository root:

```bash
python3 -m venv .venv
.venv/bin/pip install -e courseforge
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge doctor
```

`doctor` checks Python packages, ffmpeg, Node.js, npm, Chrome, and the Remotion
template. Missing tools are reported, not silently replaced.

## Quick start

```bash
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge init courses/my-topic --title "我想学的概念"
$PY -m courseforge video courses/my-topic
# edit brief, curriculum, narration.json, storyboard.json
$PY -m courseforge voice  courses/my-topic
$PY -m courseforge music  courses/my-topic
$PY -m courseforge check  courses/my-topic
$PY -m courseforge render courses/my-topic
$PY -m courseforge thumbnail courses/my-topic
$PY -m courseforge package courses/my-topic
```

## Commands

| command | what it does |
|---|---|
| `init <dir> --title` | scaffold brief, research ledger, curriculum, narration, storyboard |
| `video <course>` | copy the JSON-driven Remotion template into `video/remotion/` |
| `voice <course>` | edge-tts (or macOS `say`) → `voice.wav`, `timeline.json`, 3 SRTs |
| `music <course>` | synthesize a warm pad + cut whooshes → `music.wav` |
| `check <course>` | validate ids, types, subtitle lengths, duration, image paths |
| `sync <course>` | copy `video/script/storyboard.json` into the Remotion project |
| `render <course>` | `npx remotion render CourseVideo …` |
| `still <course> --frame N` | one preview frame |
| `thumbnail <course>` | render `CourseThumbnail` → `poster.jpg` |
| `package <course>` | collect MP4, poster and SRTs into `video/out/publish/` |
| `assets list/search/add/prompt/rebuild` | reusable image library |
| `research <course>` | check the source ledger has URL/DOI for each claim |
| `doctor` | ffmpeg, node, npm, Chrome, Python packages, template |

## Package layout

```text
src/courseforge/
  cli.py        argparse entry point
  scaffold.py   course templates + Remotion project copy
  narration.py  narration/storyboard schema and id checks
  voice.py      edge-tts, wake-word trim, timeline, SRT
  music.py      NumPy pad + arpeggio + whooshes
  validate.py   course and toolchain checks
  assets.py     image catalog, copy, rebuild, prompt sheet
  render.py     Remotion render/still/package wrappers
  research.py   source-ledger check
templates/
  course/       brief, research, curriculum, appendices, narration, storyboard
  remotion/     JSON-driven video (9 built-in + custom scene)
```

## Data contract

- `video/script/narration.json` is the source of truth for **timing and text**.
- `video/script/storyboard.json` is the source of truth for **visuals**.
- Scene ids and order must match.
- `voice` writes `src/data/timeline.json`; `sync` writes `src/data/storyboard.json`.
- The Remotion project never contains course-specific TSX unless a new visual is
  genuinely required. `type: "custom"` + `component` is the sanctioned escape
  hatch; the component must read `timeline.json` and pass `check`.

## Environment notes

- `edge-tts` needs network access. If it is unavailable, use `--engine say`
  (macOS voices).
- If `npm install` fails because the cache is not writable, set a local cache:
  `npm_config_cache=$PWD/.npm-cache npm install`.
- Rendering uses local Google Chrome when present; set `REMOTION_BROWSER` to
  override.
- 1080p30 rendering is roughly 2–3× real time on a laptop.
- Generated media (`*.mp4`, `*.wav`, `node_modules/`, caches) is ignored by Git;
  see `../docs/git-and-media.md`.

## Test

```bash
make test
# or
PYTHONPATH=courseforge/src .venv/bin/python -m unittest discover -s courseforge/tests -v
```
