# 第 3 章 词的数字分身 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | one-hot 向量只有一个分量为 1，任意两个不同词的向量正交，内积为 0，无法表达相似性 | Goodfellow, Bengio & Courville, *Deep Learning*, ch. 15 | https://www.deeplearningbook.org/contents/representation.html | 2016 | 高 | one-hot 的两个毛病 |
| 2 | 分布式假设：上下文相似的词，意义也相似；Harris 1954 系统提出 | Harris, *Distributional Structure*, Word 10(2–3):146–162 | https://doi.org/10.1080/00437956.1954.11659520 | 1954 | 高 | 分布式假设 |
| 3 | “You shall know a word by the company it keeps” 出自 Firth 1957 的论文 *A Synopsis of Linguistic Theory, 1930–1955* | Firth, *Papers in Linguistics 1934–1951* / *Studies in Linguistic Analysis* | http://htl.linguist.univ-paris-diderot.fr/_media/leon/firth2007pdf.pdf | 1957 | 高 | 观其伴，知其义 |
| 4 | word2vec 用 CBOW 与 Skip-gram 两个变体，以预测上下文为训练任务，得到 100–300 维稠密词向量 | Mikolov, Chen, Corrado & Dean, *Efficient Estimation of Word Representations in Vector Space* | https://arxiv.org/abs/1301.3781 | 2013 | 高 | word2vec |
| 5 | 词向量的线性类比（国王 − 男人 + 女人 ≈ 女王）近似成立，依赖训练细节 | Mikolov, Yih & Zweig, *Linguistic Regularities in Continuous Space Word Representations* | https://arxiv.org/abs/1301.4547 | 2013 | 高 | 语义变成位移 |
| 6 | 负采样把多分类 softmax 改为二分类，计算量从 O(V) 降到 O(k)，k 常取 5–20 | Mikolov et al., *Distributed Representations of Words and Phrases and their Compositionality* | https://arxiv.org/abs/1310.4546 | 2013 | 高 | 负采样 |
| 7 | BPE 最初是 1994 年 Philip Gage 提出的数据压缩算法，2016 年被 Sennrich 等人用于神经机器翻译分词 | Gage, *A New Algorithm for Data Compression*, C Users Journal 12(2) | https://www.drdobbs.com/article/print?articleId=184402829 | 1994 | 高 | BPE 的来源 |
| 8 | 子词 BPE 用合并高频相邻符号的方式构造词表，可表示任意字符串，避免 OOV | Sennrich, Haddow & Birch, *Neural Machine Translation of Rare Words with Subword Units* | https://arxiv.org/abs/1508.07909 | 2016 | 高 | 子词与 BPE |
| 9 | 字节级 BPE 以字节为最小单位，任何 Unicode 文本都能编码，不会出现 OOV | Radford, Wu, Child, Luan, Amodei & Sutskever, *Language Models are Unsupervised Multitask Learners* (GPT-2) | https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf | 2019 | 高 | 字节级 BPE |
| 10 | 上下文相关表示：ELMo 用双向 LSTM，BERT 用 Transformer，同一词在不同语境得到不同向量 | Peters et al., *Deep contextualized word representations*; Devlin et al., *BERT* | https://arxiv.org/abs/1802.05365 | 2018 | 高 | 静态 vs 上下文相关 |
| 11 | 嵌入矩阵 E ∈ R^(V×d)，GPT-3 的 d=12288、词表 50257，嵌入约 6.2 亿参数；输入输出嵌入可共享权重 | Brown et al., *Language Models are Few-Shot Learners* (GPT-3), Table 2.1 | https://arxiv.org/abs/2005.14165 | 2020 | 高 | 嵌入层 / 参数量 |
| 12 | AlexNet 在 2012 年 ImageNet 上大幅降低错误率，模型约 6000 万参数 | Krizhevsky, Sutskever & Hinton, *ImageNet Classification with Deep Convolutional Neural Networks* | https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html | 2012 | 高 | 嵌入层比 AlexNet 大 |
| 13 | 正弦/余弦位置编码由不同频率构成，使相对位置可由线性变换表示 | Vaswani et al., *Attention Is All You Need*, §3.5 | https://arxiv.org/abs/1706.03762 | 2017 | 高 | 位置编码 |
| 14 | RoPE 用旋转矩阵编码相对位置，细节依赖注意力形式 | Su, Lu, Pan, Murtadha, Wen & Liu, *RoFormer: Enhanced Transformer with Rotary Position Embedding* | https://arxiv.org/abs/2104.09864 | 2021 | 高 | 位置编码 / 留到第 5 章 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 6.2 亿 | 50257 × 12288 = 617,558,016 | 嵌入层参数量 |
| 约 1/166 | 300 / 50000 | 稠密向量维度与 one-hot 维度之比 |
| O(k) | k = 5–20，词表 V ≈ 5 万 | 负采样计算量 |

## 核查记录

- [x] Harris 1954 的 DOI 经 Crossref 核对：10.1080/00437956.1954.11659520。
- [x] word2vec、负采样、BPE、BERT、GPT-3、RoPE 的 arXiv 编号与标题一致。
- [x] GPT-3 的 d 与词表大小取自论文 Table 2.1；乘积由算术复核。
- [x] 「观其伴，知其义」的英文原文与出处以 Firth 1957 为准，中文为意译。
- [ ] Gage 1994 的原文页为 Dr. Dobb's 归档页，未逐页核对页码。
