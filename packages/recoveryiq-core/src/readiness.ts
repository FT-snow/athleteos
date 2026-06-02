import { MentalReadiness } from "./types";

export function scoreMental(mental: MentalReadiness): number {
  const motivationScore = mental.motivation * 10;
  const confidenceScore = mental.confidence * 10;
  const focusScore = mental.focus * 10;
  const invertedStress = (11 - mental.stress) * 10;

  return Math.round((motivationScore + confidenceScore + focusScore + invertedStress) / 4);
}

export function getReadinessLabel(score: number): "ready" | "caution" | "high-risk" {
  if (score >= 70) return "ready";
  if (score >= 40) return "caution";
  return "high-risk";
}
