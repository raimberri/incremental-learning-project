# 第 2 章 梯度与反向传播 · 视频版

> 8 分 11 秒，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 10 个场景 / 97 句旁白。
> 课程正文直接使用 [`../../curriculum/02-梯度与反向传播.md`](../../curriculum/02-梯度与反向传播.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch2/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   12 条可核查主张 + 手算数值
└── video/
    ├── script/narration.json   逐句中英旁白（97 句）
    ├── script/storyboard.json  10 个 custom 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch2-backprop.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch2-backprop.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch2-backprop.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch2-backprop.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 反向传播 / Adam / Dropout / BatchNorm / ResNet / 趋化性 / 4D-Var 的来源 |
| `video/script/narration.json` | 逐句中英旁白（97 句） |
| `video/script/storyboard.json` | 10 个 custom 场景 + 图片清单 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 10 张照片的来源（3 复用 / 7 生成；7 张已收入 `asset-library`） |

## 分镜

| 时间 | 场景 | 内容 |
|---|---|---|
| 0:00 | 看不见地图的下山 | 参数是位置、损失是海拔；只能摸局部坡度 |
| 0:36 | 坡度变成向量 | 偏导数 → 梯度；θ ← θ − η∇L；只有一阶信息 |
| 1:22 | 一步迈多大 | 同一条抛物线，η 太小 / 合适 / 太大发散 |
| 2:07 | 抽样版的梯度 | mini-batch、噪声的好处、细菌趋化性（1972） |
| 2:53 | 一次反向，全部梯度 | 数值微分 ×N；链式法则 + 动态规划 |
| 4:14 | 手算一次 | wx+b、L=9、梯度 −18/−6；η=0.1 过头，η=0.02 更近 |
| 5:09 | 同一个算法的四个名字 | 伴随法 / 4D-Var / 反向 AD / 影子价格 |
| 5:57 | 让深层网络训得动 | Adam、Dropout、归一化、残差连接 |
| 6:57 | 记住，还是理解 | 训练/验证曲线、过拟合、正则化、奥卡姆剃刀 |
| 7:47 | 下一站 | 第 3 章 表示学习 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch2
$PY -m courseforge music courses/LLM/video/ch2
$PY -m courseforge check courses/LLM/video/ch2
$PY -m courseforge render courses/LLM/video/ch2
$PY -m courseforge thumbnail courses/LLM/video/ch2
$PY -m courseforge package courses/LLM/video/ch2
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 490.8 s（8:11） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264 High，CRF 20 |
| 音频 | AAC-LC 48 kHz 立体声；实测峰值 −1.3 dBFS，平均 −18.1 dB |
| 字幕 | 烧录中英双语；zh / en / bilingual 三份 SRT，各 97 条 |
| 文件 | 70.4 MB（约 1147 kbps） |
| 抽帧 | 50+ 张静帧覆盖每个场景、每个分相位与章节卡；轴标签、字幕带、卡片边界逐张检查 |
| 解码 | `ffmpeg -v error -i ... -f null -` 全片通过 |

## 与第 1 章的衔接

第 1 章把训练写成「最小化交叉熵」；本章回答参数怎么动。
结尾把「表示学习」作为下一章的空白，与导读的课程地图一致。
