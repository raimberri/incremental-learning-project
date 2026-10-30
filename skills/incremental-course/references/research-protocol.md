# Research protocol

## Source hierarchy

1. **Primary**: papers, official docs, standards, datasets, source code, archives.
2. **Secondary**: surveys, textbooks, lecture notes.
3. **Tertiary**: reputable explainers, encyclopaedias.
4. **Not evidence**: social posts, SEO listicles, unattributed summaries.

Use tertiary sources to find primary sources, not to settle a number.

## Topic types

| topic | first sources | what "primary" means |
|---|---|---|
| science / engineering / AI | survey → key papers → code/data | the paper, dataset, or official implementation |
| standards / software / law | standard or official docs → implementations/cases | the normative text |
| practical skill (writing, music, sport) | authoritative textbook → practitioner method → recorded practice | the method's original description or a reproducible exercise |
| history / humanities | academic monograph or peer-reviewed article → primary archive | the document, artefact, or dataset from the period |

A small course may need only 3–5 authoritative sources. A full course usually
needs 3–5 overviews plus 10–20 primary sources. Coverage and quality beat count.

## Ledger

`research/source-ledger.md`:

```markdown
| # | 主张 | 类型 | 来源（作者/机构） | URL 或 DOI | 年份 | 置信度 | 用在 |
|---|---|---|---|---|---|---|---|
| 1 | <checkable claim> | 论文/标准/数据 | <author or body>, <title> | <URL/DOI> | 2020 | 高 | §1.2 |
```

Rules:

- One row per checkable claim.
- `类型`: 论文结论 / 官方文档 / 标准 / 数据 / 新闻 / 观点 / 争议.
- `置信度`: 高 = primary source + exact number; 中 = secondary source or
  interpretation; 低 = single blog / unverified.
- `用在`: chapter or section, so you can remove an unsupported claim later.
- If a claim is contested, add a "争议" row with both sides.

## Time line

For historical topics, keep a separate table:

| 年份 | 事件 | 为什么重要 | 来源 |
|---|---|---|---|

Use the first public date (preprint v1, conference, release, first edition),
not the later journal year, unless you say which one you use.

## Numbers

- Keep the unit and the condition: "3.2 billion years ago", "±0.5% at 25 °C",
  "12 ms on a 2020 laptop".
- Distinguish measured, estimated, and illustrative numbers.
- For teaching diagrams, it is fine to use illustrative numbers, but label the
  diagram "示意" and keep the relationship exact.

## Quotes

Short quotes only, with a link. Do not fabricate page numbers or DOIs. If you
cannot open the source, do not quote it.

## Gate

```bash
PYTHONPATH=courseforge/src .venv/bin/python -m courseforge research <course>
```

A ledger with zero checkable rows is a blocker. A row without a URL/DOI/standard
number is a blocker for any factual claim that depends on it.
