import type { RefObject } from "react";

declare module "@formiq/types" {
  export type PosePipelineStatus =
    | "idle"
    | "requesting-camera"
    | "camera-ready"
    | "loading-model"
    | "running"
    | "mock"
    | "error";

  export interface PoseLandmark {
    x: number;
    y: number;
    z?: number;
    visibility?: number;
    presence?: number;
  }

  export interface BodyLatticeNode {
    id: string;
    index: number;
    x: number;
    y: number;
    z: number;
    confidence: number;
  }

  export interface BodyLatticeEdge {
    id: string;
    from: string;
    to: string;
    confidence: number;
  }

  export interface BodyLattice {
    nodes: BodyLatticeNode[];
    edges: BodyLatticeEdge[];
    bounds: {
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
    };
  }

  export interface PoseFrame {
    timestampMs: number;
    landmarks: PoseLandmark[];
    lattice: BodyLattice;
    source: "camera" | "mock";
  }

  export interface PosePipelineState {
    status: PosePipelineStatus;
    isCameraReady: boolean;
    isModelReady: boolean;
    usingMock: boolean;
    startedAtMs: number | null;
    latestFrame: PoseFrame | null;
    errorMessage: string | null;
  }

  export interface MetricStat {
    id: string;
    label: string;
    value: string;
    delta?: string;
    tone?: "neutral" | "positive" | "warning" | "danger";
  }

  export interface RepTimelineEntry {
    id: string;
    repIndex: number;
    timestampLabel: string;
    score: number;
    phase?: string;
    quality?: "strong" | "steady" | "fatigued";
  }

  export interface SummaryHeroData {
    title: string;
    subtitle: string;
    primaryMetricLabel: string;
    primaryMetricValue: string;
    secondaryMetricLabel?: string;
    secondaryMetricValue?: string;
    badge?: string;
  }

  export interface FatiguePoint {
    label: string;
    fatigue: number;
    stability?: number;
    symmetry?: number;
  }

  export interface CoachingCue {
    id: string;
    title: string;
    body: string;
    priority?: "low" | "medium" | "high";
    tags?: string[];
  }

  export interface LiveVideoStageProps {
    title?: string;
    subtitle?: string;
    status: PosePipelineStatus;
    mirrored?: boolean;
    videoRef?: RefObject<HTMLVideoElement | null>;
    overlayCanvasRef?: RefObject<HTMLCanvasElement | null>;
    latestFrame?: PoseFrame | null;
    errorMessage?: string | null;
    emptyLabel?: string;
    className?: string;
  }

  export interface StatsRailProps {
    title?: string;
    stats: MetricStat[];
    className?: string;
  }

  export interface RepTimelineProps {
    title?: string;
    reps: RepTimelineEntry[];
    activeRepIndex?: number;
    className?: string;
  }

  export interface SummaryHeroProps {
    summary: SummaryHeroData;
    className?: string;
  }

  export interface FatigueChartsProps {
    title?: string;
    data: FatiguePoint[];
    className?: string;
  }

  export interface CoachingCardProps {
    title?: string;
    cue: CoachingCue;
    className?: string;
  }
}

export {};
