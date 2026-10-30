# 第 4 章 从 RNN 到注意力 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | RNN 的隐藏状态由上一状态与当前输入共同决定，权重在所有时间步共享；按时间展开后层数等于序列长度 | Hochreiter & Schmidhuber, *Long Short-Term Memory*, Neural Computation 9(8) | https://doi.org/10.1162/neco.1997.9.8.1735 | 1997 | 高 | 记忆变成循环 / 展开成深图 |
| 2 | 沿时间反向传播要反复乘以同一权重矩阵与 tanh 导数，误差信号会指数衰减或爆炸 | 同上（§1 对 BPTT 误差流的讨论） | https://doi.org/10.1162/neco.1997.9.8.1735 | 1997 | 高 | 消失与爆炸 |
| 3 | LSTM 用输入门、遗忘门、输出门与细胞状态；遗忘门≈1 时细胞状态近似恒等，误差沿加法路径回传（constant error carousel） | 同上 | https://doi.org/10.1162/neco.1997.9.8.1735 | 1997 | 高 | 给记忆装门 / 三门与一条记忆 |
| 4 | seq2seq 用 LSTM 编码器—解码器，先把源句编码为固定维度向量，再逐词解码 | Sutskever, Vinyals & Le, *Sequence to Sequence Learning with Neural Networks* | https://arxiv.org/abs/1409.3215 | 2014 | 高 | 整句压成一个向量 |
| 5 | 固定维度向量是长句的瓶颈：整句信息被压进单一向量 | 同上（§1、§3 的讨论） | https://arxiv.org/abs/1409.3215 | 2014 | 高 | 整句压成一个向量 |
| 6 | 解码每一步以正确的上一个词为条件（教师强制），训练更稳定 | 同上（训练目标为给定前词的对数似然） | https://arxiv.org/abs/1409.3215 | 2014 | 中 | 整句压成一个向量 |
| 7 | Bahdanau 注意力：解码器每步对编码器所有状态打分、softmax 归一化、加权求和得上下文向量 | Bahdanau, Cho & Bengio, *Neural Machine Translation by Jointly Learning to Align and Translate* | https://arxiv.org/abs/1409.0473 | 2014（arXiv）/ 2015（ICLR） | 高 | 每一步都回看 |
| 8 | 对齐由联合训练自行学出，没有人工对齐标注；权重每次解码重算，整个操作可微 | 同上 §3 | https://arxiv.org/abs/1409.0473 | 2015 | 高 | 每一步都回看 / 查询、键、值 |
| 9 | 注意力的一般形式为 Query/Key/Value：以相似度作权重对 Value 加权求和 | Vaswani et al., *Attention Is All You Need* | https://arxiv.org/abs/1706.03762 | 2017 | 高 | 查询、键、值 |
| 10 | 循环结构无法在样本内并行，注意力层可并行；这是去掉循环的直接动因 | 同上（摘要与 §3.2） | https://arxiv.org/abs/1706.03762 | 2017 | 高 | 为什么能并行 |
| 12 | GRU 是 LSTM 的简化门控变体：门更少、参数更少 | Cho et al., *Learning Phrase Representations using RNN Encoder–Decoder*, arXiv:1406.1078 | https://arxiv.org/abs/1406.1078 | 2014 | 高 | 三门与一条记忆 |
| 13 | 注意力权重高不等于模型真正依赖该位置，注意力图是线索而非解释的证明 | Jain & Wallace, *Attention is not Explanation*, arXiv:1902.10186 | https://arxiv.org/abs/1902.10186 | 2019 | 高 | 每一步都回看 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 0.5% | 0.9^50 = 0.00515…，约 0.5% | 传话游戏（正文估算，非实测） |
| 50 层 | 50 个词 → 展开 50 个时间步 | 展开成深图（示意） |

## 核查记录

- [x] LSTM 1997 的 DOI 与标题逐字取自 `_bib.json`（`hochreiter1997`），未改写。
- [x] seq2seq 2014、Bahdanau 2014/2015、Vaswani 2017 的 arXiv 编号与 `_bib.json` 一致。
- [x] 0.9^50 由算术复核为 0.00515，旁白读作「百分之零点五」。
- [x] 旁白年份只出现 1997、2014、2017，与正文一致；未引入正文之外的数字。
- [ ] GRU 无 `_bib.json` 条目，旁白只保留「简化版」一句，不含年份与论文名。
- [ ] 「权重高≠依赖」在正文 §4.5 引 Jain & Wallace 2019，`_bib.json` 未收录，旁白只作提醒、不点名。
- [x] 「2017 年 LSTM 仍是翻译主流」为正文判断，本视频不作为断言；账本行已删除。
