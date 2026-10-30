import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Enter, Headline, Kicker, Photo, PopPill, Stamp } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues, reveal } from "../timing";
import type { SceneProps } from "../types";
import { HiText } from "./common";

export const CoverScene: React.FC<SceneProps> = ({ data, timing }) => {
  const frame = useCurrentFrame();
  const L = cues(timing);
  const a = accentColor(data.accent);
  const title = data.title ?? timing.zh;
  const hasImage = Boolean(data.image);
  const pills = data.pills ?? [];

  return (
    <AbsoluteFill>
      {hasImage ? (
        <>
          <div style={{ position: "absolute", left: 120, top: 290 }}>
            <Enter at={L[0] - 4} dur={24}>
              <Photo src={data.image!} w={800} h={560} from={L[0]} />
            </Enter>
          </div>
          <div style={{ position: "absolute", left: 1010, top: 300, width: 760 }}>
            <Enter at={L[0] - 4}>
              <Kicker color={a}>{data.kicker ?? "COURSE"}</Kicker>
              <Headline size={82} style={{ marginTop: 14, lineHeight: 1.22 }}>
                <HiText text={title} highlight={data.highlight} color={a} />
              </Headline>
            </Enter>
            {data.subtitle ? (
              <Enter at={L[0] + 10} dist={16} style={{ marginTop: 20 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.soft, lineHeight: 1.5 }}>{data.subtitle}</div>
              </Enter>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}>
              {pills.map((p, i) => (
                <PopPill key={p} at={(L[1] ?? L[0]) + i * 10} color={i === 0 ? a : C.blue} size={24}>
                  {p}
                </PopPill>
              ))}
            </div>
            {data.stamp ? (
              <div style={{ marginTop: 34 }}>
                <Stamp at={(L[2] ?? L[0]) + 6}>{data.stamp}</Stamp>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 90 }}>
          <div style={{ textAlign: "center", width: 1500 }}>
            <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, letterSpacing: 7, color: a }}>{data.kicker ?? "COURSE"}</div>
            <div style={{ fontFamily: FONT.sans, fontSize: 138, fontWeight: 800, color: C.ink, lineHeight: 1.2, marginTop: 10, translate: `0px ${(1 - reveal(frame, L[0] - 4, 20)) * 20}px` }}>
              <HiText text={title} highlight={data.highlight} color={a} />
            </div>
            {data.subtitle ? <div style={{ fontFamily: FONT.sans, fontSize: 36, color: C.soft, marginTop: 18 }}>{data.subtitle}</div> : null}
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
              {pills.map((p, i) => (
                <PopPill key={p} at={(L[1] ?? L[0]) + i * 10} color={i === 0 ? a : C.blue} size={26}>
                  {p}
                </PopPill>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
