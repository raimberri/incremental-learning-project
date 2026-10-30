# Incremental Learning Project

[简体中文](README.md) · [English](README.en.md)

> A general-purpose pipeline that turns **"I want to learn X"** into an
> **incremental course and an explainer video**.

[![CI](https://github.com/raimberri/incremental-learning-project/actions/workflows/ci.yml/badge.svg)](https://github.com/raimberri/incremental-learning-project/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This is a **topic-agnostic** learning project. Physics, history, programming, a
musical instrument, law, a single paper, or a hands-on skill can all become a
"readable from zero" tutorial and video through the same process.

The process assumes neither prior knowledge of the subject nor the existence of
academic papers. It requires only three things:

1. **Incremental**: each concept is explained in detail exactly once; later text
   only refers back to it.
2. **Sourced**: every number, date, and claim traces back to a source ledger.
3. **Reproducible**: narration, timing, storyboard, assets, and rendering can be
   rebuilt from sources kept in the repository.

## Repository layout

| Path | Contents |
|---|---|
| `courses/` | Course archive, one directory per course; see [`courses/README.md`](courses/README.md) |
| `courses/LLM/` | Reference implementation: 17 chapters, a paper library, and 17 videos |
| `courseforge/` | Reusable code library, course templates, and Remotion template |
| `asset-library/` | Reusable photos, a warm-white theme, and music recipes |
| `skills/incremental-course/` | Source of the DSH skill that builds a course and video from one concept |
| `docs/` | Environment setup, Git media policy, and related guides |
| `scripts/` | Link checking, release publishing, and small utilities |
| `AGENT.MD` | Non-negotiable teaching and delivery requirements |
| `WORKFLOW.md` | Seven-stage workflow, checkpoints, and failure modes |

## Requirements

| Component | Version | Purpose | Check |
|---|---|---|---|
| Python | 3.10+ (CI uses 3.12) | `courseforge`, tests, and scripts | `python3 --version` |
| Node.js | 20.19+, 22.13+, or 24+ | Remotion rendering | `node --version` |
| npm / npx | Bundled with Node.js | Installing Remotion dependencies | `npm --version` |
| ffmpeg | 5.0+ | Decoding TTS audio, measuring duration, mixing tracks | `ffmpeg -version` |
| Chrome / Chromium | Latest stable | Remotion rendering (Chrome Headless Shell can also be downloaded automatically) | The `chrome` line from `make doctor` |
| Network | — | edge-tts, the npm registry, browser and compositor downloads | See troubleshooting |

macOS and Linux are the primary supported platforms; on Windows, use WSL2.
Full installation steps, platform differences, proxy settings, and
troubleshooting are in **[`docs/environment.en.md`](docs/environment.en.md)**.

### Install

```bash
git clone https://github.com/raimberri/incremental-learning-project.git
cd incremental-learning-project

make setup          # create .venv and install courseforge in editable mode
make doctor         # check Python deps, ffmpeg, node/npm/npx, Chrome, Remotion template
```

`make setup` leaves the system Python untouched and installs dependencies only
into the repository-local `.venv/`; `make doctor` only inspects the machine and
changes nothing.

Without `make`, the equivalent commands are:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -e courseforge
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge doctor
```

`doctor` exits with `0` when every check passes, and with `1` otherwise,
listing the missing items line by line.

### Environment variables

| Variable | Default | Purpose | When to set it |
|---|---|---|---|
| `PYTHONPATH` | Unset | Import `courseforge/src` directly | When `pip install -e courseforge` has not been run; `make` sets it automatically |
| `COURSEFORGE_ROOT` | Repository root found by walking upward | Locate `courseforge/templates` | When running the CLI or skill outside the repository |
| `REMOTION_BROWSER` | Auto-detected | Chrome/Chromium executable path | When the browser is not in the default location, or when using Chromium |
| `npm_config_cache` | `<course>/video/remotion/.npm-cache` | npm cache directory | When the global cache is not writable; `courseforge` already defaults to a local cache |
| `DSH_HOME` | `~/.dsh` | Skill installation directory | When using a custom DSH data directory |
| `DRY_RUN` | `0` | Make the release script print without uploading | When previewing release assets |

`make` also accepts two variables: `PY` (Python interpreter, default
`.venv/bin/python`) and `COURSE` (course package path, default `courses/LLM`).

## Quick start

Run every command from the **repository root**. `<course>` is a course package
directory containing `course.json`, for example `courses/my-topic`.

### 1. Scaffold a course package

```bash
export PYTHONPATH=courseforge/src   # optional after pip install -e
PY=.venv/bin/python

$PY -m courseforge init courses/my-topic --title "The concept I want to learn"
```

`init` creates `brief.md`, `research/source-ledger.md`, `curriculum/`,
`appendices/`, `video/script/`, and `course.json`. Write the brief and the
source ledger first, then the course text.

### 2. Fill in the source files

| File | What to write | Done when |
|---|---|---|
| `brief.md` | Learning contract: reader, prerequisites, outcomes | You can state a verifiable action |
| `research/source-ledger.md` | Sources for every number, date, and claim | `make research COURSE=...` passes |
| `curriculum/`, `appendices/` | Incremental chapters, concept ledger, self-tests | Each concept is defined once and every chapter has a self-test |
| `video/script/narration.json` | Sentence-level bilingual narration and scene order | Scene ids match the storyboard |
| `video/script/storyboard.json` | Visual type and images for each scene | Quantitative ideas have visuals; paths exist |

### 3. Build the video

```bash
$PY -m courseforge video     courses/my-topic   # copy the Remotion project
$PY -m courseforge voice     courses/my-topic   # TTS -> voice.wav + timeline.json + 3 SRT files
$PY -m courseforge music     courses/my-topic   # synthesize background music
$PY -m courseforge check     courses/my-topic   # validate structure; non-zero on errors
$PY -m courseforge render    courses/my-topic   # render the MP4 (runs npm install on first use)
$PY -m courseforge thumbnail courses/my-topic   # render the cover
$PY -m courseforge package   courses/my-topic   # collect MP4, cover, and subtitles
```

| Output | Location |
|---|---|
| Final video | `video/out/<slug>.mp4` |
| Cover | `video/out/poster.jpg` |
| Subtitles | `video/out/subs/<slug>.{zh,en,bilingual}.srt` |
| Publish copy | `video/out/publish/` |
| Timeline | `video/remotion/src/data/timeline.json` |

### 4. Rebuild after edits

- **Narration, rate, or voice changed**: rerun `voice`. TTS is cached by text
  hash, so only changed sentences are synthesized again.
- **Only storyboard or images changed**: rerun `sync` (or just `render`, which
  syncs automatically), then `render`.
- **Course text changed**: no video rebuild is needed; text and video are
  independent deliverables.
- **Title, language, or composition settings changed**: edit `course.json`.
- **Before committing**: run `make check COURSE=<course>` and `make links`.

## Command reference

| Command | What it does | Common options |
|---|---|---|
| `init <path> --title <text>` | Scaffold a course package | `--slug`, `--language`, `--var KEY=VALUE`, `--force` |
| `video <course>` | Copy the Remotion template into `video/remotion/` | `--force` |
| `voice <course>` | Generate voice-over, timeline, and three SRT files | `--engine edge\|say`, `--voice`, `--rate` |
| `music <course>` | Synthesize background music | `--bpm`, `--seed` |
| `sync <course>` | Copy the storyboard JSON into the Remotion project | — |
| `check <course>` | Validate ids, scene types, subtitle length, duration, and image paths | — |
| `research <course>` | Verify that the source ledger has a URL/DOI per claim | — |
| `render <course>` | Render the final video | `--crf`, `--concurrency`, `--preset`, `--out` |
| `still <course> --frame <N>` | Render a single preview frame | `--out`, `--composition` |
| `thumbnail <course>` | Render the cover | `--out` |
| `package <course>` | Collect publishable files | — |
| `assets <subcommand>` | Asset library: `list`, `search`, `add`, `prompt`, `themes`, `theme`, `rebuild` | See `assets --help` |
| `doctor` | Check the local toolchain | — |

Conventions:

- Run every command from the repository root and write course paths as
  `courses/...`.
- `check`, `research`, and `doctor` return `1` on failure, so they work
  directly in CI.
- Generated audio, video, `node_modules/`, and caches never enter Git; source
  files are the versioned artifacts.

## Course package layout

```text
courses/my-topic/
├── course.json                 Course metadata: slug, title, language, composition settings
├── brief.md                    Learning contract
├── research/
│   └── source-ledger.md        Source ledger
├── curriculum/                 00 introduction + chapter text
├── appendices/                 Concept ledger, glossary, self-test answers
└── video/
    ├── script/
    │   ├── narration.json      Single source of truth for narration and scene order
    │   └── storyboard.json     Single source of truth for visuals
    ├── remotion/               JSON-driven Remotion project
    └── out/                    MP4, cover, subtitles, publish copy
```

`video/script/*.json` is the single source of truth. Files under
`video/remotion/src/data/` are generated by `voice` and `sync`; do not edit them
by hand.

## Generate a course with AI

The skill source lives in `skills/incremental-course/`. Install or update it:

```bash
./skills/install.sh
```

This copies it to `${DSH_HOME:-$HOME/.dsh}/skills/incremental-course`. Restart
DSH if the current session does not see it. If the repository is not at its
default location, also set:

```bash
export COURSEFORGE_ROOT=/path/to/incremental-learning-project
```

Then ask in the conversation:

> I want to learn photosynthesis. Build a six-chapter course and an eight-minute
> video to go with it.

The skill runs: intake -> source ledger -> incremental chapters -> sentence-level
narration and storyboard -> TTS, timeline, and subtitles -> images -> Remotion
render -> frame-by-frame QA. You can also ask for text only, or for a video
built on existing text. See [`skills/README.md`](skills/README.md).

## Reference implementation: the LLM course

[`courses/LLM/`](courses/LLM/) was the first complete course built with this
pipeline, and shows the upper end of the scale:

| Item | Scale |
|---|---|
| Text | 17 chapters (00 introduction + 01–16) |
| Paper library | 57 key papers in 6 thematic volumes |
| Appendices | Concept ledger, cross-domain map, glossary, self-test answers |
| Videos | 17 videos, 6–9 minutes each; Chinese voice-over with bilingual subtitles |

Videos are not committed as Git objects; they are published in
[Releases](https://github.com/raimberri/incremental-learning-project/releases).
The text, paper index, narration, storyboard, and rebuildable Remotion project
all live in the repository.

**The LLM course's chapter titles, examples, and visuals are not a general
specification.** A new course can have one chapter, three images, and one
six-minute video.

## Tests and checks

```bash
make test                          # unit tests
make links                         # check Markdown relative links

# Single-package courses use the course root; multi-chapter courses use one video package
make check COURSE=courses/LLM/video/ch0
make research COURSE=courses/LLM/video/ch0
```

CI runs unit tests and the link check on every push and pull request.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `No module named courseforge` | Use `.venv/bin/python` from the repository root, or set `PYTHONPATH=courseforge/src` |
| `doctor` reports Chrome missing | Install Chrome, run `npx remotion browser ensure` inside the Remotion project, or set `REMOTION_BROWSER` |
| edge-tts times out or returns 403 | Check the network or proxy; on macOS, use `--engine say` as a fallback |
| `npm install` reports a cache permission error | The local cache is already the default; if it still fails, set `npm_config_cache=$PWD/.npm-cache` |
| Chinese text renders as boxes | Install Noto Sans CJK (Linux) or make sure a Chinese font is available |
| `bad interpreter` after moving the repository | Delete `.venv/` and rerun `make setup` |

For more symptoms, causes, and fixes, see
[`docs/environment.en.md`](docs/environment.en.md).

## Git and media policy

This repository is a **source repository**, not a media dump:

- Commit: course text, appendices, briefs, source ledgers, narration and
  storyboard JSON, Remotion source, small images, covers, SRT files, templates,
  and scripts.
- Do not commit: `*.mp4`, `*.wav`, `node_modules/`, `.venv/`, `__pycache__/`,
  `.cache/`, logs, or `video/out/publish/`.
- Publish finished videos through GitHub Releases:
  `scripts/publish-release.sh`.

Rules and migration guidance are in [`docs/git-and-media.md`](docs/git-and-media.md)
(in Chinese).

## Documentation

| Document | Contents |
|---|---|
| [`docs/environment.en.md`](docs/environment.en.md) / [`docs/environment.md`](docs/environment.md) | Environment setup, platform differences, networking, and troubleshooting |
| [`WORKFLOW.md`](WORKFLOW.md) | Seven-stage workflow, checkpoints, and failure modes (Chinese) |
| [`AGENT.MD`](AGENT.MD) | Non-negotiable acceptance criteria (Chinese) |
| [`courseforge/README.md`](courseforge/README.md) | Code library, commands, and data contract |
| [`courses/README.md`](courses/README.md) | Course archive conventions and layout patterns (Chinese) |
| [`skills/README.md`](skills/README.md) | Skill installation and usage |
| [`docs/git-and-media.md`](docs/git-and-media.md) | Git and media release policy (Chinese) |

## License

Code and documentation are released under [MIT](LICENSE). Licenses for
third-party images and music used in course text and videos are listed in each
course's `video/asset-credits.md`.
