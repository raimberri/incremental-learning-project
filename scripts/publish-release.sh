#!/usr/bin/env bash
# Upload finished course videos as GitHub Release assets.
#
#   ./scripts/publish-release.sh v1.0.0
#   DRY_RUN=1 ./scripts/publish-release.sh v1.0.0
#
# The repository stores sources only; MP4s are generated locally and attached
# to a release instead of being committed.
set -euo pipefail

TAG="${1:-v1.0.0}"
TITLE="${2:-Course videos $TAG}"
DRY_RUN="${DRY_RUN:-0}"

cd "$(dirname "$0")/.."

if ! command -v gh >/dev/null 2>&1; then
  echo "gh is required: https://cli.github.com/" >&2
  exit 1
fi
if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in. Run: gh auth login" >&2
  exit 1
fi

files=()
while IFS= read -r -d '' f; do
  files+=("$f")
done < <(find courses -path '*/video/out/*.mp4' -not -path '*/publish/*' -type f -print0)

if [ "${#files[@]}" -eq 0 ]; then
  echo "No MP4 found under courses/**/video/out/." >&2
  echo "Render a course first: courseforge render <course>" >&2
  exit 1
fi

echo "Found ${#files[@]} video(s):"
printf '  %s\n' "${files[@]}"

if [ "$DRY_RUN" = "1" ]; then
  echo "DRY_RUN=1: nothing uploaded."
  exit 0
fi

if ! gh release view "$TAG" >/dev/null 2>&1; then
  gh release create "$TAG" --title "$TITLE" --notes "Course videos for $TAG"
  echo "Created release $TAG"
else
  echo "Release $TAG already exists; uploading with --clobber"
fi

if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "${files[@]}" > /tmp/course-videos.sha256
else
  shasum -a 256 "${files[@]}" > /tmp/course-videos.sha256
fi
gh release upload "$TAG" "${files[@]}" /tmp/course-videos.sha256 --clobber

echo
echo "Release: $(gh release view "$TAG" --json url -q .url)"
