# 第 8 章 RLHF 与对齐 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | GPT-3 是自回归语言模型，1750 亿参数，预训练目标是预测下一个 token，因而更像续写器而非助手 | Brown et al., *Language Models are Few-Shot Learners* (GPT-3) | https://arxiv.org/abs/2005.14165 | 2020 | 高 | 开场：会写不等于听话 |
| 2 | 人类的两两偏好比较可以作为强化学习的反馈信号，比要求人类示范更容易大规模收集 | Christiano et al., *Deep Reinforcement Learning from Human Preferences* | https://arxiv.org/abs/1706.03741 | 2017 | 高 | 关键转向：让人选择，不让人示范 |
| 3 | Bradley–Terry 模型用奖励差的 sigmoid 给出「前者更受偏好」的概率，可用偏好对训练奖励模型 | Christiano et al., *Deep Reinforcement Learning from Human Preferences*, §2 | https://arxiv.org/abs/1706.03741 | 2017 | 高 | 把比较变成概率 |
| 4 | 对齐目标为 helpful、honest、harmless（HHH） | Ouyang et al., *Training Language Models to Follow Instructions with Human Feedback* | https://arxiv.org/abs/2203.02155 | 2022 | 高 | 两个不同的目标 |
| 5 | InstructGPT 的三步流程：SFT → 奖励模型 → PPO | Ouyang et al., *Training Language Models to Follow Instructions with Human Feedback* | https://arxiv.org/abs/2203.02155 | 2022 | 高 | RLHF 三步走 |
| 6 | PPO 目标中加入 KL 惩罚，限制策略偏离参考模型，用于抑制奖励黑客 | Ouyang et al., *Training Language Models to Follow Instructions with Human Feedback*, §3 | https://arxiv.org/abs/2203.02155 | 2022 | 中 | 缰绳：KL 惩罚 / 奖励黑客 |
| 7 | 13 亿参数的 InstructGPT 输出在人类偏好评估中优于 1750 亿参数的 GPT-3 | Ouyang et al., *Training Language Models to Follow Instructions with Human Feedback*, §1 | https://arxiv.org/abs/2203.02155 | 2022 | 高 | 小模型赢了大模型 |
| 8 | DPO 用闭式解把带 KL 约束的最优策略写成参考模型乘指数奖励，从而消去奖励模型与 RL 循环 | Rafailov et al., *Direct Preference Optimization* | https://arxiv.org/abs/2305.18290 | 2023 | 高 | DPO |
| 9 | 代回 Bradley–Terry 时，同一问题 x 下的配分函数 Z(x) 在奖励差中正好抵消 | Rafailov et al., *Direct Preference Optimization*, §4 | https://arxiv.org/abs/2305.18290 | 2023 | 高 | DPO 的推导 |
| 10 | DPO 只在离线偏好数据上优化，缺少在线采样与纠错，在需要探索的任务上可能不如在线 RL | Rafailov et al., *Direct Preference Optimization*, §5 | https://arxiv.org/abs/2305.18290 | 2023 | 高 | DPO 的代价 |
| 11 | Constitutional AI：先写自然语言原则，让模型自我批评与修改，再用 AI 偏好判断训练奖励模型（RLAIF） | Bai et al., *Constitutional AI: Harmlessness from AI Feedback* | https://arxiv.org/abs/2212.08073 | 2022 | 高 | 宪法 AI |
| 12 | 2024 年 Anthropic 的对齐伪装实验：模型在部分情境下假装遵守训练目标，以保护原有偏好 | Greenblatt et al., *Alignment Faking in Large Language Models* | https://arxiv.org/abs/2412.14093 | 2024 | 高 | 对齐的深层困难 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 约 1/135 | 1750 亿 ÷ 13 亿 = 134.6 | 「只有对手约一百三十五分之一」 |
| 一个数量级 | 正文 §8.2：写一条好回答的成本高于做一次两两比较 | 「写答案比比较贵一个数量级」 |

## 核查记录

- [x] arXiv 编号与标题一致：1706.03741、2203.02155、2305.18290、2212.08073、2412.14093、2005.14165。
- [x] InstructGPT 的 1.3B / 175B 与「人类偏好优于 GPT-3」取自论文摘要与结果节。
- [x] 「13 亿胜过 1750 亿」的倍数由算术复核（134.6，旁白说「约一百三十五分之一」）。
- [ ] 正文 §8.3 提到 Bradley–Terry 1952 年提出、Elo 1978 年用作等级分基础；`_bib.json` 未收录这两篇原始文献，所以旁白只保留「成对比较模型 → 等级分」的说法，不报年份。
- [ ] 正文 §8.7 的「谄媚源于评分者偏好附和」与古德哈特定律为正文转述，`_bib.json` 无对应条目；旁白保留但未作为论文结论引用。
