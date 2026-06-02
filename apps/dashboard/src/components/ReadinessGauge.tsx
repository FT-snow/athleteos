export function ReadinessGauge({ score, label }: { score: number; label: string }) {
  const color = score > 75 ? "var(--success)" : score > 55 ? "var(--accent)" : score > 35 ? "var(--warning)" : "var(--danger)";
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
      <p className="mb-2 text-xs uppercase tracking-widest text-[var(--muted)]">Readiness</p>
      <svg width="160" height="160" className="-rotate-90">
        <circle cx="80" cy="80" r="60" fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle
          cx="80" cy="80" r="60"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute mt-[-100px] flex flex-col items-center">
        <span className="text-5xl font-bold" style={{ color }}>{score}</span>
        <span className="mt-1 text-sm capitalize text-[var(--muted)]">{label}</span>
      </div>
    </div>
  );
}
