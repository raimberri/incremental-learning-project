# Storyboard contract

`src/data/storyboard.json` is the only file a course author edits to change the **visuals**.
`src/data/timeline.json` is generated from `video/script/narration.json` by
`courseforge voice`; it owns scene timing and bilingual lines.

The two files must contain the same scene ids, in the same order.

> **Escape hatch.** When a chapter needs a real node-link diagram, a multi-phase
> scene, or an image per concept, use `type: "custom"` and write one scene
> component under `src/scenes/`. `timeline.json` still owns all timing; the
> component reads its cues with `cues(sceneById(id))`. This is the only case
> where a scene component is hand-written, and it must still pass `check`.

## Common scene fields

| field | type | meaning |
|---|---|---|
| `id` | string | must equal the narration scene id |
| `type` | string | one of the scene types below |
| `accent` | `orange\|blue\|green\|purple\|teal\|red` | chapter accent |
| `kicker` | string | small uppercase label above the title |
| `title` | string | headline |
| `highlight` | string | substring of `title` to colour |
| `subtitle` | string | supporting sentence |

Animation convention: line 0 reveals the headline, line 1 reveals the main object,
later lines reveal bullets or points. A scene with fewer lines than elements will
keep the last element visible.

## Scene types

### `cover`

```json
{
  "id": "intro", "type": "cover", "accent": "orange",
  "kicker": "COURSE 01", "title": "为什么熟能生巧？",
  "highlight": "熟能生巧", "subtitle": "从一次练习，到一个机制",
  "pills": ["一个问题", "一个机制", "三个步骤"],
  "image": "img/notebook.jpg", "stamp": "第 1 章"
}
```

`image` is optional. Without it the title is centred.

### `bullets`

```json
{
  "id": "idea", "type": "bullets", "accent": "blue",
  "kicker": "THE IDEA", "title": "三个关键词",
  "items": [
    {"icon": "①", "title": "输入", "sub": "每次练习的条件", "color": "orange"},
    {"icon": "②", "title": "过程", "sub": "反馈如何改变策略", "color": "blue"},
    {"icon": "③", "title": "输出", "sub": "可观察的进步", "color": "green"}
  ]
}
```

Use 2–4 items. Each item becomes a card.

### `formula`

```json
{
  "id": "math", "type": "formula", "accent": "teal",
  "kicker": "THE FORMULA", "title": "写成一句话",
  "formula": "总量 = 基准 + 增量",
  "note": "增量随条件变化；单位按主题定义。",
  "bullets": ["基准是不变的部分", "增量是可解释的差异", "两者量纲必须一致"],
  "stamp": "先定义，再计算"
}
```

Formula is plain text. Keep it to one or two lines; the component lowers the font
size for long strings.

### `curve`

```json
{
  "id": "curve", "type": "curve", "accent": "orange",
  "kicker": "THE CURVE", "title": "把衰减画成曲线",
  "formula": "y = −ln x",
  "bullets": ["x 越接近 0，曲线越陡", "x = 1 时，y = 0"],
  "chart": {
    "kind": "neglog",
    "xRange": [0.006, 1], "yMax": 5,
    "xLabel": "剩余比例 x →", "yLabel": "−ln x ↑",
    "points": [
      {"x": 0.6, "label": "0.60 → 0.51", "color": "green", "dy": 24},
      {"x": 0.02, "label": "0.02 → 3.91", "color": "red", "dx": 18}
    ]
  }
}
```

Chart kinds:

| kind | data | use |
|---|---|---|
| `neglog` | `xRange`, `yMax`, `points` | decay, rare events, surprise |
| `sigmoid` | `xRange` (default `[0,6]`), `series[{label,tau}]` | threshold / probability-like response |
| `gap` | `baseline`, `amplitude`, `decay`, `baseLabel`, `topLabel` | base + increment decomposition |
| `bars` | `bars[{label,value,color}]` | categorical comparison |

`points` accept `dx`, `dy`, `anchor` (`start`/`end`) to avoid edge clipping.

### `compare`

