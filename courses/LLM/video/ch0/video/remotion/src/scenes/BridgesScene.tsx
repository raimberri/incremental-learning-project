import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById } from "../timing";

const scene = sceneById("bridges");
const A = C.blue;

const COLS = [
  { img: "img/steam.jpg", field: "热力学", chain: ["蒸汽机", "信息论", "损失函数"], part: "熵", c: C.orange },
  { img: "img/bacteria.jpg", field: "生物学", chain: ["化学受体", "↔", "导数"], part: "梯度下降", c: C.green },
  { img: "img/pinfactory.jpg", field: "经济学", chain: ["亚当·斯密", "别针工厂", "分工"], part: "混合专家", c: C.purple },
  { img: "img/feather.jpg", field: "预适应", chain: ["旧结构", "→", "新用途"], part: "下游能力", c: C.teal },
];

export const BridgesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const warn = reveal(frame, L[5] - 4, 16);

  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker="CROSS-DOMAIN" color={A}>
        很多零件，来自<Hi color={A} marker at={L[0] + 30}>别的学科</Hi>
      </Top>

      <div style={{ position: "absolute", left: 1370, top: 160, opacity: warn }}>
        <Card style={{ padding: "14px 22px", display: "flex", gap: 12, alignItems: "center" }}>
          <Pill icon="⇄" color={C.green} size={19}>
            迁移工具
          </Pill>
          <Pill icon="⚠" color={C.red} size={19}>
            也是陷阱
          </Pill>
        </Card>
      </div>

      <div style={{ position: "absolute", left: 140, top: 310, display: "flex", gap: 24 }}>
        {COLS.map((col, i) => {
          const at = L[1 + i];
          return (
            <Enter key={col.part} at={L[1] + i * 8 - 6}>
              <div style={{ width: 390, opacity: 0.75 + 0.25 * warn }}>
                <Photo src={col.img} w={390} h={250} from={at} radius={20} accent={warn > 0.5 ? col.c : undefined}>
                  <div style={{ position: "absolute", left: 18, top: 18 }}>
                    <Pill color={col.c} solid size={18}>
                      {col.field}
                    </Pill>
                  </div>
                  <div style={{ position: "absolute", right: 8, bottom: 10 }}>
                    <Stamp at={L[5] + 6 + i * 8} rotate={-5} style={{ fontSize: 17, padding: "4px 10px", borderWidth: 2 }}>
                      失效边界
                    </Stamp>
                  </div>
                </Photo>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 16, flexWrap: "nowrap" }}>
                  {col.chain.map((c, k) =>
                    c === "→" || c === "↔" ? (
                      <span key={k} style={{ fontFamily: FONT.sans, fontSize: 20, color: C.dim }}>
                        {c}
                      </span>
                    ) : (
                      <PopPill key={k} at={L[1] + i * 8 + 18 + k * 12} color={col.c} size={17}>
                        {c}
                      </PopPill>
                    ),
                  )}
                </div>
                <div style={{ opacity: reveal(frame, L[1] + i * 8 + 50, 14), marginTop: 14 }}>
                  <Card accent={col.c} style={{ padding: "14px 18px", display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, color: C.dim }}>LLM 里的</span>
                    <span style={{ fontFamily: FONT.serif, fontSize: 32, fontWeight: 700, color: C.ink }}>{col.part}</span>
                  </Card>
                </div>
              </div>
            </Enter>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 140, top: 844, width: 1640, textAlign: "center", opacity: warn }}>
        <span style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft }}>
          类比只负责「迁移」，不负责「证明」；每个类比都要标出失效的那一步。
        </span>
      </div>
    </AbsoluteFill>
  );
};
