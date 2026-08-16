import type { DashboardSummary } from "../../types/dashboard";

export interface IDashboardRepository {
  getSummary(): Promise<DashboardSummary>;
}
