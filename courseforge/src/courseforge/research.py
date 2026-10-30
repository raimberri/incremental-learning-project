from __future__ import annotations

from pathlib import Path


def check_ledger(path: Path) -> tuple[int, list[str]]:
    if not path.exists():
        return 0, [f"缺少来源账本：{path}"]
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip().startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 7 or cells[0] in {"#", "---", ":---"} or set(cells[0]) <= {"-", ":"}:
            continue
        if cells[1]:
            rows.append(cells)
    problems = []
    for cells in rows:
        claim, source, url = cells[1], cells[2], cells[3]
        if not claim:
            continue
        if not source:
            problems.append(f"缺少来源：{claim[:30]}")
        if not url or url in {"-", "—"}:
            problems.append(f"缺少 URL/DOI：{claim[:30]}")
    if not rows:
        problems.append("来源账本还没有可核查的主张")
    return len(rows), problems
