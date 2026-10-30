import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("outro");
const A = C.green;

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const summary = span(frame, 0, L[4] - 2, 14);
  const end = reveal(frame, L[4] - 2, 18);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: summary }}>
        <Top at={L[0]} kicker="RECAP" color={A}>
          这一章，我们拿到了<Hi color={A} marker at={L[0] + 24}>目标函数</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[0]}>
            <Photo src="img/notebook.jpg" w={760} h={520} from={L[0]}>
              <div style={{ position: "absolute", left: 22, bottom: 22 }}>
                <PopPill at={L[0] + 30} icon="✎" color={A}>
                  但还差一步
                </PopPill>
              </div>
            </Photo>
          </Enter>
          <Enter at={L[0] + 12}>
            <Card style={{ width: 820, height: 520, padding: "38px 42px" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", opacity: reveal(frame, L[1] - 2, 14) }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: `${C.green}18`, color: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800 }}>✓</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.ink }}>目标函数：负对数似然 = 交叉熵</div>
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0" }} />
              <div style={{ display: "flex", gap: 14, alignItems: "center", opacity: reveal(frame, L[1] + 10, 14) }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: `${C.orange}18`, color: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800 }}>?</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.ink }}>参数 θ 怎么自动变好？</div>
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 27, color: C.soft, marginTop: 26 }}>θ ← θ − η ∇L(θ)</div>
              <div style={{ marginTop: 28, opacity: reveal(frame, L[2] - 2, 16) }}>
                <Pill icon="→" color={A} solid size={24}>
                  下一章：梯度下降与反向传播
                </Pill>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.dim, marginTop: 16, lineHeight: 1.5 }}>全课第一个陡坡，也是深度学习的发动机</div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: end, justifyContent: "center", alignItems: "center", paddingBottom: 110 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, letterSpacing: 7, color: A }}>CHAPTER 02</div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 132,
            fontWeight: 800,
            color: C.ink,
            marginTop: 10,
            translate: `0px ${interpolate(end, [0, 1], [24, 0])}px`,
          }}
        >
          梯度与<span style={{ color: A }}>反向传播</span>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          <PopPill at={L[4] + 14} icon="▶" color={A} size={30}>
            下期见
          </PopPill>
          <PopPill at={L[4] + 26} icon="★" color={C.orange} size={30}>
            See you next time
          </PopPill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
