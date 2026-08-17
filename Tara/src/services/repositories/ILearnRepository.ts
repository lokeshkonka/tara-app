import type { LearnCategory, LearnLesson, LearnLessonDetail, LearnSummary } from "../../types/learn";

export interface ILearnRepository {
  getSummary(): Promise<LearnSummary>;
  getCategories(): Promise<LearnCategory[]>;
  getLessons(): Promise<LearnLesson[]>;
  getLessonDetail(lessonId: string): Promise<LearnLessonDetail | null>;
  completeLesson(lessonId: string): Promise<LearnLesson>;
}

