import React, {
  createContext,
  useCallback,
  useContext,
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
  const [timelineEvents, setTimelineEvents] =
    useState<FarmTimelineEvent[]>(DUMMY_FARM_TIMELINE);
  const [achievements, setAchievements] =
    useState<AchievementBadge[]>(DUMMY_ACHIEVEMENTS);
  const [farmHealth, setFarmHealth] = useState<FarmHealthMetrics>(
    DUMMY_FARM_HEALTH_METRICS
  );

  const addTimelineEvent = useCallback(
    (event: {
      title: string;
      description: string;
      category: FarmPracticeCategory;
      metricsEffect?: string;
    }) => {
      const newEvent: FarmTimelineEvent = {
        id: `evt-${Date.now()}`,
        date: "Today",
        title: event.title,
        description: event.description,
        category: event.category,
        taraNote: "Wonderful progress! Sustainable practices gradually build organic resilience across every layer of your farm.",
        healthDelta: 3,
        metricsEffect: event.metricsEffect || "Improves overall soil biological activity",
      };

      setTimelineEvents((prev) => [newEvent, ...prev]);
      setFarmHealth((prev) => ({
        ...prev,
        overallScore: Math.min(100, prev.overallScore + 3),
        activePracticesCount: prev.activePracticesCount + 1,
      }));
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
