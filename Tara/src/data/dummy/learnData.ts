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

export const LEARN_LESSONS: LearnLesson[] = LESSON_SEEDS.flatMap(
  (category) =>
    category.lessons.map((lesson, index) => ({
      id: `${category.categoryId}-level-${index + 1}`,
      level: index + 1,
      titleKey: lesson.titleKey,
      descriptionKey: lesson.descriptionKey,
      categoryId: category.categoryId,
      expression: lesson.expression,
      xp: lesson.xp,
      durationMinutes: lesson.durationMinutes,
      progress: lesson.progress,
      isCompleted: lesson.isCompleted,
    }))
);
