import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LessonDetailHeader } from "../../../../components/learn/detail/LessonDetailHeader";
import { LessonOverview } from "../../../../components/learn/detail/LessonOverview";
import { LessonTimeline } from "../../../../components/learn/detail/LessonTimeline";
import { getCategoryTheme } from "../../../../components/learn/LearnTheme";
import { TactileButton } from "../../../../components/ui/TactileButton";
import { useLearn } from "../../../../context/LearnContext";
import { useUser } from "../../../../context/UserContext";
import { useTranslation } from "../../../../hooks/useTranslation";
import { colors, componentColors, rounded, spacing, typography } from "../../../../theme/theme";
import type { LearnLessonDetail, LevelNodeDetail } from "../../../../types/learn";

export default function LessonDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { t } = useTranslation();
  const { addXp } = useUser();
  const { getLessonDetail, completeLesson } = useLearn();

  const [detail, setDetail] = useState<LearnLessonDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetail() {
      if (!lessonId) return;
      setIsLoading(true);
      const res = await getLessonDetail(lessonId);
      if (isMounted) {
        setDetail(res);
        setIsLoading(false);
      }
    }
    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [lessonId, getLessonDetail]);

  const handleSelectLevel = async (level: LevelNodeDetail) => {
    if (level.status === "locked") return;
    
    // Simulate interactive level action/completion
    Alert.alert(
      `Level ${level.levelNumber}: ${t(level.titleKey)}`,
      t(level.descriptionKey) + `\n\nEarn +${level.xp} XP upon completion!`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: level.status === "completed" ? "Review Level" : "Start Level",
          onPress: async () => {
            if (level.status !== "completed") {
              await completeLesson(level.id);
              await addXp(level.xp);
              // Refresh detail
              if (lessonId) {
                const updated = await getLessonDetail(lessonId);
                if (updated) setDetail(updated);
              }
            }
          },
        },
      ]
    );
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
          title={t(detail.titleKey)}
          description={t(detail.descriptionKey)}
          categoryId={detail.categoryId}
          categoryLabelKey={`learn.category.${detail.categoryId}`}
          durationMinutes={detail.durationMinutes}
          totalLevels={detail.totalLevels}
          totalXp={detail.totalXp}
          chipTheme={chipTheme}
          onBack={handleBack}
        />

        <View style={styles.bodyWrapper}>
          {/* Overview ("Why It Matters" + Outcomes + Tara Quote) */}
          <LessonOverview
            whyItMattersKey={detail.whyItMattersKey}
            learningOutcomes={detail.learningOutcomes}
            taraQuoteKey={detail.taraQuoteKey}
            taraExpression={detail.taraExpression}
          />

          {/* Lesson Timeline Component */}
          <LessonTimeline levels={detail.levels} onSelectLevel={handleSelectLevel} />

          {/* Primary Action Button */}
          {activeLevel && (
            <TactileButton
              title={
                activeLevel.status === "completed"
                  ? t("lesson.detail.reviewLevel", { level: activeLevel.levelNumber })
                  : activeLevel.status === "inProgress"
                  ? t("lesson.detail.continueLevel", { level: activeLevel.levelNumber })
                  : t("lesson.detail.startLevel", { level: activeLevel.levelNumber })
              }
              icon="arrow-forward"
              iconPosition="right"
              faceColor={chipTheme.solid}
              depthColor={chipTheme.solidEdge}
              textColor="#FFFFFF"
              height={52}
              depth={4}
              borderRadius={rounded.full}
              onPress={() => handleSelectLevel(activeLevel)}
              style={styles.mainCta}
            />
          )}
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
});
