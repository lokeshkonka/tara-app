import { apiClient } from "./apiClient";
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
import type { ICommunityRepository } from "../repositories/ICommunityRepository";

export class ApiCommunityRepository implements ICommunityRepository {
  async getPanchayats(): Promise<Panchayat[]> {
    return await apiClient.get<Panchayat[]>("/community/panchayats");
  }

  async getVoiceStories(category?: ContributionCategory | "all"): Promise<VoiceStory[]> {
    const query = category && category !== "all" ? `?category=${category}` : "";
    return await apiClient.get<VoiceStory[]>(`/community/voice-stories${query}`);
  }

  async getContributions(type?: ContributionType | "all"): Promise<CommunityContribution[]> {
    const query = type && type !== "all" ? `?type=${type}` : "";
    return await apiClient.get<CommunityContribution[]>(`/community/posts${query}`);
  }

  async getUserImpact(): Promise<UserImpactMetrics> {
    return await apiClient.get<UserImpactMetrics>("/community/impact/user");
  }

  async getPanchayatImpact(panchayatId: string): Promise<PanchayatImpactMetrics> {
    return await apiClient.get<PanchayatImpactMetrics>(`/community/impact/panchayat/${panchayatId}`);
  }

  async getLeaderboard(timeframe = "weekly", scope = "panchayat"): Promise<LeaderboardFarmer[]> {
    return await apiClient.get<LeaderboardFarmer[]>(
      `/community/leaderboard?timeframe=${timeframe}&scope=${scope}`
    );
  }

  async likeStory(storyId: string): Promise<void> {
    await apiClient.post(`/community/voice-stories/${storyId}/like`);
  }

  async bookmarkStory(storyId: string): Promise<void> {
    await apiClient.post(`/community/voice-stories/${storyId}/bookmark`);
  }

  async likeContribution(contributionId: string): Promise<void> {
    await apiClient.post(`/community/posts/${contributionId}/like`);
  }

  async createContribution(contribution: {
    type: ContributionType;
    category: ContributionCategory;
    title: string;
    content: string;
  }): Promise<CommunityContribution> {
    return await apiClient.post<CommunityContribution>("/community/posts", contribution);
  }

  async addReply(contributionId: string, text: string): Promise<void> {
    await apiClient.post(`/community/posts/${contributionId}/replies`, { text });
  }
}
