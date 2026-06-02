# Architecture

## Primary split

- Browser runtime: webcam, MediaPipe pose, lattice drawing, fast rep feedback.
- Core package: joint angles, rep state machine, scoring, fatigue onset detection.
- Storage layer: rep summaries, flagged frame summaries, session summary.
- AI layer: builds structured OpenRouter prompts from reduced session facts.
- OpenCV service: separate calibration and offline or low-rate deeper analysis path.

## Why split this way

- Low latency path stays in browser.
- High-volume raw frames stay ephemeral.
- Convex stores durable structured outputs, not video firehose.
- OpenRouter only sees compact biomechanical summaries.
- Bigger products can import packages directly instead of copying app code.

## Current package contracts

### `@formiq/types`

- Shared landmarks, frame metrics, rep metrics, fatigue result, session summary, exercise config.

### `@formiq/core`

- Angle math.
- Side selection.
- EMA and One Euro smoothing helpers.
- Squat and push-up rep counting.
- Per-rep scoring.
- Session summary and fatigue onset detection.

### `@formiq/runtime`

- Camera attachment.
- `requestAnimationFrame` and `requestVideoFrameCallback` loop helpers.
- MediaPipe pose loader scaffold.
- Pose pipeline state.
- Body lattice generation.
- Canvas drawing helpers.
- Mock pose frame generator.

### `@formiq/ui`

- Live stage.
- Stats rail.
- Rep timeline.
- Summary hero.
- Fatigue chart.
- Coaching card.

### `@formiq/ai`

- Post-rep and post-session prompt builders.
- OpenRouter request helpers.
- Response parsing.

### `@formiq/storage`

- Storage adapter interfaces.
- Convex-oriented mutation descriptors and HTTP transport.

## Data flow

1. Browser captures frame.
2. Browser pose model extracts landmarks.
3. Core package derives joint angles and rep events.
4. Browser updates live UI immediately.
5. Rep summaries and sparse flagged events get queued for storage.
6. Session summary feeds AI prompt builder.
7. OpenRouter returns coaching text or structured JSON.
8. OpenCV service stays available for later lattice calibration and deeper asynchronous analysis.
