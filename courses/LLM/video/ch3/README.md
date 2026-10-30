# 第 3 章 词的数字分身 · 视频版

> 6:28，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 82 句旁白。
> 课程正文见 [`../../curriculum/03-表示学习.md`](../../curriculum/03-表示学习.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch3/
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
| `video/out/llm-ch3-representation.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch3-representation.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch3-representation.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch3-representation.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（82 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 03.0 词的数字分身 | 封面 |
| 0:26 | 03.1 编号的代价 | 要点 |
| 0:54 | 03.2 观其伴，知其义 | 照片 |
| 1:25 | 03.3 让模型猜上下文 | 步骤 |
| 2:00 | 03.4 语义变成位移 | 公式 |
| 2:24 | 03.5 把多分类改成二分类 | 对照 |
| 2:49 | 03.6 语义为什么长出来 | 步骤 |
| 3:21 | 03.7 词怎么切 | 步骤 |
| 3:57 | 03.8 一个词，几个意思？ | 对照 |
| 4:29 | 03.9 嵌入就是一个矩阵 | 公式 |
| 4:59 | 03.10 缺了顺序 | 公式 |
| 5:32 | 03.11 遗产与陷阱 | 要点 |
| 6:05 | 03.12 下一站：注意力 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch3
$PY -m courseforge music courses/LLM/video/ch3
$PY -m courseforge check courses/LLM/video/ch3
$PY -m courseforge render courses/LLM/video/ch3
$PY -m courseforge thumbnail courses/LLM/video/ch3
$PY -m courseforge package courses/LLM/video/ch3
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 388.0 s（6:28） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 82 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 34.6 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
