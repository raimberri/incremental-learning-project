# 环境配置

本页是 [`README.md`](../README.md)「环境要求」一节的展开，覆盖受支持平台、
版本约束、分平台安装、环境变量、网络与镜像、故障排查和验收清单。

## 1. 支持平台

| 平台 | 状态 | 说明 |
|---|---|---|
| macOS 13+（Apple Silicon / Intel） | 主要支持 | 可直接使用 Google Chrome 与 `say` 备用语音 |
| Linux x86_64 / arm64 | 主要支持 | 需要自备中文字体与 Chrome/Chromium |
| Windows + WSL2 | 可用 | 仓库放在 WSL 文件系统内，不要放在 `/mnt/c` |
| 原生 Windows | 未验证 | `make`、路径与 `say` 行为不同，不建议作为首选 |

## 2. 版本矩阵

| 组件 | 最低版本 | 推荐 | 约束来源 |
|---|---|---|---|
| Python | 3.10 | 3.12 | `courseforge/pyproject.toml` 的 `requires-python` |
| Node.js | 20.19 / 22.13 / 24 | 22 LTS 或 24.x | Remotion 模板的 `engines.node` |
| npm / npx | 随 Node.js | 随 Node.js | Remotion CLI 通过 `npx` 调用 |
| ffmpeg | 5.0 | 最新稳定版 | 解码 TTS 音频、测量时长、合成音轨 |
| Chrome / Chromium | 最新稳定版 | Google Chrome | Remotion 渲染 |
| 磁盘 | 约 1 GB 空闲 | 5 GB+ | 依赖、缓存、成片与临时文件 |
| 内存 | 8 GB | 16 GB | 1080p30 并行渲染 |

空间量级参考：`.venv/` 约 70 MB；一份共享的 Remotion `node_modules/` 约
400 MB；8 分钟 1080p 成片约 60 MB。多章课程共享依赖可显著减少占用。

## 3. 安装步骤

### 3.1 获取代码

```bash
git clone https://github.com/raimberri/incremental-learning-project.git
cd incremental-learning-project
```

后续命令都假设当前目录是仓库根目录。

### 3.2 创建 Python 虚拟环境

```bash
python3 -m venv .venv
.venv/bin/python -m pip install --upgrade pip
.venv/bin/pip install -e courseforge
```

先确认 `python3 --version` 不低于 3.10。macOS 系统自带的 `python3` 可能过旧：

```bash
brew install python@3.12
python3.12 -m venv .venv
.venv/bin/pip install -e courseforge
```

或直接使用：

```bash
make setup
```

`make setup` 在 `.venv/` 不存在时创建它，然后以 editable 模式安装
`courseforge`。它不会安装 ffmpeg、Node.js 或 Chrome。

Debian/Ubuntu 若提示缺少 `venv`：

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip
```

> `.venv/` 不可移动。仓库换路径后若出现
> `bad interpreter: No such file or directory`，删除 `.venv/` 并重新创建。

### 3.3 安装系统工具

**macOS（Homebrew）**

```bash
brew install ffmpeg node
brew install --cask google-chrome
```

**Debian / Ubuntu**

```bash
sudo apt update
sudo apt install -y ffmpeg
```

Node.js 建议用 nvm 安装，避免发行版仓库版本过旧：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# 重新打开 shell，或先 source ~/.nvm/nvm.sh
nvm install 22
nvm use 22
```

Chrome/Chromium 任选其一：

```bash
# Google Chrome（.deb）
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb

# 或发行版提供的 Chromium
sudo apt install -y chromium
```

Linux 还需要中文字体，否则渲染结果会出现方块字：

```bash
sudo apt install -y fonts-noto-cjk
```

**Windows（WSL2）**

在 WSL 内按 Ubuntu 步骤安装；仓库放在 `~/` 下，不要放在 `/mnt/c/`。
渲染使用无头浏览器，不需要 WSL 图形界面。

