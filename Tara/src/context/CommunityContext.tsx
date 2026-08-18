import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import { communityRepository } from "../services";
import { useAuth } from "../auth/AuthProvider";
import { useUser } from "./UserContext";

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
  const { user: authUser } = useAuth();
  const { user: profile, farm } = useUser();
  const [panchayats, setPanchayats] = useState<Panchayat[]>(DUMMY_PANCHAYATS);
  const [activePanchayatId, setActivePanchayatId] = useState<string>(
    DUMMY_PANCHAYATS[0].id
  );
  const [voiceStories, setVoiceStories] =
    useState<VoiceStory[]>(DUMMY_VOICE_STORIES);
  const [contributions, setContributions] =
    useState<CommunityContribution[]>(DUMMY_CONTRIBUTIONS);
  const [userImpact, setUserImpact] =
    useState<UserImpactMetrics>(DUMMY_USER_IMPACT);
  const [panchayatImpact, setPanchayatImpact] =
    useState<PanchayatImpactMetrics>(DUMMY_PANCHAYAT_IMPACT);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] =
    useState<LeaderboardFarmer[]>(DUMMY_LEADERBOARD);
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

  // Hydrate all community data from the backend once signed in. Dummy data is
  // the initial state, so the screens never render empty while loading.
  useEffect(() => {
    if (!authUser) return;
    let cancelled = false;

    (async () => {
      try {
        const [p, s, c, i, l] = await Promise.all([
          communityRepository.getPanchayats(),
          communityRepository.getVoiceStories("all"),
          communityRepository.getContributions("all"),
          communityRepository.getUserImpact(),
          communityRepository.getLeaderboard("weekly", "panchayat"),
        ]);
        if (cancelled) return;
        setPanchayats(p);
        setVoiceStories(s);
        setContributions(c);
        setUserImpact(i);
        setLeaderboard(l);
        // Select the first server panchayat once loaded.
        setActivePanchayatId((prev) =>
          p.some((x) => x.id === prev) ? prev : (p[0]?.id ?? prev)
        );
        setIsHydrated(true);
      } catch (e) {
        console.warn("Failed to load community data from backend", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authUser]);

  // Panchayat impact follows the selected panchayat. Only fires once community
  // data has hydrated from the backend — before that, activePanchayatId is a
  // dummy placeholder the server cannot resolve.
  useEffect(() => {
    if (!authUser || !isHydrated || !panchayats.some((p) => p.id === activePanchayatId)) {
      return;
    }
    let cancelled = false;
    communityRepository
      .getPanchayatImpact(activePanchayatId)
      .then((i) => {
        if (!cancelled) setPanchayatImpact(i);
      })
      .catch((e) => console.warn("Failed to load panchayat impact", e));
    return () => {
      cancelled = true;
    };
  }, [authUser, isHydrated, activePanchayatId, panchayats]);

  const switchPanchayat = useCallback((id: string) => {
    setActivePanchayatId(id);
  }, []);

  const playVoiceStory = useCallback((id: string) => {
    setActiveStoryPlayingId(id);
    setIsPlayingAudio(true);
    setVoiceStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, playsCount: s.playsCount + 1 } : s))
    );
  }, []);

  const pauseVoiceStory = useCallback(() => {
    setIsPlayingAudio(false);
  }, []);

  const toggleLikeStory = useCallback((id: string) => {
    setVoiceStories((prev) => {
      const next = prev.map((s) => {
        if (s.id === id) {
          const isLiked = !s.isLiked;
          return {
            ...s,
            isLiked,
            likesCount: isLiked ? s.likesCount + 1 : s.likesCount - 1,
          };
        }
        return s;
      });
      communityRepository
        .likeStory(id)
        .catch((e) => console.warn("Failed to like story", e));
      return next;
    });
  }, []);

  const toggleBookmarkStory = useCallback((id: string) => {
    setVoiceStories((prev) => {
      const next = prev.map((s) =>
        s.id === id ? { ...s, isBookmarked: !s.isBookmarked } : s
      );
      communityRepository
        .bookmarkStory(id)
        .catch((e) => console.warn("Failed to bookmark story", e));
      return next;
    });
  }, []);

  const likeContribution = useCallback((id: string) => {
    setContributions((prev) => {
      const next = prev.map((c) => {
        if (c.id === id) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likesCount: isLiked ? c.likesCount + 1 : c.likesCount - 1,
          };
        }
        return c;
      });
      communityRepository
        .likeContribution(id)
        .catch((e) => console.warn("Failed to like contribution", e));
      return next;
    });
  }, []);

  const authorName = profile?.name || "Ravi Kumar";
  const authorLocation =
    farm?.district || farm?.state || activePanchayat.name || "Dombivli";

  const addContribution = useCallback(
    (newContrib: {
      type: ContributionType;
      category: ContributionCategory;
      title: string;
      content: string;
    }) => {
      const tempId = `contrib-${Date.now()}`;
      const optimistic: CommunityContribution = {
        id: tempId,
        author: {
          name: authorName,
          location: authorLocation,
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

      setContributions((prev) => [optimistic, ...prev]);
      setUserImpact((prev) => ({
        ...prev,
        practicesSharedCount: prev.practicesSharedCount + 1,
      }));

      // Persist to backend, then swap the optimistic item for the server item.
      communityRepository
        .createContribution(newContrib)
        .then((created) => {
          setContributions((prev) =>
            prev.map((c) => (c.id === tempId ? created : c))
          );
        })
        .catch((e) => console.warn("Failed to create contribution", e));
    },
    [authorName, authorLocation]
  );

  const addReplyToContribution = useCallback(
    (contributionId: string, text: string) => {
      const newReply = {
        id: `rep-${Date.now()}`,
        authorName,
        authorLocation,
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
      communityRepository
        .addReply(contributionId, text)
        .catch((e) => console.warn("Failed to add reply", e));
    },
    [authorName, authorLocation]
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