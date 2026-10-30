import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, Stamp } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("aliases");
const A = C.teal;

const CARDS = [
  { field: "最优控制", name: "伴随法", en: "adjoint method", line: "控制量对目标的影响", color: C.blue, at: 2 },
  { field: "气象学", name: "4D-Var", en: "variational assimilation", line: "用观测反推初始场", color: C.teal, at: 3 },
  { field: "自动微分", name: "反向模式", en: "reverse-mode AD", line: "PyTorch Autograd", color: C.purple, at: 4 },
  { field: "经济学", name: "影子价格", en: "shadow price", line: "约束松一格，目标改善多少", color: C.orange, at: 5 },
];

export const AliasesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const hero = span(frame, 0, L[2] - 2, 14);
  const grid = reveal(frame, L[2] - 2, 16);

  return (
    <AbsoluteFill>
      {/* ── one algorithm, four names ── */}
      <AbsoluteFill style={{ opacity: hero, justifyContent: "center", alignItems: "center", paddingBottom: 90 }}>
        <Card style={{ width: 1280, padding: "56px 70px", textAlign: "center" }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, letterSpacing: 3, color: C.dim }}>ONE KERNEL, MANY FIELDS</div>
          <div style={{ fontFamily: FONT.sans, fontSize: 56, fontWeight: 800, color: C.ink, marginTop: 18, lineHeight: 1.4 }}>
            同一个算法
            <br />
            在至少四个学科里被<Hi color={A} marker at={L[1] + 24}>独立发现</Hi>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 34 }}>
            <Pill icon="1" color={C.blue} size={22}>伴随法</Pill>
            <Pill icon="2" color={C.teal} size={22}>4D-Var</Pill>
            <Pill icon="3" color={C.purple} size={22}>反向模式 AD</Pill>
            <Pill icon="4" color={C.orange} size={22}>影子价格</Pill>
          </div>
        </Card>
      </AbsoluteFill>

      {/* ── four names, four pictures ── */}
      <AbsoluteFill style={{ opacity: grid }}>
        <div style={{ position: "absolute", left: 120, top: 300, opacity: reveal(frame, L[2] - 2, 16) }}>
          <Photo src="img/weather.jpg" w={500} h={450} from={L[3]}>
            <div style={{ position: "absolute", left: 20, bottom: 20 }}>
              <Pill icon="◈" color={A} size={19} solid>
                等值线 = 等高线
              </Pill>
            </div>
          </Photo>
        </div>
        <div style={{ position: "absolute", left: 660, top: 300, display: "grid", gridTemplateColumns: "560px 560px", gap: 20 }}>
          {CARDS.map((c, i) => {
            const active = frame >= L[c.at] - 2 && frame < (i < CARDS.length - 1 ? L[CARDS[i + 1].at] : 99999);
            return (
              <Enter key={c.name} at={L[2] - 2 + i * 4} dist={14}>
                <Card
                  style={{
                    width: 560,
                    height: 215,
                    padding: "24px 30px",
                    boxShadow: active ? `0 0 0 3px ${c.color}, 0 24px 60px rgba(30,35,50,0.14)` : `0 0 0 1.5px ${c.color}22, 0 18px 40px rgba(30,35,50,0.07)`,
                    opacity: active ? 1 : 0.7,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: c.color, letterSpacing: 1 }}>{c.field}</div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 16, color: C.dim, letterSpacing: 0.5 }}>{c.en}</div>
                  </div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 34, fontWeight: 800, color: C.ink, marginTop: 6 }}>{c.name}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, marginTop: 6 }}>{c.line}</div>
                </Card>
              </Enter>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 120, top: 790, width: 1680 }}>
          <Enter at={L[6]} dist={10}>
            <Card style={{ padding: "20px 34px", display: "flex", alignItems: "center", gap: 22 }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.ink }}>
                名字不同，内核相同：<Hi color={A}>一次反向遍历，换所有输入的梯度</Hi>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.soft, opacity: reveal(frame, L[7] - 2, 12) }}>
                  都在算：输出对每个输入的敏感度
                </div>
                <span style={{ opacity: reveal(frame, L[8] - 2, 12) }}>
                  <Stamp at={L[8]} color={A} rotate={-3} style={{ fontSize: 22, padding: "5px 14px" }}>
                    Autograd 不懂神经网络
                  </Stamp>
                </span>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
