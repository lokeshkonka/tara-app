import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import { useTranslation } from "../../../hooks/useTranslation";
import { ProgressBar } from "../../ui/ProgressBar";
import type { LevelNodeDetail } from "../../../types/learn";

export interface LessonProgressSummaryProps {
  levels: LevelNodeDetail[];
}

export function LessonProgressSummary({ levels }: LessonProgressSummaryProps) {
  const { t } = useTranslation();

  const completedCount = levels.filter((l) => l.status === "completed").length;
  const totalCount = levels.length;

  const totalProgressFraction =
    levels.length > 0
      ? levels.reduce((acc, curr) => {
          if (curr.status === "completed") return acc + 1;
          if (curr.status === "inProgress") return acc + curr.progressFraction;
          return acc;
        }, 0) / levels.length
      : 0;

  const percentage = Math.round(totalProgressFraction * 100);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t("lesson.detail.journeyTitle")}</Text>
        <Text style={styles.subtitle}>
          {completedCount} / {totalCount} {t("learn.lessons.completed")} ({percentage}%)
        </Text>
      </View>

      <ProgressBar progress={totalProgressFraction} height={12} />

      <View style={styles.badgesRow}>
        {levels.map((level) => {
          let badgeText = t("lesson.detail.lockedBadge");
          let badgeBg = "#F1F4EF";
          let badgeColor = "#6F7A6B";
          let borderColor = "#BECAB9";

          if (level.status === "completed") {
            badgeText = t("lesson.detail.completedBadge");
            badgeBg = "#E8F5E9";
            badgeColor = "#16A34A";
            borderColor = "rgba(22, 163, 74, 0.3)";
          } else if (level.status === "inProgress") {
            badgeText = t("lesson.detail.inProgressBadge");
            badgeBg = "#FEF3C7";
            badgeColor = "#D97706";
            borderColor = "#FDE68A";
          }

          return (
            <View
              key={level.id}
              style={[
                styles.levelBadge,
                { backgroundColor: badgeBg, borderColor: borderColor },
              ]}
            >
              <Text style={[styles.levelBadgeText, { color: badgeColor }]}>
                L{level.levelNumber}: {badgeText}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackMd,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...typography.headlineMd,
    fontSize: 16,
    fontWeight: "800",
    color: componentColors.sectionTitle,
  },
  subtitle: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
    marginTop: 2,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: rounded.full,
    borderWidth: 1,
  },
  levelBadgeText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
  },
});
