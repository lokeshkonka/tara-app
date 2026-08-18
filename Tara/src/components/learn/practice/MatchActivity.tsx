import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle, Path, Polygon } from "react-native-svg";
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

interface Point {
  x: number;
  y: number;
}

interface HookPointMap {
  [id: string]: Point;
}

const PAIR_THEMES = [
  { border: "#16A34A", bg: "#F0FDF4", stroke: "#16A34A", text: "#15803D", badge: "#DCFCE7" },
  { border: "#0284C7", bg: "#F0F9FF", stroke: "#0284C7", text: "#0369A1", badge: "#E0F2FE" },
  { border: "#D97706", bg: "#FFFBEB", stroke: "#D97706", text: "#B45309", badge: "#FEF3C7" },
  { border: "#9333EA", bg: "#FAF5FF", stroke: "#9333EA", text: "#7E22CE", badge: "#F3E8FF" },
  { border: "#E11D48", bg: "#FFF1F2", stroke: "#E11D48", text: "#BE123C", badge: "#FFE4E6" },
];

export const MatchActivity: React.FC<MatchActivityProps> = ({
  title = "Match the Concepts",
  instructions = "Tap an item on the left, then tap its matching role on the right.",
  pairs,
  onComplete,
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [mismatchLeftId, setMismatchLeftId] = useState<string | null>(null);
  const [mismatchRightId, setMismatchRightId] = useState<string | null>(null);

  // Board layout & hook coordinates
  const [boardWidth, setBoardWidth] = useState<number>(340);
  const [boardHeight, setBoardHeight] = useState<number>(400);
  const [leftHooks, setLeftHooks] = useState<HookPointMap>({});
  const [rightHooks, setRightHooks] = useState<HookPointMap>({});

  // Stable shuffled cards
  const shuffledLeft = useMemo(
    () => [...pairs].sort(() => 0.5 - Math.random()),
    [pairs]
  );
  const shuffledRight = useMemo(
    () => [...pairs].sort(() => 0.5 - Math.random()),
    [pairs]
  );

  // Color mapping
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

  // Pulsing animation for selected cards
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  const triggerMismatchShake = useCallback(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(leftShakeAnim, { toValue: 7, duration: 50, useNativeDriver: true }),
        Animated.timing(leftShakeAnim, { toValue: -7, duration: 50, useNativeDriver: true }),
        Animated.timing(leftShakeAnim, { toValue: 4, duration: 50, useNativeDriver: true }),
        Animated.timing(leftShakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(rightShakeAnim, { toValue: 7, duration: 50, useNativeDriver: true }),
        Animated.timing(rightShakeAnim, { toValue: -7, duration: 50, useNativeDriver: true }),
        Animated.timing(rightShakeAnim, { toValue: 4, duration: 50, useNativeDriver: true }),
        Animated.timing(rightShakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
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
            }, 600);
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

        // Non-blocking quick reset
        setTimeout(() => {
          setSelectedLeftId(null);
          setSelectedRightId(null);
          setMismatchLeftId(null);
          setMismatchRightId(null);
        }, 550);
      }
    },
    [pairs.length, onComplete, triggerMismatchShake]
  );

  const handleLeftCardPress = (id: string) => {
    // If already matched, tap to disconnect (Undo feature)
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
    // If already matched, tap to disconnect (Undo feature)
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

  const handleLeftLayout = (id: string, e: LayoutChangeEvent) => {
    const { x, y, width, height } = e.nativeEvent.layout;
    setLeftHooks((prev) => ({
      ...prev,
      [id]: { x: x + width, y: y + height / 2 },
    }));
  };

  const handleRightLayout = (id: string, e: LayoutChangeEvent) => {
    const { x, y, height } = e.nativeEvent.layout;
    setRightHooks((prev) => ({
      ...prev,
      [id]: { x, y: y + height / 2 },
    }));
  };

  // Generate clean cubic bezier cable path
  const generateCubicPath = (p1: Point, p2: Point) => {
    const dx = Math.abs(p2.x - p1.x);
    const offset = Math.min(55, Math.max(20, dx * 0.45));
    return `M ${p1.x} ${p1.y} C ${p1.x + offset} ${p1.y}, ${p2.x - offset} ${p2.y}, ${p2.x} ${p2.y}`;
  };

  // Arrowhead polygon
  const renderArrowhead = (p1: Point, p2: Point, color: string, size = 11) => {
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const tipX = p2.x;
    const tipY = p2.y;

    const leftX = tipX - size * Math.cos(angle - Math.PI / 6);
    const leftY = tipY - size * Math.sin(angle - Math.PI / 6);

    const rightX = tipX - size * Math.cos(angle + Math.PI / 6);
    const rightY = tipY - size * Math.sin(angle + Math.PI / 6);

    return (
      <Polygon
        points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    );
  };

  const matchedCount = matchedIds.size;
  const totalCount = pairs.length;

  return (
    <View style={styles.container}>
      {/* Compact Progress Bar Header */}
      <View style={styles.headerRow}>
        <View style={styles.progressPill}>
          <MaterialIcons name="link" size={15} color="#16A34A" />
          <Text style={styles.progressPillText}>
            {matchedCount} of {totalCount} Connected
          </Text>
        </View>
        <Text style={styles.instructionsText}>{instructions}</Text>
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

      {/* Main Matching Board with SVG Cable Overlay */}
      <View
        style={styles.boardContainer}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          if (width > 0 && Math.abs(width - boardWidth) > 4) {
            setBoardWidth(width);
          }
          if (height > 0 && Math.abs(height - boardHeight) > 4) {
            setBoardHeight(height);
          }
        }}
      >
        {/* SVG Cable Connectors Layer */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width={boardWidth} height={boardHeight}>
            {Array.from(matchedIds).map((pairId) => {
              const p1 = leftHooks[pairId];
              const p2 = rightHooks[pairId];
              if (!p1 || !p2) return null;

              const colIdx = colorIndexMap[pairId] ?? 0;
              const theme = PAIR_THEMES[colIdx];
              const pathD = generateCubicPath(p1, p2);

              return (
                <React.Fragment key={`connected-cable-${pairId}`}>
                  {/* Glowing Underlay Cable */}
                  <Path
                    d={pathD}
                    stroke={theme.badge}
                    strokeWidth="9"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Core Cable */}
                  <Path
                    d={pathD}
                    stroke={theme.stroke}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Source Node Disc */}
                  <Circle cx={p1.x} cy={p1.y} r="5" fill={theme.stroke} />
                  {/* Target Arrowhead */}
                  {renderArrowhead(
                    { x: p2.x - 18, y: p2.y },
                    p2,
                    theme.stroke,
                    12
                  )}
                </React.Fragment>
              );
            })}
          </Svg>
        </View>

        {/* --- LEFT COLUMN: ITEMS --- */}
        <View style={styles.column}>
          <Text style={styles.columnHeaderLabel}>SOIL COMMUNITY</Text>

          {shuffledLeft.map((item, idx) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeftId === item.id;
            const isMismatch = mismatchLeftId === item.id;
            const theme = PAIR_THEMES[colorIndexMap[item.id] ?? 0];

            return (
              <View
                key={`left-card-${item.id}`}
                onLayout={(e) => handleLeftLayout(item.id, e)}
                style={styles.cardContainer}
              >
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
                    {/* Index Badge */}
                    <View
                      style={[
                        styles.indexBadge,
                        isMatched && { backgroundColor: theme.border },
                        isSelected && { backgroundColor: "#16A34A" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.indexBadgeText,
                          (isMatched || isSelected) && { color: "#FFFFFF" },
                        ]}
                      >
                        {String.fromCharCode(65 + idx)}
                      </Text>
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

                    {/* Right Socket Indicator */}
                    <View style={styles.socketRightAnchor}>
                      {isMatched ? (
                        <View
                          style={[
                            styles.socketConnectedPill,
                            { backgroundColor: theme.border },
                          ]}
                        >
                          <MaterialIcons name="check" size={13} color="#FFFFFF" />
                        </View>
                      ) : (
                        <Animated.View
                          style={[
                            styles.socketDot,
                            isSelected && [
                              styles.socketDotSelected,
                              { transform: [{ scale: pulseAnim }] },
                            ],
                          ]}
                        >
                          <MaterialIcons
                            name="arrow-forward"
                            size={13}
                            color={isSelected ? "#16A34A" : "#9CA3AF"}
                          />
                        </Animated.View>
                      )}
                    </View>
                  </Pressable>
                </Animated.View>
              </View>
            );
          })}
        </View>

        {/* Center Gap Lane */}
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
              <View
                key={`right-card-${item.id}`}
                onLayout={(e) => handleRightLayout(item.id, e)}
                style={styles.cardContainer}
              >
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
                    {/* Left Socket Indicator */}
                    <View style={styles.socketLeftAnchor}>
                      {isMatched ? (
                        <View
                          style={[
                            styles.socketConnectedPill,
                            { backgroundColor: theme.border },
                          ]}
                        >
                          <MaterialIcons name="check" size={13} color="#FFFFFF" />
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.socketHole,
                            isSelected && styles.socketHoleSelected,
                          ]}
                        />
                      )}
                    </View>

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
                  </Pressable>
                </Animated.View>
              </View>
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
    fontSize: 12,
    color: colors.onSurfaceVariant,
    flex: 1,
    textAlign: "right",
  },
  progressBarTrack: {
    width: "100%",
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: spacing.stackSm,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 3,
  },
  boardContainer: {
    flexDirection: "row",
    position: "relative",
    paddingVertical: 6,
  },
  column: {
    flex: 1,
    gap: 12,
  },
  centerLane: {
    width: 24,
  },
  columnHeaderLabel: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 0.6,
    paddingHorizontal: 2,
    marginBottom: -4,
  },
  cardContainer: {
    position: "relative",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingVertical: 12,
    minHeight: 74,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  leftCard: {
    paddingLeft: 10,
    paddingRight: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightCard: {
    paddingLeft: 22,
    paddingRight: 10,
    alignItems: "flex-start",
  },
  cardSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
  },
  cardMismatch: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
    borderBottomColor: "#DC2626",
  },
  indexBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  indexBadgeText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#4B5563",
  },
  cardText: {
    ...typography.bodyMd,
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
    lineHeight: 18,
    flex: 1,
  },
  rightCardText: {
    textAlign: "left",
  },
  cardTextSelected: {
    color: "#15803D",
    fontWeight: "700",
  },
  socketRightAnchor: {
    position: "absolute",
    right: -11,
    top: "50%",
    marginTop: -12,
    zIndex: 20,
  },
  socketLeftAnchor: {
    position: "absolute",
    left: -11,
    top: "50%",
    marginTop: -12,
    zIndex: 20,
  },
  socketDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  socketDotSelected: {
    borderColor: "#16A34A",
    backgroundColor: "#DCFCE7",
  },
  socketHole: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  socketHoleSelected: {
    borderColor: "#16A34A",
    backgroundColor: "#DCFCE7",
  },
  socketConnectedPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
