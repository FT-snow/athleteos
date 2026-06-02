import { HrvProxy } from "./types";

function scoreRestingHr(hr: number): number {
  if (hr < 55) return 90;
  if (hr <= 60) return 80;
  if (hr <= 65) return 70;
  if (hr <= 70) return 60;
  if (hr <= 75) return 40;
  return 20;
}

function scoreMorningFeel(feel: number): number {
  return Math.min(feel * 10, 100);
}

export function scoreHrv(proxy: HrvProxy): number {
  const hrScore = scoreRestingHr(proxy.restingHeartRate);
  const feelScore = scoreMorningFeel(proxy.morningFeelScore);
  return Math.round(hrScore * 0.4 + feelScore * 0.6);
}

export function compareToBaseline(current: HrvProxy, baseline: HrvProxy): { trend: string; change: number } {
  const currentScore = scoreHrv(current);
  const baselineScore = scoreHrv(baseline);
  const change = currentScore - baselineScore;

  let trend: string;
  if (Math.abs(change) <= 5) trend = "stable";
  else if (change > 0) trend = "improving";
  else trend = "declining";

  return { trend, change };
}
