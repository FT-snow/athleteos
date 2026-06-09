# AthleteOS — All-in-All Refinement Report

**Date:** 2026-06-01  
**Packages Checked:** 14  
**Status:** ⚠️ PASS with warnings per section

## 1. Cross-Package Type Consistency

### BodyZone Alignment

`@recoveryiq/core` BodyZone:
```
"legs" | "back" | "shoulders" | "arms" | "core" | "chest" | "glutes"
| "hips" | "neck" | "knees" | "ankles" | "wrists" | "elbows"
```

`@recoveryiq/rehab` BodyZone:
```
"knees" | "shoulders" | "elbows" | "back" | "spine" | "hips"
| "ankles" | "wrists" | "neck" | "core" | "glutes" | "hamstrings" | "quads"
```

_Result: ⚠️ Partial Mismatch_

- Rehab has **`"spine"`**, **`"hamstrings"`**, **`"quads"`** absent from core.
- Core has **`"legs"`**, **`"arms"`**, **`"chest"`** absent from rehab.
- **Impact:** The `checkpointMatchesZone` lookup in `formiq-modifier.ts:24` indexes `ZONE_CHECKPOINT_MAP` by core's `BodyZone`, so any rehab-only zones ("spine", "hamstrings", "quads") will silently return `false` for zone matching. Rehab protocols that use these zones cannot be mapped back to biomechanical checkpoints.

### ExerciseKind vs ExerciseCategory

`@formiq/types/metrics.ts` defines `ExerciseKind` (49 entries — detailed exercise names like `"squat"`, `"golf_swing"`, `"tennis_serve"`).

`@formiq/biomechanics/types.ts` defines `ExerciseCategory` (9 entries — coarse categories like `"push"`, `"pull"`, `"legs"`, `"golf"`, `"tennis"`).

_Result: ⚠️ No direct linkage_

No mapping exists between `ExerciseCategory` and `ExerciseKind`. The `ExerciseBiomechanics` type uses `ExerciseCategory`, while all metrics/rep tracking uses `ExerciseKind`. Bridge code must manually categorize, inviting inconsistency.

### MlPredictionRequest ↔ Python Features

| Field | TypeScript `MlPredictionRequest` | Python `Features` | Status |
|-------|----------------------------------|-------------------|--------|
| `formInjuryRiskScore` | ❌ missing | `Optional[float]` | ❌ Gap |
| `formHighRiskCheckpoints` | ❌ missing | `Optional[int]` | ❌ Gap |
| `painTrend` | ❌ missing | `Optional[str]` | ❌ Gap |
| `rehabStage` | ❌ missing | `Optional[str]` | ❌ Gap |
| `returnToPlayScore` | ❌ missing | `Optional[float]` | ❌ Gap |

_Result: ❌ TypeScript type is behind Python models_

The ML API accepts 5 additional fields (`formInjuryRiskScore`, `formHighRiskCheckpoints`, `painTrend`, `rehabStage`, `returnToPlayScore`) that the TypeScript `MlPredictionRequest` type does not declare and the bridge never populates.

### PredictionResponse ↔ MlPredictionResponse

`PredictionResponse` (Python) has two extra fields not in TypeScript `MlPredictionResponse`:

| Field | Python | TypeScript |
|-------|--------|------------|
| `formRiskContributors` | `list[FormRiskContributor]` (default `[]`) | ❌ missing |
| `rehabReadinessScore` | `Optional[float]` | ❌ missing |

_Result: ❌ Response type is incomplete_

The `PredictorClient.predictReadiness()` calls `res.json()` and asserts `MlPredictionResponse`, but the API returns fields the TypeScript type doesn't account for. Extra fields are silently dropped by TypeScript but a consumer cannot access them without type casts.

### CheckpointRiskResult ↔ getFormInjuryRiskScore return

`@formiq/core` `analyzeCheckpointRisk()` returns `CheckpointRiskResult` with structured fields (`riskScore`, `proximityToCritical`, `cue`).

`@recoveryiq/rehab` `getFormInjuryRiskScore()` in `formiq-modifier.ts:91-156` duplicates the risk scoring logic independently, producing a different shape (`{ overallRisk, highRiskItems }`) with subtly different risk math.

_Result: ⚠️ Duplicated risk computation_

The rehab package reimplements the same risk calculation instead of importing from `@formiq/core`. The duplicated logic may diverge over time — e.g., `formiq-core` uses `clamp((1 - weight) * 15, 0, 15)` for good evaluations while `formiq-modifier` uses `10 * (1 - weight)`.

