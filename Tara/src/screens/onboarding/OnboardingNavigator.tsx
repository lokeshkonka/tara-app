import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";
import { SplashScreen } from "./SplashScreen";
import { WelcomeScreen } from "./WelcomeScreen";
import { PurposeScreen } from "./PurposeScreen";
import { LearnScreen } from "./LearnScreen";
import { PracticeScreen } from "./PracticeScreen";
import { VerifyScreen } from "./VerifyScreen";
import { CommunityScreen } from "./CommunityScreen";
import { RewardsScreen } from "./RewardsScreen";
import { ReadyScreen } from "./ReadyScreen";
import { LanguageScreen } from "./LanguageScreen";
import { UserTypeScreen } from "./UserTypeScreen";
import { FarmSetupScreen } from "./FarmSetupScreen";

export function OnboardingNavigator() {
  const router = useRouter();
  const {
    state,
    nextStep,
    prevStep,
    completeOnboarding,
    skipOnboarding,
    isLoading,
  } = useOnboarding();

  // local flow state for the 8 slides + 3 interactive setup screens
  // 0: Splash, 1: Welcome, 2: Purpose, 3: Learn, 4: Practice, 5: Verify, 6: Community, 7: Rewards, 8: Ready
  // 9: LanguageSetup, 10: UserTypeSetup, 11: FarmSetup
  const [internalStep, setInternalStep] = useState<number>(
    state.currentStepIndex || 0
  );

  const handleFinishAll = async () => {
    await completeOnboarding();
    router.replace("/starting" as any);
  };

  const handleSkip = async () => {
    await skipOnboarding();
    router.replace("/starting" as any);
  };

  const handleNext = async () => {
    const next = internalStep + 1;
    setInternalStep(next);
    if (next <= 8) {
      await nextStep();
    }
  };

  const handleBack = async () => {
    const prev = Math.max(0, internalStep - 1);
    setInternalStep(prev);
    if (prev <= 8) {
      await prevStep();
    }
  };

  return (
    <View style={styles.container}>
      {internalStep === 0 && (
        <SplashScreen onStart={() => setInternalStep(1)} />
      )}

      {internalStep === 1 && (
        <WelcomeScreen onNext={handleNext} onSkip={handleSkip} />
      )}

      {internalStep === 2 && (
        <PurposeScreen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}

      {internalStep === 3 && (
        <LearnScreen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}

      {internalStep === 4 && (
        <PracticeScreen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}

      {internalStep === 5 && (
        <VerifyScreen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}

      {internalStep === 6 && (
        <CommunityScreen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}

      {internalStep === 7 && (
        <RewardsScreen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}

      {internalStep === 8 && (
        <ReadyScreen
          onComplete={() => setInternalStep(9)}
          onBack={handleBack}
          isLoading={isLoading}
        />
      )}

      {internalStep === 9 && (
        <LanguageScreen
          onContinue={() => setInternalStep(10)}
          onBack={handleBack}
        />
      )}

      {internalStep === 10 && (
        <UserTypeScreen
          onContinue={() => setInternalStep(11)}
          onBack={handleBack}
        />
      )}

      {internalStep === 11 && (
        <FarmSetupScreen
          onComplete={handleFinishAll}
          onBack={handleBack}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
