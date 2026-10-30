# 第 9 章 思维链与推理时计算 · 视频版

> 7:36，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 88 句旁白。
> 课程正文见 [`../../curriculum/09-思维链与推理时计算.md`](../../curriculum/09-思维链与推理时计算.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch9/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（88 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch9-cot.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch9-cot.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch9-cot.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch9-cot.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（88 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 09.0 让模型慢下来想 | 封面 |
| 0:29 | 09.1 深度是固定的 | 要点 |
| 1:00 | 09.2 把草稿纸给模型 | 照片 |
| 1:35 | 09.3 多写几步为什么准 | 步骤 |
| 2:10 | 09.4 一句话点火 | 公式 |
| 2:33 | 09.5 多问几遍，投票 | 对照 |
| 3:23 | 09.6 从一条链到一棵树 | 步骤 |
| 3:59 | 09.7 会想，也会动手 | 照片 |
| 4:37 | 09.8 自己学会用工具 | 要点 |
| 5:08 | 09.9 把算力花在想上 | 对照 |
| 5:46 | 09.10 每一步都打分 | 步骤 |
| 6:28 | 09.11 写的不等于想的 | 对照 |
| 7:04 | 09.12 下一站：RLVR | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch9
$PY -m courseforge music courses/LLM/video/ch9
$PY -m courseforge check courses/LLM/video/ch9
$PY -m courseforge render courses/LLM/video/ch9
$PY -m courseforge thumbnail courses/LLM/video/ch9
$PY -m courseforge package courses/LLM/video/ch9
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 456.7 s（7:36） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 88 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 50.1 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
