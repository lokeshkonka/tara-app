import React, { useRef, useState } from "react";
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

    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }

    setSelectedOptionId(option.id);
    setIsAnswerChecked(true);

    if (option.isCorrect) {
      if (Platform.OS !== "web") {
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch {}
      }
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
    }
  };

  const handleNextRound = () => {
    if (currentRoundIndex < totalRounds - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 160,
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
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      setIsAllCompleted(true);
    }
  };

  const handleTryAgain = () => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
  };

  const selectedOption = currentRound?.options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOption?.isCorrect ?? false;

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
        {/* Tara Encouragement Header */}
        <View style={styles.taraSection}>
          <TaraSideMessageCard
            title={phase.title || "Healthy Soil Challenge"}
            expression={
              isAllCompleted
                ? "excited"
                : isAnswerChecked
                ? isSelectedCorrect
                  ? "happy"
                  : "thinking"
                : "thinking"
            }
            message={
              isAllCompleted
                ? phase.taraSuccessDialogue ||
                  "Great! Healthy soil is an integrated ecosystem. You've identified the optimal conditions!"
                : currentRound
                ? `Round ${currentRoundIndex + 1} of ${totalRounds} • ${currentRound.topic}: Compare the soil conditions and choose the healthier choice.`
                : phase.taraDialogue || "Compare the situations and choose the better soil!"
            }
            audioSource={
              isAllCompleted
                ? (phase.taraSuccessAudioSource || undefined)
                : (phase.audioSource || phase.taraAudio)
            }
            autoPlay={true}
            showVoiceControl={Boolean(
              isAllCompleted
                ? phase.taraSuccessAudioSource
                : (phase.audioSource || phase.taraAudio)
            )}
          />
        </View>

        {!isAllCompleted && currentRound && (
          <Animated.View style={[styles.roundContainer, { opacity: fadeAnim }]}>
            {/* Round Topic Badge & Prompt */}
            <View style={styles.questionHeader}>
              <View style={styles.topicPill}>
                <MaterialIcons name="eco" size={14} color="#15803D" />
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
                const isCorrectChoice = isAnswerChecked && isSelected && option.isCorrect;
                const isWrongChoice = isAnswerChecked && isSelected && !option.isCorrect;

                return (
                  <Animated.View
                    key={option.id}
                    style={{
                      transform: isWrongChoice ? [{ translateX: shakeAnim }] : [],
                    }}
                  >
                    <Pressable
                      disabled={isAnswerChecked}
                      onPress={() => handleSelectOption(option)}
                      style={[
                        styles.optionCard,
                        isSelected && !isAnswerChecked && styles.optionCardSelected,
                        isCorrectChoice && styles.optionCardCorrect,
                        isWrongChoice && styles.optionCardWrong,
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`Option ${option.label}: ${option.title}`}
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
                            (isSelected || isCorrectChoice || isWrongChoice) &&
                              styles.labelTextActive,
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
                            isWrongChoice && styles.optionTitleWrong,
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
                          <MaterialIcons name="check-circle" size={22} color="#16A34A" />
                        </View>
                      )}
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
        )}

        {/* Completion Milestone Banner */}
        {isAllCompleted && (
          <View style={styles.completionFooter}>
            <View style={styles.successPill}>
              <MaterialIcons name="stars" size={22} color="#D97706" />
              <Text style={styles.successPillText}>+30 XP EARNED • ALL ROUNDS COMPLETED</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Pinned Bottom Action Button */}
      <View style={styles.fixedBottomContainer}>
        {isAllCompleted ? (
          <TactileButton
            title="Continue to Next Step"
            icon="arrow-forward"
            iconPosition="right"
            faceColor="#16A34A"
            depthColor="#15803D"
            textColor="#FFFFFF"
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={onCompletePhase}
          />
        ) : isAnswerChecked ? (
          isSelectedCorrect ? (
            <TactileButton
              title={currentRoundIndex === totalRounds - 1 ? "Finish Challenge" : "Next Round"}
              icon="arrow-forward"
              iconPosition="right"
              faceColor="#16A34A"
              depthColor="#15803D"
              textColor="#FFFFFF"
              height={52}
              depth={4}
              borderRadius={rounded.full}
              onPress={handleNextRound}
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
          )
        ) : (
          <Text style={styles.tapNudgeText}>Tap the soil condition you think is healthier</Text>
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
  taraSection: {
    marginBottom: spacing.stackSm,
  },
  roundContainer: {
    gap: 12,
  },
  questionHeader: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.stackMd,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: 8,
  },
  topicPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    alignSelf: "flex-start",
  },
  topicPillText: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "800",
    color: "#15803D",
    letterSpacing: 0.5,
  },
  promptHeading: {
    ...typography.headlineMd,
    fontSize: 16,
    fontWeight: "800",
    color: colors.onSurface,
    lineHeight: 22,
  },
  optionsList: {
    gap: 10,
  },
  optionCard: {
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
    minHeight: 68,
    gap: 12,
  },
  optionCardSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  optionCardCorrect: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  optionCardWrong: {
    backgroundColor: "#FEF2F2",
    borderColor: colors.error,
    borderBottomColor: "#991B1B",
  },
  labelBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  labelBadgeSelected: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  labelBadgeCorrect: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },
  labelBadgeWrong: {
    backgroundColor: colors.error,
    borderColor: "#991B1B",
  },
  labelText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#475569",
  },
  labelTextActive: {
    color: "#FFFFFF",
  },
  optionContent: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    ...typography.bodyMd,
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.onSurface,
    lineHeight: 18,
  },
  optionTitleCorrect: {
    color: "#166534",
  },
  optionTitleWrong: {
    color: "#991B1B",
  },
  optionSubtitle: {
    ...typography.bodyMd,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
  },
  statusCheckBadge: {
    marginLeft: "auto",
  },
  completionFooter: {
    alignItems: "center",
    paddingVertical: spacing.stackMd,
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
  },
  successPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.5,
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
  tapNudgeText: {
    ...typography.labelSm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    paddingVertical: 8,
  },
});
