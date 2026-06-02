import type { ExerciseBiomechanics } from "../../types";

export const inclineDumbbellPress: ExerciseBiomechanics = {
  id: "incline-dumbbell-press",
  name: "Incline Dumbbell Press",
  aliases: ["incline chest press", "incline db press", "dumbbell bench press"],
  category: "push",
  description:
    "Compound pressing movement targeting the clavicular head of the pectoralis major (upper chest) and triceps on an incline bench. Dumbbells allow independent limb movement and greater range of motion than barbell variants.",
  tags: ["chest", "upper chest", "triceps", "anterior delt", "compound"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee"
  ],
  checkpoints: [
    {
      id: "incline-press-elbow-flare",
      name: "Elbow Flare Angle",
      description:
        "Angle of the upper arm relative to the torso at the bottom of the press. Flaring elbows beyond ~75° shifts load to the anterior capsule and increases shoulder impingement risk. Optimal range is 45-75° for incline pressing.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [45, 75],
      warningRange: [75, 90],
      criticalRange: [90, 180],
      side: "both",
      phase: "Descent",
      weight: 0.95,
      cueGood: "Elbows at 45-75°, shoulders protected",
      cueWarning: "Elbows flaring out — tuck them slightly",
      cueCritical: "Elbows >90° flare — acute shoulder injury risk!"
    },
    {
      id: "incline-press-elbow-depth",
      name: "Elbow Flexion at Bottom",
      description:
        "Elbow joint angle at the deepest point of the descent. ~90° indicates adequate range for full pectoral stretch. Shallower angles limit hypertrophy stimulus; deeper angles (<65°) excessively strain the anterior shoulder capsule.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [80, 100],
      warningRange: [65, 80],
      criticalRange: [0, 65],
      side: "both",
      phase: "Descent",
      weight: 0.85,
      cueGood: "90° depth — ideal chest stretch",
      cueWarning: "Descending too deep — protect the shoulder capsule",
      cueCritical: "Excessive depth — severe anterior shoulder strain"
    },
    {
      id: "incline-press-shoulder-abduction",
      name: "Shoulder Abduction at Bottom",
      description:
        "Humerus angle relative to the torso frontal plane at the bottom of the press. Arms that are too tucked (<30°) limit chest activation; excessive abduction (>75°) overlaps with elbow flare check and compounds impingement risk.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [45, 75],
      warningRange: [30, 45],
      criticalRange: [0, 30],
      side: "both",
      phase: "Descent",
      weight: 0.7,
      cueGood: "Shoulder at 45-75°, good chest recruitment",
      cueWarning: "Arms too tucked — let them open to 45°",
      cueCritical: "Arms pinned to sides — impingement risk"
    },
    {
      id: "incline-press-wrist-alignment",
      name: "Wrist Alignment",
      description:
        "Wrist extension angle during the press. The wrist should remain neutral (straight, ~180° forearm-to-hand line). Extended (bent-back) wrists reduce force transfer through the kinetic chain and strain the carpal ligaments.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Press",
      weight: 0.6,
      cueGood: "Wrist neutral, clean force transfer",
      cueWarning: "Wrist bending back — keep it straight",
      cueCritical: "Wrist severely extended — carpal ligament strain"
    },
    {
      id: "incline-press-bench-angle",
      name: "Bench Incline Angle",
      description:
        "Torso-to-horizontal angle determined by the bench backrest. 30-45° incline optimally targets the upper chest. Angles below 20° shift load to the sternocostal head; above 60° recruits predominantly the anterior deltoid.",
      angle: { joint: "rightHip", p1: "rightKnee", p2: "rightHip", p3: "rightShoulder" },
      goodRange: [130, 150],
      warningRange: [150, 165],
      criticalRange: [165, 180],
      side: "right",
      phase: "Setup",
      weight: 0.5,
      cueGood: "30-45° incline, upper chest bias active",
      cueWarning: "Bench too flat — increase incline",
      cueCritical: "Near flat — targeting mid chest, not upper"
    },
    {
      id: "incline-press-path-symmetry",
      name: "Dumbbell Path Symmetry",
      description:
        "Bilateral symmetry of wrist height through the press phase. Asymmetric drift indicates scapular compensation, shoulder mobility imbalance, or preferential loading of the dominant side.",
      angle: { joint: "nose", p1: "leftWrist", p2: "nose", p3: "rightWrist" },
      goodRange: [30, 60],
      warningRange: [15, 30],
      criticalRange: [0, 15],
      side: "both",
      phase: "Press",
      weight: 0.7,
      cueGood: "Even path on both sides",
      cueWarning: "Slight asymmetry — even out the dumbbells",
      cueCritical: "Major asymmetry — check shoulder mobility"
    },
    {
      id: "incline-press-scapular-retraction",
      name: "Scapular Retraction at Setup",
      description:
        "Scapular position at set-up. Shoulder blades must be retracted (pinched back) and depressed (pulled down) against the bench. Protracted scapulae reduce the safe shoulder flexion arc and elevate impingement risk during heavy pressing.",
      angle: { joint: "rightShoulder", p1: "rightElbow", p2: "rightShoulder", p3: "leftShoulder" },
      goodRange: [75, 105],
      warningRange: [105, 130],
      criticalRange: [130, 180],
      side: "both",
      phase: "Setup",
      weight: 0.8,
      cueGood: "Scapulae retracted, stable foundation",
      cueWarning: "Shoulders rounding forward — pinch back",
      cueCritical: "Scapulae fully protracted — unstable pressing posture"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Lie on incline bench, retract and depress scapulae, brace core, dumbbells held at shoulder width"
    },
    {
      name: "Descent",
      description: "Lower dumbbells with controlled tempo to approximately chest level, elbows tracking at 45-75° from torso"
    },
    {
      name: "Pause",
      description: "Brief pause at the stretched position, maintaining pectoral tension without bouncing"
    },
    {
      name: "Press",
      description: "Drive dumbbells upward explosively while maintaining scapular retraction and a neutral wrist"
    },
    {
      name: "Lockout",
      description: "Full arm extension with dumbbells stacked over the shoulders, avoiding hyperextension at the elbow"
    }
  ]
};

