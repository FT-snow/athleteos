import { DailyRecoveryLog, SleepLog, HrvProxy, MentalReadiness } from "./types";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function defaultSleep(): SleepLog {
  return {
    date: today(),
    hours: 7,
    quality: 7,
    wakeUps: 1,
    morningEnergy: 6,
  };
}

function defaultHrv(): HrvProxy {
  return {
    date: today(),
    restingHeartRate: 60,
    morningFeelScore: 6,
  };
}

function defaultMental(): MentalReadiness {
  return {
    date: today(),
    motivation: 7,
    stress: 4,
    confidence: 7,
    focus: 6,
  };
}

export function createDailyLog(defaults?: Partial<DailyRecoveryLog>): DailyRecoveryLog {
  return {
    date: defaults?.date ?? today(),
    sleep: { ...defaultSleep(), ...defaults?.sleep },
    soreness: defaults?.soreness ?? [],
    hrv: { ...defaultHrv(), ...defaults?.hrv },
    mental: { ...defaultMental(), ...defaults?.mental },
    trainingLoad: defaults?.trainingLoad,
    injuryNotes: defaults?.injuryNotes,
  };
}

export function validateLog(log: DailyRecoveryLog): string[] {
  const warnings: string[] = [];

  if (!log.date || !/^\d{4}-\d{2}-\d{2}$/.test(log.date)) {
    warnings.push("Invalid or missing date (expected YYYY-MM-DD)");
  }

  if (log.sleep.hours < 0 || log.sleep.hours > 24) {
    warnings.push("Sleep hours must be between 0 and 24");
  }

  if (log.sleep.quality < 1 || log.sleep.quality > 10) {
    warnings.push("Sleep quality must be between 1 and 10");
  }

  if (log.sleep.wakeUps < 0) {
    warnings.push("Wake-ups cannot be negative");
  }

  if (log.sleep.morningEnergy < 1 || log.sleep.morningEnergy > 10) {
    warnings.push("Morning energy must be between 1 and 10");
  }

  for (const entry of log.soreness) {
    if (entry.rating < 1 || entry.rating > 5) {
      warnings.push(`Soreness rating for ${entry.zone} must be between 1 and 5`);
    }
  }

  if (log.hrv.restingHeartRate < 30 || log.hrv.restingHeartRate > 220) {
    warnings.push("Resting heart rate out of plausible range (30-220)");
  }

  if (log.hrv.morningFeelScore < 1 || log.hrv.morningFeelScore > 10) {
    warnings.push("Morning feel score must be between 1 and 10");
  }

  if (log.mental.motivation < 1 || log.mental.motivation > 10) {
    warnings.push("Motivation must be between 1 and 10");
  }

  if (log.mental.stress < 1 || log.mental.stress > 10) {
    warnings.push("Stress must be between 1 and 10");
  }

  if (log.mental.confidence < 1 || log.mental.confidence > 10) {
    warnings.push("Confidence must be between 1 and 10");
  }

  if (log.mental.focus < 1 || log.mental.focus > 10) {
    warnings.push("Focus must be between 1 and 10");
  }

  return warnings;
}
