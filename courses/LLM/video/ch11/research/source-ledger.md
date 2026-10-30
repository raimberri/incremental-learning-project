# 第 11 章 更便宜地变大 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | MoE 用 router 为每个 token 选择 top-k 专家，只有被选中的专家参与计算，输出为加权和 | Shazeer et al., *Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer* | https://arxiv.org/abs/1701.06538 | 2017 | 高 | intro / moe |
| 2 | Switch Transformer 每个 token 只走一个专家，把模型扩到 1.6 万亿参数，同等算力下预训练速度提升约 7 倍 | Fedus, Zoph & Shazeer, *Switch Transformers* | https://arxiv.org/abs/2101.03961 | 2022 | 高 | scale |
| 3 | 负载均衡损失惩罚专家使用率过于不均，避免 token 全挤向少数专家 | Fedus et al., *Switch Transformers*, §2.2 | https://arxiv.org/abs/2101.03961 | 2022 | 高 | routing |
| 4 | DeepSeek-V3 总参数 6710 亿，每 token 激活 370 亿，用 14.8 万亿 token 训练，消耗约 278.8 万 H800 GPU 小时 | DeepSeek-AI, *DeepSeek-V3 Technical Report* | https://arxiv.org/abs/2412.19437 | 2024 | 高 | scale |
| 5 | 自回归生成需缓存历史 token 的 Key/Value；KV 缓存随层数、头数、每头维度、序列长度与批量线性增长 | Vaswani et al., *Attention Is All You Need*（缓存机制为本章 §11.3.1 的推导） | https://arxiv.org/abs/1706.03762 | 2017 | 高 | kv |
| 6 | MQA 让所有头共享一组 K/V；GQA 每 g 个头共享一组，是 MQA 与 MHA 的折中 | Ainslie et al., *GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints* | https://arxiv.org/abs/2305.13245 | 2023 | 高 | attn |
| 7 | 把已有的多头模型升级为 GQA，只需原预训练算力的约 5% | Ainslie et al., *GQA*, §1 | https://arxiv.org/abs/2305.13245 | 2023 | 高 | attn |
| 8 | Llama 2/3、Mistral、Qwen 等开源模型大多采用 GQA | Ainslie et al.（GQA 的采用）；Jiang et al., *Mistral 7B* | https://arxiv.org/abs/2310.06825 | 2023 | 中 | attn |
| 9 | MLA 把 K/V 投影为低维潜在向量；DeepSeek-V2 报告 KV 缓存减少 93.3%，吞吐提升 5.76 倍，训练成本节省 42.5% | DeepSeek-AI, *DeepSeek-V2* | https://arxiv.org/abs/2405.04434 | 2024 | 高 | attn |
| 10 | FlashAttention 用分块与在线 softmax 减少显存读写，结果是精确的而非近似；BERT-large 端到端约 15%，GPT-2 约 3 倍 | Dao et al., *FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness* | https://arxiv.org/abs/2205.14135 | 2022 | 中 | flash |
| 11 | Mamba 让 A、B、C 依赖输入实现选择性状态空间，复杂度线性；吞吐约为同规模 Transformer 的 5 倍，Mamba-3B 可匹敌两倍大小的 Transformer | Gu & Dao, *Mamba: Linear-Time Sequence Modeling with Selective State Spaces* | https://arxiv.org/abs/2312.00752 | 2024 | 高 | mamba |
| 12 | LoRA 冻结原权重、只学低秩增量 ΔW = BA，可训练参数减少约 1 万倍，显存减少约 3 倍，效果接近全量微调 | Hu et al., *LoRA: Low-Rank Adaptation of Large Language Models* | https://arxiv.org/abs/2106.09685 | 2021 | 高 | lora |
| 13 | DeepSeek-V3 用 FP8 做训练而不只是推理，降低显存与带宽需求 | DeepSeek-AI, *DeepSeek-V3 Technical Report* | https://arxiv.org/abs/2412.19437 | 2024 | 高 | quant |
| 14 | Dropout 随机失活神经元仍能保持效果，说明网络对噪声有天然鲁棒性，可类比适度量化 | Srivastava et al., *Dropout: A Simple Way to Prevent Neural Networks from Overfitting* | https://jmlr.org/papers/v15/srivastava14a.html | 2014 | 高 | quant |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 约 5.5% | 370 亿 ÷ 6710 亿 = 0.0551 | DeepSeek-V3 激活参数占比，旁白取「不到 6%」 |
| 6.7% | 100% − 93.3% | MLA 压缩后剩余的 KV 缓存比例 |
| 1.6 万亿 | 正文给出的 Switch 参数规模 | scale 场景字幕 |

## 核查记录

- [x] 14 条 URL 全部取自 `courses/LLM/video/_bib.json` 的 `link` 字段，未新增 DOI 或页码。
- [x] 370 ÷ 6710 由算术复核，约为 5.5%；旁白说「不到百分之六」。
- [x] GQA 的 5%、MLA 的 93.3% 与 5.76 倍、LoRA 的 1 万倍与 3 倍、Switch 的 7 倍，均与正文口径一致。
- [ ] FlashAttention 的「16K 长序列优势更明显」：论文实验表主要覆盖 1K–4K，正文写 16K，待逐表核对；视频只用「长序列更明显」。
- [ ] 「Llama 2/3、Qwen 大多用 GQA」：正文给的是名单，未逐份模型卡核对，标注为中等置信度。
- [!] 正文写 Mamba 为 Gu & Dao 2023，`_bib.json` 记 2024（ICLR 2024；arXiv 2312.00752 于 2023-12 提交）；视频不读年份。
- [!] 「专家坍塌」是视频对正文「专家饿死、参数白存」的概括说法，正文未使用该词。
