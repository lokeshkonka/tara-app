import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { useAuth } from "../../auth/AuthProvider";
import { LANGUAGES_DATA } from "../../data/dummy/languagesData";
import { colors, rounded, spacing, typography } from "../../theme/theme";

export default function ProfileTab() {
  const { signOut, user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [languagePickerVisible, setLanguagePickerVisible] = useState(false);

  const selectedLang =
    LANGUAGES_DATA.find((lang) => lang.code === selectedLanguage) ??
    LANGUAGES_DATA[0];

  const handleSelect = (lang: typeof LANGUAGES_DATA[number]) => {
    if (lang.isComingSoon) {
      Alert.alert(
        "Coming Soon",
        `${lang.name} (${lang.nativeName}) language support is under development and will be available soon!`,
        [{ text: "OK" }]
      );
      return;
    }
    setSelectedLanguage(lang.code);
    setLanguagePickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          {user && (
            <Text style={styles.subtitle}>Logged in as {user.email || user.name || "User"}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Language</Text>
          <Pressable
            onPress={() => setLanguagePickerVisible(true)}
            style={styles.pickerRow}
            accessibilityRole="button"
            accessibilityLabel="Change app language"
          >
            <View style={styles.pickerIcon}>
              <MaterialIcons name="translate" size={20} color={colors.primary} />
            </View>
            <View style={styles.pickerText}>
              <Text style={styles.pickerTitle}>{selectedLang.nativeName}</Text>
              <Text style={styles.pickerSubtitle}>
                {selectedLang.name} ({selectedLang.script})
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.onSurfaceVariant} />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <TactileButton
            title="Logout"
            icon="logout"
            variant="danger"
            onPress={signOut}
          />
        </View>
      </ScrollView>

      <Modal
        visible={languagePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLanguagePickerVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLanguagePickerVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select App Language</Text>
              <Pressable
                onPress={() => setLanguagePickerVisible(false)}
                hitSlop={12}
              >
                <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>
            <ScrollView style={styles.sheetList}>
              {LANGUAGES_DATA.map((lang) => {
                const isSelected = selectedLanguage === lang.code;
                return (
                  <Pressable
                    key={lang.id}
                    onPress={() => handleSelect(lang)}
                    style={[styles.toggleRow, isSelected && styles.toggleRowSelected]}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <View
                      style={[
                        styles.toggleIcon,
                        isSelected && styles.toggleIconSelected,
                      ]}
                    >
                      <MaterialIcons
                        name="translate"
                        size={20}
                        color={isSelected ? colors.primaryContainer : colors.onSurfaceVariant}
                      />
                    </View>
                    <View style={styles.toggleText}>
                      <Text style={[styles.toggleTitle, isSelected && styles.toggleTitleSelected]}>
                        {lang.nativeName}
                      </Text>
                      <Text style={styles.toggleSubtitle}>
                        {lang.name} ({lang.script})
                      </Text>
                    </View>
                    {lang.isComingSoon ? (
                      <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonText}>Soon</Text>
                      </View>
                    ) : null}
                    <View
                      style={[
                        styles.toggleIndicator,
                        isSelected && styles.toggleIndicatorOn,
                      ]}
                    >
                      {isSelected && (
                        <MaterialIcons name="check" size={14} color={colors.white} />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.stackLg,
  },
  header: {
    marginBottom: spacing.stackLg,
  },
  title: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    marginBottom: spacing.stackMd,
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: rounded.lg,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  pickerIcon: {
    width: 36,
    height: 36,
    borderRadius: rounded.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
    marginRight: 12,
  },
  pickerText: {
    flex: 1,
  },
  pickerTitle: {
    ...typography.labelLg,
    fontSize: 15,
    color: colors.onSurface,
  },
  pickerSubtitle: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  footer: {
    marginTop: "auto",
    paddingTop: spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 34, 4, 0.45)",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: rounded.xl,
    borderTopRightRadius: rounded.xl,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.sectionPadding,
    paddingHorizontal: spacing.marginMobile,
    maxHeight: "75%",
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.stackMd,
  },
  sheetTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  sheetList: {
    flexGrow: 0,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: rounded.lg,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.stackSm,
  },
  toggleRowSelected: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.primaryContainer,
  },
  toggleIcon: {
    width: 36,
    height: 36,
    borderRadius: rounded.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
    marginRight: 12,
  },
  toggleIconSelected: {
    backgroundColor: "rgba(76, 175, 80, 0.15)",
  },
  toggleText: {
    flex: 1,
  },
  toggleTitle: {
    ...typography.labelLg,
    fontSize: 15,
    color: colors.onSurface,
  },
  toggleTitleSelected: {
    color: colors.primary,
  },
  toggleSubtitle: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  comingSoonBadge: {
    backgroundColor: colors.tertiaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    marginRight: 8,
  },
  comingSoonText: {
    ...typography.labelSm,
    color: colors.onTertiaryFixed,
    fontWeight: "700",
    fontSize: 10,
  },
  toggleIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleIndicatorOn: {
    backgroundColor: colors.primaryContainer,
    borderWidth: 0,
  },
});
