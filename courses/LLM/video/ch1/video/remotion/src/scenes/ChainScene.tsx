import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("chain");
const A = C.teal;

const TOKENS = ["我", "养", "了", "一只", "猫"];
const PROBS = [0.12, 0.34, 0.55, 0.72, 0.65];

export const ChainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const product = span(frame, 0, L[4] - 4, 14);
  const auto = span(frame, L[4] - 4, L[7] - 4, 14);
  const logs = reveal(frame, L[7] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── chain rule ── */}
      <AbsoluteFill style={{ opacity: product }}>
        <Top at={L[0]} kicker="CHAIN RULE" color={A}>
          一句话的概率，是每一步的<Hi color={A} marker at={L[0] + 34}>连乘</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 340, display: "flex", alignItems: "center", gap: 8 }}>
          {TOKENS.map((w, i) => (
            <React.Fragment key={w}>
              <div style={{ textAlign: "center", opacity: reveal(frame, L[0] + 10 + i * 4, 16), translate: `0px ${(1 - reveal(frame, L[0] + 10 + i * 4, 16)) * 14}px` }}>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 46,
                    fontWeight: 800,
                    color: C.ink,
                    padding: "14px 18px",
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 8px 22px rgba(30,35,50,0.10)",
                    minWidth: 96,
                  }}
                >
                  {w}
                </div>
                <div style={{ fontFamily: FONT.mono, fontSize: 19, color: C.soft, marginTop: 8 }}>{PROBS[i].toFixed(2)}</div>
              </div>
              {i < TOKENS.length - 1 ? (
                <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.dim, paddingBottom: 26, opacity: reveal(frame, L[0] + 10 + i * 4, 16) }}>×</div>
              ) : (
                <div style={{ fontFamily: FONT.sans, fontSize: 34, color: A, paddingBottom: 26, marginLeft: 10, opacity: reveal(frame, L[2] + 18, 16) }}>
                  =
                </div>
              )}
            </React.Fragment>
          ))}
          <div style={{ marginLeft: 10, textAlign: "center", opacity: reveal(frame, L[2] + 18, 16) }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 40, fontWeight: 600, color: A, padding: "14px 24px", background: `${A}10`, borderRadius: 14 }}>
              ≈ 0.0105
            </div>
            <div style={{ fontFamily: FONT.sans, fontSize: 19, color: C.soft, marginTop: 8 }}>整句概率</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 120, top: 560, width: 1680 }}>
          <Enter at={L[3] - 2}>
            <Card style={{ padding: "30px 44px", display: "flex", alignItems: "center", gap: 40 }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.dim, letterSpacing: 2, whiteSpace: "nowrap" }}>CHAIN RULE</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 40, color: C.ink }}>
                P(w<sub style={{ fontSize: 24 }}>1</sub>, …, w<sub style={{ fontSize: 24 }}>T</sub>) ={" "}
                <span style={{ fontSize: 54, color: A }}>∏</span>
                <span style={{ fontSize: 26 }}> t=1..T</span> P(w<sub style={{ fontSize: 24 }}>t</sub> | w<sub style={{ fontSize: 24 }}>&lt;t</sub>)
              </div>
              <div style={{ marginLeft: "auto" }}>
                <PopPill at={L[3] + 18} icon="·" color={A} size={24}>
                  每一步都乘一次
                </PopPill>
              </div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: reveal(frame, L[3] + 24, 16) }}>
          <Pill icon="①" color={C.teal} size={24}>一步一步</Pill>
          <span style={{ fontFamily: FONT.sans, fontSize: 26, color: C.dim }}>→</span>
          <Pill icon="②" color={C.blue} size={24}>每一步一个条件概率</Pill>
          <span style={{ fontFamily: FONT.sans, fontSize: 26, color: C.dim }}>→</span>
          <Pill icon="③" color={C.orange} size={24}>全部乘起来</Pill>
        </div>
      </AbsoluteFill>

      {/* ── autoregression ── */}
      <AbsoluteFill style={{ opacity: auto }}>
        <Top at={L[4]} kicker="AUTOREGRESSION" color={A}>
          用前面的输出，当下一步的<Hi color={A} marker at={L[4] + 30}>输入</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[4]}>
            <Photo src="img/dominoes.jpg" w={760} h={520} from={L[4]}>
              <div style={{ position: "absolute", left: 24, bottom: 24 }}>
                <PopPill at={L[5] + 4} icon="⇥" color={A}>
                  每次只往前挪一步
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 960, top: 340, width: 820 }}>
          <Enter at={L[4] + 10}>
            <Card style={{ padding: "34px 38px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {["我", "养", "了", "一只"].map((w) => (
                  <span key={w} style={{ fontFamily: FONT.sans, fontSize: 28, padding: "6px 12px", background: "#f2f1ee", borderRadius: 8 }}>
                    {w}
                  </span>
                ))}
                <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.dim }}>→</div>
                <div
                  style={{
                    padding: "8px 18px",
                    borderRadius: 12,
                    border: `2.5px solid ${A}`,
                    color: A,
                    fontFamily: FONT.sans,
                    fontSize: 28,
                    fontWeight: 800,
                    background: `${A}12`,
                  }}
                >
                  猫
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.dim }}>→</div>
                <div style={{ padding: "8px 18px", borderRadius: 12, background: `${C.orange}18`, color: C.orange, fontFamily: FONT.sans, fontSize: 28, fontWeight: 800 }}>
                  ？
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft }}>把刚生成的词</div>
                <div style={{ width: 300 * reveal(frame, L[4] + 40, 30), height: 3, background: A, borderRadius: 2 }} />
                <div style={{ fontFamily: FONT.sans, fontSize: 24, color: A, fontWeight: 700 }}>接回输入</div>
              </div>
            </Card>
          </Enter>
          <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
            <PopPill at={L[5] + 14} icon="⌁" color={A} size={22}>
              一次一个 token
            </PopPill>
            <PopPill at={L[6] + 4} icon="∏" color={C.blue} size={22}>
              整句 = 每一步的乘积
            </PopPill>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── underflow → log ── */}
      <AbsoluteFill style={{ opacity: logs }}>
        <Top at={L[7]} kicker="UNDERFLOW" color={A}>
          很多个小于一的数相乘，会<Hi color={C.red} marker at={L[7] + 30}>变成零</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 340, display: "flex", gap: 36 }}>
          <Enter at={L[7]}>
            <Card style={{ width: 800, height: 440, padding: "36px 42px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.red, letterSpacing: 2 }}>PROBLEM</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink, marginTop: 22, lineHeight: 1.4 }}>
                0.02 × 0.02 × … × 0.02
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.soft, marginTop: 8 }}>五十个 0.02 相乘</div>
              <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 34 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 50, color: C.ink }}>1e−85</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 34, color: C.dim }}>→</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 64, fontWeight: 800, color: C.red }}>0</div>
              </div>
              <div style={{ marginTop: 26 }}>
                <Stamp at={L[7] + 40} color={C.red} rotate={-5}>
                  下溢 underflow
                </Stamp>
              </div>
            </Card>
          </Enter>
          <Enter at={L[8] - 6}>
            <Card accent={A} style={{ width: 800, height: 440, padding: "36px 42px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>FIX</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 34, fontWeight: 800, color: C.ink, marginTop: 8 }}>取对数：连乘变连加</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 34, color: C.ink, marginTop: 30 }}>
                log P = <span style={{ color: A, fontSize: 44 }}>∑</span> log P(w<sub style={{ fontSize: 20 }}>t</sub> | w<sub style={{ fontSize: 20 }}>&lt;t</sub>)
              </div>
              <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
                <Pill icon="✓" color={C.green} size={22}>
                  数值稳定
                </Pill>
                <Pill icon="→" color={A} size={22}>
                  下一步：信息量
                </Pill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
