import type { LearnLessonDetail, LevelDefinition } from "../../types/learn";
import { SOIL_STEP_1_LEVEL_DEFINITION } from "../dummy/soilHealthStep1Data";

/**
 * Common, centralized single source of truth for the Soil Health Module:
 * - Lesson Overview metadata & learning outcomes
 * - 15 progressive level nodes on the timeline
 * - Exact level phase definitions (Level 1, Level 2, Level 3, etc.)
 */

export const SOIL_HEALTH_TIMELINE_LEVELS = [
  {
    id: "soil-level-1",
    levelNumber: 1,
    titleKey: "lesson.soil.level1.title",
    descriptionKey: "lesson.desc.soil",
    durationMinutes: 5,
    xp: 30,
    status: "available" as const,
    progressFraction: 0,
  },
  {
    id: "soil-level-2",
    levelNumber: 2,
    titleKey: "lesson.soil.level2.title",
    descriptionKey: "lesson.soil.part2.desc",
    durationMinutes: 4,
    xp: 80,
    status: "locked" as const,
    progressFraction: 0,
  },
  {
    id: "soil-level-3",
    levelNumber: 3,
    titleKey: "lesson.soil.level3.title",
    descriptionKey: "lesson.soil.part3.desc",
    durationMinutes: 6,
    xp: 90,
    status: "locked" as const,
    progressFraction: 0,
  },
  {
    id: "soil-level-4",
    levelNumber: 4,
    titleKey: "lesson.soil.level4.title",
    descriptionKey: "lesson.soil.part3.desc",
    durationMinutes: 6,
    xp: 80,
    status: "locked" as const,
    progressFraction: 0,
  },
  {
    id: "soil-level-5",
    levelNumber: 5,
    titleKey: "lesson.soil.level5.title",
    descriptionKey: "lesson.desc.mulch",
    durationMinutes: 5,
    xp: 80,
    status: "locked" as const,
    progressFraction: 0,
  },
];

export const SOIL_HEALTH_LESSON_BASE: LearnLessonDetail = {
  id: "soil-level-1",
  categoryId: "soil",
  titleKey: "lesson.title.soil",
  descriptionKey: "lesson.desc.soil",
  durationMinutes: 26,
  totalLevels: 5,
  totalXp: 360,
  whyItMattersKey: "lesson.soil.detail.whyItMatters",
  learningOutcomes: [
    { id: "outcome-1", textKey: "lesson.soil.outcome.1" },
    { id: "outcome-2", textKey: "lesson.soil.outcome.2" },
    { id: "outcome-3", textKey: "lesson.soil.outcome.3" },
  ],
  taraQuoteKey: "lesson.soil.detail.taraQuote",
  taraExpression: "excited",
  levels: SOIL_HEALTH_TIMELINE_LEVELS,
};

// ─────────────────────────────────────────────
// LEVEL 2 — SOIL IS ALIVE DEFINITION
// ─────────────────────────────────────────────

