# Themes

`warm-paper.json` is the reference theme for the LLM explainer series:

- warm off-white canvas, white cards, dark ink;
- one accent per chapter (orange, blue, green, purple, teal, red);
- Inter for Latin and PingFang SC for Chinese;
- 1920×1080, 120 px side margins, content starts at y=330;
- chapter card is opaque; scenes never cross-fade.

The current Remotion template hard-codes these values in `src/theme.ts`. A theme
JSON is a design contract for new templates or for a human editor; it is copied
into a course with `courseforge assets theme <course> warm-paper`.
