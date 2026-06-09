"use client";

import { useState, lazy, Suspense } from "react";

const AvatarStage = lazy(() =>
  import("@formiq/3d").then((m) => ({ default: m.AvatarStage }))
);

const ZONE_TOGGLES = [
  { key: "spine", label: "Spine" },
  { key: "knees", label: "Knees" },
  { key: "shoulders", label: "Shoulders" },
  { key: "elbows", label: "Elbows" },
  { key: "neck", label: "Neck" },
  { key: "wrists", label: "Wrists" },
  { key: "hips", label: "Hips" },
  { key: "core", label: "Core" },
];

export function AvatarTab() {
  const [formFlags, setFormFlags] = useState<Record<string, boolean>>({});
  const [showAvatar, setShowAvatar] = useState(false);

  const toggleZone = (key: string) => {
    setFormFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCount = Object.values(formFlags).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => setShowAvatar((s) => !s)}
          className={`rounded-xl border px-4 py-2 text-sm transition-all ${
            showAvatar
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:bg-white/5"
          }`}
        >
          {showAvatar ? "Hide Avatar" : "Show Avatar"}
        </button>

        {showAvatar && (
          <>
            <div className="h-6 w-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--muted)]">
              Toggle form errors to highlight on avatar:
            </span>
            {ZONE_TOGGLES.map((z) => (
              <button
                key={z.key}
                onClick={() => toggleZone(z.key)}
                className={`rounded-full border px-3 py-1 text-xs transition-all ${
                  formFlags[z.key]
                    ? "border-[var(--danger)] bg-[var(--danger)]/20 text-[var(--danger)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:bg-white/5"
                }`}
              >
                {z.label} {formFlags[z.key] ? "✕" : ""}
              </button>
            ))}
            {activeCount > 0 && (
              <span className="rounded-full bg-[var(--danger)]/20 px-3 py-1 text-xs text-[var(--danger)]">
                {activeCount} active
              </span>
            )}
          </>
        )}
      </div>

      {/* 3D Canvas */}
      {showAvatar && (
        <div className="relative h-[500px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
                Loading 3D avatar...
              </div>
            }
          >
            <AvatarStage formFlags={formFlags} />
          </Suspense>
        </div>
      )}

      {!showAvatar && (
        <div className="flex h-[200px] items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)]">
          <p className="text-sm text-[var(--muted)]">
            Click &quot;Show Avatar&quot; to load the 3D biomechanical avatar
          </p>
        </div>
      )}

      {/* Legend */}
      {showAvatar && (
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:grid-cols-4">
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="h-3 w-3 rounded-full bg-[var(--danger)]" />
            Red glow = form error detected
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="h-3 w-3 rounded-full bg-[var(--success)]" />
            Normal = good form
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="h-3 w-3 rounded-full bg-[var(--warning)]" />
            Yellow = rehab zone
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="rounded border border-[var(--border)] px-1 text-xs">↻</span>
            Drag to rotate view
          </div>
        </div>
      )}
    </div>
  );
}
