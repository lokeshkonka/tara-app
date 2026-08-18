import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import type {
  DecisionChoiceOption,
  DecisionChoiceRound,
} from "../../../types/learn";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

export interface DecisionChoiceActivityProps {
  title?: string;
  instructions?: string;
  rounds: DecisionChoiceRound[];
  onComplete: () => void;
}

/**
 * DecisionChoiceActivity
 * - Clear instructive feedback on both Good and Bad choices
 * - Snappy non-blocking animations
 * - Multi-lingual responsive choice cards
 */
export const DecisionChoiceActivity: React.FC<DecisionChoiceActivityProps> = ({
  title = "Good Choice / Bad Choice",
  instructions = "A farmer has a choice. Select the action that better protects the soil system.",
  rounds,
  onComplete,
}) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [currentFeedback, setCurrentFeedback] = useState<{ text: string; isGood: boolean } | null>(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentRound = rounds[currentRoundIndex];
  const totalRounds = rounds.length;

  const handleSelectChoice = (choice: DecisionChoiceOption) => {
    if (isAnswerChecked) return;

    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }

    setSelectedChoiceId(choice.id);
    setIsAnswerChecked(true);

    const feedbackMessage =
      choice.taraReaction ||
      (choice.isGoodChoice
        ? "Excellent decision! This protects living soil structure and microbes."
        : "This action damages soil porosity and beneficial organisms. Try the other option!");

    setCurrentFeedback({
      text: feedbackMessage,
      isGood: choice.isGoodChoice,
    });

    if (choice.isGoodChoice) {
      if (Platform.OS !== "web") {
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch {}
      }

      setTimeout(() => {
        if (currentRoundIndex < totalRounds - 1) {
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 180,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 220,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start();

          setCurrentRoundIndex((prev) => prev + 1);
          setSelectedChoiceId(null);
          setIsAnswerChecked(false);
          setCurrentFeedback(null);
        } else {
          onComplete();
        }
      }, 950);
    } else {
      if (Platform.OS !== "web") {
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } catch {}
      }

      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: -8, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        setSelectedChoiceId(null);
        setIsAnswerChecked(false);
      }, 700);
    }
  };

  if (!currentRound) return null;

  return (
    <View style={styles.container}>
      {/* Activity Header */}
      <View style={styles.headerGroup}>
        <View style={styles.progressRow}>
          <View style={styles.decisionPill}>
            <MaterialIcons name="psychology" size={15} color="#16A34A" />
            <Text style={styles.decisionPillText}>
              Decision {currentRoundIndex + 1} of {totalRounds}
            </Text>
          </View>
          <Text style={styles.instructionsText}>{instructions}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((currentRoundIndex + 1) / Math.max(totalRounds, 1)) * 100}%` },
            ]}
          />
        </View>
      </View>

      <Animated.View style={[styles.roundContainer, { opacity: fadeAnim }]}>
        {/* Situation Card */}
        <View style={styles.situationCard}>
          <View style={styles.situationChip}>
            <MaterialIcons name="terrain" size={13} color="#B45309" />
            <Text style={styles.situationChipText}>FARM SCENARIO</Text>
          </View>
          <Text style={styles.situationHeading}>{currentRound.situation}</Text>
        </View>

        {/* Instructive Feedback Banner (For both Good & Bad choices) */}
        {currentFeedback && (
          <View
            style={[
              styles.feedbackBanner,
              currentFeedback.isGood
                ? styles.feedbackBannerGood
                : styles.feedbackBannerBad,
            ]}
          >
            <MaterialIcons
              name={currentFeedback.isGood ? "check-circle" : "info"}
              size={18}
              color={currentFeedback.isGood ? "#16A34A" : colors.error}
            />
            <Text
              style={[
                styles.feedbackBannerText,
                currentFeedback.isGood
                  ? styles.feedbackTextGood
                  : styles.feedbackTextBad,
              ]}
            >
              {currentFeedback.text}
            </Text>
          </View>
        )}

        {/* 2 Decision Choices */}
        <View style={styles.choicesList}>
          {currentRound.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const isGood = isSelected && choice.isGoodChoice;
            const isBad = isSelected && !choice.isGoodChoice;

            return (
              <Animated.View
                key={choice.id}
                style={{
                  transform: isBad ? [{ translateX: shakeAnim }] : [],
                }}
              >
                <Pressable
                  disabled={isAnswerChecked}
                  onPress={() => handleSelectChoice(choice)}
                  style={[
                    styles.choiceCard,
                    isSelected && styles.choiceCardSelected,
                    isGood && styles.choiceCardGood,
                    isBad && styles.choiceCardBad,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Option ${choice.label}: ${choice.text}`}
                >
                  <View
                    style={[
                      styles.choicePillBadge,
                      isGood && styles.choicePillBadgeGood,
                      isBad && styles.choicePillBadgeBad,
                    ]}
                  >
                    <Text
                      style={[
                        styles.choicePillText,
                        (isGood || isBad) && styles.choicePillTextActive,
                      ]}
                    >
                      {choice.label}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.choiceText,
                      isGood && styles.choiceTextGood,
                      isBad && styles.choiceTextBad,
                    ]}
                  >
                    {choice.text}
                  </Text>

                  {isGood && (
                    <View style={styles.statusBadge}>
                      <MaterialIcons name="check-circle" size={22} color="#16A34A" />
                    </View>
                  )}
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerGroup: {
    marginBottom: spacing.stackSm,
    gap: 6,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  decisionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  decisionPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: "#15803D",
  },
  instructionsText: {
    ...typography.bodyMd,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    flex: 1,
    textAlign: "right",
  },
  progressBarBg: {
    width: "100%",
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 3,
  },
  roundContainer: {
    gap: 12,
  },
  situationCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.stackMd,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: 6,
  },
  situationChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    alignSelf: "flex-start",
  },
  situationChipText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: "800",
    color: "#92400E",
    letterSpacing: 0.5,
  },
  situationHeading: {
    ...typography.headlineMd,
    fontSize: 15.5,
    fontWeight: "800",
    color: colors.onSurface,
    lineHeight: 22,
  },
  feedbackBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    padding: 10,
    borderRadius: rounded.md,
    borderWidth: 1,
  },
  feedbackBannerGood: {
    backgroundColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  feedbackBannerBad: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECDD3",
  },
  feedbackBannerText: {
    ...typography.bodyMd,
    fontSize: 12.5,
    lineHeight: 18,
    flex: 1,
  },
  feedbackTextGood: {
    color: "#15803D",
    fontWeight: "600",
  },
  feedbackTextBad: {
    color: "#BE123C",
    fontWeight: "600",
  },
  choicesList: {
    gap: 10,
  },
  choiceCard: {
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
    minHeight: 64,
    gap: 12,
  },
  choiceCardSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  choiceCardGood: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  choiceCardBad: {
    backgroundColor: "#FEF2F2",
    borderColor: colors.error,
    borderBottomColor: "#991B1B",
  },
  choicePillBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  choicePillBadgeGood: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  choicePillBadgeBad: {
    backgroundColor: colors.error,
    borderColor: "#991B1B",
  },
  choicePillText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#475569",
  },
  choicePillTextActive: {
    color: "#FFFFFF",
  },
  choiceText: {
    ...typography.bodyMd,
    fontSize: 13.5,
    fontWeight: "600",
    color: colors.onSurface,
    lineHeight: 19,
    flex: 1,
  },
  choiceTextGood: {
    color: "#166534",
    fontWeight: "700",
  },
  choiceTextBad: {
    color: "#991B1B",
    fontWeight: "700",
  },
  statusBadge: {
    marginLeft: "auto",
  },
});
