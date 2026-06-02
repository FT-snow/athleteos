import type { ExerciseBiomechanics } from "../../types";

export const latPulldown: ExerciseBiomechanics = {
  id: "lat-pulldown",
  name: "Lat Pulldown",
  aliases: ["lat pull-down", "pulldown", "wide grip pulldown"],
  category: "pull",
  description:
    "Compound vertical pulling exercise targeting the latissimus dorsi, teres major, posterior deltoid, and biceps brachii. Performed on a cable pulldown machine with a long bar. The movement involves shoulder adduction and elbow flexion. Proper scapular mechanics distinguish effective pulls from shoulder-impinging ones.",
  tags: ["lats", "back", "vertical pull", "compound", "latissimus dorsi"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "nose"
  ],
  checkpoints: [
    {
      id: "lat-pulldown-elbow-top",
      name: "Elbow Angle at Top (Full Extension)",
      description:
        "Elbow extension at the top of the movement (arms overhead). The elbows should be nearly fully extended (~180°) to achieve a full lat stretch. Starting with bent elbows reduces the working range of motion by 30-50% and decreases lat activation.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Setup",
      weight: 0.7,
      cueGood: "Arms fully extended at the top",
      cueWarning: "Not reaching full extension — stretch the lats",
      cueCritical: "Limited ROM — reduce weight"
    },
    {
      id: "lat-pulldown-elbow-bottom",
      name: "Elbow Angle at Bottom (Peak Pull)",
      description:
        "Elbow flexion at the lowest point of the pull. ~90° with the bar approximately at the upper chest (clavicular level) indicates full lat shortening. Pulling the bar below the chest involves excessive shoulder extension and reduces lat tension.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [85, 105],
      warningRange: [105, 120],
      criticalRange: [120, 180],
      side: "both",
      phase: "Pull",
      weight: 0.8,
      cueGood: "Bar at upper chest, lats fully contracted",
      cueWarning: "Not pulling low enough — get the bar to the chest",
      cueCritical: "Pulling too low — using lumbar extension to compensate"
    },
    {
      id: "lat-pulldown-shoulder-adduction",
      name: "Shoulder Adduction Angle at Bottom",
      description:
        "Shoulder adduction angle (upper arm relative to torso) at the peak pull. The elbows should be pulled down and back, finishing with the upper arms at approximately 0-20° from the torso. Limited adduction indicates poor lat engagement.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [0, 30],
      warningRange: [30, 50],
      criticalRange: [50, 180],
      side: "both",
      phase: "Peak contraction",
      weight: 0.75,
      cueGood: "Elbows pulled down and back, lats engaged",
      cueWarning: "Elbows too wide — pull them down to the ribs",
      cueCritical: "Wide elbows — using traps, not lats"
    },
    {
      id: "lat-pulldown-trunk-lean",
      name: "Trunk Lean (Slight Lean Back)",
      description:
        "Thoracic lean angle during the pull. A slight lean back of ~10-20° is acceptable and helps clear the bar past the face. Leaning back >30° converts the movement into a rowing pattern (horizontal pull) and reduces vertical lat stretch.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [155, 170],
      warningRange: [140, 155],
      criticalRange: [0, 140],
      side: "right",
      phase: "Pull",
      weight: 0.8,
      cueGood: "Slight lean at 10-20°, good path",
      cueWarning: "Leaning too far back — sit upright",
      cueCritical: "Excessive lean—turning into a row"
    },
    {
      id: "lat-pulldown-grip-width",
      name: "Grip Width (Wrist-to-Shoulder Ratio)",
      description:
        "Horizontal distance between the hands relative to shoulder width measured by wrist position. A grip 1.5x shoulder width (hands outside shoulder width) optimally biases the lats. Too wide (>2x) reduces range of motion; too narrow (<1x) biases the biceps over the lats.",
      angle: { joint: "nose", p1: "leftWrist", p2: "nose", p3: "rightWrist" },
      goodRange: [50, 90],
      warningRange: [35, 50],
      criticalRange: [0, 35],
      side: "both",
      phase: "Setup",
      weight: 0.55,
      cueGood: "Grip width 1.5x shoulder, good lat bias",
      cueWarning: "Grip too narrow — move hands wider",
      cueCritical: "Grip too wide — losing range of motion"
    },
    {
      id: "lat-pulldown-spine-position",
      name: "Spine Neutrality (No Excessive Arching)",
      description:
        "Lumbar spine position during the pull. The spine must remain neutral with only a natural lordosis. Excessive lumbar arching (>20° hyperextension) converts the pulldown into a whole-body momentum exercise and compresses the lumbar discs.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [155, 175],
      warningRange: [140, 155],
      criticalRange: [0, 140],
      side: "right",
      phase: "Pull",
      weight: 0.85,
      cueGood: "Neutral spine, core engaged",
      cueWarning: "Arching lower back — brace the core",
      cueCritical: "Excessive arch — lumbar stress"
    },
    {
      id: "lat-pulldown-scapular-retraction",
      name: "Scapular Retraction at Peak",
      description:
        "Scapular position at the peak of the pull. The scapulae should be retracted (pinched together) and depressed at the bottom of the pull. Failure to retract indicates the lats are not fully engaged and the biceps may be taking over.",
      angle: { joint: "rightShoulder", p1: "rightElbow", p2: "rightShoulder", p3: "leftShoulder" },
      goodRange: [60, 90],
      warningRange: [90, 110],
      criticalRange: [110, 180],
      side: "both",
      phase: "Peak contraction",
      weight: 0.7,
      cueGood: "Scapulae retracted, lats engaged",
      cueWarning: "Not retracting — pinch the shoulder blades",
      cueCritical: "Scapulae protracted — letting biceps dominate"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Grip the bar wider than shoulder-width, arms fully extended overhead, slight lean back in the hips, core braced"
    },
    {
      name: "Pull",
      description: "Initiate by retracting the scapulae and pulling the bar down while driving the elbows toward the ribs"
    },
    {
      name: "Peak contraction",
      description: "Bar reaches the upper chest, scapulae fully retracted and depressed, elbows at ~90°"
    },
    {
      name: "Return",
      description: "Controlled release back to full arm extension, maintaining scapular control through the eccentric"
    }
  ]
};