export const SOIL_LEVEL_2_DEFINITION: LevelDefinition = {
  id: "soil-level-2",
  lessonId: "soil-level-1",
  levelNumber: 2,
  title: "Soil Is Alive",
  subtitle: "Discover the living ecosystem beneath your feet",
  xpReward: 80,
  phases: [
    // Phase 1: Concept Cards with Tara Introduction Story
    {
      type: "conceptCards",
      id: "soil-alive-concept-cards",
      title: "Soil Is Alive",
      taraDialogue:
        "Look at the soil beneath your feet. It may seem quiet and still, but it is full of life! Tiny organisms, earthworms, plant roots, air, water, and organic matter all interact inside the soil. Soil isn't just where a plant stands—it's a home where many living things work together.",
      taraExpression: "excited",
      explanation: {
        tag: "SOIL ECOSYSTEM",
        title: "Soil is a Living Community",
        description:
          "Soil contains many living organisms interacting with roots and organic material to create a thriving living system.",
        bulletPoints: [
          {
            title: "Living Community",
            text: "Soil contains microscopic organisms to earthworms interacting together.",
            icon: "public",
          },
          {
            title: "Channels & Air",
            text: "Earthworms and root systems move through the soil, mixing nutrients.",
            icon: "waves",
          },
          {
            title: "Nutrient Recycling",
            text: "Microorganisms break down plant materials into natural fertility.",
            icon: "eco",
          },
        ],
      },
      progressiveHighlights: [
        "Soil contains a busy world of interacting organisms.",
        "Earthworms are observable signs of active soil life.",
        "Microorganisms recycle organic matter into plant nutrients.",
        "The entire soil community works together as an ecosystem.",
      ],
      transitionText: "Let's meet the key members of the soil community!",
      cards: [
        {
          id: "card-soil-alive",
          title: "Soil Is Alive",
          icon: "public",
          color: "#4CAF50",
          taraDialogue:
            "What looks like ordinary soil can actually be a busy little world!",
        },
        {
          id: "card-earthworms",
          title: "Meet the Earthworm",
          icon: "waves",
          color: "#8D6E63",
          taraDialogue:
            "These little soil explorers spend their lives burrowing and creating channels in the ground.",
        },
        {
          id: "card-microorganisms",
          title: "The Tiny Workers",
          icon: "scatter-plot",
          color: "#0284C7",
          taraDialogue:
            "Some of the most important soil workers are so tiny that we can't see them with our eyes!",
        },
        {
          id: "card-organic-matter",
          title: "Food for the Soil",
          icon: "compost",
          color: "#795548",
          taraDialogue:
            "The leaves and plant materials that return to the soil don't disappear—they become part of the soil story.",
        },
        {
          id: "card-soil-community",
          title: "Everyone Has a Role",
          icon: "hub",
          color: "#F59E0B",
          taraDialogue:
            "Soil health isn't about one hero. It's about the whole community working together!",
        },
      ],
    },

    // Phase 2: Match-Up Game — "Who Does What?"
    {
      type: "match",
      id: "soil-alive-matchup",
      title: "Who Does What?",
      instructions: "Connect each soil friend with their role in the community.",
      xp: 30,
      taraDialogue:
        "Who does what in the soil? Tap a soil friend on the left, then connect their role on the right!",
      taraExpression: "happy",
      taraSuccessDialogue:
        "You just met some of the important members of the soil community!",
      pairs: [
        {
          id: "pair-earthworm",
          leftText: "Earthworm",
          rightText: "Creates channels / moves through soil",
        },
        {
          id: "pair-microorganisms",
          leftText: "Microorganisms",
          rightText: "Help break down organic materials",
        },
        {
          id: "pair-roots",
          leftText: "Plant roots",
          rightText: "Take up water and nutrients",
        },
        {
          id: "pair-organic",
          leftText: "Organic matter",
          rightText: "Provides material for decomposition",
        },
      ],
    },

    // Phase 3: MCQ Questions
    {
      type: "mcq",
      id: "soil-alive-mcq",
      taraExpressionCorrect: "excited",
      taraExpressionIncorrect: "thinking",
      totalXp: 50,
      questions: [
        {
          id: "q1-why-alive",
          question: "Why do we say that soil is alive?",
          xp: 20,
          options: [
            {
              id: "opt-1a",
              text: "Because soil can walk",
              isCorrect: false,
              explanation: "Soil doesn't walk, but living organisms move within it.",
            },
            {
              id: "opt-1b",
              text: "Because soil contains living organisms that interact with plants and organic matter",
              isCorrect: true,
              explanation:
                "Exactly! Soil is home to many living organisms that interact with the rest of the soil system.",
            },
            {
              id: "opt-1c",
              text: "Because soil moves by itself",
              isCorrect: false,
              explanation: "Soil itself is the medium; life thrives inside it.",
            },
            {
              id: "opt-1d",
              text: "Because soil always contains worms",
              isCorrect: false,
              explanation: "Not all soil contains worms, but living life makes it active.",
            },
          ],
        },
        {
          id: "q2-farmer-observation",
          question:
            "A farmer sees earthworms and plant residues in the soil. What can these observations tell the farmer?",
          xp: 30,
          options: [
            {
              id: "opt-2a",
              text: "The soil is definitely perfect",
              isCorrect: false,
              explanation: "No single clue tells the whole story.",
            },
            {
              id: "opt-2b",
              text: "The soil has no nutrients",
              isCorrect: false,
              explanation: "Residue and earthworms actually support nutrient cycling.",
            },
            {
              id: "opt-2c",
              text: "These can be signs of biological activity, but soil health should be understood using several clues",
              isCorrect: true,
              explanation:
                "Good thinking! One clue doesn't tell the whole story. We look at many signs together.",
            },
            {
              id: "opt-2d",
              text: "The farmer should remove the worms",
              isCorrect: false,
              explanation: "Earthworms are beneficial soil friends and should remain!",
            },
          ],
        },
      ],
    },

    // Phase 4: Level Completion & Reward
    {
      type: "reward",
      id: "soil-level-2-reward",
      xp: 80,
      badgeTitle: "Soil Explorer",
      badgeIcon: "eco",
      taraDialogue:
        "Soil isn't just dirt—it's a living world! You've mastered how soil life works together.",
      taraExpression: "excited",
    },
  ],
};

