import type { BodyZone, InjuryProtocol } from "./types";

const p = (pd: InjuryProtocol): InjuryProtocol => pd;

const protocolsList: InjuryProtocol[] = [

  // ===== KNEES =====

  p({
    id: "knee-patellar-tendinopathy",
    zone: "knees", diagnosis: "Patellar tendinopathy",
    aliases: ["Jumper's knee", "patellar tendonitis"],
    severity: "moderate",
    description: "Overuse injury of the patellar tendon, common in jumping sports.",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce pain", "Maintain pain-free ROM", "Unload tendon"],
        exercises: [
          { name: "Isometric quad holds", description: "Seated knee at 30°, isometric hold 60% max, 45s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain >3/10"], progressionCriterion: "Pain-free holds" },
          { name: "Stationary bike", description: "High seat, no resistance, pain-free range", sets: 1, reps: 10, frequency: "daily", contraindications: ["increased pain"], progressionCriterion: "10min pain-free cycling" },
          { name: "Straight leg raises", description: "Supine, raise leg to 45°, hold 3s", sets: 3, reps: 15, frequency: "daily", contraindications: ["anterior knee pain"], progressionCriterion: "3x15 pain-free" }
        ],
        restrictions: ["No jumping", "No deep squats >60°", "No sprinting"],
        milestone: "Pain-free walking and isometrics"
      },
      subacute: {
        goals: ["Begin eccentric loading", "Normalize gait"],
        exercises: [
          { name: "Eccentric decline squat", description: "25° decline board, 5s eccentric on affected leg", sets: 3, reps: 15, frequency: "daily", contraindications: ["sharp anterior knee pain"], progressionCriterion: "3x15 minimal discomfort" },
          { name: "Spanish squat", description: "Wall squat with band at 45°, isometric hold", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain during hold"], progressionCriterion: "45s holds" },
          { name: "Quad stretching", description: "Prone quad stretch, hold 30s", sets: 3, reps: 1, frequency: "2x daily", contraindications: ["knee compression pain"], progressionCriterion: "Full pain-free flexion" }
        ],
        restrictions: ["No explosive movements", "No heavy leg resistance"],
        milestone: "Pain-free eccentric decline squats"
      },
      rehab: {
        goals: ["Increase load tolerance", "Sport-specific loading"],
        exercises: [
          { name: "Progressive eccentric squat", description: "Weighted eccentric squat, controlled tempo", sets: 4, reps: 10, frequency: "5x/week", contraindications: ["pain >2/10"], progressionCriterion: "4x10 at 50% BW added" },
          { name: "Single-leg press", description: "Leg press 0-60°, 3s eccentric", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain at any range"], progressionCriterion: "3x12 at 1x BW" },
          { name: "Forward step-downs", description: "Step-down from 15cm box, controlled descent", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["valgus collapse"], progressionCriterion: "3x12 from 30cm box" }
        ],
        restrictions: ["Avoid full squat competition", "Limit jumping volume"],
        milestone: "Tolerates sport-like loading"
      },
      strength: {
        goals: ["Full strength restoration", "LSI >90%"],
        exercises: [
          { name: "Full back squats", description: "Barbell squat to parallel, progressive", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["pain during descent"], progressionCriterion: "1.5x BW squat" },
          { name: "Nordic hamstring curls", description: "Eccentric hamstring curl with partner", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["hamstring cramping"], progressionCriterion: "3x6 controlled" },
          { name: "Depth drops", description: "Step off 30-45cm box, soft landing", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain on landing"], progressionCriterion: "<10% ground contact asymmetry" }
        ],
        restrictions: ["No competition intensity", "Monitor day-after response"],
        milestone: "LSI >90% on strength tests"
      },
      "return-to-sport": {
        goals: ["Full sport training", "Pass return-to-sport testing"],
        exercises: [
          { name: "Sport-specific drills", description: "Full intensity sport movements", sets: 5, reps: 10, frequency: "4x/week", contraindications: ["pain during/after"], progressionCriterion: "Full practice pain-free" },
          { name: "Change-of-direction drills", description: "Reactive cutting at 90° and 180°", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["instability or pain"], progressionCriterion: "Full-speed cuts confident" }
        ],
        restrictions: ["No back-to-back high intensity days"],
        milestone: "Cleared for full sport participation"
      }
    },
    contraindicatedExercises: ["deep squat full depth", "heavy leg extension 0-30°"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "LSI >90% isometric knee extension at 60°",
      "Eccentric squat tolerance >50% BW",
      "Pass functional hop test battery",
      "3 consecutive high-intensity sessions pain-free"
    ]
  }),

  p({
    id: "knee-acl-reconstruction",
    zone: "knees", diagnosis: "ACL reconstruction (post-op)",
    aliases: ["ACLR", "ACL surgery rehab"],
    severity: "severe",
    description: "Post-surgical rehab after ACL autograft or allograft reconstruction.",
    typicalRecoveryWeeks: [24, 48],
    phases: {
      acute: {
        goals: ["Protect graft", "Full passive knee extension", "Control swelling", "Quad activation"],
        exercises: [
          { name: "Quad sets", description: "Supine, contract quad pushing knee into extension, hold 5s", sets: 3, reps: 10, frequency: "hourly", contraindications: ["increased pain"], progressionCriterion: "Visible quad contraction" },
          { name: "Ankle pumps", description: "Active ankle dorsiflexion/plantarflexion", sets: 1, reps: 20, frequency: "hourly", contraindications: ["calf pain - DVT check"], progressionCriterion: "Maintain circulation" },
          { name: "Passive knee extension", description: "Heel prop on towel, relax into extension 10min", sets: 3, reps: 1, frequency: "3x daily", contraindications: ["excessive pain"], progressionCriterion: "0° passive extension" },
          { name: "Heel slides", description: "Supine, slide heel toward buttock pain-free", sets: 3, reps: 15, frequency: "3x daily", contraindications: ["open incisions"], progressionCriterion: "90° knee flexion" }
        ],
        restrictions: ["No open-chain knee extension 90-0°", "NWB per protocol", "No driving 2-4 weeks", "No running/jumping"],
        milestone: "Full passive extension, quad control, flexion >90°"
      },
      subacute: {
        goals: ["Full knee ROM", "Normal gait", "Closed-chain strengthening"],
        exercises: [
          { name: "Stationary bike", description: "Adjust seat height, pedal backwards then forwards", sets: 1, reps: 1, frequency: "daily", contraindications: ["pain cycling"], progressionCriterion: "Full revolution standard seat" },
          { name: "Mini-squats", description: "Bilateral squat 0-45°, WBAT", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain >3/10"], progressionCriterion: "3x15 to 60°" },
          { name: "SLR all planes", description: "Supine, sidelying, prone leg raises", sets: 3, reps: 10, frequency: "daily", contraindications: ["quad lag"], progressionCriterion: "No quad lag" },
          { name: "Standing weight shifts", description: "Shift weight to surgical leg, hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["unstable gait"], progressionCriterion: "SL stance >10s" }
        ],
        restrictions: ["No open-chain knee extension 90-30°", "No pivoting", "No running/jumping"],
        milestone: "Full ROM, normal gait, SL stance >30s"
      },
      rehab: {
        goals: ["LSI >70% strength", "Single-leg loading", "Running progression"],
        exercises: [
          { name: "SL squats", description: "SL squat to 60°, knee over toe", sets: 3, reps: 10, frequency: "daily", contraindications: ["valgus collapse"], progressionCriterion: "3x10 to 90°" },
          { name: "Lunges", description: "Forward and lateral lunges controlled", sets: 3, reps: 10, frequency: "daily", contraindications: ["instability"], progressionCriterion: "Walking lunges 1.5x BW" },
          { name: "SL leg press", description: "SL press 0-90°, moderate load", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "LSI >80%" },
          { name: "Balance drills", description: "SL stance on unstable surface, eyes closed", sets: 3, reps: 1, frequency: "daily", contraindications: ["fear/instability"], progressionCriterion: ">30s eyes closed" }
        ],
        restrictions: ["No sport-specific training", "No reactive cutting"],
        milestone: "LSI >70% strength, pain-free running 20min"
      },
      strength: {
        goals: ["LSI >90% strength", "Plyometrics", "Agility drills"],
        exercises: [
          { name: "Barbell squat", description: "Full squat progressive loading", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["pain/fear"], progressionCriterion: "1.5x BW squat" },
          { name: "SL RDL", description: "SL Romanian deadlift, hip hinge", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["balance"], progressionCriterion: "LSI >90%" },
          { name: "Box jumps", description: "30-50cm box, soft landing", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["landing asymmetry"], progressionCriterion: "Equal ground contact time" },
          { name: "Agility ladder", description: "Carioca and ladder drills full speed", sets: 4, reps: 1, frequency: "3x/week", contraindications: ["pain lateral movement"], progressionCriterion: "Full speed no hesitation" }
        ],
        restrictions: ["No sport scrimmage/contact", "Monitor swelling"],
        milestone: "LSI >90% strength and hop tests"
      },
      "return-to-sport": {
        goals: ["Pass RTS testing", "Sport-specific practice"],
        exercises: [
          { name: "Full sport drills", description: "Simulated game situations with contact", sets: 5, reps: 10, frequency: "3x/week", contraindications: ["pain/swelling"], progressionCriterion: "Full practice completion" },
          { name: "Hop testing", description: "Single, triple, crossover, 6m timed hop", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain/landing asymmetry"], progressionCriterion: "LSI >90% all hops" },
          { name: "Reactive cutting", description: "Unanticipated cutting with defender stimuli", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["hesitation"], progressionCriterion: "Full-speed cuts without compensation" }
        ],
        restrictions: ["No consecutive high intensity days", "No tournament play until clearance"],
        milestone: "Medical clearance for full return"
      }
    },
    contraindicatedExercises: ["open-chain knee extension early", "deep squat >90° before 12 weeks", "heavy plyos before week 16"],
    returnCriteria: [
      "LSI >90% isokinetic quad/hamstring at 60°/s and 300°/s",
      "LSI >90% single, triple, crossover hop tests",
      "Pain/effusion-free during sport simulation",
      "LESS score <6 on movement screening",
      "IKDC/KOOS >90th percentile age-matched",
      "Surgeon clearance"
    ]
  }),

  p({
    id: "knee-pfps",
    zone: "knees", diagnosis: "Patellofemoral pain syndrome",
    aliases: ["PFPS", "runner's knee", "anterior knee pain"],
    severity: "mild",
    description: "Anterior knee pain aggravated by squatting, running, stairs, or prolonged sitting.",
    typicalRecoveryWeeks: [4, 8],
    phases: {
      acute: {
        goals: ["Reduce pain", "Normalize tissue mobility", "Activate inhibited muscles"],
        exercises: [
          { name: "Isometric quad at 60°", description: "Hold isometric quad contraction at 60°, 10s", sets: 4, reps: 10, frequency: "2x daily", contraindications: ["pain"], progressionCriterion: "Pain-free holds" },
          { name: "Glute activation prone", description: "Prone hip extension with glute squeeze", sets: 3, reps: 15, frequency: "daily", contraindications: ["low back pain"], progressionCriterion: "Visible glute contraction" },
          { name: "Patellar mobs", description: "Superior/inferior patellar glides pain-free", sets: 2, reps: 10, frequency: "2x daily", contraindications: ["sharp pain"], progressionCriterion: "Improved patellar mobility" }
        ],
        restrictions: ["Avoid deep squats >60°", "Reduce running 50%", "Avoid prolonged sitting bent"],
        milestone: "Pain-free isometric quad, reduced resting pain"
      },
      subacute: {
        goals: ["Restore quad/hip strength", "Normalize patellar tracking", "Closed-chain exercises"],
        exercises: [
          { name: "Lateral step-ups", description: "Lateral step-up 10-20cm box controlled", sets: 3, reps: 12, frequency: "daily", contraindications: ["valgus collapse"], progressionCriterion: "3x12 from 25cm box" },
          { name: "Wall squats with ball", description: "Ball between knees, hold at 45° 30s", sets: 3, reps: 5, frequency: "daily", contraindications: ["anterior knee pain"], progressionCriterion: "60° wall squat 60s" },
          { name: "Side-lying hip abduction", description: "Leg raise with slight ER, neutral pelvis", sets: 3, reps: 15, frequency: "daily", contraindications: ["hip pain"], progressionCriterion: "3x15 with 5kg weight" },
          { name: "Banded clamshells", description: "Side-lying clam with band above knees", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15 heavy band" }
        ],
        restrictions: ["Run every other day", "No downhill running", "No impact"],
        milestone: "Pain-free squat to 90°"
      },
      rehab: {
        goals: ["Full range loading", "Running reintegration", "Single-leg stability"],
        exercises: [
          { name: "SL squat progression", description: "SL squat on box, knee tracks over 2nd toe", sets: 3, reps: 10, frequency: "daily", contraindications: ["valgus"], progressionCriterion: "SL squat to 90° no valgus" },
          { name: "Lunge variations", description: "Forward, reverse, lateral lunges", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["knee pain"], progressionCriterion: "Pain-free each direction" },
          { name: "Walk-jog progression", description: "1min jog/4min walk, progress duration", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["pain during/after"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No jump training", "10% rule volume increase"],
        milestone: "Pain-free 30min run, full ROM strength"
      },
      strength: {
        goals: ["Full LE strength", "Sport-specific loading"],
        exercises: [
          { name: "Barbell back squat", description: "Full depth squat progressive", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain at any depth"], progressionCriterion: "1.5x BW squat" },
          { name: "Bulgarian split squat", description: "Rear foot elevated, knee alignment focus", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 BW each leg" },
          { name: "Drop jumps", description: "Step off 20-30cm box, immediate jump", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain/fear"], progressionCriterion: "Equal landing bilaterally" }
        ],
        restrictions: ["Monitor day-after symptoms"],
        milestone: "Full strength sport without pain"
      },
      "return-to-sport": {
        goals: ["Full sport integration", "Prevention adherence"],
        exercises: [
          { name: "Sport-specific simulation", description: "Full intensity practice unrestricted", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Full training completion" },
          { name: "Agility and cutting", description: "COD at game speed", sets: 4, reps: 8, frequency: "2x/week", contraindications: ["pain/hesitation"], progressionCriterion: "Full speed no symptoms" }
        ],
        restrictions: ["Continue prevention 2x/week"],
        milestone: "Full sport return unrestricted"
      }
    },
    contraindicatedExercises: ["deep squat heavy load early", "running through sharp pain", "plyos before adequate strength"],
    returnCriteria: [
      "Pain-free sport training 2 weeks",
      "Normalized dynamic knee valgus on movement screen",
      "Quad/hip strength LSI >90%",
      "Pain-free squat full depth 1x BW",
      "Patient confident during sport"
    ]
  }),

  p({
    id: "knee-it-band-syndrome",
    zone: "knees", diagnosis: "IT band syndrome",
    aliases: ["ITBS", "runner's knee lateral", "iliotibial band friction syndrome"],
    severity: "mild",
    description: "Lateral knee pain from IT band friction over lateral femoral epicondyle, common in runners/cyclists.",
    typicalRecoveryWeeks: [4, 8],
    phases: {
      acute: {
        goals: ["Reduce lateral pain", "Release IT band/TFL", "Identify training errors"],
        exercises: [
          { name: "IT band foam rolling", description: "Side-lying, roll from hip to above knee", sets: 2, reps: 1, frequency: "2x daily", contraindications: ["direct lateral knee rolling"], progressionCriterion: "Reduced tenderness" },
          { name: "TFL release", description: "Lacrosse ball to TFL/proximal IT band 90s", sets: 2, reps: 1, frequency: "2x daily", contraindications: ["increased pain"], progressionCriterion: "Reduced tension" },
          { name: "Isometric hip abduction", description: "Side-lying hold at 30° abduction 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "Pain-free holds" }
        ],
        restrictions: ["Reduce running 50-75%", "No downhill", "Avoid painful arc squats/lunges"],
        milestone: "Pain-free walking and ADLs"
      },
      subacute: {
        goals: ["Strengthen glute med/max", "Correct movement patterns", "Gradual return to running"],
        exercises: [
          { name: "Side-lying hip abduction", description: "Leg slightly behind midline, raise 30° with ER", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15 with 5lb weight" },
          { name: "Lateral band walks", description: "Mini-band above knees, squat position, lateral steps", sets: 3, reps: 12, frequency: "daily", contraindications: ["valgus collapse"], progressionCriterion: "3x12 steps heavy band" },
          { name: "SL bridges", description: "Supine single-leg bridge with glute squeeze", sets: 3, reps: 12, frequency: "daily", contraindications: ["hamstring cramping"], progressionCriterion: "3x12 each side" },
          { name: "Walk-run progression", description: "3min walk/1min run, every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return of lateral pain"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["≤10% weekly mileage increase", "No speed work", "Avoid cambered surfaces"],
        milestone: "Pain-free 20min run and daily activities"
      },
      rehab: {
        goals: ["Full hip strength", "SL dynamic control", "Training load optimization"],
        exercises: [
          { name: "SL squat hip control", description: "SL squat avoid hip drop, maintain knee alignment", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["Trendelenburg"], progressionCriterion: "3x10 to 90°" },
          { name: "Lateral lunge", description: "Lateral lunge chest up, push through heel", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["knee pain"], progressionCriterion: "3x10 each direction" },
          { name: "Hip thrusts", description: "Barbell hip thrusts hold at top 2s", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["low back pain"], progressionCriterion: "SL hip thrust 1x BW" },
          { name: "Gait retraining", description: "Focus on cadence 170-180 steps/min, midfoot strike", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["pain running"], progressionCriterion: "Consistent cadence" }
        ],
        restrictions: ["Limit downhill <15% weekly volume"],
        milestone: "Pain-free running prior volume"
      },
      strength: {
        goals: ["Sport-specific power", "LSI >95%", "Prevention integration"],
        exercises: [
          { name: "Weighted lunges all directions", description: "Forward, reverse, lateral with dumbbells", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 at 50% BW" },
          { name: "SL RDL", description: "SL Romanian deadlift with kettlebell", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["balance"], progressionCriterion: "3x8 BW each leg" },
          { name: "Box jumps low", description: "20-30cm box, soft landing", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["lateral knee pain"], progressionCriterion: "Equal landing bilaterally" }
        ],
        restrictions: ["Maintain hip program 2x/week"],
        milestone: "Full sport-specific strength no pain"
      },
      "return-to-sport": {
        goals: ["Pain-free sport", "Load management education", "Prevention strategy"],
        exercises: [
          { name: "Sport-specific drills full", description: "Full intensity practice including competition simulation", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain/compensation"], progressionCriterion: "Full practice no pain" },
          { name: "Speed and agility", description: "Sprinting, cutting, sport agility max effort", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain high speed"], progressionCriterion: "Max effort no symptoms" }
        ],
        restrictions: ["Continue hip prevention indefinitely"],
        milestone: "Full sport return no restrictions"
      }
    },
    contraindicatedExercises: ["deep squat with valgus", "heavy leg press knees collapsing", "running on banked surfaces"],
    returnCriteria: [
      "Pain-free running prior volume and intensity",
      "Glute med strength LSI >95%",
      "Normal movement screen no compensation",
      "Pain-free sport-specific movements",
      "Training load within appropriate range"
    ]
  }),

  p({
    id: "knee-meniscus-tear",
    zone: "knees", diagnosis: "Meniscus tear",
    aliases: ["torn meniscus", "cartilage tear", "meniscal injury"],
    severity: "moderate",
    description: "Injury to medial or lateral meniscus from twisting/loading. Can be traumatic or degenerative.",
    typicalRecoveryWeeks: [4, 16],
    phases: {
      acute: {
        goals: ["Reduce effusion", "Maintain extension", "Protect meniscus", "Quad activation"],
        exercises: [
          { name: "Quad sets", description: "Supine towel under knee, quad sets", sets: 3, reps: 15, frequency: "3x daily", contraindications: ["increased pain"], progressionCriterion: "Visible quad contraction" },
          { name: "Heel props", description: "Heel on towel, relax into extension 10min", sets: 3, reps: 1, frequency: "3x daily", contraindications: ["mechanical block pain"], progressionCriterion: "0° extension" },
          { name: "Heel slides pain-free", description: "Active knee flexion pain-free range only", sets: 3, reps: 15, frequency: "3x daily", contraindications: ["sharp pain"], progressionCriterion: "Flexion >90°" }
        ],
        restrictions: ["No squat >60°", "No deep bending/kneeling", "No twisting/pivoting", "No running/jumping"],
        milestone: "Reduced effusion, full extension, quad control"
      },
      subacute: {
        goals: ["Full ROM", "Normal gait", "Closed-chain strengthening safe ROM"],
        exercises: [
          { name: "Stationary bike high seat", description: "Raised seat, pedal back then forward", sets: 1, reps: 1, frequency: "daily", contraindications: ["pain cycling"], progressionCriterion: "Full circle standard seat" },
          { name: "Mini-squats 0-45°", description: "Partial squats pain-free range", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain/clicking"], progressionCriterion: "3x15 to 60°" },
          { name: "SLR multi-plane", description: "Supine, sidelying, prone no rotation at knee", sets: 3, reps: 12, frequency: "daily", contraindications: ["quad lag"], progressionCriterion: "3x12 no lag" }
        ],
        restrictions: ["No loaded deep flexion", "No rotation", "No impact"],
        milestone: "Full ROM, normal gait, pain-free mini-squats"
      },
      rehab: {
        goals: ["Full ROM strengthening", "Controlled rotation loading", "Proprioception"],
        exercises: [
          { name: "Squat progression 0-90°", description: "Gradual depth increase, monitor symptoms", sets: 3, reps: 12, frequency: "daily", contraindications: ["joint line pain"], progressionCriterion: "Full squat no pain" },
          { name: "Forward lunges", description: "Controlled sagittal plane lunges", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["rotational pain"], progressionCriterion: "3x10 each direction" },
          { name: "SL stance perturbations", description: "Manual perturbations challenge stability", sets: 3, reps: 10, frequency: "daily", contraindications: ["joint instability"], progressionCriterion: "Stable moderate perturbations" }
        ],
        restrictions: ["Avoid loaded end-range flexion >120°"],
        milestone: "Pain-free full squat, controlled lunges"
      },
      strength: {
        goals: ["Full LE strength", "LSI >85%", "Sport-specific loading"],
        exercises: [
          { name: "Barbell back squat", description: "Full squat progressive load, monitor symptoms", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["joint line pain"], progressionCriterion: "1.25x BW squat" },
          { name: "SL leg press", description: "SL press full ROM 0-100°", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain/grinding"], progressionCriterion: "LSI >85%" },
          { name: "Straight-line jog", description: "Walk-jog progression to continuous run", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["pain/swelling after"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No cutting/pivoting until cleared"],
        milestone: "LSI >85%, pain-free running"
      },
      "return-to-sport": {
        goals: ["Pass functional testing", "Sport-specific training safe"],
        exercises: [
          { name: "Sport-specific drills", description: "Full intensity with cutting, pivoting", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain/swelling"], progressionCriterion: "Full practice no reaction" },
          { name: "Figure-8 running", description: "Decreasing radius 10m to 3m", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain turning"], progressionCriterion: "Tight figure-8s full speed" },
          { name: "Hop testing", description: "Single, triple, crossover, 6m timed", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain/hesitation"], progressionCriterion: "LSI >85% all tests" }
        ],
        restrictions: ["Monitor swelling after high load"],
        milestone: "Full medical clearance for sport"
      }
    },
    contraindicatedExercises: ["kneeling full flexion weight-bearing", "loaded rotational early", "high-impact before adequate strength"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "No effusion after activity",
      "Full pain-free ROM",
      "LSI >85% isokinetic strength and hop tests",
      "No mechanical symptoms (catching/locking)",
      "Physician/surgeon clearance"
    ]
  }),

  // ===== SHOULDERS =====

  p({
    id: "shoulder-rotator-cuff-strain",
    zone: "shoulders", diagnosis: "Rotator cuff strain",
    aliases: ["RC strain", "supraspinatus strain", "rotator cuff tendinitis"],
    severity: "moderate",
    description: "Strain of rotator cuff muscles, common in overhead athletes and laborers.",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce pain/inflammation", "Pain-free ROM", "Scapular control"],
        exercises: [
          { name: "Pendulums", description: "Lean forward, gentle arm circles", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["increased pain"], progressionCriterion: "Pain-free full circles" },
          { name: "Scapular retractions", description: "Squeeze shoulder blades together hold 5s", sets: 3, reps: 15, frequency: "3x daily", contraindications: ["upper trap overactivity"], progressionCriterion: "Strong without compensation" },
          { name: "AAROM forward elevation", description: "Supine, assist arm to 120° with dowel", sets: 3, reps: 12, frequency: "2x daily", contraindications: ["sharp pain"], progressionCriterion: "Active elevation to 120°" }
        ],
        restrictions: ["No overhead lifting", "No throwing", "No sleeping on affected shoulder"],
        milestone: "Pain-free at rest, improved active ROM"
      },
      subacute: {
        goals: ["Full active ROM", "Eccentric RC loading", "Scapular stability"],
        exercises: [
          { name: "Full can scaption", description: "Thumbs up, raise in scapular plane to 90°", sets: 3, reps: 12, frequency: "daily", contraindications: ["painful arc 60-120°"], progressionCriterion: "Pain-free scaption to 90°" },
          { name: "Side-lying ER", description: "Towel under arm, ER with light dumbbell", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain during ER"], progressionCriterion: "3x12 with 3kg" },
          { name: "Prone rows", description: "Row with scapular retraction on incline bench", sets: 3, reps: 12, frequency: "daily", contraindications: ["shoulder pain"], progressionCriterion: "3x12 moderate load" }
        ],
        restrictions: ["No overhead sports", "No maximal throwing", "Avoid heavy pushing/pulling"],
        milestone: "Full pain-free ROM, strength 4/5 MMT"
      },
      rehab: {
        goals: ["Progressive RC strengthening", "Sport-specific preparation", "Plyometrics"],
        exercises: [
          { name: "Cable ER standing", description: "Elbow 90°, cable ER slow eccentric", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["pain end range"], progressionCriterion: "3x15 moderate resistance" },
          { name: "Push-up progression", description: "Wall to incline to full push-ups scapular focus", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain during descent"], progressionCriterion: "Full floor push-ups 3x15" },
          { name: "Thrower's ten initiation", description: "Basic shoulder program for overhead athletes", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Complete basic level" }
        ],
        restrictions: ["Limit throwing volume", "Monitor impingement signs"],
        milestone: "Strength 5/5, pain-free sport-specific movements"
      },
      strength: {
        goals: ["Max strength", "Sport-specific power", "Eccentric control end ranges"],
        exercises: [
          { name: "Heavy cable ER", description: "Heavy cable ER, slow eccentrics", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "4x8 at 70% 1RM" },
          { name: "Plyometric chest pass", description: "Medicine ball chest pass explosive", sets: 3, reps: 10, frequency: "2x/week", contraindications: ["shoulder pain catch"], progressionCriterion: "Explosive no pain" },
          { name: "Prone I-Y-T", description: "Prone raises in I,Y,T patterns", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain at any position"], progressionCriterion: "3x8 each pattern" }
        ],
        restrictions: ["No competition-level throwing"],
        milestone: "Full strength, sport-specific power"
      },
      "return-to-sport": {
        goals: ["Sport-specific training pain-free", "Pass functional testing", "Prevention education"],
        exercises: [
          { name: "Interval throwing program", description: "Progressive throwing 30ft to distance", sets: 1, reps: 1, frequency: "5x/week", contraindications: ["shoulder pain"], progressionCriterion: "Complete program no pain" },
          { name: "Overhead sport simulation", description: "Full intensity overhead movements", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain/compensation"], progressionCriterion: "Full practice no pain" },
          { name: "Upper quarter functional test", description: "CKCUEST, Y-balance UQ", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90% all tests" }
        ],
        restrictions: ["Continue prevention 2-3x/week", "Monitor throwing volume"],
        milestone: "Medical clearance full sport participation"
      }
    },
    contraindicatedExercises: ["heavy overhead press early", "full dips", "pull-ups acute/subacute", "behind-neck press"],
    returnCriteria: [
      "Pain-free sport-specific training 2 weeks",
      "Isometric strength LSI >90%",
      "ER/IR ratio normal for sport",
      "Pain-free full ROM",
      "Pass functional UE testing battery",
      "Completed interval throwing program"
    ]
  }),

  p({
    id: "shoulder-impingement",
    zone: "shoulders", diagnosis: "Shoulder impingement",
    aliases: ["subacromial impingement", "shoulder impingement syndrome", "swimmer's shoulder"],
    severity: "mild",
    description: "Compression of subacromial structures during shoulder elevation, especially 60-120° arc.",
    typicalRecoveryWeeks: [4, 10],
    phases: {
      acute: {
        goals: ["Reduce subacromial irritation", "Pain-free ROM", "Correct scapular positioning"],
        exercises: [
          { name: "Pain-free pendulums", description: "Gentle circles no weight, pain-free only", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain"], progressionCriterion: "Full circles no pain" },
          { name: "Scapular setting", description: "Retract and depress scapulae, hold 5s no hiking", sets: 3, reps: 15, frequency: "3x daily", contraindications: ["upper trap overactivity"], progressionCriterion: "Maintain during arm movement" },
          { name: "Posterior capsule stretch", description: "Cross-arm adduction hold 30s gentle", sets: 3, reps: 1, frequency: "3x daily", contraindications: ["posterior pain"], progressionCriterion: "Improved ROM" },
          { name: "Thoracic extension foam roller", description: "Supine on roller T4-T8, arms overhead", sets: 3, reps: 10, frequency: "daily", contraindications: ["back pain"], progressionCriterion: "Improved T-spine extension" }
        ],
        restrictions: ["No overhead activities", "No reaching behind body", "Avoid sleeping arm overhead"],
        milestone: "Pain-free at rest, reduced ADL pain"
      },
      subacute: {
        goals: ["Pain-free overhead ROM", "Scapular stability", "RC loading neutral"],
        exercises: [
          { name: "Wall slides", description: "Arms slide up wall in scapular plane", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain during ascent"], progressionCriterion: "Full overhead wall slide" },
          { name: "Prone rows", description: "Dumbbell rows with full scapular retraction", sets: 3, reps: 12, frequency: "daily", contraindications: ["shoulder pain retraction"], progressionCriterion: "3x12 moderate dumbbell" },
          { name: "Side-lying ER light", description: "Light dumbbell ER, towel under arm", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain end range"], progressionCriterion: "3x15 pain-free" }
        ],
        restrictions: ["No heavy overhead lifting", "No throwing", "Limit impingement arc exercises"],
        milestone: "Pain-free active ROM 0-180° elevation"
      },
      rehab: {
        goals: ["Full RC strength", "Functional overhead loading", "Sport-specific patterns"],
        exercises: [
          { name: "Cable ER/IR at 0°", description: "Cable rotation at side, controlled eccentrics", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x15 moderate cable" },
          { name: "Full can 0-90°", description: "Scaption to 90° with weight", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["impingement pain"], progressionCriterion: "3x12 to 90° with weight" },
          { name: "Incline push-ups", description: "Push-ups on incline, scapular control", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["pain descent"], progressionCriterion: "3x15 lower incline" },
          { name: "Lat pulldown front", description: "Wide grip front pulldown, avoid behind neck", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["shoulder pain"], progressionCriterion: "3x12 75% BW" }
        ],
        restrictions: ["No heavy overhead press", "Avoid extreme ranges under load"],
        milestone: "Pain-free overhead loading, full RC strength"
      },
      strength: {
        goals: ["Max strength/power", "Sport-specific overhead capacity"],
        exercises: [
          { name: "DB overhead press", description: "Standing press neutral grip controlled", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain press"], progressionCriterion: "4x8 pre-injury load" },
          { name: "Pull-ups controlled", description: "Controlled pull-ups full ROM", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["shoulder pain"], progressionCriterion: "3x8 BW" },
          { name: "MB overhead throw", description: "Overhead medicine ball throw explosive", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain explosive"], progressionCriterion: "Explosive no pain" }
        ],
        restrictions: ["Gradual return to competition intensity"],
        milestone: "Full strength/power no pain"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Load management education"],
        exercises: [
          { name: "Full sport skills", description: "Full overhead movements competition intensity", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain overhead"], progressionCriterion: "Full practice no pain" },
          { name: "Functional UE testing", description: "CKCUEST, Y-balance UQ, seated MB throw", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: ">90% normative values" }
        ],
        restrictions: ["Continue scapular/RC 2-3x/week"],
        milestone: "Full return no restrictions"
      }
    },
    contraindicatedExercises: ["behind-neck press", "upright rows", "dips early rehab"],
    returnCriteria: [
      "Pain-free full ROM overhead",
      "Strength 5/5 MMT",
      "No painful arc during elevation",
      "Scapular dyskinesis resolved",
      "Pain-free 3 consecutive training sessions"
    ]
  }),

  p({
    id: "shoulder-dislocation",
    zone: "shoulders", diagnosis: "Shoulder dislocation",
    aliases: ["glenohumeral dislocation", "shoulder subluxation", "traumatic shoulder instability"],
    severity: "severe",
    description: "Traumatic glenohumeral dislocation (95% anterior). High recurrence risk in young athletes.",
    typicalRecoveryWeeks: [12, 24],
    phases: {
      acute: {
        goals: ["Protect capsulolabral structures", "Pain-free limited ROM", "Static stability"],
        exercises: [
          { name: "Pendulums no weight", description: "Very limited ROM, avoid abduction/ER", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain/apprehension"], progressionCriterion: "6-inch circles pain-free" },
          { name: "Sub-max isometrics neutral", description: "Isometric IR/ER at 20% max, 10s hold", sets: 3, reps: 10, frequency: "daily", contraindications: ["anterior pain ER"], progressionCriterion: "50% max pain-free" },
          { name: "AAROM forward elevation supine", description: "Assist to 90° only", sets: 3, reps: 12, frequency: "2x daily", contraindications: ["apprehension at 90°"], progressionCriterion: "Active elevation to 90°" }
        ],
        restrictions: ["Sling immobilization 2-4 weeks", "No ER past neutral", "No abduction >45°", "No driving 4-6w"],
        milestone: "Discontinue sling, pain-free basic ROM"
      },
      subacute: {
        goals: ["Full passive ROM", "Initiate RC strengthening", "Scapular stability", "Proprioception"],
        exercises: [
          { name: "AAROM progression", description: "Gradual FE (90→180°) and ER (0→45°)", sets: 3, reps: 12, frequency: "2x daily", contraindications: ["apprehension"], progressionCriterion: "Full PROM no apprehension" },
          { name: "Side-lying ER limited", description: "ER neutral to 30° max, light weight", sets: 3, reps: 15, frequency: "daily", contraindications: ["anterior pain"], progressionCriterion: "3x15 at 30° ER" },
          { name: "Prone rows scapular", description: "Rows emphasizing retraction and posterior cuff", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 moderate weight" },
          { name: "Supine proprioception", description: "Eyes closed, move arm to target positions", sets: 3, reps: 10, frequency: "daily", contraindications: ["apprehension"], progressionCriterion: "Accuracy within 5°" }
        ],
        restrictions: ["No combined abduction/ER", "No overhead lifting", "No throwing"],
        milestone: "Full PROM, no apprehension mid-range"
      },
      rehab: {
        goals: ["Full AROM", "RC strength 4+/5", "Dynamic stability", "Sport-specific patterns"],
        exercises: [
          { name: "Full can to 90°", description: "Scaption in scapular plane, pain/app-free", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["apprehension"], progressionCriterion: "3x12 to 90° with weight" },
          { name: "Cable ER/IR at 0°", description: "ER 0-45° controlled tempo", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["anterior pain ER"], progressionCriterion: "3x15 moderate resistance" },
          { name: "Incline push-ups", description: "Close hands, scapular stability focus", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["anterior stress"], progressionCriterion: "3x12 lower incline" },
          { name: "CKC UE weight shifts", description: "Quadruped weight shifts on unstable surface", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain WB"], progressionCriterion: "Stable weight shifts" }
        ],
        restrictions: ["Avoid 90° abd + max ER", "No contact/throwing sports"],
        milestone: "Pain-free full ROM, strength 4+/5"
      },
      strength: {
        goals: ["Full RC strength 5/5", "Sport-specific power", "End-range control", "Plyometrics"],
        exercises: [
          { name: "Cable ER/IR at 90/90", description: "ER and IR at 90° abduction, gradual", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["apprehension 90/90"], progressionCriterion: "IR/ER ratio 1.25:1" },
          { name: "Full floor push-ups", description: "Standard push-ups scapular control", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["anterior pain/instability"], progressionCriterion: "3x12 full push-ups" },
          { name: "MB deceleration drills", description: "Catch overhead throws, control deceleration", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["apprehension catch"], progressionCriterion: "Stable catch full speed" }
        ],
        restrictions: ["No contact sports", "Gradual overhead return"],
        milestone: "Full strength, power, confident shoulder"
      },
      "return-to-sport": {
        goals: ["Pass RTS testing", "No apprehension in sport", "Recurrence prevention"],
        exercises: [
          { name: "Interval throwing program", description: "30ft to full distance progressive", sets: 1, reps: 1, frequency: "5x/week", contraindications: ["apprehension/pain"], progressionCriterion: "Full distance no symptoms" },
          { name: "Full sport practice", description: "Full intensity sport no limitations", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["apprehension/instability"], progressionCriterion: "Full practice no symptoms" },
          { name: "Y-balance UQ test", description: "Upper quarter reach in 3 directions", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90%, composite >90% normative" }
        ],
        restrictions: ["Continue stability program indefinitely", "Consider bracing contact sports"],
        milestone: "Full medical clearance unrestricted"
      }
    },
    contraindicatedExercises: ["combined abduction+ER early", "behind-neck press", "heavy bench early"],
    returnCriteria: [
      "No apprehension/pain sport-specific",
      "Full pain-free ROM",
      "RC strength 5/5 bilateral",
      "LSI >90% isokinetic",
      "Pass functional UE battery",
      "Completed interval throwing program",
      "Surgeon clearance",
      "Patient confident in shoulder"
    ]
  }),

  p({
    id: "shoulder-labral-tear",
    zone: "shoulders", diagnosis: "Labral tear",
    aliases: ["SLAP tear", "superior labrum tear", "Bankart lesion", "glenoid labrum tear"],
    severity: "moderate",
    description: "Tear of glenoid labrum, most commonly superior (SLAP) or anterior-inferior (Bankart).",
    typicalRecoveryWeeks: [12, 24],
    phases: {
      acute: {
        goals: ["Protect labral tissue", "Reduce pain", "ROM within protected arc", "Muscle activation"],
        exercises: [
          { name: "Pendulums no weight", description: "Small circles avoiding rotational stress", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain/catching"], progressionCriterion: "No catching" },
          { name: "Sub-max isometrics", description: "Isometric shoulder extension/flexion/abd 20%", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain/clicking"], progressionCriterion: "50% max pain-free" },
          { name: "AAROM forward elevation", description: "Dowel assist to pain-free limit 90° max", sets: 3, reps: 12, frequency: "2x daily", contraindications: ["mechanical symptoms"], progressionCriterion: "Active elevation to 120°" },
          { name: "Scapular squeezes", description: "Squeeze blades together and depress 5s", sets: 3, reps: 15, frequency: "3x daily", contraindications: ["periscapular pain"], progressionCriterion: "Maintain during arm mvmt" }
        ],
        restrictions: ["No overhead lifting", "No throwing", "No pull-ups", "No heavy pushing"],
        milestone: "Pain-free at rest, basic ROM safe limits"
      },
      subacute: {
        goals: ["Full pain-free ROM", "RC strengthening", "Scapular stability", "Closed-chain activities"],
        exercises: [
          { name: "AAROM to AROM progression", description: "Gradual active ROM all planes", sets: 3, reps: 12, frequency: "daily", contraindications: ["catching/locking"], progressionCriterion: "Full AROM no mechanical symptoms" },
          { name: "Side-lying ER 0-45°", description: "Light DB, limit 45°, controlled tempo", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain/clicking ER"], progressionCriterion: "3x15 pain-free" },
          { name: "Prone rows scapular", description: "Rows scapular focus, avoid extension past neutral", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain retraction"], progressionCriterion: "3x12 moderate weight" },
          { name: "Quadruped weight shifts", description: "Gentle weight shifts forward/back/side", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain WB"], progressionCriterion: "Stable quadruped" }
        ],
        restrictions: ["No overhead lifting >5kg", "No ballistic movements", "No throwing"],
        milestone: "Full ROM, pain-free ADLs, no mechanical symptoms"
      },
      rehab: {
        goals: ["Full RC/periscapular strength", "Dynamic stability", "Sport-specific training"],
        exercises: [
          { name: "Cable ER/IR at 0°", description: "Cable ER/IR moderate resistance, controlled eccentrics", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["pain/clicking labrum"], progressionCriterion: "3x15 moderate-high" },
          { name: "Full can to 90°", description: "Scaption with weight pain-free", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain 60-120°"], progressionCriterion: "3x12 to 120°" },
          { name: "Incline push-ups", description: "Decreasing incline as strength improves", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain descent/ascent"], progressionCriterion: "3x12 lower incline" },
          { name: "Prone I-Y-T-W", description: "Raise arms in I,Y,T,W hold each 3s", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["pain any position"], progressionCriterion: "3x8 each full ROM" }
        ],
        restrictions: ["Limit overhead volume", "No end-range throws"],
        milestone: "Full strength, dynamic stability"
      },
      strength: {
        goals: ["Max strength/power", "End-range control", "Plyometric integration"],
        exercises: [
          { name: "DB shoulder press neutral", description: "Standing neutral grip press controlled", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain press"], progressionCriterion: "4x8 pre-injury load" },
          { name: "Pull-ups controlled", description: "Controlled, no kipping", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain/clicking"], progressionCriterion: "3x6 BW" },
          { name: "MB rotational throw", description: "Rotational throw with controlled deceleration", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain rotational"], progressionCriterion: "Explosive no pain" }
        ],
        restrictions: ["No competition throwing"],
        milestone: "Full strength, confident all positions"
      },
      "return-to-sport": {
        goals: ["Pass RTS battery", "Sport training no symptoms", "Long-term maintenance"],
        exercises: [
          { name: "Interval throwing program", description: "30→60→90→120→full distance progressive", sets: 1, reps: 1, frequency: "5x/week", contraindications: ["pain/clicking"], progressionCriterion: "Complete no symptoms" },
          { name: "Full sport training", description: "Full practice overhead, contact, competition simulation", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain/mechanical"], progressionCriterion: "Full practice no pain" },
          { name: "UE functional testing", description: "CKCUEST, Y-balance UQ, seated MB throw", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: ">90% LSI normative" }
        ],
        restrictions: ["Continue labral program 2-3x/week", "Monitor throwing volume"],
        milestone: "Full clearance unrestricted sport"
      }
    },
    contraindicatedExercises: ["heavy bench early", "dips before stability", "kipping pull-ups", "behind-neck press"],
    returnCriteria: [
      "No pain/clicking/catching sport-specific",
      "Full pain-free ROM",
      "RC strength 5/5",
      "LSI >90% isokinetic",
      "Pass functional UE battery",
      "Completed interval throwing",
      "Scapular dyskinesis resolved",
      "Patient confident"
    ]
  }),

  // ===== ELBOWS =====

  p({
    id: "elbow-tennis-elbow",
    zone: "elbows", diagnosis: "Tennis elbow (lateral epicondylitis)",
    aliases: ["lateral epicondylitis", "lateral elbow tendinopathy", "extensor tendinopathy"],
    severity: "mild",
    description: "Overuse tendinopathy of common extensor origin at lateral epicondyle (ECRB).",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce pain", "Unload tendon", "Pain-free ROM"],
        exercises: [
          { name: "Isometric wrist extension", description: "Forearm supported, isometric hold at neutral 30-60% max 45s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain >3/10"], progressionCriterion: "45s hold no pain" },
          { name: "Wrist flexor stretch", description: "Elbow extended, passively flex wrist, hold 30s", sets: 3, reps: 1, frequency: "3x daily", contraindications: ["increased lateral pain"], progressionCriterion: "Improved flexibility" },
          { name: "Forearm extensor release", description: "Lacrosse ball to extensor forearm 90s", sets: 2, reps: 1, frequency: "2x daily", contraindications: ["increased pain"], progressionCriterion: "Reduced tension" }
        ],
        restrictions: ["Avoid gripping activities", "No repetitive wrist extension resistance", "Modify technique"],
        milestone: "Pain-free at rest, reduced pain with gripping"
      },
      subacute: {
        goals: ["Eccentric extensor loading", "Wrist neuromuscular control", "Address kinetic chain"],
        exercises: [
          { name: "Eccentric wrist extension", description: "Assist up, 5s controlled eccentric lowering", sets: 3, reps: 15, frequency: "daily", contraindications: ["sharp pain eccentric"], progressionCriterion: "3x15 eccentric no pain" },
          { name: "Wrist curls flexion", description: "Light dumbbell wrist curls controlled", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 moderate weight" },
          { name: "Supination/pronation", description: "Light dumbbell supination and pronation", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain rotation"], progressionCriterion: "3x12 moderate weight" }
        ],
        restrictions: ["No explosive gripping", "No racquet sports/throwing", "No tools strong grip"],
        milestone: "Pain-free eccentric, improved grip strength"
      },
      rehab: {
        goals: ["Progressive eccentric", "Concentric loading", "Sport preparation", "Wrist endurance"],
        exercises: [
          { name: "Progressive eccentric wrist ext", description: "Increase weight, 5-7s eccentric phase", sets: 4, reps: 10, frequency: "daily", contraindications: ["pain eccentric"], progressionCriterion: "4x10 at 70% concentric max" },
          { name: "Grip strengthening putty", description: "Progressive grip with therapy putty", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["pain grip"], progressionCriterion: "Grip LSI >80%" },
          { name: "Shoulder/scapular program", description: "Rows, ER, scapular exercises for kinetic chain", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["none"], progressionCriterion: "Normalized shoulder mechanics" }
        ],
        restrictions: ["No full-effort racquet sports"],
        milestone: "Pain-free daily activities, improved grip"
      },
      strength: {
        goals: ["Full wrist/grip strength", "Sport-specific power", "Prevention program"],
        exercises: [
          { name: "Heavy eccentric wrist ext", description: "5s eccentric 2s concentric max tolerated", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain eccentric"], progressionCriterion: "Grip LSI >90%" },
          { name: "Wrist roller", description: "Wrist roller with plate, alternate flexion/extension", sets: 3, reps: 1, frequency: "2x/week", contraindications: ["pain rolling"], progressionCriterion: "Full roll 10kg" },
          { name: "Sport-specific gripping", description: "Racquet/throwing grip sub-max intensity", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Sport activity no pain" }
        ],
        restrictions: ["Gradual return to full intensity"],
        milestone: "Full strength, sport-specific tolerance"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Load management education"],
        exercises: [
          { name: "Sport-specific skills", description: "Gradual return to full sport, monitor symptoms", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of pain"], progressionCriterion: "Full competition no pain" },
          { name: "Interval sports program", description: "Progressive duration and intensity return", sets: 1, reps: 1, frequency: "per program", contraindications: ["pain"], progressionCriterion: "Full sport participation" }
        ],
        restrictions: ["Continue maintenance 2x/week", "Consider counterforce brace"],
        milestone: "Full sport participation no pain"
      }
    },
    contraindicatedExercises: ["heavy gripping acute", "repetitive wrist extension resistance acute"],
    returnCriteria: [
      "Pain-free sport-specific activity",
      "Grip strength LSI >90%",
      "Pain-free eccentric wrist extension full load",
      "Negative Thomsen test"
    ]
  }),

  p({
    id: "elbow-golfers-elbow",
    zone: "elbows", diagnosis: "Golfer's elbow (medial epicondylitis)",
    aliases: ["medial epicondylitis", "medial elbow tendinopathy", "flexor-pronator tendinopathy"],
    severity: "mild",
    description: "Overuse tendinopathy of common flexor origin at medial epicondyle.",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce medial elbow pain", "Unload flexor/pronator", "Pain-free ROM"],
        exercises: [
          { name: "Isometric wrist flexion", description: "Forearm supported, isometric flexion hold neutral 30-60% 45s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["medial pain >3/10"], progressionCriterion: "45s hold" },
          { name: "Wrist extensor stretch", description: "Elbow extended, pull wrist into flexion", sets: 3, reps: 1, frequency: "3x daily", contraindications: ["medial pain"], progressionCriterion: "Improved flexibility" },
          { name: "Pronator release", description: "Massage to pronator/flexors 90s", sets: 2, reps: 1, frequency: "2x daily", contraindications: ["increased pain"], progressionCriterion: "Reduced tension" }
        ],
        restrictions: ["Avoid gripping", "No golf/throwing/climbing", "No valgus stress"],
        milestone: "Pain-free at rest, improved light grip tolerance"
      },
      subacute: {
        goals: ["Eccentric flexor loading", "Forearm strength balance", "Address kinetic chain"],
        exercises: [
          { name: "Eccentric wrist flexion", description: "Assist wrist flexion, 5s controlled eccentric extension", sets: 3, reps: 15, frequency: "daily", contraindications: ["sharp medial pain eccentric"], progressionCriterion: "3x15 eccentric no pain" },
          { name: "Wrist extension strengthening", description: "Light dumbbell wrist extension balance", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain extension"], progressionCriterion: "3x12 moderate" },
          { name: "Pronation/supination", description: "Light weight pronation and supination", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain rotation"], progressionCriterion: "3x12 moderate" }
        ],
        restrictions: ["No golf/throwing", "No heavy gripping >50% max"],
        milestone: "Pain-free daily activities, improved strength"
      },
      rehab: {
        goals: ["Progressive eccentric/concentric", "Sport-specific preparation", "Full forearm strength"],
        exercises: [
          { name: "Progressive eccentric wrist flex", description: "Increase eccentric load, 5-7s eccentric", sets: 4, reps: 10, frequency: "daily", contraindications: ["pain eccentric"], progressionCriterion: "4x10 at 70% concentric max" },
          { name: "Supination strengthening", description: "Hammer supination emphasis eccentric", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain supination"], progressionCriterion: "3x12 moderate-heavy" },
          { name: "Sport-specific grip training", description: "Golf grip/throwing grip sub-max", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain grip"], progressionCriterion: "Sport grip no pain" }
        ],
        restrictions: ["No full-effort golf/throwing"],
        milestone: "Pain-free sport-specific movements"
      },
      strength: {
        goals: ["Full strength", "Sport-specific power", "Prevention integration"],
        exercises: [
          { name: "Heavy eccentric wrist flex", description: "Max load 5s eccentric 2s concentric", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Grip LSI >90%" },
          { name: "Wrist roller flexion", description: "Flexion focus wrist roller", sets: 3, reps: 1, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full roll 10kg" },
          { name: "Sport-specific training", description: "Golf/throwing/climbing progressive intensity", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["medial pain"], progressionCriterion: "Sport activity no pain" }
        ],
        restrictions: ["Gradual return to full intensity"],
        milestone: "Full strength, sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Load management education"],
        exercises: [
          { name: "Sport-specific full practice", description: "Full sport competition intensity", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of medial pain"], progressionCriterion: "Full practice no pain" },
          { name: "Interval sport program", description: "Structured return progressive volume", sets: 1, reps: 1, frequency: "per program", contraindications: ["pain"], progressionCriterion: "Full sport participation" }
        ],
        restrictions: ["Continue maintenance 2x/week"],
        milestone: "Full sport return no pain"
      }
    },
    contraindicatedExercises: ["full-effort gripping acute", "valgus loading subacute", "hanging from bar early"],
    returnCriteria: [
      "Pain-free sport-specific activity",
      "Grip strength LSI >90%",
      "Pain-free eccentric wrist flexion full load",
      "Negative resisted wrist flexion test"
    ]
  }),

  p({
    id: "elbow-ucl-sprain",
    zone: "elbows", diagnosis: "UCL sprain",
    aliases: ["UCL injury", "ulnar collateral ligament sprain", "Tommy John injury"],
    severity: "moderate",
    description: "Sprain of ulnar collateral ligament from repetitive valgus stress in throwing athletes.",
    typicalRecoveryWeeks: [8, 16],
    phases: {
      acute: {
        goals: ["Reduce pain", "Protect UCL from valgus stress", "Pain-free ROM", "Muscle activation"],
        exercises: [
          { name: "Sub-max isometrics wrist/elbow", description: "Isometric wrist flex/ext, pronation/supination 20% max", sets: 3, reps: 10, frequency: "daily", contraindications: ["medial elbow pain"], progressionCriterion: "Pain-free isometrics" },
          { name: "AAROM elbow/forearm", description: "Active-assisted elbow FE, forearm pro/sup", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["pain end range"], progressionCriterion: "Full pain-free ROM" },
          { name: "Grip strengthening putty", description: "Gentle pain-free grip squeezes", sets: 3, reps: 15, frequency: "daily", contraindications: ["medial pain grip"], progressionCriterion: "Pain-free grip" }
        ],
        restrictions: ["No throwing", "No valgus stress", "No heavy lifting elbow >30°", "No push-ups/bench"],
        milestone: "Pain-free at rest, full elbow ROM"
      },
      subacute: {
        goals: ["Strengthen dynamic stabilizers", "Shoulder/scapular stability", "Proprioception"],
        exercises: [
          { name: "Wrist flexion/extension light", description: "Light wrist curls flex/ext controlled", sets: 3, reps: 15, frequency: "daily", contraindications: ["medial pain flexion"], progressionCriterion: "3x15 moderate weight" },
          { name: "Forearm pronation/supination", description: "Light dumbbell pro/sup pain-free", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain rotation"], progressionCriterion: "3x15 moderate" },
          { name: "Shoulder ER/IR strengthening", description: "Cable ER/IR moderate resistance posterior cuff", sets: 3, reps: 15, frequency: "daily", contraindications: ["shoulder pain"], progressionCriterion: "Full shoulder strength" }
        ],
        restrictions: ["No throwing strict", "No valgus stress", "No bench/push-ups"],
        milestone: "Pain-free ADLs, full strength non-valgus positions"
      },
      rehab: {
        goals: ["Progressive UE strengthening", "Low valgus loading", "Sport-specific patterns"],
        exercises: [
          { name: "Eccentric wrist flexion FCU", description: "Eccentric wrist flexion for FCU dynamic stabilization", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["medial pain"], progressionCriterion: "3x15 heavy" },
          { name: "Incline push-ups wide grip", description: "Wide grip to reduce valgus stress", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["medial pain"], progressionCriterion: "3x12 lower incline" },
          { name: "Prone rows moderate", description: "Rows moderate weight scapular focus", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 heavy" },
          { name: "MB deceleration", description: "Catch partner throw, control deceleration", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["medial pain catch"], progressionCriterion: "Confident catch full speed" }
        ],
        restrictions: ["No full-effort throwing", "Limited valgus", "Continue avoiding valgus sports"],
        milestone: "Pain-free strengthening, ready for interval throwing"
      },
      strength: {
        goals: ["Max elbow dynamic stabilizer strength", "Full UE strength", "Begin interval throwing"],
        exercises: [
          { name: "Thrower's ten advanced", description: "Full program moderate-heavy resistance", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["medial pain/instability"], progressionCriterion: "Complete full program" },
          { name: "DB overhead press neutral", description: "Neutral grip press controlled", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain full extension"], progressionCriterion: "4x8 pre-injury load" },
          { name: "Interval throwing phase 1", description: "30-45ft 50% effort flat ground", sets: 1, reps: 1, frequency: "alternate days", contraindications: ["medial pain during/after"], progressionCriterion: "Complete phase 1" }
        ],
        restrictions: ["No consecutive throwing days", "No mound until flat ground done"],
        milestone: "Phase 1 throwing complete, full strength"
      },
      "return-to-sport": {
        goals: ["Complete interval program", "Pass RTS testing", "Reinjury prevention education"],
        exercises: [
          { name: "Interval throwing full", description: "Flat ground to mound, 50-100% effort, progressive distance/volume", sets: 1, reps: 1, frequency: "alternate days per program", contraindications: ["medial pain/instability/decreased velocity"], progressionCriterion: "Complete full program no symptoms" },
          { name: "Full sport practice", description: "Full throwing/overhead sport competition intensity", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain/decreased performance"], progressionCriterion: "Full practice no pain" },
          { name: "Isokinetic forearm testing", description: "Elbow flex/ext isokinetic test", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90%" }
        ],
        restrictions: ["Follow pitch count guidelines", "No back-to-back high intensity throwing"],
        milestone: "Medical clearance full sport return"
      }
    },
    contraindicatedExercises: ["full-effort throwing acute/subacute", "heavy bench early", "dips early", "valgus activities early"],
    returnCriteria: [
      "Pain-free interval throwing full distance/effort",
      "No medial elbow pain/instability sport-specific",
      "Full pain-free elbow ROM",
      "LSI >90% isokinetic flexion/extension",
      "Grip LSI >90%",
      "Completed full interval program",
      "Thrower's ten pre-injury level",
      "Surgeon clearance"
    ]
  }),

  // ===== BACK / SPINE =====

  p({
    id: "back-lumbar-strain",
    zone: "back", diagnosis: "Lumbar strain",
    aliases: ["lumbar sprain", "mechanical back pain", "low back strain"],
    severity: "mild",
    description: "Acute strain of lumbar paraspinal muscles from sudden loading or awkward lifting.",
    typicalRecoveryWeeks: [2, 6],
    phases: {
      acute: {
        goals: ["Reduce pain/muscle spasm", "Active ROM within tolerance", "Prevent deconditioning"],
        exercises: [
          { name: "Cat-camel", description: "Quadruped alternate flexion/extension spine pain-free", sets: 2, reps: 15, frequency: "2x daily", contraindications: ["sharp pain"], progressionCriterion: "Smooth full ROM" },
          { name: "Supine pelvic tilts", description: "Posterior tilt flatten back, hold 5s", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["increased back pain"], progressionCriterion: "Pelvic control" },
          { name: "Double knee to chest", description: "Pull both knees to chest, hold 20s", sets: 3, reps: 5, frequency: "2x daily", contraindications: ["sharp back pain"], progressionCriterion: "Pain-free mobilization" },
          { name: "Diaphragmatic breathing", description: "Supine deep breathing engage diaphragm", sets: 1, reps: 10, frequency: "3x daily", contraindications: ["none"], progressionCriterion: "Regular practice" }
        ],
        restrictions: ["No heavy lifting >5kg", "No bending at waist", "No twisting under load", "No sitting >30min"],
        milestone: "Pain ≤2/10, ADLs with minimal limitation"
      },
      subacute: {
        goals: ["Full pain-free ROM", "Core stabilization", "Neuromuscular control", "Movement pattern correction"],
        exercises: [
          { name: "Partial curl-ups", description: "Chin tucked, lift head/shoulders controlled", sets: 3, reps: 10, frequency: "daily", contraindications: ["neck/back pain"], progressionCriterion: "3x15 no compensation" },
          { name: "Quadruped leg raises", description: "Extend one leg, maintain neutral spine", sets: 3, reps: 10, frequency: "daily", contraindications: ["back pain extension"], progressionCriterion: "3x10 stable" },
          { name: "Side planks knee down", description: "Knee down plank 15-30s neutral spine", sets: 3, reps: 3, frequency: "daily", contraindications: ["shoulder/hip pain"], progressionCriterion: "Full side plank 30s" },
          { name: "Standing hip hinges", description: "Hinge at hips, keep spine neutral", sets: 3, reps: 12, frequency: "daily", contraindications: ["back pain hinge"], progressionCriterion: "Full ROM no back flexion" }
        ],
        restrictions: ["No heavy lifting without mechanics", "No loaded twisting"],
        milestone: "Pain-free ADLs, good core control"
      },
      rehab: {
        goals: ["Full core strength/endurance", "Load tolerance", "Proper mechanics under load"],
        exercises: [
          { name: "Full planks", description: "Prone plank 30-60s neutral spine", sets: 3, reps: 3, frequency: "daily", contraindications: ["back pain plank"], progressionCriterion: "3x60s plank" },
          { name: "Bird-dog full", description: "Alternate opposite arm/leg, neutral spine", sets: 3, reps: 10, frequency: "daily", contraindications: ["balance/back pain"], progressionCriterion: "3x10 stable" },
          { name: "Dead bug", description: "Supine arm/leg alternate reach, core braced", sets: 3, reps: 10, frequency: "daily", contraindications: ["back pain"], progressionCriterion: "3x10 full control" },
          { name: "Goblet squats light", description: "Kettlebell goblet squat, neutral spine", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["back pain squat"], progressionCriterion: "3x12 increasing load" }
        ],
        restrictions: ["Avoid maximal lifting", "No contact sports/high impact"],
        milestone: "Full core endurance, pain-free lifting >50% BW"
      },
      strength: {
        goals: ["Max strength/power", "Sport-specific capacity", "Prevention integration"],
        exercises: [
          { name: "Barbell back squat", description: "Full squat progressive loading", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["back pain squat"], progressionCriterion: "1.5x BW squat" },
          { name: "Conventional deadlift", description: "Hip hinge neutral spine progressive", sets: 3, reps: 5, frequency: "1-2x/week", contraindications: ["back pain/mechanics"], progressionCriterion: "1.5x BW deadlift" },
          { name: "MB rotational throws", description: "Rotational throws controlled power", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["back pain rotation"], progressionCriterion: "Explosive no pain" }
        ],
        restrictions: ["Monitor for pain recurrence", "Maintain core program"],
        milestone: "Full strength no pain, sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Load management education"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity practice including running/jumping/cutting", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of back pain"], progressionCriterion: "Full practice no pain" },
          { name: "Agility and plyometrics", description: "Sport agility COD work", sets: 4, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full intensity no pain" }
        ],
        restrictions: ["Continue core maintenance 2-3x/week"],
        milestone: "Full sport return unrestricted"
      }
    },
    contraindicatedExercises: ["full sit-ups", "heavy deadlifts early rehab", "loaded rotation acute/subacute", "double leg raises supine"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free lumbar ROM",
      "Core endurance >60s side plank, >90s prone plank",
      "Pain-free 1.5x BW deadlift",
      "Normal movement pattern during sport",
      "No morning stiffness/pain"
    ]
  }),

  p({
    id: "back-disc-bulge-herniation",
    zone: "spine", diagnosis: "Disc bulge/herniation",
    aliases: ["herniated disc", "slipped disc", "lumbar radiculopathy", "sciatica"],
    severity: "moderate",
    description: "Disc herniation most commonly L4-L5 or L5-S1 causing radicular pain and possible neurological symptoms.",
    typicalRecoveryWeeks: [6, 16],
    phases: {
      acute: {
        goals: ["Reduce radicular pain", "Centralize symptoms", "Protect disc", "Neural mobility"],
        exercises: [
          { name: "Prone lying", description: "Lie prone 3-5min, pillows if needed", sets: 1, reps: 1, frequency: "3-5x daily", contraindications: ["increased leg pain prone"], progressionCriterion: "Prone no leg pain" },
          { name: "Press-up extensions (McKenzie)", description: "Prone prop on elbows, then full press-up hold 10s", sets: 3, reps: 10, frequency: "6-8x daily", contraindications: ["peripheralization"], progressionCriterion: "Symptom centralization" },
          { name: "Standing back extensions", description: "Stand extend backward, hands on low back, hold 5s", sets: 3, reps: 10, frequency: "hourly", contraindications: ["increased leg pain"], progressionCriterion: "Pain-free extension" },
          { name: "Sciatic nerve glides seated", description: "Extend knee with ankle dorsiflexed, flex/extend neck", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["sharp pain tension"], progressionCriterion: "Improved neural mobility" }
        ],
        restrictions: ["No sitting >20min", "No bending/lifting", "No heavy lifting >2kg", "No flexion exercises"],
        milestone: "Pain centralized to back, reduced intensity"
      },
      subacute: {
        goals: ["Maintain centralization", "Lumbar stability", "Controlled loading neutral spine"],
        exercises: [
          { name: "Quadruped leg raises neutral", description: "Maintain neutral spine lift leg behind, no arch", sets: 3, reps: 10, frequency: "daily", contraindications: ["leg pain extension"], progressionCriterion: "3x10 stable" },
          { name: "Cat-camel pain-free", description: "Avoid end-range flexion, symptom-free ROM", sets: 3, reps: 10, frequency: "daily", contraindications: ["peripheralization"], progressionCriterion: "Smooth no pain" },
          { name: "Bridging double leg", description: "Neutral spine bridge hold 5s", sets: 3, reps: 12, frequency: "daily", contraindications: ["back pain extension"], progressionCriterion: "3x12 SL progression" }
        ],
        restrictions: ["Avoid sustained flexion", "No loaded flexion", "Gradual sitting increase"],
        milestone: "No radicular symptoms, sitting >30min"
      },
      rehab: {
        goals: ["Full core stabilization", "Loaded movement patterns", "Sport-specific preparation"],
        exercises: [
          { name: "Plank prone and side", description: "30-60s planks neutral spine", sets: 3, reps: 3, frequency: "daily", contraindications: ["back pain extension"], progressionCriterion: "Prone 90s, side 60s" },
          { name: "Dead bugs all variations", description: "Progress leg only to arm/leg to resistance", sets: 3, reps: 10, frequency: "daily", contraindications: ["back pain"], progressionCriterion: "3x10 with band" },
          { name: "Goblet squats progressive", description: "Neutral spine, increase load as tolerated", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["leg pain squat"], progressionCriterion: "3x12 50% BW" },
          { name: "Walking progression", description: "Increase duration, focus on posture", sets: 1, reps: 1, frequency: "daily", contraindications: ["leg pain walking"], progressionCriterion: "45min pain-free" }
        ],
        restrictions: ["No maximal lifting", "No loaded flexion", "No high-impact"],
        milestone: "Pain-free loaded squats, full core endurance"
      },
      strength: {
        goals: ["Full LE strength", "Sport-specific loading", "Symptom-free under load"],
        exercises: [
          { name: "Barbell squat progressive", description: "Neutral spine progressive, monitor symptoms", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["radicular return"], progressionCriterion: "1.25x BW squat" },
          { name: "Romanian deadlift neutral", description: "Light-moderate RDL, hip hinge neutral spine", sets: 3, reps: 10, frequency: "2x/week", contraindications: ["leg pain hinge"], progressionCriterion: "RDL at BW" },
          { name: "Lunges multi-plane", description: "Forward/lateral/reverse controlled descent", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain lunge"], progressionCriterion: "3x8 each DB" }
        ],
        restrictions: ["Avoid max deadlifts until cleared"],
        milestone: "Full strength no symptoms"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Disc health education", "Prevention/load management"],
        exercises: [
          { name: "Full sport practice", description: "Full intensity with running/cutting/jumping/contact", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of leg/back pain"], progressionCriterion: "Full practice no symptoms" },
          { name: "Plyometric progression", description: "Low to high intensity plyometrics gradually", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["symptom return"], progressionCriterion: "Full plyometric activity" }
        ],
        restrictions: ["Maintain core program indefinitely", "No prolonged sitting without breaks"],
        milestone: "Full clearance for sport"
      }
    },
    contraindicatedExercises: ["loaded flexion (bent rows, good mornings)", "full sit-ups", "toe touches", "heavy deadlifts poor form"],
    returnCriteria: [
      "No radicular pain/neurological symptoms",
      "Centralized symptoms",
      "Full lumbar ROM no provocation",
      "Core endurance >60s side plank, >90s prone plank",
      "Pain-free squat/hinge 1.25x BW",
      "Normal neurological exam",
      "Sport-specific activity no symptom return"
    ]
  }),

  p({
    id: "back-si-joint-dysfunction",
    zone: "back", diagnosis: "SI joint dysfunction",
    aliases: ["sacroiliac joint dysfunction", "SI joint pain", "sacroiliitis"],
    severity: "moderate",
    description: "Pain arising from sacroiliac joint, typically unilateral referring to buttock/groin/posterior thigh.",
    typicalRecoveryWeeks: [4, 10],
    phases: {
      acute: {
        goals: ["Reduce SI pain", "Improve lumbopelvic alignment", "Reduce muscle guarding", "Identify contributors"],
        exercises: [
          { name: "Supine SI self-mob", description: "Pelvic tilts posterior/anterior find neutral", sets: 2, reps: 10, frequency: "2x daily", contraindications: ["increased pain"], progressionCriterion: "Pelvic neutral awareness" },
          { name: "Piriformis stretch supine", description: "Cross affected leg over opposite knee, pull to chest 30s", sets: 3, reps: 1, frequency: "2x daily", contraindications: ["increased SI pain"], progressionCriterion: "Reduced tension" },
          { name: "Isometric glute squeezes", description: "Squeeze glutes hold 10s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["SI pain contraction"], progressionCriterion: "Strong glute contraction" }
        ],
        restrictions: ["Avoid single-leg standing", "No running/jumping", "Avoid crossing legs sitting"],
        milestone: "Reduced resting pain, pelvic alignment awareness"
      },
      subacute: {
        goals: ["Lumbopelvic stability", "Glute max/med strength", "Symmetrical weight-bearing"],
        exercises: [
          { name: "Bridging glute focus", description: "Supine bridge, glute squeeze hold 5s", sets: 3, reps: 15, frequency: "daily", contraindications: ["SI pain at top"], progressionCriterion: "3x15 SL bridges" },
          { name: "Banded clamshells", description: "Side-lying band above knees, glute activation", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15 heavy band" },
          { name: "Side-lying hip abduction", description: "Top leg slightly behind midline, raise 30°", sets: 3, reps: 12, frequency: "daily", contraindications: ["SI pain lift"], progressionCriterion: "3x12 ankle weight" },
          { name: "Quadruped leg raises", description: "Lift leg behind, level pelvis no rotation", sets: 3, reps: 10, frequency: "daily", contraindications: ["SI pain/instability"], progressionCriterion: "3x10 stable pelvis" }
        ],
        restrictions: ["No SL hops/jumps", "No running", "No prolonged standing one leg"],
        milestone: "Pain-free ADLs, symmetrical standing"
      },
      rehab: {
        goals: ["Full lumbopelvic stability", "SL loading tolerance", "Running progression"],
        exercises: [
          { name: "SL bridges", description: "Supine single-leg bridge glute squeeze", sets: 3, reps: 12, frequency: "daily", contraindications: ["SI pain/cramping"], progressionCriterion: "3x12 each side" },
          { name: "Lateral band walks", description: "Mini-band above ankles, lateral steps", sets: 3, reps: 12, frequency: "daily", contraindications: ["SI pain/valgus"], progressionCriterion: "3x12 steps each direction" },
          { name: "Split squats", description: "Bulgarian split squat controlled pelvic alignment", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["SI/knee pain"], progressionCriterion: "3x10 BW each leg" },
          { name: "Walk-jog progression", description: "3min walk/1min jog to continuous jog", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return SI pain"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["Avoid high-impact", "No sprinting/cutting"],
        milestone: "Pain-free SL loading and running"
      },
      strength: {
        goals: ["Full LE strength symmetry", "Sport-specific power"],
        exercises: [
          { name: "Barbell squat controlled", description: "Symmetrical loading, pelvic control", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["SI pain descent"], progressionCriterion: "1.25x BW symmetrical" },
          { name: "SL RDL", description: "SL deadlift dumbbell, pelvic stability", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["SI pain hinge"], progressionCriterion: "3x8 symmetrical" },
          { name: "Lateral lunges", description: "Lateral lunge controlled descent level pelvis", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["SI pain lateral"], progressionCriterion: "3x8 each leg" }
        ],
        restrictions: ["Asymmetrical loading with caution"],
        milestone: "Full strength symmetry, pain-free plyometrics"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Load management education"],
        exercises: [
          { name: "Sport-specific training", description: "Full practice running/cutting/jumping", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return SI pain"], progressionCriterion: "Full practice no pain" },
          { name: "Agility drills sport-specific", description: "COD drills game speed", sets: 4, reps: 8, frequency: "2x/week", contraindications: ["pain cutting"], progressionCriterion: "Full speed no pain" }
        ],
        restrictions: ["Continue glute maintenance 2-3x/week"],
        milestone: "Full sport return no symptoms"
      }
    },
    contraindicatedExercises: ["SL hops acute/subacute", "deep squats pelvic asymmetry", "heavy deadlifts pelvic rotation"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "No SI pain with SL loading",
      "Symmetrical pelvic position functional movements",
      "Glute med/max LSI >90%",
      "Pain-free running prior volume"
    ]
  }),

  p({
    id: "back-facet-joint-syndrome",
    zone: "spine", diagnosis: "Facet joint syndrome",
    aliases: ["facet joint dysfunction", "lumbar facet syndrome", "facet arthropathy"],
    severity: "mild",
    description: "Pain from lumbar facet joints worsened by extension, rotation, or prolonged postures.",
    typicalRecoveryWeeks: [4, 8],
    phases: {
      acute: {
        goals: ["Reduce facet irritation", "Avoid extension/rotation", "Pain-free flexion", "Identify aggravators"],
        exercises: [
          { name: "Knee to chest double/single", description: "Pull knees to chest open facets hold 20s", sets: 3, reps: 5, frequency: "2x daily", contraindications: ["increased back pain"], progressionCriterion: "Pain-free" },
          { name: "Seated flexion", description: "Seated flex forward slide hands down legs 15s", sets: 3, reps: 5, frequency: "2x daily", contraindications: ["discogenic pain"], progressionCriterion: "Improved flexion ROM" },
          { name: "Cat-camel flexion emphasis", description: "Quadruped emphasize flexion phase", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["pain flexion"], progressionCriterion: "Smooth no pain" },
          { name: "Posterior pelvic tilts", description: "Supine posterior tilt flatten back 5s", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["increased pain"], progressionCriterion: "Pelvic control" }
        ],
        restrictions: ["Avoid extension activities", "No rotational loading", "No prolonged standing", "No overhead pressing"],
        milestone: "Pain reduced, flexion activities comfortable"
      },
      subacute: {
        goals: ["Spinal mobility flexion/rotation", "Core stabilization flexion bias", "Hip mobility"],
        exercises: [
          { name: "Seated trunk rotations", description: "Cross arms rotate trunk pain-free hold 5s", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain rotation"], progressionCriterion: "Increased ROM no pain" },
          { name: "Child's pose", description: "Kneeling sit back on heels arms extended 30s", sets: 3, reps: 3, frequency: "2x daily", contraindications: ["knee/hip limits"], progressionCriterion: "Relaxed full flexion" },
          { name: "Partial curl-ups", description: "Chin tuck lift head/shoulders low load", sets: 3, reps: 10, frequency: "daily", contraindications: ["neck pain"], progressionCriterion: "3x15 no strain" },
          { name: "Hip flexor stretch half-kneeling", description: "Half-kneeling hip flexor stretch 30s", sets: 3, reps: 1, frequency: "daily", contraindications: ["hip pain"], progressionCriterion: "Improved hip extension" }
        ],
        restrictions: ["Avoid heavy extension exercises", "No overhead heavy press", "No running/impact"],
        milestone: "Pain-free flexion/rotation, improved postural awareness"
      },
      rehab: {
        goals: ["Full core endurance", "Progressive loading all planes", "Cautious extension loading"],
        exercises: [
          { name: "Plank prone and side", description: "30-60s planks neutral spine", sets: 3, reps: 3, frequency: "daily", contraindications: ["back pain plank"], progressionCriterion: "Prone 90s, side 60s" },
          { name: "Bird-dog", description: "Alternate opposite arm/leg neutral", sets: 3, reps: 10, frequency: "daily", contraindications: ["back pain"], progressionCriterion: "3x10 stable" },
          { name: "Goblet squats", description: "Parallel squat controlled tempo", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain squat"], progressionCriterion: "3x12 moderate weight" },
          { name: "Standing row with rotation", description: "Cable row with gentle trunk rotation", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain rotation"], progressionCriterion: "3x10 moderate" }
        ],
        restrictions: ["Avoid maximal overhead lifting", "No contact sports/impact"],
        milestone: "Tolerates extension/rotation, good core control"
      },
      strength: {
        goals: ["Full spine loading tolerance", "Sport-specific power"],
        exercises: [
          { name: "Barbell squat controlled", description: "Full squat moderate load controlled", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain extension loading"], progressionCriterion: "1.25x BW squat" },
          { name: "Farmer carries", description: "Heavy carries upright posture", sets: 3, reps: 1, frequency: "2x/week", contraindications: ["back pain carry"], progressionCriterion: "Carry 75% BW 40m" },
          { name: "MB rotational throws", description: "Rotational throws increasing power", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain rotation"], progressionCriterion: "Explosive no pain" },
          { name: "Trap bar deadlift light", description: "Trap bar deadlift moderate load neutral spine", sets: 3, reps: 6, frequency: "1-2x/week", contraindications: ["pain hinge"], progressionCriterion: "1.25x BW deadlift" }
        ],
        restrictions: ["Continue core maintenance"],
        milestone: "Full strength no pain"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Education on posture/body mechanics"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity practice all planes", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of pain"], progressionCriterion: "Full practice no pain" },
          { name: "Plyometric progression", description: "Gradual plyometric integration", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full plyometric activity" }
        ],
        restrictions: ["Maintain core flexibility program"],
        milestone: "Full sport return unrestricted"
      }
    },
    contraindicatedExercises: ["full extension back bends", "heavy overhead press acute", "loaded rotation acute"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free spinal ROM",
      "Core endurance >60s side plank, >90s prone plank",
      "Pain-free lift 1.25x BW",
      "Normal movement patterns"
    ]
  }),

  // ===== HIPS =====

  p({
    id: "hip-fai",
    zone: "hips", diagnosis: "Hip impingement (FAI)",
    aliases: ["femoroacetabular impingement", "FAI", "hip impingement", "cam impingement", "pincer impingement"],
    severity: "moderate",
    description: "Abnormal contact between femoral head-neck junction and acetabulum, causing labral and cartilage damage.",
    typicalRecoveryWeeks: [8, 16],
    phases: {
      acute: {
        goals: ["Reduce hip pain", "Improve hip ROM without impingement", "Unload irritated structures"],
        exercises: [
          { name: "Stationary bike high seat", description: "High seat position, pain-free range, low resistance", sets: 1, reps: 10, frequency: "daily", contraindications: ["increased hip pain"], progressionCriterion: "10min pain-free" },
          { name: "Supine hip circles", description: "Gentle hip circumduction with leg supported, pain-free only", sets: 2, reps: 10, frequency: "2x daily", contraindications: ["sharp groin pain"], progressionCriterion: "Full circles no pain" },
          { name: "Isometric hip abduction", description: "Standing or sidelying isometric hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "Pain-free holds" }
        ],
        restrictions: ["Avoid deep hip flexion >90°", "No squatting past parallel", "No prolonged sitting in low chairs"],
        milestone: "Pain-free walking, reduced resting pain"
      },
      subacute: {
        goals: ["Improve hip mobility in non-impingement ranges", "Strengthen hip stabilizers", "Address femoral control"],
        exercises: [
          { name: "Prone hip extension", description: "Prone hip extension neutral spine, glute squeeze", sets: 3, reps: 15, frequency: "daily", contraindications: ["hip flexor pain"], progressionCriterion: "3x15 strong glute" },
          { name: "Clamshells banded", description: "Side-lying band above knees, glute med focus", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15 heavy band" },
          { name: "Bridging single-leg", description: "Single-leg bridge glute squeeze at top", sets: 3, reps: 12, frequency: "daily", contraindications: ["SI pain"], progressionCriterion: "3x12 each side" },
          { name: "Standing hip hinge", description: "Hip hinge keeping spine neutral, to 30° forward lean", sets: 3, reps: 12, frequency: "daily", contraindications: ["groin pain hinge"], progressionCriterion: "3x12 full hinge" }
        ],
        restrictions: ["No deep squats", "No loaded hip flexion >90°", "No impact activities"],
        milestone: "Pain-free in mid-range activities, improved hip control"
      },
      rehab: {
        goals: ["Progress to full range loading", "Sport-specific preparation", "Address movement patterns"],
        exercises: [
          { name: "Goblet squat shallow to parallel", description: "Controlled squat to parallel, avoid impingement range", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain at depth"], progressionCriterion: "Parallel squat 50% BW" },
          { name: "Forward step-downs", description: "15-20cm box step-down, controlled descent", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["hip/groin pain"], progressionCriterion: "3x10 from 30cm" },
          { name: "Lateral band walks", description: "Mini-band above ankles, keep tension", sets: 3, reps: 12, frequency: "daily", contraindications: ["SI/lateral hip pain"], progressionCriterion: "3x12 heavy band" },
          { name: "Pool jogging", description: "Deep water jogging with belt, high cadence", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["hip pain"], progressionCriterion: "20min continuous" }
        ],
        restrictions: ["Avoid extreme hip flexion/rotation under load", "Limit prolonged sitting"],
        milestone: "Pain-free squat to parallel, controlled step-downs"
      },
      strength: {
        goals: ["Full LE strength", "Sport-specific loading", "LSI >90%"],
        exercises: [
          { name: "Barbell back squat", description: "Full squat progressive, monitor impingement signs", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain at depth"], progressionCriterion: "1.25x BW squat" },
          { name: "SL leg press", description: "SL press full ROM moderate-heavy", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "LSI >90%" },
          { name: "Lunges forward/reverse", description: "Controlled lunges with trunk control", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["hip pain lunge"], progressionCriterion: "3x8 each DB" },
          { name: "SL RDL", description: "SL RDL with dumbbell, hip hinge focus", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["groin pain hinge"], progressionCriterion: "3x8 each leg" }
        ],
        restrictions: ["Monitor for impingement with increased load"],
        milestone: "Full strength no impingement pain"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Education on maintaining hip health", "Prevention program"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport progressive", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of groin/hip pain"], progressionCriterion: "Full practice no pain" },
          { name: "Agility and cutting", description: "Sport-specific COD at game speed", sets: 4, reps: 8, frequency: "2x/week", contraindications: ["pain cutting"], progressionCriterion: "Full speed no pain" }
        ],
        restrictions: ["Continue hip maintenance program 2-3x/week"],
        milestone: "Full return to sport unrestricted"
      }
    },
    contraindicatedExercises: ["deep squats past parallel early", "loaded hip flexion >120°", "prolonged sitting with hip flexed"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free hip ROM in functional patterns",
      "LSI >90% LE strength",
      "Pain-free squat to full depth",
      "No groin/hip pain during cutting or sport"
    ]
  }),

  p({
    id: "hip-gluteal-tendinopathy",
    zone: "hips", diagnosis: "Gluteal tendinopathy",
    aliases: ["gluteus medius tendinopathy", "greater trochanteric pain syndrome", "lateral hip pain"],
    severity: "moderate",
    description: "Tendinopathy of gluteus medius and/or minimus tendons at greater trochanter, common in runners and females.",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce lateral hip pain", "Unload gluteal tendons", "Pain-free ROM", "Identify aggravators"],
        exercises: [
          { name: "Isometric hip abduction sidelying", description: "Side-lying isometric hold at 20° abduction 30s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["lateral hip pain >3/10"], progressionCriterion: "Pain-free 30s holds" },
          { name: "Supine glute squeezes", description: "Supine squeeze glutes together hold 10s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["SI pain"], progressionCriterion: "Strong glute contraction" },
          { name: "TFL release", description: "Lacrosse ball to TFL 90s per side", sets: 2, reps: 1, frequency: "2x daily", contraindications: ["increased pain"], progressionCriterion: "Reduced tension" }
        ],
        restrictions: ["Avoid side-lying on affected hip", "No single-leg stance activities", "Reduce running volume 50-75%"],
        milestone: "Pain-free walking, reduced lateral hip tenderness"
      },
      subacute: {
        goals: ["Begin eccentric gluteal loading", "Improve hip abductor strength", "Correct movement patterns"],
        exercises: [
          { name: "Side-lying hip abduction neutral", description: "Leg slightly behind midline, raise 30° with slight ER", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15 ankle weight" },
          { name: "Lateral band walks", description: "Mini-band above knees, squat position lateral steps", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 heavy band" },
          { name: "Bridging single-leg", description: "SL bridge with glute squeeze at top", sets: 3, reps: 12, frequency: "daily", contraindications: ["hamstring cramping"], progressionCriterion: "3x12 each side" },
          { name: "Clamshells banded", description: "Side-lying band above knees, clam shells", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15 heavy band" }
        ],
        restrictions: ["Avoid single-leg hopping/jumping", "No high impact"],
        milestone: "Pain-free ADLs, improved hip abductor strength"
      },
      rehab: {
        goals: ["Progressive gluteal loading", "SL dynamic control", "Running reintroduction"],
        exercises: [
          { name: "SL squat hip control", description: "SL squat to 45-60°, avoid hip drop", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["Trendelenburg/pain"], progressionCriterion: "3x10 to 60°" },
          { name: "Split squats", description: "Bulgarian split squat controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["hip pain"], progressionCriterion: "3x10 each leg" },
          { name: "Hip thrusts", description: "Barbell hip thrusts hold at top 2s glute squeeze", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["low back pain"], progressionCriterion: "SL hip thrust 1x BW" },
          { name: "Walk-jog progression", description: "3min walk/1min jog intervals", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return lateral hip pain"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No sprinting/hills", "Avoid cambered surfaces"],
        milestone: "Pain-free SL loading and running"
      },
      strength: {
        goals: ["Full hip strength LSI >90%", "Sport-specific power", "Prevention integration"],
        exercises: [
          { name: "Weighted lunges all directions", description: "Lunges with dumbbells multi-directional", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 each 50% BW" },
          { name: "SL RDL", description: "SL Romanian deadlift with kettlebell/dumbbell", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["balance"], progressionCriterion: "3x8 BW each leg" },
          { name: "Box jumps low", description: "Low box jumps 20-30cm soft landing", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["lateral hip pain landing"], progressionCriterion: "Equal bilaterally" }
        ],
        restrictions: ["Continue gluteal program 2x/week maintenance"],
        milestone: "Full hip strength sport-specific"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Load management education"],
        exercises: [
          { name: "Sport-specific drills full", description: "Full intensity sport practice including running/cutting", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return lateral hip pain"], progressionCriterion: "Full practice no pain" },
          { name: "Speed and agility", description: "Sprinting, cutting, agility max effort", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Max effort no symptoms" }
        ],
        restrictions: ["Continue hip abductor program indefinitely", "Address training errors"],
        milestone: "Full sport return no restrictions"
      }
    },
    contraindicatedExercises: ["SL hops acute", "running on cambered surfaces", "deep SL squats early"],
    returnCriteria: [
      "Pain-free running prior volume/intensity",
      "Hip abduction strength LSI >90%",
      "Normal Trendelenburg test",
      "Pain-free SL squat to 60°",
      "Pain-free sport-specific movements"
    ]
  }),

  p({
    id: "hip-bursitis",
    zone: "hips", diagnosis: "Hip bursitis",
    aliases: ["trochanteric bursitis", "greater trochanteric bursitis", "lateral hip bursitis"],
    severity: "mild",
    description: "Inflammation of the greater trochanteric bursa causing lateral hip pain, common in runners and side-sleepers.",
    typicalRecoveryWeeks: [3, 6],
    phases: {
      acute: {
        goals: ["Reduce bursal inflammation", "Unload lateral hip", "Pain-free ROM"],
        exercises: [
          { name: "Isometric hip abduction light", description: "Sidelying isometric abduction 20% max 20s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["sharp lateral pain"], progressionCriterion: "Pain-free holds" },
          { name: "Supine glute squeezes", description: "Squeeze glutes together hold 10s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["none"], progressionCriterion: "Strong contraction" },
          { name: "IT band foam rolling", description: "Side-lying roll from hip to above knee", sets: 2, reps: 1, frequency: "2x daily", contraindications: ["direct bursal pressure"], progressionCriterion: "Reduced tension" }
        ],
        restrictions: ["No direct pressure on bursa (sleep on back)", "No side-lying on affected side", "Reduce running volume"],
        milestone: "Reduced lateral hip pain at rest and walking"
      },
      subacute: {
        goals: ["Strengthen hip abductors", "Improve lumbopelvic control", "Gradual return to activity"],
        exercises: [
          { name: "Side-lying hip abduction light", description: "Leg raise 30°, slight ER, light weight", sets: 3, reps: 12, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x12 pain-free" },
          { name: "Clamshells banded", description: "Banded clamshells glute med focus", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x15 medium band" },
          { name: "Bridging double then single", description: "Bridges progressing to single-leg", sets: 3, reps: 12, frequency: "daily", contraindications: ["SI pain"], progressionCriterion: "3x12 SL" }
        ],
        restrictions: ["No high impact", "Limit walking on uneven terrain"],
        milestone: "Pain-free ADLs, improved abductor strength"
      },
      rehab: {
        goals: ["Full hip strength", "Sport-specific loading", "Return to full activity"],
        exercises: [
          { name: "SL squat to 45°", description: "SL squat partial range, controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["hip pain"], progressionCriterion: "3x10 to 60°" },
          { name: "Lateral band walks", description: "Mini-band lateral steps, squat position", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 heavy band" },
          { name: "Running progression", description: "Gradual return to running every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return lateral pain"], progressionCriterion: "30min continuous" }
        ],
        restrictions: ["Avoid sudden increases in running volume"],
        milestone: "Pain-free running and sport activities"
      },
      strength: {
        goals: ["Full LE strength", "Sport-specific power"],
        exercises: [
          { name: "Barbell squat", description: "Full squat progressive loading", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "1.25x BW squat" },
          { name: "Lunges", description: "Multi-directional lunges with DB", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 each" }
        ],
        restrictions: ["Continue maintenance abductor program"],
        milestone: "Full strength sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Education on prevention"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of pain"], progressionCriterion: "Full practice no pain" }
        ],
        restrictions: ["Address sleep posture", "Avoid hard surfaces when possible"],
        milestone: "Full return to sport"
      }
    },
    contraindicatedExercises: ["SL plyometrics early", "deep SL squat early", "direct pressure on bursa exercises"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Pain-free lateral hip with palpation",
      "Full hip strength LSI >90%",
      "Pain-free running prior volume"
    ]
  }),

  p({
    id: "hip-hamstring-origin-tendinopathy",
    zone: "hips", diagnosis: "Hamstring origin tendinopathy",
    aliases: ["proximal hamstring tendinopathy", "high hamstring tendinopathy", "ischial tuberosity tendinopathy"],
    severity: "moderate",
    description: "Tendinopathy of the proximal hamstring tendons at the ischial tuberosity, common in sprinters and hurdlers.",
    typicalRecoveryWeeks: [8, 16],
    phases: {
      acute: {
        goals: ["Reduce ischial pain", "Unload proximal hamstring", "Pain-free neural mobility"],
        exercises: [
          { name: "Isometric hamstring holds", description: "Prone knee flexion isometric at 30° 60% max 30s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["ischial pain >3/10"], progressionCriterion: "Pain-free 30s holds" },
          { name: "Sciatic nerve glides", description: "Seated knee extension with ankle dorsiflexion, neck flex/ext", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["sharp pain"], progressionCriterion: "Improved neural mobility" },
          { name: "Prone hip extension isometric", description: "Prone hip extension with knee bent, hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["ischial pain"], progressionCriterion: "Pain-free holds" }
        ],
        restrictions: ["No hamstring stretching", "Avoid end-range hip flexion with knee extended", "No sprinting", "Avoid prolonged sitting on hard surfaces"],
        milestone: "Pain-free isometric holds, reduced resting pain"
      },
      subacute: {
        goals: ["Begin eccentric hamstring loading", "Improve posterior chain strength", "Address pelvic control"],
        exercises: [
          { name: "Eccentric hamstring curls prone", description: "Prone hamstring curl, assist up 5s eccentric down", sets: 3, reps: 12, frequency: "daily", contraindications: ["sharp ischial pain"], progressionCriterion: "3x12 eccentric no pain" },
          { name: "Bridging with hamstring focus", description: "Supine bridge, march on heels, pull into bridge", sets: 3, reps: 12, frequency: "daily", contraindications: ["hamstring cramping"], progressionCriterion: "3x12" },
          { name: "SLR supine with neutral pelvis", description: "Supine straight leg raise, maintain posterior pelvic tilt", sets: 3, reps: 10, frequency: "daily", contraindications: ["back/ischial pain"], progressionCriterion: "3x10" }
        ],
        restrictions: ["No loaded hip flexion with knee extension", "No sprinting", "Limit end-range hamstring stretch"],
        milestone: "Pain-free eccentric curls, improved posterior chain"
      },
      rehab: {
        goals: ["Progressive eccentric loading", "Sport-specific preparation", "Return to running"],
        exercises: [
          { name: "Nordic hamstring eccentric", description: "Partner-anchored or Nordic board eccentric curl", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["ischial pain"], progressionCriterion: "3x8 controlled" },
          { name: "SL RDL", description: "SL Romanian deadlift light-moderate weight", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["balance/ischial pain"], progressionCriterion: "3x10 moderate" },
          { name: "Walk-jog progression", description: "Progressive walk to jog to run", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return ischial pain"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No sprinting", "No high-speed running"],
        milestone: "Pain-free eccentric loading, running reintroduced"
      },
      strength: {
        goals: ["Full hamstring strength LSI >90%", "Sport-specific power", "Speed preparation"],
        exercises: [
          { name: "Nordic hamstring heavy", description: "Full Nordic eccentric, heavy load", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["ischial pain"], progressionCriterion: "3x6 full range" },
          { name: "RDL conventional", description: "Bilateral RDL progressive loading", sets: 4, reps: 8, frequency: "2x/week", contraindications: ["pain hinge"], progressionCriterion: "1.25x BW RDL" },
          { name: "Straight-leg bridge walkouts", description: "Supine bridge walk feet away and back", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["hamstring cramping"], progressionCriterion: "3x8 controlled" }
        ],
        restrictions: ["No full-effort sprinting yet"],
        milestone: "Full strength ready for speed"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Speed and sprinting reintroduction", "Prevention education"],
        exercises: [
          { name: "Sport-specific training", description: "Full practice including sprinting", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["ischial pain"], progressionCriterion: "Full practice no pain" },
          { name: "Sprint progression", description: "50% to 100% speed progression", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain sprinting"], progressionCriterion: "Full speed no pain" },
          { name: "Change-of-direction drills", description: "Reactive COD at full speed", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain cutting"], progressionCriterion: "Full speed no pain" }
        ],
        restrictions: ["Continue eccentric hamstring maintenance 2x/week"],
        milestone: "Full clearance for sport participation"
      }
    },
    contraindicatedExercises: ["aggressive hamstring stretching acute", "SL toe touches", "full-effort sprinting early"],
    returnCriteria: [
      "Pain-free during sport-specific training including sprinting",
      "Hamstring strength LSI >90%",
      "Pain-free Nordic eccentric full range",
      "Pain-free SL RDL at BW",
      "No ischial tenderness to palpation"
    ]
  }),

  // ===== ANKLES =====

  p({
    id: "ankle-lateral-sprain",
    zone: "ankles", diagnosis: "Lateral ankle sprain",
    aliases: ["rolled ankle", "inversion ankle sprain", "ATFL injury", "ankle sprain"],
    severity: "moderate",
    description: "Inversion injury to lateral ankle ligaments, most commonly ATFL. Grade 1-2 presentation.",
    typicalRecoveryWeeks: [3, 8],
    phases: {
      acute: {
        goals: ["Reduce swelling/pain", "Protect ligaments", "Pain-free ROM", "Normalize gait"],
        exercises: [
          { name: "Ankle alphabet", description: "Trace alphabet with big toe, active ROM pain-free", sets: 1, reps: 26, frequency: "2x daily", contraindications: ["sharp pain"], progressionCriterion: "Full alphabet without pain" },
          { name: "Calf pump with towel", description: "Seated towel pull toward body, plantar/dorsiflexion", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["pain dorsiflexion"], progressionCriterion: "Improved ROM" },
          { name: "Isometric ankle eversion", description: "Manual resistance or wall, isometric eversion hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["lateral ankle pain"], progressionCriterion: "Pain-free isometrics" }
        ],
        restrictions: ["RICE protocol", "WBAT with crutches if needed", "No running/jumping", "Avoid inversion movements"],
        milestone: "Reduced swelling, partial weight-bearing pain-free"
      },
      subacute: {
        goals: ["Full pain-free ROM", "Begin strengthening", "Proprioception training", "Normal gait"],
        exercises: [
          { name: "Resistance band ankle eversion", description: "Band around foot, eversion against resistance", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral pain"], progressionCriterion: "3x15 moderate band" },
          { name: "Resistance band dorsiflexion/plantarflexion", description: "Band DF/PF controlled tempo", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x15 each" },
          { name: "SL stance on stable surface", description: "Single-leg stance 30s hold", sets: 3, reps: 3, frequency: "daily", contraindications: ["instability"], progressionCriterion: "SL stance 60s" },
          { name: "Calf raises bilateral", description: "Double-leg calf raise full ROM", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x15 full ROM" }
        ],
        restrictions: ["No jumping/hopping", "No running", "Avoid uneven surfaces"],
        milestone: "Full ROM, pain-free gait, SL stance >30s"
      },
      rehab: {
        goals: ["Full ankle strength", "Advanced proprioception", "Running progression", "Sport-specific prep"],
        exercises: [
          { name: "SL calf raises", description: "Single-leg calf raise full ROM", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain/instability"], progressionCriterion: "3x12 SL" },
          { name: "Resistance band inversion", description: "Band inversion to strengthen peroneals eccentrically", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["lateral pain"], progressionCriterion: "3x15 moderate band" },
          { name: "SL stance on foam pad", description: "SL stance on unstable surface, 30s", sets: 3, reps: 3, frequency: "daily", contraindications: ["instability"], progressionCriterion: "SL foam 30s eyes closed" },
          { name: "Walk-jog progression", description: "3min walk/1min jog to continuous jog", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "20min continuous" }
        ],
        restrictions: ["No cutting/pivoting", "No sports-specific drills yet"],
        milestone: "Pain-free running, full strength, good proprioception"
      },
      strength: {
        goals: ["Full LE strength", "Plyometric preparation", "Sport-specific power"],
        exercises: [
          { name: "SL hops stable surface", description: "SL hopping in place, soft landing", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain/instability"], progressionCriterion: "Pain-free controlled hops" },
          { name: "Lateral hops", description: "Side-to-side hopping controlled" , sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Equal bilaterally" },
          { name: "SL squat", description: "SL squat to 60°, controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain/instability"], progressionCriterion: "3x10 to 60°" }
        ],
        restrictions: ["No reactive cutting yet"],
        milestone: "Full LE strength, confident SL hops"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Pass functional testing", "Prevention education"],
        exercises: [
          { name: "Sport-specific drills", description: "Full practice including sprinting, cutting, jumping", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain/instability"], progressionCriterion: "Full practice no pain" },
          { name: "Figure-8 runs", description: "Figure-8 running decreasing radius", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full speed tight turns" },
          { name: "Hop test battery", description: "Single, triple, crossover hop LSI", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90% all tests" }
        ],
        restrictions: ["Continue proprioception program 2x/week", "Consider bracing for high-risk activities"],
        milestone: "Full medical clearance for sport"
      }
    },
    contraindicatedExercises: ["inversion exercises acute", "heavy plyometrics before full strength"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free ankle ROM",
      "LSI >90% ankle strength and hop tests",
      "SL stance >45s on unstable surface",
      "No feeling of instability during sport"
    ]
  }),

  p({
    id: "ankle-high-sprain",
    zone: "ankles", diagnosis: "High ankle sprain",
    aliases: ["syndesmosis sprain", "AITFL injury", "ankle syndesmosis injury"],
    severity: "moderate",
    description: "Injury to the distal tibiofibular syndesmosis from dorsiflexion and external rotation forces. Longer recovery than lateral sprains.",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce pain/swelling", "Protect syndesmosis", "Non-weight-bearing ROM", "Maintain proximal strength"],
        exercises: [
          { name: "Ankle alphabet non-WB", description: "Non-weight-bearing ankle circles/alphabet pain-free", sets: 1, reps: 26, frequency: "2x daily", contraindications: ["syndesmosis pain"], progressionCriterion: "Full pain-free ROM" },
          { name: "Isometric ankle plantar/dorsiflexion", description: "Manual isometric DF/PF at neutral 20% max", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain"], progressionCriterion: "Pain-free isometrics" },
          { name: "Knee and hip strengthening", description: "SLR, bridges, clam shells to prevent deconditioning", sets: 3, reps: 15, frequency: "daily", contraindications: ["none"], progressionCriterion: "Good proximal strength" }
        ],
        restrictions: ["NWB or PWB with boot/crutches", "No weight-bearing dorsiflexion", "No external rotation activities"],
        milestone: "Pain-free NWB ROM, reduced swelling"
      },
      subacute: {
        goals: ["Progressive weight-bearing", "Restore ROM", "Begin closed-chain exercises", "Proprioception"],
        exercises: [
          { name: "Seated ankle DF/PF active", description: "Seated active dorsiflexion/plantarflexion full ROM", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["syndesmosis pain DF"], progressionCriterion: "Full DF ROM" },
          { name: "Resistance band ankle four-way", description: "DF, PF, inversion, eversion with light band", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain in any direction"], progressionCriterion: "3x12 all directions" },
          { name: "Bilateral calf raises", description: "Double-leg calf raise full ROM", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x15 full ROM" },
          { name: "SL stance bilateral support", description: "SL stance holding support, progress to no hands", sets: 3, reps: 30, frequency: "daily", contraindications: ["pain/instability"], progressionCriterion: "SL stance 30s no hands" }
        ],
        restrictions: ["No running/jumping", "No external rotation loading", "Avoid forced dorsiflexion"],
        milestone: "Pain-free weight-bearing, improved ROM"
      },
      rehab: {
        goals: ["Full ankle strength", "Running reintroduction", "Sport-specific preparation", "Proprioception advanced"],
        exercises: [
          { name: "SL calf raises", description: "Single-leg calf raise full ROM", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 full ROM" },
          { name: "SL stance foam pad", description: "SL on foam pad 30s", sets: 3, reps: 3, frequency: "daily", contraindications: ["instability"], progressionCriterion: "SL foam 30s" },
          { name: "Walk-jog progression", description: "Progressive walk to jog to run", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["syndesmosis pain"], progressionCriterion: "20min continuous run" },
          { name: "Bilateral squat progression", description: "Bodyweight squat to 90° controlled", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 full squat" }
        ],
        restrictions: ["No cutting/pivoting", "No explosive movements"],
        milestone: "Pain-free running, full strength"
      },
      strength: {
        goals: ["Full LE strength LSI >90%", "Plyometric preparation"],
        exercises: [
          { name: "SL hops in place", description: "SL hopping, soft landing", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Pain-free hops" },
          { name: "Forward/backward hops", description: "Hopping forward and backward controlled", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["instability"], progressionCriterion: "Equal bilaterally" },
          { name: "SL squat", description: "SL squat to 60° controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 to 60°" }
        ],
        restrictions: ["No reactive COD", "Gradual plyometric progression"],
        milestone: "Full strength, confident plyometrics"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Pass testing battery", "Education on recurrence prevention"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity practice including cutting, pivoting, jumping", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["syndesmosis pain"], progressionCriterion: "Full practice no pain" },
          { name: "Reactive COD drills", description: "Unanticipated cutting and pivoting", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain/hesitation"], progressionCriterion: "Full speed confident" },
          { name: "Hop test battery", description: "Single, triple, crossover hops", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90% all tests" }
        ],
        restrictions: ["Continue proprioception 2x/week"],
        milestone: "Full clearance for sport"
      }
    },
    contraindicatedExercises: ["forced dorsiflexion acute", "external rotation loading early", "early sport-specific training"],
    returnCriteria: [
      "Pain-free sport-specific training including cutting/pivoting",
      "Full pain-free ankle ROM",
      "LSI >90% strength and hop tests",
      "External rotation stress test negative",
      "No syndesmosis pain with palpation or squeezing"
    ]
  }),

  p({
    id: "ankle-achilles-tendinopathy",
    zone: "ankles", diagnosis: "Achilles tendinopathy",
    aliases: ["Achilles tendonitis", "Achilles tendinosis", "mid-portion Achilles tendinopathy"],
    severity: "moderate",
    description: "Overuse tendinopathy of the Achilles tendon, common in running and jumping sports. Typically mid-portion.",
    typicalRecoveryWeeks: [8, 16],
    phases: {
      acute: {
        goals: ["Reduce tendon pain", "Unload Achilles", "Pain-free ROM", "Identify contributing factors"],
        exercises: [
          { name: "Isometric calf holds", description: "Standing isometric calf hold at 15° DF, 60% max 45s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["pain >3/10"], progressionCriterion: "Pain-free 45s holds" },
          { name: "Seated ankle ROM", description: "Active DF/PF pain-free range", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["pain with movement"], progressionCriterion: "Full pain-free ROM" },
          { name: "Stationary bike no resistance", description: "High seat, no resistance, pain-free cycling", sets: 1, reps: 10, frequency: "daily", contraindications: ["increased Achilles pain"], progressionCriterion: "10min pain-free" }
        ],
        restrictions: ["No running/jumping", "No plyometrics", "Reduce walking volume", "Avoid stretching in acute phase"],
        milestone: "Pain-free isometric holds, reduced resting pain"
      },
      subacute: {
        goals: ["Begin eccentric loading (heavy slow resistance)", "Improve calf strength", "Address kinetic chain"],
        exercises: [
          { name: "Heavy slow resistance calf raises", description: "Bilateral calf raise, 3s concentric, 3s eccentric, full ROM", sets: 4, reps: 8, frequency: "daily", contraindications: ["sharp Achilles pain"], progressionCriterion: "4x8 full ROM no pain" },
          { name: "Eccentric calf raise straight leg", description: "Straight leg eccentric, 5s lowering phase", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain during eccentric"], progressionCriterion: "3x15 no pain" },
          { name: "SL balance", description: "SL stance on stable surface 30s", sets: 3, reps: 3, frequency: "daily", contraindications: ["instability"], progressionCriterion: "SL >60s" }
        ],
        restrictions: ["No ballistic/stretching", "No running", "Avoid walking barefoot"],
        milestone: "Pain-free eccentric loading, improved calf endurance"
      },
      rehab: {
        goals: ["Progressive loading", "Running reintroduction", "Sport-specific preparation"],
        exercises: [
          { name: "SL calf raises heavy slow", description: "SL calf raise heavy resistance, controlled tempo", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x8 heavy no pain" },
          { name: "Eccentric SL calf raise", description: "SL eccentric 5-7s lowering phase", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 full ROM" },
          { name: "Walk-jog progression", description: "Walk to jog progression every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["Achilles pain"], progressionCriterion: "20min continuous run" },
          { name: "Squat progression", description: "Bodyweight to loaded squat controlled", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 moderate load" }
        ],
        restrictions: ["No sprinting", "No plyometrics", "Monitor morning stiffness"],
        milestone: "Pain-free running, full calf strength"
      },
      strength: {
        goals: ["Full LE strength LSI >90%", "Plyometric preparation", "Sport-specific power"],
        exercises: [
          { name: "SL calf raise heavy load", description: "SL heavy calf press or raise, max load", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "LSI >90%" },
          { name: "SL hops in place", description: "SL hopping soft landing", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["Achilles pain"], progressionCriterion: "Pain-free hops" },
          { name: "Box jumps low", description: "Low box jumps 20-30cm soft landing", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Equal bilaterally" }
        ],
        restrictions: ["No sprinting yet", "Progress plyometrics cautiously"],
        milestone: "Full strength, pain-free plyometrics"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Pass RTS testing", "Education on load management"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity practice including sprinting, jumping", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["Achilles pain"], progressionCriterion: "Full practice no pain" },
          { name: "Sprint progression", description: "50-100% effort sprint progression", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full speed no pain" },
          { name: "Hop test battery", description: "Single, triple, crossover hops LSI", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90% all tests" }
        ],
        restrictions: ["Continue heavy slow resistance 2x/week indefinitely", "Monitor morning stiffness as early warning"],
        milestone: "Full clearance for sport participation"
      }
    },
    contraindicatedExercises: ["aggressive stretching acute", "plyometrics before adequate strength", "running through sharp pain"],
    returnCriteria: [
      "Pain-free sport-specific training including sprinting/jumping",
      "Calf strength LSI >90%",
      "Pain-free SL calf raise full ROM heavy load",
      "Negative painful arc sign",
      "No morning stiffness >30s",
      "VISA-A score >90"
    ]
  }),

  p({
    id: "ankle-peroneal-tendinopathy",
    zone: "ankles", diagnosis: "Peroneal tendinopathy",
    aliases: ["peroneal tendonitis", "lateral ankle tendinopathy", "peroneus brevis tendinopathy"],
    severity: "mild",
    description: "Overuse tendinopathy of peroneus brevis/longus tendons posterior to lateral malleolus.",
    typicalRecoveryWeeks: [4, 8],
    phases: {
      acute: {
        goals: ["Reduce lateral ankle pain", "Unload peroneal tendons", "Pain-free ROM"],
        exercises: [
          { name: "Isometric ankle eversion", description: "Foot against stationary object, isometric eversion hold 30s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["lateral pain >3/10"], progressionCriterion: "Pain-free 30s holds" },
          { name: "Ankle alphabet", description: "Active ROM tracing alphabet pain-free", sets: 1, reps: 26, frequency: "2x daily", contraindications: ["pain"], progressionCriterion: "Full alphabet no pain" },
          { name: "Calf pump ankle pumps", description: "Seated ankle DF/PF pumps", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["pain"], progressionCriterion: "Pain-free" }
        ],
        restrictions: ["Reduce running volume", "No plyometrics", "Avoid inversion/eversion against resistance"],
        milestone: "Pain-free walking, reduced lateral ankle tenderness"
      },
      subacute: {
        goals: ["Begin eccentric peroneal loading", "Improve ankle stability", "Address training errors"],
        exercises: [
          { name: "Eccentric ankle eversion band", description: "Band eversion, assist up, 5s eccentric lowering", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral pain eccentric"], progressionCriterion: "3x15 no pain" },
          { name: "Resistance band DF/PF", description: "Four-way ankle band exercises", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 moderate band" },
          { name: "SL stance on stable surface", description: "SL stance 30s hold", sets: 3, reps: 3, frequency: "daily", contraindications: ["instability"], progressionCriterion: "SL >45s" }
        ],
        restrictions: ["No high-impact running", "Avoid uneven surfaces"],
        milestone: "Pain-free daily activities, improved eversion strength"
      },
      rehab: {
        goals: ["Full peroneal strength", "Running reintroduction", "Sport-specific preparation"],
        exercises: [
          { name: "Progressive eccentric eversion", description: "Increase band resistance, controlled eccentrics", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 heavy band" },
          { name: "SL stance foam pad", description: "SL on foam pad 30s progressing to eyes closed", sets: 3, reps: 3, frequency: "daily", contraindications: ["instability"], progressionCriterion: "SL foam eyes closed 30s" },
          { name: "Walk-jog progression", description: "Gradual return to running", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["lateral pain"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No cutting/pivoting", "No sprinting"],
        milestone: "Pain-free running, full eversion strength"
      },
      strength: {
        goals: ["Full LE strength", "Plyometric preparation"],
        exercises: [
          { name: "SL calf raises", description: "SL calf raise full ROM", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12" },
          { name: "SL hops in place", description: "SL hopping soft landing", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Pain-free hops" },
          { name: "Lateral hops", description: "Side-to-side hopping controlled", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Equal bilaterally" }
        ],
        restrictions: ["Gradual return to sport-specific training"],
        milestone: "Full strength, ready for sport"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Prevention education"],
        exercises: [
          { name: "Sport-specific drills", description: "Full practice including cutting, sprinting", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["lateral ankle pain"], progressionCriterion: "Full practice no pain" },
          { name: "Agility drills", description: "COD and sport-specific agility", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full speed no pain" }
        ],
        restrictions: ["Continue eccentric peroneal program 2x/week"],
        milestone: "Full return to sport"
      }
    },
    contraindicatedExercises: ["inversion resistance acute", "plyometrics before strength", "running through pain"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free ankle ROM",
      "Peroneal strength LSI >90%",
      "Pain-free eccentric eversion full load",
      "No lateral ankle tenderness"
    ]
  }),

  // ===== WRISTS =====

  p({
    id: "wrist-sprain",
    zone: "wrists", diagnosis: "Wrist sprain",
    aliases: ["wrist ligament sprain", "fall on outstretched hand", "FOOSH injury", "wrist strain"],
    severity: "mild",
    description: "Ligamentous injury to the wrist from fall on outstretched hand or acute loading. Differentiated from fracture by clinical exam.",
    typicalRecoveryWeeks: [2, 6],
    phases: {
      acute: {
        goals: ["Reduce pain/swelling", "Protect ligaments", "Pain-free ROM", "Maintain finger mobility"],
        exercises: [
          { name: "Finger range of motion", description: "Active finger flex/ext, abd/add full ROM", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["pain with movement"], progressionCriterion: "Full finger ROM" },
          { name: "Wrist active ROM pain-free", description: "Active wrist flex/ext, radial/ulnar deviation pain-free only", sets: 3, reps: 12, frequency: "2x daily", contraindications: ["wrist pain"], progressionCriterion: "Improved ROM" },
          { name: "Tendon gliding exercises", description: "Sequential finger tendon glides (hook, fist, tabletop)", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["pain"], progressionCriterion: "Full tendon glide" }
        ],
        restrictions: ["Avoid weight-bearing on wrist", "No gripping >2kg", "No impact/loading activities", "Consider splint for ADLs"],
        milestone: "Reduced pain/swelling, improved active ROM"
      },
      subacute: {
        goals: ["Full pain-free ROM", "Begin strengthening", "Improve grip strength"],
        exercises: [
          { name: "Isometric wrist flex/ext", description: "Manual resistance isometric flex/ext at neutral hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain"], progressionCriterion: "Pain-free 50% max" },
          { name: "Wrist curls light", description: "Supported forearm light dumbbell wrist curls flex/ext", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 light weight" },
          { name: "Grip strengthening putty", description: "Therapy putty progressive grip", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain grip"], progressionCriterion: "Improved grip strength" }
        ],
        restrictions: ["No push-ups/plank positions", "No heavy lifting >5kg", "Avoid impact loading"],
        milestone: "Full pain-free ROM, improved strength"
      },
      rehab: {
        goals: ["Full wrist strength", "Return to functional activities", "Sport-specific preparation"],
        exercises: [
          { name: "Wrist curls progressive", description: "Progressive wrist curls flex/ext moderate weight", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 moderate weight" },
          { name: "Wrist roller", description: "Wrist roller with light weight", sets: 3, reps: 1, frequency: "3x/week", contraindications: ["wrist pain"], progressionCriterion: "Full roll 5kg" },
          { name: "Push-up progression wall to floor", description: "Progressive push-up from wall to incline to floor", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["wrist pain WB"], progressionCriterion: "Full floor push-ups" }
        ],
        restrictions: ["Avoid heavy impact on wrist"],
        milestone: "Full strength, pain-free functional activities"
      },
      strength: {
        goals: ["Full wrist/grip strength LSI >90%", "Sport-specific loading"],
        exercises: [
          { name: "Heavy wrist curls", description: "Heavy wrist curls flex/ext", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Grip LSI >90%" },
          { name: "Farmer carries", description: "Carry moderate weight, maintain wrist neutral", sets: 3, reps: 1, frequency: "2x/week", contraindications: ["wrist pain"], progressionCriterion: "Carry 50% BW" },
          { name: "Sport-specific wrist drills", description: "Sport-specific gripping/impact patterns", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Sport activity no pain" }
        ],
        restrictions: ["Continue gradual progression"],
        milestone: "Full strength sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Education on fall techniques/prevention"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport practice", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["wrist pain"], progressionCriterion: "Full practice no pain" },
          { name: "Contact/impact drills", description: "Progressive impact loading as sport requires", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full contact no pain" }
        ],
        restrictions: ["Consider wrist protection for high-risk activities"],
        milestone: "Full return to sport"
      }
    },
    contraindicatedExercises: ["heavy weight-bearing on wrist acute", "full push-ups in acute/subacute"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free wrist ROM",
      "Grip strength LSI >90%",
      "Pain-free weight-bearing on wrist (push-ups, etc.)"
    ]
  }),

  p({
    id: "wrist-tfcc-injury",
    zone: "wrists", diagnosis: "TFCC injury",
    aliases: ["triangular fibrocartilage complex injury", "ulnar wrist pain", "TFCC tear"],
    severity: "moderate",
    description: "Injury to the TFCC on the ulnar side of the wrist, common in gymnasts and racquet sports.",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce ulnar wrist pain", "Protect TFCC", "Pain-free ROM", "Avoid ulnar loading"],
        exercises: [
          { name: "Finger ROM", description: "Active finger flex/ext full ROM", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["pain"], progressionCriterion: "Full ROM" },
          { name: "Wrist AROM pain-free", description: "Active wrist ROM avoiding ulnar deviation and pronation", sets: 3, reps: 12, frequency: "2x daily", contraindications: ["ulnar pain"], progressionCriterion: "Pain-free ROM" },
          { name: "Tendon glides", description: "Sequential tendon gliding exercises", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["pain"], progressionCriterion: "Smooth gliding" }
        ],
        restrictions: ["No ulnar deviation loading", "No pronation/supination under load", "Avoid gripping >1kg", "No weight-bearing through wrist"],
        milestone: "Reduced ulnar pain, protected ROM"
      },
      subacute: {
        goals: ["Begin gentle strengthening", "Improve forearm control", "Scapular/shoulder kinetic chain"],
        exercises: [
          { name: "Isometric wrist ulnar/radial deviation", description: "Isometric holds at neutral, 20% max", sets: 3, reps: 10, frequency: "daily", contraindications: ["ulnar pain"], progressionCriterion: "Pain-free isometrics" },
          { name: "Forearm pronation/supination light", description: "Light weight pro/sup, avoid end-range loading", sets: 3, reps: 12, frequency: "daily", contraindications: ["ulnar pain rotation"], progressionCriterion: "3x12 pain-free" },
          { name: "Shoulder/scapular program", description: "Rows, ER, scapular stability", sets: 3, reps: 12, frequency: "daily", contraindications: ["none"], progressionCriterion: "Full shoulder strength" }
        ],
        restrictions: ["No ulnar loading", "No push-ups", "Avoid weight-bearing on wrist"],
        milestone: "Pain-free isometrics, improved forearm strength"
      },
      rehab: {
        goals: ["Progressive strengthening", "Functional loading in neutral", "Sport-specific preparation"],
        exercises: [
          { name: "Wrist curls neutral grip", description: "Wrist curls in neutral grip (hammer grip)", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["ulnar pain"], progressionCriterion: "3x12 moderate" },
          { name: "Grip strengthening neutral", description: "Grip exercises in neutral wrist position", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["pain grip"], progressionCriterion: "Grip LSI >80%" },
          { name: "Incline push-ups", description: "Wide push-up on incline to reduce wrist extension", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["ulnar pain"], progressionCriterion: "3x12 pain-free" }
        ],
        restrictions: ["No full push-ups", "No racquet sports/gymnastics", "No ulnar deviation under load"],
        milestone: "Pain-free loaded activities in neutral"
      },
      strength: {
        goals: ["Full forearm strength", "Sport-specific loading tolerance", "LSI >90%"],
        exercises: [
          { name: "Heavy wrist curls neutral", description: "Heavy hammer curls neutral grip", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "LSI >90%" },
          { name: "Full push-ups on fists/dumbbells", description: "Push-ups on dumbbells to keep wrist neutral", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["wrist pain"], progressionCriterion: "3x10 no pain" },
          { name: "Sport-specific patterns", description: "Racquet/swing/grip patterns at moderate intensity", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["ulnar pain"], progressionCriterion: "Sport movement no pain" }
        ],
        restrictions: ["No full-effort sport yet"],
        milestone: "Full strength ready for sport return"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Education on prevention"],
        exercises: [
          { name: "Sport-specific full practice", description: "Full intensity sport with progressive loading", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of ulnar pain"], progressionCriterion: "Full practice no pain" },
          { name: "Impact progression", description: "Gradual impact loading as sport demands", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full impact no pain" }
        ],
        restrictions: ["Consider TFCC bracing for return", "Address equipment/technique factors"],
        milestone: "Full clearance for sport"
      }
    },
    contraindicatedExercises: ["loaded pronation/supination early", "full push-ups early", "ulnar deviation under load early"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free wrist ROM",
      "Grip strength LSI >90%",
      "Pain-free ulnar deviation at load",
      "Negative TFCC provocative tests"
    ]
  }),

  p({
    id: "wrist-de-quervains",
    zone: "wrists", diagnosis: "De Quervain's tenosynovitis",
    aliases: ["De Quervain's syndrome", "stenosing tenosynovitis", "thumb tendonitis", "mother's wrist"],
    severity: "mild",
    description: "Stenosing tenosynovitis of the first dorsal compartment (APL and EPB tendons) at radial styloid.",
    typicalRecoveryWeeks: [4, 8],
    phases: {
      acute: {
        goals: ["Reduce radial wrist pain", "Decompress first dorsal compartment", "Pain-free thumb ROM"],
        exercises: [
          { name: "Thumb active ROM", description: "Active thumb flex/ext, abd/add within pain-free limits", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["sharp radial pain"], progressionCriterion: "Improved thumb ROM" },
          { name: "Finger ROM", description: "Full finger ROM to maintain mobility", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["none"], progressionCriterion: "Full finger ROM" },
          { name: "Wrist deviated positions avoid", description: "Education on avoiding combined thumb flexion and ulnar deviation (Finkelstein)", sets: 1, reps: 1, frequency: "as needed", contraindications: ["none"], progressionCriterion: "ADL modification" }
        ],
        restrictions: ["Avoid thumb gripping and pinching", "No repetitive thumb extension", "No Finkelstein test position", "Consider thumb spica splint for ADLs"],
        milestone: "Reduced radial side pain, awareness of aggravating positions"
      },
      subacute: {
        goals: ["Pain-free thumb function", "Begin gentle thumb strengthening", "Improve wrist stability"],
        exercises: [
          { name: "Isometric thumb extension/abduction", description: "Isometric thumb extension/abduction at neutral 20% hold 10s", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["radial pain"], progressionCriterion: "Pain-free holds" },
          { name: "Grip strengthening neutral", description: "Pain-free grip with putty, avoid thumb pinch", sets: 3, reps: 15, frequency: "daily", contraindications: ["radial pain"], progressionCriterion: "Improved grip" },
          { name: "Wrist flex/ext light", description: "Light dumbbell wrist curls, neutral thumb position", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 pain-free" }
        ],
        restrictions: ["No pinch grip activities", "No repetitive lifting with thumb up", "Avoid twisting motions"],
        milestone: "Pain-free light gripping, improved function"
      },
      rehab: {
        goals: ["Full thumb/wrist strength", "Return to functional activities", "Sport-specific preparation"],
        exercises: [
          { name: "Thumb opposition strengthening", description: "Theraband or resistance thumb opposition", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 moderate" },
          { name: "Eccentric thumb extensor", description: "Light eccentric thumb extension, controlled lowering", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 no pain" },
          { name: "Grip strengthening progressive", description: "Progressive grip strengthening all grips", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Grip LSI >85%" }
        ],
        restrictions: ["Avoid full-effort gripping", "No racquet sports"],
        milestone: "Pain-free functional activities"
      },
      strength: {
        goals: ["Full grip strength LSI >90%", "Sport-specific capacity"],
        exercises: [
          { name: "Heavy grip training", description: "Heavy grip work, all grip types", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Grip LSI >90%" },
          { name: "Sport-specific thumb loading", description: "Sport-specific thumb/wrist patterns sub-max to max", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Sport activity no pain" }
        ],
        restrictions: ["Return to sport gradually"],
        milestone: "Full strength ready for sport"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Education on prevention", "Activity modification strategies"],
        exercises: [
          { name: "Sport-specific full practice", description: "Full intensity sport return", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of radial pain"], progressionCriterion: "Full practice no pain" },
          { name: "Functional grip testing", description: "Sport-specific grip endurance testing", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90%" }
        ],
        restrictions: ["Continue maintenance eccentric program 2x/week"],
        milestone: "Full sport return"
      }
    },
    contraindicatedExercises: ["Finkelstein maneuver", "repetitive thumb extension under load early", "heavy pinch grip early"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Full pain-free thumb ROM",
      "Grip strength LSI >90%",
      "Pain-free thumb extension/abduction at load",
      "Negative Finkelstein test"
    ]
  }),

  // ===== NECK =====

  p({
    id: "neck-cervical-strain",
    zone: "neck", diagnosis: "Cervical strain",
    aliases: ["neck strain", "cervical muscle spasm", "stiff neck", "mechanical neck pain"],
    severity: "mild",
    description: "Acute strain of cervical paraspinal muscles from awkward posture or sudden movement.",
    typicalRecoveryWeeks: [1, 3],
    phases: {
      acute: {
        goals: ["Reduce pain/muscle spasm", "Pain-free cervical ROM", "Identify triggers"],
        exercises: [
          { name: "Chin tucks supine", description: "Supine, tuck chin, hold 5s, relax", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["increased neck pain"], progressionCriterion: "Comfortable chin tuck" },
          { name: "Cervical AROM pain-free", description: "Active neck flex/ext, rotation, side bend within pain-free limits", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["sharp pain with movement"], progressionCriterion: "Improved active ROM" },
          { name: "Shoulder rolls and shrugs", description: "Gentle shoulder rolls and shrugs to relax upper traps", sets: 3, reps: 10, frequency: "hourly", contraindications: ["increased pain"], progressionCriterion: "Reduced upper trap tension" }
        ],
        restrictions: ["Avoid prolonged looking down (phone/computer)", "No heavy lifting", "Avoid sleeping on stomach", "No contact sports"],
        milestone: "Reduced resting pain, improved cervical ROM"
      },
      subacute: {
        goals: ["Full pain-free ROM", "Cervical stabilization", "Postural correction"],
        exercises: [
          { name: "Deep neck flexor strengthening", description: "Supine, chin tuck without lifting head, hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["neck pain"], progressionCriterion: "10s hold against gravity" },
          { name: "Cervical isometrics all directions", description: "Manual resistance isometrics at neutral hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain"], progressionCriterion: "Pain-free 50% max" },
          { name: "Scapular retraction", description: "Seated rowing with band, squeeze shoulder blades", sets: 3, reps: 15, frequency: "daily", contraindications: ["none"], progressionCriterion: "3x15 strong retraction" },
          { name: "Upper trap stretch", description: "Side-bend neck with opposite hand pulling down on side, hold 30s", sets: 3, reps: 1, frequency: "daily", contraindications: ["increased pain"], progressionCriterion: "Improved flexibility" }
        ],
        restrictions: ["No heavy overhead lifting", "Improve ergonomic setup"],
        milestone: "Full pain-free cervical ROM, good postural awareness"
      },
      rehab: {
        goals: ["Full cervical strength/endurance", "Return to full activity", "Ergonomic education"],
        exercises: [
          { name: "Deep neck flexor endurance", description: "Supine chin tuck with head lift 2-5cm off floor, hold", sets: 3, reps: 5, frequency: "daily", contraindications: ["pain"], progressionCriterion: "Hold 20s" },
          { name: "Cervical resistance all planes", description: "Light manual/band resistance in all planes", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 moderate resistance" },
          { name: "Full upper body strengthening", description: "Rows, press, pull-ups as tolerated", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["neck pain"], progressionCriterion: "Full UE strength" }
        ],
        restrictions: ["Avoid contact sports until cleared"],
        milestone: "Full cervical function returned"
      },
      strength: {
        goals: ["Full cervical strength", "Sport-specific preparation"],
        exercises: [
          { name: "Cervical resistance training", description: "Progressive resistance cervical flex/ext, rotation", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Full strength" },
          { name: "Full body functional training", description: "Sport-specific lifting and movement patterns", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Full function" }
        ],
        restrictions: ["Return to contact gradually"],
        milestone: "Full strength and function"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Ergonomic/prevention education"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport return", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of neck pain"], progressionCriterion: "Full practice no pain" },
          { name: "Contact progression if applicable", description: "Progressive contact/impact for collision sports", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full contact no pain" }
        ],
        restrictions: ["Maintain good posture habits"],
        milestone: "Full sport return"
      }
    },
    contraindicatedExercises: ["heavy overhead press acute", "contact sports acute", "extreme cervical ROM loaded"],
    returnCriteria: [
      "Pain-free full cervical ROM",
      "Full cervical strength 5/5 MMT",
      "Pain-free sport-specific movements",
      "Normal neurological exam"
    ]
  }),

  p({
    id: "neck-whiplash",
    zone: "neck", diagnosis: "Whiplash",
    aliases: ["whiplash associated disorder", "WAD", "cervical acceleration-deceleration injury"],
    severity: "moderate",
    description: "Acute cervical injury from rapid flexion-extension mechanism, most commonly motor vehicle or contact sport related.",
    typicalRecoveryWeeks: [4, 12],
    phases: {
      acute: {
        goals: ["Reduce pain", "Protect cervical spine", "Pain-free active ROM", "Neurological monitoring"],
        exercises: [
          { name: "Chin tucks supine gentle", description: "Very gentle supine chin tuck, no pain", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["sharp pain/referral"], progressionCriterion: "Comfortable chin tuck" },
          { name: "Cervical AROM limited", description: "Active ROM within pain-free limits only", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["radicular pain"], progressionCriterion: "Gradual ROM increase" },
          { name: "Shoulder rolls", description: "Gentle shoulder rolls to reduce upper trap spasm", sets: 3, reps: 10, frequency: "hourly", contraindications: ["none"], progressionCriterion: "Reduced spasm" }
        ],
        restrictions: ["Cervical collar use per physician orders", "No heavy lifting", "No contact sports", "Avoid prolonged driving", "Monitor for neurological symptoms"],
        milestone: "Pain reduced, neurological status stable"
      },
      subacute: {
        goals: ["Progressive cervical ROM", "Deep neck flexor activation", "Postural re-education", "Reduce headache/dizziness"],
        exercises: [
          { name: "Deep neck flexor strengthening", description: "Supine chin tuck, hold 10s", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain/dizziness"], progressionCriterion: "10s hold" },
          { name: "Cervical isometrics", description: "Isometric neck flex/ext, rotation, side bend 30% max", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain"], progressionCriterion: "Pain-free 50% max" },
          { name: "Scapular and postural program", description: "Scapular retraction, rows, posture correction", sets: 3, reps: 12, frequency: "daily", contraindications: ["none"], progressionCriterion: "Improved posture" },
          { name: "Eye movement and VOR exercises", description: "Eye tracking, VOR x1/x2 exercises for vestibular involvement", sets: 2, reps: 10, frequency: "2x daily", contraindications: ["increased dizziness"], progressionCriterion: "Improved symptom tolerance" }
        ],
        restrictions: ["No contact sports", "Avoid high-velocity movements", "No heavy overhead activities"],
        milestone: "Full pain-free cervical ROM, no dizziness, improved function"
      },
      rehab: {
        goals: ["Full cervical strength/endurance", "Return to functional activities", "Sport-specific preparation"],
        exercises: [
          { name: "Cervical resistance band program", description: "Progressive resistance in all planes", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 moderate resistance" },
          { name: "Deep neck flexor endurance advanced", description: "Chin tuck head lift progression, holds to 30s", sets: 3, reps: 3, frequency: "daily", contraindications: ["pain"], progressionCriterion: "30s holds" },
          { name: "Full body strength program", description: "Upper body and core strength return", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Pre-injury strength" },
          { name: "Vestibular and balance training", description: "Balance, gaze stabilization, perturbation training", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["dizziness"], progressionCriterion: "No symptoms with movement" }
        ],
        restrictions: ["No contact sports", "Avoid high-velocity neck movements"],
        milestone: "Full cervical function, sport-specific preparation"
      },
      strength: {
        goals: ["Full cervical strength LSI >90%", "Sport-specific power", "Neuromuscular control"],
        exercises: [
          { name: "Cervical resistance heavy", description: "Heavy cervical resistance training all planes", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Full strength LSI >90%" },
          { name: "Plyometric neck preparation", description: "Sport-specific neck loading patterns (if applicable)", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Pain-free explosive control" },
          { name: "Full sport-specific training", description: "Sport movement patterns without contact", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["symptoms"], progressionCriterion: "Full movements no symptoms" }
        ],
        restrictions: ["No contact clearance yet"],
        milestone: "Full cervical strength, ready for contact clearance"
      },
      "return-to-sport": {
        goals: ["Full sport participation including contact", "Pass RTS testing", "Education on recurrence prevention"],
        exercises: [
          { name: "Contact progression", description: "Progressive contact drills from light to full contact", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain/dizziness/neurological symptoms"], progressionCriterion: "Full contact no symptoms" },
          { name: "Full sport practice", description: "Full intensity sport including all contact", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["symptom return"], progressionCriterion: "Full practice no symptoms" },
          { name: "Neurological and functional testing", description: "Cervical strength, ROM, clearance testing", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["abnormal findings"], progressionCriterion: "Normal testing" }
        ],
        restrictions: ["Continue cervical strengthening 2x/week", "Clearance from physician required"],
        milestone: "Full medical clearance for sport"
      }
    },
    contraindicatedExercises: ["high-velocity neck movements acute", "contact sports before full clearance", "loaded cervical extension acute"],
    returnCriteria: [
      "Full pain-free cervical ROM",
      "Cervical strength LSI >90%",
      "No dizziness/headache with sport movements",
      "Normal neurological exam",
      "Cleared by physician",
      "Contact progression completed without symptoms"
    ]
  }),

  p({
    id: "neck-cervical-radiculopathy",
    zone: "neck", diagnosis: "Cervical radiculopathy",
    aliases: ["pinched nerve in neck", "cervical nerve root compression", "radicular arm pain"],
    severity: "moderate",
    description: "Compression/irritation of cervical nerve root causing radiating arm pain, numbness, or weakness.",
    typicalRecoveryWeeks: [6, 16],
    phases: {
      acute: {
        goals: ["Reduce radicular pain", "Centralize symptoms", "Neural mobilization", "Neurological monitoring"],
        exercises: [
          { name: "Chin tucks supine gentle", description: "Gentle supine chin tuck, avoid pain provocation", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["peripheralization"], progressionCriterion: "Comfortable chin tuck" },
          { name: "Median/radial/ulnar nerve glides", description: "Gentle nerve glides for affected nerve, symptom-free range", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["sharp nerve pain"], progressionCriterion: "Improved neural mobility" },
          { name: "Cervical AROM limited", description: "Active ROM within pain-free range, avoid end-range", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["radicular pain with movement"], progressionCriterion: "Gradual ROM improvement" }
        ],
        restrictions: ["No heavy lifting >2kg", "No prolonged looking down", "No contact sports", "Avoid cervical extension/rotation combined"],
        milestone: "Reduced radicular pain, centralization of symptoms"
      },
      subacute: {
        goals: ["Improve cervical mobility", "Deep neck flexor activation", "Neural mobility progression", "Scapular stabilization"],
        exercises: [
          { name: "Deep neck flexor activation", description: "Supine chin tuck, hold 10s without compensation", sets: 3, reps: 10, frequency: "daily", contraindications: ["radicular referral"], progressionCriterion: "10s hold no referral" },
          { name: "Cervical isometrics", description: "Isometric in neutral 30% max, all planes", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain/radicular"], progressionCriterion: "Pain-free isometrics" },
          { name: "Nerve glides progression", description: "Progress nerve glides with greater ROM, no symptoms", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["symptom reproduction"], progressionCriterion: "Full glide no symptoms" },
          { name: "Scapular retraction program", description: "Rows, scapular squeezes, Y-T-W exercises on prone", sets: 3, reps: 12, frequency: "daily", contraindications: ["radicular pain with movement"], progressionCriterion: "3x12 moderate" }
        ],
        restrictions: ["No heavy lifting >5kg", "Avoid prolonged cervical flexion"],
        milestone: "Improved ROM, no radicular symptoms at rest"
      },
      rehab: {
        goals: ["Full cervical strength", "Return to functional activities", "Sport-specific preparation"],
        exercises: [
          { name: "Cervical resistance band program", description: "Progressive cervical resistance all planes", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain/radicular"], progressionCriterion: "3x12 moderate resistance" },
          { name: "Full upper body strengthening", description: "Rows, press, lat work as tolerated", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["arm pain"], progressionCriterion: "Pre-injury strength" },
          { name: "Proprioceptive and balance training", description: "Balance, perturbations, gaze stabilization", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["dizziness"], progressionCriterion: "Normal response" }
        ],
        restrictions: ["No contact sports", "No high-velocity movements"],
        milestone: "Full strength, no radicular symptoms with activity"
      },
      strength: {
        goals: ["Full cervical strength", "Sport-specific patterns", "Neuromuscular control"],
        exercises: [
          { name: "Cervical resistance heavy", description: "Heavy resistance bands or plate-loaded neck training", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain/radicular"], progressionCriterion: "LSI >90%" },
          { name: "Full functional training", description: "Sport-specific movement preparation", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["symptoms"], progressionCriterion: "Full function" }
        ],
        restrictions: ["No contact sports until cleared"],
        milestone: "Full strength and function"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Neurological clearance", "Prevention education"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport, progressive contact if applicable", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of radicular symptoms"], progressionCriterion: "Full practice no symptoms" },
          { name: "Contact progression", description: "Progressive contact for collision sports", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["radicular return"], progressionCriterion: "Full contact no symptoms" }
        ],
        restrictions: ["Continue cervical maintenance 2x/week", "Physician clearance required"],
        milestone: "Full clearance for sport"
      }
    },
    contraindicatedExercises: ["heavy overhead pressing acute", "loaded cervical extension acute", "contact before full clearance"],
    returnCriteria: [
      "No radicular arm pain/numbness/weakness",
      "Full pain-free cervical ROM",
      "Cervical strength LSI >90%",
      "Normal neurological exam (sensation, reflexes, strength)",
      "Sport-specific training without symptoms",
      "Physician clearance"
    ]
  }),

  // ===== CORE =====

  p({
    id: "core-rectus-abdominis-strain",
    zone: "core", diagnosis: "Rectus abdominis strain",
    aliases: ["abdominal strain", "torn abdominal muscle", "six-pack strain"],
    severity: "mild",
    description: "Strain of the rectus abdominis muscle from explosive trunk movements or overuse.",
    typicalRecoveryWeeks: [2, 6],
    phases: {
      acute: {
        goals: ["Reduce abdominal pain", "Protect injured tissue", "Pain-free deep breathing", "Identify aggravators"],
        exercises: [
          { name: "Diaphragmatic breathing", description: "Supine hands on abdomen, slow deep breaths, engage diaphragm", sets: 1, reps: 10, frequency: "3x daily", contraindications: ["increased pain"], progressionCriterion: "Pain-free breathing" },
          { name: "Supine pelvic tilts", description: "Gentle posterior pelvic tilt, flatten back, hold 5s", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["rectus pain"], progressionCriterion: "Pain-free" },
          { name: "Heel slides supine", description: "Supine, slowly slide one heel out and back, keep core stable", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["pain with movement"], progressionCriterion: "Pain-free heel slides" }
        ],
        restrictions: ["No curl-ups/sit-ups", "No twisting", "No heavy lifting", "Avoid explosive trunk movements"],
        milestone: "Pain-free at rest, reduced pain with deep breathing"
      },
      subacute: {
        goals: ["Begin core stabilization", "Improve lumbopelvic control", "Pain-free ADLs"],
        exercises: [
          { name: "Dead bug", description: "Supine arm/leg alternate extend, core braced", sets: 3, reps: 10, frequency: "daily", contraindications: ["abdominal pain"], progressionCriterion: "3x10 stable" },
          { name: "Side-lying clam", description: "Side-lying clamshells for lateral core activation", sets: 3, reps: 12, frequency: "daily", contraindications: ["oblique pain"], progressionCriterion: "3x12 pain-free" },
          { name: "Quadruped bird-dog", description: "Alternate arm/leg, neutral spine, core engaged", sets: 3, reps: 10, frequency: "daily", contraindications: ["instability/pain"], progressionCriterion: "3x10 stable" }
        ],
        restrictions: ["No full sit-ups", "No loaded trunk flexion", "Avoid twisting under load"],
        milestone: "Pain-free core control in basic stabilization exercises"
      },
      rehab: {
        goals: ["Full core strength/endurance", "Sport-specific movements", "Return to activity"],
        exercises: [
          { name: "Partial curl-ups", description: "Supine curl-up lifting head/shoulders, chin tucked", sets: 3, reps: 15, frequency: "daily", contraindications: ["rectus pain"], progressionCriterion: "3x15 pain-free" },
          { name: "Plank holds", description: "Prone plank 30-60s, neutral spine", sets: 3, reps: 3, frequency: "daily", contraindications: ["pain"], progressionCriterion: "Plank 60s" },
          { name: "Medicine ball pike pass", description: "Pass MB from hands to feet in pike position", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 controlled" },
          { name: "Pallof press", description: "Cable/band anti-rotation press, controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["oblique/rectus pain"], progressionCriterion: "3x10 moderate resistance" }
        ],
        restrictions: ["Avoid maximal trunk loading", "Gradual return to sport"],
        milestone: "Full core strength, pain-free sport-specific movements"
      },
      strength: {
        goals: ["Full core strength", "Sport-specific power generation"],
        exercises: [
          { name: "Weighted Russian twists", description: "Controlled rotational work with light weight", sets: 3, reps: 10, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x10 moderate" },
          { name: "Hanging knee raises", description: "Hanging from bar, raise knees, controlled", sets: 3, reps: 10, frequency: "2x/week", contraindications: ["shoulder/rectus pain"], progressionCriterion: "3x10 controlled" }
        ],
        restrictions: ["Continue core maintenance"],
        milestone: "Full core strength and power"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Prevention education"],
        exercises: [
          { name: "Sport-specific full practice", description: "Full intensity sport return", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of abdominal pain"], progressionCriterion: "Full practice no pain" },
          { name: "Explosive trunk training", description: "Sport-specific explosive trunk movements full intensity", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full explosive activity" }
        ],
        restrictions: ["Continue core maintenance 2x/week"],
        milestone: "Full sport return"
      }
    },
    contraindicatedExercises: ["full sit-ups acute", "loaded trunk flexion acute", "explosive twisting early"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Pain-free full sit-up",
      "Plank endurance >90s",
      "Pain-free rotational loading"
    ]
  }),

  p({
    id: "core-oblique-strain",
    zone: "core", diagnosis: "Oblique strain",
    aliases: ["side abdominal strain", "external oblique strain", "internal oblique strain"],
    severity: "mild",
    description: "Strain of internal or external oblique muscles, common in throwing and rotational sports.",
    typicalRecoveryWeeks: [3, 6],
    phases: {
      acute: {
        goals: ["Reducing side/oblique pain", "Protect oblique", "Pain-free breathing", "Identify mechanism"],
        exercises: [
          { name: "Diaphragmatic breathing", description: "Supine deep breathing, hands on ribs, lateral expansion", sets: 1, reps: 10, frequency: "3x daily", contraindications: ["increased oblique pain"], progressionCriterion: "Comfortable breathing" },
          { name: "Supine pelvic tilts", description: "Gentle posterior tilt, flat back", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["pain"], progressionCriterion: "Pain-free" },
          { name: "Standing weight shifts", description: "Gentle side-to-side weight shifts, arms at sides", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["side pain"], progressionCriterion: "Pain-free" }
        ],
        restrictions: ["No twisting", "No throwing", "Avoid side-bending under load", "No golf/racquet sports"],
        milestone: "Reduced oblique pain at rest and with breathing"
      },
      subacute: {
        goals: ["Begin core stabilization", "Improve anti-rotation control", "Pain-free ADLs"],
        exercises: [
          { name: "Dead bug", description: "Supine alternate arm/leg, core braced, avoid rotation", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain with rotation"], progressionCriterion: "3x10 stable" },
          { name: "Side plank knee down", description: "Side-lying knee down plank, hold 20s", sets: 3, reps: 3, frequency: "daily", contraindications: ["oblique pain"], progressionCriterion: "Full side plank 30s" },
          { name: "Pallof press isometric", description: "Cable anti-rotation hold at center, 20s", sets: 3, reps: 5, frequency: "daily", contraindications: ["oblique pain"], progressionCriterion: "Pain-free 30s" }
        ],
        restrictions: ["No explosive rotation", "No throwing", "No twisting sports"],
        milestone: "Pain-free ADLs, anti-rotation control"
      },
      rehab: {
        goals: ["Full core strength", "Rotational loading tolerance", "Sport-specific preparation"],
        exercises: [
          { name: "Full side plank", description: "Full side plank 30-45s each side", sets: 3, reps: 3, frequency: "daily", contraindications: ["oblique pain"], progressionCriterion: "Side plank 60s" },
          { name: "Pallof press with rotation", description: "Cable anti-rotation press with slow rotation out and back", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 controlled moderate" },
          { name: "Medicine ball rotational pass", description: "Controlled rotational pass (wood chop pattern)", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["oblique pain"], progressionCriterion: "3x10 controlled" },
          { name: "Walking lunges with rotation", description: "Lunge with gentle trunk rotation toward lead leg", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x8 each" }
        ],
        restrictions: ["No full-effort throws", "No full-effort rotational sports"],
        milestone: "Pain-free rotational loading"
      },
      strength: {
        goals: ["Full core strength LSI >90%", "Sport-specific power"],
        exercises: [
          { name: "Weighted side bends", description: "Dumbbell side bends controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 moderate" },
          { name: "Rotational medicine ball throws", description: "Explosive rotational MB throws against wall", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Explosive no pain" },
          { name: "Sport-specific rotational drills", description: "Full intensity rotational patterns", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "Full intensity no pain" }
        ],
        restrictions: ["Gradual return to sport"],
        milestone: "Full strength, sport-specific power"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Prevention education"],
        exercises: [
          { name: "Sport-specific training", description: "Full practice, progressive rotational loading", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of oblique pain"], progressionCriterion: "Full practice no pain" },
          { name: "Throwing progression", description: "Progressive throwing from short to full distance/effort", sets: 1, reps: 1, frequency: "alternate days", contraindications: ["pain"], progressionCriterion: "Full throwing no pain" }
        ],
        restrictions: ["Continue core anti-rotation maintenance 2x/week"],
        milestone: "Full sport return"
      }
    },
    contraindicatedExercises: ["explosive rotation acute", "weighted side bends acute", "full-effort throwing early"],
    returnCriteria: [
      "Pain-free sport-specific training including rotation",
      "Pain-free side plank 60s each side",
      "Pain-free rotational loading at sport-specific intensity",
      "Full throwing program completed (for throwers)"
    ]
  }),

  p({
    id: "core-diastasis-recti",
    zone: "core", diagnosis: "Diastasis recti",
    aliases: ["diastasis recti abdominis", "abdominal separation", "DRA"],
    severity: "mild",
    description: "Separation of the rectus abdominis muscles at the linea alba, common in postpartum population.",
    typicalRecoveryWeeks: [8, 16],
    phases: {
      acute: {
        goals: ["Reduce inter-recti gap", "Deep core activation", "Avoid intra-abdominal pressure spikes", "Education on safe movement"],
        exercises: [
          { name: "Diaphragmatic breathing with TVA", description: "Supine, inhale expand ribs, exhale draw navel to spine, engage TVA", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["increased separation"], progressionCriterion: "Visible TVA activation" },
          { name: "Supine pelvic tilts", description: "Gentle posterior tilt drawing navel to spine, avoid doming", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["abdominal doming"], progressionCriterion: "Smooth movement no doming" },
          { name: "Heel slides", description: "Supine knees bent, slow slide one heel out, maintain core engagement", sets: 3, reps: 10, frequency: "daily", contraindications: ["doming/coning"], progressionCriterion: "Pain-free no doming" }
        ],
        restrictions: ["No sit-ups/crunches", "No planks or push-ups", "No heavy lifting >5kg", "Avoid Valsalva maneuver", "Avoid movements that cause abdominal doming"],
        milestone: "Able to activate TVA without doming"
      },
      subacute: {
        goals: ["Improve core stability", "Progress transverse abdominis endurance", "Begin functional movements with core control"],
        exercises: [
          { name: "Dead bug modified", description: "Supine, arm/leg alternate reach with core braced, no doming", sets: 3, reps: 10, frequency: "daily", contraindications: ["doming"], progressionCriterion: "3x10 no doming" },
          { name: "Quadruped TVA activation", description: "Quadruped neutral spine, draw navel to spine, hold 10s, maintain breathing", sets: 3, reps: 10, frequency: "daily", contraindications: ["doming"], progressionCriterion: "10s holds no doming" },
          { name: "Side-lying leg raises", description: "Side-lying top leg raise, core braced, avoid rotation", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12" },
          { name: "Bridging", description: "Supine bridge with TVA engagement, avoid doming", sets: 3, reps: 12, frequency: "daily", contraindications: ["doming"], progressionCriterion: "3x12 no doming" }
        ],
        restrictions: ["No plank or push-up", "No twisting under load", "No sit-ups"],
        milestone: "Core control in functional positions, reduced gap on palpation"
      },
      rehab: {
        goals: ["Progressive core loading", "Functional movement patterns", "Return to general fitness"],
        exercises: [
          { name: "Quadruped bird-dog", description: "Quadruped alternate arm/leg, maintain core, no doming", sets: 3, reps: 10, frequency: "daily", contraindications: ["doming/loss of control"], progressionCriterion: "3x10 stable no doming" },
          { name: "Plank modified (incline)", description: "Incline plank on wall or high box, core braced, hold 20s", sets: 3, reps: 3, frequency: "daily", contraindications: ["doming"], progressionCriterion: "Incline plank 45s" },
          { name: "Squats with core control", description: "Bodyweight squat, maintain core engagement throughout", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["doming"], progressionCriterion: "3x12 no doming" },
          { name: "Lunges with core control", description: "Forward lunge, maintain vertical torso and core braced", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["loss of control"], progressionCriterion: "3x10 each" }
        ],
        restrictions: ["Continue to avoid high-load core flexion"],
        milestone: "Core control in upright functional positions"
      },
      strength: {
        goals: ["Full core strength", "Progressive loading", "Return to full activity"],
        exercises: [
          { name: "Full plank", description: "Full prone plank 30s, monitor for doming", sets: 3, reps: 3, frequency: "daily", contraindications: ["doming/pain"], progressionCriterion: "Full plank 60s no doming" },
          { name: "Push-ups incline to floor", description: "Progressive push-up from incline to floor", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["doming"], progressionCriterion: "Full push-ups no doming" },
          { name: "Loaded carries", description: "Farmer or suitcase carries with core engagement", sets: 3, reps: 1, frequency: "3x/week", contraindications: ["doming"], progressionCriterion: "Carry 50% BW 40m" }
        ],
        restrictions: ["Continue to monitor for doming/symptoms"],
        milestone: "Full core strength without doming"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Education on lifelong core management"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport, maintain core control", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of doming/pain"], progressionCriterion: "Full practice no doming" },
          { name: "Higher impact loading", description: "Running, jumping, sport-specific impact monitoring core response", sets: 3, reps: 10, frequency: "2x/week", contraindications: ["doming/leaking"], progressionCriterion: "Full impact no symptoms" }
        ],
        restrictions: ["Continue core engagement in all activities"],
        milestone: "Full return to sport with core awareness"
      }
    },
    contraindicatedExercises: ["full sit-ups/crunches", "heavy Valsalva activities", "full plank before adequate control"],
    returnCriteria: [
      "No abdominal doming with functional activities",
      "Inter-recti gap <2 finger-widths at narrowest",
      "Pain-free plank 60s",
      "Core control during sport-specific movements",
      "No urinary incontinence with impact"
    ]
  }),

  // ===== GLUTES =====

  p({
    id: "gluteal-strain",
    zone: "glutes", diagnosis: "Gluteal strain",
    aliases: ["glute strain", "gluteus maximus strain", "buttock strain"],
    severity: "mild",
    description: "Strain of gluteal musculature from explosive hip extension or overuse in running/acceleration.",
    typicalRecoveryWeeks: [2, 5],
    phases: {
      acute: {
        goals: ["Reduce gluteal pain", "Protect from further strain", "Pain-free walking", "Isometric activation"],
        exercises: [
          { name: "Isometric glute squeezes", description: "Standing or supine, squeeze glutes hold 10s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["increased pain"], progressionCriterion: "Strong pain-free contraction" },
          { name: "Supine bridges isometric", description: "Supine bridge hold at top 10s, glute squeeze", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["hamstring/glute pain"], progressionCriterion: "Pain-free 10s holds" },
          { name: "Walking short distances", description: "Pain-free walking, avoid excessive stride length", sets: 1, reps: 1, frequency: "2x daily", contraindications: ["pain with walking"], progressionCriterion: "10min pain-free walk" }
        ],
        restrictions: ["No sprinting", "No explosive hip extension", "Avoid deep squats", "No lunges"],
        milestone: "Pain-free walking, isometric glute activation"
      },
      subacute: {
        goals: ["Improve gluteal strength", "Begin eccentric loading", "Address kinetic chain"],
        exercises: [
          { name: "Bridging single-leg", description: "Supine single-leg bridge, glute squeeze at top, hold 3s", sets: 3, reps: 12, frequency: "daily", contraindications: ["hamstring/glute pain"], progressionCriterion: "3x12 each side" },
          { name: "Clamshells banded", description: "Side-lying band above knees, glute activation", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15" },
          { name: "Side-lying hip abduction", description: "Leg raise 30°, slight ER, neutral pelvis", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 ankle weight" }
        ],
        restrictions: ["No sprinting/jumping", "No heavy loaded squats"],
        milestone: "Pain-free ADLs, improved gluteal strength"
      },
      rehab: {
        goals: ["Full gluteal strength", "Sport-specific loading", "Return to running"],
        exercises: [
          { name: "Hip thrusts bilateral to SL", description: "Barbell hip thrusts progressive", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["glute pain"], progressionCriterion: "SL hip thrust 1x BW" },
          { name: "Lateral band walks", description: "Mini-band above ankles, lateral steps with squat", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 each direction" },
          { name: "Walk-jog progression", description: "Progressive run return", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return of glute pain"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No sprinting yet", "No plyometrics"],
        milestone: "Pain-free running, full gluteal strength"
      },
      strength: {
        goals: ["Full LE strength LSI >90%", "Sport-specific power"],
        exercises: [
          { name: "Barbell back squat", description: "Full squat progressive loading", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "1.25x BW squat" },
          { name: "RDL", description: "Romanian deadlift progressive", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "1.25x BW RDL" },
          { name: "Lunges weighted", description: "Forward and reverse lunges with dumbbells", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 each 50% BW" }
        ],
        restrictions: ["No competition intensity yet"],
        milestone: "Full strength, sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Prevention education"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport including sprinting, jumping", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of glute pain"], progressionCriterion: "Full practice no pain" },
          { name: "Sprint and plyometric program", description: "Full speed sprint and plyometric training", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full intensity no pain" }
        ],
        restrictions: ["Continue glute program 2x/week"],
        milestone: "Full return to sport"
      }
    },
    contraindicatedExercises: ["explosive hip extension acute", "deep SL squat acute", "full-effort sprinting early"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Gluteal strength LSI >90%",
      "Pain-free sprinting/jumping",
      "Normal movement patterns"
    ]
  }),

  p({
    id: "glute-piriformis-syndrome",
    zone: "glutes", diagnosis: "Piriformis syndrome",
    aliases: ["piriformis tightness", "deep gluteal syndrome", "sciatic nerve entrapment"],
    severity: "mild",
    description: "Irritation of sciatic nerve by tight piriformis muscle causing gluteal and referred leg pain.",
    typicalRecoveryWeeks: [2, 6],
    phases: {
      acute: {
        goals: ["Reduce piriformis tension", "Relieve sciatic irritation", "Pain-free sitting", "Identify aggravators"],
        exercises: [
          { name: "Supine piriformis stretch", description: "Cross affected leg over opposite knee, pull toward chest hold 30s", sets: 3, reps: 1, frequency: "3x daily", contraindications: ["increased sciatic symptoms"], progressionCriterion: "Improved tolerance" },
          { name: "Supine knee to chest", description: "Pull knee toward opposite shoulder, hold 30s", sets: 3, reps: 1, frequency: "2x daily", contraindications: ["hip/back pain"], progressionCriterion: "Pain-free" },
          { name: "Supine glute squeezes isometric", description: "Gentle glute squeezes 10s holds", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain"], progressionCriterion: "Pain-free activation" }
        ],
        restrictions: ["Avoid prolonged sitting", "Avoid seated hip ER", "No running", "No deep squats"],
        milestone: "Reduced pain with sitting, improved piriformis flexibility"
      },
      subacute: {
        goals: ["Improve hip mobility", "Strengthen gluteals", "Address lumbopelvic stability"],
        exercises: [
          { name: "Clamshells banded", description: "Side-lying band above knees, glute med activation", sets: 3, reps: 15, frequency: "daily", contraindications: ["lateral hip pain"], progressionCriterion: "3x15" },
          { name: "Side-lying hip abduction", description: "Top leg raise 30°, slight ER", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 ankle weight" },
          { name: "Bridging", description: "Bridges with glute squeeze top", sets: 3, reps: 15, frequency: "daily", contraindications: ["hamstring cramping"], progressionCriterion: "3x15 SL progression" },
          { name: "Quadruped hip IR/ER mob", description: "Quadruped gentle hip IR/ER mobility, pain-free", sets: 3, reps: 10, frequency: "daily", contraindications: ["pain"], progressionCriterion: "Full pain-free ROM" }
        ],
        restrictions: ["Limit sitting >30min", "No running", "Avoid seated hip ER"],
        milestone: "Pain-free ADLs, improved hip mobility"
      },
      rehab: {
        goals: ["Full hip strength", "Return to running", "Sport-specific preparation"],
        exercises: [
          { name: "SL bridges", description: "Single-leg bridge glute squeeze", sets: 3, reps: 12, frequency: "daily", contraindications: ["SI/glute pain"], progressionCriterion: "3x12 each side" },
          { name: "Lateral band walks", description: "Band walks glute med focus", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 heavy band" },
            { name: "Walk-jog progression", description: "Progressive return to running every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return sciatic symptoms"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["Avoid aggressive stretching through pain", "Gradual return"],
        milestone: "Pain-free running, full hip strength"
      },
      strength: {
        goals: ["Full LE strength", "Sport-specific power"],
        exercises: [
          { name: "Barbell squat", description: "Full squat progressive", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "1.25x BW" },
          { name: "Single-leg RDL", description: "SL RDL with dumbbell", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["balance/pain"], progressionCriterion: "3x8 each" },
          { name: "Lunges", description: "Multi-directional lunges", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 each" }
        ],
        restrictions: ["Maintain flexibility program"],
        milestone: "Full strength ready for sport"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Long-term prevention"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport return", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of sciatic/glute pain"], progressionCriterion: "Full practice no pain" },
          { name: "Sprint and agility", description: "Full speed sprinting and cutting", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full speed no pain" }
        ],
        restrictions: ["Continue hip and glute maintenance"],
        milestone: "Full sport return"
      }
    },
    contraindicatedExercises: ["aggressive piriformis stretch through nerve pain", "prolonged sitting post-exercise"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "No radiating leg pain with activity",
      "Full hip strength LSI >90%",
      "Pain-free prolonged sitting",
      "Negative FAIR test"
    ]
  }),

  // ===== HAMSTRINGS =====

  p({
    id: "hamstring-strain",
    zone: "hamstrings", diagnosis: "Hamstring strain (grade 1/2)",
    aliases: ["pulled hamstring", "hamstring tear", "biceps femoris strain", "posterior thigh strain"],
    severity: "moderate",
    description: "Strain of the hamstring musculature (biceps femoris most common) from eccentric overload during high-speed running or kicking.",
    typicalRecoveryWeeks: [3, 8],
    phases: {
      acute: {
        goals: ["Reduce pain and swelling", "Protect from further injury", "Pain-free walking", "Isometric activation"],
        exercises: [
          { name: "Isometric hamstring holds prone", description: "Prone, knee bent 30°, isometric hamstring contraction at 50% max, hold 10s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain >3/10"], progressionCriterion: "Pain-free isometric" },
          { name: "Ankle pumps and heel slides", description: "Active ankle ROM and gentle heel slides to maintain knee mobility", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["pain with knee flexion"], progressionCriterion: "Full pain-free knee ROM" },
          { name: "Stationary bike no resistance", description: "High seat, gentle cycling, pain-free range, no load", sets: 1, reps: 10, frequency: "daily", contraindications: ["hamstring pain cycling"], progressionCriterion: "10min pain-free" }
        ],
        restrictions: ["No hamstring stretching", "No eccentric loading", "No running/sprinting", "Avoid end-range knee extension with hip flexion"],
        milestone: "Pain-free walking, isometric hamstring contraction"
      },
      subacute: {
        goals: ["Begin eccentric loading", "Improve hamstring endurance", "Address lumbopelvic control", "Normalize gait"],
        exercises: [
          { name: "Eccentric hamstring curl prone", description: "Prone hamstring curl, assist up with other leg, 5s eccentric lowering", sets: 3, reps: 12, frequency: "daily", contraindications: ["sharp pain during eccentric"], progressionCriterion: "3x12 no pain" },
          { name: "Bridging single-leg", description: "SL bridge with hamstring focus, posterior tilt", sets: 3, reps: 12, frequency: "daily", contraindications: ["hamstring cramping"], progressionCriterion: "3x12 each side" },
          { name: "Standing hip hinge", description: "Hip hinge to 45°, neutral spine, hamstring activation", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain with hinge"], progressionCriterion: "3x12" },
          { name: "Leg curls light concentric", description: "Prone hamstring curl light resistance both legs", sets: 3, reps: 15, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x15 pain-free" }
        ],
        restrictions: ["No sprinting", "No heavy eccentric loading", "Avoid end-range stretching"],
        milestone: "Pain-free eccentric curls, improved hamstring endurance"
      },
      rehab: {
        goals: ["Progressive hamstring loading", "Running reintroduction", "Sport-specific preparation"],
        exercises: [
          { name: "Nordic hamstring eccentric", description: "Partner-anchored or Nordic board eccentric, 5s lowering", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["hamstring pain"], progressionCriterion: "3x8 controlled" },
          { name: "SL RDL light to moderate", description: "SL RDL with dumbbell, hamstring and glute focus", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["balance/pain"], progressionCriterion: "3x10 moderate" },
          { name: "Walk-jog progression", description: "Walk to jog progression every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["return of hamstring pain"], progressionCriterion: "20min continuous run" },
          { name: "Lunges forward and reverse", description: "Controlled lunges for posterior chain", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 each" }
        ],
        restrictions: ["No sprinting", "No high-speed running", "Avoid full-effort eccentric"],
        milestone: "Pain-free running, progressive eccentric loading"
      },
      strength: {
        goals: ["Full hamstring strength LSI >90%", "Sport-specific speed preparation", "Plyometric readiness"],
        exercises: [
          { name: "Nordic hamstring full", description: "Full Nordic eccentric, maximal effort, controlled", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x6 full range" },
          { name: "RDL conventional", description: "Bilateral RDL progressive load", sets: 4, reps: 8, frequency: "2x/week", contraindications: ["pain hinge"], progressionCriterion: "1.25x BW RDL" },
          { name: "SL bridge walkouts", description: "Supine bridge walk feet away and back, hamstrings", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["cramping"], progressionCriterion: "3x8 controlled" },
          { name: "Stride length drills", description: "Controlled stride outs at 70% speed", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "70% speed no pain" }
        ],
        restrictions: ["No full-effort sprinting yet"],
        milestone: "Full strength, ready for speed work"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Sprint progression completed", "Prevention education"],
        exercises: [
          { name: "Sprint progression", description: "50% to 100% speed progression over 2-3 weeks", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["hamstring pain during sprint"], progressionCriterion: "Full speed no pain" },
          { name: "Sport-specific full practice", description: "Full intensity sport including sprinting, cutting, kicking", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of pain"], progressionCriterion: "Full practice no pain" },
          { name: "Hop and change-of-direction", description: "Reactive cutting and hopping at full speed", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain/hesitation"], progressionCriterion: "Full speed no pain" },
          { name: "Isokinetic hamstring testing", description: "Isokinetic testing for LSI and H:Q ratio", sets: 3, reps: 1, frequency: "1x/week", contraindications: ["pain"], progressionCriterion: "LSI >90%, H:Q >0.6" }
        ],
        restrictions: ["Continue Nordic eccentric 2x/week indefinitely"],
        milestone: "Full clearance for sport"
      }
    },
    contraindicatedExercises: ["aggressive hamstring stretching acute", "full-effort sprinting early", "loaded hip flexion knee extended"],
    returnCriteria: [
      "Pain-free sport-specific training including sprinting",
      "Hamstring isokinetic strength LSI >90% at 60°/s and 300°/s",
      "H:Q ratio >0.6",
      "Pain-free Nordic eccentric at full range",
      "No tenderness to palpation at injury site",
      "Completed sprint progression without symptoms"
    ]
  }),

  // ===== QUADS =====

  p({
    id: "quadriceps-strain",
    zone: "quads", diagnosis: "Quadriceps strain",
    aliases: ["quad strain", "rectus femoris strain", "thigh strain", "quad pull"],
    severity: "moderate",
    description: "Strain of quadriceps, most commonly rectus femoris, from explosive hip flexion or kicking.",
    typicalRecoveryWeeks: [3, 8],
    phases: {
      acute: {
        goals: ["Reduce anterior thigh pain", "Protect quadriceps", "Pain-free knee ROM", "Isometric quad activation"],
        exercises: [
          { name: "Isometric quad sets", description: "Supine, contract quadriceps pushing knee into extension hold 10s", sets: 3, reps: 10, frequency: "3x daily", contraindications: ["pain >3/10"], progressionCriterion: "Pain-free strong contraction" },
          { name: "Heel slides pain-free", description: "Supine, slide heel toward glutes within pain-free range", sets: 3, reps: 15, frequency: "2x daily", contraindications: ["quad pain with flexion"], progressionCriterion: "Full pain-free knee flexion" },
          { name: "Stationary bike high seat", description: "High seat, no resistance, pain-free range", sets: 1, reps: 10, frequency: "daily", contraindications: ["increased quad pain"], progressionCriterion: "10min pain-free" }
        ],
        restrictions: ["No deep squats", "No explosive kicking", "Avoid eccentric quad loading", "No sprinting"],
        milestone: "Pain-free knee ROM, isometric quad activation"
      },
      subacute: {
        goals: ["Begin eccentric quad loading", "Improve quad strength", "Normalize gait"],
        exercises: [
          { name: "Eccentric leg extension light", description: "Seated leg extension, assist up 5s eccentric lowering (limited ROM 90-60°)", sets: 3, reps: 12, frequency: "daily", contraindications: ["quad pain eccentric"], progressionCriterion: "3x12 pain-free" },
          { name: "Mini-squats 0-45°", description: "Partial bodyweight squats, controlled, pain-free", sets: 3, reps: 15, frequency: "daily", contraindications: ["anterior thigh pain"], progressionCriterion: "3x15 pain-free" },
          { name: "Straight leg raises", description: "SLR supine, no quad lag, hold 5s", sets: 3, reps: 10, frequency: "daily", contraindications: ["quad lag"], progressionCriterion: "3x10 no lag" }
        ],
        restrictions: ["No explosive movements", "No deep squats >60°", "No running"],
        milestone: "Pain-free eccentric loading, improved quad strength"
      },
      rehab: {
        goals: ["Progressive quad loading", "Running reintroduction", "Sport-specific preparation"],
        exercises: [
          { name: "Leg press progressive", description: "Leg press 0-100°, progressive load", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "4x10 moderate load" },
          { name: "Step-downs", description: "Step-down from 15-25cm box controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 from 30cm" },
          { name: "Walk-jog progression", description: "Gradual run return every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["quad pain running"], progressionCriterion: "20min continuous run" },
          { name: "SL squat to 60°", description: "SL squat partial range controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain/instability"], progressionCriterion: "3x10 to 60°" }
        ],
        restrictions: ["No sprinting", "No plyometrics"],
        milestone: "Pain-free running, progressive quad strength"
      },
      strength: {
        goals: ["Full LE strength LSI >90%", "Sport-specific power"],
        exercises: [
          { name: "Barbell back squat", description: "Full squat progressive loading", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "1.25x BW squat" },
          { name: "Bulgarian split squat", description: "Rear foot elevated split squat", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["balance/pain"], progressionCriterion: "3x8 each" },
          { name: "Forward lunges weighted", description: "Lunges with dumbbells controlled", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 at 50% BW" }
        ],
        restrictions: ["No competition intensity yet"],
        milestone: "Full strength sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Prevention education"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport including kicking, sprinting, jumping", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return quad pain"], progressionCriterion: "Full practice no pain" },
          { name: "Sprint and kicking progression", description: "Progressive speed and kicking power", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full intensity no pain" }
        ],
        restrictions: ["Continue quad eccentric program 2x/week"],
        milestone: "Full sport return"
      }
    },
    contraindicatedExercises: ["heavy eccentric knee extension acute", "full squat acute", "explosive kicking early"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "Quad strength LSI >90%",
      "Pain-free SL squat to 90°",
      "Pain-free kicking/sprinting",
      "No quad tenderness to palpation"
    ]
  }),

  p({
    id: "quadriceps-tendinopathy",
    zone: "quads", diagnosis: "Quadriceps tendinopathy",
    aliases: ["quad tendonitis", "quadriceps tendonitis", "suprapatellar tendinopathy", "jumper's knee (quad)"],
    severity: "moderate",
    description: "Overuse tendinopathy of the quadriceps tendon at the superior pole of the patella, common in jumping sports.",
    typicalRecoveryWeeks: [6, 12],
    phases: {
      acute: {
        goals: ["Reduce suprapatellar pain", "Unload quad tendon", "Pain-free knee ROM"],
        exercises: [
          { name: "Isometric quad at 60°", description: "Seated knee extension machine or with band, hold at 60° at 60% max 45s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["pain >3/10"], progressionCriterion: "Pain-free 45s holds" },
          { name: "Stationary bike high seat", description: "High seat no resistance pain-free cycling", sets: 1, reps: 10, frequency: "daily", contraindications: ["increased quad tendon pain"], progressionCriterion: "10min pain-free" },
          { name: "Straight leg raises", description: "Supine, SLR without quad lag, hold 5s", sets: 3, reps: 15, frequency: "daily", contraindications: ["pain with SLR"], progressionCriterion: "3x15 pain-free" }
        ],
        restrictions: ["No jumping/plyometrics", "No deep squats >60°", "No sprinting"],
        milestone: "Pain-free isometric holds, reduced resting pain"
      },
      subacute: {
        goals: ["Begin eccentric loading", "Improve quadriceps flexibility", "Address kinetic chain"],
        exercises: [
          { name: "Eccentric squat on decline board", description: "25° decline board, controlled 5s eccentric on affected leg", sets: 3, reps: 15, frequency: "daily", contraindications: ["sharp suprapatellar pain"], progressionCriterion: "3x15 minimal discomfort" },
          { name: "Quad isometric at multiple angles", description: "Isometric quad at 30°, 60°, 90°, hold 30s each", sets: 3, reps: 3, frequency: "daily", contraindications: ["pain at any angle"], progressionCriterion: "Pain-free all angles" },
          { name: "Quadriceps stretching prone", description: "Prone quad stretch, hold 30s gentle", sets: 3, reps: 1, frequency: "2x daily", contraindications: ["knee compression pain"], progressionCriterion: "Full pain-free flexion" }
        ],
        restrictions: ["No explosive movements", "No jumping", "Limit loaded knee extension"],
        milestone: "Pain-free eccentric decline squats"
      },
      rehab: {
        goals: ["Increase load tolerance", "Progress to sport-specific loading", "Running reintroduction"],
        exercises: [
          { name: "Progressive eccentric squat", description: "Weighted eccentric squat, controlled, increased load", sets: 4, reps: 10, frequency: "5x/week", contraindications: ["pain >2/10"], progressionCriterion: "4x10 at 50% BW added" },
          { name: "SL press 0-60°", description: "SL leg press, controlled 3s eccentric", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain any range"], progressionCriterion: "3x12 at 1x BW" },
          { name: "Step-downs forward", description: "Step-down from box, controlled descent", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain/valgus"], progressionCriterion: "3x12 from 30cm" },
          { name: "Walk-jog progression", description: "Progressive run return every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["quad tendon pain running"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No jumping/plyometrics", "No heavy landing drills"],
        milestone: "Tolerating sport-like loading, pain-free running"
      },
      strength: {
        goals: ["Full LE strength LSI >90%", "Sport-specific power", "Plyometric preparation"],
        exercises: [
          { name: "Full back squats", description: "Barbell squat to parallel progressive", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["pain during descent"], progressionCriterion: "1.5x BW squat" },
          { name: "Depth drops low box", description: "Step off 20-30cm box soft landing", sets: 3, reps: 6, frequency: "2x/week", contraindications: ["pain on landing"], progressionCriterion: "Soft landing equal bilaterally" },
          { name: "Reverse Nordic curls", description: "Kneeling, control descent backward", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["suprapatellar pain"], progressionCriterion: "3x8 full range" }
        ],
        restrictions: ["No competition intensity", "Monitor tendon day-after response"],
        milestone: "Full strength, pain-free plyometrics"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Pass RTS testing", "Load management education"],
        exercises: [
          { name: "Sport-specific drills", description: "Full intensity sport-specific movements", sets: 5, reps: 10, frequency: "4x/week", contraindications: ["pain during/after"], progressionCriterion: "Full practice no reaction" },
          { name: "Repeated jump test", description: "10 repeated CMJ, measure height and contact time", sets: 3, reps: 10, frequency: "2x/week", contraindications: ["pain/hesitation"], progressionCriterion: "LSI >90% all metrics" },
          { name: "Change-of-direction drills", description: "Reactive cutting at 90° and 180°", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["knee pain/instability"], progressionCriterion: "Confident full-speed cuts" }
        ],
        restrictions: ["No back-to-back high intensity initially", "Continue eccentric program 2x/week"],
        milestone: "Cleared for full sport participation"
      }
    },
    contraindicatedExercises: ["deep squat full depth early", "heavy leg extension 0-30°", "jumping on hard surfaces early"],
    returnCriteria: [
      "Pain-free sport-specific training",
      "LSI >90% isometric knee extension at 60°",
      "Eccentric squat tolerance >50% BW",
      "No reactive tendon pain to palpation",
      "Pass functional hop test battery",
      "Pain-free 3 consecutive high-intensity sessions"
    ]
  }),

  // ===== ADDUCTORS (HIPS) =====

  p({
    id: "hip-groin-strain",
    zone: "hips", diagnosis: "Groin strain",
    aliases: ["adductor strain", "groin pull", "adductor longus strain", "inguinal strain"],
    severity: "moderate",
    description: "Strain of the adductor musculature, most commonly adductor longus, from explosive lateral movement or kicking.",
    typicalRecoveryWeeks: [3, 8],
    phases: {
      acute: {
        goals: ["Reduce groin pain", "Protect adductors", "Pain-free hip ROM", "Isometric adductor activation"],
        exercises: [
          { name: "Isometric adductor squeeze", description: "Supine knees bent, squeeze ball/pillow between knees, hold 30s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["groin pain >3/10"], progressionCriterion: "Pain-free 30s hold" },
          { name: "Stationary bike high seat", description: "High seat no resistance, avoid hip abduction range", sets: 1, reps: 10, frequency: "daily", contraindications: ["groin pain cycling"], progressionCriterion: "10min pain-free" },
          { name: "Standing weight shifts", description: "Gentle side-to-side weight shifts, pain-free range", sets: 3, reps: 10, frequency: "2x daily", contraindications: ["groin pain"], progressionCriterion: "Pain-free" }
        ],
        restrictions: ["No resisted adduction", "No explosive lateral movement", "No kicking", "No deep squat wide stance", "No cutting/pivoting"],
        milestone: "Pain-free isometric adduction, reduced groin pain"
      },
      subacute: {
        goals: ["Begin eccentric adductor loading", "Improve adductor strength", "Address lumbopelvic control"],
        exercises: [
          { name: "Side-lying hip adduction", description: "Side-lying, bottom leg adduction against gravity or light weight", sets: 3, reps: 15, frequency: "daily", contraindications: ["groin pain"], progressionCriterion: "3x15 pain-free" },
          { name: "Copenhagen adductor light", description: "Side plank variation, bottom leg adduction lift, knee on support", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["groin pain"], progressionCriterion: "3x8 controlled" },
          { name: "Squats narrow stance", description: "Bodyweight narrow stance squat partial range", sets: 3, reps: 12, frequency: "daily", contraindications: ["groin pain"], progressionCriterion: "3x12 pain-free" },
          { name: "Lateral lunges light", description: "Controlled lateral lunge, short range, maintain alignment", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["groin pain"], progressionCriterion: "3x10 each" }
        ],
        restrictions: ["No full-effort kicking", "No cutting/pivoting", "No sprinting"],
        milestone: "Pain-free eccentric adductor loading"
      },
      rehab: {
        goals: ["Progressive adductor loading", "Sport-specific preparation", "Running reintroduction"],
        exercises: [
          { name: "Copenhagen adductor progression", description: "Progress to full Copenhagen adductor hold/lift", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["groin pain"], progressionCriterion: "3x8 full side plank adduction" },
          { name: "Lateral lunges full range", description: "Full lateral lunge controlled descent", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 each side" },
          { name: "Cable hip adduction", description: "Cable standing hip adduction controlled tempo", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 moderate weight" },
          { name: "Walk-jog progression", description: "Gradual run return every other day", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["groin pain"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No full-speed cutting", "No kicking sports"],
        milestone: "Pain-free running, full adductor strength"
      },
      strength: {
        goals: ["Full adductor strength LSI >90%", "Sport-specific power"],
        exercises: [
          { name: "Copenhagen adductor heavy", description: "Full Copenhagen adductor, bodyweight progressive", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x6 each side" },
          { name: "Lateral lunges weighted", description: "Lateral lunges with dumbbell", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 each 50% BW" },
          { name: "SL squat and adductor combo", description: "SL squat with adductor squeeze at top", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 each" }
        ],
        restrictions: ["No competition intensity yet"],
        milestone: "Full adductor strength sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Prevention education"],
        exercises: [
          { name: "Sport-specific training", description: "Full intensity sport including cutting, kicking, lateral movement", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of groin pain"], progressionCriterion: "Full practice no pain" },
          { name: "Sprint and cut progression", description: "Full speed sprinting, cutting, sport-specific agility", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain cutting"], progressionCriterion: "Full speed no pain" },
          { name: "Kicking progression", description: "Progressive kicking power and distance", sets: 4, reps: 6, frequency: "3x/week", contraindications: ["groin pain"], progressionCriterion: "Full power no pain" }
        ],
        restrictions: ["Continue adductor program 2x/week"],
        milestone: "Full return to sport"
      }
    },
    contraindicatedExercises: ["resisted adduction acute", "full Copenhagen early", "explosive cutting acute"],
    returnCriteria: [
      "Pain-free sport-specific training including cutting/kicking",
      "Adductor strength LSI >90%",
      "Pain-free Copenhagen adductor test",
      "Pain-free resisted adduction at 0° and 45° hip flexion",
      "Normal squeeze test"
    ]
  }),

  p({
    id: "hip-adductor-tendinopathy",
    zone: "hips", diagnosis: "Adductor tendinopathy",
    aliases: ["adductor enthesopathy", "chronic groin pain", "adductor longus tendinopathy"],
    severity: "moderate",
    description: "Chronic overuse tendinopathy of the adductor tendons at the pubic symphysis origin, common in soccer and hockey.",
    typicalRecoveryWeeks: [8, 16],
    phases: {
      acute: {
        goals: ["Reduce chronic groin pain", "Unload adductor tendons", "Pain-free isometric control", "Identify training errors"],
        exercises: [
          { name: "Isometric adductor squeeze at 45°", description: "Supine knees bent 45°, squeeze ball between knees at 60% max 45s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["groin pain >3/10"], progressionCriterion: "Pain-free 45s hold" },
          { name: "Isometric adductor at 90°", description: "Supine hips/knees 90°, squeeze ball 45s", sets: 3, reps: 5, frequency: "3x daily", contraindications: ["pain"], progressionCriterion: "Pain-free 45s hold" },
          { name: "Stationary bike no resistance", description: "High seat, pain-free cycling, avoid wide knee position", sets: 1, reps: 10, frequency: "daily", contraindications: ["increased groin pain"], progressionCriterion: "15min pain-free" }
        ],
        restrictions: ["No resisted adduction", "No explosive lateral movement", "No kicking", "No deep squat wide stance", "No sprinting/cutting"],
        milestone: "Pain-free isometric adduction at multiple angles"
      },
      subacute: {
        goals: ["Begin heavy slow resistance adduction", "Improve adductor strength/endurance", "Address pelvic stability"],
        exercises: [
          { name: "SL hip adduction side-lying", description: "Side-lying bottom leg adduction, slow controlled", sets: 4, reps: 8, frequency: "daily", contraindications: ["pain"], progressionCriterion: "4x8 heavy slow" },
          { name: "Copenhagen adductor light", description: "Knee-on support Copenhagen, hold 5s", sets: 3, reps: 8, frequency: "3x/week", contraindications: ["groin pain"], progressionCriterion: "3x8 hold 10s" },
          { name: "Squats narrow stance controlled", description: "Narrow squat to 60°, controlled tempo", sets: 3, reps: 12, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x12 pain-free" },
          { name: "Lateral band walks", description: "Band above ankles lateral steps, controlled adductor loading", sets: 3, reps: 12, frequency: "daily", contraindications: ["pain"], progressionCriterion: "3x12 each direction" }
        ],
        restrictions: ["No high-impact adductor loading", "No kicking", "No explosive lateral"],
        milestone: "Pain-free heavy slow resistance adduction"
      },
      rehab: {
        goals: ["Progressive adductor loading", "Sport-specific preparation", "Return to running"],
        exercises: [
          { name: "Copenhagen adductor progression", description: "Progress to full Copenhagen with holds and lifts", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 full" },
          { name: "Cable hip adduction heavy slow", description: "Cable adduction 3s concentric 3s eccentric", sets: 4, reps: 8, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "4x8 heavy" },
          { name: "Lateral lunges full", description: "Full lateral lunge controlled", sets: 3, reps: 10, frequency: "3x/week", contraindications: ["pain"], progressionCriterion: "3x10 each" },
          { name: "Walk-jog progression", description: "Progressive run return", sets: 1, reps: 1, frequency: "3x/week", contraindications: ["groin pain running"], progressionCriterion: "20min continuous run" }
        ],
        restrictions: ["No full-effort kicking/cutting"],
        milestone: "Pain-free running, progressive adductor loading"
      },
      strength: {
        goals: ["Full adductor strength LSI >90%", "Sport-specific power"],
        exercises: [
          { name: "Copenhagen adductor heavy", description: "Full Copenhagen heavy holds and lifts", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x6 each side" },
          { name: "Weighted lateral lunges", description: "Lateral lunges with dumbbells heavy", sets: 3, reps: 8, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "3x8 each 50% BW" },
          { name: "Sumo deadlift", description: "Sumo stance deadlift progressive, hip adductor focus", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["groin pain"], progressionCriterion: "1.25x BW sumo DL" }
        ],
        restrictions: ["No competition intensity"],
        milestone: "Full adductor strength sport-ready"
      },
      "return-to-sport": {
        goals: ["Full sport participation", "Long-term prevention", "Load management education"],
        exercises: [
          { name: "Sport-specific full practice", description: "Full intensity sport including kicking, cutting, lateral movement", sets: 4, reps: 10, frequency: "3x/week", contraindications: ["return of groin pain"], progressionCriterion: "Full practice no pain" },
          { name: "Kicking and sprint progression", description: "Full power kicking and sprinting", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain"], progressionCriterion: "Full power no pain" },
          { name: "Change-of-direction reactive", description: "Reactive cutting at full speed", sets: 4, reps: 6, frequency: "2x/week", contraindications: ["pain/hesitation"], progressionCriterion: "Full speed no pain" }
        ],
        restrictions: ["Continue heavy slow resistance adductor 2x/week"],
        milestone: "Full clearance for sport"
      }
    },
    contraindicatedExercises: ["explosive adduction acute", "full kicking early", "wide stance deep squat acute"],
    returnCriteria: [
      "Pain-free sport-specific training including kicking/cutting",
      "Adductor strength LSI >90%",
      "Pain-free Copenhagen test",
      "Pain-free squeeze test at 45° and 90°",
      "No pubic symphysis tenderness",
      "Completed kicking/sprint progression"
    ]
  }),

  // ===== CLOSE MAP AND EXPORT HELPERS =====
];

export const protocolLibrary: Map<string, InjuryProtocol> = new Map(
  protocolsList.map(pr => [pr.id, pr] as [string, InjuryProtocol])
);

export function getProtocolsForZone(zone: BodyZone): InjuryProtocol[] {
  return Array.from(protocolLibrary.values()).filter(p => p.zone === zone);
}

export function findProtocol(diagnosis: string): InjuryProtocol | undefined {
  return Array.from(protocolLibrary.values()).find(p =>
    p.diagnosis.toLowerCase().includes(diagnosis.toLowerCase()) ||
    p.aliases.some(a => a.toLowerCase().includes(diagnosis.toLowerCase()))
  );
}

export function getProtocolById(id: string): InjuryProtocol | undefined {
  return protocolLibrary.get(id);
}

export function getAllProtocols(): InjuryProtocol[] {
  return Array.from(protocolLibrary.values());
}
