export type ExerciseCategory =
  | "push" | "pull" | "legs" | "core"
  | "golf" | "tennis" | "badminton" | "cricket" | "football";

export interface BodyAngle {
  joint: string;
  p1: string; // proximal landmark
  p2: string; // vertex landmark  
  p3: string; // distal landmark
}

export type BodySide = "left" | "right" | "both";

export interface BiomechanicalCheckpoint {
  id: string;
  name: string;
  description: string;
  angle: BodyAngle;
  goodRange: [number, number]; // degrees [min, max] for good form
  warningRange: [number, number]; // degrees before form breaks
  criticalRange: [number, number]; // dangerous/injury risk range
  side: BodySide;
  phase: string;
  weight: number; // 0-1 importance
  cueGood?: string;
  cueWarning?: string;
  cueCritical?: string;
}

export interface MovementPhase {
  name: string;
  description: string;
  startCheckpoint?: string;
  endCheckpoint?: string;
}

export interface ExerciseBiomechanics {
  id: string;
  name: string;
  aliases: string[];
  category: ExerciseCategory;
  description: string;
  tags: string[];
  landmarks: string[];
  checkpoints: BiomechanicalCheckpoint[];
  phases: MovementPhase[];
}

export interface BiomechanicsBundle {
  sport: string;
  exercises: ExerciseBiomechanics[];
}

export function createCheckpointAngle(
  joint: string,
  p1: string,
  p2: string,
  p3: string
): BodyAngle {
  return { joint, p1, p2, p3 };
}

export function degreesToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radiansToDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function computeAngle(
  p1: { x: number; y: number; z?: number },
  p2: { x: number; y: number; z?: number },
  p3: { x: number; y: number; z?: number }
): number {
  const v1 = { x: p1.x - p2.x, y: p1.y - p2.y, z: (p1.z ?? 0) - (p2.z ?? 0) };
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y, z: (p3.z ?? 0) - (p2.z ?? 0) };
  
  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
  
  if (mag1 === 0 || mag2 === 0) return 0;
  
  const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return radiansToDegrees(Math.acos(cosAngle));
}

export function evaluateCheckpoint(
  checkpoint: BiomechanicalCheckpoint,
  angle: number
): "good" | "warning" | "critical" {
  if (angle >= checkpoint.criticalRange[0] && angle <= checkpoint.criticalRange[1]) {
    return "critical";
  }
  if (angle >= checkpoint.warningRange[0] && angle <= checkpoint.warningRange[1]) {
    return "warning";
  }
  if (angle >= checkpoint.goodRange[0] && angle <= checkpoint.goodRange[1]) {
    return "good";
  }
  return "critical"; // Safer default — angle beyond all defined ranges
}
