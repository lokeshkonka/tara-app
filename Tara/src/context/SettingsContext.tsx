import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  DEFAULT_ACCOUNT_PROFILE,
  DEFAULT_NOTIFICATION_SETTINGS,
  DEFAULT_SECURITY_SETTINGS,
} from "../data/dummy/settingsData";
import type {
  AccessibilitySettings,
  AccountProfile,
  NotificationSettings,
  SecuritySettings,
} from "../types/settings";
import { notificationService } from "../services/notifications/NotificationService";
import { settingsRepository } from "../services";
import { useAuth } from "../auth/AuthProvider";

interface SettingsContextValue {
  notifications: NotificationSettings;
  accessibility: AccessibilitySettings;
  security: SecuritySettings;
  accountProfile: AccountProfile;
  updateNotifications: (partial: Partial<NotificationSettings>) => void;
  updateAccessibility: (partial: Partial<AccessibilitySettings>) => void;
  updateSecurity: (partial: Partial<SecuritySettings>) => void;
  updateAccountProfile: (partial: Partial<AccountProfile>) => void;
  logoutDevice: (deviceId: string) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationSettings>(
    DEFAULT_NOTIFICATION_SETTINGS
  );
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(
    DEFAULT_ACCESSIBILITY_SETTINGS
  );
  const [security, setSecurity] =
    useState<SecuritySettings>(DEFAULT_SECURITY_SETTINGS);
  const [accountProfile, setAccountProfile] = useState<AccountProfile>(
    DEFAULT_ACCOUNT_PROFILE
  );

  // Hydrate all settings from the backend once signed in. On any failure we
  // keep the dummy defaults so the screens never break.
  useEffect(() => {
    if (!authUser) return;
    let cancelled = false;

    (async () => {
      try {
        const [n, a, s, p] = await Promise.all([
          settingsRepository.getNotificationSettings(),
          settingsRepository.getAccessibilitySettings(),
          settingsRepository.getSecuritySettings(),
          settingsRepository.getAccountProfile(),
        ]);
        if (cancelled) return;
        setNotifications(n);
        setAccessibility(a);
        setSecurity(s);
        setAccountProfile(p);
      } catch (e) {
        console.warn("Failed to load settings from backend", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authUser]);

  const updateNotifications = useCallback(
    (partial: Partial<NotificationSettings>) => {
      setNotifications((prev) => {
        const next = { ...prev, ...partial };
        // Persist to backend (best-effort; local state already updated).
        settingsRepository
          .updateNotificationSettings(partial)
          .then(setNotifications)
          .catch((e) => console.warn("Failed to persist notifications", e));

        if (next.dailyReminders) {
          notificationService.scheduleDailyReminder(next.dailyReminderTime).catch(() => {});
        } else {
          notificationService.cancelAllReminders().catch(() => {});
        }
        return next;
      });
    },
    []
  );

  const updateAccessibility = useCallback(
    (partial: Partial<AccessibilitySettings>) => {
      setAccessibility((prev) => ({ ...prev, ...partial }));
      settingsRepository
        .updateAccessibilitySettings(partial)
        .then(setAccessibility)
        .catch((e) => console.warn("Failed to persist accessibility", e));
    },
    []
  );

  const updateSecurity = useCallback((partial: Partial<SecuritySettings>) => {
    setSecurity((prev) => ({ ...prev, ...partial }));
    // activeDevices is server-computed; never send it back up.
    const { activeDevices, ...persistable } = partial;
    settingsRepository
      .updateSecuritySettings(persistable)
      .then(setSecurity)
      .catch((e) => console.warn("Failed to persist security settings", e));
  }, []);

  const updateAccountProfile = useCallback(
    (partial: Partial<AccountProfile>) => {
      setAccountProfile((prev) => ({ ...prev, ...partial }));
      settingsRepository
        .updateAccountProfile(partial)
        .then(setAccountProfile)
        .catch((e) => console.warn("Failed to persist account profile", e));
    },
    []
  );

  const logoutDevice = useCallback((deviceId: string) => {
    setSecurity((prev) => ({
      ...prev,
      activeDevices: prev.activeDevices.filter((d) => d.id !== deviceId),
    }));
    settingsRepository
      .logoutDevice(deviceId)
      .catch((e) => console.warn("Failed to remove device", e));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        notifications,
        accessibility,
        security,
        accountProfile,
        updateNotifications,
        updateAccessibility,
        updateSecurity,
        updateAccountProfile,
        logoutDevice,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}