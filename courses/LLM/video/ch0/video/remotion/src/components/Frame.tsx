import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { FPS, reveal, SCENES, TOTAL } from "../timing";

// Warm paper canvas with a very soft palette wash and a faint grain.
export const Canvas: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 240) * 40;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 55% 48% at ${78 + drift / 24}% 16%, ${accent}12, transparent 70%),
          radial-gradient(ellipse 48% 42% at 8% 92%, ${C.blue}0b, transparent 70%),
          radial-gradient(ellipse 30% 25% at 50% 50%, #ffffff55, transparent 70%),
          ${C.bg}`,
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.22,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(29,34,44,0.025) 0px, rgba(29,34,44,0.025) 1px, transparent 1px, transparent 4px)",
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};

// Persistent header: course label + progress hairline, chapter code/name on the right.
export const Header: React.FC<{ index: number; accent: string }> = ({ index, accent }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const scene = SCENES[index];
  const p = reveal(frame, Math.round(scene.start * FPS) + 4, 16);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 20 }}>
      <div style={{ position: "absolute", left: 72, top: 40, display: "flex", alignItems: "baseline", gap: 14, fontFamily: FONT.sans }}>
        <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: 2, color: C.ink }}>大语言模型教程</span>
        <span style={{ fontSize: 19, color: C.dim }}>/</span>
        <span style={{ fontSize: 19, color: C.soft }}>第 0 章 · 导读</span>
      </div>
      <div style={{ position: "absolute", left: 72, top: 82, width: 900, height: 2, background: C.line }}>
        <div style={{ width: `${(t / TOTAL) * 100}%`, height: "100%", background: accent }} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 72,
          top: 40,
          display: "flex",
          gap: 14,
          alignItems: "baseline",
          fontFamily: FONT.sans,
          opacity: p,
          translate: `0px ${(1 - p) * -8}px`,
        }}
      >
        <span style={{ fontSize: 21, fontWeight: 700, color: accent }}>{scene.code}</span>
        <span style={{ fontSize: 21, fontWeight: 600, color: C.ink }}>{scene.zh}</span>
      </div>
    </AbsoluteFill>
  );
};

// Opaque chapter plate. It covers the whole frame for the first ~1.9 s of a
// scene, so no incoming/outgoing material can show through.
export const ChapterCard: React.FC<{ code: string; zh: string; en: string; accent: string; until: number }> = ({ code, zh, en, accent, until }) => {
  const frame = useCurrentFrame();
  const o = Math.min(reveal(frame, 0, 14), 1 - reveal(frame, until - 12, 12));
  if (o <= 0) return null;
  const rise = interpolate(frame, [0, until], [12, -12]);
  const plate = frame < until - 12 ? 1 : 1 - reveal(frame, until - 12, 12);
  return (
    <AbsoluteFill
      style={{
        zIndex: 10,
        opacity: plate,
        background: `radial-gradient(ellipse 62% 55% at 50% 42%, ${accent}12, transparent 72%), ${C.bg}`,
      }}
    >
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: o, translate: `0px ${rise}px` }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, letterSpacing: 7, color: accent }}>CHAPTER {code}</div>
        <div style={{ fontFamily: FONT.serif, fontSize: 96, fontWeight: 700, color: C.ink, marginTop: 10, letterSpacing: 2 }}>{zh}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 600, letterSpacing: 9, color: C.dim, marginTop: 8 }}>{en}</div>
        <div style={{ marginTop: 30, width: 90 * reveal(frame, 6, 20), height: 5, borderRadius: 3, background: accent }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
