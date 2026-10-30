import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("gradient");
const A = C.blue;

export const GradientScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const definition = span(frame, 0, L[5] - 4, 14);
  const rule = reveal(frame, L[5] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── what a gradient is ── */}
      <AbsoluteFill style={{ opacity: definition }}>
        <Top at={L[0]} kicker="THE GRADIENT" color={A}>
          把「坡度」变成<Hi color={A} marker at={L[0] + 26}>可以算的东西</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[0]}>
            <Photo src="img/contours.jpg" w={640} h={470} from={L[0]}>
              <div style={{ position: "absolute", left: 22, bottom: 22 }}>
                <PopPill at={L[2] + 8} icon="◈" color={A}>
                  损失曲面（示意）
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 820, top: 330, width: 980 }}>
          <Enter at={L[1] - 4}>
            <Card style={{ padding: "38px 46px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>DEFINITION</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 40, fontWeight: 800, color: C.ink, marginTop: 10, lineHeight: 1.4 }}>
                每个参数一个偏导数
                <br />
                排成一个向量，就叫<Hi color={A} marker at={L[1] + 24}>梯度</Hi>
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink, marginTop: 26, letterSpacing: 1 }}>
                ∇L = ( ∂L/∂θ<sub style={{ fontSize: 20 }}>1</sub>, ∂L/∂θ<sub style={{ fontSize: 20 }}>2</sub>, … , ∂L/∂θ<sub style={{ fontSize: 20 }}>n</sub> )
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0" }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 27, color: C.ink, lineHeight: 1.75 }}>
                <div>
                  <span style={{ color: A, fontWeight: 800 }}>偏导</span>：只让这一个参数动一点点，损失变化多快
                </div>
                <div>
                  <span style={{ color: C.orange, fontWeight: 800 }}>方向</span>：整个向量指向上升最快的方向
                </div>
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                <PopPill at={L[3] + 10} icon="↑" color={C.orange} size={22}>
                  梯度 = 上坡
                </PopPill>
                <PopPill at={L[4] + 6} icon="↓" color={A} size={22}>
                  负梯度 = 下坡
                </PopPill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── the update rule + first-order only ── */}
      <AbsoluteFill style={{ opacity: rule }}>
        <Top at={L[5]} kicker="THE UPDATE RULE" color={A}>
          下山只有<Hi color={A} marker at={L[5] + 24}>一行公式</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, width: 780 }}>
          <Enter at={L[5] - 4}>
            <Card accent={A} style={{ height: 530, padding: "40px 44px" }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 62, color: C.ink, letterSpacing: 1 }}>
                θ ← θ − η ∇<sub style={{ fontSize: 30 }}>θ</sub>L
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "28px 0" }} />
              {[
                ["θ", "参数：地形上的位置", C.ink],
                ["∇L", "梯度：这一点的坡度", C.orange],
                ["η", "学习率：每步迈多大", A],
              ].map(([sym, txt, c], k) => (
                <div
                  key={sym}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 22,
                    marginBottom: 18,
                    opacity: reveal(frame, L[6] + k * 8, 14),
                  }}
                >
                  <div style={{ fontFamily: FONT.mono, fontSize: 34, color: c as string, width: 92 }}>{sym}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.soft }}>{txt}</div>
                </div>
              ))}
              <div style={{ marginTop: 18 }}>
                <Pill icon="−" color={A} size={22}>
                  负号 = 把上坡方向翻成下坡
                </Pill>
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 21, color: C.soft, marginTop: 20 }}>
                对第 i 个参数：θᵢ ← θᵢ − η · ∂L/∂θᵢ
              </div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 940, top: 330 }}>
          <Enter at={L[7] - 4}>
            <Card style={{ width: 860, height: 530, padding: "26px 30px" }}>
              <LossCurve at={L[7]} />
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A stylised loss curve: tangent at a point, and a downhill step along −gradient.
const LossCurve: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const X0 = 70;
  const Y0 = 400;
  const W = 720;
  const H = 300;
  const f = (t: number) => 0.18 + 1.15 * (t - 0.62) ** 2 + 0.12 * Math.sin(t * 5.2) * (1 - t);
  const yMax = 0.72;
  const pts = new Array(101).fill(0).map((_, k) => {
    const t = 0.02 + (k / 100) * 0.96;
    return [X0 + t * W, Y0 - (f(t) / yMax) * H];
  });
  const n = Math.max(2, Math.round(reveal(frame, at, 46) * 100));
  const px = (t: number) => X0 + t * W;
  const py = (t: number) => Y0 - (f(t) / yMax) * H;
  const t0 = 0.78;
  const slope = 2 * 1.15 * (t0 - 0.62);
  const step = 0.14;
  const t1 = t0 - step;
  return (
    <svg width={800} height={480}>
      <defs>
        <marker id="grad-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.green} />
        </marker>
      </defs>
      <line x1={X0} y1={Y0} x2={X0 + W + 26} y2={Y0} stroke="#d6d8dd" strokeWidth={2} />
      <line x1={X0} y1={Y0} x2={X0} y2={52} stroke="#d6d8dd" strokeWidth={2} />
      <text x={X0 + W - 130} y={Y0 + 30} fontSize={20} fill={C.soft} fontFamily={FONT.sans}>
        θ →
      </text>
      <text x={X0 + 8} y={76} fontSize={20} fill={C.soft} fontFamily={FONT.sans}>
        L(θ) ↑
      </text>
      <path d={`M${pts.slice(0, n + 1).map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={A} strokeWidth={6} strokeLinecap="round" />
      <g opacity={reveal(frame, at + 34, 14)}>
        <circle cx={px(t0)} cy={py(t0)} r={11} fill="#fff" stroke={C.orange} strokeWidth={4} />
        <line x1={px(t0) - 120} y1={py(t0) + slope * 120} x2={px(t0) + 120} y2={py(t0) - slope * 120} stroke={C.orange} strokeWidth={2.5} strokeDasharray="7 6" />
        <line x1={px(t0)} y1={py(t0)} x2={px(t1)} y2={py(t1)} stroke={C.green} strokeWidth={5} markerEnd="url(#grad-arrow)" />
        <text x={px(t0) + 16} y={py(t0) - 16} fontSize={22} fontWeight={700} fill={C.orange} fontFamily={FONT.sans}>
          当前位置
        </text>
        <text x={px(t1) - 20} y={py(t1) + 44} fontSize={22} fontWeight={700} fill={C.green} fontFamily={FONT.sans} textAnchor="end">
          沿负梯度走一步
        </text>
      </g>
      <text x={X0} y={470} fontSize={17} fill={C.dim} fontFamily={FONT.sans}>
        曲线示意：梯度只给出这一点的切线方向，不给出谷底的距离
      </text>
    </svg>
  );
};
