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
