import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("decoding");
const A = C.purple;

const LOGITS = [
  { w: "猫", z: 3.2, p: 0.62, c: C.orange },
  { w: "狗", z: 1.1, p: 0.23, c: C.blue },
  { w: "鱼", z: -0.4, p: 0.08, c: C.teal },
  { w: "车", z: -2.0, p: 0.07, c: C.dim },
];

export const DecodingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const softmax = span(frame, 0, L[6] - 4, 14);
  const boltz = span(frame, L[6] - 4, L[7] - 4, 14);
  const curve = span(frame, L[7] - 4, L[9] - 4, 14);
  const decode = reveal(frame, L[9] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── logits → softmax → distribution ── */}
      <AbsoluteFill style={{ opacity: softmax }}>
        <Top at={L[0]} kicker="FROM NUMBERS TO WORDS" color={A}>
          模型吐出的不是概率，是<Hi color={A} marker at={L[0] + 30}>logit</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 320, display: "flex", gap: 36 }}>
          <Enter at={L[0]}>
            <Card style={{ width: 920, height: 560, padding: "32px 38px" }}>
              <div style={{ display: "flex", gap: 14 }}>
                {LOGITS.map((x, i) => (
                  <div
                    key={x.w}
                    style={{
                      flex: 1,
                      padding: "14px 10px",
                      borderRadius: 14,
                      background: "#f7f6f3",
                      textAlign: "center",
                      opacity: reveal(frame, L[0] + i * 5, 14),
                    }}
                  >
                    <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, color: C.soft }}>{x.w}</div>
                    <div style={{ fontFamily: FONT.mono, fontSize: 32, color: C.ink, marginTop: 4 }}>{x.z.toFixed(1)}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, margin: "18px 0" }}>
                <div style={{ width: 2, height: 20, background: C.line }} />
                <Pill icon="↓" color={A} size={22}>
                  softmax
                </Pill>
                <div style={{ width: 2, height: 20, background: C.line }} />
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-end", height: 220 }}>
                {LOGITS.map((x, i) => {
                  const g = reveal(frame, L[2] + i * 6, 26);
                  return (
                    <div key={x.w} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontFamily: FONT.mono, fontSize: 22, color: C.soft, marginBottom: 6 }}>{g > 0.01 ? (x.p * g).toFixed(2) : "—"}</div>
                      <div style={{ height: 150, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                        <div style={{ width: "100%", height: `${x.p * 100 * g}%`, minHeight: 5, borderRadius: 10, background: x.c }} />
                      </div>
                      <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 700, color: C.ink, marginTop: 8 }}>{x.w}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ height: 1.5, background: C.line, marginTop: 18 }} />
              <div style={{ fontFamily: FONT.mono, fontSize: 28, color: C.ink, marginTop: 14, textAlign: "center" }}>
                q<sub style={{ fontSize: 18 }}>i</sub> = e<sup style={{ fontSize: 18 }}>z<sub style={{ fontSize: 12 }}>i</sub>/τ</sup> /{" "}
                <span style={{ fontSize: 36 }}>∑</span><sub style={{ fontSize: 16 }}>j</sub> e<sup style={{ fontSize: 18 }}>z<sub style={{ fontSize: 12 }}>j</sub>/τ</sup>
              </div>
            </Card>
          </Enter>
          <Enter at={L[0] + 6}>
            <Card style={{ width: 720, height: 560, padding: "30px 34px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, color: C.ink }}>温度 τ</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 30, color: A }}>{frame < L[4] ? "1.0" : frame < L[5] ? "0.2" : "2.0"}</div>
              </div>
              <TempDial at={L[4]} />
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <MiniDist at={L[4]} label="τ → 0" shape="sharp" hot={frame >= L[4] - 4 && frame < L[5] - 4} />
                <MiniDist at={L[4] + 8} label="τ = 1" shape="normal" hot={frame >= L[5] - 4} />
                <MiniDist at={L[4] + 16} label="τ > 1" shape="flat" hot={frame >= L[5] + 30} />
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 21, color: C.soft, marginTop: 20, lineHeight: 1.5 }}>
                温度只改分布的锋利程度，
                <br />
                不改模型的参数。
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── Boltzmann ── */}
      <AbsoluteFill style={{ opacity: boltz }}>
        <Top at={L[6]} kicker="STATISTICAL MECHANICS" color={A}>
          同一个公式，先量气体，再量<Hi color={A} marker at={L[6] + 30}>语言</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36, alignItems: "center" }}>
          <Enter at={L[6]}>
            <Photo src="img/mixer.jpg" w={620} h={470} from={L[6]}>
              <div style={{ position: "absolute", left: 20, bottom: 20 }}>
                <PopPill at={L[6] + 30} icon="◔" color={A}>
                  温度旋钮
                </PopPill>
              </div>
            </Photo>
          </Enter>
          <Enter at={L[6] + 12}>
            <Card style={{ width: 1000, height: 470, padding: "40px 46px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink }}>q<sub style={{ fontSize: 20 }}>i</sub> = e<sup style={{ fontSize: 20 }}>z<sub style={{ fontSize: 14 }}>i</sub>/τ</sup> / Σ</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 34, color: C.dim }}>≅</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink }}>p<sub style={{ fontSize: 20 }}>i</sub> ∝ e<sup style={{ fontSize: 20 }}>−E<sub style={{ fontSize: 14 }}>i</sub>/kT</sup></div>
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "30px 0" }} />
              <div style={{ display: "flex", gap: 24 }}>
                <Mapping at={L[6] + 30} left="logit" right="负能量" sub="z ↔ −E" />
                <Mapping at={L[6] + 44} left="温度 τ" right="温度 T" sub="τ ↔ T" />
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 28 }}>softmax 与玻尔兹曼分布，完全同构</div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── softmax curve ── */}
      <AbsoluteFill style={{ opacity: curve }}>
        <Top at={L[7]} kicker="SOFTMAX CURVE" color={A}>
          温度，决定这条曲线有多<Hi color={A} marker at={L[7] + 30}>陡</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[7] - 4}>
            <Card style={{ width: 1080, height: 540, padding: "24px 30px" }}>
              <SoftmaxCurve at={L[7]} highlight={reveal(frame, L[8] - 4, 16)} />
            </Card>
          </Enter>
          <Enter at={L[7] + 10}>
            <Card accent={A} style={{ width: 560, height: 540, padding: "34px 36px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: A, letterSpacing: 2 }}>TWO CANDIDATES</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 30, color: C.ink, marginTop: 16 }}>p = σ(Δ / τ)</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 21, color: C.soft, marginTop: 4 }}>σ(z) = 1 / (1 + e<sup style={{ fontSize: 13 }}>−z</sup>)</div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0 18px" }} />
              {[
                { tau: "τ = 0.2", t: "像台阶", d: "几乎只选一个", c: C.purple },
                { tau: "τ = 1", t: "标准 S 形", d: "原始分布", c: C.orange },
                { tau: "τ = 2", t: "更平缓", d: "两个候选都有机会", c: C.teal },
              ].map((x, i) => (
                <div key={x.tau} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, opacity: reveal(frame, L[7] + 20 + i * 10, 14) }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: x.c }} />
                  <div style={{ fontFamily: FONT.mono, fontSize: 22, color: x.c, width: 104 }}>{x.tau}</div>
                  <div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 23, fontWeight: 700, color: C.ink }}>{x.t}</div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.soft }}>{x.d}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10, opacity: reveal(frame, L[8] - 2, 16) }}>
                <Pill icon="↓" color={A} size={20}>温度越小，输出越确定</Pill>
                <Pill icon="⇄" color={C.blue} size={20}>排序不变，只改锋利程度</Pill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── decoding strategies ── */}
      <AbsoluteFill style={{ opacity: decode }}>
        <Top at={L[9]} kicker="DECODING" color={A}>
          有了分布，怎么<Hi color={A} marker at={L[9] + 26}>选词</Hi>？
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 24 }}>
          <Strategy intro={L[9] - 4} at={L[10]} title="贪心" en="greedy" desc="永远选概率最大的" risk="确定 · 容易重复" icon="▼" kind="greedy" />
          <Strategy intro={L[9] - 4} at={L[11]} title="纯采样" en="sampling" desc="按概率随机抽" risk="多样 · 可能离谱" icon="⌁" kind="sample" />
          <Strategy intro={L[9] - 4} at={L[12]} title="top-k" en="top-k" desc="只在最高的 k 个里抽" risk="候选数量固定" icon="K" kind="topk" />
          <Strategy intro={L[9] - 4} at={L[12] + 20} title="top-p" en="nucleus" desc="累积概率到 p 的最小集合" risk="数量随分布伸缩" icon="P" kind="topp" />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 830, display: "flex", justifyContent: "center", opacity: reveal(frame, L[13] - 4, 16) }}>
          <Pill icon="⌁" color={A} size={26}>
            都是推理时的旋钮，不改模型本身
          </Pill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SoftmaxCurve: React.FC<{ at: number; highlight: number }> = ({ at, highlight }) => {
  const frame = useCurrentFrame();
  const X0 = 86;
  const Y0 = 360;
  const W = 880;
  const H = 290;
  const sx = (d: number) => X0 + (d / 6) * W;
  const sy = (p: number) => Y0 - p * H;
  const curve = (tau: number) =>
    new Array(121).fill(0).map((_, k) => {
      const d = (6 * k) / 120;
      return [sx(d), sy(1 / (1 + Math.exp(-d / tau)))];
    });
  const taus = [
    { t: 0.2, c: C.purple },
    { t: 1, c: C.orange },
    { t: 2, c: C.teal },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 2 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink }}>p = σ(Δ / τ)</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.dim }}>两个候选词的特例 · 只画 Δ ≥ 0 的一侧</div>
      </div>
      <svg width={1020} height={438}>
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={X0} y1={sy(v)} x2={X0 + W} y2={sy(v)} stroke="#eeece8" strokeWidth={1.5} />
            <text x={X0 - 14} y={sy(v) + 6} fontSize={16} fill={C.dim} fontFamily={FONT.mono} textAnchor="end">{v.toFixed(2)}</text>
          </g>
        ))}
        {[0, 1.5, 3, 4.5, 6].map((d) => (
          <g key={d}>
            <line x1={sx(d)} y1={Y0} x2={sx(d)} y2={Y0 + 6} stroke="#b9bcc3" strokeWidth={2} />
            <text x={sx(d)} y={Y0 + 28} fontSize={16} fill={C.dim} fontFamily={FONT.mono} textAnchor="middle">{d}</text>
          </g>
        ))}
        <line x1={X0} y1={Y0} x2={X0 + W + 14} y2={Y0} stroke="#cfd0d4" strokeWidth={2} />
        <line x1={X0} y1={Y0} x2={X0} y2={30} stroke="#cfd0d4" strokeWidth={2} />
        <line x1={X0} y1={sy(0.5)} x2={X0 + W} y2={sy(0.5)} stroke={C.soft} strokeWidth={1.5} strokeDasharray="6 6" opacity={0.7} />
        {taus.map((x, i) => {
          const pts = curve(x.t);
          const p = reveal(frame, at + i * 10, 44);
          const n = Math.max(2, Math.round(p * 120) + 1);
          return (
            <path
              key={x.t}
              d={`M${pts.slice(0, n).map((q) => q.join(" ")).join(" L")}`}
              fill="none"
              stroke={x.c}
              strokeWidth={x.t === 1 ? 6 : 5}
              strokeLinecap="round"
              opacity={x.t === 2 ? 0.85 : 1}
            />
          );
        })}
        <text x={X0 + W - 6} y={sy(0.5) + 30} fontSize={17} fill={C.soft} fontFamily={FONT.sans} textAnchor="end">Δ = 0 时，还是 0.5</text>
        <text x={X0 + W - 6} y={Y0 + 54} fontSize={18} fill={C.soft} fontFamily={FONT.sans} textAnchor="end">logit 差 Δ（较高 − 较低）→</text>
        <text x={X0 - 46} y={34} fontSize={18} fill={C.soft} fontFamily={FONT.sans}>概率 ↑</text>
        <g opacity={highlight}>
          <text x={sx(1.2)} y={sy(0.9)} fontSize={22} fontWeight={800} fill={C.purple} fontFamily={FONT.sans}>τ=0.2：像台阶</text>
          <text x={sx(2.0)} y={sy(0.60)} fontSize={22} fontWeight={800} fill={C.teal} fontFamily={FONT.sans}>τ=2：更平缓</text>
        </g>
      </svg>
    </div>
  );
};

