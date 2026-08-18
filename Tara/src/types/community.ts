export type ContributionType = "practice" | "tip" | "story" | "question";
export type ContributionCategory = "soil" | "water" | "organic" | "pest" | "seeds" | "general";

export interface Panchayat {
  id: string;
  name: string;
  district: string;
  state: string;
  membersCount: number;
  activePracticesCount: number;
  sustainabilityScore: number;
}

export interface VoiceStory {
  id: string;
  author: {
    name: string;
    village: string;
    state: string;
    avatarUrl?: string;
    languageCode: string;
    languageName: string;
  };
  title: string;
  description: string;
  audioUrl: string;
  durationSeconds: number;
  durationFormatted: string;
  category: ContributionCategory;
  likesCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  playsCount: number;
  waveformSample: number[];
  transcript: string;
  taraTakeaway: string;
  createdAt: string;
}

export interface ContributionReply {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatarUrl?: string;
  text: string;
  isTaraVerified?: boolean;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface CommunityContribution {
  id: string;
  author: {
    name: string;
    location: string;
    avatarUrl?: string;
    badge?: string;
  };
  type: ContributionType;
  category: ContributionCategory;
  title: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  isLiked?: boolean;
  repliesCount: number;
  replies: ContributionReply[];
  taraVerifiedAnswer?: {
    text: string;
    verifiedBy: string;
    actionableStep: string;
  };
  createdAt: string;
}

export interface UserImpactMetrics {
  communityRank: number;
  totalFarmersInPanchayat: number;
  reputationTitle: string;
  progressToMentorPct: number;
  practicesSharedCount: number;
  questionsAnsweredCount: number;
  farmersHelpedCount: number;
  acresInfluenced: number;
  fertilizerReducedKg: number;
  waterSavedLiters: number;
  soilProtectedAcres: number;
}

export interface PanchayatImpactMetrics {
  totalMembers: number;
  totalPracticesAdopted: number;
  totalFertilizerReducedKg: number;
  totalWaterSavedLiters: number;
  totalSoilProtectedAcres: number;
  activeChallengesCount: number;
}

export interface LeaderboardFarmer {
  rank: number;
  id: string;
  name: string;
  location: string;
  panchayat: string;
  avatarUrl?: string;
  xp: number;
  streakDays: number;
  badge: string;
  level: number;
  isCurrentUser?: boolean;
}
