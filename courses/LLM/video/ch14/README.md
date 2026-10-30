# 第 14 章 机制可解释性 · 视频版

> 7:19，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 89 句旁白。
> 课程正文见 [`../../curriculum/14-机制可解释性.md`](../../curriculum/14-机制可解释性.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch14/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（89 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch14-interpretability.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch14-interpretability.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch14-interpretability.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch14-interpretability.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（89 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 14.0 它做对了，然后呢 | 封面 |
| 0:28 | 14.1 做对不等于看懂 | 对照 |
| 0:57 | 14.2 三个层次 | 步骤 |
| 1:32 | 14.3 多义神经元 | 要点 |
| 2:01 | 14.4 把特征挤进去 | 公式 |
| 2:40 | 14.5 把叠加拆开 | 公式 |
| 3:15 | 14.6 玩具模型上的实验 | 步骤 |
| 3:48 | 14.7 照抄前文的电路 | 照片 |
| 4:33 | 14.8 三件常用工具 | 要点 |
| 5:08 | 14.9 改一个事实 | 步骤 |
| 5:39 | 14.10 黑箱只开了条缝 | 要点 |
| 6:19 | 14.11 能替代评测吗 | 对照 |
| 6:48 | 14.12 下一站：智能体 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch14
$PY -m courseforge music courses/LLM/video/ch14
$PY -m courseforge check courses/LLM/video/ch14
$PY -m courseforge render courses/LLM/video/ch14
$PY -m courseforge thumbnail courses/LLM/video/ch14
$PY -m courseforge package courses/LLM/video/ch14
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 439.1 s（7:19） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 89 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 35.5 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
