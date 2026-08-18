import React, { useEffect, useRef, useState } from "react";
import {
  Animated as RNAnimated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { AtmosphericGlow } from "../../components/ui/AtmosphericGlow";
import { colors, rounded, spacing, typography } from "../../theme/theme";

const TARA_FULL_BODY_FRONT = require("../../../assets/tara/tara-body/tara-front.png");

interface SplashScreenProps {
  onStart: () => void;
}

const LOADING_TIPS = [
  "Preparing your soil health companion...",
  "Loading sustainable farming modules...",
  "Connecting with your local Panchayat...",
  "Setting up personalized audio guidance...",
];

export function SplashScreen({ onStart }: SplashScreenProps) {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const characterHeight = Math.min(Math.max(screenHeight * 0.44, 300), 460);
  const characterWidth = Math.min(characterHeight * 0.346, 180);

  const [floatAnim] = useState(() => new RNAnimated.Value(0));
  const progressAnim = useRef(new RNAnimated.Value(0)).current;
  const dot1Anim = useRef(new RNAnimated.Value(0.3)).current;
  const dot2Anim = useRef(new RNAnimated.Value(0.3)).current;
  const dot3Anim = useRef(new RNAnimated.Value(0.3)).current;

  const [progressPercent, setProgressPercent] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // 1. Floating Tara Idle Animation
  useEffect(() => {
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(floatAnim, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        RNAnimated.timing(floatAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  // 2. Pulsating 3 Loader Dots
  useEffect(() => {
    const createDotAnim = (anim: RNAnimated.Value, delay: number) => {
      return RNAnimated.loop(
        RNAnimated.sequence([
          RNAnimated.delay(delay),
          RNAnimated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          RNAnimated.timing(anim, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      );
    };

    const d1 = createDotAnim(dot1Anim, 0);
    const d2 = createDotAnim(dot2Anim, 180);
    const d3 = createDotAnim(dot3Anim, 360);

    d1.start();
    d2.start();
    d3.start();

    return () => {
      d1.stop();
      d2.stop();
      d3.stop();
    };
  }, [dot1Anim, dot2Anim, dot3Anim]);

  // 3. Automated Loading Progression (0 -> 100% over 2.4s)
  useEffect(() => {
    const listenerId = progressAnim.addListener(({ value }) => {
      const pct = Math.min(100, Math.round(value * 100));
      setProgressPercent(pct);
      if (pct > 70) setTipIndex(3);
      else if (pct > 45) setTipIndex(2);
      else if (pct > 20) setTipIndex(1);
      else setTipIndex(0);
    });

    RNAnimated.timing(progressAnim, {
      toValue: 1,
      duration: 2400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isStarted) {
        setIsStarted(true);
        setTimeout(() => {
          onStart();
        }, 150);
      }
    });

    return () => {
      progressAnim.removeListener(listenerId);
    };
  }, [progressAnim, onStart, isStarted]);

  const handleSkipOrTap = () => {
    if (isStarted) return;
    setIsStarted(true);
    progressAnim.stopAnimation();
    onStart();
  };

  const badgeFloat = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Pressable style={styles.container} onPress={handleSkipOrTap}>
      {/* 1. Ambient Background Gradient */}
      <LinearGradient
        colors={["#FFFFFF", "#F9FBF8", "#EEF6EB", "#E2EFE0"]}
        locations={[0, 0.25, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

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
              <MaterialIcons name="eco" size={36} color={colors.primary} />
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

      {/* 3. Full-Body Tara standing with soft atmospheric green glow */}
      <View style={styles.characterArea}>
        <AtmosphericGlow
          size={480}
          opacity={0.9}
          tintColor="#4CAF50"
          showParticles
          particleDensity="medium"
          animated
          style={[
            styles.greenGlow,
            {
              top: "45%",
              marginTop: -240,
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
          {/* Black feathered ground contact shadow */}
          <View
            style={[
              styles.groundContactShadow,
              { width: characterWidth * 1.3, height: 26, bottom: -4 },
            ]}
          >
            <Svg
              width={characterWidth * 1.3}
              height={26}
              viewBox={`0 0 ${characterWidth * 1.3} 26`}
              style={StyleSheet.absoluteFill}
            >
              <Defs>
                <RadialGradient id="footShadowGrad" cx="50%" cy="50%" rx="50%" ry="50%">
                  <Stop offset="0%" stopColor="#000000" stopOpacity={0.30} />
                  <Stop offset="25%" stopColor="#000000" stopOpacity={0.20} />
                  <Stop offset="55%" stopColor="#000000" stopOpacity={0.10} />
                  <Stop offset="85%" stopColor="#000000" stopOpacity={0.02} />
                  <Stop offset="100%" stopColor="#000000" stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect
                x={0}
                y={0}
                width={characterWidth * 1.3}
                height={26}
                fill="url(#footShadowGrad)"
              />
            </Svg>
          </View>

          <Image
            source={TARA_FULL_BODY_FRONT}
            style={styles.taraImage}
            contentFit="contain"
            contentPosition="bottom center"
            accessibilityLabel="Tara, your friendly farming mentor"
          />
        </Animated.View>

        {/* Floating Badges */}
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
                    outputRange: [0, -8],
                  }),
                },
              ],
            },
          ]}
        >
          <MaterialIcons name="auto-awesome" size={22} color={colors.tertiary} />
        </RNAnimated.View>
      </View>

      {/* 4. Automated Loader UI Area at Bottom */}
      <View
        style={[
          styles.footerLoaderContainer,
          {
            paddingBottom: Math.max(insets.bottom + spacing.stackMd, 28),
            paddingHorizontal: spacing.marginMobile,
          },
        ]}
      >
        <Animated.View
          entering={FadeIn.duration(800).delay(400)}
          style={styles.loaderBox}
        >
          {/* 3 Pulsing Dots */}
          <View style={styles.dotsRow}>
            <RNAnimated.View
              style={[styles.pulseDot, { opacity: dot1Anim, transform: [{ scale: dot1Anim }] }]}
            />
            <RNAnimated.View
              style={[styles.pulseDot, { opacity: dot2Anim, transform: [{ scale: dot2Anim }] }]}
            />
            <RNAnimated.View
              style={[styles.pulseDot, { opacity: dot3Anim, transform: [{ scale: dot3Anim }] }]}
            />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarTrack}>
            <RNAnimated.View
              style={[styles.progressBarFill, { width: progressWidth }]}
            />
          </View>

          {/* Dynamic Loading Tip Text */}
          <View style={styles.tipTextRow}>
            <Text style={styles.tipText}>{LOADING_TIPS[tipIndex]}</Text>
            <Text style={styles.percentText}>{progressPercent}%</Text>
          </View>

          <Text style={styles.tapToSkipHint}>Tap anywhere to continue</Text>
        </Animated.View>
      </View>
    </Pressable>
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
    marginLeft: 2,
  },
  brandTitle: {
    ...typography.headlineLg,
    fontSize: 60,
    lineHeight: 66,
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
    marginTop: 6,
    opacity: 0.9,
    maxWidth: 280,
    lineHeight: 22,
    fontWeight: "500",
  },
  pillarsPill: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.stackMd,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "rgba(111, 122, 107, 0.18)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 10,
  },
  pillarText: {
    ...typography.labelLg,
    color: colors.primary,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontSize: 11,
  },
  pillarDot: {
    width: 4,
    height: 4,
    borderRadius: rounded.full,
    backgroundColor: colors.tertiaryContainer,
  },
  characterArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: spacing.unit,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "rgba(185, 228, 190, 0.6)",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  badgeTopLeft: {
    top: "26%",
    left: "14%",
  },
  badgeRight: {
    top: "50%",
    right: "12%",
    backgroundColor: "#F4FBEC",
    borderColor: "rgba(168, 222, 172, 0.5)",
  },
  footerLoaderContainer: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    zIndex: 30,
  },
  loaderBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(190, 202, 185, 0.5)",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    gap: 8,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: rounded.full,
    overflow: "hidden",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.full,
  },
  tipTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tipText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
    flex: 1,
  },
  percentText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    marginLeft: 8,
  },
  tapToSkipHint: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 2,
    opacity: 0.7,
  },
});
