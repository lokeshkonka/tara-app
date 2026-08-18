import type {
  AchievementBadge,
  FarmHealthMetrics,
  FarmPracticeCategory,
  FarmTimelineEvent,
} from "../../types/farmJourney";

export interface IFarmJourneyRepository {
  getTimelineEvents(): Promise<FarmTimelineEvent[]>;
  addTimelineEvent(event: {
    title: string;
    description: string;
    category: FarmPracticeCategory;
    metricsEffect?: string;
  }): Promise<FarmTimelineEvent>;
  getAchievements(): Promise<AchievementBadge[]>;
  claimBadge(badgeId: string): Promise<void>;
  getFarmHealth(): Promise<FarmHealthMetrics>;
}
