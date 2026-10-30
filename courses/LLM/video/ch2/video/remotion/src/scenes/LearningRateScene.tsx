import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("learningrate");
const A = C.teal;

type Case = { title: string; eta: string; color: string; note: string; etaN: number; verdict: string };

const CASES: Case[] = [
  { title: "太小", eta: "η = 0.06", color: C.teal, note: "七步之后，还在半山腰", etaN: 0.06, verdict: "走不动" },
  { title: "合适", eta: "η = 0.32", color: C.blue, note: "六步就贴近谷底", etaN: 0.32, verdict: "收敛" },
  { title: "太大", eta: "η = 1.12", color: C.red, note: "在对岸来回横跳，越跳越高", etaN: 1.12, verdict: "发散" },
];

export const LearningRateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const intro = span(frame, 0, L[2] - 4, 14);
  const charts = reveal(frame, L[2] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── the one number you pick ── */}
      <AbsoluteFill style={{ opacity: intro }}>
        <Top at={L[0]} kicker="STEP SIZE" color={A}>
          公式里唯一要人选的，是<Hi color={A} marker at={L[0] + 24}>学习率 η</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[0]}>
            <Photo src="img/steps.jpg" w={640} h={470} from={L[0]}>
              <div style={{ position: "absolute", left: 22, bottom: 22 }}>
                <PopPill at={L[1] + 8} icon="⌄" color={A}>
                  一步迈多大？
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 820, top: 330, width: 980 }}>
          <Enter at={L[1] - 4}>
            <Card accent={A} style={{ padding: "40px 46px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>LEARNING RATE</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 14 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 78, color: C.ink }}>η</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.soft }}>每步走多远</div>
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0" }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 29, color: C.ink, lineHeight: 1.7 }}>
                它不改变方向，只改变<Hi color={A}>信这个方向多少</Hi>。
                <br />
                方向由梯度给，步长由你给。
              </div>
              <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
                <Pill icon="—" color={C.dim} size={22}>
                  太小：慢
                </Pill>
                <Pill icon="↑" color={C.red} size={22}>
                  太大：不稳
                </Pill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── three step sizes, one parabola ── */}
      <AbsoluteFill style={{ opacity: charts }}>
        <Top at={L[2]} kicker="ONE CURVE, THREE STEP SIZES" color={A}>
          同一条曲线，<Hi color={A} marker at={L[2] + 26}>三种步长</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 30 }}>
          {CASES.map((c, i) => (
            <Enter key={c.title} at={L[2] + i * 8} dist={16}>
              <Card style={{ width: 540, height: 415, padding: "22px 24px", boxShadow: `0 0 0 2.5px ${c.color}44, 0 24px 60px rgba(30,35,50,0.10)` }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, color: c.color }}>{c.title}</div>
                  <div style={{ fontFamily: FONT.mono, fontSize: 22, color: C.soft }}>{c.eta}</div>
                </div>
                <MiniDescent eta={c.etaN} color={c.color} at={L[2] + i * 8 + 6} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                  <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.soft }}>{c.note}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: c.color }}>{c.verdict}</div>
                </div>
              </Card>
            </Enter>
          ))}
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 775, display: "flex", justifyContent: "center" }}>
          <Enter at={L[5]} dist={10}>
            <Card style={{ width: 1680, padding: "24px 34px", display: "flex", alignItems: "center", gap: 26 }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, color: A, letterSpacing: 1, whiteSpace: "nowrap" }}>稳定性 × 速度</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 27, color: C.ink }}>
                这和在数值分析里用欧拉法解微分方程时选步长，是<Hi color={A}>同一个权衡</Hi>。
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <Pill icon="✓" color={C.green} size={19}>
                  先能走，再慢慢减小
                </Pill>
                <span style={{ opacity: reveal(frame, L[8] - 2, 14) }}>
                  <Pill icon="◉" color={C.red} size={19}>
                    最敏感的旋钮
                  </Pill>
                </span>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// One parabola, one starting point, and the first few iterates of θ ← θ − η·dL/dθ.
const MiniDescent: React.FC<{ eta: number; color: string; at: number }> = ({ eta, color, at }) => {
  const frame = useCurrentFrame();
  const X0 = 40;
  const Y0 = 250;
  const W = 436;
  const H = 166;
  const f = (t: number) => 0.32 * (t - 3) ** 2 + 0.34;
  const yMax = 3.5;
  const px = (t: number) => X0 + (t / 6) * W;
  const py = (t: number) => Y0 - (Math.min(f(t), yMax) / yMax) * H;

  let theta = 5.6;
  const steps: number[] = [theta];
  for (let k = 0; k < 7; k++) {
    theta = theta - eta * 2 * (theta - 3);
    theta = Math.max(0.12, Math.min(5.88, theta));
    steps.push(theta);
  }

  const curve = new Array(121).fill(0).map((_, k) => {
    const t = (k / 120) * 6;
    return [px(t), py(t)];
  });

  return (
    <svg width={486} height={300}>
      <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#d6d8dd" strokeWidth={1.6} />
      <line x1={X0} y1={Y0} x2={X0} y2={52} stroke="#d6d8dd" strokeWidth={1.6} />
      <text x={X0 + W - 26} y={Y0 + 24} fontSize={16} fill={C.soft} fontFamily={FONT.sans}>
        θ →
      </text>
      <text x={X0 + 4} y={70} fontSize={16} fill={C.soft} fontFamily={FONT.sans}>
        L ↑
      </text>
      <path d={`M${curve.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke="#c9ccd3" strokeWidth={5} strokeLinecap="round" />
      {steps.map((t, k) => (
        <g key={k} opacity={reveal(frame, at + k * 7, 8)}>
          <circle cx={px(t)} cy={py(t)} r={k === 0 ? 8 : 7} fill={k === 0 ? "#fff" : color} stroke={k === 0 ? C.soft : "#fff"} strokeWidth={k === 0 ? 2.5 : 1.5} />
          {k < steps.length - 1 ? (
            <line x1={px(t)} y1={py(t)} x2={px(steps[k + 1])} y2={py(steps[k + 1])} stroke={color} strokeWidth={2} strokeDasharray="4 4" opacity={reveal(frame, at + k * 7 + 5, 8) * 0.55} />
          ) : null}
        </g>
      ))}
      <text x={X0 + 4} y={296} fontSize={15} fill={C.dim} fontFamily={FONT.sans}>
        示意：L(θ) = 0.32(θ−3)² + 0.34
      </text>
    </svg>
  );
};
