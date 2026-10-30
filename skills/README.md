# Skills

`incremental-course/` is the source of the course-factory skill.

## Install

```bash
./skills/install.sh
```

It copies the folder to `${DSH_HOME:-$HOME/.dsh}/skills/incremental-course`.
Restart or reload DSH if the skill does not appear in the catalog immediately.

## Use

The skill is topic-agnostic: it builds a course and explainer video for any
concept, not only one subject area. It discovers the repository through
`COURSEFORGE_ROOT` or the current Git root; if you keep the repo somewhere else,
set:

```bash
export COURSEFORGE_ROOT=/path/to/incremental-learning-project
```

## Contents

- `SKILL.md` — the 8-stage operating procedure.
- `references/curriculum-spec.md` — chapter shape and incremental rules.
- `references/research-protocol.md` — source hierarchy, ledger, citation rules.
- `references/storyboard-spec.md` — scene types and JSON fields.
- `references/visual-qa.md` — frame-by-frame layout checks.
- `references/asset-playbook.md` — reuse and generate images.

The full workflow is in [`../WORKFLOW.md`](../WORKFLOW.md); the non-negotiable
rules are in [`../AGENT.MD`](../AGENT.MD).
