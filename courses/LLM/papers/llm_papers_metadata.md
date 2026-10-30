# LLM 关键论文元数据核查表（2017–2023）

| # | 年份（arXiv 首次公开） | 作者 | 发表 venue | arXiv ID / DOI | 核心贡献（≤25字） | 最值得记住的事实/数字 |
|---|---|---|---|---|---|---|
| 1 | 2017-06（NeurIPS 2017） | Paul Christiano et al. | NeurIPS 2017（NIPS 30） | arXiv:1706.03741 | 用人类偏好比较训练 RL，无需奖励函数 | 人类反馈仅覆盖不到 1% 的环境交互，约 1 小时人力 |
| 2 | 2018-06 | Alec Radford et al. | OpenAI 技术报告（2018-06-11 博客，未经同行评审） | 无 arXiv（未核实到 DOI） | 生成式预训练 + 判别式微调迁移到 NLU | 12 个任务中 9 个刷新 SOTA，Stories Cloze 绝对 +8.9% |
| 3 | 2018-10（NAACL 2019） | Jacob Devlin et al. | NAACL-HLT 2019, pp. 4171–4186 | arXiv:1810.04805；DOI:10.18653/v1/N19-1423 | 双向 Transformer 预训练，加一层即可微调 | GLUE 80.5%（绝对 +7.7），11 项任务 SOTA |
| 4 | 2019-02 | Alec Radford et al. | OpenAI 技术报告（2019-02-14 博客） | 无 arXiv | 无监督多任务学习，零样本任务迁移 | 15 亿参数，40GB WebText，8 个数据集中 7 个零样本 SOTA |
| 5 | 2020-05 | Tom B. Brown et al. | NeurIPS 2020 | arXiv:2005.14165 | 175B 模型仅凭 few-shot 提示做多任务 | 1750 亿参数，10 倍于此前最大非稀疏语言模型 |
| 6 | 2020-01 | Jared Kaplan et al. | arXiv preprint（未见正式发表） | arXiv:2001.08361 | 损失随模型/数据/算力呈幂律下降 | 幂律趋势跨越 7 个数量级以上，大模型更样本高效 |
| 7 | 2020-05 | Patrick Lewis et al. | NeurIPS 2020 | arXiv:2005.11401 | 参数与非参数记忆结合的可检索生成 | 三个开放域 QA 任务刷新 SOTA，检索维基百科稠密索引 |
| 8 | 2021-01（JMLR 2022） | William Fedus et al. | JMLR 23(120):1–39, 2022 | arXiv:2101.03961 | 简化 MoE 路由，稀疏模型扩到万亿参数 | 最大 1.6T 参数；同算力下预训练提速 7 倍 |
| 9 | 2021-06（ICLR 2022） | Edward J. Hu et al. | ICLR 2022（Poster） | arXiv:2106.09685 | 冻结权重注入低秩矩阵，省可训练参数 | 可训练参数减少 1 万倍，GPU 显存减少 3 倍 |
| 10 | 2022-03 | Jordan Hoffmann et al. | NeurIPS 2022 | arXiv:2203.15556 | 模型与训练 token 应等比例扩展 | 70B Chinchilla 全面超越 280B Gopher，MMLU 67.5% |
| 11 | 2022-03 | Long Ouyang et al. | NeurIPS 2022 | arXiv:2203.02155 | 用人类反馈 RLHF 对齐指令遵循 | 1.3B 输出比 175B GPT-3 更受偏好，参数少 100 倍 |
| 12 | 2022-01 | Jason Wei et al. | NeurIPS 2022 | arXiv:2201.11903 | 少样本思维链提示激发多步推理 | 8 个示例让 540B PaLM 在 GSM8K 超过微调 GPT-3+验证器 |
| 13 | 2022-03（ICLR 2023） | Xuezhi Wang et al. | ICLR 2023（Poster） | arXiv:2203.11171 | 采样多条推理路径，投票取最一致答案 | GSM8K +17.9%，SVAMP +11.0%，AQuA +12.2% |
| 14 | 2022-10（ICLR 2023） | Shunyu Yao et al. | ICLR 2023（Oral，notable top-5%） | arXiv:2210.03629 | 交错生成推理轨迹与动作，调用外部工具 | ALFWorld 成功率绝对 +34%，WebShop 绝对 +10% |
| 15 | 2022-06 | Jason Wei et al. | TMLR 2022 | arXiv:2206.07682 | 定义并度量大模型的涌现能力 | 涌现能力无法由小模型表现外推预测 |
| 16 | 2023-04（NeurIPS 2023） | Rylan Schaeffer et al. | NeurIPS 2023（Oral） | arXiv:2304.15004 | 涌现可能是度量指标选择造成的假象 | 换用连续/线性指标后，涌现现象随之消失 |

**备注**：第 16 篇实为 2023 年，超出清单所标 2017–2022；GPT-1、GPT-2 仅以 OpenAI 技术报告与博客发布，无 arXiv 编号；仅 BERT 有出版社 DOI，其余 DOI 为 arXiv 自动分配的 10.48550 前缀。年份取 arXiv v1 提交时间，正式发表年不同者已在括号标注。
