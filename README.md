# Incremental Learning Project

[简体中文](README.md) · [English](README.en.md)

> 把「我想学 X」变成**一门增量式课程 + 一支讲解视频**的通用生产线。

[![CI](https://github.com/raimberri/incremental-learning-project/actions/workflows/ci.yml/badge.svg)](https://github.com/raimberri/incremental-learning-project/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

这是一个**主题无关**的学习工程：物理、历史、编程、乐器、法律、单篇论文、
一项实操技能，都可以用同一套流程变成「从零可读」的教程和视频。

它不假设你已经懂这个领域，也不假设这个领域有论文。它只要求三件事：

1. **增量**：一个概念只详细讲一次，后文只引用。
2. **有出处**：数字、时间、断言都能回到来源账本。
3. **可复现**：旁白、时间轴、分镜、素材、渲染都能从仓库内的源重建。

## 仓库结构

| 路径 | 内容 |
|---|---|
| `courses/` | 课程归档，一门课一个目录；入口见 [`courses/README.md`](courses/README.md) |
| `courses/LLM/` | 参考实现：17 章正文 + 论文库 + 17 支视频 |
| `courseforge/` | 可复用代码库、课程模板与 Remotion 模板 |
| `asset-library/` | 可复用照片、暖白主题、音乐配方 |
| `skills/incremental-course/` | DSH skill 源文件：给一个概念，按流水线产出课程和视频 |
| `docs/` | 环境配置、Git 媒体策略等说明 |
| `scripts/` | 链接检查、Release 发布等小工具 |
| `AGENT.MD` | 教学与交付的硬性要求 |
| `WORKFLOW.md` | 七阶段工作流、检查点、失败模式 |

## 环境要求

| 组件 | 版本 | 用途 | 检查命令 |
|---|---|---|---|
| Python | 3.10+（CI 使用 3.12） | `courseforge`、测试与脚本 | `python3 --version` |
| Node.js | 20.19+、22.13+ 或 24+ | Remotion 渲染 | `node --version` |
| npm / npx | 随 Node.js 安装 | 安装 Remotion 依赖 | `npm --version` |
| ffmpeg | 5.0+ | 解码 TTS 音频、测量时长、合成音轨 | `ffmpeg -version` |
| Chrome / Chromium | 最新稳定版 | Remotion 渲染（也可自动下载 Chrome Headless Shell） | `make doctor` 的 `chrome` 项 |
| 网络 | — | edge-tts、npm registry、浏览器与合成器下载 | 见故障排查 |

macOS 与 Linux 是主要支持平台；Windows 建议使用 WSL2。完整安装步骤、平台差异、
代理设置与故障排查见 **[`docs/environment.md`](docs/environment.md)**。

### 安装

```bash
git clone https://github.com/raimberri/incremental-learning-project.git
cd incremental-learning-project

make setup          # 创建 .venv，并以 editable 模式安装 courseforge
make doctor         # 检查 Python 依赖、ffmpeg、node/npm/npx、Chrome、Remotion 模板
```

`make setup` 不修改系统 Python，依赖只装在仓库内的 `.venv/`；`make doctor`
只做检查，不会改动系统。

没有 `make` 时，等价命令是：

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -e courseforge
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge doctor
```

`doctor` 全部通过时退出码为 `0`；任一项缺失时退出码为 `1`，并按行列出缺失项。

### 环境变量

| 变量 | 默认值 | 作用 | 何时设置 |
|---|---|---|---|
| `PYTHONPATH` | 未设置 | 让 Python 直接导入 `courseforge/src` | 未执行 `pip install -e courseforge` 时；`make` 已自动设置 |
| `COURSEFORGE_ROOT` | 自动向上查找仓库根 | 定位 `courseforge/templates` | 在仓库外运行 CLI 或 skill 时 |
| `REMOTION_BROWSER` | 自动检测 | 指定 Chrome/Chromium 可执行文件 | 浏览器不在默认路径，或使用 Chromium |
| `npm_config_cache` | `<课程包>/video/remotion/.npm-cache` | npm 缓存目录 | 全局缓存不可写时；`courseforge` 已默认本地化 |
| `DSH_HOME` | `~/.dsh` | skill 安装目录 | 自定义 DSH 数据目录时 |
| `DRY_RUN` | `0` | 发布脚本只打印、不上传 | 预览 Release 附件时 |

`make` 还接受两个变量：`PY`（Python 解释器，默认 `.venv/bin/python`）与
`COURSE`（课程包路径，默认 `courses/LLM`）。

## 快速开始

以下命令都在**仓库根目录**执行。`<course>` 指课程包目录（其中包含
`course.json`），例如 `courses/my-topic`。

### 1. 创建课程包

```bash
export PYTHONPATH=courseforge/src   # 已 pip install -e 时可省略
PY=.venv/bin/python

$PY -m courseforge init courses/my-topic --title "我想学的概念"
```

`init` 会生成 `brief.md`、`research/source-ledger.md`、`curriculum/`、
`appendices/`、`video/script/` 和 `course.json`。先写 brief 与来源账本，再写正文。

### 2. 填写源文件

| 文件 | 写什么 | 完成标准 |
|---|---|---|
| `brief.md` | 学习合同：读者、前置、学完能做什么 | 能写出可验证的动作 |
| `research/source-ledger.md` | 每个数字、时间、断言的来源 | `make research COURSE=...` 通过 |
| `curriculum/`、`appendices/` | 增量式正文、概念账本、自测 | 概念只定义一次，每章有自测 |
| `video/script/narration.json` | 逐句中英旁白与场景顺序 | 场景 id 与分镜一致 |
| `video/script/storyboard.json` | 每个场景的画面类型与配图 | 定量内容有图，路径存在 |

### 3. 生成视频

```bash
$PY -m courseforge video     courses/my-topic   # 复制 Remotion 工程
$PY -m courseforge voice     courses/my-topic   # TTS → voice.wav + timeline.json + 3 份 SRT
$PY -m courseforge music     courses/my-topic   # 合成背景音乐
$PY -m courseforge check     courses/my-topic   # 结构校验；有错返回非 0
$PY -m courseforge render    courses/my-topic   # 渲染 MP4（首次自动 npm install）
$PY -m courseforge thumbnail courses/my-topic   # 渲染封面
$PY -m courseforge package   courses/my-topic   # 收集 MP4 / 封面 / 字幕
```

| 产物 | 位置 |
|---|---|
| 成片 | `video/out/<slug>.mp4` |
| 封面 | `video/out/poster.jpg` |
| 字幕 | `video/out/subs/<slug>.{zh,en,bilingual}.srt` |
| 发布副本 | `video/out/publish/` |
| 时间轴 | `video/remotion/src/data/timeline.json` |

### 4. 修改后重跑

- **改旁白、语速或音色**：重跑 `voice`。TTS 有按文本哈希的缓存，只会重跑变化的句子。
- **只改分镜或配图**：重跑 `sync`（`render` 也会自动同步），再 `render`。
- **改正文**：不需要重新构建视频；正文与视频是两份独立交付物。
- **改标题、语言、合成参数**：编辑 `course.json`。
- **提交前**：运行 `make check COURSE=<course>` 与 `make links`。

## 命令参考

| 命令 | 作用 | 常用参数 |
|---|---|---|
| `init <path> --title <文字>` | 创建课程包 | `--slug`、`--language`、`--var KEY=VALUE`、`--force` |
| `video <course>` | 把 Remotion 模板复制到 `video/remotion/` | `--force` |
| `voice <course>` | 生成配音、时间轴与三份 SRT | `--engine edge\|say`、`--voice`、`--rate` |
| `music <course>` | 合成背景音乐 | `--bpm`、`--seed` |
| `sync <course>` | 把分镜 JSON 同步进 Remotion 工程 | — |
| `check <course>` | 校验 id、场景类型、字幕长度、时长、图片路径 | — |
| `research <course>` | 校验来源账本是否有 URL/DOI | — |
| `render <course>` | 渲染成片 | `--crf`、`--concurrency`、`--preset`、`--out` |
| `still <course> --frame <N>` | 渲染单帧预览 | `--out`、`--composition` |
| `thumbnail <course>` | 渲染封面 | `--out` |
| `package <course>` | 收集发布文件 | — |
| `assets <子命令>` | 素材库：`list`、`search`、`add`、`prompt`、`themes`、`theme`、`rebuild` | 见 `assets --help` |
| `doctor` | 检查本机工具链 | — |

约定：

- 所有命令都相对于仓库根目录执行；课程路径写成 `courses/...`。
- `check`、`research`、`doctor` 失败时返回 `1`，可直接接入 CI。
- 生成的音频、视频、`node_modules/`、缓存不会进入 Git；源文件才是版本化的对象。

## 课程包结构

```text
courses/my-topic/
├── course.json                 课程元数据：slug、标题、语言、合成参数
├── brief.md                    学习合同
├── research/
│   └── source-ledger.md        来源账本
├── curriculum/                 00-导读 + 章节正文
├── appendices/                 概念账本、术语表、自测答案
└── video/
    ├── script/
    │   ├── narration.json      旁白与场景顺序的唯一事实来源
    │   └── storyboard.json     画面的唯一事实来源
    ├── remotion/               JSON 驱动的 Remotion 工程
    └── out/                    MP4、封面、字幕、发布副本
```

`video/script/*.json` 是唯一事实来源。`video/remotion/src/data/` 里的文件由
`voice` 与 `sync` 生成，不要手改。

## 用 AI 生成课程

skill 源文件在 `skills/incremental-course/`。安装或更新：

```bash
./skills/install.sh
```

它会复制到 `${DSH_HOME:-$HOME/.dsh}/skills/incremental-course`；如果当前会话
看不到它，重启 DSH。仓库不在默认位置时，额外设置：

```bash
export COURSEFORGE_ROOT=/path/to/incremental-learning-project
```

在对话里直接说：

> 我想学「光合作用」，做一门 6 章的课，再配一支 8 分钟的视频。

skill 会依次完成：Intake → 来源账本 → 增量式正文 → 逐句旁白/分镜 →
TTS/时间轴/字幕 → 配图 → Remotion 渲染 → 抽帧 QA。你也可以只要正文，
或只要基于现有正文的视频。接口说明见 [`skills/README.md`](skills/README.md)。

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

## 测试与检查

```bash
make test                          # 单元测试
make links                         # 检查 Markdown 相对链接

# 单包课程指向课程根目录；多章课程指向具体的视频包
make check COURSE=courses/LLM/video/ch0
make research COURSE=courses/LLM/video/ch0
```

CI 在每次 push 与 pull request 时运行单元测试与链接检查。

## 常见问题

| 现象 | 处理 |
|---|---|
| `No module named courseforge` | 用 `.venv/bin/python`，并在仓库根目录运行；或设置 `PYTHONPATH=courseforge/src` |
| `doctor` 报 Chrome 缺失 | 安装 Chrome；或在 Remotion 工程内运行 `npx remotion browser ensure`；或设置 `REMOTION_BROWSER` |
| edge-tts 超时 / 403 | 检查网络或代理；macOS 可改用 `--engine say` |
| `npm install` 缓存权限错误 | 已默认使用课程内缓存；仍失败时设置 `npm_config_cache=$PWD/.npm-cache` |
| 渲染结果中文变方块 | 安装 Noto Sans CJK（Linux）或确认系统中文字体可用 |
| `bad interpreter` / venv 被移动 | 删除 `.venv/`，重新运行 `make setup` |

更多症状、原因与修复见 [`docs/environment.md`](docs/environment.md)。

## Git 与媒体策略

这个仓库是**源仓库**，不是成品网盘：

- 提交：正文、附录、brief、来源账本、旁白/分镜 JSON、Remotion 源码、
  小图、封面、SRT、模板与脚本。
- 不提交：`*.mp4`、`*.wav`、`node_modules/`、`.venv/`、`__pycache__/`、
  `.cache/`、日志、`video/out/publish/`。
- 成片通过 GitHub Release 发布：`scripts/publish-release.sh`。

规则与迁移方法见 [`docs/git-and-media.md`](docs/git-and-media.md)。

## 文档索引

| 文档 | 内容 |
|---|---|
| [`docs/environment.md`](docs/environment.md) / [`docs/environment.en.md`](docs/environment.en.md) | 环境配置、平台差异、网络与故障排查 |
| [`WORKFLOW.md`](WORKFLOW.md) | 七阶段工作流、检查点、失败模式 |
| [`AGENT.MD`](AGENT.MD) | 不可让步的验收条件 |
| [`courseforge/README.md`](courseforge/README.md) | 代码库、命令与数据契约 |
| [`courses/README.md`](courses/README.md) | 课程归档规范与目录形态 |
| [`skills/README.md`](skills/README.md) | skill 的安装与使用 |
| [`docs/git-and-media.md`](docs/git-and-media.md) | Git 与媒体发布策略 |

## 许可

代码与文档以 [MIT](LICENSE) 发布。课程正文与视频中的第三方图片/音乐，
许可见各课程的 `video/asset-credits.md`。
