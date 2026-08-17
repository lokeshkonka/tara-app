import { useMemo, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LearnCategories } from "../../components/learn/LearnCategories";
import { LearnEmptyState } from "../../components/learn/LearnEmptyState";
import { LearnHeader } from "../../components/learn/LearnHeader";
import { LearnSearchFilter } from "../../components/learn/LearnSearchFilter";
import { LessonCard } from "../../components/learn/LessonCard";
import { getCategoryTheme } from "../../components/learn/LearnTheme";
import { useLearn } from "../../context/LearnContext";
import { useUser } from "../../context/UserContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { LearnLesson } from "../../types/learn";
import { colors, componentColors, spacing, typography } from "../../theme/theme";

export default function LearnTab() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user, addXp } = useUser();
  const { summary, categories, lessons, isLoading, completeLesson } = useLearn();

  const streakDays = user?.streakDays ?? 0;
  const todayXp = summary?.todayXp ?? 0;

  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const scrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(100);

  const categoryById = (id: string) => categories.find((c) => c.id === id);

  const levelCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const lesson of lessons) {
      counts[lesson.categoryId] = (counts[lesson.categoryId] ?? 0) + 1;
    }
    return counts;
  }, [lessons]);

  const visibleLessons = useMemo(() => {
    return lessons
      .filter((lesson) => {
        if (selectedCategory !== "all" && lesson.categoryId !== selectedCategory) {
          return false;
        }
        if (query.trim().length > 0) {
          const haystack = `${t(lesson.titleKey)} ${t(lesson.descriptionKey)}`.toLowerCase();
          if (!haystack.includes(query.trim().toLowerCase())) {
            return false;
          }
        }
        return true;
      })
      .map((lesson) => {
        const categoryIndex = Math.max(
          0,
          categories.findIndex((c) => c.id === lesson.categoryId)
        );
        return {
          lesson,
          categoryLabelKey: categoryById(lesson.categoryId)?.labelKey ?? "learn.category.all",
          chipTheme: getCategoryTheme(lesson.categoryId, categoryIndex),
          totalLevels: levelCountByCategory[lesson.categoryId] ?? 1,
        };
      });
  }, [lessons, selectedCategory, query, categories, levelCountByCategory, t]);

  const activeLessons = useMemo(
    () => visibleLessons.filter((item) => !item.lesson.isCompleted),
    [visibleLessons]
  );

  const learnedLessons = useMemo(
    () => visibleLessons.filter((item) => item.lesson.isCompleted),
    [visibleLessons]
  );

  const handleLessonAction = async (lesson: LearnLesson) => {
    if (!lesson.isCompleted) {
      await completeLesson(lesson.id);
      await addXp(lesson.xp);
    }
  };

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;

    // Don't hide if we are at the very top
    if (currentY < 10) {
      Animated.spring(headerTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 14,
      }).start();
    } else {
      const diff = currentY - scrollY.current;
      if (diff > 5) {
        // Scrolling down -> fully hide the header
        Animated.spring(headerTranslateY, {
          toValue: -headerHeight,
          useNativeDriver: true,
          tension: 100,
          friction: 14,
        }).start();
      } else if (diff < -5) {
        // Scrolling up -> show
        Animated.spring(headerTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 14,
        }).start();
      }
    }
    scrollY.current = currentY;
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            paddingTop: insets.top,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <LearnHeader
          streakDays={streakDays}
          todayXp={todayXp}
          isLoading={isLoading}
        />
      </Animated.View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: headerHeight + spacing.stackSm },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <LearnSearchFilter
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => setFilterOpen((prev) => !prev)}
          filterActive={filterOpen}
        />

        <LearnCategories
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {visibleLessons.length > 0 ? (
          <View style={styles.lessonsSection}>
            {/* Active / In-progress Lessons */}
            {activeLessons.length > 0 && (
              <View style={styles.groupSection}>
                <Text style={styles.lessonsTitle}>{t("learn.lessons.title")}</Text>

                {activeLessons.map(({ lesson, categoryLabelKey, chipTheme, totalLevels }) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    categoryLabelKey={categoryLabelKey}
                    chipTheme={chipTheme}
                    totalLevels={totalLevels}
                    onStartPress={() => handleLessonAction(lesson)}
                  />
                ))}
              </View>
            )}

            {/* Learned Lessons Section */}
            {learnedLessons.length > 0 && (
              <View style={styles.groupSection}>
                <View style={styles.learnedTitleRow}>
                  <MaterialIcons name="verified" size={22} color="#16A34A" />
                  <Text style={styles.lessonsTitle}>{t("learn.lessons.learnedTitle")}</Text>
                </View>

                {learnedLessons.map(({ lesson, categoryLabelKey, chipTheme, totalLevels }) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    categoryLabelKey={categoryLabelKey}
                    chipTheme={chipTheme}
                    totalLevels={totalLevels}
                    onStartPress={() => handleLessonAction(lesson)}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <LearnEmptyState
            categoryLabel={
              selectedCategory !== "all"
                ? t(categoryById(selectedCategory)?.labelKey ?? "")
                : undefined
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.stackLg,
    gap: spacing.stackMd,
  },
  lessonsSection: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    gap: spacing.stackLg,
  },
  groupSection: {
    width: "100%",
    gap: spacing.stackMd,
  },
  learnedTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  lessonsTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
});

