import React, { useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { TARA_EXPRESSIONS } from "../Tara/expressionMap";
import { useTranslation } from "../../hooks/useTranslation";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";

interface LearnEmptyStateProps {
  categoryLabel?: string;
}

export function LearnEmptyState({ categoryLabel }: LearnEmptyStateProps) {
  const { t } = useTranslation();

  // Floating animations for surrounding icons only (Tara stays still)
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Float animation 1 (Sparkles & Lightbulb)
    const anim1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Float animation 2 (Eco leaf, opposite phase)
    const anim2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Float animation 3 (Sun)
    const anim3 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim3, {
          toValue: 1,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim3, {
          toValue: 0,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Glow pulse animation
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    anim1.start();
    anim2.start();
    anim3.start();
    glow.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
      glow.stop();
    };
  }, [floatAnim1, floatAnim2, floatAnim3, pulseAnim]);

  const floatY1 = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const floatY2 = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 6],
  });

  const floatY3 = floatAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -8],
  });

  const glowScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.15],
  });

  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0.85],
  });

  return (
    <View style={styles.card}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#FFFFFF", "#F4F9F1", "#FEFCE8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Atmospheric Glow & Character Area */}
      <View style={styles.atmosphereContainer}>
        {/* Soft Radial Sunbeam Glow (Outer) shifted directly behind Tara */}
        <Animated.View
          style={[
            styles.outerGlowContainer,
            {
              transform: [{ scale: glowScale }],
              opacity: glowOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(254, 240, 138, 0.65)", "rgba(254, 240, 138, 0.25)", "rgba(254, 240, 138, 0)"]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.fillGradientCircle}
          />
        </Animated.View>

        {/* Soft Emerald Glow (Inner) shifted directly behind Tara */}
        <View style={styles.innerGlowContainer}>
          <LinearGradient
            colors={["rgba(187, 247, 208, 0.75)", "rgba(187, 247, 208, 0.2)", "rgba(187, 247, 208, 0)"]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.fillGradientCircle}
          />
        </View>

        {/* --- FLOATING ICONS --- */}
        {/* Top-Left Sparkle */}
        <Animated.View
          style={[
            styles.floatBadge,
            styles.floatBadgeTopLeft,
            { transform: [{ translateY: floatY1 }] },
          ]}
        >
          <MaterialIcons name="auto-awesome" size={16} color="#D97706" />
        </Animated.View>

        {/* Top-Right Eco Leaf */}
        <Animated.View
          style={[
            styles.floatBadge,
            styles.floatBadgeTopRight,
            { transform: [{ translateY: floatY2 }] },
          ]}
        >
          <MaterialIcons name="eco" size={18} color="#16A34A" />
        </Animated.View>

        {/* Bottom-Left Sun */}
        <Animated.View
          style={[
            styles.floatBadge,
            styles.floatBadgeBottomLeft,
            { transform: [{ translateY: floatY3 }] },
          ]}
        >
          <MaterialIcons name="wb-sunny" size={15} color="#EAB308" />
        </Animated.View>

        {/* Bottom-Right Lightbulb */}
        <Animated.View
          style={[
            styles.floatBadge,
            styles.floatBadgeBottomRight,
            { transform: [{ translateY: floatY1 }] },
          ]}
        >
          <MaterialIcons name="lightbulb" size={16} color="#CA8A04" />
        </Animated.View>

        {/* --- TARA CHARACTER (Static / Non-moving) --- */}
        <View style={styles.characterWrapper}>
          <Image
            source={TARA_EXPRESSIONS["excited"]}
            style={styles.taraImage}
            contentFit="contain"
          />
        </View>
      </View>

      {/* --- CONTENT SECTION (Attached directly under Tara with zero space) --- */}
      <View style={styles.contentSection}>
        {/* Category / Status Pill sticking directly to Tara's bottom */}
        <View style={styles.categoryPill}>
          <MaterialIcons name="hourglass-top" size={14} color="#B45309" />
          <Text style={styles.categoryPillText}>
            {categoryLabel ? `${categoryLabel} · Coming Soon` : "Coming Soon"}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{t("learn.empty.title")}</Text>

        {/* Description */}
        <Text style={styles.description}>{t("learn.empty.desc")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    backgroundColor: componentColors.cardBackground,
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 4,
    borderBottomColor: componentColors.cardEdge,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.stackMd,
    paddingHorizontal: spacing.stackMd,
    overflow: "hidden",
    marginTop: spacing.stackSm,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  atmosphereContainer: {
    width: "100%",
    height: 140,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },

  outerGlowContainer: {
    position: "absolute",
    top: 0,
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: "hidden",
    alignSelf: "center",
  },

  innerGlowContainer: {
    position: "absolute",
    top: 15,
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: "hidden",
    alignSelf: "center",
  },

  fillGradientCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },

  characterWrapper: {
    width: 140,
    height: 135,
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 3,
    marginBottom: 0,
  },

  taraImage: {
    width: 135,
    height: 135,
  },

  // Floaty Badges
  floatBadge: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    padding: 7,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 4,
  },
  floatBadgeTopLeft: {
    top: 6,
    left: "14%",
    backgroundColor: "#FEF3C7",
    borderColor: "#FDE68A",
  },
  floatBadgeTopRight: {
    top: 8,
    right: "14%",
    backgroundColor: "#DCFCE7",
    borderColor: "#BBF7D0",
  },
  floatBadgeBottomLeft: {
    bottom: 22,
    left: "18%",
    backgroundColor: "#FEF9C3",
    borderColor: "#FEF08A",
  },
  floatBadgeBottomRight: {
    bottom: 20,
    right: "18%",
    backgroundColor: "#FEF3C7",
    borderColor: "#FDE68A",
  },

  // Content
  contentSection: {
    alignItems: "center",
    marginTop: 0,
    paddingHorizontal: spacing.stackSm,
    zIndex: 2,
  },

  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderWidth: 1.2,
    borderColor: "#FCD34D",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: rounded.full,
    gap: 6,
    marginBottom: spacing.stackSm,
    marginTop: 2,
  },

  categoryPillText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#92400E",
    letterSpacing: 0.2,
  },

  title: {
    ...typography.headlineMd,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    textAlign: "center",
    letterSpacing: -0.3,
  },

  description: {
    ...typography.bodyMd,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 6,
    maxWidth: 320,
    fontWeight: "500",
  },

  sproutNote: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: rounded.full,
    gap: 6,
    marginTop: spacing.stackMd,
    overflow: "hidden",
    position: "relative",
  },

  sproutEmoji: {
    fontSize: 13,
  },

  sproutNoteText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "600",
    color: "#2E7D32",
  },
});
