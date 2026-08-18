import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_PROGRESS } from "../data/dummy/progressData";
import { progressRepository } from "../services";
import type { ProgressData } from "../types/progress";
import { useAuth } from "../auth/AuthProvider";

interface ProgressContextValue {
  progress: ProgressData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [progress, setProgress] = useState<ProgressData | null>(
    DEFAULT_PROGRESS
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await progressRepository.getProgress();
      setProgress(data);
      setError(null);
    } catch (err: unknown) {
      // Offline/unauthenticated: keep the dummy defaults so the Progress
      // section never renders empty.
      setError(err instanceof Error ? err.message : "Failed to load progress");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hydrate from the backend once signed in. Dummy data is the initial state.
  useEffect(() => {
    if (!authUser) return;
    refresh();
  }, [authUser, refresh]);

  return (
    <ProgressContext.Provider
      value={{ progress, isLoading, error, refresh }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
