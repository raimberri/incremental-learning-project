import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("pattern");
const A = C.teal;

const SWAPS = [
  { from: "回退规则", fromSub: "统计模型 · 人写", to: "神经网络", toSub: "从数据里学出来" },
  { from: "逐词传递", fromSub: "循环网络 · 架构强加", to: "注意力", toSub: "直接看全局" },
  { from: "有用 · 无害 · 诚实", fromSub: "规则 · 人写", to: "RLHF", toSub: "从比较中学习" },
];

export const PatternScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const rows = span(frame, L[0] - 4, L[5] - 4, 14);
  const chart = span(frame, L[5] - 4, L[6] - 4, 14);
  const exapt = reveal(frame, L[6] - 4, 14);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: rows }}>
        <Top at={L[0]} kicker="THE PATTERN" color={A}>
          一个<Hi color={A} marker at={L[0] + 30}>反复出现</Hi>的模式
        </Top>

        <div style={{ position: "absolute", left: 140, top: 300 }}>
          <Enter at={L[1] - 4}>
            <Photo src="img/pattern-hand.jpg" w={250} h={168} from={L[1]} radius={18}>
              <div style={{ position: "absolute", left: 12, top: 12 }}>
                <PopPill at={L[1] + 10} icon="✋" color={C.red} size={18}>
                  手工设计
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 1530, top: 300 }}>
          <Enter at={L[1] - 4}>
            <Photo src="img/pattern-learned.jpg" w={250} h={168} from={L[1]} radius={18}>
              <div style={{ position: "absolute", right: 10, top: 12 }}>
                <PopPill at={L[1] + 14} icon="◆" color={A} size={18}>
                  从数据学习
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>

        <div style={{ position: "absolute", left: 430, top: 344, width: 1060, textAlign: "center", opacity: reveal(frame, L[1] + 4, 16) }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 38, fontWeight: 700, color: C.ink }}>
            把「人写死的规则」，换成「从数据里学出来的部件」
          </div>
        </div>

        {SWAPS.map((s, i) => {
          const at = L[2 + i];
          const burn = reveal(frame, at + 28, 20);
          return (
            <div key={s.to} style={{ position: "absolute", left: 140, top: 490 + i * 108, width: 1640, opacity: reveal(frame, L[2] + i * 8 - 6, 16) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
                <Card style={{ width: 700, height: 92, padding: "14px 26px", opacity: 1 - burn * 0.45, position: "relative" }}>
                  <div style={{ fontFamily: FONT.serif, fontSize: 32, fontWeight: 700, color: C.ink }}>{s.from}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.soft }}>{s.fromSub}</div>
                  <div style={{ position: "absolute", left: 22, top: 36, height: 3, width: `${burn * 46}%`, background: C.red, borderRadius: 2 }} />
                </Card>
                <div style={{ width: 118, height: 4, borderRadius: 2, background: "#e2dfd7", position: "relative" }}>
                  <div style={{ width: `${reveal(frame, at + 18, 20) * 100}%`, height: "100%", borderRadius: 2, background: A }} />
                </div>
                <div style={{ opacity: reveal(frame, L[2] + i * 8 + 12, 14) }}>
                  <Card accent={A} style={{ width: 700, height: 92, padding: "14px 26px" }}>
                    <div style={{ fontFamily: FONT.serif, fontSize: 32, fontWeight: 700, color: C.ink }}>{s.to}</div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 19, color: A, fontWeight: 700 }}>{s.toSub}</div>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: chart }}>
        <Top at={L[5]} kicker="SCALE" color={A}>
          再靠规模，推向<Hi color={A} marker at={L[5] + 34}>质变</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 310 }}>
          <Enter at={L[5]}>
            <Card style={{ width: 1640, height: 520, padding: 34 }}>
              <PhaseChart at={L[5]} />
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: exapt }}>
        <Top at={L[6]} kicker="BIOLOGY" color={A}>
          生物学里的同款：<Hi color={A} marker at={L[6] + 30}>预适应</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 320 }}>
          <Enter at={L[6]}>
            <Photo src="img/feather.jpg" w={740} h={520} from={L[6]}>
              <div style={{ position: "absolute", left: 26, bottom: 26, display: "flex", gap: 10 }}>
                <PopPill at={L[6] + 50} icon="◌" color={C.soft} size={20}>
                  最初：保暖
                </PopPill>
                <PopPill at={L[6] + 100} icon="➶" color={A} size={20}>
                  后来：飞行
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 940, top: 350, width: 860 }}>
          <Enter at={L[6] + 30}>
            <Card style={{ padding: "36px 42px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.dim, letterSpacing: 3 }}>EXAPTATION</div>
              <div style={{ fontFamily: FONT.serif, fontSize: 40, fontWeight: 700, color: C.ink, marginTop: 10, lineHeight: 1.35 }}>
                为 A 演化出的结构，被拿去做 B
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0" }} />
              <Row at={L[6] + 70} what="羽毛" a="保暖" b="飞行" />
              <Row at={L[6] + 115} what="猜下一个词" a="补全文本" b="推理、翻译" />
              <div style={{ marginTop: 22, opacity: reveal(frame, L[6] + 150, 14) }}>
                <Pill icon="⚠" color={C.red} size={17}>
                  边界：进化没有目标函数，训练有明确损失
                </Pill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Row: React.FC<{ at: number; what: string; a: string; b: string }> = ({ at, what, a, b }) => (
  <Enter at={at} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, fontFamily: FONT.sans, fontSize: 27 }}>
    <span style={{ fontWeight: 800, color: C.ink, width: 150 }}>{what}</span>
    <span style={{ color: C.soft }}>{a}</span>
    <span style={{ color: C.dim }}>→</span>
    <span style={{ color: A, fontWeight: 700 }}>{b}</span>
  </Enter>
);

