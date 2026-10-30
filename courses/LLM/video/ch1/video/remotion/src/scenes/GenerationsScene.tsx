import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("generations");
const A = C.purple;

const COUNTS = [
  { w: "猫", n: 312, p: 0.65, c: C.orange },
  { w: "狗", n: 96, p: 0.2, c: A },
  { w: "鱼", n: 3, p: 0.01, c: C.teal },
  { w: "车", n: 1, p: 0, c: C.dim },
];

export const GenerationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const counting = span(frame, 0, L[4] - 4, 14);
  const flaws = span(frame, L[4] - 4, L[7] - 4, 14);
  const neural = reveal(frame, L[7] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── counting ── */}
      <AbsoluteFill style={{ opacity: counting }}>
        <Top at={L[0]} kicker="FIRST GENERATION" color={A}>
          第一代：靠<Hi color={A} marker at={L[0] + 26}>数数</Hi>，n-gram
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[1] - 4}>
            <Card style={{ width: 900, height: 560, padding: "32px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 24, color: C.dim }}>count(</span>
                {["我", "养", "了", "一只", "猫"].map((w, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 26,
                      padding: "4px 9px",
                      background: i === 4 ? `${A}1c` : "#f2f1ee",
                      color: i === 4 ? A : C.ink,
                      borderRadius: 7,
                      fontWeight: i === 4 ? 800 : 500,
                    }}
                  >
                    {w}
                  </span>
                ))}
                <span style={{ fontFamily: FONT.mono, fontSize: 24, color: C.dim }}>)</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 26 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 66, fontWeight: 600, color: C.ink, opacity: reveal(frame, L[1], 20) }}>312</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 36, color: C.dim }}>/ 480 ≈</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 58, fontWeight: 600, color: A, opacity: reveal(frame, L[2] + 12, 20) }}>0.65</div>
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "22px 0 8px" }} />
              {COUNTS.map((x, i) => (
                <div key={x.w} style={{ display: "flex", alignItems: "center", gap: 18, height: 58 }}>
                  <div style={{ width: 46, fontFamily: FONT.sans, fontSize: 26, fontWeight: 700, color: C.ink }}>{x.w}</div>
                  <div style={{ flex: 1, height: 12, borderRadius: 6, background: "#ecebe8", overflow: "hidden" }}>
                    <div style={{ width: `${(x.n / 312) * 100 * reveal(frame, L[2] + i * 5, 30)}%`, height: "100%", borderRadius: 6, background: x.c }} />
                  </div>
                  <div style={{ width: 64, textAlign: "right", fontFamily: FONT.mono, fontSize: 24, color: C.soft }}>{x.n}</div>
                </div>
              ))}
              <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim, marginTop: 6 }}>示意计数 · 只回看最近 n−1 个词</div>
            </Card>
          </Enter>
          <div>
            <Enter at={L[0] + 8}>
              <Photo src="img/catalog.jpg" w={720} h={470} from={L[0]}>
                <div style={{ position: "absolute", left: 22, top: 22 }}>
                  <PopPill at={L[2] + 10} icon="❐" color={A}>
                    查历史记录
                  </PopPill>
                </div>
              </Photo>
            </Enter>
            <div style={{ marginTop: 24, marginLeft: 240 }}>
              <Stamp at={L[3] + 10} color={C.soft} rotate={-4}>
                只看最近 n−1 个词
              </Stamp>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── two fatal flaws ── */}
      <AbsoluteFill style={{ opacity: flaws }}>
        <Top at={L[4]} kicker="TWO FATAL WEAKNESSES" color={A}>
          它有两个<Hi color={C.red} marker at={L[4] + 26}>致命伤</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[5] - 6}>
            <Card style={{ width: 840, height: 500, padding: "34px 38px" }}>
              <Pill icon="▦" color={C.red} size={22}>
                稀疏 sparsity
              </Pill>
              <div style={{ fontFamily: FONT.sans, fontSize: 40, fontWeight: 800, color: C.ink, marginTop: 18 }}>没见过的组合，概率就是零</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8, marginTop: 28 }}>
                {new Array(32).fill(0).map((_, i) => {
                  const hit = i % 7 === 0;
                  return <div key={i} style={{ height: 34, borderRadius: 7, background: hit ? `${A}22` : "#f0efec", border: `1.5px solid ${hit ? A : "transparent"}` }} />;
                })}
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 18 }}>语言组合是无穷的，空格远多于见过的格子</div>
              <div style={{ marginTop: 20 }}>
                <Stamp at={L[5] + 36} color={C.red} rotate={-4}>
                  整句概率 = 0
                </Stamp>
              </div>
            </Card>
          </Enter>
          <Enter at={L[6] - 6}>
            <Card style={{ width: 840, height: 500, padding: "34px 38px" }}>
              <Pill icon="⊘" color={C.red} size={22}>
                不共享 no similarity
              </Pill>
              <div style={{ fontFamily: FONT.sans, fontSize: 40, fontWeight: 800, color: C.ink, marginTop: 18 }}>「猫」和「狗」毫不相干</div>
              <div style={{ display: "flex", gap: 22, marginTop: 30 }}>
                {[
                  { w: "猫", n: 312, c: C.orange },
                  { w: "狗", n: 96, c: A },
                ].map((x, i) => (
                  <div key={x.w} style={{ flex: 1, padding: "18px 22px", borderRadius: 16, background: "#f7f6f3", border: `1.5px solid ${C.line}` }}>
                    <div style={{ fontFamily: FONT.sans, fontSize: 38, fontWeight: 800, color: x.c }}>{x.w}</div>
                    <div style={{ fontFamily: FONT.mono, fontSize: 28, color: C.ink, marginTop: 6 }}>count = {x.n}</div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim, marginTop: 4 }}>{i === 0 ? "一个独立的计数器" : "另一个独立的计数器"}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26, fontFamily: FONT.sans, fontSize: 24, color: C.soft }}>
                <span style={{ color: C.red }}>✕</span> 没有「相似性」这个概念
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── neural language model ── */}
      <AbsoluteFill style={{ opacity: neural }}>
        <Top at={L[7]} kicker="SECOND GENERATION · 2003" color={A}>
          换个方向：给每个词一个<Hi color={A} marker at={L[7] + 34}>向量</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[7]}>
            <Card style={{ width: 940, height: 540, padding: "30px 36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {[
                  ["词", "猫"],
                  ["向量", "[0.2, −0.7, …]"],
                  ["神经网络", "θ"],
                  ["概率", "P(狗)"],
                ].map(([k, v], i) => (
                  <React.Fragment key={k}>
                    <div
                      style={{
                        padding: "8px 16px",
                        borderRadius: 12,
                        background: i === 0 ? "#f2f1ee" : `${A}12`,
                        border: `1.5px solid ${i === 3 ? A : "transparent"}`,
                        fontFamily: FONT.sans,
                        fontSize: 22,
                        fontWeight: 700,
                        color: C.ink,
                        opacity: reveal(frame, L[7] + i * 6, 14),
                      }}
                    >
                      {k}
                      <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.soft, marginLeft: 8 }}>{v}</span>
                    </div>
                    {i < 3 ? <span style={{ color: C.dim, fontSize: 24 }}>→</span> : null}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: "flex", gap: 30, marginTop: 24 }}>
                <VectorSpace at={L[8]} />
                <div style={{ flex: 1, paddingTop: 14 }}>
                  <div style={{ fontFamily: FONT.sans, fontSize: 34, fontWeight: 800, color: C.ink }}>相似的词，向量也相似</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 10, lineHeight: 1.6 }}>
                    猫和狗靠得近，
                    <br />
                    车离得远。
                  </div>
                  <div style={{ marginTop: 26 }}>
                    <Pill icon="◇" color={C.blue} size={22}>
                      第 3 章 · 表示学习
                    </Pill>
                  </div>
                </div>
              </div>
            </Card>
          </Enter>
          <Enter at={L[7] + 16}>
            <Card style={{ width: 740, height: 540, padding: "32px 38px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>THE SHIFT</div>
              <div style={{ marginTop: 24, fontFamily: FONT.sans, fontSize: 28, color: C.ink, lineHeight: 1.7 }}>
                <div>n-gram <span style={{ color: C.dim }}>→</span> <b style={{ color: C.red }}>记忆组合</b></div>
                <div>神经模型 <span style={{ color: C.dim }}>→</span> <b style={{ color: C.green }}>学习关系</b></div>
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0" }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, lineHeight: 1.6 }}>见过「我养了一只猫」，自然也会给「我养了一只狗」不低的概率。</div>
              <div style={{ marginTop: 30, opacity: reveal(frame, L[10] + 10, 16) }}>
                <Pill icon="★" color={A} solid size={24}>
                  GPT 的骨架，就在这里
                </Pill>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim, marginTop: 14 }}>区别只是：网络结构，和规模</div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Tiny 2-D sketch: similar words land near each other.
