import { apiClient } from "./apiClient";
import type {
  AchievementBadge,
  FarmHealthMetrics,
  FarmPracticeCategory,
  FarmTimelineEvent,
} from "../../types/farmJourney";
import type { IFarmJourneyRepository } from "../repositories/IFarmJourneyRepository";

export class ApiFarmJourneyRepository implements IFarmJourneyRepository {
  async getTimelineEvents(): Promise<FarmTimelineEvent[]> {
    return await apiClient.get<FarmTimelineEvent[]>("/farm-journey/timeline");
  }

  async addTimelineEvent(event: {
    title: string;
    description: string;
    category: FarmPracticeCategory;
    metricsEffect?: string;
  }): Promise<FarmTimelineEvent> {
    return await apiClient.post<FarmTimelineEvent>("/farm-journey/timeline", event);
  }

  async getAchievements(): Promise<AchievementBadge[]> {
    return await apiClient.get<AchievementBadge[]>("/farm-journey/achievements");
  }

  async claimBadge(badgeId: string): Promise<void> {
    await apiClient.post(`/farm-journey/achievements/${badgeId}/claim`);
  }

  async getFarmHealth(): Promise<FarmHealthMetrics> {
    return await apiClient.get<FarmHealthMetrics>("/farm-journey/health");
  }
}
