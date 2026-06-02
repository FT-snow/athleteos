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

// Fallback deterministic scorer when ML API is unavailable
export function fallbackScorer(request: MlPredictionRequest): MlPredictionResponse {
  // Compute a simple weighted score
  const sleepScore = (request.features.avgSleepHours / 8) * 100 * 0.3 + (request.features.avgSleepQuality / 10) * 100 * 0.2;
  const hrvScore = (1 - (request.features.avgRestingHr - 40) / 60) * 100;
  const mentalScore = (
    request.features.avgMotivation +
    (11 - request.features.avgStress) +
    request.features.avgConfidence +
    request.features.avgFocus
  ) / 4 * 10;
  const sorenessPenalty = Math.min(request.features.totalSorenessScore * 5, 30);
  const injuryPenalty = Math.min(request.features.activeInjuries * 15, 40);

  const readiness = Math.max(0, Math.min(100, sleepScore * 0.3 + hrvScore * 0.25 + mentalScore * 0.25 - sorenessPenalty - injuryPenalty));

  return {
    readinessScore: Math.round(readiness),
    readinessLabel: readiness > 75 ? "ready" : readiness > 55 ? "moderate" : readiness > 35 ? "fatigued" : "high-risk",
    topFeatures: [
      { name: "Sleep Quality", value: request.features.avgSleepQuality, impact: request.features.avgSleepQuality > 7 ? 15 : -10 },
      { name: "Resting HR", value: request.features.avgRestingHr, impact: request.features.avgRestingHr < 65 ? 10 : -8 },
      { name: "Stress Level", value: request.features.avgStress, impact: request.features.avgStress < 5 ? 12 : -12 },
    ],
    injuryRisk: request.features.activeInjuries > 0 || request.features.totalSorenessScore > 8 ? "HIGH" : "LOW",
    injuryRiskConfidence: 0.7,
    fatigueDetected: request.features.avgSleepHours < 6 || request.features.sleepDebtHours > 6,
    fatigueConfidence: 0.65,
    recommendation: readiness > 75 ? "Athlete is recovered and ready for high-intensity training."
      : readiness > 55 ? "Moderate readiness. Proceed with planned training but monitor load."
      : readiness > 35 ? "Significant fatigue detected. Consider light recovery day or active recovery."
      : "High fatigue and injury risk. REST day recommended. Prioritize sleep and nutrition.",
  };
}
