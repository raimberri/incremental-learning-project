# 第 10 章 RLVR 与推理模型 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | RLVR 的奖励由确定性程序给出（答案匹配、测试通过、格式合法），而不是由学出来的奖励模型给出 | DeepSeek-AI, *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning*；正文 §10.1 的定义 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 换奖励 / 验证器 |
| 2 | R1 于 2025 年 1 月发布（arXiv v1 提交于 2025-01-22） | DeepSeek-AI, 同上 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 开场 |
| 3 | R1-Zero：不做任何监督微调，直接在基座上做 RL；奖励只有准确性奖励与格式奖励；不提供推理轨迹示范，也不要求「一步步想」 | DeepSeek-AI, 同上 §2.2 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | R1-Zero |
| 4 | R1-Zero 的思考长度从数百 token 增至数千 token；自发出现自我反思、验证与策略切换；论文记录了一个「aha moment」 | DeepSeek-AI, 同上 §2.2 与摘要（self-reflection, verification, dynamic strategy adaptation） | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 顿悟时刻 |
| 5 | AIME 2024 pass@1：基座 15.6% → R1-Zero 71.0%，多数投票 86.7%；正式 R1 为 79.8% | DeepSeek-AI, 同上 v1 §2.2 与表 2 | https://arxiv.org/abs/2501.12948 | 2025 | 中（v1 为 71.0%；2026-01 的 v2 已改为 77.9%，正文与旁白沿用 v1） | 顿悟时刻 / 分数 |
| 6 | GRPO：同一问题采样一组答案，用组内均值与标准差归一化得到相对优势，不训练 critic；PPO 的 critic 与策略同规模，显存开销翻倍 | DeepSeek-AI, 同上 §2.2.2（GRPO） | https://arxiv.org/abs/2501.12948 | 2025 | 高 | GRPO |
| 7 | 组内全对或全错时标准差为 0，优势全为 0，这一步没有学习信号 | 同上，优势公式的直接推论（非论文原文结论） | https://arxiv.org/abs/2501.12948 | 2025 | 高（推导） | GRPO 边界 / 难度匹配 |
| 8 | R1 四阶段：冷启动 SFT → 推理 RL → 拒绝采样 + SFT → 全场景 RL（推理之外加有用性、无害性奖励） | DeepSeek-AI, 同上 §2.3.1 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 四阶段配方 |
| 9 | 冷启动用数千条高质量长 CoT 数据做 SFT，作用是教会格式、给 RL 一个稳定起点，而不是教推理 | DeepSeek-AI, 同上 §2.3.1 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 四阶段配方 |
| 10 | 拒绝采样：模型生成大量答案，只保留验证器判定正确的样本用于 SFT，即「自我蒸馏」 | DeepSeek-AI, 同上 §2.3.1 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 冷启动与拒绝采样 |
| 11 | 小模型直接做 RLVR 不如蒸馏大模型的推理轨迹；R1-Distill 覆盖 1.5B–70B，在数学基准上优于同尺寸原始模型 | DeepSeek-AI, 同上 §2.4 与摘要 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 蒸馏 |
| 12 | R1-Zero 存在语言混杂与可读性差的问题，正式 R1 因此没有直接采用它，而加入冷启动等阶段 | DeepSeek-AI, 同上 §2.2、§2.3 | https://arxiv.org/abs/2501.12948 | 2025 | 高 | 四阶段 / 为何不用 Zero |
| 13 | RLVR 的边界：只适用于可验证领域；验证器会被 hack（只看格式、测试用例太少）；可能偏科（对齐税）、长度膨胀、可读性下降。古德哈特定律：指标一旦成为目标就不再是好指标 | 正文 §10.6 的归纳；单条现象无统一论文出处 | https://arxiv.org/abs/2501.12948 | 2025 | 中（正文归纳，属领域共识；无定量数字） | 代价与边界 |
| 14 | 三条路线：zero-shot CoT 用提示要求「一步步想」；self-consistency 采样多条答案投票 | Kojima et al., *Large Language Models are Zero-Shot Reasoners*；Wang et al., *Self-Consistency Improves Chain of Thought Reasoning* | https://arxiv.org/abs/2205.11916；https://arxiv.org/abs/2203.11171 | 2022 / 2023 | 高 | 三条路线 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| +55.4 个百分点 | 71.0 − 15.6 | AIME 2024 上 R1-Zero 相对基座的提升 |
| +8.8 个百分点 | 79.8 − 71.0 | 正式 R1 相对 R1-Zero |
| +15.7 个百分点 | 86.7 − 71.0 | 多数投票相对单次采样 |
| 优势全为 0 | std = 0 时，(r_i − mean) = 0，故 A_i = 0 | GRPO 全对/全错 |

## 核查记录

- [x] arXiv 摘要核对：纯 RL、无需人工标注的推理轨迹、出现 self-reflection / verification / dynamic strategy adaptation、可验证任务、可蒸馏到小模型。
- [x] Nature 卷页 645:633–638（2025），DOI 与 `_bib.json` 的 `deepseek2025nature` 一致。
- [x] R1-Zero 的 AIME 2024 数字：v1 原文为 15.6% → 71.0%，多数投票 86.7%；v2（2026-01-04）改为 77.9%，多数投票仍为 86.7%。旁白按正文沿用 v1 的 71.0%，此差异见回报「待验证」。
- [ ] 1.5B–70B 与「远超同尺寸」按正文 §10.5 记录，未逐表核对 R1-Distill 各尺寸分数。
- [ ] 长度膨胀、对齐税、可读性下降按正文 §10.6 归纳，未找到单篇论文的定量出处，旁白未给具体数字。