### 3.4 让 Remotion 找到浏览器

Remotion 优先使用本机 Chrome/Chromium，也可以自动下载 Chrome Headless
Shell。手动准备：

```bash
cd courses/LLM/video/ch0/video/remotion   # 任意已完成 npm install 的 Remotion 工程
npm install
npx remotion browser ensure
```

浏览器不在默认路径时，显式指定：

```bash
export REMOTION_BROWSER="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# Linux 示例
export REMOTION_BROWSER="$(command -v google-chrome || command -v chromium)"
```

`courseforge render` 会让 `npx remotion` 继承 `REMOTION_BROWSER`。

### 3.5 验证

```bash
make doctor
```

全部通过时输出类似：

```text
courseforge doctor
  ✓ ffmpeg   /opt/homebrew/bin/ffmpeg
  ✓ node     /Users/you/.nvm/versions/node/v24.13.0/bin/node
  ✓ npm      /Users/you/.nvm/versions/node/v24.13.0/bin/npm
  ✓ npx      /Users/you/.nvm/versions/node/v24.13.0/bin/npx
  ✓ chrome   /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
  ✓ python   edge-tts + numpy
  ✓ template /path/to/incremental-learning-project/courseforge/templates/remotion
```

退出码为 `0` 表示全部找到；任一项为 `✗` 时退出码为 `1`。
`doctor` 检查的是「能不能找到」，不校验 Node/Python 的具体版本号。

## 4. 环境变量

| 变量 | 默认值 | 作用 | 示例 |
|---|---|---|---|
| `PYTHONPATH` | 未设置 | 从源码导入 `courseforge` | `export PYTHONPATH="$PWD/courseforge/src"` |
| `COURSEFORGE_ROOT` | 向上查找仓库根 | 定位模板；skill 也用它找仓库 | `export COURSEFORGE_ROOT="$PWD"` |
| `REMOTION_BROWSER` | 自动检测 | 指定 Chrome/Chromium 可执行文件 | `export REMOTION_BROWSER="$(command -v chromium)"` |
| `npm_config_cache` | `<课程包>/video/remotion/.npm-cache` | npm 缓存目录 | `export npm_config_cache="$PWD/.npm-cache"` |
| `DSH_HOME` | `~/.dsh` | skill 安装目录 | `export DSH_HOME="$HOME/.config/dsh"` |
| `DRY_RUN` | `0` | 发布脚本只打印、不上传 | `DRY_RUN=1 ./scripts/publish-release.sh v1.0.0` |

`make` 的变量：

| 变量 | 默认值 | 作用 |
|---|---|---|
| `PY` | `.venv/bin/python` | 运行 `courseforge` 的解释器 |
| `COURSE` | `courses/LLM` | `make check` / `make research` 的目标课程包 |

推荐在仓库根目录的本地 shell 中固定以下设置（不要提交到 Git）：

```bash
export COURSEFORGE_ROOT="$PWD"
export PYTHONPATH="$PWD/courseforge/src"
PY=.venv/bin/python
```

## 5. 网络与镜像

首次安装和首次渲染需要网络：

- **PyPI**：安装 `courseforge` 的依赖（`edge-tts`、`numpy`）。
- **npm registry**：安装 Remotion 与 React 依赖。
- **edge-tts**：连接 Microsoft 语音合成服务，生成中文/英文配音。
- **Remotion**：下载 Chrome Headless Shell、合成器与 Google Fonts 字体文件。

网络受限时：

```bash
# PyPI 镜像（示例）
export PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple

# npm 镜像（示例）
npm config set registry https://registry.npmmirror.com

# 代理（程序通常读取标准代理变量）
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
```

镜像可用性随时间变化，以组织内网的实际配置为准。`edge-tts` 无法连通时，
macOS 可以改用系统语音：

```bash
$PY -m courseforge voice courses/my-topic --engine say
```

`--engine say` 只适用于 macOS，音色与 edge-tts 不同，英文课程需另行确认可用音色。

