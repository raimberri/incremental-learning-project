import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { FPS, reveal, SCENES } from "../timing";

const LINES = SCENES.flatMap((s) => s.lines);

// Bilingual subtitles in a dark rounded box: Chinese on top, English below.
export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const idx = LINES.findIndex((l, i) => {
    const next = LINES[i + 1];
    // Bridge short pauses so the box doesn't blink between sentences.
    const until = next && next.start - l.end < 0.8 ? next.start - 0.02 : l.end + 0.3;
    return t >= l.start - 0.06 && t < until;
  });
  if (idx === -1) return null;
  const line = LINES[idx];
  const p = reveal(frame, Math.round(line.start * FPS) - 2, 6);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 46, pointerEvents: "none" }}>
      <div
        style={{
          maxWidth: 1700,
          padding: "12px 34px 14px",
          borderRadius: 14,
          background: C.subBg,
          textAlign: "center",
          opacity: p,
          boxShadow: "0 10px 30px rgba(20,22,30,0.18)",
        }}
      >
        <div style={{ fontFamily: FONT.sans, fontSize: 36, fontWeight: 600, color: "#fff", lineHeight: 1.35, textWrap: "balance" }}>{line.zh}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 500, color: "#c9cdd6", marginTop: 3, lineHeight: 1.3, textWrap: "balance" }}>
          {line.en}
        </div>
      </div>
    </AbsoluteFill>
  );
};
