import React, { useEffect, useRef } from "react";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../../hooks/useTranslation";
import type { LearnLesson } from "../../types/learn";
import { colors, componentColors, rounded, spacing, typography, shadows } from "../../theme/theme";
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
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${t(lesson.titleKey, titleParams)}. ${categoryLabel}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* --- TOP BANNER (Image + Chips) --- */}
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
        
        {/* Subtle dark overlay for text readability at the top */}
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.topChips}>
          <View style={[styles.chip, { backgroundColor: chipTheme.tint, borderColor: chipTheme.border }]}>
            <Text style={[styles.chipText, { color: chipTheme.text }]}>
              {categoryLabel}
            </Text>
          </View>
          
          <View style={[styles.chip, styles.neutralChip]}>
            <MaterialIcons name="layers" size={12} color={componentColors.chipNeutralText} />
            <Text style={styles.neutralChipText}>
              {totalLevels} Levels
            </Text>
          </View>

          {lesson.isCompleted && (
            <View style={[styles.chip, styles.positiveChip, { paddingHorizontal: 6 }]}>
              <MaterialIcons name="check-circle" size={14} color={componentColors.chipPositiveText} />
            </View>
          )}
        </View>

      </View>

      {/* --- BOTTOM CONTENT --- */}
      <View style={styles.contentSection}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {t(lesson.titleKey, titleParams)}
          </Text>
          
          <View style={styles.xpBadge}>
            <MaterialIcons name="star" size={16} color="#D97706" />
            <Text style={styles.xpText}>{lesson.xp} XP</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {t(lesson.descriptionKey, descriptionParams)}
        </Text>

        <TactileButton
          title={lesson.isCompleted ? t("lesson.review") : t("lesson.start")}
          icon={lesson.isCompleted ? "replay" : "arrow-forward"}
          iconPosition="right"
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
    backgroundColor: componentColors.cardBackground,
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 4,
    borderBottomColor: componentColors.cardEdge,
    overflow: "hidden", 
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ translateY: 2 }],
    borderBottomWidth: 2,
    marginTop: 2, // Compensate for reduced bottom border
  },

  heroSection: {
    height: 120, // Tall header for the beautiful imagery
    position: "relative",
    padding: spacing.stackMd,
  },

  topChips: {
    flexDirection: "row",
    gap: spacing.stackSm,
    flexWrap: "wrap",
    zIndex: 2,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    gap: 4,
  },
  chipText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
  },
  neutralChip: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "rgba(255, 255, 255, 1)",
  },
  neutralChipText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#3f4a3c",
  },
  positiveChip: {
    backgroundColor: componentColors.chipPositiveBackground,
    borderColor: componentColors.chipPositiveBorder,
  },

  contentSection: {
    padding: spacing.stackMd,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.stackSm,
  },
  title: {
    flex: 1,
    ...typography.headlineMd,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },
  
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7", // Bright amber for XP
    borderWidth: 1,
    borderColor: "#FDE68A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
    gap: 4,
  },
  xpText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#D97706",
  },

  description: {
    marginTop: spacing.stackSm,
    color: colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  cta: {
    marginTop: spacing.stackLg,
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
    marginTop: spacing.stackLg,
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
      <Animated.View style={[styles.heroSection, { backgroundColor: colors.surfaceVariant, opacity: pulseAnim }]} />
      
      <View style={styles.contentSection}>
        <View style={styles.titleRow}>
          <Animated.View style={[styles.skeletonLine, { width: "60%", height: 24, opacity: pulseAnim }]} />
          <Animated.View style={[styles.skeletonLine, { width: 60, height: 24, borderRadius: rounded.full, opacity: pulseAnim }]} />
        </View>

        <Animated.View style={[styles.skeletonLine, { width: "100%", marginTop: spacing.stackMd, opacity: pulseAnim }]} />
        <Animated.View style={[styles.skeletonLine, { width: "80%", marginTop: 8, opacity: pulseAnim }]} />
        
        <Animated.View style={[styles.skeletonButton, { opacity: pulseAnim }]} />
      </View>
    </View>
  );
}
