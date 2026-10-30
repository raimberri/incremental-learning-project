import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("tricks");
const A = C.blue;

const TRICKS = [
  { year: "2014", name: "Adam", line: "每个参数自适应步长", detail: "一阶矩 m / 二阶矩 v", color: C.blue, at: 2 },
  { year: "2014", name: "Dropout", line: "随机丢神经元，学冗余", detail: "训练时按概率置零", color: C.orange, at: 4 },
  { year: "2015", name: "归一化", line: "压住每层输入的尺度", detail: "均值 0，方差 1", color: C.teal, at: 6 },
  { year: "2015", name: "残差连接", line: "只学改变量 h + F(h)", detail: "梯度走恒等捷径", color: C.purple, at: 8 },
];

const DEPTHS = [
  { n: "2 层", ok: true, w: 0.18 },
  { n: "10 层", ok: true, w: 0.34 },
  { n: "50 层", ok: false, w: 0.62 },
  { n: "100 层", ok: false, w: 0.92 },
];

export const TricksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const problem = span(frame, 0, L[2] - 4, 14);
  const list = span(frame, L[2] - 4, L[8] - 4, 12);
  const residual = reveal(frame, L[8] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── depth does not train by itself ── */}
      <AbsoluteFill style={{ opacity: problem }}>
        <Top at={L[0]} kicker="THE DEPTH PROBLEM" color={A}>
          理论上任意深度，<Hi color={C.red} marker at={L[0] + 28}>实践里一深就训不动</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[0]}>
            <Photo src="img/tools.jpg" w={600} h={460} from={L[0]}>
              <div style={{ position: "absolute", left: 22, top: 22 }}>
                <PopPill at={L[1] + 8} icon="⚒" color={A}>
                  四个工程发明
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 780, top: 330, width: 1020 }}>
          <Enter at={L[0] + 6}>
            <Card style={{ height: 460, padding: "34px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>1990s — 2010s</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
                {DEPTHS.map((d, k) => (
                  <div key={d.n} style={{ display: "flex", alignItems: "center", gap: 18, opacity: reveal(frame, L[0] + 10 + k * 8, 12) }}>
                    <div style={{ fontFamily: FONT.mono, fontSize: 23, color: C.ink, width: 84 }}>{d.n}</div>
                    <div style={{ flex: 1, height: 26, borderRadius: 7, background: "#ecebe8", overflow: "hidden" }}>
                      <div style={{ width: `${d.w * 100}%`, height: "100%", background: d.ok ? `${C.green}bb` : `${C.red}bb` }} />
                    </div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 21, fontWeight: 700, color: d.ok ? C.green : C.red, width: 76 }}>{d.ok ? "可训练" : "训不动"}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1.5px solid ${C.line}`, fontFamily: FONT.sans, fontSize: 25, color: C.soft, lineHeight: 1.6 }}>
                问题不是表达力不够，<span style={{ color: C.ink, fontWeight: 700 }}>是梯度传不回去</span>。
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── the four inventions ── */}
      <AbsoluteFill style={{ opacity: list }}>
        <Top at={L[2]} kicker="FOUR INVENTIONS" color={A}>
          四件套，把<Hi color={A} marker at={L[2] + 22}>深度</Hi>变成可训练
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 40 }}>
          {TRICKS.map((t, i) => {
            const on = reveal(frame, L[t.at] - 2, 12);
            const next = i < TRICKS.length - 1 ? L[TRICKS[i + 1].at] : 99999;
            const active = frame >= L[t.at] - 2 && frame < next;
            return (
              <Enter key={t.name} at={L[2] - 2 + i * 4} dist={16}>
                <Card
                  style={{
                    width: 390,
                    height: 440,
                    padding: "26px 28px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: active ? `0 0 0 3px ${t.color}, 0 24px 60px rgba(30,35,50,0.14)` : `0 0 0 1.5px ${t.color}22, 0 18px 40px rgba(30,35,50,0.07)`,
                    opacity: active ? 1 : 0.72,
                    scale: 1 + 0.015 * on,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontFamily: FONT.mono, fontSize: 20, color: C.dim }}>{t.year}</div>
                    <div style={{ width: 12, height: 12, borderRadius: 6, background: t.color }} />
                  </div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 34, fontWeight: 800, color: C.ink, marginTop: 12 }}>{t.name}</div>
                  <div style={{ height: 2, width: 46, background: t.color, marginTop: 12, borderRadius: 1 }} />
                  <div style={{ fontFamily: FONT.sans, fontSize: 23, color: C.soft, marginTop: 14, lineHeight: 1.55 }}>{t.line}</div>
                  <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1.5px solid ${C.line}` }}>
                    <div style={{ fontFamily: FONT.mono, fontSize: 18, color: C.dim, lineHeight: 1.5 }}>{t.detail}</div>
                  </div>
                  {i === 3 ? (
                    <div style={{ marginTop: 16 }}>
                      <Pill icon="★" color={C.purple} size={18}>最重要</Pill>
                    </div>
                  ) : null}
                </Card>
              </Enter>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* ── residual block ── */}
      <AbsoluteFill style={{ opacity: residual }}>
        <Top at={L[8]} kicker="RESIDUAL CONNECTION" color={C.purple}>
          每层只学<Hi color={C.purple} marker at={L[8] + 24}>改变量</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[8] - 2} dist={12}>
            <Card accent={C.purple} style={{ width: 1680, height: 400, padding: "30px 46px" }}>
              <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
                <div style={{ width: 300 }}>
                  <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.purple, letterSpacing: 2 }}>RESIDUAL BLOCK</div>
                  <div style={{ fontFamily: FONT.mono, fontSize: 31, color: C.ink, marginTop: 14 }}>h ← h + F(h)</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 12, lineHeight: 1.55 }}>
                    输出 = 输入
                    <br />
                    + 一个改变量
                  </div>
                </div>
                <svg width={680} height={250}>
                  <defs>
                    <marker id="res-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={C.ink} />
                    </marker>
                    <marker id="res-grad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={C.orange} />
                    </marker>
                  </defs>
                  <text x={6} y={132} fontSize={40} fill={C.ink} fontFamily={FONT.mono}>h</text>
                  <line x1={46} y1={120} x2={112} y2={120} stroke={C.ink} strokeWidth={2.5} markerEnd="url(#res-arrow)" />
                  <rect x={118} y={82} width={108} height={76} rx={14} fill={`${C.purple}12`} stroke={C.purple} strokeWidth={2} />
                  <text x={172} y={130} textAnchor="middle" fontSize={30} fontFamily={FONT.mono} fill={C.purple}>F(h)</text>
                  <line x1={228} y1={120} x2={306} y2={120} stroke={C.ink} strokeWidth={2.5} markerEnd="url(#res-arrow)" />
                  <circle cx={342} cy={120} r={26} fill="#fff" stroke={C.ink} strokeWidth={2.5} />
                  <text x={342} y={132} textAnchor="middle" fontSize={32} fontFamily={FONT.sans} fill={C.ink}>+</text>
                  <line x1={370} y1={120} x2={448} y2={120} stroke={C.ink} strokeWidth={2.5} markerEnd="url(#res-arrow)" />
                  <text x={462} y={132} fontSize={40} fill={C.ink} fontFamily={FONT.mono}>h′</text>
                  <path d="M 26 150 C 110 214, 290 214, 338 152" fill="none" stroke={C.orange} strokeWidth={3} strokeDasharray="8 6" markerEnd="url(#res-grad)" opacity={reveal(frame, L[9], 18)} />
                  <text x={88} y={238} fontSize={19} fill={C.orange} fontFamily={FONT.sans} opacity={reveal(frame, L[9] + 6, 18)}>
                    反向：梯度沿 + 直通
                  </text>
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.ink, lineHeight: 1.7 }}>
                    一百层因此能训练。
                    <br />
                    Transformer 里，它是每个子层的标配。
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                    <Pill icon="★" color={C.purple} size={19}>四个里最重要</Pill>
                    <Pill icon="+" color={C.orange} size={19}>恒等捷径</Pill>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8, paddingTop: 18, borderTop: `1.5px solid ${C.line}` }}>
                <Pill icon="·" color={C.dim} size={18}>几乎不加参数</Pill>
                <Pill icon="·" color={C.dim} size={18}>几乎不加算力</Pill>
                <Pill icon="·" color={C.dim} size={18}>深度可上百层</Pill>
                <div style={{ marginLeft: "auto", opacity: reveal(frame, L[11] - 2, 12) }}>
                  <Stamp at={L[11]} color={C.purple} rotate={-4} style={{ fontSize: 22, padding: "5px 14px" }}>
                    梯度的高速公路
                  </Stamp>
                </div>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
