import type { TaraExpression } from "../components/Tara/Tara.types";

export type OnboardingStepId =
  | "splash"
  | "welcome"
  | "purpose"
  | "learn"
  | "practice"
  | "verify"
  | "community"
  | "rewards"
  | "ready"
  | "language_select"
  | "user_type_select"
  | "farm_setup";

export interface OnboardingSlide {
  id: OnboardingStepId;
  stepNumber: number; // 1 to 8 (for guided walkthrough)
  totalSteps: number;
  title: string;
  subtitle: string;
  expression: TaraExpression;
  audioKey?: string;
  badge?: string;
  xpReward?: number;
  interactiveCards?: {
    id: string;
    icon: string;
    label: string;
    bgColor?: string;
    iconColor?: string;
  }[];
}

export interface LanguageOption {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  script: string;
  isComingSoon?: boolean;
}

export interface UserTypeOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface CropOption {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export interface OnboardingState {
  currentStepIndex: number;
  currentStepId: OnboardingStepId;
  selectedLanguage: string;
  selectedUserType: string | null;
  selectedCrops: string[];
  farmSizeAcres: number | null;
  locationState: string;
  locationDistrict: string;
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
}
