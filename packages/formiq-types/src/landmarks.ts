export type BodySide = "left" | "right";

export type BodyLandmarkName =
  | "nose"
  | "leftShoulder"
  | "rightShoulder"
  | "leftElbow"
  | "rightElbow"
  | "leftWrist"
  | "rightWrist"
  | "leftHip"
  | "rightHip"
  | "leftKnee"
  | "rightKnee"
  | "leftAnkle"
  | "rightAnkle";

export interface LandmarkPoint {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export interface NamedLandmark extends LandmarkPoint {
  name: BodyLandmarkName;
}

export type LandmarkMap = Partial<Record<BodyLandmarkName, LandmarkPoint>>;

export interface LandmarkFrame {
  timestampMs: number;
  landmarks: LandmarkMap;
  sourceId?: string;
}

export interface SideLandmarks {
  shoulder?: LandmarkPoint;
  elbow?: LandmarkPoint;
  wrist?: LandmarkPoint;
  hip?: LandmarkPoint;
  knee?: LandmarkPoint;
  ankle?: LandmarkPoint;
}

export type PoseData = LandmarkFrame;
