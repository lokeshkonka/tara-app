import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
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
  onDragStateChange?: (isDragging: boolean) => void;
}

const PAIR_THEMES = [
  { border: "#16A34A", bg: "#F0FDF4", stroke: "#16A34A", text: "#15803D", badge: "#DCFCE7" },
  { border: "#0284C7", bg: "#F0F9FF", stroke: "#0284C7", text: "#0369A1", badge: "#E0F2FE" },
  { border: "#D97706", bg: "#FFFBEB", stroke: "#D97706", text: "#B45309", badge: "#FEF3C7" },
  { border: "#9333EA", bg: "#FAF5FF", stroke: "#9333EA", text: "#7E22CE", badge: "#F3E8FF" },
  { border: "#E11D48", bg: "#FFF1F2", stroke: "#E11D48", text: "#BE123C", badge: "#FFE4E6" },
];

export const MatchActivity: React.FC<MatchActivityProps> = memo(({
  instructions = "Tap an item on the left, then tap its matching role on the right.",
  pairs,
  onComplete,
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [mismatchLeftId, setMismatchLeftId] = useState<string | null>(null);
  const [mismatchRightId, setMismatchRightId] = useState<string | null>(null);

  // Stable shuffled cards
  const shuffledLeft = useMemo(
    () => [...pairs].sort(() => 0.5 - Math.random()),
    [pairs]
  );
  const shuffledRight = useMemo(
    () => [...pairs].sort(() => 0.5 - Math.random()),
    [pairs]
  );

  // Color mapping per pair ID
  const colorIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    pairs.forEach((p, idx) => {
      map[p.id] = idx % PAIR_THEMES.length;
    });
    return map;
  }, [pairs]);

  // Shake animations for mismatch feedback
  const leftShakeAnim = useRef(new Animated.Value(0)).current;
  const rightShakeAnim = useRef(new Animated.Value(0)).current;

  const triggerMismatchShake = useCallback(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(leftShakeAnim, { toValue: 6, duration: 45, useNativeDriver: true }),
        Animated.timing(leftShakeAnim, { toValue: -6, duration: 45, useNativeDriver: true }),
        Animated.timing(leftShakeAnim, { toValue: 3, duration: 45, useNativeDriver: true }),
        Animated.timing(leftShakeAnim, { toValue: 0, duration: 45, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(rightShakeAnim, { toValue: 6, duration: 45, useNativeDriver: true }),
        Animated.timing(rightShakeAnim, { toValue: -6, duration: 45, useNativeDriver: true }),
        Animated.timing(rightShakeAnim, { toValue: 3, duration: 45, useNativeDriver: true }),
        Animated.timing(rightShakeAnim, { toValue: 0, duration: 45, useNativeDriver: true }),
      ]),
    ]).start();
  }, [leftShakeAnim, rightShakeAnim]);

  const checkMatch = useCallback(
    (leftId: string, rightId: string) => {
      if (leftId === rightId) {
        if (Platform.OS !== "web") {
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch {}
        }

        setMatchedIds((prev) => {
          const next = new Set(prev);
          next.add(leftId);
          if (next.size === pairs.length) {
            setTimeout(() => {
              onComplete();
            }, 500);
          }
          return next;
        });

        setSelectedLeftId(null);
        setSelectedRightId(null);
        setMismatchLeftId(null);
        setMismatchRightId(null);
      } else {
        if (Platform.OS !== "web") {
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          } catch {}
        }

        setMismatchLeftId(leftId);
        setMismatchRightId(rightId);
        triggerMismatchShake();

        setTimeout(() => {
          setSelectedLeftId(null);
          setSelectedRightId(null);
          setMismatchLeftId(null);
          setMismatchRightId(null);
        }, 450);
      }
    },
    [pairs.length, onComplete, triggerMismatchShake]
  );

  const handleLeftCardPress = (id: string) => {
    if (matchedIds.has(id)) {
      if (Platform.OS !== "web") {
        try {
          Haptics.selectionAsync();
        } catch {}
      }
      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      return;
    }

    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }

    if (selectedLeftId === id) {
      setSelectedLeftId(null);
      return;
    }

    setSelectedLeftId(id);
    setMismatchLeftId(null);
    setMismatchRightId(null);

    if (selectedRightId) {
      checkMatch(id, selectedRightId);
    }
  };

  const handleRightCardPress = (id: string) => {
    if (matchedIds.has(id)) {
      if (Platform.OS !== "web") {
        try {
          Haptics.selectionAsync();
        } catch {}
      }
      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      return;
    }

    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }

    if (selectedRightId === id) {
      setSelectedRightId(null);
      return;
    }

    setSelectedRightId(id);
    setMismatchLeftId(null);
    setMismatchRightId(null);

    if (selectedLeftId) {
      checkMatch(selectedLeftId, id);
    }
  };

  const matchedCount = matchedIds.size;
  const totalCount = pairs.length;

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <View style={styles.headerRow}>
        <View style={styles.progressPill}>
          <MaterialIcons name="check-circle" size={14} color="#16A34A" />
          <Text style={styles.progressPillText}>
            {matchedCount} of {totalCount} Connected
          </Text>
        </View>
        <Text style={styles.instructionsText} numberOfLines={1}>
          {instructions}
        </Text>
      </View>

      {/* Progress Track */}
      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${(matchedCount / Math.max(totalCount, 1)) * 100}%` },
          ]}
        />
      </View>

      {/* Main Matching Grid */}
      <View style={styles.boardContainer}>
        {/* --- LEFT COLUMN: ITEMS --- */}
        <View style={styles.column}>
          <Text style={styles.columnHeaderLabel}>SOIL COMMUNITY</Text>

          {shuffledLeft.map((item, idx) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeftId === item.id;
            const isMismatch = mismatchLeftId === item.id;
            const theme = PAIR_THEMES[colorIndexMap[item.id] ?? 0];

            return (
              <View key={`left-card-${item.id}`} style={styles.cardContainer}>
                <Animated.View
                  style={{
                    transform: isMismatch ? [{ translateX: leftShakeAnim }] : [],
                  }}
                >
                  <Pressable
                    onPress={() => handleLeftCardPress(item.id)}
                    style={[
                      styles.card,
                      styles.leftCard,
                      isSelected && styles.cardSelected,
                      isMatched && {
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        borderBottomColor: theme.border,
                      },
                      isMismatch && styles.cardMismatch,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Item ${item.leftText}`}
                  >
                    {/* Index Badge / Checkmark */}
                    <View
                      style={[
                        styles.indexBadge,
                        isMatched && { backgroundColor: theme.border },
                        isSelected && { backgroundColor: "#16A34A" },
                      ]}
                    >
                      {isMatched ? (
                        <MaterialIcons name="check" size={13} color="#FFFFFF" />
                      ) : (
                        <Text
                          style={[
                            styles.indexBadgeText,
                            isSelected && { color: "#FFFFFF" },
                          ]}
                        >
                          {String.fromCharCode(65 + idx)}
                        </Text>
                      )}
                    </View>

                    {/* Item Text */}
                    <Text
                      style={[
                        styles.cardText,
                        isSelected && styles.cardTextSelected,
                        isMatched && { color: theme.text, fontWeight: "700" },
                      ]}
                      numberOfLines={4}
                    >
                      {item.leftText}
                    </Text>

                    {/* Right Tick Indicator */}
                    {isMatched && (
                      <View style={[styles.tickBadge, { backgroundColor: theme.border }]}>
                        <MaterialIcons name="check" size={12} color="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              </View>
            );
          })}
        </View>

        {/* Center Divider Spacer */}
        <View style={styles.centerLane} />

        {/* --- RIGHT COLUMN: ROLES --- */}
        <View style={styles.column}>
          <Text style={styles.columnHeaderLabel}>ROLES & FUNCTIONS</Text>

          {shuffledRight.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedRightId === item.id;
            const isMismatch = mismatchRightId === item.id;
            const theme = PAIR_THEMES[colorIndexMap[item.id] ?? 0];

            return (
              <View key={`right-card-${item.id}`} style={styles.cardContainer}>
                <Animated.View
                  style={{
                    transform: isMismatch ? [{ translateX: rightShakeAnim }] : [],
                  }}
                >
                  <Pressable
                    onPress={() => handleRightCardPress(item.id)}
                    style={[
                      styles.card,
                      styles.rightCard,
                      isSelected && styles.cardSelected,
                      isMatched && {
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        borderBottomColor: theme.border,
                      },
                      isMismatch && styles.cardMismatch,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Role: ${item.rightText}`}
                  >
                    {/* Role Description Text */}
                    <Text
                      style={[
                        styles.cardText,
                        styles.rightCardText,
                        isSelected && styles.cardTextSelected,
                        isMatched && { color: theme.text, fontWeight: "700" },
                      ]}
                      numberOfLines={5}
                    >
                      {item.rightText}
                    </Text>

                    {/* Left Tick Indicator */}
                    {isMatched && (
                      <View style={[styles.tickBadge, { backgroundColor: theme.border }]}>
                        <MaterialIcons name="check" size={12} color="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  progressPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  progressPillText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: "#15803D",
  },
  instructionsText: {
    ...typography.bodyMd,
    fontSize: 11.5,
    color: colors.onSurfaceVariant,
    flex: 1,
    textAlign: "right",
  },
  progressBarTrack: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: rounded.full,
    overflow: "hidden",
    marginBottom: spacing.stackSm,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: rounded.full,
  },
  boardContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  column: {
    flex: 1,
    gap: 8,
  },
  centerLane: {
    width: 10,
  },
  columnHeaderLabel: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: "800",
    color: colors.onSurfaceVariant,
    letterSpacing: 0.8,
    marginBottom: 2,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.lg,
    padding: 10,
    minHeight: 74,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    justifyContent: "center",
  },
  leftCard: {
    paddingLeft: 30,
    paddingRight: 24,
    position: "relative",
  },
  rightCard: {
    paddingLeft: 10,
    paddingRight: 26,
    position: "relative",
  },
  cardSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
    borderWidth: 2,
    borderBottomWidth: 3.5,
  },
  cardMismatch: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
    borderBottomColor: "#DC2626",
  },
  indexBadge: {
    position: "absolute",
    left: 8,
    top: "50%",
    marginTop: -10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  indexBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#4B5563",
  },
  cardText: {
    ...typography.bodyMd,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: colors.onSurface,
  },
  rightCardText: {
    fontSize: 11.5,
    lineHeight: 15,
  },
  cardTextSelected: {
    color: "#15803D",
    fontWeight: "700",
  },
  tickBadge: {
    position: "absolute",
    right: 6,
    top: "50%",
    marginTop: -9,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
});
