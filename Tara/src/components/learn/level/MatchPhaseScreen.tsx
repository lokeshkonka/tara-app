import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import type { MatchPhase } from "../../../types/learn";
import { MatchActivity } from "../practice/MatchActivity";
import { TaraSideMessageCard } from "../../tara-messages/TaraSideMessageCard";
import { TactileButton } from "../../ui/TactileButton";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

interface MatchPhaseScreenProps {
  phase: MatchPhase;
  onCompletePhase: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const MatchPhaseScreen: React.FC<MatchPhaseScreenProps> = ({
  phase,
  onCompletePhase,
  onScroll,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleMatchComplete = () => {
    setIsCompleted(true);
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
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
            title={phase.title || "Match-Up Game"}
            expression={isCompleted ? "excited" : phase.taraExpression || "happy"}
            message={
              isCompleted
                ? phase.taraSuccessDialogue || "Great job! You found all the matching roles in the soil community!"
                : phase.taraDialogue || "Connect each soil friend with their role in the community."
            }
            autoPlay={true}
            showVoiceControl={true}
          />
        </View>

        {/* Match Activity Board */}
        <View style={styles.activityCard}>
          <MatchActivity
            title={phase.title}
            instructions={phase.instructions}
            pairs={phase.pairs}
            onComplete={handleMatchComplete}
          />
        </View>

        {/* Completion Milestone Banner & CTA */}
        {isCompleted && (
          <View style={styles.completionFooter}>
            <View style={styles.successPill}>
              <MaterialIcons name="stars" size={20} color="#D97706" />
              <Text style={styles.successPillText}>+30 XP EARNED • MATCH COMPLETED</Text>
            </View>

            <TactileButton
              title="Continue to Questions"
              icon="arrow-forward"
              iconPosition="right"
              faceColor="#16A34A"
              depthColor="#15803D"
              textColor="#FFFFFF"
              height={54}
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
  activityCard: {
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
