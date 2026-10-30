# 附录 C　术语表

> 按英文首字母排序。中文译名后面是首次出现的章节。
> 详细定义见对应章节；这里只给"能在对话中不卡住"的最小解释。

---

## A

**activation**　激活｜§14
神经元或注意力头的输出值。可解释性研究的对象就是"激活里编码了什么"。

**Adam**　自适应矩估计优化器｜§2.4.1
用梯度的一阶矩（动量）和二阶矩（尺度）为每个参数自适应调步长。

**agent**　智能体｜§15.1
能在环境中循环"观察—思考—行动"以达成目标的系统。

**alignment**　对齐｜§8.1
让模型行为符合人类意图（有用、诚实、无害）。

**alignment tax**　对齐税｜§8.7
对齐后通用能力下降的代价。

**anisotropy**　各向异性｜§3.9
词向量挤在狭窄锥形区域，导致余弦相似度不可靠。

**ANN (approximate nearest neighbor)**　近似最近邻｜§12.3
用少量召回损失换取数量级速度的向量检索算法（如 HNSW）。

**attention**　注意力｜§4.5
用 query 与各 key 的相似度做权重，对 value 加权求和。

**autoregressive**　自回归｜§1.2
把自己上一步的输出当作下一步输入，逐步生成。

## B

**backpropagation**　反向传播｜§2.3
用链式法则 + 动态规划，一次反向遍历算出所有参数的梯度。

**bag of words**　词袋｜§3.8
忽略顺序、只看词集合的表示。

**batch / mini-batch**　批 / 小批量｜§2.2
一次参数更新使用的一组样本。

**benchmark**　基准｜§13.2
一组标准化任务，用来横向比较模型。

**Bitter Lesson**　苦涩的教训｜§16
Sutton 的论断：利用算力的通用方法终将胜过编码人类知识的方法。

**BM25**　BM25｜§12.3
基于词频与逆文档频率的关键词检索算法，擅长精确匹配。

**Boltzmann distribution**　玻尔兹曼分布｜§1.6
$p_i \propto e^{-E_i/kT}$；softmax 与 DPO 的最优解都与它同构。

**BPE (Byte Pair Encoding)**　字节对编码｜§3.5
反复合并最高频相邻符号，得到大小可控的词表。

**Bradley–Terry model**　Bradley–Terry 模型｜§8.3
用分数差经 sigmoid 预测两两比较胜率的模型。

## C

**calibration**　校准｜§13.6
模型说的置信度是否匹配实际正确率。

**causal mask**　因果掩码｜§5.7
把注意力分数矩阵上三角设为 $-\infty$，禁止看未来。

**chain-of-thought (CoT)**　思维链｜§9.2
让模型先写推理步骤再给答案。

**chunking**　切块｜§12.3
把长文档切成适合检索与放进上下文的小段。

**circuit**　电路｜§14.2
完成某个具体任务的一组特征与注意力头及其连接。

**compute-optimal**　计算最优｜§7.3
给定算力下使损失最小的参数与数据配比（约 20 token/参数）。

**compounding error**　复合误差｜§15.5
多步任务中每步错误的累积放大；$R=\prod R_i$。

**Constitutional AI**　宪法 AI｜§8.6
用一组自然语言原则指导模型自我批评、修改与判断。

**contamination**　数据污染｜§13.4
测试题出现在训练数据里，模型是"记得"而非"会做"。

**context engineering**　上下文工程｜§12.5
为任务设计检索什么、放多少、怎么排序的信息架构。

**cross-entropy**　交叉熵｜§1.4
$-\sum p\log q$，用模型分布编码真实分布的平均意外。

**KV cache**　KV 缓存｜§11.3
缓存历史 token 的 Key/Value，避免每步重复计算。

## D

**decoding**　解码｜§1.6
从概率分布选 token 的策略（贪心、采样、top-k、top-p）。

**DPO (Direct Preference Optimization)**　直接偏好优化｜§8.5
用闭式解把 RLHF 转化为直接分类损失，无需奖励模型与 RL。

**distillation**　蒸馏｜§10.5
用大模型的输出（如推理轨迹）训练小模型。

