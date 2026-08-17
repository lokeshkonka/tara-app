import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  const remaining = Math.max(0, maxScore - score);

  // Animations
  const progressAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Smooth fill-up animation on mount
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // 2. Subtle floating badge animation
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    floatLoop.start();

    return () => {
      floatLoop.stop();
    };
  }, [percentage]);

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.card}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#FFFFFF", "#F6FAF5", "#EEF6EC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.topRow}>
        <View style={styles.labelStack}>
          <View style={styles.headerTitleRow}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="eco" size={16} color={colors.primary} />
            </View>
            <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
              {t("greenScore.title")}
            </Text>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue} numberOfLines={1}>
              {score}
            </Text>
            <Text style={styles.scoreMax} numberOfLines={1}>
              /{maxScore}
            </Text>
            <View style={styles.xpGainPill}>
              <MaterialIcons name="trending-up" size={12} color="#16A34A" />
              <Text style={styles.xpGainText}>XP</Text>
            </View>
          </View>
        </View>

        {/* Animated Floating Level Badge */}
        <Animated.View
          style={[
            styles.levelBadgeContainer,
            { transform: [{ translateY: floatY }] },
          ]}
        >
          <LinearGradient
            colors={["#E8F5E9", "#C8E6C9"]}
            style={styles.levelChip}
          >
            <MaterialIcons name="stars" size={16} color="#1B5E20" />
            <Text style={styles.levelText}>{t("greenScore.level", { level })}</Text>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Dynamic Animated Progress Bar */}
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: progressWidth }]}>
          <LinearGradient
            colors={["#66BB6A", "#2E7D32"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          {/* Glossy top reflection */}
          <View style={styles.fillHighlight} />
        </Animated.View>
      </View>

      {/* Footer Info Row */}
      <View style={styles.footerRow}>
        <Text style={styles.hint} numberOfLines={1} ellipsizeMode="tail">
          {t("greenScore.hint", { percent: percentage })}
        </Text>
        <Text style={styles.remainingText}>
          {remaining > 0 ? `${remaining} XP to Lv ${level + 1}` : "Max Level"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackMd,
    overflow: "hidden",
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  labelStack: {
    flex: 1,
  },

  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    ...typography.labelLg,
    fontSize: 15,
    fontWeight: "700",
    color: componentColors.sectionTitle,
  },

  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: spacing.unit + 2,
  },

  scoreValue: {
    ...typography.headlineLg,
    fontSize: 34,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -1,
  },

  scoreMax: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "600",
    color: colors.outline,
    marginLeft: spacing.unit,
  },

  xpGainPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: rounded.full,
    marginLeft: 8,
    gap: 2,
  },

  xpGainText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#15803D",
  },

  levelBadgeContainer: {
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  levelChip: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: "rgba(27, 94, 32, 0.3)",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(27, 94, 32, 0.45)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  levelText: {
    color: componentColors.chipPositiveText,
    fontSize: 13,
    fontWeight: "800",
  },

  track: {
    marginTop: spacing.stackMd,
    height: 14,
    borderRadius: rounded.full,
    backgroundColor: "#E2E8DF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D2DCD0",
  },

  fill: {
    height: "100%",
    borderRadius: rounded.full,
    overflow: "hidden",
    position: "relative",
  },

  fillHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: rounded.full,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.stackSm,
  },

  hint: {
    color: componentColors.sectionTitle,
    fontSize: 13,
    fontWeight: "600",
  },

  remainingText: {
    color: colors.outline,
    fontSize: 12,
    fontWeight: "500",
  },
});
