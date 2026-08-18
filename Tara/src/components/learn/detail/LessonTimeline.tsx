import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "../../../hooks/useTranslation";
import { componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { LevelNodeDetail } from "../../../types/learn";
import {
  VerticalJourneyTimeline,
  type JourneyTimelineNode,
} from "../../common/VerticalJourneyTimeline";

export interface LessonTimelineProps {
  levels: LevelNodeDetail[];
  onSelectLevel: (level: LevelNodeDetail) => void;
}

export function LessonTimeline({ levels, onSelectLevel }: LessonTimelineProps) {
  const { t } = useTranslation();

  const journeyNodes: JourneyTimelineNode[] = useMemo(
    () =>
      levels.map((level) => ({
        id: level.id,
        levelNumber: level.levelNumber,
        title: level.title || (level.titleKey ? t(level.titleKey) : `Level ${level.levelNumber}`),
        subtitle: level.description || (level.durationMinutes ? `${level.durationMinutes} min` : undefined),
        status:
          level.status === "inProgress"
            ? "active"
            : level.status === "available"
            ? "active"
            : level.status,
        xp: level.xp,
        durationMinutes: level.durationMinutes,
      })),
    [levels, t]
  );

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

      {/* Main Timeline Card */}
      <View style={styles.card}>
        <VerticalJourneyTimeline
          nodes={journeyNodes}
          onSelectNode={handleSelectNode}
          activeButtonText="START"
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
});
