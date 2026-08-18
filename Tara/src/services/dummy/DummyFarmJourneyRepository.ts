import {
  DUMMY_ACHIEVEMENTS,
  DUMMY_FARM_HEALTH_METRICS,
  DUMMY_FARM_TIMELINE,
} from "../../data/dummy/farmJourneyData";
import type {
  AchievementBadge,
  FarmHealthMetrics,
  FarmPracticeCategory,
  FarmTimelineEvent,
} from "../../types/farmJourney";
import type { IFarmJourneyRepository } from "../repositories/IFarmJourneyRepository";

export class DummyFarmJourneyRepository implements IFarmJourneyRepository {
  private timeline = [...DUMMY_FARM_TIMELINE];
  private achievements = [...DUMMY_ACHIEVEMENTS];
  private farmHealth = { ...DUMMY_FARM_HEALTH_METRICS };

  async getTimelineEvents(): Promise<FarmTimelineEvent[]> {
    return this.timeline;
  }

  async addTimelineEvent(event: {
    title: string;
    description: string;
    category: FarmPracticeCategory;
    metricsEffect?: string;
  }): Promise<FarmTimelineEvent> {
    const newEvent: FarmTimelineEvent = {
      id: `evt-${Date.now()}`,
      date: "Today",
      title: event.title,
      description: event.description,
      category: event.category,
      taraNote: "Wonderful progress! Sustainable practices build organic resilience across every layer of your farm.",
      healthDelta: 3,
      metricsEffect: event.metricsEffect || "Improves overall soil biological activity",
    };
    this.timeline.unshift(newEvent);
    this.farmHealth.overallScore = Math.min(100, this.farmHealth.overallScore + 3);
    this.farmHealth.activePracticesCount += 1;
    return newEvent;
  }

  async getAchievements(): Promise<AchievementBadge[]> {
    return this.achievements;
  }

  async claimBadge(badgeId: string): Promise<void> {
    this.achievements = this.achievements.map((b) =>
      b.id === badgeId ? { ...b, isUnlocked: true, unlockedDate: "Today", progress: b.maxProgress } : b
    );
  }

  async getFarmHealth(): Promise<FarmHealthMetrics> {
    return this.farmHealth;
  }
}
