import React, { memo, useRef, useState, type ReactNode } from "react";
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
import { colors, componentColors, rounded, typography } from "../../theme/theme";

export type ButtonVariant = "primary" | "secondary" | "reward" | "danger" | "ghost";

export interface TactileButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  faceColor?: string;
  depthColor?: string;
  borderColor?: string;
  textColor?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  depth?: number;
  borderRadius?: number;
  paddingHorizontal?: number;
  autoAdvanceProgress?: Animated.Value;
  children?: ReactNode;
}

/**
 * High-Performance 3D Tactile Push-Down Button
 * - Zero touch dead-zones across iOS, Android, and Web
 * - Multi-lingual auto-fitting single-line typography
 * - Central design token theme integration
 * - Smooth hardware-accelerated 3D spring physics
 */
export const TactileButton = memo(function TactileButton({
  title,
  onPress,
  variant = "primary",
  faceColor,
  depthColor,
  borderColor,
  textColor,
  icon,
  iconPosition = "right",
  disabled = false,
  loading = false,
  style,
  textStyle,
  height = 54,
  depth = 4,
  borderRadius = rounded.full,
  paddingHorizontal = 18,
  autoAdvanceProgress,
  children,
}: TactileButtonProps) {
  const pressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (disabled || loading) return;
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {}
    }
    Animated.spring(pressAnim, {
      toValue: 1,
      tension: 300,
      friction: 18,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    Animated.spring(pressAnim, {
      toValue: 0,
      tension: 250,
      friction: 16,
      useNativeDriver: true,
    }).start();
  };

  // 3D Push-down physics: Top face depresses down by `depth`
  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, depth],
  });

  // Palette resolution from theme tokens
  const getPalette = () => {
    if (disabled) {
      return {
        face: "#E2E8F0",
        depth: "#CBD5E1",
        text: "#94A3B8",
        border: "transparent",
      };
    }
    if (faceColor && depthColor) {
      return {
        face: faceColor,
        depth: depthColor,
        text: textColor ?? "#FFFFFF",
        border: borderColor ?? "transparent",
      };
    }
    switch (variant) {
      case "primary":
        return {
          face: colors.primaryContainer ?? "#16A34A",
          depth: colors.onPrimaryFixedVariant ?? "#15803D",
          text: "#FFFFFF",
          border: "transparent",
        };
      case "reward":
        return {
          face: "#D97706",
          depth: "#92400E",
          text: "#FFFFFF",
          border: "transparent",
        };
      case "danger":
        return {
          face: colors.error ?? "#DC2626",
          depth: "#991B1B",
          text: "#FFFFFF",
          border: "transparent",
        };
      case "secondary":
        return {
          face: "#FFFFFF",
          depth: "#CBD5E1",
          text: colors.primaryContainer ?? "#16A34A",
          border: "#E2E8F0",
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
          face: colors.primaryContainer ?? "#16A34A",
          depth: colors.onPrimaryFixedVariant ?? "#15803D",
          text: "#FFFFFF",
          border: "transparent",
        };
    }
  };

  const palette = getPalette();

  if (variant === "ghost") {
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
        <Text
          numberOfLines={1}
          style={[styles.buttonText, { color: palette.text }, textStyle]}
        >
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
        hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        accessibilityRole="button"
        accessibilityLabel={title || (icon ? String(icon) : "Button")}
        style={styles.pressableContainer}
      >
        {/* 1. 3D Foundation Base Cylinder Layer */}
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

        {/* 2. Top Interactive Face Layer */}
        <Animated.View
          style={[
            styles.faceLayer,
            {
              backgroundColor: palette.face,
              borderRadius: borderRadius,
              height: height,
              paddingHorizontal: paddingHorizontal,
              transform: [{ translateY }],
              borderWidth: palette.border !== "transparent" ? 1.5 : 0,
              borderColor: palette.border,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={palette.text} size="small" />
          ) : (
            <View style={styles.contentRow}>
              {icon && iconPosition === "left" && (
                <MaterialIcons
                  name={icon}
                  size={20}
                  color={palette.text}
                  style={title ? styles.iconLeft : undefined}
                />
              )}
              {!!title && (
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.82}
                  style={[
                    styles.buttonText,
                    { color: palette.text },
                    textStyle,
                  ]}
                >
                  {title}
                </Text>
              )}
              {icon && iconPosition === "right" && (
                <MaterialIcons
                  name={icon}
                  size={20}
                  color={palette.text}
                  style={title ? styles.iconRight : undefined}
                />
              )}
              {children}
            </View>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
});

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  buttonText: {
    ...typography.labelLg,
    fontSize: 15.5,
    fontWeight: "800",
    letterSpacing: 0.3,
    textAlign: "center",
    flexShrink: 1,
  },
  iconLeft: {
    marginRight: 7,
  },
  iconRight: {
    marginLeft: 7,
  },
  ghostButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});