## 2. Data Pipeline Integrity

### RecoveryIQ → ML Bridge (`recovery-to-ml.ts`)

_What it covers:_
- Converts `DailyRecoveryLog[]` → `MlPredictionRequest`
- Maps sleep, HRV, soreness, mental, training load → feature vector
- Computes trends (sorenessTrend, hrvTrend, trainingLoadTrend)
- Handles missing data with `safe()` fallback of 5

_What might be missing:_
- `activeInjuries` is **hardcoded to 0** (line 74) — never reads from injury records
- `rehabCompliance`, `daysSinceLastInjury`, `fatigueDetectedForm` are never set
- `avgFormScore7d` populated via `(l as any).formScore` — **type-unsafe cast**, no validation
- The 5 new Python Fields fields (`formInjuryRiskScore`, `painTrend`, etc.) are absent
- `formScores` uses `logs` (all logs) vs `recentLogs` (7-day filtered) inconsistently

_Result: ⚠️ Functional but incomplete_

### FormIQ → Rehab Modifier (`formiq-modifier.ts`)

_What it covers:_
- Maps BodyZone → `RegExp[]` patterns for checkpoint matching
- `checkpointMatchesZone`: correctly types `BiomechanicalCheckpoint` fields
- `getExercisesForZone`: filters exercises by zone
- `modifyCheckpointsForInjury`: deep-clones exercises, tightens range, adjusts weight
- `getFormInjuryRiskScore`: custom risk reimplementation (see §1)

_Result: ⚠️ Functionally correct but risk logic duplicated_

### Rehab → ML Readiness Bridge (`readiness.ts`)

`assessReturnToPlay`: Correctly queries `protocolLibrary.get()` and handles missing protocol + empty progress. Returns sensible defaults on failure.

`getRehabReadinessScore`: Handles empty `injuries` (returns 100) and empty progress per injury (skips with `continue`).

`estimateRecoveryDays`: Null-safe on `protocolLibrary.get()`, handles missing progress.

`getFormModifierLevel`: Handles empty entries (returns `"none"`).

_Result: ✅ Well-defended_

## 3. Dependency Graph Verification

| Package | Dependencies | Status |
|---------|-------------|--------|
| `@formiq/core` | `@formiq/types`, `@formiq/biomechanics` | ✅ |
| `@recoveryiq/rehab` | `@recoveryiq/core`, `@formiq/biomechanics`, `@formiq/types` (all **peer**) | ✅ |
| `@athleteos/dashboard` | `@recoveryiq/core`, `@recoveryiq/db`, `@recoveryiq/ml`, `@recoveryiq/rehab` | ✅ |
| `@formiq/biomechanics` | (none) | ✅ |
| `@recoveryiq/ml` | (none) | ✅ |

Notes:
- `@recoveryiq/rehab` lists deps as **peerDependencies**, not regular dependencies — consumer must install them. The dashboard does include `@recoveryiq/core` and `@recoveryiq/rehab` directly, but does NOT include `@formiq/biomechanics` or `@formiq/types`. If the dashboard ever needed to construct `ExerciseBiomechanics` objects directly, it would fail at runtime.
- The dashboard does **not** depend on `@formiq/core` — it relies on `@recoveryiq/rehab` to proxy form data.

## 4. Threshold Scientific Tuning

### evaluateCheckpoint range evaluation

`formiq-biomechanics/src/types.ts:89-103`:

```typescript
if (angle >= criticalRange[0] && angle <= criticalRange[1]) return "critical";
if (angle >= warningRange[0] && angle <= warningRange[1]) return "warning";
if (angle >= goodRange[0] && angle <= goodRange[1]) return "good";
return "warning";
```

Issues:
- **Default fallback is "warning"** — angles outside all defined ranges (e.g., far beyond critical) are still flagged as warning instead of critical. A severely hyperextended joint could escape critical detection.
- **No overlap guard** — if `goodRange` overlaps `warningRange` or `criticalRange`, the ordering means critical wins, but the system silently ignores ambiguous zone boundaries.
- **Assumes ranges are inclusive** — boundary values like 90° on the edge of both `goodRange: [80, 90]` and `warningRange: [90, 100]` would be **good** (because good is evaluated first). Wait — actually critical is evaluated first. Let me re-check: the order is critical → warning → good. So 90° in both `goodRange` and `warningRange` would return "warning" because warning is checked before good. This is fine, but the semantics are unclear for checkpoint authors.

### Recovery Score thresholds

`computeFatigueLevel` in `scoring.ts:18-23`:
```
> 80  → low
≥ 60  → moderate
≥ 40  → high
< 40  → extreme
```

