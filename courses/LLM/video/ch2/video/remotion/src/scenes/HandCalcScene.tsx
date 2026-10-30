import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("handcalc");
const A = C.orange;

const FORWARD = [
  { label: "ŷ = w·x + b", value: "= 2·3 + 1 = 7", at: 1, color: C.ink },
  { label: "e = ŷ − y", value: "= 7 − 10 = −3", at: 2, color: C.ink },
  { label: "L = e²", value: "= 9", at: 2, color: C.orange },
];

const BACKWARD = [
  { label: "∂L/∂ŷ = 2e", value: "= −6", at: 3 },
  { label: "∂L/∂w = ∂L/∂ŷ · x", value: "= −6 · 3 = −18", at: 4 },
  { label: "∂L/∂b = ∂L/∂ŷ · 1", value: "= −6", at: 4 },
];

export const HandCalcScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const setup = span(frame, 0, L[5] - 4, 14);
  const update = reveal(frame, L[5] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── forward and backward, by hand ── */}
      <AbsoluteFill style={{ opacity: setup }}>
        <Top at={L[0]} kicker="BY HAND" color={A}>
          一个能算完的<Hi color={A} marker at={L[0] + 22}>最小例子</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[0]}>
            <Photo src="img/notebook-desk.jpg" w={520} h={390} from={L[0]} />
          </Enter>
          <Enter at={L[1]} style={{ marginTop: 22 }}>
            <Card style={{ width: 520, padding: "20px 26px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>SETUP</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 25, color: C.ink, marginTop: 8 }}>x=3, w=2, b=1, y=10</div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 690, top: 330 }}>
          <Enter at={L[1] - 4}>
            <Card style={{ width: 1110, height: 555, padding: "26px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.blue, letterSpacing: 2 }}>FORWARD</div>
                <div style={{ flex: 1, height: 1.5, background: C.line }} />
                <Pill icon="→" color={C.blue} size={18}>存下 ŷ 和 e</Pill>
              </div>
              {FORWARD.map((r, i) => (
                <Row key={r.label} at={L[r.at]} label={r.label} value={r.value} color={r.color} big={i === 2} />
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "16px 0 6px" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.orange, letterSpacing: 2 }}>BACKWARD</div>
                <div style={{ flex: 1, height: 1.5, background: C.line }} />
                <Pill icon="←" color={C.orange} size={18}>一次反向，全部梯度</Pill>
              </div>
              {BACKWARD.map((r) => (
                <Row key={r.label} at={L[r.at]} label={r.label} value={r.value} color={C.orange} mono />
              ))}
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── two learning rates ── */}
      <AbsoluteFill style={{ opacity: update }}>
        <Top at={L[5]} kicker="ONE STEP" color={A}>
          梯度给了方向，<Hi color={A} marker at={L[5] + 26}>学习率决定信多少</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[5]}>
            <Photo src="img/notebook-desk.jpg" w={520} h={380} from={L[5]} />
          </Enter>
          <Enter at={L[7]} style={{ marginTop: 20 }}>
            <Card style={{ width: 520, padding: "16px 24px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.soft }}>同一个梯度，两种步长</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 22, color: C.ink, marginTop: 6 }}>η = 0.1 vs η = 0.02</div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 690, top: 330, display: "flex", gap: 30 }}>
          <Enter at={L[5] - 2}>
            <Card style={{ width: 540, height: 244, padding: "26px 32px", boxShadow: `0 0 0 2.5px ${C.red}44, 0 24px 60px rgba(30,35,50,0.10)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 30, color: C.red, fontWeight: 600 }}>η = 0.1</div>
                <Pill icon="✗" color={C.red} size={19}>过头</Pill>
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 26, color: C.ink, marginTop: 14, lineHeight: 1.7 }}>
                w = 2 + 1.8 = 3.8
                <br />
                b = 1 + 0.6 = 1.6
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.red, marginTop: 10 }}>新预测 13，目标 10</div>
            </Card>
          </Enter>
          <Enter at={L[7] - 2}>
            <Card style={{ width: 540, height: 244, padding: "26px 32px", boxShadow: `0 0 0 2.5px ${C.green}44, 0 24px 60px rgba(30,35,50,0.10)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 30, color: C.green, fontWeight: 600 }}>η = 0.02</div>
                <Pill icon="✓" color={C.green} size={19}>更近</Pill>
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 26, color: C.ink, marginTop: 14, lineHeight: 1.7 }}>
                w = 2 + 0.36 = 2.36
                <br />
                b = 1 + 0.12 = 1.12
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.green, marginTop: 10 }}>新预测 8.2，靠近 10</div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 690, top: 600 }}>
          <Enter at={L[6]} dist={10}>
            <Card style={{ width: 1110, height: 285, padding: "24px 36px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>PREDICTION vs TARGET</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.dim }}>示意 · 一步更新之后</div>
              </div>
              <NumberLine at={L[6]} />
              <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 2 }}>
                <Legend color={C.green} label="η = 0.02（更近）" />
                <Legend color={C.red} label="η = 0.1（过头）" />
                <Legend color={C.ink} label="目标 10" dashed />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, opacity: reveal(frame, L[9] - 2, 14) }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {new Array(6).fill(0).map((_, k) => (
                    <div key={k} style={{ width: 16, height: 16, borderRadius: 4, background: `${A}${k === 5 ? "ff" : "55"}` }} />
                  ))}
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 21, color: C.soft }}>
                  这里只有一次乘法；把它叠一千层，就是深度学习。
                </div>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Row: React.FC<{ at: number; label: string; value: string; color: string; big?: boolean; mono?: boolean }> = ({ at, label, value, color, big, mono }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at + 6, 14);
  return (
    <div style={{ display: "flex", alignItems: "baseline", marginTop: 14, opacity: p, translate: `${(1 - p) * 10}px 0px` }}>
      <div style={{ fontFamily: mono || big ? FONT.mono : FONT.sans, fontSize: big ? 30 : 27, color: C.soft, width: 430 }}>{label}</div>
      <div style={{ fontFamily: FONT.mono, fontSize: big ? 34 : 27, fontWeight: big ? 600 : 400, color }}>{value}</div>
    </div>
  );
};

