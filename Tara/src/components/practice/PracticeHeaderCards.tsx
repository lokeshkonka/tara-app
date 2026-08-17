import React, { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";
import type { PracticeHeaderStats } from "../../types/practice";

export interface PracticeHeaderCardsProps {
  stats: PracticeHeaderStats;
  onCardPress?: (cardId: "completed" | "xp" | "awards") => void;
}

interface TactileStatCardProps {
  children: React.ReactNode;
  borderColor: string;
  borderBottomColor: string;
  gradientColors: [string, string];
  onPress?: () => void;
}

/**
 * Reusable Tactile Stat Card with 3D Squishy Press Physics on Click.
 */
function TactileStatCard({
  children,
  borderColor,
  borderBottomColor,
  gradientColors,
  onPress,
}: TactileStatCardProps) {
  const pressAnim = useRef(new Animated.Value(0)).current;

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
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      tension: 250,
      friction: 16,
      useNativeDriver: false,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
  });
  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });
  const bottomWidth = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [3.5, 1],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.cardPressable}
    >
      <Animated.View
        style={[
          styles.statCard,
          {
            borderColor,
            borderBottomColor,
            borderBottomWidth: bottomWidth,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <LinearGradient colors={gradientColors} style={StyleSheet.absoluteFill} />
        {children}
      </Animated.View>
    </Pressable>
  );
}

/**
 * PracticeHeaderCards Component.
 * Features 3D Tactile Stat Cards with Streak-style extruded 3D icon discs
 * and interactive 3D squishy press physics on click/tap.
 */
export function PracticeHeaderCards({ stats, onCardPress }: PracticeHeaderCardsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.cardsRow}>
      {/* Card 1: Lessons Completed */}
      <TactileStatCard
        borderColor="#A8DEAC"
        borderBottomColor="#86C58B"
        gradientColors={["#FFFFFF", "#F7FAF5"]}
        onPress={() => onCardPress?.("completed")}
      >
        <View style={[styles.streakIconDisc, styles.greenStreakDisc]}>
          <MaterialIcons name="school" size={20} color="#15803D" />
        </View>

        <Text style={styles.statValue}>{stats.totalLessonsCompleted}</Text>
        <Text style={styles.statLabel}>Lessons Done</Text>
      </TactileStatCard>

      {/* Card 2: Total XP */}
      <TactileStatCard
        borderColor="#FDE68A"
        borderBottomColor="#F59E0B"
        gradientColors={["#FFFFFF", "#FFFDF5"]}
        onPress={() => onCardPress?.("xp")}
      >
        <View style={[styles.streakIconDisc, styles.amberStreakDisc]}>
          <MaterialIcons name="star" size={22} color="#D97706" />
        </View>

        <Text style={styles.statValue}>{stats.totalXp}</Text>
        <Text style={styles.statLabel}>Total XP</Text>
      </TactileStatCard>

      {/* Card 3: Total Awards */}
      <TactileStatCard
        borderColor="#DDD6FE"
        borderBottomColor="#C4B5FD"
        gradientColors={["#FFFFFF", "#FAF7FF"]}
        onPress={() => onCardPress?.("awards")}
      >
        <View style={[styles.streakIconDisc, styles.purpleStreakDisc]}>
          <MaterialIcons name="emoji-events" size={20} color="#7C3AED" />
        </View>

        <Text style={styles.statValue}>{stats.totalAwards}</Text>
        <Text style={styles.statLabel}>Awards</Text>
      </TactileStatCard>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
  },
  cardPressable: {
    flex: 1,
  },
  statCard: {
    width: "100%",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 4,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  /* Streak-style 3D Extruded Icon Disc */
  streakIconDisc: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  greenStreakDisc: {
    backgroundColor: "#DCFCE7",
    borderColor: "#BBF7D0",
    borderBottomColor: "#86C58B",
  },
  amberStreakDisc: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FDE68A",
    borderBottomColor: "#F59E0B",
  },
  purpleStreakDisc: {
    backgroundColor: "#F3E8FF",
    borderColor: "#DDD6FE",
    borderBottomColor: "#C4B5FD",
  },

  statValue: {
    ...typography.headlineMd,
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },
  statLabel: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
});
