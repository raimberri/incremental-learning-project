import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, interpolateColors, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Canvas, ChapterCard, Header } from "./components/Frame";
import { Subtitles } from "./components/Subtitles";
import { AliasesScene } from "./scenes/AliasesScene";
import { BackpropScene } from "./scenes/BackpropScene";
import { GradientScene } from "./scenes/GradientScene";
import { HandCalcScene } from "./scenes/HandCalcScene";
import { IntroScene } from "./scenes/IntroScene";
import { LearningRateScene } from "./scenes/LearningRateScene";
import { OutroScene } from "./scenes/OutroScene";
import { OverfitScene } from "./scenes/OverfitScene";
import { SgdScene } from "./scenes/SgdScene";
import { TricksScene } from "./scenes/TricksScene";
import { C } from "./theme";
import { cues, FPS, SCENES } from "./timing";

const VIEWS: Record<string, { Comp: React.FC; accent: string }> = {
  intro: { Comp: IntroScene, accent: C.orange },
  gradient: { Comp: GradientScene, accent: C.blue },
  learningrate: { Comp: LearningRateScene, accent: C.teal },
  sgd: { Comp: SgdScene, accent: C.green },
  backprop: { Comp: BackpropScene, accent: C.purple },
  handcalc: { Comp: HandCalcScene, accent: C.orange },
  aliases: { Comp: AliasesScene, accent: C.teal },
  tricks: { Comp: TricksScene, accent: C.blue },
  overfit: { Comp: OverfitScene, accent: C.red },
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
