import { StyleSheet, View } from "react-native";
import { colors, rounded } from "../../theme/theme";

interface StepIndicatorProps {
  currentStep: number; // 1-indexed
  totalSteps?: number;
}

export function StepIndicator({
  currentStep,
  totalSteps = 8,
}: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {steps.map((step) => {
        const isActive = step === currentStep;
        return (
          <View
            key={step}
            style={[
              styles.dot,
              isActive ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: rounded.full,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.surfaceVariant,
  },
  activeDot: {
    width: 32,
    backgroundColor: colors.primaryContainer,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
});
