import type { TaraExpression } from "../../components/Tara/Tara.types";
import type { LearnCategory, LearnLesson, LearnSummary } from "../../types/learn";

/**
 * Dummy data simulating a real backend response for the Learn module.
 * Replace with a real API response later without changing the UI.
 */
export const LEARN_SUMMARY: LearnSummary = {
  todayXp: 145,
};

export const LEARN_CATEGORIES: LearnCategory[] = [
  { id: "all", labelKey: "learn.category.all", icon: "apps" },
  { id: "soil", labelKey: "learn.category.soil", icon: "eco" },
  { id: "water", labelKey: "learn.category.water", icon: "water-drop" },
  { id: "compost", labelKey: "learn.category.compost", icon: "layers" },
  { id: "pest", labelKey: "learn.category.pest", icon: "bug-report" },
  { id: "crops", labelKey: "learn.category.crops", icon: "grass" },
  { id: "basics", labelKey: "learn.category.basics", icon: "school" },
];

interface LessonSeed {
  categoryId: string;
  lessons: {
    titleKey: string;
    descriptionKey: string;
    expression: TaraExpression;
    xp: number;
    durationMinutes: number;
    progress: number;
    isCompleted: boolean;
  }[];
}

const LESSON_SEEDS: LessonSeed[] = [
  // ─────────────────────────────────────────────
  // SOIL HEALTH
  // ─────────────────────────────────────────────
  {
    categoryId: "soil",
    lessons: [
      {
        titleKey: "lesson.title.soil",
        descriptionKey: "lesson.desc.soil",
        expression: "happy",
        xp: 30,
        durationMinutes: 5,
        progress: 1,
        isCompleted: true,
      },
      {
        titleKey: "lesson.soil.part2.title",
        descriptionKey: "lesson.soil.part2.desc",
        expression: "thinking",
        xp: 40,
        durationMinutes: 7,
        progress: 0.65,
        isCompleted: false,
      },
      {
        titleKey: "lesson.soil.part3.title",
        descriptionKey: "lesson.soil.part3.desc",
        expression: "excited",
        xp: 50,
        durationMinutes: 8,
        progress: 0,
        isCompleted: false,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // WATER MANAGEMENT
  // ─────────────────────────────────────────────
  {
    categoryId: "water",
    lessons: [
      {
        titleKey: "lesson.title.water",
        descriptionKey: "lesson.desc.water",
        expression: "happy",
        xp: 25,
        durationMinutes: 5,
        progress: 1,
        isCompleted: true,
      },
      {
        titleKey: "lesson.water.part2.title",
        descriptionKey: "lesson.water.part2.desc",
        expression: "thinking",
        xp: 35,
        durationMinutes: 6,
        progress: 0.35,
        isCompleted: false,
      },
      {
        titleKey: "lesson.water.part3.title",
        descriptionKey: "lesson.water.part3.desc",
        expression: "excited",
        xp: 45,
        durationMinutes: 8,
        progress: 0,
        isCompleted: false,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PEST CONTROL
  // ─────────────────────────────────────────────
  {
    categoryId: "pest",
    lessons: [
      {
        titleKey: "lesson.title.pest",
        descriptionKey: "lesson.desc.pest",
        expression: "surprised",
        xp: 30,
        durationMinutes: 6,
        progress: 1,
        isCompleted: true,
      },
      {
        titleKey: "lesson.pest.part2.title",
        descriptionKey: "lesson.pest.part2.desc",
        expression: "thinking",
        xp: 40,
        durationMinutes: 7,
        progress: 0.5,
        isCompleted: false,
      },
      {
        titleKey: "lesson.pest.part3.title",
        descriptionKey: "lesson.pest.part3.desc",
        expression: "excited",
        xp: 50,
        durationMinutes: 9,
        progress: 0,
        isCompleted: false,
      },
    ],
  },
];

export const LEARN_LESSONS: LearnLesson[] = [
  {
    id: "soil-level-1",
    level: 1,
    titleKey: "lesson.title.soil",
    descriptionKey: "lesson.desc.soil",
    categoryId: "soil",
    expression: "excited",
    xp: 360,
    durationMinutes: 26,
    progress: 0,
    isCompleted: false,
    totalLevels: 5,
  },
  {
    id: "soil-health-package-2",
    level: 2,
    titleKey: "lesson.title.soil2",
    descriptionKey: "lesson.desc.soil2",
    categoryId: "soil",
    expression: "happy",
    xp: 360,
    durationMinutes: 26,
    progress: 0,
    isCompleted: false,
    totalLevels: 5,
  },
  {
    id: "water-management",
    level: 1,
    titleKey: "lesson.title.water",
    descriptionKey: "lesson.desc.water",
    categoryId: "water",
    expression: "happy",
    xp: 180,
    durationMinutes: 20,
    progress: 0,
    isCompleted: false,
    totalLevels: 4,
  },
  {
    id: "organic-compost",
    level: 1,
    titleKey: "lesson.title.compost",
    descriptionKey: "lesson.desc.compost",
    categoryId: "compost",
    expression: "thinking",
    xp: 160,
    durationMinutes: 18,
    progress: 0,
    isCompleted: false,
    totalLevels: 4,
  },
  {
    id: "pest-control",
    level: 1,
    titleKey: "lesson.title.pest",
    descriptionKey: "lesson.desc.pest",
    categoryId: "pest",
    expression: "surprised",
    xp: 190,
    durationMinutes: 22,
    progress: 0,
    isCompleted: false,
    totalLevels: 4,
  },
  {
    id: "crop-rotation",
    level: 1,
    titleKey: "lesson.title.crops",
    descriptionKey: "lesson.desc.crops",
    categoryId: "crops",
    expression: "excited",
    xp: 170,
    durationMinutes: 20,
    progress: 0,
    isCompleted: false,
    totalLevels: 4,
  },
  {
    id: "farming-basics",
    level: 1,
    titleKey: "lesson.title.farming_basics",
    descriptionKey: "lesson.desc.farming_basics",
    categoryId: "basics",
    expression: "excited",
    xp: 500,
    durationMinutes: 50,
    progress: 0,
    isCompleted: false,
    totalLevels: 10,
  },
];

export const SOIL_HEALTH_LESSON_DETAIL: import("../../types/learn").LearnLessonDetail = {
  id: "soil-level-1",
  categoryId: "soil",
  titleKey: "lesson.title.soil",
  descriptionKey: "lesson.desc.soil",
  durationMinutes: 140,
  totalLevels: 15,
  totalXp: 800,
  whyItMattersKey: "lesson.soil.detail.whyItMatters",
  learningOutcomes: [
    { id: "outcome-1", textKey: "lesson.soil.outcome.1" },
    { id: "outcome-2", textKey: "lesson.soil.outcome.2" },
    { id: "outcome-3", textKey: "lesson.soil.outcome.3" },
  ],
  taraQuoteKey: "lesson.soil.detail.taraQuote",
  taraExpression: "excited",
  levels: [
    {
      id: "soil-level-1",
      levelNumber: 1,
      titleKey: "lesson.soil.level1.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 5,
      xp: 30,
      status: "completed",
      progressFraction: 1,
    },
    {
      id: "soil-level-2",
      levelNumber: 2,
      titleKey: "lesson.soil.level2.title",
      descriptionKey: "lesson.soil.part2.desc",
      durationMinutes: 6,
      xp: 35,
      status: "completed",
      progressFraction: 1,
    },
    {
      id: "soil-level-3",
      levelNumber: 3,
      titleKey: "lesson.soil.level3.title",
      descriptionKey: "lesson.soil.part3.desc",
      durationMinutes: 7,
      xp: 40,
      status: "completed",
      progressFraction: 1,
    },
    {
      id: "soil-level-4",
      levelNumber: 4,
      titleKey: "lesson.soil.level4.title",
      descriptionKey: "lesson.soil.part3.desc",
      durationMinutes: 8,
      xp: 45,
      status: "inProgress",
      progressFraction: 0.5,
    },
    {
      id: "soil-level-5",
      levelNumber: 5,
      titleKey: "lesson.soil.level5.title",
      descriptionKey: "lesson.title.compost",
      durationMinutes: 8,
      xp: 45,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-6",
      levelNumber: 6,
      titleKey: "lesson.soil.level6.title",
      descriptionKey: "lesson.title.crops",
      durationMinutes: 9,
      xp: 50,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-7",
      levelNumber: 7,
      titleKey: "lesson.soil.level7.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 9,
      xp: 50,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-8",
      levelNumber: 8,
      titleKey: "lesson.soil.level8.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 10,
      xp: 55,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-9",
      levelNumber: 9,
      titleKey: "lesson.soil.level9.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 10,
      xp: 55,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-10",
      levelNumber: 10,
      titleKey: "lesson.soil.level10.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 10,
      xp: 60,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-11",
      levelNumber: 11,
      titleKey: "lesson.soil.level11.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 12,
      xp: 60,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-12",
      levelNumber: 12,
      titleKey: "lesson.soil.level12.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 12,
      xp: 65,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-13",
      levelNumber: 13,
      titleKey: "lesson.soil.level13.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 12,
      xp: 65,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-14",
      levelNumber: 14,
      titleKey: "lesson.soil.level14.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 15,
      xp: 70,
      status: "locked",
      progressFraction: 0,
    },
    {
      id: "soil-level-15",
      levelNumber: 15,
      titleKey: "lesson.soil.level15.title",
      descriptionKey: "lesson.desc.soil",
      durationMinutes: 15,
      xp: 75,
      status: "locked",
      progressFraction: 0,
    },
  ],
};

export const DUMMY_LESSON_DETAILS: Record<string, import("../../types/learn").LearnLessonDetail> = {
  "soil-level-1": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-2": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-3": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-4": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-5": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-6": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-7": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-8": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-9": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-10": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-11": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-12": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-13": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-14": SOIL_HEALTH_LESSON_DETAIL,
  "soil-level-15": SOIL_HEALTH_LESSON_DETAIL,
};