export const tbarRow: ExerciseBiomechanics = {
  id: "tbar-row",
  name: "T-Bar Row",
  aliases: ["seated row", "chest supported row", "landmine row", "t-bar"],
  category: "pull",
  description:
    "Compound horizontal pulling exercise targeting the mid-back (rhomboids, trapezius, posterior deltoid) and lats. Performed with a T-bar landmine attachment or seated cable row. The trunk angle changes between variants: bent-over (~45°) for T-bar, upright (90°) for seated row.",
  tags: ["back", "rhomboids", "traps", "lats", "horizontal pull", "compound"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"
  ],
  checkpoints: [
    {
      id: "tbar-row-elbow-stretch",
      name: "Elbow Angle at Full Stretch",
      description:
        "Elbow extension at the forward-most position. The arms should fully extend (~180°) to achieve complete lat stretch. Reducing the stretch ROM by even 15° significantly diminishes the eccentric stimulus on the lats.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Setup",
      weight: 0.65,
      cueGood: "Full stretch, lats loaded",
      cueWarning: "Not extending enough — reach forward",
      cueCritical: "Short ROM — losing lat stretch"
    },
    {
      id: "tbar-row-elbow-peak",
      name: "Elbow Angle at Peak Contraction",
      description:
        "Elbow flexion at the peak of the row. ~90° indicates the handle has been pulled to the lower ribcage or belly button (depending on variant). Flexion beyond 90° (<80°) typically involves elbow-only movement without further back engagement.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [85, 105],
      warningRange: [75, 85],
      criticalRange: [0, 75],
      side: "both",
      phase: "Peak contraction",
      weight: 0.7,
      cueGood: "Elbow at 90°, full contraction",
      cueWarning: "Not pulling far enough — pull to the belly button",
      cueCritical: "Over-flexing — using arms, not back"
    },
    {
      id: "tbar-row-trunk-angle",
      name: "Trunk Angle Relative to Floor",
      description:
        "Bent-over trunk angle for T-bar rows relative to the horizontal. ~45° is optimal for lat and rhomboid engagement. A more upright angle (>60° from horizontal) reduces the lat stretch; too parallel (<30°) increases lumbar shear and hamstring demand.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [120, 140],
      warningRange: [105, 120],
      criticalRange: [0, 105],
      side: "right",
      phase: "Setup",
      weight: 0.85,
      cueGood: "45° trunk angle, biomechanically efficient",
      cueWarning: "Too upright — hinge forward more",
      cueCritical: "Near vertical — losing lat recruitment"
    },
    {
      id: "tbar-row-shoulder-retraction",
      name: "Shoulder Scapular Retraction at Peak",
      description:
        "Scapular retraction at the peak of the row. The shoulder blades must be fully adducted (pinched together) at the peak. Failure to retract indicates the load is being lifted primarily by the arms rather than the back musculature.",
      angle: { joint: "rightShoulder", p1: "rightElbow", p2: "rightShoulder", p3: "leftShoulder" },
      goodRange: [50, 85],
      warningRange: [85, 110],
      criticalRange: [110, 180],
      side: "both",
      phase: "Peak contraction",
      weight: 0.8,
      cueGood: "Scapulae fully retracted, back working",
      cueWarning: "Not pinching enough — squeeze the shoulder blades",
      cueCritical: "No retraction — using arms, not back"
    },
    {
      id: "tbar-row-spine-neutral",
      name: "Spine Neutral (No Lower Back Rounding)",
      description:
        "Lumbar curve angle during the row. The lower back must maintain its natural lordotic curve. Rounding (flexion >15° from neutral) under load is the primary cause of lumbar disc herniation during bent-over rows. This is the most critical safety checkpoint.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [140, 165],
      warningRange: [165, 175],
      criticalRange: [175, 180],
      side: "right",
      phase: "Pull",
      weight: 0.95,
      cueGood: "Neutral spine, natural arch maintained",
      cueWarning: "Slight rounding — extend the chest forward",
      cueCritical: "DANGER: Lower back rounded — disc herniation risk!"
    },
    {
      id: "tbar-row-knee-angle",
      name: "Knee Angle (Slight Bend)",
      description:
        "Knee flexion angle during the setup for T-bar rows. A slight bend of ~15-20° (165-170° extension) is optimal. Locked knees increase hamstring tension and reduce hip hinge mobility; overly bent knees (>30°) reduce the effective trunk angle and may strain the patella.",
      angle: { joint: "rightKnee", p1: "rightHip", p2: "rightKnee", p3: "rightAnkle" },
      goodRange: [160, 175],
      warningRange: [150, 160],
      criticalRange: [0, 150],
      side: "both",
      phase: "Setup",
      weight: 0.6,
      cueGood: "Knees slightly bent, hamstrings relaxed",
      cueWarning: "Knees too straight — soften the knees",
      cueCritical: "Knees locked — hamstring strain risk"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Bent-over at ~45° with neutral spine, arms fully extended, knees slightly bent, bar at arm's length"
    },
    {
      name: "Pull",
      description: "Drive elbows back and up, retracting the scapulae and pulling the bar toward the lower ribcage"
    },
    {
      name: "Peak contraction",
      description: "Bar contacts the lower ribcage / belly button, scapulae pinched, elbows at ~90°, hold for 1 sec"
    },
    {
      name: "Return",
      description: "Controlled extension back to the starting position, maintaining core tension and spinal neutrality"
    }
  ]
};

