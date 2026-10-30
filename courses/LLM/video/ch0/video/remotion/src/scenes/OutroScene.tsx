import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("outro");
const A = C.purple;

const THINGS = [
  { icon: "⌃", title: "一点耐心", sub: "第 2 章反向传播、第 5 章注意力，是两个陡坡", c: C.orange },
  { icon: "✎", title: "一支笔", sub: "自测先写答案，再看解析；看懂不等于会做", c: C.blue },
  { icon: "?", title: "怀疑精神", sub: "找不到出处的说法，一律当作待验证", c: C.purple },
];

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const start = span(frame, L[0] - 4, L[5] - 4, 14);
  const next = span(frame, L[5] - 4, L[7] - 4, 14);
  const end = reveal(frame, L[7] - 4, 20);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: start }}>
        <Top at={L[0]} kicker="BEFORE WE START" color={A}>
          地图不等于<Hi color={A} marker at={L[0] + 20}>地形</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 320 }}>
          <Enter at={L[0]}>
            <Photo src="img/mountain.jpg" w={720} h={520} from={L[0]}>
              <div style={{ position: "absolute", left: 24, bottom: 24 }}>
                <PopPill at={L[1] + 10} icon="▶" color={A} size={21}>
                  开始之前
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 950, top: 330, width: 840 }}>
          {THINGS.map((t, i) => {
            const at = [L[2], L[3], L[4]][i];
            const active = span(frame, at, at + 90, 8);
            return (
              <Enter key={t.title} at={L[2] + i * 8 - 6}>
                <Card accent={active > 0.5 ? t.c : undefined} style={{ height: 132, padding: "18px 24px", marginBottom: 14, display: "flex", alignItems: "center", gap: 20 }}>
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      background: `${t.c}16`,
                      color: t.c,
                      fontSize: 27,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT.serif, fontSize: 34, fontWeight: 700, color: C.ink }}>{t.title}</div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 20, color: C.soft, marginTop: 3 }}>{t.sub}</div>
                  </div>
                </Card>
              </Enter>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: next }}>
        <Top at={L[5]} kicker="NEXT" color={A}>
          下一站：把「猜下一个词」写成<Hi color={A} marker at={L[5] + 30}>概率问题</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 330, display: "flex", gap: 40 }}>
          <Enter at={L[5]}>
            <Card style={{ width: 800, height: 400, padding: "40px 46px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, color: C.dim }}>「猜下一个词」写成</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 62, color: C.ink, marginTop: 40 }}>
                P(w<sub style={{ fontSize: 30 }}>t</sub> | w<sub style={{ fontSize: 30 }}>1</sub>…w<sub style={{ fontSize: 30 }}>t−1</sub>)
              </div>
              <div style={{ marginTop: 44 }}>
                <PopPill at={L[5] + 50} icon="∑" color={A} size={24}>
                  一个可以计算的概率问题
                </PopPill>
              </div>
            </Card>
          </Enter>
          <div style={{ opacity: reveal(frame, L[5] + 20, 16) }}>
            <Enter at={L[5] + 20}>
              <Card style={{ width: 800, height: 400, padding: "40px 46px" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, color: C.dim }}>猜得好不好，用它衡量</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 62, color: C.ink, marginTop: 40 }}>H = −Σ p · log p</div>
                <div style={{ marginTop: 44 }}>
                  <PopPill at={L[6] + 36} icon="◐" color={C.orange} size={24}>
                    熵 · Entropy
                  </PopPill>
                </div>
              </Card>
            </Enter>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: end, justifyContent: "center", alignItems: "center", paddingBottom: 110 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <Photo src="img/mountain.jpg" w={1920} h={1080} from={L[7]} radius={0} style={{ boxShadow: "none" }} />
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, letterSpacing: 7, color: A }}>CHAPTER 01</div>
        <div
          style={{
            fontFamily: FONT.serif,
            fontSize: 132,
            fontWeight: 700,
            color: C.ink,
            marginTop: 14,
            translate: `0px ${interpolate(end, [0, 1], [24, 0])}px`,
          }}
        >
          语言的<span style={{ color: A }}>概率论</span>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 38 }}>
          <PopPill at={L[7] + 36} icon="▶" color={A} size={28}>
            下期见
          </PopPill>
          <PopPill at={L[7] + 48} icon="★" color={C.orange} size={28}>
            See you next time
          </PopPill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