## 6. 平台差异

| 能力 | macOS | Linux | WSL2 |
|---|---|---|---|
| edge-tts | 支持 | 支持 | 支持 |
| `--engine say` | 支持 | 不支持 | 不支持 |
| Chrome 自动检测 | 支持 | 支持常见命令名与 `REMOTION_BROWSER` | 支持常见命令名与 `REMOTION_BROWSER` |
| 中文字体 | 系统自带 | 需安装 Noto CJK | 需安装 Noto CJK |
| 渲染性能 | 硬件加速较好 | 取决于 CPU | 略低于原生 Linux |

## 7. 故障排查

| 症状 | 可能原因 | 处理 |
|---|---|---|
| `python3: command not found` | 未安装 Python 或未加入 PATH | macOS 运行 `xcode-select --install`；Linux 安装 `python3` |
| `No module named courseforge` | 没用 `.venv`，或不在仓库根目录 | 使用 `.venv/bin/python`，并设置 `PYTHONPATH=courseforge/src` |
| `externally-managed-environment` | 向系统 Python 安装包 | 只用 `.venv/`，不要 `sudo pip install` |
| `.venv/bin/pip: bad interpreter` | 仓库或 `.venv` 被移动 | `rm -rf .venv && make setup` |
| `ffmpeg: command not found` | 未安装 ffmpeg | `brew install ffmpeg` 或 `sudo apt install ffmpeg` |
| `EBADENGINE` / `Unsupported engine` | Node 版本过旧 | 升级到 20.19+、22.13+ 或 24+ |
| npm `EACCES` / 缓存权限错误 | 全局缓存不可写 | 设置 `npm_config_cache=$PWD/.npm-cache`；CLI 已默认使用课程内缓存 |
| edge-tts 超时、403、`NoAudioReceived` | 网络、代理或服务端限流 | 检查代理；重试；macOS 改用 `--engine say` |
| `Could not find Chrome` | 浏览器未安装或路径不识别 | 安装 Chrome，`npx remotion browser ensure`，或设置 `REMOTION_BROWSER` |
| 浏览器/合成器下载失败 | 网络无法访问 Remotion 资源 | 配置代理；或在有网环境准备好缓存后复制 |
| 中文显示为方块 | 缺少中文字体 | Linux 安装 `fonts-noto-cjk`；确认字体缓存已刷新 |
| 渲染被 `Killed` 或内存不足 | 并行度过高 | 降低 `--concurrency`（例如 2–4） |
| `No space left on device` | 依赖、缓存或成片占满磁盘 | 清理 `node_modules/`、`.cache/`、`video/out/` 后重试 |
| 修改仓库路径后命令全部失败 | venv 的绝对路径失效 | 删除 `.venv/`、`node_modules/` 后重新安装 |

## 8. 清理与重装

```bash
make clean                          # 删除 __pycache__ 与 .DS_Store
rm -rf .venv                        # 删除 Python 环境
find courses -type d -name node_modules -prune -exec rm -rf {} +
find courses -type d -name .npm-cache -prune -exec rm -rf {} +
find courses -type d -name .cache -prune -exec rm -rf {} +   # TTS 缓存；可安全删除
```

然后：

```bash
make setup
make doctor
```

TTS 缓存按「引擎 + 音色 + 语速 + 文本」哈希保存，删除后只是重新合成，不影响源文件。

## 9. 验收清单

完成环境配置后，依次确认：

```bash
make doctor                                                   # 退出码 0
make test                                                     # 单元测试通过
make links                                                    # 相对链接全部解析
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge check courses/LLM/video/ch0
```

多章课程（如 `courses/LLM/`）要对每个视频包单独检查：

```bash
for d in courses/LLM/video/ch*/; do
  PYTHONPATH=courseforge/src .venv/bin/python -m courseforge check "$d" || exit 1
done
```

单包课程直接检查课程根目录即可。
