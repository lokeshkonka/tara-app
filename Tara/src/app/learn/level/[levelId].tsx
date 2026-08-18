import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import {
  AIInterviewPhaseScreen,
  ConceptCardPhaseScreen,
  DecisionChoicePhaseScreen,
  FaceVerificationPhaseScreen,
  InteractiveLearnScreen,
  LevelExitModal,
  MatchPhaseScreen,
  MCQPhaseScreen,
  MemoryPhaseScreen,
  RewardPhaseScreen,
  ScenarioChallengePhaseScreen,
} from "../../../components/learn/level";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import { TactileButton } from "../../../components/ui/TactileButton";
import { useLearn } from "../../../context/LearnContext";
import { useUser } from "../../../context/UserContext";
import { useTranslation } from "../../../hooks/useTranslation";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { LevelDefinition } from "../../../types/learn";

export default function LevelExperienceScreen() {
  const router = useRouter();
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const { getLevelDefinition, completeLevelStep, completeLesson } = useLearn();
  const { addXp } = useUser();
  const { lang } = useTranslation();

  const [levelDef, setLevelDef] = useState<LevelDefinition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [conceptViewState, setConceptViewState] = useState<"overview" | "cards">("overview");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const totalSteps = levelDef && Array.isArray(levelDef.phases) ? levelDef.phases.length : 4;
  const activeStepNumber = currentPhaseIndex + 1;
  const progressRatio = totalSteps > 0 ? activeStepNumber / totalSteps : 0.25;

  // Step change pulse animation for step badge and action button
  const stepScaleAnim = useRef(new Animated.Value(1)).current;
  const prevStepRef = useRef<number>(activeStepNumber);

  // Hardware-accelerated smooth slide & cross-fade phase transition
  const phaseTransitionAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    phaseTransitionAnim.setValue(0);
    Animated.timing(phaseTransitionAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [currentPhaseIndex, phaseTransitionAnim]);

  useEffect(() => {
    if (prevStepRef.current !== activeStepNumber) {
      prevStepRef.current = activeStepNumber;
      stepScaleAnim.setValue(0.9);
      Animated.spring(stepScaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [activeStepNumber, stepScaleAnim]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 8 && !isScrolled) {
      setIsScrolled(true);
    } else if (offsetY <= 8 && isScrolled) {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadLevel() {
      if (!levelId) return;
      setIsLoading(true);
      setCurrentPhaseIndex(0);
      setConceptViewState("overview");
      const res = await getLevelDefinition(levelId, lang);
      if (isMounted) {
        setLevelDef(res);
        setIsLoading(false);
      }
    }
    loadLevel();
    return () => {
      isMounted = false;
    };
  }, [levelId, lang, getLevelDefinition]);

  const [xpToastText, setXpToastText] = useState<string | null>(null);
  const xpToastAnim = useRef(new Animated.Value(0)).current;
  const xpAnimSequenceRef = useRef<Animated.CompositeAnimation | null>(null);

  const triggerXpPopup = (xpAmount: number) => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}

    // Stop any in-flight animation before starting a new one
    if (xpAnimSequenceRef.current) {
      xpAnimSequenceRef.current.stop();
    }

    setXpToastText(`+${xpAmount} XP Earned!`);
    xpToastAnim.setValue(0);

    const anim = Animated.sequence([
      Animated.spring(xpToastAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.delay(1600),
      Animated.timing(xpToastAnim, {
        toValue: 2,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    xpAnimSequenceRef.current = anim;
    anim.start(({ finished }) => {
      if (finished) {
        setXpToastText(null);
        xpAnimSequenceRef.current = null;
      }
    });
  };

  const handleClose = () => {
    setShowExitModal(false);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/learn");
    }
  };

  const handleNextPhase = () => {
    if (!levelDef) return;
    triggerXpPopup(10);
    if (currentPhaseIndex < levelDef.phases.length - 1) {
      setCurrentPhaseIndex((prev) => prev + 1);
    }
  };

  const handleFinishLevel = async () => {
    if (!levelId || !levelDef) return;
    triggerXpPopup(levelDef.xpReward);
    await completeLevelStep(levelId, levelDef.xpReward);
    await completeLesson(levelId);
    await addXp(levelDef.xpReward);
    
    // Route to the lesson dashboard timeline
    const targetLessonId = levelDef.lessonId || "soil-level-1";
    setTimeout(() => {
      router.replace(`/learn/lessons/${targetLessonId}` as any);
    }, 800);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading level...</Text>
      </SafeAreaView>
    );
  }

  if (!levelDef || !Array.isArray(levelDef.phases) || levelDef.phases.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Level data not available</Text>
        <TactileButton
          title="Return to Lesson"
          faceColor={colors.primaryContainer}
          depthColor={colors.onPrimaryFixedVariant}
          textColor="#FFFFFF"
          height={48}
          depth={4}
          borderRadius={rounded.full}
          onPress={handleClose}
        />
      </SafeAreaView>
    );
  }

  const currentPhase =
    levelDef.phases[currentPhaseIndex] ?? levelDef.phases[0];

  if (!currentPhase) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  const toastTranslateY = xpToastAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-10, 8, -25],
  });
  const toastOpacity = xpToastAnim.interpolate({
    inputRange: [0, 0.2, 1, 1.6, 2],
    outputRange: [0, 1, 1, 0.9, 0],
  });
  const toastScale = xpToastAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0.75, 1, 0.92],
  });

  const phaseTranslateX = phaseTransitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });
  const phaseOpacity = phaseTransitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 1],
  });

  const handlePrevStep = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    if (activeStepNumber === 2) {
      setConceptViewState("overview");
    } else if (currentPhaseIndex > 0) {
      const prevIdx = currentPhaseIndex - 1;
      setCurrentPhaseIndex(prevIdx);
      if (prevIdx === 0) {
        setConceptViewState("cards");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right", "bottom"]}>
      {/* Top Header Bar Section (Fixed & Elegantly elevated on scroll) */}
      <View style={[styles.headerSection, isScrolled && styles.headerSectionScrolled]}>
        <View style={styles.headerTopRow}>
          {/* Left Action: Close (X) on Step 1; Back pill (<- Step X) on Step 2+ */}
          <Animated.View style={{ transform: [{ scale: stepScaleAnim }] }}>
            {activeStepNumber === 1 ? (
              <TouchableOpacity
                onPress={() => setShowExitModal(true)}
                style={styles.exitButton}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Close level"
              >
                <MaterialIcons name="close" size={22} color={colors.onSurface} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handlePrevStep}
                style={styles.backStepPill}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Back to Step ${activeStepNumber - 1}`}
              >
                <MaterialIcons name="arrow-back" size={16} color={colors.onSurface} />
                <Text style={styles.backStepText}>Step {activeStepNumber - 1}</Text>
              </TouchableOpacity>
            )}
          </Animated.View>

          {/* Center: Animated Progress Bar */}
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progressRatio}
              height={10}
              color={colors.primaryContainer}
              trackColor={colors.surfaceContainer}
              animated={true}
            />
          </View>

          {/* Right: Step Number Badge */}
          <Animated.View style={[styles.stepBadge, { transform: [{ scale: stepScaleAnim }] }]}>
            <Text style={styles.stepBadgeText}>
              Step {activeStepNumber} of {totalSteps}
            </Text>
          </Animated.View>
        </View>
      </View>

      {/* Floating XP Added Pop-up Bubble */}
      {xpToastText && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.xpToastBubble,
            {
              transform: [{ translateY: toastTranslateY }, { scale: toastScale }],
              opacity: toastOpacity,
            },
          ]}
        >
          <View style={styles.xpStarCircle}>
            <MaterialIcons name="star" size={15} color="#D97706" />
          </View>
          <Text style={styles.xpToastText}>{xpToastText}</Text>
        </Animated.View>
      )}

      {/* Dynamic Phase Engine Renderer with Hardware-Accelerated Smooth Transition */}
      <Animated.View
        style={[
          styles.phaseContent,
          {
            opacity: phaseOpacity,
            transform: [{ translateX: phaseTranslateX }],
          },
        ]}
      >
        {currentPhase?.type === "conceptCards" && (
          <ConceptCardPhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
            stepNumber={activeStepNumber}
            onViewStateChange={setConceptViewState}
            onStepComplete={triggerXpPopup}
          />
        )}
        {currentPhase?.type === "interactiveLearn" && (
          <InteractiveLearnScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "match" && (
          <MatchPhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "scenarioChallenge" && (
          <ScenarioChallengePhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "memory" && (
          <MemoryPhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "decisionChoice" && (
          <DecisionChoicePhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "mcq" && (
          <MCQPhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "faceVerification" && (
          <FaceVerificationPhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "aiInterview" && (
          <AIInterviewPhaseScreen
            phase={currentPhase}
            onCompletePhase={handleNextPhase}
            onScroll={handleScroll}
          />
        )}
        {currentPhase?.type === "reward" && (
          <RewardPhaseScreen
            phase={currentPhase}
            levelNumber={levelDef.levelNumber}
            levelTitle={`${levelDef.title} Complete!`}
            onFinishLevel={handleFinishLevel}
            onScroll={handleScroll}
          />
        )}
      </Animated.View>

      {/* Confirmation Exit Modal */}
      <LevelExitModal
        visible={showExitModal}
        onCancel={() => setShowExitModal(false)}
        onConfirmExit={handleClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    gap: spacing.stackMd,
  },
  loadingText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
  errorText: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  headerSection: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackSm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  headerSectionScrolled: {
    borderBottomColor: componentColors.cardBorder,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  exitButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: componentColors.iconButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: componentColors.iconButtonBorder,
  },
  backStepPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: componentColors.iconButtonBackground,
    borderWidth: 1.5,
    borderColor: componentColors.iconButtonBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: rounded.full,
  },
  backStepText: {
    ...typography.labelSm,
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
  },
  progressContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  stepBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: componentColors.chipPositiveBackground,
    borderWidth: 1.5,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.chipPositiveEdge,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
  },
  stepBadgeText: {
    ...typography.labelLg,
    fontSize: 13.5,
    fontWeight: "800",
    color: componentColors.chipPositiveText,
    letterSpacing: 0.3,
  },
  xpToastBubble: {
    position: "absolute",
    top: 56,
    alignSelf: "center",
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F59E0B",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: "#FCD34D",
    borderBottomWidth: 3.5,
    borderBottomColor: "#B45309",
    shadowColor: "#B45309",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  xpStarCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  xpToastText: {
    ...typography.labelLg,
    fontSize: 14.5,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  phaseContent: {
    flex: 1,
  },
});
