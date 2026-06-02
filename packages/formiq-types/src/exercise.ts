import type { BodySide } from "./landmarks";
import type { ExerciseKind } from "./metrics";

export interface SmoothingConfig {
  alpha?: number;
  minCutoff?: number;
  beta?: number;
  dCutoff?: number;
}

export interface RepThresholds {
  startAngleDeg: number;
  bottomAngleDeg: number;
  lockoutAngleDeg: number;
  minRangeOfMotionDeg: number;
  minRepDurationMs: number;
  maxRepDurationMs: number;
}

export interface FatigueConfig {
  warmupRepCount: number;
  rollingWindow: number;
  scoreDropThreshold: number;
  romDropThresholdDeg: number;
  tempoSlowdownRatio: number;
}

export interface ExerciseConfig {
  exercise: ExerciseKind;
  trackedSide?: BodySide | "auto";
  primaryAngleJoint: "knee" | "elbow";
  smoothing: SmoothingConfig;
  thresholds: RepThresholds;
  fatigue: FatigueConfig;
}
