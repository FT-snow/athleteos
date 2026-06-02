import type { CSSProperties } from "react";

export const palette = {
  page: "#08111f",
  panel: "rgba(15, 23, 42, 0.82)",
  panelAlt: "rgba(30, 41, 59, 0.78)",
  border: "rgba(148, 163, 184, 0.18)",
  text: "#e2e8f0",
  muted: "#94a3b8",
  accent: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
};

export const cardStyle: CSSProperties = {
  background: palette.panel,
  border: `1px solid ${palette.border}`,
  borderRadius: 20,
  boxShadow: "0 18px 60px rgba(2, 6, 23, 0.22)",
  color: palette.text,
};

export function toneColor(tone?: "neutral" | "positive" | "warning" | "danger") {
  switch (tone) {
    case "positive":
      return palette.success;
    case "warning":
      return palette.warning;
    case "danger":
      return palette.danger;
    default:
      return palette.accent;
  }
}

export function joinClassName(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ");
}
