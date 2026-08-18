import {
  DUMMY_CONTRIBUTIONS,
  DUMMY_LEADERBOARD,
  DUMMY_PANCHAYAT_IMPACT,
  DUMMY_PANCHAYATS,
  DUMMY_USER_IMPACT,
  DUMMY_VOICE_STORIES,
} from "../../data/dummy/communityData";
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

export class DummyCommunityRepository implements ICommunityRepository {
  private panchayats = [...DUMMY_PANCHAYATS];
  private stories = [...DUMMY_VOICE_STORIES];
  private contributions = [...DUMMY_CONTRIBUTIONS];
  private userImpact = { ...DUMMY_USER_IMPACT };
  private panchayatImpact = { ...DUMMY_PANCHAYAT_IMPACT };
  private leaderboard = [...DUMMY_LEADERBOARD];

  async getPanchayats(): Promise<Panchayat[]> {
    return this.panchayats;
  }

  async getVoiceStories(category?: ContributionCategory | "all"): Promise<VoiceStory[]> {
    if (!category || category === "all") return this.stories;
    return this.stories.filter((s) => s.category === category);
  }

  async getContributions(type?: ContributionType | "all"): Promise<CommunityContribution[]> {
    if (!type || type === "all") return this.contributions;
    return this.contributions.filter((c) => c.type === type);
  }

  async getUserImpact(): Promise<UserImpactMetrics> {
    return this.userImpact;
  }

  async getPanchayatImpact(_panchayatId: string): Promise<PanchayatImpactMetrics> {
    return this.panchayatImpact;
  }

  async getLeaderboard(_timeframe?: string, _scope?: string): Promise<LeaderboardFarmer[]> {
    return this.leaderboard;
  }

  async likeStory(storyId: string): Promise<void> {
    this.stories = this.stories.map((s) =>
      s.id === storyId ? { ...s, isLiked: !s.isLiked, likesCount: s.isLiked ? s.likesCount - 1 : s.likesCount + 1 } : s
    );
  }

  async bookmarkStory(storyId: string): Promise<void> {
    this.stories = this.stories.map((s) =>
      s.id === storyId ? { ...s, isBookmarked: !s.isBookmarked } : s
    );
  }

  async likeContribution(contributionId: string): Promise<void> {
    this.contributions = this.contributions.map((c) =>
      c.id === contributionId
        ? { ...c, isLiked: !c.isLiked, likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1 }
        : c
    );
  }

  async createContribution(contribution: {
    type: ContributionType;
    category: ContributionCategory;
    title: string;
    content: string;
  }): Promise<CommunityContribution> {
    const newItem: CommunityContribution = {
      id: `contrib-${Date.now()}`,
      author: {
        name: "Ravi Kumar",
        location: "Dombivli Panchayat",
        badge: "Soil Guardian",
      },
      type: contribution.type,
      category: contribution.category,
      title: contribution.title,
      content: contribution.content,
      likesCount: 0,
      isLiked: false,
      repliesCount: 0,
      replies: [],
      createdAt: "Just now",
      taraVerifiedAnswer: {
        text: "Thank you for contributing to the community! Your practice has been indexed by Tara for local farmers.",
        verifiedBy: "Tara AI Mentor",
        actionableStep: "Monitor humidity and share periodic updates.",
      },
    };
    this.contributions.unshift(newItem);
    return newItem;
  }

  async addReply(contributionId: string, text: string): Promise<void> {
    this.contributions = this.contributions.map((c) => {
      if (c.id === contributionId) {
        return {
          ...c,
          repliesCount: c.repliesCount + 1,
          replies: [
            ...c.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: "Ravi Kumar",
              authorLocation: "Dombivli",
              text,
              createdAt: "Just now",
              likesCount: 0,
            },
          ],
        };
      }
      return c;
    });
  }
}
