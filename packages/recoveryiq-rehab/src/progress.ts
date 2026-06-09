import type { RehabProgressEntry, RehabProgressReport, RehabPhase, BodyZone } from "./types";
import { protocolLibrary } from "./protocols";

export function getPainTrend(entries: RehabProgressEntry[]): "improving" | "stable" | "worsening" {
  if (entries.length < 6) return "stable";
  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const recent = sorted.slice(-3);
  const older = sorted.slice(-6, -3);
  const recentAvg = recent.reduce((s, e) => s + e.painLevel, 0) / 3;
  const olderAvg = older.reduce((s, e) => s + e.painLevel, 0) / 3;
  const diff = olderAvg - recentAvg;
  if (diff > 0.5) return "improving";
  if (diff < -0.5) return "worsening";
  return "stable";
}

export function getRomTrend(
  entries: RehabProgressEntry[]
): "improving" | "stable" | "worsening" | "unknown" {
  const withRom = entries.filter((e) => e.rangeOfMotion !== undefined);
  if (withRom.length === 0) return "unknown";
  if (withRom.length < 4) return "stable";
  const sorted = [...withRom].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const recent = sorted.slice(-2);
  const older = sorted.slice(-4, -2);
  const recentAvg =
    recent.reduce((s, e) => s + e.rangeOfMotion!, 0) / recent.length;
  const olderAvg =
    older.reduce((s, e) => s + e.rangeOfMotion!, 0) / older.length;
  const diff = recentAvg - olderAvg;
  if (diff > 5) return "improving";
  if (diff < -5) return "worsening";
  return "stable";
}

export function calculateComplianceRate(
  entries: RehabProgressEntry[],
  days: number
): number {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recent = sorted.slice(0, days);
  if (recent.length === 0) return 0;
  return recent.reduce((s, e) => s + e.compliance, 0) / recent.length;
}

export function identifyStalling(entries: RehabProgressEntry[]): boolean {
  if (entries.length < 7) return false;
  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const last7 = sorted.slice(-7);
  const painTrend = getPainTrend(last7);
  const compliance = calculateComplianceRate(last7, 7);
  return painTrend !== "improving" && compliance > 0.7;
}

export function computeRehabProgress(
  entries: RehabProgressEntry[]
): RehabProgressReport {
  if (entries.length === 0) {
    return {
      injuryId: "",
      currentPhase: "acute",
      daysInPhase: 0,
      totalDays: 0,
      painTrend: "stable",
      romTrend: "unknown",
      complianceRate: 0,
      projectedDaysToRecovery: 0,
      score: 0,
      stalled: false,
      alerts: [],
    };
  }

  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const latest = sorted[sorted.length - 1];
  const injuryId = latest.injuryId;
  const currentPhase = latest.phase;

  let phaseStartIndex = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].phase !== currentPhase) {
      phaseStartIndex = i + 1;
      break;
    }
  }
  const daysInPhase = Math.max(
    0,
    Math.round(
      (new Date(latest.date).getTime() -
        new Date(sorted[phaseStartIndex].date).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const totalDays = Math.max(
    0,
    Math.round(
      (new Date(latest.date).getTime() -
        new Date(sorted[0].date).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const painTrend = getPainTrend(sorted);
  const romTrend = getRomTrend(sorted);
  const complianceRate = calculateComplianceRate(sorted, 7);

  const protocols = Object.values(protocolLibrary);
  const avgRecoveryDays =
    protocols.length > 0
      ? protocols.reduce(
          (s, p) =>
            s +
            ((p.typicalRecoveryWeeks[0] + p.typicalRecoveryWeeks[1]) / 2) * 7,
          0
        ) / protocols.length
      : 56;

  const painModifier =
    painTrend === "improving" ? -0.1 : painTrend === "worsening" ? 0.2 : 0;
  const projectedDaysToRecovery = Math.max(
    0,
    Math.round(avgRecoveryDays - totalDays * (1 + painModifier))
  );

  const painScore =
    painTrend === "improving" ? 100 : painTrend === "stable" ? 50 : 0;
  const romScore =
    romTrend === "improving" ? 100 : romTrend === "stable" || romTrend === "unknown" ? 50 : 0;
  const consistencyScore =
    sorted.length >= 7 ? 100 : (sorted.length / 7) * 100;
  const score = Math.round(
    0.4 * complianceRate * 100 + 0.3 * painScore + 0.2 * romScore + 0.1 * consistencyScore
  );

  const stalled = identifyStalling(sorted);

  const alerts: string[] = [];
  if (painTrend === "worsening") {
    alerts.push("Pain increasing over last 3 days");
  }
  if (complianceRate < 0.5) {
    alerts.push("Compliance below 50%");
  }
  if (stalled) {
    alerts.push("Stalled \u2014 consider protocol adjustment");
  }

  return {
    injuryId,
    currentPhase,
    daysInPhase,
    totalDays,
    painTrend,
    romTrend,
    complianceRate: Math.round(complianceRate * 100) / 100,
    projectedDaysToRecovery,
    score,
    stalled,
    alerts,
  };
}