const VectorSpace: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const pts = [
    { w: "猫", x: 110, y: 120, c: C.orange },
    { w: "狗", x: 160, y: 88, c: C.purple },
    { w: "鱼", x: 236, y: 168, c: C.teal },
    { w: "车", x: 330, y: 74, c: C.dim },
  ];
  return (
    <svg width={420} height={330} style={{ flexShrink: 0 }}>
      {[80, 160, 240, 320].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={300} stroke="#e6e5e1" strokeWidth={1.5} />
      ))}
      {[80, 160, 240].map((y) => (
        <line key={y} x1={40} y1={y} x2={390} y2={y} stroke="#e6e5e1" strokeWidth={1.5} />
      ))}
      <line x1={40} y1={300} x2={390} y2={300} stroke="#cfd0d4" strokeWidth={2} />
      <line x1={40} y1={20} x2={40} y2={300} stroke="#cfd0d4" strokeWidth={2} />
      <ellipse cx={135} cy={104} rx={92} ry={62} fill={`${C.purple}12`} stroke={C.purple} strokeDasharray="5 5" strokeWidth={1.5} opacity={reveal(frame, at + 40, 20)} />
      {pts.map((p, i) => {
        const v = reveal(frame, at + i * 7, 18);
        return (
          <g key={p.w} opacity={v}>
            <circle cx={p.x} cy={p.y} r={9} fill={p.c} />
            <text x={p.x + 14} y={p.y + 8} fontSize={22} fill={C.ink} fontFamily={FONT.sans} fontWeight={700}>
              {p.w}
            </text>
          </g>
        );
      })}
      <text x={350} y={296} fontSize={14} fill={C.dim} fontFamily={FONT.sans} textAnchor="end">
        向量空间 · 示意
      </text>
    </svg>
  );
};
