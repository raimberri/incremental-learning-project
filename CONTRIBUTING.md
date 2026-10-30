# Contributing

## 新增一门课

1. 读 [`AGENT.MD`](AGENT.MD) 的五条原则与验收条件。
2. 按 [`WORKFLOW.md`](WORKFLOW.md) 的 Intake 写 `brief.md`。
3. 用 `courseforge init` 建包，先填 `research/source-ledger.md`，再写正文。
4. 如果要视频：先定稿旁白，再 `voice`，再 `render`。
5. 提交前：

```bash
make test
make links
make check COURSE=courses/<COURSE>
git status --short
```

## 提交信息

- `docs:` 文档、README、AGENT/WORKFLOW
- `feat(courseforge):` 代码或模板
- `course(<COURSE>):` 某门课的内容
- `chore:` 仓库维护、CI、忽略规则

一个提交只做一件事。不要提交 `*.mp4`、`*.wav`、`node_modules/`、`.venv/`、
`.cache/` 或 `video/out/publish/`。

## 媒体

成片走 Release，不进 Git。规则见 [`docs/git-and-media.md`](docs/git-and-media.md)。

## 课程结构

- 课程目录用大写缩写：`courses/<COURSE>/`。
- 章节文件：`NN-中文标题.md`。
- 概念只定义一次，登记在 `appendices/A-概念账本.md`。
- 每章 3 道自测，答案在 `appendices/D-自测题与答案.md`。
- 跨领域对照必须有「失效边界」。
