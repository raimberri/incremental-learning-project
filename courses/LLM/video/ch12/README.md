# 第 12 章 RAG 与长上下文 · 视频版

> 7:54，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 86 句旁白。
> 课程正文见 [`../../curriculum/12-RAG与长上下文.md`](../../curriculum/12-RAG与长上下文.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch12/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（86 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch12-rag.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch12-rag.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch12-rag.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch12-rag.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（86 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 12.0 开卷与长记忆 | 封面 |
| 0:27 | 12.1 模型不知道的 | 要点 |
| 0:59 | 12.2 两种记忆 | 对照 |
| 1:40 | 12.3 开卷与闭卷 | 照片 |
| 2:12 | 12.4 六个步骤 | 步骤 |
| 2:49 | 12.5 切块像摘录 | 照片 |
| 3:19 | 12.6 比一比夹角 | 公式 |
| 3:56 | 12.7 为什么还要重排 | 对照 |
| 4:41 | 12.8 把窗口开大 | 要点 |
| 5:16 | 12.9 中间最容易丢 | 图表 |
| 5:54 | 12.10 成本结构不同 | 对照 |
| 6:42 | 12.11 工程四个坑 | 要点 |
| 7:29 | 12.12 下一章：评测 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch12
$PY -m courseforge music courses/LLM/video/ch12
$PY -m courseforge check courses/LLM/video/ch12
$PY -m courseforge render courses/LLM/video/ch12
$PY -m courseforge thumbnail courses/LLM/video/ch12
$PY -m courseforge package courses/LLM/video/ch12
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 474.9 s（7:54） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 86 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 38.5 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
