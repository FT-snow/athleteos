"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from "chart.js";
import { GridCard } from "@/components/FeatureCard";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface PainEntry { date: string; painLevel: number; phase?: string; }

export function PainTrendChart({ entries }: { entries: PainEntry[] }) {
  if (!entries || entries.length === 0) return null;

  const data = {
    labels: entries.map(e => e.date.slice(5)),
    datasets: [
      {
        label: "Pain Level",
        data: entries.map(e => e.painLevel),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.08)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: entries.map(e => {
          if (e.painLevel <= 2) return "#22c55e";
          if (e.painLevel <= 5) return "#f59e0b";
          return "#ef4444";
        }),
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <GridCard variant="flat">
      <div className="p-6">
      <p className="mb-4 font-label text-[var(--teal-muted)]">Pain Trend</p>
      <Line data={data} options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "rgba(255,255,255,0.35)", maxTicksLimit: 10 }, grid: { color: "rgba(255,255,255,0.05)" } },
          y: { min: 0, max: 10, ticks: { color: "rgba(255,255,255,0.35)", stepSize: 2 }, grid: { color: "rgba(255,255,255,0.05)" } },
        },
      }} />
      </div>
    </GridCard>
  );
}
