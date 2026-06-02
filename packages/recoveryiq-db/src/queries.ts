import { eq, and, gte, lte, desc, sql } from "drizzle-orm";
import type { drizzle as DrizzleLibSql } from "drizzle-orm/libsql";
import * as schema from "./schema";

type DrizzleClient = ReturnType<typeof DrizzleLibSql<typeof schema>>;

export function getAthlete(db: DrizzleClient, athleteId: string) {
  return db.query.athletes.findFirst({
    where: eq(schema.athletes.id, athleteId),
  });
}

export function getDailyLogs(
  db: DrizzleClient,
  athleteId: string,
  startDate: string,
  endDate: string,
) {
  return db.query.dailyLogs.findMany({
    where: and(
      eq(schema.dailyLogs.athleteId, athleteId),
      gte(schema.dailyLogs.date, startDate),
      lte(schema.dailyLogs.date, endDate),
    ),
    orderBy: desc(schema.dailyLogs.date),
  });
}

export function getRecentLogs(
  db: DrizzleClient,
  athleteId: string,
  days: number,
) {
  const cutoff = sql`date('now', '-' || ${days} || ' days')`;
  return db.query.dailyLogs.findMany({
    where: and(
      eq(schema.dailyLogs.athleteId, athleteId),
      gte(schema.dailyLogs.date, cutoff),
    ),
    orderBy: desc(schema.dailyLogs.date),
  });
}

export function getSorenessForLog(db: DrizzleClient, dailyLogId: string) {
  return db.query.sorenessEntries.findMany({
    where: eq(schema.sorenessEntries.dailyLogId, dailyLogId),
  });
}

export function getActiveInjuries(db: DrizzleClient, athleteId: string) {
  return db.query.injuries.findMany({
    where: and(
      eq(schema.injuries.athleteId, athleteId),
      sql`${schema.injuries.status} != 'recovered'`,
    ),
    orderBy: desc(schema.injuries.dateOccurred),
  });
}

export function getRehabProgress(db: DrizzleClient, injuryId: string) {
  return db.query.rehabProgress.findMany({
    where: eq(schema.rehabProgress.injuryId, injuryId),
    orderBy: desc(schema.rehabProgress.date),
  });
}

export async function insertDailyLog(
  db: DrizzleClient,
  log: typeof schema.dailyLogs.$inferInsert,
  sorenessEntriesData: typeof schema.sorenessEntries.$inferInsert[],
) {
  return db.transaction(async (tx) => {
    const inserted = await tx
      .insert(schema.dailyLogs)
      .values(log)
      .returning();
    if (sorenessEntriesData.length > 0) {
      await tx
        .insert(schema.sorenessEntries)
        .values(
          sorenessEntriesData.map((e) => ({
            ...e,
            dailyLogId: inserted[0].id,
          })),
        )
        .returning();
    }
    return inserted[0];
  });
}

export function insertMlPrediction(
  db: DrizzleClient,
  prediction: typeof schema.mlPredictions.$inferInsert,
) {
  return db.insert(schema.mlPredictions).values(prediction).returning();
}

export function getMlPredictions(
  db: DrizzleClient,
  athleteId: string,
  days: number,
) {
  const cutoff = sql`date('now', '-' || ${days} || ' days')`;
  return db.query.mlPredictions.findMany({
    where: and(
      eq(schema.mlPredictions.athleteId, athleteId),
      gte(schema.mlPredictions.date, cutoff),
    ),
    orderBy: desc(schema.mlPredictions.date),
  });
}
