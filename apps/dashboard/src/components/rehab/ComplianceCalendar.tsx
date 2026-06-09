"use client";
import { GridCard } from "@/components/FeatureCard";

interface ComplianceDay { date: string; compliance: number; }

export function ComplianceCalendar({ days }: { days: ComplianceDay[] }) {
  const last30 = days.slice(-30);
  const avg = last30.length > 0 ? Math.round(last30.reduce((s, d) => s + d.compliance, 0) / last30.length) : 0;

  return (
    <GridCard variant="flat" hoverEffect="none">
      <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-widest text-[var(--muted)]">Compliance (30d)</p>
        <span className="text-sm font-medium">{avg}% avg</span>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {last30.map((d, i) => {
          let color = "bg-[var(--border)]";
          if (d.compliance >= 80) color = "bg-[var(--success)]";
          else if (d.compliance >= 50) color = "bg-[var(--warning)]";
          else if (d.compliance > 0) color = "bg-[var(--danger)]";
          return (
            <div
              key={i}
              className={`aspect-square rounded-sm ${color} ${d.compliance > 0 ? "opacity-80" : "opacity-30"}`}
              title={`${d.date}: ${d.compliance}%`}
            />
          );
        })}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[var(--success)]" /> 80%+</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[var(--warning)]" /> 50-80%</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[var(--danger)]" /> &lt;50%</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[var(--border)]" /> Missed</span>
      </div>
      </div>
    </GridCard>
  );
}