const Legend: React.FC<{ color: string; label: string; dashed?: boolean }> = ({ color, label, dashed }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: 12, height: 12, borderRadius: 6, background: dashed ? "transparent" : color, border: dashed ? `2.5px dashed ${color}` : "none", boxSizing: "border-box" }} />
    <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.soft }}>{label}</div>
  </div>
);

// Number line from 7 to 14: start, target, and the two predictions.
const NumberLine: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const X0 = 40;
  const W = 970;
  const Y = 100;
  const x = (v: number) => X0 + ((v - 7) / 7) * W;
  const marks = [7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <svg width={1040} height={140}>
      <line x1={X0} y1={Y} x2={X0 + W} y2={Y} stroke="#d6d8dd" strokeWidth={2.5} />
      {marks.map((m) => (
        <g key={m}>
          <line x1={x(m)} y1={Y - 6} x2={x(m)} y2={Y + 6} stroke="#b9bcc3" strokeWidth={2} />
          <text x={x(m)} y={Y + 30} textAnchor="middle" fontSize={18} fill={C.dim} fontFamily={FONT.mono}>
            {m}
          </text>
        </g>
      ))}
      <g opacity={reveal(frame, at + 20, 14)}>
        <line x1={x(10)} y1={Y - 52} x2={x(10)} y2={Y + 10} stroke={C.ink} strokeWidth={2.5} strokeDasharray="6 5" />
        <text x={x(10)} y={Y - 62} textAnchor="middle" fontSize={20} fontWeight={700} fill={C.ink} fontFamily={FONT.sans}>
          目标 10
        </text>
      </g>
      <g opacity={reveal(frame, at + 30, 14)}>
        <circle cx={x(8.2)} cy={Y - 14} r={9} fill={C.green} stroke="#fff" strokeWidth={2.5} />
        <text x={x(8.2) + 16} y={Y - 12} fontSize={21} fontWeight={700} fill={C.green} fontFamily={FONT.mono}>
          8.2
        </text>
      </g>
      <g opacity={reveal(frame, at + 38, 14)}>
        <circle cx={x(13)} cy={Y - 14} r={9} fill={C.red} stroke="#fff" strokeWidth={2.5} />
        <text x={x(13) + 16} y={Y - 12} fontSize={21} fontWeight={700} fill={C.red} fontFamily={FONT.mono}>
          13
        </text>
      </g>
    </svg>
  );
};
