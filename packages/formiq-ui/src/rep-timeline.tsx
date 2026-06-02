import type { RepTimelineProps } from "@formiq/types";

import { cardStyle, joinClassName, palette } from "./primitives";

function qualityColor(quality?: "strong" | "steady" | "fatigued") {
  switch (quality) {
    case "strong":
      return palette.success;
    case "fatigued":
      return palette.warning;
    default:
      return palette.accent;
  }
}

export function RepTimeline({ title = "Rep Timeline", reps, activeRepIndex, className }: RepTimelineProps) {
  return (
    <section className={joinClassName(className)} style={{ ...cardStyle, padding: 18 }}>
      <div style={{ color: palette.muted, fontSize: 13, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {title}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {reps.map((rep) => {
          const active = rep.repIndex === activeRepIndex;
          return (
            <div
              key={rep.id}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr 80px",
                alignItems: "center",
                gap: 12,
                padding: 12,
                borderRadius: 16,
                border: `1px solid ${active ? qualityColor(rep.quality) : palette.border}`,
                background: active ? "rgba(37, 99, 235, 0.12)" : palette.panelAlt,
              }}
            >
              <div style={{ fontSize: 12, color: palette.muted }}>{rep.timestampLabel}</div>
              <div>
                <div style={{ fontWeight: 600 }}>Rep {rep.repIndex}</div>
                <div style={{ fontSize: 13, color: palette.muted }}>{rep.phase ?? "Tracked movement"}</div>
              </div>
              <div style={{ textAlign: "right", color: qualityColor(rep.quality), fontWeight: 700 }}>{rep.score}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