These are heuristics with no sport-specific calibration. A strength athlete might have 65 as "normal" while an endurance athlete might have 50 as "normal". No per-sport adjustment exists.

### ML API confidence thresholds

`InjuryRiskPredictor.predict()` in `predict.py:83-89`:
```
risk_factors ≥ 6 → HIGH, confidence 0.5 + factors * 0.08 (cap 0.95)
risk_factors ≥ 3 → HIGH, confidence 0.55 + factors * 0.05
else            → LOW,  confidence 0.7 + (3 - factors) * 0.05
```

The confidence formula for HIGH starts at 0.5 + 6*0.08 = 0.98 (capped at 0.95), while for 3 factors it's 0.55 + 3*0.05 = 0.70. The jump at the boundary (0.70 vs 0.95) is discontinuous — 2 risk factors gives LOW at 0.80 confidence, while 3 gives HIGH at 0.70 confidence (lower confidence but more severe label). This discontinuity could cause oscillations near the boundary.

## 5. Edge Case Catalog

### `computeRecoveryScore` with empty/invalid data

| Condition | Behavior | File:Line |
|-----------|----------|-----------|
| `log.soreness` empty | `aggregateSoreness` returns `{ totalPenalty: 0, zoneBreakdown: {} }` | `soreness.ts:11-21` |
| `previousLogs` undefined | `computeTrend` returns `"stable"`, `computeSleepDebt` returns `false` | `scoring.ts:26, 87` |
| `previousLogs` length 0-2 | `computeSleepDebt` returns `false` (< 3 check), trend fallback | `scoring.ts:12, 26` |
| NaN in any field | `scoreSleep`/`scoreHrv`/`scoreMental` may return NaN → `readiness` = NaN → `Math.max(0, NaN)` = NaN | `scoring.ts:82-84` |
| Out-of-range values | Nothing clamped before aggregation; `scoreHours` handles <0 hours as 50 (fallthrough), `sorenessPenalty` only handles 1-5 | `sleep.ts:3-12`, `soreness.ts:3-8` |
| Negative hours in sleep | `scoreHours` has no negative guard — falls through to `return 50` | `sleep.ts:3-12` |

### `computeRehabProgress` with 0 entries

| Behavior | File:Line |
|----------|-----------|
| Returns explicit default: `{ injuryId: "", currentPhase: "acute", daysInPhase: 0, totalDays: 0, painTrend: "stable", romTrend: "unknown", complianceRate: 0, projectedDaysToRecovery: 0, score: 0, stalled: false, alerts: [] }` | `progress.ts:66-80` |
| `getPainTrend` with < 6 entries returns `"stable"` | `progress.ts:5` |
| `getRomTrend` with 0 entries returns `"unknown"` | `progress.ts:22-23` |
| `calculateComplianceRate` with empty array returns 0 | `progress.ts:48` |
| `identifyStalling` with < 7 entries returns false | `progress.ts:53` |

_Result: ✅ Well-defended, explicit defaults_

### `analyzeFormInjuryRisk` with 0 results

| Behavior | File:Line |
|----------|-----------|
| `totalWeight` = `results.reduce(...)` on empty → `0` | `risk.ts:72-75` |
| `divisor` = `0`, check `divisor === 0` → `overallRiskScore = 0` | `risk.ts:80` |
| `overallRiskLevel` → `"low"` (score ≤ 25) | `risk.ts:83` |
| `highRiskCheckpoints` → `[]` | `risk.ts:88-90` |
| `primaryContributor` → `null` | `risk.ts:93-95` |
| `recommendation` → `"Form looks good..."` | `risk.ts:106` |

_Result: ✅ Safe, but misleading recommendation for 0 results_

The recommendation `"Form looks good. Maintain current intensity."` for zero checkpoints is semantically wrong — no checkpoints were evaluated, yet it implies good form.

### `fallbackScorer` with NaN/missing features

