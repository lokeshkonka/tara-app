import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { TaraMessageCard } from "../../tara-messages/TaraMessageCard";
import { TaraSideMessageCard } from "../../tara-messages/TaraSideMessageCard";
import { TactileButton } from "../../ui/TactileButton";
import { TopicExplanationAccordion } from "./TopicExplanationAccordion";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { ConceptCard, ConceptCardPhase } from "../../../types/learn";

interface ConceptCardPhaseScreenProps {
  phase: ConceptCardPhase;
  onCompletePhase: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onViewStateChange?: (viewState: "overview" | "cards") => void;
  onStepComplete?: (xp: number) => void;
  stepNumber?: number;
  ctaTitle?: string;
}

const CONCEPT_INSIGHTS: Record<string, { subtitle: string; fact: string; lightBg: string }> = {
  "card-air": {
    subtitle: "Porous Spaces for Respiration",
    fact: "Pore spaces between soil particles make up 20%–30% of healthy soil, providing essential oxygen to roots.",
    lightBg: "#E1F5FE",
  },
  "card-water": {
    subtitle: "Living Moisture Sponge",
    fact: "Soil holds and delivers dissolved minerals directly to plant roots for healthy cellular growth.",
    lightBg: "#E0F7FA",
  },
  "card-nutrients": {
    subtitle: "Natural Nutrient Bank",
    fact: "Nitrogen, Phosphorus, and Potassium (NPK) are stored and continuously cycled in fertile soil.",
    lightBg: "#E8F5E9",
  },
  "card-organic-matter": {
    subtitle: "Decomposed Carbon Power",
    fact: "Organic matter can absorb up to 20 times its weight in water, preventing erosion and runoff.",
    lightBg: "#EFEBE9",
  },
  "card-living-organisms": {
    subtitle: "Underground Bio-Engine",
    fact: "A single teaspoon of healthy soil contains billions of beneficial microbes and fungi!",
    lightBg: "#EDE7F6",
  },
};

