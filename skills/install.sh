#!/usr/bin/env bash
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)/incremental-course"
DEST="${DSH_HOME:-$HOME/.dsh}/skills/incremental-course"
mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
cp -R "$SRC" "$DEST"
echo "installed: $DEST"
echo "reload DSH, then invoke the incremental-course skill"
