import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { SeverityTone, TimelinePoint } from "@formiq/types";

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[32px] border border-white/10 bg-[var(--panel)] p-5 backdrop-blur ${className}`}>{children}</section>;
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

export function StatusPill({ children, tone }: { children: ReactNode; tone: SeverityTone }) {
  const styles = {
    neutral: "border-white/10 bg-white/10 text-slate-200",
    warn: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    good: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  };

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[tone]}`}>{children}</span>;
}

export function MetricCard({ icon: Icon, label, value }: { icon?: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--panel-strong)] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">{label}</p>
        {Icon ? <Icon className="h-4 w-4 text-[var(--accent-strong)]" /> : null}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

export function TimelineBars({ items }: { items: TimelinePoint[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div className="grid gap-2" key={item.label}>
          <div className="flex items-center justify-between text-sm text-[var(--muted)]">
            <span>{item.label}</span>
            <span>{item.confidence.toFixed(0)}% conf</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,rgba(143,180,255,0.55),rgba(199,215,255,0.95))]" style={{ width: `${Math.max(item.rangeScore, 12)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
