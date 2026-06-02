import type { ExerciseConfig } from "./exercise";
import type { LandmarkFrame } from "./landmarks";
import type { ExerciseKind, RepMetrics, SessionSummary } from "./metrics";

export interface StoredSession {
  id: string;
  exercise: ExerciseKind;
  createdAtMs: number;
  frames?: LandmarkFrame[];
  reps: RepMetrics[];
  summary: SessionSummary;
}

export interface StoredExerciseProfile {
  exercise: ExerciseKind;
  config: ExerciseConfig;
  updatedAtMs: number;
}

export interface FormIqStorageAdapter {
  saveSession(session: StoredSession): Promise<void>;
  loadSession(sessionId: string): Promise<StoredSession | null>;
  listSessions(exercise?: ExerciseKind): Promise<StoredSession[]>;
  saveExerciseProfile(profile: StoredExerciseProfile): Promise<void>;
  loadExerciseProfile(exercise: ExerciseKind): Promise<StoredExerciseProfile | null>;
  deleteSession(sessionId: string): Promise<void>;
}
