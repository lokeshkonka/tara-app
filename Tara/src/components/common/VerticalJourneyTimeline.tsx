import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { AtmosphericGlow } from "../ui/AtmosphericGlow";
import { TactileButton } from "../ui/TactileButton";

export interface JourneyTimelineNode {
  id: string;
  levelNumber?: number;
  title: string;
  subtitle?: string;
  status: "completed" | "active" | "locked";
  xp?: number;
  durationMinutes?: number;
  icon?: keyof typeof MaterialIcons.glyphMap;
  align?: "left" | "right" | "center";
}

export interface VerticalJourneyTimelineProps {
  nodes: JourneyTimelineNode[];
  onSelectNode?: (node: JourneyTimelineNode) => void;
  activeButtonText?: string;
  showTrophyEnd?: boolean;
  scrollable?: boolean;
}

const ITEM_SPACING = 120;
const SVG_WIDTH_DEFAULT = 340;

/**
 * Reusable, High-Performance Vertical Journey Timeline Component.
 * - Smooth S-curve SVG vector path connecting level milestones
 * - 3D extruded Candy-Crush style tactile nodes with level badges
 * - Responsive floating active tooltip that never overflows
 * - Hardware-accelerated animations & contextual haptics
 */
export function VerticalJourneyTimeline({
  nodes,
  onSelectNode,
  activeButtonText = "START",
  showTrophyEnd = true,
  scrollable = false,
}: VerticalJourneyTimelineProps) {
  const [containerWidth, setContainerWidth] = useState<number>(SVG_WIDTH_DEFAULT);
  const [expanded, setExpanded] = useState<boolean>(false);

  const activeIndex = useMemo(
    () => nodes.findIndex((n) => n.status === "active"),
    [nodes]
  );

  // If total nodes <= 7, always show all nodes directly without truncation friction
  const shouldWindow = nodes.length > 7 && !expanded;
  const targetActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  const initialStartIndex = Math.max(0, targetActiveIndex - 2);
  const initialEndIndex = Math.min(nodes.length, targetActiveIndex + 5);

  const visibleNodes = useMemo(
    () => (shouldWindow ? nodes.slice(initialStartIndex, initialEndIndex) : nodes),
    [nodes, shouldWindow, initialStartIndex, initialEndIndex]
  );

  const hasMore = shouldWindow && initialEndIndex < nodes.length;

  const centerLineX = containerWidth / 2;
  const offsetX = Math.min(65, Math.max(35, containerWidth * 0.18));

  // Memoize node positions and geometry
  const nodePositions = useMemo(() => {
    return visibleNodes.map((node, index) => {
      const align =
        node.align ??
        (node.status === "active"
          ? "center"
          : index === 0
          ? "center"
          : index % 2 === 1
          ? "right"
          : "left");

      let x = centerLineX;
      if (align === "left") x = centerLineX - offsetX;
      if (align === "right") x = centerLineX + offsetX;

      const y = index * ITEM_SPACING + 52;
      return { x, y, align, node };
    });
  }, [visibleNodes, centerLineX, offsetX]);

  const allCompleted = useMemo(
    () => nodes.every((n) => n.status === "completed"),
    [nodes]
  );

  const totalHeight = useMemo(() => {
    const trophySlots = showTrophyEnd && (!hasMore || expanded) ? 1 : 0;
    return (visibleNodes.length + trophySlots) * ITEM_SPACING + (hasMore ? 80 : 24);
  }, [visibleNodes.length, showTrophyEnd, hasMore, expanded]);

  const trophyPos = useMemo(() => {
    if (!showTrophyEnd || (hasMore && !expanded)) return null;
    return {
      x: centerLineX,
      y: visibleNodes.length * ITEM_SPACING + 52,
    };
  }, [showTrophyEnd, hasMore, expanded, centerLineX, visibleNodes.length]);

  const allPositions = useMemo(() => {
    const pts = nodePositions.map((p) => ({ x: p.x, y: p.y }));
    if (trophyPos) pts.push(trophyPos);
    return pts;
  }, [nodePositions, trophyPos]);

  const activeCutoffIndex = useMemo(() => {
    const idx = visibleNodes.findIndex((n) => n.status === "active");
    if (idx >= 0) return idx;
    return allCompleted ? visibleNodes.length : 0;
  }, [visibleNodes, allCompleted]);

  // Smooth cubic spline bezier path generator
  const generatePathD = useCallback((points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dy = p2.y - p1.y;
      const cp1y = p1.y + dy * 0.5;
      const cp2y = p1.y + dy * 0.5;
      d += ` C ${p1.x} ${cp1y}, ${p2.x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, []);

  const activePoints = useMemo(
    () => allPositions.slice(0, activeCutoffIndex + 1),
    [allPositions, activeCutoffIndex]
  );
  const inactivePoints = useMemo(
    () => allPositions.slice(activeCutoffIndex),
    [allPositions, activeCutoffIndex]
  );

  const activePathD = useMemo(
    () => generatePathD(activePoints),
    [generatePathD, activePoints]
  );
  const inactivePathD = useMemo(
    () => generatePathD(inactivePoints),
    [generatePathD, inactivePoints]
  );

  const handleSelectNodeCallback = useCallback(
    (node: JourneyTimelineNode) => {
      onSelectNode?.(node);
    },
    [onSelectNode]
  );

  const timelineContent = (
    <View
      style={[styles.timelineWrapper, { height: totalHeight }]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && Math.abs(w - containerWidth) > 8) {
          setContainerWidth(w);
        }
      }}
    >
      {/* SVG Serpentine Journey Path */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {activePathD.length > 0 && (
          <Svg width="100%" height={totalHeight} viewBox={`0 0 ${containerWidth} ${totalHeight}`}>
            {/* Active Vibrant Green Path */}
            <Path
              d={activePathD}
              stroke="#2E7D32"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d={activePathD}
              stroke="#4CAF50"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Inactive Dashed Path */}
            {inactivePathD.length > 0 && (
              <Path
                d={inactivePathD}
                stroke="#D1D5DB"
                strokeWidth="4"
                strokeDasharray="7 7"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </Svg>
        )}
      </View>

      {/* Interactive Level Nodes */}
      {nodePositions.map(({ x, y, align, node }, idx) => (
        <View
          key={node.id}
          style={[
            styles.absoluteNodeContainer,
            { top: y - 32, left: x - 130, width: 260 },
          ]}
        >
          {/* Lightweight atmospheric aura behind active node */}
          {node.status === "active" && (
            <AtmosphericGlow
              size={180}
              opacity={0.8}
              tintColor="#4CAF50"
              showParticles={false}
              animated={true}
              style={styles.activeGlowPosition}
            />
          )}

          <TimelineNodeItem
            node={node}
            levelIndex={node.levelNumber ?? idx + 1}
            align={align}
            activeButtonText={activeButtonText}
            onPress={() => handleSelectNodeCallback(node)}
          />
        </View>
      ))}

      {/* Trophy Mastery Milestone */}
      {trophyPos && (
        <View
          style={[
            styles.absoluteNodeContainer,
            { top: trophyPos.y - 32, left: trophyPos.x - 130, width: 260 },
          ]}
        >
          <View style={styles.trophyContainer}>
            <View
              style={[
                styles.trophyDisc3D,
                allCompleted && styles.trophyDisc3DGold,
              ]}
            >
              <MaterialIcons
                name="emoji-events"
                size={28}
                color={allCompleted ? "#D97706" : "#9CA3AF"}
              />
            </View>
            <Text
              style={[
                styles.trophyLabel,
                allCompleted && styles.trophyLabelGold,
              ]}
            >
              {allCompleted ? "Lesson Mastered!" : "Mastery Milestone"}
            </Text>
          </View>
        </View>
      )}

      {/* Smooth Gradient Overlay with Load More */}
      {hasMore && (
        <View style={styles.gradientOverlayContainer} pointerEvents="box-none">
          <LinearGradient
            colors={[
              "rgba(249, 250, 248, 0)",
              "rgba(249, 250, 248, 0.75)",
              "rgba(249, 250, 248, 0.98)",
              "#F9FAF8",
            ]}
            locations={[0, 0.4, 0.75, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.loadMoreWrapper}>
            <TactileButton
              title="Show All Levels"
              icon="expand-more"
              iconPosition="right"
              faceColor="#FFFFFF"
              depthColor="#A8DEAC"
              textColor="#1B5E20"
              height={44}
              depth={3}
              borderRadius={rounded.full}
              onPress={() => setExpanded(true)}
              style={styles.loadMoreButton}
            />
          </View>
        </View>
      )}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {timelineContent}
      </ScrollView>
    );
  }

  return timelineContent;
}

// ─────────────────────────────────────────────
// MEMOIZED TIMELINE NODE ITEM
// ─────────────────────────────────────────────

interface TimelineNodeItemProps {
  node: JourneyTimelineNode;
  levelIndex: number;
  align: "left" | "right" | "center";
  activeButtonText: string;
  onPress: () => void;
}

const TimelineNodeItem = memo(function TimelineNodeItem({
  node,
  levelIndex,
  align,
  activeButtonText,
  onPress,
}: TimelineNodeItemProps) {
  const pressAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (node.status === "locked") return;
    Animated.spring(pressAnim, {
      toValue: 1,
      speed: 50,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      speed: 30,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (node.status === "locked") {
      if (Platform.OS !== "web") {
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } catch {}
      }
      // Gentle horizontal locked feedback shake
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      return;
    }

    if (Platform.OS !== "web") {
      try {
        if (node.status === "active") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.selectionAsync();
        }
      } catch {}
    }

    onPress();
  };

  const faceTranslateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });
  const faceScale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.96],
  });

  const animatedTransform = {
    transform: [
      { translateY: faceTranslateY },
      { scale: faceScale },
      { translateX: shakeAnim },
    ],
  };

  // 1. COMPLETED NODE
  if (node.status === "completed") {
    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.nodeItemPressable}
        accessibilityRole="button"
        accessibilityLabel={`Level ${levelIndex}: ${node.title} Completed`}
      >
        <Animated.View style={[styles.nodeCenterStack, animatedTransform]}>
          {/* 3D Green Cylinder Disc */}
          <View style={styles.cylinder3DContainer}>
            <View style={[styles.cylinderBase3D, { backgroundColor: "#155E1A" }]} />
            <View
              style={[
                styles.cylinderFaceTop3D,
                { backgroundColor: "#2E7D32", borderColor: "#4CAF50" },
              ]}
            >
              <MaterialIcons name="check" size={24} color="#FFFFFF" />
            </View>
          </View>

          {/* Level Title & XP Badge */}
          <View style={styles.nodeMetaStack}>
            <Text style={styles.completedTitleText} numberOfLines={1}>
              {node.title}
            </Text>
            {node.xp ? (
              <View style={styles.completedXpPill}>
                <MaterialIcons name="stars" size={12} color="#15803D" />
                <Text style={styles.completedXpText}>+{node.xp} XP</Text>
              </View>
            ) : null}
          </View>
        </Animated.View>
      </Pressable>
    );
  }

  // 2. ACTIVE NODE
  if (node.status === "active") {
    const bubbleOnRight = align !== "right";

    return (
      <View style={styles.activeNodeContainerWrapper}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.nodeItemPressable}
          accessibilityRole="button"
          accessibilityLabel={`Active Level ${levelIndex}: ${node.title}`}
        >
          <Animated.View style={[styles.activeNodePulseAnchor, animatedTransform]}>
            {/* Outer Glowing Halo */}
            <View style={styles.activePulsingHalo}>
              {/* 3D White/Green Cylinder Disc */}
              <View style={styles.cylinder3DContainer}>
                <View style={[styles.cylinderBase3D, { backgroundColor: "#0F511E" }]} />
                <View
                  style={[
                    styles.cylinderFaceTop3D,
                    {
                      backgroundColor: "#FFFFFF",
                      borderColor: "#4CAF50",
                      borderWidth: 3,
                    },
                  ]}
                >
                  <Text style={styles.activeLevelNumberText}>{levelIndex}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </Pressable>

        {/* Floating Side Tooltip Card */}
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.floatingBubbleAbsolute,
            bubbleOnRight ? styles.floatingRight : styles.floatingLeft,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Start Level ${levelIndex}: ${node.title}`}
        >
          <Animated.View style={[styles.activeTooltipCard, animatedTransform]}>
            <Text style={styles.tooltipLevelBadge}>LEVEL {levelIndex}</Text>
            <Text style={styles.tooltipTitleText} numberOfLines={1}>
              {node.title}
            </Text>
            <View style={styles.tooltipStartRow}>
              <Text style={styles.tooltipStartText}>{activeButtonText}</Text>
              <MaterialIcons name="arrow-forward" size={13} color="#15803D" />
            </View>
          </Animated.View>
        </Pressable>
      </View>
    );
  }

  // 3. LOCKED NODE
  return (
    <Pressable
      onPress={handlePress}
      style={styles.nodeItemPressable}
      accessibilityRole="button"
      accessibilityLabel={`Level ${levelIndex}: ${node.title} Locked`}
    >
      <Animated.View style={[styles.nodeCenterStack, animatedTransform]}>
        {/* 3D Gray Cylinder Disc */}
        <View style={styles.cylinder3DContainer}>
          <View style={[styles.cylinderBase3D, { backgroundColor: "#9CA3AF" }]} />
          <View
            style={[
              styles.cylinderFaceTop3D,
              { backgroundColor: "#E5E7EB", borderColor: "#D1D5DB" },
            ]}
          >
            <MaterialIcons name="lock" size={20} color="#6B7280" />
          </View>
        </View>

        <Text style={styles.lockedTitleText} numberOfLines={1}>
          {node.title}
        </Text>
      </Animated.View>
    </Pressable>
  );
});

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  scrollContentContainer: {
    paddingVertical: spacing.stackSm,
  },
  timelineWrapper: {
    width: "100%",
    alignSelf: "center",
    position: "relative",
  },
  absoluteNodeContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  nodeItemPressable: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  nodeCenterStack: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  activeGlowPosition: {
    position: "absolute",
    top: -56,
    alignSelf: "center",
    zIndex: -1,
  },

  // 3D Cylinder Disc Architecture
  cylinder3DContainer: {
    width: 58,
    height: 64,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cylinderBase3D: {
    position: "absolute",
    bottom: 0,
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  cylinderFaceTop3D: {
    position: "absolute",
    top: 0,
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Completed Node Meta
  nodeMetaStack: {
    alignItems: "center",
    gap: 3,
  },
  completedTitleText: {
    ...typography.labelSm,
    fontSize: 12,
    fontWeight: "700",
    color: "#1B5E20",
    maxWidth: 140,
    textAlign: "center",
  },
  completedXpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#86EFAC",
  },
  completedXpText: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "800",
    color: "#15803D",
  },

  // Active Node Anchor & Halo
  activeNodeContainerWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeNodePulseAnchor: {
    alignItems: "center",
    justifyContent: "center",
  },
  activePulsingHalo: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderWidth: 2,
    borderColor: "rgba(76, 175, 80, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  activeLevelNumberText: {
    ...typography.headlineMd,
    fontSize: 22,
    fontWeight: "900",
    color: "#16A34A",
  },

  // Active Floating Tooltip
  floatingBubbleAbsolute: {
    position: "absolute",
    top: 4,
    zIndex: 50,
  },
  floatingRight: {
    left: "58%",
  },
  floatingLeft: {
    right: "58%",
  },
  activeTooltipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.lg,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderBottomWidth: 3.5,
    borderBottomColor: "#15803D",
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 2,
    shadowColor: "#15803D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 120,
    maxWidth: 150,
  },
  tooltipLevelBadge: {
    ...typography.labelSm,
    fontSize: 9.5,
    fontWeight: "800",
    color: "#15803D",
    letterSpacing: 0.5,
  },
  tooltipTitleText: {
    ...typography.labelLg,
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.onSurface,
  },
  tooltipStartRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  tooltipStartText: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "800",
    color: "#15803D",
    letterSpacing: 0.4,
  },

  // Locked Node Meta
  lockedTitleText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: "#6B7280",
    maxWidth: 130,
    textAlign: "center",
  },

  // Trophy End Milestone
  trophyContainer: {
    alignItems: "center",
    gap: 4,
  },
  trophyDisc3D: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderBottomWidth: 3.5,
    borderBottomColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  trophyDisc3DGold: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
    borderBottomColor: "#D97706",
  },
  trophyLabel: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  trophyLabelGold: {
    color: "#B45309",
    fontWeight: "800",
  },

  // Gradient Overlay & Load More
  gradientOverlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 12,
    zIndex: 25,
  },
  loadMoreWrapper: {
    zIndex: 30,
  },
  loadMoreButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
