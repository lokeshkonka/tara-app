import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LessonDetailHeader } from "../../../../components/learn/detail/LessonDetailHeader";
import { LessonOverview } from "../../../../components/learn/detail/LessonOverview";
import { LessonTimeline } from "../../../../components/learn/detail/LessonTimeline";
import { getCategoryTheme } from "../../../../components/learn/LearnTheme";
import { BadgeRewardItem } from "../../../../components/learn/level/LevelCompleteCard";
import { TactileButton } from "../../../../components/ui/TactileButton";
import { useLearn } from "../../../../context/LearnContext";
import { useUser } from "../../../../context/UserContext";
import { useTranslation } from "../../../../hooks/useTranslation";
import { colors, componentColors, rounded, spacing, typography } from "../../../../theme/theme";
import { learnStorage } from "../../../../storage/learnStorage";
import type { LearnLessonDetail, LevelNodeDetail } from "../../../../types/learn";

export default function LessonDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { t } = useTranslation();
  const { addXp } = useUser();
  const { getLessonDetail, completeLesson, refresh } = useLearn();

  const [detail, setDetail] = useState<LearnLessonDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDetail = useCallback(async () => {
    if (!lessonId) return;
    const res = await getLessonDetail(lessonId);
    setDetail(res);
    setIsLoading(false);
  }, [lessonId, getLessonDetail]);

  useFocusEffect(
    useCallback(() => {
      fetchDetail();
    }, [fetchDetail])
  );

  const handleSelectLevel = (level: LevelNodeDetail) => {
    if (level.status === "locked") return;
    router.push(`/learn/level/${level.id}`);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/learn");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading Soil Health Lesson...</Text>
      </SafeAreaView>
    );
  }

  if (!detail) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Lesson not found</Text>
        <TactileButton title="Back to Learn" onPress={handleBack} style={styles.errorButton} />
      </SafeAreaView>
    );
  }

  const categoryIndex = 1; // Soil category
  const chipTheme = getCategoryTheme(detail.categoryId, categoryIndex);
  const activeLevel =
    detail.levels.find((l) => l.status === "inProgress") ||
    detail.levels.find((l) => l.status === "available") ||
    detail.levels[0];

  const handleResetProgress = () => {
    Alert.alert(
      "Reset Lesson Progress?",
      "This will reset completed levels so you can practice this lesson from Level 1 again.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await learnStorage.resetProgress();
            await fetchDetail();
            await refresh();
          },
        },
      ]
    );
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
        {/* Hero Header */}
        <LessonDetailHeader
          title={detail.title || (detail.titleKey ? t(detail.titleKey) : "")}
          description={detail.description || (detail.descriptionKey ? t(detail.descriptionKey) : "")}
          categoryId={detail.categoryId}
          categoryLabelKey={`learn.category.${detail.categoryId}`}
          durationMinutes={detail.durationMinutes}
          totalLevels={detail.totalLevels}
          totalXp={detail.totalXp}
          chipTheme={chipTheme}
          onBack={handleBack}
        />

        <View style={styles.bodyWrapper}>
          {/* Overview Card */}
          <LessonOverview
            whyItMattersKey={detail.whyItMattersKey}
            whyItMattersText={detail.whyItMattersText}
            learningOutcomes={detail.learningOutcomes}
            taraQuoteKey={detail.taraQuoteKey}
            taraQuoteText={detail.taraQuoteText}
            taraExpression={detail.taraExpression}
          />

          {/* Completed Lesson Mastered Badge Banner */}
          {detail.levels.every((l) => l.status === "completed") && (
            <View style={styles.completedBadgeWrap}>
              <BadgeRewardItem
                title="Lesson Badge Unlocked"
                icon="eco"
                badgeId="lesson-badge"
              />
            </View>
          )}

          {/* Timeline */}
          <View style={styles.timelineSection}>
            <LessonTimeline levels={detail.levels} onSelectLevel={handleSelectLevel} />
          </View>

          {/* Action CTA */}
          {activeLevel && (
            <TactileButton
              title={
                detail.levels.every((l) => l.status === "completed")
                  ? "Review Lesson (Level 1)"
                  : activeLevel.status === "inProgress"
                  ? t("lesson.detail.continueLevel", { level: activeLevel.levelNumber })
                  : t("lesson.detail.startLevel", { level: activeLevel.levelNumber })
              }
              icon={detail.levels.every((l) => l.status === "completed") ? "replay" : "arrow-forward"}
              iconPosition="right"
              faceColor={
                detail.levels.every((l) => l.status === "completed")
                  ? "#16A34A"
                  : chipTheme.solid
              }
              depthColor={
                detail.levels.every((l) => l.status === "completed")
                  ? "#15803D"
                  : chipTheme.solidEdge
              }
              textColor="#FFFFFF"
              height={52}
              depth={4}
              borderRadius={rounded.full}
              onPress={() =>
                handleSelectLevel(
                  detail.levels.every((l) => l.status === "completed")
                    ? detail.levels[0]
                    : activeLevel
                )
              }
              style={styles.mainCta}
            />
          )}

          {/* Reset Progress Section */}
          <View style={styles.resetWrapper}>
            <TactileButton
              title="Reset Lesson Progress"
              icon="restart-alt"
              iconPosition="left"
              faceColor="#FFF1F2"
              depthColor="#FECDD3"
              textColor="#E11D48"
              height={44}
              depth={3}
              borderRadius={rounded.full}
              onPress={handleResetProgress}
            />
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    gap: spacing.stackMd,
  },
  loadingText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
  errorText: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  errorButton: {
    width: 200,
  },
  scrollContent: {
    paddingBottom: spacing.stackLg,
  },
  bodyWrapper: {
    paddingHorizontal: spacing.marginMobile,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    gap: spacing.stackLg,
    marginTop: spacing.stackSm,
  },
  timelineSection: {
    gap: spacing.stackSm,
  },
  sectionHeading: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "800",
    color: componentColors.sectionTitle,
  },
  mainCta: {
    marginTop: spacing.stackSm,
  },
  completedBadgeWrap: {
    marginBottom: -spacing.stackSm,
  },
  resetWrapper: {
    marginTop: spacing.stackSm,
    marginBottom: spacing.stackMd,
    alignItems: "center",
  },
});
