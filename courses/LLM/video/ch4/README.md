# 第 4 章 从 RNN 到注意力 · 视频版

> 7:13，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 82 句旁白。
> 课程正文见 [`../../curriculum/04-从RNN到注意力.md`](../../curriculum/04-从RNN到注意力.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch4/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（82 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch4-attention.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch4-attention.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch4-attention.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch4-attention.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（82 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 04.0 读到第五十个词 | 封面 |
| 0:29 | 04.1 逐词处理不够 | 要点 |
| 1:01 | 04.2 记忆变成循环 | 公式 |
| 1:39 | 04.3 展开成深图 | 照片 |
| 2:07 | 04.4 消失与爆炸 | 对照 |
| 2:46 | 04.5 给记忆装门 | 公式 |
| 3:24 | 04.6 三门与一条记忆 | 步骤 |
| 3:57 | 04.7 整句压成一个向量 | 对照 |
| 4:29 | 04.8 每一步都回看 | 步骤 |
| 5:10 | 04.9 查询、键、值 | 公式 |
| 5:43 | 04.10 可微的软检索 | 要点 |
| 6:15 | 04.11 为什么能并行 | 对照 |
| 6:48 | 04.12 不要循环了 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch4
$PY -m courseforge music courses/LLM/video/ch4
$PY -m courseforge check courses/LLM/video/ch4
$PY -m courseforge render courses/LLM/video/ch4
$PY -m courseforge thumbnail courses/LLM/video/ch4
$PY -m courseforge package courses/LLM/video/ch4
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 433.2 s（7:13） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 82 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 43.1 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
