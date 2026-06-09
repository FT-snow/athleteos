"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useConvexAuth } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { gsap } from "gsap";
import { api } from "@convex/api";
import { BentoCard } from "@/components/FeatureCard";
import {
  getAllSleepLogs,
  getLast7Days,
  calcSleepScore,
  calcAvgDuration,
  type SleepEntry,
} from "@/lib/sleep-storage";
import { getProfile } from "@/lib/profile-storage";
import { useDailyNutrition } from "@/hooks/useDailyNutrition";
import { cn } from "@/lib/utils";

function relativeTime(dateStr: string): string {
  const date = new Date(dateStr + (dateStr.includes("T") ? "" : "T00:00:00"));
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function computeStreak(logs: { date: string }[]): number {
  if (!logs?.length) return 0;
  const unique = [...new Set(logs.map((d) => d.date))].sort().reverse();
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < unique.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - streak);
    const expectedStr = expected.toISOString().split("T")[0];
    if (unique[i] === expectedStr) streak++;
    else break;
  }
  return streak;
}

function computeReadiness(log: {
  sleepQuality: number;
  morningFeel: number;
  motivation: number;
  stress: number;
}): number {
  const score =
    (log.sleepQuality + log.morningFeel + log.motivation + (10 - log.stress)) / 4;
  return Math.round(score * 10) / 10;
}

