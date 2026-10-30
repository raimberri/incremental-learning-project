import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, interpolateColors, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Canvas, ChapterCard, Header } from "./components/Frame";
import { Subtitles } from "./components/Subtitles";
import { ChainScene } from "./scenes/ChainScene";
import { CrossEntropyScene } from "./scenes/CrossEntropyScene";
import { DecodingScene } from "./scenes/DecodingScene";
import { GenerationsScene } from "./scenes/GenerationsScene";
import { IntroScene } from "./scenes/IntroScene";
import { LimitsScene } from "./scenes/LimitsScene";
import { MachineScene } from "./scenes/MachineScene";
import { OutroScene } from "./scenes/OutroScene";
import { SurpriseScene } from "./scenes/SurpriseScene";
import { TrainingScene } from "./scenes/TrainingScene";
import { C } from "./theme";
import { cues, FPS, SCENES } from "./timing";

const VIEWS: Record<string, { Comp: React.FC; accent: string }> = {
  intro: { Comp: IntroScene, accent: C.orange },
  machine: { Comp: MachineScene, accent: C.blue },
  chain: { Comp: ChainScene, accent: C.teal },
  generations: { Comp: GenerationsScene, accent: C.purple },
  surprise: { Comp: SurpriseScene, accent: C.green },
  crossentropy: { Comp: CrossEntropyScene, accent: C.orange },
  training: { Comp: TrainingScene, accent: C.blue },
  decoding: { Comp: DecodingScene, accent: C.purple },
  limits: { Comp: LimitsScene, accent: C.teal },
  outro: { Comp: OutroScene, accent: C.green },
};

export type VideoProps = { showSubtitles: boolean; musicVolume: number };

// Each scene fades to the canvas for a few frames at its own edges. Scenes are
// contiguous, so the old chapter is gone before the next chapter card appears.
const Shell: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const fade = 8;
  const o = Math.min(1, frame / fade, (len - frame) / fade);
  return <AbsoluteFill style={{ opacity: Math.max(0, o) }}>{children}</AbsoluteFill>;
};

export const Video: React.FC<VideoProps> = ({ showSubtitles, musicVolume }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  let index = 0;
  SCENES.forEach((s, i) => {
    if (t >= s.start) index = i;
  });

  // Blend accent colours across each chapter boundary.
  const edges = SCENES.slice(1).map((s) => s.start * FPS);
  const accent = interpolateColors(
    frame,
    edges.flatMap((e) => [e - 10, e + 10]),
    SCENES.flatMap((s, i) => (i === 0 || i === SCENES.length - 1 ? [VIEWS[s.id].accent] : [VIEWS[s.id].accent, VIEWS[s.id].accent])),
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
