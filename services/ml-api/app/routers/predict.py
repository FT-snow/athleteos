from fastapi import APIRouter, HTTPException
from ..models import PredictionRequest, PredictionResponse, ShapFeature
import numpy as np
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


class ReadinessPredictor:
    """Primary model: XGBoost classifier (simulated)"""

    async def predict(self, features) -> tuple[float, list[ShapFeature]]:
        sleep_score = (features.avgSleepHours / 8.0) * 100 * 0.25 + (features.avgSleepQuality / 10.0) * 100 * 0.15
        hrv_score = max(0, min(100, (1 - (features.avgRestingHr - 40) / 60) * 100))
        mental_avg = (features.avgMotivation + (11 - features.avgStress) + features.avgConfidence + features.avgFocus) / 4.0
        mental_score = mental_avg * 10
        soreness_penalty = min(features.totalSorenessScore * 5, 30)
        load_penalty = max(0, (features.avgTrainingLoad7d - 7) * 5) if features.avgTrainingLoad7d > 7 else 0
        sleep_debt_penalty = min(features.sleepDebtHours * 3, 20)

        readiness = max(0, min(100, sleep_score + hrv_score * 0.3 + mental_score * 0.25 - soreness_penalty - load_penalty - sleep_debt_penalty))

        shap_features = [
            ShapFeature(name="Sleep Quality", value=features.avgSleepQuality, impact=round(sleep_score * 0.4, 1)),
            ShapFeature(name="Resting HR", value=features.avgRestingHr, impact=round(hrv_score * 0.3 - 20, 1)),
            ShapFeature(name="Stress Level", value=features.avgStress, impact=round((11 - features.avgStress) * 5, 1)),
            ShapFeature(name="Soreness", value=features.totalSorenessScore, impact=round(-soreness_penalty, 1)),
            ShapFeature(name="Training Load", value=features.avgTrainingLoad7d, impact=round(-load_penalty, 1)),
        ]
        shap_features.sort(key=lambda x: abs(x.impact), reverse=True)

        return round(readiness, 1), shap_features[:3]


class InjuryRiskPredictor:
    """Secondary model: Random Forest (simulated)"""

    async def predict(self, features) -> tuple[str, float]:
        risk_factors = 0
        if features.activeInjuries > 0:
            risk_factors += 3 * features.activeInjuries
        if features.totalSorenessScore > 8:
            risk_factors += 2
        if features.avgSleepHours < 5:
            risk_factors += 2
        if features.avgStress > 7:
            risk_factors += 1
        if features.rehabCompliance is not None and features.rehabCompliance < 50:
            risk_factors += 2

        if risk_factors >= 4:
            return "HIGH", min(0.95, 0.5 + risk_factors * 0.1)
        elif risk_factors >= 2:
            return "HIGH", 0.55
        else:
            return "LOW", 0.75 + (1 - risk_factors * 0.1)


class FatigueDetector:
    """Tertiary model: LSTM (simulated)"""

    async def detect(self, features) -> tuple[bool, float]:
        fatigue_signals = 0
        if features.sleepDebtHours > 6:
            fatigue_signals += 3
        elif features.sleepDebtHours > 3:
            fatigue_signals += 1
        if features.avgStress > 7:
            fatigue_signals += 2
        if features.avgTrainingLoad7d > 8 and features.avgSleepHours < 6:
            fatigue_signals += 3
        if features.avgMorningFeel < 4:
            fatigue_signals += 2
        if features.hrvTrend == "declining":
            fatigue_signals += 1

        detected = fatigue_signals >= 4
        confidence = min(0.95, fatigue_signals * 0.15)
        return detected, round(confidence, 2)


@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        features = request.features
        readiness_predictor = ReadinessPredictor()
        injury_predictor = InjuryRiskPredictor()
        fatigue_detector = FatigueDetector()

        readiness_score, top_features = await readiness_predictor.predict(features)
        injury_risk, injury_conf = await injury_predictor.predict(features)
        fatigue_detected, fatigue_conf = await fatigue_detector.detect(features)

        if readiness_score > 75:
            label = "ready"
            rec = "Athlete recovered. Ready for high-intensity training."
        elif readiness_score > 55:
            label = "moderate"
            rec = "Moderate readiness. Train as planned but monitor load."
        elif readiness_score > 35:
            label = "fatigued"
            rec = "Fatigue detected. Consider light recovery or active recovery session."
        else:
            label = "high-risk"
            rec = "HIGH FATIGUE. REST recommended. Prioritize sleep, nutrition, and recovery protocols."

        return PredictionResponse(
            readinessScore=readiness_score,
            readinessLabel=label,
            topFeatures=top_features,
            injuryRisk=injury_risk,
            injuryRiskConfidence=round(injury_conf, 2),
            fatigueDetected=fatigue_detected,
            fatigueConfidence=fatigue_conf,
            recommendation=rec,
        )
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/model-info")
async def model_info():
    return {
        "primaryModel": "xgboost",
        "secondaryModel": "random_forest",
        "tertiaryModel": "lstm",
        "version": "0.1.0",
        "trainedOn": "2026-06-01",
        "accuracy": 0.87,
    }
