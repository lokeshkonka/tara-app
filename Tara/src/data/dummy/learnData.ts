import { adaptLessonPackage } from "../lessons/lessonPackageAdapter";
import { SUSTAINABLE_SOIL_PACKAGE } from "../lessons/SustainableSoilPackage";
import { UNDERSTANDING_SOIL_HEALTH_PACKAGE } from "../lessons/UnderstandingSoilHealth2package";
import { FARMING_BASICS_PACKAGE } from "../lessons/farmingBasicsPackage";
import { resolveLocalizedText } from "../../types/lessonSchema";
import type { LearnCategory, LearnLesson, LearnLessonDetail, LearnSummary } from "../../types/learn";

export const LEARN_SUMMARY: LearnSummary = {
  todayXp: 145,
};

export const LEARN_CATEGORIES: LearnCategory[] = [
  { id: "all", labelKey: "learn.category.all", icon: "apps" },
  { id: "soil", labelKey: "learn.category.soil", icon: "eco" },
  { id: "basics", labelKey: "learn.category.basics", icon: "school" },
];

/**
 * Generate LearnLesson list dynamically from production package files
 */
export function buildLessonsFromPackages(lang: string = "en"): LearnLesson[] {
  const packages = [
    SUSTAINABLE_SOIL_PACKAGE,
    UNDERSTANDING_SOIL_HEALTH_PACKAGE,
  ];

  return packages.map((pkg, idx) => ({
    id: pkg.id,
    level: idx + 1,
    titleKey: `lesson.${pkg.id}.title`,
    descriptionKey: `lesson.${pkg.id}.desc`,
    title: resolveLocalizedText(pkg.title, lang),
    description: resolveLocalizedText(pkg.description, lang),
    categoryId: pkg.categoryId,
    expression: pkg.taraExpression as any,
    xp: pkg.totalXp,
    durationMinutes: pkg.durationMinutes,
    progress: 0,
    isCompleted: false,
    totalLevels: pkg.levels.length,
  }));
}

export const LEARN_LESSONS: LearnLesson[] = buildLessonsFromPackages("en");

const adaptedSustainableSoil = adaptLessonPackage(SUSTAINABLE_SOIL_PACKAGE, "en");
const adaptedSoilPackage = adaptLessonPackage(UNDERSTANDING_SOIL_HEALTH_PACKAGE, "en");

export const SOIL_HEALTH_LESSON_DETAIL: LearnLessonDetail = adaptedSustainableSoil.detail;

export const DUMMY_LESSON_DETAILS: Record<string, LearnLessonDetail> = {
  [SUSTAINABLE_SOIL_PACKAGE.id]: adaptedSustainableSoil.detail,
  [UNDERSTANDING_SOIL_HEALTH_PACKAGE.id]: adaptedSoilPackage.detail,
  "soil-level-1": adaptedSoilPackage.detail,
  "understanding-soil-health": adaptedSoilPackage.detail,
  "sustainable-soil-package": adaptedSustainableSoil.detail,
  [FARMING_BASICS_PACKAGE.id]: adaptLessonPackage(FARMING_BASICS_PACKAGE, "en").detail,
};

