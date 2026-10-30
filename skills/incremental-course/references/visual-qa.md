# Visual QA

A full 1080p render is expensive. Catch these on stills first.

## Visual density

- [ ] Every analysed concept has its own image. Count them: four reasons = four
      images, five stages = five, five modules = five thumbnails.
- [ ] Each scene has 2–3 visual phases, not one static layout.
- [ ] No layout sits unchanged for more than 8 seconds.
- [ ] At least one non-symmetric composition per chapter: hero image + side
      column, timeline + detail card, node graph, three/four-column comparison.
- [ ] No "card graveyard": a row of equal-width cards with 40% empty bottom.
- [ ] No half-empty screen: if the right/bottom group enters later, either show
      the full grid at once or move its entry to the previous cue.

## Custom scenes

- [ ] `storyboard.json` has `type:"custom"`, `component`, and `images`.
- [ ] `src/scenes/<Component>.tsx` exists and is registered in `Video.tsx`.
- [ ] Component reads `sceneById(id)` and `cues()`; no hard-coded seconds.
- [ ] Every `images[]` path exists under `public/`.
- [ ] Scene fades to the canvas at its own edges; no cross-fade to the next scene.
- [ ] Each phase starts on the matching narration cue; no phase switch 2+ seconds early.

## Transitions

- [ ] Chapter card is opaque from its first visible frame.
- [ ] The chapter card paints **above** the incoming scene but **below** the header.
- [ ] Scenes do not overlap: sequence length equals the scene's own duration.
- [ ] Each scene fades to the canvas for 8 frames at its own edges.
- [ ] Static elements in a scene (result boxes, `×` signs, axes) are gated by a
      cue; they must not appear before the words they belong to.
- [ ] No previous scene's photo or card is visible through the chapter card.

Fix pattern: `OVERLAP=0`; chapter plate `zIndex:10`; header `zIndex:20`;
`Shell` opacity `min(1, frame/8, (len-frame)/8)`.

## Text

- [ ] Primary-language subtitle ≤ 40 characters; English ≤ 110 characters.
- [ ] No line wraps into the subtitle band.
- [ ] Formula does not wrap awkwardly; lower the font before adding a line.
- [ ] Chart point labels near the right edge use `anchor:"end"`.
- [ ] Cards with long text use a smaller font or a wider card.

## Charts

- [ ] x and y axes have names and units.
- [ ] Tick labels are readable and not clipped.
- [ ] Curves pass through the annotated points.
- [ ] Illustrative data is labelled "示意".
- [ ] The x range matches the definition (no misleading truncation).
- [ ] A decomposition chart visibly separates the base from the increment.
- [ ] If the concept has no quantitative shape, no chart was forced into the scene.

## Images

- [ ] 3:2, 1536×1024, no text, no watermark.
- [ ] The subject is not cropped by the card.
- [ ] The image's colour temperature matches the theme.
- [ ] Every image is listed in `video/asset-credits.md`, with type
      (`生成照片` / `矢量示意`) and source.
- [ ] If `image_generate` failed, the fallback is documented and the vector
      generator is committed under `video/art/`; filenames are replaceable.
- [ ] Text-free vector diagrams have their labels in HTML/SVG, not in the image.

## Audio

- [ ] Voice peak about −1 dBFS; no clipping.
- [ ] Music present at the start and at the end.
- [ ] No line is cut off; check the first and last 2 seconds.
- [ ] SRT count equals narration line count.
- [ ] Time line comes from `voice.wav`, not from an estimate.

## Common bugs and fixes

| symptom | cause | fix |
|---|---|---|
| old scene shows through a chapter card | chapter card under scene, or scenes overlap | zIndex 10 card, header 20, `OVERLAP=0` |
| half screen empty | right card enters too late | move entry to the previous cue |
| card graveyard | one row of equal cards holds the whole scene | split into 2–3 phases; hero image/diagram |
| static 20–40 s | no phase change | add a second image/chart/card set |
| `×` signs without words | static row not gated | reveal the row at the first cue |
| chart point label cut | label at right edge | `anchor:"end"`, negative dx |
| formula wraps | font too large for width | reduce to 38–44 px, `whiteSpace:"nowrap"` |
| subtitles cover a card | card bottom > 900 | raise card or shrink height |
| three cards appear one by one, lower half blank | each card keyed to its own line | reveal the grid at one cue; highlight the active item |
