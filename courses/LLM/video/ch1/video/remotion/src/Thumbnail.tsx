import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, FONT, SHADOW } from "./theme";

// Cover image for the upload.
export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <div
      style={{
        position: "absolute",
        right: 80,
        top: 150,
        width: 820,
        height: 700,
        borderRadius: 30,
        overflow: "hidden",
        boxShadow: SHADOW,
        rotate: "2deg",
        border: `8px solid #fff`,
      }}
    >
      <Img src={staticFile("img/cover.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ position: "absolute", left: 100, top: 190, fontFamily: FONT.sans, width: 900 }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: C.soft }}>
        一期 <span style={{ color: C.blue, background: `${C.blue}18`, padding: "2px 14px", borderRadius: 12 }}>只讲一件事</span> 的
      </div>
      <div style={{ fontSize: 76, fontWeight: 800, color: C.ink, marginTop: 20 }}>大语言模型</div>
      <div style={{ fontSize: 136, fontWeight: 800, color: C.ink, lineHeight: 1.12, marginTop: 4 }}>
        语言的
        <br />
        <span style={{ color: C.blue }}>概率论</span>
      </div>
      <div
        style={{
          marginTop: 38,
          display: "inline-block",
          padding: "14px 30px",
          borderRadius: 999,
          background: "#fff",
          boxShadow: SHADOW,
          fontSize: 34,
          fontWeight: 700,
          color: C.ink,
        }}
      >
        从「猜下一个词」开始
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
        {[
          ["第 1 章", C.blue],
          ["交叉熵", C.orange],
          ["困惑度", C.teal],
        ].map(([t, c]) => (
          <div key={t} style={{ padding: "8px 20px", borderRadius: 999, background: `${c}14`, color: c, fontSize: 24, fontWeight: 800 }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);
