#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
cd "$ROOT" || exit 1
for round in $(seq 1 240); do
  for n in $(seq 3 16); do
    slug=$(python3 -c "import json;print(json.load(open('courses/LLM/video/ch$n/course.json'))['slug'])" 2>/dev/null)
    mp4="courses/LLM/video/ch$n/video/out/$slug.mp4"
    readme="courses/LLM/video/ch$n/README.md"
    if [ -f "$mp4" ]; then
      if [ ! -f "$readme" ] || [ "$mp4" -nt "$readme" ]; then
        python3 courses/LLM/video/_tools/make_docs.py $n >> courses/LLM/video/_docs.log 2>&1
      fi
    fi
  done
  sleep 60
done
