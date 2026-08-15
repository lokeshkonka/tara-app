import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip?: () => void;
}

export function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={8}
      expression="hi-wave"
      title="Namaste! I'm Tara."
      subtitle="Your companion on the journey to sustainable and prosperous farming."
      actionText="Continue"
      actionIcon="arrow-forward"
      canGoBack={false}
      canSkip={true}
      onAction={onNext}
      onSkip={onSkip}
    />
  );
}
