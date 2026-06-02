import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const create = mutationGeneric({
  args: {
    sessionId: v.id("sessions"),
    repId: v.optional(v.id("reps")),
    frameIndex: v.number(),
    timestampMs: v.number(),
    postureLabel: v.optional(v.string()),
    confidence: v.optional(v.number()),
    summary: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("frameSummaries", {
      ...args,
      createdAt: new Date().toISOString(),
    });
  },
});

export const listBySession = queryGeneric({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, { sessionId }) => {
    return ctx.db
      .query("frameSummaries")
      .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
      .collect();
  },
});
