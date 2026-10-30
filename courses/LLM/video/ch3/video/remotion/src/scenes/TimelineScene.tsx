import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Top } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues, reveal } from "../timing";
import type { SceneProps } from "../types";
import { HiText, cue } from "./common";

export const TimelineScene: React.FC<SceneProps> = ({ data, timing }) => {
  const frame = useCurrentFrame();
  const L = cues(timing);
  const a = accentColor(data.accent);
  const events = data.events ?? [];
  const n = Math.max(events.length, 1);
  const x0 = 200;
  const x1 = 1720;
  const step = n > 1 ? (x1 - x0) / (n - 1) : 0;
  const y = 560;
  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker={data.kicker ?? "TIMELINE"} color={a}>
        <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
      </Top>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line x1={x0 - 30} y1={y} x2={x1 + 30} y2={y} stroke="#d6d8dd" strokeWidth={3} strokeLinecap="round" />
        <line x1={x0 - 30} y1={y} x2={x0 - 30 + (x1 - x0 + 60) * reveal(frame, L[0] + 8, 40)} y2={y} stroke={a} strokeWidth={4} />
      </svg>
      {events.map((e, i) => {
        const x = x0 + step * i;
        const up = i % 2 === 0;
        const c = accentColor(e.color ?? data.accent);
        return (
          <React.Fragment key={`${e.year}-${i}`}>
            <div style={{ position: "absolute", left: x - 13, top: y - 13, width: 26, height: 26, borderRadius: 13, background: c, border: `4px solid #fff`, boxSizing: "border-box", opacity: reveal(frame, cue(L, 1) + i * 6, 16) }} />
            <div style={{ position: "absolute", left: x - 150, top: up ? y - 250 : y + 40, width: 300, opacity: reveal(frame, cue(L, 1) + i * 6, 16) }}>
              <Card style={{ padding: "22px 24px" }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, color: c }}>{e.year}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 27, fontWeight: 800, color: C.ink, marginTop: 4 }}>{e.title}</div>
                {e.sub ? <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.soft, marginTop: 6, lineHeight: 1.45 }}>{e.sub}</div> : null}
              </Card>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
