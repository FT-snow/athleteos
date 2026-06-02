# Bottlenecks

## 1. Live frame round-trips to Python

Sending every webcam frame to a Python OpenCV service will add visible latency.

Recommended path:

- keep live pose and lattice drawing in browser
- send only low-rate refresh frames for calibration if needed
- send full clips only for offline or post-session analysis

## 2. Convex write amplification

30-60 FPS writes will flood storage and waste bandwidth.

Recommended path:

- save per-rep summaries
- save 1 Hz aggregate samples if trend data is needed
- save flagged frames only

## 3. Pose jitter

Raw landmark noise can create false rep transitions and unstable scores.

Recommended path:

- MediaPipe smoothing
- One Euro or EMA smoothing on landmarks before angle math
- threshold hysteresis in rep counting

## 4. LLM latency and cost

Generative responses are too slow for sub-second movement feedback.

Recommended path:

- use rule-based instant cues during live set
- call OpenRouter after rep or after session for richer summaries

## 5. Package boundary drift

Fast demo iteration can outpace reusable package APIs.

Current mitigation:

- core/runtime/ui/storage/ai packages compile independently
- demo shell keeps compatibility helpers local until final package contracts settle
