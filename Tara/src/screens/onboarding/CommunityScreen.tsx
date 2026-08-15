import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { colors } from "../../theme/theme";

interface CommunityScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function CommunityScreen({
  onNext,
  onBack,
  onSkip,
}: CommunityScreenProps) {
  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={8}
      expression="laughing"
      title="Grow with the Community"
      subtitle="Share your success, ask questions, and learn from fellow farmers in your local area."
      actionText="Next"
      actionIcon="arrow-forward"
      canGoBack={true}
      canSkip={true}
      onAction={onNext}
      onBack={onBack}
      onSkip={onSkip}
      floatingBadges={[
        {
          icon: "forum",
          color: colors.onTertiaryFixed,
          bgColor: colors.tertiaryFixed,
          position: "top-right",
        },
        {
          icon: "people",
          color: colors.onSecondaryContainer,
          bgColor: colors.secondaryContainer,
          position: "bottom-left",
        },
      ]}
    />
  );
}
