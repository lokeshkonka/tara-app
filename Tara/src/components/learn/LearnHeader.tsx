import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import { SquishyButton } from "../dashboard/DashboardTopBar";

interface LearnHeaderProps {
  streakDays: number;
  todayXp: number;
  isLoading?: boolean;
  onStreakPress?: () => void;
  onXpPress?: () => void;
}

const XP_PILL_BLUE = "#1E88E5";
const XP_PILL_BLUE_EDGE = "#0D47A1";

export function LearnHeader({
  streakDays = 0,
  todayXp = 0,
  isLoading = false,
  onStreakPress,
  onXpPress,
}: LearnHeaderProps) {
  const { t } = useTranslation();
  const streakActive = streakDays > 0;
  const xpText = isLoading ? "…" : t("learn.todayXp", { xp: todayXp });

  return (
    <View style={styles.container}>
      {/* Left: Learn title */}
      <View style={styles.left}>
        <Text style={styles.title} numberOfLines={1}>
          {t("learn.title")}
        </Text>
      </View>

      {/* Right: streak (same as Home) + today's XP */}
      <View style={styles.rightActions}>
        <SquishyButton
          onPress={onStreakPress}
          accessibilityLabel={
            streakActive ? t("streak.active", { count: streakDays }) : t("streak.inactive")
          }
          faceColor={streakActive ? colors.tertiaryFixed : colors.surfaceContainerHigh}
          borderColor={streakActive ? "rgba(205, 167, 33, 0.4)" : colors.outlineVariant}
          borderBottomColor={streakActive ? "rgba(205, 167, 33, 0.4)" : colors.outlineVariant}
          size={40}
          shadowColor={streakActive ? colors.tertiary : undefined}
        >
          <MaterialIcons
            name="local-fire-department"
            size={18}
            color={streakActive ? "#E2570A" : colors.outline}
          />
          <Text
            style={[
              styles.streakText,
              !streakActive && styles.streakTextInactive,
            ]}
          >
            {streakDays}
          </Text>
        </SquishyButton>

        <SquishyButton
          onPress={onXpPress}
          accessibilityLabel={t("learn.todayXp", { xp: todayXp })}
          faceColor={XP_PILL_BLUE}
          borderColor={XP_PILL_BLUE}
          borderBottomColor={XP_PILL_BLUE_EDGE}
          size={40}
          borderRadius={rounded.full}
          paddingHorizontal={12}
          shadowColor={XP_PILL_BLUE}
        >
          <MaterialIcons name="star" size={16} color={colors.onPrimary} />
          <Text style={styles.xpText} numberOfLines={1}>
            {xpText}
          </Text>
        </SquishyButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackSm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.45)",
    gap: spacing.gutter,
  },
  left: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    ...typography.headlineLgMobile,
    fontSize: 22,
    lineHeight: 28,
    color: colors.primary,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.stackSm,
  },
  streakText: {
    ...typography.labelLg,
    fontWeight: "700",
    color: colors.onTertiaryFixed,
  },
  streakTextInactive: {
    color: colors.onSurfaceVariant,
  },
  xpText: {
    ...typography.labelLg,
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.onPrimary,
  },
});
