import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";

interface VerifyScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function VerifyScreen({ onNext, onBack, onSkip }: VerifyScreenProps) {
  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={8}
      expression="surprised"
      title="AI-Powered Verification"
      subtitle="Take a photo of your work. My AI eyes will verify your practice to help you stay on track."
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