export const barbellRow: ExerciseBiomechanics = {
  id: "barbell-row",
  name: "Barbell Row",
  aliases: ["bent-over row", "dumbbell row", "Pendlay row", "BB row"],
  category: "pull",
  description:
    "Compound horizontal pulling exercise performed with a barbell (or dumbbells) in a bent-over position. Targets the entire posterior chain of the upper back: lats, rhomboids, trapezius, posterior deltoids, and spinal erectors. Spine neutrality under load is the critical safety variable.",
  tags: ["back", "lats", "rhomboids", "traps", "posterior chain", "compound"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"
  ],
  checkpoints: [
    {
      id: "bb-row-trunk-angle",
      name: "Trunk Angle (~45° to Floor)",
      description:
        "Hip hinge angle — the torso should be approximately 45° from the floor (135° from vertical). A more upright trunk (>60° from horizontal) reduces lat stretch and increases posterior delt dominance; more parallel (<30° from horizontal) dramatically increases lumbar shear forces.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [120, 140],
      warningRange: [105, 120],
      criticalRange: [0, 105],
      side: "right",
      phase: "Setup",
      weight: 0.9,
      cueGood: "45° hinge, optimal back angle",
      cueWarning: "Too upright — hinge forward at the hips",
      cueCritical: "Standing too tall — losing lat mechanics"
    },
    {
      id: "bb-row-elbow-peak",
      name: "Elbow Angle at Peak (~90-100°)",
      description:
        "Elbow flexion at the peak of the row. The elbow should reach approximately 90-100° with the bar pulled to the lower ribcage. Deeper flexion (<80°) suggests the bar is being pulled too high (to the chest), shifting work to the upper traps; less flexion (>115°) indicates an incomplete pull.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [90, 110],
      warningRange: [80, 90],
      criticalRange: [0, 80],
      side: "both",
      phase: "Peak",
      weight: 0.75,
      cueGood: "Elbow at 90-100°, bar at lower ribs",
      cueWarning: "Not pulling high enough — drive elbows back",
      cueCritical: "Over-pulling — using traps, not lats"
    },
    {
      id: "bb-row-shoulder-retraction",
      name: "Shoulder Retraction Range of Motion",
      description:
        "Scapular retraction angle at the peak of the row. The shoulder blades should achieve full adduction. Limited retraction is the most reliable indicator of excessive weight in a row — the lifter can move the bar but cannot retract the scapulae.",
      angle: { joint: "rightShoulder", p1: "rightElbow", p2: "rightShoulder", p3: "leftShoulder" },
      goodRange: [45, 80],
      warningRange: [80, 105],
      criticalRange: [105, 180],
      side: "both",
      phase: "Peak",
      weight: 0.8,
      cueGood: "Scapulae retracted, strong back contraction",
      cueWarning: "Not pinching — squeeze the shoulder blades",
      cueCritical: "No retraction — too heavy, reduce weight"
    },
    {
      id: "bb-row-spine-neutral",
      name: "Spine Neutral (No Lower Back Rounding!)",
      description:
        "Lumbar spine angle during the pull. This is the single most critical safety variable in bent-over rowing. Thoracolumbar flexion (rounding) under load generates posterior disc herniation forces, particularly at L4-L5 and L5-S1. The spine must remain rigidly neutral.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [140, 165],
      warningRange: [165, 175],
      criticalRange: [175, 180],
      side: "right",
      phase: "Pull",
      weight: 0.95,
      cueGood: "Neutral spine, braced core",
      cueWarning: "Back starting to round — chest up!",
      cueCritical: "DANGER: Lumbar flexion under load — disc injury risk!"
    },
    {
      id: "bb-row-knee-position",
      name: "Knee Position (Slight Bend)",
      description:
        "Knee flexion angle during the bent-over position. A slight bend (~10-20°, or 160-170° extension) allows proper hip hinging and hamstring length-tension. Locked knees force the hamstrings into an over-lengthened position and reduce pelvic mobility, increasing the risk of rounding.",
      angle: { joint: "rightKnee", p1: "rightHip", p2: "rightKnee", p3: "rightAnkle" },
      goodRange: [160, 175],
      warningRange: [150, 160],
      criticalRange: [0, 150],
      side: "both",
      phase: "Setup",
      weight: 0.55,
      cueGood: "Knees soft, good hip hinge",
      cueWarning: "Knees locked — soften slightly",
      cueCritical: "Legs too bent — squatting the row"
    },
    {
      id: "bb-row-wrist-neutral",
      name: "Wrist Neutral (No Curling)",
      description:
        "Wrist alignment during the pull. The wrist must remain neutral (straight, ~180° forearm-to-hand line). Wrist curling (flexion) during a row shifts the load improperly and can lead to extensor tendinopathy over time. A supinated (palms-forward) grip is preferred for biceps engagement.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Pull",
      weight: 0.45,
      cueGood: "Wrist straight, neutral grip",
      cueWarning: "Wrist curling — straighten it",
      cueCritical: "Wrist bent under load — tendon strain"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Bent-over at ~45° with neutral spine, knees slightly bent, bar hanging at arm's length from the floor"
    },
    {
      name: "Pull",
      description: "Initiate by retracting scapulae, then drive elbows back past the torso, pulling the bar to the lower ribcage"
    },
    {
      name: "Peak",
      description: "Bar contacts lower ribs, scapulae pinched, elbows at ~90-100°, hold for max contraction"
    },
    {
      name: "Lower",
      description: "Controlled eccentric lowering back to full arm extension, maintaining spinal neutrality throughout"
    }
  ]
};

