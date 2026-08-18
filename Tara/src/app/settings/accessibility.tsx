import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { useSettings } from "../../context/SettingsContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import type { TextScaleMode } from "../../types/settings";

const TEXT_SCALES: { id: TextScaleMode; label: string; scale: number }[] = [
  { id: "standard", label: "Standard", scale: 1 },
  { id: "large", label: "Large (120%)", scale: 1.2 },
  { id: "extraLarge", label: "Extra Large (140%)", scale: 1.4 },
];

export default function AccessibilitySettingsScreen() {
  const { accessibility, updateAccessibility } = useSettings();

  const handleSave = () => {
    Alert.alert(
      "Accessibility Saved",
      "Display scaling, audio feedback, and readability options have been updated.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const currentScale =
    TEXT_SCALES.find((s) => s.id === accessibility.textScale)?.scale || 1;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Accessibility</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Mentor Intro Card */}
        <View style={styles.introCard}>
          <View style={styles.taraAvatar}>
            <MaterialIcons name="accessibility" size={24} color={colors.primary} />
          </View>
          <View style={styles.introTextWrap}>
            <Text style={styles.introTitle}>How Can I Help You Read?</Text>
            <Text style={styles.introSub}>
              Customize text size, high sunlight contrast, and voice speed for easy outdoor farm use.
            </Text>
          </View>
        </View>

        {/* Text Scaling Section with Live Preview */}
        <Text style={styles.sectionTitle}>Text Size & Scaling</Text>
        <View style={styles.cardContainer}>
          <View style={styles.scaleButtonsRow}>
            {TEXT_SCALES.map((scaleOpt) => {
              const isSelected = accessibility.textScale === scaleOpt.id;
              return (
                <Pressable
                  key={scaleOpt.id}
                  style={[
                    styles.scaleBtn,
                    isSelected && styles.scaleBtnActive,
                  ]}
                  onPress={() =>
                    updateAccessibility({ textScale: scaleOpt.id })
                  }
                >
                  <Text
                    style={[
                      styles.scaleBtnText,
                      isSelected && styles.scaleBtnTextActive,
                    ]}
                  >
                    {scaleOpt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Live Preview Box */}
          <View style={styles.previewBox}>
            <Text style={styles.previewLabel}>LIVE PREVIEW</Text>
            <Text
              style={[
                styles.previewSampleText,
                { fontSize: Math.round(14 * currentScale) },
              ]}
            >
              "Cover crops like sunn hemp lock nitrogen into the soil without synthetic chemicals."
            </Text>
          </View>
        </View>

        {/* Visual & Sunlight Display */}
        <Text style={styles.sectionTitle}>Visual & Sunlight Display</Text>
        <View style={styles.toggleGroup}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>High Sunlight Contrast</Text>
              <Text style={styles.toggleSub}>
                Darkens text borders and boosts card shadows for bright daytime field reading.
              </Text>
            </View>
            <Switch
              value={accessibility.highContrast}
              onValueChange={(val) =>
                updateAccessibility({ highContrast: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Reduced Motion</Text>
              <Text style={styles.toggleSub}>
                Replaces rapid 3D transitions with subtle fades to conserve battery.
              </Text>
            </View>
            <Switch
              value={accessibility.reducedMotion}
              onValueChange={(val) =>
                updateAccessibility({ reducedMotion: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Audio & Voice Assistance */}
        <Text style={styles.sectionTitle}>Audio & Voice Assistance</Text>
        <View style={styles.toggleGroup}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Auto-Play Voice Instructions</Text>
              <Text style={styles.toggleSub}>
                Automatically read lessons aloud when entering a learning activity.
              </Text>
            </View>
            <Switch
              value={accessibility.audioAutoPlay}
              onValueChange={(val) =>
                updateAccessibility({ audioAutoPlay: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>TalkBack / Screen Reader Optimization</Text>
              <Text style={styles.toggleSub}>
                Provides descriptive spoken labels for every tactile button and slider.
              </Text>
            </View>
            <Switch
              value={accessibility.screenReaderOptimized}
              onValueChange={(val) =>
                updateAccessibility({ screenReaderOptimized: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Save Button */}
        <TactileButton
          title="Save Accessibility Settings"
          icon="check"
          variant="primary"
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
  },
  backBtn: {
    padding: 6,
    borderRadius: rounded.full,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.md,
  },
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.md,
  },
  taraAvatar: {
    width: 44,
    height: 44,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  introTextWrap: {
    flex: 1,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  introSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginTop: spacing.xs,
  },
  cardContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.md,
  },
  scaleButtonsRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  scaleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: rounded.lg,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
  },
  scaleBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  scaleBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurface,
  },
  scaleBtnTextActive: {
    color: colors.white,
  },
  previewBox: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    gap: 4,
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  previewSampleText: {
    color: colors.onSurface,
    lineHeight: 22,
  },
  toggleGroup: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  toggleTextWrap: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
  },
  toggleSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(190, 202, 185, 0.3)",
  },
});
