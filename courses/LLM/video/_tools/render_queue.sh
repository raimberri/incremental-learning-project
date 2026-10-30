#!/bin/bash
# Sequential render queue for LLM chapter videos.
# One render at a time: two parallel 1080p renders exhaust 16 GB and halve throughput.
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
cd "$ROOT" || exit 1
export PYTHONPATH=courseforge/src
LOG="$ROOT/courses/LLM/video/_render-queue.log"
: > "$LOG"

say() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"; }

for n in "$@"; do
  slug=$(.venv/bin/python -c "import json;print(json.load(open('courses/LLM/video/ch$n/course.json'))['slug'])")
  say "START ch$n $slug"
  cd "$ROOT/courses/LLM/video/ch$n/video/remotion" || { say "MISSING ch$n"; continue; }
  npx remotion render CourseVideo "../out/$slug.mp4" \
      --crf=20 --concurrency=4 --x264-preset=fast --image-format=jpeg --jpeg-quality=92 >> "$LOG" 2>&1
  rc=$?
  if [ $rc -ne 0 ]; then say "RENDER FAIL ch$n rc=$rc"; cd "$ROOT"; continue; fi
  cd "$ROOT" || exit 1
  .venv/bin/python -m courseforge thumbnail "courses/LLM/video/ch$n" >> "$LOG" 2>&1 || say "THUMB FAIL ch$n"
  .venv/bin/python -m courseforge package "courses/LLM/video/ch$n" >> "$LOG" 2>&1 || say "PACKAGE FAIL ch$n"
  say "DONE ch$n"
done
say "QUEUE COMPLETE"
