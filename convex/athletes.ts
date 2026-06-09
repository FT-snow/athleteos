import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const createOrUpdate = mutationGeneric({
  args: {
    athleteId: v.string(),
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    sport: v.string(),
    primaryMuscles: v.array(v.string()),
    age: v.optional(v.number()),
    birthday: v.optional(v.string()),
    weight: v.optional(v.number()),
    height: v.optional(v.number()),
    gender: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("athleteProfiles")
      .withIndex("by_athlete_id", (q) => q.eq("athleteId", args.athleteId))
      .unique();

    const timestamp = new Date().toISOString();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        username: args.username,
        sport: args.sport,
        primaryMuscles: args.primaryMuscles,
        age: args.age,
        birthday: args.birthday,
        weight: args.weight,
        height: args.height,
        gender: args.gender,
        onboardingCompleted: true,
        updatedAt: timestamp,
      });
      return existing._id;
    }

    return ctx.db.insert("athleteProfiles", {
      athleteId: args.athleteId,
      name: args.name,
      username: args.username,
      sport: args.sport,
      primaryMuscles: args.primaryMuscles,
      age: args.age,
      birthday: args.birthday,
      weight: args.weight,
      height: args.height,
      gender: args.gender,
      onboardingCompleted: true,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const getByAthleteId = queryGeneric({
  args: { athleteId: v.string() },
  handler: async (ctx, { athleteId }) => {
    return ctx.db
      .query("athleteProfiles")
      .withIndex("by_athlete_id", (q) => q.eq("athleteId", athleteId))
      .unique();
  },
});
