import type { ExerciseConfig } from "@formiq/types";

export const SQUAT_DEFAULTS: ExerciseConfig = {
  exercise: "squat",
  trackedSide: "auto",
  primaryAngleJoint: "knee",
  smoothing: {
    alpha: 0.35,
    minCutoff: 1,
    beta: 0.02,
    dCutoff: 1,
  },
  thresholds: {
    startAngleDeg: 155,
    bottomAngleDeg: 95,
    lockoutAngleDeg: 165,
    minRangeOfMotionDeg: 55,
    minRepDurationMs: 900,
    maxRepDurationMs: 8000,
  },
  fatigue: {
    warmupRepCount: 3,
    rollingWindow: 3,
    scoreDropThreshold: 12,
    romDropThresholdDeg: 8,
    tempoSlowdownRatio: 0.2,
  },
};

export const PUSHUP_DEFAULTS: ExerciseConfig = {
  exercise: "pushup",
  trackedSide: "auto",
  primaryAngleJoint: "elbow",
  smoothing: {
    alpha: 0.3,
    minCutoff: 1,
    beta: 0.015,
    dCutoff: 1,
  },
  thresholds: {
    startAngleDeg: 150,
    bottomAngleDeg: 85,
    lockoutAngleDeg: 165,
    minRangeOfMotionDeg: 60,
    minRepDurationMs: 700,
    maxRepDurationMs: 6000,
  },
  fatigue: {
    warmupRepCount: 3,
    rollingWindow: 3,
    scoreDropThreshold: 10,
    romDropThresholdDeg: 6,
    tempoSlowdownRatio: 0.18,
  },
};

export const EXERCISE_DEFAULTS = {
  squat: SQUAT_DEFAULTS,
  pushup: PUSHUP_DEFAULTS,
} as const;
