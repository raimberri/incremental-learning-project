# Environment Setup

This page expands the "Requirements" section of [`README.en.md`](../README.en.md).
It covers supported platforms, version constraints, per-platform installation,
environment variables, networking and mirrors, troubleshooting, and an
acceptance checklist.

## 1. Supported platforms

| Platform | Status | Notes |
|---|---|---|
| macOS 13+ (Apple Silicon / Intel) | Primary | Google Chrome and the `say` fallback are available directly |
| Linux x86_64 / arm64 | Primary | Requires a CJK font and Chrome/Chromium |
| Windows + WSL2 | Supported | Keep the repository on the WSL filesystem, not `/mnt/c` |
| Native Windows | Untested | `make`, paths, and `say` behave differently; not the first choice |

## 2. Version matrix

| Component | Minimum | Recommended | Constraint |
|---|---|---|---|
| Python | 3.10 | 3.12 | `requires-python` in `courseforge/pyproject.toml` |
| Node.js | 20.19 / 22.13 / 24 | 22 LTS or 24.x | `engines.node` in the Remotion template |
| npm / npx | Bundled with Node.js | Bundled with Node.js | The Remotion CLI is invoked through `npx` |
| ffmpeg | 5.0 | Latest stable | Decodes TTS audio, measures duration, mixes tracks |
| Chrome / Chromium | Latest stable | Google Chrome | Remotion rendering |
| Disk | About 1 GB free | 5 GB+ | Dependencies, caches, outputs, and temporary files |
| RAM | 8 GB | 16 GB | 1080p30 parallel rendering |

Rough footprint: `.venv/` is about 70 MB; one shared Remotion `node_modules/`
is about 400 MB; an 8-minute 1080p video is about 60 MB. Sharing dependencies
across chapters saves a lot of space.

## 3. Installation

### 3.1 Get the code

```bash
git clone https://github.com/raimberri/incremental-learning-project.git
cd incremental-learning-project
```

All following commands assume this is the current directory.

### 3.2 Create a Python virtual environment

```bash
python3 -m venv .venv
.venv/bin/python -m pip install --upgrade pip
.venv/bin/pip install -e courseforge
```

First confirm that `python3 --version` is at least 3.10. The system `python3`
on macOS may be too old:

```bash
brew install python@3.12
python3.12 -m venv .venv
.venv/bin/pip install -e courseforge
```

Or simply:

```bash
make setup
```

`make setup` creates `.venv/` when missing and installs `courseforge` in
editable mode. It does not install ffmpeg, Node.js, or Chrome.

If Debian/Ubuntu reports that `venv` is missing:

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip
```

> `.venv/` is not relocatable. If you move the repository and see
> `bad interpreter: No such file or directory`, delete `.venv/` and recreate it.

### 3.3 Install system tools

**macOS (Homebrew)**

```bash
brew install ffmpeg node
brew install --cask google-chrome
```

**Debian / Ubuntu**

```bash
sudo apt update
sudo apt install -y ffmpeg
```

Install Node.js with nvm to avoid an outdated distribution package:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# Open a new shell, or run: source ~/.nvm/nvm.sh
nvm install 22
nvm use 22
```

Choose either Chrome or Chromium:

```bash
# Google Chrome (.deb)
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb

# Or the distribution's Chromium
sudo apt install -y chromium
```

Linux also needs a CJK font, otherwise rendered Chinese text appears as boxes:

```bash
sudo apt install -y fonts-noto-cjk
```

**Windows (WSL2)**

Follow the Ubuntu steps inside WSL and keep the repository under `~/`, not
`/mnt/c/`. Rendering uses a headless browser, so no WSL GUI is required.

### 3.4 Point Remotion at a browser

Remotion prefers a local Chrome/Chromium and can also download Chrome Headless
Shell. To prepare it manually:

```bash
cd courses/LLM/video/ch0/video/remotion   # any Remotion project with npm install done
npm install
npx remotion browser ensure
```

If the browser is not in a default location, set it explicitly:

```bash
export REMOTION_BROWSER="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# Linux example
export REMOTION_BROWSER="$(command -v google-chrome || command -v chromium)"
```

`courseforge render` makes `npx remotion` inherit `REMOTION_BROWSER`.

### 3.5 Verify

```bash
make doctor
```

A fully passing run looks like:

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

Exit code `0` means everything was found; any `✗` produces exit code `1`.
`doctor` checks presence, not exact Node or Python versions.

## 4. Environment variables

| Variable | Default | Purpose | Example |
|---|---|---|---|
| `PYTHONPATH` | Unset | Import `courseforge` from source | `export PYTHONPATH="$PWD/courseforge/src"` |
| `COURSEFORGE_ROOT` | Repository root found by walking upward | Locate templates; the skill also uses it to find the repo | `export COURSEFORGE_ROOT="$PWD"` |
| `REMOTION_BROWSER` | Auto-detected | Chrome/Chromium executable | `export REMOTION_BROWSER="$(command -v chromium)"` |
| `npm_config_cache` | `<course>/video/remotion/.npm-cache` | npm cache directory | `export npm_config_cache="$PWD/.npm-cache"` |
| `DSH_HOME` | `~/.dsh` | Skill installation directory | `export DSH_HOME="$HOME/.config/dsh"` |
| `DRY_RUN` | `0` | Release script prints without uploading | `DRY_RUN=1 ./scripts/publish-release.sh v1.0.0` |

