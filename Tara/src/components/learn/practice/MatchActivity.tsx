import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Circle, Line, Polygon } from "react-native-svg";
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

interface Point {
  x: number;
  y: number;
}

interface CardBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hookPoint: Point;
  pageRect?: { pageX: number; pageY: number; width: number; height: number };
}

const PAIR_COLORS = [
  { border: "#16A34A", bg: "#F0FDF4", stroke: "#16A34A", text: "#15803D" },
  { border: "#0284C7", bg: "#F0F9FF", stroke: "#0284C7", text: "#0369A1" },
  { border: "#D97706", bg: "#FFFBEB", stroke: "#D97706", text: "#B45309" },
  { border: "#9333EA", bg: "#FAF5FF", stroke: "#9333EA", text: "#7E22CE" },
  { border: "#E11D48", bg: "#FFF1F2", stroke: "#E11D48", text: "#BE123C" },
];

export const MatchActivity: React.FC<MatchActivityProps> = ({
  title = "Match the Concepts",
  instructions = "Drag the arrow from an item on the left to its matching role on the right, or tap to connect.",
  pairs,
  onComplete,
  onDragStateChange,
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [mismatchPair, setMismatchPair] = useState<{ left: string; right: string } | null>(null);

  // High-performance drag state
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [dragCurrentPoint, setDragCurrentPoint] = useState<Point | null>(null);
  const [hoverTargetId, setHoverTargetId] = useState<string | null>(null);

  // Registries for exact pixel alignment
  const boardRef = useRef<View>(null);
  const boardOrigin = useRef<{ pageX: number; pageY: number }>({ pageX: 0, pageY: 0 });
  const [boardLayout, setBoardLayout] = useState<{ width: number; height: number }>({ width: 340, height: 420 });

  const leftCardBoxes = useRef<Record<string, CardBox>>({}).current;
  const rightCardBoxes = useRef<Record<string, CardBox>>({}).current;
  const rightCardRefs = useRef<Record<string, View | null>>({});

  // Stable randomized order
  const [shuffledLeft] = useState(() => [...pairs].sort(() => Math.random() - 0.5));
  const [shuffledRight] = useState(() => [...pairs].sort(() => Math.random() - 0.5));

  // Consistent color theme per pair
  const pairColorMap = useRef<Record<string, number>>({}).current;
  pairs.forEach((p, idx) => {
    if (pairColorMap[p.id] === undefined) {
      pairColorMap[p.id] = idx % PAIR_COLORS.length;
    }
  });

  // Pulse animation for active node
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 450,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 450,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  // Recalibrate board position
  const measureBoard = useCallback(() => {
    if (boardRef.current) {
      boardRef.current.measure((_x, _y, _width, _height, pageX, pageY) => {
        if (pageX !== undefined && pageY !== undefined) {
          boardOrigin.current = { pageX, pageY };
        }
      });
    }

    Object.entries(rightCardRefs.current).forEach(([id, ref]) => {
      if (ref) {
        ref.measure((_x, _y, width, height, pageX, pageY) => {
          if (rightCardBoxes[id]) {
            rightCardBoxes[id].pageRect = { pageX, pageY, width, height };
          }
        });
      }
    });
  }, [rightCardBoxes]);

  // Execute matching validation
  const handleTestMatch = useCallback(
    (leftId: string, rightId: string) => {
      if (leftId === rightId) {
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch {}

        setMatchedIds((prev) => {
          const next = new Set(prev);
          next.add(leftId);
          if (next.size === pairs.length) {
            setTimeout(() => {
              onComplete();
            }, 700);
          }
          return next;
        });

        setSelectedLeftId(null);
        setSelectedRightId(null);
      } else {
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
    },
    [pairs.length, onComplete]
  );

  // PanResponder for drag-to-connect gesture
  const createDraggablePanResponder = (sourceId: string) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => !matchedIds.has(sourceId),
      onStartShouldSetPanResponderCapture: () => !matchedIds.has(sourceId),
      onMoveShouldSetPanResponder: () => !matchedIds.has(sourceId),
      onMoveShouldSetPanResponderCapture: () => !matchedIds.has(sourceId),

      onPanResponderGrant: () => {
        if (matchedIds.has(sourceId)) return;
        measureBoard();
        onDragStateChange?.(true);

        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } catch {}

        setActiveDragId(sourceId);
        setSelectedLeftId(sourceId);
        setMismatchPair(null);

        const hook = leftCardBoxes[sourceId]?.hookPoint;
        if (hook) {
          setDragCurrentPoint({ x: hook.x + 10, y: hook.y });
        }
      },

      onPanResponderMove: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
        const relativeX = pageX - boardOrigin.current.pageX;
        const relativeY = pageY - boardOrigin.current.pageY;

        // Check hover over right sockets
        let hoveredId: string | null = null;
        let snapPoint: Point | null = null;

        for (const [rId, rBox] of Object.entries(rightCardBoxes)) {
          if (matchedIds.has(rId)) continue;

          // Check hit zone
          const isNearRight =
            relativeX >= rBox.x - 30 &&
            relativeX <= rBox.x + rBox.width + 30 &&
            relativeY >= rBox.y - 15 &&
            relativeY <= rBox.y + rBox.height + 15;

          if (isNearRight) {
            hoveredId = rId;
            snapPoint = rBox.hookPoint;
            break;
          }
        }

        // Snap to target socket center if hovering, otherwise follow touch
        if (snapPoint) {
          setDragCurrentPoint(snapPoint);
        } else {
          setDragCurrentPoint({ x: relativeX, y: relativeY });
        }

        if (hoveredId !== hoverTargetId) {
          setHoverTargetId(hoveredId);
          if (hoveredId) {
            try {
              Haptics.selectionAsync();
            } catch {}
          }
        }
      },

      onPanResponderRelease: () => {
        onDragStateChange?.(false);
        if (activeDragId && hoverTargetId) {
          handleTestMatch(activeDragId, hoverTargetId);
        }

        setActiveDragId(null);
        setDragCurrentPoint(null);
        setHoverTargetId(null);
      },

      onPanResponderTerminate: () => {
        onDragStateChange?.(false);
        setActiveDragId(null);
        setDragCurrentPoint(null);
        setHoverTargetId(null);
      },
    });
  };

  // Tap-to-match fallback handlers
  const handleLeftTap = (pairId: string) => {
    if (matchedIds.has(pairId)) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setSelectedLeftId(pairId);
    setMismatchPair(null);

    if (selectedRightId) {
      handleTestMatch(pairId, selectedRightId);
    }
  };

  const handleRightTap = (pairId: string) => {
    if (matchedIds.has(pairId)) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setSelectedRightId(pairId);
    setMismatchPair(null);

    if (selectedLeftId) {
      handleTestMatch(selectedLeftId, pairId);
    }
  };

  // Clean, predictable curved path for connected lines
  const generateConnectedPath = (p1: Point, p2: Point) => {
    const dx = Math.abs(p2.x - p1.x);
    const offset = Math.min(60, Math.max(20, dx * 0.4));
    return `M ${p1.x} ${p1.y} C ${p1.x + offset} ${p1.y}, ${p2.x - offset} ${p2.y}, ${p2.x} ${p2.y}`;
  };

  // Arrowhead polygon calculation pointing from P1 to P2
  const renderArrowhead = (p1: Point, p2: Point, color: string, size = 12) => {
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
      {/* Header Info */}
      <View style={styles.headerGroup}>
        <View style={styles.headerTopRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.progressPill}>
            <MaterialIcons name="link" size={16} color="#16A34A" />
            <Text style={styles.progressText}>
              {matchedCount} / {totalCount} Connected
            </Text>
          </View>
        </View>

        <Text style={styles.instructions}>{instructions}</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(matchedCount / totalCount) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Main Board with Live SVG Cables Layer */}
      <View
        ref={boardRef}
        style={styles.boardContainer}
        onLayout={(e: LayoutChangeEvent) => {
          const { width, height } = e.nativeEvent.layout;
          setBoardLayout({ width, height });
          measureBoard();
        }}
      >
        {/* --- SVG CONNECTOR ARROW CABLES LAYER --- */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width={boardLayout.width} height={boardLayout.height}>
            {/* 1. Permanent Connected Match Curves with Clean Arrowheads */}
            {Array.from(matchedIds).map((pairId) => {
              const leftBox = leftCardBoxes[pairId];
              const rightBox = rightCardBoxes[pairId];
              if (!leftBox || !rightBox) return null;

              const colIdx = pairColorMap[pairId] || 0;
              const colorTheme = PAIR_COLORS[colIdx];
              const pathD = generateConnectedPath(leftBox.hookPoint, rightBox.hookPoint);

              return (
                <React.Fragment key={`connected-line-${pairId}`}>
                  {/* Glow Shadow Cable */}
                  <Path
                    d={pathD}
                    stroke={colorTheme.bg}
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Solid Connector Cable */}
                  <Path
                    d={pathD}
                    stroke={colorTheme.stroke}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Source Node Disc */}
                  <Circle cx={leftBox.hookPoint.x} cy={leftBox.hookPoint.y} r="5" fill={colorTheme.stroke} />
                  {/* Target Socket Arrowhead */}
                  {renderArrowhead(
                    { x: rightBox.hookPoint.x - 20, y: rightBox.hookPoint.y },
                    rightBox.hookPoint,
                    colorTheme.stroke,
                    12
                  )}
                </React.Fragment>
              );
            })}

            {/* 2. Active Live Drag Hook Cable (Zero-Lag Straight Laser Beam with Arrowhead) */}
            {activeDragId && dragCurrentPoint && leftCardBoxes[activeDragId] && (
              <React.Fragment>
                {/* Glow Shadow */}
                <Line
                  x1={leftCardBoxes[activeDragId].hookPoint.x}
                  y1={leftCardBoxes[activeDragId].hookPoint.y}
                  x2={dragCurrentPoint.x}
                  y2={dragCurrentPoint.y}
                  stroke="rgba(22, 163, 74, 0.25)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* Laser Tether Cable */}
                <Line
                  x1={leftCardBoxes[activeDragId].hookPoint.x}
                  y1={leftCardBoxes[activeDragId].hookPoint.y}
                  x2={dragCurrentPoint.x}
                  y2={dragCurrentPoint.y}
                  stroke="#16A34A"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
                {/* Source Disc */}
                <Circle
                  cx={leftCardBoxes[activeDragId].hookPoint.x}
                  cy={leftCardBoxes[activeDragId].hookPoint.y}
                  r="6"
                  fill="#16A34A"
                />
                {/* Live Tracking Arrowhead */}
                {renderArrowhead(
                  leftCardBoxes[activeDragId].hookPoint,
                  dragCurrentPoint,
                  "#16A34A",
                  14
                )}
              </React.Fragment>
            )}
          </Svg>
        </View>

        {/* --- LEFT COLUMN (ITEMS & DRAGGABLE HOOK ARROWS) --- */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderLabel}>ITEMS / FRIENDS</Text>
          </View>

          {shuffledLeft.map((item, idx) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeftId === item.id || activeDragId === item.id;
            const isMismatch = mismatchPair?.left === item.id;
            const colorTheme = PAIR_COLORS[pairColorMap[item.id] || 0];
            const hookPanResponder = createDraggablePanResponder(item.id);

            return (
              <View
                key={`left-box-${item.id}`}
                onLayout={(e: LayoutChangeEvent) => {
                  const { x, y, width, height } = e.nativeEvent.layout;
                  leftCardBoxes[item.id] = {
                    id: item.id,
                    x,
                    y,
                    width,
                    height,
                    hookPoint: { x: x + width, y: y + height / 2 },
                  };
                }}
                style={styles.cardWrapper}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={isMatched}
                  onPress={() => handleLeftTap(item.id)}
                  style={[
                    styles.card,
                    styles.leftCard,
                    isSelected && styles.cardSelected,
                    isMatched && {
                      backgroundColor: colorTheme.bg,
                      borderColor: colorTheme.border,
                      borderBottomColor: colorTheme.border,
                    },
                    isMismatch && styles.cardMismatch,
                  ]}
                >
                  {/* Badge Label (A, B, C, D) */}
                  <View
                    style={[
                      styles.indexPill,
                      isMatched && { backgroundColor: colorTheme.border },
                      isSelected && { backgroundColor: "#16A34A" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.indexPillText,
                        (isMatched || isSelected) && { color: "#FFFFFF" },
                      ]}
                    >
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </View>

                  {/* Text Label */}
                  <Text
                    style={[
                      styles.cardText,
                      styles.leftCardText,
                      isSelected && styles.cardTextSelected,
                      isMatched && { color: colorTheme.text, fontWeight: "700" },
                    ]}
                    numberOfLines={4}
                  >
                    {item.leftText}
                  </Text>

                  {/* DRAGGABLE ARROW HOOK NODE */}
                  <View
                    style={styles.hookAnchorRight}
                    {...hookPanResponder.panHandlers}
                  >
                    {isMatched ? (
                      <View
                        style={[
                          styles.hookConnectedDot,
                          { backgroundColor: colorTheme.border },
                        ]}
                      >
                        <MaterialIcons name="check" size={14} color="#FFFFFF" />
                      </View>
                    ) : (
                      <Animated.View
                        style={[
                          styles.arrowHookHandle,
                          isSelected && [
                            styles.arrowHookHandleActive,
                            { transform: [{ scale: pulseAnim }] },
                          ],
                        ]}
                      >
                        <MaterialIcons
                          name="arrow-forward"
                          size={15}
                          color={isSelected ? "#16A34A" : "#4B5563"}
                        />
                      </Animated.View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Center Gap Lane Spacer */}
        <View style={styles.centerLaneSpacer} />

        {/* --- RIGHT COLUMN (ROLES & TARGET SOCKETS) --- */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderLabel}>ROLES / FUNCTIONS</Text>
          </View>

          {shuffledRight.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedRightId === item.id;
            const isHovered = hoverTargetId === item.id;
            const isMismatch = mismatchPair?.right === item.id;
            const colorTheme = PAIR_COLORS[pairColorMap[item.id] || 0];

            return (
              <View
                key={`right-box-${item.id}`}
                ref={(ref) => {
                  rightCardRefs.current[item.id] = ref;
                }}
                onLayout={(e: LayoutChangeEvent) => {
                  const { x, y, width, height } = e.nativeEvent.layout;
                  const colOffset = boardLayout.width - width;
                  rightCardBoxes[item.id] = {
                    id: item.id,
                    x: colOffset,
                    y,
                    width,
                    height,
                    hookPoint: { x: colOffset, y: y + height / 2 },
                  };
                  measureBoard();
                }}
                style={styles.cardWrapper}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={isMatched}
                  onPress={() => handleRightTap(item.id)}
                  style={[
                    styles.card,
                    styles.rightCard,
                    isSelected && styles.cardSelected,
                    isHovered && styles.cardHovered,
                    isMatched && {
                      backgroundColor: colorTheme.bg,
                      borderColor: colorTheme.border,
                      borderBottomColor: colorTheme.border,
                    },
                    isMismatch && styles.cardMismatch,
                  ]}
                >
                  {/* TARGET SOCKET NODE */}
                  <View style={styles.socketAnchorLeft}>
                    {isMatched ? (
                      <View
                        style={[
                          styles.socketConnectedDot,
                          { backgroundColor: colorTheme.border },
                        ]}
                      >
                        <MaterialIcons name="check" size={14} color="#FFFFFF" />
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.socketDot,
                          isHovered && styles.socketDotHovered,
                          isSelected && styles.socketDotSelected,
                        ]}
                      >
                        <View style={styles.socketInnerHole} />
                      </View>
                    )}
                  </View>

                  {/* Role Text */}
                  <Text
                    style={[
                      styles.cardText,
                      styles.rightCardText,
                      isSelected && styles.cardTextSelected,
                      isMatched && { color: colorTheme.text, fontWeight: "700" },
                    ]}
                    numberOfLines={5}
                  >
                    {item.rightText}
                  </Text>
                </TouchableOpacity>
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
    paddingVertical: spacing.stackSm,
  },
  headerGroup: {
    marginBottom: spacing.stackMd,
    gap: 6,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "800",
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  progressPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  progressText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
  },
  instructions: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  progressBarBg: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    marginTop: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 3,
  },
  boardContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
    paddingVertical: 8,
  },
  column: {
    flex: 1,
    gap: 14,
  },
  centerLaneSpacer: {
    width: 28,
  },
  columnHeader: {
    paddingHorizontal: 4,
    marginBottom: -4,
  },
  columnHeaderLabel: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 0.8,
  },
  cardWrapper: {
    position: "relative",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 78,
    justifyContent: "center",
  },
  leftCard: {
    paddingRight: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightCard: {
    paddingLeft: 22,
    alignItems: "flex-start",
  },
  cardSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
    transform: [{ scale: 1.02 }],
  },
  cardHovered: {
    backgroundColor: "#DCFCE7",
    borderColor: "#16A34A",
    borderBottomColor: "#15803D",
    transform: [{ scale: 1.04 }],
  },
  cardMismatch: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
    borderBottomColor: "#DC2626",
  },
  indexPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  indexPillText: {
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
  leftCardText: {
    textAlign: "left",
  },
  rightCardText: {
    textAlign: "left",
  },
  cardTextSelected: {
    color: "#15803D",
    fontWeight: "700",
  },
  hookAnchorRight: {
    position: "absolute",
    right: -13,
    top: "50%",
    marginTop: -15,
    zIndex: 30,
    padding: 4,
  },
  arrowHookHandle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#9CA3AF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  arrowHookHandleActive: {
    borderColor: "#16A34A",
    backgroundColor: "#DCFCE7",
  },
  hookConnectedDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  socketAnchorLeft: {
    position: "absolute",
    left: -13,
    top: "50%",
    marginTop: -14,
    zIndex: 20,
  },
  socketDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#9CA3AF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  socketDotHovered: {
    borderColor: "#16A34A",
    backgroundColor: "#DCFCE7",
    transform: [{ scale: 1.25 }],
  },
  socketDotSelected: {
    borderColor: "#16A34A",
    backgroundColor: "#F0FDF4",
  },
  socketInnerHole: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9CA3AF",
  },
  socketConnectedDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
