import type { BiomechanicalCheckpoint } from "@formiq/biomechanics";
import { evaluateCheckpoint } from "@formiq/biomechanics";
import { clamp } from "./angle";

export interface CheckpointRiskResult {
  checkpointId: string;
  checkpointName: string;
  measuredAngle: number;
  evaluation: "good" | "warning" | "critical";
  riskScore: number;
  proximityToCritical: number;
  cue: string;
}

export function analyzeCheckpointRisk(
  checkpoint: BiomechanicalCheckpoint,
  measuredAngle: number,
): CheckpointRiskResult {
  const evaluation = evaluateCheckpoint(checkpoint, measuredAngle);

  if (evaluation === "critical") {
    return {
      checkpointId: checkpoint.id,
      checkpointName: checkpoint.name,
      measuredAngle,
      evaluation,
      riskScore: 100,
      proximityToCritical: 1,
      cue: checkpoint.cueCritical ?? "CRITICAL form error — high injury risk",
    };
  }

  if (evaluation === "warning") {
    const isLowSide = measuredAngle < checkpoint.goodRange[0];
    const criticalBoundary = isLowSide
      ? checkpoint.criticalRange[1]
      : checkpoint.criticalRange[0];
    const warningBoundary = isLowSide
      ? checkpoint.warningRange[1]
      : checkpoint.warningRange[0];
    const distanceToCritical = Math.abs(measuredAngle - criticalBoundary);
    const totalDistance = Math.abs(warningBoundary - criticalBoundary);
    const proximityToCritical =
      totalDistance === 0 ? 1 : 1 - distanceToCritical / totalDistance;
    const riskScore = 60 + 40 * proximityToCritical;

    return {
      checkpointId: checkpoint.id,
      checkpointName: checkpoint.name,
      measuredAngle,
      evaluation,
      riskScore,
      proximityToCritical,
      cue: checkpoint.cueWarning ?? "Form deviation — moderate injury risk",
    };
  }

  return {
    checkpointId: checkpoint.id,
    checkpointName: checkpoint.name,
    measuredAngle,
    evaluation,
    riskScore: clamp((1 - checkpoint.weight) * 15, 0, 15),
    proximityToCritical: 0,
    cue: checkpoint.cueGood ?? "Good form",
  };
}

export function analyzeFormInjuryRisk(
  results: CheckpointRiskResult[],
): FormInjuryRiskReport {
  const totalWeight = results.reduce(
    (sum, r) => sum + (r.riskScore * r.riskScore) / 100,
    0,
  );
  const divisor = results.reduce(
    (sum, r) => sum + r.riskScore / 100,
    0,
  );
  const overallRiskScore = divisor === 0 ? 0 : totalWeight / divisor;

  let overallRiskLevel: "low" | "moderate" | "high" | "critical";
  if (overallRiskScore <= 25) overallRiskLevel = "low";
  else if (overallRiskScore <= 55) overallRiskLevel = "moderate";
  else if (overallRiskScore <= 80) overallRiskLevel = "high";
  else overallRiskLevel = "critical";

  const highRiskCheckpoints = results
    .filter((r) => r.riskScore > 50)
    .sort((a, b) => b.riskScore - a.riskScore);

  const primaryContributor =
    results.length === 0
      ? null
      : results.reduce((best, r) => (r.riskScore > best.riskScore ? r : best));

  const recommendation = (() => {
    switch (overallRiskLevel) {
      case "critical":
        return "STOP. Multiple high-risk form errors detected. Risk of injury imminent.";
      case "high":
        return "Significant form breakdown detected. Reduce load and focus on technique.";
      case "moderate":
        return "Form deviations detected. Monitor closely and consider feedback.";
      case "low":
        return "Form looks good. Maintain current intensity.";
    }
  })();

  return {
    overallRiskScore: Math.round(overallRiskScore * 100) / 100,
    overallRiskLevel,
    highRiskCheckpoints,
    primaryContributor,
    recommendation,
  };
}

export function computeZoneRiskFromCheckpoints(
  results: CheckpointRiskResult[],
  zoneKeywords: string[],
): { zoneRisk: number; contributingCheckpoints: CheckpointRiskResult[] } {
  const lowerKeywords = zoneKeywords.map((k) => k.toLowerCase());

  const contributing = results.filter((r) => {
    const name = r.checkpointName.toLowerCase();
    if (lowerKeywords.some((kw) => name.includes(kw))) return true;
    return false;
  });

  if (contributing.length === 0) {
    return { zoneRisk: 0, contributingCheckpoints: [] };
  }

  const totalRisk = contributing.reduce((sum, r) => sum + r.riskScore, 0);
  return {
    zoneRisk: totalRisk / contributing.length,
    contributingCheckpoints: contributing,
  };
}

export interface FormInjuryRiskReport {
  overallRiskScore: number;
  overallRiskLevel: "low" | "moderate" | "high" | "critical";
  highRiskCheckpoints: CheckpointRiskResult[];
  primaryContributor: CheckpointRiskResult | null;
  recommendation: string;
}
