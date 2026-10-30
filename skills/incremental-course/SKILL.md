---
name: incremental-course
description: Build a complete incremental course and explainer video for any concept the user wants to learn. Covers intake, source-ledger research, chapter curriculum, bilingual narration, edge-tts voice and timeline, image_generate assets, JSON storyboard, and Remotion render. Use when the user says "I want to learn X", asks for a course, 教学视频, 讲解视频, 系列课, or wants notes turned into a teachable course with video.
whenToUse: The user names a concept, field, paper, skill, tool, or historical topic they want to learn and asks for a course, curriculum, explainer, teaching video, or a complete learning package; or asks to extend or rebuild an existing course with the same pipeline.
---

# Incremental course factory

You are the producer: researcher, curriculum editor, scriptwriter, and video
director. The goal is a course that teaches one concept at a time, plus a video
that is pleasant to watch and technically correct.

This skill is **topic-agnostic**. The same pipeline works for physics, history,
programming, music, law, a single paper, or a practical skill. Do not assume the
topic is paper-driven, and do not copy the examples from the reference
course into a new subject.

## Repo and tools

Work in the repository that contains `courseforge/` and `asset-library/`.
Discover it instead of hard-coding a path:

```bash
REPO="${COURSEFORGE_ROOT:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
if [ ! -d "$REPO/courseforge" ]; then
  echo "Set COURSEFORGE_ROOT to the repo that contains courseforge/ and asset-library/"
  exit 1
fi
cd "$REPO"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python
```

If `.venv/bin/python` does not exist, create it once:

```bash
python3 -m venv .venv
.venv/bin/pip install -e courseforge
```

Check the toolchain once:

```bash
$PY -m courseforge doctor
```

If `courseforge doctor` fails on Chrome, node, ffmpeg, or edge-tts, stop and
report the missing tool. Do not silently switch to a different renderer.

Read these references when you need detail:

- [references/curriculum-spec.md](references/curriculum-spec.md) — chapter shape and incremental rules.
- [references/research-protocol.md](references/research-protocol.md) — source quality and citation format.
- [references/storyboard-spec.md](references/storyboard-spec.md) — scene types and JSON fields.
- [references/visual-qa.md](references/visual-qa.md) — layout bugs to check frame by frame.
- [references/asset-playbook.md](references/asset-playbook.md) — reuse and generate images.
- `$REPO/WORKFLOW.md` — the full seven-stage workflow.
- `$REPO/AGENT.MD` — non-negotiable acceptance rules.

## 0. Scope first

Decide the delivery mode before doing any work:

| mode | output | when |
|---|---|---|
| `text` | `brief.md` + `research/` + `curriculum/` + `appendices/` | user asks for notes, a course, or an explainer without video |
| `video` | narration + storyboard + audio + MP4 + poster + SRT | user asks for a video based on existing text |
| `full` | both | default when the user says "课程 + 视频" |

Stop at the requested scope. Do not render a 10-minute video when the user asked
for an outline.

## 1. Intake

Extract or ask for:

| field | default when unspecified |
|---|---|
| concept | required |
| learner | "完全没接触过，但愿意每天学 30 分钟" |
| prior knowledge | "无硬性前置；需要时会补最小必要知识" |
| outcome | "能用自己的话解释核心机制，并判断一条相关说法是否夸大" |
| scope | 1 chapter for a short video; 5–10 chapters for a full course |
| video length | 6–10 minutes per chapter |
| language | Chinese body + Chinese/English bilingual subtitles |
| delivery | `full` |

Ask at most three questions. If the user says "你决定", use the defaults and
state them in the brief.

Create the package:

```bash
$PY -m courseforge init courses/<slug> --title "<concept title>"
```

Fill `brief.md` before doing research. The brief is the contract; do not skip it.
If the requested course has several chapters, decide the chapter map before
writing any chapter body.

## 2. Research

Use `web_search` and `web_fetch`. Choose sources by topic type:

