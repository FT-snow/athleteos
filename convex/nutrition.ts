import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logMeal = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    meal: v.object({
      id: v.string(),
      foodId: v.string(),
      name: v.string(),
      serving: v.string(),
      nutrients: v.record(v.string(), v.number()),
      timestamp: v.string(),
    }),
    totals: v.record(v.string(), v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("nutritionLogs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        meals: [...existing.meals, args.meal],
        totals: args.totals,
      });
      return existing._id;
    }

    return ctx.db.insert("nutritionLogs", {
      userId: args.userId,
      date: args.date,
      meals: [args.meal],
      totals: args.totals,
      createdAt: Date.now(),
    });
  },
});

export const removeMeal = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    mealId: v.string(),
    totals: v.record(v.string(), v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("nutritionLogs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date),
      )
      .first();

    if (!existing) return;

    const meals = existing.meals.filter((m) => m.id !== args.mealId);

    await ctx.db.patch(existing._id, {
      meals,
      totals: args.totals,
    });
  },
});

export const getDayNutrition = query({
  args: { userId: v.id("users"), date: v.string() },
  handler: async (ctx, { userId, date }) => {
    return ctx.db
      .query("nutritionLogs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", userId).eq("date", date),
      )
      .first();
  },
});

export const getWeekNutrition = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db
      .query("nutritionLogs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(7);
  },
});
