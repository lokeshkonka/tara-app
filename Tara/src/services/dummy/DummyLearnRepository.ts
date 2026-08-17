import { DUMMY_LESSON_DETAILS, LEARN_CATEGORIES, LEARN_LESSONS, LEARN_SUMMARY, SOIL_HEALTH_LESSON_DETAIL } from "../../data/dummy/learnData";
import type { LearnCategory, LearnLesson, LearnLessonDetail, LearnSummary } from "../../types/learn";
import type { ILearnRepository } from "../repositories/ILearnRepository";

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyLearnRepository implements ILearnRepository {
  private lessons: LearnLesson[] = [...LEARN_LESSONS];
  private summary: LearnSummary = { ...LEARN_SUMMARY };

  async getSummary(): Promise<LearnSummary> {
    await delay(50);
    return { ...this.summary };
  }

  async getCategories(): Promise<LearnCategory[]> {
    await delay(50);
    return LEARN_CATEGORIES;
  }

  async getLessons(): Promise<LearnLesson[]> {
    await delay(50);
    return [...this.lessons];
  }

  async getLessonDetail(lessonId: string): Promise<LearnLessonDetail | null> {
    await delay(60);
    return DUMMY_LESSON_DETAILS[lessonId] ?? SOIL_HEALTH_LESSON_DETAIL;
  }

  async completeLesson(lessonId: string): Promise<LearnLesson> {
    await delay(60);
    const index = this.lessons.findIndex((l) => l.id === lessonId);
    if (index === -1) {
      throw new Error(`Lesson with id ${lessonId} not found`);
    }

    const current = this.lessons[index];
    const updated: LearnLesson = {
      ...current,
      isCompleted: true,
      progress: 1,
    };

    if (!current.isCompleted) {
      this.summary = {
        ...this.summary,
        todayXp: this.summary.todayXp + current.xp,
      };
    }

    this.lessons[index] = updated;
    return updated;
  }
}
