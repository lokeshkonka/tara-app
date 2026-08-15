import React from "react";
import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip?: () => void;
}

const WELCOME_CONTENT: Record<
  string,
  { title: string; subtitle: string; audio: any }
> = {
  en: {
    title: "Namaste! I'm Tara.",
    subtitle:
      "Your companion on the journey to sustainable and prosperous farming.",
    audio: require("../../../assets/onboarding-voices/screen1/english-speech.mp3"),
  },
  hi: {
    title: "नमस्ते! मैं तारा हूँ।",
    subtitle: "सतत और समृद्ध खेती की यात्रा में आपकी साथी।",
    audio: require("../../../assets/onboarding-voices/screen1/hindi-speech.mp3"),
  },
  te: {
    title: "నమస్తే! నేను తారాను.",
    subtitle:
      "సుస్థిరమైన మరియు అభివృద్ధి చెందిన వ్యవసాయం వైపు మీ ప్రయాణంలో మీ సహచరి.",
    audio: require("../../../assets/onboarding-voices/screen1/telugu-speech.mp3"),
  },
  ml: {
    title: "നമസ്കാരം! ഞാൻ താരയാണ്.",
    subtitle:
      "സുസ്ഥിരവും സമൃദ്ധവുമായ കൃഷിയിലേക്കുള്ള നിങ്ങളുടെ യാത്രയിൽ നിങ്ങളുടെ കൂട്ടുകാരി.",
    audio: require("../../../assets/onboarding-voices/screen1/malayalam-speech.mp3"),
  },
};

export function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = WELCOME_CONTENT[currentLang] || WELCOME_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={8}
      expression="hi-wave"
      title={content.title}
      subtitle={content.subtitle}
      audioSource={content.audio}
      showVoiceControl={true}
      actionText="Continue"
      actionIcon="arrow-forward"
      canGoBack={false}
      canSkip={true}
      showLanguageSelector={true}
      onAction={onNext}
      onSkip={onSkip}
      floatingBadges={[
        {
          icon: "waving-hand",
          color: colors.onTertiaryFixed,
          bgColor: colors.tertiaryFixed,
          position: "top-right",
        },
        {
          icon: "emoji-emotions",
          color: colors.onSecondaryContainer,
          bgColor: colors.secondaryContainer,
          position: "bottom-left",
        },
      ]}
    />
  );
}
