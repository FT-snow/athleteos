import type { StatsRailProps } from "@formiq/types";

import { cardStyle, joinClassName, palette, toneColor } from "./primitives";

export function StatsRail({ title = "Session Stats", stats, className }: StatsRailProps) {
  return (
    <section className={joinClassName(className)}>
      <div style={{ color: palette.muted, fontSize: 13, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {title}
      </div>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {stats.map((stat) => (
          <article key={stat.id} style={{ ...cardStyle, padding: 16 }}>
            <div style={{ color: palette.muted, fontSize: 13 }}>{stat.label}</div>
            <div style={{ fontSize: 30, fontWeight: 700, marginTop: 8 }}>{stat.value}</div>
            {stat.delta ? (
              <div style={{ color: toneColor(stat.tone), fontSize: 13, marginTop: 8 }}>{stat.delta}</div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
