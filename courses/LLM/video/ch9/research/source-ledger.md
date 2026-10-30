# 第 9 章 思维链与推理时计算 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | Transformer 由 L 层堆叠而成，每生成一个 token，输入要穿过全部 L 层；计算量约等于 L 层矩阵乘法（正文 §9.1） | Vaswani, Shazeer, Parmar et al., *Attention Is All You Need* | https://arxiv.org/abs/1706.03762 | 2017 | 高 | 固定深度 / 每个 token 同价 |
| 2 | 思维链：给模型若干「步骤 + 答案」示例后，数学题准确率大幅提升；实验在 PaLM 540B 上 | Wei, Wang, Schuurmans et al., *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models* | https://arxiv.org/abs/2201.11903 | 2022 | 高 | 思维链 / 540B |
| 3 | CoT 的效果在小模型上几乎为零，到某个规模才显著——属于涌现现象（正文 §9.2） | Wei, Tay, Bommasani et al., *Emergent Abilities of Large Language Models* | https://arxiv.org/abs/2206.07682 | 2022 | 高 | 小模型限制 |
| 4 | 零样本思维链：不加示例，只在问题后加 "Let's think step by step" 就能诱导推理 | Kojima, Gu, Reid, Matsuo & Iwasawa, *Large Language Models are Zero-Shot Reasoners* | https://arxiv.org/abs/2205.11916 | 2022 | 高 | 零样本思维链 |
| 5 | 自洽性：高温采样多条推理路径，对最终答案投票取多数；GSM8K 上比单条 CoT 提升约 17.9 个百分点 | Wang, Wei, Schuurmans et al., *Self-Consistency Improves Chain of Thought Reasoning in Language Models* | https://arxiv.org/abs/2203.11171 | 2022（arXiv）/ 2023（ICLR） | 高 | 自洽性 / +17.9 |
| 6 | GSM8K 是小学数学应用题基准，用于衡量多步推理 | Cobbe, Kosaraju, Bavarian et al., *Training Verifiers to Solve Math Word Problems* | https://arxiv.org/abs/2110.14168 | 2021 | 高 | GSM8K |
| 7 | ReAct：交替生成 Thought / Action / Observation，观察结果写回上下文并影响下一轮推理 | Yao, Zhao, Yu et al., *ReAct: Synergizing Reasoning and Acting in Language Models* | https://arxiv.org/abs/2210.03629 | 2023（ICLR） | 高 | ReAct 循环 |
| 8 | Toolformer：在大量文本中试插 API 调用，只保留能降低后续 token 预测损失的调用，再用这些数据微调 | Schick, Dwivedi-Yu, Dessì et al., *Toolformer: Language Models Can Teach Themselves to Use Tools* | https://arxiv.org/abs/2302.04761 | 2023 | 高 | Toolformer |
| 9 | 固定 FLOPs 预算下，最优的测试时计算策略可以胜过 14 倍大的模型 | Snell, Lee, Xu & Kumar, *Scaling LLM Test-Time Compute Optimally Can Be More Effective than Scaling Model Parameters* | https://arxiv.org/abs/2408.03314 | 2024 | 高 | 测试时计算 / 14 倍 |
| 10 | 过程奖励模型：在 MATH 的一个子集上，用 PRM 重排达到约 78% 准确率，优于结果奖励；同时发布 PRM800K（约 80 万步人工标注） | Lightman, Kosaraju, Burda et al., *Let's Verify Step by Step* | https://arxiv.org/abs/2305.20050 | 2024（ICLR） | 高 | 过程奖励 / 78% / 800K |
| 11 | 第 10 章预告：DeepSeek-R1 用强化学习奖励可验证的「答对」信号，让模型自己长出长链推理 | DeepSeek-AI, *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning* | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 下一章预告 |
| 12 | 思维链不一定忠实：推理步骤可能是事后编造，改变无关提示可改变解释而不改变答案 | 正文 §9.9 转述（post-hoc rationalization / confabulation）；正文未给具体文献，`_bib.json` 无对应条目 | https://arxiv.org/abs/2305.04388 | 2023 | 高 | 警告（仅作定性表述） |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 约 100 次前向 | 写 100 个 token → 每次一个 token 一次前向，共约 100 次 | 「计算」层原因 |
| k 倍生成算力 | 采 k 条完整路径 ≈ k × 单条生成成本（不含验证器开销） | 自洽性代价 |
| 约 27 个节点 | 分支因子 b = 3、深度 d = 3 时，b^d = 27（示意，仅说明增长） | 思维树代价 |

## 核查记录

- [x] 540B、+17.9、78%、80 万步、14 倍均取自正文，并与对应论文摘要的表述核对。
- [x] 所有 arXiv 编号与 `_bib.json` 的 `link` 一致；未另造 DOI、页码或引文。
- [x] 78% 是「PRM 重排」设定下的 MATH 子集结果，不是端到端准确率；旁白已写明「重排」。
- [ ] 思维链忠实性一项正文未给出具体文献，标「待验证」；旁白只作定性警告，不引用具体论文。
