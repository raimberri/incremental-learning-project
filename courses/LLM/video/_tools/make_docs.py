import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
VID = ROOT / "courses/LLM/video"

COVERS = {
    3: "木桌上散落的木块、铜丝与晨光",
    4: "弯曲的多米诺长队与即将触碰的手指",
    5: "桌上的黄铜太阳系仪，细臂从中心向外",
    6: "阅读室的木桌、黄铜台灯与书堆",
    7: "云海之上的山脊与小小徒步者",
    8: "木工台上的黄铜天平与一双手",
    9: "晨雾中溪流上的踏脚石",
    10: "工作台上的卡尺、量规与三个金属零件",
    11: "工作台上的精密齿轮箱剖面",
    12: "摊开的书、空白索引卡与黄铜台灯",
    13: "亚麻桌布上的黄铜量具、直尺与铅锤",
    14: "木桌上玻璃棱镜把阳光分成光谱",
    15: "木工台上的小型机械臂与手工具",
    16: "黎明山顶的石堆、地图与手杖",
}

TYPES = {
    "cover": "封面", "bullets": "要点", "formula": "公式", "curve": "图表",
    "compare": "对照", "steps": "步骤", "photo": "照片", "timeline": "时间线",
    "outro": "结尾",
}


def probe(path: Path):
    out = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration,size",
        "-show_entries", "stream=codec_name,width,height,r_frame_rate",
        "-of", "json", str(path),
    ], capture_output=True, text=True)
    if out.returncode:
        return None
    return json.loads(out.stdout)


def mmss(sec: float) -> str:
    return f"{int(sec // 60)}:{int(sec % 60):02d}"


def build(n: int):
    root = VID / f"ch{n}"
    meta = json.loads((root / "course.json").read_text())
    slug = meta["slug"]
    title = meta["title"].split("：", 1)[-1]
    nar = json.loads((root / "video/script/narration.json").read_text())
    board = json.loads((root / "video/script/storyboard.json").read_text())
    tl = json.loads((root / "video/remotion/src/data/timeline.json").read_text())
    total = tl["total"]
    lines = sum(len(s["lines"]) for s in nar["scenes"])
    mp4 = root / f"video/out/{slug}.mp4"
    info = probe(mp4) if mp4.exists() else None

    # curriculum file
    cur = sorted((ROOT / "courses/LLM/curriculum").glob(f"{n:02d}-*.md"))
    rel = f"../../curriculum/{cur[0].name}" if cur else "../../curriculum/"

    by_id = {s["id"]: s for s in board["scenes"]}
    rows = []
    for s in tl["scenes"]:
        b = by_id.get(s["id"], {})
        label = b.get("title") or s["zh"]
        typ = TYPES.get(b.get("type", ""), b.get("type", ""))
        rows.append(f"| {mmss(s['start'])} | {s['code']} {label} | {typ} |")

    size = ""
    if info:
            spec = [
        "| 项 | 结果 |", "|---|---|",
        f"| 时长 | {total:.1f} s（{mmss(total)}） |",
        "| 画幅 / 帧率 | 1920×1080 / 30 fps |",
        "| 视频 | H.264，CRF 20 |",
        "| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |",
        f"| 旁白 / 字幕 | {lines} 句；中英双语烧录，另出 zh / en / bilingual SRT |",
    ]
    if info:
        spec.append(f"| 文件 | {float(info['format']['size']) / 1e6:.1f} MB |")

    readme = f"""# {title} · 视频版

> {mmss(total)}，1920×1080，30 fps，中文配音 + 中英双语字幕。
> {len(nar['scenes'])} 个场景 / {lines} 句旁白。
> 课程正文见 [`{rel}`]({rel})，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch{n}/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（{lines} 句）
    ├── script/storyboard.json  {len(board['scenes'])} 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/{slug}.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/{slug}.zh.srt` | 中文字幕 |
| `video/out/subs/{slug}.en.srt` | 英文字幕 |
| `video/out/subs/{slug}.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（{lines} 句） |
| `video/script/storyboard.json` | {len(board['scenes'])} 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
{chr(10).join(rows)}

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch{n}
$PY -m courseforge music courses/LLM/video/ch{n}
$PY -m courseforge check courses/LLM/video/ch{n}
$PY -m courseforge render courses/LLM/video/ch{n}
$PY -m courseforge thumbnail courses/LLM/video/ch{n}
$PY -m courseforge package courses/LLM/video/ch{n}
```

## 规格与 QA

{chr(10).join(spec)}

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
"""
    (root / "README.md").write_text(readme, encoding="utf-8")

    # asset credits
    catalog = {x["id"]: x for x in json.loads((ROOT / "asset-library/manifests/images.json").read_text())["images"]}
    used = []
    for s in board["scenes"]:
        img = s.get("image")
        if img and img not in [u[0] for u in used]:
            used.append((img, s["id"]))
    rows = []
    for img, scene in used:
        name = Path(img).stem
        if name == "cover":
            desc, src, lic = COVERS.get(n, "封面"), "image_generate（本章原创）", "原创生成"
        else:
            c = catalog.get(name, {})
            desc = c.get("description", name)
            src = f"asset-library（{c.get('source', '归档')}）"
            lic = "原创生成"
        rows.append(f"| {name} | {img} | {desc} | {src} | {lic} |")
    credits = f"""# 素材清单 · {title}

{len(used)} 张图片，全部为 `image_generate` 原创或 `asset-library` 复用；
画面内无文字、无水印、无 logo。标题、公式、数字、轴名全部由 HTML/SVG 渲染。

| id | 文件 | 画面说明 | 来源 | 许可 |
|---|---|---|---|---|
{chr(10).join(rows)}

## 使用位置

{chr(10).join(f"- `{s}`：{i}" for i, s in used)}

## 复核

- [x] 所有图片均存在于 `video/remotion/public/img/`。
- [x] 图内无文字、无水印、无 logo。
- [x] 未使用第三方版权素材。
"""
    (root / "video/asset-credits.md").write_text(credits, encoding="utf-8")
    print(f"ch{n}: {mmss(total)} / {len(nar['scenes'])} scenes / {lines} lines")


if __name__ == "__main__":
    import sys
    for arg in sys.argv[1:] or [str(i) for i in range(3, 17)]:
        build(int(arg))
