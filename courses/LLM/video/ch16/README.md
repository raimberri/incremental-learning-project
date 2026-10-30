# 第 16 章 结课 · 视频版

> 6:56，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 12 个场景 / 82 句旁白。
> 课程正文见 [`../../curriculum/16-结课.md`](../../curriculum/16-结课.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch16/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（82 句）
    ├── script/storyboard.json  12 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch16-finale.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch16-finale.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch16-finale.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch16-finale.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（82 句） |
| `video/script/storyboard.json` | 12 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 16.0 山顶上的图 | 封面 |
| 0:32 | 16.1 从词到智能体 | 步骤 |
| 1:16 | 16.2 定律一二三 | 要点 |
| 1:57 | 16.3 定律四五六 | 要点 |
| 2:35 | 16.4 定律七八九 | 要点 |
| 3:15 | 16.5 可靠性是乘法 | 公式 |
| 3:39 | 16.6 只记三件事 | 步骤 |
| 4:13 | 16.7 入门五篇 | 时间线 |
| 4:45 | 16.8 动手五件事 | 步骤 |
| 5:15 | 16.9 还没有答案 | 要点 |
| 5:54 | 16.10 同一件事 | 照片 |
| 6:30 | 16.11 现在，轮到你了 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch16
$PY -m courseforge music courses/LLM/video/ch16
$PY -m courseforge check courses/LLM/video/ch16
$PY -m courseforge render courses/LLM/video/ch16
$PY -m courseforge thumbnail courses/LLM/video/ch16
$PY -m courseforge package courses/LLM/video/ch16
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 416.8 s（6:56） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 82 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 36.5 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
