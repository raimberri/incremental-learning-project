import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("training");
const A = C.blue;

export const TrainingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const objective = span(frame, 0, L[2] - 4, 14);
  const identities = span(frame, L[2] - 4, L[7] - 4, 14);
  const next = reveal(frame, L[7] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── the objective ── */}
      <AbsoluteFill style={{ opacity: objective }}>
        <Top at={L[0]} kicker="OBJECTIVE" color={A}>
          训练目标：让「意外」<Hi color={A} marker at={L[0] + 28}>最小</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[1] - 6}>
            <Card accent={A} style={{ width: 1080, height: 480, padding: "40px 50px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>MINIMIZE</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginTop: 30 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 42, color: A }}>min<sub style={{ fontSize: 22 }}>θ</sub></div>
                <div style={{ fontFamily: FONT.mono, fontSize: 37, color: C.ink, lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  L(θ) = −<span style={{ fontSize: 33 }}>(1/T)</span>{" "}
                  <span style={{ fontSize: 44 }}>∑</span><sub style={{ fontSize: 19 }}>t=1</sub><sup style={{ fontSize: 19 }}>T</sup> log P<sub style={{ fontSize: 22 }}>θ</sub>(w<sub style={{ fontSize: 22 }}>t</sub> | w<sub style={{ fontSize: 22 }}>&lt;t</sub>)
                </div>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 22 }}>调整参数 θ，让真实的下一个词，在模型分布下的平均负对数概率最小</div>
              <div style={{ display: "flex", gap: 16, marginTop: 34 }}>
                <Pill icon="θ" color={A} size={24}>
                  参数
                </Pill>
                <Pill icon="▤" color={C.orange} size={24}>
                  训练语料
                </Pill>
                <Pill icon="↓" color={C.green} size={24}>
                  损失变小
                </Pill>
              </div>
            </Card>
          </Enter>
          <Enter at={L[1] + 16}>
            <Card style={{ width: 640, height: 480, padding: "34px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, color: C.ink }}>θ 往哪边挪？</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 8 }}>这里只定义目标，怎么走是下一章</div>
              <LossCurve at={L[1] + 30} />
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── two names, one thing ── */}
      <AbsoluteFill style={{ opacity: identities }}>
        <Top at={L[2]} kicker="TWO NAMES, ONE THING" color={A}>
          同一件事的<Hi color={A} marker at={L[2] + 30}>两种语言</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36, alignItems: "stretch" }}>
          <Enter at={L[2]}>
            <Card style={{ width: 800, height: 470, padding: "38px 44px" }}>
              <Pill icon="◐" color={C.blue} solid size={22}>
                信息论
              </Pill>
              <div style={{ fontFamily: FONT.sans, fontSize: 52, fontWeight: 800, color: C.ink, marginTop: 24 }}>最小化交叉熵</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 30, color: C.soft, marginTop: 18 }}>H(p, q) → min</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 30, lineHeight: 1.6 }}>让模型分布尽量接近数据分布</div>
            </Card>
          </Enter>
          <div style={{ alignSelf: "center", fontFamily: FONT.sans, fontSize: 40, color: C.dim }}>=</div>
          <Enter at={L[2] + 14}>
            <Card style={{ width: 800, height: 470, padding: "38px 44px" }}>
              <Pill icon="▤" color={C.orange} solid size={22}>
                统计学
              </Pill>
              <div style={{ fontFamily: FONT.sans, fontSize: 52, fontWeight: 800, color: C.ink, marginTop: 24 }}>最大似然估计</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 30, color: C.soft, marginTop: 18 }}>Π P(w<sub style={{ fontSize: 18 }}>t</sub> | w<sub style={{ fontSize: 18 }}>&lt;t</sub>) → max</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 30, lineHeight: 1.6 }}>让训练语料在模型眼里尽可能可能发生</div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 840, display: "flex", justifyContent: "center", opacity: reveal(frame, L[6] - 4, 16) }}>
          <Pill icon="∞" color={A} size={26}>
            这个「两种语言」的对照，会贯穿整门课
          </Pill>
        </div>
      </AbsoluteFill>

      {/* ── next chapter ── */}
      <AbsoluteFill style={{ opacity: next }}>
        <Top at={L[7]} kicker="NEXT" color={A}>
          具体怎么调 θ？<Hi color={A} marker at={L[7] + 24}>第 2 章</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, width: 1680 }}>
          <Enter at={L[7]}>
            <Card style={{ padding: "50px 60px", display: "flex", alignItems: "center", gap: 50 }}>
              <div style={{ fontSize: 90, color: A }}>↘</div>
              <div>
                <div style={{ fontFamily: FONT.sans, fontSize: 64, fontWeight: 800, color: C.ink }}>梯度下降与反向传播</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.soft, marginTop: 10 }}>沿着损失下降的方向，调每一个参数</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <PopPill at={L[7] + 20} icon="▲" color={C.red} size={26}>
                  全课第一个陡坡
                </PopPill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LossCurve: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const draw = reveal(frame, at, 50);
  const X0 = 30;
  const Y0 = 300;
  const W = 540;
  const H = 210;
  const pts = new Array(61).fill(0).map((_, k) => {
    const u = k / 60;
    return [X0 + u * W, Y0 - (0.05 + 0.9 / (1 + Math.exp((u - 0.55) * 7))) * H];
  });
  const shown = pts.slice(0, Math.max(2, Math.round(draw * 60) + 1));
  const tip = shown[shown.length - 1];
  return (
    <svg width={580} height={360} style={{ marginTop: 4 }}>
      <line x1={X0} y1={Y0} x2={X0 + W + 10} y2={Y0} stroke="#d6d8dd" strokeWidth={2} />
      <line x1={X0} y1={Y0} x2={X0} y2={40} stroke="#d6d8dd" strokeWidth={2} />
      <text x={X0 + 8} y={Y0 + 26} fontSize={18} fill={C.soft} fontFamily={FONT.sans}>θ →</text>
      <text x={X0 + 8} y={56} fontSize={18} fill={C.soft} fontFamily={FONT.sans}>损失 ↑</text>
      <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={A} strokeWidth={5} strokeLinecap="round" />
      <circle cx={tip[0]} cy={tip[1]} r={9} fill="#fff" stroke={A} strokeWidth={4} />
      <text x={X0 + W * 0.62} y={Y0 - 20} fontSize={20} fill={C.dim} fontFamily={FONT.sans}>示意图</text>
    </svg>
  );
};
