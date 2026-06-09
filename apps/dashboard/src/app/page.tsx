"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import VanillaTilt from "vanilla-tilt";
import { Video, Activity, Heart, Moon, Apple, Brain, ArrowRight } from "lucide-react";
import { SprinterScene } from "@/components/SprinterScene";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import { BentoCard } from "@/components/FeatureCard";
import { Spotlight } from "@/components/Spotlight";
import { FormIQLab } from "@/components/FormIQLab";
import { RehabExplorer } from "@/components/RehabExplorer";
import { RecoveryHub } from "@/components/RecoveryHub";
import { SettingsPanel } from "@/components/SettingsPanel";
import { DailyQuizModal } from "@/components/DailyQuizModal";
import { ProfileSetupModal } from "@/components/ProfileSetupModal";
import { SPORTS, MUSCLES, EXERCISES } from "@/lib/athlete-data";
import { SleepView } from "@/components/sleep/SleepView";
import { NutriSyncView } from "@/components/NutriSyncView";
import { AICoachView } from "@/components/AICoachView";
import { ProfileDashboard } from "@/components/ProfileDashboard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { addDurationLog } from "@/lib/sleep-storage";
import { hasProfile, saveProfile, type ProfileData } from "@/lib/profile-storage";
import type { DailyRecoveryLog } from "@recoveryiq/core";
import type { Sport, Muscle, Exercise } from "@/lib/athlete-data";

type View = "home" | "profile" | "formiq" | "rehab" | "recovery" | "sleep" | "nutrisync" | "aicoach" | "settings";

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

type CardAnimConfig = { y?: number; x?: number; duration: number; ease: [number, number, number, number]; stagger?: number };

