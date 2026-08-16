import { useState, type ReactNode } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";

interface DashboardTopBarProps {
  name: string;
  subtitle?: string;
  streakDays?: number;
  unreadCount?: number;
  onStreakPress?: () => void;
  onNotificationPress?: () => void;
}

interface SquishyButtonProps {
  onPress?: () => void;
  accessibilityLabel?: string;
  faceColor: string;
  borderColor: string;
  borderBottomColor: string;
  size: number;
  depth?: number;
  borderRadius?: number;
  width?: number;
  paddingHorizontal?: number;
  shadowColor?: string;
  children: ReactNode;
}

export function SquishyButton({
  onPress,
  accessibilityLabel,
  faceColor,
  borderColor,
  borderBottomColor,
  size,
  depth = 3,
  borderRadius = rounded.full,
  width,
  paddingHorizontal = 12,
  shadowColor,
  children,
}: SquishyButtonProps) {
  const [pressAnim] = useState(() => new Animated.Value(0));

  const handlePressIn = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {
        // ignore on unsupported platforms
      }
    }
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: false,
      tension: 250,
      friction: 16,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, depth],
  });
  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });
  const bottomWidth = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 1.5],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => pressed && styles.pressOverlay}
    >
      <Animated.View
        style={[
          styles.face,
          {
            backgroundColor: faceColor,
            borderColor,
            borderBottomColor,
            borderBottomWidth: bottomWidth,
            height: size,
            borderRadius,
            width,
            paddingHorizontal,
            transform: [{ translateY }, { scale }],
          },
          shadowColor
            ? {
                shadowColor,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 3,
              }
            : null,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export function DashboardTopBar({
  name,
  subtitle,
  streakDays = 0,
  unreadCount = 0,
  onStreakPress,
  onNotificationPress,
}: DashboardTopBarProps) {
  const { t } = useTranslation();
  const badgeCount = Math.min(unreadCount, 9);
  const streakActive = streakDays > 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greeting.morning");
    if (hour < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textStack}>
        <Text style={styles.greeting} numberOfLines={1}>
          {getGreeting()}
        </Text>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.waveEmoji} accessibilityRole="image" accessibilityLabel="wave">
            👋
          </Text>
        </View>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightActions}>
        <SquishyButton
          onPress={onStreakPress}
          accessibilityLabel={
            streakActive ? t("streak.active", { count: streakDays }) : t("streak.inactive")
          }
          faceColor={streakActive ? colors.tertiaryFixed : colors.surfaceContainerHigh}
          borderColor={streakActive ? "rgba(205, 167, 33, 0.4)" : colors.outlineVariant}
          borderBottomColor={streakActive ? "rgba(205, 167, 33, 0.4)" : colors.outlineVariant}
          size={40}
          shadowColor={streakActive ? colors.tertiary : undefined}
        >
          <MaterialIcons
            name="local-fire-department"
            size={18}
            color={streakActive ? "#E2570A" : colors.outline}
          />
          <Text
            style={[
              styles.streakText,
              !streakActive && styles.streakTextInactive,
            ]}
          >
            {streakDays}
          </Text>
        </SquishyButton>

        <SquishyButton
          onPress={onNotificationPress}
          accessibilityLabel={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
          faceColor={colors.surfaceContainerLowest}
          borderColor={colors.outlineVariant}
          borderBottomColor={colors.outlineVariant}
          size={40}
          width={40}
          paddingHorizontal={0}
        >
          <MaterialIcons
            name="notifications-none"
            size={24}
            color={colors.onSurfaceVariant}
          />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          )}
        </SquishyButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackSm,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.45)",
  },
  textStack: {
    flex: 1,
    marginRight: spacing.stackMd,
  },
  greeting: {
    ...typography.labelLg,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 1,
  },
  name: {
    ...typography.headlineMd,
    fontSize: 21,
    fontWeight: "700",
    color: colors.primary,
    flexShrink: 1,
  },
  waveEmoji: {
    fontSize: 20,
    lineHeight: 24,
  },
  subtitle: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.stackSm,
  },
  face: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 1.5,
  },
  pressOverlay: {
    opacity: 0.92,
  },
  streakText: {
    ...typography.labelLg,
    fontWeight: "700",
    color: colors.onTertiaryFixed,
  },
  streakTextInactive: {
    color: colors.onSurfaceVariant,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: "700",
    color: colors.onError,
    lineHeight: 12,
  },
});
