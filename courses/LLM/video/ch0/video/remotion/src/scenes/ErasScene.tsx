import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Hi, Photo, Pill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("eras");
const A = C.purple;

const ERAS = [
  { zh: "统计时代", years: "1948 – 2002", line: "靠数数，估计下一个词的概率", papers: ["Shannon 1948", "Kneser-Ney 1995"], c: C.orange, img: "img/era-statistical.jpg" },
  { zh: "神经时代", years: "2003 – 2016", line: "神经网络代替数数，词变成向量", papers: ["LSTM 1997", "Bengio 2003", "word2vec 2013"], c: C.blue, img: "img/era-neural.jpg" },
  { zh: "Transformer 时代", years: "2017 – 2019", line: "更并行、更会看全局的架构统一江湖", papers: ["Attention 2017", "GPT-1 · BERT 2018"], c: C.purple, img: "img/era-transformer.jpg" },
  { zh: "规模时代", years: "2020 – 2022", line: "越大越好，背后有数学规律", papers: ["GPT-3 2020", "Scaling Laws 2020", "Chinchilla 2022"], c: C.teal, img: "img/era-scale.jpg" },
  { zh: "对齐与推理时代", years: "2022 – 现在", line: "会说话 → 听话 → 会思考", papers: ["InstructGPT 2022", "CoT 2022", "DeepSeek-R1 2025"], c: C.green, img: "img/era-alignment.jpg" },
];

const AXIS_Y = 800;
const nodeX = (i: number) => 260 + i * 350;

export const ErasScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const starts = [L[1], L[2], L[3], L[4], L[5]];
  const active = starts.reduce((acc, at, i) => (frame >= at ? i : acc), -1);
  const caveat = reveal(frame, L[6] - 4, 16);

  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker="70+ YEARS" color={A}>
        七十多年，大致分成<Hi color={A} marker at={L[0] + 30}>五个时代</Hi>
      </Top>

      {/* overview before the first era */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 330,
          display: "flex",
          justifyContent: "center",
          opacity: span(frame, L[0] + 6, L[1] - 6, 14),
        }}
      >
        <Card style={{ padding: "40px 76px", display: "flex", alignItems: "center", gap: 54 }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 92, fontWeight: 700, color: C.ink }}>1948</div>
          <div style={{ width: 280 * reveal(frame, L[0] + 20, 40), height: 5, borderRadius: 3, background: A }} />
          <div style={{ fontFamily: FONT.serif, fontSize: 92, fontWeight: 700, color: A }}>至今</div>
          <div style={{ fontFamily: FONT.sans, fontSize: 28, fontWeight: 700, color: C.soft, lineHeight: 1.45 }}>
            70+ 年
            <br />5 个时代
          </div>
        </Card>
      </div>

      {/* timeline */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line x1={160} x2={1760} y1={AXIS_Y} y2={AXIS_Y} stroke="#d6d3cb" strokeWidth={3} strokeLinecap="round" />
        <line
          x1={160}
          x2={active < 0 ? 160 : nodeX(active)}
          y1={AXIS_Y}
          y2={AXIS_Y}
          stroke={A}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {ERAS.map((e, i) => {
          const v = reveal(frame, L[0] + 20 + i * 8, 14);
          const on = i === active;
          return (
            <g key={e.zh} opacity={v}>
              <circle cx={nodeX(i)} cy={AXIS_Y} r={on ? 15 : 9} fill={i <= active ? e.c : "#fffdf8"} stroke={e.c} strokeWidth={3} />
              {on ? <circle cx={nodeX(i)} cy={AXIS_Y} r={26 + Math.sin(frame / 8) * 3} fill="none" stroke={e.c} strokeOpacity={0.35} strokeWidth={3} /> : null}
            </g>
          );
        })}
      </svg>
      {ERAS.map((e, i) => (
        <div
          key={e.zh}
          style={{
            position: "absolute",
            left: nodeX(i) - 160,
            width: 320,
            top: AXIS_Y + 24,
            textAlign: "center",
            fontFamily: FONT.sans,
            opacity: reveal(frame, L[0] + 20 + i * 8, 14) * (i === active ? 1 : 0.55),
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: e.c }}>{e.years}</div>
          <div style={{ fontSize: 23, fontWeight: i === active ? 800 : 500, color: C.ink, marginTop: 2 }}>{e.zh}</div>
        </div>
      ))}

      {/* era cards */}
      {ERAS.map((e, i) => {
        const o = span(frame, starts[i], i < 4 ? starts[i + 1] : L[6] - 6, 14);
        if (o <= 0) return null;
        const inP = reveal(frame, starts[i], 18);
        return (
          <div key={e.zh} style={{ position: "absolute", left: 140, top: 294, width: 1640, opacity: o, translate: `${(1 - inP) * 50}px 0px` }}>
            <Card style={{ height: 440, padding: 24, display: "flex", gap: 36 }}>
              <div style={{ flex: 1, padding: "18px 0 0 24px" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: e.c, letterSpacing: 3 }}>ERA 0{i + 1}</div>
                <div style={{ fontFamily: FONT.serif, fontSize: 60, fontWeight: 700, color: C.ink, marginTop: 6 }}>{e.zh}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 31, fontWeight: 700, color: e.c, marginTop: 2 }}>{e.years}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 34, color: C.ink, marginTop: 22, lineHeight: 1.4 }}>{e.line}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
                  {e.papers.map((p, k) => (
                    <div key={p} style={{ opacity: reveal(frame, starts[i] + 18 + k * 8, 12) }}>
                      <Pill icon="❐" color={e.c} size={18} style={{ fontFamily: FONT.mono }}>
                        {p}
                      </Pill>
                    </div>
                  ))}
                </div>
              </div>
              <Photo src={e.img} w={620} h={392} from={starts[i]} radius={18} />
            </Card>
          </div>
        );
      })}

      {/* caveat summary */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 340, display: "flex", justifyContent: "center", opacity: caveat }}>
        <Card style={{ padding: "38px 56px", width: 1280 }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, letterSpacing: 3, color: C.dim }}>ONE ROAD · FIVE GEAR CHANGES</div>
          <div style={{ fontFamily: FONT.serif, fontSize: 50, fontWeight: 700, color: C.ink, marginTop: 8 }}>五个时代，不是五次发明</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            {ERAS.map((e, i) => (
              <div key={e.zh} style={{ opacity: reveal(frame, L[6] + 10 + i * 10, 12) }}>
                <Pill color={e.c} solid size={23}>
                  {e.zh}
                </Pill>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ position: "absolute", right: 20, top: 0 }}>
          <Stamp at={L[6] + 20} color={C.red}>
            大致边界
          </Stamp>
        </div>
      </div>
    </AbsoluteFill>
  );
};
