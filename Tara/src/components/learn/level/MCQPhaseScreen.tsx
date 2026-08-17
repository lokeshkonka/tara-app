import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { TaraMessageCard } from "../../tara-messages/TaraMessageCard";
import { TactileButton } from "../../ui/TactileButton";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { MCQOption, MCQPhase, MCQQuestion } from "../../../types/learn";

// ─── Helpers ────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getLetterForIndex(index: number): string {
  return String.fromCharCode(65 + index);
}

// ─── Props ──────────────────────────────────────────────────────────────────

interface MCQPhaseScreenProps {
  phase: MCQPhase;
  onCompletePhase: (score?: { total: number; correctFirstTry: number }) => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

// ─── OptionCard ─────────────────────────────────────────────────────────────

interface OptionCardProps {
  option: MCQOption;
  index: number;
  isSelected: boolean;
  isEvaluated: boolean;
  onSelect: (option: MCQOption) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  option,
  index,
  isSelected,
  isEvaluated,
  onSelect,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const letter = getLetterForIndex(index);
  const isCorrect = option.isCorrect;

  useEffect(() => {
    if (isEvaluated && isSelected && !isCorrect) {
      // Gentle horizontal shake animation for incorrect selection
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }, [isEvaluated, isSelected, isCorrect, shakeAnim]);

  const handlePressIn = () => {
    if (isEvaluated) return;
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    if (isEvaluated) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const handlePress = () => {
    if (isEvaluated) return;
    try {
      Haptics.selectionAsync();
    } catch {}
    onSelect(option);
  };

  const containerStyle = [
    styles.optionItem,
    isSelected && !isEvaluated && styles.optionSelected,
    isEvaluated && isSelected && isCorrect && styles.optionCorrect,
    isEvaluated && isSelected && !isCorrect && styles.optionIncorrect,
  ];

  const badgeStyle = [
    styles.letterBadge,
    isSelected && !isEvaluated && styles.letterBadgeSelected,
    isEvaluated && isSelected && isCorrect && styles.letterBadgeCorrect,
    isEvaluated && isSelected && !isCorrect && styles.letterBadgeIncorrect,
  ];

  const badgeTextStyle = [
    styles.letterBadgeText,
    isSelected && !isEvaluated && styles.letterBadgeTextWhite,
    isEvaluated && isSelected && styles.letterBadgeTextWhite,
  ];

  const textStyle = [
    styles.optionText,
    isSelected && !isEvaluated && styles.optionTextSelected,
    isEvaluated && isSelected && isCorrect && styles.optionTextCorrect,
    isEvaluated && isSelected && !isCorrect && styles.optionTextIncorrect,
  ];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }, { translateX: shakeAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={containerStyle}
        accessibilityRole="button"
        accessibilityLabel={`Option ${letter}: ${option.text}`}
        accessibilityState={{ selected: isSelected }}
      >
        <View style={badgeStyle}>
          <Text style={badgeTextStyle}>{letter}</Text>
        </View>

        <Text style={textStyle}>{option.text}</Text>

        <View style={styles.indicatorContainer}>
          {isEvaluated && isSelected ? (
            <MaterialIcons
              name={isCorrect ? "check-circle" : "cancel"}
              size={22}
              color={isCorrect ? colors.primary : colors.error}
            />
          ) : isSelected ? (
            <View style={styles.radioSelectedOuter}>
              <View style={styles.radioSelectedInner} />
            </View>
          ) : (
            <View style={styles.radioUnselected} />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── MCQPhaseScreen ─────────────────────────────────────────────────────────

export const MCQPhaseScreen: React.FC<MCQPhaseScreenProps> = ({
  phase,
  onCompletePhase,
  onScroll,
}) => {
  const totalQuestions = phase.questions.length;
  const showProgressHeader = totalQuestions > 1;

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<MCQOption | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [score, setScore] = useState({ total: 0, correctFirstTry: 0 });

  // Lazily initialize shuffled options map to prevent visual flash on mount
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<string, MCQOption[]>>(() => {
    const map: Record<string, MCQOption[]> = {};
    phase.questions.forEach((q) => {
      map[q.id] = shuffleArray(q.options);
    });
    return map;
  });

  const feedbackFadeAnim = useRef(new Animated.Value(0)).current;
  const feedbackTranslateY = useRef(new Animated.Value(16)).current;
  const questionFadeAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion: MCQQuestion = phase.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const currentOptions = shuffledOptionsMap[currentQuestion?.id] ?? currentQuestion?.options ?? [];

  // Animate question transition
  const animateToQuestion = useCallback(
    (nextIndex: number) => {
      questionFadeAnim.setValue(0);
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setIsEvaluated(false);
      feedbackFadeAnim.setValue(0);
      feedbackTranslateY.setValue(16);

      Animated.timing(questionFadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [questionFadeAnim, feedbackFadeAnim, feedbackTranslateY]
  );

  const handleSelectOption = (option: MCQOption) => {
    if (isEvaluated) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    const correct = selectedOption.isCorrect;
    setIsEvaluated(true);

    // Update score
    setScore((prev) => ({
      total: prev.total + 1,
      correctFirstTry: prev.correctFirstTry + (correct ? 1 : 0),
    }));

    try {
      if (correct) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch {}

    // Animate feedback banner
    feedbackFadeAnim.setValue(0);
    feedbackTranslateY.setValue(16);
    Animated.parallel([
      Animated.timing(feedbackFadeAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(feedbackTranslateY, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-scroll down to ensure feedback card & explanation are immediately visible
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleTryAgain = () => {
    // Reshuffle options for this question
    setShuffledOptionsMap((prev) => ({
      ...prev,
      [currentQuestion.id]: shuffleArray(currentQuestion.options),
    }));
    setSelectedOption(null);
    setIsEvaluated(false);
    feedbackFadeAnim.setValue(0);
    feedbackTranslateY.setValue(16);
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      onCompletePhase(score);
    } else {
      animateToQuestion(currentQuestionIndex + 1);
    }
  };

  // Derive Tara state
  const isCorrect = selectedOption?.isCorrect ?? false;

  const taraExpression = isEvaluated
    ? isCorrect
      ? phase.taraExpressionCorrect || "excited"
      : phase.taraExpressionIncorrect || "thinking"
    : "thinking";

  const taraMessage = isEvaluated
    ? isCorrect
      ? currentQuestion?.explanation || selectedOption?.explanation || "Excellent understanding!"
      : selectedOption?.explanation || "That's not quite right. Think carefully and give it another try!"
    : "Read the question carefully and select the best answer below.";

  const taraTitle = isEvaluated
    ? isCorrect
      ? "Spot On!"
      : "Let's Try Again"
    : "Quick Assessment";

  const questionXp = currentQuestion?.xp ?? phase.totalXp ?? 20;

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* Question Progress Header - Only for multi-question */}
        {showProgressHeader && (
          <View style={styles.progressHeader}>
            <View style={styles.progressPill}>
              <MaterialIcons name="quiz" size={14} color={colors.primary} />
              <Text style={styles.progressPillText}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Text>
            </View>
            <View style={styles.xpPill}>
              <MaterialIcons name="stars" size={14} color={colors.tertiary} />
              <Text style={styles.xpPillText}>+{questionXp} XP</Text>
            </View>
          </View>
        )}

        {/* Dot Progress Indicator - Only for multi-question */}
        {showProgressHeader && (
          <View style={styles.dotRow}>
            {phase.questions.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === currentQuestionIndex && styles.dotActive,
                  idx < currentQuestionIndex && styles.dotCompleted,
                ]}
              />
            ))}
          </View>
        )}

        {/* Tara Mentor Guidance */}
        <Animated.View style={[styles.taraWrapper, { opacity: questionFadeAnim }]}>
          <TaraMessageCard
            title={taraTitle}
            expression={taraExpression}
            message={taraMessage}
            showVoiceControl={true}
          />
        </Animated.View>

        {/* Question Card */}
        <Animated.View style={[styles.questionCard, { opacity: questionFadeAnim }]}>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        </Animated.View>

        {/* Options List */}
        <View style={styles.optionsList}>
          {currentOptions.map((option, idx) => (
            <OptionCard
              key={`${currentQuestion?.id}-${option.id}`}
              option={option}
              index={idx}
              isSelected={selectedOption?.id === option.id}
              isEvaluated={isEvaluated}
              onSelect={handleSelectOption}
            />
          ))}
        </View>

        {/* Feedback Card */}
        {isEvaluated && (
          <Animated.View
            style={[
              styles.feedbackCard,
              isCorrect ? styles.feedbackCardCorrect : styles.feedbackCardIncorrect,
              {
                opacity: feedbackFadeAnim,
                transform: [{ translateY: feedbackTranslateY }],
              },
            ]}
          >
            <View style={styles.feedbackHeaderRow}>
              <View
                style={[
                  styles.feedbackIconBadge,
                  isCorrect ? styles.feedbackIconCorrect : styles.feedbackIconIncorrect,
                ]}
              >
                <MaterialIcons
                  name={isCorrect ? "check-circle" : "info"}
                  size={22}
                  color={isCorrect ? colors.primary : colors.error}
                />
              </View>
              <View style={styles.feedbackTitleStack}>
                <Text
                  style={[
                    styles.feedbackTitleText,
                    isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect,
                  ]}
                >
                  {isCorrect ? "Awesome Job!" : "Learning Moment"}
                </Text>
                <Text style={styles.feedbackSubtitleText}>
                  {isCorrect
                    ? `You've earned +${questionXp} XP for this correct answer!`
                    : "Review the explanation above and try again."}
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View style={styles.fixedBottomContainer}>
        {!isEvaluated ? (
          <TactileButton
            title="Check Answer"
            icon="check"
            iconPosition="right"
            faceColor={selectedOption ? colors.primaryContainer : colors.surfaceDim}
            depthColor={selectedOption ? colors.onPrimaryFixedVariant : componentColors.cardEdge}
            textColor={selectedOption ? colors.surfaceContainerLowest : colors.onSurfaceVariant}
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={handleCheckAnswer}
            disabled={!selectedOption}
          />
        ) : (
          <TactileButton
            title={isCorrect ? (isLastQuestion ? "Complete Quiz" : "Continue") : "Try Again"}
            icon={isCorrect ? "arrow-forward" : "refresh"}
            iconPosition="right"
            faceColor={isCorrect ? colors.primaryContainer : colors.tertiaryContainer}
            depthColor={isCorrect ? colors.onPrimaryFixedVariant : colors.onTertiaryFixedVariant}
            textColor={colors.surfaceContainerLowest}
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={isCorrect ? handleContinue : handleTryAgain}
          />
        )}
      </View>
    </View>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: 140,
  },

  // Progress Header
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.stackSm,
  },
  progressPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: componentColors.chipPositiveBackground,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomWidth: 2,
    borderBottomColor: componentColors.chipPositiveEdge,
  },
  progressPillText: {
    ...typography.labelLg,
    fontSize: 12,
    fontWeight: "700",
    color: componentColors.chipPositiveText,
    letterSpacing: 0.3,
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "rgba(205, 167, 33, 0.35)",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(205, 167, 33, 0.5)",
  },
  xpPillText: {
    ...typography.labelLg,
    fontSize: 12,
    fontWeight: "800",
    color: colors.tertiary,
    letterSpacing: 0.3,
  },

  // Dot Progress
  dotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: spacing.stackMd,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceContainerHigh,
  },
  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryContainer,
  },
  dotCompleted: {
    backgroundColor: colors.primary,
  },

  // Tara Wrapper
  taraWrapper: {
    marginBottom: spacing.stackMd,
  },

  // Question Card
  questionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.gutter,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    marginBottom: spacing.stackMd,
  },
  questionText: {
    ...typography.headlineMd,
    fontSize: 17,
    fontWeight: "700",
    color: colors.onSurface,
    lineHeight: 26,
  },

  // Options
  optionsList: {
    gap: 10,
  },
  optionItem: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.gutter,
    paddingVertical: 13,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionSelected: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomWidth: 3,
    borderBottomColor: colors.onPrimaryFixedVariant,
  },
  optionCorrect: {
    backgroundColor: componentColors.chipPositiveBackground,
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomWidth: 3,
    borderBottomColor: "#1B5E20",
  },
  optionCorrectHighlighted: {
    backgroundColor: "#F1F8E9",
    borderWidth: 2,
    borderColor: "#8BC34A",
    borderBottomWidth: 3,
    borderBottomColor: "#33691E",
  },
  optionIncorrect: {
    backgroundColor: colors.errorContainer,
    borderWidth: 2,
    borderColor: colors.error,
    borderBottomWidth: 3,
    borderBottomColor: colors.onErrorContainer,
  },

  // Letter Badges
  letterBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  letterBadgeSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  letterBadgeCorrect: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  letterBadgeIncorrect: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  letterBadgeText: {
    ...typography.labelLg,
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  letterBadgeTextWhite: {
    color: colors.surfaceContainerLowest,
  },

  // Option Typography
  optionText: {
    ...typography.bodyMd,
    fontSize: 14.5,
    fontWeight: "500",
    color: colors.onSurface,
    flex: 1,
    lineHeight: 21,
  },
  optionTextSelected: {
    fontWeight: "700",
    color: colors.primary,
  },
  optionTextCorrect: {
    fontWeight: "700",
    color: "#1B5E20",
  },
  optionTextIncorrect: {
    fontWeight: "700",
    color: colors.onErrorContainer,
  },

  // Radio Indicators
  indicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: componentColors.cardBorder,
  },
  radioSelectedOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelectedInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  // Feedback Card
  feedbackCard: {
    marginTop: spacing.stackMd,
    padding: spacing.gutter,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderBottomWidth: 3,
  },
  feedbackCardCorrect: {
    backgroundColor: componentColors.chipPositiveBackground,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomColor: componentColors.chipPositiveEdge,
  },
  feedbackCardIncorrect: {
    backgroundColor: colors.errorContainer,
    borderColor: "#EF9A9A",
    borderBottomColor: "#E57373",
  },
  feedbackHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  feedbackIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackIconCorrect: {
    backgroundColor: componentColors.chipPositiveBackground,
  },
  feedbackIconIncorrect: {
    backgroundColor: "#FFCDD2",
  },
  feedbackTitleStack: {
    flex: 1,
  },
  feedbackTitleText: {
    ...typography.labelLg,
    fontSize: 15,
    fontWeight: "800",
  },
  feedbackTitleCorrect: {
    color: "#1B5E20",
  },
  feedbackTitleIncorrect: {
    color: colors.onErrorContainer,
  },
  feedbackSubtitleText: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 18,
  },

  // Fixed Bottom CTA
  fixedBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackLg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
});
