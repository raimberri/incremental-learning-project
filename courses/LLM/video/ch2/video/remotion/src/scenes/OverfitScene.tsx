import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("overfit");
const A = C.red;

export const OverfitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const base = span(frame, 0, L[6] - 2, 14);
  const reg = reveal(frame, L[6] - 2, 16);
  const dim = 1 - 0.68 * reg;

  return (
    <AbsoluteFill>
      {/* ── memorise vs understand ── */}
      <AbsoluteFill style={{ opacity: base * dim }}>
        <Top at={L[0]} kicker="A COMMON MISREADING" color={A}>
          训练不是把知识<Hi color={A} marker at={L[1] + 24}>一条条写进去</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[1] - 4}>
            <Card style={{ width: 1000, height: 520, padding: "22px 30px" }}>
              <LossChart at={L[5]} />
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 1160, top: 330 }}>
          <Enter at={L[2] - 4}>
            <Photo src="img/flashcards.jpg" w={620} h={300} from={L[2]}>
              <div style={{ position: "absolute", left: 20, bottom: 20 }}>
                <PopPill at={L[4] + 6} icon="◧" color={A}>
                  记住 ≠ 理解
                </PopPill>
              </div>
            </Photo>
          </Enter>
          <Enter at={L[3] - 2} style={{ marginTop: 22 }}>
            <Card style={{ width: 620, padding: "22px 28px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: A, letterSpacing: 1.5 }}>OVERFITTING</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 27, color: C.ink, marginTop: 6, lineHeight: 1.5 }}>
                训练集上极好
                <br />
                新数据上崩掉
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── regularization ── */}
      <AbsoluteFill style={{ opacity: reg, justifyContent: "center", alignItems: "center", paddingBottom: 60 }}>
        <Card style={{ width: 1440, padding: "40px 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>REGULARIZATION</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 46, fontWeight: 800, color: C.ink, marginTop: 8 }}>
                正则化：限制模型的<Hi color={A} marker at={L[7] + 20}>自由</Hi>
              </div>
            </div>
            <Pill icon="◈" color={C.blue} size={21}>奥卡姆剃刀的工程版</Pill>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 28 }}>
            {[
              ["dropout", "随机丢神经元", C.purple],
              ["权重衰减", "惩罚过大的权重", C.blue],
              ["数据增强", "把样本改动一点", C.teal],
              ["早停", "验证变差就停", C.green],
            ].map(([t, s, c]) => (
              <div key={t} style={{ borderRadius: 14, background: `${c}0d`, border: `1.5px solid ${c}33`, padding: "16px 18px" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 23, fontWeight: 800, color: c as string }}>{t}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.soft, marginTop: 4 }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 24, borderTop: `1.5px solid ${C.line}`, paddingTop: 22 }}>
            <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.ink }}>
              共同哲学：逼它学<Hi color={C.green}>规律</Hi>，而不是背<Hi color={C.red}>答案</Hi>。
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Stamp at={L[10] - 2} color={C.red} rotate={-3} style={{ fontSize: 24, padding: "6px 16px" }}>
                如无必要，勿增实体
              </Stamp>
            </div>
          </div>
        </Card>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Train loss keeps falling; validation loss turns up after the sweet spot.
const LossChart: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const X0 = 80;
  const Y0 = 400;
  const W = 850;
  const H = 300;
  const train = [
    [0, 0.88],
    [0.15, 0.6],
    [0.3, 0.38],
    [0.5, 0.22],
    [0.7, 0.12],
    [1, 0.05],
  ];
  const val = [
    [0, 0.9],
    [0.16, 0.55],
    [0.32, 0.34],
    [0.48, 0.26],
    [0.62, 0.3],
    [0.78, 0.42],
    [1, 0.66],
  ];
  const px = (t: number) => X0 + t * W;
  const py = (v: number) => Y0 - v * H;
  const line = (pts: number[][]) => `M${pts.map((p) => `${px(p[0])} ${py(p[1])}`).join(" L")}`;
  const cut = reveal(frame, at, 40);
  return (
    <svg width={940} height={470}>
      <line x1={X0} y1={Y0} x2={X0 + W + 24} y2={Y0} stroke="#d6d8dd" strokeWidth={2} />
      <line x1={X0} y1={Y0} x2={X0} y2={44} stroke="#d6d8dd" strokeWidth={2} />
      <text x={X0 + W - 92} y={Y0 + 30} fontSize={19} fill={C.soft} fontFamily={FONT.sans}>训练步数 →</text>
      <text x={X0 + 8} y={68} fontSize={19} fill={C.soft} fontFamily={FONT.sans}>损失 ↓</text>
      <g opacity={reveal(frame, at + 12, 18)}>
        <rect x={px(0.48)} y={50} width={W * 0.52} height={Y0 - 50} fill={`${C.red}0c`} />
        <text x={px(0.76)} y={78} textAnchor="middle" fontSize={20} fontWeight={700} fill={C.red} fontFamily={FONT.sans}>
          过拟合区
        </text>
        <line x1={px(0.48)} y1={50} x2={px(0.48)} y2={Y0} stroke={C.red} strokeWidth={2} strokeDasharray="6 6" />
        <text x={px(0.48) - 10} y={Y0 + 28} textAnchor="end" fontSize={18} fill={C.red} fontFamily={FONT.sans}>
          最佳点
        </text>
      </g>
      <path d={line(train)} fill="none" stroke={C.blue} strokeWidth={5} strokeLinecap="round" strokeDasharray="1200" strokeDashoffset={1200 * (1 - cut)} />
      <path d={line(val)} fill="none" stroke={C.orange} strokeWidth={5} strokeLinecap="round" strokeDasharray="1200" strokeDashoffset={1200 * (1 - cut)} />
      <g opacity={reveal(frame, at + 30, 16)}>
        <circle cx={px(0.26)} cy={370} r={5} fill={C.blue} />
        <text x={px(0.26) + 14} y={376} fontSize={19} fontWeight={700} fill={C.blue} fontFamily={FONT.sans}>
          训练：一直降
        </text>
        <circle cx={px(0.62)} cy={226} r={5} fill={C.orange} />
        <text x={px(0.62) + 14} y={232} fontSize={19} fontWeight={700} fill={C.orange} fontFamily={FONT.sans}>
          验证：先降后升
        </text>
      </g>
      <text x={X0} y={462} fontSize={16} fill={C.dim} fontFamily={FONT.sans}>
        曲线示意：典型形状，不代表某次真实训练
      </text>
    </svg>
  );
};
