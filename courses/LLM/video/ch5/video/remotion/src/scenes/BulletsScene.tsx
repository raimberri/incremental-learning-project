import React from "react";
import { AbsoluteFill } from "remotion";
import { Card, Enter, Top } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues } from "../timing";
import type { BoardItem, SceneProps } from "../types";
import { HiText, cue } from "./common";

export const BulletsScene: React.FC<SceneProps> = ({ data, timing }) => {
  const L = cues(timing);
  const a = accentColor(data.accent);
  const items: BoardItem[] = data.items ?? (data.bullets ?? []).map((b) => ({ title: b }));
  const n = Math.max(1, items.length);
  const gap = 28;
  const width = Math.min(520, Math.floor((1640 - gap * (n - 1)) / n));

  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker={data.kicker ?? "THE IDEA"} color={a}>
        <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
      </Top>
      <div style={{ position: "absolute", left: 120, top: 340, display: "flex", gap }}>
        {items.map((item, i) => {
          const c = accentColor(item.color ?? (i === 0 ? data.accent : ["orange", "blue", "green", "purple"][i % 4]));
          return (
            <Enter key={`${item.title}-${i}`} at={cue(L, 0) + 18 + i * 8}>
              <Card style={{ width, height: 430, padding: "34px 34px" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background: `${c}18`,
                    color: c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT.sans,
                    fontSize: 30,
                    fontWeight: 800,
                  }}
                >
                  {item.icon ?? `0${i + 1}`}
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 40, fontWeight: 800, color: C.ink, marginTop: 28, lineHeight: 1.3 }}>{item.title}</div>
                {item.sub ? <div style={{ fontFamily: FONT.sans, fontSize: 23, color: C.soft, marginTop: 10, lineHeight: 1.55 }}>{item.sub}</div> : null}
              </Card>
            </Enter>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
