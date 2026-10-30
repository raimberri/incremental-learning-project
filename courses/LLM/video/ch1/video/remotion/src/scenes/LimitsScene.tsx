import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("limits");
const A = C.teal;

export const LimitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const floor = span(frame, 0, L[3] - 4, 14);
  const ceiling = span(frame, L[3] - 4, L[9] - 4, 14);
  const gap = reveal(frame, L[9] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── the floor ── */}
      <AbsoluteFill style={{ opacity: floor }}>
        <Top at={L[0]} kicker="FLOOR" color={A}>
          先看这个目标的<Hi color={A} marker at={L[0] + 26}>地板</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 340, display: "flex", gap: 34 }}>
          {[
            { icon: "▤", t: "大量数据", s: "互联网级别的文本", c: C.blue },
            { icon: "▦", s: "成千上万块 GPU", t: "大量算力", c: C.orange },
            { icon: "⌘", s: "能记住长上文", t: "合适的架构", c: C.purple },
          ].map((x, i) => (
            <Enter key={x.t} at={L[1] - 4 + i * 12}>
              <Card style={{ width: 520, height: 360, padding: "36px 40px" }}>
                <div style={{ width: 84, height: 84, borderRadius: 22, background: `${x.c}18`, color: x.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 800 }}>{x.icon}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 44, fontWeight: 800, color: C.ink, marginTop: 26 }}>{x.t}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 6 }}>{x.s}</div>
              </Card>
            </Enter>
          ))}
        </div>
        <div style={{ position: "absolute", left: 120, top: 750, display: "flex", alignItems: "center", gap: 30 }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.soft }}>2003 年的模型，这三样都缺</div>
          <Stamp at={L[1] + 34} color={C.red} rotate={-3}>
            只能做很有限的事
          </Stamp>
        </div>
      </AbsoluteFill>

      {/* ── the ceiling ── */}
      <AbsoluteFill style={{ opacity: ceiling }}>
        <Top at={L[3]} kicker="CEILING" color={A}>
          要预测答案，它必须<Hi color={A} marker at={L[3] + 30}>真的会算</Hi>吗？
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[4] - 4}>
            <Card style={{ width: 820, height: 540, padding: "34px 38px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 21, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>PROMPT</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 42, color: C.ink, marginTop: 14 }}>∫ x² dx = ____</div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: reveal(frame, L[5] + 10, 16) }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, border: `2.5px solid ${C.blue}`, color: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>A</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.ink }}>真的会算积分</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim }}>规则</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: reveal(frame, L[5] + 26, 16) }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, border: `2.5px solid ${C.orange}`, color: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>B</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.ink }}>记住这类题后面常跟哪个数字</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim }}>记忆</div>
                </div>
              </div>
              <div style={{ marginTop: 26, padding: "16px 20px", borderRadius: 14, background: `${A}10`, opacity: reveal(frame, L[6] - 2, 16) }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 23, color: C.ink, lineHeight: 1.5 }}>
                  覆盖范围内：<b style={{ color: C.orange }}>记忆就够了</b>
                  <br />
                  超出范围：<b style={{ color: A }}>必须学会规则</b>
                </div>
              </div>
            </Card>
          </Enter>
          <Enter at={L[4] + 8}>
            <Card style={{ width: 820, height: 540, padding: "22px 28px" }}>
              <CapabilityChart at={L[4] + 20} />
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 1340, top: 760 }}>
          <Stamp at={L[7] + 6} color={A} rotate={-4}>
            学会规则
          </Stamp>
        </div>
        <div style={{ position: "absolute", left: 120, top: 760, opacity: reveal(frame, L[8] - 4, 16) }}>
          <Pill icon="↗" color={C.purple} size={24}>
            规模变大时，自发发生
          </Pill>
        </div>
      </AbsoluteFill>

      {/* ── the gap ── */}
      <AbsoluteFill style={{ opacity: gap }}>
        <Top at={L[9]} kicker="THE GAP" color={A}>
          但它优化的是<Hi color={C.red} marker at={L[9] + 30}>条件概率</Hi>，不是真相
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36, alignItems: "center" }}>
          <Enter at={L[9]}>
            <Photo src="img/mountain.jpg" w={560} h={500} from={L[9]}>
              <div style={{ position: "absolute", left: 20, bottom: 20 }}>
                <PopPill at={L[9] + 30} icon="⌃" color={A}>
                  越往上，规则越不同
                </PopPill>
              </div>
            </Photo>
          </Enter>
          <Enter at={L[9] + 12}>
            <Card style={{ width: 1090, height: 500, padding: "30px 34px", position: "relative" }}>
              <Venn at={L[10]} />
              <div style={{ position: "absolute", left: 36, top: 26, fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>TWO DIFFERENT TARGETS</div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Capability vs scale: flat, then a sharp climb.
const CapabilityChart: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const draw = reveal(frame, at, 50);
  const X0 = 50;
  const Y0 = 380;
  const W = 690;
  const H = 290;
  const N = 70;
  const pts = new Array(N + 1).fill(0).map((_, k) => {
    const u = k / N;
    return [X0 + u * W, Y0 - (0.05 + 0.88 / (1 + Math.exp(-(u - 0.6) * 18))) * H];
  });
  const shown = pts.slice(0, Math.max(2, Math.round(draw * N) + 1));
  const tip = shown[shown.length - 1];
  const tx = X0 + 0.6 * W;
  return (
    <svg width={760} height={480}>
      <line x1={X0} y1={Y0} x2={X0 + W + 20} y2={Y0} stroke="#d6d8dd" strokeWidth={2} />
      <line x1={X0} y1={Y0} x2={X0} y2={30} stroke="#d6d8dd" strokeWidth={2} />
      <line x1={tx} x2={tx} y1={Y0} y2={40} stroke={C.red} strokeWidth={2} strokeDasharray="8 8" opacity={reveal(frame, at + 30, 14)} />
      <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={A} strokeWidth={6} strokeLinecap="round" />
      <circle cx={tip[0]} cy={tip[1]} r={10} fill="#fff" stroke={A} strokeWidth={4} />
      <text x={X0 + 8} y={Y0 + 28} fontSize={20} fill={C.soft} fontFamily={FONT.sans}>规模 →</text>
      <text x={X0 + 8} y={50} fontSize={20} fill={C.soft} fontFamily={FONT.sans}>能力 ↑</text>
      <text x={tx + 16} y={70} fontSize={38} fontWeight={800} fill={C.red} fontFamily={FONT.sans} opacity={reveal(frame, at + 40, 14)}>质变</text>
      <text x={X0 + W - 10} y={Y0 + 26} fontSize={15} fill={C.dim} fontFamily={FONT.sans} textAnchor="end">示意图 · 非真实数据</text>
    </svg>
  );
};

const Venn: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const v = reveal(frame, at, 20);
  return (
    <svg width={1020} height={400} style={{ marginTop: 30 }}>
      <defs>
        <clipPath id="clipA">
          <circle cx={340} cy={210} r={165} />
        </clipPath>
      </defs>
      <circle cx={340} cy={210} r={165} fill={`${C.blue}12`} stroke={C.blue} strokeWidth={3} opacity={v} />
      <circle cx={680} cy={210} r={165} fill={`${C.green}12`} stroke={C.green} strokeWidth={3} opacity={v} />
      <g clipPath="url(#clipA)" opacity={v}>
        <circle cx={680} cy={210} r={165} fill={`${C.red}12`} stroke={C.red} strokeWidth={3} />
      </g>
      <text x={295} y={175} fontSize={30} fontWeight={800} fill={C.blue} fontFamily={FONT.sans} textAnchor="middle">文本上的</text>
      <text x={295} y={212} fontSize={30} fontWeight={800} fill={C.blue} fontFamily={FONT.sans} textAnchor="middle">条件概率</text>
      <text x={725} y={175} fontSize={30} fontWeight={800} fill={C.green} fontFamily={FONT.sans} textAnchor="middle">世界的</text>
      <text x={725} y={212} fontSize={30} fontWeight={800} fill={C.green} fontFamily={FONT.sans} textAnchor="middle">真相</text>
      <text x={510} y={205} fontSize={22} fontWeight={700} fill={C.soft} fontFamily={FONT.sans} textAnchor="middle">训练覆盖</text>
      <g opacity={reveal(frame, at + 30, 14)}>
        <line x1={510} y1={330} x2={510} y2={260} stroke={C.red} strokeWidth={3} strokeDasharray="6 5" />
        <text x={510} y={365} fontSize={26} fontWeight={800} fill={C.red} fontFamily={FONT.sans} textAnchor="middle">缝隙 = 幻觉</text>
      </g>
    </svg>
  );
};
