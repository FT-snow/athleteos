import type { ExerciseConfig, RepMetrics } from "@formiq/types";
import { clamp, rangeOfMotion } from "./angle";

export interface RepScoreInput {
  exercise: RepMetrics["exercise"];
  side: RepMetrics["side"];
  repIndex: number;
  startedAtMs: number;
  endedAtMs: number;
  minAngleDeg: number;
  maxAngleDeg: number;
  bottomTimestampMs?: number;
  config: ExerciseConfig;
}

export function scoreRep(input: RepScoreInput): RepMetrics {
  const durationMs = Math.max(0, input.endedAtMs - input.startedAtMs);
  const eccentricDurationMs = input.bottomTimestampMs
    ? Math.max(0, input.bottomTimestampMs - input.startedAtMs)
    : undefined;
  const concentricDurationMs = input.bottomTimestampMs
    ? Math.max(0, input.endedAtMs - input.bottomTimestampMs)
    : undefined;
  const rom = rangeOfMotion(input.minAngleDeg, input.maxAngleDeg);
  const depthScore = clamp(rom / input.config.thresholds.minRangeOfMotionDeg, 0, 1) * 100;
  const targetDuration =
    (input.config.thresholds.minRepDurationMs + input.config.thresholds.maxRepDurationMs) / 2;
  const tempoScore =
    100 -
    clamp(Math.abs(durationMs - targetDuration) / Math.max(targetDuration, 1), 0, 1) * 100;
  const splitDelta =
    eccentricDurationMs && concentricDurationMs
      ? Math.abs(eccentricDurationMs - concentricDurationMs) /
        Math.max(eccentricDurationMs, concentricDurationMs, 1)
      : 0;
  const consistencyScore = (1 - clamp(splitDelta, 0, 1)) * 100;
  const score = depthScore * 0.5 + tempoScore * 0.25 + consistencyScore * 0.25;
  const valid =
    durationMs >= input.config.thresholds.minRepDurationMs &&
    durationMs <= input.config.thresholds.maxRepDurationMs &&
    rom >= input.config.thresholds.minRangeOfMotionDeg;

  return {
    repIndex: input.repIndex,
    exercise: input.exercise,
    side: input.side,
    startedAtMs: input.startedAtMs,
    endedAtMs: input.endedAtMs,
    durationMs,
    eccentricDurationMs,
    concentricDurationMs,
    minAngleDeg: input.minAngleDeg,
    maxAngleDeg: input.maxAngleDeg,
    rangeOfMotionDeg: rom,
    depthScore,
    tempoScore,
    consistencyScore,
    score,
    valid,
  };
}
