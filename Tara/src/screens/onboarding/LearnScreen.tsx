import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";

interface LearnScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function LearnScreen({ onNext, onBack, onSkip }: LearnScreenProps) {
  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={8}
      expression="happy"
      title="Learn Every Day"
      subtitle="Get bite-sized, easy-to-follow lessons on natural farming techniques tailored for your land."
      actionText="Next"
      actionIcon="arrow-forward"
      canGoBack={true}
      canSkip={true}
      onAction={onNext}
      onBack={onBack}
      onSkip={onSkip}
    />
  );
}
