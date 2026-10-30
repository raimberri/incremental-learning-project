import React from "react";
import type { SceneProps } from "../types";
import { BulletsScene } from "./BulletsScene";
import { CompareScene } from "./CompareScene";
import { CoverScene } from "./CoverScene";
import { CurveScene } from "./CurveScene";
import { FormulaScene } from "./FormulaScene";
import { OutroScene } from "./OutroScene";
import { PhotoScene } from "./PhotoScene";
import { StepsScene } from "./StepsScene";
import { TimelineScene } from "./TimelineScene";

export const SceneRenderer: React.FC<SceneProps> = (props) => {
  switch (props.data.type) {
    case "cover":
      return <CoverScene {...props} />;
    case "bullets":
      return <BulletsScene {...props} />;
    case "formula":
      return <FormulaScene {...props} />;
    case "curve":
      return <CurveScene {...props} />;
    case "compare":
      return <CompareScene {...props} />;
    case "steps":
      return <StepsScene {...props} />;
    case "photo":
      return <PhotoScene {...props} />;
    case "timeline":
      return <TimelineScene {...props} />;
    case "outro":
      return <OutroScene {...props} />;
    default:
      return <CoverScene {...props} />;
  }
};
