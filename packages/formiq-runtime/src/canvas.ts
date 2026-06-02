import type { BodyLattice, PoseLandmark } from "@formiq/types";

export interface CanvasDrawOptions {
  width?: number;
  height?: number;
  mirrored?: boolean;
  lineColor?: string;
  pointColor?: string;
  lineWidth?: number;
  pointRadius?: number;
}

const DEFAULTS: Required<CanvasDrawOptions> = {
  width: 1280,
  height: 720,
  mirrored: true,
  lineColor: "rgba(96, 165, 250, 0.9)",
  pointColor: "rgba(248, 250, 252, 0.95)",
  lineWidth: 3,
  pointRadius: 4,
};

function toCanvasPoint(value: number, size: number, mirrored: boolean) {
  const normalized = mirrored ? 1 - value : value;
  return normalized * size;
}

export function resizeOverlayCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  if (canvas.width !== width) {
    canvas.width = width;
  }
  if (canvas.height !== height) {
    canvas.height = height;
  }
}

export function clearOverlayCanvas(context: CanvasRenderingContext2D, width: number, height: number) {
  context.clearRect(0, 0, width, height);
}

export function drawBodyLattice(
  context: CanvasRenderingContext2D,
  lattice: BodyLattice,
  options: CanvasDrawOptions = {},
) {
  const resolved = { ...DEFAULTS, ...options };
  clearOverlayCanvas(context, resolved.width, resolved.height);

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  lattice.edges.forEach((edge) => {
    const from = lattice.nodes.find((node) => node.id === edge.from);
    const to = lattice.nodes.find((node) => node.id === edge.to);

    if (!from || !to) {
      return;
    }

    context.strokeStyle = resolved.lineColor;
    context.globalAlpha = Math.max(edge.confidence, 0.2);
    context.lineWidth = resolved.lineWidth;
    context.beginPath();
    context.moveTo(toCanvasPoint(from.x, resolved.width, resolved.mirrored), from.y * resolved.height);
    context.lineTo(toCanvasPoint(to.x, resolved.width, resolved.mirrored), to.y * resolved.height);
    context.stroke();
  });

  lattice.nodes.forEach((node) => {
    context.fillStyle = resolved.pointColor;
    context.globalAlpha = Math.max(node.confidence, 0.25);
    context.beginPath();
    context.arc(
      toCanvasPoint(node.x, resolved.width, resolved.mirrored),
      node.y * resolved.height,
      resolved.pointRadius,
      0,
      Math.PI * 2,
    );
    context.fill();
  });

  context.restore();
}

export function drawPoseLandmarks(
  context: CanvasRenderingContext2D,
  landmarks: PoseLandmark[],
  options: CanvasDrawOptions = {},
) {
  const lattice = {
    nodes: landmarks.map((landmark, index) => ({
      id: `landmark-${index}`,
      index,
      x: landmark.x,
      y: landmark.y,
      z: landmark.z ?? 0,
      confidence: landmark.visibility ?? landmark.presence ?? 1,
    })),
    edges: [],
    bounds: { minX: 0, minY: 0, maxX: 1, maxY: 1 },
  };

  drawBodyLattice(context, lattice, options);
}
