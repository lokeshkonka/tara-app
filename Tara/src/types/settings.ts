export type TextScaleMode = "standard" | "large" | "extraLarge";

export interface NotificationSettings {
  dailyReminders: boolean;
  dailyReminderTime: string; // e.g. "07:30 AM"
  newLessons: boolean;
  streakAlerts: boolean;
  communityReplies: boolean;
  weeklyTips: boolean;
  pushEnabled: boolean;
  smsAlerts: boolean;
  soundEnabled: boolean;
}

export interface AccessibilitySettings {
  textScale: TextScaleMode;
  highContrast: boolean;
  screenReaderOptimized: boolean;
  audioAutoPlay: boolean;
  voiceInputSensitivity: "normal" | "high";
  reducedMotion: boolean;
}

export interface LoggedInDevice {
  id: string;
  name: string;
  type: "mobile" | "desktop" | "tablet";
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface SecuritySettings {
  pinEnabled: boolean;
  pinCode?: string;
  biometricsEnabled: boolean;
  twoFactorEnabled: boolean;
  activeDevices: LoggedInDevice[];
  showNameOnLeaderboard: boolean;
  shareAnonymousImpact: boolean;
}

export interface AccountProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  farmLocation: string;
  villagePanchayat: string;
  farmSizeAcres: number;
  primaryCrops: string[];
  avatarUrl?: string;
  joinedDate: string;
}