// ─────────────────────────────────────────────
// LEVEL 3 — WHAT MAKES SOIL HEALTHY?
// ─────────────────────────────────────────────

export const SOIL_LEVEL_3_DEFINITION: LevelDefinition = {
  id: "soil-level-3",
  lessonId: "soil-level-1",
  levelNumber: 3,
  title: "What Makes Soil Healthy?",
  subtitle: "Discover how structure, water, air, and biology work together",
  xpReward: 90,
  phases: [
    // Phase 1: Concept Cards
    {
      type: "conceptCards",
      id: "soil-healthy-concept-cards",
      title: "What Makes Soil Healthy?",
      taraDialogue:
        "Healthy soil is like a well-balanced home! It needs good structure with space for roots, balanced moisture and air, plenty of organic matter, and active living biology working as a team.",
      taraExpression: "excited",
      explanation: {
        tag: "SOIL HEALTH BALANCE",
        title: "The Pillars of Healthy Soil",
        description:
          "Soil health is the continued capacity of soil to function as a vital living ecosystem that sustains plants, animals, and humans.",
        bulletPoints: [
          {
            title: "Soil Structure",
            text: "Crumby, loose soil allows roots to penetrate deep and breathe freely.",
            icon: "grid-view",
          },
          {
            title: "Water & Air Balance",
            text: "Pore spaces should hold moisture while allowing oxygen exchange.",
            icon: "water-drop",
          },
          {
            title: "Living Community",
            text: "Active biology and organic matter recycle nutrients continuously.",
            icon: "biotech",
          },
        ],
      },
      progressiveHighlights: [
        "Soil structure creates room for root expansion.",
        "A healthy balance of air and water is essential.",
        "Organic matter feeds biological activity.",
        "Multiple clues together reveal overall soil health.",
      ],
      transitionText: "Let's explore the 5 core pillars of healthy soil!",
      cards: [
        {
          id: "card-structure",
          title: "Soil Structure",
          icon: "grid-view",
          color: "#795548",
          taraDialogue:
            "Good soil structure creates channels and pores so roots can grow deep and strong!",
        },
        {
          id: "card-water",
          title: "Water Balance",
          icon: "water-drop",
          color: "#0284C7",
          taraDialogue:
            "Healthy soil acts like a sponge, holding moisture without drowning the roots.",
        },
        {
          id: "card-air",
          title: "Soil Air",
          icon: "air",
          color: "#26A69A",
          taraDialogue:
            "Roots and microorganisms need oxygen just like we do! Pore spaces let air circulate.",
        },
        {
          id: "card-organic",
          title: "Organic Matter",
          icon: "compost",
          color: "#689F38",
          taraDialogue:
            "Organic material feeds soil organisms and builds natural water storage.",
        },
        {
          id: "card-life",
          title: "Soil Life",
          icon: "biotech",
          color: "#FFA000",
          taraDialogue:
            "Biological activity is one of the most reliable clues that soil is functioning well.",
        },
      ],
    },

    // Phase 2: Mini-Game — Healthy Soil Challenge ("Choose the Better Soil")
    {
      type: "scenarioChallenge",
      id: "soil-healthy-challenge",
      title: "Healthy Soil Challenge",
      subtitle: "Choose the Better Soil",
      instructions: "Observe each situation and select the healthier soil condition.",
      xp: 30,
      taraDialogue:
        "Time for the Healthy Soil Challenge! Compare the situations and choose the better soil condition.",
      taraExpression: "happy",
      taraSuccessDialogue:
        "Great! Healthy soil isn't about one perfect feature. We look at different clues and how they work together.",
      rounds: [
        {
          id: "round-1-structure",
          roundNumber: 1,
          topic: "Structure",
          prompt: "Which soil gives roots more room to grow?",
          options: [
            {
              id: "opt-r1-a",
              label: "A",
              title: "Very compact soil",
              subtitle: "Dense, hard surface with minimal pore space",
              icon: "block",
              isCorrect: false,
              explanation: "Compact soil restricts root growth and blocks air movement.",
            },
            {
              id: "opt-r1-b",
              label: "B",
              title: "Soil with visible spaces",
              subtitle: "Crumby, loose structure with open channels",
              icon: "check-circle",
              isCorrect: true,
              explanation: "Open pore spaces allow roots to spread easily and access nutrients.",
            },
          ],
        },
        {
          id: "round-2-water",
          roundNumber: 2,
          topic: "Water & Air",
          prompt: "Which situation gives roots a better balance of water and air?",
          options: [
            {
              id: "opt-r2-a",
              label: "A",
              title: "Completely dry soil",
              subtitle: "Hard and desiccated without moisture",
              icon: "water-damage",
              isCorrect: false,
              explanation: "Without water, plants cannot take up essential dissolved nutrients.",
            },
            {
              id: "opt-r2-b",
              label: "B",
              title: "Soil holding some water with spaces remaining",
              subtitle: "Moist sponge-like texture with oxygen pores",
              icon: "check-circle",
              isCorrect: true,
              explanation: "This ideal balance provides both moisture and oxygen for roots!",
            },
            {
              id: "opt-r2-c",
              label: "C",
              title: "Completely waterlogged soil",
              subtitle: "Standing water filling all pore spaces",
              icon: "flood",
              isCorrect: false,
              explanation: "Waterlogged soil pushes out oxygen, suffocating plant roots.",
            },
          ],
        },
        {
          id: "round-3-organic",
          roundNumber: 3,
          topic: "Organic Matter",
          prompt: "Which soil has a visible source of organic material?",
          options: [
            {
              id: "opt-r3-a",
              label: "A",
              title: "Bare soil",
              subtitle: "Exposed dry ground with no cover",
              icon: "landscape",
              isCorrect: false,
              explanation: "Bare soil lacks protective cover and organic inputs.",
            },
            {
              id: "opt-r3-b",
              label: "B",
              title: "Soil with plant residues/organic material",
              subtitle: "Natural mulch and decaying plant material",
              icon: "check-circle",
              isCorrect: true,
              explanation: "Plant residues protect the surface and nourish soil organisms.",
            },
          ],
        },
        {
          id: "round-4-life",
          roundNumber: 4,
          topic: "Soil Life",
          prompt: "Which is a useful clue when observing soil?",
          options: [
            {
              id: "opt-r4-a",
              label: "A",
              title: "Soil with signs of biological activity",
              subtitle: "Worm castings, root networks, insect activity",
              icon: "check-circle",
              isCorrect: true,
              explanation: "Biological activity is a vital indicator of an active soil ecosystem.",
            },
            {
              id: "opt-r4-b",
              label: "B",
              title: "Soil with no visible signs of life",
              subtitle: "Inert ground with zero biological cues",
              icon: "cancel",
              isCorrect: false,
              explanation: "Lack of life often indicates low fertility or poor structure.",
            },
          ],
        },
      ],
    },

    // Phase 3: MCQ Questions
    {
      type: "mcq",
      id: "soil-healthy-mcq",
      taraExpressionCorrect: "excited",
      taraExpressionIncorrect: "thinking",
      totalXp: 60,
      questions: [
        {
          id: "q1-healthy-definition",
          question: "Which statement best describes healthy soil?",
          xp: 30,
          options: [
            {
              id: "opt-q1-a",
              text: "Soil is healthy only when it has lots of nutrients",
              isCorrect: false,
              explanation: "Nutrients alone without good structure and life cannot support plants.",
            },
            {
              id: "opt-q1-b",
              text: "Soil is healthy when different physical, chemical and biological properties work together to support plants and soil life",
              isCorrect: true,
              explanation:
                "Exactly! Healthy soil is an integrated living system where physics, chemistry, and biology work together.",
            },
            {
              id: "opt-q1-c",
              text: "Soil is healthy when it is completely dry",
              isCorrect: false,
              explanation: "Dry soil cannot support biological activity or nutrient transport.",
            },
            {
              id: "opt-q1-d",
              text: "Soil is healthy when it has many earthworms",
              isCorrect: false,
              explanation: "Worms are one clue, but healthy soil requires multiple factors together.",
            },
          ],
        },
        {
          id: "q2-waterlogged-scenario",
          question:
            "After heavy rain, a field remains completely waterlogged for a long time. What could this mean for the root environment?",
          xp: 30,
          options: [
            {
              id: "opt-q2-a",
              text: "Roots may have less access to air",
              isCorrect: true,
              explanation:
                "Exactly! Roots need both water and air. Healthy soil needs to manage both.",
            },
            {
              id: "opt-q2-b",
              text: "Roots get unlimited oxygen",
              isCorrect: false,
              explanation: "Water displaces oxygen in waterlogged soil.",
            },
            {
              id: "opt-q2-c",
              text: "Soil becomes healthier automatically",
              isCorrect: false,
              explanation: "Persistent waterlogging harms root health and beneficial aerobes.",
            },
            {
              id: "opt-q2-d",
              text: "Plants no longer need nutrients",
              isCorrect: false,
              explanation: "Plants always require balanced nutrients.",
            },
          ],
        },
      ],
    },

    // Phase 4: Level Completion & Reward
    {
      type: "reward",
      id: "soil-level-3-reward",
      xp: 90,
      badgeTitle: "Soil Health Steward",
      badgeIcon: "verified",
      taraDialogue:
        "Incredible! You've learned that healthy soil comes from a balance of structure, water, air, and living biology working together!",
      taraExpression: "excited",
    },
  ],
};

