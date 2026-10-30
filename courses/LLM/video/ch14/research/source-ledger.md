# 第 14 章 机制可解释性 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 叠加：$d$ 维空间最多只有 $d$ 个正交方向；特征足够稀疏时，可用近似正交的方向容纳远超 $d$ 个特征，代价是干扰 | Elhage et al., *Toy Models of Superposition* | https://arxiv.org/abs/2209.10652 | 2022 | 高 | 叠加场景 |
| 2 | Toy Models 的合成实验：特征数超过维度时，网络把特征成对塞进二维平面，形成三角形、五边形乃至更高维的多面体排列 | Elhage et al., *Toy Models of Superposition* | https://arxiv.org/abs/2209.10652 | 2022 | 高 | 叠加场景 |
| 3 | 稀疏度变化会让表示发生相变：从「每个特征一个维度」突然跳到「多个特征共享维度」 | Elhage et al., *Toy Models of Superposition* | https://arxiv.org/abs/2209.10652 | 2022 | 高 | 叠加场景 / 相变一句 |
| 4 | 多义神经元：同一个神经元会对「猫」「Python 代码」「韩文」都响应；这不是混乱，而是叠加下的压缩 | Bricken et al., *Towards Monosemanticity* | https://transformer-circuits.pub/2023/monosemantic-features | 2023 | 中 | 多义神经元 |
| 5 | SAE 结构：编码器把 $d$ 维激活映到 $m$ 维稀疏特征（$m \gg d$），解码器重建 $\hat{x} \approx x$ | Bricken et al., *Towards Monosemanticity* | https://transformer-circuits.pub/2023/monosemantic-features | 2023 | 高 | SAE 公式 |
| 6 | SAE 损失为重建误差加 $\ell_1$ 正则，$\ell_1$（Lasso）促使特征稀疏 | Bricken et al., *Towards Monosemanticity* | https://transformer-circuits.pub/2023/monosemantic-features | 2023 | 高 | SAE 公式 |
| 7 | Bricken 等在 512 个神经元的单层 Transformer 上训练 SAE，得到数千个可解释特征（DNA 序列、希伯来文、HTTP 请求、数学符号），且比原始神经元单义得多 | Bricken et al., *Towards Monosemanticity* | https://transformer-circuits.pub/2023/monosemantic-features | 2023 | 高 | 玩具模型实验 |
| 8 | 归纳头由前一个 token 头与归纳头组合：前者让位置 $i$ 带上「前一个是 B」，后者用这个信息匹配历史中「B 后面是 D」的位置并取回 D | Olsson et al., *In-context Learning and Induction Heads* | https://arxiv.org/abs/2209.11895 | 2022 | 高 | 归纳头 |
| 9 | 归纳头是涌现电路：训练早期没有，到某阶段突然形成，其形成与损失曲线的突然下降高度相关 | Olsson et al., *In-context Learning and Induction Heads* | https://arxiv.org/abs/2209.11895 | 2022 | 高 | 归纳头 / 涌现 |
| 10 | 激活修补把 A 输入某层的激活替换成 B 输入的，观察输出变化，提供因果而非相关的证据 | Meng et al., *Locating and Editing Factual Associations in GPT* (ROME) | https://arxiv.org/abs/2202.05262 | 2022 | 高 | 工具箱 |
| 11 | ROME 用激活修补定位事实关联所在的 MLP 层，再直接编辑权重，把「埃菲尔铁塔在巴黎」改成「在罗马」 | Meng et al., *Locating and Editing Factual Associations in GPT* (ROME) | https://arxiv.org/abs/2202.05262 | 2022 | 高 | ROME |
| 12 | SAE 在 512 个神经元的玩具模型上有效；到几千亿参数的模型，特征数量、训练成本、评估难度都爆炸 | 本章正文 §14.7（512 神经元数字引自 Bricken et al. 2023） | https://transformer-circuits.pub/2023/monosemantic-features | 2023 | 中 | 局限 |

## 说明

- 第 1–3 行同属 Toy Models 一篇；第 5–7、12 行同属 Towards Monosemanticity 一篇；第 8–9 行同属 Olsson 等；第 10–11 行同属 ROME。
- $d = 4096$ 是正文 §14.3 的举例，不是对某个具体模型的测量；旁白用「比如」标明，画面标「示意」。
- 第 4 行「猫 / Python 代码 / 韩文」是正文举的例子，置信度记为「中」，视频中只作定性说明，不当作论文的定量结论。
- §14.1 的定义、§14.6 的工具方法论、§14.7 的局限清单与安全结论属于正文的教学综合；视频不引入正文之外的数字或年份，因此不另立外部来源行。
