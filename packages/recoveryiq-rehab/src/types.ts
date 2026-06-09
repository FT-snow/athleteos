export type BodyZone =
  | "knees" | "shoulders" | "elbows" | "back" | "spine" | "hips"
  | "ankles" | "wrists" | "neck" | "core" | "glutes" | "hamstrings" | "quads";

export type InjurySeverity = "mild" | "moderate" | "severe";

export type RehabPhase = "acute" | "subacute" | "rehab" | "strength" | "return-to-sport";

export type InjuryStatus = "active" | "rehab" | "recovered";

export interface RehabExercise {
  name: string;
  description: string;
  sets: number;
  reps: number;
  frequency: string;
  contraindications: string[];
  progressionCriterion: string;
}

export interface InjuryProtocol {
  id: string;
  zone: BodyZone;
  diagnosis: string;
  aliases: string[];
  severity: InjurySeverity;
  description: string;
  typicalRecoveryWeeks: [number, number];
  phases: Partial<Record<RehabPhase, {
    goals: string[];
    exercises: RehabExercise[];
    restrictions: string[];
    milestone: string;
  }>>;
  contraindicatedExercises: string[];
  returnCriteria: string[];
}

export interface InjuryRecord {
  id: string;
  athleteId: string;
  zone: BodyZone;
  diagnosis: string;
  severity: InjurySeverity;
  dateOccurred: string;
  dateResolved?: string;
  status: InjuryStatus;
  protocolId: string;
  notes?: string;
}

export interface RehabProgressEntry {
  id: string;
  injuryId: string;
  date: string;
  phase: RehabPhase;
  painLevel: number;
  rangeOfMotion?: number;
  swelling?: number;
  exercisesCompleted: string[];
  compliance: number;
  notes?: string;
}

export interface RehabProgressReport {
  injuryId: string;
  currentPhase: RehabPhase;
  daysInPhase: number;
  totalDays: number;
  painTrend: "improving" | "stable" | "worsening";
  romTrend: "improving" | "stable" | "worsening" | "unknown";
  complianceRate: number;
  projectedDaysToRecovery: number;
  score: number;
  stalled: boolean;
  alerts: string[];
}

export interface ReturnToPlayAssessment {
  ready: boolean;
  score: number;
  criteriaResults: { criterion: string; met: boolean; details: string }[];
  riskOfReinjury: "low" | "moderate" | "high";
  recommendations: string[];
}
