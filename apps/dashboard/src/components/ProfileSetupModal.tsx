"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@convex/api"
import type { ProfileData } from "@/lib/profile-storage"

interface ProfileSetupModalProps {
  isOpen: boolean
  athleteId: string
  onComplete: (profile: ProfileData) => void
}

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Genderfluid",
  "Transgender Male",
  "Transgender Female",
  "Agender",
  "Bigender",
  "Prefer not to say",
  "Other",
]

const SPORT_OPTIONS = [
  "General Fitness",
  "Running",
  "Cycling",
  "Swimming",
  "Weightlifting",
  "CrossFit",
  "Basketball",
  "Soccer",
  "Tennis",
  "Football",
  "Baseball",
  "Golf",
  "Yoga",
  "Pilates",
  "Martial Arts",
  "Dance",
  "Hiking",
  "Rowing",
  "Boxing",
  "Rock Climbing",
  "Other",
]

export function ProfileSetupModal({ isOpen, athleteId, onComplete }: ProfileSetupModalProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [age, setAge] = useState<number | "">("")
  const [birthday, setBirthday] = useState("")
  const [weight, setWeight] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [gender, setGender] = useState("")
  const [genderOther, setGenderOther] = useState("")
  const [sport, setSport] = useState("General Fitness")
  const [sportOther, setSportOther] = useState("")
  const [saving, setSaving] = useState(false)

  const saveProfile = useMutation(api.athletes.createOrUpdate)

  if (!isOpen) return null

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 0) setStep(step - 1)
  }

  const canGoNext = (): boolean => {
    switch (step) {
      case 0: return name.trim().length > 0 && username.trim().length > 0 && age !== "" && birthday.length > 0
      case 1: return weight !== "" && height !== ""
      case 2: return gender.length > 0
      case 3: return sport.length > 0
      default: return true
    }
  }

  const handleFinish = async () => {
    if (!name.trim() || !username.trim() || age === "" || !birthday || weight === "" || height === "" || !gender || !sport) {
      return
    }
    setSaving(true)
    const finalGender = gender === "Other" ? genderOther : gender
    const finalSport = sport === "Other" ? sportOther : sport
    const profile: ProfileData = {
      name: name.trim(),
      username: username.trim(),
      age: Number(age),
      birthday,
      weight: Number(weight),
      height: Number(height),
      gender: finalGender || "Prefer not to say",
      sport: finalSport,
    }

    try {
      await saveProfile({
        athleteId,
        name: profile.name,
        username: profile.username,
        sport: profile.sport,
        primaryMuscles: ["Full Body"],
        age: profile.age,
        birthday: profile.birthday,
        weight: profile.weight,
        height: profile.height,
        gender: profile.gender,
      })
    } catch {}

    onComplete(profile)
  }

  const stepLabels = ["About You", "Body Stats", "Gender", "Sport"]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="font-display-athletic text-xl font-medium tracking-tighter text-[var(--foreground)]">
              Set Up Your Profile
            </h2>
            <p className="text-xs text-[var(--teal-muted)] mt-1">{stepLabels[step]}</p>
          </div>
          <span className="rounded-full bg-[var(--teal-accent)]/10 px-3 py-1 text-[10px] text-[var(--teal-accent)] font-medium uppercase tracking-wider">
            Step {step + 1} of {totalSteps}
          </span>
        </div>

        <div className="my-8 min-h-[200px]">
          {step === 0 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Age
                  </label>
                  <input
                    type="number"
                    min={13}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 25"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Birthday
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={400}
                    step={0.1}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 75"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={300}
                    step={0.5}
                    value={height}
                    onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 175"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>
              </div>
              <p className="text-[10px] text-[var(--teal-muted)] italic">
                Used for personalized training and nutrition recommendations.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {GENDER_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGender(option)}
                      className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                        gender === option
                          ? "border-[var(--teal-accent)] bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                          : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--teal-dark)]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {gender === "Other" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Specify
                  </label>
                  <input
                    type="text"
                    value={genderOther}
                    onChange={(e) => setGenderOther(e.target.value)}
                    placeholder="Enter your gender"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                  Primary Sport
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {SPORT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSport(option)}
                      className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                        sport === option
                          ? "border-[var(--teal-accent)] bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                          : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--teal-dark)]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {sport === "Other" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
                    Specify Sport
                  </label>
                  <input
                    type="text"
                    value={sportOther}
                    onChange={(e) => setSportOther(e.target.value)}
                    placeholder="Enter your sport"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-medium text-[var(--teal-muted)] transition-all hover:border-[var(--teal-dark)] hover:text-[var(--foreground)] disabled:opacity-40"
          >
            Back
          </button>

          <div className="flex items-center gap-3">
            {step === 0 && (
              <p className="text-[10px] text-[var(--teal-muted)] italic">Fill in your details to continue</p>
            )}
            {step < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canGoNext()}
                className="rounded-xl bg-[var(--teal-accent)] px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-[var(--teal-mid)] disabled:opacity-40"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!canGoNext() || saving}
                className="rounded-xl bg-[var(--teal-accent)] px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-[var(--teal-mid)] disabled:opacity-40"
              >
                {saving ? "Saving..." : "Get Started"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
