import type { LandmarkPoint } from "@formiq/types";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function angleBetweenPoints(a: LandmarkPoint, b: LandmarkPoint, c: LandmarkPoint): number {
  const abx = a.x - b.x;
  const aby = a.y - b.y;
  const abz = (a.z ?? 0) - (b.z ?? 0);
  const cbx = c.x - b.x;
  const cby = c.y - b.y;
  const cbz = (c.z ?? 0) - (b.z ?? 0);
  const dot = abx * cbx + aby * cby + abz * cbz;
  const magAB = Math.hypot(abx, aby, abz);
  const magCB = Math.hypot(cbx, cby, cbz);

  if (magAB === 0 || magCB === 0) {
    return 0;
  }

  return toDegrees(Math.acos(clamp(dot / (magAB * magCB), -1, 1)));
}

export function rangeOfMotion(minAngleDeg: number, maxAngleDeg: number): number {
  return Math.max(0, maxAngleDeg - minAngleDeg);
}

export function normalizedAngleProgress(
  angleDeg: number,
  lockoutAngleDeg: number,
  bottomAngleDeg: number,
): number {
  const span = Math.max(1, lockoutAngleDeg - bottomAngleDeg);
  return clamp((lockoutAngleDeg - angleDeg) / span, 0, 1);
}
