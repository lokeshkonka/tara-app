import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  colors,
  componentColors,
  rounded,
  spacing,
  typography,
} from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";

interface DailyGoalProps {
  completed: number;
  total: number;
  onPress?: () => void;
}

export function DailyGoal({ completed, total, onPress }: DailyGoalProps) {
  const { t } = useTranslation();
  const percentage =
    total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const remaining = Math.max(0, total - completed);
  const done = completed >= total;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.headerLeft}>
          <View style={styles.flagCircle}>
            <MaterialIcons name="flag" size={15} color={colors.primary} />
          </View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {t("dailyGoal.title")}
          </Text>
        </View>

        <View style={styles.countChip}>
          <Text style={styles.count} numberOfLines={1}>
            {completed}
            <Text style={styles.countTotal}>/{total}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.hint} numberOfLines={1} ellipsizeMode="tail">
          {done
            ? t("dailyGoal.done")
            : t("dailyGoal.remaining", { count: remaining })}
        </Text>
        <Text style={styles.percent} numberOfLines={1}>
          {percentage}%
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: componentColors.cardBackground,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackMd,
  },

  cardPressed: {
    transform: [{ translateY: 2 }],
    borderBottomWidth: 1.5,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  flagCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: componentColors.chipPositiveBackground,
    borderWidth: 1.5,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.chipPositiveBorder,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.stackSm,
  },

  title: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "700",
    color: componentColors.sectionTitle,
  },

  countChip: {
    minWidth: 52,
    height: 30,
    paddingHorizontal: 12,
    borderRadius: rounded.full,
    backgroundColor: componentColors.chipPositiveBackground,
    borderWidth: 1.5,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.chipPositiveBorder,
    alignItems: "center",
    justifyContent: "center",
  },

  count: {
    ...typography.labelLg,
    fontWeight: "700",
    color: colors.primary,
  },

  countTotal: {
    color: colors.outline,
    fontWeight: "600",
  },

  track: {
    marginTop: spacing.stackMd,
    height: 12,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    borderWidth: 1.5,
    borderColor: "#8BD48F",
    borderBottomWidth: 3,
    borderBottomColor: "#2E7D32",
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.stackSm,
  },

  hint: {
    flex: 1,
    marginRight: spacing.stackSm,
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: "400",
  },

  percent: {
    ...typography.labelLg,
    fontWeight: "700",
    color: colors.primary,
  },
});
