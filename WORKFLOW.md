# 从「我想学 X」到成片：可复用工作流

这是一条把**任何一个概念**变成**一门课 + 一支教学视频**的生产线。它由四层组成：

1. **内容层**：来源账本 → 课程正文 → 概念账本 → 自测题。
2. **脚本层**：逐句旁白 + 分镜蓝图。
3. **媒体层**：edge-tts 配音、时间轴、字幕、合成音乐、`image_generate` 素材。
4. **视频层**：JSON 驱动的 Remotion 模板 → MP4 + 封面。

每一层都有明确的输入、输出和检查点。上一层的检查不过，不要进入下一层。
课程规模由 `brief.md` 决定：可以是 1 章短片，也可以是 5–10 章的完整课程。

批量生产时还有一条**调度层**（§8）：决定哪些步骤可以并行、哪些必须独占。

> 本文件讲「怎么做」。不可让步的验收条件见 [`AGENT.MD`](AGENT.MD)；
> 给 AI 调用的精简版见 [`skills/incremental-course/SKILL.md`](skills/incremental-course/SKILL.md)。

---

## 0. Intake：把「想学」变成可执行的简报

**目标**：确定学习者、起点、终点、范围和交付形式。

**输出**：`brief.md`

必须回答：

| 问题 | 通用示例 |
|---|---|
| 谁学？ | 完全没接触过这个主题、但会使用电脑的人 |
| 起点是什么？ | 无前置；或「会初中数学，没写过代码」 |
| 学完能做到什么？ | 能用自己的话解释核心机制；能判断一条相关说法是否夸大 |
| 必须讲什么？ | 3–6 个不可回避的概念、一条主线、一个可复现的例子 |
| 明确不讲什么？ | 相邻但与本课目标无关的专题 |
| 多长？ | 1 章短片，或 5–10 章正文 + 每章 6–10 分钟视频 |
| 什么语言？ | 中文正文 + 中英双语字幕（可按用户要求替换） |
| 交付什么？ | 只要正文 / 只要视频 / 正文 + 视频 + 字幕后 |

**检查点**：如果「学完能做到什么」写不出可验证的动作，说明范围还没想清楚。

**常见失败**：一开始就写正文，写到一半才发现目标读者、篇幅和交付形式都没定。

---

## 1. Research：先建来源账本，再写正文

**目标**：把事实、数字、时间线和争议分开，避免把新闻、博客、个人观点混为一谈。

**输出**：

- `research/source-ledger.md`：一行一个可核查主张。
- `papers/`：关键论文/标准卡片 + BibTeX（仅论文型课程需要）。
- `assets/timeline.txt`：一张 ASCII 时间线（历史型课程可选）。

**做法**：

1. 先按主题类型找 3–5 个权威综述/教材/官方文档，建立骨架。
2. 再找 10–20 个一手来源（论文、标准、源码、档案、实践记录）补细节。
3. 每个数字回到原始来源；找不到就写「未核实」。
4. 区分材料类型：论文结论、官方文档、标准、数据、新闻报道、个人观点。
5. 记录「为什么重要」，不要只抄摘要。
6. 有争议的主题，主动找反方，并并列呈现。

