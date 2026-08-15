import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import { TARA_EXPRESSIONS } from "../../components/Tara/expressionMap";

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Dots Header */}
        <View style={styles.topPagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Brand & Tagline Section */}
        <View style={styles.logoSection}>
          <View style={styles.brandRow}>
            <Text style={styles.brandTitle}>Tara</Text>
            <MaterialIcons
              name="eco"
              size={36}
              color={colors.primaryContainer}
              style={styles.ecoIcon}
            />
          </View>
          <Text style={styles.tagline}>
            Your sustainable farming companion
          </Text>

          {/* Learn • Practice • Grow badge pill */}
          <View style={styles.pillarsRow}>
            <Text style={styles.pillarText}>Learn</Text>
            <View style={styles.pillarDot} />
            <Text style={styles.pillarText}>Practice</Text>
            <View style={styles.pillarDot} />
            <Text style={styles.pillarText}>Grow</Text>
          </View>
        </View>

        {/* Mascot Hero Banner */}
        <View style={styles.heroSection}>
          <Image
            source={TARA_EXPRESSIONS["hi-wave"]}
            style={styles.heroImage}
            contentFit="contain"
            accessibilityLabel="Tara waving in farm"
          />
        </View>

        {/* Action Button */}
        <View style={styles.footer}>
          <TactileButton
            title="Start Onboarding"
            icon="arrow-forward"
            onPress={onStart}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  container: {
    flex: 1,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.stackLg,
  },
  topPagination: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.25)",
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  logoSection: {
    alignItems: "center",
    marginTop: 16,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
  },
  brandTitle: {
    ...typography.headlineLg,
    fontSize: 56,
    lineHeight: 64,
    fontWeight: "900",
    color: colors.primaryContainer,
    letterSpacing: -1.5,
  },
  ecoIcon: {
    transform: [{ rotate: "15deg" }],
    marginLeft: 4,
    marginTop: -4,
  },
  tagline: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 4,
    opacity: 0.85,
    maxWidth: 240,
  },
  pillarsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.stackLg,
    gap: 10,
  },
  pillarText: {
    ...typography.labelLg,
    color: colors.primary,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontSize: 13,
  },
  pillarDot: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.tertiaryContainer,
  },
  heroSection: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 320,
    marginVertical: 16,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    width: "100%",
    paddingTop: 12,
  },
});
