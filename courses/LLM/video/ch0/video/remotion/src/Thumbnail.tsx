import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, FONT, SHADOW } from "./theme";

export const Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 55% 50% at 78% 18%, ${C.orange}14, transparent 70%),
            radial-gradient(ellipse 40% 40% at 8% 90%, ${C.blue}0d, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 84,
          top: 132,
          width: 840,
          height: 720,
          borderRadius: 30,
          overflow: "hidden",
          boxShadow: SHADOW,
          rotate: "1.6deg",
          border: "9px solid #fffdf8",
        }}
      >
        <Img src={staticFile("img/intro-desk.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", left: 104, top: 170, width: 1000, fontFamily: FONT.sans }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 7, color: C.orange }}>CHAPTER 00</div>
        <div style={{ fontFamily: FONT.serif, fontSize: 116, fontWeight: 700, color: C.ink, lineHeight: 1.08, marginTop: 14 }}>
          大语言模型
          <br />
          <span style={{ color: C.orange }}>导读</span>
        </div>
        <div style={{ marginTop: 36, display: "inline-block", padding: "14px 30px", borderRadius: 999, background: "#fffdf8", boxShadow: SHADOW, fontSize: 31, fontWeight: 700, color: C.ink }}>
          一张能装进脑子的地图
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          {["第 0 章", "七十年", "五个关键词"].map((p, i) => (
            <div
              key={p}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                background: i === 0 ? `${C.orange}18` : `${C.blue}12`,
                color: i === 0 ? C.orange : C.blue,
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
