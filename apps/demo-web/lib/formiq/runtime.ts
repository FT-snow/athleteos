import type { RuntimeStatus, SessionData, TimelinePoint } from "@formiq/types";

function seeded(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

export function buildMockSession(seed: number): SessionData {
  const reps = 12 + Math.floor(seeded(seed + 2) * 6);
  const repFrames = Array.from({ length: reps }, (_, index) => {
    const base = seed + index * 11;
    return {
      index: index + 1,
      tempoSeconds: 2.6 + seeded(base) * 1.4,
      confidence: 71 + seeded(base + 1) * 24,
      rangeScore: 62 + seeded(base + 2) * 28,
      depthLoss: 5 + seeded(base + 3) * 22,
      lateralDriftDeg: 1 + seeded(base + 4) * 8,
    };
  });

  const durationMs = Math.round(repFrames.reduce((total, frame) => total + frame.tempoSeconds * 1000, 0));

  return {
    id: `session-${Math.abs(Math.floor(seed)).toString(36)}`,
    startedAt: new Date(Date.now() - durationMs).toISOString(),
    movement: "Bodyweight squat",
    durationMs,
    repFrames,
  };
}

export function createRuntimeStatus(cameraState: "idle" | "ready" | "blocked", session: SessionData): RuntimeStatus {
  if (cameraState === "ready") {
    return {
      cameraAvailable: true,
      modelAvailable: true,
      headline: "Camera feed live. Skeleton model can attach here.",
      detail: `Tracking ${session.repFrames.length} rep windows with live overlay enabled.`,
    };
  }

  if (cameraState === "blocked") {
    return {
      cameraAvailable: false,
      modelAvailable: false,
      headline: "Camera unavailable. Mock session pipeline active.",
      detail: "Use generated rep sequences to validate summary cards, notes, and coaching responses.",
    };
  }

  return {
    cameraAvailable: false,
    modelAvailable: false,
    headline: "Waiting for camera or mock session trigger.",
    detail: "The shell remains usable without device access so the product walkthrough never stalls.",
  };
}

export function sessionToTimeline(session: SessionData): TimelinePoint[] {
  return session.repFrames.map((frame) => ({
    label: `Rep ${frame.index}`,
    confidence: frame.confidence,
    rangeScore: frame.rangeScore,
  }));
}
