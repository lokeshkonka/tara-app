import type { PracticeItem } from "./farm";

export interface DashboardSummary {
  todaysPractice: PracticeItem | null;
  completedPractices: number;
  totalPractices: number;
  xpEarnedThisWeek: number;
}
