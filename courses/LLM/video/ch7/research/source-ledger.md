# 第 7 章 规模定律 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 损失随参数量、数据量、训练算力三条幂律下降：L(N) ∝ N^(−α_N)、L(D) ∝ D^(−α_D)、L(C) ∝ C^(−α_C)；正文记 α_N ≈ 0.076、α_D ≈ 0.095、α_C ≈ 0.050 | Kaplan, McCandlish, Henighan et al., *Scaling Laws for Neural Language Models* | https://arxiv.org/abs/2001.08361 | 2020 | 高（指数取自正文 §7.2，未逐页核对论文正文） | 幂律公式 / 双对数斜率 |
| 2 | 上述趋势跨越七个以上数量级；取对数后为直线，可外推 | Kaplan et al., 同上（摘要：trends spanning more than seven orders of magnitude） | https://arxiv.org/abs/2001.08361 | 2020 | 高 | 双对数直线 / 七个数量级 |
| 3 | 给定固定算力，Kaplan 的结论是优先加参数、数据可以少一点（大模型样本效率更高） | Kaplan et al., 同上（摘要：compute-efficient training involves very large models on modest data） | https://arxiv.org/abs/2001.08361 | 2020 | 高 | Kaplan 结论 |
| 4 | GPT-3：1750 亿参数、96 层、隐藏维度 12288、训练数据约 3000 亿 token | Brown, Mann, Ryder et al., *Language Models are Few-Shot Learners* | https://arxiv.org/abs/2005.14165 | 2020 | 高 | GPT-3 规模 |
| 5 | few-shot 上下文学习：提示里给几个例子即可完成新任务，不更新权重 | Brown et al., 同上 | https://arxiv.org/abs/2005.14165 | 2020 | 高 | 上下文学习 |
| 6 | GPT-2：15 亿参数、48 层、隐藏维度 1600、40GB 文本（约 800 万文档）——GPT-3 的对照基数 | Radford, Wu, Child et al., *Language Models are Unsupervised Multitask Learners* | https://openai.com/research/better-language-models | 2019 | 高 | 开场「约一百倍」 |
| 7 | 计算最优：参数与训练 token 应同比增加（模型翻倍，token 也翻倍）；Chinchilla 700 亿参数 + 1.4 万亿 token，同算力下超过 2800 亿 Gopher 与 1750 亿 GPT-3 | Hoffmann, Borgeaud, Mensch et al., *Training Compute-Optimal Large Language Models* | https://arxiv.org/abs/2203.15556 | 2022 | 高 | Chinchilla / 20 token 每参数 |
| 8 | Kaplan 的实验设定有偏差：学习率调度未随训练长度调整 | Hoffmann et al., 同上（正文 §7.3 转述） | https://arxiv.org/abs/2203.15556 | 2022 | 中高（摘要未展开，按正文转述） | 「推翻了什么」 |
| 9 | 涌现能力：三位数加减法上小模型准确率接近 0，规模到某处突然跳高 | Wei, Tay, Bommasani et al., *Emergent Abilities of Large Language Models* | https://arxiv.org/abs/2206.07682 | 2022 | 高 | 涌现现象 |
| 10 | 「涌现」可能是指标不连续造成的假象：完全答对才计分 → 曲线跃起；换成 token 级编辑距离、答案对数概率等连续指标 → 平滑上升 | Schaeffer, Miranda & Koyejo, *Are Emergent Abilities of Large Language Models a Mirage?* | https://arxiv.org/abs/2304.15004 | 2023 | 高 | 对涌现的批评 |
| 11 | LLaMA 用 70 亿参数配 1 万亿 token，属「超额训练」小模型 | Touvron, Lavril, Izacard et al., *LLaMA: Open and Efficient Foundation Language Models* | https://arxiv.org/abs/2302.13971 | 2023 | 高 | 天花板 / 行业分流 |
| 12 | MoE 稀疏激活：总参数很大，每次只激活一小部分 | Fedus, Zoph & Shazeer, *Switch Transformers* | https://arxiv.org/abs/2101.03961 | 2022 | 高 | 行业分流 |
| 13 | 公开可用高质量文本可能在 2026–2032 年间被基本用尽（Epoch AI 估算，属预测而非定论） | 正文 §7.6 转述，`_bib.json` 无对应条目 | https://arxiv.org/abs/2212.04356 | 2022 | 中 | 数据墙（仅背景，**未写进旁白**） |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 3.5 万亿 token | 1750 亿参数 × 20 token/参数 = 35000 亿 | 手算场景公式行 2 |
| 约 1/12 | 3000 亿 ÷ 35000 亿 ≈ 0.086 | 手算场景旁白 |
| 1.4 万亿 token | 700 亿 × 20 = 1.4 万亿，与 Chinchilla 实际训练量自洽 | 配比自校验 |
| 约 100 倍 | 1750 ÷ 15 ≈ 117，正文取「约 100 倍」，旁白沿用正文说法 | 开场 |

## 核查记录

- [x] Kaplan 摘要核对：幂律覆盖 model size / dataset size / compute，趋势跨七个以上数量级。
- [x] Chinchilla 摘要核对：70B 参数、同算力下数据为 Gopher 的 4 倍、超过 280B Gopher 与 175B GPT-3；「模型翻倍则 token 翻倍」与「同比增加」一致。
- [x] 700 亿 × 20 = 1.4 万亿，与论文训练量自洽；20 token/参数 由 1.4 万亿 ÷ 700 亿 得 20。
- [ ] Kaplan 的三个指数（0.076 / 0.095 / 0.050）按正文记录，未逐页核对论文正文与附录。
- [ ] Epoch AI 的数据枯竭年份区间无 `_bib.json` 链接，标「待验证」，旁白只说「几年内」且明确是预测。