**dropout**　随机丢弃｜§2.4.2
训练时随机置零一部分神经元，迫使学出冗余表示。

## E

**emergent ability**　涌现能力｜§7.4
小模型没有、大模型才出现的能力；可能部分是指标假象。

**embedding**　嵌入｜§3.3
把离散对象映射为稠密向量。

**entropy**　熵｜§1.4
$-\sum p\log p$，分布的平均不确定性。

**exaptation**　预适应｜§6.6
为 A 功能演化的结构被复用于 B 功能；预训练的生物学类比。

## F

**feature**　特征｜§14.2
激活空间中对应某个可解释概念的方向。

**FFN (feed-forward network)**　前向网络｜§5.6
对每个位置独立作用的两层 MLP，先升维再降维。

**fine-tuning**　微调｜§6.3
把预训练模型在具体任务的小数据上再训练。

**FlashAttention**　FlashAttention｜§11.4
分块计算注意力，减少显存读写，精确且更快。

**function calling**　函数调用｜§15.2
模型输出结构化请求，由运行时执行工具。

## G

**GQA (Grouped-Query Attention)**　分组查询注意力｜§11.3
每 $g$ 个头共享一组 K/V，在 MHA 与 MQA 之间取折中。

**gradient**　梯度｜§2.1
所有偏导数组成的向量，指向上升最快方向。

**gradient clipping**　梯度裁剪｜§4.2
梯度超过阈值就按比例缩小，防爆炸。

**GRPO**　组相对策略优化｜§10.3
用组内相对排名代替 critic 的策略优化算法。

## H

**hallucination**　幻觉｜§13.5
生成看似合理但错误或无依据的内容。

**hidden state**　隐藏状态｜§4.2
RNN 中截至当前步的"摘要"。

## I

**in-context learning (ICL)**　上下文学习｜§7.1
不更新权重，仅凭提示中的例子完成任务。

**induction head**　归纳头｜§14.5
由"前一个 token 头"与"匹配头"组合成的复制模式电路。

**inductive bias**　归纳偏置｜§5.9
模型结构自带的先验假设；越弱越依赖数据。

**inference**　推理（前向）｜§1.5
用固定参数生成输出；与"训练"相对。

## K

**KL divergence**　KL 散度｜§1.4
两个分布的差异，非负、不对称。

## L

**latent**　潜在表示｜§11.3
压缩后的低维表示（如 MLA 的潜在向量）。

**learning rate**　学习率｜§2.1
每一步沿梯度走多远。

**logit**　logit｜§1.6
softmax 之前的实数分数。

**LoRA**　低秩适配｜§11.6
冻结原权重，只训练低秩增量。

**LSTM**　长短期记忆网络｜§4.3
用门控和加法式细胞状态保护长程信息的 RNN。

**lost in the middle**　中间遗失｜§12.4
关键信息在长文档中部时，模型利用率显著下降。

## M

**Mamba**　Mamba｜§11.5
参数随输入变化的选择性状态空间模型，线性复杂度。

**masked language model (MLM)**　掩码语言模型｜§6.2
挖掉部分词，让模型根据上下文填回。

**maximum likelihood estimation (MLE)**　最大似然估计｜§1.5
让训练数据在模型下"尽可能可能发生"。

**MCP (Model Context Protocol)**　模型上下文协议｜§15.2
统一模型与工具/数据源连接方式的协议。

**MLA (Multi-head Latent Attention)**　多头潜在注意力｜§11.3
把 K/V 压成低维潜在向量，大幅降低 KV 缓存。

**MoE (Mixture of Experts)**　混合专家｜§11.2
多个专家 FFN + 路由器，每个 token 只激活少数几个。

**multi-head attention**　多头注意力｜§5.4
多组独立的 Q/K/V 并行做注意力，再拼接。

## N

**negative sampling**　负采样｜§3.3
把"多分类"降级为"正样本 vs 少数负样本"的二分类。

**n-gram**　n 元模型｜§1.3
只看最近 n−1 个词来数数预测的经典语言模型。

## O

**OODA loop**　OODA 循环｜§15.1
观察—判断—决策—行动的快速反馈循环（Boyd）。

