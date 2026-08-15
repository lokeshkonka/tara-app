import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { colors, rounded, spacing, typography } from "../../theme/theme";

interface PurposeScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function PurposeScreen({
  onNext,
  onBack,
  onSkip,
}: PurposeScreenProps) {
  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={8}
      expression="thinking"
      title="Why Sustainable Farming?"
      subtitle="To heal our soil, grow healthier food, and ensure a better future for our children."
      actionText="Continue"
      actionIcon="arrow-forward"
      canGoBack={true}
      canSkip={true}
      onAction={onNext}
      onBack={onBack}
      onSkip={onSkip}
    >
      {/* 2 Concept Highlight Cards */}
      <View style={styles.cardsGrid}>
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: "rgba(76, 175, 80, 0.15)" }]}>
            <MaterialIcons
              name="eco"
              size={24}
              color={colors.primaryContainer}
            />
          </View>
          <Text style={styles.cardLabel}>Heal Soil</Text>
        </View>

        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: colors.tertiaryFixed }]}>
            <MaterialIcons
              name="restaurant"
              size={24}
              color={colors.tertiary}
            />
          </View>
          <Text style={styles.cardLabel}>Healthier Food</Text>
        </View>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  cardsGrid: {
    flexDirection: "row",
    gap: spacing.gutter,
    width: "100%",
    maxWidth: 360,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: rounded.xl,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardLabel: {
    ...typography.labelLg,
    color: colors.onSurface,
    textAlign: "center",
  },
});
