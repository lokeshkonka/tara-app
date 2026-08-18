import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { TODAYS_PRACTICE } from "../data/dummy/dashboardData";
import { dashboardRepository } from "../services";
import type { PracticeItem } from "../types/farm";
import { useAuth } from "../auth/AuthProvider";

interface DashboardContextValue {
  todaysPractice: PracticeItem | null;
  completedPractices: number;
  totalPractices: number;
  xpEarnedThisWeek: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [todaysPractice, setTodaysPractice] = useState<PracticeItem | null>(
    TODAYS_PRACTICE
  );
  const [completedPractices, setCompletedPractices] = useState(0);
  const [totalPractices, setTotalPractices] = useState(0);
  const [xpEarnedThisWeek, setXpEarnedThisWeek] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const summary = await dashboardRepository.getSummary();
      setTodaysPractice(summary.todaysPractice);
      setCompletedPractices(summary.completedPractices);
      setTotalPractices(summary.totalPractices);
      setXpEarnedThisWeek(summary.xpEarnedThisWeek);
      setError(null);
    } catch (err: unknown) {
      // Offline/unauthenticated: keep the dummy defaults so the Home screen
      // never renders empty.
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
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
    <DashboardContext.Provider
      value={{
        todaysPractice,
        completedPractices,
        totalPractices,
        xpEarnedThisWeek,
        isLoading,
        error,
        refresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
