# 论文库总索引

> 57 篇论文，按"读懂 LLM 所需的最小集合"挑选，而不是按引用量。
> 每篇标注：**它解决了什么前人解决不了的问题**、**最值得记住的一个数字/结论**、**读懂它需要先读什么**。

## 怎么用这个库

1. **不要按时间顺序从 1948 年读起。** 先读课程对应章节，再回来读论文的摘要与关键图。
2. **优先级**：★ 必读（12 篇，构成主线）；☆ 推荐；○ 选读（历史或专题）。
3. **读法**：摘要 → 图 1 / 表 1 → 结论 → 方法。实验细节留到你需要复现时再看。
4. 所有 arXiv 编号与 DOI 已核对；GPT-1/GPT-2 仅有 OpenAI 技术报告，**没有 arXiv 编号**，请勿"补"一个。
5. 想离线读全文？运行 `bash papers/fetch_pdfs.sh`，会把有 arXiv 编号的论文下载到 `papers/pdf/`（约 40 篇，需联网；GPT-1/GPT-2/SAE 需手动下载）。
6. 需要逐条核对年份、venue、关键数字？见 [`llm_papers_metadata.md`](llm_papers_metadata.md)（LLM 关键论文元数据核查表）。

---

## 主线 12 篇（如果只读 12 篇）

| # | 论文 | 为什么是它 |
|---|---|---|
| P16 | Attention Is All You Need (2017) | 现代 LLM 的全部架构祖先 |
| P07 | A Neural Probabilistic Language Model (2003) | "词向量 + 预测下一词"的原始配方 |
| P20 | Language Models are Few-Shot Learners (2020) | 规模带来质变的公开证据 |
| P21 | Scaling Laws for Neural Language Models (2020) | 把"更大更好"变成可计算 |
| P23 | Training Compute-Optimal LLMs (2022) | 纠正 scaling 的配比，20 token/参数 |
| P30 | InstructGPT (2022) | 从"续写器"到"助手"的转折 |
| P24 | Chain-of-Thought Prompting (2022) | 推理可以被"写出来" |
| P45 | DeepSeek-R1 (2025) | 推理可以被"奖励出来" |
| P05 | Learning representations by back-propagating errors (1986) | 一切训练的引擎 |
| P17 | GPT-1 (2018) | 预训练 + 微调范式的起点 |
| P31 | DPO (2023) | 对齐的数学被大幅简化 |
| P48 | Toy Models of Superposition (2022) | 理解"黑箱内部"的入口 |

---

## 全表

### 一、史前史与地基（1948–2016）

| ID | 年份 | 论文 | 一句话价值 | 课程 | 优先级 |
|---|---|---|---|---|---|
| P01 | 1948 | Shannon, *A Mathematical Theory of Communication* | 熵与交叉熵的来源，LLM 损失函数的祖先 | §1.4 | ★ |
| P02 | 1950 | Turing, *Computing Machinery and Intelligence* | 把"机器能思考吗"变成可操作的提问 | §0 | ○ |
| P03 | 1958 | Rosenblatt, *The Perceptron* | 第一个可学习的神经元模型 | §2 | ○ |
| P04 | 1969 | Minsky & Papert, *Perceptrons* | 证明单层感知机的局限，间接催生多层网络 | §2 | ○ |
| P05 | 1986 | Rumelhart, Hinton & Williams, *Learning representations by back-propagating errors* | 反向传播让多层网络可训练 | §2.3 | ★ |
| P06 | 1997 | Hochreiter & Schmidhuber, *Long Short-Term Memory* | 门控记忆，统治序列建模二十年 | §4.3 | ☆ |
| P07 | 2003 | Bengio et al., *A Neural Probabilistic Language Model* | 词向量 + 神经网络预测下一词，GPT 的骨架 | §1.3 | ★ |
| P08 | 2013 | Mikolov et al., *Efficient Estimation of Word Representations in Vector Space* | word2vec：语义变成向量运算 | §3.3 | ☆ |
| P09 | 2013 | Mikolov et al., *Distributed Representations of Words and Phrases* | 负采样，让词向量训练便宜可行 | §3.3 | ☆ |
| P10 | 2014 | Sutskever, Vinyals & Le, *Sequence to Sequence Learning* | 编码器—解码器框架 | §4.4 | ☆ |
| P11 | 2014 | Bahdanau, Cho & Bengio, *Neural Machine Translation by Jointly Learning to Align and Translate* | 注意力机制的诞生 | §4.5 | ★ |
| P12 | 2014 | Kingma & Ba, *Adam* | 自适应优化器，深度学习的默认配置 | §2.4.1 | ☆ |
| P13 | 2014 | Srivastava et al., *Dropout* | 随机丢弃 = 廉价集成 + 正则化 | §2.4.2 | ○ |
| P14 | 2015 | He et al., *Deep Residual Learning* | 残差连接，让深层网络可训练 | §2.4.4 | ★ |
| P15 | 2016 | Sennrich et al., *Neural Machine Translation of Rare Words with Subword Units* | BPE 分词进入 NLP | §3.5 | ☆ |

