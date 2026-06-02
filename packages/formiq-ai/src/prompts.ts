import type {
  RepCoachingInput,
  SessionCoachingInput,
} from "./types";
import type { OpenRouterChatMessage } from "./openrouter";

const serializeMetrics = (
  metrics: RepCoachingInput["keyMetrics"],
): string => {
  if (metrics.length === 0) {
    return "- No biomechanical metrics were captured.";
  }

  return metrics
    .map((metric) => {
      const target = metric.target === undefined ? "n/a" : String(metric.target);
      const unit = metric.unit ? ` ${metric.unit}` : "";
      const delta = metric.delta === undefined ? "n/a" : `${metric.delta}${unit}`;
      return `- ${metric.name}: measured ${metric.measured}${unit}, target ${target}${unit}, delta ${delta}`;
    })
    .join("\n");
};

export const buildPostRepCoachingPrompt = (
  input: RepCoachingInput,
): OpenRouterChatMessage[] => {
  const system = [
    "You are FormIQ, an expert strength and movement coach.",
    "Return concise coaching for a single completed rep.",
    "Prioritize actionable cues over explanations.",
    "Respond with JSON matching this shape:",
    '{"title":"string","summary":"string","cues":["string"],"confidence":0.0}',
  ].join(" ");

  const user = [
    `Exercise: ${input.exerciseName}`,
    `Rep index: ${input.repIndex}`,
    `Overall score: ${input.overallScore ?? "unknown"}`,
    `Strengths: ${input.strengths.join(", ") || "none recorded"}`,
    `Issues: ${input.issues.join(", ") || "none recorded"}`,
    `Athlete notes: ${input.athleteNotes ?? "none"}`,
    "Key metrics:",
    serializeMetrics(input.keyMetrics),
    "Generate 2-4 coaching cues that the athlete can apply on the next rep.",
  ].join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
};

export const buildPostSessionCoachingPrompt = (
  input: SessionCoachingInput,
): OpenRouterChatMessage[] => {
  const system = [
    "You are FormIQ, an expert strength and movement coach.",
    "Return a brief end-of-session coaching summary.",
    "Highlight the session trend and next-session priorities.",
    "Respond with JSON matching this shape:",
    '{"title":"string","summary":"string","cues":["string"],"confidence":0.0}',
  ].join(" ");

  const user = [
    `Exercise: ${input.exerciseName}`,
    `Total reps: ${input.totalReps}`,
    `Average score: ${input.averageScore ?? "unknown"}`,
    `Consistency score: ${input.consistencyScore ?? "unknown"}`,
    `Highlights: ${input.highlights.join(", ") || "none recorded"}`,
    `Recurring issues: ${input.recurringIssues.join(", ") || "none recorded"}`,
    `Recommended focus areas: ${input.recommendedFocusAreas.join(", ") || "none recorded"}`,
    `Athlete notes: ${input.athleteNotes ?? "none"}`,
    "Generate 3-5 coaching cues that can guide the next training block.",
  ].join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
};
