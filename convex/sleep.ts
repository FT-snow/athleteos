import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logSleep = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    bedtime: v.string(),
    waketime: v.string(),
    duration: v.number(),
    quality: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sleepLogs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        bedtime: args.bedtime,
        waketime: args.waketime,
        duration: args.duration,
        quality: args.quality,
        notes: args.notes,
      });
      return existing._id;
    }

    return ctx.db.insert("sleepLogs", {
      userId: args.userId,
      date: args.date,
      bedtime: args.bedtime,
      waketime: args.waketime,
      duration: args.duration,
      quality: args.quality,
      notes: args.notes,
      createdAt: Date.now(),
    });
  },
});

export const getSleepLogs = query({
  args: {
    userId: v.id("users"),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, { userId, startDate, endDate }) => {
    let logs = await ctx.db
      .query("sleepLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    if (startDate) {
      logs = logs.filter((l) => l.date >= startDate);
    }
    if (endDate) {
      logs = logs.filter((l) => l.date <= endDate);
    }

    return logs;
  },
});

export const getLatestSleep = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db
      .query("sleepLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
  },
});

export const getLast7Days = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db
      .query("sleepLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(7);
  },
});
