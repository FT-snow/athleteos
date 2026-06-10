"use client"

import { useEffect, useRef, useState } from "react"
import { Search, X, Trash2, Utensils } from "lucide-react"
import { gsap } from "gsap"
import { animate } from "animejs"
import { motion } from "framer-motion"
import { useDailyNutrition } from "@/hooks/useDailyNutrition"
import {
  NUTRIENT_DEFS,
  getStatus,
  STATUS_COLORS,
  MACRO_CALORIES,
} from "@/lib/nutrient-data"
import type { Cuisine } from "@/lib/nutrient-data"

function NutrientBar({ def, current }: { def: typeof NUTRIENT_DEFS[0]; current: number }) {
  const pct = Math.min((current / def.target) * 100, 100)
  const status = getStatus(current, def.target)
  const color = STATUS_COLORS[status]
  return (
    <div className="">
      <div className="mb-0.5 flex items-center justify-between text-xs">
        <span className="text-[var(--foreground)] font-ui">{def.label}</span>
        <span className="tabular-nums text-[var(--teal-muted)] font-ui-mono">
          {Math.round(current * 10) / 10}
          <span className="text-[var(--teal-muted)]/50"> / {def.target}{def.unit}</span>
        </span>
      </div>
      <div className="h-[2px] overflow-hidden rounded-[1px] bg-[rgba(255,255,255,0.08)]">
        <motion.div
          className="h-full rounded-[1px]"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  )
}

function NutrientSection({ title, defs, totals }: { title: string; defs: typeof NUTRIENT_DEFS; totals: Record<string, number> }) {
  return (
    <div className="rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-6 transition-colors duration-250 hover:border-[rgba(121,187,195,0.40)]">
      <h3 className="mb-4 font-label text-[var(--teal-muted)]">{title}</h3>
      <div className="space-y-3">
        {defs.map(def => (
          <NutrientBar key={def.key} def={def} current={totals[def.key] || 0} />
        ))}
      </div>
    </div>
  )
}

function MacroRing({ label, kcal, totalKcal, color, trackColor }: {
  label: string; kcal: number; totalKcal: number; color: string; trackColor: string;
}) {
  const ringRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const size = label === "Protein" ? 120 : label === "Carbs" ? 96 : 80;
  const stroke = 8;
  const r = 48;
  const circumference = 2 * Math.PI * r;
  const pct = totalKcal > 0 ? Math.min(kcal / totalKcal, 1) : 0;
  const fill = pct * circumference;

  useEffect(() => {
    const ring = ringRef.current;
    const count = countRef.current;
    if (!ring || !count) return;
    gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference });
    gsap.to(ring, { strokeDashoffset: circumference - fill, duration: 1.2, ease: "power2.out" });
    animate(count, { innerText: [0, Math.round(kcal)], duration: 1200, ease: "outExpo" });
  }, [kcal, fill, circumference]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
          <circle ref={ringRef} cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="font-label text-[10px] text-[var(--teal-muted)]">{label}</span>
          <span className="font-ui-mono text-lg text-[var(--foreground)]"><span ref={countRef}>0</span></span>
        </div>
      </div>
    </div>
  );
}