| Condition | Behavior | File:Line |
|-----------|----------|-----------|
| `avgSleepHours` = 0 | `(0/8)*100*0.3` = 0 | `predictors.ts:39` |
| `avgRestingHr` = 40 | `(1 - 0/60)*100` = 100 | `predictors.ts:40` |
| `avgRestingHr` < 40 | `(1 - (negative)/60)*100` > 100, but `Math.min(100, ...)` clamps | `predictors.ts:40, 50` |
| `avgRestingHr` = 100 | `(1 - 60/60)*100` = 0 → fine | `predictors.ts:40` |
| `avgRestingHr` missing/NaN | `(1 - (NaN)/60)*100` = NaN → `readiness` = NaN | (no NaN guard) |
| `avgStress` = NaN | `(11 - NaN + ...)` = NaN → `mentalScore` = NaN → `readiness` = NaN | (no NaN guard) |
| `topFeatures` hardcoded (not computed) | Always returns 3 hardcoded features regardless of actual data | `predictors.ts:55-59` |
| `injuryRisk` logic | `activeInjuries > 0` but it's always 0 (see bridge) — never triggers unless `totalSorenessScore > 8` | `predictors.ts:60` |

_Result: ⚠️ Missing NaN guards for computed values_

### `logsToMlRequest` edge cases

| Condition | Behavior | File:Line |
|-----------|----------|-----------|
| Empty `logs` array | `recentLogs` = `[]`, then `safe` returns 5 for all fields, `totalSoreness` = 0 | `recovery-to-ml.ts:14-18, 21-24` |
| 1 log only | `half` = 0, `recentSoreness` = 0, `olderSoreness` = 0 → `sorenessTrend` = "stable" | `recovery-to-ml.ts:40-43` |
| `hrvTrend` slice(0,7) on < 7 logs | Still works, just available logs | `recovery-to-ml.ts:46` |
| `trainingLoad` missing in all logs | `safe` → default 5 via `??` | `recovery-to-ml.ts:51, 71` |
| No `formScore` on any log | `formScores` = `[]` → `avgFormScore7d` = `undefined` | `recovery-to-ml.ts:35-37, 73` |

## 6. Overall System Health Score

**Score: 74/100**

Breakdown:
- **Type consistency: 16/25** — BodyZone mismatch (-5), missing MlPredictionRequest fields (-2), missing MlPredictionResponse fields (-2)
- **Pipeline integrity: 20/25** — Bridge misses modern Features fields (-3), hardcoded activeInjuries (-1), type-unsafe cast (-1)
- **Edge case handling: 22/25** — rehab progress has excellent defaults, fallbackScorer missing NaN guards (-2), analyzeFormInjuryRisk misleading empty recommendation (-1)
- **Coverage completeness: 16/25** — No protocol→zone bidirectional mapping (-3), rehab depends on peerDeps not enforced (-2), no test files found for core functions (-2), ExerciseKind↔ExerciseCategory gap (-2)

## 7. Recommendations

1. **Unify BodyZone across packages** — Extract `BodyZone` into a shared `@recoveryiq/types` package or use `@recoveryiq/core` as the source of truth. Add `"spine"`, `"hamstrings"`, `"quads"` to core or map them in `ZONE_CHECKPOINT_MAP`.

2. **Sync TypeScript ↔ Python type definitions** — Add `formInjuryRiskScore`, `formHighRiskCheckpoints`, `painTrend`, `rehabStage`, `returnToPlayScore` to `MlPredictionRequest.features`. Add `formRiskContributors` and `rehabReadinessScore` to `MlPredictionResponse`.

3. **Remove duplicated risk logic** — Have `formiq-modifier.ts` import `analyzeCheckpointRisk` from `@formiq/core` instead of reimplementing the risk computation. The `getFormInjuryRiskScore` function should delegate to `analyzeCheckpointRisk` for each checkpoint.

4. **Wire active injuries into the ML bridge** — `recovery-to-ml.ts:74` hardcodes `activeInjuries: 0`. Accept an `activeInjuryCount` parameter or read from `DailyRecoveryLog.injuryNotes`. Also pipe `rehabCompliance` and `daysSinceLastInjury`.

5. **Add NaN guards to fallbackScorer** — Wrap computed values in `Number.isFinite()` checks. If `avgRestingHr` or `avgStress` are missing/NaN, the entire readiness score becomes NaN and propagates silently.

6. **Fix evaluateCheckpoint fallthrough** — In `formiq-biomechanics/src/types.ts:102`, change the default from `"warning"` to `"critical"` for angles beyond all defined ranges (safer). Add comments warning checkpoint authors not to overlap ranges.

7. **Add test coverage** — No test files were found for `computeRecoveryScore`, `computeRehabProgress`, `analyzeFormInjuryRisk`, or `fallbackScorer`. Critical edge cases (NaN inputs, empty arrays, out-of-range values) should have explicit tests.

8. **Add ExerciseKind↔ExerciseCategory mapping** — Create a bidirectional mapping so `@formiq/biomechanics` can reference specific `ExerciseKind` values, enabling direct lookups from tracking data to biomechanical models.
