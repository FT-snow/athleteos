"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";
import { SPORTS, MUSCLES } from "@/lib/athlete-data";
import type { Sport, Muscle } from "@/lib/athlete-data";
import {
  RehabInjuryDetail,
  PainTrendChart,
  ROMProgressChart,
  ComplianceCalendar,
  RehabExerciseList,
  ReturnToPlayPanel,
} from "./rehab";
import type { InjuryRecord } from "@recoveryiq/rehab";
import { protocolLibrary } from "@recoveryiq/rehab";

function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function seededFloat(injuryId: string, dayIndex: number, offset: number): number {
  const hash = cyrb53(`${injuryId}-${dayIndex}-${offset}`);
  return (hash % 1000) / 1000;
}

const INJURY_TREND_MAP: Record<string, { painStart: number; painDrop: number; romStart: number; romGain: number; complianceBase: number }> = {
  "knees": { painStart: 8, painDrop: 0.35, romStart: 65, romGain: 4, complianceBase: 85 },
  "shoulders": { painStart: 6, painDrop: 0.3, romStart: 80, romGain: 3, complianceBase: 60 },
  "back": { painStart: 7, painDrop: 0.25, romStart: 55, romGain: 5, complianceBase: 75 },
  "ankles": { painStart: 5, painDrop: 0.3, romStart: 70, romGain: 4, complianceBase: 90 },
  "elbows": { painStart: 6, painDrop: 0.3, romStart: 75, romGain: 3.5, complianceBase: 70 },
  "wrists": { painStart: 5, painDrop: 0.25, romStart: 60, romGain: 5, complianceBase: 65 },
  "hips": { painStart: 7, painDrop: 0.2, romStart: 50, romGain: 4.5, complianceBase: 80 },
  "glutes": { painStart: 6, painDrop: 0.3, romStart: 70, romGain: 3, complianceBase: 75 },
  "hamstrings": { painStart: 7, painDrop: 0.35, romStart: 60, romGain: 4, complianceBase: 70 },
  "quads": { painStart: 6, painDrop: 0.3, romStart: 65, romGain: 3.5, complianceBase: 80 },
};

const ZONES = [
  "all", "knees", "shoulders", "elbows", "back", "spine", "hips",
  "ankles", "wrists", "neck", "core", "glutes", "hamstrings", "quads",
] as const;

const MOCK_INJURIES: InjuryRecord[] = [
  { id: "inj-1", athleteId: "athlete-1", zone: "knees", diagnosis: "Patellar tendinopathy", severity: "moderate", dateOccurred: new Date(Date.now() - 45 * 86400000).toISOString().split("T")[0], status: "rehab", protocolId: "knee-patellar-tendinopathy" },
  { id: "inj-2", athleteId: "athlete-1", zone: "shoulders", diagnosis: "Rotator cuff strain", severity: "mild", dateOccurred: new Date(Date.now() - 20 * 86400000).toISOString().split("T")[0], status: "active", protocolId: "shoulder-rotator-cuff-strain" },
  { id: "inj-3", athleteId: "athlete-1", zone: "back", diagnosis: "Lumbar disc bulge", severity: "moderate", dateOccurred: new Date(Date.now() - 60 * 86400000).toISOString().split("T")[0], status: "rehab", protocolId: "back-lumbar-disc" },
  { id: "inj-4", athleteId: "athlete-1", zone: "ankles", diagnosis: "Chronic ankle instability", severity: "mild", dateOccurred: new Date(Date.now() - 90 * 86400000).toISOString().split("T")[0], status: "recovered", protocolId: "ankle-sprain-grade1" },
  { id: "inj-5", athleteId: "athlete-1", zone: "elbows", diagnosis: "Tennis elbow (lateral epicondylitis)", severity: "moderate", dateOccurred: new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0], status: "rehab", protocolId: "elbow-lateral-epicondylitis" },
  { id: "inj-6", athleteId: "athlete-1", zone: "wrists", diagnosis: "TFCC tear", severity: "moderate", dateOccurred: new Date(Date.now() - 25 * 86400000).toISOString().split("T")[0], status: "active", protocolId: "wrist-tfcc-tear" },
  { id: "inj-7", athleteId: "athlete-1", zone: "hips", diagnosis: "Labral tear (hip)", severity: "moderate", dateOccurred: new Date(Date.now() - 50 * 86400000).toISOString().split("T")[0], status: "rehab", protocolId: "hip-labral-tear" },
  { id: "inj-8", athleteId: "athlete-1", zone: "glutes", diagnosis: "Piriformis syndrome", severity: "mild", dateOccurred: new Date(Date.now() - 15 * 86400000).toISOString().split("T")[0], status: "active", protocolId: "glute-piriformis" },
  { id: "inj-9", athleteId: "athlete-1", zone: "hamstrings", diagnosis: "High hamstring tendinopathy", severity: "moderate", dateOccurred: new Date(Date.now() - 40 * 86400000).toISOString().split("T")[0], status: "rehab", protocolId: "hamstring-proximal-tendinopathy" },
  { id: "inj-10", athleteId: "athlete-1", zone: "quads", diagnosis: "Quadriceps strain", severity: "mild", dateOccurred: new Date(Date.now() - 10 * 86400000).toISOString().split("T")[0], status: "active", protocolId: "quadriceps-strain" },
];

