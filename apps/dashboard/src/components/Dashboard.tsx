"use client";

import { useState, useMemo } from "react";
import { generateMockLogs, getMockAthlete } from "@/lib/mock-data";
import { logsToMlRequest } from "@/lib/recovery-to-ml";
import { computeRecoveryScore } from "@recoveryiq/core";
import { fallbackScorer } from "@recoveryiq/ml";
import { FeatureImportanceBar } from "./FeatureImportanceBar";
import { ReadinessGauge } from "./ReadinessGauge";
import { SleepCard } from "./SleepCard";
import { SorenessHeatmap } from "./SorenessHeatmap";
import { MentalChart } from "./MentalChart";
import { ScoreTrend } from "./ScoreTrend";
import { DailyTracker } from "./DailyTracker";
import { RehabTracker } from "./RehabTracker";

export function Dashboard() {
  const [dateOffset, setDateOffset] = useState(0);
  const [mlSource, setMlSource] = useState<"api" | "fallback">("fallback");

  const athlete = useMemo(() => getMockAthlete(), []);
  const logs = useMemo(() => generateMockLogs(30), []);
  const currentLog = logs[logs.length - 1 - dateOffset] || logs[logs.length - 1];

  // Step 1: RecoveryIQ computes recovery scores from daily log
  const recovery = useMemo(() => {
    if (!currentLog) return null;
    const prevLogs = logs.filter((l) => l.date < currentLog.date);
    return computeRecoveryScore(currentLog, prevLogs.slice(-7));
  }, [currentLog, logs]);

  // Step 2: Bridge — convert RecoveryIQ logs → ML feature vector
  const mlRequest = useMemo(() => {
    if (!currentLog) return null;
    return logsToMlRequest(athlete.id, logs, currentLog.date);
  }, [currentLog, logs, athlete.id]);

  // Step 3: ML Predictor — run fallback (or real API) on those features
  const mlPrediction = useMemo(() => {
    if (!mlRequest) return null;
    return fallbackScorer(mlRequest);
  }, [mlRequest]);

  // Step 4: Combined recommendation (RecoveryIQ + ML)
  const combinedRecommendation = useMemo(() => {
    if (!mlPrediction && !recovery) return "Start logging daily recovery data to see personalized recommendations.";
    const ml = mlPrediction?.recommendation ?? "";
    const r = recovery?.recommendation ?? "";
    if (!ml && !r) return "No recommendation available.";
    return [ml, r].filter(Boolean).join(" ");
  }, [mlPrediction, recovery]);

  // Step 5: Data pipeline quality indicators
  const pipelineSteps = [
    { label: "Daily Log", ok: !!currentLog, detail: currentLog?.date ?? "—" },
    { label: "Recovery Score", ok: !!recovery, detail: recovery ? `${recovery.total}/100` : "—" },
    { label: "ML Features", ok: !!mlRequest, detail: mlRequest ? `${Object.keys(mlRequest.features).length} features` : "—" },
    { label: "ML Prediction", ok: !!mlPrediction, detail: mlPrediction ? `${mlPrediction.readinessScore}/100` : "—" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">AthleteOS</h1>
            <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs text-[var(--muted)]">
              RecoveryIQ + ML Predictor
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {athlete.name} · {athlete.sport} · {currentLog?.date}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm hover:bg-white/5"
            onClick={() => setDateOffset((d) => Math.min(d + 1, logs.length - 1))}
          >
            ← Previous
          </button>
          <button
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm hover:bg-white/5"
            onClick={() => setDateOffset((d) => Math.max(d - 1, 0))}
          >
            Next →
          </button>
        </div>
      </header>

      {/* Pipeline Status Bar */}
      <div className="mb-6 flex flex-wrap gap-3">
        {pipelineSteps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2">
            <span className={`h-2 w-2 rounded-full ${step.ok ? "bg-[var(--success)]" : "bg-[var(--muted)]"}`} />
            <span className="text-xs text-[var(--muted)]">{step.label}</span>
            <span className="text-xs font-medium">{step.detail}</span>
            {i < pipelineSteps.length - 1 && (
              <span className="text-[var(--muted)]">→</span>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2">
          <span className={`h-2 w-2 rounded-full ${mlSource === "api" ? "bg-[var(--success)]" : "bg-[var(--warning)]"}`} />
          <span className="text-xs text-[var(--muted)]">ML Source</span>
          <span className="text-xs font-medium">{mlSource === "api" ? "FastAPI" : "Fallback"}</span>
        </div>
      </div>

      {/* Top Row: Readiness Gauge + Quick Stats */}
      <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <ReadinessGauge
          score={mlPrediction?.readinessScore ?? recovery?.readiness ?? 50}
          label={mlPrediction?.readinessLabel ?? recovery?.fatigueLevel ?? "moderate"}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <SleepCard sleep={currentLog?.sleep} score={recovery?.sleep} />
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-xs uppercase tracking-widest text-[var(--muted)]">Injury Risk</p>
            <p
              className={`mt-3 text-3xl font-bold ${
                mlPrediction?.injuryRisk === "HIGH"
                  ? "text-[var(--danger)]"
                  : "text-[var(--success)]"
              }`}
            >
              {mlPrediction?.injuryRisk ?? "LOW"}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Confidence: {Math.round((mlPrediction?.injuryRiskConfidence ?? 0.7) * 100)}%
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-xs uppercase tracking-widest text-[var(--muted)]">Fatigue</p>
            <p className="mt-3 text-3xl font-bold text-[var(--warning)]">
              {mlPrediction?.fatigueDetected ? "⚠ DETECTED" : "✓ NORMAL"}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Confidence: {Math.round((mlPrediction?.fatigueConfidence ?? 0) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Combined Recommendation */}
      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <p className="mb-2 text-xs uppercase tracking-widest text-[var(--muted)]">
          Combined Recommendation — RecoveryIQ + ML Predictor
        </p>
        <p className="text-sm leading-relaxed">{combinedRecommendation}</p>
      </div>

      {/* Middle Row: Charts + Feature Importance */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScoreTrend logs={logs} />
        </div>
        <FeatureImportanceBar features={mlPrediction?.topFeatures ?? []} />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <MentalChart logs={logs} />
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <p className="mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">
            Recovery Score Breakdown
          </p>
          {recovery ? (
            <div className="space-y-3">
              <BarRow label="Sleep" value={recovery.sleep.total} max={100} color="var(--accent)" />
              <BarRow label="HRV" value={recovery.hrvScore} max={100} color="var(--success)" />
              <BarRow label="Mental" value={recovery.mentalScore} max={100} color="var(--warning)" />
              <BarRow
                label="Soreness Penalty"
                value={Math.abs(recovery.sorenessPenalty)}
                max={40}
                color="var(--danger)"
                invert
              />
              <div className="mt-4 border-t border-[var(--border)] pt-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total Recovery</span>
                  <span className="font-bold text-[var(--accent)]">{recovery.total}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Readiness</span>
                  <span className="font-bold text-[var(--success)]">{recovery.readiness}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Fatigue Level</span>
                  <span className="font-medium capitalize">{recovery.fatigueLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Trend</span>
                  <span
                    className={`font-medium capitalize ${
                      recovery.trend === "improving"
                        ? "text-[var(--success)]"
                        : recovery.trend === "declining"
                          ? "text-[var(--danger)]"
                          : "text-[var(--muted)]"
                    }`}
                  >
                    {recovery.trend}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">No recovery data.</p>
          )}
        </div>
      </div>

      {/* Bottom: Daily Tracker + Soreness + Rehab */}
      <div className="grid gap-6 lg:grid-cols-3">
        <DailyTracker log={currentLog!} onLog={() => {}} />
        <SorenessHeatmap entries={currentLog?.soreness ?? []} />
        <RehabTracker />
      </div>
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
  color,
  invert,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  invert?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-[var(--muted)]">{label}</span>
        <span style={{ color }}>{invert ? `-${value}` : `${value}/${max}`}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${invert ? 100 - pct : pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
