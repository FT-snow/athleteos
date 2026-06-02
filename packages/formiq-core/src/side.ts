import type { BodyLandmarkName, BodySide, LandmarkMap, SideLandmarks } from "@formiq/types";

const SIDE_KEYS: Record<BodySide, Record<keyof SideLandmarks, BodyLandmarkName>> = {
  left: {
    shoulder: "leftShoulder",
    elbow: "leftElbow",
    wrist: "leftWrist",
    hip: "leftHip",
    knee: "leftKnee",
    ankle: "leftAnkle",
  },
  right: {
    shoulder: "rightShoulder",
    elbow: "rightElbow",
    wrist: "rightWrist",
    hip: "rightHip",
    knee: "rightKnee",
    ankle: "rightAnkle",
  },
};

export function getSideLandmarks(landmarks: LandmarkMap, side: BodySide): SideLandmarks {
  const sideKeys = SIDE_KEYS[side];

  return {
    shoulder: landmarks[sideKeys.shoulder],
    elbow: landmarks[sideKeys.elbow],
    wrist: landmarks[sideKeys.wrist],
    hip: landmarks[sideKeys.hip],
    knee: landmarks[sideKeys.knee],
    ankle: landmarks[sideKeys.ankle],
  };
}

function visibilityScore(landmarks: SideLandmarks): number {
  return Object.values(landmarks).reduce((total, point) => total + (point?.visibility ?? 0.5), 0);
}

export function selectPrimarySide(landmarks: LandmarkMap, preferred: BodySide | "auto" = "auto"): BodySide {
  if (preferred !== "auto") {
    return preferred;
  }

  const leftScore = visibilityScore(getSideLandmarks(landmarks, "left"));
  const rightScore = visibilityScore(getSideLandmarks(landmarks, "right"));
  return rightScore > leftScore ? "right" : "left";
}
