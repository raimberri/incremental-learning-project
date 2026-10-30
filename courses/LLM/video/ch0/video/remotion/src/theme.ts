import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const inter = loadInter("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400", "600"], subsets: ["latin"] });

const CJK_SANS = '"PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", sans-serif';
const CJK_SERIF = '"Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", serif';

export const FONT = {
  sans: `${inter.fontFamily}, ${CJK_SANS}`,
  serif: `${CJK_SERIF}, ${inter.fontFamily}`,
  mono: `${mono.fontFamily}, ${CJK_SANS}`,
};

export const C = {
  bg: "#f3efe7",
  paper: "#faf7f0",
  card: "#fffdf8",
  ink: "#1d222c",
  soft: "#5f6672",
  dim: "#9aa0a8",
  line: "rgba(29,34,44,0.10)",
  orange: "#d9693f",
  blue: "#3c66c4",
  green: "#2f8f63",
  purple: "#7050d8",
  teal: "#1b8f9c",
  red: "#c94a45",
  marker: "#f6d776",
  subBg: "rgba(33,36,44,0.93)",
};

export const SHADOW = "0 30px 70px rgba(30,35,50,0.12), 0 4px 12px rgba(30,35,50,0.06)";
export const SOFT_SHADOW = "0 18px 40px rgba(30,35,50,0.09)";

export const W = 1920;
export const H = 1080;

export const ACCENT = {
  orange: C.orange,
  blue: C.blue,
  green: C.green,
  purple: C.purple,
  teal: C.teal,
  red: C.red,
} as const;

export type AccentName = keyof typeof ACCENT;

export const accentColor = (name?: string) => (name && name in ACCENT ? ACCENT[name as AccentName] : C.orange);
