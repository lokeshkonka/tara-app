import type {
  AccessibilitySettings,
  AccountProfile,
  NotificationSettings,
  SecuritySettings,
} from "../../types/settings";

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  dailyReminders: true,
  dailyReminderTime: "07:00 AM",
  newLessons: true,
  streakAlerts: true,
  communityReplies: true,
  weeklyTips: true,
  pushEnabled: true,
  smsAlerts: false,
  soundEnabled: true,
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  textScale: "standard",
  highContrast: false,
  screenReaderOptimized: false,
  audioAutoPlay: true,
  voiceInputSensitivity: "normal",
  reducedMotion: false,
};

export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  pinEnabled: false,
  pinCode: "1234",
  biometricsEnabled: true,
  twoFactorEnabled: false,
  showNameOnLeaderboard: true,
  shareAnonymousImpact: true,
  activeDevices: [
    {
      id: "device-1",
      name: "iPhone 13 Pro",
      type: "mobile",
      location: "Mumbai, India",
      lastActive: "Active Now",
      isCurrent: true,
    },
    {
      id: "device-2",
      name: "Samsung Galaxy Tab",
      type: "tablet",
      location: "Thane, India",
      lastActive: "2 days ago",
      isCurrent: false,
    },
  ],
};

export const DEFAULT_ACCOUNT_PROFILE: AccountProfile = {
  id: "user-ravi-kumar",
  fullName: "Ravi Kumar",
  phone: "+91 98765 43210",
  email: "ravi.farmer@tara-app.org",
  farmLocation: "Kalyan Rural, Maharashtra",
  villagePanchayat: "Dombivli Panchayat",
  farmSizeAcres: 3.5,
  primaryCrops: ["Tomato", "Okra", "Paddy", "Marigold"],
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
  joinedDate: "Joined August 2025",
};
