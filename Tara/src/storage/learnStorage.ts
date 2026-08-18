import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export interface StoredLearnProgress {
  completedLevelIds: string[];
  unlockedLevelIds: string[];
  totalXpEarned: number;
  levelAccuracies: Record<string, number>;
  unlockedBadgeIds: string[];
  lastUpdated: string;
}

const LEARN_PROGRESS_KEY = "tara_learn_progress_v1";

const DEFAULT_PROGRESS: StoredLearnProgress = {
  completedLevelIds: [],
  unlockedLevelIds: ["sustainable-soil-level-1", "soil-level-1", "basics-level-1"],
  totalXpEarned: 0,
  levelAccuracies: {},
  unlockedBadgeIds: [],
  lastUpdated: new Date().toISOString(),
};

// In-memory fallback
let memoryStorageCache: StoredLearnProgress | null = null;

export const learnStorage = {
  async getProgress(): Promise<StoredLearnProgress> {
    try {
      if (Platform.OS === "web") {
        if (typeof window !== "undefined" && window.localStorage) {
          const raw = window.localStorage.getItem(LEARN_PROGRESS_KEY);
          if (raw) {
            return JSON.parse(raw) as StoredLearnProgress;
          }
        }
        return memoryStorageCache ?? { ...DEFAULT_PROGRESS };
      }

      const raw = await SecureStore.getItemAsync(LEARN_PROGRESS_KEY);
      if (raw) {
        return JSON.parse(raw) as StoredLearnProgress;
      }
      return { ...DEFAULT_PROGRESS };
    } catch (error) {
      console.warn("Error reading learn storage:", error);
      return memoryStorageCache ?? { ...DEFAULT_PROGRESS };
    }
  },

  async saveProgress(progress: StoredLearnProgress): Promise<void> {
    try {
      memoryStorageCache = progress;
      const jsonStr = JSON.stringify(progress);

      if (Platform.OS === "web") {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(LEARN_PROGRESS_KEY, jsonStr);
        }
        return;
      }

      await SecureStore.setItemAsync(LEARN_PROGRESS_KEY, jsonStr);
    } catch (error) {
      console.warn("Error saving learn storage:", error);
    }
  },

  async markLevelCompleted(
    levelId: string,
    nextLevelIdToUnlock?: string,
    xpAwarded: number = 0,
    accuracy: number = 100,
    badgeId?: string
  ): Promise<StoredLearnProgress> {
    const current = await this.getProgress();
    const completedSet = new Set(current.completedLevelIds);
    completedSet.add(levelId);

    const unlockedSet = new Set(current.unlockedLevelIds);
    unlockedSet.add(levelId);
    if (nextLevelIdToUnlock) {
      unlockedSet.add(nextLevelIdToUnlock);
    }

    const badgeSet = new Set(current.unlockedBadgeIds);
    if (badgeId) {
      badgeSet.add(badgeId);
    }

    const updated: StoredLearnProgress = {
      completedLevelIds: Array.from(completedSet),
      unlockedLevelIds: Array.from(unlockedSet),
      totalXpEarned: current.totalXpEarned + xpAwarded,
      levelAccuracies: {
        ...current.levelAccuracies,
        [levelId]: accuracy,
      },
      unlockedBadgeIds: Array.from(badgeSet),
      lastUpdated: new Date().toISOString(),
    };

    await this.saveProgress(updated);
    return updated;
  },

  async isLevelCompleted(levelId: string): Promise<boolean> {
    const current = await this.getProgress();
    return current.completedLevelIds.includes(levelId);
  },

  async isLevelUnlocked(levelId: string): Promise<boolean> {
    const current = await this.getProgress();
    return current.unlockedLevelIds.includes(levelId);
  },

  async resetProgress(): Promise<void> {
    await this.saveProgress({ ...DEFAULT_PROGRESS });
  },
};
