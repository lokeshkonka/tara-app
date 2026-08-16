import type { TaraExpression } from "../../components/Tara/Tara.types";
import type { LearnCategory, LearnLesson, LearnSummary } from "../../types/learn";

/**
 * Dummy data simulating a real backend response for the Learn module.
 * Replace with a real API response later without changing the UI.
 */
export const LEARN_SUMMARY: LearnSummary = {
  todayXp: 890,
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

const LEVELS_PER_CATEGORY = 10;

interface LessonSeed {
  categoryId: string;
  titleKey: string;
  descriptionKey: string;
  expression: TaraExpression;
  baseXp: number;
  baseDuration: number;
}

/** First-level title/description per category; deeper levels use template keys. */
const LESSON_SEEDS: LessonSeed[] = [
  {
    categoryId: "soil",
    titleKey: "lesson.title.soil",
    descriptionKey: "lesson.desc.soil",
    expression: "thinking",
    baseXp: 40,
    baseDuration: 8,
  },
  {
    categoryId: "water",
    titleKey: "lesson.title.water",
    descriptionKey: "lesson.desc.water",
    expression: "happy",
    baseXp: 30,
    baseDuration: 6,
  },
  {
    categoryId: "compost",
    titleKey: "lesson.title.compost",
    descriptionKey: "lesson.desc.compost",
    expression: "excited",
    baseXp: 50,
    baseDuration: 12,
  },
  {
    categoryId: "pest",
    titleKey: "lesson.title.pest",
    descriptionKey: "lesson.desc.pest",
    expression: "surprised",
    baseXp: 35,
    baseDuration: 7,
  },
  {
    categoryId: "crops",
    titleKey: "lesson.title.crops",
    descriptionKey: "lesson.desc.crops",
    expression: "happy",
    baseXp: 45,
    baseDuration: 10,
  },
  {
    categoryId: "basics",
    titleKey: "lesson.title.mulch",
    descriptionKey: "lesson.desc.mulch",
    expression: "winking",
    baseXp: 25,
    baseDuration: 5,
  },
];

const LEVEL_EXPRESSIONS: TaraExpression[] = [
  "thinking",
  "happy",
  "excited",
  "winking",
  "listening",
];

export const LEARN_LESSONS: LearnLesson[] = LESSON_SEEDS.flatMap((seed) =>
  Array.from({ length: LEVELS_PER_CATEGORY }, (_, index) => {
    const level = index + 1;
    const completedPestLevel = seed.categoryId === "pest" && level === 4;
    return {
      id: `${seed.categoryId}-level-${level}`,
      level,
      titleKey: level === 1 ? seed.titleKey : "lesson.partTitle",
      descriptionKey: level === 1 ? seed.descriptionKey : "lesson.partDesc",
      categoryId: seed.categoryId,
      expression: LEVEL_EXPRESSIONS[index % LEVEL_EXPRESSIONS.length],
      xp: seed.baseXp + (level - 1) * 5,
      durationMinutes: seed.baseDuration + (level % 3),
      progress: completedPestLevel ? 1 : level === 1 ? 0.4 : 0,
      isCompleted: completedPestLevel,
    };
  })
);
