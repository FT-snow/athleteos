import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const athletes = sqliteTable("athletes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  sport: text("sport").notNull(),
  position: text("position"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const dailyLogs = sqliteTable("daily_logs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  athleteId: text("athlete_id")
    .notNull()
    .references(() => athletes.id),
  date: text("date").notNull(),
  sleepHours: real("sleep_hours").notNull(),
  sleepQuality: integer("sleep_quality").notNull(),
  sleepWakeUps: integer("sleep_wake_ups").notNull(),
  morningEnergy: integer("morning_energy").notNull(),
  restingHeartRate: integer("resting_heart_rate").notNull(),
  morningFeelScore: integer("morning_feel_score").notNull(),
  motivation: integer("motivation").notNull(),
  stress: integer("stress").notNull(),
  confidence: integer("confidence").notNull(),
  focus: integer("focus").notNull(),
  trainingLoad: real("training_load"),
  recoveryScore: real("recovery_score").notNull(),
  readinessScore: real("readiness_score").notNull(),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
});

export const sorenessEntries = sqliteTable("soreness_entries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  dailyLogId: text("daily_log_id")
    .notNull()
    .references(() => dailyLogs.id),
  zone: text("zone").notNull(),
  rating: integer("rating").notNull(),
  side: text("side"),
  notes: text("notes"),
});

export const injuries = sqliteTable("injuries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  athleteId: text("athlete_id")
    .notNull()
    .references(() => athletes.id),
  bodyZone: text("body_zone").notNull(),
  diagnosis: text("diagnosis").notNull(),
  severity: text("severity").notNull(),
  dateOccurred: text("date_occurred").notNull(),
  dateResolved: text("date_resolved"),
  status: text("status").notNull(),
  rehabProtocol: text("rehab_protocol"),
  notes: text("notes").notNull(),
  createdAt: text("created_at").notNull(),
});

export const rehabProgress = sqliteTable("rehab_progress", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  injuryId: text("injury_id")
    .notNull()
    .references(() => injuries.id),
  date: text("date").notNull(),
  painLevel: integer("pain_level").notNull(),
  rangeOfMotion: real("range_of_motion"),
  exercises: text("exercises"),
  compliance: integer("compliance").notNull(),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
});

export const mlPredictions = sqliteTable("ml_predictions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  athleteId: text("athlete_id")
    .notNull()
    .references(() => athletes.id),
  date: text("date").notNull(),
  readinessScore: real("readiness_score").notNull(),
  injuryRisk: text("injury_risk").notNull(),
  fatigueDetected: integer("fatigue_detected").notNull(),
  topFeatures: text("top_features").notNull(),
  modelVersion: text("model_version").notNull(),
  createdAt: text("created_at").notNull(),
});