**检查点**：

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge research <course>
```

- 每条主张有来源和 URL/DOI/标准编号。
- 时间线里的年份与「首次公开」一致。
- 有争议的结论标了「有争议」。
- 没有编造的编号、页码或引文。

**常见失败**：先写正文再补引用，最后变成「结论找证据」。

---

## 2. Curriculum：增量式课程，而不是资料汇编

**目标**：让一个外行按顺序读下去，每个概念只学一次。

**输出**：

```
curriculum/00-导读.md
curriculum/01-....md
...
appendices/A-概念账本.md
appendices/B-跨领域思想地图.md
appendices/C-术语表.md
appendices/D-自测题与答案.md
```

**章节模板**：

1. 本章新增 / 前置 / 对应资料
2. 一个具体问题开场
3. 定义（只定义一次）
4. 机制（输入 → 过程 → 输出）
5. 一个可手算/可手推/可实操的例子
6. 常见误解
7. 小结
8. 3 道自测
9. 下一章

**增量式三条规则**：

1. **一次定义，终身引用**：每个概念登记进 `A-概念账本.md`。
2. **先写「新增」与「前置」**：读者知道这一章需要什么。
3. **例子不复用**：每个例子只服务一个概念，避免记忆混淆。

**跨领域对照**：每章至少一条，写清「同构点」与「失效边界」；汇总到附录 B。

**检查点**：

- 导读里的课程地图与章节文件一一对应。
- 概念账本没有重复定义。
- 每章有自测，答案在附录 D。
- 术语表覆盖第一次出现的术语。
- 每章至少一条跨领域对照。
- 所有 `§N.x` 引用都真实存在。

**常见失败**：

- 先下定义，再补一个「问题」当开场；读者没有动机。
- 第 4 章又把第 1 章的概念解释一遍，因为第 1 章没讲清。
- 例子只是装饰，不承载机制。
- 小结引入了一个从未讲过的新概念。

---

## 3. Video blueprint：逐句旁白 + 分镜 JSON

**目标**：把一章正文压成 6–10 分钟、8–10 个场景、60–100 句的讲解。

**输出**：

- `video/script/narration.json`
- `video/script/storyboard.json`

### 3.1 旁白

```json
{
  "voice": "zh-CN-XiaoxiaoNeural",
  "rate": "+0%",
  "scenes": [
    {"id": "intro", "code": "00", "zh": "开场", "en": "INTRO",
     "lines": [["中文一句。", "One English sentence."]]}
  ]
}
```

规则：

- 一句只讲一个意思；中文 20–40 字，英文不超过 110 字符。
- 口语化，但数字、单位、条件不能省。
- 先给直觉，再给定义/公式，再给例子。
- 每句都要能在画面上找到一个「落点」。
- 术语与正文一致，不要换同义词。

### 3.2 分镜

`storyboard.json` 只描述画面，不写 TSX。支持 9 种内置场景：

| type | 用途 |
|---|---|
| `cover` | 章节开场：标题、关键词、照片 |
| `bullets` | 2–4 个并列概念 |
| `formula` | 一个公式/规则 + 逐条读法 |
| `curve` | 定量关系：`neglog` / `sigmoid` / `gap` / `bars` |
| `compare` | 两种观点/两代方法/两个案例 |
| `steps` | 2–4 步流程 |
| `photo` | 照片 + 要点 |
| `timeline` | 3–6 个历史节点或阶段 |
| `outro` | 下一章预告 |

详细 schema 见 `courseforge/templates/remotion/STORYBOARD.md`。

**定量内容规则**：

- 如果概念有一个「形状」（随参数上升/下降/饱和/分叉），画出来，并标至少两个点。
- 如果概念可以分解成「基础 + 增量」，用 `gap` 把增量画成面积。
- 如果是概率、阈值或 S 形响应，用 `sigmoid`，至少画三条参数曲线。
- 如果是类别分布或对比，用 `bars`；保证每一类都有标签。
- 所有示意图标注「示意」；所有轴有名字和单位。
- 图内不写文字；标题、数字、轴名、标签全部在 HTML/SVG。

### 3.3 视觉密度

- 每个分析概念一张专属图；不要用一张照片撑完整场。
- 每场 2–3 个视觉阶段；同一版式不超过 8 秒。
- 至少一种非对称构图：主图+侧栏、时间轴+详情卡、节点图、三/四列对照。
- 不要「卡片坟场」：一排等宽卡片加 40% 空白底部。
- 不要半屏空：后到的元素要么整组出现，要么在上一拍就出现。
- 九种内置类型不够时，用 `type: "custom"` + 一个组件；`timeline.json` 仍是
  唯一时间源，`check` 必须通过。

### 3.4 检查点

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge check <course>
```

- 场景 id 与旁白一致。
- 字幕长度不超限。
- 时长在 90 秒–20 分钟之间。
- `photo` 引用的图片存在。
- 定量场景有坐标轴、单位与「示意」标注。

---

