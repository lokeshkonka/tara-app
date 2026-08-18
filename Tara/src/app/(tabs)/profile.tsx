import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../auth/AuthProvider";
import { useCommunity } from "../../context/CommunityContext";
import { useFarmJourney } from "../../context/FarmJourneyContext";
import { useSettings } from "../../context/SettingsContext";
import { useUser } from "../../context/UserContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";

export default function ProfileTab() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { accountProfile } = useSettings();
  const { farmHealth, achievements } = useFarmJourney();
  const { userImpact, activePanchayat } = useCommunity();

  const unlockedBadgesCount = achievements.filter((a) => a.isUnlocked).length;
  const currentXp = user?.xp || 2450;
  const targetXp = 3000;
  const progressPct = Math.min(100, (currentXp / targetXp) * 100);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to sign out of Tara?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => signOut() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>
              {accountProfile.fullName.charAt(0)}
            </Text>
          </View>
          <Text style={styles.screenTitle}>Farmer Profile</Text>
        </View>
        <Pressable
          style={styles.settingsIconBtn}
          onPress={() => router.push("/settings")}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          <MaterialIcons name="settings" size={22} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.farmerName}>{accountProfile.fullName}</Text>
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color={colors.onSurfaceVariant} />
                <Text style={styles.farmerLocation}>
                  {accountProfile.villagePanchayat}
                </Text>
              </View>
            </View>

            <View style={styles.levelBadge}>
              <MaterialIcons name="verified" size={14} color={colors.primary} />
              <Text style={styles.levelBadgeText}>Level 12 • Soil Guardian</Text>
            </View>
          </View>

          {/* XP Progress Bar */}
          <View style={styles.xpSection}>
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>Season XP</Text>
              <Text style={styles.xpValue}>
                {currentXp} / {targetXp} XP
              </Text>
            </View>
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: `${progressPct}%` }]} />
            </View>
          </View>

          {/* Tara Companion Speech Card */}
          <View style={styles.taraDialogueBubble}>
            <View style={styles.taraIconMini}>
              <MaterialIcons name="eco" size={16} color={colors.primary} />
            </View>
            <Text style={styles.taraDialogueText}>
              "Your sustainable practices are building rich organic humus for your family and soil!"
            </Text>
          </View>
        </View>

        {/* 3 Quick Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "rgba(217, 119, 6, 0.12)" }]}>
              <MaterialIcons name="local-fire-department" size={20} color="#D97706" />
            </View>
            <Text style={styles.statVal}>19 days</Text>
            <Text style={styles.statSub}>Learning Streak</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "rgba(0, 110, 28, 0.12)" }]}>
              <MaterialIcons name="agriculture" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statVal}>{farmHealth.activePracticesCount}</Text>
            <Text style={styles.statSub}>Practices Live</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "rgba(205, 167, 33, 0.15)" }]}>
              <MaterialIcons name="emoji-events" size={20} color="#B45309" />
            </View>
            <Text style={styles.statVal}>
              {unlockedBadgesCount}/{achievements.length}
            </Text>
            <Text style={styles.statSub}>Badges Earned</Text>
          </View>
        </View>

        {/* Navigation Hub Cards */}
        <Text style={styles.sectionHeading}>Farm & Community Portals</Text>

        <Pressable
          style={styles.navCard}
          onPress={() => router.push("/profile/farm-journey")}
        >
          <View style={[styles.navIconWrap, { backgroundColor: "rgba(0, 110, 28, 0.1)" }]}>
            <MaterialIcons name="terrain" size={24} color={colors.primary} />
          </View>
          <View style={styles.navTextWrap}>
            <Text style={styles.navTitle}>My Farm Journey</Text>
            <Text style={styles.navSub}>
              Timeline of adopted practices • Farm health score {farmHealth.overallScore}/100
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
        </Pressable>

        <Pressable
          style={styles.navCard}
          onPress={() => router.push("/profile/achievements")}
        >
          <View style={[styles.navIconWrap, { backgroundColor: "rgba(205, 167, 33, 0.15)" }]}>
            <MaterialIcons name="military-tech" size={24} color="#B45309" />
          </View>
          <View style={styles.navTextWrap}>
            <Text style={styles.navTitle}>Achievements & Certificates</Text>
            <Text style={styles.navSub}>
              {unlockedBadgesCount} unlocked • Soil Guardian Master Badge
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
        </Pressable>

        <Pressable
          style={styles.navCard}
          onPress={() => router.push("/community/impact")}
        >
          <View style={[styles.navIconWrap, { backgroundColor: "rgba(2, 132, 199, 0.12)" }]}>
            <MaterialIcons name="public" size={24} color="#0284C7" />
          </View>
          <View style={styles.navTextWrap}>
            <Text style={styles.navTitle}>Community Impact Report</Text>
            <Text style={styles.navSub}>
              Rank #{userImpact.communityRank} • {userImpact.farmersHelpedCount} farmers helped
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
        </Pressable>

        <Pressable
          style={styles.navCard}
          onPress={() => router.push("/settings")}
        >
          <View style={[styles.navIconWrap, { backgroundColor: "rgba(111, 122, 107, 0.15)" }]}>
            <MaterialIcons name="tune" size={24} color={colors.onSurfaceVariant} />
          </View>
          <View style={styles.navTextWrap}>
            <Text style={styles.navTitle}>App & Farm Settings</Text>
            <Text style={styles.navSub}>
              Account, Language, Notifications, Accessibility & Security
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
        </Pressable>

        {/* Log Out Option */}
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Sign Out of Tara</Text>
        </Pressable>
      </ScrollView>
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
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  settingsIconBtn: {
    width: 38,
    height: 38,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xxl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  farmerName: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  farmerLocation: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  xpSection: {
    gap: 6,
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xpLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  xpValue: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  xpTrack: {
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: rounded.full,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.full,
  },
  taraDialogueBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 110, 28, 0.05)",
    borderRadius: rounded.lg,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    gap: spacing.xs,
  },
  taraIconMini: {
    width: 24,
    height: 24,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "center",
  },
  taraDialogueText: {
    fontSize: 12,
    color: colors.onSurface,
    fontStyle: "italic",
    flex: 1,
    lineHeight: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    gap: 2,
  },
  statIconCircle: {
    width: 34,
    height: 34,
    borderRadius: rounded.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  statVal: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  statSub: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    marginTop: spacing.xs,
  },
  navCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.md,
  },
  navIconWrap: {
    width: 44,
    height: 44,
    borderRadius: rounded.full,
    alignItems: "center",
    justifyContent: "center",
  },
  navTextWrap: {
    flex: 1,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  navSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.error,
  },
});
