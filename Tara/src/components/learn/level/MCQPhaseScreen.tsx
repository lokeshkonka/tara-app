import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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

// ─────────────────────────────────────────────
// MEMOIZED OPTION CARD
// ─────────────────────────────────────────────

interface OptionCardProps {
  option: MCQOption;
  index: number;
  isSelected: boolean;
  isEvaluated: boolean;
  onSelect: (option: MCQOption) => void;
}

const OptionCard = memo(function OptionCard({
  option,
  index,
  isSelected,
  isEvaluated,
  onSelect,
}: OptionCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const letter = getLetterForIndex(index);
  const isCorrect = option.isCorrect;

  useEffect(() => {
    if (isEvaluated && isSelected && !isCorrect) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 7, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -7, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]).start();
    }
  }, [isEvaluated, isSelected, isCorrect, shakeAnim]);

  const handlePressIn = () => {
    if (isEvaluated) return;
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    onSelect(option);
  };

  const isOptionEvaluatedCorrect = isEvaluated && isSelected && isCorrect;
  const isOptionEvaluatedWrong = isEvaluated && isSelected && !isCorrect;

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }, { translateX: shakeAnim }],
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={isEvaluated}
        style={[
          styles.optionItem,
          isSelected && !isEvaluated && styles.optionSelected,
          isOptionEvaluatedCorrect && styles.optionCorrect,
          isOptionEvaluatedWrong && styles.optionIncorrect,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Option ${letter}: ${option.text}`}
      >
        {/* Letter Badge */}
        <View
          style={[
            styles.letterBadge,
            isSelected && !isEvaluated && styles.letterBadgeSelected,
            isOptionEvaluatedCorrect && styles.letterBadgeCorrect,
            isOptionEvaluatedWrong && styles.letterBadgeIncorrect,
          ]}
        >
          <Text
            style={[
              styles.letterBadgeText,
              (isSelected || isOptionEvaluatedCorrect || isOptionEvaluatedWrong) &&
                styles.letterBadgeTextWhite,
            ]}
          >
            {letter}
          </Text>
        </View>

        {/* Option Text */}
        <Text
          style={[
            styles.optionText,
            isSelected && !isEvaluated && styles.optionTextSelected,
            isOptionEvaluatedCorrect && styles.optionTextCorrect,
            isOptionEvaluatedWrong && styles.optionTextIncorrect,
          ]}
        >
          {option.text}
        </Text>

        {/* Status Indicator */}
        {isEvaluated && isSelected && (
          <View style={styles.indicatorWrap}>
            <MaterialIcons
              name={isCorrect ? "check-circle" : "cancel"}
              size={22}
              color={isCorrect ? "#16A34A" : colors.error}
            />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
});

// ─────────────────────────────────────────────
// MCQ PHASE SCREEN COMPONENT
// ─────────────────────────────────────────────

interface MCQPhaseScreenProps {
  phase: MCQPhase;
  onCompletePhase: (score?: { total: number; correctFirstTry: number }) => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

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

  // Lazily initialize shuffled options
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<string, MCQOption[]>>(() => {
    const map: Record<string, MCQOption[]> = {};
    phase.questions.forEach((q) => {
      map[q.id] = shuffleArray(q.options);
    });
    return map;
  });

  const questionFadeAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion: MCQQuestion = phase.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentOptions = shuffledOptionsMap[currentQuestion?.id] ?? currentQuestion?.options ?? [];

  const animateToQuestion = useCallback(
    (nextIndex: number) => {
      questionFadeAnim.setValue(0.2);
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setIsEvaluated(false);

      Animated.timing(questionFadeAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [questionFadeAnim]
  );

  const handleSelectOption = useCallback((option: MCQOption) => {
    setSelectedOption(option);
  }, []);

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    const correct = selectedOption.isCorrect;
    setIsEvaluated(true);

    setScore((prev) => ({
      total: prev.total + 1,
      correctFirstTry: prev.correctFirstTry + (correct ? 1 : 0),
    }));

    if (Platform.OS !== "web") {
      try {
        if (correct) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
      } catch {}
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setIsEvaluated(false);
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      onCompletePhase(score);
    } else {
      animateToQuestion(currentQuestionIndex + 1);
    }
  };

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
    : currentQuestion?.question || "Read the question carefully and select the best answer below.";

  const taraTitle = isEvaluated
    ? isCorrect
      ? "Spot On!"
      : "Let's Review"
    : `Question ${currentQuestionIndex + 1}`;

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
        {/* Progress Header */}
        {showProgressHeader && (
          <View style={styles.progressHeader}>
            <View style={styles.progressPill}>
              <MaterialIcons name="quiz" size={14} color={colors.primary} />
              <Text style={styles.progressPillText}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Text>
            </View>
            <View style={styles.xpPill}>
              <MaterialIcons name="stars" size={14} color="#D97706" />
              <Text style={styles.xpPillText}>+{questionXp} XP</Text>
            </View>
          </View>
        )}

        {/* Dot Progress Indicator */}
        {showProgressHeader && (
          <View style={styles.dotRow}>
            {phase.questions.map((_, idx) => (
              <View
                key={`dot-${idx}`}
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

        {/* Question Prompt */}
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
      </ScrollView>

      {/* Pinned Bottom CTA Action Bar */}
      <View style={styles.fixedBottomContainer}>
        {!isEvaluated ? (
          <TactileButton
            title="Check Answer"
            icon="check"
            iconPosition="right"
            faceColor={selectedOption ? colors.primaryContainer : "#E2E8F0"}
            depthColor={selectedOption ? colors.onPrimaryFixedVariant : "#CBD5E1"}
            textColor={selectedOption ? "#FFFFFF" : "#94A3B8"}
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={handleCheckAnswer}
            disabled={!selectedOption}
          />
        ) : isCorrect ? (
          <TactileButton
            title={isLastQuestion ? "Complete Questions" : "Next Question"}
            icon="arrow-forward"
            iconPosition="right"
            faceColor="#16A34A"
            depthColor="#15803D"
            textColor="#FFFFFF"
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={handleContinue}
          />
        ) : (
          <TactileButton
            title="Try Again"
            icon="replay"
            iconPosition="left"
            faceColor="#EA580C"
            depthColor="#C2410C"
            textColor="#FFFFFF"
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={handleTryAgain}
          />
        )}
      </View>
    </View>
  );
};

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
    paddingBottom: 110,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  progressPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: "#15803D",
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  xpPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: "#B45309",
  },
  dotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.stackSm,
  },
  dot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
  },
  dotActive: {
    backgroundColor: colors.primaryContainer,
  },
  dotCompleted: {
    backgroundColor: colors.primary,
  },
  taraWrapper: {
    marginBottom: spacing.stackSm,
  },
  questionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.stackMd,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    marginBottom: spacing.stackMd,
  },
  questionText: {
    ...typography.headlineMd,
    fontSize: 16.5,
    fontWeight: "800",
    color: colors.onSurface,
    lineHeight: 23,
  },
  optionsList: {
    gap: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 60,
    gap: 12,
  },
  optionSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  optionCorrect: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  optionIncorrect: {
    backgroundColor: "#FEF2F2",
    borderColor: colors.error,
    borderBottomColor: "#991B1B",
  },
  letterBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  letterBadgeSelected: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  letterBadgeCorrect: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  letterBadgeIncorrect: {
    backgroundColor: colors.error,
    borderColor: "#991B1B",
  },
  letterBadgeText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#475569",
  },
  letterBadgeTextWhite: {
    color: "#FFFFFF",
  },
  optionText: {
    ...typography.bodyMd,
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
    lineHeight: 20,
    flex: 1,
  },
  optionTextSelected: {
    color: "#166534",
    fontWeight: "700",
  },
  optionTextCorrect: {
    color: "#166534",
    fontWeight: "700",
  },
  optionTextIncorrect: {
    color: "#991B1B",
    fontWeight: "700",
  },
  indicatorWrap: {
    marginLeft: "auto",
  },
  fixedBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
});
