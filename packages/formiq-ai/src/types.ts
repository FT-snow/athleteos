export type CoachingScope = "post-rep" | "post-session";

export interface JointMetric {
  name: string;
  measured: number;
  target?: number;
  unit?: string;
  delta?: number;
}

export interface RepCoachingInput {
  exerciseName: string;
  repIndex: number;
  overallScore?: number;
  strengths: string[];
  issues: string[];
  keyMetrics: JointMetric[];
  athleteNotes?: string;
}

export interface SessionCoachingInput {
  exerciseName: string;
  totalReps: number;
  averageScore?: number;
  consistencyScore?: number;
  highlights: string[];
  recurringIssues: string[];
  recommendedFocusAreas: string[];
  athleteNotes?: string;
}

export interface CoachingMessage {
  title: string;
  summary: string;
  cues: string[];
  confidence?: number;
}
