import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Pill, Top } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues, reveal } from "../timing";
import type { SceneProps } from "../types";
import { HiText, cue } from "./common";

export const FormulaScene: React.FC<SceneProps> = ({ data, timing }) => {
  const frame = useCurrentFrame();
  const L = cues(timing);
  const a = accentColor(data.accent);
  const formula = data.formula ?? "y = f(x)";
  const size = formula.length > 32 ? 38 : formula.length > 18 ? 48 : 58;

  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker={data.kicker ?? "THE FORMULA"} color={a}>
        <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
      </Top>
      <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
        <Enter at={cue(L, 0) + 18}>
          <Card accent={a} style={{ width: 1040, height: 520, padding: "44px 52px" }}>
            <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>FORMULA</div>
            <div style={{ fontFamily: FONT.mono, fontSize: size, color: C.ink, lineHeight: 1.35, marginTop: 34, whiteSpace: "pre-wrap" }}>{formula}</div>
            {data.note ? (
              <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 30, lineHeight: 1.6 }}>{data.note}</div>
            ) : null}
            {data.stamp ? <Pill icon="★" color={a} solid size={22} style={{ marginTop: 26 }}>{data.stamp}</Pill> : null}
          </Card>
        </Enter>
        <Enter at={cue(L, 0) + 28}>
          <Card style={{ width: 580, height: 520, padding: "34px 38px" }}>
            <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: a, letterSpacing: 2 }}>READ IT ALOUD</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 26 }}>
              {(data.bullets ?? []).map((b, i) => (
                <div key={b} style={{ display: "flex", gap: 14, alignItems: "flex-start", opacity: reveal(frame, cue(L, 1) + i * 14, 14) }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: `${a}18`, color: a, fontFamily: FONT.sans, fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 3 }}>{i + 1}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.ink, lineHeight: 1.5 }}>{b}</div>
                </div>
              ))}
            </div>
          </Card>
        </Enter>
      </div>
    </AbsoluteFill>
  );
};
