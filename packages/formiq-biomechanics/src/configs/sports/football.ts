import { ExerciseBiomechanics, createCheckpointAngle } from '../../types';

export const instepDrive: ExerciseBiomechanics = {
  id: "football-instep-drive",
  name: "Instep Drive (Soccer Kick)",
  aliases: [
    "instep drive",
    "soccer kick",
    "laces kick",
    "power shot",
    "football kick",
  ],
  category: "football",
  description:
    "Full instep drive analysis covering approach, plant foot, leg cocking, leg acceleration, foot contact, and follow-through phases for a right-footed kicker.",
  tags: [
    "football",
    "soccer",
    "kick",
    "instep drive",
    "shooting",
    "power",
    "plant foot",
    "follow-through",
  ],
  landmarks: [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftWrist",
    "rightWrist",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftAnkle",
    "rightAnkle",
    "leftHeel",
    "rightHeel",
    "leftFootIndex",
    "rightFootIndex",
    "nose",
    "leftEar",
    "rightEar",
  ],
  checkpoints: [
    {
      id: "plant-knee-angle",
      name: "Plant Foot Knee Flexion at Support",
      description:
        "Flexion angle of the plant (left) knee at the moment the foot contacts the ground beside the ball. A 15-30° bend provides stability and energy transfer.",
      angle: createCheckpointAngle(
        "plantKnee",
        "leftHip",
        "leftKnee",
        "leftAnkle"
      ),
      goodRange: [150, 165],
      warningRange: [165, 175],
      criticalRange: [175, 180],
      side: "left",
      phase: "Plant foot",
      weight: 0.85,
      cueGood: "Plant knee flexed — stable base for power transfer",
      cueWarning:
        "Plant leg too straight — reduce reach, keep slight bend",
      cueCritical:
        "Locked plant leg — limited shock absorption and energy transfer",
    },
    {
      id: "kicking-hip-cocking",
      name: "Kicking Leg Hip Extension at Cocking",
      description:
        "Extension of the kicking (right) hip during the cocking phase. The thigh moves behind the body to load the hip flexors and glutes for the forward swing.",
      angle: createCheckpointAngle(
        "kickingHipCock",
        "rightShoulder",
        "rightHip",
        "rightKnee"
      ),
      goodRange: [145, 162],
      warningRange: [162, 172],
      criticalRange: [172, 180],
      side: "right",
      phase: "Leg cocking",
      weight: 0.75,
      cueGood: "Good hip extension — loaded and ready to accelerate",
      cueWarning: "Limited hip cocking — extend the leg further back",
      cueCritical:
        "Minimal hip extension — significantly reducing power potential",
    },
    {
      id: "knee-flexion-cocking",
      name: "Knee Flexion at Cocking",
      description:
        "Flexion angle of the kicking (right) knee at maximum cocking. A 90-110° bend stores elastic energy in the quadriceps for explosive knee extension through the ball.",
      angle: createCheckpointAngle(
        "kickingKneeCock",
        "rightHip",
        "rightKnee",
        "rightAnkle"
      ),
      goodRange: [85, 110],
      warningRange: [110, 125],
      criticalRange: [125, 180],
      side: "right",
      phase: "Leg cocking",
      weight: 0.8,
      cueGood:
        "Deep knee flexion — excellent elastic energy storage",
      cueWarning: "Knee not bent enough — flex more for power",
      cueCritical:
        "Knee insufficiently flexed — limited stretch-shortening cycle response",
    },
    {
      id: "ankle-impact",
      name: "Ankle Lock at Impact",
      description:
        "Angle of the kicking (right) ankle at ball contact. The ankle should be locked in slight plantarflexion with the foot pointed to present the hard laces surface to the ball.",
      angle: createCheckpointAngle(
        "ankleImpact",
        "rightKnee",
        "rightAnkle",
        "rightFootIndex"
      ),
      goodRange: [125, 150],
      warningRange: [105, 125],
      criticalRange: [0, 105],
      side: "right",
      phase: "Foot contact",
      weight: 0.9,
      cueGood: "Ankle locked and pointed — clean contact surface",
      cueWarning: "Ankle not pointed enough — reduce power and accuracy",
      cueCritical:
        "Flaccid ankle — high risk of poor contact or ankle injury; lock the ankle down",
    },
    {
      id: "non-kicking-arm",
      name: "Non-Kicking Arm Position (Balance Arm)",
      description:
        "Position of the non-kicking (left) arm at impact. The arm extends forward and slightly across the body for counterbalance against the kicking leg.",
      angle: createCheckpointAngle(
        "balanceArm",
        "leftShoulder",
        "leftElbow",
        "leftWrist"
      ),
      goodRange: [135, 165],
      warningRange: [120, 135],
      criticalRange: [0, 120],
      side: "left",
      phase: "Foot contact",
      weight: 0.5,
      cueGood: "Balance arm extended — good counterbalance",
      cueWarning: "Arm too bent — extend for better balance",
      cueCritical:
        "Arm collapsed — losing upper body stability through the kick",
    },
    {
      id: "trunk-lean-contact",
      name: "Trunk Lean Over the Ball at Contact",
      description:
        "Forward lean of the trunk at the moment of ball contact. Leaning over the ball (15-30° from vertical) keeps the shot low and driven.",
      angle: createCheckpointAngle(
        "trunkLean",
        "rightShoulder",
        "rightHip",
        "rightKnee"
      ),
      goodRange: [150, 165],
      warningRange: [165, 175],
      criticalRange: [175, 180],
      side: "right",
      phase: "Foot contact",
      weight: 0.85,
      cueGood:
        "Trunk leaning over the ball — shot will stay low and driven",
      cueWarning:
        "Leaning back — ball likely to rise over the bar",
      cueCritical:
        "Severe lean away from ball — losing power and sending shot high",
    },
    {
      id: "follow-through-knee",
      name: "Follow-Through Knee Extension",
      description:
        "Extension of the kicking (right) knee during the follow-through after ball contact. Full extension indicates complete energy transfer through the ball.",
      angle: createCheckpointAngle(
        "followThroughKnee",
        "rightHip",
        "rightKnee",
        "rightAnkle"
      ),
      goodRange: [155, 175],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "right",
      phase: "Follow-through",
      weight: 0.7,
      cueGood:
        "Full follow-through — maximum energy transferred to the ball",
      cueWarning:
        "Follow-through cut short — extend through the ball",
      cueCritical:
        "Minimal follow-through — significant power loss; kick through the ball",
    },
  ],
  phases: [
    {
      name: "Approach",
      description:
        "The run-up to the ball at a 30-45° angle. The approach sets the direction, distance, and rhythm for the strike.",
    },
    {
      name: "Plant foot",
      description:
        "Placement of the non-kicking foot beside the ball. The plant foot position determines the trajectory and stability of the kick.",
    },
    {
      name: "Leg cocking",
      description:
        "The backswing of the kicking leg. Hip extension and knee flexion load elastic energy into the muscles for the subsequent acceleration phase.",
    },
    {
      name: "Leg acceleration",
      description:
        "The forward swing of the kicking leg toward the ball. The hip flexors and quadriceps accelerate the leg in a proximal-to-distal sequence.",
    },
    {
      name: "Foot contact",
      description:
        "The moment the foot strikes the ball. The ankle must be locked and the trunk positioned over the ball for optimal power and accuracy.",
    },
    {
      name: "Follow-through",
      description:
        "Post-contact deceleration of the kicking leg. Full extension through the follow-through indicates complete energy transfer.",
    },
  ],
};

