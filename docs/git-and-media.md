# Git 与媒体策略

这个仓库保存的是**可重建的源**，不是成片网盘。这样做的原因很实际：

- 17 支 1080p 视频约 700 MB，加上 `voice.wav` / `music.wav` 会到 2 GB 以上；
- GitHub 对单文件 100 MB、仓库体积都有硬限制；
- 视频一旦进入 Git 历史，修改一次就多一份副本，clone 会越来越慢；
- 真正需要版本管理的是**正文、旁白、分镜、模板、来源**，不是渲染结果。

## 提交什么，不提交什么

| 提交（源） | 不提交（生成物） |
|---|---|
| `brief.md`、`curriculum/`、`appendices/` | `*.mp4`、`*.mov`、`*.webm` |
| `research/source-ledger.md` | `*.wav`、`*.mp3`、`*.m4a`、`*.flac` |
| `video/script/narration.json`、`storyboard.json` | `video/out/publish/` 打包副本 |
| `video/remotion/src/`、`package.json`、锁文件 | `node_modules/`、`.shared/` |
| 小图、封面 `poster.jpg`、SRT | `.cache/`、`__pycache__/`、`.venv/` |
| `courseforge/`、`asset-library/`、`skills/` | `*.log`、`voice-report.json` |
| 文档、脚本、CI | `.env`、本机绝对路径文件 |

`.gitignore` 已经覆盖这些模式。检查：

```bash
git status --short
git ls-files | grep -E '(^|/)(node_modules|\.venv|\.cache)/|\.(mp4|wav|mp3)$' || true
git count-objects -vH
```

## 成片怎么发布

成片作为 **GitHub Release 附件**发布。仓库里保留一小段说明和字幕，视频本身
不进入 Git。

```bash
# 需要已登录的 gh
gh auth status

# 创建 release 并上传所有 courses/**/video/out/*.mp4
./scripts/publish-release.sh v1.0.0

# 只看会传什么，不实际执行
DRY_RUN=1 ./scripts/publish-release.sh v1.0.0
```

脚本会：

1. 找到 `courses/**/video/out/*.mp4`（排除 `publish/` 副本）；
2. 创建 `v1.0.0` release（已存在则复用）；
3. 上传 MP4 与 `SHA256SUMS`；
4. 打印每个文件的公开下载地址。

手动等价命令：

```bash
gh release create v1.0.0 --title "Course videos v1.0.0" --notes "17 支 LLM 课程视频"
gh release upload v1.0.0 courses/LLM/video/ch0/video/out/*.mp4 --clobber
```

Release 附件不计入仓库体积，但有单文件 2 GB 限制；当前每支视频都远低于此。

## 如果确实需要把媒体放进 Git

只有在「这个文件无法由仓库内的源重建」时才考虑。优先顺序：

1. **Release 附件**（推荐）：不增加 clone 体积，下载链接稳定。
2. **Git LFS**：适合必须版本化的大文件，但 clone 需要 LFS，且免费额度有限。
3. **外部对象存储**：S3 / OSS / 网盘，仓库里只放链接和校验和。

如果选 LFS：

```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
git add path/to/video.mp4
git commit -m "media: add video via LFS"
```

不要把 LFS 和普通 Git 混着用；一旦文件进入普通 Git 历史，再转 LFS 需要
`git lfs migrate import --include="*.mp4"`，并强推重写历史。

## 克隆后如何重建

```bash
git clone https://github.com/raimberri/incremental-learning-project.git
cd incremental-learning-project

make setup
make doctor

export PYTHONPATH=courseforge/src
PY=.venv/bin/python

# 单章重建
$PY -m courseforge video   courses/LLM/video/ch5
$PY -m courseforge voice   courses/LLM/video/ch5
$PY -m courseforge music   courses/LLM/video/ch5
$PY -m courseforge render  courses/LLM/video/ch5
$PY -m courseforge thumbnail courses/LLM/video/ch5
$PY -m courseforge package courses/LLM/video/ch5
```

多章课程共享 Remotion 依赖时，先建共享目录（见 `WORKFLOW.md` §8.4），
或在每章单独 `npm install`。

## 大文件规则

- 单个文件 > 50 MB：先问「能不能由仓库内的源重建？」能，就不提交。
- 单个文件 > 100 MB：GitHub 直接拒绝；必须 Release 或 LFS。
- 图片：单张控制在 5 MB 内，优先 1536×1024 的 JPEG。
- 音频中间件：一律不提交；TTS 有哈希缓存，重跑即可。
- 提交前跑 `git status --short` 与 `make links`。

## 如果已经误提交了大文件

新仓库最好在第一次 push 前清理。若已经 push：

```bash
# 需要 git-filter-repo
git filter-repo --path 'courses/LLM/video/ch0/video/out' --invert-paths
git push --force-with-lease
```

重写历史会影响所有协作者；个人仓库也要先备份。
