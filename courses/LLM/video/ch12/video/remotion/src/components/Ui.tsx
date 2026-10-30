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
      borderRadius: 22,
      boxShadow: accent ? `0 0 0 3px ${accent}, ${SHADOW}` : SHADOW,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);

// Small coloured label above a headline, e.g. "WHY".
export const Kicker: React.FC<{ color: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ color, children, style }) => (
  <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, letterSpacing: 3, color, ...style }}>{children}</div>
);

export const Headline: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 66, style }) => (
  <div style={{ fontFamily: FONT.sans, fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.25, letterSpacing: 1, ...style }}>
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
        backgroundSize: `${w * 100}% 34%`,
        padding: marker ? "0 4px" : undefined,
      }}
    >
      {children}
    </span>
  );
};

// Rounded chip with an icon.
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
      padding: `${size * 0.32}px ${size * 0.75}px`,
      borderRadius: 999,
      background: solid ? color : "rgba(255,255,255,0.94)",
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

// Pill that pops in at `at`.
export const PopPill: React.FC<React.ComponentProps<typeof Pill> & { at: number }> = ({ at, ...props }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 14);
  return (
    <div style={{ opacity: p, scale: interpolate(p, [0, 1], [0.7, 1]), display: "inline-block" }}>
      <Pill {...props} />
    </div>
  );
};

// Photo inside a rounded card with a slow push-in.
export const Photo: React.FC<{
  src: string;
  w: number;
  h: number;
  from?: number;
  accent?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ src, w, h, from = 0, accent, style, children }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame - from, [0, 600], [1.0, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        borderRadius: 22,
        padding: accent ? 6 : 0,
        background: accent ? `${accent}22` : undefined,
        boxShadow: accent ? `0 0 0 2.5px ${accent}, ${SHADOW}` : SHADOW,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: accent ? 17 : 22, overflow: "hidden" }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: z }} />
      </div>
      {children}
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
        padding: "8px 20px",
        border: `3px solid ${color}`,
        borderRadius: 12,
        background: "#fff",
        color,
        fontFamily: FONT.sans,
        fontSize: 32,
        fontWeight: 800,
        rotate: `${rotate}deg`,
        opacity: p,
        scale: interpolate(p, [0, 1], [1.6, 1]),
        boxShadow: "0 8px 20px rgba(30,35,50,0.12)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Kicker + headline at the top-left of a phase.
export const Top: React.FC<{ at: number; kicker: string; color?: string; children: React.ReactNode }> = ({ at, kicker, color = C.orange, children }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at - 4, 18);
  return (
    <div style={{ position: "absolute", left: 140, top: 150, opacity: p, translate: `${interpolate(p, [0, 1], [-20, 0])}px 0px` }}>
      <Kicker color={color}>{kicker}</Kicker>
      <Headline size={62} style={{ marginTop: 10 }}>
        {children}
      </Headline>
    </div>
  );
};

