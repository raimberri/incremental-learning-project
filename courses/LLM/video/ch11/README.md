# 第 11 章 效率与架构 · 视频版

> 7:50，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 13 个场景 / 89 句旁白。
> 课程正文见 [`../../curriculum/11-效率与架构.md`](../../curriculum/11-效率与架构.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch11/
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
| `video/out/llm-ch11-efficiency.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch11-efficiency.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch11-efficiency.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch11-efficiency.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 本章事实与数字的来源 |
| `video/script/narration.json` | 逐句中英旁白（89 句） |
| `video/script/storyboard.json` | 13 个场景的视觉蓝图 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 图片与素材来源 |

## 分镜

| 时间 | 场景 | 类型 |
|---|---|---|
| 0:00 | 11.0 更便宜地变大 | 封面 |
| 0:29 | 11.1 三个不同的成本 | 要点 |
| 1:04 | 11.2 只唤醒需要的专家 | 步骤 |
| 1:39 | 11.3 存大，算小 | 照片 |
| 2:15 | 11.4 路由的麻烦 | 要点 |
| 2:51 | 11.5 长上下文贵在显存 | 公式 |
| 3:28 | 11.6 三种省法 | 对照 |
| 4:09 | 11.7 少搬，不是少算 | 步骤 |
| 4:55 | 11.8 回看，还是记笔记 | 对照 |
| 5:39 | 11.9 只学一个小补丁 | 公式 |
| 6:15 | 11.10 用更少的位存数 | 要点 |
| 6:48 | 11.11 一条主线：稀疏 | 对照 |
| 7:23 | 11.12 下一站：查资料 | 结尾 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch11
$PY -m courseforge music courses/LLM/video/ch11
$PY -m courseforge check courses/LLM/video/ch11
$PY -m courseforge render courses/LLM/video/ch11
$PY -m courseforge thumbnail courses/LLM/video/ch11
$PY -m courseforge package courses/LLM/video/ch11
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 471.0 s（7:50） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264，CRF 20 |
| 音频 | AAC 48 kHz；中文配音 + 合成音乐（音量 0.2） |
| 旁白 / 字幕 | 89 句；中英双语烧录，另出 zh / en / bilingual SRT |
| 文件 | 45.0 MB |

## 与相邻章节的衔接

上一章与下一章见分镜首尾；本章结尾的 `outro` 指向课程地图中的下一站。
