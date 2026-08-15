import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { ConceptHighlightCards } from "../../components/ui/ConceptHighlightCards";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";

interface VerifyScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const SCREEN_CONTENT: Record<string, { title: string; subtitle: string; audio: any }> = {
  en: {
    title: "AI-Powered Verification",
    subtitle: "Take a photo of your work. My AI eyes will verify your practice and help you stay on track.",
    audio: require("../../../assets/onboarding-voices/screen5/english-speech.mp3"),
  },
  hi: {
    title: "AI-संचालित सत्यापन",
    subtitle: "अपने काम की एक तस्वीर लें। मेरी AI आँखें आपके अभ्यास की जाँच करेंगी और आपको सही दिशा में आगे बढ़ने में मदद करेंगी।",
    audio: require("../../../assets/onboarding-voices/screen5/hindi-speech.mp3"),
  },
  te: {
    title: "AI ఆధారిత ధృవీకరణ",
    subtitle: "మీ పని యొక్క ఒక ఫోటో తీయండి. నా AI కళ్ళు మీ ఆచరణను ధృవీకరించి, మీరు సరైన మార్గంలో కొనసాగేందుకు సహాయపడతాయి.",
    audio: require("../../../assets/onboarding-voices/screen5/telugu-speech.mp3"),
  },
  ml: {
    title: "AI അധിഷ്ഠിത പരിശോധന",
    subtitle: "നിങ്ങളുടെ പ്രവർത്തനത്തിന്റെ ഒരു ഫോട്ടോ എടുക്കൂ. എന്റെ AI കണ്ണുകൾ നിങ്ങളുടെ കൃഷിരീതി പരിശോധിച്ച്, നിങ്ങൾ ശരിയായ പാതയിൽ തുടരാൻ സഹായിക്കും.",
    audio: require("../../../assets/onboarding-voices/screen5/malayalam-speech.mp3"),
  },
};

export function VerifyScreen({ onNext, onBack, onSkip }: VerifyScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = SCREEN_CONTENT[currentLang] || SCREEN_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={8}
      expression="surprised"
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
          icon: "photo-camera",
          color: colors.onPrimaryContainer,
          bgColor: colors.primaryContainer,
          position: "top-right",
        },
        {
          icon: "verified",
          color: colors.onTertiaryFixed,
          bgColor: colors.tertiaryFixed,
          position: "bottom-left",
        },
      ]}
    >
      <ConceptHighlightCards
        cards={[
          {
            icon: "photo-camera",
            title: "Snap a Photo",
            iconBgColor: "rgba(76, 175, 80, 0.15)",
            iconColor: colors.primaryContainer,
          },
          {
            icon: "verified",
            title: "AI Verification",
            iconBgColor: colors.tertiaryFixed,
            iconColor: colors.tertiary,
          },
        ]}
      />
    </OnboardingLayout>
  );
}
