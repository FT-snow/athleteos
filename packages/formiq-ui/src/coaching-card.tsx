import type { CoachingCardProps } from "@formiq/types";

import { cardStyle, joinClassName, palette } from "./primitives";

function priorityTone(priority?: "low" | "medium" | "high") {
  switch (priority) {
    case "high":
      return palette.danger;
    case "medium":
      return palette.warning;
    default:
      return palette.success;
  }
}

export function CoachingCard({ title = "Coaching Cue", cue, className }: CoachingCardProps) {
  return (
    <section className={joinClassName(className)} style={{ ...cardStyle, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
        <div style={{ color: palette.muted, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</div>
        <div style={{ color: priorityTone(cue.priority), fontSize: 13 }}>{cue.priority ?? "low"} priority</div>
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: 22 }}>{cue.title}</h3>
      <p style={{ margin: 0, color: palette.muted, lineHeight: 1.6 }}>{cue.body}</p>
      {cue.tags?.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          {cue.tags.map((tag) => (
            <span
              key={tag}
              style={{
                borderRadius: 999,
                border: `1px solid ${palette.border}`,
                padding: "6px 10px",
                fontSize: 12,
                color: palette.text,
                background: palette.panelAlt,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
