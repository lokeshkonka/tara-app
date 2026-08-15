import { CROPS_DATA } from "../../data/dummy/cropsData";
import { LANGUAGES_DATA } from "../../data/dummy/languagesData";
import { ONBOARDING_SLIDES } from "../../data/dummy/onboardingData";
import { USER_TYPES_DATA } from "../../data/dummy/userTypesData";
import type {
  CropOption,
  LanguageOption,
  OnboardingSlide,
  OnboardingState,
  UserTypeOption,
} from "../../types/onboarding";
import type { IOnboardingRepository } from "../repositories/IOnboardingRepository";
import { StorageService } from "../storage/StorageService";

const STORAGE_KEY = "tara_onboarding_state_v1";

const DEFAULT_STATE: OnboardingState = {
  currentStepIndex: 0,
  currentStepId: "splash",
  selectedLanguage: "en",
  selectedUserType: null,
  selectedCrops: ["banana", "pepper"],
  farmSizeAcres: 2.5,
  locationState: "Kerala",
  locationDistrict: "Wayanad",
  isComplete: false,
  isLoading: false,
  error: null,
};

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyOnboardingRepository implements IOnboardingRepository {
  async getSlides(): Promise<OnboardingSlide[]> {
    await delay(50);
    return ONBOARDING_SLIDES;
  }

  async getLanguages(): Promise<LanguageOption[]> {
    await delay(50);
    return LANGUAGES_DATA;
  }

  async getUserTypes(): Promise<UserTypeOption[]> {
    await delay(50);
    return USER_TYPES_DATA;
  }

  async getCrops(): Promise<CropOption[]> {
    await delay(50);
    return CROPS_DATA;
  }

  async getInitialState(): Promise<OnboardingState> {
    await delay(100);
    const saved = await StorageService.getItem<OnboardingState>(STORAGE_KEY);
    if (saved) {
      return saved;
    }
    return DEFAULT_STATE;
  }

  async saveLanguage(languageCode: string): Promise<void> {
    await delay(80);
    const state = (await StorageService.getItem<OnboardingState>(STORAGE_KEY)) || DEFAULT_STATE;
    const updated = { ...state, selectedLanguage: languageCode };
    await StorageService.setItem(STORAGE_KEY, updated);
  }

  async saveUserType(userTypeId: string): Promise<void> {
    await delay(80);
    const state = (await StorageService.getItem<OnboardingState>(STORAGE_KEY)) || DEFAULT_STATE;
    const updated = { ...state, selectedUserType: userTypeId };
    await StorageService.setItem(STORAGE_KEY, updated);
  }

  async saveFarmDetails(
    crops: string[],
    sizeAcres: number,
    stateName: string,
    district: string
  ): Promise<void> {
    await delay(100);
    const state = (await StorageService.getItem<OnboardingState>(STORAGE_KEY)) || DEFAULT_STATE;
    const updated: OnboardingState = {
      ...state,
      selectedCrops: crops,
      farmSizeAcres: sizeAcres,
      locationState: stateName,
      locationDistrict: district,
    };
    await StorageService.setItem(STORAGE_KEY, updated);
  }

  async saveStep(stepIndex: number): Promise<void> {
    const state = (await StorageService.getItem<OnboardingState>(STORAGE_KEY)) || DEFAULT_STATE;
    const updated: OnboardingState = {
      ...state,
      currentStepIndex: stepIndex,
    };
    await StorageService.setItem(STORAGE_KEY, updated);
  }

  async completeOnboarding(): Promise<OnboardingState> {
    await delay(150);
    const state = (await StorageService.getItem<OnboardingState>(STORAGE_KEY)) || DEFAULT_STATE;
    const updated: OnboardingState = {
      ...state,
      isComplete: true,
      isLoading: false,
      error: null,
    };
    await StorageService.setItem(STORAGE_KEY, updated);
    return updated;
  }

  async resetOnboarding(): Promise<OnboardingState> {
    await delay(50);
    await StorageService.removeItem(STORAGE_KEY);
    return DEFAULT_STATE;
  }
}
