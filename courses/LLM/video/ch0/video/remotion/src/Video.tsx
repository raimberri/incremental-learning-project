import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, interpolateColors, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Canvas, ChapterCard, Header } from "./components/Frame";
import { Subtitles } from "./components/Subtitles";
import { BridgesScene } from "./scenes/BridgesScene";
import { ErasScene } from "./scenes/ErasScene";
import { IntroScene } from "./scenes/IntroScene";
import { MapScene } from "./scenes/MapScene";
import { MethodScene } from "./scenes/MethodScene";
import { OutroScene } from "./scenes/OutroScene";
import { PatternScene } from "./scenes/PatternScene";
import { SentenceScene } from "./scenes/SentenceScene";
import { WhysScene } from "./scenes/WhysScene";
import { C } from "./theme";
import { cues, FADE, FPS, SCENES } from "./timing";

const VIEWS: Record<string, { Comp: React.FC; accent: string }> = {
  intro: { Comp: IntroScene, accent: C.orange },
  sentence: { Comp: SentenceScene, accent: C.orange },
  whys: { Comp: WhysScene, accent: C.blue },
  map: { Comp: MapScene, accent: C.green },
  eras: { Comp: ErasScene, accent: C.purple },
  pattern: { Comp: PatternScene, accent: C.teal },
  method: { Comp: MethodScene, accent: C.orange },
  bridges: { Comp: BridgesScene, accent: C.blue },
  outro: { Comp: OutroScene, accent: C.purple },
};

export type VideoProps = { showSubtitles: boolean; musicVolume: number };

// Each scene dips to the paper canvas for FADE frames at its own edges.
// There is no cross-fade between scenes, so no material can bleed through.
const Shell: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const o = Math.min(1, frame / FADE, (len - frame) / FADE);
  return <AbsoluteFill style={{ opacity: Math.max(0, o) }}>{children}</AbsoluteFill>;
};

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
      ? VIEWS[SCENES[0].id].accent
      : interpolateColors(
          frame,
          edges.flatMap((e) => [e - 10, e + 10]),
          SCENES.flatMap((s, i) =>
            i === 0 || i === SCENES.length - 1 ? [VIEWS[s.id].accent] : [VIEWS[s.id].accent, VIEWS[s.id].accent],
          ),
        );

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Canvas accent={accent} />
      {SCENES.map((s, i) => {
        const { Comp, accent: a } = VIEWS[s.id];
        const from = Math.round(s.start * FPS);
        const len = Math.round((s.end - s.start) * FPS);
        return (
          <Sequence key={s.id} name={`${s.code} ${s.id}`} from={from} durationInFrames={len}>
            <Shell len={len}>
              {i > 0 ? <ChapterCard code={s.code} zh={s.zh} en={s.en} accent={a} until={cues(s)[0] + 2} /> : null}
              <Comp />
            </Shell>
          </Sequence>
        );
      })}
      <Header index={index} accent={accent} />
      {showSubtitles ? <Subtitles /> : null}
      <Audio src={staticFile("voice.wav")} />
      <Audio src={staticFile("music.wav")} volume={musicVolume} />
    </AbsoluteFill>
  );
};
