import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";
import { PracticeHeaderCards } from "../../components/practice/PracticeHeaderCards";
import { CategoryCobwebGraph } from "../../components/practice/CategoryCobwebGraph";
import {
  VerticalJourneyTimeline,
  type JourneyTimelineNode,
} from "../../components/common/VerticalJourneyTimeline";
import { DUMMY_PRACTICE_DATA } from "../../data/dummy/practiceData";
import { AtmosphericGlow } from "../../components/ui/AtmosphericGlow";
import { TaraSideMessageCard } from "../../components/tara-messages/TaraSideMessageCard";
import type { LevelNodeDetail } from "../../types/learn";

export default function PracticeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [practiceData] = useState(DUMMY_PRACTICE_DATA);

  const recentDetail = practiceData.recentLessonDetail;

  // Transform recent lesson levels for VerticalJourneyTimeline
  const journeyNodes: JourneyTimelineNode[] = recentDetail.levels.map((level) => ({
    id: level.id,
    title: t(level.titleKey),
    subtitle: level.durationMinutes ? `${level.durationMinutes} min` : undefined,
    status:
      level.status === "inProgress"
        ? "active"
        : level.status === "available"
        ? "active"
        : level.status,
    xp: level.xp,
    durationMinutes: level.durationMinutes,
  }));

  const handleSelectNode = (node: JourneyTimelineNode) => {
    const matchedLevel = recentDetail.levels.find((l) => l.id === node.id);
    if (matchedLevel) {
      if (matchedLevel.status === "locked") return;
      router.push(`/learn/lessons/${recentDetail.id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) + spacing.stackLg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* --- 1. TOP HEADER & 3 STAT CARDS --- */}
        <View style={styles.headerSection}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>Practice & Master</Text>
            <Text style={styles.headerSubtitle}>
              Track your hands-on natural farming progress
            </Text>
          </View>

          {/* 3 Header Stat Cards (Completed, XP, Awards) */}
          <PracticeHeaderCards stats={practiceData.stats} />
        </View>

        <View style={styles.bodyContent}>
          {/* --- TARA MENTOR CARD --- */}
          <TaraSideMessageCard
            title="Keep up the great work!"
            message="Regular practice strengthens your soil and boosts crop yields naturally."
            expression="happy"
            showVoiceControl={true}
          />

          {/* --- 2. CATEGORY PROGRESS COB GRAPH --- */}
          <CategoryCobwebGraph categories={practiceData.cobCategories} />

          {/* --- 3. RECENT LESSON TIMELINE --- */}
          <View style={styles.recentSection}>
            <View style={styles.recentTitleRow}>
              <Text style={styles.recentSectionTitle}>Recent Lesson Timeline</Text>
              <Text style={styles.recentLessonName}>{t(recentDetail.titleKey)}</Text>
            </View>

            {/* Timeline Card Container with Atmospheric Particles */}
            <View style={styles.timelineCard}>
              <AtmosphericGlow
                size={360}
                opacity={0.55}
                tintColor="#4CAF50"
                showParticles
                particleDensity="high"
                animated
                style={styles.timelineParticles}
              />

              <VerticalJourneyTimeline
                nodes={journeyNodes}
                onSelectNode={handleSelectNode}
                activeButtonText="PRACTICE LEVEL"
                showTrophyEnd={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.stackLg,
  },
  headerSection: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackMd,
    backgroundColor: "#F4F8F3",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(190, 202, 185, 0.45)",
    gap: spacing.stackMd,
  },
  headerTitleRow: {
    gap: 3,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontWeight: "500",
  },
  bodyContent: {
    paddingHorizontal: spacing.marginMobile,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    gap: spacing.stackLg,
    marginTop: spacing.stackMd,
  },
  recentSection: {
    gap: spacing.stackSm,
  },
  recentTitleRow: {
    gap: 2,
    paddingHorizontal: 2,
  },
  recentSectionTitle: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },
  recentLessonName: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  timelineCard: {
    width: "100%",
    backgroundColor: "#F9FAF8",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 0,
    paddingVertical: spacing.stackSm,
    overflow: "hidden",
    position: "relative",
  },
  timelineParticles: {
    position: "absolute",
    top: -40,
    alignSelf: "center",
    zIndex: 0,
  },
});
