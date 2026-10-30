# 第 1 章 语言的概率论 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 一句话的概率可按链式法则分解为逐词条件概率的连乘 | Jurafsky & Martin, *Speech and Language Processing* (3rd ed. draft), ch. 3 | https://web.stanford.edu/~jurafsky/slp3/3.pdf | 2024 | 高 | 一句话的概率 / 自回归 |
| 2 | n-gram 语言模型用计数估计条件概率，并用回退/平滑处理未见过的 n-gram | Kneser & Ney, *Improved backing-off for M-gram language modeling* | https://doi.org/10.1109/ICASSP.1995.479394 | 1995 | 高 | 两代语言模型 / n-gram 的稀疏 |
| 3 | 神经概率语言模型用词向量 + 神经网络预测下一个词，词向量与网络联合训练 | Bengio, Ducharme, Vincent & Jauvin, *A Neural Probabilistic Language Model* | https://www.jmlr.org/papers/v3/bengio03a.html | 2003 | 高 | 两代语言模型 / Bengio 2003 |
| 4 | 信息量可写成 −log p；熵是信息量的期望 | Shannon, *A Mathematical Theory of Communication* | https://doi.org/10.1002/j.1538-7305.1948.tb01338.x | 1948 | 高 | 意外与熵 |
| 5 | 交叉熵 = 熵 + KL 散度；KL 非负，因此交叉熵是熵的上界 | Cover & Thomas, *Elements of Information Theory* | https://doi.org/10.1002/047174882X | 2006 | 高 | 交叉熵与困惑度 |
| 6 | 困惑度是交叉熵的指数：PPL = e^H（自然对数下） | Jurafsky & Martin, *Speech and Language Processing* (3rd ed. draft), ch. 3 | https://web.stanford.edu/~jurafsky/slp3/3.pdf | 2024 | 高 | 交叉熵与困惑度 |
| 7 | softmax 把实数 logit 变成概率分布；温度参数控制分布的尖锐程度 | Goodfellow, Bengio & Courville, *Deep Learning*, ch. 6 | https://www.deeplearningbook.org/ | 2016 | 高 | 从分布到文字 / 温度 |
| 8 | 负对数似然最小化等价于最大似然估计 | Goodfellow, Bengio & Courville, *Deep Learning*, ch. 5 | https://www.deeplearningbook.org/ | 2016 | 高 | 训练目标 |
| 9 | 温度/截断/核采样会改变解码分布，影响多样性 | Holtzman et al., *The Curious Case of Neural Text Degeneration* | https://arxiv.org/abs/1904.09751 | 2020 | 高 | 解码策略 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| −ln 0.6 = 0.511 nat | 自然对数 | 信息量例子 |
| −ln 0.02 = 3.912 nat | 自然对数 | 信息量例子 |
| e^2.04 ≈ 7.7 | 指数 | 困惑度例子 |

## 核查记录

- [x] 所有公式性主张来自教材/论文，不靠博客。
- [x] 数字标注「示意」或「计算值」，不冒充模型测量。
- [x] 未引用无法核实的榜单或新闻。
