# 第 10 章 RLVR 与推理模型 · 视频版

> 7:21，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 87 句旁白。
> 课程正文见 [`../../curriculum/10-RLVR与推理模型.md`](../../curriculum/10-RLVR与推理模型.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch10/
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
| `video/out/llm-ch10-rlvr.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch10-rlvr.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch10-rlvr.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch10-rlvr.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（87 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 10.0 不教，也能会想 | 封面 |
| 0:27 | 10.1 换一种奖励 | 对照 |
| 1:00 | 10.2 验证器不讨好 | 照片 |
| 1:29 | 10.3 几乎不教 | 步骤 |
| 2:01 | 10.4 顿悟时刻 | 图表 |
| 2:39 | 10.5 省掉评论家 | 公式 |
| 3:22 | 10.6 四阶段配方 | 步骤 |
| 3:59 | 10.7 冷启动与拒绝采样 | 要点 |
| 4:31 | 10.8 把想的能力传下去 | 对照 |
| 5:06 | 10.9 不是突然觉醒 | 要点 |
| 5:35 | 10.10 代价与边界 | 照片 |
| 6:18 | 10.11 三条路线 | 对照 |
| 6:50 | 10.12 下一站：效率 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch10
$PY -m courseforge music courses/LLM/video/ch10
$PY -m courseforge check courses/LLM/video/ch10
$PY -m courseforge render courses/LLM/video/ch10
$PY -m courseforge thumbnail courses/LLM/video/ch10
$PY -m courseforge package courses/LLM/video/ch10
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 441.5 s（7:21） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 87 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 40.8 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
