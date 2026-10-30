import React from "react";
import { Composition, Still } from "remotion";
import { H, W } from "./theme";
import { Thumbnail } from "./Thumbnail";
import { DURATION, FPS } from "./timing";
import { Video, VideoProps } from "./Video";

const defaultProps: VideoProps = { showSubtitles: true, musicVolume: 0.2 };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="CourseVideo" component={Video} durationInFrames={DURATION} fps={FPS} width={W} height={H} defaultProps={defaultProps} />
    <Still id="CourseThumbnail" component={Thumbnail} width={W} height={H} />
  </>
);
