# 第 15 章 智能体与前沿 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 智能体循环把推理与行动交替起来：思考、行动、观察，直到任务结束 | Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models* | https://arxiv.org/abs/2210.03629 | 2023 | 高 | 四拍循环 |
| 2 | OODA 循环：观察、判断、决策、行动，转得更快的一方先修正 | Boyd, *The Essence of Winning and Losing*（OODA 简报原文） | https://www.danford.net/boyd/essence.htm | 1996 | 中 | 四拍循环 |
| 3 | 工具调用（函数调用）：模型输出结构化调用，真正执行的是外部运行时 | Schick et al., *Toolformer: Language Models Can Teach Themselves to Use Tools* | https://arxiv.org/abs/2302.04761 | 2023 | 高 | 工具 / 函数调用 |
| 4 | 2024 年 Anthropic 提出 MCP，统一模型连接工具与数据源的协议 | Anthropic, *Introducing the Model Context Protocol* | https://www.anthropic.com/news/model-context-protocol | 2024 | 高 | 工具协议 |
| 5 | 接口标准化降低适配成本，不降低计算成本（集装箱 1956、USB、HTTP） | Britannica, *Containerization*（集装箱标准化降低转运成本） | https://www.britannica.com/technology/containerization | 2024（访问） | 中 | 工具协议 |
| 6 | 记忆三层：短期在上下文、长期在向量库或文件、程序性在权重 | Atkinson & Shiffrin, *Human Memory: A Proposed System and Its Control Processes* | https://doi.org/10.1016/S0079-7421(08)60422-3 | 1968 | 中 | 记忆分三层 |
| 7 | 长期记忆的做法：重要信息写成文本、向量化、需要时检索回上下文，即 RAG | Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* | https://arxiv.org/abs/2005.11401 | 2020 | 高 | 记忆分三层 |
| 8 | 多智能体每次交接都是有损压缩；保真度 90% 经 10 个环节约剩 35%（计算值） | 正文 §15.4 + 本页计算 | 计算值（见表后） | — | 高 | 分工还是传话 |
| 9 | 复合误差：每步 95% 成功率，20 步约 36%，100 步约 0.6%（计算值） | 正文 §15.5 + 本页计算 | 计算值（见表后） | — | 高 | 复合误差 |
| 11 | 间接提示注入：外部数据被当成指令；与 SQL 注入同构，数据被当成代码 | OWASP, *SQL Injection*（数据被当成代码的同构风险） | https://owasp.org/www-community/attacks/SQL_Injection | 2024（访问） | 高 | 提示注入 |
| 12 | SWE-agent 为模型设计 agent-computer interface，让模型接上代码库与终端 | Yang et al., *SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering* | https://arxiv.org/abs/2405.15793 | 2024 | 高 | 前沿几条线 |
| 13 | SWE-bench 用真实 GitHub issue 评测代码智能体，是「能交付」的评测代表 | Jimenez et al., *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?* | https://arxiv.org/abs/2310.06770 | 2024 | 高 | 前沿几条线 / 评测 |
| 14 | 对齐伪装：模型可能学会在训练中「表现得对齐」 | Greenblatt et al., *Alignment Faking in Large Language Models* | https://arxiv.org/abs/2412.14093 | 2024 | 高 | 前沿几条线 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| 0.36 | 0.95^20 = 0.3585，假设每步独立、单步成功率均为 95% | 复合误差 |
| 0.006 | 0.95^100 = 0.0059，同上假设 | 复合误差 |
| 35% | 0.9^10 = 0.3487，假设每环节保真度 90% | 多智能体传话 |

## 核查记录

- [x] ReAct、Toolformer、RAG、SWE-agent、SWE-bench、Alignment Faking 的 arXiv 编号与标题已对照 `_bib.json`。
- [x] 三个幂次由本页算得，旁白读作「零点九五的二十次方」，画面标「计算值 · 独立假设」。
- [x] 「OODA」「负反馈」「集装箱 1956」只按正文表述使用，未补年份与人物生卒。
- [ ] MCP 的规范版本号与 2024 年发布日期无 `_bib` 条目，未写进画面，仅按正文说「2024 年，Anthropic 提出」。
- [ ] 正文 §15.3 只写「写入」与「检索」；「遗忘/清理」在本片只作为工程设计问题提出，未当作事实断言。
