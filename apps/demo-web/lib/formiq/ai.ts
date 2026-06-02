import type { CoachResponse, RuntimeStatus, SessionData, SessionSummary } from "@formiq/types";

export function buildCoachPrompt(session: SessionData, runtime: RuntimeStatus) {
  const avgConfidence = Math.round(
    session.repFrames.reduce((sum, frame) => sum + frame.confidence, 0) / Math.max(session.repFrames.length, 1),
  );

  return [
    `Movement: ${session.movement}`,
    `Duration ms: ${session.durationMs}`,
    `Reps: ${session.repFrames.length}`,
    `Average confidence: ${avgConfidence}`,
    `Runtime: ${runtime.headline}`,
    `Runtime detail: ${runtime.detail}`,
    "Return concise JSON coaching for a product demo.",
  ].join("\n");
}

export function buildDeterministicCoaching(
  session: SessionData,
  summary: SessionSummary,
  prompt: string,
): CoachResponse {
  const reps = session.repFrames.length;
  const emphasis = summary.leftDrift > 5 ? "Reduce side-shift before chasing more speed." : "Keep depth steady through the final reps.";

  return {
    summary: `Mock coaching: ${reps} reps captured with usable consistency. ${emphasis}`,
    cues: [
      "Brace before the descent so the hips track straighter.",
      "Pause for a split second at the bottom to reclaim depth.",
      "Match the final rep tempo to the first rep tempo.",
    ],
    focus: summary.nextFocus,
    source: "mock",
    prompt,
  };
}
