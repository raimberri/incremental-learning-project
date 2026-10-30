import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, FONT, SHADOW } from "../theme";
import { reveal } from "../timing";

// Standard entrance: fade + small rise.
export const useEnter = (at: number, dur = 18, dist = 24) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, dur);
  return { p, style: { opacity: p, translate: `0px ${(1 - p) * dist}px` } as React.CSSProperties };
};

export const Enter: React.FC<{ at: number; dur?: number; dist?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  at,
  dur,
  dist,
  style,
  children,
}) => {
  const { style: s } = useEnter(at, dur, dist);
  return <div style={{ ...s, ...style }}>{children}</div>;
};

export const Card: React.FC<{ style?: React.CSSProperties; accent?: string; children?: React.ReactNode }> = ({ style, accent, children }) => (
  <div
    style={{
      background: C.card,
      borderRadius: 24,
      boxShadow: accent ? `0 0 0 3px ${accent}, ${SHADOW}` : SHADOW,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Kicker: React.FC<{ color: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ color, children, style }) => (
  <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, letterSpacing: 4, color, ...style }}>{children}</div>
);

export const Headline: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 66, style }) => (
  <div style={{ fontFamily: FONT.serif, fontSize: size, fontWeight: 700, color: C.ink, lineHeight: 1.18, letterSpacing: 1, ...style }}>
    {children}
  </div>
);

// Highlighted words: coloured text, with an optional marker stroke that wipes in from `at`.
export const Hi: React.FC<{ color?: string; marker?: boolean; at?: number; children: React.ReactNode }> = ({
  color = C.orange,
  marker,
  at = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const w = marker ? reveal(frame, at, 16) : 0;
  return (
    <span
      style={{
        color,
        backgroundImage: marker ? `linear-gradient(${C.marker}, ${C.marker})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 88%",
        backgroundSize: `${w * 100}% 30%`,
        padding: marker ? "0 4px" : undefined,
      }}
    >
      {children}
    </span>
  );
};

export const Pill: React.FC<{
  icon?: string;
  color?: string;
  solid?: boolean;
  size?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ icon, color = C.soft, solid, size = 26, style, children }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: `${size * 0.3}px ${size * 0.72}px`,
      borderRadius: 999,
      background: solid ? color : "rgba(255,253,248,0.96)",
      border: solid ? "none" : `1.5px solid ${color}33`,
      boxShadow: "0 6px 18px rgba(30,35,50,0.10)",
      fontFamily: FONT.sans,
      fontSize: size,
      fontWeight: 600,
      color: solid ? "#fff" : C.ink,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {icon ? <span style={{ color: solid ? "#fff" : color, fontWeight: 700 }}>{icon}</span> : null}
    {children}
  </div>
);

export const PopPill: React.FC<React.ComponentProps<typeof Pill> & { at: number }> = ({ at, ...props }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 14);
  return (
    <div style={{ opacity: p, scale: interpolate(p, [0, 1], [0.72, 1]), display: "inline-block" }}>
      <Pill {...props} />
    </div>
  );
};

// Image inside a rounded frame with a slow push-in.
export const Photo: React.FC<{
  src: string;
  w: number;
  h: number;
  from?: number;
  accent?: string;
  radius?: number;
  position?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ src, w, h, from = 0, accent, radius = 24, position = "center", style, children }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame - from, [0, 700], [1.0, 1.07], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        borderRadius: radius,
        padding: accent ? 6 : 0,
        background: accent ? `${accent}22` : undefined,
        boxShadow: accent ? `0 0 0 2.5px ${accent}, ${SHADOW}` : SHADOW,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: accent ? radius - 6 : radius, overflow: "hidden", background: C.paper }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position, scale: z }} />
      </div>
      {children}
    </div>
  );
};

// Small round crop, used for map nodes and era chips.
export const Thumb: React.FC<{ src: string; size: number; from?: number; accent?: string }> = ({ src, size, from = 0, accent }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame - from, [0, 600], [1.0, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: `3px solid ${accent ?? "#fff"}`,
        boxShadow: "0 8px 20px rgba(30,35,50,0.16)",
        background: C.paper,
        flexShrink: 0,
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: z }} />
    </div>
  );
};

// Rotated red-bordered tag, like a rubber stamp.
export const Stamp: React.FC<{ at: number; color?: string; rotate?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  at,
  color = C.red,
  rotate = -6,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 10);
  return (
    <div
      style={{
        display: "inline-block",
        padding: "7px 18px",
        border: `3px solid ${color}`,
        borderRadius: 10,
        background: "#fffdf8",
        color,
        fontFamily: FONT.sans,
        fontSize: 28,
        fontWeight: 800,
        rotate: `${rotate}deg`,
        opacity: p,
        scale: interpolate(p, [0, 1], [1.5, 1]),
        boxShadow: "0 8px 20px rgba(30,35,50,0.12)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Kicker + headline at the top-left of a phase.
export const Top: React.FC<{ at: number; kicker: string; color?: string; size?: number; children: React.ReactNode }> = ({
  at,
  kicker,
  color = C.orange,
  size = 64,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at - 4, 18);
  return (
    <div style={{ position: "absolute", left: 140, top: 148, width: 1640, opacity: p, translate: `${interpolate(p, [0, 1], [-20, 0])}px 0px` }}>
      <Kicker color={color}>{kicker}</Kicker>
      <Headline size={size} style={{ marginTop: 8 }}>
        {children}
      </Headline>
    </div>
  );
};

// Thin hand-drawn-ish rule used under section numbers.
export const Rule: React.FC<{ color?: string; w?: number; at?: number }> = ({ color = C.orange, w = 80, at = 0 }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 18);
  return <div style={{ width: w * p, height: 4, borderRadius: 2, background: color }} />;
};

export const Arrow: React.FC<{ color?: string; w?: number; at?: number }> = ({ color = C.dim, w = 100, at = 0 }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 16);
  return (
    <svg width={w} height={22} viewBox={`0 0 ${w} 22`} style={{ display: "block" }}>
      <line x1={0} y1={11} x2={w * p} y2={11} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <path d={`M${w * p - 9} 3 L${w * p} 11 L${w * p - 9} 19`} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={p} />
    </svg>
  );
};
