export type AccentName = "orange" | "blue" | "green" | "purple" | "teal" | "red";

export type BoardItem = {
  icon?: string;
  title: string;
  sub?: string;
  color?: AccentName;
};

export type BoardStep = { title: string; sub?: string };

export type ChartPoint = {
  x: number;
  label?: string;
  color?: AccentName;
  dx?: number;
  dy?: number;
  anchor?: "start" | "end";
};

export type ChartSeries = {
  label: string;
  tau?: number;
  color?: AccentName;
};

export type ChartBar = { label: string; value: number; color?: AccentName };

export type ChartSpec = {
  kind: "neglog" | "sigmoid" | "gap" | "bars";
  xRange?: [number, number];
  yMax?: number;
  xLabel?: string;
  yLabel?: string;
  points?: ChartPoint[];
  series?: ChartSeries[];
  bars?: ChartBar[];
  baseline?: number;
  amplitude?: number;
  decay?: number;
  /** gap chart: label for the baseline and the total */
  baseLabel?: string;
  topLabel?: string;
};

export type BoardScene = {
  id: string;
  type: "cover" | "bullets" | "formula" | "curve" | "compare" | "steps" | "photo" | "timeline" | "outro" | "custom";
  accent?: AccentName;
  kicker?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  stamp?: string;
  pills?: string[];
  items?: BoardItem[];
  formula?: string;
  note?: string;
  bullets?: string[];
  chart?: ChartSpec;
  left?: { title: string; sub?: string; items: BoardItem[] };
  right?: { title: string; sub?: string; items: BoardItem[] };
  center?: string;
  steps?: BoardStep[];
  image?: string;
  caption?: string;
  events?: { year: string; title: string; sub?: string; color?: AccentName }[];
  next?: { code: string; title: string; sub?: string };
  /** custom scenes only: component name under src/scenes/ */
  component?: string;
  /** custom scenes only: images used, for `check` */
  images?: string[];
  /** free-form production note */
  beat?: string;
};

export type Storyboard = {
  version: number;
  theme?: string;
  courseTitle: string;
  chapterLabel: string;
  scenes: BoardScene[];
};

import type { Scene } from "./timing";
export type SceneProps = { data: BoardScene; timing: Scene };