## 4. Audio：配音、时间轴、字幕、音乐

**目标**：让画面跟着声音走，而不是让声音追画面。

**命令**：

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge voice <course>
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge music <course>
```

**voice 做什么**：

1. 逐句 edge-tts 合成，按「音色 + 语速 + 文本」哈希缓存。
2. 用 ffmpeg 解码为 48 kHz 单声道，裁掉引擎首尾静音。
3. 按固定句间停顿拼成 `voice.wav`。
4. 从真实音频长度反推 `timeline.json`（全片唯一时间源）。
5. 导出 `zh` / `en` / `bilingual` 三份 SRT（语言对按 brief）。
6. 把 `storyboard.json` 同步进 Remotion 工程。

**music 做什么**：

- 合成一段不抢人声的暖色背景垫 + 场景切点 whoosh。
- 以 `musicVolume=0.2` 混入，保证人声优先。
- 音乐长度必须覆盖成片；改了旁白就要重跑 music。

**检查点**：

- `voice.wav` 峰值约 −1 dBFS。
- `music.wav` 时长 ≥ 视频时长。
- SRT 行数与 `narration.json` 一致。
- 字幕与画面落点对齐（抽 3 个场景看静帧）。
- 首句、最快句、末句都能听清。

**常见失败**：

- 手改 `timeline.json`，下次 `voice` 就被覆盖。
- 改了一句旁白却没重跑 `voice`，音画不同步。
- 背景音乐比人声响，观众听不清术语。

---

## 5. Visual assets：先复用，再生成

**目标**：照片服务解释，不抢解释。

**素材库**：

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets search <subject>
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge assets add <course> <id> --dir img
```

**缺图时**：

1. 用 `courseforge assets prompt "..."` 生成统一风格的 prompt。
2. 调 `image_generate`，尺寸 1536×1024，3:2。
3. 保存到课程 `video/remotion/public/img/`；如果可复用，再进素材库。
4. 提示词统一以 `No text, no watermark, no logos.` 结尾。
5. 一张图只服务一个概念；比喻要在旁白或图注里说明「在哪里失效」。

**视觉规则**：

- 暖白画布、白色圆角卡片、单一章节强调色。
- 照片 3:2，圆角 22 px，慢推近。
- 章节卡不透明；场景之间不做交叉淡化，避免上一场素材透出。
- 场景首尾 8 帧淡到画布。
- 页眉常驻；字幕深色圆角框，主语言在上、译文在下。

**图片服务失败时**：

1. 记录失败，不要静默换成无关图。
2. 具体场景用已归档的生成素材。
3. 抽象概念画无文字矢量图（SVG → PNG），生成脚本放 `video/art/`。
4. 保持计划中的文件名；服务恢复后覆盖同名文件再渲染。

---

## 6. Render：Remotion 模板 + 静帧 QA

> 一次只跑一路渲染。多章批产的调度、实测帧率与队列脚本见 §8。

**命令**：

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge video <course>
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge render <course>
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge thumbnail <course>
```

**流程**：

1. `video` 复制 JSON 驱动的 Remotion 模板。
2. `voice` / `music` 生成媒体。
3. `render` 调用 `npx remotion render CourseVideo`。
4. 每个场景至少抽两帧（阶段切换前后）：标题溢出、卡片重叠、图表标签被裁、
   字幕挡内容、半屏空、卡片坟场。
5. 抽 2–3 个转场帧，确认没有上一场素材透出；章节卡必须不透明。
6. 听 3 段音频：开场、最快语速段、结尾。

**成片规格**：

- 1920×1080，30 fps，H.264 CRF 20，AAC 48 kHz。
- 双语字幕烧录，同时导出 SRT。
- 封面 1920×1080，标题不超过 12 字。

**常见失败**：

- 场景交叉淡化，上一场照片透进章节卡。
- 公式太长换行；长公式要降字号、`whiteSpace: nowrap`。
- 曲线点标签在右边缘被裁；用 `anchor:"end"` + 负 `dx`。
- 静态数字提前出现，画面像坏了；所有静态元素按 cue 出现。
- 分镜与旁白 id 不一致，渲染时才报错；先跑 `check`。

---

## 7. Publish：把成片、字幕、来源一起交付

**输出**：

```
video/out/publish/
  <slug>.mp4
  poster.jpg
  <slug>.zh.srt
  <slug>.en.srt
  <slug>.bilingual.srt
  README.md
