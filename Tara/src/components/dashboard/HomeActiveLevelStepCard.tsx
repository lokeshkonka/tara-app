import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { TactileButton } from "../ui/TactileButton";

interface HomeActiveLevelStepCardProps {
  levelTitle?: string;
  stepTitle?: string;
  description?: string;
  xpReward?: number;
  durationMinutes?: number;
  levelId?: string;
}

export function HomeActiveLevelStepCard({
  levelTitle = "Level 1 — Meet Your Soil",
  stepTitle = "What is Soil?",
  description = "Learn the 5 vital components of healthy soil: air, water, nutrients, organic matter & living organisms.",
  xpReward = 20,
  durationMinutes = 5,
  levelId = "soil-level-1",
}: HomeActiveLevelStepCardProps) {
  const router = useRouter();

  const handleStartLevel = () => {
    router.push(`/learn/level/${levelId}`);
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="school" size={20} color={colors.primary} />
          <Text style={styles.headerTitle}>ACTIVE LEARNING STEP</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>Level 1</Text>
        </View>
      </View>

      {/* Main Level Step Card */}
      <View style={styles.card}>
        <LinearGradient
          colors={["#FFFFFF", "#F7FAF5"]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.cardHeader}>
          <View style={styles.stepChip}>
            <MaterialIcons name="eco" size={14} color="#15803D" />
            <Text style={styles.stepChipText}>{stepTitle}</Text>
          </View>

          <View style={styles.xpPill}>
            <MaterialIcons name="bolt" size={14} color="#D97706" />
            <Text style={styles.xpPillText}>+{xpReward} XP</Text>
          </View>
        </View>

        <Text style={styles.levelTitle}>{levelTitle}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Metadata Chips */}
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <MaterialIcons name="schedule" size={14} color={componentColors.chipNeutralText} />
            <Text style={styles.metaChipText}>{durationMinutes} Mins</Text>
          </View>
          <View style={styles.metaChip}>
            <MaterialIcons name="view-carousel" size={14} color={componentColors.chipNeutralText} />
            <Text style={styles.metaChipText}>Tara Concept Cards + MCQ</Text>
          </View>
        </View>

        {/* Tactile Action Button */}
        <TactileButton
          title="Continue Step 1"
          icon="arrow-forward"
          iconPosition="right"
          faceColor={colors.primaryContainer}
          depthColor={colors.onPrimaryFixedVariant}
          textColor="#FFFFFF"
          height={48}
          depth={4}
          borderRadius={rounded.lg}
          onPress={handleStartLevel}
          style={styles.ctaButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.unit,
    marginBottom: spacing.stackSm,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    ...typography.headlineMd,
    fontSize: 16,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: 0.5,
  },
  levelBadge: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#A5D6A7",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  levelBadgeText: {
    ...typography.labelSm,
    fontWeight: "800",
    color: "#2E7D32",
  },
  card: {
    width: "100%",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackMd,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    gap: 4,
  },
  stepChipText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#15803D",
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
    gap: 3,
  },
  xpPillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#D97706",
  },
  levelTitle: {
    ...typography.headlineMd,
    fontSize: 19,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    marginTop: 2,
  },
  description: {
    ...typography.bodyMd,
    fontSize: 13.5,
    color: colors.onSurfaceVariant,
    lineHeight: 19,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 4,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.md,
  },
  metaChipText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "600",
    color: componentColors.chipNeutralText,
  },
  ctaButton: {
    marginTop: 4,
  },
});
