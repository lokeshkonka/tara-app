import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { learnRepository } from "../services";
import type { LearnCategory, LearnLesson, LearnSummary } from "../types/learn";

interface LearnContextValue {
  summary: LearnSummary | null;
  categories: LearnCategory[];
  lessons: LearnLesson[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
}

const LearnContext = createContext<LearnContextValue | null>(null);

export function LearnProvider({ children }: { children: ReactNode }) {
  const [summary, setSummary] = useState<LearnSummary | null>(null);
  const [categories, setCategories] = useState<LearnCategory[]>([]);
  const [lessons, setLessons] = useState<LearnLesson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const [data, cats, les] = await Promise.all([
        learnRepository.getSummary(),
        learnRepository.getCategories(),
        learnRepository.getLessons(),
      ]);
      setSummary(data);
      setCategories(cats);
      setLessons(les);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load learn summary");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeLesson = useCallback(async (lessonId: string) => {
    try {
      const updated = await learnRepository.completeLesson(lessonId);
      setLessons((prev) =>
        prev.map((item) => (item.id === lessonId ? updated : item))
      );
      setSummary((prev) =>
        prev ? { ...prev, todayXp: prev.todayXp + updated.xp } : prev
      );
    } catch (err: unknown) {
      console.warn("Failed to complete lesson:", err);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <LearnContext.Provider
      value={{ summary, categories, lessons, isLoading, error, refresh, completeLesson }}
    >
      {children}
    </LearnContext.Provider>
  );
}

export function useLearn() {
  const context = useContext(LearnContext);
  if (!context) {
    throw new Error("useLearn must be used within a LearnProvider");
  }
  return context;
}
