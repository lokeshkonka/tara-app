import React, { useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import type { LearnLesson } from "../../types/learn";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { TactileButton } from "../ui/TactileButton";
import type { LearnChipTheme } from "./LearnTheme";

// Map category IDs to background images
const CATEGORY_BACKGROUNDS: Record<string, any> = {
  soil: require("../../../assets/Learn-Assets/soil-health.png"),
  water: require("../../../assets/Learn-Assets/water.png"),
  compost: require("../../../assets/Learn-Assets/compost.png"),
  pest: require("../../../assets/Learn-Assets/pest-control.png"),
  crops: require("../../../assets/Learn-Assets/crop.png"),
  basics: require("../../../assets/Learn-Assets/soil-health.png"),
};

interface LessonCardProps {
  lesson: LearnLesson;
  categoryLabelKey: string;
  chipTheme: LearnChipTheme;
  totalLevels: number;
  onPress?: () => void;
  onStartPress?: () => void;
}

export function LessonCard({
  lesson,
  categoryLabelKey,
  chipTheme,
  totalLevels,
  onPress,
  onStartPress,
}: LessonCardProps) {
  const { t } = useTranslation();
  const categoryLabel = t(categoryLabelKey);
  const titleParams = { part: lesson.level, category: categoryLabel };
  const descriptionParams = { category: categoryLabel };

  const bgImage = CATEGORY_BACKGROUNDS[lesson.categoryId];

  return (
    <Pressable
      onPress={onPress ?? onStartPress}
      accessibilityRole="button"
      accessibilityLabel={`${t(lesson.titleKey, titleParams)}. ${categoryLabel}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* --- TOP HERO BANNER WITH LAYER-MERGE GRADIENT --- */}
      <View style={styles.heroSection}>
        {bgImage ? (
          <Image
            source={bgImage}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: chipTheme.tint }]} />
        )}

        {/* Seamless Image-to-Background Gradient Merge */}
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.42)",
            "rgba(255,255,255,0.08)",
            "rgba(255,255,255,0.72)",
            "#FFFFFF",
          ]}
          locations={[0, 0.4, 0.78, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* --- TOP-RIGHT CORNER TICK MARK BADGE --- */}
        {lesson.isCompleted && (
          <View style={styles.topRightCheck}>
            <MaterialIcons name="check" size={15} color="#FFFFFF" />
          </View>
        )}

        {/* --- LEFT-ALIGNED CHIPS (ROW 1: XP & Status, ROW 2: Category -> Levels -> Mins) --- */}
        <View style={styles.heroLeftChips}>
          {/* Row 1: XP Pill & Completion Status */}
          <View style={styles.topChipsRow}>
            <View style={styles.xpPill}>
              <MaterialIcons name="star" size={13} color="#D97706" />
              <Text style={styles.xpPillText}>+{lesson.xp} XP Total</Text>
            </View>

            {lesson.isCompleted && (
              <View style={[styles.statusPill, styles.statusCompletedPill]}>
                <MaterialIcons name="check-circle" size={12} color="#15803D" />
                <Text style={styles.statusCompletedText}>Completed</Text>
              </View>
            )}

            {!lesson.isCompleted && lesson.progress > 0 && (
              <View style={[styles.statusPill, styles.statusProgressPill]}>
                <MaterialIcons name="timelapse" size={12} color="#B45309" />
                <Text style={styles.statusProgressText}>In Progress</Text>
              </View>
            )}
          </View>

          {/* Row 2 (Below XP): Category -> Levels -> Mins */}
          <View style={styles.topChipsRow}>
            {/* Category Chip */}
            <View
              style={[
                styles.chip,
                { backgroundColor: chipTheme.tint, borderColor: chipTheme.border },
              ]}
            >
              <Text style={[styles.chipText, { color: chipTheme.text }]}>
                {categoryLabel}
              </Text>
            </View>

            {/* Total Levels Badge */}
            <View style={[styles.chip, styles.neutralChip]}>
              <MaterialIcons name="layers" size={12} color={componentColors.chipNeutralText} />
              <Text style={styles.neutralChipText}>
                {lesson.totalLevels ?? totalLevels} Levels
              </Text>
            </View>

            {/* Duration Pill */}
            {lesson.durationMinutes ? (
              <View style={[styles.chip, styles.neutralChip]}>
                <MaterialIcons name="schedule" size={12} color={componentColors.chipNeutralText} />
                <Text style={styles.neutralChipText}>
                  {t("lesson.detail.totalTime", { time: lesson.durationMinutes })}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      {/* --- BOTTOM CONTENT SECTION --- */}
      <View style={styles.contentSection}>
        <Text style={styles.title} numberOfLines={2}>
          {lesson.title || t(lesson.titleKey)}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {lesson.description || t(lesson.descriptionKey)}
        </Text>

        {/* Real End-to-End Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              {lesson.isCompleted
                ? `Completed all ${lesson.totalLevels ?? totalLevels} Levels`
                : `${Math.round((lesson.progress || 0) * (lesson.totalLevels ?? totalLevels))} of ${lesson.totalLevels ?? totalLevels} Levels Completed`}
            </Text>
            <Text
              style={[
                styles.progressFractionText,
                lesson.isCompleted && { color: "#16A34A" },
              ]}
            >
              {Math.round((lesson.progress || 0) * 100)}%
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min(100, Math.max(lesson.isCompleted ? 100 : (lesson.progress || 0) * 100, 0))}%`,
                  backgroundColor: lesson.isCompleted ? "#16A34A" : chipTheme.solid,
                },
              ]}
            />
          </View>
        </View>

        {/* Category-Themed 3D Push Button */}
        <TactileButton
          title={
            lesson.isCompleted
              ? t("lesson.review")
              : lesson.progress > 0
              ? "Continue Lesson"
              : t("lesson.start")
          }
          icon={lesson.isCompleted ? "replay" : "arrow-forward"}
          iconPosition="right"
          faceColor={chipTheme.solid}
          depthColor={chipTheme.solidEdge}
          textColor="#FFFFFF"
          onPress={onStartPress ?? (() => {})}
          height={48}
          depth={4}
          borderRadius={rounded.full}
          style={styles.cta}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 4,
    borderBottomColor: componentColors.cardEdge,
    overflow: "hidden",
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.96,
    transform: [{ translateY: 2 }],
    borderBottomWidth: 2,
    marginTop: 2,
  },

  heroSection: {
    height: 145,
    position: "relative",
    padding: spacing.stackMd,
    justifyContent: "flex-end",
  },

  topRightCheck: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#16A34A",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },

  heroLeftChips: {
    gap: 6,
    alignItems: "flex-start",
    zIndex: 2,
  },

  topChipsRow: {
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

  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: rounded.full,
    gap: 3,
  },
  xpPillText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#D97706",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: rounded.full,
    gap: 3,
    borderWidth: 1,
  },
  statusCompletedPill: {
    backgroundColor: "#DCFCE7",
    borderColor: "#BBF7D0",
  },
  statusCompletedText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#15803D",
  },
  statusProgressPill: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FDE68A",
  },
  statusProgressText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
  },
  stepBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: rounded.full,
    gap: 3,
  },
  stepBadgeText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#15803D",
  },

  progressSection: {
    marginTop: 10,
    gap: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  progressFractionText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: colors.primary,
  },
  progressBarBg: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceContainer,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },

  neutralChip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 3.5,
  },
  neutralChipText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#3f4a3c",
  },

  contentSection: {
    paddingHorizontal: spacing.stackMd,
    paddingTop: 2,
    paddingBottom: spacing.stackMd,
    backgroundColor: "#FFFFFF",
  },

  title: {
    ...typography.headlineMd,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },

  description: {
    marginTop: 6,
    color: colors.onSurfaceVariant,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: "500",
  },

  cta: {
    marginTop: spacing.stackMd,
  },

  // Skeleton Styles
  skeletonLine: {
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceVariant,
  },
  skeletonButton: {
    height: 48,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceVariant,
    marginTop: spacing.stackMd,
  },
});

export function LessonCardSkeleton() {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.card}>
      <Animated.View
        style={[
          styles.heroSection,
          { backgroundColor: colors.surfaceVariant, opacity: pulseAnim },
        ]}
      />

      <View style={styles.contentSection}>
        <Animated.View
          style={[
            styles.skeletonLine,
            { width: "70%", height: 22, opacity: pulseAnim },
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonLine,
            { width: "100%", marginTop: spacing.stackSm, opacity: pulseAnim },
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonLine,
            { width: "85%", marginTop: 6, opacity: pulseAnim },
          ]}
        />
        <Animated.View style={[styles.skeletonButton, { opacity: pulseAnim }]} />
      </View>
    </View>
  );
}
