import React, {
  createContext,
  useCallback,
  useContext,
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

  const updateNotifications = useCallback(
    (partial: Partial<NotificationSettings>) => {
      setNotifications((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const updateAccessibility = useCallback(
    (partial: Partial<AccessibilitySettings>) => {
      setAccessibility((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const updateSecurity = useCallback((partial: Partial<SecuritySettings>) => {
    setSecurity((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateAccountProfile = useCallback(
    (partial: Partial<AccountProfile>) => {
      setAccountProfile((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const logoutDevice = useCallback((deviceId: string) => {
    setSecurity((prev) => ({
      ...prev,
      activeDevices: prev.activeDevices.filter((d) => d.id !== deviceId),
    }));
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
