import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";

interface ReadyScreenProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function ReadyScreen({
  onComplete,
  onBack,
  isLoading = false,
}: ReadyScreenProps) {
  return (
    <OnboardingLayout
      currentStep={8}
      totalSteps={8}
      expression="winking"
      title="Ready for the Journey?"
      subtitle="Let's build a greener future together. Your first practice is waiting for you!"
      actionText="Get Started"
      actionIcon="rocket-launch"
      actionVariant="primary"
      canGoBack={true}
      canSkip={false}
      onAction={onComplete}
      onBack={onBack}
      isLoading={isLoading}
    />
  );
}
