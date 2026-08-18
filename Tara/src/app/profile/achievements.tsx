import React, { useState } from "react";
import {
  Modal,
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
import { useFarmJourney } from "../../context/FarmJourneyContext";
import { useSettings } from "../../context/SettingsContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import type { AchievementBadge } from "../../types/farmJourney";

export default function AchievementsScreen() {
  const { achievements } = useFarmJourney();
  const { accountProfile } = useSettings();
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);

  const unlockedList = achievements.filter((a) => a.isUnlocked);
  const inProgressList = achievements.filter((a) => !a.isUnlocked);

  const handleShareCertificate = async () => {
    try {
      await Share.share({
        message: `🏆 Certified Soil Guardian: ${accountProfile.fullName} has successfully mastered living soil management and earned the official Tara Sustainable Farming Badge!`,
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
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Certificate Hero Box */}
        <View style={styles.certBox}>
          <View style={styles.certHeader}>
            <MaterialIcons name="verified" size={24} color={colors.primary} />
            <Text style={styles.certTag}>OFFICIAL CERTIFICATION</Text>
          </View>
          <Text style={styles.certTitle}>Master Soil Guardian</Text>
          <Text style={styles.certName}>Awarded to {accountProfile.fullName}</Text>
          <Text style={styles.certDesc}>
            For completing all 5 foundational levels of Living Soil Ecosystems, Zero-Tillage Residue Retention, and Biometric AI Oral Viva-Voce.
          </Text>
          <View style={styles.certSealRow}>
            <View style={styles.certSeal}>
              <MaterialIcons name="eco" size={20} color="#cda721" />
              <Text style={styles.certSealText}>TARA VERIFIED</Text>
            </View>
            <Pressable
              style={styles.shareCertBtn}
              onPress={handleShareCertificate}
            >
              <MaterialIcons name="share" size={16} color={colors.primary} />
              <Text style={styles.shareCertBtnText}>Share Certificate</Text>
            </Pressable>
          </View>
        </View>

        {/* Section Heading */}
        <Text style={styles.sectionTitle}>
          Unlocked Badges ({unlockedList.length})
        </Text>

        {/* 2-column Grid of Unlocked Badges */}
        <View style={styles.badgeGrid}>
          {unlockedList.map((b) => (
            <Pressable
              key={b.id}
              style={styles.badgeCard}
              onPress={() => setSelectedBadge(b)}
            >
              <View style={styles.unlockedCheckBadge}>
                <MaterialIcons name="check" size={12} color={colors.white} />
              </View>

              <View style={styles.badgeIconCircle}>
                <MaterialIcons
                  name={(b.iconName as any) || "emoji-events"}
                  size={32}
                  color={colors.primary}
                />
              </View>

              <Text style={styles.badgeCardTitle}>{b.title}</Text>
              <Text style={styles.badgeCardDesc} numberOfLines={2}>
                {b.description}
              </Text>

              <View style={styles.xpPill}>
                <Text style={styles.xpPillText}>+{b.xpReward} XP</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* In Progress Badges */}
        {inProgressList.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              In Progress ({inProgressList.length})
            </Text>
            <View style={styles.badgeGrid}>
              {inProgressList.map((b) => {
                const pct = Math.min(100, Math.round((b.progress / b.maxProgress) * 100));
                return (
                  <Pressable
                    key={b.id}
                    style={[styles.badgeCard, styles.badgeCardLocked]}
                    onPress={() => setSelectedBadge(b)}
                  >
                    <View style={styles.badgeIconCircleLocked}>
                      <MaterialIcons
                        name={(b.iconName as any) || "lock"}
                        size={28}
                        color={colors.onSurfaceVariant}
                      />
                    </View>

                    <Text style={styles.badgeCardTitle}>{b.title}</Text>
                    <Text style={styles.badgeCardDesc} numberOfLines={2}>
                      {b.description}
                    </Text>

                    {/* Progress track */}
                    <View style={styles.lockProgressTrack}>
                      <View
                        style={[styles.lockProgressFill, { width: `${pct}%` }]}
                      />
                    </View>
                    <Text style={styles.progressCounterText}>
                      {b.progress}/{b.maxProgress} ({pct}%)
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      {/* Badge Detail Modal */}
      <Modal
        visible={!!selectedBadge}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setSelectedBadge(null)}
        >
          <Pressable style={styles.detailCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.detailIconCircle}>
              <MaterialIcons
                name={(selectedBadge?.iconName as any) || "emoji-events"}
                size={44}
                color={selectedBadge?.isUnlocked ? colors.primary : colors.onSurfaceVariant}
              />
            </View>

            <Text style={styles.detailTitle}>{selectedBadge?.title}</Text>
            <Text style={styles.detailDesc}>{selectedBadge?.description}</Text>

            <View style={styles.detailStatusBox}>
              <Text style={styles.detailStatusText}>
                {selectedBadge?.isUnlocked
                  ? `Unlocked on ${selectedBadge.unlockedDate || "Recent"}`
                  : `Progress: ${selectedBadge?.progress}/${selectedBadge?.maxProgress}`}
              </Text>
              <Text style={styles.detailXpReward}>
                Reward: +{selectedBadge?.xpReward} Season XP
              </Text>
            </View>

            <TactileButton
              title="Close"
              variant="secondary"
              onPress={() => setSelectedBadge(null)}
            />
          </Pressable>
        </Pressable>
      </Modal>
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
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  certBox: {
    backgroundColor: "#FFFDF5",
    borderRadius: rounded.xxl,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: "rgba(205, 167, 33, 0.4)",
    gap: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  certHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  certTag: {
    fontSize: 11,
    fontWeight: "700",
    color: "#B45309",
    letterSpacing: 0.5,
  },
  certTitle: {
    fontSize: 20,
    fontWeight: "800",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  certName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  certDesc: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 17,
  },
  certSealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(205, 167, 33, 0.2)",
  },
  certSeal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  certSealText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B45309",
  },
  shareCertBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  shareCertBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
    marginTop: spacing.xs,
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  badgeCard: {
    width: "48%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    gap: 4,
    position: "relative",
  },
  badgeCardLocked: {
    backgroundColor: colors.surfaceContainerLow,
    opacity: 0.85,
  },
  unlockedCheckBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: rounded.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeIconCircle: {
    width: 56,
    height: 56,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  badgeIconCircleLocked: {
    width: 56,
    height: 56,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  badgeCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
    textAlign: "center",
  },
  badgeCardDesc: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 15,
  },
  xpPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
    marginTop: 4,
  },
  xpPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  lockProgressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: rounded.full,
    overflow: "hidden",
    marginTop: 6,
  },
  lockProgressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  progressCounterText: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  detailCard: {
    width: "100%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xxl,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
  },
  detailIconCircle: {
    width: 72,
    height: 72,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  detailDesc: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 18,
  },
  detailStatusBox: {
    width: "100%",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: spacing.sm,
    alignItems: "center",
    gap: 2,
    marginVertical: spacing.xs,
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
  },
  detailXpReward: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
});
