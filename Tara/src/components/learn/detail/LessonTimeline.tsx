import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import { useTranslation } from "../../../hooks/useTranslation";
import {
  VerticalJourneyTimeline,
  type JourneyTimelineNode,
} from "../../common/VerticalJourneyTimeline";
import type { LevelNodeDetail } from "../../../types/learn";
import { AtmosphericGlow } from "../../ui/AtmosphericGlow";

export interface LessonTimelineProps {
  levels: LevelNodeDetail[];
  onSelectLevel: (level: LevelNodeDetail) => void;
}

export function LessonTimeline({ levels, onSelectLevel }: LessonTimelineProps) {
  const { t } = useTranslation();

  const journeyNodes: JourneyTimelineNode[] = levels.map((level) => ({
    id: level.id,
    title: t(level.titleKey),
    subtitle: level.durationMinutes ? `${level.durationMinutes} min` : undefined,
    status:
      level.status === "inProgress"
        ? "active"
        : level.status === "available"
        ? "active"
        : level.status,
    xp: level.xp,
    durationMinutes: level.durationMinutes,
  }));

  const handleSelectNode = (node: JourneyTimelineNode) => {
    const matchedLevel = levels.find((l) => l.id === node.id);
    if (matchedLevel) {
      onSelectLevel(matchedLevel);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Section Header Title */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{t("lesson.detail.journeyTitle")}</Text>
      </View>

      {/* Main Timeline Card with Particle Atmosphere Backdrop */}
      <View style={styles.card}>
        {/* Background Particle Aura */}
        <AtmosphericGlow
          size={380}
          opacity={0.6}
          tintColor="#4CAF50"
          showParticles
          particleDensity="high"
          animated
          style={styles.backgroundParticles}
        />

        <VerticalJourneyTimeline
          nodes={journeyNodes}
          onSelectNode={handleSelectNode}
          activeButtonText="START LESSON"
          showTrophyEnd={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    gap: spacing.stackSm,
  },
  headerRow: {
    paddingHorizontal: 4,
  },
  sectionTitle: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },
  card: {
    width: "100%",
    backgroundColor: "#F9FAF8",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 0,
    paddingVertical: spacing.stackSm,
    overflow: "hidden",
    position: "relative",
  },
  backgroundParticles: {
    position: "absolute",
    top: -40,
    alignSelf: "center",
    zIndex: 0,
  },
});