// ─────────────────────────────────────────────
// LEVEL 4 — SOIL CONNECTIONS
// ─────────────────────────────────────────────

export const SOIL_LEVEL_4_DEFINITION: LevelDefinition = {
  id: "soil-level-4",
  lessonId: "soil-level-1",
  levelNumber: 4,
  title: "Soil Connections",
  subtitle: "Discover how different parts of the soil system connect",
  xpReward: 80,
  phases: [
    // Phase 1: Concept Cards
    {
      type: "conceptCards",
      id: "soil-connections-concept-cards",
      title: "Soil Connections",
      taraDialogue:
        "You have already met the different parts of soil. But soil health is not about these parts working separately. Roots need water and air. Soil organisms interact with organic matter. Soil structure affects how air and water move. Everything is connected! When one part changes, it influences the rest of the soil system.",
      taraExpression: "excited",
      explanation: {
        tag: "SYSTEM INTERCONNECTIONS",
        title: "How Soil Elements Interact",
        description:
          "Different parts of the soil system are connected, and changes in one part directly affect the others.",
        bulletPoints: [
          {
            title: "Roots & Pore Spaces",
            text: "Roots depend on soil structure to access moisture and oxygen.",
            icon: "eco",
          },
          {
            title: "Organic Matter & Biology",
            text: "Soil organisms feed on decomposing plant residues.",
            icon: "compost",
          },
          {
            title: "Water & Aeration",
            text: "Good soil structure manages both moisture retention and drainage.",
            icon: "water-drop",
          },
        ],
      },
      progressiveHighlights: [
        "Roots need both water and air from soil pores.",
        "Soil organisms interact with organic matter.",
        "Soil structure controls water and air movement.",
        "Everything in the soil system works together.",
      ],
      transitionText: "Let's see if you can remember how these soil friends are connected!",
      cards: [
        {
          id: "card-soil-roots",
          title: "Soil & Roots",
          icon: "eco",
          color: "#4CAF50",
          taraDialogue:
            "Roots may be hidden underground, but they depend on the soil around them every day.",
        },
        {
          id: "card-soil-water",
          title: "Soil & Water",
          icon: "water-drop",
          color: "#0284C7",
          taraDialogue:
            "Healthy soil doesn't just hold water. It helps manage where that water goes.",
        },
        {
          id: "card-soil-air",
          title: "Soil & Air",
          icon: "air",
          color: "#26A69A",
          taraDialogue: "Remember: roots need air too!",
        },
        {
          id: "card-soil-organic",
          title: "Soil & Organic Matter",
          icon: "compost",
          color: "#795548",
          taraDialogue:
            "What returns to the soil can become part of the soil's continuing cycle.",
        },
        {
          id: "card-soil-life",
          title: "Soil & Soil Life",
          icon: "biotech",
          color: "#FFA000",
          taraDialogue:
            "The soil community is connected to everything happening around it.",
        },
      ],
    },

    // Phase 2: Memory Activity — "Remember the Connection"
    {
      type: "memory",
      id: "soil-connections-memory",
      title: "Remember the Connection",
      instructions: "Match the two cards that belong together in the soil system.",
      xp: 30,
      taraDialogue:
        "Soil works as a connected system. Tap two cards that belong together!",
      taraExpression: "happy",
      taraSuccessDialogue:
        "Amazing! Soil works as a connected system. Remembering one part can help you understand another!",
      pairs: [
        {
          id: "pair-roots-water",
          itemA: { label: "Roots", icon: "eco", color: "#4CAF50" },
          itemB: { label: "Water", icon: "water-drop", color: "#0284C7" },
          connectionExplanation: "Great! Roots need access to water.",
        },
        {
          id: "pair-roots-air",
          itemA: { label: "Roots", icon: "eco", color: "#4CAF50" },
          itemB: { label: "Air", icon: "air", color: "#26A69A" },
          connectionExplanation: "Pore spaces provide essential oxygen that roots need.",
        },
        {
          id: "pair-organic-microbes",
          itemA: { label: "Organic Matter", icon: "compost", color: "#795548" },
          itemB: { label: "Microorganisms", icon: "scatter-plot", color: "#0284C7" },
          connectionExplanation: "Soil organisms interact with organic material as it breaks down.",
        },
        {
          id: "pair-earthworm-soil",
          itemA: { label: "Earthworm", icon: "waves", color: "#8D6E63" },
          itemB: { label: "Soil", icon: "public", color: "#4CAF50" },
          connectionExplanation: "Earthworms live in and enrich the soil environment.",
        },
        {
          id: "pair-structure-water",
          itemA: { label: "Structure", icon: "grid-view", color: "#795548" },
          itemB: { label: "Water", icon: "water-drop", color: "#0284C7" },
          connectionExplanation: "Good structure helps manage how water moves and drains.",
        },
      ],
    },

    // Phase 3: MCQ Questions
    {
      type: "mcq",
      id: "soil-connections-mcq",
      taraExpressionCorrect: "excited",
      taraExpressionIncorrect: "thinking",
      totalXp: 50,
      questions: [
        {
          id: "q1-structure-air",
          question: "Why do soil structure and air matter to plant roots?",
          xp: 20,
          options: [
            {
              id: "opt-q1-a",
              text: "Good soil structure can provide spaces where air is present",
              isCorrect: true,
              explanation: "Correct! The spaces in soil can provide air that roots need.",
            },
            {
              id: "opt-q1-b",
              text: "Roots only need sunlight",
              isCorrect: false,
              explanation: "Roots grow underground where they need water, air, and nutrients.",
            },
            {
              id: "opt-q1-c",
              text: "Soil structure removes all water",
              isCorrect: false,
              explanation: "Structure balances water holding capacity and air flow.",
            },
            {
              id: "opt-q1-d",
              text: "Roots don't interact with soil",
              isCorrect: false,
              explanation: "Roots constantly interact with soil particles and microbes.",
            },
          ],
        },
        {
          id: "q2-residue-microbes",
          question:
            "A farmer adds plant residues to the soil. Which part of the soil community can interact with this organic material?",
          xp: 30,
          options: [
            {
              id: "opt-q2-a",
              text: "Soil microorganisms",
              isCorrect: true,
              explanation:
                "Exactly! Soil microorganisms can interact with organic materials as they break them down.",
            },
            {
              id: "opt-q2-b",
              text: "Sunlight",
              isCorrect: false,
              explanation: "Sunlight stays above ground and doesn't decompose buried residue.",
            },
            {
              id: "opt-q2-c",
              text: "Clouds",
              isCorrect: false,
              explanation: "Clouds provide rain, but microorganisms break down residues.",
            },
            {
              id: "opt-q2-d",
              text: "Rocks only",
              isCorrect: false,
              explanation: "Rocks are mineral elements, not living decomposers.",
            },
          ],
        },
      ],
    },

    // Phase 4: Level Completion & Reward
    {
      type: "reward",
      id: "soil-level-4-reward",
      xp: 80,
      badgeTitle: "Soil Systems Explorer",
      badgeIcon: "hub",
      taraDialogue:
        "Amazing! Soil works as a connected system. Remembering one part can help you understand another!",
      taraExpression: "excited",
    },
  ],
};

