import { View } from "react-native";
import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { ConceptHighlightCards } from "../../components/ui/ConceptHighlightCards";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";

interface PurposeScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const SCREEN_CONTENT: Record<string, { title: string; subtitle: string; audio: any }> = {
  en: {
    title: "Why Sustainable Farming?",
    subtitle: "To heal our soil, grow healthier food, and ensure a better future for our children.",
    audio: require("../../../assets/onboarding-voices/screen2/english-speech.mp3"),
  },
  hi: {
    title: "सतत खेती क्यों?",
    subtitle: "अपनी मिट्टी को स्वस्थ करने, पौष्टिक भोजन उगाने और अपने बच्चों के लिए बेहतर भविष्य सुनिश्चित करने के लिए।",
    audio: require("../../../assets/onboarding-voices/screen2/hindi-speech.mp3"),
  },
  te: {
    title: "సుస్థిర వ్యవసాయం ఎందుకు?",
    subtitle: "మన నేలను ఆరోగ్యంగా మార్చడానికి, ఆరోగ్యకరమైన ఆహారాన్ని పండించడానికి, మన పిల్లలకు మెరుగైన భవిష్యత్తును అందించడానికి.",
    audio: require("../../../assets/onboarding-voices/screen2/telugu-speech.mp3"),
  },
  ml: {
    title: "സുസ്ഥിര കൃഷി എന്തുകൊണ്ട്?",
    subtitle: "നമ്മുടെ മണ്ണിനെ സംരക്ഷിക്കാനും ആരോഗ്യകരമായ ഭക്ഷണം വളർത്താനും നമ്മുടെ കുട്ടികൾക്ക് മികച്ചൊരു ഭാവി ഉറപ്പാക്കാനും.",
    audio: require("../../../assets/onboarding-voices/screen2/malayalam-speech.mp3"),
  },
};

export function PurposeScreen({
  onNext,
  onBack,
  onSkip,
}: PurposeScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = SCREEN_CONTENT[currentLang] || SCREEN_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={8}
      expression="thinking"
      title={content.title}
      subtitle={content.subtitle}
      audioSource={content.audio}
      actionText="Continue"
      actionIcon="arrow-forward"
      canGoBack={true}
      canSkip={true}
      showLanguageSelector={true}
      onAction={onNext}
      onBack={onBack}
      onSkip={onSkip}
      floatingBadges={[
        {
          icon: "eco",
          color: colors.onPrimaryContainer,
          bgColor: colors.primaryContainer,
          position: "top-right",
        },
        {
          icon: "restaurant",
          color: colors.onTertiaryFixed,
          bgColor: colors.tertiaryFixed,
          position: "bottom-left",
        },
      ]}
    >
      <ConceptHighlightCards
        cards={[
          {
            icon: "eco",
            title: "Heal Soil",
            iconBgColor: "rgba(76, 175, 80, 0.15)",
            iconColor: colors.primaryContainer,
          },
          {
            icon: "restaurant",
            title: "Healthier Food",
            iconBgColor: colors.tertiaryFixed,
            iconColor: colors.tertiary,
          },
        ]}
      />
    </OnboardingLayout>
  );
}
