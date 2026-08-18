import { apiClient } from "./apiClient";
import { getBundledLevelDefinition } from "../learn/bundledLevels";
import type {
  LearnCategory,
  LearnLesson,
  LearnLessonDetail,
  LearnSummary,
  LevelDefinition,
} from "../../types/learn";
import type { ILearnRepository } from "../repositories/ILearnRepository";

// API-backed implementation of ILearnRepository.
// Endpoints match the backend /api/v1/learn/* service (Phase 4). Heavy level
// play content (LevelDefinition phases) is served from the backend only when a
// schema payload has been seeded; otherwise we fall back to the bundled lesson
// packages so the lesson experience is never degraded.
export class ApiLearnRepository implements ILearnRepository {
  async getSummary(): Promise<LearnSummary> {
    return await apiClient.get<LearnSummary>("/learn/summary");
  }

  async getCategories(): Promise<LearnCategory[]> {
    return await apiClient.get<LearnCategory[]>("/learn/categories");
  }

  async getLessons(): Promise<LearnLesson[]> {
    return await apiClient.get<LearnLesson[]>("/learn/lessons");
  }

  async getLessonDetail(lessonId: string): Promise<LearnLessonDetail | null> {
    return await apiClient.get<LearnLessonDetail | null>(`/learn/lessons/${lessonId}`);
  }

  async completeLesson(lessonId: string): Promise<LearnLesson> {
    return await apiClient.post<LearnLesson>(`/learn/lessons/${lessonId}/complete`);
  }

  async getLevelDefinition(
    levelId: string,
    lang?: string
  ): Promise<LevelDefinition | null> {
    const query = lang && lang !== "en" ? `?lang=${lang}` : "";
    const fromApi = await apiClient.get<LevelDefinition | null>(
      `/learn/levels/${levelId}${query}`
    );
    if (fromApi) {
      return fromApi;
    }
    return getBundledLevelDefinition(levelId, lang);
  }

  async completeLevelStep(levelId: string, xpEarned: number): Promise<void> {
    await apiClient.post(`/learn/levels/${levelId}/complete`, { xpEarned });
  }
}