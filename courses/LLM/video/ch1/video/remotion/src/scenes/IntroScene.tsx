import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, Enter, Headline, Hi, Kicker, Photo, Pill, PopPill, Stamp } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("intro");
const A = C.orange;

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const opening = span(frame, 0, L[4] - 4, 16);
  const insight = span(frame, L[4] - 4, L[5] - 4, 14);
  const title = reveal(frame, L[5] - 2, 20);

  return (
    <AbsoluteFill>
      {/* ── the blank ── */}
      <AbsoluteFill style={{ opacity: opening }}>
        <div style={{ position: "absolute", left: 120, top: 290 }}>
          <Enter at={4} dur={24}>
            <Photo src="img/pets.jpg" w={800} h={560} from={0}>
              <div style={{ position: "absolute", left: 26, top: 26 }}>
                <PopPill at={L[1] + 6} icon="?" color={A}>
                  猫？狗？
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 1010, top: 300, width: 760 }}>
          <Enter at={L[0] - 4}>
            <Kicker color={A}>THOUGHT EXPERIMENT</Kicker>
            <Headline size={66} style={{ marginTop: 12 }}>
              我说：我养了一只
            </Headline>
          </Enter>
          <Enter at={L[0] + 8} dist={12} style={{ marginTop: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <div
                style={{
                  width: 250,
                  height: 124,
                  borderRadius: 20,
                  border: `3px dashed ${A}`,
                  background: `${A}0d`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT.sans,
                  fontSize: 46,
                  fontWeight: 800,
                  color: A,
                  opacity: 0.55 + 0.45 * Math.sin(frame / 10) ** 2,
                }}
              >
                ？
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.soft, lineHeight: 1.5 }}>
                你的大脑
                <br />
                已经补上了
              </div>
            </div>
          </Enter>
          <div style={{ display: "flex", gap: 16, marginTop: 34 }}>
            <PopPill at={L[1] + 14} icon="●" color={C.orange} size={30}>
              猫
            </PopPill>
            <PopPill at={L[1] + 26} icon="●" color={"#d99a2b"} size={30}>
              狗
            </PopPill>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginLeft: 12 }}>
              <div style={{ position: "relative", opacity: reveal(frame, L[2] + 10, 12) }}>
                <Pill icon="×" color={C.dim} size={30}>
                  微波炉
                </Pill>
                <div
                  style={{
                    position: "absolute",
                    left: 18,
                    right: 18,
                    top: "50%",
                    height: 3,
                    background: C.red,
                    rotate: "-4deg",
                    transform: `scaleX(${reveal(frame, L[2] + 22, 14)})`,
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 30 }}>
            <Stamp at={L[2] + 34}>几乎不可能</Stamp>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── the payoff ── */}
      <AbsoluteFill style={{ opacity: insight, justifyContent: "center", alignItems: "center", paddingBottom: 90 }}>
        <div style={{ position: "absolute", left: 120, top: 250, opacity: 0.22, filter: "blur(2px)" }}>
          <Photo src="img/pets.jpg" w={700} h={500} />
        </div>
        <Card style={{ width: 1160, padding: "54px 70px", textAlign: "center" }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, letterSpacing: 3, color: C.dim }}>KEY INSIGHT</div>
          <div style={{ fontFamily: FONT.sans, fontSize: 46, fontWeight: 700, color: C.ink, marginTop: 22, lineHeight: 1.5 }}>
            你对语言的把握，至少有一部分
            <br />
            表现为<Hi marker at={L[4] + 24}>对下一个词的预期</Hi>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 36 }}>
            <Pill icon="▤" color={C.blue} size={24}>
              读过很多中文
            </Pill>
            <span style={{ fontFamily: FONT.sans, fontSize: 30, color: C.dim, alignSelf: "center" }}>→</span>
            <Pill icon="◈" color={A} solid size={24}>
              知道这里常出现哪些词
            </Pill>
          </div>
        </Card>
      </AbsoluteFill>

      {/* ── title ── */}
      <AbsoluteFill style={{ opacity: title, justifyContent: "center", alignItems: "center", paddingBottom: 120 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, letterSpacing: 7, color: A }}>CHAPTER 01</div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 142,
            fontWeight: 800,
            color: C.ink,
            letterSpacing: 4,
            marginTop: 8,
            translate: `0px ${interpolate(title, [0, 1], [26, 0])}px`,
          }}
        >
          语言的<span style={{ color: A }}>概率论</span>
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 34, fontWeight: 600, color: C.soft, marginTop: 10 }}>从「猜下一个词」开始</div>
        <div style={{ display: "flex", gap: 16, marginTop: 42 }}>
          <PopPill at={L[5] + 12} icon="◎" color={C.blue} size={26}>
            一个分布
          </PopPill>
          <PopPill at={L[5] + 24} icon="∑" color={C.teal} size={26}>
            链式法则
          </PopPill>
          <PopPill at={L[5] + 36} icon="◐" color={C.orange} size={26}>
            交叉熵
          </PopPill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