### 二、Transformer（2017）

| ID | 年份 | 论文 | 一句话价值 | 课程 | 优先级 |
|---|---|---|---|---|---|
| P16 | 2017 | Vaswani et al., *Attention Is All You Need* | 用纯注意力取代循环，开启并行时代 | §5 | ★ |

### 三、预训练与规模（2018–2022）

| ID | 年份 | 论文 | 一句话价值 | 课程 | 优先级 |
|---|---|---|---|---|---|
| P17 | 2018 | Radford et al., *Improving Language Understanding by Generative Pre-Training* (GPT-1) | 生成式预训练 + 判别式微调 | §6.3 | ★ |
| P18 | 2019 | Devlin et al., *BERT* | 双向掩码预训练，刷爆 11 项任务 | §6.4 | ☆ |
| P19 | 2019 | Radford et al., *Language Models are Unsupervised Multitask Learners* (GPT-2) | 零样本多任务，押注"一个接口" | §6.5 | ☆ |
| P20 | 2020 | Brown et al., *Language Models are Few-Shot Learners* (GPT-3) | 175B 参数 + 上下文学习 | §7.1 | ★ |
| P21 | 2020 | Kaplan et al., *Scaling Laws for Neural Language Models* | 损失随规模幂律下降 | §7.2 | ★ |
| P22 | 2020 | Lewis et al., *Retrieval-Augmented Generation* | 参数记忆 + 非参数记忆 | §12.2 | ☆ |
| P23 | 2022 | Hoffmann et al., *Training Compute-Optimal Large Language Models* (Chinchilla) | 20 token/参数，纠正参数过剩 | §7.3 | ★ |

### 四、对齐（2017–2023）

| ID | 年份 | 论文 | 一句话价值 | 课程 | 优先级 |
|---|---|---|---|---|---|
| P29 | 2017 | Christiano et al., *Deep RL from Human Preferences* | 用人类比较替代奖励函数 | §8.3 | ☆ |
| P30 | 2022 | Ouyang et al., *Training language models to follow instructions with human feedback* (InstructGPT) | RLHF 三步走，1.3B 胜 175B | §8.4 | ★ |
| P31 | 2023 | Rafailov et al., *Direct Preference Optimization* | 用闭式解把 RL 从流程里删掉 | §8.5 | ★ |
| P32 | 2022 | Bai et al., *Constitutional AI: Harmlessness from AI Feedback* | 原则 + AI 反馈替代人工 | §8.6 | ☆ |
| P33 | 2021 | Hu et al., *LoRA* | 低秩微调，参数少 1 万倍 | §11.6 | ☆ |

### 五、推理与工具（2022–2025）

| ID | 年份 | 论文 | 一句话价值 | 课程 | 优先级 |
|---|---|---|---|---|---|
| P24 | 2022 | Wei et al., *Chain-of-Thought Prompting Elicits Reasoning* | 写步骤 = 更多计算 | §9.2 | ★ |
| P25 | 2022 | Wang et al., *Self-Consistency Improves Chain of Thought Reasoning* | 多次采样 + 投票 | §9.3 | ☆ |
| P26 | 2022 | Yao et al., *ReAct: Synergizing Reasoning and Acting* | 推理与工具调用交替 | §9.5 | ★ |
| P27 | 2022 | Wei et al., *Emergent Abilities of Large Language Models* | 定义并度量"涌现" | §7.4 | ☆ |
| P28 | 2023 | Schaeffer et al., *Are Emergent Abilities of LLMs a Mirage?* | 涌现可能是指标假象 | §7.4 | ★ |
| P43 | 2024 | Lightman et al., *Let's Verify Step by Step* | 过程奖励优于结果奖励 | §9.8 | ☆ |
| P44 | 2024 | Snell et al., *Scaling LLM Test-Time Compute* | 推理时算力可胜过大 14 倍的模型 | §9.7 | ☆ |
| P45 | 2025 | DeepSeek-AI, *DeepSeek-R1* | 纯 RL 逼出长链推理 | §10 | ★ |
| P46 | 2023 | Schick et al., *Toolformer* | 模型自学"何时调用工具" | §9.6 | ○ |
| P47 | 2022 | Kojima et al., *Large Language Models are Zero-Shot Reasoners* | 一句"一步步想"就够了 | §9.2 | ☆ |

### 六、效率与架构（2017–2025）

