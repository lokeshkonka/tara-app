import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

export interface MatchPair {
  id: string;
  leftText: string;
  rightText: string;
}

export interface MatchActivityProps {
  title?: string;
  instructions?: string;
  pairs: MatchPair[];
  onComplete: () => void;
}

export const MatchActivity: React.FC<MatchActivityProps> = ({
  title = "Match the Concepts",
  instructions = "Tap an item on the left, then tap its matching pair on the right.",
  pairs,
  onComplete,
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [mismatchPair, setMismatchPair] = useState<{ left: string; right: string } | null>(null);

  // Randomized column lists
  const [shuffledLeft] = useState(() => [...pairs].sort(() => Math.random() - 0.5));
  const [shuffledRight] = useState(() => [...pairs].sort(() => Math.random() - 0.5));

  const handleLeftPress = (pairId: string) => {
    if (matchedIds.has(pairId)) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setSelectedLeftId(pairId);
    setMismatchPair(null);

    // If a right item was already selected, test match
    if (selectedRightId) {
      testMatch(pairId, selectedRightId);
    }
  };

  const handleRightPress = (pairId: string) => {
    if (matchedIds.has(pairId)) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setSelectedRightId(pairId);
    setMismatchPair(null);

    // If a left item was already selected, test match
    if (selectedLeftId) {
      testMatch(selectedLeftId, pairId);
    }
  };

  const testMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Match found!
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}

      const nextMatched = new Set(matchedIds);
      nextMatched.add(leftId);
      setMatchedIds(nextMatched);
      setSelectedLeftId(null);
      setSelectedRightId(null);

      // Check if all matched
      if (nextMatched.size === pairs.length) {
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    } else {
      // Mismatch
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch {}

      setMismatchPair({ left: leftId, right: rightId });
      setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
        setMismatchPair(null);
      }, 700);
    }
  };

  const matchedCount = matchedIds.size;
  const totalCount = pairs.length;

  return (
    <View style={styles.container}>
      {/* Activity Header */}
      <View style={styles.headerGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            Matched: {matchedCount} / {totalCount}
          </Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(matchedCount / totalCount) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Two Column Grid */}
      <View style={styles.columnsContainer}>
        {/* Column A (Left) */}
        <View style={styles.column}>
          {shuffledLeft.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeftId === item.id;
            const isMismatch = mismatchPair?.left === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                disabled={isMatched}
                onPress={() => handleLeftPress(item.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isMatched && styles.cardMatched,
                  isMismatch && styles.cardMismatch,
                ]}
              >
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                    isMatched && styles.cardTextMatched,
                  ]}
                >
                  {item.leftText}
                </Text>
                {isMatched && (
                  <MaterialIcons name="check-circle" size={18} color="#2E7D32" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Column B (Right) */}
        <View style={styles.column}>
          {shuffledRight.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedRightId === item.id;
            const isMismatch = mismatchPair?.right === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                disabled={isMatched}
                onPress={() => handleRightPress(item.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isMatched && styles.cardMatched,
                  isMismatch && styles.cardMismatch,
                ]}
              >
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                    isMatched && styles.cardTextMatched,
                  ]}
                >
                  {item.rightText}
                </Text>
                {isMatched && (
                  <MaterialIcons name="check-circle" size={18} color="#2E7D32" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.stackSm,
  },
  headerGroup: {
    marginBottom: spacing.gutter,
  },
  title: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "800",
    color: colors.onSurface,
    marginBottom: 4,
  },
  instructions: {
    ...typography.bodyMd,
    fontSize: 13.5,
    color: colors.onSurfaceVariant,
    lineHeight: 19,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  progressText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  progressBarBg: {
    width: 120,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceContainer,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primaryContainer,
    borderRadius: 3,
  },
  columnsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 64,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  cardSelected: {
    backgroundColor: "#F1F8F1",
    borderColor: colors.primaryContainer,
    borderBottomColor: "#2E7D32",
    transform: [{ scale: 1.02 }],
  },
  cardMatched: {
    backgroundColor: "#E8F5E9",
    borderColor: "#A5D6A7",
    borderBottomColor: "#81C784",
    opacity: 0.85,
  },
  cardMismatch: {
    backgroundColor: "#FFEBEE",
    borderColor: "#EF5350",
    borderBottomColor: "#C62828",
  },
  cardText: {
    ...typography.bodyMd,
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
    flex: 1,
    textAlign: "center",
  },
  cardTextSelected: {
    color: "#1B5E20",
    fontWeight: "700",
  },
  cardTextMatched: {
    color: "#2E7D32",
    fontWeight: "700",
  },
});
