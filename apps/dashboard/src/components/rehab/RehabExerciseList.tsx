"use client";
import { useState } from "react";
import { GridCard } from "@/components/FeatureCard";

interface RehabExercise {
  name: string;
  description: string;
  sets: number;
  reps: number;
  frequency: string;
}

export function RehabExerciseList({ exercises, phase }: { exercises: RehabExercise[]; phase: string }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    const next = new Set(completed);
    if (next.has(name)) next.delete(name); else next.add(name);
    setCompleted(next);
  };

  return (
    <GridCard variant="compact">
      <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-widest text-[var(--muted)]">Today's Rehab</p>
        <span className="rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs capitalize text-[var(--accent)]">{phase}</span>
      </div>
      <div className="space-y-3">
        {exercises.map((ex) => (
          <div
            key={ex.name}
            className={`rounded-xl border p-4 transition-all cursor-pointer ${completed.has(ex.name) ? "border-[var(--success)] bg-[var(--success)]/5" : "border-[var(--border)] bg-white/5"}`}
            onClick={() => toggle(ex.name)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${completed.has(ex.name) ? "border-[var(--success)] bg-[var(--success)]" : "border-[var(--muted)]"}`}>
                  {completed.has(ex.name) && <span className="text-xs text-white">✓</span>}
                </div>
                <p className="text-sm font-medium">{ex.name}</p>
              </div>
              <span className="text-xs text-[var(--muted)]">{ex.sets}×{ex.reps}</span>
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">{ex.description}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">Frequency: {ex.frequency}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">{completed.size}/{exercises.length} completed today</p>
      </div>
    </GridCard>
  );
}