```json
{
  "id": "compare", "type": "compare", "accent": "purple",
  "kicker": "TWO VIEWS", "title": "记忆，还是规则？",
  "center": "vs",
  "left": {"title": "记忆", "sub": "见过才会", "items": [{"title": "查表", "sub": "稀疏"}]},
  "right": {"title": "规则", "sub": "能外推", "items": [{"title": "学习", "sub": "可迁移"}]}
}
```

### `steps`

```json
{
  "id": "steps", "type": "steps", "accent": "purple",
  "kicker": "HOW TO USE", "title": "三步上手",
  "steps": [
    {"title": "写成可计算的形式", "sub": "定义输入与输出"},
    {"title": "代入并计算", "sub": "只用已知条件"},
    {"title": "检查结果", "sub": "量纲、范围、直觉"}
  ],
  "stamp": "先做完，再优化"
}
```

Use 2–4 steps.

### `photo`

```json
{
  "id": "example", "type": "photo", "accent": "green",
  "kicker": "IN PICTURES", "title": "一个生活里的例子",
  "image": "img/rain.jpg", "pills": ["观察", "记录"],
  "subtitle": "先看见现象，再解释机制。",
  "bullets": ["现象是可观察的", "解释必须是可检验的"],
  "caption": "示意图，非真实数据"
}
```

Copy images into `public/img/` first:

```bash
courseforge assets add <course> rain notebook --dir img
```

### `timeline`

```json
{
  "id": "history", "type": "timeline", "accent": "teal",
  "kicker": "THREE STAGES", "title": "三个阶段",
  "events": [
    {"year": "1900", "title": "起点", "sub": "问题被提出", "color": "orange"},
    {"year": "1950", "title": "转折", "sub": "关键机制出现", "color": "blue"},
    {"year": "2000", "title": "当代", "sub": "规模化应用", "color": "purple"}
  ]
}
```

Use 3–6 events. For a non-historical topic, use stages instead of years.

### `outro`

```json
{
  "id": "outro", "type": "outro", "accent": "green",
  "kicker": "NEXT", "title": "下一章，继续往深处走",
  "subtitle": "一句话 · 一个机制 · 三个步骤",
  "next": {"code": "02", "title": "机制如何工作", "sub": "全课第一个陡坡"},
  "pills": ["下期见", "See you next time"]
}
```

### `custom`

For diagram-heavy or multi-phase chapters. You write `src/scenes/<component>.tsx`;
the storyboard only names it and lists its images so `check` can verify them.

```json
{
  "id": "map", "type": "custom", "component": "MapScene",
  "images": ["img/stage-one.jpg", "img/stage-two.jpg"],
  "beat": "节点图 → 三关键词高亮"
}
```

Rules:

- The component must read `sceneById(id)` and `cues(scene)`; never hard-code seconds.
- Register it in `Video.tsx` (the `VIEWS` map) or replace the dispatcher; the template does not auto-import scene names.
- `images` must exist under `public/`; `check` fails otherwise.
- Scenes still fade to the canvas at their own edges; no cross-fade between scenes.
- Use custom only when the nine built-in types cannot carry the visual argument.

## Layout rules

- Canvas 1920×1080, safe content area x=120–1800, y=150–900.
- Header: y=42–86. Subtitles: bottom 46 px, max width 1700.
- Scene cards normally start at y=330 and are 520–560 px tall.
- Photos are 3:2; request 1536×1024 from `image_generate`; never put text in images.
- Long Chinese line: ≤40 characters. Long English line: ≤110 characters.
- Do not overlap scene content into the subtitle band.
- Scene transitions have no cross-fade. Each scene fades to the canvas for 8 frames;
  the chapter card is opaque, so the previous scene cannot bleed through.

## Minimal checklist

- [ ] Scene ids and order match `narration.json`.
- [ ] Every `photo.image` exists under `public/`; every `custom.images[]` too.
- [ ] Every analysed concept has its own image; no static layout for >8 s.
- [ ] No half-empty screen / card graveyard; grids appear at one cue and highlight the active item.
- [ ] Every chart has axis labels and a unit.
- [ ] Every illustrative number is labelled “示意” if it is not measured.
- [ ] `courseforge check <course>` passes.
