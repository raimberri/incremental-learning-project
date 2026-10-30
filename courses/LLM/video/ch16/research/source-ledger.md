# 第 16 章 结课 · 来源账本

本章无新论文。下表全部是对前文论文的重新引用，`URL` 均取自 `courses/LLM/video/_bib.json` 的 `link` 字段；
「用在」列注明「回顾」时，表示该论文首次出现在更早的章节，这里只做索引。

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 神经语言模型的目标是给定上下文，建模下一个词的概率分布 | Bengio, Ducharme, Vincent & Janvin, *A Neural Probabilistic Language Model* | https://www.jmlr.org/papers/v3/bengio03a.html | 2003 | 高 | 一张图 / 回顾第 1 章 |
| 2 | 通用方法随算力增长而胜出，简单目标加海量数据优于精巧目标加少量数据（“苦涩的教训”） | Sutton, *The Bitter Lesson* | http://www.incompleteideas.net/IncIdeas/BitterLesson.html | 2019 | 高 | §16.2 第 1 条 / 回顾第 1、6 章 |
| 3 | 语言模型损失随参数量、数据量、计算量按幂律下降，可预测 | Kaplan et al., *Scaling Laws for Neural Language Models* | https://arxiv.org/abs/2001.08361 | 2020 | 高 | §16.2 第 4 条 / 回顾第 7 章 |
| 4 | 在固定计算预算下，参数与训练 token 应同步放大 | Hoffmann et al., *Training Compute-Optimal Large Language Models* | https://arxiv.org/abs/2203.15556 | 2022 | 高 | §16.2 第 4 条 / 回顾第 7 章 |
| 5 | RLHF 用人类偏好训练奖励模型与策略，改变的是输出分布，不注入新事实 | Ouyang et al., *Training Language Models to Follow Instructions with Human Feedback* | https://arxiv.org/abs/2203.02155 | 2022 | 高 | §16.2 第 5 条、入门五篇（回顾第 8 章） |
| 6 | 思维链提示让模型写出中间步骤，从而完成多步推理 | Wei et al., *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models* | https://arxiv.org/abs/2201.11903 | 2022 | 高 | §16.2 第 6 条、入门五篇（回顾第 9 章） |
| 7 | 给定固定预算，放大测试时计算可与放大模型参数互换，需做分配 | Snell et al., *Scaling LLM Test-Time Compute Optimally Can Be More Effective than Scaling Model Parameters* | https://arxiv.org/abs/2408.03314 | 2024 | 高 | §16.2 第 6 条 / 回顾第 9 章 |
| 8 | 稀疏门控混合专家只激活部分专家，从而在近似稠密效果下降低计算 | Shazeer et al., *Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer* | https://arxiv.org/abs/1701.06538 | 2017 | 高 | §16.2 第 7 条 / 回顾第 11 章 |
| 9 | GQA 让多个查询头共享一组键值头，压缩 KV 缓存 | Ainslie et al., *GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints* | https://arxiv.org/abs/2305.13245 | 2023 | 高 | §16.2 第 7 条 / 回顾第 11 章 |
| 10 | RAG 把参数记忆与非参数的外部检索库结合，外部库可更新、可溯源 | Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* | https://arxiv.org/abs/2005.11401 | 2020 | 高 | §16.2 第 8 条 / 回顾第 12 章 |
| 11 | 模型可能在训练中策略性顺从，表现出“假装对齐”，使对齐难以验证 | Greenblatt et al., *Alignment Faking in Large Language Models* | https://arxiv.org/abs/2412.14093 | 2024 | 高 | §16.5 开放问题 3 / 回顾第 8 章 |
| 12 | Transformer 以自注意力替代循环，是本章架构支柱的原点 | Vaswani et al., *Attention Is All You Need* | https://arxiv.org/abs/1706.03762 | 2017 | 高 | §16.2 第 3 条、入门五篇（回顾第 5 章） |
| 13 | GPT-3 用少样本提示展示规模带来的能力 | Brown et al., *Language Models are Few-Shot Learners* | https://arxiv.org/abs/2005.14165 | 2020 | 高 | 入门五篇（回顾第 7 章） |
| 14 | DeepSeek-R1 用强化学习激励推理能力，是“推理写进权重”的代表 | DeepSeek-AI, *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning* | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 入门五篇（回顾第 10 章） |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 约 36% | 0.95^20 = 0.3584859224… | §16.2 第 10 条，单步 0.95、二十步的示意 |

## 核查记录

- [x] 14 条 URL 逐条与 `_bib.json` 的 `link` 比对一致；未新增 DOI、页码或引文。
- [x] 年份取自 `_bib.json` 的 `year` 字段；正文中的 2017 / 2020 / 2022 / 2025 与入门五篇一致。
- [x] 0.95^20 用 Python 浮点复核，四舍五入为 36%，旁白写「约百分之三十六」。
- [x] 第 2、3、4 条只用于支撑「规模有定律、定律有边界」的判断，不外推具体倍数。
- [ ] 「十七条」按课程章节计数（第 0–16 章）；若制作人按正文小节计数，需改为实际章数。
