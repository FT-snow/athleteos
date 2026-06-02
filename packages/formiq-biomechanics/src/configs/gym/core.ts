import { ExerciseBiomechanics } from "../../types";

// ────────────────────────────────────────────────────────────
// 1. PLANK
// ────────────────────────────────────────────────────────────
export const plank: ExerciseBiomechanics = {
  id: "plank",
  name: "Plank",
  aliases: ["Front Plank", "Forearm Plank", "Core Hold"],
  category: "core",
  description: "Isometric core exercise maintaining a straight line from head to heels on the forearms. Builds deep core endurance.",
  tags: ["core", "abs", "isometric", "endurance", "bodyweight", "stability"],
  landmarks: ["leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftEar", "rightEar", "nose"],
  checkpoints: [
    {
      id: "plank-spine-alignment", name: "Spine Alignment",
      description: "The body should form a straight line from the head to the heels. Any sagging or piking indicates a breakdown in core engagement.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [160, 170], criticalRange: [0, 160],
      side: "both", phase: "Hold", weight: 10,
      cueGood: "Straight line from head to heels", cueWarning: "Hips sagging or piking — engage core and squeeze glutes", cueCritical: "Significant spinal deviation — reset and brace",
    },
    {
      id: "plank-hip-height", name: "Hip Height",
      description: "The hips should be in line with the shoulders and ankles. Hips that are too high (piking) or too low (sagging) reduce effectiveness.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Hold", weight: 9,
      cueGood: "Hip height correct — neutral spine", cueWarning: "Hips too low — engage glutes and lift slightly", cueCritical: "Hips sagging significantly — lower to knees or reduce duration",
    },
    {
      id: "plank-shoulder-position", name: "Shoulder Position",
      description: "Shoulders should be directly over the elbows (forearm plank) or wrists (straight-arm plank). The angle at the shoulder should be ~90°.",
      angle: { joint: "leftShoulder", p1: "leftElbow", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [80, 100], warningRange: [65, 80], criticalRange: [0, 65],
      side: "both", phase: "Setup", weight: 7,
      cueGood: "Shoulders directly over elbows", cueWarning: "Shoulders too far forward or back — adjust forearm position", cueCritical: "Shoulder position incorrect — reset plank setup",
    },
    {
      id: "plank-pelvis-position", name: "Pelvis Position",
      description: "The pelvis should be in a neutral position (not tilted anteriorly or posteriorly). Anterior tilt indicates excessive lumbar arching.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [160, 170], criticalRange: [0, 160],
      side: "both", phase: "Hold", weight: 8,
      cueGood: "Pelvis neutral", cueWarning: "Anterior tilt detected — tuck the tailbone slightly", cueCritical: "Excessive pelvic tilt — reset neutral spine position",
    },
    {
      id: "plank-core-engagement", name: "Core Engagement",
      description: "Visual indicator of core engagement via trunk stiffness. The spine should not move or wobble during the hold.",
      angle: { joint: "leftShoulder", p1: "nose", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [160, 180], warningRange: [145, 160], criticalRange: [0, 145],
      side: "both", phase: "Hold", weight: 8,
      cueGood: "Core engaged — navel to spine", cueWarning: "Core bracing fading — pull the navel toward the spine", cueCritical: "Core disengaged — reset and re-brace",
    },
    {
      id: "plank-duration", name: "Duration Endurance",
      description: "Time under tension in the plank position. Form should be maintained for the target duration without degradation.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [160, 170], criticalRange: [0, 160],
      side: "both", phase: "Hold", weight: 6,
      cueGood: "Endurance maintained throughout", cueWarning: "Form deteriorating — either refocus or take a brief rest", cueCritical: "Form broken — stop and rest before next set",
    },
  ],
  phases: [
    { name: "Setup", description: "Position forearms on the ground, elbows under shoulders, legs extended behind." },
    { name: "Hold", description: "Lift the body onto the forearms and toes. Maintain a straight line from head to heels." },
    { name: "Release", description: "Lower the body to the ground in a controlled manner." },
  ],
};

// ────────────────────────────────────────────────────────────
// 2. REVERSE PLANK
// ────────────────────────────────────────────────────────────
export const reversePlank: ExerciseBiomechanics = {
  id: "reverse-plank",
  name: "Reverse Plank",
  aliases: ["Reverse Plank", "Back Plank", "Tabletop"],
  category: "core",
  description: "Isometric core exercise holding the body in a straight line facing upward, supported on the hands and heels.",
  tags: ["core", "abs", "lower-back", "isometric", "bodyweight", "posterior-chain"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftHeel", "rightHeel", "leftEar", "rightEar"],
  checkpoints: [
    {
      id: "revplank-spine-alignment", name: "Spine Alignment",
      description: "The body should form a straight line from the head to the heels while facing upward. The hips must be lifted to hip height.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Hold", weight: 10,
      cueGood: "Straight line from head to heels", cueWarning: "Hips dropping — lift through the glutes", cueCritical: "Hips sagging significantly — lower to the ground and reset",
    },
    {
      id: "revplank-hip-height", name: "Hip Height",
      description: "Hips should be lifted to maintain a straight line. Drooping or sagging hips indicate weakness in the glutes and core.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Hold", weight: 9,
      cueGood: "Hips at correct height", cueWarning: "Hips dropping — squeeze glutes and lift", cueCritical: "Hips too low — reset and push through the heels",
    },
    {
      id: "revplank-shoulder-position", name: "Shoulder Position",
      description: "Hands should be directly under the shoulders with arms fully extended. The angle at the shoulder between arm and torso should be ~90°.",
      angle: { joint: "leftShoulder", p1: "leftWrist", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [80, 100], warningRange: [65, 80], criticalRange: [0, 65],
      side: "both", phase: "Setup", weight: 7,
      cueGood: "Hands directly under shoulders", cueWarning: "Shoulders shifting — adjust hand position", cueCritical: "Shoulder position compromised — reset with hands under shoulders",
    },
    {
      id: "revplank-core-engagement", name: "Core Engagement",
      description: "Core and glutes should be actively engaged to maintain spinal alignment. The trunk should not sag or wobble.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Hold", weight: 8,
      cueGood: "Core and glutes engaged", cueWarning: "Core engagement fading — brace and squeeze glutes", cueCritical: "Core disengaged — lower and reset",
    },
    {
      id: "revplank-neck-position", name: "Neck Neutral",
      description: "The neck should remain neutral with the gaze toward the ceiling. Dropping the chin or craning the neck forward compromises cervical alignment.",
      angle: { joint: "leftShoulder", p1: "leftEar", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [160, 180], warningRange: [145, 160], criticalRange: [0, 145],
      side: "both", phase: "Hold", weight: 5,
      cueGood: "Neck neutral", cueWarning: "Chin dropping — gaze up toward the ceiling", cueCritical: "Neck compromised — keep head aligned with the spine",
    },
  ],
  phases: [
    { name: "Setup", description: "Sit with legs extended, hands behind the hips with fingers pointing forward." },
    { name: "Hold", description: "Lift the hips toward the ceiling until the body forms a straight line from head to heels." },
    { name: "Release", description: "Lower the hips to the ground in a controlled manner." },
  ],
};

// ────────────────────────────────────────────────────────────
// 3. LEG RAISES
// ────────────────────────────────────────────────────────────
export const legRaises: ExerciseBiomechanics = {
  id: "leg-raises",
  name: "Leg Raises",
  aliases: ["Lying Leg Raises", "Hanging Leg Raises", "Straight Leg Raises"],
  category: "core",
  description: "Lying or hanging leg raise targeting the lower abdominals and hip flexors. Requires controlled movement and spinal stability.",
  tags: ["core", "abs", "lower-abs", "hip-flexors", "bodyweight"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftFootIndex", "rightFootIndex"],
  checkpoints: [
    {
      id: "legraises-hip-angle-peak-l", name: "Hip Angle at Peak (Left)",
      description: "Hip angle when the legs reach the top of the movement. Target: ~90° for a full range of motion.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [70, 100], warningRange: [100, 120], criticalRange: [120, 180],
      side: "left", phase: "Peak", weight: 9,
      cueGood: "Full hip flexion at peak", cueWarning: "Not raising high enough — lift the legs further", cueCritical: "Very limited raise — engage the lower abs to lift",
    },
    {
      id: "legraises-hip-angle-peak-r", name: "Hip Angle at Peak (Right)",
      description: "Hip angle at the peak for the right leg.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [70, 100], warningRange: [100, 120], criticalRange: [120, 180],
      side: "right", phase: "Peak", weight: 9,
      cueGood: "Full hip flexion at peak", cueWarning: "Not raising high enough — lift the legs further", cueCritical: "Very limited raise — engage the lower abs to lift",
    },
    {
      id: "legraises-spine-contact", name: "Lower Back Contact",
      description: "The lower back should remain in contact with the ground throughout. Arching indicates insufficient core engagement and hip flexor dominance.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [150, 170], criticalRange: [0, 150],
      side: "both", phase: "Raise", weight: 10,
      cueGood: "Lower back flat on the ground", cueWarning: "Lower back beginning to arch — press it into the ground", cueCritical: "Significant lower back arching — reduce range and engage core",
    },
    {
      id: "legraises-knee-angle-l", name: "Knee Angle (Left)",
      description: "The legs should remain as straight as possible throughout the movement. Bent knees reduce lever arm and lower abdominal demand.",
      angle: { joint: "leftKnee", p1: "leftHip", p2: "leftKnee", p3: "leftAnkle" },
      goodRange: [165, 180], warningRange: [145, 165], criticalRange: [0, 145],
      side: "left", phase: "Raise", weight: 7,
      cueGood: "Legs straight — good form", cueWarning: "Knees bending — straighten the legs", cueCritical: "Knees too bent — extend fully",
    },
    {
      id: "legraises-knee-angle-r", name: "Knee Angle (Right)",
      description: "Knee angle of the right leg during leg raises.",
      angle: { joint: "rightKnee", p1: "rightHip", p2: "rightKnee", p3: "rightAnkle" },
      goodRange: [165, 180], warningRange: [145, 165], criticalRange: [0, 145],
      side: "right", phase: "Raise", weight: 7,
      cueGood: "Legs straight — good form", cueWarning: "Knees bending — straighten the legs", cueCritical: "Knees too bent — extend fully",
    },
    {
      id: "legraises-ankle-position", name: "Ankle Position",
      description: "The ankles should remain neutral (dorsiflexed). Pointing the toes reduces lower abdominal engagement and can cause cramping.",
      angle: { joint: "leftAnkle", p1: "leftKnee", p2: "leftAnkle", p3: "leftFootIndex" },
      goodRange: [75, 100], warningRange: [60, 75], criticalRange: [0, 60],
      side: "both", phase: "Raise", weight: 4,
      cueGood: "Ankles neutral", cueWarning: "Pointing toes — dorsiflex the feet", cueCritical: "Severe plantarflexion — pull toes toward shins",
    },
    {
      id: "legraises-shoulder-position", name: "Shoulder Position",
      description: "Arms should be placed at the sides or under the hips for stability. The shoulders should remain flat and stable throughout.",
      angle: { joint: "leftShoulder", p1: "leftElbow", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [60, 100], warningRange: [40, 60], criticalRange: [0, 40],
      side: "both", phase: "Setup", weight: 4,
      cueGood: "Shoulders stable", cueWarning: "Shoulders tensing — relax and use the core", cueCritical: "Shoulder instability — reset arm position",
    },
    {
      id: "legraises-controlled-descent", name: "Controlled Descent",
      description: "The legs should lower slowly under control. Dropping the legs uses momentum and reduces the eccentric load on the core.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [150, 170], criticalRange: [0, 150],
      side: "both", phase: "Lower", weight: 7,
      cueGood: "Controlled descent — good eccentric control", cueWarning: "Legs dropping too fast — slow down the descent", cueCritical: "Uncontrolled drop — lower with control",
    },
  ],
  phases: [
    { name: "Setup", description: "Lie on the back with legs extended and arms at the sides or under the hips." },
    { name: "Raise", description: "Lift both legs toward the ceiling by flexing at the hips while keeping the lower back pressed into the ground." },
    { name: "Peak", description: "Maximum hip flexion with legs as straight as possible. Pause briefly at the top." },
    { name: "Lower", description: "Slowly lower the legs back toward the ground, maintaining lower back contact throughout." },
  ],
};

// ────────────────────────────────────────────────────────────
// 4. RUSSIAN TWISTS
// ────────────────────────────────────────────────────────────
export const russianTwists: ExerciseBiomechanics = {
  id: "russian-twists",
  name: "Russian Twists",
  aliases: ["Russian Twist", "Rotational Crunch", "Oblique Twist"],
  category: "core",
  description: "Rotational core exercise targeting the obliques. Performed seated with the torso leaning back and rotating side to side.",
  tags: ["core", "obliques", "rotational", "bodyweight", "abs"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftEar", "rightEar"],
  checkpoints: [
    {
      id: "rt-trunk-rotation-l", name: "Trunk Rotation Angle (Left Twist)",
      description: "The torso should rotate approximately 45-60° to each side. Rotation should come from the thoracic spine, not just the arms.",
      angle: { joint: "leftShoulder", p1: "rightShoulder", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [35, 60], warningRange: [20, 35], criticalRange: [0, 20],
      side: "both", phase: "Peak", weight: 9,
      cueGood: "Full rotation through the torso", cueWarning: "Limited rotation — twist through the ribcage, not just the arms", cueCritical: "Very little rotation — engage the obliques to drive the twist",
    },
    {
      id: "rt-trunk-rotation-r", name: "Trunk Rotation Angle (Right Twist)",
      description: "Trunk rotation to the right side.",
      angle: { joint: "rightShoulder", p1: "leftShoulder", p2: "rightShoulder", p3: "rightHip" },
      goodRange: [35, 60], warningRange: [20, 35], criticalRange: [0, 20],
      side: "both", phase: "Peak", weight: 9,
      cueGood: "Full rotation through the torso", cueWarning: "Limited rotation — twist through the ribcage", cueCritical: "Very little rotation — engage obliques",
    },
    {
      id: "rt-hip-angle", name: "Hip Angle (Seated Lean)",
      description: "The hips should be bent at approximately 90° with the torso leaning back to engage the core. Too upright reduces abdominal activation.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [100, 130], warningRange: [130, 150], criticalRange: [150, 180],
      side: "both", phase: "Setup", weight: 7,
      cueGood: "Good hip angle with core engaged", cueWarning: "Too upright — lean back slightly more", cueCritical: "Sitting too upright — recline to increase core load",
    },
    {
      id: "rt-feet-position", name: "Feet Position",
      description: "For the advanced version, feet should be lifted off the ground. For the beginner version, feet may be grounded.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [90, 130], warningRange: [70, 90], criticalRange: [0, 70],
      side: "both", phase: "Setup", weight: 5,
      cueGood: "Feet position appropriate for level", cueWarning: "Feet touching down — lift them for more challenge", cueCritical: "Feet dragging — maintain lift throughout",
    },
    {
      id: "rt-spine-neutrality", name: "Spine Neutrality",
      description: "The spine should remain neutral throughout the twist, with the back straight and not rounded. Rounding reduces oblique engagement and risks disc injury.",
      angle: { joint: "leftShoulder", p1: "leftEar", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [155, 180], warningRange: [135, 155], criticalRange: [0, 135],
      side: "both", phase: "Twist", weight: 8,
      cueGood: "Spine neutral — back straight", cueWarning: "Spine beginning to round — keep the chest open", cueCritical: "Back severely rounded — sit taller through the spine",
    },
    {
      id: "rt-shoulder-rotation", name: "Shoulder Rotation with Torso",
      description: "The shoulders should rotate with the torso as a unit. Rotating only the arms while keeping the shoulders square reduces oblique activation.",
      angle: { joint: "leftShoulder", p1: "rightShoulder", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [35, 60], warningRange: [20, 35], criticalRange: [0, 20],
      side: "both", phase: "Twist", weight: 6,
      cueGood: "Shoulders rotating with the torso", cueWarning: "Shoulders not rotating — drive the twist through the ribcage", cueCritical: "Arms-only movement — rotate the whole upper body",
    },
  ],
  phases: [
    { name: "Setup", description: "Sit with knees bent, feet flat or lifted. Lean back to engage the core." },
    { name: "Twist", description: "Rotate the torso to one side, bringing the hands or weight toward the floor beside the hip." },
    { name: "Peak", description: "Maximum rotation with a brief isometric squeeze of the obliques." },
    { name: "Return", description: "Rotate back through center to the opposite side in a controlled motion." },
  ],
};

// ────────────────────────────────────────────────────────────
// 5. REVERSE PLANK MARCHES
// ────────────────────────────────────────────────────────────
export const reversePlankMarches: ExerciseBiomechanics = {
  id: "reverse-plank-marches",
  name: "Reverse Plank Marches",
  aliases: ["Reverse Plank Leg Lifts", "Reverse Plank Alternating Legs"],
  category: "core",
  description: "Reverse plank with alternating leg lifts. Combines core stability with unilateral hip extension work.",
  tags: ["core", "abs", "glutes", "stability", "bodyweight", "lower-back"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftHeel", "rightHeel", "leftEar", "rightEar"],
  checkpoints: [
    {
      id: "rpm-spine-alignment", name: "Spine Alignment",
      description: "The body should maintain a straight line in the reverse plank position throughout the leg march.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Hold", weight: 10,
      cueGood: "Straight line maintained", cueWarning: "Hips dropping as leg lifts — engage glutes", cueCritical: "Hip position collapsing — lower legs and reset",
    },
    {
      id: "rpm-hip-stability-lift-l", name: "Hip Stability During Leg Lift (Left)",
      description: "When lifting the left leg, the right (supporting) hip must remain stable and elevated. Dropping indicates insufficient unilateral stability.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "right", phase: "March", weight: 9,
      cueGood: "Support hip stable during lift", cueWarning: "Support hip dropping — engage the stance-side glute", cueCritical: "Significant hip drop — lower the leg and re-stabilize",
    },
    {
      id: "rpm-hip-stability-lift-r", name: "Hip Stability During Leg Lift (Right)",
      description: "Hip stability of the left support side when lifting the right leg.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "left", phase: "March", weight: 9,
      cueGood: "Support hip stable during lift", cueWarning: "Support hip dropping — engage the stance-side glute", cueCritical: "Significant hip drop — lower the leg and re-stabilize",
    },
    {
      id: "rpm-spine-neutrality-lift", name: "Spine Neutrality During Lift",
      description: "The spine should remain neutral throughout the leg lift. Arching or twisting indicates compensation.",
      angle: { joint: "leftShoulder", p1: "leftEar", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [155, 180], warningRange: [135, 155], criticalRange: [0, 135],
      side: "both", phase: "March", weight: 8,
      cueGood: "Spine neutral during march", cueWarning: "Spine beginning to arch — brace the core", cueCritical: "Spine position compromised — lower leg and reset",
    },
    {
      id: "rpm-knee-angle-lift-l", name: "Lifted Leg Knee Angle (Left)",
      description: "The lifted leg should remain straight (or slightly bent for modification). A bent knee reduces the lever arm and challenge.",
      angle: { joint: "leftKnee", p1: "leftHip", p2: "leftKnee", p3: "leftAnkle" },
      goodRange: [160, 180], warningRange: [140, 160], criticalRange: [0, 140],
      side: "left", phase: "March", weight: 5,
      cueGood: "Lifted leg straight", cueWarning: "Knee bending — straighten the leg", cueCritical: "Leg too bent — extend through the knee",
    },
    {
      id: "rpm-knee-angle-lift-r", name: "Lifted Leg Knee Angle (Right)",
      description: "Knee angle of the right lifted leg.",
      angle: { joint: "rightKnee", p1: "rightHip", p2: "rightKnee", p3: "rightAnkle" },
      goodRange: [160, 180], warningRange: [140, 160], criticalRange: [0, 140],
      side: "right", phase: "March", weight: 5,
      cueGood: "Lifted leg straight", cueWarning: "Knee bending — straighten the leg", cueCritical: "Leg too bent — extend through the knee",
    },
  ],
  phases: [
    { name: "Setup", description: "Reverse plank position with hands under shoulders, body in a straight line." },
    { name: "March", description: "Lift one leg a few inches off the ground while keeping the hips elevated and stable." },
    { name: "Hold", description: "Briefly hold the lifted leg position with the body aligned." },
    { name: "Return", description: "Lower the leg back to the starting position and repeat with the opposite side." },
  ],
};

// ────────────────────────────────────────────────────────────
// 6. JACKKNIFE
// ────────────────────────────────────────────────────────────
export const jackknife: ExerciseBiomechanics = {
  id: "jackknife",
  name: "Jackknife",
  aliases: ["V-Up", "Jackknife Sit-Up", "Pike Crunch"],
  category: "core",
  description: "Compound core movement that simultaneously folds the body at the hips, bringing the hands toward the feet in a V-shaped position.",
  tags: ["core", "abs", "hip-flexors", "compound", "bodyweight"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftEar", "rightEar"],
  checkpoints: [
    {
      id: "jackknife-hip-angle-peak-l", name: "Hip Angle at Peak (Left)",
      description: "Hip angle at the folded position. The body should form a V-shape with the hips at approximately 45° of flexion.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [35, 65], warningRange: [65, 90], criticalRange: [90, 180],
      side: "both", phase: "Peak", weight: 9,
      cueGood: "Good V-fold at the hips", cueWarning: "Not folding enough — lift the legs and torso higher", cueCritical: "Very little fold — engage the core to lift both ends",
    },
    {
      id: "jackknife-knee-angle", name: "Knee Angle",
      description: "The knees should remain as straight as possible during the jackknife. Bending the knees reduces the challenge to the hip flexors and core.",
      angle: { joint: "leftKnee", p1: "leftHip", p2: "leftKnee", p3: "leftAnkle" },
      goodRange: [160, 180], warningRange: [140, 160], criticalRange: [0, 140],
      side: "both", phase: "Fold", weight: 7,
      cueGood: "Legs straight throughout", cueWarning: "Knees bending — straighten the legs", cueCritical: "Legs too bent — extend the knees",
    },
    {
      id: "jackknife-lower-back-contact", name: "Lower Back Contact",
      description: "For the first half of the movement, the lower back should remain in contact with the ground. Early loss of contact indicates momentum over control.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [150, 170], criticalRange: [0, 150],
      side: "both", phase: "Fold", weight: 8,
      cueGood: "Lower back controlled during fold", cueWarning: "Lower back losing contact — slow down and control", cueCritical: "Lower back off the ground — use less momentum",
    },
    {
      id: "jackknife-shoulder-position", name: "Shoulder Position",
      description: "Arms should reach toward the feet or be placed behind the head for advanced variations. Shoulders should lift off the ground with the torso.",
      angle: { joint: "leftShoulder", p1: "leftElbow", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [30, 70], warningRange: [20, 30], criticalRange: [0, 20],
      side: "both", phase: "Peak", weight: 5,
      cueGood: "Shoulders in good reach position", cueWarning: "Shoulders not lifting enough — reach toward the feet", cueCritical: "Shoulders flat — lift the upper back off the ground",
    },
    {
      id: "jackknife-spine-curvature", name: "Spine Curvature",
      description: "The lower back should remain in contact and the spine should curl sequentially. Flattening or arching indicates poor form.",
      angle: { joint: "leftShoulder", p1: "leftEar", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [140, 170], warningRange: [120, 140], criticalRange: [0, 120],
      side: "both", phase: "Peak", weight: 6,
      cueGood: "Good spinal curvature", cueWarning: "Spine too flat — curl through the upper back", cueCritical: "Spine arched — maintain neutral through the movement",
    },
  ],
  phases: [
    { name: "Setup", description: "Lie on the back with arms extended overhead and legs straight on the ground." },
    { name: "Fold", description: "Simultaneously lift the legs and torso, folding at the hips to bring the hands toward the feet." },
    { name: "Peak", description: "Maximum fold with the body forming a V-shape. Hips at ~45°." },
    { name: "Return", description: "Slowly lower the legs and torso back to the starting position under control." },
  ],
};

// ────────────────────────────────────────────────────────────
// 7. LEG HIP LIFT (Reverse Crunch Variation)
// ────────────────────────────────────────────────────────────
export const legHipLift: ExerciseBiomechanics = {
  id: "leg-hip-lift",
  name: "Leg Hip Lift",
  aliases: ["Reverse Crunch", "Hip Lift", "Pelvic Tilt Crunch", "Reverse Curl"],
  category: "core",
  description: "Reverse crunch variation where the legs lift and the hips roll off the ground, targeting the lower abdominals through posterior pelvic tilt.",
  tags: ["core", "abs", "lower-abs", "reverse-crunch", "bodyweight"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"],
  checkpoints: [
    {
      id: "leghip-hip-angle-peak", name: "Hip Angle at Peak",
      description: "Hip angle when the legs are lifted and the hips are elevated off the ground. The hips should curl toward the ribcage.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [100, 135], warningRange: [135, 160], criticalRange: [160, 180],
      side: "both", phase: "Peak", weight: 9,
      cueGood: "Hips lifted — lower abs engaged", cueWarning: "Not lifting enough — curl the hips off the ground", cueCritical: "Hips not lifting — focus on posterior pelvic tilt",
    },
    {
      id: "leghip-shoulder-position", name: "Shoulder Position",
      description: "Arms should remain flat on the ground at the sides for stability. Pushing with the arms indicates compensatory movement.",
      angle: { joint: "leftShoulder", p1: "leftElbow", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [60, 100], warningRange: [40, 60], criticalRange: [0, 40],
      side: "both", phase: "Lift", weight: 5,
      cueGood: "Arms stable and relaxed", cueWarning: "Arms pressing down — use the core, not the hands", cueCritical: "Arms pushing significantly — reset arm position",
    },
    {
      id: "leghip-spine-control", name: "Spine Control",
      description: "The spine should remain neutral (flat on the ground) throughout the setup. Avoid arching the lower back during the leg lift.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Setup", weight: 8,
      cueGood: "Spine flat and controlled", cueWarning: "Lower back arching — press it into the ground", cueCritical: "Significant arching — reduce range and brace",
    },
    {
      id: "leghip-lower-back-contact", name: "Lower Back Contact at Start",
      description: "The lower back should be in full contact with the ground at the start of the movement. Loss of contact indicates poor core bracing.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Setup", weight: 7,
      cueGood: "Lower back grounded", cueWarning: "Lower back losing contact — tilt the pelvis posteriorly", cueCritical: "Back arched — reset and flatten the spine",
    },
  ],
  phases: [
    { name: "Setup", description: "Lie on the back with legs elevated at 90° (tabletop position), arms at the sides." },
    { name: "Lift", description: "Lift the hips off the ground by curling the pelvis posteriorly, driving the knees toward the chest." },
    { name: "Peak", description: "Maximum hip elevation with the lower back pressed into the ground. Squeeze the lower abs." },
    { name: "Lower", description: "Slowly lower the hips back to the starting position under control." },
  ],
};

// ────────────────────────────────────────────────────────────
// 8. GLUTE MARCH (Marching while Bridging)
// ────────────────────────────────────────────────────────────
export const gluteMarch: ExerciseBiomechanics = {
  id: "glute-march",
  name: "Glute March",
  aliases: ["Marching Bridge", "Single Leg Bridge", "Unilateral Bridge March"],
  category: "core",
  description: "Glute bridge with alternating leg lifts. Challenges core stability, glute strength, and pelvic control under unilateral load.",
  tags: ["core", "glutes", "abs", "stability", "bridge", "unilateral"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftHeel", "rightHeel"],
  checkpoints: [
    {
      id: "glmar-hip-angle-bridge", name: "Hip Angle at Bridge",
      description: "Hip angle in the bridge position at the start of the march. The hips should be fully extended to ~180°.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "both", phase: "Bridge", weight: 9,
      cueGood: "Full hip extension in bridge", cueWarning: "Hips not lifted enough — drive them higher", cueCritical: "Hips sagging — squeeze glutes to lift",
    },
    {
      id: "glmar-knee-angle-bridge", name: "Knee Angle at Bridge",
      description: "Knee angle in the bridge position. The knees should be at approximately 90° with feet flat on the ground.",
      angle: { joint: "leftKnee", p1: "leftHip", p2: "leftKnee", p3: "leftAnkle" },
      goodRange: [75, 100], warningRange: [60, 75], criticalRange: [0, 60],
      side: "both", phase: "Setup", weight: 6,
      cueGood: "Knees at 90° in bridge", cueWarning: "Knee angle off — adjust foot distance from glutes", cueCritical: "Foot position wrong — reset and place feet close to glutes",
    },
    {
      id: "glmar-pelvis-stability-lift-l", name: "Pelvis Stability During Lift (Left)",
      description: "When lifting the left leg, the right (supporting) side must maintain pelvic height and stability without dropping.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "right", phase: "March", weight: 9,
      cueGood: "Pelvis stable during leg lift", cueWarning: "Pelvis dropping on support side — engage the stance glute", cueCritical: "Significant pelvic drop — lower leg and re-stabilize",
    },
    {
      id: "glmar-pelvis-stability-lift-r", name: "Pelvis Stability During Lift (Right)",
      description: "Pelvis stability when lifting the right leg.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [155, 170], criticalRange: [0, 155],
      side: "left", phase: "March", weight: 9,
      cueGood: "Pelvis stable during leg lift", cueWarning: "Pelvis dropping on support side — engage the stance glute", cueCritical: "Significant pelvic drop — lower leg and re-stabilize",
    },
    {
      id: "glmar-hip-drop-lift-l", name: "Hip Drop of Supporting Leg (Left Lift)",
      description: "The supporting hip should not drop when the opposite leg is lifted. Hip drop indicates weak glute medius on the stance side.",
      angle: { joint: "rightHip", p1: "leftHip", p2: "rightHip", p3: "rightKnee" },
      goodRange: [85, 100], warningRange: [70, 85], criticalRange: [0, 70],
      side: "right", phase: "March", weight: 8,
      cueGood: "No hip drop — glute medius engaged", cueWarning: "Supporting hip dropping — squeeze the stance-side glute med", cueCritical: "Significant hip drop — reduce range and focus on stability",
    },
    {
      id: "glmar-hip-drop-lift-r", name: "Hip Drop of Supporting Leg (Right Lift)",
      description: "Hip drop of the supporting leg when the right leg lifts.",
      angle: { joint: "leftHip", p1: "rightHip", p2: "leftHip", p3: "leftKnee" },
      goodRange: [85, 100], warningRange: [70, 85], criticalRange: [0, 70],
      side: "left", phase: "March", weight: 8,
      cueGood: "No hip drop — glute medius engaged", cueWarning: "Supporting hip dropping — squeeze the stance-side glute med", cueCritical: "Significant hip drop — reduce range",
    },
  ],
  phases: [
    { name: "Bridge", description: "Lie on the back with knees bent and feet flat. Lift the hips to form a straight line from shoulders to knees." },
    { name: "March", description: "Lift one foot a few inches off the ground while keeping the hips elevated and square." },
    { name: "Hold", description: "Briefly hold the lifted position with the hips stable." },
    { name: "Return", description: "Lower the foot back to the ground and repeat with the opposite side." },
  ],
};

// ────────────────────────────────────────────────────────────
// 9. BEAST HOLD
// ────────────────────────────────────────────────────────────
export const beastHold: ExerciseBiomechanics = {
  id: "beast-hold",
  name: "Beast Hold",
  aliases: ["Tabletop Hold", "All Fours Hold", "Beast Crawl Hold"],
  category: "core",
  description: "Four-point kneeling isometric hold with the hips at tabletop height. Builds core endurance and shoulder/hip stability.",
  tags: ["core", "abs", "stability", "isometric", "bodyweight", "shoulder-stability"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "leftWrist", "rightWrist"],
  checkpoints: [
    {
      id: "beast-hip-angle", name: "Hip Angle (Tabletop)",
      description: "The hips should be at approximately 90° of flexion, creating a tabletop position with the torso parallel to the ground.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [80, 105], warningRange: [60, 80], criticalRange: [0, 60],
      side: "both", phase: "Hold", weight: 9,
      cueGood: "Hips at tabletop height", cueWarning: "Hips too high — lower to 90°", cueCritical: "Hips too low — lift to create a flat back",
    },
    {
      id: "beast-knee-angle", name: "Knee Angle",
      description: "The knees should be at approximately 90° with the shins perpendicular to the ground. Knees directly under the hips.",
      angle: { joint: "leftKnee", p1: "leftHip", p2: "leftKnee", p3: "leftAnkle" },
      goodRange: [80, 100], warningRange: [65, 80], criticalRange: [0, 65],
      side: "both", phase: "Setup", weight: 7,
      cueGood: "Knees at 90° under the hips", cueWarning: "Knees too far forward or back — adjust position", cueCritical: "Knee position incorrect — reset the tabletop position",
    },
    {
      id: "beast-shoulder-position", name: "Shoulder Position",
      description: "Shoulders should be directly over the wrists (or stacked over elbows for forearm variation). The angle at the shoulder creates a stable platform.",
      angle: { joint: "leftShoulder", p1: "leftWrist", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [75, 100], warningRange: [60, 75], criticalRange: [0, 60],
      side: "both", phase: "Setup", weight: 8,
      cueGood: "Shoulders stacked over wrists", cueWarning: "Shoulders behind wrists — shift weight forward", cueCritical: "Shoulder position compromised — reset with hands under shoulders",
    },
    {
      id: "beast-spine-neutrality", name: "Spine Neutrality",
      description: "The spine should remain neutral — a flat line from the head to the tailbone. No sagging or excessive rounding.",
      angle: { joint: "leftShoulder", p1: "leftEar", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [155, 180], warningRange: [140, 155], criticalRange: [0, 140],
      side: "both", phase: "Hold", weight: 9,
      cueGood: "Spine neutral — flat back", cueWarning: "Spine sagging — engage core to lift", cueCritical: "Spine severely sagging — reset and brace the core",
    },
    {
      id: "beast-core-engagement", name: "Core Engagement",
      description: "The core should be actively engaged to prevent the spine from sagging. The navel should be pulled toward the spine.",
      angle: { joint: "leftShoulder", p1: "nose", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [155, 180], warningRange: [140, 155], criticalRange: [0, 140],
      side: "both", phase: "Hold", weight: 8,
      cueGood: "Core engaged — back flat", cueWarning: "Core bracing fading — pull the navel in", cueCritical: "Core disengaged — back is sagging",
    },
  ],
  phases: [
    { name: "Setup", description: "Start on all fours with hands under shoulders and knees under hips." },
    { name: "Hold", description: "Engage the core and lift the knees slightly off the ground (or keep them down for easier version). Maintain a flat back." },
    { name: "Release", description: "Lower the knees back to the ground in a controlled manner." },
  ],
};

// ────────────────────────────────────────────────────────────
// 10. STOMACH VACUUMS
// ────────────────────────────────────────────────────────────
export const stomachVacuums: ExerciseBiomechanics = {
  id: "stomach-vacuums",
  name: "Stomach Vacuums",
  aliases: ["Abdominal Vacuum", "TVA Activation", "Stomach Suck-In"],
  category: "core",
  description: "Deep core activation exercise targeting the transversus abdominis (TVA). Performed by exhaling fully and pulling the navel toward the spine.",
  tags: ["core", "TVA", "transversus-abdominis", "deep-core", "breathing", "posture"],
  landmarks: ["leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftEar", "rightEar", "nose"],
  checkpoints: [
    {
      id: "vacuum-posture-tracking", name: "Posture Tracking",
      description: "Posture should remain upright (standing or seated) with the spine neutral throughout the vacuum. Slouching reduces TVA activation.",
      angle: { joint: "leftShoulder", p1: "leftEar", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [160, 180], warningRange: [145, 160], criticalRange: [0, 145],
      side: "both", phase: "Exhale", weight: 9,
      cueGood: "Good upright posture", cueWarning: "Posture slumping — sit/stand taller", cueCritical: "Poor posture — realign the spine",
    },
    {
      id: "vacuum-shoulder-position", name: "Shoulder Position",
      description: "Shoulders should remain neutral and relaxed — not hunched or elevated. Hunched shoulders indicate thoracic tension that inhibits TVA engagement.",
      angle: { joint: "leftShoulder", p1: "leftEar", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [160, 180], warningRange: [145, 160], criticalRange: [0, 145],
      side: "both", phase: "Suck in", weight: 7,
      cueGood: "Shoulders relaxed and neutral", cueWarning: "Shoulders rising — relax and drop them", cueCritical: "Shoulders hunched — roll them back and down",
    },
    {
      id: "vacuum-pelvis-neutrality", name: "Pelvis Neutrality",
      description: "The pelvis should remain in a neutral position — not tilted anteriorly or posteriorly. Pelvic tilt indicates compensatory bracing.",
      angle: { joint: "leftHip", p1: "leftShoulder", p2: "leftHip", p3: "leftKnee" },
      goodRange: [170, 190], warningRange: [160, 170], criticalRange: [0, 160],
      side: "both", phase: "Suck in", weight: 8,
      cueGood: "Pelvis neutral", cueWarning: "Pelvis tilting — maintain neutral alignment", cueCritical: "Pelvis position compromised — reset and find neutral",
    },
    {
      id: "vacuum-spine-alignment", name: "Spine Alignment",
      description: "The spine should maintain its natural curvature without excessive arching or flattening. The vacuum strengthens the deep core that supports spinal alignment.",
      angle: { joint: "leftShoulder", p1: "nose", p2: "leftShoulder", p3: "leftHip" },
      goodRange: [160, 180], warningRange: [145, 160], criticalRange: [0, 145],
      side: "both", phase: "Hold", weight: 8,
      cueGood: "Spine aligned — good TVA engagement", cueWarning: "Spine alignment shifting — maintain posture", cueCritical: "Spine position compromised — reset the vacuum",
    },
  ],
  phases: [
    { name: "Exhale", description: "Exhale all air from the lungs completely." },
    { name: "Suck in", description: "Pull the navel toward the spine as if trying to touch the belly button to the back. Keep the ribcage still." },
    { name: "Hold", description: "Hold the vacuum position while breathing shallowly. Maintain the deep core contraction." },
    { name: "Release", description: "Slowly release the contraction and return to normal breathing." },
  ],
};

const coreExercises: ExerciseBiomechanics[] = [
  plank,
  reversePlank,
  legRaises,
  russianTwists,
  reversePlankMarches,
  jackknife,
  legHipLift,
  gluteMarch,
  beastHold,
  stomachVacuums,
];

export default coreExercises;
