import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { ConceptHighlightCards } from "../../components/ui/ConceptHighlightCards";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";

interface PracticeScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const SCREEN_CONTENT: Record<string, { title: string; subtitle: string; audio: any }> = {
  en: {
    title: "Practice on Your Farm",
    subtitle: "Turn knowledge into action. I'll guide you through each step of implementing sustainable practices.",
    audio: require("../../../assets/onboarding-voices/screen4/english-speech.mp3"),
  },
  hi: {
    title: "अपने खेतों पर अभ्यास करें",
    subtitle: "ज्ञान को काम में बदलें। मैं आपको सतत खेती की तकनीकों को अपनाने के हर कदम पर मार्गदर्शन दूँगी।",
    audio: require("../../../assets/onboarding-voices/screen4/hindi-speech.mp3"),
  },
  te: {
    title: "మీ పొలాల్లో ఆచరించండి",
    subtitle: "నేర్చుకున్న జ్ఞానాన్ని ఆచరణలో పెట్టండి. సుస్థిర వ్యవసాయ పద్ధతులను అమలు చేసే ప్రతి దశలో నేను మీకు మార్గనిర్దేశం చేస్తాను.",
    audio: require("../../../assets/onboarding-voices/screen4/telugu-speech.mp3"),
  },
  ml: {
    title: "നിങ്ങളുടെ കൃഷിയിടത്തിൽ പരിശീലിക്കാം",
    subtitle: "പഠിച്ച അറിവിനെ പ്രവർത്തിയാക്കി മാറ്റാം. സുസ്ഥിര കൃഷിരീതികൾ നടപ്പിലാക്കുന്നതിലെ ഓരോ ഘട്ടത്തിലും ഞാൻ നിങ്ങളെ നയിക്കാം.",
    audio: require("../../../assets/onboarding-voices/screen4/malayalam-speech.mp3"),
  },
};

export function PracticeScreen({ onNext, onBack, onSkip }: PracticeScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = SCREEN_CONTENT[currentLang] || SCREEN_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={8}
      expression="listening"
      title={content.title}
      subtitle={content.subtitle}
      audioSource={content.audio}
      actionText="Next"
      actionIcon="arrow-forward"
      canGoBack={true}
      canSkip={true}
      showLanguageSelector={true}
      onAction={onNext}
      onBack={onBack}
      onSkip={onSkip}
      floatingBadges={[
        {
          icon: "grass",
          color: colors.onPrimaryContainer,
          bgColor: colors.primaryContainer,
          position: "top-right",
        },
        {
          icon: "handyman",
          color: colors.onSecondaryContainer,
          bgColor: colors.secondaryContainer,
          position: "bottom-left",
        },
      ]}
    >
      <ConceptHighlightCards
        cards={[
          {
            icon: "grass",
            title: "Step-by-Step",
            iconBgColor: "rgba(76, 175, 80, 0.15)",
            iconColor: colors.primaryContainer,
          },
          {
            icon: "handyman",
            title: "Hands-on",
            iconBgColor: colors.secondaryContainer,
            iconColor: colors.secondary,
          },
        ]}
      />
    </OnboardingLayout>
  );
}
