import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveAnalysis = mutation({
  args: {
    userId: v.id("users"),
    exercise: v.string(),
    sport: v.string(),
    overallScore: v.number(),
    riskLevel: v.string(),
    angles: v.array(
      v.object({
        joint: v.string(),
        angleDeg: v.number(),
        status: v.string(),
      }),
    ),
    cues: v.array(v.string()),
    imageBase64: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("formAnalyses", {
      userId: args.userId,
      exercise: args.exercise,
      sport: args.sport,
      overallScore: args.overallScore,
      riskLevel: args.riskLevel,
      angles: args.angles,
      cues: args.cues,
      imageBase64: args.imageBase64,
      createdAt: Date.now(),
    });
  },
});

export const getRecentAnalyses = query({
  args: {
    userId: v.id("users"),
    exercise: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { userId, exercise, limit }) => {
    if (exercise) {
      return ctx.db
        .query("formAnalyses")
        .withIndex("by_user_exercise", (q) =>
          q.eq("userId", userId).eq("exercise", exercise),
        )
        .order("desc")
        .take(limit ?? 10);
    }

    return ctx.db
      .query("formAnalyses")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .order("desc")
      .take(limit ?? 10);
  },
});

export const getBestScores = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const analyses = await ctx.db
      .query("formAnalyses")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .collect();

    const best: Record<string, { overallScore: number; riskLevel: string }> =
      {};
    for (const a of analyses) {
      if (!best[a.exercise] || a.overallScore > best[a.exercise].overallScore) {
        best[a.exercise] = {
          overallScore: a.overallScore,
          riskLevel: a.riskLevel,
        };
      }
    }

    return Object.entries(best).map(([exercise, data]) => ({
      exercise,
      ...data,
    }));
  },
});
