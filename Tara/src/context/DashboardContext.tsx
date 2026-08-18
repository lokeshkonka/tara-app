import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useUser } from "./UserContext";
import { dashboardRepository } from "../services";
import type { PracticeItem } from "../types/farm";

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
  const { user } = useUser();
  const currentLang = user?.language || "en";

  const [todaysPractice, setTodaysPractice] = useState<PracticeItem | null>(null);
  const [completedPractices, setCompletedPractices] = useState(0);
  const [totalPractices, setTotalPractices] = useState(0);
  const [xpEarnedThisWeek, setXpEarnedThisWeek] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const summary = await dashboardRepository.getSummary(currentLang);
      setTodaysPractice(summary.todaysPractice);
      setCompletedPractices(summary.completedPractices);
      setTotalPractices(summary.totalPractices);
      setXpEarnedThisWeek(summary.xpEarnedThisWeek);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  }, [currentLang]);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
