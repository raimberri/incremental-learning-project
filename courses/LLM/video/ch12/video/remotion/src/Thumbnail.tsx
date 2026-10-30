import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, FONT, SHADOW } from "./theme";
import { accentColor } from "./theme";
import type { Storyboard } from "./types";
import boardData from "./data/storyboard.json";
import { HiText } from "./scenes/common";

const BOARD = boardData as Storyboard;
const COVER = BOARD.scenes.find((s) => s.type === "cover") ?? BOARD.scenes[0];

export const Thumbnail: React.FC = () => {
  const a = accentColor(COVER?.accent);
  const title = COVER?.title ?? BOARD.courseTitle;
  const size = title.length > 14 ? 76 : title.length >= 9 ? 86 : 112;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {COVER?.image ? (
        <div style={{ position: "absolute", right: 90, top: 150, width: 820, height: 700, borderRadius: 30, overflow: "hidden", boxShadow: SHADOW, rotate: "2deg", border: "8px solid #fff" }}>
          <Img src={staticFile(COVER.image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ) : (
        <div style={{ position: "absolute", right: 100, top: 170, width: 760, height: 640, borderRadius: 32, background: `radial-gradient(circle at 35% 30%, ${a}33, ${a}0d 60%, #fff 100%)`, boxShadow: SHADOW, rotate: "2deg" }} />
      )}
      <div style={{ position: "absolute", left: 100, top: 190, width: 900, fontFamily: FONT.sans }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: C.soft, letterSpacing: 2 }}>{COVER?.kicker ?? "COURSE"}</div>
        <div style={{ fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.18, marginTop: 18 }}>
          <HiText text={title} highlight={COVER?.highlight} color={a} />
        </div>
        <div style={{ marginTop: 38, display: "inline-block", padding: "14px 30px", borderRadius: 999, background: "#fff", boxShadow: SHADOW, fontSize: 32, fontWeight: 700, color: C.ink }}>
          {COVER?.subtitle ?? BOARD.chapterLabel}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          {(COVER?.pills ?? []).slice(0, 3).map((p, i) => (
            <div key={p} style={{ padding: "8px 20px", borderRadius: 999, background: i === 0 ? `${a}18` : `${C.blue}12`, color: i === 0 ? a : C.blue, fontSize: 24, fontWeight: 800 }}>{p}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
