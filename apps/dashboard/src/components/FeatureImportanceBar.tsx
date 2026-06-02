"use client";

import type { ShapFeature } from "@recoveryiq/ml";

export function FeatureImportanceBar({ features }: { features: ShapFeature[] }) {
  if (!features || features.length === 0) return null;

  const maxAbs = Math.max(...features.map((f) => Math.abs(f.impact)), 1);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">
        What's Driving Your Score
      </p>
      <div className="space-y-3">
        {features.map((f) => {
          const pct = (Math.abs(f.impact) / maxAbs) * 100;
          const isPositive = f.impact >= 0;
          return (
            <div key={f.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-[var(--muted)]">{f.name}</span>
                <span className={isPositive ? "text-[var(--success)]" : "text-[var(--danger)]"}>
                  {isPositive ? "+" : ""}
                  {f.impact.toFixed(1)}
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-[var(--border)]">
                <div
                  className={`absolute h-full rounded-full transition-all ${
                    isPositive ? "bg-[var(--success)] right-1/2" : "bg-[var(--danger)] left-1/2"
                  }`}
                  style={{
                    width: `${pct}%`,
                    [isPositive ? "right" : "left"]: "50%",
                    transform: isPositive ? "translateX(-100%)" : "translateX(0)",
                  }}
                />
              </div>
              <div className="mt-0.5 text-right text-xs text-[var(--muted)]">
                Value: {f.value.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">
        Green = boosts readiness · Red = hurts readiness · Wider = bigger impact
      </p>
    </div>
  );
}
