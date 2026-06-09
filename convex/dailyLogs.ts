import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    athleteId: v.string(),
    date: v.string(),
    sleepHours: v.number(),
    sleepQuality: v.number(),
    wakeUps: v.number(),
    morningEnergy: v.number(),
    restingHr: v.number(),
    morningFeel: v.number(),
    motivation: v.number(),
    stress: v.number(),
    focus: v.number(),
    soreness: v.array(
      v.object({ zone: v.string(), rating: v.number() }),
    ),
    trainingLoad: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("dailyLogs", {
      ...args,
      createdAt: new Date().toISOString(),
    });
  },
});

export const getToday = query({
  args: { athleteId: v.string(), date: v.string() },
  handler: async (ctx, { athleteId, date }) => {
    return ctx.db
      .query("dailyLogs")
      .withIndex("by_athlete_date", (q) =>
        q.eq("athleteId", athleteId).eq("date", date),
      )
      .first();
  },
});

export const listRecent = query({
  args: { athleteId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { athleteId, limit }) => {
    return ctx.db
      .query("dailyLogs")
      .withIndex("by_athlete_date", (q) => q.eq("athleteId", athleteId))
      .order("desc")
      .take(limit ?? 7);
  },
});
