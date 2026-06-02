"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from "chart.js";
import type { DailyRecoveryLog } from "@recoveryiq/core";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function MentalChart({ logs }: { logs: DailyRecoveryLog[] }) {
  const recent = logs.slice(-14);
  const labels = recent.map(l => l.date.slice(5));

  const data = {
    labels,
    datasets: [
      { label: "Motivation", data: recent.map(l => l.mental.motivation), borderColor: "#22c55e", backgroundColor: "transparent", tension: 0.3 },
      { label: "Focus", data: recent.map(l => l.mental.focus), borderColor: "#6366f1", backgroundColor: "transparent", tension: 0.3 },
      { label: "Confidence", data: recent.map(l => l.mental.confidence), borderColor: "#f59e0b", backgroundColor: "transparent", tension: 0.3 },
      { label: "Stress", data: recent.map(l => l.mental.stress), borderColor: "#ef4444", backgroundColor: "transparent", tension: 0.3, borderDash: [5, 5] },
    ],
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">Mental Readiness Trend (14d)</p>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: { legend: { position: "top", labels: { color: "#8896ab", boxWidth: 12, padding: 12 } } },
          scales: {
            x: { ticks: { color: "#8896ab" }, grid: { color: "#1f2937" } },
            y: { min: 0, max: 10, ticks: { color: "#8896ab", stepSize: 2 }, grid: { color: "#1f2937" } },
          },
        }}
      />
    </div>
  );
}
