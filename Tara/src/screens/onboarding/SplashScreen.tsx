import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { TactileButton } from "../../components/ui/TactileButton";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import { TARA_EXPRESSIONS } from "../../components/Tara/expressionMap";

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  const insets = useSafeAreaInsets();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  // Dynamic character height based on screen size (roughly 50% of the screen height)
  const characterHeight = Math.min(Math.max(screenHeight * 0.48, 320), 480);
  const characterWidth = Math.min(screenWidth * 0.9, 420);

  return (
    <View style={styles.container}>
      {/* 1. Ambient Background Gradient */}
      <LinearGradient
        colors={["#FFFFFF", "#F9FBF8", "#EEF6EB", "#E2EFE0"]}
        locations={[0, 0.25, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative soft ambient circular light behind header */}
      <View style={styles.topAura} />

      {/* 2. Top Content Area */}
      <View
        style={[
          styles.topContentContainer,
          {
            paddingTop: Math.max(insets.top + spacing.stackSm, 24),
            paddingHorizontal: spacing.marginMobile,
          },
        ]}
      >
        {/* Animated Top Dots Indicator */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.topIndicatorRow}
        >
          <View style={[styles.indicatorDot, styles.indicatorDotActive]} />
          <View style={styles.indicatorDot} />
          <View style={styles.indicatorDot} />
        </Animated.View>

        {/* Brand & Logo Section */}
        <Animated.View
          entering={FadeInDown.duration(700).delay(250)}
          style={styles.brandContainer}
        >
          <View style={styles.logoRow}>
            <Text style={styles.brandTitle}>Tara</Text>
            <View style={styles.ecoIconContainer}>
              <MaterialIcons
                name="eco"
                size={38}
                color={colors.primaryContainer}
              />
            </View>
          </View>

          <Text style={styles.tagline}>
            Your sustainable farming companion
          </Text>

          {/* Learn • Practice • Grow Pillars Pill */}
          <View style={styles.pillarsPill}>
            <Text style={styles.pillarText}>Learn</Text>
            <View style={styles.pillarDot} />
            <Text style={styles.pillarText}>Practice</Text>
            <View style={styles.pillarDot} />
            <Text style={styles.pillarText}>Grow</Text>
          </View>
        </Animated.View>
      </View>

      {/* 3. Tara Character sticking to bottom */}
      <Animated.View
        entering={FadeInUp.duration(850).delay(400)}
        style={[
          styles.characterContainer,
          {
            height: characterHeight,
            width: characterWidth,
          },
        ]}
        pointerEvents="none"
      >
        {/* Soft shadow directly underneath character's feet */}
        <View style={styles.groundContactShadow} />

        <Image
          source={TARA_EXPRESSIONS["hi-wave"]}
          style={styles.taraImage}
          contentFit="contain"
          contentPosition="bottom center"
          accessibilityLabel="Tara, your friendly farming mentor waving warmly"
        />
      </Animated.View>

      {/* 4. Bottom Land Blur & Green-to-Transparent Gradient Layer */}
      <View style={styles.landLayerContainer} pointerEvents="box-none">
        {/* Soft Frosted Blur at the horizon */}
        <BlurView intensity={25} tint="light" style={styles.landBlur} />

        {/* Lush Land Gradient (Transparent at top -> Vibrant Emerald Green at bottom) */}
        <LinearGradient
          colors={[
            "rgba(247, 250, 245, 0)",
            "rgba(148, 249, 144, 0.12)",
            "rgba(76, 175, 80, 0.38)",
            "rgba(27, 109, 36, 0.72)",
            "rgba(0, 83, 19, 0.92)",
          ]}
          locations={[0, 0.22, 0.48, 0.76, 1]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        {/* Organic Curved Land Silhouette Highlight */}
        <View style={styles.landContourGlow} />

        {/* 5. Footer CTA Button & Indicators */}
        <Animated.View
          entering={FadeIn.duration(800).delay(650)}
          style={[
            styles.footerActionContainer,
            {
              paddingBottom: Math.max(insets.bottom + spacing.stackMd, 28),
              paddingHorizontal: spacing.marginMobile,
            },
          ]}
        >
          <TactileButton
            title="Start Onboarding"
            icon="arrow-forward"
            variant="primary"
            onPress={onStart}
            style={styles.ctaButton}
          />

          {/* Three subtle pulsing dots below button */}
          <View style={styles.bottomPulsingDots}>
            <View style={[styles.pulseDot, { opacity: 0.9 }]} />
            <View style={[styles.pulseDot, { opacity: 0.6 }]} />
            <View style={[styles.pulseDot, { opacity: 0.35 }]} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    position: "relative",
    overflow: "hidden",
  },
  topAura: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 320,
    height: 320,
    borderRadius: rounded.full,
    backgroundColor: "rgba(148, 249, 144, 0.18)",
    opacity: 0.7,
  },
  topContentContainer: {
    alignItems: "center",
    zIndex: 10,
    width: "100%",
  },
  topIndicatorRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.stackMd,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.2)",
  },
  indicatorDotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
  brandContainer: {
    alignItems: "center",
    marginTop: spacing.stackSm,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    paddingRight: 16,
  },
  brandTitle: {
    ...typography.headlineLg,
    fontSize: 62,
    lineHeight: 68,
    fontWeight: "900",
    color: colors.primaryContainer,
    letterSpacing: -2,
    textShadowColor: "rgba(76, 175, 80, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 16,
  },
  ecoIconContainer: {
    position: "absolute",
    right: -10,
    top: -2,
    transform: [{ rotate: "14deg" }],
  },
  tagline: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 6,
    opacity: 0.85,
    maxWidth: 260,
    lineHeight: 22,
    fontWeight: "500",
  },
  pillarsPill: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.stackLg,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "rgba(111, 122, 107, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    gap: 10,
  },
  pillarText: {
    ...typography.labelLg,
    color: colors.primary,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontSize: 12,
  },
  pillarDot: {
    width: 5,
    height: 5,
    borderRadius: rounded.full,
    backgroundColor: colors.tertiaryContainer,
  },

  // Character grounded at the bottom
  characterContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 15,
  },
  taraImage: {
    width: "100%",
    height: "100%",
  },
  groundContactShadow: {
    position: "absolute",
    bottom: 4,
    width: "55%",
    height: 18,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 34, 4, 0.22)",
    transform: [{ scaleX: 1.4 }],
  },

  // Bottom Land Layer & Gradient
  landLayerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    justifyContent: "flex-end",
    zIndex: 20,
  },
  landBlur: {
    ...StyleSheet.absoluteFill,
    opacity: 0.6,
  },
  landContourGlow: {
    position: "absolute",
    top: 0,
    left: "-10%",
    right: "-10%",
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#94f990",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  // CTA Section
  footerActionContainer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    alignItems: "center",
    zIndex: 30,
  },
  ctaButton: {
    width: "100%",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  bottomPulsingDots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  pulseDot: {
    width: 5,
    height: 5,
    borderRadius: rounded.full,
    backgroundColor: colors.white,
  },
});
