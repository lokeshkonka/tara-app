import type {
  CropOption,
  LanguageOption,
  OnboardingSlide,
  OnboardingState,
  UserTypeOption,
} from "../../types/onboarding";

export interface IOnboardingRepository {
  getSlides(): Promise<OnboardingSlide[]>;
  getLanguages(): Promise<LanguageOption[]>;
  getUserTypes(): Promise<UserTypeOption[]>;
  getCrops(): Promise<CropOption[]>;
  getInitialState(): Promise<OnboardingState>;
  saveLanguage(languageCode: string): Promise<void>;
  saveUserType(userTypeId: string): Promise<void>;
  saveFarmDetails(crops: string[], sizeAcres: number, state: string, district: string): Promise<void>;
  saveStep(stepIndex: number): Promise<void>;
  completeOnboarding(): Promise<OnboardingState>;
  resetOnboarding(): Promise<OnboardingState>;
}
