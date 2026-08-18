import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DUMMY_ACHIEVEMENTS,
  DUMMY_FARM_HEALTH_METRICS,
  DUMMY_FARM_TIMELINE,
} from "../data/dummy/farmJourneyData";
import type {
  AchievementBadge,
  FarmHealthMetrics,
  FarmPracticeCategory,
  FarmTimelineEvent,
} from "../types/farmJourney";
import { farmJourneyRepository } from "../services";
import { useAuth } from "../auth/AuthProvider";

interface FarmJourneyContextValue {
  timelineEvents: FarmTimelineEvent[];
  achievements: AchievementBadge[];
  farmHealth: FarmHealthMetrics;
  addTimelineEvent: (event: {
    title: string;
    description: string;
    category: FarmPracticeCategory;
    metricsEffect?: string;
  }) => void;
  claimBadge: (badgeId: string) => void;
}

const FarmJourneyContext = createContext<FarmJourneyContextValue | null>(null);

export function FarmJourneyProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [timelineEvents, setTimelineEvents] =
    useState<FarmTimelineEvent[]>(DUMMY_FARM_TIMELINE);
  const [achievements, setAchievements] =
    useState<AchievementBadge[]>(DUMMY_ACHIEVEMENTS);
  const [farmHealth, setFarmHealth] = useState<FarmHealthMetrics>(
    DUMMY_FARM_HEALTH_METRICS
  );

  // Hydrate the farm journey from the backend once signed in. Dummy data is the
  // initial state, so the screens never render empty while loading.
  useEffect(() => {
    if (!authUser) return;
    let cancelled = false;

    (async () => {
      try {
        const [timeline, badges, health] = await Promise.all([
          farmJourneyRepository.getTimelineEvents(),
          farmJourneyRepository.getAchievements(),
          farmJourneyRepository.getFarmHealth(),
        ]);
        if (cancelled) return;
        setTimelineEvents(timeline);
        setAchievements(badges);
        setFarmHealth(health);
      } catch (e) {
        console.warn("Failed to load farm journey from backend", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authUser]);

  const addTimelineEvent = useCallback(
    (event: {
      title: string;
      description: string;
      category: FarmPracticeCategory;
      metricsEffect?: string;
    }) => {
      // Optimistic insert, replaced by the server event once persisted.
      const tempId = `evt-${Date.now()}`;
      const optimistic: FarmTimelineEvent = {
        id: tempId,
        date: "Today",
        title: event.title,
        description: event.description,
        category: event.category,
        taraNote: "Wonderful progress! Sustainable practices gradually build organic resilience across every layer of your farm.",
        healthDelta: 3,
        metricsEffect: event.metricsEffect || "Improves overall soil biological activity",
      };

      setTimelineEvents((prev) => [optimistic, ...prev]);
      setFarmHealth((prev) => ({
        ...prev,
        overallScore: Math.min(100, prev.overallScore + 3),
        activePracticesCount: prev.activePracticesCount + 1,
      }));

      farmJourneyRepository
        .addTimelineEvent(event)
        .then((created) => {
          setTimelineEvents((prev) =>
            prev.map((e) => (e.id === tempId ? created : e))
          );
        })
        .catch((e) => console.warn("Failed to persist timeline event", e));
    },
    []
  );

  const claimBadge = useCallback((badgeId: string) => {
    setAchievements((prev) =>
      prev.map((b) =>
        b.id === badgeId
          ? {
              ...b,
              isUnlocked: true,
              unlockedDate: "Today",
              progress: b.maxProgress,
            }
          : b
      )
    );
    farmJourneyRepository
      .claimBadge(badgeId)
      .catch((e) => console.warn("Failed to claim badge", e));
  }, []);

  return (
    <FarmJourneyContext.Provider
      value={{
        timelineEvents,
        achievements,
        farmHealth,
        addTimelineEvent,
        claimBadge,
      }}
    >
      {children}
    </FarmJourneyContext.Provider>
  );
}

export function useFarmJourney() {
  const context = useContext(FarmJourneyContext);
  if (!context) {
    throw new Error("useFarmJourney must be used within a FarmJourneyProvider");
  }
  return context;
}