import { TODAYS_PRACTICE } from "../../data/dummy/dashboardData";
import type { DashboardSummary } from "../../types/dashboard";
import type { IDashboardRepository } from "../repositories/IDashboardRepository";

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyDashboardRepository implements IDashboardRepository {
  async getSummary(): Promise<DashboardSummary> {
    await delay(100);
    return {
      todaysPractice: TODAYS_PRACTICE,
      completedPractices: 2,
      totalPractices: 8,
      xpEarnedThisWeek: 180,
    };
  }
}
