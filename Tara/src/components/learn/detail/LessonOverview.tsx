import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import type { AudioSource } from "expo-audio";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import { useTranslation } from "../../../hooks/useTranslation";
import TaraSideMessageCard from "../../tara-messages/TaraSideMessageCard";
import type { OutcomeItem } from "../../../types/learn";
import type { TaraExpression } from "../../Tara/Tara.types";

export interface LessonOverviewProps {
  /** Translation key OR raw string for 'Why It Matters' section */
  whyItMattersKey?: string;
  whyItMattersText?: string;
  /** Custom MaterialIcon name for 'Why It Matters' header (default: 'eco') */
  whyItMattersIcon?: keyof typeof MaterialIcons.glyphMap;

  /** Array of learning outcome items (supports i18n key or raw text) */
  learningOutcomes: (OutcomeItem | { id: string; text: string })[];
  /** Custom MaterialIcon name for 'What You'll Learn' header (default: 'fact-check') */
  whatYoullLearnIcon?: keyof typeof MaterialIcons.glyphMap;

  /** Translation key OR raw string for Tara's mentor message */
  taraQuoteKey?: string;
  taraQuoteText?: string;
  /** Headline title for Tara's message card (default: "Tara's Guidance") */
  taraTitle?: string;
  /** Tara expression portrait (default: 'excited') */
  taraExpression?: TaraExpression;
  /** Optional audio clip source for Tara speech */
  taraAudioSource?: AudioSource;
  /** Show volume/speaker voice control button (default: true) */
  showVoiceControl?: boolean;

  /** Container style overrides */
  style?: StyleProp<ViewStyle>;
}

/**
 * Reusable LessonOverview component.
 * Displays "Why It Matters", "What You'll Learn" checklist, and TaraSideMessageCard guidance.
 * Can be reused across any lesson category (Soil, Water, Pest Control, Compost, Crops, etc.).
 */
export function LessonOverview({
  whyItMattersKey,
  whyItMattersText,
  whyItMattersIcon = "eco",
  learningOutcomes,
  whatYoullLearnIcon = "fact-check",
  taraQuoteKey,
  taraQuoteText,
  taraTitle = "Tara's Guidance",
  taraExpression = "excited",
  taraAudioSource,
  showVoiceControl = true,
  style,
}: LessonOverviewProps) {
  const { t } = useTranslation();

  const resolvedWhyText = whyItMattersText ?? (whyItMattersKey ? t(whyItMattersKey) : "");
  const resolvedTaraQuote = taraQuoteText ?? (taraQuoteKey ? t(taraQuoteKey) : "");

  return (
    <View style={[styles.container, style]}>
      {/* 1. TARA MENTOR GUIDANCE BANNER (FIRST) */}
      {Boolean(resolvedTaraQuote) && (
        <View style={styles.taraWrapper}>
          <TaraSideMessageCard
            title={taraTitle}
            message={resolvedTaraQuote}
            expression={taraExpression}
            audioSource={taraAudioSource}
            showVoiceControl={showVoiceControl}
          />
        </View>
      )}

      {/* 2. WHY IT MATTERS CARD (SECOND) */}
      {Boolean(resolvedWhyText) && (
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircle}>
              <MaterialIcons name={whyItMattersIcon} size={18} color="#16A34A" />
            </View>
            <Text style={styles.cardTitle}>{t("lesson.detail.whyItMattersTitle")}</Text>
          </View>

          <Text style={styles.bodyText}>{resolvedWhyText}</Text>
        </View>
      )}

      {/* 3. WHAT YOU'LL LEARN CHECKLIST (THIRD) */}
      {learningOutcomes.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircle}>
              <MaterialIcons name={whatYoullLearnIcon} size={18} color="#006E1C" />
            </View>
            <Text style={styles.cardTitle}>{t("lesson.detail.whatYoullLearnTitle")}</Text>
          </View>

          <View style={styles.outcomesList}>
            {learningOutcomes.map((item) => {
              const text = "text" in item ? item.text : t(item.textKey);
              return (
                <View key={item.id} style={styles.outcomeRow}>
                  <View style={styles.checkIcon}>
                    <MaterialIcons name="check-circle" size={20} color="#16A34A" />
                  </View>
                  <Text style={styles.outcomeText}>{text}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing.stackMd,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackMd,
    gap: spacing.stackSm,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: rounded.full,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    ...typography.headlineMd,
    fontSize: 17,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.2,
  },
  bodyText: {
    ...typography.bodyMd,
    fontSize: 14,
    lineHeight: 21,
    color: colors.onSurfaceVariant,
    fontWeight: "400",
  },
  taraWrapper: {
    paddingVertical: spacing.stackSm / 2,
  },
  outcomesList: {
    gap: 10,
    marginTop: 4,
  },
  outcomeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  checkIcon: {
    marginTop: 1,
  },
  outcomeText: {
    ...typography.bodyMd,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurface,
    fontWeight: "600",
    flex: 1,
  },
});
