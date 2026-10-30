import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
VID = ROOT / "courses/LLM/video"


def dur(p: Path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)], capture_output=True, text=True)
    if out.returncode:
        return None
    return float(out.stdout.strip())


def mmss(s):
    return f"{int(s // 60)}:{int(s % 60):02d}"


rows = []
for n in range(0, 17):
    d = VID / f"ch{n}"
    if not d.exists():
        continue
    meta = json.loads((d / "course.json").read_text())
    slug = meta["slug"]
    title = re.sub(r"^第 \d+ 章\s*", "", meta["title"].split("：", 1)[-1])
    mp4 = d / f"video/out/{slug}.mp4"
    sec = dur(mp4) if mp4.exists() else None
    label = f"第 {n} 章"
    rows.append((n, label, title, mmss(sec) if sec else "—", slug, f"ch{n}/README.md"))

body = "\n".join(
    f"| {label} | {title} | {length} | [`mp4`](ch{n}/video/out/{slug}.mp4) | [`说明`]({rel}) |"
    for n, label, title, length, slug, rel in rows
)

text = f"""# LLM 课程 · 视频版

> 第 0–16 章完整视频：同一套 `courseforge` 课程包结构。
> 1920×1080，30 fps，中文配音 + 中英双语字幕；每章 6–8 分钟。

```text
chN/
  course.json  brief.md  README.md
  research/source-ledger.md
  video/
    script/narration.json
    script/storyboard.json
    remotion/           # 可重建工程
    out/                # 唯一交付目录：mp4 + poster + subs
```

课程正文不复制到章节目录，统一使用 `courses/LLM/curriculum/`。

## 全部章节

| 章 | 标题 | 时长 | 成片 | 说明 |
|---|---|---|---|---|
{body}

每章都有 `video/out/subs/*.{{zh,en,bilingual}}.srt` 三份字幕，以及 `video/out/poster.jpg` 封面。

## 统一规格

- 画幅 1920×1080，30 fps；H.264 CRF 20；AAC 48 kHz。
- 中文旁白（edge-tts `zh-CN-XiaoxiaoNeural`），合成背景音乐音量 0.2。
- 字幕：中英双语烧录，另出 zh / en / bilingual 三份 SRT。
- 场景全部由 JSON 分镜驱动；图片为 `image_generate` 原创或 `asset-library` 复用。

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

for ch in ch3 ch4 ch5 ch6 ch7 ch8 ch9 ch10 ch11 ch12 ch13 ch14 ch15 ch16; do
  $PY -m courseforge voice "courses/LLM/video/$ch"
  $PY -m courseforge music "courses/LLM/video/$ch"
  $PY -m courseforge check "courses/LLM/video/$ch"
  $PY -m courseforge render "courses/LLM/video/$ch"
  $PY -m courseforge thumbnail "courses/LLM/video/$ch"
  $PY -m courseforge package "courses/LLM/video/$ch"
done
```

章节说明见各目录的 `README.md`；来源与数字见 `research/source-ledger.md`。
"""
(VID / "README.md").write_text(text, encoding="utf-8")
print("wrote", VID / "README.md")
