import { StyleSheet, Text, View } from "react-native";
import { OnboardingLayout } from "../../components/onboarding/OnboardingLayout";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors, spacing, typography } from "../../theme/theme";

interface RewardsScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const SCREEN_CONTENT: Record<string, { title: string; subtitle: string; audio: any }> = {
  en: {
    title: "Earn as You Grow",
    subtitle: "Collect XP, earn badges, and unlock rewards as you improve your soil health and farming impact.",
    audio: require("../../../assets/onboarding-voices/screen7/english-speech.mp3"),
  },
  hi: {
    title: "बढ़ते जाएँ, कमाते जाएँ",
    subtitle: "XP अर्जित करें, बैज पाएं और अपनी मिट्टी की सेहत व खेती के प्रभाव को बेहतर बनाते हुए पुरस्कार अनलॉक करें।",
    audio: require("../../../assets/onboarding-voices/screen7/hindi-speech.mp3"),
  },
  te: {
    title: "ఎదుగుతూ సంపాదించండి",
    subtitle: "XP సంపాదించండి, బ్యాడ్జ్‌లు పొందండి మరియు మీ నేల ఆరోగ్యం, వ్యవసాయ ప్రభావాన్ని మెరుగుపరుచుకుంటూ రివార్డులను అన్‌లాక్ చేయండి.",
    audio: require("../../../assets/onboarding-voices/screen7/telugu-speech.mp3"),
  },
  ml: {
    title: "വളരുന്നതിനൊപ്പം നേടൂ",
    subtitle: "XP നേടൂ, ബാഡ്ജുകൾ സ്വന്തമാക്കൂ, നിങ്ങളുടെ മണ്ണിന്റെ ആരോഗ്യവും കൃഷിയുടെ സ്വാധീനവും മെച്ചപ്പെടുത്തുന്നതിനൊപ്പം റിവാർഡുകൾ അൺലോക്ക് ചെയ്യൂ.",
    audio: require("../../../assets/onboarding-voices/screen7/malayalam-speech.mp3"),
  },
};

export function RewardsScreen({
  onNext,
  onBack,
  onSkip,
}: RewardsScreenProps) {
  const { state } = useOnboarding();
  const currentLang = state.selectedLanguage || "en";
  const content = SCREEN_CONTENT[currentLang] || SCREEN_CONTENT.en;

  return (
    <OnboardingLayout
      currentStep={7}
      totalSteps={8}
      expression="excited"
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
          icon: "military-tech",
          color: colors.tertiary,
          bgColor: colors.surfaceContainerLowest,
          position: "top-right",
        },
        {
          icon: "star",
          color: colors.primaryContainer,
          bgColor: colors.surfaceContainerLowest,
          position: "bottom-left",
        },
      ]}
    >
      {/* XP Progress Bar Showcase */}
      <View style={styles.xpContainer}>
        <ProgressBar
          progress={0.65}
          color={colors.tertiaryContainer}
          height={12}
        />
        <Text style={styles.xpText}>+150 XP</Text>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  xpContainer: {
    width: "100%",
    maxWidth: 260,
    alignItems: "center",
    marginTop: spacing.stackSm,
  },
  xpText: {
    ...typography.labelSm,
    color: colors.tertiary,
    fontWeight: "800",
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
