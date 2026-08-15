import type { FarmProfile, UserProfile } from "../../types/user";
import type { IUserRepository } from "../repositories/IUserRepository";
import { StorageService } from "../storage/StorageService";

const USER_KEY = "tara_user_profile_v1";
const FARM_KEY = "tara_farm_profile_v1";

const DEFAULT_USER: UserProfile = {
  id: "user_001",
  name: "Ravi Kumar",
  phone: "+91 98765 43210",
  language: "en",
  userType: "smallholder",
  avatarExpression: "happy",
  xp: 150,
  level: 1,
  streakDays: 1,
  badges: ["Natural Pioneer", "Soil Friend"],
};

const DEFAULT_FARM: FarmProfile = {
  sizeAcres: 2.5,
  crops: ["Banana", "Black Pepper"],
  state: "Kerala",
  district: "Wayanad",
  soilHealthScore: 82,
  activePractices: ["Jeevamrit Soil Drench", "Mulching"],
};

const delay = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyUserRepository implements IUserRepository {
  async getProfile(): Promise<UserProfile> {
    await delay(60);
    const saved = await StorageService.getItem<UserProfile>(USER_KEY);
    return saved || DEFAULT_USER;
  }

  async getFarmProfile(): Promise<FarmProfile> {
    await delay(60);
    const saved = await StorageService.getItem<FarmProfile>(FARM_KEY);
    return saved || DEFAULT_FARM;
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await delay(100);
    const current = await this.getProfile();
    const updated = { ...current, ...updates };
    await StorageService.setItem(USER_KEY, updated);
    return updated;
  }

  async updateFarmProfile(updates: Partial<FarmProfile>): Promise<FarmProfile> {
    await delay(100);
    const current = await this.getFarmProfile();
    const updated = { ...current, ...updates };
    await StorageService.setItem(FARM_KEY, updated);
    return updated;
  }

  async addXp(amount: number): Promise<number> {
    await delay(50);
    const profile = await this.getProfile();
    const newXp = profile.xp + amount;
    const newLevel = Math.floor(newXp / 200) + 1;
    await this.updateProfile({ xp: newXp, level: newLevel });
    return newXp;
  }
}
