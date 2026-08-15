import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, typography } from "../../theme/theme";
import { StepIndicator } from "../ui/StepIndicator";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps?: number;
  canGoBack?: boolean;
  canSkip?: boolean;
  onBack?: () => void;
  onSkip?: () => void;
}

export function OnboardingHeader({
  currentStep,
  totalSteps = 8,
  canGoBack = true,
  canSkip = true,
  onBack,
  onSkip,
}: OnboardingHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.sideContainer}>
        {canGoBack && onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
          >
            <MaterialIcons
              name="arrow-back"
              size={22}
              color={colors.onSurfaceVariant}
            />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.centerContainer}>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </View>

      <View style={styles.sideContainerRight}>
        {canSkip && onSkip ? (
          <Pressable
            onPress={onSkip}
            accessibilityRole="button"
            accessibilityLabel="Skip onboarding"
            style={({ pressed }) => [
              styles.skipButton,
              pressed && styles.skipButtonPressed,
            ]}
          >
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  sideContainer: {
    width: 48,
    alignItems: "flex-start",
  },
  sideContainerRight: {
    width: 48,
    alignItems: "flex-end",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonPressed: {
    backgroundColor: colors.surfaceContainerHigh,
    transform: [{ scale: 0.94 }],
  },
  skipButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skipButtonPressed: {
    opacity: 0.6,
  },
  skipText: {
    ...typography.labelLg,
    color: colors.primary,
    fontWeight: "700",
  },
});
