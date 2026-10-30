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
  const insight = span(frame, L[4] - 4, L[6] - 2, 14);
  const title = reveal(frame, L[6] - 2, 20);

  return (
    <AbsoluteFill>
      {/* ── no map, only the slope ── */}
      <AbsoluteFill style={{ opacity: opening }}>
        <div style={{ position: "absolute", left: 120, top: 300 }}>
          <Enter at={4} dur={24}>
            <Photo src="img/mountain.jpg" w={780} h={540} from={0}>
              <div style={{ position: "absolute", left: 24, top: 24 }}>
                <PopPill at={L[1] + 6} icon="◔" color={A}>
                  没有地图
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 980, top: 300, width: 800 }}>
          <Enter at={L[0] - 4}>
            <Kicker color={A}>THOUGHT EXPERIMENT</Kicker>
            <Headline size={62} style={{ marginTop: 12 }}>
              看不见地图的<Hi color={A} marker at={L[1] + 10}>下山</Hi>
            </Headline>
          </Enter>
          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              ["①", "参数", "地形上的位置", C.orange],
              ["②", "损失", "这一点的海拔", C.blue],
              ["③", "坡度", "你唯一能感到的信息", C.teal],
            ].map(([i, t, s, c], k) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: reveal(frame, L[1] + 16 + k * 10, 16),
                  translate: `0px ${(1 - reveal(frame, L[1] + 16 + k * 10, 16)) * 12}px`,
                }}
              >
                <div style={{ fontFamily: FONT.sans, fontSize: 30, color: c as string, width: 34 }}>{i}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 40, fontWeight: 800, color: C.ink }}>{t}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.soft }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
            <PopPill at={L[2] + 8} icon="·" color={A} size={23}>
              位置未知
            </PopPill>
            <PopPill at={L[3] + 4} icon="⌄" color={C.teal} size={23}>
              只能感知局部
            </PopPill>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── step, feel, step ── */}
      <AbsoluteFill style={{ opacity: insight, justifyContent: "center", alignItems: "center", paddingBottom: 80 }}>
        <div style={{ position: "absolute", left: 120, top: 250, opacity: 0.2, filter: "blur(3px)" }}>
          <Photo src="img/mountain.jpg" w={700} h={500} />
        </div>
        <Card style={{ position: "relative", zIndex: 1, width: 1240, padding: "50px 64px", textAlign: "center" }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, letterSpacing: 3, color: C.dim }}>THE LOOP</div>
          <div style={{ fontFamily: FONT.sans, fontSize: 50, fontWeight: 700, color: C.ink, marginTop: 20, lineHeight: 1.45 }}>
            朝最陡的下坡<Hi marker at={L[4] + 20}>迈一步</Hi>
            <br />
            再感受，再迈
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 38 }}>
            {["感知坡度", "迈一步", "重新感知"].map((t, i) => (
              <React.Fragment key={t}>
                <Pill icon={["①", "②", "③"][i]} color={[C.teal, A, C.blue][i]} size={24}>
                  {t}
                </Pill>
                {i < 2 ? <span style={{ fontFamily: FONT.sans, fontSize: 26, color: C.dim }}>→</span> : null}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 34 }}>
            <Stamp at={L[5] + 10} color={A} rotate={-4}>
              梯度下降
            </Stamp>
          </div>
        </Card>
      </AbsoluteFill>

      {/* ── title ── */}
      <AbsoluteFill style={{ opacity: title, justifyContent: "center", alignItems: "center", paddingBottom: 110 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, letterSpacing: 7, color: A }}>CHAPTER 02</div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 138,
            fontWeight: 800,
            color: C.ink,
            letterSpacing: 3,
            marginTop: 8,
            translate: `0px ${interpolate(title, [0, 1], [26, 0])}px`,
          }}
        >
          梯度与<span style={{ color: A }}>反向传播</span>
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 34, fontWeight: 600, color: C.soft, marginTop: 10 }}>引擎第一次点火</div>
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          <PopPill at={L[6] + 12} icon="⌄" color={A} size={26}>
            下山
          </PopPill>
          <PopPill at={L[6] + 24} icon="⇥" color={C.blue} size={26}>
            反向一遍
          </PopPill>
          <PopPill at={L[6] + 36} icon="+" color={C.teal} size={26}>
            残差
          </PopPill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
