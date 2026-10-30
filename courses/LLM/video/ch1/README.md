# 第 1 章 语言的概率论 · 视频版

> 9 分 02 秒，1920×1080，30 fps，中文配音 + 中英双语字幕。
> 10 个场景 / 103 句旁白。
> 课程正文直接使用 [`../../curriculum/01-语言的概率论.md`](../../curriculum/01-语言的概率论.md)，不在章节目录里复制。

## 目录

```text
courses/LLM/video/ch1/
├── course.json                 courseforge 的 slug / composition / 帧率
├── brief.md                    视频合同
├── README.md                   本文件
├── research/source-ledger.md   9 条可核查主张
└── video/
    ├── script/narration.json   逐句中英旁白（103 句）
    ├── script/storyboard.json  10 个 custom 场景 + 图片清单
    ├── remotion/               Remotion 工程（src / public / package.json）
    └── out/                    唯一交付目录：mp4 + poster + subs
```

## 文件

| 文件 | 说明 |
|---|---|
| `video/out/llm-ch1-probability.mp4` | 成片（H.264 + AAC，1920×1080） |
| `video/out/poster.jpg` | 封面 |
| `video/out/subs/llm-ch1-probability.zh.srt` | 中文字幕 |
| `video/out/subs/llm-ch1-probability.en.srt` | 英文字幕 |
| `video/out/subs/llm-ch1-probability.bilingual.srt` | 中英双语字幕 |
| `brief.md` | 范围、学习者、验收 |
| `research/source-ledger.md` | 熵 / 交叉熵 / 困惑度 / softmax / n-gram / Bengio 2003 的来源 |
| `video/script/narration.json` | 逐句中英旁白（103 句） |
| `video/script/storyboard.json` | 10 个 custom 场景 + 图片清单 |
| `video/remotion/` | 可重建的 Remotion 工程 |
| `video/asset-credits.md` | 10 张生成图的来源 |

## 分镜

| 时间 | 场景 | 内容 |
|---|---|---|
| 0:00 | 我养了一只…… | 猫 / 狗 / 不太可能是微波炉 |
| 0:28 | 一台只做一件事的机器 | 四词表分布；语言模型 = 文本 → 分布 |
| 1:20 | 一句话的概率 | 链式法则、自回归、下溢与对数 |
| 2:15 | 两代语言模型 | n-gram 的稀疏与不共享；Bengio 2003 |
| 3:20 | 意外与熵 | 负 log p、信息量、熵 |
| 4:08 | 交叉熵与困惑度 | KL、0.511 vs 3.912 nat、PPL = e^H |
| 5:25 | 两条曲线 | −log q 曲线；交叉熵 = 熵 + KL 的面积图 |
| 5:45 | 训练目标 | 负对数似然、最大似然 |
| 6:25 | 从分布到文字 | logit、softmax、温度、S 形曲线、解码策略 |
| 7:39 | 天花板与地板 | 记忆 vs 规则、幻觉的缝隙 |
| 8:39 | 下一站 | 第 2 章 梯度与反向传播 |

（时间为近似值，以 `video/remotion/src/data/timeline.json` 为准。）

## 重新生成

```bash
cd "$(git rev-parse --show-toplevel)"
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

$PY -m courseforge voice courses/LLM/video/ch1
$PY -m courseforge music courses/LLM/video/ch1
$PY -m courseforge check courses/LLM/video/ch1
$PY -m courseforge render courses/LLM/video/ch1
$PY -m courseforge thumbnail courses/LLM/video/ch1
```

## 规格与 QA

| 项 | 结果 |
|---|---|
| 时长 | 541.8 s（9:02） |
| 画幅 / 帧率 | 1920×1080 / 30 fps |
| 视频 | H.264 High，CRF 20 |
| 音频 | AAC-LC 48 kHz 立体声；混音峰值 −0.6 dBFS |
| 字幕 | 烧录中英双语；zh / en / bilingual 三份 SRT，各 103 行 |
| 文件 | 61.7 MB（约 911 kbps） |
| 解码 | `ffmpeg -v error -i ... -f null -` 全片通过 |
