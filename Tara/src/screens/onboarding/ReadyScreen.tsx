import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";

interface ReadyScreenProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const SCREEN_CONTENT: Record<string, { title: string; subtitle: string; audio: any }> = {
  en: {
    title: "Ready for the journey?",
    subtitle: "Let's build a greener future together. Your first practice is waiting for you.",
    audio: require("../../../assets/onboarding-voices/screen8/english-speech.mp3"),
  },
  hi: {
    title: "क्या आप इस यात्रा के लिए तैयार हैं?",
    subtitle: "आइए, मिलकर एक हरित भविष्य का निर्माण करें। आपका पहला अभ्यास आपका इंतज़ार कर रहा है।",
    audio: require("../../../assets/onboarding-voices/screen8/hindi-speech.mp3"),
  },
  te: {
    title: "ఈ ప్రయాణానికి సిద్ధంగా ఉన్నారా?",
    subtitle: "మనమందరం కలిసి పచ్చని భవిష్యత్తును నిర్మిద్దాం. మీ మొదటి అభ్యాసం మీ కోసం ఎదురుచూస్తోంది.",
    audio: require("../../../assets/onboarding-voices/screen8/telugu-speech.mp3"),
  },
  ml: {
    title: "ഈ യാത്രയ്ക്ക് തയ്യാറാണോ?",
    subtitle: "നമുക്ക് ഒരുമിച്ച് ഹരിതമായൊരു ഭാവി കെട്ടിപ്പടുക്കാം. നിങ്ങളുടെ ആദ്യ പരിശീലനം നിങ്ങളെ കാത്തിരിക്കുന്നു.",
    audio: require("../../../assets/onboarding-voices/screen8/malayalam-speech.mp3"),
  },
};

export function ReadyScreen({
  onComplete,
  onBack,
  isLoading = false,
}: ReadyScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = SCREEN_CONTENT[currentLang] || SCREEN_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={8}
      totalSteps={8}
      expression="winking"
      title={content.title}
      subtitle={content.subtitle}
      audioSource={content.audio}
      actionText="Get Started"
      actionIcon="rocket-launch"
      actionVariant="primary"
      canGoBack={true}
      canSkip={false}
      showLanguageSelector={true}
      onAction={onComplete}
      onBack={onBack}
      isLoading={isLoading}
      floatingBadges={[
        {
          icon: "rocket-launch",
          color: colors.onPrimaryContainer,
          bgColor: colors.primaryContainer,
          position: "top-right",
        },
        {
          icon: "flag",
          color: colors.tertiary,
          bgColor: colors.tertiaryFixed,
          position: "bottom-left",
        },
      ]}
    />
  );
}
