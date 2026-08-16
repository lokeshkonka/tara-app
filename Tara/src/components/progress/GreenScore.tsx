import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  colors,
  componentColors,
  rounded,
  spacing,
  typography,
} from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";

interface GreenScoreProps {
  score: number;
  maxScore: number;
  level: number;
}

export function GreenScore({ score, maxScore, level }: GreenScoreProps) {
  const { t } = useTranslation();
  const percentage =
    maxScore > 0 ? Math.min(100, Math.round((score / maxScore) * 100)) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.labelStack}>
          <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
            {t("greenScore.title")}
          </Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue} numberOfLines={1}>
              {score}
            </Text>
            <Text style={styles.scoreMax} numberOfLines={1}>
              /{maxScore}
            </Text>
          </View>
        </View>

        <View style={styles.levelChip}>
          <MaterialIcons name="stars" size={15} color={componentColors.chipPositiveText} />
          <Text style={styles.levelText}>{t("greenScore.level", { level })}</Text>
        </View>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>

      <Text style={styles.hint} numberOfLines={1} ellipsizeMode="tail">
        {t("greenScore.hint", { percent: percentage })}
      </Text>
    </View>
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

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  labelStack: {
    flex: 1,
  },

  label: {
    ...typography.labelLg,
    color: componentColors.sectionTitle,
  },

  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: spacing.unit,
  },

  scoreValue: {
    ...typography.headlineLg,
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: -1,
  },

  scoreMax: {
    ...typography.headlineMd,
    color: colors.outline,
    marginLeft: spacing.unit,
  },

  levelChip: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: rounded.full,
    backgroundColor: componentColors.chipPositiveBackground,
    borderWidth: 1.5,
    borderColor: componentColors.chipPositiveBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.chipPositiveEdge,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  levelText: {
    color: componentColors.chipPositiveText,
    fontSize: 13,
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

  hint: {
    marginTop: spacing.stackSm,
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: "400",
  },
});
