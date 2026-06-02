import type { SummaryHeroProps } from "@formiq/types";

import { cardStyle, joinClassName, palette } from "./primitives";

export function SummaryHero({ summary, className }: SummaryHeroProps) {
  return (
    <section
      className={joinClassName(className)}
      style={{
        ...cardStyle,
        padding: 24,
        background: "linear-gradient(135deg, rgba(37, 99, 235, 0.22), rgba(15, 23, 42, 0.92))",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div>
          {summary.badge ? (
            <div style={{ color: palette.accent, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {summary.badge}
            </div>
          ) : null}
          <h1 style={{ margin: "8px 0 10px", fontSize: 34, lineHeight: 1.05 }}>{summary.title}</h1>
          <p style={{ margin: 0, color: palette.muted, maxWidth: 680 }}>{summary.subtitle}</p>
        </div>
        <div style={{ display: "grid", gap: 10, minWidth: 220 }}>
          <div style={{ ...cardStyle, padding: 16 }}>
            <div style={{ color: palette.muted, fontSize: 12 }}>{summary.primaryMetricLabel}</div>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 6 }}>{summary.primaryMetricValue}</div>
          </div>
          {summary.secondaryMetricLabel && summary.secondaryMetricValue ? (
            <div style={{ ...cardStyle, padding: 16 }}>
              <div style={{ color: palette.muted, fontSize: 12 }}>{summary.secondaryMetricLabel}</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{summary.secondaryMetricValue}</div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
