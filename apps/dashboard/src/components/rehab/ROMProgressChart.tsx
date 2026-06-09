"use client";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { animate } from "animejs";
import { motion, useMotionValue, useTransform, animate as fmAnimate } from "framer-motion";
import { GridCard } from "@/components/FeatureCard";

interface RomEntry { date: string; rom: number; targetRom?: number; }

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    animate(ref.current, { innerText: [0, value], duration: 1200, ease: "outExpo" });
  }, [value]);
  return <span ref={ref}>0</span>;
}

export function ROMProgressChart({ entries, targetRom = 140 }: { entries: RomEntry[]; targetRom?: number }) {
  const targetLineRef = useRef<SVGPathElement>(null);
  const progressLineRef = useRef<SVGPathElement>(null);

  if (!entries || entries.length === 0) return null;

  const data = {
    labels: entries.map(e => e.date.slice(5)),
    datasets: [
      {
        label: "Range of Motion",
        data: entries.map(e => e.rom),
        borderColor: "#79BBC3",
        backgroundColor: "rgba(121,187,195,0.08)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Target",
        data: entries.map(() => targetRom),
        borderColor: "#4ade80",
        borderDash: [5, 5],
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const latest = entries[entries.length - 1];
  const pct = targetRom > 0 ? Math.round((latest.rom / targetRom) * 100) : 0;

  useEffect(() => {
    if (targetLineRef.current) {
      const len = targetLineRef.current.getTotalLength();
      animate(targetLineRef.current, { strokeDashoffset: [len, 0], duration: 1200, ease: "outExpo" });
    }
  }, []);

  return (
    <GridCard variant="flat">
      <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-label text-[var(--teal-muted)]">Range of Motion</p>
        <span className="font-ui-mono text-sm text-[var(--teal-accent)]">
          <CountUp value={pct} />% of target
        </span>
      </div>
      <Line data={data} options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "rgba(255,255,255,0.35)" }, grid: { color: "rgba(255,255,255,0.05)" } },
          y: { ticks: { color: "rgba(255,255,255,0.35)" }, grid: { color: "rgba(255,255,255,0.05)" } },
        },
        elements: { point: { radius: 3 } },
      }} />
      </div>
    </GridCard>
  );
}
