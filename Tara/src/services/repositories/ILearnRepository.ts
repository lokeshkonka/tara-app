import type { LearnCategory, LearnLesson, LearnLessonDetail, LearnSummary, LevelDefinition } from "../../types/learn";

export interface ILearnRepository {
  getSummary(): Promise<LearnSummary>;
  getCategories(): Promise<LearnCategory[]>;
  getLessons(lang?: string): Promise<LearnLesson[]>;
  getLessonDetail(lessonId: string, lang?: string): Promise<LearnLessonDetail | null>;
  completeLesson(lessonId: string): Promise<LearnLesson>;
  getLevelDefinition(levelId: string, lang?: string): Promise<LevelDefinition | null>;
  completeLevelStep(levelId: string, xpEarned: number): Promise<void>;
}


