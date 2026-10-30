# LLM 学习工程

> 一个给"完全没接触过大模型"的人准备的**增量式**课程，
> 外加一个按年代与主题整理的关键论文库。

本工程回答两个问题：

1. **这个领域是怎么走到今天的？** —— 用 57 篇关键论文串成一条主线（`papers/`）。
2. **一个外行怎么真正读懂它？** —— 用 17 章课程（含导读）从"猜下一个词"讲到"智能体"（`curriculum/`）。

课程的核心约束是**增量**：每个概念只在第一次出现时详细解释，后面只引用、不重讲。
为此我们维护了一份**概念账本**（`appendices/A-概念账本.md`），记录每个概念的"首次讲授章节"。

---

## 目录结构

> 本课程位于仓库的 `courses/LLM/`。下面以**课程根目录**为基准。

```
LLM/
├── README.md                      ← 你在这里
├── papers/                        ← 论文库
│   ├── README.md                  ← 总索引：57 篇论文的阅读顺序与一句话价值
│   ├── 01-foundations.md          ← 1948–2016：信息论、感知机、反向传播、词向量
│   ├── 02-transformer.md          ← 2017–2019：注意力、Transformer、GPT/BERT
│   ├── 03-scaling.md              ← 2020–2022：规模定律、GPT-3、上下文学习
│   ├── 04-alignment.md            ← 2017–2023：RLHF、指令微调、DPO
│   ├── 05-reasoning.md            ← 2022–2025：思维链、工具使用、RL 推理
│   ├── 06-efficiency-frontier.md  ← 2023–2026：MoE、长上下文、可解释性、智能体
│   ├── fetch_pdfs.sh              ← 一键下载 arXiv PDF 到 papers/pdf/
│   └── references.bib             ← BibTeX，可直接导入 Zotero / LaTeX
├── curriculum/                    ← 教学文档（按顺序读）
│   ├── 00-导读.md
│   ├── 01-语言的概率论.md
│   ├── ...
│   └── 16-结课.md
├── appendices/
│   ├── A-概念账本.md              ← 增量性的执行机制
│   ├── B-跨领域思想地图.md        ← 与物理、生物、经济、心理、艺术…的对照
│   ├── C-术语表.md
│   └── D-自测题与答案.md
├── video/                         ← 视频版（第 0–16 章成片 + 字幕 + 封面）
│   ├── ch0/ … ch16/               ← 每章一个 courseforge 课程包（可重建）
│   └── README.md                  ← 全部章节的时长与链接
└── assets/
    └── timeline.txt               ← 一张 ASCII 时间线
```

---

## 三条学习路径

| 路径 | 时长 | 读什么 | 适合谁 |
|---|---|---|---|
| **速成** | ≈3 小时 | 00 → 01 → 02 → 05 → 06 → 07 → 08 → 09 → 16 | 只想搞懂 ChatGPT 为什么能工作 |
| **标准** | ≈10 小时 | 00–16 全部正文（可跳过附录 B 的边界讨论） | 想系统入门、能读懂论文摘要 |
| **研究向** | ≈25 小时 | 标准路径 + `papers/` 每篇原文 + 附录 B 的边界讨论 | 准备做相关研究或工程 |

每章末尾有 **3 道自测题**，答案在 `appendices/D-自测题与答案.md`；
先自己写，再对答案——这是本课程唯一强制的要求。

---

## 课程地图（00–16，共 17 章）

| 章 | 标题 | 你会学到 | 难度 | 约需 |
|---|---|---|---|---|
| 00 | [导读](curriculum/00-导读.md) | 全局地图、学习契约 | ☆ | 10 min |
| 01 | [语言的概率论](curriculum/01-语言的概率论.md) | 下一个词预测、交叉熵、困惑度、softmax | ★★ | 40 min |
| 02 | [梯度与反向传播](curriculum/02-梯度与反向传播.md) | 梯度下降、反传、Adam、残差 | ★★★ | 50 min |
| 03 | [表示学习](curriculum/03-表示学习.md) | one-hot、word2vec、BPE、位置编码 | ★★ | 40 min |
| 04 | [从 RNN 到注意力](curriculum/04-从RNN到注意力.md) | RNN、LSTM、seq2seq、注意力 | ★★★ | 45 min |
| 05 | [Transformer](curriculum/05-Transformer.md) | 自注意力、多头、因果掩码、FFN | ★★★ | 60 min |
| 06 | [预训练](curriculum/06-预训练.md) | 自监督、GPT/BERT、预训练—微调 | ★★ | 35 min |
| 07 | [规模定律](curriculum/07-规模定律.md) | 幂律、Chinchilla、涌现、上下文学习 | ★★ | 40 min |
| 08 | [RLHF 与对齐](curriculum/08-RLHF与对齐.md) | 奖励模型、PPO、KL、DPO | ★★★ | 50 min |
| 09 | [思维链与推理时计算](curriculum/09-思维链与推理时计算.md) | CoT、自洽性、ReAct、PRM | ★★ | 45 min |
| 10 | [RLVR 与推理模型](curriculum/10-RLVR与推理模型.md) | 可验证奖励、GRPO、R1、蒸馏 | ★★★ | 45 min |
| 11 | [效率与架构](curriculum/11-效率与架构.md) | MoE、GQA、FlashAttention、Mamba、LoRA | ★★★ | 50 min |
| 12 | [RAG 与长上下文](curriculum/12-RAG与长上下文.md) | 检索、重排、中间遗失、上下文工程 | ★★ | 40 min |
| 13 | [评测与幻觉](curriculum/13-评测与幻觉.md) | 基准、污染、judge、校准、幻觉 | ★★ | 45 min |
| 14 | [机制可解释性](curriculum/14-机制可解释性.md) | 叠加、SAE、归纳头、激活修补 | ★★★ | 45 min |
| 15 | [智能体与前沿](curriculum/15-智能体与前沿.md) | Agent 循环、工具、复合误差、提示注入 | ★★ | 45 min |
| 16 | [结课](curriculum/16-结课.md) | 十条定律、下一步、开放问题 | ☆ | 25 min |

