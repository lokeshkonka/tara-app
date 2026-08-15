import React, { useEffect, useRef, useState } from "react";
import {
  Animated as RNAnimated,
  Easing,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, {
  Defs,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { TactileButton } from "../../components/ui/TactileButton";
import { AtmosphericGlow } from "../../components/ui/AtmosphericGlow";
import { colors, rounded, spacing, typography } from "../../theme/theme";

const TARA_FULL_BODY_FRONT = require("../../../assets/tara/tara-body/tara-front.png");

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const characterHeight = Math.min(Math.max(screenHeight * 0.48, 320), 500);
  const characterWidth = Math.min(characterHeight * 0.346, 190);

  const [floatAnim] = useState(() => new RNAnimated.Value(0));
  const buttonSplashAnim = useRef(new RNAnimated.Value(0)).current;
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(floatAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        RNAnimated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  const badgeFloat = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    RNAnimated.timing(buttonSplashAnim, {
      toValue: 1,
      duration: 500, // Smooth 500ms watery fill
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onStart();
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* 1. Ambient Background Gradient */}
      <LinearGradient
        colors={["#FFFFFF", "#F9FBF8", "#EEF6EB", "#E2EFE0"]}
        locations={[0, 0.25, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative soft ambient radial glow behind header (borderless) */}

      {/* 2. Top Brand Area */}
      <View
        style={[
          styles.topContentContainer,
          {
            paddingTop: Math.max(insets.top + spacing.stackSm, 24),
            paddingHorizontal: spacing.marginMobile,
          },
        ]}
      >
        <Animated.View
          entering={FadeInDown.duration(700).delay(150)}
          style={styles.brandContainer}
        >
          <View style={styles.logoRow}>
            <Text style={styles.brandTitle}>Tara</Text>
            <View style={styles.ecoIconContainer}>
              <MaterialIcons
                name="eco"
                size={36}
                color={colors.primary}
              />
            </View>
          </View>

          <Text style={styles.tagline}>
            Your sustainable farming companion
          </Text>

          <View style={styles.pillarsPill}>
            <Text style={styles.pillarText}>Learn</Text>
            <View style={styles.pillarDot} />
            <Text style={styles.pillarText}>Practice</Text>
            <View style={styles.pillarDot} />
            <Text style={styles.pillarText}>Grow</Text>
          </View>
        </Animated.View>
      </View>

      {/* 3. Full-Body Tara standing above the CTA, with a soft atmospheric green glow behind her */}
      <View style={styles.characterArea}>
        {/* Soft atmospheric green glow behind TARA */}
        <AtmosphericGlow
          size={500}
          opacity={0.95}
          tintColor="#4CAF50"
          showParticles
          particleDensity="medium"
          animated
          style={[
            styles.greenGlow,
            {
              top: "45%",
              marginTop: -250,
            },
          ]}
        />

        <Animated.View
          entering={FadeInUp.duration(850).delay(300)}
          style={[
            styles.characterContainer,
            {
              height: characterHeight,
              width: characterWidth,
            },
          ]}
          pointerEvents="none"
        >
          {/* Black feathered ground contact shadow with increased opacity */}
          <View
            style={[
              styles.groundContactShadow,
              { width: characterWidth * 1.3, height: 28, bottom: -4 },
            ]}
          >
            <Svg
              width={characterWidth * 1.3}
              height={28}
              viewBox={`0 0 ${characterWidth * 1.3} 28`}
              style={StyleSheet.absoluteFill}
            >
              <Defs>
                <RadialGradient id="footShadowGrad" cx="50%" cy="50%" rx="50%" ry="50%">
                  <Stop offset="0%" stopColor="#000000" stopOpacity={0.30} />
                  <Stop offset="20%" stopColor="#000000" stopOpacity={0.22} />
                  <Stop offset="45%" stopColor="#000000" stopOpacity={0.13} />
                  <Stop offset="70%" stopColor="#000000" stopOpacity={0.05} />
                  <Stop offset="88%" stopColor="#000000" stopOpacity={0.01} />
                  <Stop offset="100%" stopColor="#000000" stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect
                x={0}
                y={0}
                width={characterWidth * 1.3}
                height={28}
                fill="url(#footShadowGrad)"
              />
            </Svg>
          </View>
            <Image
              source={TARA_FULL_BODY_FRONT}
              style={styles.taraImage}
              contentFit="contain"
              contentPosition="bottom center"
              accessibilityLabel="Tara, your friendly farming mentor standing and welcoming you"
            />
          </Animated.View>

          {/* Floating Badges (Leaf & Sparkle) */}
          <RNAnimated.View
            style={[
              styles.floatingBadge,
              styles.badgeTopLeft,
              { transform: [{ translateY: badgeFloat }] },
            ]}
          >
            <MaterialIcons name="eco" size={22} color={colors.primary} />
          </RNAnimated.View>

          <RNAnimated.View
            style={[
              styles.floatingBadge,
              styles.badgeRight,
              {
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -10],
                    }),
                  },
                ],
                animationDelay: "400ms",
              },
            ]}
          >
            <MaterialIcons name="auto-awesome" size={24} color={colors.tertiary} />
          </RNAnimated.View>

          <RNAnimated.View
            style={[
              styles.floatingBadge,
              styles.badgeBottomLeft,
              {
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                    }),
                  },
                ],
                animationDelay: "800ms",
              },
            ]}
          >
            <MaterialIcons name="local-florist" size={20} color={colors.secondary} />
          </RNAnimated.View>
        </View>

      {/* 4. Footer CTA Button */}
      <View
        style={[
          styles.footerActionContainer,
          {
            paddingBottom: Math.max(insets.bottom + spacing.stackMd, 28),
            paddingHorizontal: spacing.marginMobile,
          },
        ]}
      >
        <Animated.View
          entering={FadeIn.duration(800).delay(550)}
          style={styles.ctaWrap}
        >
          <TactileButton
            title="Start Onboarding"
            icon="arrow-forward"
            variant="primary"
            onPress={handleStart}
            style={styles.ctaButton}
            autoAdvanceProgress={buttonSplashAnim}
          />
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
  topContentContainer: {
    alignItems: "center",
    zIndex: 10,
    width: "100%",
  },
  brandContainer: {
    alignItems: "center",
    marginTop: spacing.stackSm,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    paddingRight: 24,
    marginLeft: 2, // Shifted 2px right
  },
  brandTitle: {
    ...typography.headlineLg,
    fontSize: 64,
    lineHeight: 70,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -1.8,
    includeFontPadding: false,
    textShadowColor: "rgba(0, 110, 28, 0.14)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 14,
  },
  ecoIconContainer: {
    position: "absolute",
    right: -12,
    top: -4,
    transform: [{ rotate: "14deg" }],
  },
  tagline: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 8,
    opacity: 0.9,
    maxWidth: 280,
    lineHeight: 24,
    fontWeight: "500",
  },
  pillarsPill: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.stackLg,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "rgba(111, 122, 107, 0.18)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    gap: 12,
  },
  pillarText: {
    ...typography.labelLg,
    color: colors.primary,
    fontWeight: "800",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontSize: 12,
  },
  pillarDot: {
    width: 5,
    height: 5,
    borderRadius: rounded.full,
    backgroundColor: colors.tertiaryContainer,
  },

  // Full-body character standing above the CTA
  characterArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: spacing.stackSm,
    position: "relative",
  },
  greenGlow: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
  },
  characterContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 2,
  },
  taraImage: {
    width: "100%",
    height: "100%",
  },
  groundContactShadow: {
    position: "absolute",
    bottom: 2,
    alignSelf: "center",
  },
  floatingBadge: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.6)",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  badgeTopLeft: {
    top: "28%",
    left: "15%",
  },
  badgeRight: {
    top: "52%",
    right: "12%",
    backgroundColor: "#F4FBEC",
    borderColor: "rgba(168, 222, 172, 0.5)",
  },
  badgeBottomLeft: {
    bottom: "10%",
    left: "8%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF9F0",
    borderColor: "rgba(255, 218, 168, 0.5)",
  },

  // CTA Section
  footerActionContainer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    alignItems: "center",
    zIndex: 30,
  },
  ctaWrap: {
    width: "100%",
  },
  ctaButton: {
    width: "100%",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
});