const TempDial: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const t = frame < at + 30 ? 1 : frame < at + 120 ? 0.2 : 2;
  const angle = interpolate(t, [0.2, 2], [-62, 62]);
  return (
    <svg width={650} height={150} style={{ marginTop: 6 }}>
      <path d="M70 125 A 255 255 0 0 1 580 125" fill="none" stroke="#e6e5e1" strokeWidth={12} strokeLinecap="round" />
      <path d="M70 125 A 255 255 0 0 1 580 125" fill="none" stroke={A} strokeWidth={12} strokeLinecap="round" strokeDasharray="500" strokeDashoffset={500 - 500 * ((t - 0.2) / 1.8)} />
      <g transform={`translate(325 125) rotate(${angle})`}>
        <line x1={0} y1={0} x2={0} y2={-85} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <circle cx={0} cy={0} r={10} fill={C.ink} />
      </g>
      <text x={60} y={148} fontSize={18} fill={C.dim} fontFamily={FONT.sans}>0.2</text>
      <text x={310} y={20} fontSize={18} fill={C.dim} fontFamily={FONT.sans}>1.0</text>
      <text x={570} y={148} fontSize={18} fill={C.dim} fontFamily={FONT.sans}>2.0</text>
    </svg>
  );
};

const MiniDist: React.FC<{ at: number; label: string; shape: "sharp" | "normal" | "flat"; hot: boolean }> = ({ at, label, shape, hot }) => {
  const frame = useCurrentFrame();
  const vals = shape === "sharp" ? [0.96, 0.03, 0.008, 0.002] : shape === "normal" ? [0.62, 0.23, 0.08, 0.07] : [0.32, 0.27, 0.22, 0.19];
  return (
    <div
      style={{
        flex: 1,
        padding: "10px 12px",
        borderRadius: 12,
        background: hot ? `${A}10` : "#f7f6f3",
        border: `2px solid ${hot ? A : "transparent"}`,
        opacity: reveal(frame, at, 14),
      }}
    >
      <div style={{ fontFamily: FONT.mono, fontSize: 18, color: hot ? A : C.soft }}>{label}</div>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 54, marginTop: 6 }}>
        {vals.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${v * 100}%`, borderRadius: 3, background: i === 0 ? A : `${A}55` }} />
        ))}
      </div>
    </div>
  );
};

const Mapping: React.FC<{ at: number; left: string; right: string; sub: string }> = ({ at, left, right, sub }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ flex: 1, padding: "16px 20px", borderRadius: 14, background: "#f7f6f3", opacity: reveal(frame, at, 14) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT.sans, fontSize: 24 }}>
        <span style={{ color: C.ink, fontWeight: 700 }}>{left}</span>
        <span style={{ color: C.dim }}>↔</span>
        <span style={{ color: A, fontWeight: 700 }}>{right}</span>
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 22, color: C.soft, marginTop: 6 }}>{sub}</div>
    </div>
  );
};

const Strategy: React.FC<{ intro: number; at: number; title: string; en: string; desc: string; risk: string; icon: string; kind: string }> = ({ intro, at, title, en, desc, risk, icon, kind }) => {
  const frame = useCurrentFrame();
  const v = reveal(frame, intro, 16);
  const active = reveal(frame, at - 6, 14);
  const vals = [0.62, 0.23, 0.08, 0.07];
  const cum = [0.62, 0.85, 0.93, 1];
  return (
    <div style={{ width: 402, opacity: v * (0.35 + 0.65 * active), translate: `0px ${(1 - v) * 18}px` }}>
      <Card style={{ height: 470, padding: "26px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 34, fontWeight: 800, color: C.ink }}>{title}</div>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: `${A}14`, color: A, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.sans, fontSize: 22, fontWeight: 800 }}>{icon}</div>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 17, color: C.dim, marginTop: 2 }}>{en}</div>
        <div style={{ position: "relative", height: 170, marginTop: 20 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 140 }}>
            {vals.map((p, i) => {
              const on = kind === "greedy" ? i === 0 : kind === "topk" ? i < 3 : kind === "topp" ? cum[i] <= 0.94 : true;
              return (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ height: 120, display: "flex", alignItems: "flex-end" }}>
                    <div
                      style={{
                        width: "100%",
                        height: `${p * 100}%`,
                        borderRadius: 6,
                        background: on ? A : "#e7e6e2",
                        outline: on && kind !== "sample" ? `2px solid ${A}` : "none",
                      }}
                    />
                  </div>
                  <div style={{ fontFamily: FONT.mono, fontSize: 14, color: C.dim, marginTop: 4 }}>{p.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
          {kind === "topp" ? (
            <div style={{ position: "absolute", left: 0, top: 132, width: "93%", height: 4, borderRadius: 2, background: C.orange }} />
          ) : null}
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, lineHeight: 1.5, marginTop: 12 }}>{desc}</div>
        <div style={{ marginTop: 16 }}>
          <Pill icon={kind === "greedy" ? "!" : "✓"} color={kind === "greedy" ? C.orange : C.green} size={18}>
            {risk}
          </Pill>
        </div>
      </Card>
    </div>
  );
};
