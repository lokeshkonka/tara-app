import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import type { ProgressData } from "../../types/progress";
import { BadgesRow } from "./BadgesRow";
import { DailyGoal } from "./DailyGoal";
import { GreenScore } from "./GreenScore";
import { ImpactMetrics } from "./ImpactMetrics";
import { TaraSideMessageCard } from "../tara-messages/TaraSideMessageCard";
import { TARA_DEMO_CONTENT } from "../../data/taraDemoContent";
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

  const isGoalDone = data.dailyGoal.completed >= data.dailyGoal.total;
  const taraMessage = isGoalDone
    ? "Awesome progress! You've achieved today's green farming goal and boosted your soil score."
    : `You're at Level ${data.level}! Complete ${data.dailyGoal.total - data.dailyGoal.completed} more practice action today to unlock your next milestone badge.`;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle} numberOfLines={1} ellipsizeMode="tail">
          {t("progress.title")}
        </Text>
        <View style={styles.levelTag}>
          <MaterialIcons name="insights" size={14} color="#15803D" />
          <Text style={styles.levelTagText}>Live Stats</Text>
        </View>
      </View>

      {/* Tara Side Message Card Coaching Banner */}
      <TaraSideMessageCard
        title="Tara Progress Coach"
        message={taraMessage}
        expression={isGoalDone ? "excited" : "happy"}
        audioSource={TARA_DEMO_CONTENT.english.audio}
        showVoiceControl={true}
      />

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

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.unit,
  },

  sectionTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },

  levelTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: rounded.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },

  levelTagText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#15803D",
  },
});
