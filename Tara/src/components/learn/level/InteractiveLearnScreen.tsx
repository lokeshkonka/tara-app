import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TaraMessageCard } from "../../tara-messages/TaraMessageCard";
import { TactileButton } from "../../ui/TactileButton";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { HotspotElement, LearnInteractiveTopicPhase } from "../../../types/learn";
import { SoilCrossSectionDiagram } from "./SoilCrossSectionDiagram";

interface InteractiveLearnScreenProps {
  phase: LearnInteractiveTopicPhase;
  onCompletePhase: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const InteractiveLearnScreen: React.FC<InteractiveLearnScreenProps> = ({
  phase,
  onCompletePhase,
  onScroll,
}) => {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<HotspotElement | null>(
    phase.hotspots[0] || null
  );

  const handleSelectHotspot = (hotspot: HotspotElement) => {
    setActiveHotspot(hotspot);
    if (!discoveredIds.includes(hotspot.id)) {
      setDiscoveredIds((prev) => [...prev, hotspot.id]);
    }
  };

  const totalHotspots = phase.hotspots.length;
  const isFullyDiscovered = discoveredIds.length >= totalHotspots;

  const currentDialogue = activeHotspot
    ? `${activeHotspot.name}: ${activeHotspot.description}`
    : phase.taraDialogue;

  const cardTitle = activeHotspot ? activeHotspot.name : phase.title;

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
        {/* Tara Message Card */}
        <View style={styles.taraWrapper}>
          <TaraMessageCard
            title={cardTitle}
            expression={phase.taraExpression || "happy"}
            message={currentDialogue}
            showVoiceControl={true}
          />
        </View>

        {/* Discovery Counter Pill */}
        <View style={styles.discoveryHeader}>
          <View style={styles.counterBadge}>
            <MaterialIcons name="explore" size={16} color={colors.primary} />
            <Text style={styles.counterText}>
              Discovered {discoveredIds.length} / {totalHotspots} Soil Elements
            </Text>
          </View>
          <Text style={styles.instructionText}>
            {phase.promptToProceed || "Tap different parts of the soil to explore!"}
          </Text>
        </View>

        {/* Interactive Soil Cross-Section Visual Canvas */}
        <SoilCrossSectionDiagram
          hotspots={phase.hotspots}
          discoveredIds={discoveredIds}
          activeHotspotId={activeHotspot?.id || null}
          onSelectHotspot={handleSelectHotspot}
        />
      </ScrollView>

      {/* Pinned Bottom CTA Button */}
      <View style={styles.fixedBottomContainer}>
        <TactileButton
          title={isFullyDiscovered ? "Continue to Question" : "Explore Soil"}
          icon="arrow-forward"
          iconPosition="right"
          faceColor={isFullyDiscovered ? colors.primaryContainer : colors.surfaceContainerLowest}
          depthColor={isFullyDiscovered ? colors.onPrimaryFixedVariant : componentColors.cardEdge}
          textColor={isFullyDiscovered ? "#FFFFFF" : colors.primary}
          height={52}
          depth={4}
          borderRadius={rounded.full}
          onPress={onCompletePhase}
        />
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
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.stackLg,
  },
  taraWrapper: {
    marginTop: spacing.stackSm,
    marginBottom: spacing.stackSm,
  },
  discoveryHeader: {
    alignItems: "center",
    gap: 4,
    marginBottom: spacing.stackSm,
  },
  counterBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  counterText: {
    ...typography.labelSm,
    fontWeight: "700",
    color: colors.onSurface,
  },
  instructionText: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  fixedBottomContainer: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: spacing.stackLg,
    backgroundColor: colors.background,
  },
});
