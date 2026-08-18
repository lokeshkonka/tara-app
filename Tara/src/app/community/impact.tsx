import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { useCommunity } from "../../context/CommunityContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";

export default function CommunityImpactScreen() {
  const { userImpact, panchayatImpact, activePanchayat } = useCommunity();

  const handleShareImpact = async () => {
    try {
      await Share.share({
        message: `🌱 My Sustainable Farming Impact on Tara App: Ranked #${userImpact.communityRank} in ${activePanchayat.name}. Together we saved ${panchayatImpact.totalWaterSavedLiters.toLocaleString()}L of water and restored ${panchayatImpact.totalSoilProtectedAcres} acres of soil!`,
      });
    } catch {
      // ignore
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Community Impact</Text>
        <Pressable style={styles.shareHeaderBtn} onPress={handleShareImpact}>
          <MaterialIcons name="share" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.taraHeroAvatar}>
            <MaterialIcons name="workspace-premium" size={32} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Your Contribution Matters</Text>
          <Text style={styles.heroSub}>
            See how your sustainable actions are inspiring fellow farmers in {activePanchayat.name}.
          </Text>
        </View>

        {/* Reputation & Rank Card */}
        <View style={styles.rankCard}>
          <View style={styles.rankHeader}>
            <View>
              <Text style={styles.rankTag}>COMMUNITY RANK</Text>
              <View style={styles.rankValRow}>
                <Text style={styles.rankLarge}>#{userImpact.communityRank}</Text>
                <Text style={styles.rankPanchayat}>
                  in {activePanchayat.name}
                </Text>
              </View>
            </View>
            <View style={styles.badgeBox}>
              <View style={styles.badgeIconCircle}>
                <MaterialIcons name="local-police" size={24} color="#cda721" />
              </View>
              <Text style={styles.badgeBoxTitle}>
                {userImpact.reputationTitle}
              </Text>
            </View>
          </View>

          {/* Progress Bar to Community Mentor */}
          <View style={styles.progressWrap}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabelLeft}>Progress to Mentor</Text>
              <Text style={styles.progressLabelRight}>
                {userImpact.progressToMentorPct}%
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${userImpact.progressToMentorPct}%` },
                ]}
              />
            </View>
            <Text style={styles.progressHelper}>
              Only {100 - userImpact.progressToMentorPct}% left to unlock official
              'Community Mentor' certification.
            </Text>
          </View>
        </View>

        {/* Personal Impact Stats Grid */}
        <Text style={styles.sectionHeading}>Your Direct Influence</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "rgba(0, 110, 28, 0.12)" }]}>
              <MaterialIcons name="eco" size={22} color={colors.primary} />
            </View>
            <Text style={styles.statNumber}>
              {userImpact.practicesSharedCount}
            </Text>
            <Text style={styles.statLabel}>Practices Shared</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "rgba(2, 132, 199, 0.12)" }]}>
              <MaterialIcons name="water-drop" size={22} color="#0284C7" />
            </View>
            <Text style={styles.statNumber}>
              {(userImpact.waterSavedLiters / 1000).toFixed(0)}k L
            </Text>
            <Text style={styles.statLabel}>Water Conserved</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "rgba(205, 167, 33, 0.15)" }]}>
              <MaterialIcons name="compost" size={22} color="#B45309" />
            </View>
            <Text style={styles.statNumber}>
              {userImpact.fertilizerReducedKg} kg
            </Text>
            <Text style={styles.statLabel}>Chemicals Reduced</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "rgba(136, 217, 130, 0.2)" }]}>
              <MaterialIcons name="groups" size={22} color={colors.secondary} />
            </View>
            <Text style={styles.statNumber}>
              {userImpact.farmersHelpedCount}
            </Text>
            <Text style={styles.statLabel}>Farmers Helped</Text>
          </View>
        </View>

        {/* Collective Panchayat Impact Banner */}
        <Text style={styles.sectionHeading}>Panchayat Collective Impact</Text>
        <View style={styles.panchayatBanner}>
          <View style={styles.panchayatTopRow}>
            <MaterialIcons name="public" size={24} color={colors.primary} />
            <Text style={styles.panchayatBannerTitle}>
              {activePanchayat.name} Green Milestones
            </Text>
          </View>

          <View style={styles.panchayatMilestonesList}>
            <View style={styles.panchayatMilestone}>
              <Text style={styles.milestoneBigVal}>
                {(panchayatImpact.totalWaterSavedLiters / 1000000).toFixed(1)}M Liters
              </Text>
              <Text style={styles.milestoneSub}>
                Groundwater conserved through drip & mulching
              </Text>
            </View>

            <View style={styles.panchayatMilestone}>
              <Text style={styles.milestoneBigVal}>
                {(panchayatImpact.totalFertilizerReducedKg / 1000).toFixed(1)} Tons
              </Text>
              <Text style={styles.milestoneSub}>
                Synthetic nitrogen fertilizers replaced by bio-humus
              </Text>
            </View>

            <View style={styles.panchayatMilestone}>
              <Text style={styles.milestoneBigVal}>
                {panchayatImpact.totalSoilProtectedAcres} Acres
              </Text>
              <Text style={styles.milestoneSub}>
                Living organic topsoil shielded from erosion
              </Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TactileButton
          title="Share My Impact Report"
          icon="share"
          variant="primary"
          onPress={handleShareImpact}
        />
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
  shareHeaderBtn: {
    padding: 8,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  heroSection: {
    alignItems: "center",
    textAlign: "center",
    gap: 4,
    paddingVertical: spacing.xs,
  },
  taraHeroAvatar: {
    width: 54,
    height: 54,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  heroSub: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: spacing.md,
  },
  rankCard: {
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
  rankHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rankTag: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  rankValRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 2,
  },
  rankLarge: {
    fontSize: 26,
    fontWeight: "800",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  rankPanchayat: {
    fontSize: 13,
    color: colors.onSurface,
  },
  badgeBox: {
    alignItems: "center",
    gap: 2,
  },
  badgeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: rounded.full,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeBoxTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#B45309",
  },
  progressWrap: {
    gap: 6,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelLeft: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
  },
  progressLabelRight: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: rounded.full,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.full,
  },
  progressHelper: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textAlign: "right",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    marginTop: spacing.xs,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  statCard: {
    width: "48%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    gap: 4,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: rounded.full,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  statLabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  panchayatBanner: {
    backgroundColor: "rgba(0, 110, 28, 0.05)",
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(0, 110, 28, 0.2)",
    gap: spacing.sm,
  },
  panchayatTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  panchayatBannerTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  panchayatMilestonesList: {
    gap: spacing.sm,
    paddingTop: 4,
  },
  panchayatMilestone: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  milestoneBigVal: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  milestoneSub: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
