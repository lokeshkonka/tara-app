import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import { useTranslation } from "../../../hooks/useTranslation";
import type { LearnChipTheme } from "../LearnTheme";

const CATEGORY_BACKGROUNDS: Record<string, any> = {
  soil: require("../../../../assets/Learn-Assets/soil-health.png"),
  water: require("../../../../assets/Learn-Assets/water.png"),
  compost: require("../../../../assets/Learn-Assets/compost.png"),
  pest: require("../../../../assets/Learn-Assets/pest-control.png"),
  crops: require("../../../../assets/Learn-Assets/crop.png"),
  basics: require("../../../../assets/Learn-Assets/soil-health.png"),
};

export interface LessonDetailHeaderProps {
  title: string;
  description: string;
  categoryId: string;
  categoryLabelKey: string;
  durationMinutes: number;
  totalLevels: number;
  totalXp: number;
  chipTheme: LearnChipTheme;
  onBack: () => void;
}

export function LessonDetailHeader({
  title,
  description,
  categoryId,
  categoryLabelKey,
  durationMinutes,
  totalLevels,
  totalXp,
  chipTheme,
  onBack,
}: LessonDetailHeaderProps) {
  const { t } = useTranslation();
  const categoryLabel = t(categoryLabelKey);
  const bgImage = CATEGORY_BACKGROUNDS[categoryId] ?? CATEGORY_BACKGROUNDS.soil;

  return (
    <View style={styles.headerContainer}>
      {/* Top Background Hero Banner */}
      <View style={styles.heroSection}>
        <Image source={bgImage} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient
          colors={["rgba(0,0,0,0.45)", "rgba(247,250,245,0.4)", "#F7FAF5"]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Back Button (Circular Bell Button Style per DESIGN.md) */}
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>

        {/* Top Badges Stack (Row 1: XP, Row 2 below XP: Category -> Levels -> Mins) */}
        <View style={styles.chipsStack}>
          {/* Row 1: Total XP Pill */}
          <View style={styles.xpPill}>
            <MaterialIcons name="star" size={13} color="#D97706" />
            <Text style={styles.xpPillText}>{t("lesson.detail.totalXp", { xp: totalXp })}</Text>
          </View>

          {/* Row 2 (Below XP): Category -> Levels -> Mins */}
          <View style={styles.chipsRow}>
            {/* Category Chip */}
            <View
              style={[
                styles.chip,
                { backgroundColor: chipTheme.tint, borderColor: chipTheme.border },
              ]}
            >
              <Text style={[styles.chipText, { color: chipTheme.text }]}>{categoryLabel}</Text>
            </View>

            {/* Level Count Chip */}
            <View style={[styles.chip, styles.whiteChip]}>
              <MaterialIcons name="layers" size={13} color={componentColors.chipNeutralText} />
              <Text style={styles.whiteChipText}>{t("learn.lessons.total", { total: totalLevels })}</Text>
            </View>

            {/* Duration Pill */}
            <View style={[styles.chip, styles.whiteChip]}>
              <MaterialIcons name="schedule" size={13} color={componentColors.chipNeutralText} />
              <Text style={styles.whiteChipText}>{t("lesson.detail.totalTime", { time: durationMinutes })}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main Title & Description */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: colors.background,
  },
  heroSection: {
    height: 185,
    position: "relative",
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.stackSm,
    justifyContent: "space-between",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: rounded.full,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  chipsStack: {
    gap: 6,
    alignItems: "flex-start",
    zIndex: 2,
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: rounded.full,
    borderWidth: 1,
    gap: 4,
  },
  chipText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
  },
  whiteChip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "rgba(255, 255, 255, 1)",
  },
  whiteChipText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: componentColors.sectionTitle,
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: rounded.full,
    gap: 4,
  },
  xpPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: "#D97706",
  },
  titleSection: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackMd,
    gap: 6,
  },
  title: {
    ...typography.headlineLgMobile,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.4,
  },
  description: {
    ...typography.bodyLg,
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
    fontWeight: "500",
  },
});
