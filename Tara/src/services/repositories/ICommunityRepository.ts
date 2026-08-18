import type {
  CommunityContribution,
  ContributionCategory,
  ContributionType,
  LeaderboardFarmer,
  Panchayat,
  PanchayatImpactMetrics,
  UserImpactMetrics,
  VoiceStory,
} from "../../types/community";

export interface ICommunityRepository {
  getPanchayats(): Promise<Panchayat[]>;
  getVoiceStories(category?: ContributionCategory | "all"): Promise<VoiceStory[]>;
  getContributions(type?: ContributionType | "all"): Promise<CommunityContribution[]>;
  getUserImpact(): Promise<UserImpactMetrics>;
  getPanchayatImpact(panchayatId: string): Promise<PanchayatImpactMetrics>;
  getLeaderboard(timeframe?: string, scope?: string): Promise<LeaderboardFarmer[]>;
  likeStory(storyId: string): Promise<void>;
  bookmarkStory(storyId: string): Promise<void>;
  likeContribution(contributionId: string): Promise<void>;
  createContribution(contribution: {
    type: ContributionType;
    category: ContributionCategory;
    title: string;
    content: string;
  }): Promise<CommunityContribution>;
  addReply(contributionId: string, text: string): Promise<void>;
}
