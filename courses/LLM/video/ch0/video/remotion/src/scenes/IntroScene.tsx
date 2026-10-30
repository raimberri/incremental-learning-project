import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, Enter, Headline, Hi, Kicker, Photo, PopPill } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("intro");

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const daily = span(frame, 0, L[2] - 2, 14);
  const ask = reveal(frame, L[1] - 4, 18);
  const title = reveal(frame, L[2] - 4, 22);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: daily }}>
        <div style={{ position: "absolute", left: 140, top: 270, filter: `blur(${ask * 7}px)`, opacity: 1 - ask * 0.4 }}>
          <Enter at={2} dur={24}>
            <Photo src="img/intro-desk.jpg" w={900} h={600} position="center">
              <div style={{ position: "absolute", left: 34, top: 46 }}>
                <PopPill at={L[0] + 30} icon="?" color={C.blue}>
                  问问题
                </PopPill>
              </div>
              <div style={{ position: "absolute", right: 30, top: 232 }}>
                <PopPill at={L[0] + 52} icon="&lt;/&gt;" color={C.purple}>
                  写代码
                </PopPill>
              </div>
              <div style={{ position: "absolute", left: 96, bottom: 46 }}>
                <PopPill at={L[0] + 74} icon="✎" color={C.green}>
                  改文章
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>

        <div style={{ position: "absolute", left: 1120, top: 336, width: 660, opacity: 1 - ask }}>
          <Enter at={L[0]}>
            <Kicker color={C.orange}>EVERY DAY</Kicker>
            <Headline size={78} style={{ marginTop: 12, lineHeight: 1.18 }}>
              你每天都在
              <br />
              和它<Hi marker at={L[0] + 24}>聊天</Hi>
            </Headline>
          </Enter>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 356, display: "flex", justifyContent: "center" }}>
          <div style={{ opacity: ask, scale: interpolate(ask, [0, 1], [0.94, 1]) }}>
            <Card style={{ padding: "46px 84px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.dim, letterSpacing: 3 }}>你有没有想过</div>
              <Headline size={74} style={{ marginTop: 12 }}>
                它的内部，<Hi>到底在发生什么？</Hi>
              </Headline>
            </Card>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: title, justifyContent: "center", alignItems: "center", paddingBottom: 108 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.09, filter: "blur(1.5px)" }}>
          <Photo src="img/intro-desk.jpg" w={1920} h={1080} radius={0} from={L[2]} style={{ boxShadow: "none" }} />
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, letterSpacing: 7, color: C.orange }}>CHAPTER 00</div>
        <div style={{ fontFamily: FONT.serif, fontSize: 154, fontWeight: 700, color: C.ink, marginTop: 12, letterSpacing: 3, translate: `0px ${(1 - title) * 28}px` }}>
          大语言模型<span style={{ color: C.orange }}>导读</span>
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 32, color: C.soft, marginTop: 14, letterSpacing: 2 }}>一张能装进脑子的地图</div>
        <div style={{ display: "flex", gap: 16, marginTop: 38 }}>
          <PopPill at={L[3] + 4} icon="◎" color={C.orange} size={27}>
            第 0 章
          </PopPill>
          <PopPill at={L[3] + 14} icon="⌖" color={C.green} size={27}>
            一张地图
          </PopPill>
          <PopPill at={L[3] + 24} icon="✦" color={C.purple} size={27}>
            五个关键词
          </PopPill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
