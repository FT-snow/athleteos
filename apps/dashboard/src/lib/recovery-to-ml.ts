import type { DailyRecoveryLog } from "@recoveryiq/core";
import type { MlPredictionRequest } from "@recoveryiq/ml";

/**
 * Bridges RecoveryIQ daily log data → ML predictor feature vector.
 * Converts N days of DailyRecoveryLog into an MlPredictionRequest
 * that can be sent to the FastAPI /predict endpoint or fallbackScorer.
 *
 * @param activeInjuryCount - Optional count of current active injuries (default reads from logs)
 */
export function logsToMlRequest(
  athleteId: string,
  logs: DailyRecoveryLog[],
  currentDate: string,
  activeInjuryCount?: number
): MlPredictionRequest {
  const recentLogs = logs.filter((l) => {
    const d = new Date(l.date);
    const base = new Date(currentDate);
    base.setDate(base.getDate() - 7);
    return d >= base && d <= new Date(currentDate);
  });

  const safe = (logs: DailyRecoveryLog[], fn: (l: DailyRecoveryLog) => number) => {
    const vals = logs.map(fn).filter((n) => !isNaN(n));
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 5;
  };

  const totalSoreness = logs.reduce(
    (s, l) => s + l.soreness.reduce((ss, e) => ss + e.rating, 0),
    0
  );

  const totalSleepHours = recentLogs.reduce((s, l) => s + l.sleep.hours, 0);
  const sleepDebtHours = Math.max(0, 7 * recentLogs.length - totalSleepHours);

  // Get form score from form-iq if available in the logs
  const formScores = logs
    .map((l) => (l as any).formScore)
    .filter((v) => typeof v === "number");

  // Compute soreness trend
  const half = Math.floor(logs.length / 2);
  const recentSoreness = logs.slice(0, half).reduce((s, l) => s + l.soreness.reduce((ss, e) => ss + e.rating, 0), 0);
  const olderSoreness = logs.slice(half).reduce((s, l) => s + l.soreness.reduce((ss, e) => ss + e.rating, 0), 0);
  const sorenessTrend = recentSoreness > olderSoreness * 1.1 ? "increasing" : recentSoreness < olderSoreness * 0.9 ? "decreasing" : "stable";

  // Compute HRV trend
  const recentHr = safe(logs.slice(0, 7), (l) => l.hrv.restingHeartRate);
  const olderHr = safe(logs.slice(-7), (l) => l.hrv.restingHeartRate);
  const hrvTrend = recentHr < olderHr * 0.95 ? "improving" : recentHr > olderHr * 1.05 ? "declining" : "stable";

  // Training load trend
  const recentLoad = safe(logs.slice(0, 7), (l) => l.trainingLoad ?? 5);
  const olderLoad = safe(logs.slice(-7), (l) => l.trainingLoad ?? 5);
  const loadTrend = recentLoad > olderLoad * 1.15 ? "increasing" : recentLoad < olderLoad * 0.85 ? "decreasing" : "stable";

  return {
    athleteId,
    date: currentDate,
    features: {
      avgSleepHours: safe(recentLogs, (l) => l.sleep.hours),
      avgSleepQuality: safe(recentLogs, (l) => l.sleep.quality),
      sleepDebtHours,
      avgRestingHr: safe(recentLogs, (l) => l.hrv.restingHeartRate),
      avgMorningFeel: safe(recentLogs, (l) => l.hrv.morningFeelScore),
      hrvTrend,
      totalSorenessScore: totalSoreness,
      sorenessTrend,
      avgMotivation: safe(recentLogs, (l) => l.mental.motivation),
      avgStress: safe(recentLogs, (l) => l.mental.stress),
      avgConfidence: safe(recentLogs, (l) => l.mental.confidence),
      avgFocus: safe(recentLogs, (l) => l.mental.focus),
      avgTrainingLoad7d: safe(recentLogs, (l) => l.trainingLoad ?? 5),
      trainingLoadTrend: loadTrend,
      avgFormScore7d: formScores.length > 0 ? formScores.reduce((a, b) => a + b, 0) / formScores.length : undefined,
      activeInjuries: activeInjuryCount ?? logs.filter((l) => (l.injuryNotes?.length ?? 0) > 0).length,
      painTrend: recentSoreness > olderSoreness * 1.1 ? "worsening" : olderSoreness > recentSoreness * 1.1 ? "improving" : "stable",
    },
  };
}
