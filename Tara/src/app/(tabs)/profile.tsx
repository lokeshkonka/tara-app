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
import { useTranslation } from "../../hooks/useTranslation";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";

export default function ProfileTab() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { t } = useTranslation();
  const { accountProfile } = useSettings();
  const { farmHealth, achievements } = useFarmJourney();
  const { userImpact, activePanchayat } = useCommunity();

  const unlockedBadgesCount = achievements.filter((a) => a.isUnlocked).length;
  const currentXp = user?.xp || 2450;
  const targetXp = 3000;
  const progressPct = Math.min(100, (currentXp / targetXp) * 100);

  const handleLogout = () => {
    Alert.alert(t("profile.logout"), "Are you sure you want to sign out of Tara?", [
      { text: t("community.cancelBtn"), style: "cancel" },
      { text: t("profile.logout"), style: "destructive", onPress: () => signOut() },
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
          <Text style={styles.screenTitle}>{t("profile.title")}</Text>
        </View>

        <Pressable
          onPress={() => router.push("/settings")}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          {({ pressed }) => (
            <View
              style={[
                styles.settingsIconBtn,
                pressed && styles.settingsIconBtnPressed,
              ]}
            >
              <MaterialIcons name="settings" size={22} color={colors.primary} />
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.farmerName} numberOfLines={1}>
                {accountProfile.fullName}
              </Text>
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color={colors.primary} />
                <Text style={styles.farmerLocation} numberOfLines={1}>
                  {accountProfile.villagePanchayat}
                </Text>
              </View>
            </View>

            <View style={styles.levelBadge}>
              <MaterialIcons name="verified" size={14} color={colors.primary} />
              <Text style={styles.levelBadgeText}>{t("profile.levelBadge", { level: 12 })}</Text>
            </View>
          </View>

          {/* XP Progress Bar */}
          <View style={styles.xpSection}>
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>{t("profile.seasonXp")}</Text>
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
              "{t("profile.taraDialogue")}"
            </Text>
          </View>
        </View>

        {/* 3 Quick Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "rgba(217, 119, 6, 0.12)" }]}>
              <MaterialIcons name="local-fire-department" size={18} color="#D97706" />
            </View>
            <Text style={styles.statVal}>{t("profile.streakVal", { days: 19 })}</Text>
            <Text style={styles.statSub} numberOfLines={1}>{t("profile.streakSub")}</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "rgba(0, 110, 28, 0.12)" }]}>
              <MaterialIcons name="agriculture" size={18} color={colors.primary} />
            </View>
            <Text style={styles.statVal}>{farmHealth.activePracticesCount}</Text>
            <Text style={styles.statSub} numberOfLines={1}>{t("profile.practicesVal")}</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "rgba(205, 167, 33, 0.15)" }]}>
              <MaterialIcons name="emoji-events" size={18} color="#B45309" />
            </View>
            <Text style={styles.statVal}>
              {unlockedBadgesCount}/{achievements.length}
            </Text>
            <Text style={styles.statSub} numberOfLines={1}>{t("profile.badgesVal")}</Text>
          </View>
        </View>

        {/* Navigation Hub Cards */}
        <Text style={styles.sectionHeading}>{t("profile.portalsTitle")}</Text>

        {/* Portal 1: Farm Journey */}
        <Pressable onPress={() => router.push("/profile/farm-journey")}>
          {({ pressed }) => (
            <View
              style={[
                styles.navCard,
                pressed && styles.navCardPressed,
              ]}
            >
              <View
                style={[
                  styles.navIconWrap,
                  { backgroundColor: pressed ? colors.primary : "rgba(0, 110, 28, 0.1)" },
                ]}
              >
                <MaterialIcons
                  name="terrain"
                  size={24}
                  color={pressed ? colors.white : colors.primary}
                />
              </View>
              <View style={styles.navTextWrap}>
                <Text
                  style={[
                    styles.navTitle,
                    pressed && { color: colors.primary },
                  ]}
                  numberOfLines={1}
                >
                  {t("profile.portal.farmJourneyTitle")}
                </Text>
                <Text style={styles.navSub} numberOfLines={1}>
                  {t("profile.portal.farmJourneySub", { score: farmHealth.overallScore })}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
            </View>
          )}
        </Pressable>

        {/* Portal 2: Achievements */}
        <Pressable onPress={() => router.push("/profile/achievements")}>
          {({ pressed }) => (
            <View
              style={[
                styles.navCard,
                pressed && styles.navCardPressed,
              ]}
            >
              <View
                style={[
                  styles.navIconWrap,
                  { backgroundColor: pressed ? "#B45309" : "rgba(205, 167, 33, 0.15)" },
                ]}
              >
                <MaterialIcons
                  name="military-tech"
                  size={24}
                  color={pressed ? colors.white : "#B45309"}
                />
              </View>
              <View style={styles.navTextWrap}>
                <Text
                  style={[
                    styles.navTitle,
                    pressed && { color: "#B45309" },
                  ]}
                  numberOfLines={1}
                >
                  {t("profile.portal.achievementsTitle")}
                </Text>
                <Text style={styles.navSub} numberOfLines={1}>
                  {t("profile.portal.achievementsSub", { count: unlockedBadgesCount })}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
            </View>
          )}
        </Pressable>

        {/* Portal 3: Community Impact */}
        <Pressable onPress={() => router.push("/community/impact")}>
          {({ pressed }) => (
            <View
              style={[
                styles.navCard,
                pressed && styles.navCardPressed,
              ]}
            >
              <View
                style={[
                  styles.navIconWrap,
                  { backgroundColor: pressed ? "#0284C7" : "rgba(2, 132, 199, 0.12)" },
                ]}
              >
                <MaterialIcons
                  name="public"
                  size={24}
                  color={pressed ? colors.white : "#0284C7"}
                />
              </View>
              <View style={styles.navTextWrap}>
                <Text
                  style={[
                    styles.navTitle,
                    pressed && { color: "#0284C7" },
                  ]}
                  numberOfLines={1}
                >
                  {t("profile.portal.communityImpactTitle")}
                </Text>
                <Text style={styles.navSub} numberOfLines={1}>
                  {t("profile.portal.communityImpactSub", { rank: userImpact.communityRank, impact: userImpact.farmersHelpedCount })}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
            </View>
          )}
        </Pressable>

        {/* Portal 4: Settings */}
        <Pressable onPress={() => router.push("/settings")}>
          {({ pressed }) => (
            <View
              style={[
                styles.navCard,
                pressed && styles.navCardPressed,
              ]}
            >
              <View
                style={[
                  styles.navIconWrap,
                  { backgroundColor: pressed ? colors.onSurfaceVariant : "rgba(100, 116, 139, 0.12)" },
                ]}
              >
                <MaterialIcons
                  name="settings"
                  size={24}
                  color={pressed ? colors.white : colors.onSurfaceVariant}
                />
              </View>
              <View style={styles.navTextWrap}>
                <Text
                  style={[
                    styles.navTitle,
                    pressed && { color: colors.onSurface },
                  ]}
                  numberOfLines={1}
                >
                  {t("profile.portal.settingsTitle")}
                </Text>
                <Text style={styles.navSub} numberOfLines={1}>
                  {t("profile.portal.settingsSub")}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
            </View>
          )}
        </Pressable>

        {/* Portal 5: Language Switcher */}
        <Pressable onPress={() => router.push("/settings/language")}>
          {({ pressed }) => (
            <View
              style={[
                styles.navCard,
                styles.languageCardBorder,
                pressed && styles.languageCardPressed,
              ]}
            >
              <View
                style={[
                  styles.navIconWrap,
                  { backgroundColor: pressed ? "#2563EB" : "rgba(37, 99, 235, 0.12)" },
                ]}
              >
                <MaterialIcons
                  name="translate"
                  size={24}
                  color={pressed ? colors.white : "#2563EB"}
                />
              </View>
              <View style={styles.navTextWrap}>
                <View style={styles.langHeaderRow}>
                  <Text
                    style={[
                      styles.navTitle,
                      pressed && { color: "#2563EB" },
                    ]}
                    numberOfLines={1}
                  >
                    {t("profile.portal.languageTitle")}
                  </Text>
                  <View style={styles.currentLangBadge}>
                    <Text style={styles.currentLangBadgeText}>
                      {user?.language ? user.language.toUpperCase() : "EN"}
                    </Text>
                  </View>
                </View>
                <Text style={styles.navSub} numberOfLines={1}>
                  {t("profile.portal.languageSub")}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
            </View>
          )}
        </Pressable>

        {/* Log Out Option */}
        <Pressable onPress={handleLogout}>
          {({ pressed }) => (
            <View
              style={[
                styles.logoutBtn,
                pressed && styles.logoutBtnPressed,
              ]}
            >
              <MaterialIcons name="logout" size={20} color={colors.white} />
              <Text style={styles.logoutText}>{t("profile.logout")}</Text>
            </View>
          )}
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
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsIconBtnPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2 }],
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroTextContainer: {
    flex: 1,
    marginRight: spacing.xs,
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
    borderWidth: 1,
    borderColor: "rgba(0, 110, 28, 0.15)",
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
    alignItems: "stretch",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 2.5,
    borderBottomColor: componentColors.cardEdge,
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
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    textAlign: "center",
  },
  statSub: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 2,
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
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  navCardPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2.5 }],
    backgroundColor: "rgba(0, 110, 28, 0.02)",
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
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  navSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  languageCardBorder: {
    borderColor: componentColors.cardBorder,
    borderBottomColor: componentColors.cardEdge,
  },
  languageCardPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2.5 }],
    backgroundColor: "rgba(37, 99, 235, 0.04)",
  },
  langHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentLangBadge: {
    backgroundColor: "rgba(37, 99, 235, 0.12)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "rgba(37, 99, 235, 0.25)",
  },
  currentLangBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#2563EB",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: "#B91C1C",
    borderBottomWidth: 3.5,
    borderBottomColor: "#7F1D1D",
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutBtnPressed: {
    borderBottomWidth: 1,
    transform: [{ translateY: 2.5 }],
    backgroundColor: "#DC2626",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
  },
});
