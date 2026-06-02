import type { BodySide, LandmarkFrame } from "./landmarks";

export type ExerciseKind = 
  | "squat" | "pushup" | "deadlift"
  | "golf_swing" | "tennis_serve" | "tennis_forehand" | "tennis_backhand"
  | "badminton_smash" | "badminton_clear" | "badminton_lunge"
  | "cricket_drive" | "cricket_bowling" | "cricket_cut"
  | "football_kick" | "football_sprint"
  | "incline_press" | "chest_press" | "pec_fly" | "pushups"
  | "shoulder_press" | "lateral_raise" | "tricep_pushdown"
  | "hammer_curl" | "supinated_curl"
  | "lat_pulldown" | "tbar_row" | "barbell_row" | "reverse_pec_fly"
  | "straight_arm_pulldown" | "face_pull" | "dead_hang" | "plank_to_row"
  | "pistol_squat" | "rdl" | "bulgarian_split_squat" | "abductor" | "sumo_squat"
  | "hip_thrust" | "leg_extension" | "cable_kickback" | "hamstring_curl" | "wall_sit"
  | "plank" | "reverse_plank" | "leg_raise" | "russian_twist" | "jackknife"
  | "leg_hip_lift" | "glute_march" | "beast_hold" | "stomach_vacuum";

export type JointAngleName = "knee" | "hip" | "elbow" | "shoulder" | "torso";

export interface FrameMetrics {
  timestampMs: number;
  exercise: ExerciseKind;
  primarySide: BodySide;
  sourceFrame?: LandmarkFrame;
  jointAngles: Partial<Record<JointAngleName, number>>;
  normalizedDepth?: number;
  verticalDisplacement?: number;
  velocity?: number;
  confidence?: number;
}

export type RepPhase = "idle" | "descent" | "bottom" | "ascent" | "lockedOut";

export interface RepMetrics {
  repIndex: number;
  exercise: ExerciseKind;
  side: BodySide;
  startedAtMs: number;
  endedAtMs: number;
  durationMs: number;
  eccentricDurationMs?: number;
  concentricDurationMs?: number;
  minAngleDeg: number;
  maxAngleDeg: number;
  rangeOfMotionDeg: number;
  depthScore: number;
  tempoScore: number;
  consistencyScore: number;
  score: number;
  valid: boolean;
}

export interface FatigueResult {
  detected: boolean;
  onsetRepIndex?: number;
  confidence: number;
  scoreTrend: number;
  romTrend: number;
  tempoTrend: number;
  reasons: string[];
}

export interface SessionSummary {
  exercise: ExerciseKind;
  totalReps: number;
  validReps: number;
  invalidReps: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  averageRangeOfMotionDeg: number;
  averageRepDurationMs: number;
  cadenceRpm: number;
  startedAtMs?: number;
  endedAtMs?: number;
  durationMs: number;
  fatigue: FatigueResult;
}
