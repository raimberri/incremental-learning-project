import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("crossentropy");
const A = C.orange;

const Q = [
  { w: "猫", p: 0.6, c: C.orange },
  { w: "狗", p: 0.3, c: C.blue },
  { w: "鱼", p: 0.08, c: C.teal },
  { w: "车", p: 0.02, c: C.dim },
];

export const CrossEntropyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const setup = span(frame, 0, L[8] - 4, 14);
  const example = span(frame, L[8] - 4, L[12] - 4, 14);
  const ppl = span(frame, L[12] - 4, L[15] - 4, 14);
  const curves = reveal(frame, L[15] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── p vs q ── */}
      <AbsoluteFill style={{ opacity: setup }}>
        <Top at={L[0]} kicker="CROSS-ENTROPY" color={A}>
          用错的分布，去猜<Hi color={A} marker at={L[1] + 24}>对的分布</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 320, display: "flex", gap: 40, alignItems: "center" }}>
          <Enter at={L[1] - 4}>
            <Card style={{ width: 700, height: 350, padding: "28px 34px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, color: C.ink }}>真实分布 p</div>
                <Pill icon="◉" color={C.green} size={20}>
                  世界
                </Pill>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 6 }}>这次正确的答案是「猫」</div>
              <div style={{ display: "flex", gap: 18, marginTop: 30, alignItems: "flex-end", height: 170 }}>
                {[
                  { w: "猫", p: 1, c: C.green },
                  { w: "狗", p: 0, c: C.dim },
                  { w: "鱼", p: 0, c: C.dim },
                  { w: "车", p: 0, c: C.dim },
                ].map((x) => (
                  <div key={x.w} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 110, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                      <div style={{ width: "100%", height: `${x.p * 100}%`, minHeight: x.p ? 10 : 4, borderRadius: 8, background: x.c }} />
                    </div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 24, marginTop: 8, color: C.ink, fontWeight: x.p ? 800 : 500 }}>{x.w}</div>
                    <div style={{ fontFamily: FONT.mono, fontSize: 20, color: C.soft }}>{x.p.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Enter>
          <div style={{ textAlign: "center", width: 90 }}>
            <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.dim }}>用</div>
            <div style={{ fontFamily: FONT.sans, fontSize: 50, color: A, margin: "4px 0" }}>→</div>
            <div style={{ fontFamily: FONT.sans, fontSize: 18, color: C.dim, lineHeight: 1.4 }}>
              编码
              <br />
              事件
            </div>
          </div>
          <Enter at={L[1] + 10}>
            <Card style={{ width: 700, height: 350, padding: "28px 34px", border: `2.5px solid ${A}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, color: C.ink }}>模型分布 q</div>
                <Pill icon="◆" color={A} size={20}>
                  模型
                </Pill>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 6 }}>它以为「猫」的概率是 0.60</div>
              <div style={{ display: "flex", gap: 18, marginTop: 30, alignItems: "flex-end", height: 170 }}>
                {Q.map((x, i) => {
                  const g = reveal(frame, L[1] + 20 + i * 5, 26);
                  return (
                    <div key={x.w} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ height: 110, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                        <div style={{ width: "100%", height: `${x.p * 100 * g}%`, minHeight: 4, borderRadius: 8, background: x.c }} />
                      </div>
                      <div style={{ fontFamily: FONT.sans, fontSize: 24, marginTop: 8, color: C.ink }}>{x.w}</div>
                      <div style={{ fontFamily: FONT.mono, fontSize: 20, color: C.soft }}>{x.p.toFixed(2)}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 120, top: 700, width: 1680 }}>
          <Enter at={L[2] - 4}>
            <Card style={{ padding: "20px 40px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 800, color: C.dim, letterSpacing: 2, whiteSpace: "nowrap" }}>CROSS-ENTROPY</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 31, color: C.ink, whiteSpace: "nowrap" }}>
                  H(p, q) = −<span style={{ fontSize: 38 }}>∑</span> p<sub style={{ fontSize: 18 }}>i</sub> log q<sub style={{ fontSize: 18 }}>i</sub>
                  <span style={{ color: C.dim, margin: "0 16px" }}>=</span>
                  H(p) + D<sub style={{ fontSize: 18 }}>KL</sub>(p ‖ q)
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <PopPill at={L[3] + 10} icon="≥" color={C.blue} size={20}>
                  KL 永远非负
                </PopPill>
                <PopPill at={L[6] + 10} icon="⇓" color={C.green} size={20}>
                  最小化它 = 逼近真实分布
                </PopPill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── worked example ── */}
      <AbsoluteFill style={{ opacity: example }}>
        <Top at={L[8]} kicker="ONE EXAMPLE" color={A}>
          猜对很便宜，<Hi color={C.red} marker at={L[8] + 30}>自信地猜错</Hi>很贵
        </Top>
        <div style={{ position: "absolute", left: 120, top: 340, width: 1680 }}>
          <Enter at={L[8]}>
            <Card style={{ padding: "10px 0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr", fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.dim, letterSpacing: 2, padding: "18px 40px", borderBottom: `1.5px solid ${C.line}` }}>
                <div>真实答案</div>
                <div>模型给它的概率</div>
                <div>交叉熵</div>
                <div>困惑度</div>
              </div>
              <ExRow at={L[8]} word="猫" p="0.60" h="0.511 nat" ppl="1.67" c={C.green} good />
              <ExRow at={L[9]} word="车" p="0.02" h="3.912 nat" ppl="50.0" c={C.red} />
            </Card>
          </Enter>
          <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 30 }}>
            <Enter at={L[10] - 4}>
              <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.ink }}>
                猜错的代价 = <Hi color={C.red} marker at={L[10] + 20}>7.7 倍</Hi>
              </div>
            </Enter>
            <div style={{ marginLeft: 40 }}>
              <Stamp at={L[11] + 4} color={C.red} rotate={-5}>
                惩罚「自信地猜错」
              </Stamp>
            </div>
            <div style={{ marginLeft: "auto", opacity: reveal(frame, L[11] + 20, 14) }}>
              <Pill icon="▤" color={A} size={24}>
                于是它成了几乎所有 LLM 的损失函数
              </Pill>
            </div>
          </div>
          <div style={{ marginTop: 26, opacity: reveal(frame, L[10], 16) }}>
            <Card style={{ padding: "18px 34px", display: "flex", alignItems: "center", gap: 22 }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, color: C.green, width: 132 }}>猜对 0.511</div>
              <div style={{ width: 110, height: 14, borderRadius: 7, background: C.green }} />
              <div style={{ width: 60 }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, color: C.red, width: 132 }}>猜错 3.912</div>
              <div style={{ width: 820 * reveal(frame, L[10] + 10, 40), height: 14, borderRadius: 7, background: C.red }} />
              <div style={{ marginLeft: "auto", fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.red }}>× 7.7</div>
            </Card>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── perplexity ── */}
      <AbsoluteFill style={{ opacity: ppl }}>
        <Top at={L[12]} kicker="PERPLEXITY" color={A}>
          把奈特翻译成人话：<Hi color={A} marker at={L[12] + 26}>困惑度</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 28 }}>
          <Enter at={L[12]}>
            <Card accent={A} style={{ width: 620, height: 460, padding: "40px 44px" }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 74, color: C.ink }}>PPL = e<sup style={{ fontSize: 42 }}>H</sup></div>
              <div style={{ height: 1.5, background: C.line, margin: "28px 0" }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.ink, lineHeight: 1.6 }}>
                模型平均在
                <br />
                <b style={{ color: A }}>几个词</b>之间犹豫
              </div>
            </Card>
          </Enter>
          <Enter at={L[13] - 4}>
            <Card style={{ width: 580, height: 460, padding: "34px 38px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, color: C.ink }}>e<sup>0.511</sup> ≈ 1.67</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 6 }}>不到两个候选词</div>
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                <div style={{ padding: "16px 22px", borderRadius: 14, background: `${A}18`, color: A, fontFamily: FONT.sans, fontSize: 30, fontWeight: 800 }}>猫</div>
                <div style={{ padding: "16px 22px", borderRadius: 14, background: "#f2f1ee", color: C.ink, fontFamily: FONT.sans, fontSize: 30, fontWeight: 800 }}>狗</div>
                <div style={{ alignSelf: "center", fontFamily: FONT.sans, fontSize: 22, color: C.dim }}>…</div>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 26, lineHeight: 1.6 }}>
                困惑度越低，
                <br />
                模型越不纠结。
              </div>
            </Card>
          </Enter>
          <Enter at={L[14] - 4}>
            <Card style={{ width: 480, height: 460, padding: "34px 38px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, color: C.red }}>基准：完全乱猜</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(18, 1fr)", gap: 4, marginTop: 22 }}>
                {new Array(90).fill(0).map((_, i) => (
                  <div key={i} style={{ aspectRatio: "1", borderRadius: 2, background: `${C.red}${i % 3 === 0 ? "66" : "22"}` }} />
                ))}
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink, marginTop: 26 }}>V = 50000</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 6 }}>均匀乱猜时，PPL 正好等于词表大小</div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── the two curves ── */}
      <AbsoluteFill style={{ opacity: curves }}>
        <Top at={L[15]} kicker="THE CURVE" color={A}>
          把「意外」画成<Hi color={A} marker at={L[15] + 28}>曲线</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[15] - 4}>
            <Card style={{ width: 900, height: 550, padding: "24px 32px" }}>
              <PenaltyCurve at={L[15]} />
            </Card>
          </Enter>
          <Enter at={L[15] - 2}>
            <Card accent={A} style={{ width: 760, height: 550, padding: "28px 32px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: A, letterSpacing: 2 }}>ENTROPY + KL · 示意</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 27, color: C.ink, marginTop: 6, whiteSpace: "nowrap" }}>
                H(p, q) = H(p) + D<sub style={{ fontSize: 16 }}>KL</sub>(p ‖ q)
              </div>
              <KLGap at={L[15]} label={reveal(frame, L[16] + 20, 16)} footer={reveal(frame, L[17] - 2, 16)} />
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// −log q: the price of assigning probability q to the truth.
const PenaltyCurve: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const X0 = 74;
  const Y0 = 360;
  const W = 700;
  const H = 300;
  const qx = (q: number) => X0 + q * W;
  const qy = (q: number) => Y0 - (Math.min(-Math.log(q), 5) / 5) * H;
  const n = 120;
  const pts = new Array(n + 1).fill(0).map((_, k) => {
    const q = 0.006 + (k / n) * 0.994;
    return [qx(q), qy(q)];
  });
  const shown = pts.slice(0, Math.max(2, Math.round(reveal(frame, at, 46) * n) + 1));
  const area = `M${qx(0.006)} ${Y0} L${shown.map((p) => p.join(" ")).join(" L")} L${qx(0.006)} ${Y0} Z`;
  const points = [
    { q: 0.6, label: "q=0.60 → 0.51", c: C.green, anchor: "end" as const, dx: -14, dy: 26 },
    { q: 0.02, label: "q=0.02 → 3.91", c: C.red, anchor: "start" as const, dx: 20, dy: -14 },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 38, color: C.ink }}>CE(q) = −log q</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim }}>单位：奈特</div>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <Pill icon="↘" color={A} size={17}>q 越小，越陡</Pill>
          <Pill icon="!" color={C.red} size={17}>q=0 无穷大</Pill>
        </div>
      </div>
      <svg width={840} height={420} style={{ marginTop: 4 }}>
        <defs>
          <linearGradient id="ceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={A} stopOpacity={0.24} />
            <stop offset="100%" stopColor={A} stopOpacity={0.03} />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line x1={X0} y1={qy(v === 0 ? 1 : Math.exp(-v))} x2={X0 + W} y2={qy(v === 0 ? 1 : Math.exp(-v))} stroke="#eeece8" strokeWidth={1.5} />
            <text x={X0 - 14} y={qy(v === 0 ? 1 : Math.exp(-v)) + 6} fontSize={16} fill={C.dim} fontFamily={FONT.mono} textAnchor="end">{v}</text>
          </g>
        ))}
        <line x1={X0} y1={Y0} x2={X0 + W + 16} y2={Y0} stroke="#cfd0d4" strokeWidth={2} />
        <line x1={X0} y1={Y0} x2={X0} y2={30} stroke="#cfd0d4" strokeWidth={2} />
        <path d={area} fill="url(#ceFill)" />
        <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={A} strokeWidth={6} strokeLinecap="round" />
        {points.map((p) => (
          <g key={p.q} opacity={reveal(frame, at + 34, 14)}>
            <line x1={qx(p.q)} y1={qy(p.q)} x2={qx(p.q)} y2={Y0} stroke={p.c} strokeWidth={2} strokeDasharray="5 5" opacity={0.55} />
            <circle cx={qx(p.q)} cy={qy(p.q)} r={9} fill="#fff" stroke={p.c} strokeWidth={4} />
            <text x={qx(p.q) + p.dx} y={qy(p.q) + p.dy} fontSize={21} fontWeight={700} fill={p.c} fontFamily={FONT.sans} textAnchor={p.anchor}>
              {p.label}
            </text>
          </g>
        ))}
        <text x={X0 + W - 6} y={Y0 + 28} fontSize={19} fill={C.soft} fontFamily={FONT.sans} textAnchor="end">q（给正确答案的概率）→</text>
        <text x={X0 - 54} y={44} fontSize={19} fill={C.soft} fontFamily={FONT.sans}>−log q ↑</text>
      </svg>
    </div>
  );
};

// Conceptual decomposition: the orange band is the KL part above entropy.
const KLGap: React.FC<{ at: number; label: number; footer: number }> = ({ at, label, footer }) => {
  const frame = useCurrentFrame();
  const X0 = 54;
  const Y0 = 330;
  const W = 620;
  const H = 250;
  const Hp = 0.62;
  const top = (u: number) => Hp + 1.55 * Math.exp(-u * 3.2);
  const y = (v: number) => Y0 - (v / 2.4) * H;
  const n = 80;
  const pts = new Array(n + 1).fill(0).map((_, k) => {
    const u = k / n;
    return [X0 + u * W, y(top(u))];
  });
  const shown = pts.slice(0, Math.max(2, Math.round(reveal(frame, at, 50) * n) + 1));
  const gap = `M${X0} ${y(Hp)} L${shown.map((p) => p.join(" ")).join(" L")} L${X0 + (shown.length - 1) / n * W} ${y(Hp)} Z`;
  return (
    <div>
      <svg width={700} height={400} style={{ marginTop: 8 }}>
        <defs>
          <linearGradient id="klFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={A} stopOpacity={0.42} />
            <stop offset="100%" stopColor={A} stopOpacity={0.08} />
          </linearGradient>
        </defs>
        <line x1={X0} y1={Y0} x2={X0 + W + 10} y2={Y0} stroke="#cfd0d4" strokeWidth={2} />
        <line x1={X0} y1={Y0} x2={X0} y2={26} stroke="#cfd0d4" strokeWidth={2} />
        <path d={gap} fill="url(#klFill)" />
        <line x1={X0} y1={y(Hp)} x2={X0 + W} y2={y(Hp)} stroke={C.soft} strokeWidth={2.5} strokeDasharray="8 7" />
        <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <text x={X0 + 10} y={y(Hp) - 12} fontSize={20} fill={C.soft} fontFamily={FONT.sans}>H(p) · 数据本身的不确定性</text>
        <text x={X0 + W - 8} y={y(Hp + 1.55) - 14} fontSize={20} fill={C.ink} fontFamily={FONT.sans} textAnchor="end">H(p, q) · 交叉熵</text>
        <text x={X0 + W * 0.33} y={y(Hp + 0.72)} fontSize={23} fontWeight={800} fill={A} fontFamily={FONT.sans} opacity={label}>
          KL · 多出来的意外
        </text>
        <text x={X0 + W - 4} y={Y0 + 28} fontSize={18} fill={C.soft} fontFamily={FONT.sans} textAnchor="end">模型质量 →</text>
        <text x={X0 - 46} y={34} fontSize={18} fill={C.soft} fontFamily={FONT.sans}>奈特 ↑</text>
      </svg>
      <div style={{ display: "flex", gap: 10, marginTop: -18, opacity: footer }}>
        <Pill icon="≥" color={C.blue} size={18}>KL 永远 ≥ 0</Pill>
        <Pill icon="⇓" color={A} size={18}>训练压掉这一段</Pill>
      </div>
    </div>
  );
};

const ExRow: React.FC<{ at: number; word: string; p: string; h: string; ppl: string; c: string; good?: boolean }> = ({ at, word, p, h, ppl, c, good }) => {
  const frame = useCurrentFrame();
  const v = reveal(frame, at, 18);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr 1fr 1fr",
        alignItems: "center",
        padding: "26px 40px",
        borderBottom: `1.5px solid ${C.line}`,
        opacity: v,
        translate: `0px ${(1 - v) * 12}px`,
        background: good ? `${C.green}07` : "transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 58, height: 58, borderRadius: 14, background: `${c}18`, color: c, fontFamily: FONT.sans, fontSize: 34, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{word}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft }}>{good ? "正确答案" : "错误答案"}</div>
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink }}>{p}</div>
      <div style={{ fontFamily: FONT.mono, fontSize: 34, color: c, fontWeight: 600 }}>{h}</div>
      <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink }}>{ppl}</div>
    </div>
  );
};
