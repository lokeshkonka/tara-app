import { StyleSheet, Text, View } from "react-native";
import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { colors, spacing, typography } from "../../theme/theme";

interface RewardsScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function RewardsScreen({
  onNext,
  onBack,
  onSkip,
}: RewardsScreenProps) {
  return (
    <OnboardingLayout
      currentStep={7}
      totalSteps={8}
      expression="excited"
      title="Earn as You Grow"
      subtitle="Collect XP, earn badges, and unlock rewards as you improve your soil health and impact."
      actionText="Next"
      actionIcon="arrow-forward"
      canGoBack={true}
      canSkip={true}
      onAction={onNext}
      onBack={onBack}
      onSkip={onSkip}
      floatingBadges={[
        {
          icon: "military-tech",
          color: colors.tertiary,
          bgColor: colors.surfaceContainerLowest,
          position: "top-right",
        },
        {
          icon: "star",
          color: colors.primaryContainer,
          bgColor: colors.surfaceContainerLowest,
          position: "bottom-left",
        },
      ]}
    >
      {/* XP Progress Bar Showcase */}
      <View style={styles.xpContainer}>
        <ProgressBar
          progress={0.65}
          color={colors.tertiaryContainer}
          height={12}
        />
        <Text style={styles.xpText}>+150 XP</Text>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  xpContainer: {
    width: "100%",
    maxWidth: 260,
    alignItems: "center",
    marginTop: spacing.stackSm,
  },
  xpText: {
    ...typography.labelSm,
    color: colors.tertiary,
    fontWeight: "800",
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
