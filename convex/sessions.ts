import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const create = mutationGeneric({
  args: {
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
  },
  handler: async (ctx, args) => {
    const timestamp = new Date().toISOString();
    return ctx.db.insert("sessions", {
      ...args,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateStatus = mutationGeneric({
  args: {
    sessionId: v.id("sessions"),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    endedAt: v.optional(v.string()),
    averageScore: v.optional(v.number()),
    consistencyScore: v.optional(v.number()),
  },
  handler: async (ctx, { sessionId, ...patch }) => {
    await ctx.db.patch(sessionId, {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
    return sessionId;
  },
});

export const getByExternalSessionId = queryGeneric({
  args: {
    externalSessionId: v.string(),
  },
  handler: async (ctx, { externalSessionId }) => {
    return ctx.db
      .query("sessions")
      .withIndex("by_external_session_id", (q) =>
        q.eq("externalSessionId", externalSessionId),
      )
      .unique();
  },
});
