"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "@/components/FeatureCard";
import { CoachAdvice } from "@/components/CoachAdvice";
import { FormRiskAlert } from "@/components/rehab/FormRiskAlert";

interface FormAnalysis {
  overallScore: number;
  riskLevel: "low" | "moderate" | "high" | "critical";
  angles: { joint: string; angleDeg: number; status: string }[];
  cues: string[];
}

interface DetectedJoint {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  confidence: number;
}

type PoseSnapshot = Record<string, { x: number; y: number }>;

const LANDMARK_LABELS: Record<number, string> = {
  0: "nose", 1: "left_eye_inner", 2: "left_eye", 3: "left_eye_outer",
  4: "right_eye_inner", 5: "right_eye", 6: "right_eye_outer",
  7: "left_ear", 8: "right_ear", 9: "mouth_left", 10: "mouth_right",
  11: "left_shoulder", 12: "right_shoulder",
  13: "left_elbow", 14: "right_elbow", 15: "left_wrist", 16: "right_wrist",
  17: "left_pinky", 18: "right_pinky", 19: "left_index", 20: "right_index",
  21: "left_thumb", 22: "right_thumb",
  23: "left_hip", 24: "right_hip",
  25: "left_knee", 26: "right_knee", 27: "left_ankle", 28: "right_ankle",
  29: "left_heel", 30: "right_heel", 31: "left_foot_index", 32: "right_foot_index",
};

const LANDMARK_NAME_TO_INDEX: Record<string, number> = Object.fromEntries(
  Object.entries(LANDMARK_LABELS).map(([k, v]) => [v, parseInt(k)])
);

const BONES: [number, number][] = [
  [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
  [11, 23], [12, 24], [23, 24],
  [23, 25], [25, 27], [24, 26], [26, 28],
];

const BODY_LANDMARKS = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];

const ALL_LANDMARKS = Array.from({ length: 33 }, (_, i) => i);

const POSE_CONNECTIONS: [number, number][] = [
  [0, 11], [0, 12],
  [11, 12],
  [11, 13], [13, 15],
  [12, 14], [14, 16],
  [15, 17], [15, 19], [15, 21],
  [16, 18], [16, 20], [16, 22],
  [11, 23], [12, 24],
  [23, 24],
  [23, 25], [25, 27], [27, 29], [27, 31],
  [24, 26], [26, 28], [28, 30], [28, 32],
];

const BONE_ANGLE_MAP: Record<string, string> = {
  "11,13": "shoulder", "12,14": "shoulder",
  "13,15": "elbow", "14,16": "elbow",
  "23,25": "hip", "24,26": "hip",
  "25,27": "knee", "26,28": "knee",
  "11,23": "spine", "12,24": "spine",
  "11,12": "spine", "23,24": "spine",
};

const ANGLE_LANDMARK_TRIPLES: Record<string, [number, number, number][]> = {
  knee: [[23, 25, 27], [24, 26, 28]],
  hip: [[11, 23, 25], [12, 24, 26]],
  elbow: [[11, 13, 15], [12, 14, 16]],
  shoulder: [[0, 11, 13], [0, 12, 14]],
  spine: [[11, 12, 23], [12, 11, 24]],
  ankle: [[25, 27, 29], [26, 28, 30]],
  wrist: [[13, 15, 17], [14, 16, 18]],
};

function getBoneStatus(fromIdx: number, toIdx: number, angles: FormAnalysis["angles"]): string | null {
  const pair = [Math.min(fromIdx, toIdx), Math.max(fromIdx, toIdx)].join(",");
  const angleName = BONE_ANGLE_MAP[pair];
  if (!angleName) return null;
  const match = angles?.find((a) => a.joint.toLowerCase() === angleName);
  return match?.status ?? null;
}

