import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("whys");
const A = C.blue;

const QS = [
  {
    zh: "只是猜下一个词，为什么能逼出推理？",
    en: "Why does next-word guessing produce reasoning?",
    tag: "推理",
    img: "img/why-reasoning.jpg",
  },
  {
    zh: "「大到一定程度」是多大？为什么是突变？",
    en: "How big is big enough? Why a sudden jump?",
    tag: "规模",
    img: "img/why-scale.jpg",
  },
  {
    zh: "猜得准，就等于理解了吗？",
    en: "Does guessing well mean understanding?",
    tag: "理解",
    img: "img/why-understanding.jpg",
  },
  {
    zh: "只是在猜，为什么会一本正经地胡说？",
    en: "If it only guesses, why confident nonsense?",
    tag: "幻觉",
    img: "img/why-hallucination.jpg",
  },
];

export const WhysScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const grid = span(frame, L[0] - 4, L[6] - 4, 14);
  const after = reveal(frame, L[6] - 4, 16);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: grid }}>
        <Top at={L[0]} kicker="FOUR WHYS" color={A}>
          这句话里的每个词，都值得<Hi color={A} marker at={L[0] + 30}>怀疑</Hi>
        </Top>
        {QS.map((q, i) => {
          const at = [L[1], L[2], L[4], L[5]][i];
          const until = [L[2], L[4], L[5], L[6]][i];
          const active = span(frame, at, until, 8);
          const v = reveal(frame, L[1] + i * 8 - 6, 18);
          return (
            <div
              key={q.tag}
              style={{
                position: "absolute",
                left: 140 + (i % 2) * 820,
                top: 326 + Math.floor(i / 2) * 262,
                width: 800,
                opacity: v * (0.62 + 0.38 * Math.max(active, reveal(frame, L[5], 16))),
                translate: `0px ${(1 - v) * 22 - active * 5}px`,
                scale: 1 + active * 0.012,
              }}
            >
              <Card accent={active > 0.5 ? A : undefined} style={{ height: 238, padding: "20px 22px", display: "flex", gap: 20 }}>
                <Photo src={q.img} w={196} h={196} from={at} radius={16} style={{ boxShadow: "none", flexShrink: 0 }} />
                <div style={{ paddingTop: 4 }}>
                  <Pill icon="?" color={A} size={18}>
                    {q.tag}
                  </Pill>
                  <div style={{ fontFamily: FONT.serif, fontSize: 32, fontWeight: 700, color: C.ink, marginTop: 10, lineHeight: 1.32 }}>{q.zh}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 17, color: C.soft, marginTop: 6, lineHeight: 1.35 }}>{q.en}</div>
                </div>
              </Card>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 1480, top: 160 }}>
          <Stamp at={L[5] + 20} color={A}>
            一层一层拆开
          </Stamp>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: after }}>
        <Top at={L[6]} kicker="AFTER THIS COURSE" color={A}>
          拆完以后，你能做到的<Hi color={A} marker at={L[6] + 30}>两件事</Hi>
        </Top>
        <div style={{ position: "absolute", left: 140, top: 340, display: "flex", gap: 40 }}>
          <Outcome at={L[6] + 10} icon="▤" zh="读懂一篇论文的摘要" en="Read a paper's abstract" />
          <Outcome at={L[6] + 40} icon="⚖" zh="分辨新闻：事实，还是夸大" en="Tell a fact from hype" meter />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Outcome: React.FC<{ at: number; icon: string; zh: string; en: string; meter?: boolean }> = ({ at, icon, zh, en, meter }) => {
  const frame = useCurrentFrame();
  const needle = interpolate(Math.sin((frame - at) / 22), [-1, 1], [0.22, 0.78]);
  return (
    <Enter at={at}>
      <Card style={{ width: 800, height: 390, padding: "42px 48px" }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 20,
            background: `${A}18`,
            color: A,
            fontSize: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <div style={{ fontFamily: FONT.serif, fontSize: 44, fontWeight: 700, color: C.ink, marginTop: 26 }}>{zh}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft, marginTop: 8 }}>{en}</div>
        {meter ? (
          <div style={{ position: "relative", marginTop: 42, height: 52 }}>
            <div style={{ position: "absolute", top: 10, left: 0, right: 0, height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${C.green}, ${C.red})` }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: `calc(${needle * 100}% - 13px)`,
                width: 26,
                height: 26,
                borderRadius: 13,
                background: "#fffdf8",
                border: `4px solid ${C.ink}`,
                boxSizing: "border-box",
              }}
            />
            <div style={{ position: "absolute", top: 28, left: 0, fontFamily: FONT.sans, fontSize: 19, fontWeight: 700, color: C.green }}>事实</div>
            <div style={{ position: "absolute", top: 28, right: 0, fontFamily: FONT.sans, fontSize: 19, fontWeight: 700, color: C.red }}>夸大</div>
          </div>
        ) : (
          <div style={{ marginTop: 38, display: "flex", gap: 12 }}>
            {["Abstract", "Method", "Results"].map((t, i) => (
              <div key={t} style={{ opacity: reveal(frame, at + 30 + i * 10, 12) }}>
                <Pill icon="✓" color={C.green} size={19}>
                  {t}
                </Pill>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Enter>
  );
};
