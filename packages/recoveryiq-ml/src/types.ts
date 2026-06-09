export interface MlPredictionRequest {
  athleteId: string;
  date: string;
  // 30-day feature vector
  features: {
    // Sleep (7-day rolling)
    avgSleepHours: number;
    avgSleepQuality: number;
    sleepDebtHours: number;
    // HRV proxy
    avgRestingHr: number;
    avgMorningFeel: number;
    hrvTrend: "improving" | "stable" | "declining";
    // Soreness
    totalSorenessScore: number;
    sorenessTrend: "increasing" | "stable" | "decreasing";
    // Mental
    avgMotivation: number;
    avgStress: number;
    avgConfidence: number;
    avgFocus: number;
    // Training load
    avgTrainingLoad7d: number;
    trainingLoadTrend: "increasing" | "stable" | "decreasing";
    // Form data (from form-iq integration)
    avgFormScore7d?: number;
    fatigueDetectedForm?: boolean;
    // Injury history
    daysSinceLastInjury?: number;
    activeInjuries: number;
    rehabCompliance?: number;
    // FormIQ live injury risk
    formInjuryRiskScore?: number;
    formHighRiskCheckpoints?: number;
    // Rehab data
    painTrend?: "improving" | "stable" | "worsening";
    rehabStage?: "acute" | "subacute" | "rehab" | "strength" | "return-to-sport";
    returnToPlayScore?: number;
  };
}

export interface FormRiskContributor {
  checkpointId: string;
  riskScore: number;
  bodyZone: string;
}

export interface MlPredictionResponse {
  readinessScore: number;     // 0-100
  readinessLabel: "ready" | "moderate" | "fatigued" | "high-risk";
  topFeatures: ShapFeature[];
  injuryRisk: "LOW" | "HIGH";
  injuryRiskConfidence: number;
  fatigueDetected: boolean;
  fatigueConfidence: number;
  recommendation: string;
  formRiskContributors?: FormRiskContributor[];
  rehabReadinessScore?: number;
}

export interface ShapFeature {
  name: string;
  value: number;
  impact: number;  // positive = increases readiness, negative = decreases
}

export interface MlModelMetadata {
  primaryModel: string;      // "xgboost"
  secondaryModel: string;    // "random_forest"
  tertiaryModel: string;     // "lstm"
  version: string;
  trainedOn: string;         // date
  accuracy: number;
}
