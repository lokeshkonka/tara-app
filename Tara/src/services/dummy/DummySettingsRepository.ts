import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  DEFAULT_ACCOUNT_PROFILE,
  DEFAULT_NOTIFICATION_SETTINGS,
  DEFAULT_SECURITY_SETTINGS,
} from "../../data/dummy/settingsData";
import type {
  AccessibilitySettings,
  AccountProfile,
  NotificationSettings,
  SecuritySettings,
} from "../../types/settings";
import type { ISettingsRepository } from "../repositories/ISettingsRepository";

export class DummySettingsRepository implements ISettingsRepository {
  private notifications = { ...DEFAULT_NOTIFICATION_SETTINGS };
  private accessibility = { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  private security = { ...DEFAULT_SECURITY_SETTINGS };
  private account = { ...DEFAULT_ACCOUNT_PROFILE };

  async getNotificationSettings(): Promise<NotificationSettings> {
    return this.notifications;
  }

  async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    this.notifications = { ...this.notifications, ...settings };
    return this.notifications;
  }

  async getAccessibilitySettings(): Promise<AccessibilitySettings> {
    return this.accessibility;
  }

  async updateAccessibilitySettings(settings: Partial<AccessibilitySettings>): Promise<AccessibilitySettings> {
    this.accessibility = { ...this.accessibility, ...settings };
    return this.accessibility;
  }

  async getSecuritySettings(): Promise<SecuritySettings> {
    return this.security;
  }

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    this.security = { ...this.security, ...settings };
    return this.security;
  }

  async getAccountProfile(): Promise<AccountProfile> {
    return this.account;
  }

  async updateAccountProfile(profile: Partial<AccountProfile>): Promise<AccountProfile> {
    this.account = { ...this.account, ...profile };
    return this.account;
  }

  async logoutDevice(deviceId: string): Promise<void> {
    this.security.activeDevices = this.security.activeDevices.filter((d) => d.id !== deviceId);
  }
}