export const reversePecFly: ExerciseBiomechanics = {
  id: "reverse-pec-fly",
  name: "Reverse Pec Fly",
  aliases: ["rear delt fly", "reverse dumbbell fly", "bent-over reverse fly", "pec deck reverse"],
  category: "pull",
  description:
    "Isolation exercise targeting the posterior deltoid and rhomboids through horizontal abduction. Performed with dumbbells in a bent-over position or on a reverse pec deck machine. The movement is primarily about isolating the rear delt while keeping the scapular retraction secondary.",
  tags: ["rear delts", "posterior delt", "rhomboids", "shoulders", "isolation"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "leftEar", "rightEar", "nose"
  ],
  checkpoints: [
    {
      id: "reverse-fly-elbow-angle",
      name: "Fixed Elbow Angle (~150-160°)",
      description:
        "Elbow angle set at the start and maintained throughout the fly. The elbow should remain at a slight, fixed bend of ~150-160° to keep the rear delt as the prime mover. Allowing the elbow to flex (>40° change) turns the movement into a row, shifting load to the rhomboids and lats.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [148, 165],
      warningRange: [135, 148],
      criticalRange: [0, 135],
      side: "both",
      phase: "Setup",
      weight: 0.85,
      cueGood: "Fixed elbow at 150-160°, rear delt isolated",
      cueWarning: "Elbow bending — lock the angle",
      cueCritical: "Elbow collapsing — turning into a row"
    },
    {
      id: "reverse-fly-horizontal-abduction",
      name: "Shoulder Horizontal Abduction at Peak",
      description:
        "Horizontal abduction angle (arm opening relative to the frontal plane) at the peak of the fly. Arms should open to approximately 180° (parallel to the floor, forming a T shape). Incomplete opening (<150°) significantly reduces posterior delt activation.",
      angle: { joint: "rightShoulder", p1: "leftShoulder", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Peak",
      weight: 0.8,
      cueGood: "Arms wide open at 160-180°, rear delts firing",
      cueWarning: "Not opening enough — drive elbows back",
      cueCritical: "Limited range — too heavy, reduce weight"
    },
    {
      id: "reverse-fly-trunk-lean",
      name: "Trunk Lean (~45° if Bent-Over)",
      description:
        "Bent-over trunk angle for the dumbbell variant. Approximately 45° from horizontal (135° hip angle) places the posterior delt in the optimal line of pull. A more upright angle reduces the effective stretch on the rear delt; more parallel increases lumbar strain.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [115, 140],
      warningRange: [100, 115],
      criticalRange: [0, 100],
      side: "right",
      phase: "Setup",
      weight: 0.7,
      cueGood: "45° hinge, good rear delt angle",
      cueWarning: "Too upright — hinge forward more",
      cueCritical: "Near vertical — reducing rear delt activation"
    },
    {
      id: "reverse-fly-scapular-retraction",
      name: "Scapular Retraction",
      description:
        "Scapular position at the peak of the movement. The shoulder blades should retract slightly as the arms open, but excessive retraction (>15° of scapular adduction) at the expense of humeral horizontal abduction indicates rhomboid dominance over the posterior delt.",
      angle: { joint: "rightShoulder", p1: "rightElbow", p2: "rightShoulder", p3: "leftShoulder" },
      goodRange: [55, 85],
      warningRange: [85, 105],
      criticalRange: [105, 180],
      side: "both",
      phase: "Peak",
      weight: 0.6,
      cueGood: "Scapulae lightly retracted, delt focused",
      cueWarning: "Over-retracting — think of opening the arms, not squeezing",
      cueCritical: "Full retraction — rhomboids taking over from rear delts"
    },
    {
      id: "reverse-fly-head-position",
      name: "Head Position (Neutral Spine)",
      description:
        "Craniocervical angle during the bent-over fly. The head should maintain a neutral position with the cervical spine in line with the thoracic spine. Looking up excessively (>20° cervical extension) compresses the cervical facets; dropping the head (<30° flexion) strains the upper traps.",
      angle: { joint: "nose", p1: "rightShoulder", p2: "nose", p3: "rightEar" },
      goodRange: [100, 120],
      warningRange: [85, 100],
      criticalRange: [0, 85],
      side: "right",
      phase: "Setup",
      weight: 0.45,
      cueGood: "Neutral head, cervical spine aligned",
      cueWarning: "Head dropping — keep a neutral neck",
      cueCritical: "Looking up or down — cervical spine strain"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Bent-over at ~45° (or seated on pec deck), arms hanging down, elbows fixed at ~150-160°, neutral neck"
    },
    {
      name: "Open",
      description: "Raise arms out to the sides in a wide arc, maintaining the fixed elbow angle, squeezing through the rear delts"
    },
    {
      name: "Peak",
      description: "Arms reach parallel to the floor (T-position), rear delts fully contracted, brief hold"
    },
    {
      name: "Return",
      description: "Controlled lowering back to the start position, maintaining tension in the posterior delt"
    }
  ]
};

export const straightArmPulldown: ExerciseBiomechanics = {
  id: "straight-arm-pulldown",
  name: "Straight Arm Pulldown",
  aliases: ["straight arm lat pulldown", "cable straight arm pulldown", "straight arm pushdown"],
  category: "pull",
  description:
    "Isolation exercise for the latissimus dorsi performed on a cable machine with the arms kept nearly straight (~170-180°). The movement is pure shoulder extension (lat flexion) — the arms sweep from overhead down to the thighs with minimal elbow flexion.",
  tags: ["lats", "latissimus dorsi", "isolation", "cable", "shoulder extension"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee"
  ],
  checkpoints: [
    {
      id: "sap-elbow-angle",
      name: "Elbow Angle (Nearly Straight, ~170-180°)",
      description:
        "Elbow angle maintained throughout the entire movement. The arms should remain nearly straight (170-180°) to keep the lats as the prime mover. Any significant elbow flexion (>30° deviation from 180°) converts the exercise into a tricep pushdown or lat pulldown hybrid.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [168, 180],
      warningRange: [150, 168],
      criticalRange: [0, 150],
      side: "both",
      phase: "Pull",
      weight: 0.9,
      cueGood: "Arms straight, lat isolation maintained",
      cueWarning: "Elbow bending — keep the arms straight",
      cueCritical: "Bent arms — turning into a pulldown"
    },
    {
      id: "sap-shoulder-top",
      name: "Shoulder Angle at Top (Arms Up ~180°)",
      description:
        "Shoulder flexion angle at the starting position with arms overhead. The arms should be raised to approximately 180° (vertical above the head) to achieve a full lat stretch. Limited overhead mobility restricts the working range of motion.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [150, 180],
      warningRange: [130, 150],
      criticalRange: [0, 130],
      side: "both",
      phase: "Setup",
      weight: 0.7,
      cueGood: "Arms overhead, lats fully stretched",
      cueWarning: "Limited overhead reach — reduce grip width",
      cueCritical: "Poor overhead position — lat stretch compromised"
    },
    {
      id: "sap-shoulder-bottom",
      name: "Shoulder Angle at Bottom (Arms to Thighs)",
      description:
        "Shoulder extension angle at the bottom of the movement. The arms should sweep down to approximately 0-10° from the torso (fully extended by the thighs). Stopping short (>20° remaining) leaves the lat partially uncontracted and reduces the effectiveness by up to 40%.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [0, 20],
      warningRange: [20, 35],
      criticalRange: [35, 180],
      side: "both",
      phase: "Peak",
      weight: 0.75,
      cueGood: "Arms to the thighs, lats fully contracted",
      cueWarning: "Not pushing down enough — go to the thighs",
      cueCritical: "Stopping short — incomplete lat contraction"
    },
    {
      id: "sap-trunk-lean",
      name: "Trunk Lean Forward (~10-20° at Bottom)",
      description:
        "Forward trunk lean angle at the bottom of the movement. A slight forward lean of ~10-20° allows the cable handle to travel in the correct arc. Leaning too far (>30°) shifts the movement to the spinal erectors; remaining upright (>0°) reduces lat range of motion.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [155, 170],
      warningRange: [145, 155],
      criticalRange: [0, 145],
      side: "right",
      phase: "Pull",
      weight: 0.65,
      cueGood: "Slight lean, good cable angle",
      cueWarning: "Not leaning enough — hinge slightly",
      cueCritical: "Excessive lean — using back extension"
    },
    {
      id: "sap-core-engagement",
      name: "Core Engagement (No Hip Movement)",
      description:
        "Hip angle stability during the pulldown. The hips should remain fixed throughout — any hip flexion/extension during the movement indicates the lifter is using spinal momentum rather than pure shoulder extension. The hips move ONLY through the initial lean setup.",
      angle: { joint: "rightHip", p1: "rightKnee", p2: "rightHip", p3: "rightShoulder" },
      goodRange: [170, 180],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Pull",
      weight: 0.7,
      cueGood: "Hips stable, lats doing the work",
      cueWarning: "Hips rocking — brace the core",
      cueCritical: "Excessive hip movement — using momentum"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Stand facing the cable stack, arms extended overhead gripping the bar, slight lean forward, elbows nearly straight"
    },
    {
      name: "Pull",
      description: "Initiate by retracting the lats and pulling the arms down toward the thighs in a sweeping arc with locked elbows"
    },
    {
      name: "Peak",
      description: "Arms reach the thighs (0-10° from torso), lats fully contracted, core braced"
    },
    {
      name: "Return",
      description: "Controlled eccentric raising the arms back overhead, maintaining lat tension through the ascent"
    }
  ]
};

export const facePull: ExerciseBiomechanics = {
  id: "face-pull",
  name: "Face Pull",
  aliases: ["cable face pull", "face pull with rope", "external rotation pull"],
  category: "pull",
  description:
    "Isolation exercise targeting the posterior deltoid, rhomboids, and external rotators of the shoulder (infraspinatus and teres minor). Performed with a cable rope attachment pulled toward the face with the elbows driven high and back. Essential for shoulder health and postural balance.",
  tags: ["rear delts", "rotator cuff", "external rotation", "shoulder health", "posture"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee"
  ],
  checkpoints: [
    {
      id: "face-pull-elbow-start",
      name: "Elbow Angle at Start (~180°)",
      description:
        "Elbow angle at the starting position with arms extended forward toward the cable stack. The elbows should be nearly straight (~180°) to begin. Starting with bent elbows reduces the effective range of motion for the external rotation component.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Setup",
      weight: 0.6,
      cueGood: "Arms extended, full ROM ready",
      cueWarning: "Starting too bent — extend the arms",
      cueCritical: "Short start position — losing external rotation"
    },
    {
      id: "face-pull-elbow-peak",
      name: "Elbow Angle at Peak (~120-130°)",
      description:
        "Elbow flexion at the peak of the face pull. The elbows should be bent to approximately 120-130° as the hands pull toward the face (ear level). This position allows maximal shoulder external rotation and rear delt contraction.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [115, 135],
      warningRange: [100, 115],
      criticalRange: [0, 100],
      side: "both",
      phase: "Peak",
      weight: 0.75,
      cueGood: "Elbows at 120-130°, peak external rotation",
      cueWarning: "Not pulling far enough — elbows back more",
      cueCritical: "Too bent — losing external rotation mechanics"
    },
    {
      id: "face-pull-external-rotation",
      name: "Shoulder External Rotation at Peak",
      description:
        "Scapular and humeral position at peak pull — the elbows should be driven out and up (horizontal abduction with external rotation). The forearms should finish approximately parallel or slightly tilted with the hands near ear level. This is the key therapeutic component of the face pull.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [70, 95],
      warningRange: [55, 70],
      criticalRange: [0, 55],
      side: "both",
      phase: "Peak",
      weight: 0.85,
      cueGood: "Elbows high and out, rotator cuff engaged",
      cueWarning: "Elbows too low — drive them up and back",
      cueCritical: "Elbows dropped — losing external rotation"
    },
    {
      id: "face-pull-wrist-position",
      name: "Wrist Position (Neutral or Slight Extension)",
      description:
        "Wrist angle during the pull. The wrists should remain neutral or in slight extension (170-180°). Flexed wrists (bent forward) reduce the transfer of force to the external rotators and can cause cumulative strain on the wrist extensors.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Pull",
      weight: 0.5,
      cueGood: "Wrist neutral/straight",
      cueWarning: "Wrist bent — straighten it",
      cueCritical: "Wrist collapsed under tension"
    },
    {
      id: "face-pull-trunk-posture",
      name: "Trunk Upright Posture",
      description:
        "Thoracic posture during the face pull. The trunk should remain upright (0-5° lean) with the chest proud. Leaning back (>15°) turns the face pull into a horizontal row; leaning forward (>10°) reduces the external rotation stimulus and may strain the lower back.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 180],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Pull",
      weight: 0.7,
      cueGood: "Upright posture, chest up",
      cueWarning: "Leaning back — stand upright",
      cueCritical: "Excessive lean — turning into a row"
    }
  ],
  phases: [
    {
      name: "Setup",
      description: "Stand facing cable stack with rope at face height, arms extended forward, upright posture"
    },
    {
      name: "Pull",
      description: "Pull the rope toward the face, driving elbows up and out to the sides, separating the rope ends"
    },
    {
      name: "Peak",
      description: "Hands reach ear level, elbows at ~120-130° with 90° shoulder abduction, external rotation maximized"
    },
    {
      name: "Return",
      description: "Controlled extension back to the starting position, maintaining tension through the posterior chain"
    }
  ]
};

export const supinatedDumbbellCurl: ExerciseBiomechanics = {
  id: "supinated-dumbbell-curl",
  name: "Supinated Dumbbell Curl",
  aliases: ["bicep curl", "palms-up curl", "standard dumbbell curl", "supinated bicep curl"],
  category: "pull",
  description:
    "Isolation exercise for the biceps brachii with the forearm supinated (palms facing up). The supinated position maximizes biceps activation by placing the muscle in its optimal length-tension relationship. The brachialis and brachioradialis assist depending on grip and wrist position.",
  tags: ["biceps", "brachialis", "arms", "isolation", "supinated grip"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee"
  ],
  checkpoints: [
    {
      id: "sup-curl-elbow-bottom",
      name: "Elbow Angle at Bottom (Full Extension)",
      description:
        "Elbow extension at the bottom of the curl. The elbow must fully extend to ~0° (180° extended) to achieve complete biceps stretch. Partial extension at the bottom (<170°) shortens the eccentric phase and reduces hypertrophy stimulus by up to 25%.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Start",
      weight: 0.75,
      cueGood: "Full elbow extension, biceps stretched",
      cueWarning: "Not extending fully — reach down",
      cueCritical: "Short ROM — losing eccentric stimulus"
    },
    {
      id: "sup-curl-elbow-top",
      name: "Elbow Angle at Top (~140-150°)",
      description:
        "Elbow flexion at the peak of the supinated curl. ~140-150° indicates full biceps shortening. The supinated curl allows slightly more flexion than the hammer curl (140-150° vs 130-150°) due to the favorable length-tension of the biceps in supination.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [135, 150],
      warningRange: [120, 135],
      criticalRange: [0, 120],
      side: "both",
      phase: "Top",
      weight: 0.8,
      cueGood: "Full curl at 140-150°, biceps peak",
      cueWarning: "Incomplete curl — squeeze at the top",
      cueCritical: "Partial curl — too heavy for full ROM"
    },
    {
      id: "sup-curl-wrist-supination",
      name: "Wrist Position (Supinated, Palms Up)",
      description:
        "Forearm supination angle throughout the curl. The wrists must maintain a supinated position (palms facing up, thumb-out axis) for maximum biceps brachii activation. Pronation (palms facing down) shifts the load to the brachioradialis and converts the exercise to a reverse curl.",
      angle: { joint: "rightWrist", p1: "rightElbow", p2: "rightWrist", p3: "rightShoulder" },
      goodRange: [155, 180],
      warningRange: [135, 155],
      criticalRange: [0, 135],
      side: "both",
      phase: "Curl",
      weight: 0.7,
      cueGood: "Palms up, biceps maximally engaged",
      cueWarning: "Palms turning in — supinate (palms up)",
      cueCritical: "Pronated wrist — turning into a reverse curl"
    },
    {
      id: "sup-curl-elbow-drift",
      name: "Elbow Position (Tucked, No Forward Swing)",
      description:
        "Elbow sagittal plane drift during the curl. Elbows must remain pinned to the sides. Forward drift (>5 cm deviation) recruits the anterior deltoid and reduces biceps isolation. This is the most common form fault in standing curls.",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "both",
      phase: "Curl",
      weight: 0.85,
      cueGood: "Elbows pinned, perfect isolation",
      cueWarning: "Elbows drifting forward — lock them back",
      cueCritical: "Elbows swinging — using shoulder momentum"
    },
    {
      id: "sup-curl-trunk-stability",
      name: "Trunk Stability (No Leaning Back)",
      description:
        "Trunk lean angle during the curl. Leaning back (>10° from vertical) indicates the weight is too heavy and the lifter is using momentum. The torso must remain upright and braced throughout the concentric and eccentric phases.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 180],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Curl",
      weight: 0.8,
      cueGood: "Upright posture, stable core",
      cueWarning: "Leaning back — brace the core",
      cueCritical: "Swinging body — reduce the weight"
    }
  ],
  phases: [
    {
      name: "Start",
      description: "Stand with dumbbells at sides, palms facing forward (supinated), elbows fully extended, core braced"
    },
    {
      name: "Curl",
      description: "Flex the elbows keeping the palms up and elbows pinned to the sides, curl dumbbells toward shoulders"
    },
    {
      name: "Top",
      description: "Peak contraction at ~140-150° elbow flexion, squeeze the biceps, palms still facing up"
    },
    {
      name: "Lower",
      description: "Controlled eccentric back to full extension over 2-3 seconds, maintaining supination throughout"
    }
  ]
};

export const deadHang: ExerciseBiomechanics = {
  id: "dead-hang",
  name: "Dead Hang",
  aliases: ["active hang", "passive hang", "bar hang", "grip hang"],
  category: "pull",
  description:
    "Static isometric exercise performed by hanging from a pull-up bar. Can be performed actively (shoulders engaged, scapulae depressed and retracted) or passively (shoulders relaxed, full stretch on the lats and shoulder capsule). Excellent for grip strength, shoulder health, and spinal decompression.",
  tags: ["grip", "shoulders", "lats", "spinal decompression", "isometric", "back"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "leftAnkle", "rightAnkle", "nose"
  ],
  checkpoints: [
    {
      id: "deadhang-shoulder-position",
      name: "Shoulder Position (Active vs. Passive Hang)",
      description:
        "Shoulder angle distinguishing active hang from passive hang. In an active hang, the scapulae are depressed (pulled down) and slightly retracted, placing the shoulders in a stable position at ~140-160° of elevation. In a passive hang, the shoulders relax and elevate to ~170-180° (full overhead stretch).",
      angle: { joint: "rightShoulder", p1: "rightHip", p2: "rightShoulder", p3: "rightElbow" },
      goodRange: [140, 160],
      warningRange: [160, 175],
      criticalRange: [175, 180],
      side: "both",
      phase: "Hang",
      weight: 0.85,
      cueGood: "Active hang: shoulders engaged and stable",
      cueWarning: "Passive hang detected — engage the shoulders",
      cueCritical: "Full passive — increased labral strain over time"
    },
    {
      id: "deadhang-spine-neutrality",
      name: "Spine Neutrality",
      description:
        "Lumbar and thoracic spine alignment during the hang. The spine should maintain its natural curvature with minimal flexion or extension. Excessive lumbar flexion (<160° at the hip relative to the knee) indicates poor core engagement; excessive arching stretches the anterior chain unnecessarily.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 190],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Hang",
      weight: 0.8,
      cueGood: "Neutral spine, core lightly engaged",
      cueWarning: "Spine flexing — brace the core",
      cueCritical: "Excessive flexion — spinal stress"
    },
    {
      id: "deadhang-elbow-angle",
      name: "Elbow Angle (Fully Extended, ~180°)",
      description:
        "Elbow angle during the hang. The elbows must be fully extended at ~180° in both active and passive hangs. Flexed elbows during a dead hang indicate the lifter is half-performing a pull-up, which places uneven stress on the biceps tendon at the radial tuberosity.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [175, 180],
      warningRange: [165, 175],
      criticalRange: [0, 165],
      side: "both",
      phase: "Hang",
      weight: 0.75,
      cueGood: "Elbows fully extended, good hang",
      cueWarning: "Elbows slightly bent — fully relax them",
      cueCritical: "Bent elbows — you're half-pulling, not hanging"
    },
    {
      id: "deadhang-grip-symmetry",
      name: "Grip / Pull Symmetry",
      description:
        "Bilateral symmetry of wrist height during the hang. Asymmetric grip (one wrist higher than the other) indicates uneven lat engagement, shoulder mobility differences, or grip compensation. Symmetrical loading is important for balanced shoulder health.",
      angle: { joint: "nose", p1: "leftWrist", p2: "nose", p3: "rightWrist" },
      goodRange: [30, 60],
      warningRange: [15, 30],
      criticalRange: [0, 15],
      side: "both",
      phase: "Hold",
      weight: 0.55,
      cueGood: "Symmetrical grip, even loading",
      cueWarning: "Slight asymmetry — center your grip",
      cueCritical: "Significant asymmetry — check shoulder mobility"
    }
  ],
  phases: [
    {
      name: "Hang",
      description: "Grip the bar with arms fully extended (active: shoulders engaged / passive: shoulders relaxed)"
    },
    {
      name: "Hold",
      description: "Maintain the hang position for the prescribed duration, keeping the spine neutral and breathing steadily"
    },
    {
      name: "Release",
      description: "Controlled release from the bar, landing softly to avoid shoulder jarring"
    }
  ]
};

export const plankToRow: ExerciseBiomechanics = {
  id: "plank-to-row",
  name: "Plank to Row",
  aliases: ["renegade row", "plank row", "dumbbell plank row", "renegade dumbbell row"],
  category: "pull",
  description:
    "Compound anti-rotation exercise combining a plank (core stability) with a unilateral dumbbell row. The movement challenges the entire posterior chain, lats, rhomboids, and core stabilizers. The primary difficulty is maintaining spinal and pelvic alignment while performing the row — any hip rotation indicates a loss of core stability.",
  tags: ["back", "core", "anti-rotation", "lats", "compound", "unilateral"],
  landmarks: [
    "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
    "leftWrist", "rightWrist", "leftHip", "rightHip",
    "leftKnee", "rightKnee", "leftAnkle", "rightAnkle",
    "leftHeel", "rightHeel", "leftFootIndex", "rightFootIndex"
  ],
  checkpoints: [
    {
      id: "plank-row-plank-alignment",
      name: "Plank Alignment (Spine Neutral)",
      description:
        "Full-body sagittal alignment from shoulders through hips to ankles. The body must form a rigid straight line with no hip sagging or piking. This is the foundational position before the row begins. Any deviation from the neutral spine position during the row indicates core fatigue or instability.",
      angle: { joint: "rightHip", p1: "rightShoulder", p2: "rightHip", p3: "rightKnee" },
      goodRange: [170, 190],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Plank",
      weight: 0.9,
      cueGood: "Perfect plank line, core locked",
      cueWarning: "Hips sagging — brace the core and squeeze glutes",
      cueCritical: "Hips dropped — lower back at risk!"
    },
    {
      id: "plank-row-shoulder-stability",
      name: "Shoulder Stability (No Hip Rotation During Row)",
      description:
        "Frontal-plane pelvis stability during the unilateral row. The hips should remain square (parallel to the floor) throughout the row. Hip rotation >10° indicates the core is not adequately resisting the rotational torque generated by the pulling arm.",
      angle: { joint: "rightHip", p1: "leftShoulder", p2: "rightHip", p3: "rightShoulder" },
      goodRange: [170, 180],
      warningRange: [155, 170],
      criticalRange: [0, 155],
      side: "right",
      phase: "Row",
      weight: 0.95,
      cueGood: "Hips square, anti-rotation active",
      cueWarning: "Hips twisting — brace harder!",
      cueCritical: "Significant rotation — core collapse, reduce weight"
    },
    {
      id: "plank-row-elbow-peak",
      name: "Elbow Angle at Row Peak (~90°)",
      description:
        "Elbow flexion at the peak of the row in the plank position. The dumbbell should be pulled to approximately hip level with the elbow at ~90°. Pulling higher (>110°) causes the trunk to rotate; pulling lower (<70°) reduces lat engagement.",
      angle: { joint: "rightElbow", p1: "rightShoulder", p2: "rightElbow", p3: "rightWrist" },
      goodRange: [85, 105],
      warningRange: [70, 85],
      criticalRange: [0, 70],
      side: "both",
      phase: "Row",
      weight: 0.8,
      cueGood: "Dumbbell at hip, strong row",
      cueWarning: "Not pulling high enough — drive the elbow back",
      cueCritical: "Over-pulling — causing trunk rotation"
    },
    {
      id: "plank-row-trunk-rotation",
      name: "Trunk Rotation Stability (Hip Squares)",
      description:
        "Transverse-plane trunk rotation angle during the row. The torso should remain parallel to the floor with negligible rotation (<5° deviation from the starting plane). Excessive rotation indicates the load exceeds the core's anti-rotation capacity and is the hallmark of a failed renegade row.",
      angle: { joint: "rightShoulder", p1: "leftHip", p2: "rightShoulder", p3: "rightHip" },
      goodRange: [170, 180],
      warningRange: [160, 170],
      criticalRange: [0, 160],
      side: "right",
      phase: "Row",
      weight: 0.9,
      cueGood: "Torso stable, no rotation",
      cueWarning: "Slight rotation — brace the obliques",
      cueCritical: "Major rotation — reduce weight, reset position"
    }
  ],
  phases: [
    {
      name: "Plank",
      description: "High plank position with hands on dumbbells, body forming a straight line from shoulders to ankles, core braced"
    },
    {
      name: "Row",
      description: "Row one dumbbell toward the hip while maintaining a rigid plank — no hip rotation, no spinal movement"
    },
    {
      name: "Return",
      description: "Lower the dumbbell back to the floor with control, reset the plank position before the next rep"
    }
  ]
};

const pullDayExercises: ExerciseBiomechanics[] = [
  latPulldown,
  tbarRow,
  barbellRow,
  reversePecFly,
  straightArmPulldown,
  facePull,
  supinatedDumbbellCurl,
  deadHang,
  plankToRow
];

export default pullDayExercises;
