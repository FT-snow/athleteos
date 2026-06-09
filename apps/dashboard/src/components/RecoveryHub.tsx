"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "@/components/FeatureCard";
import { CoachAdvice } from "@/components/CoachAdvice";
import { SPORTS } from "@/lib/athlete-data";
import { getLatestQuizLog, generateRecoveryPlan } from "@/lib/quiz-data";
import type { Sport } from "@/lib/athlete-data";
import { useQuery } from "convex/react";
import { api } from "@convex/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function RecoveryHub({
  sport: initialSport,
}: {
  sport?: Sport;
}) {
  const [sport, setSport] = useState<Sport>(initialSport ?? "General Fitness");
  const [activeTab, setActiveTab] = useState<"plan" | "advice">("plan");

  const user = useQuery(api.users.getUser);
  const athleteId = typeof window !== "undefined" ? localStorage.getItem("athlete_id") : null;
  const convexLogs = useQuery(api.dailyLogs.listRecent, athleteId ? { athleteId, limit: 30 } : "skip");

  const recoveryPlan = useMemo(() => {
    if (convexLogs && convexLogs.length > 0) {
      return generateRecoveryPlan(convexLogs[0]);
    }
    const log = getLatestQuizLog();
    if (log) return generateRecoveryPlan(log);
    return [];
  }, [convexLogs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-[10px] text-[var(--teal-muted)] font-heading-tech uppercase tracking-wider">Sport</label>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value as Sport)}
            className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--fg)]"
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        {(["plan", "advice"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`relative rounded px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === t
                ? "bg-[var(--teal-accent)] text-[var(--background)]"
                : "border border-[var(--teal-dark)] text-[var(--teal-muted)] hover:border-[var(--teal-accent)]"
            }`}
          >
            {t === "plan" ? "Recovery Plan" : "AI Advice"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "plan" ? (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4"
          >
            {recoveryPlan.length > 0 ? recoveryPlan.map((day, i) => (
              <motion.div
                key={day.day}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.03 }}
              >
                <BentoCard variant="elevated">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-[var(--teal-light)] font-heading-tech">{day.day}</p>
                      <p className="text-xs text-[var(--teal-muted)]">{day.type}</p>
                      <p className="text-[10px] text-[var(--teal-deep)] italic">{day.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--teal-light)]">{day.duration}</p>
                      <p className="text-[10px] text-[var(--teal-muted)]">{day.intensity}</p>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>
            )) : (
              <p className="text-xs text-[var(--teal-deep)] italic text-center py-8">
                Complete the daily check-in to get a personalized recovery plan.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="advice"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <CoachAdvice context="recovery" placeholder="Ask about recovery protocols, nutrition, or rest..." />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