export const sprinting: ExerciseBiomechanics = {
  id: "football-sprinting",
  name: "Sprinting (Max Velocity Form)",
  aliases: [
    "sprint",
    "running",
    "max velocity",
    "football sprint",
    "soccer sprint",
  ],
  category: "football",
  description:
    "Sprinting form analysis covering the drive phase, max velocity, and deceleration. Focuses on trunk lean, hip extension, knee drive, ankle mechanics, and arm swing.",
  tags: [
    "football",
    "soccer",
    "sprint",
    "running",
    "drive phase",
    "max velocity",
    "acceleration",
    "foot strike",
  ],
  landmarks: [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftWrist",
    "rightWrist",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftAnkle",
    "rightAnkle",
    "leftHeel",
    "rightHeel",
    "leftFootIndex",
    "rightFootIndex",
    "nose",
    "leftEar",
    "rightEar",
  ],
  checkpoints: [
    {
      id: "trunk-angle-acceleration",
      name: "Trunk Lean During Acceleration",
      description:
        "Forward lean of the trunk during the drive/acceleration phase. A 40-60° lean from vertical optimizes horizontal force production and acceleration.",
      angle: createCheckpointAngle(
        "trunkAccel",
        "leftShoulder",
        "leftHip",
        "leftKnee"
      ),
      goodRange: [120, 140],
      warningRange: [140, 155],
      criticalRange: [155, 180],
      side: "both",
      phase: "Drive phase",
      weight: 0.85,
      cueGood:
        "Aggressive forward lean — optimal acceleration posture",
      cueWarning: "Too upright — lean forward more for acceleration",
      cueCritical:
        "Nearly vertical — significantly reduced horizontal force production",
    },
    {
      id: "hip-extension-toe-off",
      name: "Hip Extension at Toe-Off",
      description:
        "Extension angle of the driving hip at the moment of toe-off. Full hip extension (leg behind the body) indicates complete triple extension of the ankle, knee, and hip.",
      angle: createCheckpointAngle(
        "hipExtension",
        "rightShoulder",
        "rightHip",
        "rightKnee"
      ),
      goodRange: [140, 158],
      warningRange: [158, 170],
      criticalRange: [170, 180],
      side: "right",
      phase: "Drive phase",
      weight: 0.85,
      cueGood: "Full hip extension — powerful push-off",
      cueWarning: "Limited extension — extend hip more at toe-off",
      cueCritical:
        "Minimal hip extension — running with short stride, losing propulsive force",
    },
    {
      id: "knee-drive-swing",
      name: "Knee Drive Angle at Front Swing",
      description:
        "Flexion angle of the swinging knee at its highest point during the front swing phase. A 80-100° knee angle indicates proper leg recovery mechanics.",
      angle: createCheckpointAngle(
        "kneeDrive",
        "rightHip",
        "rightKnee",
        "rightAnkle"
      ),
      goodRange: [80, 100],
      warningRange: [100, 115],
      criticalRange: [115, 180],
      side: "right",
      phase: "Max velocity",
      weight: 0.75,
      cueGood: "Knee driving high — excellent recovery mechanics",
      cueWarning: "Knee not driving high enough — increase hip flexion",
      cueCritical:
        "Low knee drive — inefficient recovery, likely overstriding on the front side",
    },
    {
      id: "ankle-ground-contact",
      name: "Ankle Position at Ground Contact",
      description:
        "Angle of the ankle at initial ground contact during max velocity sprinting. A neutral to slightly pointed ankle indicates forefoot or midfoot strike.",
      angle: createCheckpointAngle(
        "ankleContact",
        "rightKnee",
        "rightAnkle",
        "rightFootIndex"
      ),
      goodRange: [95, 120],
      warningRange: [85, 95],
      criticalRange: [0, 85],
      side: "right",
      phase: "Max velocity",
      weight: 0.8,
      cueGood:
        "Forefoot strike — efficient elastic energy return",
      cueWarning: "Heel striking — causing braking force and reducing efficiency",
      cueCritical:
        "Excessive heel strike — high braking forces, increased injury risk",
    },
    {
      id: "arm-swing",
      name: "Arm Swing (Elbow Angle)",
      description:
        "Elbow angle of the arm during the sprinting cycle. A 80-100° angle at the elbow provides optimal lever length for counterbalancing leg drive.",
      angle: createCheckpointAngle(
        "armSwing",
        "leftShoulder",
        "leftElbow",
        "leftWrist"
      ),
      goodRange: [75, 100],
      warningRange: [100, 120],
      criticalRange: [120, 180],
      side: "left",
      phase: "Max velocity",
      weight: 0.55,
      cueGood:
        "Arms at 90° — efficient counterbalance to leg action",
      cueWarning: "Arms too straight — reduce lever for faster cycling",
      cueCritical:
        "Arms fully extended — creating excess shoulder torque and wasting energy",
    },
    {
      id: "foot-strike-position",
      name: "Foot Strike Position (Under Hip)",
      description:
        "Position of the stance leg at ground contact. The foot should land under the body's center of mass, not ahead of it, to minimize braking forces.",
      angle: createCheckpointAngle(
        "footStrike",
        "leftHip",
        "leftKnee",
        "leftAnkle"
      ),
      goodRange: [145, 160],
      warningRange: [160, 172],
      criticalRange: [172, 180],
      side: "left",
      phase: "Max velocity",
      weight: 0.9,
      cueGood:
        "Foot landing under hip — zero braking, maximum efficiency",
      cueWarning:
        "Slight overstride — foot ahead of hip, causing braking",
      cueCritical:
        "Significant overstride — foot well ahead of COM, substantial braking force",
    },
  ],
  phases: [
    {
      name: "Drive phase",
      description:
        "Initial acceleration from a stationary or low-speed start. Characterized by forward trunk lean, powerful triple extension, and high force production.",
    },
    {
      name: "Max velocity",
      description:
        "The top-speed phase of the sprint where the runner achieves maximum stride frequency and length. Form is most critical here to maintain efficiency.",
    },
    {
      name: "Deceleration",
      description:
        "Late-stage sprinting where fatigue causes form breakdown. Maintaining mechanics at this phase differentiates elite from amateur sprinters.",
    },
  ],
};

export default [instepDrive, sprinting];
