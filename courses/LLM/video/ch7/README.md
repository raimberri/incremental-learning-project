# 第 7 章 规模定律 · 视频版

> 6:48，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 81 句旁白。
> 课程正文见 [`../../curriculum/07-规模定律.md`](../../curriculum/07-规模定律.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch7/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   可核查来源账本
└── video/
    ├── script/narration.json   逐句中英旁白（81 句）
    ├── script/storyboard.json  13 个 JSON 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch7-scaling.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch7-scaling.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch7-scaling.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch7-scaling.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（81 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 07.0 大力出奇迹的边界 | 封面 |
| 0:31 | 07.1 一千七百五十亿 | 照片 |
| 1:00 | 07.2 不更新参数的学习 | 步骤 |
| 1:30 | 07.3 把大写成幂律 | 公式 |
| 2:06 | 07.4 双对数是一条直线 | 对照 |
| 2:36 | 07.5 从赌博到估算 | 步骤 |
| 3:06 | 07.6 配比被改写 | 对照 |
| 3:43 | 07.7 一次手算 | 公式 |
| 4:11 | 07.8 突然会了 | 图表 |
| 4:47 | 07.9 突然被测出来 | 对照 |
| 5:24 | 07.10 四个天花板 | 要点 |
| 5:57 | 07.11 两个不等于 | 对照 |
| 6:23 | 07.12 下一站：对齐 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch7
$PY -m courseforge music courses/LLM/video/ch7
$PY -m courseforge check courses/LLM/video/ch7
$PY -m courseforge render courses/LLM/video/ch7
$PY -m courseforge thumbnail courses/LLM/video/ch7
$PY -m courseforge package courses/LLM/video/ch7
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 408.7 s（6:48） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 81 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 40.5 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
