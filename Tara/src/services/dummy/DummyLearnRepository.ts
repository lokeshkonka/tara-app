import {
  LEARN_CATEGORIES,
  LEARN_LESSONS,
  LEARN_SUMMARY,
  buildLessonsFromPackages,
} from "../../data/dummy/learnData";
import { FARMING_BASICS_PACKAGE } from "../../data/lessons/farmingBasicsPackage";
import { SUSTAINABLE_SOIL_PACKAGE } from "../../data/lessons/SustainableSoilPackage";
import { adaptLessonPackage } from "../../data/lessons/lessonPackageAdapter";
import {
  LEVEL_DEFINITIONS_REGISTRY,
  SOIL_HEALTH_LESSON_BASE,
  SOIL_HEALTH_TIMELINE_LEVELS,
} from "../../data/lessons/soilHealthLesson";
import { UNDERSTANDING_SOIL_HEALTH_PACKAGE } from "../../data/lessons/UnderstandingSoilHealth2package";
import { learnStorage } from "../../storage/learnStorage";
import type {
  LearnCategory,
  LearnLesson,
  LearnLessonDetail,
  LearnSummary,
  LevelDefinition,
  LevelNodeDetail,
} from "../../types/learn";
import type { ILearnRepository } from "../repositories/ILearnRepository";

