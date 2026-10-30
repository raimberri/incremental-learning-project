# 第 0 章 导读 · 视频版（v2）

> 6 分 10 秒，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 9 个场景 / 69 句旁白；每个分析概念都有专属视觉。
> 内容对应 [`../../curriculum/00-导读.md`](../../curriculum/00-导读.md)。

## 这一版改了什么

对照 `cc-default-workspace/remotion/llm-ch0-bili` 的逐帧差距与修正清单见
[`video/visual-gap.md`](video/visual-gap.md)。一句话：

- **场景更少，但每场有 2–3 个视觉阶段**，不再「一张卡片挂 40 秒」。
- **每个概念一张图**：四个 why、五个时代、五个模块、四个学科各有自己的视觉。
- **地图/时间轴/模式/方法改成非对称构图**：节点图、主图+侧栏、时间轴+大卡、三列对照。
- **大标题改用宋体**，正文/字幕用无衬线；整体更像讲义，不像 PPT。
- **不做场景交叉淡化**：每场首尾 8 帧淡到画布，章节卡不透明。

## 目录

```text
courses/LLM/video/ch0/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   15 条可核查主张
└── video/
    ├── script/narration.json   逐句中英旁白（69 句）
    ├── script/storyboard.json  9 个 custom 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

课程正文不再复制：直接使用 [`../../curriculum/00-导读.md`](../../curriculum/00-导读.md)。

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch0-orientation.mp4` | 成片（H.264 High + AAC-LC，1920×1080，30 fps） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch0-orientation.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch0-orientation.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch0-orientation.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 视频合同：学习者、范围、视觉硬指标、验收 |
| `research/source-ledger.md` | 15 条可核查主张 + 分期依据 + 图像证据边界 |
| `video/script/narration.json` | 逐句中英旁白（69 句） |
| `video/script/storyboard.json` | 9 个 custom 场景 + 每场用到的图片 |
| `video/visual-gap.md` | 与 Claude 版 / 旧版的差距分析 |
| `video/asset-credits.md` | 22 张素材的来源、类型与许可 |
| `video/remotion/` | 可重建的 Remotion 工程（自定义 scene 组件） |

## 分镜

| 时间 | 场景 | 视觉阶段 |
|---|---|---|
| 0:00 | 开场 | 每天在用 → 内部发生了什么 → 标题 |
| 0:25 | 一句话与下一个词 | 定义 → 雨伞 → 候选打分 → 规模/副产品 |
| 1:20 | 四个为什么 | 四张概念图 → 学完能做到的两件事 |
| 1:58 | 一张地图 | 预测 + 五模块节点图 → 五词高亮 |
| 2:34 | 五个时代 | 时间轴 + 五个时代大卡 → 大致边界 |
| 3:23 | 反复出现的模式 | 三次换件 → 规模曲线 → 预适应 |
| 4:07 | 这门课怎么写 | 重复讲 softmax → 三条规则 → 工作记忆 |
| 4:49 | 跨学科视角 | 四列图 + 失效边界 |
| 5:26 | 下一站 | 三样东西 → 下一章公式 → 第一章标题 |

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

# 旁白 → 时间轴 → SRT → 同步分镜
$PY -m courseforge voice courses/LLM/video/ch0

# 背景音乐必须跟着新的总时长重跑
$PY -m courseforge music courses/LLM/video/ch0

# 前置检查
$PY -m courseforge check courses/LLM/video/ch0

# 渲染与封面（输出到 video/out/）
$PY -m courseforge render courses/LLM/video/ch0
$PY -m courseforge thumbnail courses/LLM/video/ch0
```

## 图片说明

**22 张视觉全部由 `image_generate`（gpt-image-2）生成**，1536×1024，3:2，图内无文字。

第一轮生成时服务返回 `fetch failed`，9 张抽象概念图曾用无文字矢量图兜底；
2026-10-29 服务恢复后已重新生成并替换，当前成片 **0 张矢量图**。
`video/art/` 兜底脚本已删除，成片只保留生成图；「生成图优先、无文字示意图兜底」
的规则仍保留在 `AGENT.MD` 与 `skills/incremental-course/references/visual-qa.md`。

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 369.9 s（6:10） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264 High，CRF 20，yuvj420p（4:2:0） |
| 音频 | AAC-LC 48 kHz 立体声；混音峰值 −0.5 dBFS（无削波） |
| 文件 | 63.0 MB（约 1.36 Mbps） |
| 字幕 | 烧录中英双语；zh / en / bilingual 三份 SRT，各 69 行 |
| 静帧 | 9 场 × 2–3 个阶段抽帧；重点检查 22 张图、四个 why、五个时代 |
| 解码 | `ffmpeg -v error -i ... -f null -` 全片通过 |
