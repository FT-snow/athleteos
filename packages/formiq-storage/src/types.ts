export interface SessionSummaryRecord {
  externalSessionId: string;
  athleteId?: string;
  exerciseName: string;
  startedAt: string;
  endedAt?: string;
  status: "pending" | "active" | "completed" | "failed";
  averageScore?: number;
  consistencyScore?: number;
}

export interface RepSummaryRecord {
  sessionId: string;
  repIndex: number;
  score?: number;
  phase?: "eccentric" | "concentric" | "isometric" | "unknown";
  strengths: string[];
  issues: string[];
}

export interface FrameSummaryRecord {
  sessionId: string;
  repIndex?: number;
  frameIndex: number;
  timestampMs: number;
  postureLabel?: string;
  confidence?: number;
  summary?: string;
}

export interface CoachingMessageRecord {
  sessionId: string;
  repIndex?: number;
  scope: "post-rep" | "post-session";
  title: string;
  summary: string;
  cues: string[];
  model?: string;
}

export interface MutationDescriptor<TPayload> {
  path: string;
  payload: TPayload;
}
