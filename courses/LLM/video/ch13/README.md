# 第 13 章 评测与幻觉 · 视频版

> 7:25，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 87 句旁白。
> 课程正文见 [`../../curriculum/13-评测与幻觉.md`](../../curriculum/13-评测与幻觉.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch13/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（87 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch13-eval.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch13-eval.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch13-eval.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch13-eval.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（87 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 13.0 评测与幻觉 | 封面 |
| 0:26 | 13.1 分数的鸿沟 | 照片 |
| 0:54 | 13.2 基准的军备竞赛 | 时间线 |
| 1:37 | 13.3 三种评测范式 | 要点 |
| 2:12 | 13.4 裁判也有偏好 | 对照 |
| 2:43 | 13.5 考试泄题 | 步骤 |
| 3:25 | 13.6 构念效度 | 要点 |
| 4:00 | 13.7 一本正经地胡说 | 对照 |
| 4:36 | 13.8 为什么会编 | 要点 |
| 5:12 | 13.9 自信是否可信 | 公式 |
| 5:49 | 13.10 指标成了目标 | 要点 |
| 6:18 | 13.11 四问一条新闻 | 步骤 |
| 6:53 | 13.12 下一站：打开模型 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch13
$PY -m courseforge music courses/LLM/video/ch13
$PY -m courseforge check courses/LLM/video/ch13
$PY -m courseforge render courses/LLM/video/ch13
$PY -m courseforge thumbnail courses/LLM/video/ch13
$PY -m courseforge package courses/LLM/video/ch13
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 445.7 s（7:25） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 87 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 34.6 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