export const pecFly: ExerciseBiomechanics = {
  id: "pec-fly",
  name: "Pectoral Fly",
  aliases: ["dumbbell fly", "cable fly", "pec deck fly", "chest fly"],
  category: "push",
  description:
    "Isolation movement for the pectoralis major (sternocostal and clavicular heads) through horizontal adduction. The elbow angle remains fixed (~150-160°) throughout, making this a single-joint exercise about shoulder horizontal adduction. The stretch phase is the most injury-sensitive portion.",
  tags: ["chest", "isolation", "horizontal adduction", "pectoralis major"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee"
  ],
  checkpoints: [
    {
      id: "pec-fly-elbow-angle",
      name: "Fixed Elbow Angle",
      description:
        "Elbow angle set at the start and held constant throughout the fly. The elbow should remain at a slight, fixed bend of ~150-160°. Allowing the elbow to open (>165°) or close (<140°) converts the fly into a pressing movement, reducing pec isolation and increasing joint stress.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [148, 162],
      warningRange: [140, 148],
      criticalRange: [0, 140],
      side: "both",
      phase: "Stretch",
      weight: 0.85,
      cueGood: "Elbow locked at 150-160°, perfect isolation",
      cueWarning: "Elbow collapsing — maintain the bend",
      cueCritical: "Elbow too straight — turning into a press"
    },
    {
      id: "pec-fly-shoulder-horizontal-abduction",
      name: "Shoulder Horizontal Abduction at Stretch",
      description:
        "Angle of the arm relative to the transverse plane at the widest point of the stretch. Arms should reach approximately 180° (line across both shoulders) for maximal pectoral stretch. Limiting mobility or premature contraction reduces the eccentric stimulus.",
      angle: { joint: "rightShoulder", p1: "leftShoulder", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Stretch",
      weight: 0.8,
      cueGood: "Wide stretch at 160-180°, great pec recruitment",
      cueWarning: "Range too narrow — open arms wider",
      cueCritical: "Limited abduction; risk of pecking instead of stretching"
    },
    {
      id: "pec-fly-shoulder-contraction",
      name: "Shoulder Horizontal Adduction at Contraction",
      description:
        "Arm position at peak contraction where the hands come together above the chest. Full adduction maximizes pec shortening. Incomplete closure suggests weak adductor recruitment or excessive weight.",
      angle: { joint: "rightShoulder", p1: "leftShoulder", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [30, 70],
      warningRange: [70, 90],
      criticalRange: [90, 180],
      side: "both",
      phase: "Contraction",
      weight: 0.75,
      cueGood: "Full squeeze at the top",
      cueWarning: "Not bringing hands close enough together",
      cueCritical: "Contraction too wide — missing peak pec activation"
    },
    {
      id: "pec-fly-wrist-alignment",
      name: "Wrist Position Throughout",
      description:
        "Wrist should remain in a neutral, slightly extended position (~170-180°) through the entire arc. A flexed or deviated wrist during flys loads the carpal tunnel and reduces the mind-muscle connection to the chest.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Stretch",
      weight: 0.5,
      cueGood: "Wrist neutral through the arc",
      cueWarning: "Wrist bending — keep it firm",
      cueCritical: "Wrist collapsed under load"
    },
    {
      id: "pec-fly-trunk-stability",
      name: "Trunk Stability (No Excessive Arching)",
      description:
        "Lumbar arch angle during the fly. Excessive arching (>20° from neutral) indicates the lifter is turning the fly into a pressing motion using lower back drive. The spine should maintain a neutral position with only a natural lordotic curve.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [160, 180],
      warningRange: [145, 160],
      criticalRange: [0, 145],
      side: "right",
      phase: "Stretch",
      weight: 0.6,
      cueGood: "Core braced, spine stable",
      cueWarning: "Arching lower back — brace the core",
      cueCritical: "Excessive arch — using lower back to press"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Lie flat on bench (or set cable pulleys to chest height), set elbow angle at ~150-160°, dumbbells held directly above chest"
    },
    {
      name: "Stretch",
      description: "Lower arms out to the sides in a wide arc while maintaining fixed elbow angle until a deep pectoral stretch is felt"
    },
    {
      name: "Contraction",
      description: "Drive arms together in a hugging motion, squeezing the pectorals at the top"
    },
    {
      name: "Hold",
      description: "Peak contraction hold for 1-2 seconds to maximize intramuscular tension"
    }
  ]
};

export const shoulderPress: ExerciseBiomechanics = {
  id: "shoulder-press",
  name: "Dumbbell Shoulder Press",
  aliases: ["overhead press", "db shoulder press", "military press", "seated shoulder press"],
  category: "push",
  description:
    "Compound overhead pressing movement targeting the deltoids (primarily anterior and lateral heads), triceps, and upper trapezius. Done seated or standing with dumbbells. Requires significant scapular mobility and core stability for safe execution.",
  tags: ["shoulders", "deltoids", "triceps", "overhead", "compound"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "leftEar", "rightEar", "nose"
  ],
  checkpoints: [
    {
      id: "ohp-elbow-bottom",
      name: "Elbow Angle at Bottom",
      description:
        "Elbow flexion at the lowest point of the press. Approximately 90° indicates the forearms are roughly vertical and the dumbbells are at ear height. Deeper descent (<80°) shifts load from delts to the passive shoulder capsule.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [85, 105],
      warningRange: [75, 85],
      criticalRange: [0, 75],
      side: "both",
      phase: "Descent",
      weight: 0.85,
      cueGood: "Elbows at 90°, good depth",
      cueWarning: "Going too deep — stop at ear height",
      cueCritical: "Excessive depth — shoulder capsule strain"
    },
    {
      id: "ohp-wrist-over-elbow",
      name: "Wrist Alignment Overhead",
      description:
        "Vertical alignment of the wrist relative to the elbow at lockout. The wrist must be positioned directly above the elbow to ensure the load is transmitted through the skeletal axis rather than the wrist flexors. A forward-shifted wrist indicates compensations.",
      angle: { joint: "rightWrist", p1: "rightShoulder", p2: "rightWrist", p3: "rightElbow" },
      goodRange: [160, 180],
      warningRange: [140, 160],
      criticalRange: [0, 140],
      side: "both",
      phase: "Lockout",
      weight: 0.7,
      cueGood: "Wrist stacked over elbow",
      cueWarning: "Wrist drifting forward — stack it",
      cueCritical: "Wrist ahead of elbow — unstable overhead position"
    },
    {
      id: "ohp-trunk-lean",
      name: "Trunk Lean (Spine Neutrality)",
      description:
        "Spinal angle relative to vertical. Excessive lean back (>10°) indicates the lifter is using the lower back to press overhead (similar to a decline press), reducing delt activation and increasing lumbar shear forces. Ideal is 0-10° posterior lean.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [165, 180],
      warningRange: [150, 165],
      criticalRange: [0, 150],
      side: "right",
      phase: "Press",
      weight: 0.9,
      cueGood: "Core braced, neutral spine",
      cueWarning: "Arching back — squeeze glutes and brace",
      cueCritical: "Severe lean — lumbar spine at risk!"
    },
    {
      id: "ohp-scapular-position",
      name: "Scapular Upward Rotation at Top",
      description:
        "Scapular position overhead at lockout. The scapulae must upwardly rotate to allow full humeral elevation without impingement. A depressed or retracted-only position indicates the lifter is not achieving full range of motion or has limited thoracic extension.",
      angle: { joint: "rightShoulder", p1: "rightEar", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [20, 45],
      warningRange: [45, 60],
      criticalRange: [60, 180],
      side: "both",
      phase: "Lockout",
      weight: 0.65,
      cueGood: "Scapulae upwardly rotated, full ROM",
      cueWarning: "Shrugging at top — relax the traps",
      cueCritical: "Elevated shoulders — impingement risk"
    },
    {
      id: "ohp-head-position",
      name: "Head Position (Chin Tuck)",
      description:
        "Craniovertebral angle — the forward projection of the chin relative to the torso. A jutting chin (forward head posture) during overhead pressing reduces subacromial space and increases neck extensor strain. The head should remain neutral with the ears aligned over the shoulders.",
      angle: { joint: "nose", p1: "rightShoulder", p2: "nose", p3: "rightEar" },
      goodRange: [85, 110],
      warningRange: [110, 130],
      criticalRange: [130, 180],
      side: "right",
      phase: "Press",
      weight: 0.55,
      cueGood: "Neutral head, chin slightly tucked",
      cueWarning: "Chin jutting forward — tuck it back",
      cueCritical: "Forward head — cervical spine strain"
    },
    {
      id: "ohp-arm-symmetry",
      name: "Symmetry of Arm Travel",
      description:
        "Bilateral symmetry of the pressing path. The left and right wrists should rise at the same rate and to the same height. Asymmetry suggests scapular dyskinesis, shoulder mobility differences, or unilateral compensation.",
      angle: { joint: "nose", p1: "leftWrist", p2: "nose", p3: "rightWrist" },
      goodRange: [25, 50],
      warningRange: [10, 25],
      criticalRange: [0, 10],
      side: "both",
      phase: "Press",
      weight: 0.6,
      cueGood: "Symmetrical overhead press",
      cueWarning: "Slight asymmetry — even the dumbbells",
      cueCritical: "Significant asymmetry — assess shoulder mobility"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Dumbbells resting on shoulders, elbows slightly below 90°, core braced, neutral spine"
    },
    {
      name: "Descent",
      description: "Lower dumbbells with control to approximately ear height, maintaining a proud chest"
    },
    {
      name: "Press",
      description: "Drive dumbbells upward in a slight arc, keeping the head neutral and glutes engaged"
    },
    {
      name: "Lockout",
      description: "Full elbow extension overhead with biceps by ears, avoiding hyperextension and excessive arch"
    }
  ]
};

export const lateralRaise: ExerciseBiomechanics = {
  id: "lateral-raise",
  name: "Lateral Raise",
  aliases: ["side lateral raise", "dumbbell lateral raise", "front raise"],
  category: "push",
  description:
    "Isolation exercise for the lateral (middle) deltoid. The arm is abducted to ~90° in the frontal plane (side raise) or flexed to ~90° in the sagittal plane (front raise). High-rep, controlled movement — momentum and swinging are common form breakers.",
  tags: ["shoulders", "lateral delt", "medial delt", "isolation", "deltoid"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "nose"
  ],
  checkpoints: [
    {
      id: "lat-raise-arm-angle-top",
      name: "Arm Angle Relative to Torso at Top",
      description:
        "Shoulder abduction angle at the top of the lateral raise. Optimal height is approximately 90° (arms parallel to the floor). Raising beyond 90° recruits the upper traps excessively; stopping short reduces lateral delt activation.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [80, 100],
      warningRange: [65, 80],
      criticalRange: [0, 65],
      side: "both",
      phase: "Top",
      weight: 0.85,
      cueGood: "Arms at 90°, lateral delt peak",
      cueWarning: "Not high enough — raise to parallel",
      cueCritical: "Far too low — using momentum, not delts"
    },
    {
      id: "lat-raise-elbow-angle",
      name: "Elbow Angle (Slight Bend)",
      description:
        "Fixed elbow angle throughout the lateral raise. The elbow should maintain a slight bend of ~150-170°, acting as a fixed lever. Collapsing or extending the elbow changes the moment arm and shifts load from the delts to the traps.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [150, 170],
      warningRange: [140, 150],
      criticalRange: [0, 140],
      side: "both",
      phase: "Lift",
      weight: 0.75,
      cueGood: "Slight bend in elbows, good lever",
      cueWarning: "Elbow bending too much — straighten slightly",
      cueCritical: "Elbow collapsed — turning into an upright row"
    },
    {
      id: "lat-raise-wrist-position",
      name: "Wrist Neutral (Not Bent)",
      description:
        "Wrist should remain neutral throughout the raise. A bent wrist (flexed or deviated) reduces the neural drive to the deltoid via the proximal-distal tension gradient and can cause cumulative strain at the wrist joint.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Lift",
      weight: 0.45,
      cueGood: "Wrist neutral",
      cueWarning: "Wrist bent — straighten it",
      cueCritical: "Wrist severely bent under load"
    },
    {
      id: "lat-raise-trunk-stability",
      name: "Trunk Stability (No Swinging)",
      description:
        "Hip sway angle — lateral deviation of the hips during the lift. Swinging the torso to generate momentum (hip sway >5°) is the most common form fault. The trunk must remain rigid with minimal frontal-plane movement (<5°).",
      angle: { joint: "rightShoulder", p1: "leftHip", p2: "rightShoulder", p3: "rightHip" },
      goodRange: [170, 180],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Lift",
      weight: 0.85,
      cueGood: "Stable trunk, no momentum",
      cueWarning: "Slight sway — slow down, control it",
      cueCritical: "Excessive swinging — using body momentum"
    },
    {
      id: "lat-raise-shoulder-elevation",
      name: "Shoulder Depression (No Shrugging)",
      description:
        "Scapular elevation angle during the raise. Shrugging (scapular elevation) at the top indicates upper trap dominance over the lateral delt. The scapulae should remain depressed, isolating the deltoid. Thumb-up (neutral grip) orientation improves the biomechanical line of pull.",
      angle: { joint: "rightShoulder", p1: "rightEar", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [100, 130],
      warningRange: [85, 100],
      criticalRange: [0, 85],
      side: "both",
      phase: "Top",
      weight: 0.7,
      cueGood: "Scapulae depressed, delt isolated",
      cueWarning: "Shrugging — drop the shoulders",
      cueCritical: "Full shrug — traps doing the work"
    },
    {
      id: "lat-raise-pinky-or-thumb",
      name: "Pinky-Up vs. Thumb-Up Grip",
      description:
        "Forearm rotation at the top of the lateral raise. A thumb-up (neutral) orientation with slight external rotation of the humerus optimizes the acromial space and improves lateral delt engagement. Pinky-up (internally rotated) orientation can contribute to biceps tendinopathy over time.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "leftWrist" },
      goodRange: [85, 105],
      warningRange: [70, 85],
      criticalRange: [0, 70],
      side: "both",
      phase: "Top",
      weight: 0.5,
      cueGood: "Thumb slightly up, external rotation active",
      cueWarning: "Pinky rising — turn thumb up",
      cueCritical: "Pinky-up grip — biceps tendon stress"
    }
  ],
  phases: [
    {
      name: "Start",
      description: "Stand with dumbbells at sides, elbows slightly bent (~150-170°), scapulae depressed, core braced"
    },
    {
      name: "Lift",
      description: "Raise arms laterally with thumbs leading, keeping the elbow angle fixed, stopping at shoulder height"
    },
    {
      name: "Top",
      description: "Brief pause at the top (~90° abduction), feeling the lateral delt contraction without shrugging"
    },
    {
      name: "Lower",
      description: "Lower dumbbells under control with a 2-3 second eccentric, maintaining tension in the delt"
    }
  ]
};

export const tricepPushdown: ExerciseBiomechanics = {
  id: "tricep-pushdown",
  name: "Tricep Pushdown",
  aliases: ["cable tricep pushdown", "tricep extension", "rope pushdown", "tricep cable extension"],
  category: "push",
  description:
    "Isolation exercise for the triceps brachii (all three heads) using a cable stack and rope or bar attachment. The movement is pure elbow extension with the humerus stabilized. The rope variant allows full pronation at lockout.",
  tags: ["triceps", "isolation", "cable", "elbow extension"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee"
  ],
  checkpoints: [
    {
      id: "tricep-pushdown-elbow-start",
      name: "Elbow Angle at Start",
      description:
        "Elbow flexion at the starting position. The elbows should be at ~90° with the cable handle at chest height. This allows full range of motion through to lockout. A tighter angle (<90°) reduces the effective ROM.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [85, 100],
      warningRange: [75, 85],
      criticalRange: [0, 75],
      side: "both",
      phase: "Start",
      weight: 0.7,
      cueGood: "Elbows at 90°, full ROM ready",
      cueWarning: "Starting too extended — get the full stretch",
      cueCritical: "ROM too short — start with sharper elbow angle"
    },
    {
      id: "tricep-pushdown-elbow-lockout",
      name: "Elbow Angle at Lockout",
      description:
        "Elbow extension at the bottom of the movement. Full lockout (~170-180°) indicates complete triceps contraction. Failure to fully extend indicates triceps weakness or excessive weight. Hyperextension should be avoided.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Lockout",
      weight: 0.8,
      cueGood: "Full lockout, triceps fully contracted",
      cueWarning: "Not fully extending — go through the full ROM",
      cueCritical: "Partial reps — reduce weight and extend fully"
    },
    {
      id: "tricep-pushdown-elbow-position",
      name: "Elbow Position Relative to Torso",
      description:
        "Upper arm stability — the elbows should remain tucked close to the torso throughout the movement. Flaring the elbows outward (elbow drift >15° from the midline) shifts the load from the long head of the triceps to the lateral head and reduces mechanical efficiency.",
      angle: { joint: "rightElbow", p1: "rightHip", p2: "rightElbow", p3: "rightShoulder" },
      goodRange: [10, 25],
      warningRange: [25, 40],
      criticalRange: [40, 180],
      side: "both",
      phase: "Push",
      weight: 0.85,
      cueGood: "Elbows tucked at the sides",
      cueWarning: "Elbows drifting out — lock them in",
      cueCritical: "Elbows flared out — engage lats to pin them"
    },
    {
      id: "tricep-pushdown-wrist-pronation",
      name: "Wrist Pronation at Lockout",
      description:
        "Forearm rotation at the bottom of the pushdown. The rope attachment allows the wrists to pronate (palms face down and out) at lockout, maximizing triceps medial head recruitment. Failure to pronate indicates poor mind-muscle connection or a grip-width issue.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [60, 90],
      warningRange: [45, 60],
      criticalRange: [0, 45],
      side: "both",
      phase: "Lockout",
      weight: 0.5,
      cueGood: "Wrists pronated at lockout",
      cueWarning: "Not turning palms out — pronate at the end",
      cueCritical: "No pronation — missing medial head activation"
    },
    {
      id: "tricep-pushdown-trunk-angle",
      name: "Trunk Angle (Slight Forward Lean)",
      description:
        "Forward lean of the torso. A slight forward lean of ~10-15° allows the cable handle to travel in the correct arc (down and slightly back). Standing too upright causes the handle to drift away from the body, reducing triceps isolation.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [165, 175],
      warningRange: [155, 165],
      criticalRange: [0, 155],
      side: "right",
      phase: "Push",
      weight: 0.6,
      cueGood: "Slight forward lean, good cable angle",
      cueWarning: "Leaning too far forward — stand up slightly",
      cueCritical: "Hunched over — using bodyweight to push"
    },
    {
      id: "tricep-pushdown-shoulder-stability",
      name: "Shoulder Stability (No Shoulder Movement)",
      description:
        "Vertical shoulder displacement during the pushdown. The shoulders should remain stationary throughout — any shoulder elevation or depression indicates the lifter is recruiting the lats or traps to assist. Pure triceps work requires a fixed humerus.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [75, 95],
      warningRange: [60, 75],
      criticalRange: [0, 60],
      side: "both",
      phase: "Push",
      weight: 0.75,
      cueGood: "Shoulders stable, humerus fixed",
      cueWarning: "Shoulder moving — lock it in place",
      cueCritical: "Excessive shoulder movement — using body english"
    }
  ],
  phases: [
    {
      name: "Start",
      description: "Grip the rope/bar with elbows at ~90°, upper arms pinned to the torso, slight forward lean"
    },
    {
      name: "Push",
      description: "Extend the elbows by driving the handle down, keeping the upper arms stationary"
    },
    {
      name: "Lockout",
      description: "Full elbow extension with wrists pronated (palms down and out), squeezing the triceps"
    },
    {
      name: "Return",
      description: "Controlled flexion back to ~90°, maintaining tension and preventing the stack from clashing"
    }
  ]
};

export const pushUp: ExerciseBiomechanics = {
  id: "push-up",
  name: "Push-Up",
  aliases: ["press-up", "floor press", "bodyweight push-up"],
  category: "push",
  description:
    "Compound bodyweight pressing exercise targeting the pectorals, anterior deltoids, and triceps. The push-up is a closed-chain exercise that also heavily recruits the core and serratus anterior for shoulder stability. Proper form requires a rigid straight line from head to heels.",
  tags: ["chest", "triceps", "shoulders", "bodyweight", "core", "compound"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "leftAnkle", "rightAnkle",
    "leftHeel", "rightHeel", "leftFootIndex", "rightFootIndex", "nose"
  ],
  checkpoints: [
    {
      id: "pushup-elbow-bottom",
      name: "Elbow Angle at Bottom",
      description:
        "Elbow flexion at the deepest point of the push-up. ~90° or slightly less (chest approximately fist-width from the floor) provides adequate pectoral stretch. Insufficient depth (<120°) reduces chest activation; going too deep (>90° elbow flexion, <70°) may overstretch the anterior shoulder.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [80, 100],
      warningRange: [65, 80],
      criticalRange: [0, 65],
      side: "both",
      phase: "Bottom",
      weight: 0.85,
      cueGood: "90° at the bottom, perfect depth",
      cueWarning: "Not deep enough — lower the chest",
      cueCritical: "Too deep — shoulder capsule stress"
    },
    {
      id: "pushup-elbow-flare",
      name: "Elbow Flare (Arm-to-Torso Angle)",
      description:
        "Angle of the upper arm relative to the torso at the bottom position. Elbows should be at approximately 45° from the torso. Flaring to 90° (T-pose) shifts the load to the anterior capsule and is a leading cause of shoulder pain in push-ups.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [35, 55],
      warningRange: [55, 75],
      criticalRange: [75, 180],
      side: "both",
      phase: "Bottom",
      weight: 0.9,
      cueGood: "Elbows at 45°, shoulders safe",
      cueWarning: "Elbows flaring — tuck them in",
      cueCritical: "DANGER: T-pose elbows — high shoulder injury risk!"
    },
    {
      id: "pushup-spine-alignment",
      name: "Spine Alignment (Head-to-Heel Line)",
      description:
        "Sagittal plane spinal alignment from head (ear) through shoulder, hip, and ankle. The body should form a rigid straight line. Any break — hip sagging (anterior pelvic tilt) or piking (posterior pelvic tilt) — reduces core demand and increases lumbar shear.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 190],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Top",
      weight: 0.95,
      cueGood: "Perfect plank line, core locked",
      cueWarning: "Hips sagging — brace the core",
      cueCritical: "Hips dropped — lower back at risk!"
    },
    {
      id: "pushup-hip-height",
      name: "Hip Height (No Sagging or Piking)",
      description:
        "Hip angle relative to the shoulder-to-ankle line. The hips should neither sag (anterior pelvic tilt >10°) nor pike (posterior pelvic tilt >10°). Sagging compresses the lumbar facets; piking shifts load to the shoulders and reduces chest activation.",
      angle: { joint: "rightHip", p1: "rightAnkle", p2: "rightHip", p3: "rightShoulder" },
      goodRange: [170, 190],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Bottom",
      weight: 0.85,
      cueGood: "Neutral hips, stable core",
      cueWarning: "Hips sagging — squeeze glutes",
      cueCritical: "Piked hips — raising the hips too high"
    },
    {
      id: "pushup-wrist-alignment",
      name: "Wrist Alignment Under Shoulders",
      description:
        "Vertical alignment of the wrist relative to the shoulder at the top position. The wrists should be directly under (or slightly outside) the shoulders. Wrists positioned too far forward or backward alter the pressing angle and increase wrist extension stress.",
      angle: { joint: "rightWrist", p1: "leftWrist", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [75, 105],
      warningRange: [60, 75],
      criticalRange: [0, 60],
      side: "both",
      phase: "Top",
      weight: 0.7,
      cueGood: "Wrists under shoulders, good alignment",
      cueWarning: "Wrists too far forward — stack them under shoulders",
      cueCritical: "Wrists misaligned — carpal tunnel strain"
    },
    {
      id: "pushup-depth",
      name: "Push-Up Depth (Chest-to-Floor)",
      description:
        "Effective depth of the push-up measured via shoulder-to-floor distance or elbow angle. The chest should descend to approximately fist-width from the floor (elbows at ~90°). Partial push-ups (<45° of elbow flexion change) provide significantly less pectoral activation.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [70, 90],
      warningRange: [90, 110],
      criticalRange: [110, 180],
      side: "both",
      phase: "Bottom",
      weight: 0.75,
      cueGood: "Full depth, chest near floor",
      cueWarning: "Shallow — go deeper for full chest activation",
      cueCritical: "Quarter reps — lowering intensity significantly"
    }
  ],
  phases: [
    {
      name: "Top",
      description: "Plank position with arms extended, wrists under shoulders, body forming a straight line from head to heels"
    },
    {
      name: "Descent",
      description: "Lower the chest toward the floor while maintaining a rigid core, elbows tracking at ~45°"
    },
    {
      name: "Bottom",
      description: "Chest approximately fist-width from the floor, elbows at ~90°, scapulae retracted"
    },
    {
      name: "Press",
      description: "Push through the palms to return to the top, fully extending the arms without locking elbows harshly"
    }
  ]
};

export const hammerCurl: ExerciseBiomechanics = {
  id: "hammer-curl",
  name: "Hammer Curl",
  aliases: ["dumbbell hammer curl", "neutral grip curl", "hammer bicep curl"],
  category: "push",
  description:
    "Isolation exercise for the biceps brachii (long head) and brachialis with a neutral (hammer/thumb-up) grip. The neutral grip reduces stress on the biceps tendon compared to supinated curls and emphasizes the brachialis, which lies beneath the biceps.",
  tags: ["biceps", "brachialis", "arms", "isolation", "neutral grip"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee"
  ],
  checkpoints: [
    {
      id: "hammer-curl-elbow-bottom",
      name: "Elbow Angle at Bottom (Full Extension)",
      description:
        "Elbow extension at the bottom of the curl. The elbow must reach full extension (~0°) to achieve complete biceps stretch and avoid adaptive shortening of the muscle. Partial extension at the bottom reduces range of motion by 30-50%.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Start",
      weight: 0.75,
      cueGood: "Full stretch at the bottom",
      cueWarning: "Not fully extending — stretch the biceps",
      cueCritical: "Very short ROM — need full extension"
    },
    {
      id: "hammer-curl-elbow-top",
      name: "Elbow Angle at Top (Peak Contraction)",
      description:
        "Elbow flexion at the peak of the curl. ~130-150° of flexion achieves full biceps shortening without the elbow drifting forward. Incomplete flexion (<120°) suggests the weight is too heavy; hyperflexion (>150°) usually involves shoulder flexion to assist.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [130, 150],
      warningRange: [120, 130],
      criticalRange: [0, 120],
      side: "both",
      phase: "Top",
      weight: 0.8,
      cueGood: "Full curl, biceps peak at 130-150°",
      cueWarning: "Not curling high enough — squeeze at the top",
      cueCritical: "Partial curl — reduce weight for full ROM"
    },
    {
      id: "hammer-curl-wrist-position",
      name: "Wrist Position (Neutral, Thumb Up)",
      description:
        "Wrist orientation in the hammer curl. The wrist should remain neutral (thumb up, ~180° forearm-to-hand line) throughout. Pronation (thumb down) shifts load to the brachioradialis; supination (palm up) converts the exercise to a standard bicep curl and eliminates the brachialis emphasis.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Curl",
      weight: 0.6,
      cueGood: "Wrist neutral, thumb up throughout",
      cueWarning: "Wrist turning — keep the thumb up",
      cueCritical: "Wrist collapsed — losing neutral grip"
    },
    {
      id: "hammer-curl-elbow-drift",
      name: "Elbow Position (Tucked, No Forward Swing)",
      description:
        "Elbow drift in the sagittal plane. The elbows must remain pinned to the sides throughout the curl. Forward elbow drift (>5 cm from the sagittal zero) turns the curl into a front raise-bicep hybrid, reducing biceps isolation and involving the anterior delt.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Curl",
      weight: 0.85,
      cueGood: "Elbows pinned at sides, perfect isolation",
      cueWarning: "Elbows drifting forward — pin them back",
      cueCritical: "Elbows far forward — using shoulders to curl"
    },
    {
      id: "hammer-curl-trunk-stability",
      name: "Trunk Stability (No Leaning Back)",
      description:
        "Thoracic lean angle during the curl. Leaning back (>10° from vertical) converts the movement into a momentum-driven swing rather than a controlled biceps curl. The trunk should remain upright and braced throughout.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 180],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Curl",
      weight: 0.8,
      cueGood: "Upright posture, stable core",
      cueWarning: "Leaning back — brace and stay upright",
      cueCritical: "Swinging the weight — reduce load"
    }
  ],
  phases: [
    {
      name: "Start",
      description: "Stand with dumbbells at sides, elbows fully extended, wrists neutral (thumbs forward), core braced"
    },
    {
      name: "Curl",
      description: "Flex the elbows to bring the dumbbells toward the shoulders, keeping elbows pinned to the sides"
    },
    {
      name: "Top",
      description: "Peak contraction at ~130-150° elbow flexion, squeeze the biceps, thumb still pointing up"
    },
    {
      name: "Lower",
      description: "Controlled eccentric back to full extension over 2-3 seconds, maintaining biceps tension"
    }
  ]
};

const pushDayExercises: ExerciseBiomechanics[] = [
  inclineDumbbellPress,
  pecFly,
  shoulderPress,
  lateralRaise,
  tricepPushdown,
  pushUp,
  hammerCurl
];

export default pushDayExercises;
