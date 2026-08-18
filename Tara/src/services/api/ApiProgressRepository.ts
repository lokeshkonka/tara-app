import { apiClient } from "./apiClient";
import type { ProgressData } from "../../types/progress";
import type { IProgressRepository } from "../repositories/IProgressRepository";

export class ApiProgressRepository implements IProgressRepository {
  async getProgress(): Promise<ProgressData> {
    return await apiClient.get<ProgressData>("/progress");
  }
}