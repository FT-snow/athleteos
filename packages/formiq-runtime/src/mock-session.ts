import type { PoseFrame, PoseLandmark } from "@formiq/types";

import { createBodyLattice } from "./lattice";

function oscillate(base: number, amplitude: number, phase: number) {
  return base + Math.sin(phase) * amplitude;
}

function createMockLandmarks(phase: number): PoseLandmark[] {
  const hipY = oscillate(0.62, 0.08, phase);
  const shoulderY = oscillate(0.34, 0.03, phase);
  const kneeY = oscillate(0.82, 0.1, phase);

  return [
    { x: 0.5, y: 0.14, visibility: 1 },
    { x: 0.47, y: 0.13, visibility: 1 },
    { x: 0.46, y: 0.13, visibility: 1 },
    { x: 0.45, y: 0.13, visibility: 1 },
    { x: 0.53, y: 0.13, visibility: 1 },
    { x: 0.54, y: 0.13, visibility: 1 },
    { x: 0.55, y: 0.13, visibility: 1 },
    { x: 0.42, y: 0.16, visibility: 1 },
    { x: 0.58, y: 0.16, visibility: 1 },
    { x: 0.47, y: 0.18, visibility: 1 },
    { x: 0.53, y: 0.18, visibility: 1 },
    { x: 0.42, y: shoulderY, visibility: 1 },
    { x: 0.58, y: shoulderY, visibility: 1 },
    { x: 0.39, y: oscillate(0.47, 0.05, phase), visibility: 1 },
    { x: 0.61, y: oscillate(0.47, 0.05, phase + 0.15), visibility: 1 },
    { x: 0.37, y: oscillate(0.6, 0.06, phase), visibility: 1 },
    { x: 0.63, y: oscillate(0.6, 0.06, phase + 0.15), visibility: 1 },
    { x: 0.35, y: 0.62, visibility: 1 },
    { x: 0.65, y: 0.62, visibility: 1 },
    { x: 0.36, y: 0.58, visibility: 1 },
    { x: 0.64, y: 0.58, visibility: 1 },
    { x: 0.38, y: 0.57, visibility: 1 },
    { x: 0.62, y: 0.57, visibility: 1 },
    { x: 0.45, y: hipY, visibility: 1 },
    { x: 0.55, y: hipY, visibility: 1 },
    { x: 0.45, y: kneeY, visibility: 1 },
    { x: 0.55, y: kneeY, visibility: 1 },
    { x: 0.44, y: oscillate(0.95, 0.04, phase), visibility: 1 },
    { x: 0.56, y: oscillate(0.95, 0.04, phase), visibility: 1 },
    { x: 0.43, y: 0.98, visibility: 1 },
    { x: 0.57, y: 0.98, visibility: 1 },
    { x: 0.45, y: 0.99, visibility: 1 },
    { x: 0.55, y: 0.99, visibility: 1 },
  ];
}

export function createMockPoseFrame(timestampMs: number): PoseFrame {
  const phase = timestampMs / 300;
  const landmarks = createMockLandmarks(phase);
  return {
    timestampMs,
    landmarks,
    lattice: createBodyLattice(landmarks),
    source: "mock",
  };
}

export function createMockSessionGenerator() {
  return {
    next(timestampMs: number) {
      return createMockPoseFrame(timestampMs);
    },
  };
}