export function NutriSyncView() {
  const {
    date,
    meals,
    totals,
    search,
    setSearch,
    addFood,
    removeMeal,
    filteredFoods,
    cuisineFilter,
    setCuisineFilter,
  } = useDailyNutrition()

  const [showFoodPicker, setShowFoodPicker] = useState(false)
  const [servings, setServings] = useState<Record<string, number>>({})
  const logBtnRef = useRef<HTMLButtonElement>(null);

  const CUISINES: { key: Cuisine | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'north-american', label: 'North American' },
    { key: 'indian', label: 'Indian' },
    { key: 'east-asian', label: 'East Asian' },
    { key: 'southeast-asian', label: 'Southeast Asian' },
  ]

  const MEALTYPE_LABELS: Record<string, string> = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
  }

  const groupedMeals = meals.reduce<Record<string, typeof meals>>((acc, m) => {
    const key = m.mealType || 'snack'
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})

  const macroDefs = NUTRIENT_DEFS.filter(d => d.category === 'macro' && !d.parent)
  const microDefs = NUTRIENT_DEFS.filter(d => d.category === 'micro')

  const proteinKcal = (totals.protein_g || 0) * (MACRO_CALORIES.protein_g || 4)
  const carbsKcal = (totals.carbs_g || 0) * (MACRO_CALORIES.carbs_g || 4)
  const fatKcal = (totals.fats_g || 0) * (MACRO_CALORIES.fats_g || 9)
  const totalKcal = totals.calories || 0

  const SERVING_OPTIONS = [0.5, 1, 1.5, 2]

  const handleFoodClick = (food: typeof filteredFoods[0]) => {
    const s = servings[food.id] || 1
    addFood(food, s)
    setSearch('')
    setServings({})
    setShowFoodPicker(false)
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-label text-[var(--teal-muted)]">{date}</p>
            </div>
          </div>
          <button
            ref={logBtnRef}
            onClick={() => setShowFoodPicker(true)}
            className="relative overflow-hidden rounded-[4px] border border-[#79BBC3] bg-transparent px-5 py-2 font-label text-[11px] tracking-[0.1em] text-[#79BBC3] transition-colors hover:text-black hover:bg-[#79BBC3]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Utensils className="h-3 w-3" />
              Log Food
            </span>
          </button>
        </div>

        {/* Cuisine Filter Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {CUISINES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCuisineFilter(c.key)}
              className={`rounded-[4px] px-3 py-1.5 font-label text-[11px] tracking-[0.1em] transition-all ${
                cuisineFilter === c.key
                  ? 'border border-[#79BBC3] bg-[rgba(121,187,195,0.12)] text-[#A1D7D6]'
                  : 'border-0 text-[rgba(255,255,255,0.35)] hover:text-[var(--teal-light)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Macro Ring Summary */}
        <div className="mb-6 rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-6 transition-colors duration-250 hover:border-[rgba(121,187,195,0.40)]">
          <p className="mb-5 font-label text-[var(--teal-muted)]">Daily Summary</p>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            <MacroRing label="Protein" kcal={Math.round(proteinKcal)} totalKcal={totalKcal || 1} color="#79BBC3" trackColor="rgba(255,255,255,0.06)" />
            <MacroRing label="Carbs" kcal={Math.round(carbsKcal)} totalKcal={totalKcal || 1} color="#A1D7D6" trackColor="rgba(255,255,255,0.06)" />
            <MacroRing label="Fats" kcal={Math.round(fatKcal)} totalKcal={totalKcal || 1} color="#599BAE" trackColor="rgba(255,255,255,0.06)" />
            <div className="text-center">
              <p className="font-label text-[var(--teal-muted)]">Total Calories</p>
              <p className="font-ui-mono text-3xl text-[var(--foreground)] mt-1">{totalKcal}</p>
            </div>
          </div>
        </div>

        {/* Macronutrients */}
        <div className="mb-6 space-y-3">
          <p className="font-label text-[var(--teal-muted)]">Macronutrients</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <NutrientSection title="Protein" defs={macroDefs.filter(d => d.subcategory === 'protein')} totals={totals} />
            <NutrientSection title="Carbohydrates" defs={macroDefs.filter(d => d.subcategory === 'carbs')} totals={totals} />
            <NutrientSection title="Fats" defs={macroDefs.filter(d => d.subcategory === 'fats')} totals={totals} />
          </div>
        </div>

        {/* Micronutrients */}
        <div className="mb-6 space-y-3">
          <p className="font-label text-[var(--teal-muted)]">Micronutrients</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <NutrientSection title="Vitamins" defs={microDefs.filter(d => d.subcategory === 'vitamin')} totals={totals} />
            <NutrientSection title="Minerals" defs={microDefs.filter(d => d.subcategory === 'mineral')} totals={totals} />
          </div>
        </div>

        {/* Food Search Modal */}
        {showFoodPicker && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh]">
            <div className="w-full max-w-lg rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.95)] shadow-2xl">
              <div className="flex items-center gap-3 border-b border-[rgba(121,187,195,0.08)] px-4 py-3">
                <Search className="h-4 w-4 text-[var(--teal-muted)]" />
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search foods..."
                  className="flex-1 border-none bg-transparent text-sm text-[var(--foreground)] placeholder-[var(--teal-muted)] outline-none font-ui"
                />
                <button onClick={() => { setShowFoodPicker(false); setSearch(''); }} className="text-[var(--teal-muted)] hover:text-[var(--foreground)]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-64 space-y-1 overflow-y-auto p-2">
                {filteredFoods.length === 0 && search.trim() ? (
                  <p className="p-3 text-center text-xs text-[var(--teal-muted)]">No foods found</p>
                ) : filteredFoods.length === 0 ? (
                  <p className="p-3 text-center text-xs text-[var(--teal-muted)]">Type to search foods</p>
                ) : (
                  filteredFoods.map(food => {
                    const selServings = servings[food.id] || 1
                    return (
                    <div key={food.id} className="rounded-[4px] px-3 py-2.5 transition-colors hover:bg-[rgba(121,187,195,0.06)]">
                      <div className="flex items-center justify-between mb-1.5">
                        <div>
                          <div className="text-sm text-[var(--foreground)] font-ui">{food.name}</div>
                          <div className="text-[10px] text-[var(--teal-muted)]">{food.serving} &middot; {Math.round(food.nutrients.calories * selServings)} kcal</div>
                        </div>
                        <button
                          onClick={() => handleFoodClick(food)}
                          className="font-label text-xs text-[var(--teal-accent)] whitespace-nowrap ml-2"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex gap-1">
                        {SERVING_OPTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={(e) => {
                              e.stopPropagation()
                              setServings(prev => ({ ...prev, [food.id]: s }))
                            }}
                            className={`px-2 py-1 text-[11px] rounded-[2px] font-ui transition-colors ${
                              selServings === s
                                ? 'bg-[var(--teal-accent)] text-black'
                                : 'bg-[rgba(121,187,195,0.08)] text-[var(--teal-muted)] hover:text-[var(--teal-light)]'
                            }`}
                          >
                            {s}×
                          </button>
                        ))}
                      </div>
                    </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Meal Log */}
        <div className="rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-6 transition-colors duration-250 hover:border-[rgba(121,187,195,0.40)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-label text-[var(--teal-muted)]">Today&apos;s Log ({meals.length})</p>
          </div>
          {meals.length === 0 ? (
            <p className="py-6 text-center text-xs text-[var(--teal-muted)]">No meals logged yet. Tap Log Food to get started.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedMeals).map(([mealType, typeMeals]) => (
                <div key={mealType}>
                  <p className="mb-2 font-label text-[11px] text-[var(--teal-muted)]">
                    {MEALTYPE_LABELS[mealType] || mealType} ({typeMeals.length})
                  </p>
                  <div className="space-y-2">
                    {typeMeals.map(m => (
                      <div key={m.id} className="flex items-center justify-between rounded-[4px] border border-[rgba(121,187,195,0.08)] bg-[rgba(0,0,0,0.3)] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-sm text-[var(--foreground)] font-ui">{m.name}</div>
                            <div className="text-[10px] text-[var(--teal-muted)]">{m.serving} &middot; {m.timestamp}{m.cuisine ? ` \u00b7 ${m.cuisine.replace('-', ' ')}` : ''}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs tabular-nums text-[var(--teal-muted)] font-ui-mono">{m.nutrients.calories} kcal</span>
                          <button onClick={() => removeMeal(m.id)} className="text-[var(--teal-muted)] hover:text-[#ef4444] transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