`make` variables:

| Variable | Default | Purpose |
|---|---|---|
| `PY` | `.venv/bin/python` | Interpreter used to run `courseforge` |
| `COURSE` | `courses/LLM` | Target course package for `make check` / `make research` |

A convenient local shell setup (do not commit it):

```bash
export COURSEFORGE_ROOT="$PWD"
export PYTHONPATH="$PWD/courseforge/src"
PY=.venv/bin/python
```

## 5. Networking and mirrors

The first install and first render need network access:

- **PyPI**: installs `courseforge` dependencies (`edge-tts`, `numpy`).
- **npm registry**: installs Remotion and React dependencies.
- **edge-tts**: connects to Microsoft's speech service for Chinese/English voice-over.
- **Remotion**: downloads Chrome Headless Shell, the compositor, and Google Fonts files.

On restricted networks:

```bash
# PyPI mirror (example)
export PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple

# npm mirror (example)
npm config set registry https://registry.npmmirror.com

# Proxy (programs usually read the standard proxy variables)
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
```

Mirror availability changes over time; use whatever your organization provides.
If `edge-tts` cannot connect, macOS can fall back to the system voice:

```bash
$PY -m courseforge voice courses/my-topic --engine say
```

`--engine say` works only on macOS. Its voices differ from edge-tts, so verify
that a suitable voice exists before relying on it for an English course.

## 6. Platform differences

| Capability | macOS | Linux | WSL2 |
|---|---|---|---|
| edge-tts | Yes | Yes | Yes |
| `--engine say` | Yes | No | No |
| Chrome auto-detection | Yes | Common command names and `REMOTION_BROWSER` | Common command names and `REMOTION_BROWSER` |
| CJK fonts | Bundled | Install Noto CJK | Install Noto CJK |
| Render performance | Good hardware acceleration | CPU-dependent | Slightly below native Linux |

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `python3: command not found` | Python not installed or not on PATH | macOS: `xcode-select --install`; Linux: install `python3` |
| `No module named courseforge` | Not using `.venv`, or not at the repository root | Use `.venv/bin/python` and set `PYTHONPATH=courseforge/src` |
| `externally-managed-environment` | Installing into system Python | Use only `.venv/`; never `sudo pip install` |
| `.venv/bin/pip: bad interpreter` | Repository or `.venv` was moved | `rm -rf .venv && make setup` |
| `ffmpeg: command not found` | ffmpeg not installed | `brew install ffmpeg` or `sudo apt install ffmpeg` |
| `EBADENGINE` / `Unsupported engine` | Node.js is too old | Upgrade to 20.19+, 22.13+, or 24+ |
| npm `EACCES` / cache permission error | Global cache is not writable | Set `npm_config_cache=$PWD/.npm-cache`; the CLI already defaults to a local cache |
| edge-tts timeout, 403, or `NoAudioReceived` | Network, proxy, or server throttling | Check the proxy, retry, or use `--engine say` on macOS |
| `Could not find Chrome` | Browser missing or not detected | Install Chrome, run `npx remotion browser ensure`, or set `REMOTION_BROWSER` |
| Browser/compositor download fails | Remotion resources are unreachable | Configure a proxy, or pre-populate the cache on a networked machine |
| Chinese text renders as boxes | Missing CJK font | Install `fonts-noto-cjk` on Linux and refresh the font cache |
| Render is `Killed` or runs out of memory | Too much parallelism | Lower `--concurrency` (for example 2–4) |
| `No space left on device` | Dependencies, caches, or outputs filled the disk | Remove `node_modules/`, `.cache/`, or `video/out/` and retry |
| Everything fails after moving the repo | Absolute paths inside venv are stale | Delete `.venv/` and `node_modules/`, then reinstall |

## 8. Cleanup and reinstall

```bash
make clean                          # remove __pycache__ and .DS_Store
rm -rf .venv                        # remove the Python environment
find courses -type d -name node_modules -prune -exec rm -rf {} +
find courses -type d -name .npm-cache -prune -exec rm -rf {} +
find courses -type d -name .cache -prune -exec rm -rf {} +   # TTS cache; safe to delete
```

Then:

```bash
make setup
make doctor
```

The TTS cache is keyed by a hash of engine, voice, rate, and text. Deleting it
only forces resynthesis; source files are unaffected.

## 9. Acceptance checklist

After setup, confirm in order:

```bash
make doctor                                                   # exit code 0
make test                                                     # unit tests pass
make links                                                    # all relative links resolve
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge check courses/LLM/video/ch0
```

For a multi-chapter course such as `courses/LLM/`, check each video package:

```bash
for d in courses/LLM/video/ch*/; do
  PYTHONPATH=courseforge/src .venv/bin/python -m courseforge check "$d" || exit 1
done
```

For a single-package course, check the course root directly.
