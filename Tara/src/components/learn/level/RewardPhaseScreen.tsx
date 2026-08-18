import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { LevelCompleteCard } from "./LevelCompleteCard";
import { colors, spacing } from "../../../theme/theme";
import type { RewardPhase } from "../../../types/learn";

interface RewardPhaseScreenProps {
  phase: RewardPhase;
  levelNumber?: number;
  levelTitle?: string;
  onFinishLevel: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const RewardPhaseScreen: React.FC<RewardPhaseScreenProps> = ({
  phase,
  levelNumber = 1,
  levelTitle,
  onFinishLevel,
  onScroll,
}) => {
  const isFinalLevel = levelNumber >= 5;
  const displayTitle =
    levelTitle || (isFinalLevel ? "Soil Health Lesson Mastered!" : `Level ${levelNumber} Complete!`);
  const buttonTitle = isFinalLevel ? "Claim & Finish Lesson" : "Claim & Continue";

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
        <LevelCompleteCard
          levelNumber={levelNumber}
          levelTitle={displayTitle}
          xpEarned={phase.xp}
          badgeTitle={phase.badgeTitle}
          badgeIcon={phase.badgeIcon}
          badgeId={isFinalLevel ? "soil-guardian" : phase.id}
          taraMessage={phase.taraDialogue}
          taraExpression={phase.taraExpression || "excited"}
          primaryButtonTitle={buttonTitle}
          onPrimaryAction={onFinishLevel}
        />
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
});
