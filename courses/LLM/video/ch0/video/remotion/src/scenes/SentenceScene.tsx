import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("sentence");
const A = C.orange;
const BLUE = C.blue;

const CONTEXT = ["今天", "下雨了，", "出门", "记得", "带"];
// Illustrative probabilities, not measured from a real model.
const CANDS = [
  { w: "伞", p: 0.62 },
  { w: "雨衣", p: 0.14 },
  { w: "钥匙", p: 0.07 },
  { w: "外套", p: 0.04 },
];
const LOOP = ["打分", "挑一个", "接上", "再猜"];
const PRODUCTS = [
  { zh: "翻译", en: "Translation", icon: "文A", c: C.blue },
  { zh: "推理", en: "Reasoning", icon: "∴", c: C.purple },
  { zh: "写代码", en: "Coding", icon: "</>", c: C.green },
];

export const SentenceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const a = span(frame, L[0] - 4, L[4] - 6, 14);
  const b = span(frame, L[4] - 6, L[8] - 6, 14);
  const c = reveal(frame, L[8] - 6, 16);
  const swap = reveal(frame, L[6] - 4, 16);

  return (
    <AbsoluteFill>
      {/* A: the one-sentence definition */}
      <AbsoluteFill style={{ opacity: a }}>
        <Top at={L[0]} kicker="ONE SENTENCE">
          把七十年，<Hi marker at={L[0] + 24}>压缩成一句话</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 330 }}>
          <Enter at={L[1] - 6}>
            <Photo src="img/library.jpg" w={760} h={540} from={L[1]}>
              <div style={{ position: "absolute", left: 28, top: 28 }}>
                <PopPill at={L[1] + 26} icon="▤" color={A}>
                  海量文本
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 960, top: 350, width: 820 }}>
          <Enter at={L[1] + 8}>
            <Card style={{ padding: "40px 46px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.dim, letterSpacing: 3 }}>定义</div>
              <div style={{ fontFamily: FONT.serif, fontSize: 48, fontWeight: 700, color: C.ink, marginTop: 14, lineHeight: 1.35 }}>
                LLM = 用<Hi>海量文本</Hi>训练出来的程序
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "26px 0" }} />
              <div style={{ fontFamily: FONT.serif, fontSize: 46, fontWeight: 700, color: C.ink, lineHeight: 1.4, opacity: reveal(frame, L[2], 16) }}>
                只擅长：<Hi marker at={L[2] + 26}>根据上文，猜下一个词</Hi>
              </div>
              <div style={{ marginTop: 26, opacity: reveal(frame, L[3], 16) }}>
                <PopPill at={L[3]} icon="⌨" color={BLUE} size={23}>
                  输入法联想 = 猜下一个词
                </PopPill>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* B: umbrella + candidate scoring */}
      <AbsoluteFill style={{ opacity: b }}>
        <Top at={L[4]} kicker="EXAMPLE">
          下一个词，最可能是<Hi marker at={L[4] + 30}>「伞」</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 336, width: 680, height: 520 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - swap }}>
            <Photo src="img/umbrella.jpg" w={680} h={520} from={L[4]} />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: swap }}>
            <Photo src="img/candidates.jpg" w={680} h={520} from={L[6]} accent={A}>
              <div style={{ position: "absolute", left: 24, bottom: 24 }}>
                <PopPill at={L[6] + 20} icon="◇" color={A} size={22}>
                  候选词 · 示意
                </PopPill>
              </div>
            </Photo>
          </div>
        </div>
        <div style={{ position: "absolute", left: 880, top: 330, width: 920 }}>
          <Enter at={L[4] + 6}>
            <Card style={{ padding: "30px 38px", height: 540 }}>
              <div style={{ display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap" }}>
                {CONTEXT.map((w) => (
                  <span key={w} style={{ fontFamily: FONT.sans, fontSize: 33, color: C.ink, padding: "5px 13px", background: "#f1eee6", borderRadius: 10 }}>
                    {w}
                  </span>
                ))}
                <span
                  style={{
                    fontFamily: FONT.serif,
                    fontSize: 36,
                    fontWeight: 700,
                    padding: "5px 18px",
                    borderRadius: 10,
                    border: `2.5px dashed ${A}`,
                    color: A,
                    background: reveal(frame, L[5], 10) > 0.5 ? `${A}1c` : "transparent",
                  }}
                >
                  {reveal(frame, L[5], 10) > 0.5 ? "伞" : "？"}
                </span>
              </div>
              <div style={{ opacity: reveal(frame, L[5] - 2, 14) }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 800, color: C.dim, letterSpacing: 3, margin: "24px 0 4px" }}>
                候选词 · 概率（示意）
              </div>
              {CANDS.map((cd, i) => {
                const g = reveal(frame, L[6] + 10 + i * 6, 22);
                const win = i === 0;
                return (
                  <div key={cd.w} style={{ display: "flex", alignItems: "center", gap: 18, height: 50 }}>
                    <div style={{ width: 76, fontFamily: FONT.serif, fontSize: 30, fontWeight: win ? 700 : 500, color: win ? A : C.ink }}>{cd.w}</div>
                    <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#ece9e1", position: "relative" }}>
                      <div style={{ width: `${cd.p * g * 100}%`, height: "100%", borderRadius: 4, background: win ? A : C.dim, opacity: g }} />
                      <div
                        style={{
                          position: "absolute",
                          left: `calc(${cd.p * g * 100}% - 10px)`,
                          top: -6,
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          background: "#fffdf8",
                          border: `3px solid ${win ? A : C.dim}`,
                          boxSizing: "border-box",
                          opacity: g,
                        }}
                      />
                    </div>
                    <div style={{ width: 62, textAlign: "right", fontFamily: FONT.mono, fontSize: 24, color: win ? A : C.soft, opacity: g }}>{(cd.p * g).toFixed(2)}</div>
                  </div>
                );
              })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 22 }}>
                {LOOP.map((s, i) => {
                  const hot = frame > L[7] + 40 && Math.floor((frame - L[7]) / 14) % 4 === i;
                  return (
                    <React.Fragment key={s}>
                      <div style={{ opacity: reveal(frame, L[7] + i * 8, 12) }}>
                        <div
                          style={{
                            padding: "8px 20px",
                            borderRadius: 999,
                            fontFamily: FONT.sans,
                            fontSize: 24,
                            fontWeight: 700,
                            background: hot ? A : "#fffdf8",
                            color: hot ? "#fff" : C.ink,
                            boxShadow: "0 6px 16px rgba(30,35,50,0.08)",
                          }}
                        >
                          {s}
                        </div>
                      </div>
                      <span style={{ fontSize: 24, color: C.dim, opacity: reveal(frame, L[7] + i * 8 + 4, 12) }}>{i < 3 ? "→" : "↻"}</span>
                    </React.Fragment>
                  );
                })}
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* C: scale + by-products */}
      <AbsoluteFill style={{ opacity: c }}>
        <Top at={L[7]} kicker="EMERGENCE">
          目标很朴素，可当它<Hi marker at={L[7] + 50}>大到一定程度</Hi>……
        </Top>
        <div style={{ position: "absolute", left: 140, top: 350 }}>
          <Enter at={L[7] + 8}>
            <Photo src="img/why-scale.jpg" w={520} h={350} from={L[7]} accent={A}>
              <div style={{ position: "absolute", left: 20, bottom: 18 }}>
                <PopPill at={L[7] + 40} icon="↗" color={A} size={21}>
                  规模 · 示意
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 700, top: 340, width: 1080 }}>
          <Enter at={L[7] + 10}>
            <Card style={{ padding: "26px 34px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.ink }}>☰ 模型规模</div>
              {[
                ["参数量", 0.86],
                ["训练文本", 0.78],
                ["算力", 0.9],
              ].map(([k, v], i) => {
                const g = reveal(frame, L[7] + 30 + i * 8, 50) * (v as number);
                return (
                  <div key={k as string} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}>
                    <div style={{ width: 108, fontFamily: FONT.sans, fontSize: 23, color: C.soft }}>{k}</div>
                    <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#ece9e1" }}>
                      <div style={{ width: `${g * 100}%`, height: "100%", borderRadius: 4, background: A }} />
                    </div>
                  </div>
                );
              })}
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 700, top: 610, display: "flex", gap: 20 }}>
          {PRODUCTS.map((p, i) => (
            <Enter key={p.zh} at={L[8] + 40 + i * 16}>
              <Card style={{ width: 320, height: 210, padding: "26px 28px" }}>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    background: `${p.c}18`,
                    color: p.c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT.sans,
                    fontSize: 26,
                    fontWeight: 800,
                  }}
                >
                  {p.icon}
                </div>
                <div style={{ fontFamily: FONT.serif, fontSize: 38, fontWeight: 700, color: C.ink, marginTop: 16 }}>{p.zh}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 18, color: C.dim, marginTop: 2 }}>{p.en}</div>
              </Card>
            </Enter>
          ))}
        </div>
        <div style={{ position: "absolute", left: 140, top: 724 }}>
          <Stamp at={L[10] + 30} color={A} rotate={-5} style={{ fontSize: 24 }}>
            副产品 · by-products
          </Stamp>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
