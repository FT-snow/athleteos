"use client";
import { Line } from "react-chartjs-2";
import { computeRecoveryScore } from "@recoveryiq/core";
import { useMemo } from "react";

export function ScoreTrend({ logs }: { logs: import("@recoveryiq/core").DailyRecoveryLog[] }) {
  const scores = useMemo(() => {
    return logs.map((log, i) => {
      const prev = logs.slice(0, i);
      return computeRecoveryScore(log, prev.slice(-7));
    });
  }, [logs]);

  const data = {
    labels: logs.map(l => l.date.slice(5)),
    datasets: [
      {
        label: "Recovery Score",
        data: scores.map(s => s.total),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Readiness",
        data: scores.map(s => s.readiness),
        borderColor: "#22c55e",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">Recovery & Readiness Trend (30d)</p>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top", labels: { color: "#8896ab", boxWidth: 12, padding: 12 } },
          },
          scales: {
            x: { ticks: { color: "#8896ab", maxTicksLimit: 10 }, grid: { color: "#1f2937" } },
            y: { min: 0, max: 100, ticks: { color: "#8896ab" }, grid: { color: "#1f2937" } },
          },
          elements: { point: { radius: 2 } },
        }}
      />
    </div>
  );
}
