import React from "react";
import { C, FONT } from "../theme";

export const cue = (lines: number[], i: number, fallback = 0) => lines[Math.min(i, Math.max(0, lines.length - 1))] ?? fallback;

export const HiText: React.FC<{ text: string; highlight?: string; color: string }> = ({ text, highlight, color }) => {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [a, b] = text.split(highlight, 2);
  return (
    <>
      {a}
      <span style={{ color }}>{highlight}</span>
      {b}
    </>
  );
};

export const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: FONT.sans, fontSize: 23, lineHeight: 1.55, color: C.soft }}>{children}</div>
);
