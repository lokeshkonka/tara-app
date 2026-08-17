import { LEARN_CATEGORIES, LEARN_LESSONS, LEARN_SUMMARY } from "../../data/dummy/learnData";
import {
  LEVEL_DEFINITIONS_REGISTRY,
  SOIL_HEALTH_LESSON_BASE,
  SOIL_HEALTH_TIMELINE_LEVELS,
} from "../../data/lessons/soilHealthLesson";
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

  async getLessons(): Promise<LearnLesson[]> {
    await delay(30);
    const stored = await learnStorage.getProgress();

    return this.lessons.map((lesson) => {
      if (lesson.id === "soil-level-1" || lesson.categoryId === "soil") {
        const isLevel1Done = stored.completedLevelIds.includes("soil-level-1");
        const isLevel2Done = stored.completedLevelIds.includes("soil-level-2");
        const completedCount = stored.completedLevelIds.filter((id) =>
          id.startsWith("soil-level-")
        ).length;
        const progress = Math.min(1, completedCount / 15);

        return {
          ...lesson,
          isCompleted: isLevel1Done,
          progress: progress > 0 ? progress : isLevel1Done ? 0.07 : 0,
        };
      }
      return lesson;
    });
  }

  async getLessonDetail(lessonId: string): Promise<LearnLessonDetail | null> {
    await delay(40);
    const stored = await learnStorage.getProgress();

    // Map dynamic status from storage
    const dynamicLevels: LevelNodeDetail[] = SOIL_HEALTH_TIMELINE_LEVELS.map(
      (level, index) => {
        const isCompleted = stored.completedLevelIds.includes(level.id);
        const isUnlocked =
          stored.unlockedLevelIds.includes(level.id) ||
          index === 0 ||
          (index > 0 &&
            stored.completedLevelIds.includes(
              SOIL_HEALTH_TIMELINE_LEVELS[index - 1].id
            ));

        let status: LevelNodeDetail["status"] = "locked";
        let progressFraction = 0;

        if (isCompleted) {
          status = "completed";
          progressFraction = 1;
        } else if (isUnlocked) {
          // Check if it's currently in progress
          const prevCompleted =
            index === 0 ||
            stored.completedLevelIds.includes(
              SOIL_HEALTH_TIMELINE_LEVELS[index - 1].id
            );
          status = prevCompleted ? "available" : "inProgress";
          progressFraction = 0;
        }

        return {
          ...level,
          status,
          progressFraction,
        };
      }
    );

    return {
      ...SOIL_HEALTH_LESSON_BASE,
      id: lessonId,
      levels: dynamicLevels,
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
    _lang: string = "en"
  ): Promise<LevelDefinition | null> {
    await delay(40);
    if (LEVEL_DEFINITIONS_REGISTRY[levelId]) {
      return LEVEL_DEFINITIONS_REGISTRY[levelId];
    }

    // Default fallback to Level 1
    return LEVEL_DEFINITIONS_REGISTRY["soil-level-1"] ?? null;
  }

  async completeLevelStep(levelId: string, xpEarned: number): Promise<void> {
    await delay(40);

    // Calculate next level to unlock automatically
    const match = levelId.match(/soil-level-(\d+)/);
    let nextLevelId: string | undefined;
    let badgeTitle = "Soil Explorer";

    if (match) {
      const currentNum = parseInt(match[1], 10);
      if (currentNum < 5) {
        nextLevelId = `soil-level-${currentNum + 1}`;
      } else {
        nextLevelId = undefined;
        badgeTitle = "Soil Guardian";
        await this.completeLesson("soil-level-1");
        await this.completeLesson("soil-basics");
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