**overfitting**　过拟合｜§2.5
训练集表现好、新数据表现差。

## P

**parameter**　参数｜§1.5
模型内部可被训练调整的数值。

**perplexity**　困惑度｜§1.4
$e^{\text{交叉熵}}$，读作"平均在几个词之间犹豫"。

**polysemantic neuron**　多义神经元｜§14.2
同一个神经元对多种不相关概念都响应。

**positional encoding**　位置编码｜§3.8
把"第几个词"编码成向量并加入输入。

**power law**　幂律｜§7.2
$y \propto x^{-\alpha}$，双对数坐标下是直线。

**PPO**　近端策略优化｜§8.4
带裁剪的保守策略梯度算法。

**PRM (process reward model)**　过程奖励模型｜§9.8
给推理的每一步打分，而不只看最终答案。

**prompt**　提示｜§6.5
喂给模型的输入文本，用来指定任务。

**prompt injection**　提示注入｜§15.6
把恶意指令藏在数据里，诱导模型执行。

## Q

**Q/K/V**　查询/键/值｜§4.5
我在找什么 / 我有什么被找 / 被找到时提供什么。

**quantization**　量化｜§11.6
用更低精度（INT8/FP8）存权重与激活。

## R

**RAG (retrieval-augmented generation)**　检索增强生成｜§12.2
检索外部文档并放入上下文，再让模型生成。

**rejection sampling**　拒绝采样｜§10.4
生成大量答案，只保留验证器判定正确的。

**residual connection**　残差连接｜§2.4.4
输出 = 输入 + 学到的改变量，给梯度一条恒等通路。

**reward hacking**　奖励黑客｜§8.4
模型钻奖励模型空子，拿高分但不做对事。

**reward model**　奖励模型｜§8.3
从偏好数据学出的、给回答打分的模型。

**RLHF**　基于人类反馈的强化学习｜§8.4
用人类偏好训练奖励模型，再用 RL 优化策略。

**RLVR**　可验证奖励强化学习｜§10.1
用确定性验证器给出奖励的强化学习。

**RoPE**　旋转位置编码｜§5.5
用旋转让点积只依赖相对位置。

**router**　路由器｜§11.2
决定每个 token 送给哪些专家的门控网络。

## S

**SAE (sparse autoencoder)**　稀疏自编码器｜§14.4
用稀疏 + 重建把叠加的激活解混成单义特征。

**scaling law**　缩放定律｜§7.2
损失随参数/数据/算力按幂律下降的经验规律。

**self-attention**　自注意力｜§5.2
同一序列内部，每个位置对所有位置做注意力。

**self-consistency**　自洽性｜§9.3
采样多条推理路径，对最终答案投票。

**self-supervised learning**　自监督学习｜§6.2
从数据自身构造标签，无需人工标注。

**softmax**　softmax｜§1.6
把一组实数变成和为 1 的概率分布。

**SSM (state space model)**　状态空间模型｜§11.5
用固定大小状态递归处理序列的线性复杂度模型。

**superposition**　叠加｜§14.3
用近似正交的方向在有限维度里表示远超维度的特征。

**sycophancy**　谄媚｜§8.7
模型倾向附和用户观点，即使用户是错的。

## T

**teacher forcing**　教师强制｜§4.4
训练时用正确的上一个词作为解码器输入。

**temperature**　温度｜§1.6
控制 softmax 分布锋利程度的超参。

**test-time compute**　测试时计算｜§9.7
推理阶段额外投入的算力（采样、搜索、更长 CoT）。

**token**　词元｜§1.1
模型处理文本的最小单位。

**tool use**　工具使用｜§9.5
模型调用外部程序（搜索、计算器、代码执行）。

## V

**verifier**　验证器｜§10.1
判断答案对错的程序，不是学出来的模型。

**vocabulary**　词表｜§3.5
所有可能 token 的集合，大小记为 V。

## W

**weight tying**　权重共享｜§3.7
输入嵌入与输出投影共用同一个矩阵。

**working memory**　工作记忆｜§7.5
容量有限、当前正在使用的临时记忆；类比上下文窗口。

## Z

**zero-shot**　零样本｜§6.5
不给任何示例，直接让模型完成任务。
