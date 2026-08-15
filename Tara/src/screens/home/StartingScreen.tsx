import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { TactileButton } from "../../components/ui/TactileButton";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { BadgeChip } from "../../components/ui/BadgeChip";
import { TARA_EXPRESSIONS } from "../../components/Tara/expressionMap";
import { useOnboarding } from "../../hooks/useOnboarding";
import { useUser } from "../../hooks/useUser";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import { STARTING_SCREEN_FALLBACK } from "../../data/dummy/startingScreenData";

export function StartingScreen() {
  const router = useRouter();
  const { state: onboardingState } = useOnboarding();
  const { user, farm } = useUser();

  const userName = user?.name || STARTING_SCREEN_FALLBACK.userName;
  const cropsText =
    onboardingState.selectedCrops.length > 0
      ? onboardingState.selectedCrops.join(", ")
      : farm?.crops.join(", ") || STARTING_SCREEN_FALLBACK.defaultCrop;
  const locationText =
    onboardingState.locationDistrict && onboardingState.locationState
      ? `${onboardingState.locationDistrict}, ${onboardingState.locationState}`
      : farm
      ? `${farm.district}, ${farm.state}`
      : STARTING_SCREEN_FALLBACK.location;

  const xpEarned = user?.xp || onboardingState.selectedCrops.length * 50 + 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Welcome Header */}
          <View style={styles.topHeader}>
            <View style={styles.avatarMiniWrap}>
              <Image
                source={TARA_EXPRESSIONS["happy"]}
                style={styles.avatarMini}
                contentFit="contain"
              />
            </View>
            <View style={styles.welcomeTextStack}>
              <Text style={styles.greeting}>Welcome, {userName}! 🌾</Text>
              <Text style={styles.subGreeting}>Your farm journey has begun.</Text>
            </View>
          </View>

          {/* Farm Summary Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconWrap}>
                <MaterialIcons
                  name="landscape"
                  size={20}
                  color={colors.primaryContainer}
                />
              </View>
              <Text style={styles.cardTitle}>Your Farm Profile</Text>
              <BadgeChip label={`+${xpEarned} XP`} variant="primary" />
            </View>

            <View style={styles.farmDetailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Crops</Text>
                <Text style={styles.detailValue}>{cropsText}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{locationText}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Acreage</Text>
                <Text style={styles.detailValue}>
                  {onboardingState.farmSizeAcres || farm?.sizeAcres || 2.5} Acres
                </Text>
              </View>
            </View>
          </View>

          {/* Today's Recommended Practice */}
          <View style={[styles.card, styles.highlightCard]}>
            <View style={styles.cardHeader}>
              <View style={[styles.cardIconWrap, { backgroundColor: colors.tertiaryFixed }]}>
                <MaterialIcons
                  name="stars"
                  size={20}
                  color={colors.tertiary}
                />
              </View>
              <Text style={styles.cardTitle}>{"Today's Mission"}</Text>
              <BadgeChip label="+50 XP" variant="tertiary" />
            </View>

            <Text style={styles.missionTitle}>
              {STARTING_SCREEN_FALLBACK.todayLesson.title}
            </Text>
            <Text style={styles.missionDesc}>
              {STARTING_SCREEN_FALLBACK.todayLesson.description}
            </Text>

            <View style={styles.progressRow}>
              <ProgressBar progress={0.35} color={colors.primaryContainer} />
            </View>
          </View>

          {/* Soil & Ecosystem Score */}
          <View style={styles.card}>
            <View style={styles.scoreRow}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreNumber}>82</Text>
                <Text style={styles.scoreUnit}>/ 100</Text>
              </View>
              <View style={styles.scoreTextStack}>
                <Text style={styles.scoreHeading}>Soil Vitality Index</Text>
                <Text style={styles.scoreSubtitle}>
                  Ready for natural bio-fertilizer activation
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Enter Farm Button */}
        <View style={styles.footer}>
          <TactileButton
            title="Enter My Farm Dashboard"
            icon="arrow-forward"
            onPress={() => router.push("/home" as any)}
          />
        </View>
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
    paddingHorizontal: spacing.marginMobile,
  },
  scroll: {
    paddingVertical: spacing.stackLg,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.stackLg,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  avatarMiniWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(76, 175, 80, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarMini: {
    width: 44,
    height: 44,
  },
  welcomeTextStack: {
    flex: 1,
  },
  greeting: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  subGreeting: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: rounded.xl,
    padding: 18,
    marginBottom: spacing.stackMd,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  highlightCard: {
    borderColor: colors.primaryFixedDim,
    backgroundColor: colors.surfaceContainerLow,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(76, 175, 80, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    flex: 1,
  },
  farmDetailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailItem: {
    minWidth: "45%",
    flex: 1,
  },
  detailLabel: {
    ...typography.labelSm,
    color: colors.outline,
    textTransform: "uppercase",
    fontSize: 11,
  },
  detailValue: {
    ...typography.bodyMd,
    color: colors.onSurface,
    fontWeight: "600",
    marginTop: 2,
  },
  missionTitle: {
    ...typography.labelLg,
    fontSize: 17,
    color: colors.onSurface,
    marginBottom: 4,
  },
  missionDesc: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  progressRow: {
    marginTop: 4,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  scoreNumber: {
    ...typography.headlineMd,
    color: colors.onSecondaryContainer,
    fontWeight: "900",
    lineHeight: 22,
  },
  scoreUnit: {
    ...typography.labelSm,
    fontSize: 10,
    color: colors.onSecondaryContainer,
    fontWeight: "700",
  },
  scoreTextStack: {
    flex: 1,
  },
  scoreHeading: {
    ...typography.labelLg,
    color: colors.onSurface,
    fontSize: 15,
  },
  scoreSubtitle: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  footer: {
    paddingVertical: spacing.stackLg,
  },
});
