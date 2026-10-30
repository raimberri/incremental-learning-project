# 第 13 章 评测与幻觉 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | MMLU 覆盖 57 个学科、约 1.4 万道选择题，2021 年发布，考的是世界知识 | Hendrycks et al., *Measuring Massive Multitask Language Understanding* | https://arxiv.org/abs/2009.03300 | 2021 | 高 | 基准演化 |
| 2 | GSM8K 是小学数学应用题，约 8.5 千题，2021 年发布 | Cobbe et al., *Training Verifiers to Solve Math Word Problems* | https://arxiv.org/abs/2110.14168 | 2021 | 高 | 基准演化 |
| 3 | HumanEval 只有 164 道手写 Python 函数题，2021 年发布 | Chen et al., *Evaluating Large Language Models Trained on Code* | https://arxiv.org/abs/2107.03374 | 2021 | 高 | 基准演化 |
| 4 | HLE 有 2500 道专家题，2025 年初发布，前沿模型发布时准确率只有个位数；它是旧基准饱和后的极限测试 | Phan et al., *Humanity's Last Exam* | https://arxiv.org/abs/2501.14249 | 2025 | 高 | 基准演化 / 军备竞赛 |
| 5 | 静态基准三个问题：可以猜、可被考试技巧打败、可能被污染；生成式判分受格式与测试用例数量限制 | 本课程正文 §13.3（对文献的综述性结论） | https://arxiv.org/abs/2304.15004 | 2023 | 高 | 三种评测范式 |
| 6 | LLM-as-judge 有位置、长度、自我、格式四种偏好；缓解靠随机换序、隐藏身份、多裁判投票、人类标注校准 | 本课程正文 §13.3 | https://arxiv.org/abs/2306.05685 | 2023 | 高 | 裁判也有偏好 |
| 7 | Chatbot Arena 让用户对两个匿名回答二选一，用 Bradley–Terry 算 Elo；它测的是人类喜欢，不是事实正确 | 本课程正文 §13.3、§8.3 | https://arxiv.org/abs/2306.05685 | 2023 | 高 | 三种评测范式 |
| 8 | 污染指测试题及参考答案出现在训练数据里；检测用 n-gram 重叠、canary 字符串、扰动测试 | 本课程正文 §13.4 | https://arxiv.org/abs/2303.08774 | 2023 | 高 | 考试泄题 |
| 9 | 幻觉分事实性与忠实性；成因包括目标不匹配、数据有错、解码随机、RLHF 副作用、知识边界模糊；不可能完全消除 | 本课程正文 §13.5 | https://doi.org/10.1145/3571730 | 2023 | 高 | 幻觉分类 / 成因 |
| 10 | RLHF 用人类偏好做奖励，评分者偏爱「有问必答」，模型因此学会少说「不知道」 | Ouyang et al., *Training Language Models to Follow Instructions with Human Feedback*；正文 §8.7、§13.5 | https://arxiv.org/abs/2203.02155 | 2022 | 中 | 幻觉成因 |
| 11 | 校准：完美校准的置信度—准确率曲线是对角线，实际模型常过度自信（说 95% 只对 70%）；ECE 按置信度分桶，对桶内置信度与准确率之差取绝对值，再按样本量加权平均 | 本课程正文 §13.6 | https://arxiv.org/abs/1706.04599 | 2017 | 高 | 校准与 ECE |
| 12 | 信度、效度、生态效度是心理测量学的三把尺子；Campbell 定律与 Goodhart 定律指出指标一旦用于决策或成为目标就会失真 | 本课程正文 §13.7 | https://doi.org/10.1037/h0046016 | 1959 | 高 | 构念效度 / 指标成了目标 |
| 13 | MMLU 的「人类专家」基线约 89.8%，但那是特定一组标注者的成绩，不是普遍人类水平 | Hendrycks et al., *Measuring Massive Multitask Language Understanding*；正文 §13.7 | https://arxiv.org/abs/2009.03300 | 2021 | 中 | 四问一条新闻 |
| 14 | 「自洽性」作为第三类幻觉：正文 §13.5 只列事实性与忠实性两类，视频按任务要求补第三类，依据是「多次采样不一致说明模型不确定」（§9.3 多采样一致性） | 本课程正文 §13.5、§9.3；Wang et al., *Self-Consistency Improves Chain of Thought Reasoning* | https://arxiv.org/abs/2203.11171 | 2023 | 中 | 幻觉分类 |

## 备注

- 表中「—」表示该主张来自课程正文的综述，正文未给出单一可引链接；不编造 DOI 或页码。
- 第 13 行：89.8% 在正文中作为 MMLU 人类专家基线出现，原始统计口径（标注者人数、题目子集）未在正文说明，视频只按正文口径引用。
- 第 14 行：自洽性为任务书要求的第三类，正文原话是「两种类型」；视频只用「同一问题多次回答互相矛盾」这一可核查的表述，不引申新机制。
- 旁白中出现的「95% 对 70%」「损失降 0.1」「MMLU 涨 2 分」都是正文里的示例数字，画面标注「示意」。
