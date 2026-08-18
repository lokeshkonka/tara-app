import type {
  AccessibilitySettings,
  AccountProfile,
  NotificationSettings,
  SecuritySettings,
} from "../../types/settings";

export interface ISettingsRepository {
  getNotificationSettings(): Promise<NotificationSettings>;
  updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings>;
  getAccessibilitySettings(): Promise<AccessibilitySettings>;
  updateAccessibilitySettings(settings: Partial<AccessibilitySettings>): Promise<AccessibilitySettings>;
  getSecuritySettings(): Promise<SecuritySettings>;
  updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings>;
  getAccountProfile(): Promise<AccountProfile>;
  updateAccountProfile(profile: Partial<AccountProfile>): Promise<AccountProfile>;
  logoutDevice(deviceId: string): Promise<void>;
}
