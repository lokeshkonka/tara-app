import type { DashboardSummary } from "../../types/dashboard";

export interface IDashboardRepository {
  getSummary(lang?: string): Promise<DashboardSummary>;
}
