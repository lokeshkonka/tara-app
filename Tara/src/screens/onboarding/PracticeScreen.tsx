import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";

interface PracticeScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function PracticeScreen({ onNext, onBack, onSkip }: PracticeScreenProps) {
  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={8}
      expression="listening"
      title="Practice on Your Farm"
      subtitle="Turn knowledge into action. I'll guide you through each step of implementing sustainable practices."
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
