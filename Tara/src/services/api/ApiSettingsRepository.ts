import { apiClient } from "./apiClient";
import type {
  AccessibilitySettings,
  AccountProfile,
  NotificationSettings,
  SecuritySettings,
} from "../../types/settings";
import type { ISettingsRepository } from "../repositories/ISettingsRepository";

export class ApiSettingsRepository implements ISettingsRepository {
  async getNotificationSettings(): Promise<NotificationSettings> {
    return await apiClient.get<NotificationSettings>("/settings/notifications");
  }

  async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    return await apiClient.put<NotificationSettings>("/settings/notifications", settings);
  }

  async getAccessibilitySettings(): Promise<AccessibilitySettings> {
    return await apiClient.get<AccessibilitySettings>("/settings/accessibility");
  }

  async updateAccessibilitySettings(settings: Partial<AccessibilitySettings>): Promise<AccessibilitySettings> {
    return await apiClient.put<AccessibilitySettings>("/settings/accessibility", settings);
  }

  async getSecuritySettings(): Promise<SecuritySettings> {
    return await apiClient.get<SecuritySettings>("/settings/security");
  }

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    return await apiClient.put<SecuritySettings>("/settings/security", settings);
  }

  async getAccountProfile(): Promise<AccountProfile> {
    return await apiClient.get<AccountProfile>("/user/profile");
  }

  async updateAccountProfile(profile: Partial<AccountProfile>): Promise<AccountProfile> {
    return await apiClient.put<AccountProfile>("/user/profile", profile);
  }

  async logoutDevice(deviceId: string): Promise<void> {
    await apiClient.delete(`/settings/devices/${deviceId}`);
  }
}
