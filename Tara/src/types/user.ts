export interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  language: string;
  userType: string;
  avatarExpression: string;
  xp: number;
  level: number;
  streakDays: number;
  badges: string[];
}

export interface FarmProfile {
  sizeAcres: number;
  crops: string[];
  state: string;
  district: string;
  soilHealthScore: number;
  activePractices: string[];
}

export interface UserPreferences {
  voiceGuidanceEnabled: boolean;
  dailyReminderTime: string;
  language: string;
}
