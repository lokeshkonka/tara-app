import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingHeader } from "../../components/onboarding/OnboardingHeader";
import { TaraMessageCard } from "../../components/tara-messages/TaraMessageCard";
import { SelectionCard } from "../../components/ui/SelectionCard";
import { TactileButton } from "../../components/ui/TactileButton";
import { TARA_LANGUAGE_MESSAGE } from "../../data/dummy/taraLanguageContent";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors, spacing, typography } from "../../theme/theme";

interface LanguageScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

export function LanguageScreen({ onContinue, onBack }: LanguageScreenProps) {
  const { languages, state, selectLanguage } = useOnboarding();

  const handleSelect = (lang: (typeof languages)[number]) => {
    if (lang.isComingSoon) {
      Alert.alert(
        "Coming Soon",
        `${lang.name} (${lang.nativeName}) language support is under development and will be available soon!`,
        [{ text: "OK" }]
      );
      return;
    }
    selectLanguage(lang.code);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <OnboardingHeader
          currentStep={1}
          totalSteps={3}
          canGoBack
          canSkip={false}
          onBack={onBack}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <TaraMessageCard
            message={TARA_LANGUAGE_MESSAGE.message}
            expression={TARA_LANGUAGE_MESSAGE.expression}
            audioSource={TARA_LANGUAGE_MESSAGE.audio}
          />

          <View style={styles.question}>
            <Text style={styles.title}>Choose your language</Text>
            <Text style={styles.subtitle}>
              Tara speaks with you in your preferred mother tongue.
            </Text>
          </View>

          <View style={styles.list}>
            {languages.map((lang) => {
              const isSelected = state.selectedLanguage === lang.code;
              return (
                <SelectionCard
                  key={lang.id}
                  title={lang.nativeName}
                  subtitle={`${lang.name} (${lang.script})`}
                  icon="translate"
                  selected={isSelected}
                  badge={lang.isComingSoon ? "Coming Soon" : undefined}
                  onPress={() => handleSelect(lang)}
                />
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TactileButton
            title="Continue"
            icon="arrow-forward"
            onPress={onContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackMd,
  },
  question: {
    marginTop: spacing.stackLg,
    marginBottom: spacing.stackMd,
    alignItems: "center",
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.primary,
    textAlign: "center",
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: spacing.stackSm,
  },
  list: {
    paddingVertical: spacing.stackSm,
  },
  footer: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.stackLg,
    backgroundColor: colors.background,
  },
});