```

同时在课程根目录保留：

- `research/source-ledger.md`：可核查。
- `video/asset-credits.md`：每张图的来源。
- `curriculum/`：可继续改写的正文。

**Git 发布策略**：

- 仓库只提交源文件、封面、SRT、小图；`*.mp4` / `*.wav` 由 `.gitignore` 排除。
- 成片作为 GitHub Release 附件发布。脚本见 `scripts/publish-release.sh`。
- 发布前确认：`git status --short` 没有媒体中间件；`git ls-files` 没有
  `node_modules`、`.venv`、`.cache`、本机绝对路径。

---

## 8. 并行生产：文本并行，渲染串行

批量做多章时，最大的浪费不是写稿，而是让两个 1080p 渲染互相抢内存。
下面是这类项目的实测结论。机器不同，数字会变，但**分层**不变。

### 8.1 三类任务，三种并行度

| 任务 | 并行度 | 原因 |
|---|---|---|
| 研究 / 章节脚本 / 分镜 | 4–6 个子代理 | 纯文本，互不写同一文件；真正的瓶颈是主代理的审阅 |
| edge-tts + 音乐 | 串行，每章 15–40 s | 网络 IO，很快，不值得为它做调度 |
| Remotion 渲染 | **1 路**，`--concurrency=4` | CPU、内存、Chrome 都是独占资源 |
| 抽帧 QA / 缩略图 | 等渲染结束 | 会额外拉起 Chrome，拖慢正在渲染的片子 |

一句话：**能并行的只有「不碰同一块内存、同一块磁盘、同一个输出文件」的步骤。**

### 8.2 渲染并行的实测（10 核 / 16 GB，仅供参考）

| 配置 | 实测吞吐 | 结果 |
|---|---|---|
| 1 路 × `concurrency=4` | ≈12 fps | 8 分钟片约 20 分钟；最稳 |
| 2 路 × `concurrency=4` | 合计 ≈11 fps，最差掉到 2–3 fps | 内存吃紧、换页；总时长并没有变短 |
| 1 路 × `concurrency=8` | ≈9.4 fps | 标签页上下文切换，反而比 4 慢 |
| 1 路 + JPEG 中间帧 | 与 PNG 基本相同 | 没有收益，保留默认即可 |

结论：

1. **不要按核数线性加并发。** 先跑 60 秒，用日志里的 `time remaining` 反推真实 fps，再决定。
2. 默认 `--concurrency=4`；只有内存 ≥32 GB 且实测更快时才加到 6–8。
3. 渲染是**独占阶段**。这段时间用来写下一批脚本、审来源账本、从已完成的 MP4 抽帧，
   而不是再开一路渲染。
4. 两路渲染时若帧率突然从 11 fps 掉到 2 fps，先查内存与残留 Chrome，而不是调参数。

### 8.3 串行队列，而不是手工轮询

批产时写一个队列脚本：按章渲染 → 封面 → 打包，单章失败不阻塞后续。

```bash
#!/usr/bin/env bash
set -uo pipefail
PY=".venv/bin/python"
LOG="_render-queue.log"

for ch in "$@"; do
  slug=$($PY -c "import json;print(json.load(open('courses/<COURSE>/video/ch$ch/course.json'))['slug'])")
  if ( cd "courses/<COURSE>/video/ch$ch/video/remotion" && \
       npx remotion render CourseVideo "../out/$slug.mp4" \
         --crf=20 --concurrency=4 --x264-preset=fast >> "../../$LOG" 2>&1 ); then
    $PY -m courseforge thumbnail "courses/<COURSE>/video/ch$ch" || true
    $PY -m courseforge package  "courses/<COURSE>/video/ch$ch" || true
    echo "DONE ch$ch $(date '+%F %T')" >> "$LOG"
  else
    echo "FAIL ch$ch $(date '+%F %T')" >> "$LOG"
  fi
