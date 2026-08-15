import type { FarmProfile, UserProfile } from "../../types/user";

export interface IUserRepository {
  getProfile(): Promise<UserProfile>;
  getFarmProfile(): Promise<FarmProfile>;
  updateProfile(updates: Partial<UserProfile>): Promise<UserProfile>;
  updateFarmProfile(updates: Partial<FarmProfile>): Promise<FarmProfile>;
  addXp(amount: number): Promise<number>;
}
