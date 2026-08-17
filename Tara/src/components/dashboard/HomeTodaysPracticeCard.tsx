import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons, type MaterialIcons as MaterialIconsType } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import type { PracticeItem } from "../../types/farm";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { TactileButton } from "../ui/TactileButton";
import { SquishyButton } from "./DashboardTopBar";
import { useTranslation } from "../../hooks/useTranslation";

type IconName = React.ComponentProps<typeof MaterialIconsType>["name"];

interface CategoryStyle {
  label: string;
  icon: IconName;
  color: string;
  bgColor: string;
  borderColor: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  soil: {
    label: "Soil Care",
    icon: "terrain",
    color: "#B45309",
    bgColor: "#FEF3C7",
    borderColor: "#FDE68A",
  },
  water: {
    label: "Water Saving",
    icon: "water-drop",
    color: "#0284C7",
    bgColor: "#E0F2FE",
    borderColor: "#BAE6FD",
  },
  pest: {
    label: "Pest Management",
    icon: "bug-report",
    color: "#EA580C",
    bgColor: "#FFEDD5",
    borderColor: "#FED7AA",
  },
  compost: {
    label: "Composting",
    icon: "recycling",
    color: "#15803D",
    bgColor: "#DCFCE7",
    borderColor: "#BBF7D0",
  },
};

const FALLBACK_CATEGORY_STYLE: CategoryStyle = {
  label: "Farming Practice",
  icon: "eco",
  color: "#15803D",
  bgColor: "#DCFCE7",
  borderColor: "#BBF7D0",
};

interface HomeTodaysPracticeCardProps {
  practice: PracticeItem;
  onStartPractice?: () => void;
  onViewCalendar?: () => void;
  style?: ViewStyle;
}

