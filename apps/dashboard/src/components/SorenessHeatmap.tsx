import type { SorenessEntry, BodyZone } from "@recoveryiq/core";

const zoneOrder: BodyZone[] = ["neck", "shoulders", "arms", "chest", "core", "back", "hips", "glutes", "legs", "knees", "ankles"];

export function SorenessHeatmap({ entries }: { entries: SorenessEntry[] }) {
  const getColor = (rating?: number) => {
    if (!rating || rating <= 1) return "bg-green-900/30 text-green-300";
    if (rating === 2) return "bg-yellow-900/30 text-yellow-300";
    if (rating === 3) return "bg-orange-900/30 text-orange-300";
    if (rating === 4) return "bg-red-900/30 text-red-300";
    return "bg-red-950/50 text-red-200";
  };

  const entryMap = new Map(entries.map(e => [e.zone, e]));

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">Soreness Map</p>
      <div className="grid grid-cols-2 gap-2">
        {zoneOrder.map(zone => {
          const entry = entryMap.get(zone);
          return (
            <div key={zone} className={`rounded-xl px-3 py-2 text-center text-sm capitalize ${getColor(entry?.rating)}`}>
              <p>{zone}</p>
              {entry && <p className="mt-0.5 font-bold">{entry.rating}/5</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
