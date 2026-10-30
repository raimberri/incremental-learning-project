import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const inter = loadInter("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400", "600"], subsets: ["latin"] });

const CJK = '"PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", sans-serif';

export const FONT = {
  // Latin glyphs from Inter, Chinese falls through to the system CJK font.
  sans: `${inter.fontFamily}, ${CJK}`,
  mono: `${mono.fontFamily}, ${CJK}`,
};

export const C = {
  bg: "#f4f2ee",
  card: "#ffffff",
  ink: "#1f2430",
  soft: "#5d6472",
  dim: "#a0a5ae",
  line: "rgba(31,36,48,0.09)",
  orange: "#e2724a",
  blue: "#3f6fe0",
  green: "#2f9e6e",
  purple: "#7a5af0",
  teal: "#1f97a6",
  red: "#e0524f",
  marker: "#ffe27a",
  subBg: "rgba(38,41,49,0.92)",
};

export const SHADOW = "0 24px 60px rgba(30,35,50,0.10), 0 3px 10px rgba(30,35,50,0.06)";

export const W = 1920;
export const H = 1080;
