"use client";
import { GridCard } from "@/components/FeatureCard";

interface RtpCriterion { criterion: string; met: boolean; details: string; }

export function ReturnToPlayPanel({
  ready, score, criteria, risk, projectedDays,
}: {
  ready: boolean; score: number; criteria: RtpCriterion[]; risk: string; projectedDays: number;
}) {
  return (
    <GridCard variant="elevated">
      <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-widest text-[var(--muted)]">Return to Play</p>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${ready ? "bg-green-900/30 text-green-300" : "bg-yellow-900/30 text-yellow-300"}`}>
          {ready ? "✓ CLEARED" : `${projectedDays} days est.`}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[var(--muted)]">Readiness Score</span>
          <span className={`font-bold ${score >= 80 ? "text-[var(--success)]" : score >= 50 ? "text-[var(--warning)]" : "text-[var(--danger)]"}`}>{score}/100</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--border)]">
          <div className={`h-full rounded-full transition-all ${score >= 80 ? "bg-[var(--success)]" : score >= 50 ? "bg-[var(--warning)]" : "bg-[var(--danger)]"}`} style={{ width: `${score}%` }} />
        </div>
      </div>

      <p className="mb-3 text-sm text-[var(--muted)]">Criteria Checklist</p>
      <div className="space-y-2 mb-4">
        {criteria.map((c, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className={`mt-0.5 text-sm ${c.met ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
              {c.met ? "✓" : "✗"}
            </span>
            <div>
              <p className="text-sm">{c.criterion}</p>
              <p className="text-xs text-[var(--muted)]">{c.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-[var(--muted)]">Re-injury Risk</span>
        <span className={`font-medium capitalize ${risk === "low" ? "text-[var(--success)]" : risk === "moderate" ? "text-[var(--warning)]" : "text-[var(--danger)]"}`}>{risk}</span>
      </div>
      </div>
    </GridCard>
  );
}
