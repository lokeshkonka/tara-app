import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, rounded, typography } from "../../theme/theme";

interface BadgeChipProps {
  label: string;
  variant?: "primary" | "tertiary" | "secondary" | "neutral";
  style?: StyleProp<ViewStyle>;
}

export function BadgeChip({
  label,
  variant = "primary",
  style,
}: BadgeChipProps) {
  const isPrimary = variant === "primary";
  const isTertiary = variant === "tertiary";
  const isSecondary = variant === "secondary";

  const getBackgroundColor = () => {
    if (isPrimary) return "rgba(76, 175, 80, 0.15)";
    if (isTertiary) return colors.tertiaryFixed;
    if (isSecondary) return colors.secondaryContainer;
    return colors.surfaceVariant;
  };

  const getTextColor = () => {
    if (isPrimary) return colors.primary;
    if (isTertiary) return colors.onTertiaryFixed;
    if (isSecondary) return colors.onSecondaryContainer;
    return colors.onSurfaceVariant;
  };

  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    alignSelf: "flex-start",
  },
  label: {
    ...typography.labelSm,
    fontWeight: "700",
  },
});
