import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingHeader } from "../../components/onboarding/OnboardingHeader";
import { SelectionCard } from "../../components/ui/SelectionCard";
import { TactileButton } from "../../components/ui/TactileButton";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors, spacing, typography } from "../../theme/theme";

interface UserTypeScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export function UserTypeScreen({ onContinue, onBack }: UserTypeScreenProps) {
  const { userTypes, state, selectUserType } = useOnboarding();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <OnboardingHeader
          currentStep={2}
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
          <View style={styles.question}>
            <Text style={styles.title}>What Best Describes You?</Text>
            <Text style={styles.subtitle}>
              {"We'll customize your daily farming wisdom based on your farming style."}
            </Text>
          </View>

          <View style={styles.list}>
            {userTypes.map((type) => {
              const isSelected = state.selectedUserType === type.id;
              return (
                <SelectionCard
                  key={type.id}
                  title={type.title}
                  subtitle={type.subtitle}
                  icon="nature-people"
                  selected={isSelected}
                  onPress={() => selectUserType(type.id)}
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
            disabled={!state.selectedUserType}
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