> "难度"是相对本课程而言（★★★ = 需要停下来想）。
> 两个真正的陡坡是 **§2（反向传播）** 和 **§5（注意力）**，其余内容都建立在它们之上。

---

## 增量式教学：三条规则

1. **一次定义，终身引用。** 一个概念（例如"交叉熵"）只在首次出现的章节给定义和直觉，
   后续章节直接使用，必要时标注 `见 §1.3`。
2. **每章开头有"本章新增"与"前置"。** 前置里列的东西，本章不再解释。
   如果你读某章觉得卡住，去概念账本里查它是哪一章讲的。
3. **不重复举例。** 同一个例子（例如"猫坐在垫子上"）不会被反复用来解释新概念。

> 为什么这样设计？因为教学材料最大的浪费不是"讲得少"，而是"反复讲同一件事"。
> 增量式迫使我们把篇幅花在**真正新增的认知负荷**上。

---

## 跨领域参照：本课程的第二条主线

LLM 的每一个核心思想，几乎都能在人类其他领域找到同构物：

- **交叉熵** ≈ 热力学熵 + 香农信息量 + 玻尔兹曼分布
- **梯度下降** ≈ 细菌趋化性 + 盲人下山 + 最小作用量原理
- **反向传播** ≈ 动态规划 + 经济学里的影子价格（边际贡献）
- **词向量** ≈ 分布语义学（"观其伴，知其义"）+ 地图投影
- **注意力** ≈ 心理学选择性注意 + 数据库 JOIN + 赫伯特·西蒙的"注意力稀缺"
- **缩放定律** ≈ 生物代谢的异速生长律（Kleiber 3/4 幂律）+ 规模经济
- **DPO** ≈ 统计力学的玻尔兹曼分布
- **思维链** ≈ 心理学"出声思考" + 卡尼曼的系统 1/系统 2
- **MoE** ≈ 亚当·斯密的分工 + 神经科学的稀疏编码
- **RAG** ≈ 开卷考试 + 延展心智（Clark & Chalmers）
- **"中间遗失"** ≈ 记忆的首因/近因效应
- **叠加现象** ≈ 压缩感知 + 色谱分析

完整对照表在 `appendices/B-跨领域思想地图.md`，包含每一项的**同构点**与**类比失效边界**。
我们坚持写"边界"，因为不负责任的类比比没有类比更糟。

---

## 论文库怎么用

`papers/README.md` 是一张总表：编号、年份、论文、一句话价值、对应课程章节。
每条包含：**它解决了什么前人解决不了的问题**、**关键数字/结论**、**读懂它需要的前置论文**。
建议顺序：先读课程对应章节 → 再读论文摘要与关键图 → 最后决定是否读全文。

时间线速览见 `assets/timeline.txt`。

---

## 约定

- 论文年份以 **arXiv 首次公开**为准；与正式发表年不同时标注（如 BERT：2018 预印本 / 2019 NAACL）。
- 所有数字尽量标注来源论文；无法核实的写"未核实"，绝不编造。
- 中文术语首次出现时附英文，之后只用中文（或通用缩写，如 RLHF）。
- 课程内容截至 **2026 年 10 月**。这个领域半年就会变，请把第 15、16 章当作"快照"而非"定论"。

---

## 视频版

第 0–16 章**全部**有视频版：1920×1080、30 fps、中文配音、中英双语字幕，每章 6–9 分钟，17 集合计约 2 小时 07 分。
成片作为 GitHub Release 附件发布；仓库里保留旁白、分镜、可重建工程、封面与字幕。

- 全部章节的总表与下载链接：[`video/README.md`](video/README.md)
- 第 0 章导读（6:10）：[成片](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch0-orientation.mp4) · [说明](video/ch0/README.md)
- 第 1 章语言的概率论（9:01）：[成片](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch1-probability.mp4)
- 第 2 章梯度与反向传播（8:10）：[成片](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch2-backprop.mp4) · [说明](video/ch2/README.md)
- 第 3 章表示学习（6:28）：[成片](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch3-representation.mp4) · [说明](video/ch3/README.md)
- 第 4 章从 RNN 到注意力（7:13）：[成片](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch4-attention.mp4)
- 第 5 章 Transformer（7:50）：[成片](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch5-transformer.mp4)
- 第 6–16 章：见 [`video/README.md`](video/README.md) 的完整表格

每章目录都含 `brief.md`、`research/source-ledger.md`、逐句中英旁白、分镜 JSON、可重建的 Remotion 工程，以及 `video/out/` 下的 MP4、封面与三份 SRT。

---

## 开始

打开 [`curriculum/00-导读.md`](curriculum/00-导读.md)，或先看[视频总表](video/README.md)。
