import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, interpolateColors, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Canvas, ChapterCard, Header } from "./components/Frame";
import { Subtitles } from "./components/Subtitles";
import { SceneRenderer } from "./scenes/SceneRenderer";
import { accentColor, C } from "./theme";
import { cues, FPS, SCENES } from "./timing";
import type { BoardScene, Storyboard } from "./types";
import boardData from "./data/storyboard.json";

const BOARD = boardData as Storyboard;
const BY_ID = new Map<string, BoardScene>(BOARD.scenes.map((s) => [s.id, s]));

export type VideoProps = { showSubtitles: boolean; musicVolume: number };

const Shell: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const fade = 8;
  const o = Math.min(1, frame / fade, (len - frame) / fade);
  return <AbsoluteFill style={{ opacity: Math.max(0, o) }}>{children}</AbsoluteFill>;
};

const sceneAccent = (id: string) => accentColor(BY_ID.get(id)?.accent);

export const Video: React.FC<VideoProps> = ({ showSubtitles, musicVolume }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  let index = 0;
  SCENES.forEach((s, i) => {
    if (t >= s.start) index = i;
  });

  const edges = SCENES.slice(1).map((s) => s.start * FPS);
  const accent =
    SCENES.length === 1
      ? sceneAccent(SCENES[0].id)
      : interpolateColors(
          frame,
          edges.flatMap((e) => [e - 10, e + 10]),
          SCENES.flatMap((s, i) => (i === 0 || i === SCENES.length - 1 ? [sceneAccent(s.id)] : [sceneAccent(s.id), sceneAccent(s.id)])),
        );

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Canvas accent={accent} />
      {SCENES.map((s, i) => {
        const data: BoardScene = BY_ID.get(s.id) ?? { id: s.id, type: "cover", title: s.zh };
        const from = Math.round(s.start * FPS);
        const len = Math.round((s.end - s.start) * FPS);
        return (
          <Sequence key={s.id} name={`${s.code} ${s.id}`} from={from} durationInFrames={len}>
            <Shell len={len}>
              {i > 0 ? <ChapterCard code={s.code} zh={s.zh} en={s.en} accent={accentColor(data.accent)} until={cues(s)[0] + 2} /> : null}
              <SceneRenderer data={data} timing={s} />
            </Shell>
          </Sequence>
        );
      })}
      <Header index={index} accent={accent} courseTitle={BOARD.courseTitle} chapterLabel={BOARD.chapterLabel} />
      {showSubtitles ? <Subtitles /> : null}
      <Audio src={staticFile("voice.wav")} />
      <Audio src={staticFile("music.wav")} volume={musicVolume} />
    </AbsoluteFill>
  );
};
