import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import type { PracticeItem } from "../../types/farm";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { TactileButton } from "../ui/TactileButton";
import { SquishyButton } from "./DashboardTopBar";
import { useTranslation } from "../../hooks/useTranslation";

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

  useEffect(() => {
    const loop = Animated.loop(
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
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  const badgeTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  return (
    <View style={[styles.wrapper, style]}>
      {/* Section Header (outside card) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("practice.title")}</Text>

        <SquishyButton
          onPress={onViewCalendar}
          accessibilityLabel="Open calendar"
          faceColor={componentColors.iconButtonBackground}
          borderColor={componentColors.iconButtonBorder}
          borderBottomColor={componentColors.iconButtonBorder}
          size={40}
          width={40}
          paddingHorizontal={0}
        >
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={componentColors.iconButtonIcon}
          />
        </SquishyButton>
      </View>

      {/* Practice Card */}
      <View style={styles.card}>
        {/* Practice Image */}
        <View style={styles.imageContainer}>
          <Image
            source={practice.image}
            style={styles.practiceImage}
            contentFit="cover"
          />

          {/* Floating leaf badge */}
          <Animated.View
            style={[
              styles.imageBadge,
              { transform: [{ translateY: badgeTranslateY }] },
            ]}
          >
            <MaterialIcons
              name="eco"
              size={20}
              color={componentColors.chipPositiveText}
            />
          </Animated.View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.practiceTitle}>{t(practice.title)}</Text>

          <Text style={styles.description}>{t(practice.description)}</Text>

          {/* Metadata */}
          <View style={styles.metadata}>
            <SquishyButton
              faceColor={componentColors.chipPositiveBackground}
              borderColor={componentColors.chipPositiveBorder}
              borderBottomColor={componentColors.chipPositiveEdge}
              size={32}
              borderRadius={rounded.full}
              paddingHorizontal={12}
            >
              <MaterialIcons
                name="star"
                size={15}
                color={componentColors.chipPositiveText}
              />
              <Text style={styles.xpText}>{t("practice.greenXp", { xp: practice.xpGain })}</Text>
            </SquishyButton>

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
          title={t("practice.start")}
          icon="arrow-forward"
          onPress={onStartPractice ?? (() => {})}
          height={54}
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

  headerTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },

  /* ---------- CARD ---------- */

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

  /* ---------- IMAGE ---------- */

  imageContainer: {
    width: "100%",
    height: 170,
    borderRadius: rounded.md,
    position: "relative",
    backgroundColor: colors.surfaceContainerLow,
  },

  practiceImage: {
    width: "100%",
    height: "100%",
    borderRadius: rounded.md,
  },

  imageBadge: {
    position: "absolute",
    right: 12,
    bottom: -12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: componentColors.chipPositiveBackground,
    borderWidth: 1.5,
    borderColor: componentColors.iconButtonBorder,
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
    color: componentColors.chipPositiveText,
    fontSize: 13,
    fontWeight: "600",
  },

  timeText: {
    color: componentColors.chipNeutralText,
    fontSize: 13,
    fontWeight: "500",
  },
});
