# Curriculum spec

## Package shape

```
curriculum/
  00-导读.md
  01-<chapter>.md
  ...
appendices/
  A-概念账本.md
  B-跨领域思想地图.md
  C-术语表.md
  D-自测题与答案.md
```

A short course may have only `00-导读.md` + one chapter. A full course usually
has 5–10 chapters. The chapter count follows the learning outcome, not a fixed
template.

## Orientation (`00-导读.md`)

1. One-sentence promise.
2. What this course answers and what it refuses to cover.
3. A course map table: chapter, title, outcome, difficulty, time.
4. How to study: read → self-test → check answer.
5. Learning contract: the two steep sections, the rule that no example is reused.

## Chapter template

```markdown
# 第 N 章　<title>

> **本章新增**：...
> **前置**：...
> **对应资料**：...

## N.1 从一个问题开始
<hook, no definition yet>

> **定义 N.1（term）** ...

## N.2 机制
<input → process → output, causal chain>

## N.3 一个例子
<one hand-computable, hand-checkable, or practically reproducible example>

## N.4 常见误解
| 误解 | 实际情况 |

## N.5 本章小结
- 3–5 bullets.

### 自测
1. ...
2. ...
3. ...

### 下一章
<the question the next chapter answers>
```

## Incremental rules

1. **Define once.** The first definition goes in the chapter body and in
   `A-概念账本.md`. Later chapters say "见 §N.1" and do not redefine.
2. **State prerequisites.** Every chapter opens with "本章新增" and "前置".
3. **One example, one concept.** Do not reuse the same story, dataset, or
   metaphor to teach a second idea; the reader will conflate them.
4. **Working memory is small.** A chapter introduces at most 3–5 new terms.
5. **Self-tests test doing, not recognition.** Ask for a calculation, a
   prediction, a comparison, or an application; not "do you remember".
6. **Review adds depth, not repetition.** If a concept must return, add a new
   angle or a harder case; do not re-explain it.

## Concept ledger

| 概念 | 首次定义 | 一句话定义 | 后续引用 |
|---|---|---|---|
| <term> | §1.3 | <one sentence> | §4.2, §7.1 |

The ledger is the enforcement mechanism for "define once". If a concept is not
in the ledger, either it was never defined, or the definition was repeated.

## Cross-domain map

`B-跨领域思想地图.md` collects one row per comparison:

| 本章概念 | 对照领域/人物/年代 | 同构点 | 失效边界 | 出处 |
|---|---|---|---|---|

Every row needs a failure boundary. An analogy without a boundary is a slogan.

## Self-test answers

Keep answers in `D-自测题与答案.md`, one section per chapter. Include the
reasoning, not only the final number.

## Common failure modes

- A chapter opens with a definition before the reader has a question.
- The same concept is re-explained in chapter 4 because chapter 1 was unclear.
- Examples are decorative and do not carry the mechanism.
- The summary introduces a new idea that was never taught.
- Self-test answers are missing or only give a number.
- A cross-domain comparison says "just like X" but never says where it breaks.
