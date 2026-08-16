import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import { componentColors, spacing, typography } from "../../theme/theme";
import type { ProgressData } from "../../types/progress";
import { BadgesRow } from "./BadgesRow";
import { DailyGoal } from "./DailyGoal";
import { GreenScore } from "./GreenScore";
import { ImpactMetrics } from "./ImpactMetrics";
import { useTranslation } from "../../hooks/useTranslation";

interface ProgressSectionProps {
  data: ProgressData;
  onSeeBadges?: () => void;
  onDailyGoalPress?: () => void;
  style?: ViewStyle;
}

export function ProgressSection({
  data,
  onSeeBadges,
  onDailyGoalPress,
  style,
}: ProgressSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle} numberOfLines={1} ellipsizeMode="tail">
        {t("progress.title")}
      </Text>

      <GreenScore
        score={data.greenScore}
        maxScore={data.greenScoreMax}
        level={data.level}
      />

      <ImpactMetrics metrics={data.metrics} />

      <BadgesRow badges={data.badges} onSeeBadges={onSeeBadges} />

      <DailyGoal
        completed={data.dailyGoal.completed}
        total={data.dailyGoal.total}
        onPress={onDailyGoalPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing.stackMd,
  },

  sectionTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
    paddingHorizontal: spacing.unit,
  },
});
