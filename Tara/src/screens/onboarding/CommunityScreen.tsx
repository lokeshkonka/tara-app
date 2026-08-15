import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { ConceptHighlightCards } from "../../components/ui/ConceptHighlightCards";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors } from "../../theme/theme";

interface CommunityScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const SCREEN_CONTENT: Record<string, { title: string; subtitle: string; audio: any }> = {
  en: {
    title: "Grow with the Community",
    subtitle: "Share your success, ask questions, and learn from fellow farmers in your local area.",
    audio: require("../../../assets/onboarding-voices/screen6/english-speech.mp3"),
  },
  hi: {
    title: "समुदाय के साथ आगे बढ़ें",
    subtitle: "अपनी सफलता साझा करें, सवाल पूछें और अपने स्थानीय क्षेत्र के साथी किसानों से सीखें।",
    audio: require("../../../assets/onboarding-voices/screen6/hindi-speech.mp3"),
  },
  te: {
    title: "సమాజంతో కలిసి ఎదగండి",
    subtitle: "మీ విజయాలను పంచుకోండి, ప్రశ్నలు అడగండి మరియు మీ స్థానిక ప్రాంతంలోని తోటి రైతుల నుండి నేర్చుకోండి.",
    audio: require("../../../assets/onboarding-voices/screen6/telugu-speech.mp3"),
  },
  ml: {
    title: "കർഷക സമൂഹത്തോടൊപ്പം വളരാം",
    subtitle: "നിങ്ങളുടെ വിജയങ്ങൾ പങ്കുവെക്കൂ, ചോദ്യങ്ങൾ ചോദിക്കൂ, നിങ്ങളുടെ പ്രദേശത്തെ സഹകർഷകരിൽ നിന്ന് പഠിക്കൂ.",
    audio: require("../../../assets/onboarding-voices/screen6/malayalam-speech.mp3"),
  },
};

export function CommunityScreen({
  onNext,
  onBack,
  onSkip,
}: CommunityScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = SCREEN_CONTENT[currentLang] || SCREEN_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={8}
      expression="laughing"
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
          icon: "forum",
          color: colors.onTertiaryFixed,
          bgColor: colors.tertiaryFixed,
          position: "top-right",
        },
        {
          icon: "people",
          color: colors.onSecondaryContainer,
          bgColor: colors.secondaryContainer,
          position: "bottom-left",
        },
      ]}
    >
      <ConceptHighlightCards
        cards={[
          {
            icon: "forum",
            title: "Discussions",
            iconBgColor: colors.tertiaryFixed,
            iconColor: colors.tertiary,
          },
          {
            icon: "people",
            title: "Local Farmers",
            iconBgColor: colors.secondaryContainer,
            iconColor: colors.secondary,
          },
        ]}
      />
    </OnboardingLayout>
  );
}
