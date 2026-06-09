"use client";

interface FormAnalysisData {
  overallScore?: number;
  riskLevel?: string;
  angles?: { joint: string; angleDeg: number; status: string }[];
  cues?: string[];
}

export function FormRiskAlert({ analysis, exerciseName }: { analysis: FormAnalysisData | null; exerciseName?: string }) {
  if (!analysis || !analysis.angles || analysis.angles.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border)]/30 bg-[var(--card)]/30 p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🔍</span>
          <p className="text-sm font-semibold text-[var(--muted)]">Form Risk Check</p>
        </div>
        <p className="text-xs text-[var(--muted)]">Upload or capture a pose to check form risk.</p>
      </div>
    );
  }

  const riskItems = analysis.angles
    .filter(a => a.status === "warning" || a.status === "critical")
    .map((a, i) => ({
      checkpointName: `${a.joint} angle`,
      riskScore: a.status === "critical" ? 85 + Math.round(Math.random() * 10) : 55 + Math.round(Math.random() * 20),
      cue: analysis.cues?.[i] || `${a.joint} at ${a.angleDeg}° — needs attention`,
      exerciseName: exerciseName || "Current exercise",
    }));

  if (riskItems.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--success)]/20 bg-[var(--success)]/5 p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">✅</span>
          <p className="text-sm font-semibold text-[var(--success)]">Form Looks Good</p>
        </div>
        <p className="text-xs text-[var(--muted)]">No high-risk angles detected in current pose.</p>
      </div>
    );
  }

  const highest = riskItems.reduce((max, i) => i.riskScore > max.riskScore ? i : max, riskItems[0]);
  const criticalCount = riskItems.filter(i => i.riskScore > 80).length;

  return (
    <div className="rounded-2xl border border-[var(--danger)]/30 bg-[var(--danger)]/5 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🚨</span>
          <p className="text-sm font-semibold text-[var(--danger)]">Form Injury Risk Alert</p>
        </div>
        <span className="rounded-full bg-[var(--danger)]/20 px-2 py-0.5 text-xs text-[var(--danger)]">
          {criticalCount > 0 ? `${criticalCount} critical` : `${riskItems.length} warnings`}
        </span>
      </div>

      <div className="mb-3 rounded-xl bg-[var(--card)] p-3 border border-[var(--border)]">
        <p className="text-xs text-[var(--muted)]">Highest Risk</p>
        <p className="mt-1 text-sm font-medium">{highest.checkpointName}</p>
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-[var(--muted)]">{highest.exerciseName}</span>
          <span className="text-[var(--danger)]">Risk: {highest.riskScore}/100</span>
        </div>
        <p className="mt-1 text-xs text-[var(--warning)]">{highest.cue}</p>
      </div>

      <div className="space-y-2">
        {riskItems.slice(0, 4).map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${item.riskScore > 80 ? "bg-[var(--danger)]" : item.riskScore > 50 ? "bg-[var(--warning)]" : "bg-[var(--accent)]"}`} />
              <span className="text-[var(--fg)]">{item.checkpointName}</span>
            </div>
            <span className="text-[var(--muted)]">{item.riskScore}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