1. surveys, textbooks, official documentation, standards;
2. primary papers, original datasets, source code, archives, practitioner records;
3. reputable explainers only for intuition, never for numbers.

Write `research/source-ledger.md` as you go:

```markdown
| # | 主张 | 类型 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|---|
| 1 | 该概念的标准定义 | 标准 | 机构, 标准编号 | URL | 2020 | 高 | §1.2 |
```

Rules:

- Every number, date, and priority claim needs a source.
- Separate "paper result", "official doc", "standard", "news", and "opinion".
- If you cannot verify a claim, write "未核实" and keep it out of the main text.
- Do not invent DOIs, arXiv IDs, page numbers, or quotes.
- For contested topics, add a "争议" row with both sides.

Gate:

```bash
$PY -m courseforge research courses/<slug>
```

## 3. Curriculum

Write one `00-导读.md` and 1–10 chapter files. Use the scaffold as the shape:

1. 本章新增 / 前置 / 对应资料
2. 一个具体问题开场
3. 定义（只定义一次）
4. 机制：输入 → 过程 → 输出
5. 一个可手算/可手推/可实操的例子
6. 常见误解
7. 小结
8. 3 道自测
9. 下一章

Maintain `appendices/A-概念账本.md`: every concept gets exactly one first
definition, and later chapters only reference it. Add terms to
`appendices/C-术语表.md`, cross-domain comparisons to
`appendices/B-跨领域思想地图.md`, and answers to
`appendices/D-自测题与答案.md`.

Each chapter needs at least one cross-domain comparison with:

1. domain / person / era;
2. the structural isomorphism;
3. where the analogy breaks;
4. how it helps understand this chapter.

Gate:

- The course map in the orientation matches the chapter files.
- No concept is defined twice.
- Every chapter has a self-test and a "next chapter" hook.
- Examples are not reused across chapters.
- Every `§N.x` reference exists.

## 4. Narration and storyboard

Write `video/script/narration.json` and `video/script/storyboard.json`.
Target 8–10 scenes and 60–100 lines for a 6–10 minute video (about 5.5 s per
line plus pauses).

Narration rules:

- One idea per line. Chinese 20–40 characters; English ≤ 110 characters.
- Speak the intuition first, then the definition/formula, then the example.
- Keep units, conditions, and uncertainty in the spoken line.
- Use the same term as the curriculum. Do not rotate synonyms.

Storyboard rules:

- Scene ids and order must match narration exactly.
- Pick a scene type per beat: `cover`, `bullets`, `formula`, `curve`,
  `compare`, `steps`, `photo`, `timeline`, `outro`; use `custom` only when a
  node graph or a 2–3 phase scene is genuinely needed.
- If the concept has a quantitative shape, draw it: `neglog` for decay/surprise,
  `sigmoid` for threshold/probability, `gap` for a base-plus-increment
  decomposition, `bars` for categorical comparisons. Label both axes with names
  and units.
- Mark illustrative numbers "示意". Do not put text inside generated images.
- Every scene should have 2–3 visual phases; no static layout for more than
  8 seconds.
- At least one non-symmetric composition per chapter: hero image + side column,
  timeline + detail card, node graph, three/four-column comparison.
- No half-empty screens and no "card graveyard".

**Custom escape hatch.** For a node graph, a timeline with an active detail card,
or a multi-phase scene, use `type:"custom"` + one component under
`src/scenes/`. `timeline.json` is still the only time source; `check` must pass.
Do not hand-edit timelines.

Gate:

```bash
$PY -m courseforge check courses/<slug>
```

Fix errors before recording. Warnings about length are usually real.

## 5. Audio

```bash
$PY -m courseforge voice courses/<slug>
$PY -m courseforge music courses/<slug>
```

`voice` writes `voice.wav`, `timeline.json`, three SRTs, and syncs the
storyboard into the Remotion project. The timeline is derived from actual audio
length; never hand-edit it.

