import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Hi, Pill, Thumb, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById } from "../timing";

const scene = sceneById("map");
const A = C.green;

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zh: string;
  sub: string;
  ref: string;
  img: string;
  c: string;
  key: boolean;
};

const OBJ: Node = { id: "obj", x: 140, y: 452, w: 300, h: 208, zh: "预测", sub: "下一个词", ref: "目标", img: "img/umbrella.jpg", c: C.orange, key: true };
const MODS: Node[] = [
  { id: "m0", zh: "表示", sub: "词 → 向量", ref: "§3", img: "img/era-neural.jpg", c: C.blue, key: true },
  { id: "m1", zh: "架构", sub: "Transformer", ref: "§5", img: "img/era-transformer.jpg", c: C.purple, key: true },
  { id: "m2", zh: "数据", sub: "互联网文本", ref: "§6", img: "img/library.jpg", c: C.soft, key: false },
  { id: "m3", zh: "规模", sub: "缩放定律", ref: "§7", img: "img/era-scale.jpg", c: C.orange, key: true },
  { id: "m4", zh: "对齐", sub: "人类偏好", ref: "§8", img: "img/era-alignment.jpg", c: C.green, key: true },
].map((m, i) => ({ ...m, x: 560, y: 280 + i * 118, w: 430, h: 100 }));

const right = (n: Node) => ({ x: n.x + n.w, y: n.y + n.h / 2 });
const left = (n: Node) => ({ x: n.x, y: n.y + n.h / 2 });
const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
};

export const MapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const shown: Record<string, number> = { obj: L[0] + 8 };
  MODS.forEach((m, i) => (shown[m.id] = L[1] + 10 + i * 10));
  const focus = reveal(frame, L[7] - 6, 24);

  const wires = MODS.map((m) => ({ d: curve(right(OBJ), left(m)), at: shown[m.id], key: m.key }));
  const keyNodes = [OBJ, ...MODS.filter((m) => m.key)];

  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker="THE MAP" color={A}>
        把整门课，摊成<Hi color={A} marker at={L[0] + 30}>一张地图</Hi>
      </Top>

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {wires.map((w, i) => {
          const p = reveal(frame, w.at - 6, 26);
          return (
            <g key={i} opacity={w.key ? 1 : 1 - 0.8 * focus}>
              <path d={w.d} fill="none" stroke="#c9ccd2" strokeWidth={2.5} pathLength={1} strokeDasharray={`${p} 1`} />
              {p >= 1 ? (
                <path
                  d={w.d}
                  fill="none"
                  stroke={w.key ? A : C.dim}
                  strokeWidth={4}
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="2 98"
                  strokeDashoffset={-((frame * 0.8 + i * 13) % 100)}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {[OBJ, ...MODS].map((n) => {
        const v = reveal(frame, shown[n.id], 18);
        const dim = n.key ? 0 : focus;
        const lit = n.key ? focus : 0;
        return (
          <div
            key={n.id}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              width: n.w,
              opacity: v * (1 - 0.75 * dim),
              scale: (n.id === "obj" ? 1 : 1) * (1 + lit * 0.035),
            }}
          >
            <Card accent={lit > 0.5 ? n.c : undefined} style={{ height: n.h, padding: n.id === "obj" ? "22px 24px" : "14px 20px", borderRadius: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Thumb src={n.img} size={n.id === "obj" ? 82 : 62} accent={lit > 0.5 ? n.c : "#fff"} />
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: FONT.serif, fontSize: n.id === "obj" ? 52 : 34, fontWeight: 700, color: C.ink, whiteSpace: "nowrap" }}>{n.zh}</span>
                    <span style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, color: n.c }}>{n.ref}</span>
                  </div>
                  <div style={{ fontFamily: FONT.sans, fontSize: n.id === "obj" ? 24 : 19, color: C.soft, marginTop: 2 }}>{n.sub}</div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}

      <div style={{ position: "absolute", left: 1090, top: 360, width: 700, opacity: reveal(frame, L[2], 16), translate: `${(1 - focus) * 0}px 0px` }}>
        <Card accent={focus > 0.5 ? A : undefined} style={{ padding: "32px 38px" }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, letterSpacing: 3, color: C.dim }}>REMEMBER</div>
          <div style={{ fontFamily: FONT.serif, fontSize: 48, fontWeight: 700, color: C.ink, marginTop: 8 }}>只记五个词</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            {keyNodes.map((n, i) => (
              <div key={n.id} style={{ opacity: reveal(frame, L[2] + 6 + i * 8, 12) }}>
                <Pill color={n.c} solid size={27}>
                  {n.zh}
                </Pill>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: FONT.sans, fontSize: 27, fontWeight: 600, color: C.ink, marginTop: 26 }}>
            其余内容 = 它们之间的<Hi color={A}>连线</Hi>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