export function HomeTodaysPracticeCard({
  practice,
  onStartPractice,
  onViewCalendar,
  style,
}: HomeTodaysPracticeCardProps) {
  const { t } = useTranslation();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const categoryStyle =
    CATEGORY_STYLES[practice.category] ?? FALLBACK_CATEGORY_STYLE;

  useEffect(() => {
    // 1. Floating badge animation
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    floatLoop.start();

    // 2. Subtle pulse on XP pill
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    return () => {
      floatLoop.stop();
      pulseLoop.stop();
    };
  }, [floatAnim, pulseAnim]);

  const badgeTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const handleStart = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      } catch {}
    }
    if (onStartPractice) {
      onStartPractice();
    }
  };

  return (
    <View style={[styles.wrapper, style]}>
      {/* Section Header (outside card) */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>{t("practice.title")}</Text>
          <View style={styles.dailyMissionPill}>
            <MaterialIcons name="today" size={13} color="#15803D" />
            <Text style={styles.dailyMissionText}>Daily</Text>
          </View>
        </View>

        <SquishyButton
          onPress={onViewCalendar}
          accessibilityLabel="Open calendar"
          faceColor={componentColors.iconButtonBackground}
          borderColor={componentColors.iconButtonBorder}
          borderBottomColor={componentColors.iconButtonBorder}
          size={38}
          width={38}
          paddingHorizontal={0}
        >
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={componentColors.iconButtonIcon}
          />
        </SquishyButton>
      </View>

      {/* Practice Card */}
      <View style={styles.card}>
        <LinearGradient
          colors={["#FFFFFF", "#F9FBF8"]}
          style={StyleSheet.absoluteFill}
        />

        {/* Practice Image Container with Overlays */}
        <View style={styles.imageContainer}>
          <Image
            source={practice.image}
            style={styles.practiceImage}
            contentFit="cover"
          />

          {/* Dark-to-transparent gradient for top chips readability */}
          <LinearGradient
            colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)"]}
            locations={[0, 0.4, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Top category chip on image */}
          <View style={styles.imageTopRow}>
            <View
              style={[
                styles.categoryChip,
                {
                  backgroundColor: categoryStyle.bgColor,
                  borderColor: categoryStyle.borderColor,
                },
              ]}
            >
              <MaterialIcons
                name={categoryStyle.icon}
                size={13}
                color={categoryStyle.color}
              />
              <Text style={[styles.categoryChipText, { color: categoryStyle.color }]}>
                {categoryStyle.label}
              </Text>
            </View>

            {practice.difficulty ? (
              <View style={styles.difficultyChip}>
                <MaterialIcons name="bolt" size={13} color="#D97706" />
                <Text style={styles.difficultyChipText}>
                  {practice.difficulty.toUpperCase()}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Floating animated leaf badge on bottom right of image */}
          <Animated.View
            style={[
              styles.imageBadge,
              { transform: [{ translateY: badgeTranslateY }] },
            ]}
          >
            <LinearGradient
              colors={["#DCFCE7", "#BBF7D0"]}
              style={styles.badgeGradient}
            >
              <MaterialIcons
                name="eco"
                size={20}
                color="#15803D"
              />
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.practiceTitle}>{t(practice.title)}</Text>

          <Text style={styles.description}>{t(practice.description)}</Text>

          {/* Metadata Chips Row */}
          <View style={styles.metadata}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <SquishyButton
                faceColor="#FEF3C7"
                borderColor="#FDE68A"
                borderBottomColor="#F59E0B"
                size={32}
                borderRadius={rounded.full}
                paddingHorizontal={12}
              >
                <MaterialIcons
                  name="star"
                  size={15}
                  color="#D97706"
                />
                <Text style={styles.xpText}>
                  +{practice.xpGain} Green XP
                </Text>
              </SquishyButton>
            </Animated.View>

            {practice.durationMinutes ? (
              <SquishyButton
                faceColor={componentColors.chipNeutralBackground}
                borderColor={componentColors.chipNeutralBorder}
                borderBottomColor={componentColors.chipNeutralEdge}
                size={32}
                borderRadius={rounded.full}
                paddingHorizontal={12}
              >
                <MaterialIcons
                  name="schedule"
                  size={15}
                  color={componentColors.chipNeutralText}
                />
                <Text style={styles.timeText}>
                  {t("practice.time", { time: practice.durationMinutes })}
                </Text>
              </SquishyButton>
            ) : null}
          </View>
        </View>

        {/* Start Button */}
        <TactileButton
          title={practice.completed ? "Completed ✓" : t("practice.start")}
          icon={practice.completed ? "check" : "arrow-forward"}
          onPress={handleStart}
          height={52}
          depth={4}
          borderRadius={rounded.lg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  /* ---------- HEADER (outside card) ---------- */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.unit,
    paddingBottom: spacing.stackSm,
  },

  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },

  dailyMissionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: rounded.full,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    gap: 3,
  },

  dailyMissionText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#15803D",
  },

  /* ---------- CARD ---------- */

  card: {
    width: "100%",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackMd,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  /* ---------- IMAGE ---------- */

  imageContainer: {
    width: "100%",
    height: 175,
    borderRadius: rounded.md,
    position: "relative",
    backgroundColor: colors.surfaceContainerLow,
    overflow: "hidden",
  },

  practiceImage: {
    width: "100%",
    height: "100%",
    borderRadius: rounded.md,
  },

  imageTopRow: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    gap: 4,
  },

  categoryChipText: {
    fontSize: 11.5,
    fontWeight: "800",
  },

  difficultyChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: rounded.full,
    gap: 3,
  },

  difficultyChipText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#FDE68A",
    letterSpacing: 0.4,
  },

  imageBadge: {
    position: "absolute",
    right: 12,
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },

  badgeGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ---------- CONTENT ---------- */

  content: {
    paddingTop: spacing.stackMd,
    paddingHorizontal: spacing.unit,
  },

  practiceTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },

  description: {
    marginTop: spacing.stackSm,
    color: colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },

  /* ---------- CHIPS ---------- */

  metadata: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.stackMd,
    marginBottom: spacing.stackLg,
    gap: spacing.stackSm,
  },

  xpText: {
    color: "#B45309",
    fontSize: 12.5,
    fontWeight: "700",
  },

  timeText: {
    color: componentColors.chipNeutralText,
    fontSize: 12.5,
    fontWeight: "600",
  },
});
