'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@convex/api';
import { NutrientMap, FoodItem, Cuisine, NUTRIENT_DEFS, COMMON_FOODS } from '@/lib/nutrient-data';
import { useConvexAuth } from '@convex-dev/auth/react';

const STORAGE_KEY = 'athleteos_nutrition_logs';

export interface LoggedMeal {
  id: string;
  foodId: string;
  name: string;
  serving: string;
  nutrients: NutrientMap;
  timestamp: string;
  cuisine?: Cuisine;
  mealType?: string;
}

interface DayLog {
  date: string;
  meals: LoggedMeal[];
}

function getTodaysDate(): string {
  return new Date().toISOString().split('T')[0];
}

function loadLogs(): DayLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogs(logs: DayLog[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch {}
}

function computeTotals(meals: LoggedMeal[]): NutrientMap {
  const totals: NutrientMap = {};
  for (const def of NUTRIENT_DEFS) {
    totals[def.key] = 0;
  }
  for (const meal of meals) {
    for (const def of NUTRIENT_DEFS) {
      totals[def.key] = (totals[def.key] || 0) + (meal.nutrients[def.key] || 0);
    }
  }
  return totals;
}

export function useDailyNutrition() {
  const date = getTodaysDate();
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [search, setSearch] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState<Cuisine | 'all'>('all');
  const [mealTypeFilter, setMealTypeFilter] = useState<string>('all');
  const [convexReady, setConvexReady] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const currentUser = useQuery(api.users.getUser);
  const convexUserId = isAuthenticated && !isLoading && currentUser ? (currentUser as any)?._id : undefined;

  const logMealMutation = useMutation(api.nutrition.logMeal);
  const removeMealMutation = useMutation(api.nutrition.removeMeal);
  const convexDayData = useQuery(
    api.nutrition.getDayNutrition,
    convexUserId ? { userId: convexUserId as any, date } : 'skip',
  );

  useEffect(() => {
    if (convexDayData !== undefined) {
      setConvexReady(true);
      if (convexDayData) {
        setLogs((prev) => {
          const existing = prev.find((l) => l.date === date);
          if (existing && existing.meals.length === 0 && convexDayData.meals.length > 0) {
            const updated = prev.map((l) =>
              l.date === date
                ? { date, meals: convexDayData.meals as LoggedMeal[] }
                : l,
            );
            saveLogs(updated);
            return updated;
          }
          return prev;
        });
      }
    }
  }, [convexDayData, date]);

  useEffect(() => {
    if (convexReady) return;
    const saved = loadLogs();
    if (saved.length === 0 || saved[0]?.date !== date) {
      saved.unshift({ date, meals: [] });
      saveLogs(saved);
    }
    setLogs(saved);
  }, [date, convexReady]);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  const addFood = useCallback(
    async (food: FoodItem, servings?: number) => {
      const s = servings ?? 1;
      const scaledNutrients: NutrientMap = {};
      for (const key of Object.keys(food.nutrients)) {
        scaledNutrients[key] = Math.round(((food.nutrients[key] || 0) * s) * 100) / 100;
      }
      const newMeal: LoggedMeal = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        foodId: food.id,
        name: food.name,
        serving: s === 1 ? food.serving : `${s}× ${food.serving}`,
        nutrients: scaledNutrients,
        timestamp: new Date().toLocaleTimeString(),
        cuisine: food.cuisine,
        mealType: food.mealType,
      };

      setLogs((prev) => {
        const existing = prev.find((l) => l.date === date);
        if (existing) {
          return prev.map((l) =>
            l.date === date ? { ...l, meals: [...l.meals, newMeal] } : l,
          );
        }
        return [{ date, meals: [newMeal] }, ...prev];
      });

      if (convexUserId) {
        const updatedLogs = await new Promise<DayLog[]>((resolve) => {
          setLogs((prev) => {
            resolve(prev);
            return prev;
          });
        });
        const dayLog = updatedLogs.find((l) => l.date === date);
        const meals = dayLog?.meals ?? [newMeal];
        const totals = computeTotals(meals);

        try {
          await logMealMutation({
            userId: convexUserId as any,
            date,
            meal: {
              id: newMeal.id,
              foodId: newMeal.foodId,
              name: newMeal.name,
              serving: newMeal.serving,
              nutrients: newMeal.nutrients,
              timestamp: newMeal.timestamp,
            },
            totals: totals as any,
          });
        } catch (e) {
          console.error('Convex nutrition save failed', e);
        }
      }
    },
    [date, convexUserId, logMealMutation],
  );

  const removeMeal = useCallback(
    async (mealId: string) => {
      setLogs((prev) => {
        const next = [...prev];
        const day = next.find((l) => l.date === date);
        if (day) {
          day.meals = day.meals.filter((m) => m.id !== mealId);
        }
        return next;
      });

      if (convexUserId) {
        const updatedLogs = await new Promise<DayLog[]>((resolve) => {
          setLogs((prev) => {
            resolve(prev);
            return prev;
          });
        });
        const dayLog = updatedLogs.find((l) => l.date === date);
        const meals = dayLog?.meals ?? [];
        const totals = computeTotals(meals);

        try {
          await removeMealMutation({
            userId: convexUserId as any,
            date,
            mealId,
            totals: totals as any,
          });
        } catch (e) {
          console.error('Convex nutrition remove failed', e);
        }
      }
    },
    [date, convexUserId, removeMealMutation],
  );

  const todayLog = logs.find((l) => l.date === date);
  const meals = todayLog?.meals ?? [];
  const totals = computeTotals(meals);

  const filteredFoods = (search.trim()
    ? COMMON_FOODS.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase()),
      )
    : COMMON_FOODS
  ).filter((f) =>
    cuisineFilter === 'all' ? true : f.cuisine === cuisineFilter,
  ).filter((f) =>
    mealTypeFilter === 'all' ? true : f.mealType === mealTypeFilter,
  );

  return {
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
    mealTypeFilter,
    setMealTypeFilter,
  };
}
