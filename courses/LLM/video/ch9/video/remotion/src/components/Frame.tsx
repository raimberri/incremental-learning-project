import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { FPS, reveal, SCENES, TOTAL } from "../timing";

// Light canvas with a couple of very soft colour washes.
export const Canvas: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 200) * 40;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 50% 45% at ${80 + drift / 20}% 18%, ${accent}12, transparent 70%),
          radial-gradient(ellipse 45% 40% at 10% 90%, ${C.blue}0c, transparent 70%), ${C.bg}`,
      }}
    />
  );
};

// Persistent header: course label + progress hairline on the left, chapter number and name on the right.
export const Header: React.FC<{ index: number; accent: string; courseTitle: string; chapterLabel: string }> = ({ index, accent, courseTitle, chapterLabel }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const scene = SCENES[index];
  const p = reveal(frame, Math.round(scene.start * FPS) + 4, 16);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 20 }}>
      <div style={{ position: "absolute", left: 72, top: 42, display: "flex", alignItems: "baseline", gap: 14, fontFamily: FONT.sans }}>
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 2, color: C.ink }}>{courseTitle}</span>
        <span style={{ fontSize: 20, color: C.dim }}>/</span>
        <span style={{ fontSize: 20, color: C.soft }}>{chapterLabel}</span>
      </div>
      <div style={{ position: "absolute", left: 72, top: 84, width: 900, height: 2, background: C.line }}>
        <div style={{ width: `${(t / TOTAL) * 100}%`, height: "100%", background: accent }} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 72,
          top: 42,
          display: "flex",
          gap: 14,
          alignItems: "baseline",
          fontFamily: FONT.sans,
          opacity: p,
          translate: `0px ${(1 - p) * -8}px`,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: accent }}>{scene.code}</span>
        <span style={{ fontSize: 22, fontWeight: 600, color: C.ink }}>{scene.zh}</span>
      </div>
    </AbsoluteFill>
  );
};

// Big chapter title shown for the first ~1.8 s of a chapter, before narration starts.
export const ChapterCard: React.FC<{ code: string; zh: string; en: string; accent: string; until: number }> = ({ code, zh, en, accent, until }) => {
  const frame = useCurrentFrame();
  const o = Math.min(reveal(frame, 0, 14), 1 - reveal(frame, until - 12, 12));
  if (o <= 0) return null;
  const rise = interpolate(frame, [0, until], [10, -10]);
  // The plate is opaque from the first frame, so no incoming scene can show
  // through while the title fades in. Only the content fades with `o`.
  const plate = frame < until - 12 ? 1 : 1 - reveal(frame, until - 12, 12);
  return (
    <AbsoluteFill
      style={{
        zIndex: 10,
        opacity: plate,
        background: `radial-gradient(ellipse 60% 55% at 50% 42%, ${accent}10, transparent 72%), ${C.bg}`,
      }}
    >
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: o, translate: `0px ${rise}px` }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, letterSpacing: 6, color: accent }}>CHAPTER {code}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 92, fontWeight: 800, color: C.ink, marginTop: 10 }}>{zh}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 600, letterSpacing: 8, color: C.dim, marginTop: 6 }}>{en}</div>
        <div style={{ marginTop: 30, width: 80 * reveal(frame, 6, 20), height: 5, borderRadius: 3, background: accent }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
