import { ExerciseBiomechanics, createCheckpointAngle } from '../../types';

export const golfSwing: ExerciseBiomechanics = {
  id: "golf-swing",
  name: "Golf Swing",
  aliases: ["golf", "full swing", "golf swing"],
  category: "golf",
  description:
    "Full golf swing analysis covering address, backswing, downswing, impact, and follow-through phases for right-handed golfers.",
  tags: [
    "golf",
    "swing",
    "backswing",
    "downswing",
    "impact",
    "follow-through",
    "rotation",
    "x-factor",
  ],
  landmarks: [
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftWrist",
    "rightWrist",
    "leftPinky",
    "rightPinky",
    "leftIndex",
    "rightIndex",
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
      id: "spine-angle-address",
      name: "Spine Angle at Address",
      description:
        "Forward tilt of the torso from the hips at setup. A proper spine angle of 30-45° from vertical sets the foundation for a consistent swing plane and prevents early extension.",
      angle: createCheckpointAngle("spine", "leftShoulder", "leftHip", "leftKnee"),
      goodRange: [135, 150],
      warningRange: [150, 158],
      criticalRange: [158, 180],
      side: "left",
      phase: "Address",
      weight: 0.9,
      cueGood: "Good posture — spine tilted forward with athletic flex",
      cueWarning: "Standing too upright — hinge more from the hips",
      cueCritical:
        "Nearly vertical spine — significant early extension risk",
    },
    {
      id: "hip-turn-top",
      name: "Hip Turn at Top of Backswing",
      description:
        "Rotation of the pelvis away from the target at the top of the backswing. Elite golfers achieve 35-50° of hip rotation relative to address position.",
      angle: createCheckpointAngle("hipRotation", "rightHip", "leftHip", "rightKnee"),
      goodRange: [110, 130],
      warningRange: [130, 145],
      criticalRange: [145, 180],
      side: "left",
      phase: "Backswing",
      weight: 0.85,
      cueGood: "Good hip rotation — proper coil created",
      cueWarning: "Hips over-rotated — reduce turn for consistency",
      cueCritical:
        "Excessive hip rotation — losing elastic tension between upper and lower body",
    },
    {
      id: "shoulder-turn-top",
      name: "Shoulder Turn at Top",
      description:
        "Rotation of the shoulder girdle away from the target at the top of the backswing. A full 85-100° shoulder turn relative to address generates maximum power.",
      angle: createCheckpointAngle(
        "shoulderRotation",
        "rightShoulder",
        "leftShoulder",
        "leftHip"
      ),
      goodRange: [80, 105],
      warningRange: [105, 120],
      criticalRange: [120, 180],
      side: "left",
      phase: "Backswing",
      weight: 0.85,
      cueGood: "Full shoulder turn — excellent coil",
      cueWarning: "Shoulders under-rotated — turn more for power",
      cueCritical:
        "Insufficient shoulder rotation — significantly limiting power and swing arc",
    },
    {
      id: "x-factor",
      name: "X-Factor (Hip-Shoulder Separation)",
      description:
        "The differential between hip and shoulder rotation at the top of the backswing. Greater separation stores more elastic energy for the downswing. Target 35-55° of separation.",
      angle: createCheckpointAngle("xFactor", "rightHip", "leftHip", "leftShoulder"),
      goodRange: [60, 80],
      warningRange: [80, 95],
      criticalRange: [95, 180],
      side: "left",
      phase: "Backswing",
      weight: 0.8,
      cueGood: "Excellent X-Factor — maximum coil potential stored",
      cueWarning:
        "Reducing separation — keep hips quiet while turning shoulders",
      cueCritical:
        "Hips turning too much with shoulders — losing stretch-shortening cycle",
    },
    {
      id: "lead-arm-top",
      name: "Lead Arm Angle at Top",
      description:
        "Extension of the lead (left) arm at the top of the backswing. A straight but not hyperextended lead arm maintains swing width and consistency.",
      angle: createCheckpointAngle(
        "leadArm",
        "leftShoulder",
        "leftElbow",
        "leftWrist"
      ),
      goodRange: [155, 175],
      warningRange: [140, 155],
      criticalRange: [0, 140],
      side: "left",
      phase: "Backswing",
      weight: 0.7,
      cueGood: "Lead arm extended — maintaining swing width",
      cueWarning: "Lead arm bending — losing power and consistency",
      cueCritical:
        "Collapsed lead arm — severely reducing swing width and clubhead speed",
    },
    {
      id: "wrist-hinge-top",
      name: "Wrist Hinge at Top",
      description:
        "Angle of the lead wrist at the top of the backswing. A 70-100° wrist hinge creates proper lag and maximizes clubhead speed through release.",
      angle: createCheckpointAngle(
        "wristHinge",
        "leftElbow",
        "leftWrist",
        "leftPinky"
      ),
      goodRange: [70, 100],
      warningRange: [100, 115],
      criticalRange: [115, 180],
      side: "left",
      phase: "Backswing",
      weight: 0.7,
      cueGood: "Proper wrist hinge — ready to release through impact",
      cueWarning: "Wrist too flat — increase hinge angle",
      cueCritical:
        "Minimal wrist hinge — losing significant power and lag potential",
    },
    {
      id: "spine-angle-downswing",
      name: "Spine Angle Retention (Early Extension Check)",
      description:
        "Maintaining the spine angle from address through the downswing. Loss of angle indicates early extension, a common fault causing fat/thin strikes and inconsistent ball striking.",
      angle: createCheckpointAngle(
        "spineRetention",
        "leftShoulder",
        "leftHip",
        "leftKnee"
      ),
      goodRange: [135, 150],
      warningRange: [150, 158],
      criticalRange: [158, 180],
      side: "left",
      phase: "Downswing",
      weight: 0.95,
      cueGood:
        "Spine angle retained — staying in posture through impact",
      cueWarning: "Losing posture slightly — stay down and through",
      cueCritical:
        "Early extension detected — standing up before impact; maintain address spine angle",
    },
    {
      id: "trail-leg-impact",
      name: "Trail Leg Extension at Impact",
      description:
        "Straightening of the trail (right) leg through impact. Proper extension drives ground reaction forces up the kinetic chain, generating power.",
      angle: createCheckpointAngle(
        "trailLeg",
        "rightHip",
        "rightKnee",
        "rightAnkle"
      ),
      goodRange: [162, 176],
      warningRange: [150, 162],
      criticalRange: [0, 150],
      side: "right",
      phase: "Downswing",
      weight: 0.65,
      cueGood: "Trail leg extending — driving through impact",
      cueWarning: "Trail leg too bent — push off the ground more",
      cueCritical:
        "Trail leg collapsing — losing power transfer through the kinetic chain",
    },
    {
      id: "head-drift",
      name: "Head Position Stability (Lateral Sway)",
      description:
        "Lateral movement of the head during the swing measured as head centering between the shoulders. Excessive lateral sway reduces low point control and strike consistency.",
      angle: createCheckpointAngle("headDrift", "leftShoulder", "nose", "rightShoulder"),
      goodRange: [28, 45],
      warningRange: [45, 55],
      criticalRange: [55, 180],
      side: "both",
      phase: "Downswing",
      weight: 0.85,
      cueGood: "Head stable — centered throughout swing",
      cueWarning: "Slight head sway — keep head behind the ball",
      cueCritical:
        "Excessive sway — head moving laterally, causing low point inconsistency",
    },
    {
      id: "follow-through-rotation",
      name: "Follow-Through Hip Rotation",
      description:
        "Rotation of the pelvis through to a balanced finish position. Full hip rotation past square at the finish indicates proper weight transfer and sequencing.",
      angle: createCheckpointAngle("followThrough", "rightHip", "leftHip", "leftKnee"),
      goodRange: [95, 120],
      warningRange: [120, 135],
      criticalRange: [135, 180],
      side: "left",
      phase: "Follow-through",
      weight: 0.65,
      cueGood: "Full rotation through — balanced finish position",
      cueWarning: "Hips under-rotated — turn through the shot more",
      cueCritical:
        "Incomplete rotation — weight likely stuck on back foot; finish facing the target",
    },
  ],
  phases: [
    {
      name: "Address",
      description:
        "Setup position before initiating the swing. Spine angle, stance width, grip, and posture are established as the foundation of the swing.",
    },
    {
      name: "Backswing",
      description:
        "Rotation of the shoulders and hips away from the target from takeaway through the top of the swing. Builds coil and stores elastic energy.",
    },
    {
      name: "Downswing",
      description:
        "Transition from the top through impact. The lower body initiates the downswing followed by the torso, arms, and club in a proximal-to-distal sequence.",
    },
    {
      name: "Follow-through",
      description:
        "Post-impact motion to a balanced finish. Full rotation and weight transfer to the lead side indicates proper sequencing through impact.",
    },
  ],
};

export default [golfSwing];
