import type { ExerciseBiomechanics, BiomechanicalCheckpoint } from "@formiq/biomechanics";
import type { BodyZone } from "@recoveryiq/core";

export const ZONE_CHECKPOINT_MAP: Record<string, RegExp[]> = {
  knees: [/knee/i, /squat/i, /leg/i, /brace/i, /track/i, /landing/i],
  shoulders: [/shoulder/i, /press/i, /overhead/i, /raise/i, /fly/i, /snap/i, /serve/i, /smash/i, /throw/i, /pitch/i, /swing/i],
  elbows: [/elbow/i, /curl/i, /tricep/i, /extension/i, /pushdown/i, /pull/i],
  back: [/spine/i, /back/i, /row/i, /hinge/i, /deadlift/i, /barbell/i, /rdl/i],
  hips: [/hip/i, /thrust/i, /bulgarian/i, /abductor/i, /adductor/i, /kick/i, /cable/i],
  ankles: [/ankle/i, /dorsiflexion/i, /plantar/i, /lunge/i, /foot/i, /strike/i],
  wrists: [/wrist/i, /grip/i, /hand/i, /pushup/i],
  neck: [/neck/i, /head/i, /chin/i, /cervical/i],
  core: [/core/i, /trunk/i, /torso/i, /spine/i, /plank/i, /twist/i, /crunch/i, /vacuum/i],
  glutes: [/glute/i, /hip thrust/i, /hip/i],
  arms: [/arm/i, /curl/i, /bicep/i, /tricep/i, /forearm/i],
  chest: [/chest/i, /pec/i, /press/i, /fly/i, /bench/i, /pushup/i],
  legs: [/leg/i, /quad/i, /hamstring/i, /calf/i, /squat/i, /lunge/i],
};

export function checkpointMatchesZone(
  checkpoint: BiomechanicalCheckpoint,
  zone: BodyZone
): boolean {
  const patterns = ZONE_CHECKPOINT_MAP[zone];
  if (!patterns) return false;
  const fields = [
    checkpoint.id,
    checkpoint.name,
    checkpoint.description,
    checkpoint.angle.joint,
    checkpoint.phase,
  ];
  return patterns.some(p => fields.some(f => p.test(f)));
}

export function getExercisesForZone(
  zone: BodyZone,
  exercises: ExerciseBiomechanics[]
): ExerciseBiomechanics[] {
  return exercises.filter(ex =>
    ex.checkpoints.some(cp => checkpointMatchesZone(cp, zone))
  );
}

function tightenRange(range: [number, number], percent: number): [number, number] {
  const [low, high] = range;
  const mid = (low + high) / 2;
  const halfWidth = (high - low) / 2;
  const newHalfWidth = halfWidth * (1 - percent / 100);
  return [mid - newHalfWidth, mid + newHalfWidth];
}

export function modifyCheckpointsForInjury(
  exercise: ExerciseBiomechanics,
  zone: BodyZone,
  severity: "mild" | "moderate" | "severe"
): ExerciseBiomechanics {
  const clone: ExerciseBiomechanics = JSON.parse(JSON.stringify(exercise));
  const prefix =
    severity === "severe"
      ? `🚨 REHAB: ${zone} injury — MODIFY OR SKIP`
      : severity === "moderate"
        ? `⚠ REHAB: ${zone} injury`
        : "";

  clone.checkpoints = clone.checkpoints.map(cp => {
    if (!checkpointMatchesZone(cp, zone)) return cp;

    if (severity === "mild") {
      cp.warningRange = tightenRange(cp.warningRange, 10);
      cp.weight = Math.min(1, cp.weight + 0.1);
    } else if (severity === "moderate") {
      cp.warningRange = tightenRange(cp.warningRange, 20);
      cp.criticalRange = tightenRange(cp.criticalRange, 15);
      cp.weight = Math.min(1, cp.weight + 0.2);
      cp.description = `${prefix} — ${cp.description}`;
    } else if (severity === "severe") {
      cp.warningRange = tightenRange(cp.warningRange, 30);
      cp.criticalRange = tightenRange(cp.criticalRange, 25);
      cp.weight = 1.0;
      cp.description = `${prefix} — ${cp.description}`;
      cp.cueCritical = "STOP — risk of reinjury";
    }

    return cp;
  });

  return clone;
}

export function getFormInjuryRiskScore(
  checkpointResults: {
    checkpoint: BiomechanicalCheckpoint;
    measuredAngle: number;
    evaluation: string;
  }[]
): {
  overallRisk: number;
  highRiskItems: { checkpointName: string; risk: number; cue: string }[];
} {
  let totalWeightedRisk = 0;
  let totalWeight = 0;
  const highRiskItems: {
    checkpointName: string;
    risk: number;
    cue: string;
  }[] = [];

  for (const result of checkpointResults) {
    const { checkpoint, measuredAngle, evaluation } = result;
    let risk: number;

    if (evaluation === "critical") {
      risk = 100;
    } else if (evaluation === "warning") {
      const [goodLow, goodHigh] = checkpoint.goodRange;
      const [critLow, critHigh] = checkpoint.criticalRange;

      if (measuredAngle < goodLow) {
        const warningPenetration = goodLow - measuredAngle;
        const totalWarningSpan = goodLow - critLow;
        risk =
          totalWarningSpan > 0
            ? 60 + 40 * Math.min(1, warningPenetration / totalWarningSpan)
            : 100;
      } else if (measuredAngle > goodHigh) {
        const warningPenetration = measuredAngle - goodHigh;
        const totalWarningSpan = critHigh - goodHigh;
        risk =
          totalWarningSpan > 0
            ? 60 + 40 * Math.min(1, warningPenetration / totalWarningSpan)
            : 100;
      } else {
        risk = 60;
      }
    } else {
      risk = 10 * (1 - checkpoint.weight);
    }

    risk = Math.max(0, Math.min(100, risk));
    totalWeightedRisk += risk * checkpoint.weight;
    totalWeight += checkpoint.weight;

    if (risk > 50) {
      highRiskItems.push({
        checkpointName: checkpoint.name,
        risk,
        cue: checkpoint.cueCritical ?? checkpoint.cueWarning ?? "",
      });
    }
  }

  highRiskItems.sort((a, b) => b.risk - a.risk);
  const overallRisk = totalWeight > 0 ? totalWeightedRisk / totalWeight : 0;

  return { overallRisk, highRiskItems };
}

export const INJURY_RISK_THRESHOLDS = {
  low: { max: 25, label: "Low risk — maintain form" },
  moderate: { max: 55, label: "Moderate risk — monitor closely" },
  high: { max: 80, label: "High risk — consider modifying exercise" },
  critical: { max: 100, label: "CRITICAL risk — stop exercise immediately" },
} as const;
