import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useCommunity } from "../../context/CommunityContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";

type Timeframe = "weekly" | "monthly" | "allTime";

export default function LeaderboardScreen() {
  const { leaderboard, activePanchayat } = useCommunity();
  const [timeframe, setTimeframe] = useState<Timeframe>("weekly");
  const [scope, setScope] = useState<"panchayat" | "regional">("panchayat");

  const top3 = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);
  const currentUser = leaderboard.find((f) => f.isCurrentUser) ?? leaderboard[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Community Leaderboard</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Scope Selector */}
      <View style={styles.scopeRow}>
        <Pressable
          style={[
            styles.scopePill,
            scope === "panchayat" && styles.scopePillActive,
          ]}
          onPress={() => setScope("panchayat")}
        >
          <Text
            style={[
              styles.scopePillText,
              scope === "panchayat" && styles.scopePillTextActive,
            ]}
          >
            {activePanchayat.name}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.scopePill,
            scope === "regional" && styles.scopePillActive,
          ]}
          onPress={() => setScope("regional")}
        >
          <Text
            style={[
              styles.scopePillText,
              scope === "regional" && styles.scopePillTextActive,
            ]}
          >
            Maharashtra State
          </Text>
        </Pressable>
      </View>

      {/* Timeframe Tabs */}
      <View style={styles.timeframeRow}>
        {(
          [
            { id: "weekly", label: "This Week" },
            { id: "monthly", label: "This Month" },
            { id: "allTime", label: "All Time" },
          ] as const
        ).map((tf) => (
          <Pressable
            key={tf.id}
            style={[
              styles.timeframeTab,
              timeframe === tf.id && styles.timeframeTabActive,
            ]}
            onPress={() => setTimeframe(tf.id)}
          >
            <Text
              style={[
                styles.timeframeText,
                timeframe === tf.id && styles.timeframeTextActive,
              ]}
            >
              {tf.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top 3 Podium Visual */}
        <View style={styles.podiumContainer}>
          {/* 2nd Place */}
          {top3[1] && (
            <View style={[styles.podiumCol, { marginTop: 24 }]}>
              <View style={styles.podiumMedalSilver}>
                <Text style={styles.medalText}>2</Text>
              </View>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumAvatarInitial}>
                  {top3[1].name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>
                {top3[1].name}
              </Text>
              <Text style={styles.podiumXp}>{top3[1].xp} XP</Text>
              <View style={[styles.podiumBlock, { height: 60, backgroundColor: "#E0E7FF" }]} />
            </View>
          )}

          {/* 1st Place */}
          {top3[0] && (
            <View style={styles.podiumCol}>
              <View style={styles.podiumMedalGold}>
                <MaterialIcons name="emoji-events" size={16} color="#B45309" />
              </View>
              <View style={[styles.podiumAvatar, styles.podiumAvatarGold]}>
                <Text style={styles.podiumAvatarInitial}>
                  {top3[0].name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>
                {top3[0].name}
              </Text>
              <Text style={[styles.podiumXp, { color: colors.primary }]}>
                {top3[0].xp} XP
              </Text>
              <View style={[styles.podiumBlock, { height: 84, backgroundColor: "#FEF3C7" }]} />
            </View>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <View style={[styles.podiumCol, { marginTop: 36 }]}>
              <View style={styles.podiumMedalBronze}>
                <Text style={styles.medalText}>3</Text>
              </View>
              <View style={styles.podiumAvatar}>
                <Text style={styles.podiumAvatarInitial}>
                  {top3[2].name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>
                {top3[2].name}
              </Text>
              <Text style={styles.podiumXp}>{top3[2].xp} XP</Text>
              <View style={[styles.podiumBlock, { height: 48, backgroundColor: "#FEE2E2" }]} />
            </View>
          )}
        </View>

        {/* Ranked List */}
        <View style={styles.listSection}>
          <Text style={styles.listHeading}>Rankings</Text>
          {remaining.map((item) => (
            <View
              key={item.id}
              style={[
                styles.rankItem,
                item.isCurrentUser && styles.rankItemCurrent,
              ]}
            >
              <Text
                style={[
                  styles.rankNumber,
                  item.isCurrentUser && { color: colors.primary },
                ]}
              >
                #{item.rank}
              </Text>

              <View style={styles.itemAvatar}>
                <Text style={styles.itemAvatarInitial}>
                  {item.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>
                  {item.name} {item.isCurrentUser && "(You)"}
                </Text>
                <View style={styles.itemSubRow}>
                  <MaterialIcons name="local-fire-department" size={12} color="#D97706" />
                  <Text style={styles.itemStreak}>{item.streakDays}d streak</Text>
                  <Text style={styles.itemBadge}>• {item.badge}</Text>
                </View>
              </View>

              <View style={styles.itemXpWrap}>
                <Text style={styles.itemXp}>{item.xp}</Text>
                <Text style={styles.itemXpLabel}>XP</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Current User Rank Bar */}
      <View style={styles.stickyUserBar}>
        <View style={styles.stickyLeft}>
          <View style={styles.userRankBadge}>
            <Text style={styles.userRankBadgeText}>#{currentUser.rank}</Text>
          </View>
          <View>
            <Text style={styles.stickyUserName}>{currentUser.name}</Text>
            <Text style={styles.stickyUserSub}>
              {currentUser.badge} • Lvl {currentUser.level}
            </Text>
          </View>
        </View>
        <View style={styles.stickyRight}>
          <Text style={styles.stickyUserXp}>{currentUser.xp} XP</Text>
          <Text style={styles.stickyUserNext}>+650 XP to top 10</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
  },
  backBtn: {
    padding: 6,
    borderRadius: rounded.full,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  scopeRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  scopePill: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
  },
  scopePillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  scopePillText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
  },
  scopePillTextActive: {
    color: colors.white,
  },
  timeframeRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
  },
  timeframeTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  timeframeTabActive: {
    borderBottomColor: colors.primary,
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  timeframeTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 90,
    gap: spacing.md,
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  podiumCol: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  podiumMedalGold: {
    width: 26,
    height: 26,
    borderRadius: rounded.full,
    backgroundColor: "#FDE68A",
    alignItems: "center",
    justifyContent: "center",
  },
  podiumMedalSilver: {
    width: 22,
    height: 22,
    borderRadius: rounded.full,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  podiumMedalBronze: {
    width: 22,
    height: 22,
    borderRadius: rounded.full,
    backgroundColor: "#FFEDD5",
    alignItems: "center",
    justifyContent: "center",
  },
  medalText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurface,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  podiumAvatarGold: {
    width: 56,
    height: 56,
    borderColor: "#D97706",
    borderWidth: 3,
  },
  podiumAvatarInitial: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurface,
    textAlign: "center",
  },
  podiumXp: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  podiumBlock: {
    width: "100%",
    borderTopLeftRadius: rounded.lg,
    borderTopRightRadius: rounded.lg,
  },
  listSection: {
    gap: spacing.xs,
  },
  listHeading: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    marginBottom: 4,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.sm,
  },
  rankItemCurrent: {
    borderColor: colors.primary,
    backgroundColor: "rgba(0, 110, 28, 0.04)",
  },
  rankNumber: {
    width: 32,
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  itemAvatar: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  itemAvatarInitial: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
  },
  itemSubRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 1,
  },
  itemStreak: {
    fontSize: 11,
    color: "#B45309",
    fontWeight: "600",
  },
  itemBadge: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  itemXpWrap: {
    alignItems: "flex-end",
  },
  itemXp: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
  },
  itemXpLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  stickyUserBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(190, 202, 185, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  stickyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  userRankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
    backgroundColor: colors.primary,
  },
  userRankBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  stickyUserName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
  },
  stickyUserSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  stickyRight: {
    alignItems: "flex-end",
  },
  stickyUserXp: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
  },
  stickyUserNext: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
});
