import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { TactileButton } from "../../ui/TactileButton";
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

export const MemoryActivity: React.FC<MemoryActivityProps> = ({
  title = "Remember the Connection",
  instructions = "Match the two cards that belong together in the soil system.",
  pairs,
  onComplete,
}) => {
  const [gameState, setGameState] = useState<"preview" | "playing">("preview");

  // Generate shuffled deck (Card A and Card B for each concept pair)
  const [deck] = useState<MemoryCardItem[]>(() => {
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
    return cards.sort(() => Math.random() - 0.5);
  });

  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [lastMatchExplanation, setLastMatchExplanation] = useState<string | null>(null);

  // Animated flip values for each card instance
  const flipAnims = useRef<Record<string, Animated.Value>>({}).current;
  if (Object.keys(flipAnims).length === 0) {
    deck.forEach((card) => {
      flipAnims[card.instanceId] = new Animated.Value(0);
    });
  }

  const handleCardPress = (card: MemoryCardItem) => {
    if (isChecking) return;
    if (matchedPairIds.has(card.pairId)) return;
    if (flippedIds.includes(card.instanceId)) return;
    if (flippedIds.length >= 2) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    // Animate Flip to Face-Up
    Animated.spring(flipAnims[card.instanceId], {
      toValue: 1,
      friction: 8,
      tension: 60,
      useNativeDriver: true,
    }).start();

    const newFlipped = [...flippedIds, card.instanceId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMovesCount((prev) => prev + 1);
      setIsChecking(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = deck.find((c) => c.instanceId === firstId);
      const secondCard = deck.find((c) => c.instanceId === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND!
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch {}

        if (firstCard.explanation) {
          setLastMatchExplanation(firstCard.explanation);
        }

        const nextMatched = new Set(matchedPairIds);
        nextMatched.add(firstCard.pairId);
        setMatchedPairIds(nextMatched);
        setFlippedIds([]);
        setIsChecking(false);

        // Check if game complete
        if (nextMatched.size === pairs.length) {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      } else {
        // MISMATCH -> Flip back after brief pause
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } catch {}

        setTimeout(() => {
          Animated.parallel([
            Animated.timing(flipAnims[firstId], {
              toValue: 0,
              duration: 250,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(flipAnims[secondId], {
              toValue: 0,
              duration: 250,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start(() => {
            setFlippedIds([]);
            setIsChecking(false);
          });
        }, 850);
      }
    }
  };

  const matchedCount = matchedPairIds.size;
  const totalPairs = pairs.length;

  if (gameState === "preview") {
    return (
      <View style={styles.container}>
        <View style={styles.headerGroup}>
          <Text style={styles.title}>Learn the Soil Connections</Text>
          <Text style={styles.instructions}>
            Observe how these soil elements connect. You will find their matches in the memory grid!
          </Text>
        </View>

        <View style={styles.pairsPreviewList}>
          {pairs.map((pair, index) => (
            <View key={pair.id || index} style={styles.pairRowCard}>
              {/* Item A */}
              <View style={styles.pairItemBadge}>
                <View style={[styles.miniIconCircle, { backgroundColor: `${pair.itemA.color || "#16A34A"}15` }]}>
                  <MaterialIcons name={(pair.itemA.icon as any) || "eco"} size={18} color={pair.itemA.color || "#16A34A"} />
                </View>
                <Text style={styles.pairItemText}>{pair.itemA.label}</Text>
              </View>

              {/* Link Icon */}
              <View style={styles.pairLinkBadge}>
                <MaterialIcons name="swap-horiz" size={20} color="#D97706" />
              </View>

              {/* Item B */}
              <View style={styles.pairItemBadge}>
                <View style={[styles.miniIconCircle, { backgroundColor: `${pair.itemB.color || "#0284C7"}15` }]}>
                  <MaterialIcons name={(pair.itemB.icon as any) || "water-drop"} size={18} color={pair.itemB.color || "#0284C7"} />
                </View>
                <Text style={styles.pairItemText}>{pair.itemB.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.startActionSection}>
          <TactileButton
            title="Start Memory Challenge"
            icon="psychology"
            iconPosition="right"
            faceColor="#16A34A"
            depthColor="#15803D"
            textColor="#FFFFFF"
            height={52}
            depth={4}
            borderRadius={rounded.full}
            onPress={() => setGameState("playing")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Activity Header & Progress */}
      <View style={styles.headerGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <MaterialIcons name="done-all" size={16} color="#16A34A" />
            <Text style={styles.statChipText}>
              Matched: {matchedCount} / {totalPairs}
            </Text>
          </View>

          <View style={styles.statChip}>
            <MaterialIcons name="touch-app" size={16} color="#D97706" />
            <Text style={styles.statChipText}>Moves: {movesCount}</Text>
          </View>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(matchedCount / totalPairs) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Optional Last Match Feedback Banner */}
      {lastMatchExplanation && (
        <View style={styles.matchHintBanner}>
          <MaterialIcons name="lightbulb" size={16} color="#B45309" />
          <Text style={styles.matchHintText}>{lastMatchExplanation}</Text>
        </View>
      )}

      {/* Responsive Cards Grid */}
      <View style={styles.gridContainer}>
        {deck.map((card) => {
          const isMatched = matchedPairIds.has(card.pairId);
          const isFlipped = flippedIds.includes(card.instanceId) || isMatched;
          const anim = flipAnims[card.instanceId];

          // Face-Down interpolation (0 -> 1: rotate from 0deg to 180deg, opacity from 1 to 0)
          const backRotate = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"],
          });
          const backOpacity = anim.interpolate({
            inputRange: [0, 0.45, 0.5, 1],
            outputRange: [1, 1, 0, 0],
          });

          // Face-Up interpolation (0 -> 1: rotate from -180deg to 0deg, opacity from 0 to 1)
          const frontRotate = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["-180deg", "0deg"],
          });
          const frontOpacity = anim.interpolate({
            inputRange: [0, 0.5, 0.55, 1],
            outputRange: [0, 0, 1, 1],
          });

          return (
            <TouchableOpacity
              key={card.instanceId}
              activeOpacity={0.85}
              disabled={isFlipped || isChecking}
              onPress={() => handleCardPress(card)}
              style={styles.cardCell}
            >
              {/* FACE DOWN (Card Back) */}
              <Animated.View
                pointerEvents={isFlipped ? "none" : "auto"}
                style={[
                  styles.cardFace,
                  styles.cardFaceDown,
                  {
                    opacity: backOpacity,
                    transform: [{ perspective: 1000 }, { rotateY: backRotate }],
                  },
                ]}
              >
                <View style={styles.faceDownInner}>
                  <View style={styles.faceDownBadge}>
                    <MaterialIcons name="help-outline" size={24} color="#B45309" />
                  </View>
                  <Text style={styles.faceDownText}>TAP TO FLIP</Text>
                </View>
              </Animated.View>

              {/* FACE UP (Card Front Content) */}
              <Animated.View
                pointerEvents={isFlipped ? "auto" : "none"}
                style={[
                  styles.cardFace,
                  styles.cardFaceUp,
                  isMatched && styles.cardMatched,
                  {
                    opacity: frontOpacity,
                    transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
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
                    size={24}
                    color={card.color}
                  />
                </View>
                <Text style={styles.cardLabel} numberOfLines={2}>
                  {card.label}
                </Text>
                {isMatched && (
                  <View style={styles.matchedCheckBadge}>
                    <MaterialIcons name="check" size={12} color="#FFFFFF" />
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: spacing.stackSm,
  },
  headerGroup: {
    marginBottom: spacing.stackMd,
  },
  title: {
    ...typography.headlineMd,
    fontSize: 19,
    fontWeight: "800",
    color: colors.onSurface,
    marginBottom: 4,
  },
  instructions: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 10,
  },
  pairsPreviewList: {
    gap: 8,
    marginBottom: spacing.stackLg,
  },
  pairRowCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
  },
  pairItemBadge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  miniIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pairItemText: {
    ...typography.labelSm,
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
  },
  pairLinkBadge: {
    paddingHorizontal: 6,
  },
  startActionSection: {
    width: "100%",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statChipText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: "#334155",
  },
  progressBarBg: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceContainer,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 3,
  },
  matchHintBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.md,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 10,
  },
  matchHintText: {
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
    height: 105,
    position: "relative",
  },
  cardFace: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: rounded.lg,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  cardFaceDown: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    borderBottomWidth: 3.5,
    borderBottomColor: "#F59E0B",
  },
  faceDownInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  faceDownBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    borderWidth: 1.5,
    borderColor: "#BBF7D0",
    borderBottomWidth: 3.5,
    borderBottomColor: "#4ADE80",
    padding: 6,
    gap: 4,
  },
  cardMatched: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  cardLabel: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    lineHeight: 15,
  },
  matchedCheckBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
});
