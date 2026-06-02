export type SeverityTone = "neutral" | "warn" | "good";

export interface RepFrame {
  index: number;
  tempoSeconds: number;
  confidence: number;
  rangeScore: number;
  depthLoss: number;
  lateralDriftDeg: number;
}

export interface SessionData {
  id: string;
  startedAt: string;
  movement: string;
  durationMs: number;
  repFrames: RepFrame[];
}

export interface SessionRecord extends SessionData {
  savedAt: string;
}

export interface RuntimeStatus {
  cameraAvailable: boolean;
  modelAvailable: boolean;
  headline: string;
  detail: string;
}

export interface SessionMetrics {
  reps: number;
  durationMs: number;
  avgTempo: number;
  confidence: number;
  rangeScore: number;
}

export interface SessionSummary {
  leftDrift: number;
  depthLoss: number;
  recoveryScore: number;
  defaultCues: string[];
  nextFocus: string;
}

export interface BottleneckNote {
  title: string;
  severity: string;
  tone: SeverityTone;
  note: string;
}

export interface CoachRequest {
  session: SessionRecord;
  runtime: RuntimeStatus;
}

export interface CoachResponse {
  summary: string;
  cues: string[];
  focus: string;
  source: string;
  prompt?: string;
}

export interface TimelinePoint {
  label: string;
  confidence: number;
  rangeScore: number;
}
