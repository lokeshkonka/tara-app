import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DUMMY_CONTRIBUTIONS,
  DUMMY_LEADERBOARD,
  DUMMY_PANCHAYAT_IMPACT,
  DUMMY_PANCHAYATS,
  DUMMY_USER_IMPACT,
  DUMMY_VOICE_STORIES,
} from "../data/dummy/communityData";
import type {
  CommunityContribution,
  ContributionCategory,
  ContributionType,
  LeaderboardFarmer,
  Panchayat,
  PanchayatImpactMetrics,
  UserImpactMetrics,
  VoiceStory,
} from "../types/community";

interface CommunityContextValue {
  panchayats: Panchayat[];
  activePanchayat: Panchayat;
  activePanchayatId: string;
  voiceStories: VoiceStory[];
  contributions: CommunityContribution[];
  userImpact: UserImpactMetrics;
  panchayatImpact: PanchayatImpactMetrics;
  leaderboard: LeaderboardFarmer[];
  activeStoryPlayingId: string | null;
  isPlayingAudio: boolean;
  selectedCategory: ContributionCategory | "all";
  switchPanchayat: (id: string) => void;
  playVoiceStory: (id: string) => void;
  pauseVoiceStory: () => void;
  toggleLikeStory: (id: string) => void;
  toggleBookmarkStory: (id: string) => void;
  likeContribution: (id: string) => void;
  addContribution: (newContrib: {
    type: ContributionType;
    category: ContributionCategory;
    title: string;
    content: string;
  }) => void;
  addReplyToContribution: (contributionId: string, text: string) => void;
  setSelectedCategory: (category: ContributionCategory | "all") => void;
}

const CommunityContext = createContext<CommunityContextValue | null>(null);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [panchayats] = useState<Panchayat[]>(DUMMY_PANCHAYATS);
  const [activePanchayatId, setActivePanchayatId] = useState<string>(
    DUMMY_PANCHAYATS[0].id
  );
  const [voiceStories, setVoiceStories] =
    useState<VoiceStory[]>(DUMMY_VOICE_STORIES);
  const [contributions, setContributions] =
    useState<CommunityContribution[]>(DUMMY_CONTRIBUTIONS);
  const [userImpact, setUserImpact] =
    useState<UserImpactMetrics>(DUMMY_USER_IMPACT);
  const [panchayatImpact] =
    useState<PanchayatImpactMetrics>(DUMMY_PANCHAYAT_IMPACT);
  const [leaderboard] = useState<LeaderboardFarmer[]>(DUMMY_LEADERBOARD);
  const [activeStoryPlayingId, setActiveStoryPlayingId] = useState<
    string | null
  >(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ContributionCategory | "all"
  >("all");

  const activePanchayat = useMemo(
    () =>
      panchayats.find((p) => p.id === activePanchayatId) ?? panchayats[0],
    [panchayats, activePanchayatId]
  );

  const switchPanchayat = useCallback((id: string) => {
    setActivePanchayatId(id);
  }, []);

  const playVoiceStory = useCallback((id: string) => {
    setActiveStoryPlayingId(id);
    setIsPlayingAudio(true);
    // Increment plays count
    setVoiceStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, playsCount: s.playsCount + 1 } : s))
    );
  }, []);

  const pauseVoiceStory = useCallback(() => {
    setIsPlayingAudio(false);
  }, []);

  const toggleLikeStory = useCallback((id: string) => {
    setVoiceStories((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const isLiked = !s.isLiked;
          return {
            ...s,
            isLiked,
            likesCount: isLiked ? s.likesCount + 1 : s.likesCount - 1,
          };
        }
        return s;
      })
    );
  }, []);

  const toggleBookmarkStory = useCallback((id: string) => {
    setVoiceStories((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isBookmarked: !s.isBookmarked } : s
      )
    );
  }, []);

  const likeContribution = useCallback((id: string) => {
    setContributions((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likesCount: isLiked ? c.likesCount + 1 : c.likesCount - 1,
          };
        }
        return c;
      })
    );
  }, []);

  const addContribution = useCallback(
    (newContrib: {
      type: ContributionType;
      category: ContributionCategory;
      title: string;
      content: string;
    }) => {
      const createdItem: CommunityContribution = {
        id: `contrib-${Date.now()}`,
        author: {
          name: "Ravi Kumar",
          location: activePanchayat.name,
          badge: "Soil Guardian",
        },
        type: newContrib.type,
        category: newContrib.category,
        title: newContrib.title,
        content: newContrib.content,
        likesCount: 0,
        isLiked: false,
        repliesCount: 0,
        replies: [],
        createdAt: "Just now",
        taraVerifiedAnswer: {
          text: "Thank you for contributing to the community! Your practice has been indexed by Tara for local farmers.",
          verifiedBy: "Tara AI Mentor",
          actionableStep: "Keep monitoring your soil humidity and update the group.",
        },
      };

      setContributions((prev) => [createdItem, ...prev]);
      setUserImpact((prev) => ({
        ...prev,
        practicesSharedCount: prev.practicesSharedCount + 1,
      }));
    },
    [activePanchayat.name]
  );

  const addReplyToContribution = useCallback(
    (contributionId: string, text: string) => {
      const newReply = {
        id: `rep-${Date.now()}`,
        authorName: "Ravi Kumar",
        authorLocation: "Nashik",
        text,
        createdAt: "Just now",
        likesCount: 0,
        isLiked: false,
      };

      setContributions((prev) =>
        prev.map((c) => {
          if (c.id === contributionId) {
            return {
              ...c,
              repliesCount: c.repliesCount + 1,
              replies: [...c.replies, newReply],
            };
          }
          return c;
        })
      );
    },
    []
  );

  return (
    <CommunityContext.Provider
      value={{
        panchayats,
        activePanchayat,
        activePanchayatId,
        voiceStories,
        contributions,
        userImpact,
        panchayatImpact,
        leaderboard,
        activeStoryPlayingId,
        isPlayingAudio,
        selectedCategory,
        switchPanchayat,
        playVoiceStory,
        pauseVoiceStory,
        toggleLikeStory,
        toggleBookmarkStory,
        likeContribution,
        addContribution,
        addReplyToContribution,
        setSelectedCategory,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
}
