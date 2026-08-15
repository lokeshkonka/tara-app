import React, { useCallback, useMemo, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  FadeIn,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
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
  const [direction, setDirection] = useState<"next" | "back">("next");

  const handleFinishAll = useCallback(async () => {
    await completeOnboarding();
    router.replace("/starting" as any);
  }, [completeOnboarding, router]);

  const handleSkip = useCallback(async () => {
    await skipOnboarding();
    router.replace("/starting" as any);
  }, [skipOnboarding, router]);

  const handleNext = useCallback(async () => {
    setDirection("next");
    const next = internalStep + 1;
    setInternalStep(next);
    if (next <= 8) {
      await nextStep();
    }
  }, [internalStep, nextStep]);

  const handleBack = useCallback(async () => {
    setDirection("back");
    const prev = Math.max(0, internalStep - 1);
    setInternalStep(prev);
    if (prev <= 8) {
      await prevStep();
    }
  }, [internalStep, prevStep]);

  // Smooth horizontal swipe gesture responder
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return (
            internalStep >= 1 &&
            internalStep <= 9 &&
            Math.abs(gestureState.dx) > 18 &&
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.4
          );
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -45) {
            // Swiped left -> Next slide
            if (internalStep === 8) {
              setDirection("next");
              setInternalStep(9);
            } else if (internalStep < 10) {
              handleNext();
            }
          } else if (gestureState.dx > 45 && internalStep > 1) {
            // Swiped right -> Previous slide
            handleBack();
          }
        },
      }),
    [internalStep, handleNext, handleBack]
  );

  const renderCurrentScreen = () => {
    switch (internalStep) {
      case 0:
        return (
          <SplashScreen
            onStart={() => {
              setDirection("next");
              setInternalStep(1);
            }}
          />
        );
      case 1:
        return <WelcomeScreen onNext={handleNext} onSkip={handleSkip} />;
      case 2:
        return (
          <PurposeScreen
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );
      case 3:
        return (
          <LearnScreen
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );
      case 4:
        return (
          <PracticeScreen
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );
      case 5:
        return (
          <VerifyScreen
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );
      case 6:
        return (
          <CommunityScreen
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );
      case 7:
        return (
          <RewardsScreen
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );
      case 8:
        return (
          <ReadyScreen
            onComplete={() => {
              setDirection("next");
              setInternalStep(9);
            }}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      case 9:
        return (
          <UserTypeScreen
            onContinue={() => {
              setDirection("next");
              setInternalStep(10);
            }}
            onBack={handleBack}
          />
        );
      case 10:
        return (
          <FarmSetupScreen
            onComplete={handleFinishAll}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  const enteringTransition =
    internalStep === 0
      ? FadeIn.duration(300)
      : direction === "next"
      ? SlideInRight.duration(300).easing(Easing.out(Easing.cubic))
      : SlideInLeft.duration(300).easing(Easing.out(Easing.cubic));

  const exitingTransition =
    direction === "next"
      ? SlideOutLeft.duration(240).easing(Easing.in(Easing.cubic))
      : SlideOutRight.duration(240).easing(Easing.in(Easing.cubic));

  return (
    <View style={styles.container}>
      <Animated.View
        key={internalStep}
        entering={enteringTransition}
        exiting={exitingTransition}
        style={styles.screenWrapper}
        {...(internalStep >= 1 && internalStep <= 9
          ? panResponder.panHandlers
          : {})}
      >
        {renderCurrentScreen()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  screenWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
