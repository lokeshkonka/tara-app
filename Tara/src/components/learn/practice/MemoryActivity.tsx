import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

export interface MemoryConceptPair {
  id: string;
  itemA: { label: string; icon: string; color?: string };
  itemB: { label: string; icon: string; color?: string };
  connectionExplanation?: string;
}

export interface MemoryActivityProps {
  title?: string;
  instructions?: string;
  pairs: MemoryConceptPair[];
  onComplete: () => void;
}

interface MemoryCardItem {
  instanceId: string;
  pairId: string;
  label: string;
  icon: string;
  color: string;
  explanation?: string;
}

/**
 * MemoryCardCell - Standalone Memoized 3D Card with True Midpoint Flip
 */
interface MemoryCardCellProps {
  card: MemoryCardItem;
  isFlipped: boolean;
  isMatched: boolean;
  isMismatch: boolean;
  disabled: boolean;
  onPress: () => void;
}

const MemoryCardCell = memo(function MemoryCardCell({
  card,
  isFlipped,
  isMatched,
  isMismatch,
  disabled,
  onPress,
}: MemoryCardCellProps) {
  const flipAnim = useRef(new Animated.Value(isFlipped || isMatched ? 1 : 0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const matchPulseAnim = useRef(new Animated.Value(1)).current;

  // Track flip state changes and run smooth 3D midpoint flip
  useEffect(() => {
    const toValue = isFlipped || isMatched ? 1 : 0;
    Animated.spring(flipAnim, {
      toValue,
      tension: 65,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, isMatched, flipAnim]);

  // Shake animation on mismatch
  useEffect(() => {
    if (isMismatch) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]).start();
    }
  }, [isMismatch, shakeAnim]);

  // Celebratory pulse when matched
  useEffect(() => {
    if (isMatched) {
      Animated.sequence([
        Animated.timing(matchPulseAnim, { toValue: 1.08, duration: 150, useNativeDriver: true }),
        Animated.spring(matchPulseAnim, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }),
      ]).start();
    }
  }, [isMatched, matchPulseAnim]);

  // Back Face Transformations (Visible from 0 -> 0.5)
  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.48, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });
  const backScaleX = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.05, 0.05],
  });

  // Front Face Transformations (Visible from 0.5 -> 1.0)
  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.52, 1],
    outputRange: [0, 0, 1, 1],
  });
  const frontScaleX = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.05, 0.05, 1],
  });

  return (
    <Animated.View
      style={[
        styles.cardCell,
        {
          transform: [
            { translateX: shakeAnim },
            { scale: matchPulseAnim },
          ],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled || isFlipped || isMatched}
        style={styles.cardPressable}
        accessibilityRole="button"
        accessibilityLabel={isFlipped || isMatched ? card.label : "Hidden soil memory card"}
      >
        {/* 1. FACE DOWN (Card Back) */}
        <Animated.View
          pointerEvents={isFlipped || isMatched ? "none" : "auto"}
          style={[
            styles.cardSurface,
            styles.cardFaceDown,
            {
              opacity: backOpacity,
              transform: [{ scaleX: backScaleX }],
            },
          ]}
        >
          <View style={styles.faceDownBadge}>
            <MaterialIcons name="help-outline" size={20} color="#D97706" />
          </View>
          <Text style={styles.faceDownText}>FLIP</Text>
        </Animated.View>

        {/* 2. FACE UP (Card Front) */}
        <Animated.View
          pointerEvents={isFlipped || isMatched ? "auto" : "none"}
          style={[
            styles.cardSurface,
            styles.cardFaceUp,
            isMatched && styles.cardMatched,
            isMismatch && styles.cardMismatchBorder,
            {
              opacity: frontOpacity,
              transform: [{ scaleX: frontScaleX }],
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: `${card.color}15`, borderColor: card.color },
            ]}
          >
            <MaterialIcons
              name={(card.icon as any) || "eco"}
              size={22}
              color={card.color}
            />
          </View>

          <Text style={styles.cardLabel} numberOfLines={2}>
            {card.label}
          </Text>

          {isMatched && (
            <View style={styles.matchedCheckBadge}>
              <MaterialIcons name="check" size={11} color="#FFFFFF" />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
});

/**
 * MemoryActivity - Main Grid Component
 */
export const MemoryActivity: React.FC<MemoryActivityProps> = ({
  pairs,
  onComplete,
}) => {
  // Generate shuffled deck
  const deck = useMemo<MemoryCardItem[]>(() => {
    const cards: MemoryCardItem[] = [];
    pairs.forEach((pair) => {
      cards.push({
        instanceId: `${pair.id}-a`,
        pairId: pair.id,
        label: pair.itemA.label,
        icon: pair.itemA.icon,
        color: pair.itemA.color || "#16A34A",
        explanation: pair.connectionExplanation,
      });
      cards.push({
        instanceId: `${pair.id}-b`,
        pairId: pair.id,
        label: pair.itemB.label,
        icon: pair.itemB.icon,
        color: pair.itemB.color || "#0284C7",
        explanation: pair.connectionExplanation,
      });
    });
    return cards.sort(() => 0.5 - Math.random());
  }, [pairs]);

  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [mismatchIds, setMismatchIds] = useState<string[]>([]);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [lastExplanation, setLastExplanation] = useState<string | null>(null);

  const handleCardPress = (card: MemoryCardItem) => {
    if (isChecking) return;
    if (matchedPairIds.has(card.pairId)) return;
    if (flippedIds.includes(card.instanceId)) return;
    if (flippedIds.length >= 2) return;

    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }

    const nextFlipped = [...flippedIds, card.instanceId];
    setFlippedIds(nextFlipped);
    setMismatchIds([]);

    if (nextFlipped.length === 2) {
      setMovesCount((prev) => prev + 1);
      setIsChecking(true);

      const [firstId, secondId] = nextFlipped;
      const firstCard = deck.find((c) => c.instanceId === firstId);
      const secondCard = deck.find((c) => c.instanceId === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND!
        if (Platform.OS !== "web") {
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch {}
        }

        if (firstCard.explanation) {
          setLastExplanation(firstCard.explanation);
        }

        const nextMatched = new Set(matchedPairIds);
        nextMatched.add(firstCard.pairId);
        setMatchedPairIds(nextMatched);
        setFlippedIds([]);
        setIsChecking(false);

        if (nextMatched.size === pairs.length) {
          setTimeout(() => {
            onComplete();
          }, 700);
        }
      } else {
        // MISMATCH -> Trigger shake & flip back after 550ms
        if (Platform.OS !== "web") {
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          } catch {}
        }

        setMismatchIds([firstId, secondId]);

        setTimeout(() => {
          setFlippedIds([]);
          setMismatchIds([]);
          setIsChecking(false);
        }, 550);
      }
    }
  };

  const matchedCount = matchedPairIds.size;
  const totalPairs = pairs.length;

  return (
    <View style={styles.container}>
      {/* Activity Stats & Progress Bar */}
      <View style={styles.headerGroup}>
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <MaterialIcons name="link" size={15} color="#16A34A" />
            <Text style={styles.statPillText}>
              Matched: {matchedCount} of {totalPairs}
            </Text>
          </View>

          <View style={styles.statPill}>
            <MaterialIcons name="touch-app" size={15} color="#D97706" />
            <Text style={styles.statPillText}>Moves: {movesCount}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(matchedCount / Math.max(totalPairs, 1)) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Concept Insight Banner */}
      {lastExplanation && (
        <View style={styles.insightBanner}>
          <MaterialIcons name="auto-awesome" size={16} color="#B45309" />
          <Text style={styles.insightText} numberOfLines={2}>
            {lastExplanation}
          </Text>
        </View>
      )}

      {/* Responsive Compact Grid */}
      <View style={styles.gridContainer}>
        {deck.map((card) => {
          const isMatched = matchedPairIds.has(card.pairId);
          const isFlipped = flippedIds.includes(card.instanceId);
          const isMismatch = mismatchIds.includes(card.instanceId);

          return (
            <MemoryCardCell
              key={card.instanceId}
              card={card}
              isFlipped={isFlipped}
              isMatched={isMatched}
              isMismatch={isMismatch}
              disabled={isChecking}
              onPress={() => handleCardPress(card)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerGroup: {
    marginBottom: spacing.stackSm,
    gap: 6,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: "#334155",
  },
  progressBarBg: {
    width: "100%",
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 3,
  },
  insightBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.md,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 8,
  },
  insightText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "600",
    color: "#92400E",
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  cardCell: {
    width: "48%",
    height: 98,
    position: "relative",
  },
  cardPressable: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  cardSurface: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: rounded.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderBottomWidth: 3.5,
  },
  cardFaceDown: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
    borderBottomColor: "#F59E0B",
    gap: 4,
  },
  faceDownBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  faceDownText: {
    ...typography.labelSm,
    fontSize: 9.5,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.6,
  },
  cardFaceUp: {
    backgroundColor: "#FFFFFF",
    borderColor: "#BBF7D0",
    borderBottomColor: "#4ADE80",
    padding: 6,
    gap: 4,
  },
  cardMatched: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  cardMismatchBorder: {
    borderColor: "#EF4444",
    borderBottomColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  cardLabel: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    lineHeight: 14,
    maxWidth: "90%",
  },
  matchedCheckBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
});
