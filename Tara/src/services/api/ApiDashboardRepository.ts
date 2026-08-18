import { apiClient } from "./apiClient";
import type { DashboardSummary } from "../../types/dashboard";
import type { IDashboardRepository } from "../repositories/IDashboardRepository";

export class ApiDashboardRepository implements IDashboardRepository {
  async getSummary(): Promise<DashboardSummary> {
    return await apiClient.get<DashboardSummary>("/dashboard/summary");
  }
}