const INJURY_SPORT_MAP: Record<string, { sport: string; muscle: string }> = {
  "inj-1": { sport: "Basketball", muscle: "Quads" },
  "inj-2": { sport: "Swimming", muscle: "Shoulders" },
  "inj-3": { sport: "Weightlifting", muscle: "Lower Back" },
  "inj-4": { sport: "Running", muscle: "Calves" },
  "inj-5": { sport: "Tennis", muscle: "Forearms" },
  "inj-6": { sport: "Gymnastics", muscle: "Wrist Flexors" },
  "inj-7": { sport: "Soccer", muscle: "Hip Flexors" },
  "inj-8": { sport: "Running", muscle: "Glutes" },
  "inj-9": { sport: "Sprinting", muscle: "Hamstrings" },
  "inj-10": { sport: "Football", muscle: "Quads" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    animate(ref.current, { innerText: [0, value], duration: 800, ease: "outExpo" });
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

export function RehabExplorer({
  sport: initialSport,
  muscle: initialMuscle,
}: {
  sport?: Sport;
  muscle?: Muscle;
}) {
  const [sport, setSport] = useState<Sport>(initialSport ?? "General Fitness");
  const [muscle, setMuscle] = useState<Muscle>(initialMuscle ?? "Full Body");
  const [zoneFilter, setZoneFilter] = useState<string>("all");
  const [activeInjuryId, setActiveInjuryId] = useState<string>("inj-1");

  const filtered = useMemo(
    () =>
      MOCK_INJURIES.filter((i) => {
        if (zoneFilter !== "all" && i.zone !== zoneFilter) return false;
        const meta = INJURY_SPORT_MAP[i.id];
        if (sport !== "General Fitness" && meta && meta.sport !== sport) return false;
        if (muscle !== "Full Body" && meta && meta.muscle !== muscle) return false;
        return true;
      }),
    [zoneFilter, sport, muscle],
  );

  const activeInjury = MOCK_INJURIES.find((i) => i.id === activeInjuryId) ?? filtered[0] ?? MOCK_INJURIES[0];
  const protocol = protocolLibrary.get(activeInjury.protocolId);
  const phase = activeInjury.status === "recovered" ? "return-to-sport" : "rehab";
  const protocolExercises = protocol?.phases[phase]?.exercises ?? [];
  const trendConfig = INJURY_TREND_MAP[activeInjury.zone] ?? INJURY_TREND_MAP.knees;

  const painEntries = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const noise = (seededFloat(activeInjury.id, i, 1) - 0.5) * 1.2;
    const painLevel = Math.max(1, Math.round(trendConfig.painStart - i * trendConfig.painDrop + noise));
    const phaseLabel = i < 4 ? "acute" : i < 8 ? "subacute" : "rehab";
    return {
      date: new Date(Date.now() - (13 - i) * 86400000).toISOString().split("T")[0],
      painLevel,
      phase: phaseLabel,
    };
  }), [activeInjury.id, trendConfig]);

  const romEntries = useMemo(() => Array.from({ length: 10 }, (_, i) => {
    const noise = (seededFloat(activeInjury.id, i, 2) - 0.5) * 3;
    const rom = Math.round(trendConfig.romStart + i * trendConfig.romGain + noise);
    return {
      date: new Date(Date.now() - (9 - i) * 86400000).toISOString().split("T")[0],
      rom: Math.min(rom, trendConfig.romStart + trendConfig.romGain * 10 + 5),
    };
  }), [activeInjury.id, trendConfig]);

  const complianceDays = useMemo(() => Array.from({ length: 30 }, (_, i) => {
    const noise = (seededFloat(activeInjury.id, i, 3) - 0.5) * 25;
    const compliance = Math.round(Math.min(100, Math.max(10, trendConfig.complianceBase + noise)));
    return {
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split("T")[0],
      compliance,
    };
  }), [activeInjury.id, trendConfig]);

  const latestROM = romEntries.length > 0 ? romEntries[romEntries.length - 1].rom : 60;
  const targetROM = activeInjury.zone === "ankles" ? 50 : activeInjury.zone === "shoulders" ? 180 : activeInjury.zone === "hips" ? 120 : 140;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-label text-[var(--teal-muted)]">Sport</label>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value as Sport)}
            className="rounded-[4px] border border-[rgba(121,187,195,0.25)] bg-[rgba(5,14,18,0.8)] px-3 py-1.5 text-xs font-ui text-[var(--foreground)] outline-none focus:border-[var(--teal-accent)]"
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-label text-[var(--teal-muted)]">Muscle</label>
          <select
            value={muscle}
            onChange={(e) => setMuscle(e.target.value as Muscle)}
            className="rounded-[4px] border border-[rgba(121,187,195,0.25)] bg-[rgba(5,14,18,0.8)] px-3 py-1.5 text-xs font-ui text-[var(--foreground)] outline-none focus:border-[var(--teal-accent)]"
          >
            {MUSCLES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <span className="inline-block w-px h-4 bg-[rgba(255,255,255,0.1)]" />

        <label className="font-label text-[var(--teal-muted)]">Zone</label>
        <select
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
          className="rounded-[4px] border border-[rgba(121,187,195,0.25)] bg-[rgba(5,14,18,0.8)] px-3 py-1.5 text-xs font-ui text-[var(--foreground)] outline-none focus:border-[var(--teal-accent)]"
        >
          {ZONES.map((z) => (
            <option key={z} value={z}>
              {z === "all" ? "All Zones" : z}
            </option>
          ))}
        </select>

        <span className="inline-block w-px h-4 bg-[rgba(255,255,255,0.1)]" />

        <label className="font-label text-[var(--teal-muted)]">Injury</label>
        <select
          value={activeInjuryId}
          onChange={(e) => setActiveInjuryId(e.target.value)}
          className="rounded-[4px] border border-[rgba(121,187,195,0.25)] bg-[rgba(5,14,18,0.8)] px-3 py-1.5 text-xs font-ui text-[var(--foreground)] outline-none focus:border-[var(--teal-accent)]"
        >
          {MOCK_INJURIES.map((i) => (
            <option key={i.id} value={i.id}>
              {i.diagnosis} ({i.zone})
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        {filtered.map((injury) => (
          <motion.div
            key={injury.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <RehabInjuryDetail injury={injury} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-[var(--teal-muted)]">No injuries in this zone.</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        <PainTrendChart entries={painEntries} />
        <ROMProgressChart entries={romEntries} targetRom={targetROM} />
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
        <ComplianceCalendar days={complianceDays} />
        <RehabExerciseList exercises={protocolExercises} phase={phase} />
        <ReturnToPlayPanel
          ready={activeInjury.status === "recovered"}
          score={Math.round(latestROM / targetROM * 60 + (10 - trendConfig.painStart) * 4)}
          criteria={[
            { criterion: "Pain free during sport-specific movement", met: painEntries.length > 0 && painEntries[painEntries.length - 1].painLevel <= 2, details: `Pain level ${painEntries.length > 0 ? painEntries[painEntries.length - 1].painLevel : 'N/A'}/10` },
            { criterion: "Full range of motion restored", met: latestROM >= targetROM * 0.9, details: `ROM ${latestROM}°/${targetROM}° (${Math.round(latestROM / targetROM * 100)}%)` },
            { criterion: "Strength within 90% of contralateral side", met: false, details: `${Math.round(75 + seededFloat(activeInjury.id, 0, 4) * 15)}% of uninjured side` },
            { criterion: "Sport-specific drills without compensation", met: activeInjury.status === "recovered", details: activeInjury.status === "recovered" ? "Cleared for full activity" : "Compensatory patterns observed" },
          ]}
          risk={activeInjury.severity === "mild" ? "low" : activeInjury.severity === "moderate" ? "moderate" : "high"}
          projectedDays={activeInjury.severity === "mild" ? 7 : activeInjury.severity === "moderate" ? 14 : 28}
        />
      </motion.div>
    </motion.div>
  );
}
