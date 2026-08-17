import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
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

export const DecisionChoiceActivity: React.FC<DecisionChoiceActivityProps> = ({
  title = "Good Choice / Bad Choice",
  instructions = "A farmer has a choice. Select the action that better protects the soil system.",
  rounds,
  onComplete,
}) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [currentFeedback, setCurrentFeedback] = useState<string | null>(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentRound = rounds[currentRoundIndex];
  const totalRounds = rounds.length;

  const handleSelectChoice = (choice: DecisionChoiceOption) => {
    if (isAnswerChecked) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setSelectedChoiceId(choice.id);
    setIsAnswerChecked(true);

    if (choice.isGoodChoice) {
      // Good Choice!
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}

      if (choice.taraReaction) {
        setCurrentFeedback(choice.taraReaction);
      }

      setTimeout(() => {
        if (currentRoundIndex < totalRounds - 1) {
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 250,
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
      }, 1000);
    } else {
      // Bad Choice
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch {}

      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        setSelectedChoiceId(null);
        setIsAnswerChecked(false);
      }, 1100);
    }
  };

  if (!currentRound) return null;

  return (
    <View style={styles.container}>
      {/* Activity Header */}
      <View style={styles.headerGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            Decision {currentRoundIndex + 1} of {totalRounds}
          </Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((currentRoundIndex + 1) / totalRounds) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <Animated.View style={[styles.roundContainer, { opacity: fadeAnim }]}>
        {/* Situation Card */}
        <View style={styles.situationCard}>
          <View style={styles.situationBadgeRow}>
            <View style={styles.situationChip}>
              <MaterialIcons name="psychology" size={14} color="#B45309" />
              <Text style={styles.situationChipText}>FARMER'S SITUATION</Text>
            </View>
          </View>
          <Text style={styles.situationHeading}>{currentRound.situation}</Text>
        </View>

        {/* Reaction Feedback if present */}
        {currentFeedback && (
          <View style={styles.feedbackBanner}>
            <MaterialIcons name="check-circle" size={18} color="#16A34A" />
            <Text style={styles.feedbackBannerText}>{currentFeedback}</Text>
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
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={isAnswerChecked}
                  onPress={() => handleSelectChoice(choice)}
                  style={[
                    styles.choiceCard,
                    isSelected && styles.choiceCardSelected,
                    isGood && styles.choiceCardGood,
                    isBad && styles.choiceCardBad,
                  ]}
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
                    ]}
                  >
                    {choice.text}
                  </Text>

                  {isGood && (
                    <View style={styles.statusBadge}>
                      <MaterialIcons name="check-circle" size={22} color="#16A34A" />
                    </View>
                  )}
                </TouchableOpacity>
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
    paddingVertical: spacing.stackSm,
  },
  headerGroup: {
    marginBottom: spacing.stackMd,
  },
  title: {
    ...typography.headlineMd,
    fontSize: 19,
    fontWeight: "800",
    color: colors.onSurface,
    marginBottom: 4,
  },
  instructions: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: colors.primary,
  },
  progressBarBg: {
    width: 120,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceContainer,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 3,
  },
  roundContainer: {
    width: "100%",
    gap: spacing.stackSm,
  },
  situationCard: {
    backgroundColor: "#FFFBEB",
    padding: 14,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    borderBottomWidth: 3.5,
    borderBottomColor: "#F59E0B",
    marginBottom: 4,
  },
  situationBadgeRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  situationChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  situationChipText: {
    ...typography.labelSm,
    fontSize: 9.5,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.6,
  },
  situationHeading: {
    ...typography.headlineMd,
    fontSize: 16,
    fontWeight: "800",
    color: "#78350F",
    lineHeight: 22,
  },
  feedbackBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: rounded.md,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    marginBottom: 4,
  },
  feedbackBannerText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
    flex: 1,
  },
  choicesList: {
    gap: 10,
    marginTop: 4,
  },
  choiceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    padding: 14,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: 12,
  },
  choiceCardSelected: {
    borderColor: colors.primary,
    borderBottomColor: colors.onPrimaryFixedVariant,
  },
  choiceCardGood: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  choiceCardBad: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
    borderBottomColor: "#B91C1C",
  },
  choicePillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  choicePillBadgeGood: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  choicePillBadgeBad: {
    backgroundColor: "#EF4444",
    borderColor: "#B91C1C",
  },
  choicePillText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#475569",
  },
  choicePillTextActive: {
    color: "#FFFFFF",
  },
  choiceText: {
    ...typography.bodyMd,
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
    flex: 1,
    lineHeight: 19,
  },
  choiceTextGood: {
    color: "#14532D",
  },
  statusBadge: {
    marginLeft: 4,
  },
});
