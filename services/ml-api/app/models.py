from pydantic import BaseModel
from typing import Optional

class Features(BaseModel):
    avgSleepHours: float
    avgSleepQuality: float
    sleepDebtHours: float
    avgRestingHr: float
    avgMorningFeel: float
    hrvTrend: str
    totalSorenessScore: float
    sorenessTrend: str
    avgMotivation: float
    avgStress: float
    avgConfidence: float
    avgFocus: float
    avgTrainingLoad7d: float
    trainingLoadTrend: str
    avgFormScore7d: Optional[float] = None
    fatigueDetectedForm: Optional[bool] = None
    daysSinceLastInjury: Optional[int] = None
    activeInjuries: int = 0
    rehabCompliance: Optional[float] = None

class PredictionRequest(BaseModel):
    athleteId: str
    date: str
    features: Features

class ShapFeature(BaseModel):
    name: str
    value: float
    impact: float

class PredictionResponse(BaseModel):
    readinessScore: float
    readinessLabel: str
    topFeatures: list[ShapFeature]
    injuryRisk: str
    injuryRiskConfidence: float
    fatigueDetected: bool
    fatigueConfidence: float
    recommendation: str
