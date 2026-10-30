import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("machine");
const A = C.blue;

const WORDS = [
  { w: "猫", p: 0.6, c: C.orange },
  { w: "狗", p: 0.3, c: C.blue },
  { w: "鱼", p: 0.08, c: C.teal },
  { w: "车", p: 0.02, c: C.dim },
];

export const MachineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const table = span(frame, 0, L[4] - 4, 14);
  const def = span(frame, L[4] - 4, L[6] - 4, 14);
  const detail = reveal(frame, L[6] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── the table ── */}
      <AbsoluteFill style={{ opacity: table }}>
        <Top at={L[0]} kicker="ONE JOB" color={A}>
          输入一段文本，输出<Hi color={A} marker at={L[0] + 30}>一个分布</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[0]}>
            <Card style={{ width: 880, height: 560, padding: "34px 42px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "nowrap" }}>
                {["我", "养", "了", "一只"].map((w) => (
                  <span key={w} style={{ fontFamily: FONT.sans, fontSize: 34, color: C.ink, padding: "6px 14px", background: "#f2f1ee", borderRadius: 10 }}>
                    {w}
                  </span>
                ))}
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 34,
                    fontWeight: 800,
                    padding: "6px 18px",
                    borderRadius: 10,
                    border: `2.5px dashed ${A}`,
                    color: A,
                    background: `${A}12`,
                  }}
                >
                  ？
                </span>
                <span style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim, marginLeft: 10 }}>词表只有四个词</span>
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0 10px" }} />
              {WORDS.map((x, i) => {
                const g = reveal(frame, L[2] + i * 5, 26);
                const lead = i === 0;
                return (
                  <div key={x.w} style={{ display: "flex", alignItems: "center", gap: 20, height: 82 }}>
                    <div style={{ width: 66, fontFamily: FONT.sans, fontSize: 38, fontWeight: 800, color: lead ? x.c : C.ink }}>{x.w}</div>
                    <div style={{ flex: 1, height: 16, borderRadius: 8, background: "#ecebe8", overflow: "hidden" }}>
                      <div style={{ width: `${x.p * g * 100}%`, height: "100%", borderRadius: 8, background: x.c }} />
                    </div>
                    <div style={{ width: 112, textAlign: "right", fontFamily: FONT.mono, fontSize: 30, color: lead ? x.c : C.soft }}>
                      {x.p.toFixed(2)}
                    </div>
                  </div>
                );
              })}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 21, color: C.dim }}>示意图 · 不是真实模型输出</div>
                <div style={{ opacity: reveal(frame, L[3], 16) }}>
                  <Pill icon="∑" color={C.green} solid size={24}>
                    Σ = 1.00
                  </Pill>
                </div>
              </div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 1060, top: 330 }}>
          <Enter at={L[1] - 4}>
            <Photo src="img/jars.jpg" w={720} h={470} from={L[1]}>
              <div style={{ position: "absolute", left: 22, top: 22 }}>
                <PopPill at={L[1] + 20} icon="▤" color={A}>
                  每个词一份概率
                </PopPill>
              </div>
            </Photo>
          </Enter>
          <div style={{ display: "flex", gap: 12, marginTop: 22, alignItems: "center" }}>
            {WORDS.map((x, i) => (
              <PopPill key={x.w} at={L[2] + i * 5} color={x.c} size={22}>
                {x.w} {x.p.toFixed(2)}
              </PopPill>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      {/* ── the definition ── */}
      <AbsoluteFill style={{ opacity: def }}>
        <Top at={L[4]} kicker="DEFINITION" color={A}>
          这个函数，就叫<Hi color={A} marker at={L[4] + 26}>语言模型</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 330, display: "flex", gap: 40, alignItems: "center" }}>
          <Enter at={L[4] + 6}>
            <Card accent={A} style={{ width: 1050, height: 420, padding: "46px 54px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, color: C.dim, letterSpacing: 2 }}>LANGUAGE MODEL</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 56, color: C.ink, marginTop: 30 }}>
                P( w<sub style={{ fontSize: 30 }}>t</sub> | w<sub style={{ fontSize: 30 }}>1</sub> … w<sub style={{ fontSize: 30 }}>t−1</sub> )
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 34 }}>
                <Pill icon="▤" color={A} size={26}>
                  一段文本
                </Pill>
                <span style={{ fontFamily: FONT.sans, fontSize: 32, color: C.dim }}>→</span>
                <Pill icon="◫" color={C.orange} solid size={26}>
                  词表上的一整个分布
                </Pill>
              </div>
            </Card>
          </Enter>
          <Enter at={L[4] + 20}>
            <Card style={{ width: 560, height: 420, padding: "36px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, color: A }}>不是一个词</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.ink, marginTop: 10, lineHeight: 1.5 }}>
                而是一张
                <br />
                每个词有多可能的清单
              </div>
              <div style={{ marginTop: 30, display: "flex", gap: 8, alignItems: "flex-end", height: 90 }}>
                {[0.6, 0.3, 0.08, 0.02].map((p, i) => (
                  <div key={i} style={{ width: 46, height: `${p * 100}%`, borderRadius: 8, background: i === 0 ? A : `${A}44` }} />
                ))}
              </div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: reveal(frame, L[5], 16) }}>
          <Pill icon="▤" color={C.blue} size={24}>一段文本</Pill>
          <span style={{ fontFamily: FONT.sans, fontSize: 28, color: C.dim }}>→</span>
          <Pill icon="◫" color={A} solid size={24}>词表上的分布</Pill>
          <span style={{ fontFamily: FONT.sans, fontSize: 28, color: C.dim }}>→</span>
          <Pill icon="⌁" color={C.orange} size={24}>采样出下一个词</Pill>
        </div>
      </AbsoluteFill>

      {/* ── two details ── */}
      <AbsoluteFill style={{ opacity: detail }}>
        <Top at={L[6]} kicker="TWO DETAILS" color={A}>
          两个细节，后面会变得<Hi color={A} marker at={L[6] + 28}>非常重要</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[6]}>
            <Card style={{ width: 800, height: 470, padding: "36px 42px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>DETAIL 01</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 42, fontWeight: 800, color: C.ink, marginTop: 8 }}>输出是分布，不是词</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.soft, marginTop: 8 }}>选哪个词，是采样策略决定的</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 34 }}>
                {WORDS.map((x) => (
                  <div key={x.w} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 700, color: C.ink }}>{x.w}</div>
                    <div style={{ width: 54, height: 10, borderRadius: 5, background: "#ecebe8", marginTop: 8 }}>
                      <div style={{ width: `${x.p * 100}%`, height: "100%", borderRadius: 5, background: x.c }} />
                    </div>
                  </div>
                ))}
                <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.dim }}>→</div>
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 18,
                    background: `${A}14`,
                    color: A,
                    fontFamily: FONT.sans,
                    fontSize: 38,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ⌁
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft }}>
                  同一个问题
                  <br />
                  可能两种答案
                </div>
              </div>
            </Card>
          </Enter>
          <Enter at={L[6] + 20}>
            <Card style={{ width: 800, height: 470, padding: "36px 42px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.teal, letterSpacing: 2 }}>DETAIL 02</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 42, fontWeight: 800, color: C.ink, marginTop: 8 }}>上文可以任意长</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.soft, marginTop: 8 }}>这个承诺，正是 Transformer 要解决的问题</div>
              <div style={{ display: "flex", gap: 6, marginTop: 38, flexWrap: "nowrap" }}>
                {["很久", "以前", "的", "上", "文", "…", "一直", "到", "这", "里"].map((w, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 22,
                      color: C.ink,
                      padding: "6px 8px",
                      background: i > 5 ? `${C.teal}18` : "#f2f1ee",
                      borderRadius: 8,
                      opacity: 0.45 + 0.55 * Math.min(1, i / 6 + reveal(frame, L[8] - 10, 30)),
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 30 }}>
                <Pill icon="⌖" color={C.teal} size={22}>
                  第 5 章 · Transformer
                </Pill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
