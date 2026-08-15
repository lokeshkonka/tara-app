import { useState, type ReactNode } from "react";
import {
  Animated,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { buttonStyles, colors, rounded, typography } from "../../theme/theme";

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
  children,
}: TactileButtonProps) {
  const [pressAnim] = useState(() => new Animated.Value(0));

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, variant === "secondary" ? 1 : 2.5],
  });

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.98],
  });

  // Pick base styling
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isReward = variant === "reward";
  const isGhost = variant === "ghost";

  const getContainerStyle = () => {
    if (disabled) {
      return styles.disabledButton;
    }
    if (isPrimary) return styles.primaryButton;
    if (isSecondary) return styles.secondaryButton;
    if (isReward) return styles.rewardButton;
    if (isGhost) return styles.ghostButton;
    return styles.primaryButton;
  };

  const getTextColor = () => {
    if (disabled) return colors.onSurfaceVariant;
    if (isPrimary) return colors.onPrimary;
    if (isSecondary) return colors.primary;
    if (isReward) return colors.onPrimaryFixed;
    if (isGhost) return colors.onSurfaceVariant;
    return colors.onPrimary;
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ translateY }, { scale }],
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
        style={[styles.baseButton, getContainerStyle()]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && iconPosition === "left" && (
              <MaterialIcons
                name={icon}
                size={20}
                color={getTextColor()}
                style={styles.iconLeft}
              />
            )}
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
              {title}
            </Text>
            {icon && iconPosition === "right" && (
              <MaterialIcons
                name={icon}
                size={20}
                color={getTextColor()}
                style={styles.iconRight}
              />
            )}
            {children}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  baseButton: {
    height: 56,
    borderRadius: rounded.xl,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    flexDirection: "row",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...typography.labelLg,
    fontSize: 16,
    fontWeight: "700",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: buttonStyles.primary.default.backgroundColor,
    borderBottomWidth: buttonStyles.primary.default.borderBottomWidth,
    borderBottomColor: buttonStyles.primary.default.borderBottomColor,
    shadowColor: buttonStyles.primary.default.shadow.shadowColor,
    shadowOffset: buttonStyles.primary.default.shadow.shadowOffset,
    shadowOpacity: buttonStyles.primary.default.shadow.shadowOpacity,
    shadowRadius: buttonStyles.primary.default.shadow.shadowRadius,
    elevation: buttonStyles.primary.default.shadow.elevation,
  },
  secondaryButton: {
    backgroundColor: buttonStyles.secondary.default.backgroundColor,
    borderWidth: buttonStyles.secondary.default.borderWidth,
    borderColor: buttonStyles.secondary.default.borderColor,
    borderBottomWidth: buttonStyles.secondary.default.borderBottomWidth,
    borderBottomColor: buttonStyles.secondary.default.borderBottomColor,
  },
  rewardButton: {
    backgroundColor: buttonStyles.reward.default.backgroundColor,
    borderBottomWidth: buttonStyles.reward.default.borderBottomWidth,
    borderBottomColor: buttonStyles.reward.default.borderBottomColor,
    shadowColor: buttonStyles.reward.default.shadow.shadowColor,
    shadowOffset: buttonStyles.reward.default.shadow.shadowOffset,
    shadowOpacity: buttonStyles.reward.default.shadow.shadowOpacity,
    shadowRadius: buttonStyles.reward.default.shadow.shadowRadius,
    elevation: buttonStyles.reward.default.shadow.elevation,
  },
  ghostButton: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    height: 44,
  },
  disabledButton: {
    backgroundColor: colors.surfaceDim,
    borderBottomWidth: 0,
    opacity: 0.6,
  },
});
