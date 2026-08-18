import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
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
import { useLearn } from "../../context/LearnContext";
import { useUser } from "../../context/UserContext";

const WEEK_DAYS = [
  { day: "Mon", minutes: 15, active: true },
  { day: "Tue", minutes: 25, active: true },
  { day: "Wed", minutes: 20, active: true },
  { day: "Thu", minutes: 30, active: true },
  { day: "Fri", minutes: 18, active: true },
  { day: "Sat", minutes: 40, active: true },
  { day: "Sun", minutes: 22, active: true, isToday: true },
];

const SOIL_PILLARS = [
  { name: "Organic Humus", progress: 85, color: "#1B5E20", icon: "compost" },
  { name: "Living Microbes", progress: 92, color: "#006e1c", icon: "eco" },
  { name: "Water Retention", progress: 78, color: "#0284C7", icon: "water-drop" },
  { name: "Pest Resistance", progress: 70, color: "#D97706", icon: "bug-report" },
];

export default function PracticeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUser();
  const { lessons, getLessonDetail, summary } = useLearn();

  const [practiceData] = useState(DUMMY_PRACTICE_DATA);
  const [selectedLessonDetail, setSelectedLessonDetail] = useState(
    practiceData.recentLessonDetail
  );

  // Fetch actual lesson detail from LearnContext if available
  useEffect(() => {
    let isMounted = true;
    if (lessons.length > 0) {
      getLessonDetail(lessons[0].id).then((detail) => {
        if (isMounted && detail && detail.levels.length > 0) {
          setSelectedLessonDetail(detail);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [lessons, getLessonDetail]);

  // Transform recent lesson levels for VerticalJourneyTimeline
  const journeyNodes: JourneyTimelineNode[] = useMemo(() => {
    return selectedLessonDetail.levels.map((level) => ({
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
  }, [selectedLessonDetail, t]);

  // When tapping any level in the timeline, open that interactive level directly
  const handleSelectNode = (node: JourneyTimelineNode) => {
    if (node.status === "locked") {
      Alert.alert(
        "Level Locked",
        "Complete the preceding sustainable farming levels to unlock this practice activity."
      );
      return;
    }

    // Launch the level directly in interactive play mode
    router.push({
      pathname: "/learn/level/[levelId]",
      params: { levelId: node.id },
    });
  };

  const totalXp = user?.xp || practiceData.stats.totalXp;

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
            <Text style={styles.headerTitle}>Your Progress</Text>
            <Text style={styles.headerSubtitle}>
              Track your hands-on natural farming mastery & daily practices
            </Text>
          </View>

          {/* 3 Header Stat Cards (Completed, XP, Awards) */}
          <PracticeHeaderCards
            stats={{
              totalLessonsCompleted: practiceData.stats.totalLessonsCompleted,
              totalXp: totalXp,
              totalAwards: practiceData.stats.totalAwards,
            }}
          />
        </View>

        <View style={styles.bodyContent}>
          {/* --- REAL TARA SIDE MESSAGE CARD: MOTIVATION --- */}
          <TaraSideMessageCard
            title="Consistent progress nurtures living soil!"
            message="Your regular mulching and bio-fertilizer practices have increased soil biological diversity by 14% this month."
            expression="happy"
            showVoiceControl={true}
          />

          {/* --- 2. WEEKLY PRACTICE & CONSISTENCY BAR GRAPH --- */}
          <View style={styles.graphCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.cardTitle}>Weekly Activity & Consistency</Text>
                <Text style={styles.cardSubtitle}>
                  19-Day Learning & Field Practice Streak 🔥
                </Text>
              </View>
            </View>

            {/* Bar chart */}
            <View style={styles.barChartContainer}>
              {WEEK_DAYS.map((w, idx) => {
                const maxMins = 45;
                const barHeight = Math.max(12, (w.minutes / maxMins) * 80);
                return (
                  <View key={idx} style={styles.barColumn}>
                    <Text style={styles.barMinutesText}>{w.minutes}m</Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: barHeight,
                            backgroundColor: w.isToday
                              ? colors.primary
                              : "#81C784",
                          },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.barDayLabel,
                        w.isToday && styles.barDayLabelToday,
                      ]}
                    >
                      {w.day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* --- 3. CATEGORY PROGRESS COB (RADAR GRAPH) --- */}
          <CategoryCobwebGraph categories={practiceData.cobCategories} />

          {/* --- 4. SOIL HEALTH & BIO MASTERY BREAKDOWN --- */}
          <View style={styles.graphCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.cardTitle}>Ecosystem Health Metrics</Text>
                <Text style={styles.cardSubtitle}>
                  Biological vitality breakdown of your farm
                </Text>
              </View>
              <View style={styles.scorePill}>
                <Text style={styles.scorePillText}>88 / 100</Text>
              </View>
            </View>

            <View style={styles.pillarsList}>
              {SOIL_PILLARS.map((p, idx) => (
                <View key={idx} style={styles.pillarRow}>
                  <View style={styles.pillarLeft}>
                    <View
                      style={[
                        styles.pillarIconWrap,
                        { backgroundColor: `${p.color}18` },
                      ]}
                    >
                      <MaterialIcons
                        name={p.icon as any}
                        size={16}
                        color={p.color}
                      />
                    </View>
                    <Text style={styles.pillarName}>{p.name}</Text>
                  </View>

                  <View style={styles.pillarProgressWrapper}>
                    <View style={styles.pillarProgressTrack}>
                      <View
                        style={[
                          styles.pillarProgressFill,
                          {
                            width: `${p.progress}%`,
                            backgroundColor: p.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.pillarPercentText}>{p.progress}%</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* --- TARA COACHING FOR ACTIVE PRACTICE LEVEL --- */}
          <TaraSideMessageCard
            title="Next Step: Living Soil Level"
            message={`You're practicing ${t(selectedLessonDetail.titleKey)}. Complete this interactive practice to earn +40 XP and unlock advanced soil stewardship.`}
            expression="thinking"
            showVoiceControl={true}
          />

          {/* --- 5. RECENT LESSON TIMELINE --- */}
          <View style={styles.recentSection}>
            <View style={styles.recentTitleRow}>
              <View>
                <Text style={styles.recentSectionTitle}>
                  Recent Practice Pathway
                </Text>
                <Text style={styles.recentLessonName}>
                  {t(selectedLessonDetail.titleKey)}
                </Text>
              </View>

              <Pressable
                style={styles.switchLessonBtn}
                onPress={() => router.push("/learn")}
              >
                <Text style={styles.switchLessonText}>All Lessons</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={14}
                  color={colors.primary}
                />
              </Pressable>
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
    fontSize: 13.5,
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
  graphCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    gap: spacing.md,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: typography.fontFamily.bold,
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    fontWeight: "500",
  },
  weeklySummaryPill: {
    backgroundColor: "rgba(0, 110, 28, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  weeklySummaryText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  scorePill: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  scorePillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
  },
  barChartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: spacing.xs,
    paddingHorizontal: 4,
    height: 120,
  },
  barColumn: {
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  barMinutesText: {
    fontSize: 9.5,
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
  barTrack: {
    width: 22,
    height: 80,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.sm,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: rounded.sm,
  },
  barDayLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  barDayLabelToday: {
    color: colors.primary,
    fontWeight: "800",
  },
  pillarsList: {
    gap: spacing.sm,
  },
  pillarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pillarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    width: 130,
  },
  pillarIconWrap: {
    width: 26,
    height: 26,
    borderRadius: rounded.full,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarName: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.onSurface,
  },
  pillarProgressWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pillarProgressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.full,
    overflow: "hidden",
  },
  pillarProgressFill: {
    height: "100%",
    borderRadius: rounded.full,
  },
  pillarPercentText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurface,
    width: 32,
    textAlign: "right",
  },
  recentSection: {
    gap: spacing.stackSm,
  },
  recentTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginTop: 1,
  },
  switchLessonBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  switchLessonText: {
    fontSize: 11.5,
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
