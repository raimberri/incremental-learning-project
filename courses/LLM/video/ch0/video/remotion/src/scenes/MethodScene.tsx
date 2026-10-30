import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("method");
const A = C.orange;

export const MethodScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const problem = span(frame, L[0] - 4, L[2] - 4, 14);
  const rules = span(frame, L[2] - 4, L[7] - 4, 14);
  const memory = reveal(frame, L[7] - 4, 16);

  return (
    <AbsoluteFill>
      {/* the usual problem */}
      <AbsoluteFill style={{ opacity: problem }}>
        <Top at={L[0]} kicker="HOW IT IS WRITTEN" color={A}>
          这门课的<Hi marker at={L[0] + 24}>写法</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 336, display: "flex", gap: 38 }}>
          {["第 1 章", "第 4 章", "第 9 章"].map((d, i) => (
            <Enter key={d} at={L[1] + i * 8}>
              <Card style={{ width: 520, height: 400, padding: "28px 32px" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 27, fontWeight: 800, color: C.ink }}>{d}</div>
                {[0.9, 0.7].map((w, k) => (
                  <div key={k} style={{ height: 11, width: `${w * 100}%`, borderRadius: 6, background: "#eeebe3", marginTop: 20 }} />
                ))}
                <div
                  style={{
                    marginTop: 24,
                    padding: "16px 20px",
                    borderRadius: 14,
                    border: `2px solid ${C.red}`,
                    background: `${C.red}0d`,
                    opacity: reveal(frame, L[1] + i * 8 + 12, 12),
                  }}
                >
                  <div style={{ fontFamily: FONT.mono, fontSize: 28, color: C.ink }}>softmax(x)</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 21, fontWeight: 700, color: C.red, marginTop: 2 }}>{i === 0 ? "讲一遍" : "又讲一遍"}</div>
                </div>
                {[0.6, 0.8].map((w, k) => (
                  <div key={k} style={{ height: 11, width: `${w * 100}%`, borderRadius: 6, background: "#eeebe3", marginTop: 20 }} />
                ))}
              </Card>
            </Enter>
          ))}
        </div>
      </AbsoluteFill>

      {/* three rules + ledger */}
      <AbsoluteFill style={{ opacity: rules }}>
        <Top at={L[2]} kicker="INCREMENTAL" color={A}>
          增量式：<Hi marker at={L[2] + 28}>只讲一次</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 340 }}>
          <Enter at={L[3] - 6}>
            <Photo src="img/ledger.jpg" w={470} h={380} from={L[3]} radius={20} />
          </Enter>
          <div style={{ position: "absolute", left: 20, bottom: 20 }}>
            <PopPill at={L[3] + 30} icon="▤" color={A} size={20}>
              概念账本
            </PopPill>
          </div>
        </div>
        <div style={{ position: "absolute", left: 670, top: 330, width: 1110 }}>
          <Rule at={L[2]} until={L[3]} n="01" title="一次定义，终身引用" active={frame >= L[2] && frame < L[3]}>
            <Ledger at={L[2] + 34} />
          </Rule>
          <Rule at={L[2]} until={L[4]} n="02" title="先写「新增」与「前置」" active={frame >= L[3] && frame < L[4]}>
            <div style={{ display: "flex", gap: 10 }}>
              <Pill icon="+" color={C.green} size={20}>
                新增：本章第一次出现
              </Pill>
              <Pill icon="↩" color={C.blue} size={20}>
                前置：默认你会
              </Pill>
            </div>
          </Rule>
          <Rule at={L[2]} until={L[7]} n="03" title="例子绝不用第二次" active={frame >= L[4] && frame < L[7]}>
            <div style={{ display: "flex", gap: 10 }}>
              {["☂", "♞", "✈", "⚗"].map((g, k) => (
                <div
                  key={g}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: `${A}14`,
                    color: A,
                    fontSize: 27,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: reveal(frame, L[4] + 16 + k * 7, 10),
                  }}
                >
                  {g}
                </div>
              ))}
            </div>
          </Rule>
        </div>
      </AbsoluteFill>

      {/* working memory */}
      <AbsoluteFill style={{ opacity: memory }}>
        <Top at={L[7]} kicker="WHY IT WORKS" color={A}>
          因为工作记忆，<Hi marker at={L[7] + 26}>容量有限</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 350, width: 1640 }}>
          <Enter at={L[7] + 4}>
            <Card style={{ padding: "28px 34px", display: "flex", alignItems: "center", gap: 30 }}>
              <Photo src="img/working-memory.jpg" w={350} h={230} from={L[7]} radius={16} style={{ boxShadow: "none" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {new Array(6).fill(0).map((_, i) => {
                    const old = i < 4;
                    return (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 58,
                          borderRadius: 12,
                          background: old ? `${C.red}1f` : `${C.green}1f`,
                          border: `2px solid ${old ? C.red : C.green}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: FONT.sans,
                          fontSize: 21,
                          fontWeight: 700,
                          color: old ? C.red : C.green,
                          opacity: reveal(frame, L[7] + i * 5, 10),
                        }}
                      >
                        {old ? "重复" : "新"}
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 20 }}>
                  重复内容 = 挤掉真正的新东西
                </div>
              </div>
            </Card>
          </Enter>
          <div style={{ marginTop: 28, marginLeft: 1050 }}>
            <Stamp at={L[7] + 110} color={C.red}>
              容量有限
            </Stamp>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Rule: React.FC<{ at: number; until: number; n: string; title: string; active: boolean; children: React.ReactNode }> = ({ at, title, n, active, children }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ opacity: reveal(frame, at - 6, 16) * (0.64 + 0.36 * (active ? 1 : 0.5)) }}>
      <Card accent={active ? A : undefined} style={{ height: 132, padding: "16px 26px", marginBottom: 14, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ fontFamily: FONT.serif, fontSize: 32, fontWeight: 700, color: A, width: 44 }}>{n}</div>
        <div style={{ width: 390 }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 31, fontWeight: 700, color: C.ink }}>{title}</div>
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </Card>
    </div>
  );
};

const Ledger: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const rows = [
    ["softmax", "定义 · 直觉 · 例子"],
    ["第 4 章", "→ 见 §1.3"],
    ["第 9 章", "→ 见 §1.3"],
  ];
  return (
    <div style={{ fontFamily: FONT.sans, fontSize: 20 }}>
      {rows.map(([k, v], i) => (
        <div key={k} style={{ display: "flex", gap: 14, padding: "3px 0", borderBottom: `1.2px solid ${C.line}`, opacity: reveal(frame, at + i * 12, 12) }}>
          <span style={{ width: 100, fontFamily: i === 0 ? FONT.mono : FONT.sans, fontWeight: 700, color: i === 0 ? A : C.ink }}>{k}</span>
          <span style={{ color: C.soft }}>{v}</span>
        </div>
      ))}
    </div>
  );
};