// ─────────────────────────────────────────────
// LEVEL 5 — PROTECT YOUR SOIL
// ─────────────────────────────────────────────

export const SOIL_LEVEL_5_DEFINITION: LevelDefinition = {
  id: "soil-level-5",
  lessonId: "soil-level-1",
  levelNumber: 5,
  title: "Protect Your Soil",
  subtitle: "Discover practical behaviors to protect and nourish the soil system",
  xpReward: 80,
  phases: [
    // Phase 1: Concept Cards
    {
      type: "conceptCards",
      id: "soil-protect-concept-cards",
      title: "Protect Your Soil",
      taraDialogue:
        "Now you know that soil is alive and that its different parts work together. The next step is learning how we can protect this living system! Simple farming practices can help protect the soil surface, support soil life, maintain organic matter, and create a better environment for plant roots.",
      taraExpression: "excited",
      explanation: {
        tag: "SOIL CARE BEHAVIORS",
        title: "Key Soil Protection Practices",
        description:
          "Healthy soil needs care. The way we manage the soil can protect or harm the soil system.",
        bulletPoints: [
          {
            title: "Keep Soil Covered",
            text: "Soil cover acts like a protective blanket from rain and wind impact.",
            icon: "shield",
          },
          {
            title: "Return Organic Matter",
            text: "Plant residues recycle nutrients and feed biological workers.",
            icon: "compost",
          },
          {
            title: "Protect Soil Structure",
            text: "Minimizing heavy compaction preserves spaces for roots and air.",
            icon: "grid-view",
          },
          {
            title: "Support Soil Life",
            text: "Nourishing the soil environment maintains biological diversity.",
            icon: "biotech",
          },
        ],
      },
      progressiveHighlights: [
        "Soil cover protects the surface from heavy weather.",
        "Organic matter feeds biological workers continuously.",
        "Preserving pore spaces gives roots room to breathe.",
        "Every farming choice affects the entire soil ecosystem.",
      ],
      transitionText: "Let's practice making good soil-care choices!",
      cards: [
        {
          id: "card-keep-covered",
          title: "Keep Soil Covered",
          icon: "shield",
          color: "#2E7D32",
          taraDialogue:
            "Think of soil cover like a protective blanket for the ground!",
        },
        {
          id: "card-return-organic",
          title: "Return Organic Matter",
          icon: "compost",
          color: "#795548",
          taraDialogue:
            "When useful plant material returns to the soil, it becomes part of the soil's natural cycle.",
        },
        {
          id: "card-protect-structure",
          title: "Protect Soil Structure",
          icon: "grid-view",
          color: "#0284C7",
          taraDialogue:
            "Soil needs spaces. Protecting those spaces helps roots, air, and water move through the soil.",
        },
        {
          id: "card-support-life",
          title: "Support Soil Life",
          icon: "biotech",
          color: "#FFA000",
          taraDialogue:
            "When we care for the soil environment, we also create a better home for the tiny workers living inside it.",
        },
      ],
    },

    // Phase 2: Mini-Game — Good Choice / Bad Choice
    {
      type: "decisionChoice",
      id: "soil-protect-decisions",
      title: "Good Choice / Bad Choice",
      instructions:
        "A farmer has a choice. Can you choose the action that better protects the soil?",
      xp: 30,
      taraDialogue:
        "A farmer has a choice. Can you choose the action that better protects the soil?",
      taraExpression: "happy",
      taraSuccessDialogue:
        "Excellent! Good soil care means thinking about what our actions do to the whole soil system.",
      rounds: [
        {
          id: "round-1-cover",
          roundNumber: 1,
          topic: "Soil Cover",
          situation: "The soil is completely exposed before heavy rain.",
          choices: [
            {
              id: "opt-r1-a",
              label: "Choice A",
              text: "Leave it exposed",
              isGoodChoice: false,
            },
            {
              id: "opt-r1-b",
              label: "Choice B",
              text: "Use suitable soil cover",
              isGoodChoice: true,
              taraReaction: "Good choice! Soil cover can help protect the soil surface.",
            },
          ],
        },
        {
          id: "round-2-residue",
          roundNumber: 2,
          topic: "Organic Matter",
          situation: "There are suitable plant residues after harvest.",
          choices: [
            {
              id: "opt-r2-a",
              label: "Choice A",
              text: "Return/use them appropriately as organic material",
              isGoodChoice: true,
              taraReaction: "Spot on! Returning plant residues feeds soil life and builds organic matter.",
            },
            {
              id: "opt-r2-b",
              label: "Choice B",
              text: "Remove all organic material from the field",
              isGoodChoice: false,
            },
          ],
        },
        {
          id: "round-3-compaction",
          roundNumber: 3,
          topic: "Soil Structure",
          situation: "Heavy machinery repeatedly travels over the same area.",
          choices: [
            {
              id: "opt-r3-a",
              label: "Choice A",
              text: "Avoid unnecessary traffic/compaction where practical",
              isGoodChoice: true,
              taraReaction: "Wise decision! Protecting soil from compaction preserves root channels.",
            },
            {
              id: "opt-r3-b",
              label: "Choice B",
              text: "Drive over the same area repeatedly",
              isGoodChoice: false,
            },
          ],
        },
        {
          id: "round-4-life",
          roundNumber: 4,
          topic: "Supporting Life",
          situation: "The farmer wants to support soil life.",
          choices: [
            {
              id: "opt-r4-a",
              label: "Choice A",
              text: "Maintain organic materials and a suitable soil environment",
              isGoodChoice: true,
              taraReaction: "Exactly! Providing food and habitat nurtures beneficial soil organisms.",
            },
            {
              id: "opt-r4-b",
              label: "Choice B",
              text: "Remove all organic materials",
              isGoodChoice: false,
            },
          ],
        },
      ],
    },

    // Phase 3: MCQ Questions
    {
      type: "mcq",
      id: "soil-protect-mcq",
      taraExpressionCorrect: "excited",
      taraExpressionIncorrect: "thinking",
      totalXp: 50,
      questions: [
        {
          id: "q1-surface-protection",
          question: "Which action can help protect the soil surface?",
          xp: 20,
          options: [
            {
              id: "opt-q1-a",
              text: "Keeping suitable soil cover",
              isCorrect: true,
              explanation: "Correct! Suitable soil cover can help protect the soil surface.",
            },
            {
              id: "opt-q1-b",
              text: "Leaving soil exposed whenever possible",
              isCorrect: false,
              explanation: "Exposed soil is vulnerable to erosion from rain and wind.",
            },
            {
              id: "opt-q1-c",
              text: "Removing all plant residues",
              isCorrect: false,
              explanation: "Removing all residues strips the soil of natural protection.",
            },
            {
              id: "opt-q1-d",
              text: "Compacting the soil",
              isCorrect: false,
              explanation: "Compaction crushes root spaces and harms soil drainage.",
            },
          ],
        },
        {
          id: "q2-residue-benefit",
          question:
            "After harvest, a farmer has suitable plant residues available. Why can returning organic material to the soil be useful?",
          xp: 30,
          options: [
            {
              id: "opt-q2-a",
              text: "It can contribute organic matter and support soil biological processes",
              isCorrect: true,
              explanation:
                "Exactly! Organic materials can become part of the soil's ongoing cycle.",
            },
            {
              id: "opt-q2-b",
              text: "It removes all soil life",
              isCorrect: false,
              explanation: "Residues actually feed and nurture soil organisms.",
            },
            {
              id: "opt-q2-c",
              text: "It makes roots stop growing",
              isCorrect: false,
              explanation: "Roots thrive in organic matter rich soil.",
            },
            {
              id: "opt-q2-d",
              text: "It removes all water from the soil",
              isCorrect: false,
              explanation: "Organic matter acts like a sponge, increasing water retention.",
            },
          ],
        },
      ],
    },

    // Phase 4: Level Completion & Module Mastery Reward
    {
      type: "reward",
      id: "soil-level-5-reward",
      xp: 80,
      badgeTitle: "Soil Guardian",
      badgeIcon: "eco",
      badgeDescription: "Mastered all 5 levels of Soil Health & Living Soil Ecosystems",
      taraDialogue:
        "Congratulations! You have completed all 5 levels of the Soil Health lesson and earned the prestigious Soil Guardian badge! Your land and crops will thrive under your care!",
      taraExpression: "excited",
    },
  ],
};

/**
 * Registry of all available level definitions
 */
export const LEVEL_DEFINITIONS_REGISTRY: Record<string, LevelDefinition> = {
  "soil-level-1": SOIL_STEP_1_LEVEL_DEFINITION,
  "soil-level-2": SOIL_LEVEL_2_DEFINITION,
  "soil-level-3": SOIL_LEVEL_3_DEFINITION,
  "soil-level-4": SOIL_LEVEL_4_DEFINITION,
  "soil-level-5": SOIL_LEVEL_5_DEFINITION,
};
