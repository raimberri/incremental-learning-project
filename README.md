# Incremental Learning Project

> 把「我想学 X」变成**一门增量式课程 + 一支讲解视频**的通用生产线。

[![CI](https://github.com/raimberri/incremental-learning-project/actions/workflows/ci.yml/badge.svg)](https://github.com/raimberri/incremental-learning-project/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

这是一个**主题无关**的学习工程：物理、历史、编程、乐器、法律、单篇论文、
一项实操技能，都可以用同一套流程变成「从零可读」的教程和视频。

它不假设你已经懂这个领域，也不假设这个领域有论文。它只要求三件事：

1. **增量**：一个概念只详细讲一次，后文只引用。
2. **有出处**：数字、时间、断言都能回到来源账本。
3. **可复现**：旁白、时间轴、分镜、素材、渲染都能从仓库内的源重建。

## 三样可复用的东西

- **`courseforge/`**：脚手架、来源账本校验、旁白/TTS/时间轴、音乐、素材库、
  JSON 驱动的 Remotion 渲染。
- **`asset-library/`**：可复用照片、暖白主题、音乐配方。
- **`skills/incremental-course/`**：一个 DSH skill；给它一个概念，它按流水线
  产出课程和视频。

## 仓库地图

```text
courses/                    课程归档：一门课一个目录（见 courses/README.md）
  LLM/                      参考实现：17 章 + 论文库 + 17 支视频
courseforge/                可复用代码库 + Remotion 模板
asset-library/              可复用照片 / 主题 / 音乐配方
skills/incremental-course/  DSH skill（源文件）
docs/                       架构、Git 媒体策略、发布流程
scripts/                    链接检查、Release 发布等小工具
AGENT.MD                    教学与交付的硬性要求
WORKFLOW.md                 七阶段工作流、检查点、失败模式
```

## 七阶段

| 阶段 | 产出 | 检查点 |
|---|---|---|
| **Intake** | `brief.md` | 学完能做到什么？写不出可验证动作就回去改 |
| **Research** | `research/source-ledger.md` | 每个数字有来源；争议并列；无编造编号 |
| **Curriculum** | `curriculum/` + `appendices/` | 概念只定义一次；每章有自测；前置清楚 |
| **Video blueprint** | `narration.json` + `storyboard.json` | id 对齐；定量内容有图；每场 2–3 个视觉阶段 |
| **Audio** | `voice.wav`、`timeline.json`、3 份 SRT | 时间轴来自真实音频；SRT 行数一致 |
| **Visuals + Render** | `video/out/*.mp4`、`poster.jpg` | 抽帧无重叠/裁切/字幕挡内容；整片解码通过 |
| **Publish** | Release 附件 + 课程索引 | 仓库无媒体中间件；链接可解析 |

细节见 [`WORKFLOW.md`](WORKFLOW.md)；不可让步的验收条件见 [`AGENT.MD`](AGENT.MD)。

## 快速开始

要求：Python 3.10+、ffmpeg、Node.js 18+、Chrome（Remotion 渲染）、
可访问 edge-tts 的网络。

```bash
git clone https://github.com/raimberri/incremental-learning-project.git
cd incremental-learning-project

make setup          # 创建 .venv 并安装 courseforge
make doctor         # 检查 ffmpeg / node / Chrome / edge-tts / 模板

export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge init courses/my-topic --title "我想学的概念"
# 编辑 brief.md → research/ → curriculum/ → video/script/
$PY -m courseforge video   courses/my-topic
$PY -m courseforge voice   courses/my-topic
$PY -m courseforge music   courses/my-topic
$PY -m courseforge check   courses/my-topic
$PY -m courseforge render  courses/my-topic
$PY -m courseforge thumbnail courses/my-topic
$PY -m courseforge package courses/my-topic
```

已有一个可跑的最小示例：
[`courseforge/examples/entropy-mini`](courseforge/examples/entropy-mini)。

## 用 AI 生成一门新课

skill 已安装到 `~/.dsh/skills/incremental-course`（源文件在
`skills/incremental-course/`）。如果当前会话看不到它，重启 DSH 或运行
`./skills/install.sh`。

在对话里直接说：

> 我想学「光合作用」，做一门 6 章的课，再配一支 8 分钟的视频。

skill 会依次完成：Intake → 来源账本 → 增量式正文 → 逐句旁白/分镜 →
TTS/时间轴/字幕 → 配图 → Remotion 渲染 → 抽帧 QA。你也可以只要正文，
或只要基于现有正文的视频。

## 参考实现：LLM 课程

[`courses/LLM/`](courses/LLM/) 是本流水线的第一个完整课程，用来演示规模上限：

| 项 | 规模 |
|---|---|
| 正文 | 17 章（00 导读 + 01–16） |
| 资料库 | 57 篇关键论文，6 个主题分卷 |
| 附录 | 概念账本、跨领域地图、术语表、自测答案 |
| 视频 | 17 支，每支 6–9 分钟；中文配音 + 中英字幕 |

课程视频不作为 Git 对象提交，而是发布在
[Releases](https://github.com/raimberri/incremental-learning-project/releases)。
正文、论文索引、旁白、分镜和可重建的 Remotion 工程都在仓库里。

**LLM 的章节标题、例子和配图不是通用规范。** 新课程可以只有 1 章、3 张图、
1 支 6 分钟视频。

## Git 与媒体策略

这个仓库是**源仓库**，不是成品网盘：

- 提交：正文、附录、brief、来源账本、旁白/分镜 JSON、Remotion 源码、
  小图、封面、SRT、模板与脚本。
- 不提交：`*.mp4`、`*.wav`、`node_modules/`、`.venv/`、`__pycache__/`、
  `.cache/`、日志、`video/out/publish/`。
- 成片通过 GitHub Release 发布：`scripts/publish-release.sh`。

规则与迁移方法见 [`docs/git-and-media.md`](docs/git-and-media.md)。

## 测试与检查

```bash
make test                       # 单元测试
make links                      # 检查 Markdown 相对链接
make check COURSE=courses/LLM   # 课程结构/字幕/时长检查
```

CI 在每次 push 时跑单元测试与链接检查。

## 许可

代码与文档以 [MIT](LICENSE) 发布。课程正文与视频中的第三方图片/音乐，
许可见各课程的 `video/asset-credits.md`。
