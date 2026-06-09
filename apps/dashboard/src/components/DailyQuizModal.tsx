"use client";

import { useState } from "react";
import type { DailyRecoveryLog, BodyZone, SorenessEntry } from "@recoveryiq/core";

interface DailyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (log: DailyRecoveryLog) => void;
}

const QUESTIONS = [
  { id: "sleepHours", text: "How many hours of sleep did you get last night?", min: 4, max: 12, step: 0.5, default: 8, unit: "hours" },
  { id: "sleepQuality", text: "Rate your sleep quality from 1 to 10", min: 1, max: 10, step: 1, default: 7, unit: "/10" },
  { id: "wakeUps", text: "How many times did you wake up during the night?", min: 0, max: 5, step: 1, default: 0, unit: "times" },
  { id: "morningEnergy", text: "How is your morning energy level today?", min: 1, max: 10, step: 1, default: 7, unit: "/10" },
  { id: "restingHr", text: "What is your resting heart rate today?", min: 40, max: 100, step: 1, default: 60, unit: "bpm" },
  { id: "morningFeel", text: "How does your body feel cardiovascularly / morning feel score?", min: 1, max: 10, step: 1, default: 7, unit: "/10" },
  { id: "motivation", text: "Rate your motivation / readiness to train today", min: 1, max: 10, step: 1, default: 7, unit: "/10" },
  { id: "stress", text: "How is your mental stress level today?", min: 1, max: 10, step: 1, default: 3, unit: "/10 (1 is calm, 10 is overwhelmed)" },
  { id: "focus", text: "Rate your mental focus and clarity", min: 1, max: 10, step: 1, default: 7, unit: "/10" },
];

const SORENESS_ZONES: BodyZone[] = [
  "neck", "shoulders", "arms", "chest", "core", "back", "hips", "glutes", "legs", "knees", "ankles", "wrists", "elbows", "spine", "hamstrings", "quads"
];

export function DailyQuizModal({ isOpen, onClose, onSubmit }: DailyQuizModalProps) {
  console.log("[quiz] DailyQuizModal render, isOpen:", isOpen);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({
    sleepHours: 8,
    sleepQuality: 7,
    wakeUps: 0,
    morningEnergy: 7,
    restingHr: 60,
    morningFeel: 7,
    motivation: 7,
    stress: 3,
    focus: 7,
  });

  const [soreness, setSoreness] = useState<Record<BodyZone, number>>(() => {
    const init: any = {};
    SORENESS_ZONES.forEach(z => { init[z] = 1; });
    return init;
  });

  if (!isOpen) return null;

  const currentQuestion = QUESTIONS[step];
  const isSorenessStep = step === QUESTIONS.length;

  const handleNext = () => {
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleValueChange = (val: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
  };

  const handleSorenessChange = (zone: BodyZone, val: number) => {
    setSoreness(prev => ({ ...prev, [zone]: val }));
  };

  const handleFinish = () => {
    const dateStr = new Date().toISOString().split("T")[0];
    const sorenessEntries: SorenessEntry[] = Object.entries(soreness)
      .filter(([_, rating]) => rating > 1)
      .map(([zone, rating]) => ({
        date: dateStr,
        zone: zone as BodyZone,
        rating,
      }));

    const result: DailyRecoveryLog = {
      date: dateStr,
      sleep: {
        date: dateStr,
        hours: answers.sleepHours,
        quality: answers.sleepQuality,
        wakeUps: answers.wakeUps,
        morningEnergy: answers.morningEnergy,
      },
      soreness: sorenessEntries,
      hrv: {
        date: dateStr,
        restingHeartRate: answers.restingHr,
        morningFeelScore: answers.morningFeel,
      },
      mental: {
        date: dateStr,
        motivation: answers.motivation,
        stress: answers.stress,
        confidence: 7, // default confidence
        focus: answers.focus,
      },
      trainingLoad: 5,
    };

    onSubmit(result);
    onClose();
    // Reset quiz state
    setStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--teal-dark)]/30 bg-[var(--card)] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-[var(--teal-dark)]/30 pb-4">
          <div>
            <h2 className="font-display-athletic text-xl font-medium tracking-tighter text-[var(--foreground)]">
              Daily Wellness Check-In
            </h2>
            <p className="text-xs text-[var(--teal-muted)] mt-1">Rate each on a scale of 1-10</p>
          </div>
          <span className="rounded-full bg-[var(--teal-accent)]/10 px-3 py-1 text-[10px] text-[var(--teal-accent)] font-medium uppercase tracking-wider">
            Step {step + 1} of {QUESTIONS.length + 1}
          </span>
        </div>

        <div className="my-8 min-h-[140px]">
          {!isSorenessStep ? (
            <div className="space-y-6">
              <p className="text-base font-medium text-[var(--foreground)]">{currentQuestion.text}</p>
              
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-[var(--teal-muted)]">{currentQuestion.min}</span>
                <span className="text-3xl font-extrabold text-[var(--teal-accent)]">
                  {answers[currentQuestion.id]}
                  <span className="text-xs font-normal text-[var(--teal-muted)] ml-1">{currentQuestion.unit}</span>
                </span>
                <span className="text-xs text-[var(--teal-muted)]">{currentQuestion.max}</span>
              </div>

              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                step={currentQuestion.step}
                value={answers[currentQuestion.id]}
                onChange={(e) => handleValueChange(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-[var(--teal-accent)] bg-[var(--teal-dark)]/30 cursor-pointer"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-base font-medium text-[var(--foreground)]">Where are you feeling sore today?</p>
              <p className="text-xs text-[var(--teal-muted)]">Adjust ratings from 1 (none) to 5 (extreme)</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {SORENESS_ZONES.map((zone) => (
                  <div key={zone} className="flex flex-col rounded-xl border border-[var(--teal-dark)]/30 bg-[rgba(20,20,24,0.5)] p-3">
                    <span className="text-xs capitalize font-medium text-[var(--foreground)] mb-1">{zone}</span>
                    <div className="flex items-center justify-between">
                      <select
                        value={soreness[zone]}
                        onChange={(e) => handleSorenessChange(zone, Number(e.target.value))}
                        className="w-full bg-[var(--bg)] border border-[var(--teal-dark)]/30 rounded px-2 py-1 text-xs text-[var(--foreground)]"
                      >
                        <option value={1}>1 - None</option>
                        <option value={2}>2 - Mild</option>
                        <option value={3}>3 - Moderate</option>
                        <option value={4}>4 - Heavy</option>
                        <option value={5}>5 - Severe</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--teal-dark)]/30 pt-4">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="rounded-xl border border-[var(--teal-dark)]/30 bg-[var(--card)] px-4 py-2 text-xs font-medium text-[var(--teal-muted)] transition-all hover:border-[var(--teal-accent)]/40 hover:text-[var(--foreground)] disabled:opacity-40"
          >
            Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-[var(--teal-dark)]/30 bg-[var(--card)] px-4 py-2 text-xs font-medium text-[var(--teal-muted)] transition-all hover:border-[var(--teal-accent)]/40 hover:text-[var(--foreground)]"
            >
              Skip
            </button>
            {!isSorenessStep ? (
              <button
                onClick={handleNext}
                className="rounded-xl bg-[var(--teal-accent)] px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-[var(--teal-mid)]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="rounded-xl bg-[var(--teal-accent)] px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-[var(--teal-mid)]"
              >
                Submit & Analyze
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
