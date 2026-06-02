import { BodyZone, SorenessEntry } from "./types";

function sorenessPenalty(rating: number): number {
  if (rating <= 2) return 0;
  if (rating === 3) return -5;
  if (rating === 4) return -10;
  return -20;
}

export function aggregateSoreness(entries: SorenessEntry[]): { totalPenalty: number; zoneBreakdown: Record<BodyZone, number> } {
  const zoneBreakdown = {} as Record<BodyZone, number>;
  let totalPenalty = 0;

  for (const entry of entries) {
    const penalty = sorenessPenalty(entry.rating);
    zoneBreakdown[entry.zone] = (zoneBreakdown[entry.zone] || 0) + penalty;
    totalPenalty += penalty;
  }

  return { totalPenalty, zoneBreakdown };
}

export function getSorenessHotspots(entries: SorenessEntry[]): BodyZone[] {
  const seen = new Set<BodyZone>();
  for (const entry of entries) {
    if (entry.rating >= 4) {
      seen.add(entry.zone);
    }
  }
  return Array.from(seen);
}
