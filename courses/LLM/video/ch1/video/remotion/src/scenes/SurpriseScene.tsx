import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("surprise");
const A = C.green;

export const SurpriseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const rain = span(frame, 0, L[4] - 4, 14);
  const curve = span(frame, L[4] - 4, L[8] - 4, 14);
  const entropy = reveal(frame, L[8] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── rain ── */}
      <AbsoluteFill style={{ opacity: rain }}>
        <Top at={L[0]} kicker="SURPRISE" color={A}>
          怎么判断它<Hi color={A} marker at={L[0] + 30}>猜得好不好</Hi>？
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[1] - 4}>
            <Photo src="img/rain.jpg" w={760} h={520} from={L[1]}>
              <div style={{ position: "absolute", left: 22, top: 22 }}>
                <PopPill at={L[2] + 10} icon="☂" color={C.blue}>
                  明天下雨？
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 960, top: 330, width: 820, display: "flex", flexDirection: "column", gap: 26 }}>
          <Enter at={L[2] - 4}>
            <Card style={{ padding: "28px 36px", display: "flex", alignItems: "center", gap: 30 }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 54, fontWeight: 600, color: C.green, width: 150 }}>0.99</div>
              <div style={{ flex: 1 }}>
                <ChipBar p={0.99} c={C.green} at={L[2]} />
                <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.soft, marginTop: 10 }}>真下雨了，你不意外</div>
              </div>
              <Stamp at={L[2] + 20} color={C.green} rotate={4}>
                不意外
              </Stamp>
            </Card>
          </Enter>
          <Enter at={L[3] - 4}>
            <Card style={{ padding: "28px 36px", display: "flex", alignItems: "center", gap: 30 }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 54, fontWeight: 600, color: C.red, width: 150 }}>0.01</div>
              <div style={{ flex: 1 }}>
                <ChipBar p={0.01} c={C.red} at={L[3]} />
                <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.soft, marginTop: 10 }}>真下雨了，你很意外</div>
              </div>
              <Stamp at={L[3] + 20} color={C.red} rotate={-4}>
                很意外
              </Stamp>
            </Card>
          </Enter>
          <Enter at={L[4]}>
            <div style={{ display: "flex", gap: 12 }}>
              <Pill icon="↓" color={A} size={24}>
                概率越大，意外越小
              </Pill>
              <Pill icon="+" color={C.blue} size={24}>
                独立事件，意外可加
              </Pill>
            </div>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── the only function ── */}
      <AbsoluteFill style={{ opacity: curve }}>
        <Top at={L[4]} kicker="THE ONLY FUNCTION" color={A}>
          满足这两条的，只有一个：<Hi color={A} marker at={L[4] + 34}>负 log p</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[5] - 4}>
            <Card style={{ width: 960, height: 530, padding: "26px 34px" }}>
              <LogCurve at={L[6]} />
            </Card>
          </Enter>
          <Enter at={L[6] - 4}>
            <Card accent={A} style={{ width: 740, height: 530, padding: "40px 44px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>INFORMATION CONTENT</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 76, color: C.ink, marginTop: 26 }}>I(p) = −log p</div>
              <div style={{ height: 1.5, background: C.line, margin: "30px 0" }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.ink, lineHeight: 1.7 }}>
                <div>p = 1 <span style={{ color: C.dim }}>→</span> I = 0 <span style={{ color: C.soft, fontSize: 22 }}>必然事件，没有信息</span></div>
                <div>p = 0.5 <span style={{ color: C.dim }}>→</span> I = 1 bit <span style={{ color: C.soft, fontSize: 22 }}>一次公平抛硬币</span></div>
                <div>p → 0 <span style={{ color: C.dim }}>→</span> I → ∞</div>
              </div>
              <div style={{ marginTop: 26 }}>
                <Pill icon="◐" color={A} size={22}>
                  以 2 为底：比特 · 以 e 为底：奈特
                </Pill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── entropy ── */}
      <AbsoluteFill style={{ opacity: entropy }}>
        <Top at={L[8]} kicker="ENTROPY" color={A}>
          把意外按概率平均，就是<Hi color={A} marker at={L[8] + 28}>熵</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 30 }}>
          <Enter at={L[8]}>
            <Photo src="img/coin.jpg" w={460} h={450} from={L[8]} />
          </Enter>
          <Enter at={L[8] + 8}>
            <Card style={{ width: 640, height: 450, padding: "32px 38px" }}>
              <CoinRow label="公平硬币" a={0.5} b={0.5} h="1 bit" c={A} at={L[9]} />
              <div style={{ height: 1.5, background: C.line, margin: "28px 0" }} />
              <CoinRow label="永远正面" a={1} b={0} h="0 bit" c={C.dim} at={L[9] + 18} />
            </Card>
          </Enter>
          <Enter at={L[8] + 16}>
            <Card accent={A} style={{ width: 620, height: 450, padding: "38px 42px" }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 54, color: C.ink }}>
                H = −<span style={{ fontSize: 64, color: A }}>∑</span> p<sub style={{ fontSize: 24 }}>i</sub> log p<sub style={{ fontSize: 24 }}>i</sub>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.ink, marginTop: 28, lineHeight: 1.6 }}>
                衡量这个分布本身
                <br />
                有多不确定
              </div>
              <div style={{ marginTop: 26 }}>
                <Pill icon="✓" color={C.green} size={22}>
                  分布越平，熵越大
                </Pill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ChipBar: React.FC<{ p: number; c: string; at: number }> = ({ p, c, at }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ height: 34, borderRadius: 17, background: "#ecebe8", overflow: "hidden" }}>
      <div style={{ width: `${p * 100 * reveal(frame, at + 8, 30)}%`, height: "100%", borderRadius: 17, background: c }} />
    </div>
  );
};

