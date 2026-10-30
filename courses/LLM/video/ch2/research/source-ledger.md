# 第 2 章 梯度与反向传播 · 来源账本

| # | 主张 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|
| 1 | 反向传播把误差从输出层逐层反传，用链式法则求每个权重的梯度；一次前向 + 一次反向即可得到所有参数的梯度，计算量与一次前向同阶 | Rumelhart, Hinton & Williams, *Learning representations by back-propagating errors*, Nature 323(6088):533–536 | https://doi.org/10.1038/323533a0 | 1986 | 高 | 反向传播 / 一次前向一次反向 |
| 2 | 梯度是损失对所有参数的偏导数组成的向量，指向函数上升最快的方向；沿负梯度方向更新可降低损失 | Goodfellow, Bengio & Courville, *Deep Learning*, ch. 4 & 8 | https://www.deeplearningbook.org/ | 2016 | 高 | 梯度 / 更新规则 |
| 3 | 梯度下降的更新式 θ ← θ − η∇L；学习率控制步长，过大可能导致发散 | Ruder, *An overview of gradient descent optimization algorithms* | https://arxiv.org/abs/1609.04747 | 2016 | 高 | 学习率 / 两个失败模式 |
| 4 | mini-batch SGD 用一小批样本的梯度估计全体梯度，抽样带来噪声 | Ruder, *An overview of gradient descent optimization algorithms* | https://arxiv.org/abs/1609.04747 | 2016 | 高 | 随机梯度下降 |
| 5 | 大肠杆菌的趋化性：检测到营养浓度上升就减少翻滚、继续直游，反之增加翻滚换向；无需全局地图，只靠局部导数和噪声探索 | Berg & Brown, *Chemotaxis in Escherichia coli analysed by three-dimensional tracking*, Nature 239:500–504 | https://doi.org/10.1038/239500a0 | 1972 | 高 | SGD 的噪声 / 细菌的翻滚 |
| 6 | Adam 为每个参数维护梯度的一阶矩与二阶矩，用两者之比自适应调整步长；默认 β₁=0.9，β₂=0.999，ε=1e−8 | Kingma & Ba, *Adam: A Method for Stochastic Optimization*, ICLR 2015 | https://arxiv.org/abs/1412.6980 | 2014（arXiv）/ 2015（ICLR） | 高 | 四个工程发明 / Adam |
| 7 | Dropout 训练时以概率 p 随机置零神经元，测试时缩放；相当于廉价地训练并平均指数多个子网络，减少过拟合 | Srivastava, Hinton, Krizhevsky, Sutskever & Salakhutdinov, *Dropout*, JMLR 15(56):1929–1958 | https://jmlr.org/papers/v15/srivastava14a.html | 2014 | 高 | 四个工程发明 / Dropout |
| 8 | BatchNorm 把每层输入标准化到均值 0、方差 1，再学缩放与平移，稳定训练并允许更大学习率 | Ioffe & Szegedy, *Batch Normalization*, ICML 2015 | https://arxiv.org/abs/1502.03167 | 2015 | 高 | 四个工程发明 / 归一化 |
| 9 | 残差连接 h_{l+1} = h_l + F(h_l)，让梯度沿恒等路径直接回流，使上百层网络可训练 | He, Zhang, Ren & Sun, *Deep Residual Learning for Image Recognition*, CVPR 2016 | https://doi.org/10.1109/CVPR.2016.90 | 2015（arXiv）/ 2016（CVPR） | 高 | 四个工程发明 / 残差连接 |
| 10 | 4D-Var 变分同化用伴随方法（adjoint）反推初始场；与反向传播共享「一次反向遍历求所有输入梯度」的内核 | Le Dimet & Talagrand, *Variational algorithms for analysis and assimilation of meteorological observations: theoretical aspects*, Tellus A 38:97–110 | https://doi.org/10.3402/tellusa.v38i2.11706 | 1986 | 高 | 三个别名 / 气象学 |
| 11 | 反向模式自动微分（reverse-mode AD）在程序上做链式法则，一次反向传播得到所有输入的梯度；PyTorch Autograd 即此类实现 | Baydin, Pearlmutter, Radul & Siskind, *Automatic Differentiation in Machine Learning: a Survey*, JMLR 18(153):1–43 | https://jmlr.org/papers/v18/17-468.html | 2018 | 高 | 三个别名 / Autograd |
| 12 | 影子价格：约束每放松一个单位，最优目标值的改善量；在数学上即对偶变量 / 拉格朗日乘子 | Bertsimas & Tsitsiklis, *Introduction to Linear Optimization*, ch. 5 | https://athenasc.com/linoptbook.html | 1997 | 中（标准定义，非论文结论） | 三个别名 / 经济学 |

## 计算值（算术，不是测量）

| 值 | 计算 | 用在哪 |
|---|---|---|
| ŷ = 7 | w=2, x=3, b=1 → 2·3+1 | 手算例子 / 前向 |
| e = −3，L = 9 | ŷ−y = 7−10；e² | 手算例子 / 损失 |
| ∂L/∂ŷ = −6 | 2e = −6 | 手算例子 / 反向 |
| ∂L/∂w = −18，∂L/∂b = −6 | −6·x = −18；−6·1 = −6 | 手算例子 / 反向 |
| w=3.8, b=1.6, ŷ=13 | η=0.1 → 2+1.8，1+0.6 | 学习率过大 / 过头 |
| w=2.36, b=1.12, ŷ=8.2 | η=0.02 → 2+0.36，1+0.12 | 学习率合适 / 靠近 |

## 核查记录

- [x] 反向传播、Adam、Dropout、BatchNorm、ResNet 的来源为论文/会议原文。
- [x] Berg & Brown 1972 与 Le Dimet & Talagrand 1986 的 DOI 经 Crossref 核对。
- [x] 手算例子的每个数字都由算术复核，不冒充训练日志。
- [x] 「八十年代一深就训不动」「四个发明」属历史概括，正文用限定语，不写成精确测量。
- [ ] 「影子价格」为经济学标准定义，未逐页核对教材页码（不影响视频论述）。
