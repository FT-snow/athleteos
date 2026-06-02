export interface SleepLog {
  date: string;
  hours: number;
  quality: number;
  wakeUps: number;
  morningEnergy: number;
  notes?: string;
}

export interface SorenessEntry {
  date: string;
  zone: BodyZone;
  rating: number;
  side?: "left" | "right" | "both";
  notes?: string;
}

export type BodyZone = "legs" | "back" | "shoulders" | "arms" | "core" | "chest" | "glutes" | "hips" | "neck" | "knees" | "ankles" | "wrists" | "elbows";

export interface HrvProxy {
  date: string;
  restingHeartRate: number;
  morningFeelScore: number;
}

export interface MentalReadiness {
  date: string;
  motivation: number;
  stress: number;
  confidence: number;
  focus: number;
}

export interface DailyRecoveryLog {
  date: string;
  sleep: SleepLog;
  soreness: SorenessEntry[];
  hrv: HrvProxy;
  mental: MentalReadiness;
  trainingLoad?: number;
  injuryNotes?: string;
}

export interface SleepScore {
  total: number;
  hoursScore: number;
  qualityScore: number;
  continuityScore: number;
  morningEnergyScore: number;
  breakdown: string;
}

export interface RecoveryScore {
  total: number;
  sleep: SleepScore;
  sorenessPenalty: number;
  hrvScore: number;
  mentalScore: number;
  readiness: number;
  fatigueLevel: "low" | "moderate" | "high" | "extreme";
  trend: "improving" | "stable" | "declining";
  recommendation: string;
}
