import React, { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useOnboarding } from "../../hooks/useOnboarding";
import { LANGUAGES_DATA } from "../../data/dummy/languagesData";
import { colors, rounded, typography } from "../../theme/theme";
import { StepIndicator } from "../ui/StepIndicator";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps?: number;
  canGoBack?: boolean;
  canSkip?: boolean;
  showLanguageSelector?: boolean;
  onBack?: () => void;
  onSkip?: () => void;
}

export function OnboardingHeader({
  currentStep,
  totalSteps = 8,
  canGoBack = true,
  canSkip = true,
  showLanguageSelector = false,
  onBack,
  onSkip,
}: OnboardingHeaderProps) {
  const { state, selectLanguage } = useOnboarding();
  const [languagePickerOpen, setLanguagePickerOpen] = useState(false);

  const currentLang =
    LANGUAGES_DATA.find((lang) => lang.code === state.selectedLanguage) ??
    LANGUAGES_DATA[0];

  const handleSelectLang = (lang: typeof LANGUAGES_DATA[number]) => {
    if (lang.isComingSoon) {
      Alert.alert(
        "Coming Soon",
        `${lang.name} (${lang.nativeName}) language support is under development and will be available soon!`,
        [{ text: "OK" }]
      );
      return;
    }
    if (lang.code !== state.selectedLanguage) {
      selectLanguage(lang.code);
    }
    setLanguagePickerOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Top Header Row with Navigation & Dots */}
      <View style={styles.header}>
        <View style={styles.sideContainer}>
          {canGoBack && onBack ? (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.iconButtonPressed,
              ]}
            >
              <MaterialIcons
                name="arrow-back"
                size={22}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.centerContainer}>
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </View>

        <View style={styles.sideContainerRight}>
          {canSkip && onSkip ? (
            <Pressable
              onPress={onSkip}
              accessibilityRole="button"
              accessibilityLabel="Skip onboarding"
              style={({ pressed }) => [
                styles.skipButton,
                pressed && styles.skipButtonPressed,
              ]}
            >
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Language Selector Option Below Dots */}
      {showLanguageSelector && (
        <View style={styles.languageRow}>
          <Pressable
            onPress={() => setLanguagePickerOpen(true)}
            style={({ pressed }) => [
              styles.languagePill,
              pressed && styles.languagePillPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Language: ${currentLang.name}. Tap to change.`}
          >
            <MaterialIcons name="translate" size={20} color={colors.primary} />
            <Text style={styles.languagePillText}>{currentLang.nativeName}</Text>
            <MaterialIcons
              name="expand-more"
              size={22}
              color={colors.primary}
            />
          </Pressable>
        </View>
      )}

      {/* Language Picker Modal */}
      <Modal
        transparent
        visible={languagePickerOpen}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setLanguagePickerOpen(false)}
      >
        <Pressable
          style={styles.pickerBackdrop}
          onPress={() => setLanguagePickerOpen(false)}
        >
          <Pressable
            style={styles.pickerCard}
            onPress={() => {}}
            accessibilityRole="none"
          >
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Choose your language</Text>
              <Pressable
                onPress={() => setLanguagePickerOpen(false)}
                style={styles.pickerClose}
                accessibilityRole="button"
                accessibilityLabel="Close language picker"
              >
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            <ScrollView style={styles.pickerList} showsVerticalScrollIndicator={false}>
              {LANGUAGES_DATA.map((lang) => {
                const isSelected = state.selectedLanguage === lang.code;
                const isComingSoon = lang.isComingSoon;
                return (
                  <Pressable
                    key={lang.code}
                    onPress={() => handleSelectLang(lang)}
                    style={[
                      styles.pickerRow,
                      isSelected && styles.pickerRowSelected,
                      isComingSoon && styles.pickerRowComingSoon,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Select language ${lang.name}${isComingSoon ? ", Coming soon" : ""}`}
                  >
                    <View style={styles.pickerRowText}>
                      <View style={styles.pickerTitleInline}>
                        <Text
                          style={[
                            styles.pickerNativeLabel,
                            isSelected && styles.pickerRowTextSelected,
                            isComingSoon && styles.pickerTextComingSoon,
                          ]}
                        >
                          {lang.nativeName}
                        </Text>
                        {isComingSoon && (
                          <View style={styles.comingSoonBadge}>
                            <Text style={styles.comingSoonBadgeText}>Coming Soon</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.pickerEnLabel}>
                        {lang.name} ({lang.script})
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.pickerCheck,
                        isSelected && styles.pickerCheckSelected,
                        isComingSoon && styles.pickerCheckComingSoon,
                      ]}
                    >
                      {isSelected ? (
                        <MaterialIcons name="check" size={16} color={colors.white} />
                      ) : isComingSoon ? (
                        <MaterialIcons name="lock-clock" size={14} color={colors.onSurfaceVariant} />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: "100%",
  },
  sideContainer: {
    minWidth: 80,
    alignItems: "flex-start",
  },
  sideContainerRight: {
    minWidth: 80,
    alignItems: "flex-end",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  iconButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.94 }],
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  skipButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.94 }],
  },
  skipText: {
    ...typography.labelLg,
    color: colors.primary,
    fontWeight: "700",
  },

  // Single Centered Language Pill (Larger, theme-matched, centered text)
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  languagePill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 11,
    minHeight: 46,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.primaryContainer,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  languagePillPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  languagePillText: {
    ...typography.labelLg,
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
  },

  // Language Picker Modal
  pickerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(24, 28, 26, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  pickerCard: {
    width: "100%",
    maxWidth: 380,
    maxHeight: 520,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  pickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  pickerTitle: {
    ...typography.headlineMd,
    fontSize: 18,
    color: colors.onSurface,
    fontWeight: "700",
  },
  pickerClose: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerList: {
    maxHeight: 420,
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: rounded.lg,
    marginBottom: 8,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  pickerRowSelected: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.primaryContainer,
  },
  pickerRowComingSoon: {
    backgroundColor: colors.surfaceContainerLowest,
    opacity: 0.7,
    borderColor: colors.outlineVariant,
  },
  pickerRowText: {
    flex: 1,
  },
  pickerTitleInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pickerNativeLabel: {
    ...typography.labelLg,
    fontSize: 16,
    color: colors.onSurface,
    fontWeight: "700",
  },
  pickerTextComingSoon: {
    color: colors.onSurfaceVariant,
  },
  pickerEnLabel: {
    ...typography.bodyMd,
    fontSize: 12.5,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  pickerRowTextSelected: {
    color: colors.primary,
  },
  comingSoonBadge: {
    backgroundColor: colors.tertiaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  comingSoonBadgeText: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.onTertiaryFixed,
  },
  pickerCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  pickerCheckSelected: {
    backgroundColor: colors.primaryContainer,
    borderWidth: 0,
  },
  pickerCheckComingSoon: {
    borderWidth: 0,
    backgroundColor: colors.surfaceContainerLow,
  },
});

export default OnboardingHeader;
