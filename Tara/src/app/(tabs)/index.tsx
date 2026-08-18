import { useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { DashboardTopBar } from "../../components/dashboard/DashboardTopBar";
import { HomeTodaysPracticeCard } from "../../components/dashboard/HomeTodaysPracticeCard";
import { ProgressSection } from "../../components/progress/ProgressSection";
import TaraHomeBanner from "../../components/dashboard/TaraHomeBanner";
import CommunityBanner from "../../components/dashboard/CommunityBanner";
import { useDashboard } from "../../context/DashboardContext";
import { useProgress } from "../../context/ProgressContext";
import { useUser } from "../../context/UserContext";
import { colors, spacing } from "../../theme/theme";

export default function HomeTab() {
  const router = useRouter();
  const { user } = useUser();
  const { todaysPractice, isLoading } = useDashboard();
  const { progress } = useProgress();
  const name = user?.name ?? "Farmer";

  const insets = useSafeAreaInsets();
  const scrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(100); 

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
            transform: [{ translateY: headerTranslateY }] 
          }
        ]}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <DashboardTopBar
          name={name}
          streakDays={user?.streakDays ?? 0}
          unreadCount={3}
        />
      </Animated.View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: headerHeight + spacing.stackSm }
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <TaraHomeBanner onPress={() => router.push("/learn")} />
        {todaysPractice && !isLoading && (
          <HomeTodaysPracticeCard
            practice={todaysPractice}
            onStartPractice={() => router.push("/practice")}
            onViewCalendar={() => router.push("/practice")}
          />
        )}
        {progress && <ProgressSection data={progress} />}
        <CommunityBanner onExplore={() => router.push("/community")} />
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
    paddingBottom: spacing.stackMd,
    gap: spacing.stackMd,
  },
});
