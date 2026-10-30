# 第 6 章 预训练 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 2017 年前 NLP 的标准流程：每个任务一份标注数据、一个模型；换任务就重训，语言知识无法复用 | 本课程正文 §6.1（综述性描述，无可引原文） | https://arxiv.org/abs/1810.04805 | 2019 | 中 | 开场 / 瓶颈 |
| 2 | 标注成本来自人工：一条数据要人读、人判、人填 | 正文 §6.1 | https://www.deeplearningbook.org/ | 2016 | 中 | 瓶颈 |
| 3 | 互联网上有「几万亿 token」的无标注文本，本身即答案 | 正文 §6.1（量级表述，正文未给出处） | https://commoncrawl.org/ | 2026（访问） | 中 | 自监督动机 |
| 4 | 掩码语言模型随机挖掉句中 15% 的词，用上下文把它们填回（完形填空 / 闭合） | Devlin, Chang, Lee & Toutanova, *BERT* | https://arxiv.org/abs/1810.04805 | 2019 | 高 | 掩码 / 15% |
| 5 | GPT-1 用 12 层 Transformer 解码器（约 1.17 亿参数），在 BooksCorpus（约 7000 本未出版的书）上做下一词预测；12 个任务中 9 个刷新纪录 | Radford, Narasimhan, Salimans & Sutskever, *Improving Language Understanding by Generative Pre-Training* | https://openai.com/research/language-unsupervised | 2018 | 中（数字取自正文，未逐页核对论文表格） | GPT-1 配方 |
| 6 | BERT 用编码器、MLM（15%）+ NSP；数据为 BooksCorpus + 英文维基百科约 33 亿词；Base 1.1 亿 / Large 3.4 亿参数；11 个任务刷新 SOTA | Devlin et al., *BERT* | https://arxiv.org/abs/1810.04805 | 2019 | 中（同上） | BERT 配方 |
| 7 | BERT 的训练目标与生成不匹配：擅长填空与分类，不能直接从头写文章 | 正文 §6.4 + BERT 的 MLM/NSP 目标定义 | https://arxiv.org/abs/1810.04805 | 2019 | 高 | 双向的弱 |
| 8 | GPT-2：15 亿参数（约 GPT-1 的 13 倍）、40GB WebText、零样本；标题即 *Language Models are Unsupervised Multitask Learners* | Radford, Wu, Child, Luan, Amodei & Sutskever, *GPT-2* | https://openai.com/research/better-language-models | 2019 | 中（数字取自正文） | GPT-2 / 零样本 |
| 9 | 自回归对每个位置都产生训练信号，MLM 只有 15% 的位置有信号，数据利用率差近 7 倍 | 正文 §6.7 + Devlin et al. 的 15% 掩码比例 | https://arxiv.org/abs/1810.04805 | 2019 | 高 | 为什么自回归 |
| 10 | 2019 年底 BERT 如日中天、GPT-2 只是「有趣但不够实用」；2020 年起天平倒向自回归 | 正文 §6.7（作者的路线判断，无可引论文） | https://www.deeplearningbook.org/ | 2016 | 中 | 转向 |
| 11 | 模型足够大时微调变得不必要，范式从「预训练 + 微调」转向「预训练 + 提示」（GPT-3 的发现） | Brown et al., *Language Models are Few-Shot Learners* | https://arxiv.org/abs/2005.14165 | 2020 | 高 | 代价 / 类比边界 |
| 12 | 预训练的三个代价：数据截止、分布偏移、无法追溯（既是版权也是可解释性问题） | 正文 §6.8 | https://arxiv.org/abs/2005.14165 | 2020 | 中 | 代价 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 6.7 倍 | 1 ÷ 0.15 = 6.67 | 自回归与 MLM 的数据利用率之比，正文称「近 7 倍」 |
| 约 13 倍 | 15 亿 ÷ 1.17 亿 = 12.8 | GPT-2 相对 GPT-1 的参数量 |
| 75% | 9 ÷ 12 = 0.75 | GPT-1 在 12 个任务中刷新纪录的比例 |

## 核查记录

- [x] BERT 的 arXiv 编号 1810.04805、标题与 2019 年取自 `_bib.json`；15% 掩码比例与 MLM/NSP 目标按论文摘要与正文引用。
- [x] GPT-1、GPT-2 的链接取 `_bib.json` 的 `openai.com/research/...` 页面，未另造 DOI 或 PDF 地址。
- [x] GPT-3 的「预训练 + 提示」判断以 `_bib.json` 的 arXiv 2005.14165 为据。
- [ ] GPT-1 的 12 层、1.17 亿参数、7000 本书未逐页核对论文表格；按正文引用，置信度记「中」，旁白照正文说法。
- [ ] BERT 的 33 亿词、11 个任务、Base/Large 参数量同样按正文引用，未逐页核对原文数字表。
- [ ] 第 3 行「几万亿 token」是量级表述，正文未标注来源，旁白也只说「几万亿」，不给精确数。
- [ ] 第 10 行是课程作者的路线判断（谁赢、从哪年起），不是论文结论，未编造引用。