const delay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyLearnRepository implements ILearnRepository {
  private lessons: LearnLesson[] = [...LEARN_LESSONS];
  private summary: LearnSummary = { ...LEARN_SUMMARY };

  async getSummary(): Promise<LearnSummary> {
    await delay(30);
    const stored = await learnStorage.getProgress();
    return {
      todayXp: Math.max(this.summary.todayXp, stored.totalXpEarned),
    };
  }

  async getCategories(): Promise<LearnCategory[]> {
    await delay(30);
    return LEARN_CATEGORIES;
  }

  async getLessons(lang: string = "en"): Promise<LearnLesson[]> {
    await delay(30);
    const stored = await learnStorage.getProgress();
    const localizedLessons = buildLessonsFromPackages(lang);

    return localizedLessons.map((lesson) => {
      // 1. Sustainable Soil Management (8 Levels)
      if (lesson.id === SUSTAINABLE_SOIL_PACKAGE.id || lesson.id === "sustainable-soil-package") {
        const completedCount = SUSTAINABLE_SOIL_PACKAGE.levels.filter((lvl) =>
          stored.completedLevelIds.includes(lvl.id)
        ).length;
        const totalLevels = SUSTAINABLE_SOIL_PACKAGE.levels.length;
        const progress = totalLevels > 0 ? completedCount / totalLevels : 0;
        const isCompleted = completedCount >= totalLevels && totalLevels > 0;

        return {
          ...lesson,
          totalLevels,
          isCompleted,
          progress,
        };
      }

      // 2. Understanding Soil Health (5 Levels)
      if (
        lesson.id === UNDERSTANDING_SOIL_HEALTH_PACKAGE.id ||
        lesson.id === "understanding-soil-health" ||
        lesson.id === "soil-level-1" ||
        lesson.id === "soil-basics"
      ) {
        const completedCount = UNDERSTANDING_SOIL_HEALTH_PACKAGE.levels.filter((lvl) =>
          stored.completedLevelIds.includes(lvl.id)
        ).length;
        const totalLevels = UNDERSTANDING_SOIL_HEALTH_PACKAGE.levels.length;
        const progress = totalLevels > 0 ? completedCount / totalLevels : 0;
        const isCompleted = completedCount >= totalLevels && totalLevels > 0;

        return {
          ...lesson,
          totalLevels,
          isCompleted,
          progress,
        };
      }

      // 3. Farming Basics Package (if present)
      if (lesson.id === FARMING_BASICS_PACKAGE.id || lesson.id === "farming-basics") {
        const completedCount = FARMING_BASICS_PACKAGE.levels.filter((lvl) =>
          stored.completedLevelIds.includes(lvl.id)
        ).length;
        const totalLevels = FARMING_BASICS_PACKAGE.levels.length;
        const progress = totalLevels > 0 ? completedCount / totalLevels : 0;
        const isCompleted = completedCount >= totalLevels && totalLevels > 0;

        return {
          ...lesson,
          totalLevels,
          isCompleted,
          progress,
        };
      }

      return lesson;
    });
  }

  async getLessonDetail(lessonId: string, lang: string = "en"): Promise<LearnLessonDetail | null> {
    await delay(40);
    const stored = await learnStorage.getProgress();

    let pkg = SUSTAINABLE_SOIL_PACKAGE;
    if (
      lessonId === "understanding-soil-health" ||
      lessonId === UNDERSTANDING_SOIL_HEALTH_PACKAGE.id ||
      lessonId === "soil-level-1" ||
      lessonId === "soil-basics"
    ) {
      pkg = UNDERSTANDING_SOIL_HEALTH_PACKAGE;
    } else if (lessonId === "farming-basics" || lessonId.startsWith("basics-")) {
      pkg = FARMING_BASICS_PACKAGE;
    } else if (lessonId === SUSTAINABLE_SOIL_PACKAGE.id || lessonId.startsWith("sustainable-soil")) {
      pkg = SUSTAINABLE_SOIL_PACKAGE;
    }

    const { detail } = adaptLessonPackage(
      pkg,
      lang,
      new Set(stored.completedLevelIds),
      new Set(stored.unlockedLevelIds)
    );

    return {
      ...detail,
      id: lessonId,
    };
  }

  async completeLesson(lessonId: string): Promise<LearnLesson> {
    await delay(40);
    const index = this.lessons.findIndex((l) => l.id === lessonId);
    const current = this.lessons[index] ?? {
      id: lessonId,
      level: 1,
      titleKey: "lesson.title.soil",
      descriptionKey: "lesson.desc.soil",
      categoryId: "soil",
      expression: "happy" as const,
      xp: 80,
      durationMinutes: 5,
      progress: 1,
      isCompleted: true,
    };

    const updated: LearnLesson = {
      ...current,
      isCompleted: true,
      progress: 1,
    };

    if (index !== -1) {
      this.lessons[index] = updated;
    }
    return updated;
  }

  async getLevelDefinition(
    levelId: string,
    lang: string = "en"
  ): Promise<LevelDefinition | null> {
    await delay(40);

    // Check Sustainable Soil Package (8 Levels)
    if (levelId.startsWith("sustainable-soil-")) {
      const { levelDefinitions } = adaptLessonPackage(SUSTAINABLE_SOIL_PACKAGE, lang);
      if (levelDefinitions[levelId]) {
        return levelDefinitions[levelId];
      }
    }

    // Check Farming Basics Package
    if (levelId.startsWith("basics-")) {
      const { levelDefinitions } = adaptLessonPackage(FARMING_BASICS_PACKAGE, lang);
      if (levelDefinitions[levelId]) {
        return levelDefinitions[levelId];
      }
    }

    // Check Soil Health Package
    const { levelDefinitions } = adaptLessonPackage(
      UNDERSTANDING_SOIL_HEALTH_PACKAGE,
      lang
    );

    if (levelDefinitions[levelId]) {
      return levelDefinitions[levelId];
    }

    if (LEVEL_DEFINITIONS_REGISTRY[levelId]) {
      return LEVEL_DEFINITIONS_REGISTRY[levelId];
    }

    // Default fallback to Level 1
    return levelDefinitions["soil-level-1"] ?? null;
  }

  async completeLevelStep(levelId: string, xpEarned: number): Promise<void> {
    await delay(40);

    let nextLevelId: string | undefined;
    let badgeTitle = "Agri Explorer";

    // Handle Sustainable Soil Level Progress (8 Levels)
    const sustainableMatch = levelId.match(/sustainable-soil-level-(\d+)/);
    if (sustainableMatch) {
      const currentNum = parseInt(sustainableMatch[1], 10);
      if (currentNum < 8) {
        nextLevelId = `sustainable-soil-level-${currentNum + 1}`;
      } else {
        nextLevelId = undefined;
        badgeTitle = "Sustainable Soil Master";
        await this.completeLesson("sustainable-soil-package");
      }
    }

    // Handle Soil Level Progress
    const soilMatch = levelId.match(/soil-level-(\d+)/);
    if (soilMatch) {
      const currentNum = parseInt(soilMatch[1], 10);
      if (currentNum < 5) {
        nextLevelId = `soil-level-${currentNum + 1}`;
      } else {
        nextLevelId = undefined;
        badgeTitle = "Soil Guardian";
        await this.completeLesson("soil-level-1");
        await this.completeLesson("soil-basics");
      }
    }

    // Handle Basics Level Progress (10 Levels)
    const basicsMatch = levelId.match(/basics-level-(\d+)/);
    if (basicsMatch) {
      const currentNum = parseInt(basicsMatch[1], 10);
      if (currentNum < 10) {
        nextLevelId = `basics-level-${currentNum + 1}`;
      } else {
        nextLevelId = undefined;
        badgeTitle = "Master Agri-Pioneer";
        await this.completeLesson("farming-basics");
      }
    }

    await learnStorage.markLevelCompleted(
      levelId,
      nextLevelId,
      xpEarned,
      100,
      badgeTitle
    );

    this.summary = {
      ...this.summary,
      todayXp: this.summary.todayXp + xpEarned,
    };
  }
}
