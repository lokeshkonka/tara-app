import { SUSTAINABLE_SOIL_PACKAGE } from "../../data/lessons/SustainableSoilPackage";
import { UNDERSTANDING_SOIL_HEALTH_PACKAGE } from "../../data/lessons/UnderstandingSoilHealth2package";
import { resolveLocalizedText } from "../../types/lessonSchema";
import { learnStorage } from "../../storage/learnStorage";
import type { DashboardSummary } from "../../types/dashboard";
import type { PracticeItem } from "../../types/farm";
import type { IDashboardRepository } from "../repositories/IDashboardRepository";

const delay = (ms = 40) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyDashboardRepository implements IDashboardRepository {
  async getSummary(lang: string = "en"): Promise<DashboardSummary> {
    await delay(30);
    const stored = await learnStorage.getProgress();
    const completedSet = new Set(stored.completedLevelIds);

    // 1. Check Sustainable Soil Package (8 levels)
    const sLevels = SUSTAINABLE_SOIL_PACKAGE.levels;
    const sCompleted = sLevels.filter((lvl) => completedSet.has(lvl.id)).length;
    const sNext = sLevels.find((lvl) => !completedSet.has(lvl.id));

    // 2. Check Understanding Soil Health Package (5 levels)
    const uLevels = UNDERSTANDING_SOIL_HEALTH_PACKAGE.levels;
    const uCompleted = uLevels.filter((lvl) => completedSet.has(lvl.id)).length;
    const uNext = uLevels.find((lvl) => !completedSet.has(lvl.id));

    let activeLesson = SUSTAINABLE_SOIL_PACKAGE;
    let activeLevel = sNext ?? sLevels[0];
    let completedInLesson = sCompleted;
    let totalInLesson = sLevels.length;
    let isLessonCompleted = sCompleted >= totalInLesson;

    if (isLessonCompleted && uNext) {
      activeLesson = UNDERSTANDING_SOIL_HEALTH_PACKAGE;
      activeLevel = uNext;
      completedInLesson = uCompleted;
      totalInLesson = uLevels.length;
      isLessonCompleted = uCompleted >= totalInLesson;
    } else if (isLessonCompleted && !uNext) {
      // Both lessons completed
      activeLesson = SUSTAINABLE_SOIL_PACKAGE;
      activeLevel = sLevels[0];
      completedInLesson = totalInLesson;
      isLessonCompleted = true;
    }

    const remainingInLesson = Math.max(0, totalInLesson - completedInLesson);

    const todaysPractice: PracticeItem = {
      id: activeLevel.id,
      levelId: activeLevel.id,
      lessonId: activeLesson.id,
      lessonTitle: resolveLocalizedText(activeLesson.title, lang),
      title: resolveLocalizedText(activeLevel.title, lang),
      description: resolveLocalizedText(
        activeLevel.subtitle || activeLesson.description,
        lang
      ),
      category: "soil",
      difficulty: activeLevel.levelNumber > 4 ? "medium" : "easy",
      xpGain: activeLevel.xpReward,
      completed: isLessonCompleted,
      durationMinutes: activeLevel.durationMinutes,
      stepsCount: activeLevel.phases.length,
      levelNumber: activeLevel.levelNumber,
      totalLevels: totalInLesson,
      completedLevels: completedInLesson,
      remainingLevels: remainingInLesson,
      image: require("../../../assets/Learn-Assets/soil-health.png"),
    };

    return {
      todaysPractice,
      completedPractices: completedInLesson,
      totalPractices: totalInLesson,
      xpEarnedThisWeek: Math.max(180, stored.totalXpEarned),
    };
  }
}
