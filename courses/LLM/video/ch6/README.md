# 第 6 章 预训练 · 视频版

> 7:30，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 86 句旁白。
> 课程正文见 [`../../curriculum/06-预训练.md`](../../curriculum/06-预训练.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch6/
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
| `video/out/llm-ch6-pretraining.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch6-pretraining.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch6-pretraining.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch6-pretraining.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（86 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 06.0 先读万卷书 | 封面 |
| 0:31 | 06.1 瓶颈在数据 | 要点 |
| 1:01 | 06.2 让文本自己出题 | 步骤 |
| 1:34 | 06.3 两条路线 | 对照 |
| 2:03 | 06.4 先预训练，再微调 | 步骤 |
| 2:41 | 06.5 BERT 的配方 | 要点 |
| 3:13 | 06.6 双向的强与弱 | 公式 |
| 3:48 | 06.7 只写提示 | 照片 |
| 4:26 | 06.8 通识与职业培训 | 对照 |
| 5:10 | 06.9 为什么是自回归 | 步骤 |
| 5:53 | 06.10 范式的代价 | 要点 |
| 6:26 | 06.11 一个转向 | 时间线 |
| 7:03 | 06.12 下一站：规模定律 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch6
$PY -m courseforge music courses/LLM/video/ch6
$PY -m courseforge check courses/LLM/video/ch6
$PY -m courseforge render courses/LLM/video/ch6
$PY -m courseforge thumbnail courses/LLM/video/ch6
$PY -m courseforge package courses/LLM/video/ch6
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 450.8 s（7:30） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 86 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 34.6 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
