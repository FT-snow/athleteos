import type { MlPredictionRequest, MlPredictionResponse, MlModelMetadata } from "./types";

export class PredictorClient {
  private baseUrl: string;

  constructor(baseUrl = "http://localhost:8000") {
    this.baseUrl = baseUrl;
  }

  async predictReadiness(request: MlPredictionRequest): Promise<MlPredictionResponse> {
    const res = await fetch(`${this.baseUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error(`ML API error: ${res.statusText}`);
    return res.json();
  }

  async getModelMetadata(): Promise<MlModelMetadata> {
    const res = await fetch(`${this.baseUrl}/model-info`);
    if (!res.ok) throw new Error(`ML API error: ${res.statusText}`);
    return res.json();
  }

  async healthCheck(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`);
      return res.ok;
    } catch {
      return false;
    }
  }
}

function safeScore(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

// Fallback deterministic scorer when ML API is unavailable
export function fallbackScorer(request: MlPredictionRequest): MlPredictionResponse {
  const f = request.features;

  const sleepScore = safeScore((f.avgSleepHours / 8) * 100 * 0.3, 0) + safeScore((f.avgSleepQuality / 10) * 100 * 0.2, 0);
  const hrvScore = safeScore((1 - (f.avgRestingHr - 40) / 60) * 100, 50);
  const mentalAvg = safeScore(
    (f.avgMotivation + (11 - f.avgStress) + f.avgConfidence + f.avgFocus) / 4 * 10,
    50
  );
  const mentalScore = Number.isFinite(mentalAvg) ? Math.max(0, Math.min(100, mentalAvg)) : 50;
  const sorenessPenalty = Math.min(safeScore(f.totalSorenessScore, 0) * 5, 30);
  const injuryPenalty = Math.min(safeScore(f.activeInjuries, 0) * 15, 40);

  const readiness = Math.max(0, Math.min(100, sleepScore * 0.3 + hrvScore * 0.25 + mentalScore * 0.25 - sorenessPenalty - injuryPenalty));

  return {
    readinessScore: Math.round(readiness),
    readinessLabel: readiness > 75 ? "ready" : readiness > 55 ? "moderate" : readiness > 35 ? "fatigued" : "high-risk",
    topFeatures: [
      { name: "Sleep Quality", value: f.avgSleepQuality, impact: safeScore(f.avgSleepQuality, 5) > 7 ? 15 : -10 },
      { name: "Resting HR", value: f.avgRestingHr, impact: safeScore(f.avgRestingHr, 60) < 65 ? 10 : -8 },
      { name: "Stress Level", value: f.avgStress, impact: safeScore(f.avgStress, 5) < 5 ? 12 : -12 },
    ],
    injuryRisk: f.activeInjuries > 0 || f.totalSorenessScore > 8 ? "HIGH" : "LOW",
    injuryRiskConfidence: 0.7,
    fatigueDetected: safeScore(f.avgSleepHours, 8) < 6 || safeScore(f.sleepDebtHours, 0) > 6,
    fatigueConfidence: 0.65,
    recommendation: readiness > 75 ? "Athlete is recovered and ready for high-intensity training."
      : readiness > 55 ? "Moderate readiness. Proceed with planned training but monitor load."
      : readiness > 35 ? "Significant fatigue detected. Consider light recovery day or active recovery."
      : "High fatigue and injury risk. REST day recommended. Prioritize sleep and nutrition.",
  };
}