function arcPath(cx: number, cy: number, x1: number, y1: number, x2: number, y2: number, r: number): string {
  const a1 = Math.atan2(y1 - cy, x1 - cx);
  const a2 = Math.atan2(y2 - cy, x2 - cx);
  let startAngle = a1;
  let endAngle = a2;
  let diff = endAngle - startAngle;
  if (diff < 0) diff += 2 * Math.PI;
  if (diff > Math.PI) {
    [startAngle, endAngle] = [endAngle, startAngle];
    diff = 2 * Math.PI - diff;
  }
  if (diff < 0.05) return "";
  const startX = cx + r * Math.cos(startAngle);
  const startY = cy + r * Math.sin(startAngle);
  const endX = cx + r * Math.cos(endAngle);
  const endY = cy + r * Math.sin(endAngle);
  const largeArc = diff > Math.PI ? 1 : 0;
  return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 0 ${endX} ${endY}`;
}

interface ExerciseFocus {
  landmarks: number[];
  primaryAngle: string;
  side: "left" | "right" | "both";
  label: string;
}

const EXERCISE_TO_LANDMARKS: Record<string, ExerciseFocus> = {
  "Squat": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Quads" },
  "Deadlift": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Posterior Chain" },
  "Bench Press": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Chest" },
  "Overhead Press": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "shoulder", side: "both", label: "Shoulders" },
  "Pull-Up": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Back" },
  "Row": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24], primaryAngle: "elbow", side: "both", label: "Back" },
  "Clean & Jerk": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Full Body" },
  "Snatch": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Full Body" },
  "Lunge": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Legs" },
  "Hip Thrust": { landmarks: [11, 12, 23, 24, 25, 26], primaryAngle: "hip", side: "both", label: "Glutes" },
  "Leg Press": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Quads" },
  "Lat Pulldown": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Lats" },
  "Cable Row": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24], primaryAngle: "elbow", side: "both", label: "Back" },
  "Dumbbell Curl": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Biceps" },
  "Tricep Extension": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Triceps" },
  "Plank": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "spine", side: "both", label: "Core" },
  "Pallof Press": { landmarks: [11, 12, 23, 24], primaryAngle: "spine", side: "both", label: "Core" },
  "Farmers Walk": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28], primaryAngle: "spine", side: "both", label: "Full Body" },
  "Box Jump": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Lower Body" },
  "Burpee": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Full Body" },
  "Kettlebell Swing": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Posterior Chain" },
  "Turkish Get-Up": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28], primaryAngle: "shoulder", side: "both", label: "Full Body" },
  "Push-Up": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Chest" },
  "Dip": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Triceps" },
  "Face Pull": { landmarks: [11, 12, 13, 14], primaryAngle: "shoulder", side: "both", label: "Rear Delts" },
  "Lateral Raise": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "shoulder", side: "both", label: "Lateral Delts" },
  "Hammer Curl": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Forearm" },
  "Romanian Deadlift": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Hamstrings" },
  "Good Morning": { landmarks: [23, 24, 25, 26], primaryAngle: "hip", side: "both", label: "Lower Back" },
  "Bulgarian Split Squat": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Legs" },
  "Step-Up": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Legs" },
  "Sprint": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Lower Body" },
  "Agility Drill": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Lower Body" },
  "Medicine Ball Throw": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28], primaryAngle: "shoulder", side: "both", label: "Full Body" },
  "Band Pull-Apart": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "shoulder", side: "both", label: "Upper Back" },
  "Glute Bridge": { landmarks: [23, 24, 25, 26], primaryAngle: "hip", side: "both", label: "Glutes" },
  "Clamshell": { landmarks: [24, 26], primaryAngle: "hip", side: "right", label: "Hip Abductors" },
  "Side Plank": { landmarks: [12, 24, 26], primaryAngle: "spine", side: "right", label: "Obliques" },
  "Dead Bug": { landmarks: [11, 12, 13, 14, 23, 24, 25, 26], primaryAngle: "spine", side: "both", label: "Core" },
  "Bird Dog": { landmarks: [11, 12, 13, 14, 23, 24, 25, 26], primaryAngle: "spine", side: "both", label: "Core" },
  "Wall Sit": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Quads" },
  "Calf Raise": { landmarks: [25, 26, 27, 28], primaryAngle: "ankle", side: "both", label: "Calves" },
  "Wrist Curl": { landmarks: [14, 16], primaryAngle: "wrist", side: "right", label: "Right Forearm" },
  "Neck Flexion": { landmarks: [11, 12], primaryAngle: "spine", side: "both", label: "Neck" },
  "Zercher Squat": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Quads" },
  "Front Squat": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Quads" },
  "Pause Squat": { landmarks: [23, 24, 25, 26, 27, 28], primaryAngle: "knee", side: "both", label: "Quads" },
  "Deficit Deadlift": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Posterior Chain" },
  "Sumo Deadlift": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Adductors" },
  "Trap Bar Deadlift": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Posterior Chain" },
  "Incline Bench": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Upper Chest" },
  "Decline Bench": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Lower Chest" },
  "Dumbbell Bench": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Chest" },
  "Close-Grip Bench": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Triceps" },
  "Wide-Grip Pull-Up": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Lats" },
  "Chin-Up": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Biceps" },
  "Australian Row": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Back" },
  "T-Bar Row": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24], primaryAngle: "elbow", side: "both", label: "Back" },
  "Single-Arm Row": { landmarks: [11, 12, 13, 15, 23, 24, 25, 26], primaryAngle: "elbow", side: "right", label: "Right Back" },
  "Inverted Row": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "elbow", side: "both", label: "Back" },
  "Landmine Press": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24], primaryAngle: "shoulder", side: "both", label: "Shoulders" },
  "Arnold Press": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "shoulder", side: "both", label: "Shoulders" },
  "Cuban Press": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "shoulder", side: "both", label: "Rotator Cuff" },
  "Push Press": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24, 25, 26], primaryAngle: "shoulder", side: "both", label: "Full Body" },
  "Behind-the-Neck Press": { landmarks: [11, 12, 13, 14, 15, 16], primaryAngle: "shoulder", side: "both", label: "Shoulders" },
  "Skull Crusher": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Triceps" },
  "Overhead Tricep Extension": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Triceps" },
  "Preacher Curl": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Biceps" },
  "Spider Curl": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Biceps" },
  "Reverse Curl": { landmarks: [12, 14, 16], primaryAngle: "elbow", side: "right", label: "Right Forearm" },
  "Leg Extension": { landmarks: [23, 24, 25, 26], primaryAngle: "knee", side: "both", label: "Quads" },
  "Leg Curl": { landmarks: [23, 24, 25, 26], primaryAngle: "knee", side: "both", label: "Hamstrings" },
  "Hip Adduction": { landmarks: [23, 24, 25, 26], primaryAngle: "hip", side: "both", label: "Adductors" },
  "Hip Abduction": { landmarks: [23, 24, 25, 26], primaryAngle: "hip", side: "both", label: "Abductors" },
  "Donkey Calf Raise": { landmarks: [25, 26, 27, 28], primaryAngle: "ankle", side: "both", label: "Calves" },
  "Seated Calf Raise": { landmarks: [25, 26, 27, 28], primaryAngle: "ankle", side: "both", label: "Soleus" },
  "Hanging Leg Raise": { landmarks: [11, 12, 23, 24], primaryAngle: "spine", side: "both", label: "Lower Abs" },
  "Ab Wheel": { landmarks: [11, 12, 13, 14, 23, 24, 25, 26], primaryAngle: "spine", side: "both", label: "Core" },
  "Dragon Flag": { landmarks: [11, 12, 13, 14, 23, 24, 25, 26], primaryAngle: "spine", side: "both", label: "Full Core" },
  "Copenhagen Plank": { landmarks: [12, 24, 26], primaryAngle: "spine", side: "right", label: "Adductors" },
  "Reverse Hyper": { landmarks: [23, 24, 25, 26], primaryAngle: "hip", side: "both", label: "Lower Back" },
  "Back Extension": { landmarks: [23, 24, 25, 26], primaryAngle: "hip", side: "both", label: "Lower Back" },
  "Sled Push": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Full Body" },
  "Sled Pull": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Full Body" },
  "Prowler Sprint": { landmarks: [11, 12, 23, 24, 25, 26, 27, 28], primaryAngle: "hip", side: "both", label: "Full Body" },
  "Battle Ropes": { landmarks: [11, 12, 13, 14, 15, 16, 23, 24], primaryAngle: "shoulder", side: "both", label: "Shoulders" },
};

const SPORT_EXERCISES_MAP: Record<string, readonly string[]> = {
  "Weightlifting": ["Squat", "Deadlift", "Bench Press", "Overhead Press", "Clean & Jerk", "Snatch", "Row", "Pull-Up", "Romanian Deadlift", "Good Morning", "Lunge", "Dumbbell Curl", "Tricep Extension", "Hip Thrust", "Glute Bridge", "Front Squat", "Zercher Squat", "Pause Squat", "Sumo Deadlift", "Deficit Deadlift", "Incline Bench", "Close-Grip Bench"],
  "CrossFit": ["Squat", "Deadlift", "Bench Press", "Overhead Press", "Pull-Up", "Clean & Jerk", "Snatch", "Burpee", "Box Jump", "Kettlebell Swing", "Lunge", "Push-Up", "Row", "Medicine Ball Throw", "Front Squat", "Push Press", "Sprint"],
  "Running": ["Squat", "Lunge", "Glute Bridge", "Calf Raise", "Wall Sit", "Step-Up", "Plank", "Sprint", "Deadlift", "Romanian Deadlift", "Donkey Calf Raise"],
  "Cycling": ["Squat", "Lunge", "Wall Sit", "Glute Bridge", "Calf Raise", "Leg Extension", "Leg Curl"],
  "Swimming": ["Pull-Up", "Lat Pulldown", "Row", "Plank", "Dead Bug", "Bird Dog", "Lateral Raise", "Wide-Grip Pull-Up", "Cuban Press"],
  "Golf": ["Squat", "Deadlift", "Row", "Pallof Press", "Bird Dog", "Side Plank", "Lunge", "Hip Thrust", "Cable Row", "Reverse Hyper"],
  "Tennis": ["Sprint", "Lunge", "Agility Drill", "Medicine Ball Throw", "Lateral Raise", "Squat", "Plank", "Push-Up", "Prowler Sprint"],
  "Basketball": ["Squat", "Box Jump", "Sprint", "Lunge", "Agility Drill", "Calf Raise", "Push-Up", "Plank", "Pause Squat", "Sled Push"],
  "Soccer": ["Sprint", "Lunge", "Squat", "Agility Drill", "Calf Raise", "Glute Bridge", "Plank", "Box Jump", "Prowler Sprint", "Hip Adduction"],
  "Football": ["Squat", "Deadlift", "Bench Press", "Clean & Jerk", "Sprint", "Agility Drill", "Box Jump", "Lunge", "Pull-Up", "Trap Bar Deadlift", "Sled Push"],
  "Baseball": ["Squat", "Lunge", "Medicine Ball Throw", "Sprint", "Agility Drill", "Lateral Raise", "Row", "Overhead Press", "Landmine Press", "Cuban Press"],
  "Volleyball": ["Squat", "Box Jump", "Lunge", "Calf Raise", "Overhead Press", "Plank", "Sprint", "Push Press"],
  "Boxing": ["Sprint", "Burpee", "Push-Up", "Squat", "Plank", "Agility Drill", "Medicine Ball Throw", "Kettlebell Swing", "Battle Ropes", "Sled Push"],
  "MMA": ["Squat", "Deadlift", "Kettlebell Swing", "Turkish Get-Up", "Burpee", "Sprint", "Pull-Up", "Plank", "Battle Ropes", "Prowler Sprint"],
  "Jiu-Jitsu": ["Squat", "Deadlift", "Glute Bridge", "Turkish Get-Up", "Burpee", "Pull-Up", "Plank", "Copenhagen Plank"],
  "Yoga": ["Plank", "Side Plank", "Bird Dog", "Dead Bug", "Lunge", "Squat", "Glute Bridge", "Dragon Flag"],
  "Pilates": ["Plank", "Side Plank", "Dead Bug", "Bird Dog", "Glute Bridge", "Clamshell", "Lunge", "Squat", "Copenhagen Plank"],
  "Dance": ["Squat", "Lunge", "Plank", "Calf Raise", "Agility Drill", "Glute Bridge", "Step-Up", "Hip Adduction"],
  "Gymnastics": ["Pull-Up", "Dip", "Push-Up", "Plank", "Squat", "Lunge", "Wide-Grip Pull-Up", "Chin-Up", "Dragon Flag", "Hanging Leg Raise"],
  "Rock Climbing": ["Pull-Up", "Lat Pulldown", "Calf Raise", "Plank", "Deadlift", "Squat", "Row", "Wide-Grip Pull-Up", "Chin-Up", "Reverse Curl"],
  "Rowing": ["Deadlift", "Row", "Pull-Up", "Squat", "Plank", "Romanian Deadlift", "Glute Bridge", "T-Bar Row"],
  "Skiing": ["Squat", "Lunge", "Wall Sit", "Plank", "Deadlift", "Agility Drill", "Calf Raise", "Pause Squat"],
  "Snowboarding": ["Squat", "Lunge", "Plank", "Deadlift", "Agility Drill", "Calf Raise", "Side Plank", "Hip Abduction"],
  "Surfing": ["Plank", "Push-Up", "Squat", "Lunge", "Glute Bridge", "Bird Dog", "Cuban Press"],
  "Triathlon": ["Squat", "Deadlift", "Pull-Up", "Plank", "Sprint", "Calf Raise", "Lunge", "Romanian Deadlift"],
  "Martial Arts": ["Squat", "Lunge", "Sprint", "Agility Drill", "Plank", "Kettlebell Swing", "Burpee", "Push-Up", "Battle Ropes"],
  "Functional Training": ["Squat", "Deadlift", "Kettlebell Swing", "Turkish Get-Up", "Medicine Ball Throw", "Lunge", "Farmers Walk", "Burpee", "Sled Push", "Sled Pull"],
  "General Fitness": EXERCISES,
  "Pickleball": ["Squat", "Lunge", "Agility Drill", "Sprint", "Medicine Ball Throw", "Plank", "Calf Raise"],
  "Badminton": ["Squat", "Lunge", "Sprint", "Agility Drill", "Calf Raise", "Plank", "Lateral Raise", "Overhead Press"],
  "Rugby": ["Squat", "Deadlift", "Bench Press", "Clean & Jerk", "Sprint", "Box Jump", "Lunge", "Pull-Up", "Prowler Sprint", "Sled Push"],
  "Cricket": ["Squat", "Lunge", "Sprint", "Agility Drill", "Row", "Overhead Press", "Plank"],
  "Lacrosse": ["Sprint", "Lunge", "Squat", "Agility Drill", "Medicine Ball Throw", "Overhead Press", "Plank", "Push-Up"],
  "Fencing": ["Squat", "Lunge", "Agility Drill", "Sprint", "Calf Raise", "Plank", "Hip Adduction", "Pallof Press"],
  "Archery": ["Row", "Face Pull", "Plank", "Deadlift", "Bird Dog", "Lat Pulldown", "Band Pull-Apart"],
  "Powerlifting": ["Squat", "Deadlift", "Bench Press", "Pause Squat", "Sumo Deadlift", "Close-Grip Bench", "Leg Press", "Calf Raise"],
  "Strongman": ["Deadlift", "Squat", "Farmers Walk", "Sled Push", "Sled Pull", "Overhead Press", "Clean & Jerk", "Turkish Get-Up", "Prowler Sprint", "Battle Ropes"],
  "Calisthenics": ["Push-Up", "Pull-Up", "Dip", "Plank", "Squat", "Lunge", "Chin-Up", "Wide-Grip Pull-Up", "Australian Row", "Inverted Row", "Hanging Leg Raise", "Ab Wheel"],
  "Parkour": ["Squat", "Lunge", "Box Jump", "Sprint", "Burpee", "Plank", "Push-Up", "Step-Up", "Agility Drill"],
  "Skating": ["Squat", "Lunge", "Wall Sit", "Glute Bridge", "Side Plank", "Calf Raise", "Hip Adduction", "Hip Abduction"],
  "Kayaking": ["Row", "Lat Pulldown", "Pull-Up", "Plank", "Dead Bug", "Bird Dog", "Cable Row", "Face Pull"],
  "Rafting": ["Row", "Pull-Up", "Deadlift", "Plank", "Shoulder Press", "Lunge"],
  "Hiking": ["Squat", "Lunge", "Step-Up", "Calf Raise", "Deadlift", "Glute Bridge", "Wall Sit", "Seated Calf Raise"],
  "Mountaineering": ["Squat", "Lunge", "Step-Up", "Deadlift", "Calf Raise", "Plank", "Wall Sit", "Donkey Calf Raise"],
  "Sprinting": ["Sprint", "Prowler Sprint", "Squat", "Lunge", "Deadlift", "Calf Raise", "Glute Bridge", "Hip Thrust"],
  "Ultra-running": ["Squat", "Lunge", "Wall Sit", "Glute Bridge", "Calf Raise", "Seated Calf Raise", "Plank", "Dead Bug"],
  "Biathlon": ["Squat", "Deadlift", "Pull-Up", "Plank", "Sprint", "Calf Raise", "Row", "Romanian Deadlift"],
  "Walking": ["Squat", "Lunge", "Glute Bridge", "Calf Raise", "Step-Up", "Wall Sit", "Plank"],
  "Kickboxing": ["Sprint", "Burpee", "Squat", "Lunge", "Push-Up", "Plank", "Agility Drill", "Battle Ropes"],
  "Capoeira": ["Squat", "Lunge", "Plank", "Side Plank", "Push-Up", "Agility Drill", "Bird Dog", "Calf Raise"],
};

import { SPORTS, EXERCISES } from "@/lib/athlete-data";
import type { Sport, Exercise } from "@/lib/athlete-data";

type InputMode = "camera" | "upload";

export function FormIQLab({
  sport: initialSport,
  exercise: initialExercise,
}: {
  sport?: Sport;
  exercise?: Exercise;
}) {
  const [sport, setSport] = useState<Sport>(initialSport ?? "General Fitness");
  const [exercise, setExercise] = useState<Exercise>(initialExercise ?? "Squat");
  const [mode, setMode] = useState<InputMode>("camera");
  const [joints, setJoints] = useState<DetectedJoint[]>([]);
  const [analysis, setAnalysis] = useState<FormAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [detectorReady, setDetectorReady] = useState(false);
  const [showAllLandmarks, setShowAllLandmarks] = useState(false);
  const [showTrail, setShowTrail] = useState(false);
  const [mirrored, setMirrored] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [poseHistory, setPoseHistory] = useState<PoseSnapshot[]>([]);

  const filteredExercises = useMemo(() => {
    return (SPORT_EXERCISES_MAP[sport] ?? EXERCISES) as readonly string[];
  }, [sport]);

  useEffect(() => {
    if (!filteredExercises.includes(exercise)) {
      setExercise(filteredExercises[0] as Exercise);
    }
  }, [sport, filteredExercises, exercise]);

  const exerciseFocus = EXERCISE_TO_LANDMARKS[exercise] ?? {
    landmarks: BODY_LANDMARKS,
    primaryAngle: "hip",
    side: "both" as const,
    label: "Full Body",
  };

  const activeLandmarkSet = new Set(exerciseFocus.landmarks);

  const visibleJoints = joints.filter((j) => {
    const idx = LANDMARK_NAME_TO_INDEX[j.id];
    return idx !== undefined && activeLandmarkSet.has(idx);
  });

  const visibleJointMap = new Map(visibleJoints.map((j) => [j.id, j]));

  interface FilteredBone {
    fromIdx: number;
    toIdx: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }

  const filteredBones: FilteredBone[] = BONES
    .filter(([i, j]) => activeLandmarkSet.has(i) && activeLandmarkSet.has(j))
    .map(([i, j]) => {
      const nameA = LANDMARK_LABELS[i];
      const nameB = LANDMARK_LABELS[j];
      const a = visibleJointMap.get(nameA);
      const b = visibleJointMap.get(nameB);
      if (!a || !b || a.confidence < 0.3 || b.confidence < 0.3) return null;
      return { fromIdx: i, toIdx: j, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
    })
    .filter(Boolean) as FilteredBone[];

  const anglesToShow = useMemo(() => {
    if (!analysis?.angles) return [];
    const primary = analysis.angles.find(
      (a) => a.joint.toLowerCase() === exerciseFocus.primaryAngle.toLowerCase()
    );
    const others = analysis.angles.filter(
      (a) => a.joint.toLowerCase() !== exerciseFocus.primaryAngle.toLowerCase()
    ).slice(0, 2);
    return [primary, ...others].filter(Boolean) as FormAnalysis["angles"];
  }, [analysis, exerciseFocus]);

  const maxZ = useMemo(() => {
    let mz = 0.001;
    for (const j of joints) {
      const az = Math.abs(j.z ?? 0);
      if (az > mz) mz = az;
    }
    return mz;
  }, [joints]);

  const viewBox = useMemo(() => {
    if (!exerciseFocus || exerciseFocus.landmarks.length >= 10 || visibleJoints.length === 0) {
      return "0 0 100 100";
    }
    let minX = 100, minY = 100, maxX = 0, maxY = 0;
    for (const j of visibleJoints) {
      minX = Math.min(minX, j.x);
      minY = Math.min(minY, j.y);
      maxX = Math.max(maxX, j.x);
      maxY = Math.max(maxY, j.y);
    }
    const pad = 15;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const w = (maxX - minX) + 2 * pad;
    const h = (maxY - minY) + 2 * pad;
    const size = Math.max(w, h, 20);
    return `${cx - size / 2} ${cy - size / 2} ${size} ${size}`;
  }, [exerciseFocus, visibleJoints]);

  const badgeAngle = analysis?.angles.find(
    (a) => a.joint.toLowerCase() === exerciseFocus.primaryAngle.toLowerCase()
  ) ?? null;

  const badgePos = useMemo(() => {
    const jMap = new Map(joints.map((j) => [j.id, j]));
    const getMid = (leftIdx: number, rightIdx: number) => {
      const l = jMap.get(LANDMARK_LABELS[leftIdx]);
      const r = jMap.get(LANDMARK_LABELS[rightIdx]);
      if (l && r) return { x: (l.x + r.x) / 2, y: (l.y + r.y) / 2 };
      return l || r || null;
    };
    const angle = exerciseFocus.primaryAngle;
    let pos: { x: number; y: number } | null = null;
    if (angle === "spine") {
      const s = getMid(11, 12);
      const h = getMid(23, 24);
      if (s && h) pos = { x: (s.x + h.x) / 2, y: (s.y + h.y) / 2 };
      else pos = s || h;
    } else if (angle === "elbow") pos = getMid(13, 14);
    else if (angle === "knee") pos = getMid(25, 26);
    else if (angle === "hip") pos = getMid(23, 24);
    else if (angle === "shoulder") pos = getMid(11, 12);
    else if (angle === "ankle") pos = getMid(27, 28);
    else if (angle === "wrist") pos = getMid(15, 16);
    if (exerciseFocus.side === "right" && pos) {
      const r = jMap.get(LANDMARK_LABELS[angle === "elbow" ? 14 : angle === "knee" ? 26 : angle === "hip" ? 24 : angle === "shoulder" ? 12 : angle === "ankle" ? 28 : angle === "wrist" ? 16 : 0]);
      if (r) pos = { x: r.x, y: r.y };
    }
    if (exerciseFocus.side === "left" && pos) {
      const l = jMap.get(LANDMARK_LABELS[angle === "elbow" ? 13 : angle === "knee" ? 25 : angle === "hip" ? 23 : angle === "shoulder" ? 11 : angle === "ankle" ? 27 : angle === "wrist" ? 15 : 0]);
      if (l) pos = { x: l.x, y: l.y };
    }
    return pos ?? { x: 50, y: 50 };
  }, [exerciseFocus, joints]);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const landmarkerRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastDetectRef = useRef(0);
  const lastCueRef = useRef<string>("");
  const lastCueTimeRef = useRef(0);

  const showVideo = mode === "camera" || (mode === "upload" && videoReady);
  const showSkeleton = showVideo;

  const stopDetection = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    animFrameRef.current = 0;
  }, []);

  const estimatePose = useCallback(async () => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;
    if (!video || !landmarker || video.readyState < 2) return;

    try {
      const now = performance.now();
      if (now - lastDetectRef.current < 80) return;
      lastDetectRef.current = now;

      const result = landmarker.detectForVideo(video, now);
      if (!result?.landmarks?.length) return;

      const lm = result.landmarks[0];

      const detected: DetectedJoint[] = ALL_LANDMARKS
        .filter((i) => lm[i] && (lm[i].visibility ?? 1) > 0.4)
        .map((i) => ({
          id: LANDMARK_LABELS[i] || `lm_${i}`,
          name: LANDMARK_LABELS[i] || `LM${i}`,
          x: lm[i].x * 100,
          y: lm[i].y * 100,
          z: lm[i].z ?? 0,
          confidence: lm[i].visibility ?? 0.5,
        }));
      if (detected.length > 0) {
        setJoints(detected);
        const snapshot: PoseSnapshot = {};
        for (const j of detected) snapshot[j.id] = { x: j.x, y: j.y };
        setPoseHistory((prev) => {
          const next = [...prev, snapshot];
          if (next.length > 30) next.splice(0, next.length - 30);
          return next;
        });
      }
    } catch {
    }
  }, []);

  const detectLoop = useCallback(() => {
    estimatePose().then(() => {
      animFrameRef.current = requestAnimationFrame(detectLoop);
    });
  }, [estimatePose]);

  const captureAndAnalyze = useCallback(async () => {
    const video = videoRef.current;
    const canvas = captureRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, 320, 240);
    const base64 = canvas.toDataURL("image/jpeg", 0.6).split(",")[1];
    if (!base64) return;

    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/analyze-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      if (!resp.ok) throw new Error((await resp.json()).error || "Analysis failed");
      const data: FormAnalysis = await resp.json();
      if (data && data.overallScore !== undefined) setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopDetection();
      if (landmarkerRef.current) landmarkerRef.current.close();
    };
  }, [stopDetection]);

  useEffect(() => {
    if (!showVideo || !videoReady) return;
    let cancelled = false;

    (async () => {
      try {
        const { PoseLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
        if (cancelled) return;

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
        );
        if (cancelled) return;

        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numPoses: 1,
        });
        if (cancelled) { landmarker.close(); return; }

        landmarkerRef.current = landmarker;
        setDetectorReady(true);

        captureAndAnalyze();
        intervalRef.current = setInterval(captureAndAnalyze, 3000);
        animFrameRef.current = requestAnimationFrame(detectLoop);
      } catch {
        setError("Pose detector failed to load");
      }
    })();

    return () => {
      cancelled = true;
      stopDetection();
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
      setDetectorReady(false);
    };
  }, [showVideo, videoReady, captureAndAnalyze, detectLoop, stopDetection]);

  useEffect(() => {
    if (mode === "camera") {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 640, height: 480 }, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => setMode("upload"));
    } else {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [mode]);

  useEffect(() => {
    if (!audioEnabled || !analysis?.cues?.length) return;
    const firstCue = analysis.cues[0];
    const now = Date.now();
    if (firstCue === lastCueRef.current && now - lastCueTimeRef.current < 10000) return;
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(firstCue);
    utterance.rate = 0.8;
    utterance.volume = 0.7;
    const voices = window.speechSynthesis.getVoices();
    const calmVoice = voices.find((v) => v.name.includes("Google US English") || v.name.includes("Samantha") || v.name.includes("Female"));
    if (calmVoice) utterance.voice = calmVoice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    lastCueRef.current = firstCue;
    lastCueTimeRef.current = now;
  }, [audioEnabled, analysis]);

  const handleModeChange = (m: InputMode) => {
    stopDetection();
    if (landmarkerRef.current) { landmarkerRef.current.close(); landmarkerRef.current = null; }
    setDetectorReady(false);
    setMode(m);
    setError(null);
    setFileName(null);
    setVideoReady(false);
    setAnalysis(null);
    setJoints([]);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (videoRef.current) {
      videoRef.current.src = "";
      videoRef.current.load();
    }
  };

  const handleFile = (file: File | null) => {
    if (!file || !videoRef.current) return;
    setFileName(file.name);
    setVideoReady(false);
    const url = URL.createObjectURL(file);
    videoRef.current.src = url;
    videoRef.current.load();
  };

  const handleVideoReady = () => {
    setVideoReady(true);
    videoRef.current?.play();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("video/")) handleFile(file);
  };



  const score = analysis?.overallScore ?? null;
  const risk = analysis?.riskLevel ?? null;
  const cues = analysis?.cues ?? [];
  const angles = analysis?.angles ?? [];

  return (
    <div className="space-y-6 relative">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(121,187,195,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(121,187,195,0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(["camera", "upload"] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`relative overflow-hidden rounded px-3 py-1.5 text-xs font-medium font-heading-tech uppercase tracking-wider transition-all ${
                mode === m
                  ? "bg-[var(--teal-accent)] text-[var(--background)] shadow-[0_0_12px_rgba(121,187,195,0.3)]"
                  : "border border-[var(--teal-dark)]/50 text-[var(--teal-muted)] hover:border-[var(--teal-accent)] hover:text-[var(--teal-light)] hover:shadow-[0_0_8px_rgba(121,187,195,0.06)]"
              }`}
            >
              {mode === m ? (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-[sheen_3s_ease-in-out_infinite]" />
              ) : null}
              {m === "camera" ? "Camera" : "Upload"}
            </button>
          ))}
        </div>
        {analysis && (
          <span className="text-[10px] text-[var(--teal-muted)] font-heading-tech tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal-accent)] mr-1.5 animate-pulse align-middle" />
            {visibleJoints.length} active joints
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-[10px] text-[var(--teal-muted)] font-heading-tech uppercase tracking-wider">
            <span className="inline-block w-1 h-1 bg-[var(--teal-accent)] mr-1.5 opacity-60" />
            Sport
          </label>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value as Sport)}
            className="rounded border border-[var(--border)]/50 bg-[var(--card)]/80 px-3 py-1.5 text-xs text-[var(--fg)] backdrop-blur-sm focus:border-[var(--teal-accent)] focus:shadow-[0_0_8px_rgba(121,187,195,0.1)] outline-none transition-all"
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] text-[var(--teal-muted)] font-heading-tech uppercase tracking-wider">
            <span className="inline-block w-1 h-1 bg-[var(--teal-accent)] mr-1.5 opacity-60" />
            Exercise
          </label>
          <select
            value={exercise}
            onChange={(e) => setExercise(e.target.value as Exercise)}
            className="rounded border border-[var(--border)]/50 bg-[var(--card)]/80 px-3 py-1.5 text-xs text-[var(--fg)] backdrop-blur-sm focus:border-[var(--teal-accent)] focus:shadow-[0_0_8px_rgba(121,187,195,0.1)] outline-none transition-all"
          >
            {filteredExercises.map((ex) => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 py-2">
        <button
          onClick={() => setShowAllLandmarks((p) => !p)}
          className={`rounded px-2.5 py-1 text-[10px] font-medium font-heading-tech transition-all uppercase tracking-wider ${
            showAllLandmarks
              ? "bg-[var(--teal-accent)] text-[var(--background)] shadow-[0_0_10px_rgba(121,187,195,0.25)]"
              : "border border-[var(--teal-dark)]/40 text-[var(--teal-muted)] hover:border-[var(--teal-accent)] hover:text-[var(--teal-light)] hover:shadow-[0_0_6px_rgba(121,187,195,0.05)]"
          }`}
        >
          Full Mesh
        </button>
        <button
          onClick={() => setShowTrail((p) => !p)}
          className={`rounded px-2.5 py-1 text-[10px] font-medium font-heading-tech transition-all uppercase tracking-wider ${
            showTrail
              ? "bg-[var(--teal-accent)] text-[var(--background)] shadow-[0_0_10px_rgba(121,187,195,0.25)]"
              : "border border-[var(--teal-dark)]/40 text-[var(--teal-muted)] hover:border-[var(--teal-accent)] hover:text-[var(--teal-light)] hover:shadow-[0_0_6px_rgba(121,187,195,0.05)]"
          }`}
        >
          Trail
        </button>
        {mode === "camera" && (
          <button
            onClick={() => setMirrored((p) => !p)}
            className={`rounded px-2.5 py-1 text-[10px] font-medium font-heading-tech transition-all uppercase tracking-wider ${
              mirrored
                ? "bg-[var(--teal-accent)] text-[var(--background)] shadow-[0_0_10px_rgba(121,187,195,0.25)]"
                : "border border-[var(--teal-dark)]/40 text-[var(--teal-muted)] hover:border-[var(--teal-accent)] hover:text-[var(--teal-light)] hover:shadow-[0_0_6px_rgba(121,187,195,0.05)]"
            }`}
          >
            Mirror
          </button>
        )}
        <button
          onClick={() => setAudioEnabled((p) => !p)}
          className={`rounded px-2.5 py-1 text-[10px] font-medium font-heading-tech transition-all uppercase tracking-wider ${
            audioEnabled
              ? "bg-[var(--teal-accent)] text-[var(--background)] shadow-[0_0_10px_rgba(121,187,195,0.25)]"
              : "border border-[var(--teal-dark)]/40 text-[var(--teal-muted)] hover:border-[var(--teal-accent)] hover:text-[var(--teal-light)] hover:shadow-[0_0_6px_rgba(121,187,195,0.05)]"
          }`}
        >
          Audio {speaking ? "SPEAKING" : ""}
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--teal-dark)]/50 bg-black shadow-[0_0_30px_rgba(121,187,195,0.04),inset_0_0_30px_rgba(121,187,195,0.02)]"
      >
        <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(121,187,195,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(121,187,195,0.5) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden>
          <line x1="20" y1="0" x2="20" y2="20" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
          <line x1="0" y1="20" x2="20" y2="20" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
          <line x1="calc(100% - 20px)" y1="0" x2="calc(100% - 20px)" y2="20" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
          <line x1="100%" y1="20" x2="calc(100% - 20px)" y2="20" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
          <line x1="20" y1="100%" x2="20" y2="calc(100% - 20px)" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
          <line x1="0" y1="calc(100% - 20px)" x2="20" y2="calc(100% - 20px)" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
          <line x1="calc(100% - 20px)" y1="100%" x2="calc(100% - 20px)" y2="calc(100% - 20px)" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
          <line x1="100%" y1="calc(100% - 20px)" x2="calc(100% - 20px)" y2="calc(100% - 20px)" stroke="var(--teal-accent)" strokeWidth="1" opacity="0.4" />
        </svg>
        {mode === "upload" && !videoReady && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 z-30 flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed border-[var(--teal-dark)]/40 text-[var(--teal-muted)] transition-all hover:border-[var(--teal-accent)]/60 hover:text-[var(--teal-light)] hover:bg-[var(--teal-accent)]/[0.02] group"
          >
            <div className="rounded-full border border-[var(--teal-dark)]/30 p-3 transition-colors group-hover:border-[var(--teal-accent)]/40">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs font-heading-tech tracking-wider uppercase mb-1">Drop video or click to browse</p>
              <p className="text-[9px] opacity-50 tracking-wider">MP4 · MOV · WebM — analysis runs every 3s</p>
            </div>
            <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
          </div>
        )}

        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover ${showVideo ? "" : "hidden"}`}
          playsInline
          muted
          autoPlay
          loop
          onLoadedData={handleVideoReady}
          onLoadedMetadata={handleVideoReady}
        />
        <canvas ref={captureRef} className="hidden" />

        {showSkeleton && joints.length > 0 && (
          <>
          <svg className="absolute inset-0 z-10 h-full w-full select-none" viewBox={viewBox}>
            <defs>
              <linearGradient id="boneGradGood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#79BBC3" />
                <stop offset="50%" stopColor="#A1D7D6" />
                <stop offset="100%" stopColor="#79BBC3" />
              </linearGradient>
              <linearGradient id="boneGradWarning" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="boneGradDanger" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <filter id="boneGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--teal-accent)" floodOpacity="0.5" />
              </filter>
              <filter id="boneGlowWarning">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.5" />
              </filter>
              <filter id="boneGlowDanger">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ef4444" floodOpacity="0.5" />
              </filter>
              <filter id="jointGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="var(--teal-accent)" floodOpacity="0.6" />
              </filter>
              <filter id="jointGlowWarning">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.6" />
              </filter>
              <filter id="jointGlowDanger">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ef4444" floodOpacity="0.6" />
              </filter>
              <filter id="hudGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="scanGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="45%" stopColor="rgba(121,187,195,0.06)" />
                <stop offset="50%" stopColor="rgba(121,187,195,0.2)" />
                <stop offset="55%" stopColor="rgba(121,187,195,0.06)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            <g transform={mirrored ? "scale(-1, 1) translate(-100, 0)" : undefined}>
              {showAllLandmarks && POSE_CONNECTIONS.map(([ci, cj], connIdx) => {
                const nameA = LANDMARK_LABELS[ci];
                const nameB = LANDMARK_LABELS[cj];
                const a = joints.find((jt) => jt.id === nameA);
                const b = joints.find((jt) => jt.id === nameB);
                if (!a || !b) return null;
                return (
                  <line
                    key={`mesh-bone-${connIdx}`}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="#79BBC3"
                    strokeWidth={1}
                    opacity={0.25}
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                  />
                );
              })}

              {filteredBones.map((bone, i) => {
                const status = analysis ? getBoneStatus(bone.fromIdx, bone.toIdx, analysis.angles) : null;
                const gradId = status === "warning" ? "boneGradWarning"
                  : status === "poor" || status === "critical" ? "boneGradDanger"
                  : "boneGradGood";
                const glowFilter = status === "warning" ? "url(#boneGlowWarning)"
                  : status === "poor" || status === "critical" ? "url(#boneGlowDanger)"
                  : "url(#boneGlow)";
                const accentColor = status === "warning" ? "#f59e0b"
                  : status === "poor" || status === "critical" ? "#ef4444"
                  : "var(--teal-accent)";
                return (
                  <g key={i} filter={glowFilter}>
                    <line
                      x1={bone.x1} y1={bone.y1} x2={bone.x2} y2={bone.y2}
                      stroke={`url(${gradId})`}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      opacity={0.8}
                    />
                    <line
                      x1={bone.x1} y1={bone.y1} x2={bone.x2} y2={bone.y2}
                      stroke={accentColor}
                      strokeWidth={0.5}
                      strokeLinecap="round"
                      opacity={0.4}
                      className="animate-pulse"
                    />
                    <line
                      x1={bone.x1} y1={bone.y1} x2={bone.x2} y2={bone.y2}
                      stroke={accentColor}
                      strokeWidth={3}
                      strokeLinecap="round"
                      opacity={0.08}
                      filter="url(#hudGlow)"
                    />
                  </g>
                );
              })}

              {showAllLandmarks && joints.map((j) => {
                const jidx = LANDMARK_NAME_TO_INDEX[j.id];
                const isFace = jidx !== undefined && jidx <= 10;
                return (
                  <circle
                    key={`mesh-dot-${j.id}`}
                    cx={j.x} cy={j.y}
                    r={isFace ? 1.5 : 2}
                    fill="#A1D7D6"
                    opacity={isFace ? 0.2 : 0.3}
                  />
                );
              })}

              {showTrail && poseHistory.map((snapshot, frameIdx) => {
                const age = poseHistory.length - 1 - frameIdx;
                const expOpacity = Math.exp(-age * 0.1);
                const expRadius = 5 * Math.exp(-age * 0.03);
                return exerciseFocus.landmarks.map((lmIdx) => {
                  const name = LANDMARK_LABELS[lmIdx];
                  const pos = snapshot[name];
                  if (!pos) return null;
                  return (
                    <>
                    <circle
                      key={`trail-glow-${frameIdx}-${lmIdx}`}
                      cx={pos.x} cy={pos.y}
                      r={Math.max(expRadius * 2.5, 1)}
                      fill="var(--teal-accent)"
                      opacity={expOpacity * 0.15}
                    />
                    <circle
                      key={`trail-${frameIdx}-${lmIdx}`}
                      cx={pos.x} cy={pos.y}
                      r={Math.max(expRadius, 0.5)}
                      fill="var(--teal-accent)"
                      opacity={expOpacity * 0.7}
                    />
                    </>
                  );
                });
              })}

              {joints.map((j) => {
                const idx = LANDMARK_NAME_TO_INDEX[j.id];
                const isActive = idx !== undefined && activeLandmarkSet.has(idx);
                const depthFactor = maxZ > 0 ? 1 + ((j.z ?? 0) / maxZ) : 1;
                const depthRadius = (0.7 + depthFactor * 0.6);
                const depthOpacity = 0.4 + depthFactor * 0.6;
                const adjustedRadius = 3.5 * depthRadius;
                const adjustedOpacity = isActive ? (j.confidence < 0.5 ? 0.4 * depthOpacity : 0.9 * depthOpacity) : 0.1;

                const jointGlowId = isActive ? "url(#jointGlow)" : undefined;
                const bgGlowR = 8 * depthRadius;
                return (
                <g key={j.id} filter={jointGlowId} className="group/joint">
                  {isActive && (
                  <>
                    <circle
                      cx={j.x} cy={j.y}
                      r={bgGlowR}
                      fill="var(--teal-accent)"
                      opacity={0.08 * depthOpacity}
                    />
                    <circle
                      cx={j.x} cy={j.y}
                      r={bgGlowR * 0.6}
                      fill="var(--teal-accent)"
                      opacity={0.12 * depthOpacity}
                      className="animate-pulse"
                    />
                  </>
                  )}
                  <circle
                    cx={j.x} cy={j.y}
                    r={adjustedRadius}
                    fill={isActive ? "var(--teal-accent)" : "#79BBC3"}
                    opacity={adjustedOpacity}
                  />
                  <circle
                    cx={j.x} cy={j.y}
                    r={adjustedRadius * 0.4}
                    fill="#fff"
                    opacity={isActive ? 0.6 : 0.1}
                    style={{ pointerEvents: "none" }}
                  />
                </g>
                );
              })}

              {analysis && anglesToShow.map((angle) => {
                const triples = ANGLE_LANDMARK_TRIPLES[angle.joint.toLowerCase()];
                if (!triples) return null;
                const jMap = new Map(joints.map((j) => [LANDMARK_NAME_TO_INDEX[j.id], j]));
                return triples.map(([outer1, center, outer2], tIdx) => {
                  const cp = jMap.get(center);
                  const p1 = jMap.get(outer1);
                  const p3 = jMap.get(outer2);
                  if (!cp || !p1 || !p3) return null;
                  const r = 8;
                  const d = arcPath(cp.x, cp.y, p1.x, p1.y, p3.x, p3.y, r);
                  if (!d) return null;
                  const color = angle.status === "good" ? "var(--teal-accent)"
                    : angle.status === "warning" ? "#f59e0b"
                    : "#ef4444";
                  return (
                    <g key={`angle-${angle.joint}-${tIdx}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke={color}
                        strokeWidth={4}
                        opacity={0.15}
                        filter="url(#hudGlow)"
                      />
                      <path
                        d={d}
                        fill="none"
                        stroke={color}
                        strokeWidth={1.5}
                        opacity={0.8}
                        strokeDasharray="3 2"
                        className="animate-pulse"
                      />
                      <text
                        x={cp.x + r * 1.3}
                        y={cp.y - r * 0.5}
                        fontSize={4}
                        fill={color}
                        fontFamily="var(--font-heading-tech)"
                        opacity={0.9}
                      >
                        {Math.round(angle.angleDeg)}°
                      </text>
                    </g>
                  );
                });
              })}
            </g>

            <rect x="-40" y="0" width="40" height="100" fill="url(#scanGradient)" opacity="0.6" pointerEvents="none">
              <animate attributeName="x" values="-40;100;-40" dur="4s" repeatCount="indefinite" />
            </rect>

            {analysis && badgeAngle && (
              <g>
                <circle cx={badgePos.x} cy={badgePos.y} r={16} fill="none" stroke="var(--teal-accent)" strokeWidth={0.5} opacity={0.3} strokeDasharray="2 3" />
                <circle cx={badgePos.x} cy={badgePos.y} r={12} fill="none" stroke="var(--teal-accent)" strokeWidth={0.3} opacity={0.15} />
                <line x1={badgePos.x - 18} y1={badgePos.y} x2={badgePos.x - 13} y2={badgePos.y} stroke="var(--teal-accent)" strokeWidth={0.5} opacity={0.4} />
                <line x1={badgePos.x + 13} y1={badgePos.y} x2={badgePos.x + 18} y2={badgePos.y} stroke="var(--teal-accent)" strokeWidth={0.5} opacity={0.4} />
                <line x1={badgePos.x} y1={badgePos.y - 18} x2={badgePos.x} y2={badgePos.y - 13} stroke="var(--teal-accent)" strokeWidth={0.5} opacity={0.4} />
                <line x1={badgePos.x} y1={badgePos.y + 13} x2={badgePos.x} y2={badgePos.y + 18} stroke="var(--teal-accent)" strokeWidth={0.5} opacity={0.4} />
                <rect
                  x={badgePos.x - 32}
                  y={badgePos.y - 22}
                  width={64}
                  height={20}
                  rx={4}
                  fill="rgba(0,0,0,0.75)"
                />
                <text
                  x={badgePos.x}
                  y={badgePos.y - 8}
                  textAnchor="middle"
                  fontSize={5}
                  fontFamily="var(--font-heading-tech)"
                  fill={
                    badgeAngle.status === "good" ? "var(--success)"
                    : badgeAngle.status === "warning" ? "var(--warning)"
                    : "var(--danger)"
                  }
                >
                  {badgeAngle.angleDeg}° {badgeAngle.status}
                </text>
              </g>
            )}
          </svg>
          </>
        )}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-8 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="pointer-events-none absolute bottom-2 left-3 z-30 flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--teal-accent)] animate-pulse" />
          <span className="text-[9px] tracking-[0.15em] text-[var(--teal-muted)] font-heading-tech uppercase">
            {exercise} · {sport}
          </span>
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-3 top-3 z-20 rounded bg-black/80 border border-[var(--teal-accent)]/30 px-3 py-1.5 text-xs text-[var(--teal-accent)] font-heading-tech backdrop-blur-sm shadow-[0_0_12px_rgba(121,187,195,0.15)]"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal-accent)] mr-1.5 animate-pulse align-middle" />
            Analyzing...
          </motion.div>
        )}

        {detectorReady && showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-3 top-3 z-20 rounded bg-black/80 border border-green-400/30 px-2 py-1 text-[9px] text-green-300 font-heading-tech backdrop-blur-sm tracking-wider uppercase shadow-[0_0_10px_rgba(74,222,128,0.1)]"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-green-400 mr-1.5 align-middle animate-pulse" />
            Tracking
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[var(--danger)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.05 }}
        className="grid gap-3 lg:grid-cols-3"
      >
        <BentoCard variant="elevated">
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] mb-1 font-heading-tech flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 bg-[var(--teal-accent)] opacity-60" />
              Form Score
            </p>
            <p className="text-2xl font-light text-[var(--teal-light)] font-ui-mono">
              {score !== null ? (
                <>
                  <span className="text-[var(--teal-accent)]">{score}</span>
                  <span className="text-xs text-[var(--teal-muted)] font-heading-tech">/100</span>
                </>
              ) : "\u2014"}
            </p>
            {score !== null && (
              <div className="mt-2 h-[2px] w-full rounded-full bg-[var(--teal-dark)]/30 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${score}%`,
                    background: score > 70
                      ? "linear-gradient(90deg, var(--teal-accent), var(--teal-light))"
                      : score > 40
                        ? "linear-gradient(90deg, var(--warning), #fbbf24)"
                        : "linear-gradient(90deg, var(--danger), #f87171)",
                    boxShadow: "0 0 8px rgba(121,187,195,0.3)",
                  }}
                />
              </div>
            )}
          </div>
        </BentoCard>
        <BentoCard variant="compact">
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] mb-1 font-heading-tech flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 bg-[var(--teal-accent)] opacity-60" />
              Risk Level
            </p>
            <div className="flex items-center gap-2">
              {risk && (
                <span className="inline-block w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor: risk === "critical" || risk === "high" ? "var(--danger)"
                      : risk === "moderate" ? "var(--warning)"
                      : "var(--success)",
                    boxShadow: risk === "critical" || risk === "high" ? "0 0 6px var(--danger)"
                      : risk === "moderate" ? "0 0 6px var(--warning)"
                      : "0 0 6px var(--success)",
                  }}
                />
              )}
              <p
                className={`text-2xl font-light capitalize font-ui-mono ${
                  risk === "critical" || risk === "high"
                    ? "text-[var(--danger)]"
                    : risk === "moderate"
                      ? "text-[var(--warning)]"
                      : "text-[var(--success)]"
                }`}
              >
                {risk ?? "\u2014"}
              </p>
            </div>
          </div>
        </BentoCard>
        <BentoCard variant="compact">
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] mb-1 font-heading-tech flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 bg-[var(--teal-accent)] opacity-60" />
              Joints Tracked
            </p>
            <p className="text-2xl font-light text-[var(--teal-light)] font-ui-mono">
              {visibleJoints.length > 0 ? (
                <><span className="text-[var(--teal-accent)]">{visibleJoints.length}</span><span className="text-sm text-[var(--teal-muted)] font-heading-tech">/{joints.length}</span></>
              ) : "\u2014"}
            </p>
          </div>
        </BentoCard>
      </motion.div>

      <FormRiskAlert analysis={analysis} exerciseName={exercise} />

      {cues.length > 0 && (
        <BentoCard variant="flat" hoverEffect="none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4"
          >
            <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] mb-3 font-heading-tech flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 bg-[var(--teal-accent)] opacity-60" />
              Coaching Cues
            </p>
            <ul className="space-y-1.5">
              {cues.map((cue, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-[var(--teal-light)]"
                >
                  <span className="mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 rounded-full border border-[var(--teal-accent)]/30 text-[9px] text-[var(--teal-accent)] font-ui-mono">
                    {i + 1}
                  </span>
                  {cue}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </BentoCard>
      )}

      <CoachAdvice context="form-analysis" placeholder="Ask your coach about this form analysis..." />
    </div>
  );
}
