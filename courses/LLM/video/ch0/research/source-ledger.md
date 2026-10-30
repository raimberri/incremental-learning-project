# 大语言模型导读 · 来源账本

> 一行一个可核查的主张。年份取**首次公开**时间；五个时代的分期是编辑判断，
> 依据列在文末，不冒充论文结论。

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 信息论用熵度量消息的平均信息量；信息量可写成 −log p | Shannon, *A Mathematical Theory of Communication* | https://doi.org/10.1002/j.1538-7305.1948.tb01338.x | 1948 | 高 | 五个时代 / 跨学科（熵） |
| 2 | 统计语言模型用回退/平滑从计数估计下一个词的概率 | Kneser & Ney, *Improved backing-off for M-gram language modeling* | https://doi.org/10.1109/ICASSP.1995.479394 | 1995 | 高 | 1948–2002 统计时代 |
| 3 | 神经概率语言模型用词向量 + 神经网络预测下一个词，词向量与网络联合训练 | Bengio, Ducharme, Vincent & Jauvin, *A Neural Probabilistic Language Model* | https://www.jmlr.org/papers/v3/bengio03a.html | 2003 | 高 | 一句话定义 / 2003–2016 神经时代 |
| 4 | word2vec 用大规模语料高效学习词的连续向量表示 | Mikolov, Chen, Corrado & Dean, *Efficient Estimation of Word Representations in Vector Space* | https://arxiv.org/abs/1301.3781 | 2013 | 高 | 2003–2016 神经时代 |
| 5 | LSTM 用输入门、遗忘门、输出门在长序列上传递信息 | Hochreiter & Schmidhuber, *Long Short-Term Memory* | https://doi.org/10.1162/neco.1997.9.8.1735 | 1997 | 高 | 2003–2016 神经时代 / 逐词传递 |
| 6 | Transformer 用纯注意力取代循环与卷积，训练更可并行 | Vaswani et al., *Attention Is All You Need* | https://arxiv.org/abs/1706.03762 | 2017 | 高 | 2017–2019 Transformer 时代 |
| 7 | GPT-3 是 1750 亿参数的自回归语言模型，在少样本设定下做翻译、问答、算术等任务 | Brown et al., *Language Models are Few-Shot Learners* | https://arxiv.org/abs/2005.14165 | 2020 | 高 | 规模时代 / 翻译、推理、写代码是副产品 |
| 8 | 语言模型损失随参数量、数据量、算力呈幂律下降，趋势跨越七个数量级以上 | Kaplan et al., *Scaling Laws for Neural Language Models* | https://arxiv.org/abs/2001.08361 | 2020 | 高 | 2020–2022 规模时代 |
| 9 | 计算最优训练要求模型与训练 token 等比例扩展，约每参数 20 token | Hoffmann et al., *Training Compute-Optimal Large Language Models* | https://arxiv.org/abs/2203.15556 | 2022 | 高 | 2020–2022 规模时代 |
| 10 | InstructGPT 用人类反馈（RLHF）把语言模型对齐到指令遵循 | Ouyang et al., *Training language models to follow instructions with human feedback* | https://arxiv.org/abs/2203.02155 | 2022 | 高 | 2022–至今 对齐时代 / RLHF |
| 11 | 思维链提示让模型生成中间推理步骤，显著提升多步推理任务表现 | Wei et al., *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models* | https://arxiv.org/abs/2201.11903 | 2022 | 高 | 2022–至今 推理时代 |
| 12 | DeepSeek-R1 用纯强化学习激励推理能力，无需人工标注推理轨迹 | DeepSeek-AI, *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning* | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 2022–至今 推理时代 |
| 13 | 工作记忆容量有限；重复信息会占用本可用于新信息加工的资源 | Sweller, *Cognitive Load During Problem Solving: Effects on Learning* | https://doi.org/10.1207/s15516709cog1202_4 | 1988 | 高 | 增量式写法 / 工作记忆 |
| 14 | 预适应（exaptation）：为 A 功能演化出的结构被复用于 B 功能 | Gould & Vrba, *Exaptation—a Missing Term in the Science of Form* | https://doi.org/10.1017/S0094837300004310 | 1982 | 高 | 反复出现的模式 / 跨学科 |
| 15 | 分工与专业化能提高总产出；别针工厂是经典例子 | Smith, *An Inquiry into the Nature and Causes of the Wealth of Nations* | https://www.gutenberg.org/ebooks/3300 | 1776 | 高 | 跨学科（MoE） |

## 五个时代的分期依据（编辑判断）

| 时代 | 视频中的年代 | 起止依据 |
|---|---|---|
| 统计时代 | 1948–2002 | 从 Shannon 1948 到神经语言模型成为主线的前夜（#1、#2） |
| 神经时代 | 2003–2016 | 从 Bengio 2003 到 Transformer 前夜（#3、#4、#5） |
| Transformer 时代 | 2017–2019 | Transformer 2017 起，到 GPT-3 前夜（#6） |
| 规模时代 | 2020–2022 | GPT-3 与 Scaling Laws 2020，到 InstructGPT 前夜（#7、#8、#9） |
| 对齐与推理时代 | 2022–至今 | InstructGPT、CoT 2022，R1 2025（#10、#11、#12） |

## 时间线

| 年份 | 事件 | 为什么重要 | 来源 |
|---|---|---|---|
| 1948 | Shannon 信息论 | 熵、交叉熵、比特 | 1 |
| 1997 | LSTM | 门控记忆 | 5 |
| 2003 | Bengio 神经概率语言模型 | 词向量 + 预测下一个词 | 3 |
| 2013 | word2vec | 语义变成向量运算 | 4 |
| 2017 | Transformer | 并行、长程依赖 | 6 |
| 2020 | GPT-3 / Scaling Laws | 规模 + 上下文学习 / 幂律 | 7, 8 |
| 2022 | InstructGPT / Chinchilla / CoT | 对齐 / 计算最优 / 推理 | 9, 10, 11 |
| 2025 | DeepSeek-R1 | 纯 RL 激励推理 | 12 |

## 图像与证据的边界

- 概念图（`era-neural`、`era-transformer`、`era-alignment`、`why-*`、`pattern-learned`、
  `working-memory`）是**无文字矢量示意**，只承担解释，不作为测量证据。
- 照片（`library`、`umbrella`、`teleprinter`、`datacenter`、`steam`、`bacteria`、
  `pinfactory`、`feather`、`mountain`、`ledger`、`notebook-desk`）来自已归档的生成素材，
  只用于氛围与类比。
- 规模曲线是**示意**，不是真实测量；图上已标「示意图 · 非真实数据」。

## 核查记录

- [x] 2026-10-28 用 arXiv API、Crossref 与出版方官方页复核了 #1–#15。
- [x] GPT-1、GPT-2、Bricken 2023 在本片中未引用。
- [x] 片中口播的年份为 1948、2002、2003、2016、2017、2019、2020、2022；与分期表一致。
- [x] 片中「七十多年」= 2026 − 1948 = 78 年，是算术。
- [x] 候选词概率 0.62 / 0.14 / 0.07 / 0.04 只是示意，画面标明「示意」。
- [x] 预适应译名沿用课程既有用法，英文原词 exaptation 同时给出。
