# LLM 课程 · 视频版

> 第 0–16 章完整视频：同一套 `courseforge` 课程包结构。
> 1920×1080，30 fps，中文配音 + 中英双语字幕；每章 6–8 分钟。
>
> **成片不在 Git 仓库里**，作为 GitHub Release 附件发布；仓库保留旁白、分镜、
> Remotion 工程、封面与字幕。

```text
chN/
  course.json  brief.md  README.md
  research/source-ledger.md
  video/
    script/narration.json
    script/storyboard.json
    remotion/           # 可重建工程
    out/                # 唯一交付目录：mp4 + poster + subs
```

课程正文不复制到章节目录，统一使用 `courses/LLM/curriculum/`。

## 全部章节

| 章 | 标题 | 时长 | 成片 | 说明 |
|---|---|---|---|---|
| 第 0 章 | 导读 | 6:09 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch0-orientation.mp4) | [`说明`](ch0/README.md) |
| 第 1 章 | 语言的概率论 | 9:01 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch1-probability.mp4) | [`说明`](ch1/README.md) |
| 第 2 章 | 梯度与反向传播 | 8:10 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch2-backprop.mp4) | [`说明`](ch2/README.md) |
| 第 3 章 | 词的数字分身 | 6:28 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch3-representation.mp4) | [`说明`](ch3/README.md) |
| 第 4 章 | 从 RNN 到注意力 | 7:13 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch4-attention.mp4) | [`说明`](ch4/README.md) |
| 第 5 章 | Transformer | 7:50 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch5-transformer.mp4) | [`说明`](ch5/README.md) |
| 第 6 章 | 预训练 | 7:30 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch6-pretraining.mp4) | [`说明`](ch6/README.md) |
| 第 7 章 | 规模定律 | 6:48 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch7-scaling.mp4) | [`说明`](ch7/README.md) |
| 第 8 章 | RLHF 与对齐 | 8:02 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch8-alignment.mp4) | [`说明`](ch8/README.md) |
| 第 9 章 | 思维链与推理时计算 | 7:36 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch9-cot.mp4) | [`说明`](ch9/README.md) |
| 第 10 章 | RLVR 与推理模型 | 7:21 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch10-rlvr.mp4) | [`说明`](ch10/README.md) |
| 第 11 章 | 效率与架构 | 7:51 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch11-efficiency.mp4) | [`说明`](ch11/README.md) |
| 第 12 章 | RAG 与长上下文 | 7:54 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch12-rag.mp4) | [`说明`](ch12/README.md) |
| 第 13 章 | 评测与幻觉 | 7:25 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch13-eval.mp4) | [`说明`](ch13/README.md) |
| 第 14 章 | 机制可解释性 | 7:19 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch14-interpretability.mp4) | [`说明`](ch14/README.md) |
| 第 15 章 | 智能体与前沿 | 7:21 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch15-agents.mp4) | [`说明`](ch15/README.md) |
| 第 16 章 | 结课 | 6:56 | [`mp4`](https://github.com/raimberri/incremental-learning-project/releases/download/v1.0.0/llm-ch16-finale.mp4) | [`说明`](ch16/README.md) |

每章都有 `video/out/subs/*.{zh,en,bilingual}.srt` 三份字幕，以及 `video/out/poster.jpg` 封面；
这些文件都在仓库里。成片下载见上表或 [Releases](https://github.com/raimberri/incremental-learning-project/releases)。

## 统一规格

- 画幅 1920×1080，30 fps；H.264 CRF 20；AAC 48 kHz。
- 中文旁白（edge-tts `zh-CN-XiaoxiaoNeural`），合成背景音乐音量 0.2。
- 字幕：中英双语烧录，另出 zh / en / bilingual 三份 SRT。
- 场景全部由 JSON 分镜驱动；图片为 `image_generate` 原创或 `asset-library` 复用。

## 重新生成

```bash
export PYTHONPATH=courseforge/src
PY=.venv/bin/python

for ch in ch3 ch4 ch5 ch6 ch7 ch8 ch9 ch10 ch11 ch12 ch13 ch14 ch15 ch16; do
  $PY -m courseforge voice "courses/LLM/video/$ch"
  $PY -m courseforge music "courses/LLM/video/$ch"
  $PY -m courseforge check "courses/LLM/video/$ch"
  $PY -m courseforge render "courses/LLM/video/$ch"
  $PY -m courseforge thumbnail "courses/LLM/video/$ch"
  $PY -m courseforge package "courses/LLM/video/$ch"
done
```

章节说明见各目录的 `README.md`；来源与数字见 `research/source-ledger.md`。
