export interface EmaState {
  value: number;
  initialized: boolean;
}

export function createEmaState(initialValue = 0): EmaState {
  return { value: initialValue, initialized: false };
}

export function updateEma(state: EmaState, nextValue: number, alpha = 0.4): EmaState {
  if (!state.initialized) {
    return { value: nextValue, initialized: true };
  }

  return {
    value: state.value + alpha * (nextValue - state.value),
    initialized: true,
  };
}

export interface OneEuroState {
  initialized: boolean;
  previousValue: number;
  previousDerivative: number;
  previousTimestampMs: number;
}

export interface OneEuroConfig {
  minCutoff?: number;
  beta?: number;
  dCutoff?: number;
}

export function createOneEuroState(initialValue = 0, initialTimestampMs = 0): OneEuroState {
  return {
    initialized: false,
    previousValue: initialValue,
    previousDerivative: 0,
    previousTimestampMs: initialTimestampMs,
  };
}

function smoothingFactor(deltaSeconds: number, cutoff: number): number {
  const rate = 2 * Math.PI * cutoff * deltaSeconds;
  return rate / (rate + 1);
}

export function updateOneEuro(
  state: OneEuroState,
  nextValue: number,
  timestampMs: number,
  config: OneEuroConfig = {},
): OneEuroState {
  if (!state.initialized) {
    return {
      initialized: true,
      previousValue: nextValue,
      previousDerivative: 0,
      previousTimestampMs: timestampMs,
    };
  }

  const minCutoff = config.minCutoff ?? 1;
  const beta = config.beta ?? 0.01;
  const dCutoff = config.dCutoff ?? 1;
  const deltaSeconds = Math.max((timestampMs - state.previousTimestampMs) / 1000, 1 / 120);
  const rawDerivative = (nextValue - state.previousValue) / deltaSeconds;
  const derivativeAlpha = smoothingFactor(deltaSeconds, dCutoff);
  const filteredDerivative =
    state.previousDerivative + derivativeAlpha * (rawDerivative - state.previousDerivative);
  const cutoff = minCutoff + beta * Math.abs(filteredDerivative);
  const valueAlpha = smoothingFactor(deltaSeconds, cutoff);
  const filteredValue = state.previousValue + valueAlpha * (nextValue - state.previousValue);

  return {
    initialized: true,
    previousValue: filteredValue,
    previousDerivative: filteredDerivative,
    previousTimestampMs: timestampMs,
  };
}

export function getOneEuroValue(state: OneEuroState): number {
  return state.previousValue;
}
