import type { ExerciseConfig } from "./exercise";
import type { FrameMetrics, RepMetrics, RepPhase, SessionSummary } from "./metrics";

export interface CoachingInput {
  config: ExerciseConfig;
  phase: RepPhase;
  currentFrame: FrameMetrics;
  recentRep?: RepMetrics;
  summary?: SessionSummary;
}

export interface CoachingCue {
  key: string;
  severity: "info" | "warning" | "success";
  message: string;
}

export interface CoachingOutput {
  cues: CoachingCue[];
  headline?: string;
}