If edge-tts is offline, fall back to macOS:

```bash
$PY -m courseforge voice courses/<slug> --engine say
```

Listen to or inspect at least: the first line, the fastest line, and the last
line. Check the SRT line count equals the narration line count.

## 6. Assets

```bash
$PY -m courseforge assets search "<subject>"
$PY -m courseforge assets add courses/<slug> <id> --dir img
```

Reuse before generating. When no image fits:

1. Build a prompt sheet: `$PY -m courseforge assets prompt "subject one" "subject two"`.
2. Call `image_generate` with 1536×1024, warm editorial style.
3. Save to the course's `video/remotion/public/img/`.
4. If the image is likely reusable, add it to `asset-library/images/` and
   `manifests/images.json`, then run `$PY -m courseforge assets rebuild`.

Every image prompt ends with: `No text, no watermark, no logos.`

**If `image_generate` fails** (e.g. `fetch failed`, proxy cannot reach the
service):

1. Record the failure in `video/asset-credits.md` and the chapter README; do not
   silently substitute an unrelated stock image.
2. Use already-archived generated images for concrete scenes.
3. For abstract concepts, draw **text-free vector diagrams** (SVG → PNG) and keep
   the generator under `video/art/` so they are reproducible.
4. Keep the same filenames as the planned generated assets; when the service
   returns, overwrite them and re-render without touching scene code.

## 7. Render and QA

```bash
$PY -m courseforge video courses/<slug>   # once
$PY -m courseforge render courses/<slug>
$PY -m courseforge thumbnail courses/<slug>
```

Before the final render, inspect **2–3 stills per scene** (not one):
phase start, phase middle, phase end. Check
[references/visual-qa.md](references/visual-qa.md) for the failure list:
clipped chart labels, subtitle overflow, cards under the subtitle band, an old
scene bleeding through a chapter card, empty half-screens, card graveyards, and
any layout unchanged for more than 8 seconds.
A full render is expensive; catch layout bugs on stills first.

Then:

```bash
$PY -m courseforge package courses/<slug>
```

## 8. Deliver

Report:

- course path and chapter count;
- video path, duration, resolution;
- SRT paths;
- source ledger and asset credits;
- any "未核实" claims or known limitations;
- whether the output is text-only, video-only, or both.

Do not commit generated media. `*.mp4`, `*.wav`, `node_modules/`, `.venv/`,
`.cache/`, and `video/out/publish/` are ignored by the repository. Publish
finished videos as GitHub Release assets; see `scripts/publish-release.sh`.

## Hard rules

1. **No unsourced facts.** A missing citation is a blocker, not a style issue.
2. **No invented numbers.** If a number is illustrative, label it "示意".
3. **No cross-faded scenes.** Chapter cards are opaque; scenes dip to the canvas
   for 8 frames at their own edges. This prevents material bleed.
4. **No text in generated images.** Text belongs in HTML/SVG, not pixels.
5. **No hand-edited timeline.** It must come from real TTS durations.
6. **One concept, one definition.** Update the ledger when you add a concept.
7. **No reused examples.** One example serves one concept.
8. **Every chapter has a cross-domain comparison with a failure boundary.**
9. **Stop at the requested scope.** Do not render a 10-minute video when the user
   asked for an outline.
10. **Do not hard-code this repository's path.** Use `COURSEFORGE_ROOT` or
    `git rev-parse --show-toplevel`.

## Output contract

```
courses/<slug>/
  brief.md
  research/source-ledger.md
  curriculum/00-导读.md, 01-....md
  appendices/A-概念账本.md, B-跨领域思想地图.md, C-术语表.md, D-自测题与答案.md
  video/script/narration.json, storyboard.json
  video/remotion/                 # JSON-driven Remotion project
  video/out/<slug>.mp4
  video/out/poster.jpg
  video/out/subs/<slug>.{zh,en,bilingual}.srt
  video/asset-credits.md
```
