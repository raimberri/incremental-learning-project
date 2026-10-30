# 第 5 章 Transformer · 视频版

> 7:50，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 90 句旁白。
> 课程正文见 [`../../curriculum/05-Transformer.md`](../../curriculum/05-Transformer.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch5/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（90 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch5-transformer.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch5-transformer.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch5-transformer.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch5-transformer.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（90 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 05.0 只靠注意力 | 封面 |
| 0:29 | 05.1 同一句话内部互看 | 要点 |
| 1:06 | 05.2 它到底指谁 | 对照 |
| 1:41 | 05.3 一行公式 | 公式 |
| 2:23 | 05.4 把 64 代进去 | 步骤 |
| 2:58 | 05.5 尖到没有梯度 | 图表 |
| 3:33 | 05.6 同时看几种关系 | 照片 |
| 4:10 | 05.7 不许看右边 | 对照 |
| 4:49 | 05.8 补上顺序 | 要点 |
| 5:22 | 05.9 一个层的流水线 | 步骤 |
| 6:08 | 05.10 代价是平方 | 照片 |
| 6:43 | 05.11 两个误解 | 要点 |
| 7:18 | 05.12 下一站：预训练 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch5
$PY -m courseforge music courses/LLM/video/ch5
$PY -m courseforge check courses/LLM/video/ch5
$PY -m courseforge render courses/LLM/video/ch5
$PY -m courseforge thumbnail courses/LLM/video/ch5
$PY -m courseforge package courses/LLM/video/ch5
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 470.2 s（7:50） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 90 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 50.6 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