// Capability vs scale: flat, then a sudden climb (schematic).
const PhaseChart: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const draw = reveal(frame, at + 10, 60);
  const W0 = 1560;
  const H0 = 400;
  const X0 = 50;
  const Y0 = 420;
  const N = 80;
  const pts = new Array(N + 1).fill(0).map((_, k) => {
    const u = k / N;
    return [X0 + u * (W0 - 90), Y0 - (0.06 + 0.86 / (1 + Math.exp(-(u - 0.62) * 20))) * H0];
  });
  const shown = pts.slice(0, Math.max(2, Math.round(draw * N) + 1));
  const tip = shown[shown.length - 1];
  const tx = X0 + 0.62 * (W0 - 90);
  return (
    <svg width={W0} height={450}>
      <line x1={X0} y1={Y0} x2={W0 - 20} y2={Y0} stroke="#d6d3cb" strokeWidth={2} />
      <line x1={X0} y1={Y0} x2={X0} y2={10} stroke="#d6d3cb" strokeWidth={2} />
      <line x1={tx} x2={tx} y1={Y0} y2={20} stroke={C.red} strokeWidth={2} strokeDasharray="8 8" opacity={reveal(frame, at + 45, 14)} />
      <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={A} strokeWidth={5} strokeLinecap="round" />
      <circle cx={tip[0]} cy={tip[1]} r={11} fill="#fffdf8" stroke={A} strokeWidth={4} />
      <text x={X0 + 10} y={Y0 + 28} fontSize={21} fill={C.soft} fontFamily={FONT.sans}>规模 →</text>
      <text x={X0 + 14} y={34} fontSize={21} fill={C.soft} fontFamily={FONT.sans}>能力 ↑</text>
      <text x={tx + 18} y={66} fontSize={40} fontWeight={800} fill={C.red} fontFamily={FONT.sans} opacity={reveal(frame, at + 50, 14)}>质变</text>
      <text x={W0 - 30} y={34} fontSize={15} fill={C.dim} fontFamily={FONT.sans} textAnchor="end">示意图 · 非真实数据</text>
    </svg>
  );
};
