import React, { useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, rounded, typography } from "../../theme/theme";

export type ButtonVariant = "primary" | "secondary" | "reward" | "ghost";

interface TactileButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  depth?: number;
  borderRadius?: number;
  autoAdvanceProgress?: Animated.Value;
  children?: ReactNode;
}

export function TactileButton({
  title,
  onPress,
  variant = "primary",
  icon,
  iconPosition = "right",
  disabled = false,
  loading = false,
  style,
  textStyle,
  height = 54,
  depth = 4.5,
  borderRadius = rounded.lg,
  autoAdvanceProgress,
  children,
}: TactileButtonProps) {
  const [pressAnim] = useState(() => new Animated.Value(0));

  const handlePressIn = () => {
    if (disabled || loading) return;
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {
        // ignore on unsupported platforms
      }
    }
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: Platform.OS !== "web",
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: Platform.OS !== "web",
      tension: 250,
      friction: 16,
    }).start();
  };

  // 3D Push-down physics: Top face slides down by `depth` to cover the dark base
  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, depth],
  });

  // Pick color palette based on variant
  const getPalette = () => {
    if (disabled) {
      return {
        face: "#E3E7E1",
        depth: "#C7CDC4",
        text: "#8F9A8C",
        border: "transparent",
      };
    }
    switch (variant) {
      case "primary":
        return {
          face: "#3FA84E", // Vibrant lush green top face
          depth: "#186A25", // 3D dark green extruded foundation
          text: "#FFFFFF",
          border: "transparent",
        };
      case "reward":
        return {
          face: "#CDA721", // Golden amber top face
          depth: "#7A5E00", // Deep amber 3D base
          text: "#FFFFFF",
          border: "transparent",
        };
      case "secondary":
        return {
          face: "#FFFFFF",
          depth: "#BAC4B7",
          text: colors.primary,
          border: "#D0D9CD",
        };
      case "ghost":
        return {
          face: "transparent",
          depth: "transparent",
          text: colors.onSurfaceVariant,
          border: "transparent",
        };
      default:
        return {
          face: "#3FA84E",
          depth: "#186A25",
          text: "#FFFFFF",
          border: "transparent",
        };
    }
  };

  const palette = getPalette();
  const isGhost = variant === "ghost";

  if (isGhost) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={({ pressed }) => [
          styles.ghostButton,
          { opacity: pressed ? 0.7 : 1 },
          style,
        ]}
      >
        <Text style={[styles.buttonText, { color: palette.text }, textStyle]}>
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.outerContainer,
        {
          height: height + depth,
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={styles.pressableContainer}
      >
        {/* 1. Bottom 3D extruded foundation layer */}
        <View
          style={[
            styles.depthLayer,
            {
              backgroundColor: palette.depth,
              borderRadius: borderRadius,
              top: depth,
              height: height,
            },
          ]}
        />

        {/* 2. Top Interactive Face Layer that presses down */}
        <Animated.View
          style={[
            styles.faceLayer,
            {
              backgroundColor: palette.face,
              borderRadius: borderRadius,
              height: height,
              transform: [{ translateY }],
              borderWidth: palette.border !== "transparent" ? 1.5 : 0,
              borderColor: palette.border,
              overflow: "hidden", // added to contain the splash fill
            },
          ]}
        >
          {/* Watery Splash Auto-Advance Fill */}
          {autoAdvanceProgress && (
            <Animated.View
              style={[
                styles.autoAdvanceFill,
                {
                  width: autoAdvanceProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          )}

          {loading ? (
            <ActivityIndicator color={palette.text} size="small" />
          ) : (
            <View style={styles.contentRow}>
              {icon && iconPosition === "left" && (
                <MaterialIcons
                  name={icon}
                  size={20}
                  color={palette.text}
                  style={styles.iconLeft}
                />
              )}
              <Text
                style={[
                  styles.buttonText,
                  { color: palette.text },
                  textStyle,
                ]}
              >
                {title}
              </Text>
              {icon && iconPosition === "right" && (
                <MaterialIcons
                  name={icon}
                  size={20}
                  color={palette.text}
                  style={styles.iconRight}
                />
              )}
              {children}
            </View>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    position: "relative",
  },
  pressableContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  depthLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
  },
  faceLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...typography.labelLg,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  ghostButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  autoAdvanceFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
});