const CoinRow: React.FC<{ label: string; a: number; b: number; h: string; c: string; at: number }> = ({ label, a, b, h, c, at }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ opacity: reveal(frame, at, 16) }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, color: C.ink }}>{label}</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 30, color: c }}>H = {h}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, height: 40, alignItems: "stretch" }}>
        <div style={{ width: `${a * 100}%`, borderRadius: 9, background: `${c}cc`, color: "#fff", fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
          正 {a}
        </div>
        <div style={{ width: `${b * 100}%`, borderRadius: 9, background: "#ecebe8", color: C.soft, fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {b > 0 ? `反 ${b}` : ""}
        </div>
      </div>
    </div>
  );
};

// -log p, drawn with the two example points.
const LogCurve: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const X0 = 90;
  const Y0 = 440;
  const W = 780;
  const H = 360;
  const pts = new Array(101).fill(0).map((_, k) => {
    const p = 0.005 + (k / 100) * 0.99;
    return [X0 + p * W, Y0 - Math.min(Math.log(1 / p), 5.2) / 5.2 * H];
  });
  const n = Math.max(2, Math.round(reveal(frame, at, 50) * 100));
  const shown = pts.slice(0, n + 1);
  const px = (p: number) => X0 + p * W;
  const py = (p: number) => Y0 - (Math.min(Math.log(1 / p), 5.2) / 5.2) * H;
  return (
    <svg width={900} height={480}>
      <line x1={X0} y1={Y0} x2={X0 + W + 20} y2={Y0} stroke="#d6d8dd" strokeWidth={2} />
      <line x1={X0} y1={Y0} x2={X0} y2={40} stroke="#d6d8dd" strokeWidth={2} />
      {[0.01, 0.5, 0.99].map((p) => (
        <line key={p} x1={px(p)} y1={Y0} x2={px(p)} y2={Y0 + 7} stroke="#b9bcc3" strokeWidth={2} />
      ))}
      <text x={X0 + 8} y={Y0 + 28} fontSize={20} fill={C.soft} fontFamily={FONT.sans}>p →</text>
      <text x={X0 + 8} y={58} fontSize={20} fill={C.soft} fontFamily={FONT.sans}>−log p ↑</text>
      <path d={`M${shown.map((x) => x.join(" ")).join(" L")}`} fill="none" stroke={A} strokeWidth={6} strokeLinecap="round" />
      {[
        { p: 0.99, label: "0.99 → 0.01", c: C.green, dy: -18 },
        { p: 0.01, label: "0.01 → 4.6", c: C.red, dy: 18 },
      ].map((x) => (
        <g key={x.p} opacity={reveal(frame, at + 40, 14)}>
          <circle cx={px(x.p)} cy={py(x.p)} r={11} fill="#fff" stroke={x.c} strokeWidth={4} />
          <text
            x={px(x.p) + (x.p < 0.5 ? 18 : -18)}
            y={py(x.p) + x.dy}
            textAnchor={x.p < 0.5 ? "start" : "end"}
            fontSize={24}
            fontWeight={700}
            fill={x.c}
            fontFamily={FONT.sans}
          >
            {x.label}
          </text>
        </g>
      ))}
      <text x={X0 + 300} y={470} fontSize={16} fill={C.dim} fontFamily={FONT.sans}>曲线示意 · 底数为 e，单位奈特</text>
    </svg>
  );
};
