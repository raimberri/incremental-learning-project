import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("backprop");
const A = C.purple;

const NODES = [
  { x: 200, label: "x", sub: "输入" },
  { x: 600, label: "h", sub: "隐藏层" },
  { x: 1000, label: "ŷ", sub: "预测" },
  { x: 1400, label: "L", sub: "损失" },
];

export const BackpropScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const problem = span(frame, 0, L[4] - 4, 14);
  const diagram = span(frame, L[4] - 4, L[9] - 4, 12);
  const chain = reveal(frame, L[9] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── numerical differentiation ── */}
      <AbsoluteFill style={{ opacity: problem }}>
        <Top at={L[0]} kicker="THE PROBLEM" color={A}>
          几十亿个参数，<Hi color={A} marker at={L[0] + 30}>导数怎么算</Hi>？
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[1] - 2}>
            <Photo src="img/gears.jpg" w={620} h={470} from={L[0]}>
              <div style={{ position: "absolute", left: 22, bottom: 22 }}>
                <PopPill at={L[2] + 8} icon="×" color={C.red}>
                  每个参数一遍？
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 800, top: 330, width: 1000 }}>
          <Enter at={L[1] - 4}>
            <Card style={{ height: 470, padding: "34px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.red, letterSpacing: 2 }}>NUMERICAL DIFFERENTIATION</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 31, fontWeight: 800, color: C.ink, marginTop: 10 }}>把参数加一点点，重新跑一遍前向</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 24 }}>
                {["θ₁", "θ₂", "θ₃", "θ₄", "θ₅", "…"].map((t, k) => (
                  <div
                    key={t}
                    style={{
                      height: 56,
                      borderRadius: 12,
                      border: `2px dashed ${C.line}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT.mono,
                      fontSize: 24,
                      color: C.soft,
                      opacity: reveal(frame, L[2] + k * 4, 10),
                    }}
                  >
                    {t} <span style={{ marginLeft: 10, color: C.red, fontSize: 19 }}>+1 次</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 26 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 26, color: C.ink }}>N 个参数</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.dim }}>→</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 26, color: C.red, fontWeight: 600 }}>N 次前向</div>
                <div style={{ marginLeft: "auto" }}>
                  <Stamp at={L[3]} color={C.red} rotate={-5} style={{ fontSize: 26 }}>
                    算不起
                  </Stamp>
                </div>
              </div>
              <div style={{ marginTop: 16, fontFamily: FONT.sans, fontSize: 24, color: C.soft }}>
                逐个去试，只适合检查代码，不适合训练。
              </div>
              <div style={{ marginTop: 12, fontFamily: FONT.sans, fontSize: 19, color: C.dim }}>
                中心差分要两次前向；参数一多，代价随 N 线性增长。
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── one forward, one backward ── */}
      <AbsoluteFill style={{ opacity: diagram }}>
        <Top at={L[4]} kicker="TWO PASSES" color={A}>
          一次前向，一次反向，<Hi color={A} marker at={L[4] + 26}>全部梯度</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[4] - 2}>
            <Card style={{ width: 1680, height: 390, padding: "20px 26px" }}>
              <NetworkDiagram at={L[5]} formulaAt={L[8]} />
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 750, display: "flex", justifyContent: "center", gap: 16 }}>
          <PopPill at={L[6] + 4} icon="①" color={A} size={22}>
            链式法则：逐层往回乘
          </PopPill>
          <PopPill at={L[7] + 4} icon="②" color={C.blue} size={22}>
            动态规划：中间项只算一次
          </PopPill>
        </div>
      </AbsoluteFill>

      {/* ── chain rule + DP ── */}
      <AbsoluteFill style={{ opacity: chain }}>
        <Top at={L[9]} kicker="CHAIN RULE + DP" color={A}>
          每个参数拿到的，是<Hi color={A} marker at={L[9] + 30}>所有路径贡献之和</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 340 }}>
          <Enter at={L[9] - 4}>
            <Card style={{ width: 900, height: 430, padding: "34px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>CHAIN RULE</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink, marginTop: 22, lineHeight: 1.7 }}>
                ∂L/∂x =
                <span style={{ background: `${A}18`, color: A, padding: "2px 8px", borderRadius: 8, margin: "0 6px" }}>∂L/∂ŷ</span>
                ·
                <span style={{ background: `${C.blue}14`, color: C.blue, padding: "2px 8px", borderRadius: 8, margin: "0 6px" }}>∂ŷ/∂h</span>
                ·
                <span style={{ background: `${C.teal}14`, color: C.teal, padding: "2px 8px", borderRadius: 8, margin: "0 6px" }}>∂h/∂x</span>
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "26px 0" }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 27, color: C.ink, lineHeight: 1.7 }}>
                从损失出发，把「你对最终损失的贡献」<br />逐层往回乘。
              </div>
              <div style={{ marginTop: 22 }}>
                <Pill icon="←" color={A} size={22}>
                  上游梯度 × 本地导数
                </Pill>
              </div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 1050, top: 340 }}>
          <Enter at={L[10] - 2}>
            <Card accent={A} style={{ width: 750, height: 430, padding: "34px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>DYNAMIC PROGRAMMING</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, color: C.ink, marginTop: 12, lineHeight: 1.45 }}>
                中间那一项
                <br />
                算一次，<Hi color={A}>缓存，复用</Hi>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                <Pill icon="1" color={C.blue} size={19}>前向</Pill>
                <span style={{ color: C.dim }}>→</span>
                <Pill icon="2" color={C.orange} size={19}>反向</Pill>
                <span style={{ color: C.dim }}>→</span>
                <Pill icon="✓" color={C.green} size={19}>约 2 次前向的代价</Pill>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 23, color: C.soft, marginTop: 22, lineHeight: 1.6 }}>
                不重复计算已经算过的子问题——
                <br />
                这就是它比数值微分快几个数量级的原因。
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const NetworkDiagram: React.FC<{ at: number; formulaAt: number }> = ({ at, formulaAt }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 18);
  return (
    <svg width={1630} height={350}>
      <defs>
        <marker id="bp-fwd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.blue} />
        </marker>
        <marker id="bp-back" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.orange} />
        </marker>
      </defs>
      <text x={30} y={40} fontSize={21} fill={C.blue} fontFamily={FONT.sans} fontWeight={700} opacity={p}>
        前向：把中间结果存下来 →
      </text>
      <text x={30} y={322} fontSize={21} fill={C.orange} fontFamily={FONT.sans} fontWeight={700} opacity={p}>
        ← 反向：把「对损失的贡献」逐层传回去
      </text>
      {NODES.map((n, i) => (
        <g key={n.label} opacity={reveal(frame, at + i * 4, 14)}>
          <rect x={n.x} y={96} width={190} height={96} rx={18} fill="#fff" stroke={i === 0 || i === 3 ? "#d9dbe0" : `${C.purple}66`} strokeWidth={2.5} />
          <text x={n.x + 95} y={142} textAnchor="middle" fontSize={40} fontWeight={700} fill={C.ink} fontFamily={FONT.mono}>
            {n.label}
          </text>
          <text x={n.x + 95} y={174} textAnchor="middle" fontSize={20} fill={C.soft} fontFamily={FONT.sans}>
            {n.sub}
          </text>
          {i < NODES.length - 1 ? (
            <>
              <line x1={n.x + 196} y1={128} x2={NODES[i + 1].x - 8} y2={128} stroke={C.blue} strokeWidth={3.5} markerEnd="url(#bp-fwd)" opacity={reveal(frame, at + 8 + i * 4, 12)} />
              <line x1={NODES[i + 1].x - 8} y1={214} x2={n.x + 196} y2={214} stroke={C.orange} strokeWidth={3.5} markerEnd="url(#bp-back)" opacity={reveal(frame, at + 14 + i * 4, 12)} />
            </>
          ) : null}
        </g>
      ))}
      {/* gradient labels, from the loss back to the input */}
      {[
        ["∂L/∂L = 1", 1400],
        ["∂L/∂ŷ", 1000],
        ["∂L/∂h", 600],
        ["∂L/∂x", 200],
      ].map(([t, x], i) => (
        <text key={t} x={(x as number) + 95} y={266} textAnchor="middle" fontSize={21} fill={C.orange} fontFamily={FONT.mono} opacity={reveal(frame, formulaAt + i * 5, 12)}>
          {t}
        </text>
      ))}
    </svg>
  );
};
