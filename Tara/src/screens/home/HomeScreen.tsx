import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { BadgeChip } from "../../components/ui/BadgeChip";
import { TactileButton } from "../../components/ui/TactileButton";
import { useOnboarding } from "../../hooks/useOnboarding";
import { useUser } from "../../hooks/useUser";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import Tara from "../../components/Tara/Tara";

export function HomeScreen() {
  const router = useRouter();
  const { resetOnboarding } = useOnboarding();
  const { user, farm } = useUser();

  const handleRestartOnboarding = async () => {
    await resetOnboarding();
    router.replace("/onboarding" as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.brandGroup}>
            <Text style={styles.appTitle}>TARA</Text>
            <BadgeChip label="Organic Mentor" variant="primary" />
          </View>
          <View style={styles.streakBadge}>
            <MaterialIcons name="local-fire-department" size={18} color="#E65100" />
            <Text style={styles.streakText}>{user?.streakDays || 1} Day Streak</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Interactive Tara Companion Guide */}
          <View style={styles.taraWrapper}>
            <Tara
              expression="happy"
              message="Welcome to your farm! Today is a great day to apply Jeevamrit and enrich your soil microbiome."
              audioSource={require("../../../assets/dummy_voices/english-speech.mp3")}
            />
          </View>

          {/* Quick Actions Grid */}
          <Text style={styles.sectionHeader}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <View style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "rgba(76, 175, 80, 0.15)" }]}>
                <MaterialIcons name="photo-camera" size={24} color={colors.primaryContainer} />
              </View>
              <Text style={styles.actionTitle}>AI Verify Work</Text>
              <Text style={styles.actionSubtitle}>Snap farm photo</Text>
            </View>

            <View style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: colors.tertiaryFixed }]}>
                <MaterialIcons name="menu-book" size={24} color={colors.tertiary} />
              </View>
              <Text style={styles.actionTitle}>Learn Practice</Text>
              <Text style={styles.actionSubtitle}>Micro-lessons</Text>
            </View>

            <View style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: colors.secondaryContainer }]}>
                <MaterialIcons name="forum" size={24} color={colors.secondary} />
              </View>
              <Text style={styles.actionTitle}>Community</Text>
              <Text style={styles.actionSubtitle}>Ask local farmers</Text>
            </View>

            <View style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: colors.surfaceVariant }]}>
                <MaterialIcons name="military-tech" size={24} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.actionTitle}>Rewards</Text>
              <Text style={styles.actionSubtitle}>{user?.xp || 150} XP Earned</Text>
            </View>
          </View>

          {/* Farm Info Overview */}
          <View style={styles.farmBanner}>
            <Text style={styles.farmBannerTitle}>Active Crops</Text>
            <Text style={styles.farmBannerText}>
              {farm?.crops.join(", ") || "Banana, Black Pepper"} • {farm?.sizeAcres || 2.5} Acres
            </Text>
          </View>

          {/* Dev Onboarding Reset Button */}
          <View style={styles.resetContainer}>
            <TactileButton
              title="Replay Onboarding Walkthrough"
              icon="replay"
              variant="secondary"
              onPress={handleRestartOnboarding}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
    backgroundColor: colors.surfaceContainerLowest,
  },
  brandGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appTitle: {
    ...typography.headlineMd,
    fontWeight: "900",
    color: colors.primary,
    letterSpacing: 2,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    gap: 4,
  },
  streakText: {
    ...typography.labelSm,
    color: "#E65100",
    fontWeight: "800",
  },
  scroll: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.stackLg,
  },
  taraWrapper: {
    marginBottom: spacing.stackLg,
  },
  sectionHeader: {
    ...typography.headlineMd,
    fontSize: 18,
    color: colors.onSurface,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: spacing.stackLg,
  },
  actionCard: {
    width: "48%",
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: rounded.lg,
    padding: 16,
    alignItems: "flex-start",
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: rounded.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  actionTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontSize: 15,
  },
  actionSubtitle: {
    ...typography.bodyMd,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  farmBanner: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: rounded.lg,
    padding: 16,
    marginBottom: spacing.stackLg,
  },
  farmBannerTitle: {
    ...typography.labelSm,
    color: colors.outline,
    textTransform: "uppercase",
  },
  farmBannerText: {
    ...typography.labelLg,
    color: colors.primary,
    marginTop: 4,
  },
  resetContainer: {
    marginTop: spacing.stackSm,
    paddingBottom: spacing.stackLg,
  },
});