function getInitials(name: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ArcGauge({
  score,
  maxScore = 10,
  size = 160,
  strokeWidth = 10,
  label,
  sublabel,
}: {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth * 2) / 2;
  const startAngle = -225;
  const endAngle = 45;
  const totalAngle = 270;
  const clamped = Math.max(0, Math.min(score, maxScore));
  const scoreAngle = startAngle + (clamped / maxScore) * totalAngle;
  const toRad = (d: number) => (d * Math.PI) / 180;

  function arcPath(
    _cx: number,
    _cy: number,
    _r: number,
    from: number,
    to: number
  ) {
    const x1 = _cx + _r * Math.cos(toRad(from));
    const y1 = _cy + _r * Math.sin(toRad(from));
    const x2 = _cx + _r * Math.cos(toRad(to));
    const y2 = _cy + _r * Math.sin(toRad(to));
    const large = to - from > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${_r} ${_r} 0 ${large} 1 ${x2} ${y2}`;
  }

  const fullPath = arcPath(cx, cy, r, startAngle, endAngle);
  const totalLength = useMemo(() => {
    const len = 2 * Math.PI * r * (totalAngle / 360);
    return len;
  }, [r, totalAngle]);

  const fillLength = (clamped / maxScore) * totalLength;

  useEffect(() => {
    const p = pathRef.current;
    const c = countRef.current;
    if (!p || !c) return;

    gsap.set(p, { strokeDasharray: `${totalLength} ${totalLength}`, strokeDashoffset: totalLength });
    gsap.to(p, { strokeDashoffset: totalLength - fillLength, duration: 1.2, ease: "power2.out" });

    gsap.fromTo(c, { textContent: 0 }, {
      textContent: clamped,
      duration: 1.2,
      ease: "power2.out",
      snap: { textContent: 1 },
    } as gsap.TweenVars);
  }, [clamped, totalLength, fillLength]);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="tealArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#599BAE" />
            <stop offset="100%" stopColor="#79BBC3" />
          </linearGradient>
        </defs>
        <path
          d={fullPath}
          fill="none"
          stroke="rgba(121,187,195,0.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          d={fullPath}
          fill="none"
          stroke="url(#tealArc)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <div className="-mt-[88px] flex flex-col items-center">
        <span className="font-ui-mono text-3xl text-[var(--foreground)]">
          <span ref={countRef}>0</span>
          <span className="text-sm text-[var(--teal-muted)]">/{maxScore}</span>
        </span>
        <span className="mt-1 font-label text-[var(--teal-muted)]">
          {label}
        </span>
        {sublabel && (
          <span className="mt-0.5 text-[10px] text-[var(--teal-muted)] opacity-70">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

function TrendChart({
  data,
}: {
  data: { date: string; recovery: number; sleepQuality: number; readiness: number }[];
}) {
  const [tooltip, setTooltip] = useState<{
    x: number;
    data: { label: string; value: number; color: string }[];
  } | null>(null);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);

  if (data.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-xs text-[var(--teal-muted)]">
        No trend data available. Start logging your daily check-ins.
      </div>
    );
  }

  const W = 640;
  const H = 220;
  const PT = 16;
  const PR = 16;
  const PB = 32;
  const PL = 36;
  const cw = W - PL - PR;
  const ch = H - PT - PB;

  const lines = [
    { key: "recovery", color: "#79BBC3", values: data.map((d) => d.recovery) },
    { key: "sleepQuality", color: "#A1D7D6", values: data.map((d) => d.sleepQuality) },
    { key: "readiness", color: "#D1EEEA", values: data.map((d) => d.readiness) },
  ];

  const linePaths = lines.map((line) => {
    const pts = line.values
      .map((v, i) => {
        const xi = PL + (i / Math.max(data.length - 1, 1)) * cw;
        const yi = PT + ch - (v / 10) * ch;
        return `${i === 0 ? "M" : "L"} ${xi.toFixed(1)} ${yi.toFixed(1)}`;
      })
      .join(" ");
    return pts;
  });

  useEffect(() => {
    lineRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const len = ref.getTotalLength();
      gsap.set(ref, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(ref, { strokeDashoffset: 0, duration: 1.2, delay: i * 0.15, ease: "power2.out" });
    });
  }, [data]);

  const labels = data.map((d) => {
    const dt = new Date(d.date);
    return dt.toLocaleDateString("en-US", { weekday: "short" });
  });

  function xi(i: number) { return PL + (i / Math.max(data.length - 1, 1)) * cw; }
  function yv(v: number) { return PT + ch - (v / 10) * ch; }

  return (
    <div className="relative">
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="overflow-visible"
        onMouseLeave={() => setTooltip(null)}
      >
        {[0, 2, 4, 6, 8, 10].map((v) => (
          <g key={v}>
            <line
              x1={PL}
              y1={yv(v)}
              x2={W - PR}
              y2={yv(v)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={0.5}
            />
            <text
              x={PL - 4}
              y={yv(v) + 3}
              textAnchor="end"
              fill="var(--teal-muted)"
              fontSize={9}
              opacity={0.7}
            >
              {v}
            </text>
          </g>
        ))}

        {labels.map((l, i) => (
          <text
            key={i}
            x={xi(i)}
            y={H - 4}
            textAnchor="middle"
            fill="var(--teal-muted)"
            fontSize={9}
            opacity={0.7}
          >
            {l}
          </text>
        ))}

        {linePaths.map((p, i) => (
          <path
            key={lines[i].key}
            ref={(el) => { lineRefs.current[i] = el; }}
            d={p}
            fill="none"
            stroke={lines[i].color}
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {data.map((d, i) => (
          <rect
            key={i}
            x={xi(i) - 12}
            y={PT}
            width={24}
            height={ch}
            fill="transparent"
            onMouseEnter={() => {
              const parentRect = document
                .querySelector(`[data-chart-id="trend"]`)
                ?.getBoundingClientRect();
              const svgEl = document.querySelector(`[data-chart-id="trend"] svg`);
              const svgRect = svgEl?.getBoundingClientRect();
              if (!svgRect) return;
              const dotCenter = svgRect.left + (xi(i) / W) * svgRect.width;
              setTooltip({
                x: dotCenter - (parentRect?.left || 0),
                data: [
                  { label: "Recovery", value: d.recovery, color: "#79BBC3" },
                  { label: "Sleep", value: d.sleepQuality, color: "#A1D7D6" },
                  { label: "Readiness", value: d.readiness, color: "#D1EEEA" },
                ],
              });
            }}
          />
        ))}
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute top-0 z-20 -translate-x-1/2"
          style={{ left: tooltip.x, top: PT - 8 }}
        >
          <div className="rounded-[4px] border border-[rgba(121,187,195,0.15)] bg-[rgba(5,14,18,0.95)] px-3 py-2 text-[10px]">
            {tooltip.data.map((d) => (
              <div key={d.label} className="flex items-center gap-2 whitespace-nowrap">
                <span
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: d.color }}
                />
                <span className="text-[var(--teal-muted)]">{d.label}</span>
                <span className="font-ui-mono text-[var(--foreground)]">{d.value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-[var(--teal-muted)]">
        {lines.map((l) => (
          <span key={l.key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: l.color }}
            />
            {l.key === "sleepQuality" ? "Sleep" : l.key.charAt(0).toUpperCase() + l.key.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}

function NutritionMiniCard({
  label,
  current,
  target,
  unit,
}: {
  label: string;
  current: number;
  target: number;
  unit: string;
}) {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  return (
    <div className="rounded-xl border border-[var(--teal-dark)]/20 bg-[rgba(20,20,24,0.5)] p-3">
      <p className="font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
        {label}
      </p>
      <p className="mt-0.5 font-ui-mono text-sm text-[var(--foreground)]">
        {Math.round(current)}
        <span className="text-[10px] text-[var(--teal-muted)]">
          /{target} {unit}
        </span>
      </p>
      <div className="mt-2 h-1 w-full rounded-full bg-[var(--teal-dark)]/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#599BAE] to-[#79BBC3] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface ActivityItem {
  id: string;
  date: string;
  type: "sleep" | "quiz" | "meal";
  label: string;
  detail: string;
}

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-xs text-[var(--teal-muted)]">
        No recent activity.
      </div>
    );
  }

  const iconMap: Record<string, string> = {
    sleep: "S",
    quiz: "Q",
    meal: "M",
  };

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(121,187,195,0.04)]"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--teal-dark)]/20 text-[10px] font-bold text-[var(--teal-accent)]">
            {iconMap[item.type] || "?"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-[var(--foreground)]">{item.label}</p>
            <p className="text-[10px] text-[var(--teal-muted)]">{item.detail}</p>
          </div>
          <span className="shrink-0 text-[10px] text-[var(--teal-muted)]">
            {relativeTime(item.date)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProfileDashboard() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const user = useQuery(api.users.getUser);

  const [hydrated, setHydrated] = useState(false);
  const [athleteId, setAthleteId] = useState("");
  const [sleepLogs, setSleepLogs] = useState<SleepEntry[]>([]);
  const [last7Sleep, setLast7Sleep] = useState<SleepEntry[]>([]);

  useEffect(() => {
    try {
      setAthleteId(localStorage.getItem("athlete_id") || "");
    } catch {}
    setSleepLogs(getAllSleepLogs());
    setLast7Sleep(getLast7Days());
    setHydrated(true);
  }, []);

  const rawAthleteId = typeof window !== "undefined" ? localStorage.getItem("athlete_id") : null;
  const convexProfile = useQuery(
    api.athletes.getByAthleteId,
    rawAthleteId ? { athleteId: rawAthleteId } : "skip"
  );

  const resolvedProfile = useMemo(() => {
    const localProfile = getProfile();
    if (convexProfile) {
      return {
        name: convexProfile.name || localProfile?.name || "",
        username: convexProfile.username || localProfile?.username || "",
        sport: convexProfile.sport || localStorage.getItem("athlete_sport") || "General Fitness",
        age: convexProfile.age ?? localProfile?.age ?? null,
        gender: convexProfile.gender || localProfile?.gender || "",
        weight: convexProfile.weight ?? localProfile?.weight ?? null,
        height: convexProfile.height ?? localProfile?.height ?? null,
        birthday: convexProfile.birthday || localProfile?.birthday || "",
      };
    }
    return localProfile || {
      name: "",
      username: "",
      sport: localStorage.getItem("athlete_sport") || "General Fitness",
      age: null,
      gender: "",
      weight: null,
      height: null,
      birthday: "",
    };
  }, [convexProfile]);

  const dailyLogs = useQuery(
    api.dailyLogs.listRecent,
    hydrated && athleteId ? { athleteId, limit: 7 } : "skip"
  );

  const { meals: nutritionMeals, totals: nutritionTotals } = useDailyNutrition();

  const displayName = resolvedProfile.name || "Athlete";
  const displaySport = resolvedProfile.sport || "";
  const initials = getInitials(displayName);

  const sleepScore = useMemo(() => calcSleepScore(last7Sleep), [last7Sleep]);
  const avgDuration = useMemo(() => calcAvgDuration(last7Sleep), [last7Sleep]);

  const latestLog = dailyLogs && dailyLogs.length > 0 ? dailyLogs[0] : null;
  const readinessScore = latestLog ? computeReadiness(latestLog) : null;

  const sortedLogs = useMemo(() => {
    if (!dailyLogs) return [];
    return [...dailyLogs].sort((a, b) => a.date.localeCompare(b.date));
  }, [dailyLogs]);

  const trendData = useMemo(() => {
    if (sortedLogs.length > 0) {
      return sortedLogs.map((log) => ({
        date: log.date,
        recovery:
          Math.round(
            ((log.morningFeel + log.motivation + (10 - log.stress)) / 3) * 10
          ) / 10,
        sleepQuality: log.sleepQuality,
        readiness: computeReadiness(log),
      }));
    }
    if (last7Sleep.length > 0) {
      return last7Sleep
        .slice()
        .reverse()
        .map((s) => ({
          date: s.date,
          recovery: 0,
          sleepQuality: s.quality,
          readiness: 0,
        }));
    }
    return [];
  }, [sortedLogs, last7Sleep]);

  const streak = useMemo(() => {
    if (dailyLogs) return computeStreak(dailyLogs);
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `quiz_${d.toISOString().split("T")[0]}`;
      try {
        if (localStorage.getItem(key) === "done") s++;
        else break;
      } catch {
        break;
      }
    }
    return s;
  }, [dailyLogs]);

  const activities = useMemo(() => {
    const items: ActivityItem[] = [];

    for (const log of sleepLogs.slice(0, 10)) {
      items.push({
        id: `sleep-${log.id}`,
        date: log.date,
        type: "sleep",
        label: "Sleep logged",
        detail: `${log.duration}h, quality ${log.quality}/10`,
      });
    }

    if (dailyLogs) {
      for (const log of dailyLogs) {
        const readiness = computeReadiness(log);
        items.push({
          id: `quiz-${log.date}`,
          date: log.date,
          type: "quiz",
          label: "Daily check-in completed",
          detail: `Readiness ${readiness}/10`,
        });
      }
    } else {
      const today = new Date();
      for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        try {
          if (localStorage.getItem(`quiz_${dateStr}`) === "done") {
            items.push({
              id: `quiz-${dateStr}`,
              date: dateStr,
              type: "quiz",
              label: "Daily check-in completed",
              detail: "Readiness --/10",
            });
          }
        } catch {}
      }
    }

    if (nutritionMeals.length > 0) {
      items.push({
        id: "meal-today",
        date: new Date().toISOString().split("T")[0],
        type: "meal",
        label: "Meals logged",
        detail: `${nutritionMeals.length} meals, ${Math.round(
          nutritionTotals.calories || 0
        )} kcal`,
      });
    }

    items.sort((a, b) => b.date.localeCompare(a.date));
    return items.slice(0, 10);
  }, [sleepLogs, dailyLogs, nutritionMeals, nutritionTotals]);

  if (!hydrated || authLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-9 w-32 animate-pulse rounded bg-[var(--teal-dark)]/20" />
          <div className="mt-2 h-px bg-gradient-to-r from-[var(--teal-accent)] to-transparent" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-48 animate-pulse rounded-2xl bg-[rgba(20,20,24,0.5)]",
                i < 3
                  ? "md:col-span-2"
                  : i === 3
                    ? "md:col-span-6"
                    : i < 5
                      ? "md:col-span-3"
                      : "md:col-span-6"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-chart-id="trend" className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="font-page-title text-[var(--foreground)]">
          PROFILE
        </p>
        <div className="mt-2 h-px bg-gradient-to-r from-[var(--teal-accent)] to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
        <BentoCard variant="elevated" className="md:col-span-2">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--teal-accent)] to-[var(--teal-deep)] font-display-athletic text-lg text-black">
              {initials}
            </div>
            <div>
              <h2 className="font-display-athletic text-lg text-[var(--foreground)]">
                {displayName}
              </h2>
              {resolvedProfile.username && (
                <p className="text-xs text-[var(--teal-muted)]">
                  @{resolvedProfile.username}
                </p>
              )}
              {user?.email && (
                <p className="text-[10px] text-[var(--teal-deep)] mt-0.5">
                  {user.email}
                </p>
              )}
              {displaySport && (
                <p className="mt-1 font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
                  {displaySport}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center gap-1 rounded-full border border-[var(--teal-dark)]/30 px-3 py-1">
                <span className="font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-accent)]">
                  Streak
                </span>
                <span className="font-ui-mono text-sm text-[var(--foreground)]">
                  {streak}
                </span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center text-[10px] text-[var(--teal-muted)] font-ui-mono">
              {[
                resolvedProfile.age && `${resolvedProfile.age} yrs`,
                resolvedProfile.gender,
                resolvedProfile.weight && `${resolvedProfile.weight} kg`,
                resolvedProfile.height && `${resolvedProfile.height} cm`,
              ].filter(Boolean).map((stat, idx, arr) => (
                <span key={stat} className="flex items-center">
                  {idx > 0 && <span className="mx-3 inline-block w-px h-3 bg-[rgba(121,187,195,0.2)]" />}
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard variant="compact" className="md:col-span-2">
          <div className="flex flex-col items-center">
            <p className="mb-2 font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
              Sleep Score
            </p>
            <ArcGauge
              score={sleepScore}
              maxScore={10}
              label="Sleep"
              sublabel={`Avg ${avgDuration}h / night`}
            />
            {last7Sleep.length === 0 && (
              <p className="mt-6 text-[10px] text-[var(--teal-muted)]">
                No sleep data yet. Log your first night in Sleep.
              </p>
            )}
          </div>
        </BentoCard>

        <BentoCard variant="compact" className="md:col-span-2">
          <div className="flex flex-col items-center">
            <p className="mb-2 font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
              Recovery
            </p>
            {readinessScore !== null ? (
              <ArcGauge score={readinessScore} maxScore={10} label="Readiness" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-4">
                <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border border-dashed border-[rgba(121,187,195,0.2)]">
                  <span className="text-center text-[10px] leading-relaxed text-[var(--teal-muted)] animate-pulse">
                    No check-in
                    <br />
                    data yet
                  </span>
                </div>
                <p className="text-[10px] text-[var(--teal-muted)] opacity-70">
                  Complete today&apos;s check-in to see your readiness.
                </p>
              </div>
            )}
          </div>
        </BentoCard>

        <BentoCard variant="flat" hoverEffect="none" className="md:col-span-6">
          <p className="mb-4 font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
            7-Day Trend
          </p>
          <TrendChart data={trendData} />
        </BentoCard>

        <BentoCard variant="compact" className="md:col-span-3">
          <p className="mb-4 font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
            Nutrition Summary
          </p>
          {nutritionMeals.length === 0 && (nutritionTotals.calories || 0) === 0 ? (
            <div className="flex items-center justify-center py-6 text-[10px] text-[var(--teal-muted)]">
              No meals logged today. Start tracking in NutriSync.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <NutritionMiniCard
                label="Calories"
                current={nutritionTotals.calories || 0}
                target={2000}
                unit="kcal"
              />
              <NutritionMiniCard
                label="Protein"
                current={nutritionTotals.protein_g || 0}
                target={168}
                unit="g"
              />
              <NutritionMiniCard
                label="Carbs"
                current={nutritionTotals.carbs_g || 0}
                target={290}
                unit="g"
              />
              <NutritionMiniCard
                label="Fat"
                current={nutritionTotals.fats_g || 0}
                target={75}
                unit="g"
              />
            </div>
          )}
        </BentoCard>

        <BentoCard variant="compact" hoverEffect="glow" className="md:col-span-3">
          <p className="mb-4 font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
            Quick Stats
          </p>
          <div className="space-y-3">
            {[
              { label: "Avg Sleep", value: `${avgDuration}h` },
              {
                label: "Readiness",
                value: readinessScore !== null ? `${readinessScore}/10` : "",
              },
              { label: "Active Injuries", value: "0" },
              { label: "Form Trend", value: "Improving" },
              { label: "Streak", value: `${streak} days` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-[var(--teal-dark)]/10 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-[11px] text-[var(--teal-muted)]">
                  {stat.label}
                </span>
                <span className="font-ui-mono text-sm text-[var(--foreground)]">
                  {stat.value || "---"}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard variant="flat" className="md:col-span-6">
          <p className="mb-4 font-heading-tech text-[10px] tracking-wider uppercase text-[var(--teal-muted)]">
            Recent Activity
          </p>
          <ActivityFeed items={activities} />
        </BentoCard>
      </div>
    </div>
  );
}
