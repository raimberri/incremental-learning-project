# 课程归档

> 一门课一个目录。新增课程直接放在这里，不要放在仓库根目录。

## 两种课程形态

**A. 单视频课程**（skill 默认）：一个 `courseforge` 课程包 = 一门课。

```text
courses/
└── my-topic/
    ├── brief.md
    ├── course.json
    ├── research/source-ledger.md
    ├── curriculum/            00-导读 + 章节正文
    ├── appendices/
    └── video/
        ├── script/            narration.json + storyboard.json
        ├── remotion/
        └── out/               mp4 + poster + subs
```

**B. 多章课程**：课程根目录放正文与资料，每章一个视频包。

```text
courses/
└── <COURSE>/
    ├── README.md              课程总览与学习路径
    ├── brief.md               学习合同
    ├── curriculum/            00-导读 + 01–10 章正文
    ├── appendices/            概念账本、跨领域地图、术语表、自测答案
    ├── papers/                论文库与 BibTeX（仅论文型课程）
    ├── assets/                时间线等辅助素材（可选）
    └── video/
        ├── README.md          逐章视频总索引
        ├── .shared/node_modules
        └── chN/               每章一个 courseforge 包
            ├── brief.md
            ├── course.json
            ├── README.md
            ├── research/source-ledger.md
            └── video/
                ├── script/    narration.json + storyboard.json
                ├── remotion/
                └── out/       mp4 + poster + subs
```

`courses/LLM/` 是形态 B 的参考实现。

## 新增课程

先确认环境：

```bash
make setup
make doctor
export PYTHONPATH=courseforge/src
PY=.venv/bin/python
```

**A. 单视频课程**

```bash
$PY -m courseforge init courses/<slug> --title "<课程标题>"
# 填 brief.md、research/、curriculum/、video/script/
$PY -m courseforge video   courses/<slug>
$PY -m courseforge voice   courses/<slug>
$PY -m courseforge music   courses/<slug>
$PY -m courseforge check   courses/<slug>
$PY -m courseforge render  courses/<slug>
$PY -m courseforge thumbnail courses/<slug>
$PY -m courseforge package courses/<slug>
```

**B. 多章课程**

1. 建课程根：`courses/<COURSE>/README.md`、`brief.md`、`curriculum/`、
   `appendices/`。
2. 每章建一个视频包：

```bash
$PY -m courseforge init courses/<COURSE>/video/ch1 --title "<第 1 章标题>"
# 若正文统一放课程根，删掉该包内的 curriculum/ 模板
```

3. 后续 `voice` / `render` 等命令都指向 `courses/<COURSE>/video/chN`。
4. 在 `courses/<COURSE>/video/README.md` 维护逐章表；在根 `README.md` 的
   「参考实现」或课程入口里加一行。

## 命名与归档约定

1. **课程目录用大写缩写**（`LLM`、`PHYS`、`MUSIC`），不用中文、不用空格；
   视频包 slug 用小写连字符。
2. 课程正文、资料库、附录留在课程目录内，**不复制到仓库根目录**。
3. `video/out/` 是唯一交付目录；`video/out/publish/` 是打包副本，不入库。
4. 多章课程的 Remotion 依赖在 `video/.shared/node_modules` 共享，
   各章 `node_modules` 是指向它的相对符号链接；两者都不入库，克隆后重建。
5. 课程一旦出片，`slug` 不再改；改名会让字幕、封面、发布目录对不上。
6. 交付前至少留 5 GB 磁盘；每章 `out/` 约 40–80 MB。

## 仓库级共享资源

| 路径 | 作用 | 是否跨课程共享 |
|---|---|---|
| `courseforge/` | 脚手架、TTS、时间轴、校验、渲染封装 | 是 |
| `asset-library/` | 照片、主题、音乐配方 | 是 |
| `skills/incremental-course/` | 整条流水线封装成的 DSH skill | 是 |
| `courses/<COURSE>/video/.shared/node_modules` | Remotion 依赖 | **课程内**共享，不跨课程 |

跨课程复用素材时走 `courseforge assets add`，不要手工复制图片到多个课程；
图片的许可与来源记录在各视频包的 `video/asset-credits.md`。

## 媒体与发布

- 仓库只提交可重建的源；`*.mp4`、`*.wav`、`video/out/publish/` 由
  `.gitignore` 排除。
- 成片统一通过 Release 发布，见 [`docs/git-and-media.md`](../docs/git-and-media.md)
  与 `scripts/publish-release.sh`。
- 新增课程后更新：
  - `courses/<COURSE>/README.md` 的课程地图；
  - `courses/<COURSE>/video/README.md` 的逐章表；
  - 根 `README.md` 的参考实现/课程入口。
