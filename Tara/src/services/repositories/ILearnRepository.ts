import type { LearnCategory, LearnLesson, LearnSummary } from "../../types/learn";

export interface ILearnRepository {
  getSummary(): Promise<LearnSummary>;
  getCategories(): Promise<LearnCategory[]>;
  getLessons(): Promise<LearnLesson[]>;
}
