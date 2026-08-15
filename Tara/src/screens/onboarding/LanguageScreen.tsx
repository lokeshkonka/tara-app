import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectionCard } from "../../components/ui/SelectionCard";
import { TactileButton } from "../../components/ui/TactileButton";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors, spacing, typography } from "../../theme/theme";

interface LanguageScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

export function LanguageScreen({ onContinue, onBack }: LanguageScreenProps) {
  const { languages, state, selectLanguage } = useOnboarding();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Language</Text>
          <Text style={styles.subtitle}>
            Tara speaks with you in your preferred mother tongue.
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {languages.map((lang) => {
            const isSelected = state.selectedLanguage === lang.code;
            return (
              <SelectionCard
                key={lang.id}
                title={lang.nativeName}
                subtitle={`${lang.name} (${lang.script})`}
                icon="translate"
                selected={isSelected}
                onPress={() => selectLanguage(lang.code)}
              />
            );
          })}
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
    paddingHorizontal: spacing.marginMobile,
  },
  header: {
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
    marginTop: 6,
  },
  list: {
    paddingVertical: spacing.stackSm,
  },
  footer: {
    paddingVertical: spacing.stackLg,
  },
});
