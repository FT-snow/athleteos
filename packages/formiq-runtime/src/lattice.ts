import type { BodyLattice, BodyLatticeEdge, BodyLatticeNode, PoseLandmark } from "@formiq/types";

const POSE_NODE_NAMES = [
  "nose",
  "left-eye-inner",
  "left-eye",
  "left-eye-outer",
  "right-eye-inner",
  "right-eye",
  "right-eye-outer",
  "left-ear",
  "right-ear",
  "mouth-left",
  "mouth-right",
  "left-shoulder",
  "right-shoulder",
  "left-elbow",
  "right-elbow",
  "left-wrist",
  "right-wrist",
  "left-pinky",
  "right-pinky",
  "left-index",
  "right-index",
  "left-thumb",
  "right-thumb",
  "left-hip",
  "right-hip",
  "left-knee",
  "right-knee",
  "left-ankle",
  "right-ankle",
  "left-heel",
  "right-heel",
  "left-foot-index",
  "right-foot-index",
];

const POSE_CONNECTIONS: Array<[number, number]> = [
  [0, 11],
  [0, 12],
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
  [15, 17],
  [15, 19],
  [15, 21],
  [16, 18],
  [16, 20],
  [16, 22],
  [11, 23],
  [12, 24],
  [23, 24],
  [23, 25],
  [25, 27],
  [27, 29],
  [27, 31],
  [24, 26],
  [26, 28],
  [28, 30],
  [28, 32],
];

function nodeId(index: number) {
  return POSE_NODE_NAMES[index] ?? `landmark-${index}`;
}

function toNode(landmark: PoseLandmark, index: number): BodyLatticeNode {
  return {
    id: nodeId(index),
    index,
    x: landmark.x,
    y: landmark.y,
    z: landmark.z ?? 0,
    confidence: landmark.visibility ?? landmark.presence ?? 1,
  };
}

function toEdge(nodes: BodyLatticeNode[], pair: [number, number]): BodyLatticeEdge | null {
  const from = nodes[pair[0]];
  const to = nodes[pair[1]];

  if (!from || !to) {
    return null;
  }

  return {
    id: `${from.id}:${to.id}`,
    from: from.id,
    to: to.id,
    confidence: Math.min(from.confidence, to.confidence),
  };
}

export function createBodyLattice(landmarks: PoseLandmark[]): BodyLattice {
  const nodes = landmarks.map(toNode);
  const edges = POSE_CONNECTIONS.map((pair) => toEdge(nodes, pair)).filter(
    (edge): edge is BodyLatticeEdge => edge !== null,
  );

  const bounds = nodes.reduce(
    (accumulator, node) => ({
      minX: Math.min(accumulator.minX, node.x),
      minY: Math.min(accumulator.minY, node.y),
      maxX: Math.max(accumulator.maxX, node.x),
      maxY: Math.max(accumulator.maxY, node.y),
    }),
    { minX: 1, minY: 1, maxX: 0, maxY: 0 },
  );

  return { nodes, edges, bounds };
}

export const FORM_IQ_POSE_CONNECTIONS = POSE_CONNECTIONS;
