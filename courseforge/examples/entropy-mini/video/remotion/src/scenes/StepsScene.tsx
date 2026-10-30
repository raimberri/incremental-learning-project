import React from "react";
import { AbsoluteFill } from "remotion";
import { Card, Enter, Pill, Top } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues } from "../timing";
import type { SceneProps } from "../types";
import { HiText, cue } from "./common";

export const StepsScene: React.FC<SceneProps> = ({ data, timing }) => {
  const L = cues(timing);
  const a = accentColor(data.accent);
  const steps = data.steps ?? [];
  const n = Math.max(steps.length, 1);
  const gap = 34;
  const width = Math.floor((1600 - (n - 1) * (gap + 42)) / n);

  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker={data.kicker ?? "HOW TO USE"} color={a}>
        <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
      </Top>
      <div style={{ position: "absolute", left: 150, top: 360, display: "flex", gap }}>
        {steps.map((s, i) => (
          <React.Fragment key={`${s.title}-${i}`}>
            <Enter at={cue(L, i + 1) - 6}>
              <Card accent={i === 0 ? a : undefined} style={{ width, height: 380, padding: "34px 30px" }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 22, fontWeight: 600, color: a }}>{`STEP 0${i + 1}`}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 37, fontWeight: 800, color: C.ink, marginTop: 16, lineHeight: 1.3 }}>{s.title}</div>
                {s.sub ? <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 10, lineHeight: 1.5 }}>{s.sub}</div> : null}
              </Card>
            </Enter>
            {i < steps.length - 1 ? <div style={{ alignSelf: "center", fontFamily: FONT.sans, fontSize: 34, color: C.dim }}>→</div> : null}
          </React.Fragment>
        ))}
      </div>
      {data.stamp ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center" }}>
          <Pill icon="✓" color={C.green} size={24}>{data.stamp}</Pill>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
