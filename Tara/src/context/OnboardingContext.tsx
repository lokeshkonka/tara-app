import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onboardingRepository } from "../services";
import type {
  CropOption,
  LanguageOption,
  OnboardingSlide,
  OnboardingState,
  UserTypeOption,
} from "../types/onboarding";

interface OnboardingContextValue {
  slides: OnboardingSlide[];
  languages: LanguageOption[];
  userTypes: UserTypeOption[];
  crops: CropOption[];
  currentSlide: OnboardingSlide | null;
  state: OnboardingState;
  isLoading: boolean;
  error: string | null;
  nextStep: () => Promise<void>;
  prevStep: () => Promise<void>;
  goToStep: (index: number) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  selectLanguage: (langCode: string) => Promise<void>;
  selectUserType: (userTypeId: string) => Promise<void>;
  saveFarmDetails: (
    crops: string[],
    sizeAcres: number,
    state: string,
    district: string
  ) => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const DEFAULT_ONBOARDING_STATE: OnboardingState = {
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

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [slides, setSlides] = useState<OnboardingSlide[]>([]);
  const [languages, setLanguages] = useState<LanguageOption[]>([]);
  const [userTypes, setUserTypes] = useState<UserTypeOption[]>([]);
  const [crops, setCrops] = useState<CropOption[]>([]);
  const [state, setState] = useState<OnboardingState>(DEFAULT_ONBOARDING_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoading(true);
        const [loadedSlides, loadedLangs, loadedTypes, loadedCrops, loadedState] =
          await Promise.all([
            onboardingRepository.getSlides(),
            onboardingRepository.getLanguages(),
            onboardingRepository.getUserTypes(),
            onboardingRepository.getCrops(),
            onboardingRepository.getInitialState(),
          ]);
        if (isMounted) {
          setSlides(loadedSlides);
          setLanguages(loadedLangs);
          setUserTypes(loadedTypes);
          setCrops(loadedCrops);
          setState(loadedState);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load onboarding");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentSlide = slides[state.currentStepIndex] || null;

  const nextStep = useCallback(async () => {
    setState((prev) => {
      const nextIndex = Math.min(prev.currentStepIndex + 1, slides.length - 1);
      const nextSlide = slides[nextIndex];
      const updated: OnboardingState = {
        ...prev,
        currentStepIndex: nextIndex,
        currentStepId: nextSlide ? nextSlide.id : prev.currentStepId,
      };
      onboardingRepository.saveStep(nextIndex).catch(console.warn);
      return updated;
    });
  }, [slides]);

  const prevStep = useCallback(async () => {
    setState((prev) => {
      const prevIndex = Math.max(prev.currentStepIndex - 1, 0);
      const prevSlide = slides[prevIndex];
      const updated: OnboardingState = {
        ...prev,
        currentStepIndex: prevIndex,
        currentStepId: prevSlide ? prevSlide.id : prev.currentStepId,
      };
      onboardingRepository.saveStep(prevIndex).catch(console.warn);
      return updated;
    });
  }, [slides]);

  const goToStep = useCallback(
    async (index: number) => {
      if (index >= 0 && index < slides.length) {
        const targetSlide = slides[index];
        setState((prev) => ({
          ...prev,
          currentStepIndex: index,
          currentStepId: targetSlide ? targetSlide.id : prev.currentStepId,
        }));
        await onboardingRepository.saveStep(index);
      }
    },
    [slides]
  );

  const completeOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      const completed = await onboardingRepository.completeOnboarding();
      setState(completed);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to complete onboarding");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const skipOnboarding = useCallback(async () => {
    await completeOnboarding();
  }, [completeOnboarding]);

  const selectLanguage = useCallback(async (langCode: string) => {
    setState((prev) => ({ ...prev, selectedLanguage: langCode }));
    await onboardingRepository.saveLanguage(langCode);
  }, []);

  const selectUserType = useCallback(async (userTypeId: string) => {
    setState((prev) => ({ ...prev, selectedUserType: userTypeId }));
    await onboardingRepository.saveUserType(userTypeId);
  }, []);

  const saveFarmDetails = useCallback(
    async (
      selectedCrops: string[],
      sizeAcres: number,
      stateName: string,
      district: string
    ) => {
      setState((prev) => ({
        ...prev,
        selectedCrops,
        farmSizeAcres: sizeAcres,
        locationState: stateName,
        locationDistrict: district,
      }));
      await onboardingRepository.saveFarmDetails(
        selectedCrops,
        sizeAcres,
        stateName,
        district
      );
    },
    []
  );

  const resetOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      const fresh = await onboardingRepository.resetOnboarding();
      setState(fresh);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        slides,
        languages,
        userTypes,
        crops,
        currentSlide,
        state,
        isLoading,
        error,
        nextStep,
        prevStep,
        goToStep,
        skipOnboarding,
        completeOnboarding,
        selectLanguage,
        selectUserType,
        saveFarmDetails,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
