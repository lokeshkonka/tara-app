import React, { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import { useTranslation } from "../../../hooks/useTranslation";
import type { LevelNodeDetail } from "../../../types/learn";

export interface LevelNodeProps {
  level: LevelNodeDetail;
  onPress: (level: LevelNodeDetail) => void;
}

export function LevelNode({ level, onPress }: LevelNodeProps) {
  const { t } = useTranslation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (level.status === "locked") return;
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {
        // ignore
      }
    }
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 12,
    }).start();
  };

  const handlePress = () => {
    if (level.status === "locked") return;
    onPress(level);
  };

  let nodeIcon: keyof typeof MaterialIcons.glyphMap = "play-arrow";
  let nodeStyle: ViewStyle = styles.nodeAvailable;
  let iconColor = "#FFFFFF";

  if (level.status === "completed") {
    nodeIcon = "check";
    nodeStyle = styles.nodeCompleted;
    iconColor = "#16A34A";
  } else if (level.status === "inProgress") {
    nodeIcon = "play-arrow";
    nodeStyle = styles.nodeInProgress;
    iconColor = "#FFFFFF";
  } else if (level.status === "locked") {
    nodeIcon = "lock";
    nodeStyle = styles.nodeLocked;
    iconColor = "#6F7A6B";
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
        accessibilityRole="button"
        accessibilityLabel={`Level ${level.levelNumber}: ${t(level.titleKey)}`}
      >
        <Animated.View style={[styles.nodeCircle, nodeStyle, { transform: [{ scale: scaleAnim }] }]}>
          <MaterialIcons name={nodeIcon} size={28} color={iconColor} />
        </Animated.View>

        {/* Level Node Metadata */}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.levelBadgeText}>LEVEL {level.levelNumber}</Text>
            {level.status === "completed" && (
              <View style={styles.completedTag}>
                <Text style={styles.completedTagText}>{t("lesson.detail.completedBadge")}</Text>
              </View>
            )}
            {level.status === "inProgress" && (
              <View style={styles.inProgressTag}>
                <Text style={styles.inProgressTagText}>
                  {Math.round(level.progressFraction * 100)}%
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.nodeTitle} numberOfLines={1}>
            {t(level.titleKey)}
          </Text>

          <View style={styles.metaRow}>
            <MaterialIcons name="schedule" size={12} color={colors.onSurfaceVariant} />
            <Text style={styles.metaText}>{level.durationMinutes} min</Text>
            <Text style={styles.dot}>·</Text>
            <MaterialIcons name="star" size={12} color="#D97706" />
            <Text style={styles.xpText}>+{level.xp} XP</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 4,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.stackMd,
  },
  nodeCircle: {
    width: 60,
    height: 60,
    borderRadius: rounded.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  nodeCompleted: {
    backgroundColor: "#E8F5E9",
    borderColor: "#16A34A",
  },
  nodeInProgress: {
    backgroundColor: "#4CAF50",
    borderColor: "#005313",
    borderBottomWidth: 5,
  },
  nodeAvailable: {
    backgroundColor: "#4CAF50",
    borderColor: "#005313",
    borderBottomWidth: 5,
  },
  nodeLocked: {
    backgroundColor: "#E0E3DF",
    borderColor: "#BECAB9",
  },
  textContainer: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  levelBadgeText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5,
  },
  completedTag: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: rounded.full,
  },
  completedTagText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: "800",
    color: "#16A34A",
  },
  inProgressTag: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: rounded.full,
  },
  inProgressTagText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: "800",
    color: "#D97706",
  },
  nodeTitle: {
    ...typography.headlineMd,
    fontSize: 16,
    fontWeight: "700",
    color: componentColors.sectionTitle,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    ...typography.labelSm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: "500",
  },
  dot: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
  },
  xpText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#D97706",
  },
});
