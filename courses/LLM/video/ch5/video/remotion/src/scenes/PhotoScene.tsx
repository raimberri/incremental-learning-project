import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Photo, PopPill, Top } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues, reveal } from "../timing";
import type { SceneProps } from "../types";
import { HiText, cue } from "./common";

export const PhotoScene: React.FC<SceneProps> = ({ data, timing }) => {
  const frame = useCurrentFrame();
  const L = cues(timing);
  const a = accentColor(data.accent);
  const bullets = data.bullets ?? [];
  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker={data.kicker ?? "IN PICTURES"} color={a}>
        <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
      </Top>
      <div style={{ position: "absolute", left: 120, top: 330 }}>
        <Enter at={L[0] - 4}>
          <Photo src={data.image ?? "img/placeholder.jpg"} w={760} h={540} from={L[0]}>
            <div style={{ position: "absolute", left: 22, top: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              {(data.pills ?? []).map((p, i) => (
                <PopPill key={p} at={cue(L, 1) + i * 10} icon="●" color={i === 0 ? a : C.blue}>
                  {p}
                </PopPill>
              ))}
            </div>
          </Photo>
        </Enter>
      </div>
      <div style={{ position: "absolute", left: 960, top: 340, width: 800 }}>
        <Enter at={L[0] + 10}>
          <Card style={{ width: 800, height: 520, padding: "36px 42px" }}>
            {data.subtitle ? <div style={{ fontFamily: FONT.sans, fontSize: 32, color: C.ink, lineHeight: 1.5, marginBottom: 22 }}>{data.subtitle}</div> : null}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {bullets.map((b, i) => (
                <div key={b} style={{ display: "flex", gap: 14, opacity: reveal(frame, cue(L, 1) + i * 14, 14) }}>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: `${a}18`, color: a, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontSize: 16, fontWeight: 700 }}>{i + 1}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 25, color: C.ink, lineHeight: 1.5 }}>{b}</div>
                </div>
              ))}
            </div>
            {data.caption ? <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim, marginTop: 24 }}>{data.caption}</div> : null}
          </Card>
        </Enter>
      </div>
    </AbsoluteFill>
  );
};
