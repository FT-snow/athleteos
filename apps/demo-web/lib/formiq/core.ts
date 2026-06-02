import type { BottleneckNote, SessionData, SessionMetrics, SessionSummary } from "@formiq/types";

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

export function buildSessionMetrics(session: SessionData): SessionMetrics {
  return {
    reps: session.repFrames.length,
    durationMs: session.durationMs,
    avgTempo: average(session.repFrames.map((frame) => frame.tempoSeconds)),
    confidence: average(session.repFrames.map((frame) => frame.confidence)),
    rangeScore: average(session.repFrames.map((frame) => frame.rangeScore)),
  };
}

export function buildSessionSummary(session: SessionData): SessionSummary {
  const leftDrift = average(session.repFrames.map((frame) => frame.lateralDriftDeg));
  const depthLoss = average(session.repFrames.map((frame) => frame.depthLoss));
  const recoveryScore = 100 - depthLoss * 1.15 - leftDrift * 1.8;

  return {
    leftDrift,
    depthLoss,
    recoveryScore: Math.max(38, recoveryScore),
    defaultCues: [
      "Spread the floor before each descent.",
      "Finish the rep by stacking ribs over hips.",
      "Keep the last three reps as crisp as the first three.",
    ],
    nextFocus: leftDrift > depthLoss / 3 ? "Stabilize left-right drift under fatigue." : "Recover more depth in the back half of the set.",
  };
}

export function deriveBottlenecks(session: SessionData): BottleneckNote[] {
  const summary = buildSessionSummary(session);
  const confidence = average(session.repFrames.map((frame) => frame.confidence));

  return [
    {
      title: "Pelvic drift",
      severity: summary.leftDrift > 5 ? "Elevated" : "Stable",
      tone: summary.leftDrift > 5 ? "warn" : "good",
      note: `Average side-to-side deviation is ${summary.leftDrift.toFixed(1)} degrees, most visible in the final third of the set.`,
    },
    {
      title: "Depth consistency",
      severity: summary.depthLoss > 16 ? "Watch" : "Contained",
      tone: summary.depthLoss > 16 ? "warn" : "neutral",
      note: `Depth falls off by ${summary.depthLoss.toFixed(0)}% as fatigue rises, suggesting the eccentric is outrunning control.`,
    },
    {
      title: "Signal confidence",
      severity: confidence > 82 ? "Clean" : "Moderate",
      tone: confidence > 82 ? "good" : "neutral",
      note: `Pose confidence averages ${confidence.toFixed(0)}%, enough for demo telemetry even when the camera path is mocked.`,
    },
  ];
}

export function formatDuration(durationMs: number) {
  const seconds = Math.round(durationMs / 1000);
  const minutesPart = Math.floor(seconds / 60);
  const secondsPart = seconds % 60;
  return `${String(minutesPart).padStart(2, "0")}:${String(secondsPart).padStart(2, "0")}`;
}
