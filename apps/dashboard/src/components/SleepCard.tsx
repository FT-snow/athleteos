import type { SleepLog } from "@recoveryiq/core";
import type { SleepScore } from "@recoveryiq/core";

export function SleepCard({ sleep, score }: { sleep?: SleepLog; score?: SleepScore }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="text-xs uppercase tracking-widest text-[var(--muted)]">Sleep</p>
      <p className="mt-2 text-3xl font-bold">{sleep?.hours.toFixed(1) ?? "--"}h</p>
      <div className="mt-3 space-y-2">
        <div>
          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>Quality</span>
            <span>{sleep?.quality ?? "--"}/10</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-[var(--border)]">
            <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${((sleep?.quality ?? 0) / 10) * 100}%` }} />
          </div>
        </div>
        <div className="flex justify-between text-xs text-[var(--muted)]">
          <span>Wake-ups</span>
          <span>{sleep?.wakeUps ?? "--"}</span>
        </div>
        <div className="flex justify-between text-xs text-[var(--muted)]">
          <span>Energy</span>
          <span>{sleep?.morningEnergy ?? "--"}/10</span>
        </div>
      </div>
      {score && (
        <p className="mt-3 text-xs text-[var(--muted)]">Sleep score: <span className="font-semibold text-[var(--fg)]">{score.total}</span></p>
      )}
    </div>
  );
}
