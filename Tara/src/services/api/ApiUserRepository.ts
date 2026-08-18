import { apiClient } from "./apiClient";
import type { FarmProfile, UserProfile } from "../../types/user";
import type { IUserRepository } from "../repositories/IUserRepository";

// API-backed implementation of IUserRepository.
// Endpoints match the backend /api/v1/user/* service (Phase 1).
// GET /user/profile returns a superset (UserProfile + AccountProfile) so the
// extra fields are simply ignored when typed as UserProfile.
export class ApiUserRepository implements IUserRepository {
  async getProfile(): Promise<UserProfile> {
    return await apiClient.get<UserProfile>("/user/profile");
  }

  async getFarmProfile(): Promise<FarmProfile> {
    return await apiClient.get<FarmProfile>("/user/farm-profile");
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    return await apiClient.put<UserProfile>("/user/profile", updates);
  }

  async updateFarmProfile(updates: Partial<FarmProfile>): Promise<FarmProfile> {
    return await apiClient.put<FarmProfile>("/user/farm-profile", updates);
  }

  async addXp(amount: number): Promise<number> {
    return await apiClient.post<number>("/user/xp", { amount });
  }
}