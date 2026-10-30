# 第 8 章 RLHF 与对齐 · 视频版

> 8:02，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 88 句旁白。
> 课程正文见 [`../../curriculum/08-RLHF与对齐.md`](../../curriculum/08-RLHF与对齐.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch8/
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
| `video/out/llm-ch8-alignment.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch8-alignment.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch8-alignment.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch8-alignment.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（88 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 08.0 会写不等于听话 | 封面 |
| 0:29 | 08.1 两个不同的目标 | 对照 |
| 1:06 | 08.2 为什么不能直接教 | 要点 |
| 1:44 | 08.3 让人类做选择 | 照片 |
| 2:13 | 08.4 把比较变成概率 | 图表 |
| 2:51 | 08.5 RLHF 三步走 | 步骤 |
| 3:36 | 08.6 缰绳：KL 惩罚 | 公式 |
| 4:12 | 08.7 奖励黑客 | 要点 |
| 4:46 | 08.8 小模型赢了大模型 | 对照 |
| 5:19 | 08.9 直接偏好优化 | 公式 |
| 6:10 | 08.10 宪法 AI | 步骤 |
| 6:48 | 08.11 对齐的深层困难 | 要点 |
| 7:34 | 08.12 下一站：思维链 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch8
$PY -m courseforge music courses/LLM/video/ch8
$PY -m courseforge check courses/LLM/video/ch8
$PY -m courseforge render courses/LLM/video/ch8
$PY -m courseforge thumbnail courses/LLM/video/ch8
$PY -m courseforge package courses/LLM/video/ch8
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 482.7 s（8:02） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 88 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 35.6 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
