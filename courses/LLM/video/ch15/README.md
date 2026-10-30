# 第 15 章 智能体与前沿 · 视频版

> 7:21，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 85 句旁白。
> 课程正文见 [`../../curriculum/15-智能体与前沿.md`](../../curriculum/15-智能体与前沿.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch15/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（85 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch15-agents.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch15-agents.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch15-agents.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch15-agents.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（85 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 15.0 模型不是智能体 | 封面 |
| 0:29 | 15.1 四拍循环 | 步骤 |
| 1:03 | 15.2 工具是模型的手 | 照片 |
| 1:36 | 15.3 函数调用四步 | 步骤 |
| 2:09 | 15.4 把接工具标准化 | 对照 |
| 2:41 | 15.5 记忆分三层 | 要点 |
| 3:18 | 15.6 分工还是传话 | 对照 |
| 3:55 | 15.7 复合误差 | 公式 |
| 4:31 | 15.8 三条对策 | 要点 |
| 5:02 | 15.9 提示注入 | 步骤 |
| 5:43 | 15.10 前沿几条线 | 时间线 |
| 6:24 | 15.11 本章小结 | 要点 |
| 6:56 | 15.12 下一站：结课 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch15
$PY -m courseforge music courses/LLM/video/ch15
$PY -m courseforge check courses/LLM/video/ch15
$PY -m courseforge render courses/LLM/video/ch15
$PY -m courseforge thumbnail courses/LLM/video/ch15
$PY -m courseforge package courses/LLM/video/ch15
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 441.9 s（7:21） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 85 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 36.5 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
