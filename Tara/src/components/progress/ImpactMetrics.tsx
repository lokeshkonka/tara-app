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
import { MaterialIcons, type MaterialIcons as MaterialIconsType } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import {
  colors,
  componentColors,
  rounded,
  spacing,
  typography,
} from "../../theme/theme";
import type { ProgressMetric } from "../../types/progress";
import { useTranslation } from "../../hooks/useTranslation";

type IconName = React.ComponentProps<typeof MaterialIconsType>["name"];

interface MetricTheme {
  icon: IconName;
  primaryColor: string;
  darkColor: string;
  bgGradient: [string, string];
  fillGradient: [string, string];
  iconBg: string;
  iconBorder: string;
}

const METRIC_THEMES: Record<string, MetricTheme> = {
  "soil-health": {
    icon: "terrain",
    primaryColor: "#D97706",
    darkColor: "#92400E",
    bgGradient: ["#FFFFFF", "#FFFBEB"],
    fillGradient: ["#FBBF24", "#D97706"],
    iconBg: "#FEF3C7",
    iconBorder: "#FDE68A",
  },
  "water-saving": {
    icon: "water-drop",
    primaryColor: "#0284C7",
    darkColor: "#075985",
    bgGradient: ["#FFFFFF", "#F0F9FF"],
    fillGradient: ["#38BDF8", "#0284C7"],
    iconBg: "#E0F2FE",
    iconBorder: "#BAE6FD",
  },
  biodiversity: {
    icon: "eco",
    primaryColor: "#16A34A",
    darkColor: "#166534",
    bgGradient: ["#FFFFFF", "#F0FDF4"],
    fillGradient: ["#4ADE80", "#16A34A"],
    iconBg: "#DCFCE7",
    iconBorder: "#BBF7D0",
  },
};

const FALLBACK_THEME: MetricTheme = {
  icon: "spa",
  primaryColor: "#16A34A",
  darkColor: "#166534",
  bgGradient: ["#FFFFFF", "#F0FDF4"],
  fillGradient: ["#4ADE80", "#16A34A"],
  iconBg: "#DCFCE7",
  iconBorder: "#BBF7D0",
};

interface ImpactMetricsProps {
  metrics: ProgressMetric[];
}

function MetricTile({
  metric,
  index,
}: {
  metric: ProgressMetric;
  index: number;
}) {
  const { t } = useTranslation();
  const theme = METRIC_THEMES[metric.id] ?? FALLBACK_THEME;

  const percentage =
    metric.percentage ??
    (metric.maxValue && metric.maxValue > 0
      ? Math.min(100, Math.round((metric.value / metric.maxValue) * 100))
      : 0);

  const fillAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animated fill
    const timer = setTimeout(() => {
      Animated.timing(fillAnim, {
        toValue: percentage,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, index * 120);

    return () => clearTimeout(timer);
  }, [percentage, index]);

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
    outputRange: [1, 0.97],
  });

  const fillWidth = fillAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tileWrapper}
      accessibilityRole="button"
      accessibilityLabel={`${t(metric.title)}: ${metric.value}${metric.unit ?? ""}`}
    >
      <Animated.View
        style={[
          styles.tile,
          {
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <LinearGradient
          colors={theme.bgGradient}
          style={StyleSheet.absoluteFill}
        />

        {/* 3D Icon Container */}
        <View
          style={[
            styles.iconBubble,
            {
              backgroundColor: theme.iconBg,
              borderColor: theme.iconBorder,
            },
          ]}
        >
          <MaterialIcons name={theme.icon} size={20} color={theme.primaryColor} />
        </View>

        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {t(metric.title)}
        </Text>

        {/* Animated Progress Track */}
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              { width: fillWidth },
            ]}
          >
            <LinearGradient
              colors={theme.fillGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        {/* Value + Tag Row */}
        <View style={styles.valueRow}>
          <Text
            style={[styles.value, { color: theme.darkColor }]}
            numberOfLines={1}
          >
            {metric.value}
            {metric.unit ? (
              <Text style={styles.unit}>{t(metric.unit)}</Text>
            ) : null}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  return (
    <View style={styles.row}>
      {metrics.map((metric, index) => (
        <MetricTile key={metric.id} metric={metric} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.stackSm,
    width: "100%",
  },

  tileWrapper: {
    flex: 1,
  },

  tile: {
    width: "100%",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackSm + 2,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.stackSm + 4,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    textAlign: "center",
    marginTop: spacing.stackSm,
  },

  track: {
    marginTop: 8,
    height: 8,
    width: "100%",
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

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: spacing.stackSm,
    gap: 2,
  },

  value: {
    ...typography.labelLg,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },

  unit: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.outline,
  },
});
