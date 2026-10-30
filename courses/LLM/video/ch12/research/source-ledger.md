# 第 12 章 开卷与长记忆 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | RAG 结合两种记忆：参数记忆是预训练 seq2seq 模型，非参数记忆是维基百科的稠密向量索引，由神经检索器访问 | Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (NeurIPS 2020) | https://arxiv.org/abs/2005.11401 | 2020 | 高 | §2 两种记忆 |
| 2 | 论文在三个开放域问答任务上刷新 SOTA，生成的语言更具体、更多样 | 同上（摘要） | https://arxiv.org/abs/2005.11401 | 2020 | 高 | §2 收尾 |
| 3 | 纯参数模型难以为判断提供出处，更新世界知识仍是开放问题——这正是 RAG 的动机 | 同上（摘要） | https://arxiv.org/abs/2005.11401 | 2020 | 高 | §1 三个盲区 |
| 4 | 长上下文里，改变相关信息所在位置会显著改变性能 | Liu et al., *Lost in the Middle: How Language Models Use Long Contexts*（TACL；arXiv v1 2023-07-06） | https://arxiv.org/abs/2307.03172 | 2023 | 高 | §6 中间遗失 |
| 5 | 相关信息在开头或结尾时准确率最高，必须用到中间时显著下降，即使是显式长上下文模型 | 同上（摘要） | https://arxiv.org/abs/2307.03172 | 2023 | 高 | §6 U 形曲线 |
| 6 | 该实验只做两个任务：多文档问答与键值检索——不是通用「长文理解」结论 | 同上（摘要） | https://arxiv.org/abs/2307.03172 | 2023 | 高 | §6 实验设定 |
| 7 | GPT-3 的上下文窗口为 2048 token | Brown et al., *Language Models are Few-Shot Learners* (Table 2.1) | https://arxiv.org/abs/2005.14165 | 2020 | 高 | §5 窗口起点 |
| 8 | Llama 3.1 把上下文扩展到 128K token | 正文 §12.4；已核对 Meta 官方发布博客（2024-07-23），该博客链接未收录于 `_bib.json` | https://ai.meta.com/blog/meta-llama-3-1/ | 2024 | 高 | §5 窗口现状 |
| 9 | 位置插值/外推把训练时未见过的长位置压缩回已见范围 | 正文 §12.4、§5.5（RoFormer 等原论文未收录于 `_bib.json`） | https://arxiv.org/abs/2306.15595 | 2023 | 中 | §5 位置外推 |
| 10 | FlashAttention 以 IO 感知的分块减少显存读写，是长上下文可用的工程支柱之一 | Dao et al., *FlashAttention* | https://arxiv.org/abs/2205.14135 | 2022 | 高 | §5 注意力效率 |
| 11 | GQA 让多组查询头共享 KV，降低长上下文推理的显存与带宽 | Ainslie et al., *GQA* | https://arxiv.org/abs/2305.13245 | 2023 | 高 | §5 注意力效率 |
| 12 | 句向量模型来自 BERT 家族编码器；它不是静态词向量，向量随语境变化 | Devlin et al., *BERT* | https://arxiv.org/abs/1810.04805 | 2019 | 高 | §7 嵌入 |
| 13 | 余弦相似度等于点积除以两个模长之积，只比较方向，与向量长度无关 | 数学定义；正文 §3.3 已给出，§12.3 复用（无需引用论文） | https://en.wikipedia.org/wiki/Cosine_similarity | 2026（访问） | 高 | §7 公式 |
| 14 | 混合检索的工程做法：BM25 关键词召回 + 向量召回合并，再由交叉编码器重排 | 正文 §12.3（BM25 原论文、HNSW 原论文未收录于 `_bib.json`） | https://doi.org/10.1561/1500000019 | 2009 | 中 | §8 重排 |

## 核查记录

- [x] RAG 的「三个开放域问答」「更具体、更多样」以 arXiv 2005.11401 摘要为准；论文另称答案更 factual，旁白按正文只说具体与多样。
- [x] Lost in the Middle 的年份按 arXiv v1（2023-07-06）写「2023 年」，与正文一致；TACL 正式卷期为 2023 年接收。
- [x] GPT-3 的 2048 token 取自论文 Table 2.1（n_ctx = 2048）。
- [x] Llama 3.1 的 128K 已对 Meta 官方博客核对；因 `_bib.json` 无该条目，表内 URL 留空，不做伪装引用。
- [!] 位置插值/外推、BM25、HNSW 三条只有正文依据，原论文未收录于 `_bib.json`；旁白只作定性描述，不给数字。
- [!] 正文提到的 Claude 200K、Gemini 百万级窗口未写入旁白（本视频只保留可核对的 2048 与 128K 两个数）。