done
```

配套两个小工具，省掉大量等待：

- **队列日志**：记录 START / DONE / FAIL 与时间戳；用队列时不要再看单章
  `render.log`，那份可能已经过期。
- **文档守护**：每 60 秒检查一次「mp4 是否比 README 新」，是就重跑文档生成脚本。
  成片一落地，README 与素材清单自动更新。

### 8.4 共享 node_modules：符号链接必须叫 node_modules

多章课程如果每章各装一份依赖，会浪费数 GB。共享一份即可：

```text
courses/<COURSE>/video/.shared/node_modules/     # 只有这一份真依赖
courses/<COURSE>/video/chN/video/remotion/node_modules
    -> ../../../.shared/node_modules              # 每章一个符号链接
```

三个坑：

1. **目录名必须是 `node_modules`。** 改成别的名字，Node 解析 realpath 后向上
   找不到 `dotenv`，报 `Cannot find module`。
2. **链接的相对路径要数对层级。** `remotion/` 往上三级才是
   `courses/<COURSE>/video/`，不是四级；写错时 `npx remotion` 直接找不到本地 CLI。
3. **只在依赖版本完全一致时共享。** 各章 `package.json` / lock 相同才可共用；
   某一章要升级 Remotion 时，给它单独 `npm install`，不要动共享目录。

`.shared/` 与 `node_modules` 都不入库；克隆后重新 `npm install` 或用脚本重建。

### 8.5 并行写脚本：一个代理一章，白名单供图

批量授权子代理写内容时，合同要写死：

- **一章一个代理**，只允许写 4 个文件：`brief.md`、`research/source-ledger.md`、
  `narration.json`、`storyboard.json`。禁止改 `course.json`，禁止跑
  `voice` / `music` / `render`。
- 给三样参照：`_SPEC.md`（行数、场景类型、字段）、已完成的样章、`_bib.json`（可用链接）。
- 给**图片白名单**，并先把图片复制进 `public/img/`；代理只许引用白名单里的文件。
- 每批 4–5 章，写完立刻做主代理复核：`check` + `research` + 行长扫描 + 图片存在性。
- **不要相信「账本已完成」**。代理常留下 `—` / `待验证` 的 URL 行；
  `research` 会逐行报错。能补真实链接就补，只是背景知识的行直接删。

实测：十几章脚本用 4 批子代理并行写完，主代理的时间主要花在复核与补来源，
而不是写作本身。并行把「写」压缩了，但没有压缩「审」。

### 8.6 冻结顺序：旁白是时间源，改字就要重录

`narration.json` 同时决定音频、时间轴和字幕。一旦跑过 `voice`：

| 改动 | 需要 |
|---|---|
| 改主语言/译文句子 | `voice` → `render`（时间轴和 SRT 都变了） |
| 只改分镜（标题、卡片、颜色） | `render` |
| 只改图片 | 换图 → `render` |

规则：**先冻结文本，再 `voice`；静帧 QA 通过，再 `render`。**
最贵的返工，是渲染已经开始后改了一句旁白：只能杀掉进程、重新 `voice`、
从零渲染。

### 8.7 失败恢复清单

- **TTS 缓存里有 0 字节 mp3** → `ffmpeg` 退出码 183。找到 `course/.cache/tts`
  下的空文件，删掉它，重跑 `voice`；不要清空整个缓存。
- **kill 渲染后 Chrome 残留** → 帧率骤降、内存不释放。
  `pkill -f "<slug>"` 后确认
  `pgrep -f puppeteer_dev_chrome_profile | wc -l` 回落，再启动下一路。
- **日志会骗人** → 队列模式下以队列日志为准；单章 `render.log` 可能是上一次的。
- **磁盘要留余量** → 每章 `out/` 约 40–80 MB（mp4 + 封面 + 字幕）；
  渲染临时文件还会翻倍。开工前至少留 5 GB，最好 8 GB。
- **交付前做解码校验**：`ffmpeg -v error -i <mp4> -f null -`，全部通过才算完。

### 8.8 一次批产的推荐节奏

1. 并行写 4–5 章脚本 → 主代理复核这一批（`check` / `research` / 行长 / 图片）。
2. 串行跑这一批的 `voice` + `music`（几分钟）。
3. 把这一批丢进渲染队列；**只开一路**。
4. 渲染期间：审下一批脚本、从上一批成片抽帧 QA、补 README。
5. 全部渲染完：统一生成索引、更新根 README、跑解码校验。

真正需要人（或主代理）盯的，是每批的脚本复核和抽帧，而不是渲染进度条。

---

## 现有实现对照

| 目录 | 作用 |
|---|---|
| `courses/` | 课程归档：一门课一个目录，新增课程从这里开始 |
| `courses/LLM/` | 参考实现：17 章正文、论文库、附录、17 支视频 |
| `courseforge/` | 从实现中抽出的通用代码库 |
| `asset-library/` | 可复用照片、主题、音乐配方 |
| `skills/incremental-course/` | 把整条流水线封装成可调用的 skill |
| `docs/git-and-media.md` | Git 媒体策略与 Release 发布流程 |

`courses/LLM/` 只是示例，不是模板要求。新课程可以只有 1 章、1 支视频。

---

## 质量门槛（一张表）

| 阶段 | 必须通过 |
|---|---|
| Intake | 学习者、起点、可验证的终点、范围、交付形式都写清楚 |
| 研究 | 每个数字有来源；争议有标注；无编造编号 |
| 课程 | 概念只定义一次；每章有自测；前置清楚；跨领域有失效边界 |
| 旁白 | 一句一个意思；双语对齐；无未定义术语 |
| 分镜 | id 对齐；定量内容有图；每场 2–3 个视觉阶段 |
| 音频 | 峰值正常；时间轴来自真实音频；SRT 行数一致 |
| 画面 | 无重叠；无裁切；字幕不挡内容；无半屏空/卡片坟场；同版式不超过 8 秒；转场干净 |
| 成片 | 规格正确；抽帧通过；音频可听；整片解码通过 |
| 批量 | 单路渲染；每批脚本过 `check` / `research`；全部成片解码通过 |
| 仓库 | 无媒体中间件、无缓存、无本机绝对路径；链接可解析 |

任何一项不过，回到对应阶段修，不要靠后期「盖住」。

### 视觉密度：从「图文并茂」到「每概念一图」

1. **每个分析概念一张图**。四个原因四张图，五个阶段五张图，五个模块各自有缩略图；
   不要用一张照片撑完整场。
2. **一场 2–3 个视觉阶段**。例如「定义 → 例子 → 候选打分 → 副产品」应在一场内完成，
   而不是拆成四场各挂一张卡。
3. **同一版式不超过 8 秒**。静态卡片挂 20 秒，观众只会读字幕。
4. **至少一种非对称构图**：主图+侧栏、时间轴+详情卡、节点图、三/四列对照。
   一排等宽卡片只能承担「并列清单」，不能承担整章。
5. **图内无文字**。标题、数字、轴名、标签全部在 HTML/SVG；这样图可复用、可翻译。
6. **示意图兜底**。`image_generate` 不可用时，用无文字矢量图并写清替换路径；
   不要静默换图，也不要把文字画进图里。
7. **custom 场景**：九种内置类型不够时，`type: "custom"` + `src/scenes/<Component>.tsx`；
   `timeline.json` 仍是唯一时间源，`check` 必须通过。

---

## 参考实现

`courses/LLM/` 是本流水线的第一个完整课程（17 章、论文库、17 支视频），
用来演示规模上限，也记录了一批踩过的坑（交叉淡化、公式换行、点标签裁切、
并发渲染、旁白返工）。这些教训已经写进 `courseforge` 模板与本文件的 QA 清单。

**LLM 的章节标题、例子和配图不属于通用规范。** 具体统计与学习路径见
[`courses/LLM/README.md`](courses/LLM/README.md)。
