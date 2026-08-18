export type FarmPracticeCategory = "soil" | "water" | "organic" | "pest" | "energy";

export interface FarmTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: FarmPracticeCategory;
  imageUrl?: string;
  taraNote: string;
  healthDelta: number; // e.g. +4
  metricsEffect?: string; // e.g. "Saved 12,000L water/month"
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: "practice" | "streak" | "community" | "learning";
  iconName: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  xpReward: number;
  progress: number;
  maxProgress: number;
}

export interface FarmHealthMetrics {
  overallScore: number; // out of 100
  soilOrganicMatterScore: number;
  waterEfficiencyScore: number;
  biologicalDiversityScore: number;
  cropResilienceScore: number;
  activePracticesCount: number;
  acresProtected: number;
}
