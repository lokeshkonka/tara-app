import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Animated as RNAnimated, Easing as RNEasing } from "react-native";
import { Image } from "expo-image";
import { useAuth } from "../auth/AuthProvider";
import { colors, rounded, spacing, typography, shadows } from "../theme/theme";
import { AtmosphericGlow } from "../components/ui/AtmosphericGlow";
import { TactileButton } from "../components/ui/TactileButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const { signInWithGoogle, isLoading, error } = useAuth();

  // Floating animation for Tara image
  const floatAnim = useSharedValue(0);
  const badgeFloat = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    // Reanimated float for Tara
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // RNAnimated float for badges (matching onboarding style)
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(badgeFloat, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
          easing: RNEasing.inOut(RNEasing.sin),
        }),
        RNAnimated.timing(badgeFloat, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
          easing: RNEasing.inOut(RNEasing.sin),
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim, badgeFloat]);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim.value }],
  }));

  const badgeFloatStyle = {
    transform: [{
      translateY: badgeFloat.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -12],
      })
    }],
  };

  const badgeFloatStyleAlt = {
    transform: [{
      translateY: badgeFloat.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
      })
    }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Background Atmospheric Glow */}
        <AtmosphericGlow
          size={height * 0.9}
          width={width}
          height={height}
          opacity={0.85}
          tintColor={colors.primaryContainer}
          showParticles={true}
          particleDensity="high"
          style={StyleSheet.absoluteFillObject}
        />

        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.brandContainer}>
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
          </View>

          <View style={styles.imageWrapper}>
            <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
              <Image
                source={require("../../assets/tara/tara-body/tara-front.png")}
                style={styles.image}
                contentFit="contain"
              />
              {/* Decorative blurs */}
              <View style={[styles.decorativeCircle, styles.circle1]} />
              <View style={[styles.decorativeCircle, styles.circle2]} />
            </Animated.View>

            {/* Onboarding-style Floating Badges */}
            <RNAnimated.View style={[styles.floatingBadge, styles.badgeTopLeft, badgeFloatStyle]}>
              <MaterialIcons name="eco" size={22} color={colors.primary} />
            </RNAnimated.View>
            
            <RNAnimated.View style={[styles.floatingBadge, styles.badgeRight, badgeFloatStyleAlt]}>
              <MaterialIcons name="auto-awesome" size={24} color={colors.tertiary} />
            </RNAnimated.View>

            <RNAnimated.View style={[styles.floatingBadge, styles.badgeBottomLeft, badgeFloatStyle]}>
              <MaterialIcons name="local-florist" size={20} color={colors.secondary} />
            </RNAnimated.View>
          </View>
        </View>

        {/* Middle Section (Transparent Card) */}
        <View style={styles.middleSection}>
          <View style={styles.cardHeader}>
            <Text style={styles.welcomeTitle}>Welcome to TARA</Text>
            <Text style={styles.welcomeSubtitle}>
              Your sustainable farming journey starts here.
            </Text>
          </View>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <TactileButton
            title=""
            variant="secondary"
            loading={isLoading}
            onPress={signInWithGoogle}
            style={styles.googleButton}
          >
            {!isLoading && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="google" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={{ ...typography.labelLg, fontSize: 16, fontWeight: "700", letterSpacing: 0.2, color: colors.primary }}>
                  Continue with Google
                </Text>
              </View>
            )}
          </TactileButton>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.sectionPadding,
    width: "100%",
  },
  topSection: {
    alignItems: "center",
    width: "100%",
    marginTop: spacing.stackMd,
    zIndex: 10,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: spacing.stackLg,
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
  imageWrapper: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    maxWidth: 220,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: 2,
    ...shadows.avatarGlow,
  },
  decorativeCircle: {
    position: "absolute",
    borderRadius: 999,
  },
  circle1: {
    width: 32,
    height: 32,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.5,
    top: -16,
    right: 0,
    zIndex: 1,
  },
  circle2: {
    width: 48,
    height: 48,
    backgroundColor: colors.tertiaryFixed,
    opacity: 0.3,
    bottom: 40,
    left: -10,
    zIndex: 1,
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
    top: "10%",
    left: "15%",
  },
  badgeRight: {
    top: "45%",
    right: "12%",
    backgroundColor: "#F4FBEC",
    borderColor: "rgba(168, 222, 172, 0.5)",
  },
  badgeBottomLeft: {
    bottom: "5%",
    left: "10%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF9F0",
    borderColor: "rgba(255, 218, 168, 0.5)",
  },
  middleSection: {
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    backgroundColor: "transparent",
    padding: spacing.stackLg,
    zIndex: 10,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: spacing.stackLg,
  },
  welcomeTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    marginBottom: spacing.stackSm,
  },
  welcomeSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  errorText: {
    ...typography.labelSm,
    color: colors.error,
    marginBottom: spacing.stackMd,
    textAlign: "center",
  },
  googleButton: {
    width: "100%",
    marginTop: spacing.stackSm,
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
    paddingVertical: spacing.stackSm,
    zIndex: 10,
  },
  termsText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    maxWidth: 280,
    opacity: 0.8,
    lineHeight: 20,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
});
