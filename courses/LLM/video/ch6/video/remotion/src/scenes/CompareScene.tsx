import React from "react";
import { AbsoluteFill } from "remotion";
import { Card, Enter, Pill, Top } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues } from "../timing";
import type { SceneProps } from "../types";
import { HiText, cue } from "./common";

const Column: React.FC<{ data: { title: string; sub?: string; items: { title: string; sub?: string }[] }; accent: string; at: number }> = ({ data, accent, at }) => (
  <Enter at={at - 4}>
    <Card style={{ width: 800, height: 520, padding: "36px 42px" }}>
      <Pill icon="◆" color={accent} solid size={20}>{data.title}</Pill>
      {data.sub ? <div style={{ fontFamily: FONT.sans, fontSize: 23, color: C.soft, marginTop: 14 }}>{data.sub}</div> : null}
      <div style={{ height: 1.5, background: C.line, margin: "22px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.items.map((it, i) => (
          <div key={`${it.title}-${i}`} style={{ display: "flex", gap: 12 }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 18, color: accent, width: 26, paddingTop: 3 }}>{`0${i + 1}`}</div>
            <div>
              <div style={{ fontFamily: FONT.sans, fontSize: 27, fontWeight: 700, color: C.ink }}>{it.title}</div>
              {it.sub ? <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.soft, marginTop: 2 }}>{it.sub}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  </Enter>
);

export const CompareScene: React.FC<SceneProps> = ({ data, timing }) => {
  const L = cues(timing);
  const a = accentColor(data.accent);
  const b = accentColor("blue");
  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker={data.kicker ?? "COMPARE"} color={a}>
        <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
      </Top>
      <div style={{ position: "absolute", left: 120, top: 330, display: "flex", alignItems: "center", gap: 32 }}>
        <Column data={data.left ?? { title: "A", items: [] }} accent={a} at={cue(L, 0) + 18} />
        <div style={{ fontFamily: FONT.sans, fontSize: 46, color: C.dim, width: 60, textAlign: "center" }}>{data.center ?? "="}</div>
        <Column data={data.right ?? { title: "B", items: [] }} accent={b} at={cue(L, 0) + 18} />
      </div>
    </AbsoluteFill>
  );
};