export const ConceptCardPhaseScreen: React.FC<ConceptCardPhaseScreenProps> = ({
  phase,
  onCompletePhase,
  onScroll,
  onViewStateChange,
  onStepComplete,
  stepNumber,
  ctaTitle,
}) => {
  const [viewState, setViewState] = useState<"overview" | "cards">("overview");
  const [cardIndex, setCardIndex] = useState<number>(0);
  const tabScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (tabScrollRef.current) {
      const targetX = Math.max(0, cardIndex * 125 - 60);
      tabScrollRef.current.scrollTo({ x: targetX, animated: true });
    }
  }, [cardIndex]);

  const currentCard: ConceptCard = phase.cards[cardIndex] || phase.cards[0];
  const totalCards = phase.cards.length;
  const nextCard = cardIndex < totalCards - 1 ? phase.cards[cardIndex + 1] : null;

  const currentInsight = CONCEPT_INSIGHTS[currentCard.id] || {
    subtitle: "Essential Element",
    fact: "Plays an irreplaceable role in maintaining a balanced soil ecosystem.",
    lightBg: "#E8F5E9",
  };

  const handleSelectCard = (index: number) => {
    if (index === cardIndex) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } catch {}
    setCardIndex(index);
  };

  const handleNextCard = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}

    if (cardIndex < totalCards - 1) {
      try {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      } catch {}
      setCardIndex((prev) => prev + 1);
    } else {
      onCompletePhase();
    }
  };

  const handlePrevCard = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    if (cardIndex > 0) {
      try {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      } catch {}
      setCardIndex((prev) => prev - 1);
    } else {
      setViewState("overview");
      onViewStateChange?.("overview");
    }
  };

  // ─────────────────────────────────────────────
  // 1. OVERVIEW STAGE (Step 1)
  // ─────────────────────────────────────────────
  if (viewState === "overview") {
    return (
      <View style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.overviewScrollContent}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.overviewWrapper}>
            {/* Main Tara Avatar & Speech Bubble Card */}
            <View style={styles.taraWrapper}>
              <TaraMessageCard
                title={phase.title}
                expression={phase.taraExpression || "happy"}
                message={phase.taraDialogue}
                audioSource={phase.audioSource}
                autoPlay={true}
                showVoiceControl={true}
              />
            </View>

            {/* Expandable Topic Explanation Accordion below Tara card */}
            <TopicExplanationAccordion
              explanation={phase.explanation}
              defaultTitle={phase.title || "What is Soil?"}
            />
          </View>
        </ScrollView>

        {/* Pinned Bottom CTA Button */}
        <View style={styles.fixedBottomContainer}>
          <TactileButton
            title={ctaTitle || "Explore Concept Cards"}
            icon="arrow-forward"
            iconPosition="right"
            faceColor={colors.primaryContainer}
            depthColor={colors.onPrimaryFixedVariant}
            textColor="#FFFFFF"
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={() => {
              setViewState("cards");
              onViewStateChange?.("cards");
              onStepComplete?.(5);
            }}
          />
        </View>
      </View>
    );
  }

  // ─────────────────────────────────────────────
  // 2. REDESIGNED STEP 2: CONCEPT CARDS BREAKDOWN
  // ─────────────────────────────────────────────
  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* Horizontal Concept Pill Selector */}
        <ScrollView
          ref={tabScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
          style={styles.tabScrollView}
        >
          {phase.cards.map((card, idx) => {
            const isActive = idx === cardIndex;
            const isCompleted = idx < cardIndex;
            const cardColor = card.color || colors.primary;

            return (
              <TouchableOpacity
                key={card.id}
                activeOpacity={0.75}
                onPress={() => handleSelectCard(idx)}
                style={[
                  styles.conceptTabItem,
                  isActive && {
                    backgroundColor: colors.surfaceContainerLowest,
                    borderColor: cardColor,
                    borderBottomWidth: 3.5,
                    borderBottomColor: cardColor,
                    transform: [{ scale: 1.03 }],
                  },
                ]}
              >
                <View
                  style={[
                    styles.tabIconBadge,
                    { backgroundColor: isActive ? `${cardColor}20` : colors.surfaceContainer },
                  ]}
                >
                  <MaterialIcons
                    name={(card.icon as any) || "eco"}
                    size={16}
                    color={isActive ? cardColor : colors.onSurfaceVariant}
                  />
                </View>

                <Text
                  style={[
                    styles.tabTitleText,
                    isActive && { color: colors.onSurface, fontWeight: "800" },
                  ]}
                >
                  {card.title}
                </Text>

                {isCompleted && (
                  <MaterialIcons name="check-circle" size={14} color="#2E7D32" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tara Side Message Card with Concept Dialogue */}
        <View style={styles.taraSideWrapper}>
          <TaraSideMessageCard
            key={currentCard.id}
            message={currentCard.taraDialogue || currentInsight.subtitle}
            expression="happy"
            audioSource={currentCard.audioSource || (currentCard as any).taraAudio}
            showVoiceControl={Boolean(currentCard.audioSource || (currentCard as any).taraAudio)}
            autoPlay={Boolean(currentCard.audioSource || (currentCard as any).taraAudio)}
          />
        </View>

        {/* Hero Concept Card Display */}
        <View style={styles.heroConceptCard}>
          {/* Card Top Accent Banner */}
          <View style={[styles.conceptTopBanner, { backgroundColor: currentInsight.lightBg }]}>
            <View
              style={[
                styles.largeIconBadge,
                { backgroundColor: "#FFFFFF", borderColor: currentCard.color || colors.primary },
              ]}
            >
              <MaterialIcons
                name={(currentCard.icon as any) || "eco"}
                size={30}
                color={currentCard.color || colors.primary}
              />
            </View>

            <View style={styles.conceptTitleGroup}>
              <Text style={styles.conceptMainTitle}>{currentCard.title}</Text>
              <Text style={styles.conceptSubtitle}>{currentInsight.subtitle}</Text>
            </View>
          </View>

          {/* Detailed Paragraph & Scientific Fact Box */}
          <View style={styles.conceptBody}>
            <Text style={styles.conceptParagraph}>{currentCard.taraDialogue}</Text>

            <View style={styles.factBox}>
              <View style={styles.factIconBadge}>
                <MaterialIcons name="lightbulb" size={18} color="#D97706" />
              </View>
              <View style={styles.factTextGroup}>
                <Text style={styles.factTitle}>Key Insight</Text>
                <Text style={styles.factBody}>{currentInsight.fact}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pinned Bottom Dual Action Button Row */}
      <View style={styles.fixedBottomContainer}>
        <View style={styles.actionButtonRow}>
          {cardIndex > 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePrevCard}
              style={styles.prevButton}
            >
              <MaterialIcons name="arrow-back" size={20} color={colors.onSurface} />
            </TouchableOpacity>
          )}

          <View style={styles.mainCtaWrapper}>
            <TactileButton
              title={
                cardIndex === totalCards - 1
                  ? "Continue to Next Step"
                  : `Next: ${nextCard ? nextCard.title : "Concept"}`
              }
              icon="arrow-forward"
              iconPosition="right"
              faceColor={colors.primaryContainer}
              depthColor={colors.onPrimaryFixedVariant}
              textColor="#FFFFFF"
              height={52}
              depth={4}
              borderRadius={rounded.full}
              onPress={handleNextCard}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  overviewScrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: 140,
  },
  overviewWrapper: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: 140,
  },
  taraWrapper: {
    marginBottom: spacing.stackSm,
  },
  taraSideWrapper: {
    marginTop: spacing.unit,
    marginBottom: spacing.stackSm,
  },
  tabScrollView: {
    marginVertical: spacing.stackSm,
  },
  tabScrollContent: {
    gap: 8,
    paddingVertical: 4,
    paddingRight: 24,
  },
  conceptTabItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: rounded.full,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 2,
    borderBottomColor: componentColors.cardEdge,
  },
  tabIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabTitleText: {
    ...typography.labelSm,
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  heroConceptCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 4,
    borderBottomColor: componentColors.cardEdge,
    overflow: "hidden",
    marginTop: spacing.stackSm,
    marginBottom: spacing.stackSm,
  },
  conceptTopBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.4)",
  },
  largeIconBadge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  conceptTitleGroup: {
    flex: 1,
  },
  conceptMainTitle: {
    ...typography.headlineMd,
    fontSize: 22,
    fontWeight: "800",
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  conceptSubtitle: {
    ...typography.bodyMd,
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  conceptBody: {
    padding: 18,
    gap: 14,
  },
  conceptParagraph: {
    ...typography.bodyMd,
    fontSize: 15,
    lineHeight: 23,
    color: colors.onSurface,
    fontWeight: "500",
  },
  factBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FFFBEB",
    borderRadius: rounded.md,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  factIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  factTextGroup: {
    flex: 1,
    gap: 2,
  },
  factTitle: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#B45309",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  factBody: {
    ...typography.bodyMd,
    fontSize: 13,
    lineHeight: 18,
    color: "#78350F",
    fontWeight: "500",
  },
  fixedBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackLg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
  actionButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  prevButton: {
    width: 52,
    height: 52,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    alignItems: "center",
    justifyContent: "center",
  },
  mainCtaWrapper: {
    flex: 1,
  },
});
