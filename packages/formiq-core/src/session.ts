import type { FatigueConfig, RepMetrics, SessionSummary } from "@formiq/types";
import { detectFatigueOnset } from "./fatigue";

function average(values: number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function summarizeSession(
  reps: RepMetrics[],
  fatigueConfig: FatigueConfig,
): SessionSummary {
  const validReps = reps.filter((rep) => rep.valid);
  const startedAtMs = reps[0]?.startedAtMs;
  const endedAtMs = reps[reps.length - 1]?.endedAtMs;
  const durationMs = startedAtMs !== undefined && endedAtMs !== undefined ? endedAtMs - startedAtMs : 0;

  return {
    exercise: reps[0]?.exercise ?? "squat",
    totalReps: reps.length,
    validReps: validReps.length,
    invalidReps: reps.length - validReps.length,
    averageScore: average(reps.map((rep) => rep.score)),
    bestScore: reps.length ? Math.max(...reps.map((rep) => rep.score)) : 0,
    worstScore: reps.length ? Math.min(...reps.map((rep) => rep.score)) : 0,
    averageRangeOfMotionDeg: average(reps.map((rep) => rep.rangeOfMotionDeg)),
    averageRepDurationMs: average(reps.map((rep) => rep.durationMs)),
    cadenceRpm: durationMs > 0 ? (reps.length / durationMs) * 60000 : 0,
    startedAtMs,
    endedAtMs,
    durationMs,
    fatigue: detectFatigueOnset(reps, fatigueConfig),
  };
}
