import type {
  ReturnToPlayAssessment,
  RehabProgressEntry,
  InjuryRecord,
  RehabPhase,
  BodyZone,
  InjuryProtocol,
} from "./types";
import { protocolLibrary } from "./protocols";
import { calculateComplianceRate, getPainTrend } from "./progress";

export function assessReturnToPlay(
  injury: InjuryRecord,
  progress: RehabProgressEntry[],
  _sport: string
): ReturnToPlayAssessment {
  const protocol = protocolLibrary.get(injury.protocolId);
  if (!protocol) {
    return {
      ready: false,
      score: 0,
      criteriaResults: [],
      riskOfReinjury: "high",
      recommendations: ["Protocol not found for injury"],
    };
  }

  if (progress.length === 0) {
    return {
      ready: false,
      score: 0,
      criteriaResults: protocol.returnCriteria.map((c) => ({
        criterion: c,
        met: false,
        details: "No progress data available",
      })),
      riskOfReinjury: "high",
      recommendations: [
        "Begin rehabilitation before return-to-play assessment",
      ],
    };
  }

  const sorted = [...progress].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const latest = sorted[sorted.length - 1];

  const allPhases: RehabPhase[] = [
    "acute",
    "subacute",
    "rehab",
    "strength",
    "return-to-sport",
  ];
  const completedPhases = new Set(progress.map((e) => e.phase));
  const allPhasesCompleted = allPhases.every((p) => completedPhases.has(p));

  const criteriaResults = protocol.returnCriteria.map((criterion) => {
    let met = false;
    let details = "";

    if (criterion.includes("Pain free")) {
      const last3 = sorted.slice(-3);
      const allLowPain = last3.length >= 3 && last3.every((e) => e.painLevel < 3);
      met = allLowPain;
      details = allLowPain
        ? "Last 3 entries show pain below 3"
        : "Pain level too high in recent entries";
    } else if (criterion.toLowerCase().includes("range of motion")) {
      const withRom = sorted.filter((e) => e.rangeOfMotion !== undefined);
      if (withRom.length > 0) {
        const latestRom = withRom[withRom.length - 1].rangeOfMotion!;
        met = latestRom >= 90;
        details = met
          ? `ROM at ${latestRom}% of estimated uninjured side`
          : `ROM only at ${latestRom}%, need >= 90%`;
      } else {
        details = "No range of motion data recorded";
      }
    } else if (criterion.includes("Strength")) {
      met =
        latest.compliance > 80 &&
        (latest.phase === "strength" || latest.phase === "return-to-sport");
      details = met
        ? "Strength phase compliance meets 90% threshold"
        : "Strength not yet at 90% threshold";
    } else if (criterion.includes("drills")) {
      met = latest.phase === "return-to-sport";
      details = met
        ? "Currently in return-to-sport phase"
        : "Not yet progressed to return-to-sport phase";
    } else {
      met = false;
      details = "Unable to evaluate criterion automatically";
    }

    return { criterion, met, details };
  });

  const metCount = criteriaResults.filter((r) => r.met).length;
  const score =
    criteriaResults.length > 0
      ? Math.round((metCount / criteriaResults.length) * 100)
      : 0;

  const unmetCount = criteriaResults.length - metCount;
  const riskOfReinjury: "low" | "moderate" | "high" =
    unmetCount === 0
      ? "low"
      : unmetCount <= Math.ceil(criteriaResults.length / 2)
        ? "moderate"
        : "high";

  const highRiskUnmet = criteriaResults.some(
    (r) => !r.met && r.criterion.includes("Pain free")
  );
  const ready = score >= 80 && !highRiskUnmet && allPhasesCompleted;

  const recommendations = criteriaResults
    .filter((r) => !r.met)
    .map((r) => r.details);

  if (!allPhasesCompleted) {
    const missing = allPhases.filter((p) => !completedPhases.has(p));
    recommendations.push(
      `Complete all rehabilitation phases before return. Missing: ${missing.join(", ")}`
    );
  }

  return {
    ready,
    score,
    criteriaResults,
    riskOfReinjury,
    recommendations,
  };
}

export function getRehabReadinessScore(
  injuries: InjuryRecord[],
  allProgress: Map<string, RehabProgressEntry[]>
): number {
  if (injuries.length === 0) return 100;

  const severityWeight: Record<string, number> = {
    mild: 0.3,
    moderate: 0.6,
    severe: 1.0,
  };

  let totalScore = 0;
  let totalWeight = 0;

  for (const injury of injuries) {
    const progress = allProgress.get(injury.id) || [];
    if (progress.length === 0) continue;

    const sorted = [...progress].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const latest = sorted[sorted.length - 1];
    const severity = severityWeight[injury.severity] ?? 0.5;

    const painTrend = getPainTrend(progress);
    const compliance = calculateComplianceRate(progress, 7);
    const painScore =
      painTrend === "improving" ? 100 : painTrend === "stable" ? 50 : 0;
    const complianceScore = compliance * 100;

    const daysSinceInjury = Math.max(
      0,
      Math.round(
        (new Date(latest.date).getTime() -
          new Date(injury.dateOccurred).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    const timeScore = Math.min(100, (daysSinceInjury / 30) * 100);

    const injuryScore = Math.round(
      0.4 * complianceScore + 0.3 * painScore + 0.3 * timeScore
    );

    totalScore += injuryScore * severity;
    totalWeight += severity;
  }

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 100;
}

export function estimateRecoveryDays(
  injury: InjuryRecord,
  progress: RehabProgressEntry[]
): number {
  const protocol = protocolLibrary.get(injury.protocolId) as InjuryProtocol | undefined;
  if (!protocol) return 0;

  const avgRecoveryDays =
    ((protocol.typicalRecoveryWeeks[0] + protocol.typicalRecoveryWeeks[1]) /
      2) *
    7;

  if (progress.length === 0) return Math.round(avgRecoveryDays);

  const sorted = [...progress].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const totalDays = Math.max(
    0,
    Math.round(
      (new Date(sorted[sorted.length - 1].date).getTime() -
        new Date(sorted[0].date).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const compliance = calculateComplianceRate(progress, 7);
  const progressRate = compliance > 0 ? Math.min(compliance * 1.5, 1.0) : 0.5;

  return Math.max(0, Math.round(avgRecoveryDays - totalDays * progressRate));
}

export function getFormModifierLevel(
  entries: RehabProgressEntry[]
): "none" | "mild" | "moderate" | "severe" {
  if (entries.length === 0) return "none";

  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const latest = sorted[sorted.length - 1];
  const { phase, painLevel } = latest;

  if (phase === "acute" || painLevel > 6) return "severe";
  if (phase === "subacute" || painLevel > 4) return "moderate";
  if (phase === "rehab" || painLevel > 2) return "mild";
  if (
    (phase === "strength" || phase === "return-to-sport") &&
    painLevel <= 2
  ) {
    return "none";
  }

  return "none";
}
