import type { FatigueChartsProps } from "@formiq/types";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cardStyle, joinClassName, palette } from "./primitives";

export function FatigueCharts({ title = "Fatigue Trends", data, className }: FatigueChartsProps) {
  return (
    <section className={joinClassName(className)} style={{ ...cardStyle, padding: 18 }}>
      <div style={{ color: palette.muted, fontSize: 13, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {title}
      </div>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" vertical={false} />
            <XAxis dataKey="label" stroke={palette.muted} tickLine={false} axisLine={false} />
            <YAxis stroke={palette.muted} tickLine={false} axisLine={false} width={36} />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: `1px solid ${palette.border}`,
                borderRadius: 12,
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="fatigue" stroke={palette.warning} strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="stability" stroke={palette.accent} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="symmetry" stroke={palette.success} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
