export function RehabTracker() {
  const injuries = [
    { zone: "knees", diagnosis: "Patellar tendinopathy", severity: "moderate", status: "rehab", compliance: 85, pain: 3 },
    { zone: "shoulders", diagnosis: "Rotator cuff strain", severity: "mild", status: "active", compliance: 60, pain: 5 },
  ];

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">Rehab Tracker</p>
      {injuries.length === 0 && <p className="text-sm text-[var(--muted)]">No active injuries</p>}
      <div className="space-y-4">
        {injuries.map((injury, i) => (
          <div key={i} className="rounded-xl border border-[var(--border)] bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm capitalize font-medium">{injury.diagnosis}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs ${
                injury.status === "rehab" ? "bg-yellow-900/30 text-yellow-300" :
                injury.status === "active" ? "bg-red-900/30 text-red-300" :
                "bg-green-900/30 text-green-300"
              }`}>{injury.status}</span>
            </div>
            <div className="mt-3 flex justify-between text-sm text-[var(--muted)]">
              <span>Compliance</span>
              <span>{injury.compliance}%</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-[var(--border)]">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${injury.compliance}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-[var(--muted)]">Pain level</span>
              <span className={injury.pain > 4 ? "text-[var(--danger)]" : "text-[var(--warning)]"}>{injury.pain}/10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
