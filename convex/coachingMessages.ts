import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const create = mutationGeneric({
  args: {
    sessionId: v.id("sessions"),
    repId: v.optional(v.id("reps")),
    scope: v.union(v.literal("post-rep"), v.literal("post-session")),
    title: v.string(),
    summary: v.string(),
    cues: v.array(v.string()),
    model: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("coachingMessages", {
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
      .query("coachingMessages")
      .withIndex("by_session_id", (q) => q.eq("sessionId", sessionId))
      .collect();
  },
});
