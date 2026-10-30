import { Easing, interpolate } from "remotion";
import timeline from "./data/timeline.json";

export type Line = { zh: string; en: string; start: number; end: number };
export type Scene = {
  id: string;
  code: string;
  zh: string;
  en: string;
  start: number;
  end: number;
  lines: Line[];
};

export const FPS = 30;
export const SCENES = timeline.scenes as Scene[];
export const TOTAL = timeline.total;
export const DURATION = Math.ceil(TOTAL * FPS);
// Scenes do not overlap: a short dip-to-background hides the cut without
// letting the previous scene bleed into the next chapter card.
export const OVERLAP = 0;

export const sceneById = (id: string) => {
  const s = SCENES.find((x) => x.id === id);
  if (!s) throw new Error(`No scene ${id}`);
  return s;
};

// Line start frames, relative to the scene's own start (what useCurrentFrame returns inside it).
export const cues = (scene: Scene) =>
  scene.lines.map((l) => Math.round((l.start - scene.start) * FPS));

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// 0 → 1 over `dur` frames starting at `at`.
export const reveal = (frame: number, at: number, dur = 18) =>
  interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

// 1 while frame is in [from, to), with soft edges.
export const span = (frame: number, from: number, to: number, fade = 10) =>
  Math.min(reveal(frame, from, fade), 1 - reveal(frame, to - fade, fade));

// Deterministic per-frame noise in [0, 1).
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
