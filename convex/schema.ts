import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    externalSessionId: v.string(),
    athleteId: v.optional(v.string()),
    exerciseName: v.string(),
    startedAt: v.string(),
    endedAt: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    averageScore: v.optional(v.number()),
    consistencyScore: v.optional(v.number()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_external_session_id", ["externalSessionId"]),
  reps: defineTable({
    sessionId: v.id("sessions"),
    repIndex: v.number(),
    score: v.optional(v.number()),
    phase: v.optional(
      v.union(
        v.literal("eccentric"),
        v.literal("concentric"),
        v.literal("isometric"),
        v.literal("unknown"),
      ),
    ),
    strengths: v.array(v.string()),
    issues: v.array(v.string()),
    createdAt: v.string(),
  }).index("by_session_id", ["sessionId"]),
  frameSummaries: defineTable({
    sessionId: v.id("sessions"),
    repId: v.optional(v.id("reps")),
    frameIndex: v.number(),
    timestampMs: v.number(),
    postureLabel: v.optional(v.string()),
    confidence: v.optional(v.number()),
    summary: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_session_id", ["sessionId"]),
  coachingMessages: defineTable({
    sessionId: v.id("sessions"),
    repId: v.optional(v.id("reps")),
    scope: v.union(v.literal("post-rep"), v.literal("post-session")),
    title: v.string(),
    summary: v.string(),
    cues: v.array(v.string()),
    model: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_session_id", ["sessionId"]),
});
