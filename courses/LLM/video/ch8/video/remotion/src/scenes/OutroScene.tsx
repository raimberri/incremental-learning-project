import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Card, Enter, PopPill } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues, reveal } from "../timing";
import type { SceneProps } from "../types";
import { HiText, cue } from "./common";

export const OutroScene: React.FC<SceneProps> = ({ data, timing }) => {
  const frame = useCurrentFrame();
  const L = cues(timing);
  const a = accentColor(data.accent);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 100 }}>
      {data.image ? (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity: 0.12 }}>
          <Img src={staticFile(data.image)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px)" }} />
        </div>
      ) : null}
      <div style={{ textAlign: "center", width: 1500 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 28, fontWeight: 800, letterSpacing: 7, color: a }}>{data.kicker ?? "NEXT"}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 108, fontWeight: 800, color: C.ink, marginTop: 12, lineHeight: 1.2, translate: `0px ${(1 - reveal(frame, L[0] - 4, 20)) * 20}px` }}>
          <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
        </div>
        {data.subtitle ? <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.soft, marginTop: 14 }}>{data.subtitle}</div> : null}
        {data.next ? (
          <Enter at={cue(L, 1) - 6} style={{ marginTop: 34 }}>
            <Card accent={a} style={{ display: "inline-block", padding: "22px 40px", textAlign: "left" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>NEXT CHAPTER</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 6 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 26, fontWeight: 700, color: a }}>{data.next.code}</span>
                <span style={{ fontFamily: FONT.sans, fontSize: 38, fontWeight: 800, color: C.ink }}>{data.next.title}</span>
              </div>
              {data.next.sub ? <div style={{ fontFamily: FONT.sans, fontSize: 21, color: C.soft, marginTop: 6 }}>{data.next.sub}</div> : null}
            </Card>
          </Enter>
        ) : null}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 34 }}>
          {(data.pills ?? []).map((p, i) => (
            <PopPill key={p} at={cue(L, 2) + i * 10} icon={i === 0 ? "▶" : "★"} color={i === 0 ? a : C.orange} size={28}>
              {p}
            </PopPill>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
