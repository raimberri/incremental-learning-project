# Storyboard contract

`src/data/storyboard.json` is the only file a course author edits to change the **visuals**.
`src/data/timeline.json` is generated from `video/script/narration.json` by
`courseforge voice`; it owns scene timing and bilingual lines.

The two files must contain the same scene ids, in the same order.

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
  "kicker": "COURSE 01", "title": "熵：不确定性的度量",
  "highlight": "不确定性", "subtitle": "从一句直觉，到一个公式",
  "pills": ["一句话", "一个公式", "三个步骤"],
  "image": "img/coin.jpg", "stamp": "第 1 章"
}
```

`image` is optional. Without it the title is centred.

### `bullets`

```json
{
  "id": "idea", "type": "bullets", "accent": "blue",
  "kicker": "THE IDEA", "title": "三个关键词",
  "items": [
    {"icon": "①", "title": "不确定性", "sub": "结果越分散，越难猜", "color": "orange"},
    {"icon": "②", "title": "平均意外", "sub": "按概率加权", "color": "blue"},
    {"icon": "③", "title": "下界", "sub": "编码长度的极限", "color": "green"}
  ]
}
```

Use 2–4 items. Each item becomes a card.

### `formula`

```json
{
  "id": "math", "type": "formula", "accent": "teal",
  "kicker": "THE FORMULA", "title": "写成公式",
  "formula": "H(p) = −Σ p(x) log p(x)",
  "note": "log 以 2 为底时，单位是比特。",
  "bullets": ["p(x) 是每个结果的概率", "负号让结果非负", "Σ 把所有结果加起来"],
  "stamp": "单位：bit"
}
```

Formula is plain text. Keep it to one or two lines; the component lowers the font
size for long strings.

### `curve`

```json
{
  "id": "curve", "type": "curve", "accent": "orange",
  "kicker": "THE CURVE", "title": "把意外画成曲线",
  "formula": "I(p) = −log p",
  "bullets": ["p 越接近 0，曲线越陡", "p = 1 时，信息量为 0"],
  "chart": {
    "kind": "neglog",
    "xRange": [0.006, 1], "yMax": 5,
    "xLabel": "p →", "yLabel": "−log p ↑",
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
| `neglog` | `xRange`, `yMax`, `points` | −log x, cross-entropy, surprise |
| `sigmoid` | `xRange` (default `[0,6]`), `series[{label,tau}]` | softmax over two logits, temperature |
| `gap` | `baseline`, `amplitude`, `decay` | KL as the band above H(p) |
| `bars` | `bars[{label,value,color}]` | categorical distributions |

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
  "image": "img/rain.jpg", "pills": ["明天下雨？", "概率 0.99"],
  "subtitle": "概率高的时候，结果不意外。",
  "bullets": ["0.99：几乎确定", "0.01：非常意外"],
  "caption": "示意图，非真实数据"
}
```

Copy images into `public/img/` first:

```bash
courseforge assets add <course> rain coin --dir img
```

### `timeline`

```json
{
  "id": "history", "type": "timeline", "accent": "teal",
  "kicker": "70+ YEARS", "title": "五个阶段",
  "events": [
    {"year": "1948", "title": "信息论", "sub": "熵", "color": "orange"},
    {"year": "2003", "title": "神经语言模型", "sub": "词向量", "color": "blue"},
    {"year": "2017", "title": "Transformer", "sub": "注意力", "color": "purple"}
  ]
}
```

Use 3–6 events.

### `outro`

```json
{
  "id": "outro", "type": "outro", "accent": "green",
  "kicker": "NEXT", "title": "下一章，继续往深处走",
  "subtitle": "一句话 · 一个公式 · 三个步骤",
  "next": {"code": "02", "title": "梯度与反向传播", "sub": "全课第一个陡坡"},
  "pills": ["下期见", "See you next time"]
}
```

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
- [ ] Every `photo.image` exists under `public/`.
- [ ] Every chart has axis labels and a unit.
- [ ] Every illustrative number is labelled “示意” if it is not measured.
- [ ] `courseforge check <course>` passes.
