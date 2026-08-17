import React, { useRef, useState } from "react";
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
import type {
  ScenarioChallengeOption,
  ScenarioChallengePhase,
} from "../../../types/learn";
import { TaraSideMessageCard } from "../../tara-messages/TaraSideMessageCard";
import { TactileButton } from "../../ui/TactileButton";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

interface ScenarioChallengePhaseScreenProps {
  phase: ScenarioChallengePhase;
  onCompletePhase: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const ScenarioChallengePhaseScreen: React.FC<ScenarioChallengePhaseScreenProps> = ({
  phase,
  onCompletePhase,
  onScroll,
}) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentRound = phase.rounds[currentRoundIndex];
  const totalRounds = phase.rounds.length;

  const handleSelectOption = (option: ScenarioChallengeOption) => {
    if (isAnswerChecked) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setSelectedOptionId(option.id);
    setIsAnswerChecked(true);

    if (option.isCorrect) {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}

      // Advance to next round or finish after brief celebration
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
          setSelectedOptionId(null);
          setIsAnswerChecked(false);
        } else {
          setIsAllCompleted(true);
        }
      }, 900);
    } else {
      // Incorrect answer shake feedback
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
        setSelectedOptionId(null);
        setIsAnswerChecked(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* Tara Intro / Encouragement Header */}
        <View style={styles.taraSection}>
          <TaraSideMessageCard
            title={phase.title || "Healthy Soil Challenge"}
            expression={isAllCompleted ? "excited" : isAnswerChecked ? "happy" : "thinking"}
            message={
              isAllCompleted
                ? phase.taraSuccessDialogue ||
                  "Great! Healthy soil isn't about one perfect feature. We look at different clues and how they work together."
                : currentRound
                ? `Round ${currentRoundIndex + 1} of ${totalRounds} • ${currentRound.topic}: Compare the soils and choose the healthier situation!`
                : phase.taraDialogue || "Compare the situations and choose the better soil!"
            }
            autoPlay={true}
            showVoiceControl={true}
          />
        </View>

        {!isAllCompleted && currentRound && (
          <Animated.View style={[styles.roundContainer, { opacity: fadeAnim }]}>
            {/* Round Badge & Question Prompt */}
            <View style={styles.questionHeader}>
              <View style={styles.topicPill}>
                <MaterialIcons name="science" size={14} color="#15803D" />
                <Text style={styles.topicPillText}>
                  ROUND {currentRound.roundNumber} OF {totalRounds} • {currentRound.topic.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.promptHeading}>{currentRound.prompt}</Text>
            </View>

            {/* Comparison Option Cards */}
            <View style={styles.optionsList}>
              {currentRound.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrectChoice = isSelected && option.isCorrect;
                const isWrongChoice = isSelected && !option.isCorrect;

                return (
                  <Animated.View
                    key={option.id}
                    style={{
                      transform: isWrongChoice ? [{ translateX: shakeAnim }] : [],
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      disabled={isAnswerChecked}
                      onPress={() => handleSelectOption(option)}
                      style={[
                        styles.optionCard,
                        isSelected && styles.optionCardSelected,
                        isCorrectChoice && styles.optionCardCorrect,
                        isWrongChoice && styles.optionCardWrong,
                      ]}
                    >
                      <View
                        style={[
                          styles.labelBadge,
                          isSelected && styles.labelBadgeSelected,
                          isCorrectChoice && styles.labelBadgeCorrect,
                          isWrongChoice && styles.labelBadgeWrong,
                        ]}
                      >
                        <Text
                          style={[
                            styles.labelText,
                            (isSelected || isCorrectChoice) && styles.labelTextActive,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </View>

                      <View style={styles.optionContent}>
                        <Text
                          style={[
                            styles.optionTitle,
                            isCorrectChoice && styles.optionTitleCorrect,
                          ]}
                        >
                          {option.title}
                        </Text>
                        {option.subtitle ? (
                          <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                        ) : null}
                      </View>

                      {isCorrectChoice && (
                        <View style={styles.statusCheckBadge}>
                          <MaterialIcons name="check-circle" size={24} color="#16A34A" />
                        </View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
        )}

        {/* Completion Milestone Banner & CTA */}
        {isAllCompleted && (
          <View style={styles.completionFooter}>
            <View style={styles.successPill}>
              <MaterialIcons name="stars" size={22} color="#D97706" />
              <Text style={styles.successPillText}>+30 XP EARNED • ALL 4 ROUNDS COMPLETED</Text>
            </View>

            <TactileButton
              title="Continue to Questions"
              icon="arrow-forward"
              iconPosition="right"
              faceColor="#16A34A"
              depthColor="#15803D"
              textColor="#FFFFFF"
              height={56}
              depth={4}
              borderRadius={rounded.full}
              onPress={onCompletePhase}
            />
          </View>
        )}
      </ScrollView>
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
    paddingBottom: spacing.xl,
  },
  taraSection: {
    marginBottom: spacing.stackMd,
  },
  roundContainer: {
    width: "100%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.stackMd,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: spacing.stackLg,
  },
  questionHeader: {
    marginBottom: spacing.stackMd,
    gap: 8,
  },
  topicPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  topicPillText: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "800",
    color: "#15803D",
    letterSpacing: 0.6,
  },
  promptHeading: {
    ...typography.headlineMd,
    fontSize: 17,
    fontWeight: "800",
    color: colors.onSurface,
    lineHeight: 23,
  },
  optionsList: {
    gap: spacing.stackSm,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: spacing.stackSm + 2,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderBottomWidth: 3,
    borderBottomColor: "#CBD5E1",
    gap: 12,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    borderBottomColor: colors.onPrimaryFixedVariant,
    backgroundColor: "#F0FDF4",
  },
  optionCardCorrect: {
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
    backgroundColor: "#DCFCE7",
  },
  optionCardWrong: {
    borderColor: "#EF4444",
    borderBottomColor: "#B91C1C",
    backgroundColor: "#FEE2E2",
  },
  labelBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  labelBadgeSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  labelBadgeCorrect: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  labelBadgeWrong: {
    backgroundColor: "#EF4444",
    borderColor: "#B91C1C",
  },
  labelText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#475569",
  },
  labelTextActive: {
    color: "#FFFFFF",
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    ...typography.labelLg,
    fontSize: 14.5,
    fontWeight: "700",
    color: colors.onSurface,
    lineHeight: 20,
  },
  optionTitleCorrect: {
    color: "#14532D",
  },
  optionSubtitle: {
    ...typography.bodyMd,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  statusCheckBadge: {
    marginLeft: 4,
  },
  completionFooter: {
    width: "100%",
    gap: spacing.stackSm,
    alignItems: "center",
    marginTop: spacing.stackSm,
  },
  successPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    borderBottomWidth: 3,
    borderBottomColor: "#F59E0B",
  },
  successPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.6,
  },
});
