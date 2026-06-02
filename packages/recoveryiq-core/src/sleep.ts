import { SleepLog, SleepScore } from "./types";

function scoreHours(hours: number): number {
  if (hours >= 7.5 && hours <= 8.5) return 100;
  if (hours >= 7 && hours < 7.5) return 80;
  if (hours >= 6 && hours < 7) return 60;
  if (hours >= 5 && hours < 6) return 30;
  if (hours < 5) return 20;
  if (hours > 8.5 && hours <= 9) return 80;
  if (hours > 9) return 60;
  return 50;
}

function scoreQuality(quality: number): number {
  return Math.min(quality * 10, 100);
}

function scoreContinuity(wakeUps: number): number {
  if (wakeUps === 0) return 100;
  if (wakeUps === 1) return 80;
  if (wakeUps === 2) return 60;
  return 30;
}

function scoreMorningEnergy(energy: number): number {
  return Math.min(energy * 10, 100);
}

function buildBreakdown(log: SleepLog): string {
  const parts: string[] = [];
  if (log.hours < 7) parts.push("Below optimal sleep duration");
  else if (log.hours > 9) parts.push("Oversleeping may indicate recovery need");
  else parts.push("Good sleep duration");

  if (log.quality < 5) parts.push("Low sleep quality reported");
  else if (log.quality >= 8) parts.push("High sleep quality");

  if (log.wakeUps > 2) parts.push("Frequent disruptions to sleep continuity");
  else if (log.wakeUps === 0) parts.push("Uninterrupted sleep");

  if (log.morningEnergy < 5) parts.push("Low morning energy levels");
  else if (log.morningEnergy >= 8) parts.push("High morning energy");

  return parts.join(". ") + ".";
}

export function scoreSleep(log: SleepLog): SleepScore {
  const hoursScore = scoreHours(log.hours);
  const qualityScore = scoreQuality(log.quality);
  const continuityScore = scoreContinuity(log.wakeUps);
  const morningEnergyScore = scoreMorningEnergy(log.morningEnergy);

  const total = Math.round(
    hoursScore * 0.3 +
    qualityScore * 0.3 +
    continuityScore * 0.2 +
    morningEnergyScore * 0.2
  );

  return {
    total,
    hoursScore,
    qualityScore,
    continuityScore,
    morningEnergyScore,
    breakdown: buildBreakdown(log),
  };
}
