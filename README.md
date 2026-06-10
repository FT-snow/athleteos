<<<<<<< HEAD
# Athlete.OS

Performance Intelligence Platform
Form Analysis · Recovery · Sleep · Nutrition · AI Coach

Built at QuantumHack by Team Velox

---

## What is it?

Athlete.OS is a unified sports intelligence platform that combines AI-powered 
form analysis, injury rehab tracking, recovery planning, sleep insights, and 
precision nutrition — all in one interface built for serious athletes.

Every module feeds into a central AI Coach that understands your full 
performance picture and delivers personalised guidance.

---

## Modules

FormIQ — Real-time pose estimation via MediaPipe and OpenCV. Analyses 
movement, flags injury risk, scores form across 10+ sport-specific checkpoints.

Rehab — Injury logging, pain trend tracking, range-of-motion monitoring, 
AI-generated rehab protocols with return-to-play estimates.

Recovery — Daily readiness scoring and AI-recommended recovery strategies 
based on training load.

Sleep — Sleep duration and quality tracking with 7-day trend analysis.

NutriSync — Macro and micronutrient tracking via USDA FoodData Central. 
Supports Indian, East Asian, North American, Southeast Asian cuisine.

AI Coach — Powered by OpenRouter API (GPT-4o). Reads all modules 
simultaneously and delivers personalised performance coaching.

---

## Tech Stack

Frontend: Next.js 15, GSAP, Framer Motion, React Three Fiber, Tailwind CSS
Backend: Python, FastAPI
Computer Vision: OpenCV, MediaPipe
AI: OpenRouter API — GPT-4o
Database & Backend Services: Convex
Nutrition: USDA FoodData Central API

---

## Setup

1. Clone the repo
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. Add .env.local with your OpenRouter and Convex keys
5. npm run dev and uvicorn main:app --reload

---

## Team
Anchal Singh - Full Stack + AI 
Prakhar Upadhyay — Full Stack + AI

---

Built at QuantumHack 2026
=======
# Athlete OS

An AI-powered athlete management platform combining form analysis, nutrition tracking, recovery monitoring, and intelligent coaching into a unified dashboard.

## Architecture

Athlete OS is a monorepo with the following structure:

```
athlete-os/
  apps/
    dashboard/          -- Next.js dashboard (main UI)
    demo-web/           -- Demo landing page
  packages/
    formiq-*/           -- Form IQ: pose estimation & biomechanics analysis
    recoveryiq-*/       -- Recovery IQ: rehab protocols & recovery tracking
  services/
    ml-api/             -- ML inference service
    opencv/             -- OpenCV-based video processing
  convex/               -- Convex backend (auth, nutrition, sessions, sleep)
```

### Frontend

The dashboard is built with Next.js 16, React 19, and Tailwind CSS 4. Animations use GSAP, Framer Motion, and Anime.js. 3D visualization uses React Three Fiber with post-processing effects.

### Backend

Convex provides the real-time database and serverless functions for authentication, nutrition logging, workout sessions, form analysis, sleep tracking, and coaching messages.

### Machine Learning

- **Form IQ**: Real-time pose estimation using MediaPipe, with 3D biomechanics analysis in the browser
- **ML API**: Python service for inference workloads
- **OpenCV**: Video processing pipeline for form analysis

## Features

### Nutrition Tracking

A food logging system with 74+ foods across four cuisines (Indian, North American, East Asian, Southeast Asian). Foods include full macronutrient and micronutrient profiles. Daily totals are computed with progress bars against configurable targets. Supports Convex-backed persistence with localStorage fallback.

### Form Analysis

AI-powered movement analysis using camera-based pose estimation. Analyzes exercise form, provides real-time feedback, and tracks progress over time. Biomechanics engine evaluates joint angles, bar paths, and symmetry.

### Recovery & Rehab

Protocol-based recovery tracking with customizable rehab exercises. Tracks sleep, heart rate variability, and readiness scores.

### AI Coach

Conversational AI coaching powered by OpenRouter (multi-model gateway). Maintains conversation history and provides personalized training advice.

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- A Convex account and project
- (Optional) An OpenRouter API key for AI coaching features

### Setup

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.local.example .env.local

# Start Convex development
npx convex dev

# Run the dashboard
bun run dev
```

### Environment Variables

The application reads configuration from environment variables at runtime. Required variables:

| Variable | Description |
|----------|-------------|
| `CONVEX_DEPLOYMENT` | Convex deployment identifier |
| `NEXT_PUBLIC_CONVEX_URL` | Convex backend URL (public) |
| `OPENROUTER_API_KEY` | API key for AI coach features |

## About Public Repository Safety

An audit of the repository was conducted to determine whether it is safe to make public:

- **No secrets have ever been committed to git history.** All `.env` and `.env.local` files are excluded via `.gitignore` and have never been tracked.
- **Source code uses `process.env.*` throughout** -- no hardcoded API keys, tokens, or credentials exist in any tracked file.
- **The OpenRouter API key exists in local `.env.local` files on disk only**, which are properly gitignored. As a best practice, you should rotate this key before making the repository public.
- **Convex deployment URLs** (`NEXT_PUBLIC_CONVEX_URL`) are designed to be public and are safe to expose.

The repository can be made public without risk of credential exposure, provided `.gitignore` rules remain intact and no `.env` files are force-pushed.

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dashboard development server |
| `bun run build` | Build all workspaces |
| `bun run typecheck` | Run TypeScript type checking across all workspaces |
| `bun run lint` | Run ESLint across all workspaces |
| `bun run verify` | Run typecheck and build in sequence |
>>>>>>> 3ad1b7b (fix: remove VELOX branding from home page and menu footer)
