import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { useFarmJourney } from "../../context/FarmJourneyContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import type { FarmPracticeCategory } from "../../types/farmJourney";

export default function FarmJourneyScreen() {
  const { timelineEvents, farmHealth, addTimelineEvent } = useFarmJourney();
  const [modalVisible, setModalVisible] = useState(false);

  // New practice form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<FarmPracticeCategory>("soil");
  const [metricsEffect, setMetricsEffect] = useState("");

  const handleLogPractice = () => {
    if (!title.trim() || !description.trim()) return;
    addTimelineEvent({
      title: title.trim(),
      description: description.trim(),
      category,
      metricsEffect: metricsEffect.trim() || undefined,
    });
    setTitle("");
    setDescription("");
    setMetricsEffect("");
    setModalVisible(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🌱 My Sustainable Farm Journey on Tara: Farm Health Score is ${farmHealth.overallScore}/100 with ${farmHealth.activePracticesCount} living practices adopted!`,
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
        <Text style={styles.headerTitle}>My Farm Journey</Text>
        <Pressable style={styles.shareBtn} onPress={handleShare}>
          <MaterialIcons name="share" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Farm Health Banner */}
        <View style={styles.healthBanner}>
          <View style={styles.healthTopRow}>
            <View>
              <Text style={styles.healthTag}>SUSTAINABILITY INDEX</Text>
              <Text style={styles.healthScoreBig}>
                {farmHealth.overallScore}
                <Text style={styles.healthScoreMax}> / 100</Text>
              </Text>
              <Text style={styles.healthStatusText}>Thriving Living Soil</Text>
            </View>
            <View style={styles.healthIconCircle}>
              <MaterialIcons name="terrain" size={32} color={colors.primary} />
            </View>
          </View>

          {/* 4 Pillars Breakdown */}
          <View style={styles.pillarsGrid}>
            <View style={styles.pillarItem}>
              <Text style={styles.pillarScore}>
                {farmHealth.soilOrganicMatterScore}%
              </Text>
              <Text style={styles.pillarLabel}>Organic Humus</Text>
            </View>
            <View style={styles.pillarItem}>
              <Text style={styles.pillarScore}>
                {farmHealth.waterEfficiencyScore}%
              </Text>
              <Text style={styles.pillarLabel}>Water Efficiency</Text>
            </View>
            <View style={styles.pillarItem}>
              <Text style={styles.pillarScore}>
                {farmHealth.biologicalDiversityScore}%
              </Text>
              <Text style={styles.pillarLabel}>Bio-Diversity</Text>
            </View>
            <View style={styles.pillarItem}>
              <Text style={styles.pillarScore}>
                {farmHealth.cropResilienceScore}%
              </Text>
              <Text style={styles.pillarLabel}>Resilience</Text>
            </View>
          </View>
        </View>

        {/* Timeline Header */}
        <View style={styles.timelineHeaderRow}>
          <Text style={styles.timelineHeading}>Adopted Practices Timeline</Text>
          <Pressable
            style={styles.addEventBtn}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="add" size={16} color={colors.primary} />
            <Text style={styles.addEventBtnText}>Log Practice</Text>
          </Pressable>
        </View>

        {/* Timeline List */}
        <View style={styles.timelineContainer}>
          {timelineEvents.map((evt, idx) => {
            const isLast = idx === timelineEvents.length - 1;
            return (
              <View key={evt.id} style={styles.timelineNode}>
                {/* Left Line & Icon */}
                <View style={styles.timelineLeftColumn}>
                  <View style={styles.timelineDot}>
                    <MaterialIcons name="check" size={14} color={colors.white} />
                  </View>
                  {!isLast && <View style={styles.timelineLine} />}
                </View>

                {/* Right Card Content */}
                <View style={styles.timelineCard}>
                  <View style={styles.eventDateRow}>
                    <Text style={styles.eventDate}>{evt.date}</Text>
                    <View style={styles.healthDeltaPill}>
                      <Text style={styles.healthDeltaText}>
                        +{evt.healthDelta} Score
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.eventTitle}>{evt.title}</Text>
                  <Text style={styles.eventDesc}>{evt.description}</Text>

                  {evt.metricsEffect && (
                    <View style={styles.metricsEffectRow}>
                      <MaterialIcons name="trending-up" size={14} color={colors.primary} />
                      <Text style={styles.metricsEffectText}>
                        {evt.metricsEffect}
                      </Text>
                    </View>
                  )}

                  {evt.taraNote && (
                    <View style={styles.taraNoteBox}>
                      <MaterialIcons name="eco" size={14} color={colors.primary} />
                      <Text style={styles.taraNoteText}>{evt.taraNote}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Log Practice Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Log Farm Milestone</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            {/* Category selection */}
            <View style={styles.catPillRow}>
              {(["soil", "water", "organic", "pest"] as FarmPracticeCategory[]).map(
                (c) => (
                  <Pressable
                    key={c}
                    style={[
                      styles.catPillBtn,
                      category === c && styles.catPillBtnActive,
                    ]}
                    onPress={() => setCategory(c)}
                  >
                    <Text
                      style={[
                        styles.catPillBtnText,
                        category === c && styles.catPillBtnTextActive,
                      ]}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </Text>
                  </Pressable>
                )
              )}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Milestone Title (e.g. Applied Jeevamrut to plot 2)"
              placeholderTextColor={colors.outlineVariant}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, { height: 90, textAlignVertical: "top" }]}
              placeholder="Describe what you did and how your crops look..."
              placeholderTextColor={colors.outlineVariant}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <TextInput
              style={styles.input}
              placeholder="Estimated impact (e.g. Saved 2,000L water)"
              placeholderTextColor={colors.outlineVariant}
              value={metricsEffect}
              onChangeText={setMetricsEffect}
            />

            <TactileButton
              title="Record Milestone"
              icon="check-circle"
              variant="primary"
              disabled={!title.trim() || !description.trim()}
              onPress={handleLogPractice}
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
  shareBtn: {
    padding: 8,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  healthBanner: {
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
  healthTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  healthTag: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  healthScoreBig: {
    fontSize: 28,
    fontWeight: "800",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    marginTop: 2,
  },
  healthScoreMax: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  healthStatusText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
    marginTop: 2,
  },
  healthIconCircle: {
    width: 52,
    height: 52,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  pillarsGrid: {
    flexDirection: "row",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    paddingVertical: spacing.sm,
  },
  pillarItem: {
    flex: 1,
    alignItems: "center",
  },
  pillarScore: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  pillarLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    textAlign: "center",
  },
  timelineHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  timelineHeading: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  addEventBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  addEventBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  timelineContainer: {
    gap: 0,
  },
  timelineNode: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  timelineLeftColumn: {
    alignItems: "center",
    width: 24,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.outlineVariant,
    marginVertical: 4,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: 6,
    marginBottom: spacing.md,
  },
  eventDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventDate: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  healthDeltaPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  healthDeltaText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  eventDesc: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  metricsEffectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  metricsEffectText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  taraNoteBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 110, 28, 0.04)",
    borderRadius: rounded.lg,
    padding: spacing.xs,
    marginTop: 4,
  },
  taraNoteText: {
    fontSize: 11,
    color: colors.onSurface,
    fontStyle: "italic",
    flex: 1,
    lineHeight: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: rounded.xxl,
    borderTopRightRadius: rounded.xxl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  catPillRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  catPillBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
  },
  catPillBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catPillBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
  },
  catPillBtnTextActive: {
    color: colors.white,
  },
  input: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
});
