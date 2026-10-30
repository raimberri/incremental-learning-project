import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("outro");
const A = C.green;

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const recap = span(frame, 0, L[2] - 2, 12);
  const next = span(frame, L[2] - 2, L[4] - 2, 12);
  const end = reveal(frame, L[4] - 2, 18);

  return (
    <AbsoluteFill>
      {/* ── recap ── */}
      <AbsoluteFill style={{ opacity: recap }}>
        <Top at={L[0]} kicker="RECAP" color={A}>
          这一章，我们有了<Hi color={A} marker at={L[0] + 18}>发动机</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
          <Enter at={L[0]}>
            <Photo src="img/cover.jpg" w={700} h={500} from={L[0]} />
          </Enter>
          <Enter at={L[0] + 8}>
            <Card style={{ width: 900, height: 500, padding: "38px 44px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>THE ENGINE</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 40, color: C.ink, marginTop: 14 }}>θ ← θ − η ∇L(θ)</div>
              <div style={{ height: 1.5, background: C.line, margin: "24px 0" }} />
              {[
                ["梯度", "指向最陡的上坡，取负号下山"],
                ["学习率", "决定每一步信这个方向多少"],
                ["反向传播", "一次反向遍历，拿到所有梯度"],
                ["四件套", "Adam · Dropout · 归一化 · 残差"],
              ].map(([t, s], k) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, opacity: reveal(frame, L[1] + k * 8, 14) }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: A }} />
                  <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, color: C.ink, width: 160 }}>{t}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 24, color: C.soft }}>{s}</div>
                </div>
              ))}
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── next chapter ── */}
      <AbsoluteFill style={{ opacity: next }}>
        <Top at={L[2]} kicker="NEXT" color={C.blue}>
          还有一个空白：<Hi color={C.blue} marker at={L[2] + 22}>词怎么变成数字</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 340, display: "flex", gap: 36 }}>
          <Enter at={L[2] - 2}>
            <Card style={{ width: 1000, height: 470, padding: "44px 50px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.blue, letterSpacing: 3 }}>CHAPTER 03</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 76, fontWeight: 800, color: C.ink, marginTop: 8 }}>表示学习</div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 30 }}>
                <Pill icon="▦" color={C.dim} size={24}>one-hot</Pill>
                <span style={{ fontFamily: FONT.sans, fontSize: 28, color: C.dim }}>→</span>
                <Pill icon="◈" color={C.blue} solid size={24}>word2vec</Pill>
              </div>
              <div style={{ fontFamily: FONT.sans, fontSize: 27, color: C.soft, marginTop: 30, lineHeight: 1.6 }}>
                从「每个词一个编号」
                <br />
                到「每个词一个坐标」
              </div>
            </Card>
          </Enter>
          <Enter at={L[3] - 2}>
            <Card accent={C.blue} style={{ width: 640, height: 470, padding: "40px 44px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.blue, letterSpacing: 2 }}>THE MOTTO</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 42, fontWeight: 800, color: C.ink, marginTop: 16, lineHeight: 1.55 }}>
                观其伴
                <br />
                知其义
              </div>
              <div style={{ height: 1.5, background: C.line, margin: "22px 0" }} />
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft, lineHeight: 1.55 }}>
                You shall know a word
                <br />
                by the company it keeps.
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── end card ── */}
      <AbsoluteFill style={{ opacity: end, justifyContent: "center", alignItems: "center", paddingBottom: 110 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 800, letterSpacing: 7, color: A }}>CHAPTER 02</div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 128,
            fontWeight: 800,
            color: C.ink,
            marginTop: 10,
            translate: `0px ${interpolate(end, [0, 1], [24, 0])}px`,
          }}
        >
          梯度与<span style={{ color: A }}>反向传播</span>
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 32, color: C.soft, marginTop: 8 }}>引擎已经点火，接下来给它装上语言</div>
        <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
          <PopPill at={L[4] + 12} icon="▶" color={A} size={28}>下期见</PopPill>
          <PopPill at={L[4] + 24} icon="★" color={C.orange} size={28}>See you next time</PopPill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
