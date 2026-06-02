import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const create = mutationGeneric({
  args: {
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
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("reps", {
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
      .query("reps")
      .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
      .collect();
  },
});
