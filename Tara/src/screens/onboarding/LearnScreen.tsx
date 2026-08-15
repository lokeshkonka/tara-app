import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { ConceptHighlightCards } from "../../components/ui/ConceptHighlightCards";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";

interface LearnScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const SCREEN_CONTENT: Record<string, { title: string; subtitle: string; audio: any }> = {
  en: {
    title: "Learn Every Day",
    subtitle: "Get bite-sized, easy-to-follow lessons on natural farming techniques tailored for your land.",
    audio: require("../../../assets/onboarding-voices/screen3/english-speech.mp3"),
  },
  hi: {
    title: "हर दिन सीखें",
    subtitle: "अपनी भूमि के अनुसार तैयार की गई प्राकृतिक खेती की तकनीकों पर छोटे, आसान और सरल पाठ सीखें।",
    audio: require("../../../assets/onboarding-voices/screen3/hindi-speech.mp3"),
  },
  te: {
    title: "ప్రతిరోజూ నేర్చుకోండి",
    subtitle: "మీ భూమికి అనుగుణంగా రూపొందించిన సహజ వ్యవసాయ పద్ధతులపై చిన్న, సులభంగా అనుసరించగల పాఠాలను నేర్చుకోండి.",
    audio: require("../../../assets/onboarding-voices/screen3/telugu-speech.mp3"),
  },
  ml: {
    title: "എല്ലാ ദിവസവും പഠിക്കാം",
    subtitle: "നിങ്ങളുടെ കൃഷിയിടത്തിന് അനുയോജ്യമായ പ്രകൃതികൃഷി രീതികളെക്കുറിച്ചുള്ള ചെറുതും എളുപ്പത്തിൽ പിന്തുടരാവുന്നതുമായ പാഠങ്ങൾ പഠിക്കൂ.",
    audio: require("../../../assets/onboarding-voices/screen3/malayalam-speech.mp3"),
  },
};

export function LearnScreen({ onNext, onBack, onSkip }: LearnScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = SCREEN_CONTENT[currentLang] || SCREEN_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={8}
      expression="happy"
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
          icon: "menu-book",
          color: colors.onPrimaryContainer,
          bgColor: colors.primaryContainer,
          position: "top-right",
        },
        {
          icon: "lightbulb",
          color: colors.tertiary,
          bgColor: colors.tertiaryFixed,
          position: "bottom-left",
        },
      ]}
    >
      <ConceptHighlightCards
        cards={[
          {
            icon: "menu-book",
            title: "Short Lessons",
            iconBgColor: "rgba(76, 175, 80, 0.15)",
            iconColor: colors.primaryContainer,
          },
          {
            icon: "lightbulb",
            title: "Smart Tips",
            iconBgColor: colors.tertiaryFixed,
            iconColor: colors.tertiary,
          },
        ]}
      />
    </OnboardingLayout>
  );
}