| ID | 年份 | 论文 | 一句话价值 | 课程 | 优先级 |
|---|---|---|---|---|---|
| P34 | 2017 | Shazeer et al., *Outrageously Large Neural Networks* (MoE) | 稀疏门控，参数与算力解耦 | §11.2 | ☆ |
| P35 | 2022 | Fedus et al., *Switch Transformers* | 每 token 一个专家，扩到 1.6T | §11.2 | ☆ |
| P36 | 2023 | Ainslie et al., *GQA* | 多查询注意力的折中，改造只需 5% 算力 | §11.3 | ☆ |
| P37 | 2022 | Dao et al., *FlashAttention* | IO-aware，精确且更快 | §11.4 | ★ |
| P38 | 2024 | Gu & Dao, *Mamba* | 选择性状态空间，线性复杂度 | §11.5 | ☆ |
| P39 | 2023 | Touvron et al., *LLaMA* | 小模型 + 多数据，开源拐点 | §7.6 | ☆ |
| P40 | 2023 | Jiang et al., *Mistral 7B* | 7B 全面胜 13B，工程效率范本 | §11 | ○ |
| P41 | 2024 | DeepSeek-AI, *DeepSeek-V2* | MLA：KV 缓存降 93.3% | §11.3 | ☆ |
| P42 | 2024 | DeepSeek-AI, *DeepSeek-V3* | 671B/37B 激活，FP8 训练 | §11 | ☆ |

### 七、评测、可解释性与智能体（2021–2025）

| ID | 年份 | 论文 | 一句话价值 | 课程 | 优先级 |
|---|---|---|---|---|---|
| P48 | 2022 | Elhage et al., *Toy Models of Superposition* | 高维空间如何塞下更多特征 | §14.3 | ★ |
| P49 | 2023 | Bricken et al., *Towards Monosemanticity* | 稀疏自编码器解混特征 | §14.4 | ☆ |
| P50 | 2022 | Olsson et al., *In-context Learning and Induction Heads* | 一个能力被归约到两个头 | §14.5 | ☆ |
| P51 | 2022 | Meng et al., *Locating and Editing Factual Associations* (ROME) | 因果定位事实存储并可编辑 | §14.6 | ○ |
| P52 | 2024 | Yang et al., *SWE-agent* | 让 agent 修真实 GitHub issue | §15 | ☆ |
| P53 | 2024 | Greenblatt et al., *Alignment Faking in LLMs* | 模型会"假装对齐" | §8.7 | ☆ |
| P54 | 2025 | Phan et al., *Humanity's Last Exam* | 旧基准刷完后的极限测试 | §13.2 | ○ |
| P55 | 2023 | OpenAI, *GPT-4 Technical Report* | 能力跃迁 + 可预测性讨论 | §13 | ○ |
| P56 | 2019 | Sutton, *The Bitter Lesson*（随笔） | 规模胜过精巧设计 | §6、§16 | ★ |
| P57 | 2024 | Liu et al., *Lost in the Middle* | 长上下文利用呈 U 形，中间最差 | §12.4 | ★ |

### 补充基准与综述（不入正文编号）

| 年份 | 论文 | 用途 |
|---|---|---|
| 2021 | Hendrycks et al., *MMLU* | 57 学科知识基准 |
| 2021 | Cobbe et al., *GSM8K* | 小学数学多步推理 |
| 2021 | Chen et al., *HumanEval* | 代码生成基准 |
| 2021 | Hendrycks et al., *MATH* | 竞赛数学 |
| 2023 | Jimenez et al., *SWE-bench* | 真实软件工程基准 |
| 2023 | Ji et al., *Survey of Hallucination in NLG* | 幻觉综述 |

---

## 按"想搞清楚什么"查

| 你的问题 | 先读 |
|---|---|
| 为什么是"预测下一个词"？ | P01 → P07 → P17 |
| 注意力到底在算什么？ | P11 → P16 |
| 为什么大模型突然变强？ | P20 → P21 → P23 → P27 → P28 |
| ChatGPT 为什么听话？ | P29 → P30 → P31 |
| 为什么它会一步步推理？ | P24 → P25 → P43 → P44 → P45 |
| 为什么推理这么贵？ | P37 → P36 → P41 → P38 |
| 它能查资料吗？ | P22 → P49（长上下文） |
| 它内部在干什么？ | P48 → P49 → P50 → P51 |
| 它可靠吗？ | P27 → P28 → P54 → P53 |
| 它会自己干活吗？ | P26 → P52 |

---

详细条目见：
[`01-foundations.md`](01-foundations.md) ·
[`02-transformer.md`](02-transformer.md) ·
[`03-scaling.md`](03-scaling.md) ·
[`04-alignment.md`](04-alignment.md) ·
[`05-reasoning.md`](05-reasoning.md) ·
[`06-efficiency-frontier.md`](06-efficiency-frontier.md)

BibTeX 见 [`references.bib`](references.bib)。
