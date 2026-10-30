# 教学视频脚本生产规范（第 3–16 章共用）

本目录下每一章是一个独立的 courseforge 课程包。你只负责**内容四件套**：

```
courses/LLM/video/chN/
├── brief.md                     视频合同（范围、学习者、验收）
├── research/source-ledger.md    可核查来源账本
└── video/script/
    ├── narration.json           逐句中英旁白（时间轴的唯一来源）
    └── storyboard.json          与旁白逐场景对应的视觉蓝图
```

音频、时间轴、渲染由制作人统一执行；**你不要运行 `voice` / `music` / `render`**。

## 0. 先读这些

1. 本章正文：`courses/LLM/curriculum/NN-*.md`（唯一事实来源）。
2. 格式与质量样例：`courses/LLM/video/ch3/video/script/narration.json` 与 `storyboard.json`，
   以及 `courses/LLM/video/ch3/brief.md`、`research/source-ledger.md`。
3. 场景类型完整字段：`courseforge/templates/remotion/STORYBOARD.md`。
4. 论文链接索引：`courses/LLM/video/_bib.json`（每条含 key/title/year/link）。
5. 概念账本：`courses/LLM/appendices/A-概念账本.md`（术语只引用，不重复定义）。

## 1. 时长与结构

- 目标 **6.5–8.5 分钟**；`courseforge voice` 每句约 4–6 秒。
- **12–13 个场景，80–90 句**（含封面与结尾）。
- 固定骨架（可微调中间场景，但首尾必须如此）：
  1. `intro` — `cover`，一个具体问题或反常识开场，说明本章要回答什么。
  2. 2–9 个内容场景 — 机制、公式、图、例子、误解；类型要有变化。
  3. 倒数第 2 个 — 小结/陷阱/边界。
  4. `outro` — `outro`，回扣本章一句话，并交给下一章。
- 场景 `code` 用 `NN.0`、`NN.1` … 顺序编号；`id` 用短英文（`intro`、`softmax`…）。

## 2. narration.json

```json
{
  "voice": "zh-CN-XiaoxiaoNeural",
  "rate": "+0%",
  "scenes": [
    {
      "id": "intro",
      "code": "04.0",
      "zh": "本章标题（4–8 字）",
      "en": "SHORT ENGLISH TITLE",
      "lines": [["中文一句", "English one line"]]
    }
  ]
}
```

硬规则：

- 一句一个意思；中文 **18–38 字**（绝不超过 45），英文 **≤ 100 字符**。
- 先直觉，再公式，再例子；数字必须带条件与单位。
- 术语与正文完全一致；不要同义替换（例如正文用「困惑度」就不要改说「混乱度」）。
- 不引入正文没有的事实、年份、数字、论文结论。示意数字必须在画面或旁白里说「示意」。
- 中文是配音稿：避免括号、斜杠、Markdown、公式符号读法不清的地方；
  公式请用中文读法（「负的 log q」可以，「−log q」不行）。
- 英文是字幕，不是逐字直译；保持 ≤100 字符，术语用通行英文。

## 3. storyboard.json

```json
{
  "version": 1,
  "theme": "warm-paper",
  "courseTitle": "大语言模型教程",
  "chapterLabel": "第 N 章 · 标题",
  "scenes": [ { "id": "intro", "type": "cover", "...": "..." } ]
}
```

- 场景 id 与顺序必须和 narration **完全一致**。
- 仅允许：`cover` `bullets` `formula` `curve` `compare` `steps` `photo` `timeline` `outro`。
- 动画节奏：第 1 句出标题，第 2 句出主体，之后逐条出要点。所以每场前两句要能独立成立。
- 中文标题 4–8 字，`highlight` 必须是 `title` 的子串。
- `bullets`/`steps`/`compare` 每项：标题 ≤ 8 字，说明 ≤ 18 字；2–4 项。
- `formula`：**每行 ≤ 32 字符**，长公式用 `\n` 手动换行；`note` 写读法或条件；
  `bullets` 2 条，每条 ≤ 22 字。公式符号用 Unicode（− × ≈ ∈ Σ √ ↑ ↓）。
- `curve` 仅在「形状本身承载直觉」时使用；轴必须有名称，示意数据在 `stamp` 或 `note` 标「示意」。
- 图片：`cover` / `photo` / `outro` 的 `image` 只能引用 `img/cover.jpg`
  或制作人提供的素材库文件（见任务书）；**不要引用不存在的图片**。
- `photo` 场景需要 `image` + `subtitle` + 2–3 条 `bullets` + `caption`（写「示意图」）。
- 不要在生成图片里放文字；所有文字由 HTML/SVG 渲染。

## 4. brief.md

≤ 45 行，包含：学习者（起点/不假设/学完能做到）、这一集必须讲（8–12 条，对应正文小节）、
明确不讲、形式表（时长 6.5–8.5 分钟；1920×1080；30 fps；12–13 场景；中英字幕）。

## 5. source-ledger.md

- 表头固定：`| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |`
- **10–14 行**，只记录视频里真正用到的数字、年份、优先级判断、论文结论。
- URL 只能来自 `courses/LLM/video/_bib.json` 的 `link` 字段（或正文里给出的官方链接）。
  **禁止编造 DOI、页码、引文。**
- 无法核实的写「待验证」，并且不要写进旁白。
- 若涉及算术（例如参数量、倍数），在表后加「计算值」小表并写清算式。

## 6. 自检（必须做）

```bash
cd "$(git rev-parse --show-toplevel)"
python3 -m json.tool courses/LLM/video/chN/video/script/narration.json >/dev/null
python3 -m json.tool courses/LLM/video/chN/video/script/storyboard.json >/dev/null
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge check courses/LLM/video/chN
```

`check` 可以警告「尚无 timeline.json」，但**不能有 ✗ 错误**。
若报图片不存在，改成任务书里给出的可用图片。

最后回报：场景数、句数、每场主题、用到的图片、任何「待验证」项。
