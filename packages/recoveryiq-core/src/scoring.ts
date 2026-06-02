import {
  DailyRecoveryLog,
  RecoveryScore,
  SleepScore,
} from "./types";
import { scoreSleep } from "./sleep";
import { aggregateSoreness } from "./soreness";
import { scoreHrv } from "./hrv";
import { scoreMental } from "./readiness";

function computeSleepDebt(logs: DailyRecoveryLog[]): boolean {
  if (logs.length < 3) return false;
  const recent = logs.slice(-3);
  const totalSleep = recent.reduce((sum, l) => sum + l.sleep.hours, 0);
  return totalSleep < 21;
}

function computeFatigueLevel(total: number): "low" | "moderate" | "high" | "extreme" {
  if (total > 80) return "low";
  if (total >= 60) return "moderate";
  if (total >= 40) return "high";
  return "extreme";
}

function computeTrend(current: RecoveryScore, previousLogs?: DailyRecoveryLog[]): "improving" | "stable" | "declining" {
  if (!previousLogs || previousLogs.length === 0) return "stable";

  const scores: number[] = [];
  for (const log of previousLogs) {
    const sleepScore = scoreSleep(log.sleep);
    const soreness = aggregateSoreness(log.soreness);
    const hrvScore = scoreHrv(log.hrv);
    const mentalScore = scoreMental(log.mental);
    const total = sleepScore.total + soreness.totalPenalty + hrvScore + mentalScore;
    const avg = Math.round(total / 4);
    scores.push(avg);
  }

  if (scores.length === 0) return "stable";

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const diff = current.readiness - avg;

  if (diff > 5) return "improving";
  if (diff < -5) return "declining";
  return "stable";
}

function generateRecommendation(
  score: number,
  sleepDebt: boolean,
  fatigueLevel: string,
  sorenessPenalty: number,
): string {
  if (sleepDebt) {
    return "Sleep debt accumulating. Consider rest day and prioritize early bedtime.";
  }
  if (sorenessPenalty <= -20) {
    return "High soreness detected. Active recovery recommended — light mobility or swimming.";
  }
  if (score >= 80) {
    return "High readiness. Push hard today — you're primed for performance.";
  }
  if (score >= 60) {
    return "Moderate readiness. Train with intent but monitor intensity.";
  }
  if (fatigueLevel === "extreme") {
    return "Extreme fatigue signals. Rest day strongly advised.";
  }
  return "Low readiness. Consider a lighter session or full recovery day.";
}

export function computeRecoveryScore(
  log: DailyRecoveryLog,
  previousLogs?: DailyRecoveryLog[],
): RecoveryScore {
  const sleep = scoreSleep(log.sleep);
  const soreness = aggregateSoreness(log.soreness);
  const hrvScore = scoreHrv(log.hrv);
  const mentalScore = scoreMental(log.mental);

  const baseRecovery = sleep.total + hrvScore + mentalScore;
  const rawReadiness = Math.round((baseRecovery + soreness.totalPenalty) / 3);
  const readiness = Math.max(0, Math.min(100, rawReadiness));

  const fatigueLevel = computeFatigueLevel(readiness);
  const sleepDebt = previousLogs ? computeSleepDebt(previousLogs) : false;
  const trend = computeTrend(
    { total: readiness, sleep, sorenessPenalty: soreness.totalPenalty, hrvScore, mentalScore, readiness, fatigueLevel, trend: "stable", recommendation: "" },
    previousLogs,
  );
  const recommendation = generateRecommendation(readiness, sleepDebt, fatigueLevel, soreness.totalPenalty);

  return {
    total: readiness,
    sleep,
    sorenessPenalty: soreness.totalPenalty,
    hrvScore,
    mentalScore,
    readiness,
    fatigueLevel,
    trend,
    recommendation,
  };
}
