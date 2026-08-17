import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
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

  const progressAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const handlePressIn = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {}
    }
    Animated.spring(pressAnim, {
      toValue: 1,
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      tension: 250,
      friction: 16,
      useNativeDriver: true,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.98],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={`${t("dailyGoal.title")}: ${completed} of ${total} completed`}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <LinearGradient
          colors={done ? ["#F0FDF4", "#DCFCE7"] : ["#FFFFFF", "#F9FBF8"]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.topRow}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.flagCircle,
                { backgroundColor: done ? "#DCFCE7" : "#FEF3C7" },
              ]}
            >
              <MaterialIcons
                name={done ? "emoji-events" : "flag"}
                size={16}
                color={done ? "#16A34A" : "#D97706"}
              />
            </View>
            <View>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {t("dailyGoal.title")}
              </Text>
              <Text style={styles.subtext}>
                {done
                  ? t("dailyGoal.done")
                  : t("dailyGoal.remaining", { count: remaining })}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.countChip,
              done && styles.countChipDone,
            ]}
          >
            <Text
              style={[
                styles.count,
                done && { color: "#16A34A" },
              ]}
              numberOfLines={1}
            >
              {completed}
              <Text style={styles.countTotal}>/{total}</Text>
            </Text>
          </View>
        </View>

        {/* Milestone Steps Indicator */}
        <View style={styles.milestonesRow}>
          {Array.from({ length: total }).map((_, idx) => {
            const isStepDone = idx < completed;
            const isCurrent = idx === completed;
            return (
              <View
                key={idx}
                style={[
                  styles.milestonePill,
                  isStepDone && styles.milestoneDone,
                  isCurrent && styles.milestoneCurrent,
                ]}
              >
                <MaterialIcons
                  name={isStepDone ? "check" : isCurrent ? "play-arrow" : "lock-outline"}
                  size={12}
                  color={isStepDone ? "#FFFFFF" : isCurrent ? "#D97706" : "#94A3B8"}
                />
                <Text
                  style={[
                    styles.milestoneText,
                    isStepDone && styles.milestoneTextDone,
                    isCurrent && styles.milestoneTextCurrent,
                  ]}
                >
                  Task {idx + 1}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Animated Progress Track */}
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              { width: progressWidth },
            ]}
          >
            <LinearGradient
              colors={done ? ["#4ADE80", "#16A34A"] : ["#FBBF24", "#D97706"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.streakHint}>
            <MaterialIcons
              name="local-fire-department"
              size={15}
              color="#EA580C"
            />
            <Text style={styles.streakText}>
              {done ? "Daily bonus streak unlocked!" : "Complete to keep your streak!"}
            </Text>
          </View>
          <Text style={styles.percent} numberOfLines={1}>
            {percentage}%
          </Text>
        </View>
      </Animated.View>
    </Pressable>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  flagCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.08)",
    borderBottomWidth: 2.5,
    borderBottomColor: "rgba(0,0,0,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    ...typography.headlineMd,
    fontSize: 16,
    fontWeight: "700",
    color: componentColors.sectionTitle,
  },

  subtext: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },

  countChip: {
    minWidth: 54,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: rounded.full,
    backgroundColor: "#FEF3C7",
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    borderBottomWidth: 2.5,
    borderBottomColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
  },

  countChipDone: {
    backgroundColor: "#DCFCE7",
    borderColor: "#BBF7D0",
    borderBottomColor: "#16A34A",
  },

  count: {
    ...typography.labelLg,
    fontSize: 13,
    fontWeight: "800",
    color: "#B45309",
  },

  countTotal: {
    color: colors.outline,
    fontWeight: "600",
  },

  milestonesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.stackMd,
  },

  milestonePill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: rounded.full,
    paddingVertical: 4,
    paddingHorizontal: 6,
    gap: 4,
  },

  milestoneDone: {
    backgroundColor: "#16A34A",
    borderColor: "#15803D",
  },

  milestoneCurrent: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
  },

  milestoneText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },

  milestoneTextDone: {
    color: "#FFFFFF",
  },

  milestoneTextCurrent: {
    color: "#B45309",
  },

  track: {
    marginTop: spacing.stackSm + 4,
    height: 10,
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
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.stackSm + 2,
  },

  streakHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },

  streakText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: "500",
  },

  percent: {
    ...typography.labelLg,
    fontSize: 13,
    fontWeight: "800",
    color: colors.primary,
  },
});