const cardAnimConfigs: CardAnimConfig[] = [
  { y: 24, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  { y: 30, x: -12, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  { y: 20, x: 12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  { y: 28, x: -8, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  { y: 16, x: 8, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  { y: 22, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
];

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function hasQuizBeenDoneToday(): boolean {
  try { return localStorage.getItem(`quiz_${getTodayStr()}`) === "done"; }
  catch { return false; }
}

function markQuizDone() {
  try { localStorage.setItem(`quiz_${getTodayStr()}`, "done"); } catch {}
}

function getStoredAthleteId(): string {
  try {
    let id = localStorage.getItem("athlete_id");
    if (!id) {
      id = `athlete-${Date.now().toString(36)}`;
      localStorage.setItem("athlete_id", id);
    }
    return id;
  } catch { return "athlete-1"; }
}

function getStoredSport(): Sport {
  try { return (localStorage.getItem("athlete_sport") as Sport) || "General Fitness"; }
  catch { return "General Fitness"; }
}

function getStoredMuscle(): Muscle {
  try { return (localStorage.getItem("athlete_muscle") as Muscle) || "Full Body"; }
  catch { return "Full Body"; }
}

function getStoredExercise(): Exercise {
  try { return (localStorage.getItem("athlete_exercise") as Exercise) || "Squat"; }
  catch { return "Squat"; }
}

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [view, setView] = useState<View>("home");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [athleteId, setAthleteId] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [sport, setSport] = useState<Sport>("General Fitness");
  const [muscle, setMuscle] = useState<Muscle>("Full Body");
  const [exercise, setExercise] = useState<Exercise>("Squat");
  const [navigating, setNavigating] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isLoading, isAuthenticated]);

  const handleQuizSubmit = useCallback((log: DailyRecoveryLog) => {
    markQuizDone();
    setShowQuiz(false);

    // Save sleep data to localStorage so SleepStats/SleepView can read it
    try {
      addDurationLog(log.date, log.sleep.hours, log.sleep.quality);
    } catch {}

    // Save full quiz log to localStorage for other views (Recovery, AI Coach)
    try {
      const existing = JSON.parse(localStorage.getItem("athleteos_quiz_logs") || "[]");
      existing.unshift({
        date: log.date,
        sleepHours: log.sleep.hours,
        sleepQuality: log.sleep.quality,
        wakeUps: log.sleep.wakeUps,
        morningEnergy: log.sleep.morningEnergy,
        restingHr: log.hrv.restingHeartRate,
        morningFeel: log.hrv.morningFeelScore,
        motivation: log.mental.motivation,
        stress: log.mental.stress,
        focus: log.mental.focus,
        soreness: log.soreness.map((s) => ({ zone: s.zone, rating: s.rating })),
        trainingLoad: log.trainingLoad,
      });
      localStorage.setItem("athleteos_quiz_logs", JSON.stringify(existing.slice(0, 90)));
    } catch {}

    const athleteId = getStoredAthleteId();
    try {
      fetch("/api/log-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId,
          date: log.date,
          sleepHours: log.sleep.hours,
          sleepQuality: log.sleep.quality,
          wakeUps: log.sleep.wakeUps,
          morningEnergy: log.sleep.morningEnergy,
          restingHr: log.hrv.restingHeartRate,
          morningFeel: log.hrv.morningFeelScore,
          motivation: log.mental.motivation,
          stress: log.mental.stress,
          focus: log.mental.focus,
          soreness: log.soreness.map((s) => ({ zone: s.zone, rating: s.rating })),
          trainingLoad: log.trainingLoad,
        }),
      }).catch(() => {});
    } catch {}
  }, []);

  const handleProfileComplete = useCallback((profile: ProfileData) => {
    saveProfile(profile);
    setShowProfileSetup(false);
    try {
      localStorage.setItem("athlete_sport", profile.sport);
      localStorage.setItem("athlete_name", profile.name);
      localStorage.setItem("athlete_username", profile.username);
    } catch {}
    setSport(profile.sport as Sport);
    const quizDone = hasQuizBeenDoneToday();
    if (!quizDone) {
      try { sessionStorage.setItem("quiz_shown_this_session", "true"); } catch {}
      setShowQuiz(true);
    }
  }, []);

  const handleQuizSkip = useCallback(() => {
    markQuizDone();
    setShowQuiz(false);
  }, []);

  const handleNavigate = useCallback((label: string) => {
    if (label === "Login") {
      signOut().then(() => router.push("/login"));
      return;
    }
    const target: Record<string, View> = {
      "Profile": "profile",
      "Form IQ": "formiq",
      "Rehab": "rehab",
      "Recovery": "recovery",
      "Sleep": "sleep",
      "NutriSync": "nutrisync",
      "AI Coach": "aicoach",
      "Settings": "settings",
    };
    setNavigating(true);
    setTimeout(() => {
      setView(target[label] || "home");
    }, 400);
  }, [router, signOut]);

  useEffect(() => {
    const id = getStoredAthleteId();
    setAthleteId(id);
    const profileDone = hasProfile();

    const justLoggedIn = typeof window !== "undefined" && window.location.search === "?login=new";
    if (justLoggedIn) {
      try { localStorage.removeItem(`quiz_${getTodayStr()}`); } catch {}
      window.history.replaceState(null, "", "/");
    }

    if (!profileDone) {
      setShowProfileSetup(true);
    } else {
      const quizShownThisSession = typeof window !== "undefined" && sessionStorage.getItem("quiz_shown_this_session");
      const quizDone = hasQuizBeenDoneToday();

      if (!quizDone && !quizShownThisSession) {
        setShowQuiz(true);
        try { sessionStorage.setItem("quiz_shown_this_session", "true"); } catch {}
      }
    }
    setSport(getStoredSport());
    setMuscle(getStoredMuscle());
    setExercise(getStoredExercise());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("athlete_sport", sport); } catch {}
  }, [sport, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("athlete_muscle", muscle); } catch {}
  }, [muscle, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("athlete_exercise", exercise); } catch {}
  }, [exercise, hydrated]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.transition = "opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1)";
    hero.style.opacity = "0";
    hero.style.transform = "translateY(16px)";
    requestAnimationFrame(() => {
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    });
  }, [view]);

  useEffect(() => {
    if (view !== "home") return;
    const grid = cardGridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>(".module-card");
    if (cards.length === 0) return;

    gsap.set(cards, { y: 40, opacity: 0, scale: 0.98 });
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.07,
      ease: "power3.out",
      delay: 0.15,
    });

    cards.forEach((card) => {
      VanillaTilt.init(card, {
        max: 8,
        scale: 1.02,
        glare: true,
        "max-glare": 0.15,
      });
    });

    return () => {
      cards.forEach((card) => {
        try { (card as any).vanillaTilt?.destroy(); } catch {}
      });
    };
  }, [view]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-bold tracking-tighter text-[var(--teal-accent)]" style={{ fontFamily: "var(--font-display)" }}>
            Athlete.os
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-[var(--teal-muted)] uppercase" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
            {isLoading ? "Loading..." : "Redirecting..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProfileSetupModal
        isOpen={showProfileSetup}
        athleteId={athleteId}
        onComplete={handleProfileComplete}
      />
      <DailyQuizModal
        isOpen={showQuiz}
        onClose={handleQuizSkip}
        onSubmit={handleQuizSubmit}
      />

      {navigating && <LoadingScreen duration={500} onDone={() => setNavigating(false)} />}

      <SprinterScene />
      <StaggeredMenu onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6"
          >
            <div ref={heroRef} className="text-center">
              <Spotlight size={220} className="from-[var(--teal-accent)] via-[var(--teal-mid)] to-transparent" />
              <p className="mb-2 font-label">
                Performance Intelligence
              </p>
              <h1 className="font-display-athletic text-[clamp(36px,6vw,72px)] font-black tracking-tighter leading-[1.05]">
                Athlete
                <span className="text-[#A1D7D6]">.OS</span>
              </h1>
              <p className="mt-3 text-xs font-light text-[var(--teal-muted)] max-w-sm mx-auto leading-relaxed font-display-italic">
                Form analysis &middot; Recovery &middot; Sleep &middot; Nutrition &middot; AI Coach
              </p>
            </div>

            <div ref={cardGridRef} className="mt-10 grid gap-3 grid-cols-6 w-full max-w-5xl">
              {[
                { label: "Form IQ", view: "formiq" as const, desc: "Video analysis & coaching", icon: Video, span: "col-span-6", height: "h-[150px]" },
                { label: "Rehab", view: "rehab" as const, desc: "Injury tracking & protocols", icon: Activity, span: "col-span-3", height: "h-[130px]" },
                { label: "Recovery", view: "recovery" as const, desc: "Recovery plans & advice", icon: Heart, span: "col-span-3", height: "h-[130px]" },
                { label: "Sleep", view: "sleep" as const, desc: "Sleep tracking & insights", icon: Moon, span: "col-span-2", height: "h-[115px]" },
                { label: "NutriSync", view: "nutrisync" as const, desc: "Nutrition & macro tracking", icon: Apple, span: "col-span-2", height: "h-[115px]" },
                { label: "AI Coach", view: "aicoach" as const, desc: "AI performance coaching", icon: Brain, span: "col-span-2", height: "h-[115px]" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                <button
                  key={item.label}
                  onClick={() => {
                    setNavigating(true);
                    setTimeout(() => { setView(item.view); }, 400);
                  }}
                  data-hoverable
                  className={`module-card ${item.span} ${item.height} group relative rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-4 text-left transition-colors duration-250 hover:border-[rgba(121,187,195,0.40)]`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-[var(--teal-mid)] mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="font-card-title text-white transition-transform duration-250 group-hover:translate-x-[6px]">
                          {item.label}
                        </p>
                        <p className="font-card-subtitle mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto pt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                      <span className="h-px flex-1 bg-[rgba(121,187,195,0.2)]" />
                      <span className="font-label text-[9px] tracking-[0.18em] text-[var(--teal-mid)] flex items-center gap-1">
                        EXPLORE <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </button>
                );
              })}
            </div>

            <div className="mt-8 w-full max-w-5xl">
              <hr className="border-0 h-px bg-[rgba(121,187,195,0.15)]" />
              <div className="flex items-center justify-center gap-5 mt-2.5 font-label text-[9px] tracking-[0.16em] text-[rgba(121,187,195,0.45)]">
                <span>6 MODULES</span>
                <span className="w-px h-3 bg-[rgba(121,187,195,0.2)]" />
                <span>AI POWERED</span>
                <span className="w-px h-3 bg-[rgba(121,187,195,0.2)]" />
                <span>REAL-TIME</span>
                <span className="w-px h-3 bg-[rgba(121,187,195,0.2)]" />
                <span>VELOX</span>
              </div>
            </div>
          </motion.div>
        ) : view === "profile" ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <ProfileDashboard />
          </motion.div>
        ) : (
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="mb-8 flex items-center gap-4">
              <button
                onClick={() => setView("home")}
                className="flex items-center gap-2 rounded-lg border border-[var(--teal-dark)] px-3 py-1.5 text-xs text-[var(--teal-muted)] transition-all hover:border-[var(--teal-accent)] hover:text-[var(--foreground)] hover:-translate-y-[1px] hover:shadow-[0_0_12px_rgba(121,187,195,0.15)] active:scale-[0.98]"
              >
                <ArrowLeft />
                Back
              </button>
              <h2 className="font-heading-tech text-sm tracking-wider uppercase text-[var(--foreground)]">
                {view === "formiq" ? "Form IQ" : view === "rehab" ? "Rehab" : view === "recovery" ? "Recovery" : view === "sleep" ? "Sleep" : view === "nutrisync" ? "NutriSync" : view === "aicoach" ? "AI Coach" : "Settings"}
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {view === "formiq" ? (
                <FormIQLab sport={sport} exercise={exercise} />
              ) : view === "sleep" ? (
                <BentoCard variant="flat" hoverEffect="none">
                  <div className="p-2 sm:p-3">
                    <SleepView />
                  </div>
                </BentoCard>
              ) : view === "nutrisync" ? (
                <BentoCard variant="flat" hoverEffect="none">
                  <div className="p-2 sm:p-3">
                    <NutriSyncView />
                  </div>
                </BentoCard>
              ) : view === "aicoach" ? (
                <BentoCard variant="flat" hoverEffect="none">
                  <div className="p-2 sm:p-3">
                    <AICoachView />
                  </div>
                </BentoCard>
              ) : (
                <BentoCard variant="flat" hoverEffect="none">
                  <div className="p-2 sm:p-3">
                    {view === "rehab" && <RehabExplorer sport={sport} muscle={muscle} />}
                    {view === "recovery" && <RecoveryHub sport={sport} />}
                    {view === "settings" && <SettingsPanel />}
                  </div>
                </BentoCard>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
