import React, { useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";
import { AtmosphericGlow } from "../ui/AtmosphericGlow";
import { TactileButton } from "../ui/TactileButton";

export interface JourneyTimelineNode {
  id: string;
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

const ITEM_SPACING = 110;
const SVG_WIDTH_DEFAULT = 340;

/**
 * Reusable Vertical Journey Timeline Component.
 * Features:
 * - Windowed view: Last 2 completed + Current active + Next 4 upcoming levels
 * - Side pop-up speech bubble card (Left/Right side dependent on circle node position)
 * - Click pop-up speech bubble card to start level
 * - Notification bell-style 3D circle node design
 * - Layer blur overlay with UP ARROW ("Load More Levels")
 * - Atmospheric green particle halo glow behind active node
 * - Serpentine SVG swiggle curve path
 */
export function VerticalJourneyTimeline({
  nodes,
  onSelectNode,
  activeButtonText = "START LESSON",
  showTrophyEnd = true,
  scrollable = false,
}: VerticalJourneyTimelineProps) {
  const [containerWidth, setContainerWidth] = useState<number>(SVG_WIDTH_DEFAULT);
  const activeIndex = nodes.findIndex((n) => n.status === "active");

  // Windowing logic: 2 preceding + 1 active + 4 upcoming = 7 levels
  const targetActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  const initialStartIndex = Math.max(0, targetActiveIndex - 2);
  const initialEndIndex = Math.min(nodes.length, targetActiveIndex + 5);

  const [expanded, setExpanded] = useState<boolean>(false);

  const visibleNodes = expanded ? nodes : nodes.slice(initialStartIndex, initialEndIndex);
  const hasMore = !expanded && initialEndIndex < nodes.length;

  const centerLineX = containerWidth / 2;
  const offsetX = Math.min(70, Math.max(40, containerWidth * 0.20));

  // Map node positions for smooth SVG swiggle curve
  const nodePositions = visibleNodes.map((node, index) => {
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

    const y = index * ITEM_SPACING + 46;
    return { x, y, align, node };
  });

  const totalHeight = (visibleNodes.length + (showTrophyEnd && (!hasMore || expanded) ? 1 : 0)) * ITEM_SPACING + (hasMore ? 100 : 30);
  const trophyPos = showTrophyEnd && (!hasMore || expanded)
    ? { x: centerLineX, y: visibleNodes.length * ITEM_SPACING + 46 }
    : null;

  const allPositions = trophyPos
    ? [...nodePositions.map((p) => ({ x: p.x, y: p.y })), trophyPos]
    : nodePositions.map((p) => ({ x: p.x, y: p.y }));

  const activeCutoffIndex = visibleNodes.findIndex((n) => n.status === "active");
  const validCutoff = activeCutoffIndex >= 0 ? activeCutoffIndex : visibleNodes.length - 1;

  const generatePathD = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const activePoints = allPositions.slice(0, validCutoff + 1);
  const inactivePoints = allPositions.slice(validCutoff);

  const activePathD = generatePathD(activePoints);
  const inactivePathD = generatePathD(inactivePoints);

  const timelineContent = (
    <View
      style={[styles.timelineWrapper, { height: totalHeight }]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && Math.abs(w - containerWidth) > 4) {
          setContainerWidth(w);
        }
      }}
    >
      {/* --- SVG SMOOTH SWIGGLE PATH BACKDROP --- */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width="100%" height={totalHeight} viewBox={`0 0 ${containerWidth} ${totalHeight}`}>
          {/* Active Green Swiggle Line */}
          {activePathD.length > 0 && (
            <Path
              d={activePathD}
              stroke="#4CAF50"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Inactive Muted Gray Swiggle Line */}
          {inactivePathD.length > 0 && (
            <Path
              d={inactivePathD}
              stroke="#D8DBD6"
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </Svg>
      </View>

      {/* --- 3D TACTILE NODES OVERLAY WITH ATMOSPHERIC GLOW --- */}
      {nodePositions.map(({ x, y, align, node }) => (
        <View
          key={node.id}
          style={[
            styles.absoluteNodeContainer,
            { top: y - 28, left: x - 130, width: 260 },
          ]}
        >
          {/* Atmospheric Glow Aura behind Active Node */}
          {node.status === "active" && (
            <AtmosphericGlow
              size={200}
              opacity={0.85}
              tintColor="#4CAF50"
              showParticles
              particleDensity="medium"
              animated
              style={styles.activeGlowPosition}
            />
          )}

          <TimelineNodeItem
            node={node}
            align={align}
            activeButtonText={activeButtonText}
            onPress={() => onSelectNode?.(node)}
          />
        </View>
      ))}

      {/* --- FINAL TROPHY MILESTONE --- */}
      {trophyPos && (
        <View
          style={[
            styles.absoluteNodeContainer,
            { top: trophyPos.y - 30, left: trophyPos.x - 130, width: 260 },
          ]}
        >
          <View style={styles.trophyRow}>
            <View style={styles.trophyCircleNotificationStyle}>
              <MaterialIcons name="emoji-events" size={26} color="#BECAB9" />
            </View>
          </View>
        </View>
      )}

      {/* --- LAYER BLUR OVERLAY WITH UP ARROW (LOAD MORE) --- */}
      {hasMore && (
        <View style={styles.blurOverlayContainer}>
          <BlurView intensity={65} tint="light" style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={[
              "rgba(249, 250, 248, 0.05)",
              "rgba(249, 250, 248, 0.65)",
              "rgba(249, 250, 248, 0.95)",
              "#F9FAF8",
            ]}
            locations={[0, 0.35, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.loadMoreWrapper}>
            <TactileButton
              title="Load More Levels"
              icon="keyboard-arrow-up"
              iconPosition="right"
              faceColor="#FFFFFF"
              depthColor="#A8DEAC"
              textColor="#1B5E20"
              height={46}
              depth={3.5}
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

function TimelineNodeItem({
  node,
  align,
  activeButtonText,
  onPress,
}: {
  node: JourneyTimelineNode;
  align: "left" | "right" | "center";
  activeButtonText: string;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const [showBubble, setShowBubble] = useState<boolean>(node.status === "active");

  const pressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (node.status === "locked") return;
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      } catch {
        // ignore
      }
    }
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 70,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      tension: 240,
      friction: 12,
      useNativeDriver: true,
    }).start();
  };

  const handleCircleClick = () => {
    if (node.status === "locked") return;
    setShowBubble((prev) => !prev);
  };

  const handleBubbleClick = () => {
    onPress();
  };

  // 3D Push-down Press Animation (depresses top face 4px down into 3D base cylinder)
  const faceTranslateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });
  const faceScale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.96],
  });

  const animatedFaceStyle = {
    transform: [{ translateY: faceTranslateY }, { scale: faceScale }],
  };

  // 1. Completed State 3D Candy Crush Extruded Cylinder
  if (node.status === "completed") {
    return (
      <View style={styles.nodeItemCenter}>
        <Pressable
          onPress={handleCircleClick}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.pressableItem}
        >
          {/* 3D Extruded Cylinder Node */}
          <View style={styles.candy3DContainer56}>
            {/* Layer 1: Dark 3D Bottom Base Cylinder */}
            <View style={[styles.candy3DBaseCylinder, { backgroundColor: "#155E1A" }]} />

            {/* Layer 2: Animated Front Face Cylinder Top */}
            <Animated.View
              style={[
                styles.candy3DFaceTop,
                { backgroundColor: "#4CAF50", borderColor: "#81C784" },
                animatedFaceStyle,
              ]}
            >
              <MaterialIcons name="check" size={26} color="#FFFFFF" style={styles.iconCenter} />
            </Animated.View>
          </View>

          <Animated.View style={[styles.completedBadge3D, animatedFaceStyle]}>
            <Text style={styles.completedBadgeText}>{node.title}</Text>
          </Animated.View>
        </Pressable>
      </View>
    );
  }

  // 2. Active State 3D Candy Crush Extruded Glowing Disc & Hover Pop-up Bubble
  if (node.status === "active") {
    const bubbleOnRight = align !== "right";

    return (
      <View style={styles.activeNodeContainerWrapper}>
        <Pressable
          onPress={handleCircleClick}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.circlePressableAnchor}
        >
          {/* Outer Pulsing Green Halo */}
          <Animated.View style={[styles.activeHaloRing, animatedFaceStyle]}>
            {/* 3D Extruded Cylinder Node */}
            <View style={styles.candy3DContainer56}>
              {/* Layer 1: Dark 3D Bottom Base Cylinder */}
              <View style={[styles.candy3DBaseCylinder, { backgroundColor: "#00400F" }]} />

              {/* Layer 2: Animated White Face Cylinder Top */}
              <Animated.View
                style={[
                  styles.candy3DFaceTop,
                  { backgroundColor: "#FFFFFF", borderColor: "#4CAF50", borderWidth: 2.5 },
                  animatedFaceStyle,
                ]}
              >
                <MaterialIcons name={node.icon ?? "eco"} size={28} color="#16A34A" style={styles.iconCenter} />
              </Animated.View>
            </View>
          </Animated.View>
        </Pressable>

        {/* Floating Side Speech Bubble Card */}
        {showBubble && (
          <Pressable
            onPress={handleBubbleClick}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            accessibilityRole="button"
            accessibilityLabel={`Start level ${node.title}`}
            style={[
              styles.floatingBubbleAbsolute,
              bubbleOnRight ? styles.floatingRight : styles.floatingLeft,
            ]}
          >
            <Animated.View style={[styles.sideBubbleCardWrapper, animatedFaceStyle]}>
              <View style={bubbleOnRight ? styles.tailLeftBorder : styles.tailRightBorder} />
              <View style={bubbleOnRight ? styles.tailLeftFill : styles.tailRightFill} />

              <View style={styles.activeSpeechBubbleCardSide}>
                <Text style={styles.activeTitleSide}>{node.title}</Text>
                <View style={styles.startPillButtonSide}>
                  <Text style={styles.startPillButtonTextSide}>{activeButtonText}</Text>
                  <MaterialIcons name="arrow-forward" size={14} color="#16A34A" />
                </View>
              </View>
            </Animated.View>
          </Pressable>
        )}
      </View>
    );
  }

  // 3. Locked State 3D Candy Crush Gray Extruded Cylinder
  return (
    <View style={styles.nodeItemCenter}>
      <View style={styles.pressableItem}>
        <View style={styles.candy3DContainer50}>
          {/* Layer 1: Dark Gray 3D Base Cylinder */}
          <View style={[styles.candy3DBaseCylinderSmall, { backgroundColor: "#949C93" }]} />

          {/* Layer 2: Gray Face Cylinder Top */}
          <View style={[styles.candy3DFaceTopSmall, { backgroundColor: "#E2E6E1", borderColor: "#CFD5CE" }]}>
            <MaterialIcons name="lock-outline" size={22} color="#788476" style={styles.iconCenter} />
          </View>
        </View>

        <Text style={styles.lockedText}>{node.title}</Text>
      </View>
    </View>
  );
}

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
  },
  nodeItemCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressableItem: {
    alignItems: "center",
    gap: 6,
  },
  activeGlowPosition: {
    position: "absolute",
    top: -62,
    alignSelf: "center",
    zIndex: -1,
  },

  /* --- ABSOLUTE FLOATING HOVER SPEECH BUBBLE WRAPPER --- */
  activeNodeContainerWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circlePressableAnchor: {
    alignItems: "center",
    justifyContent: "center",
  },
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

  /* --- 2-LAYER 3D EXTRUDED CYLINDER ARCHITECTURE --- */
  candy3DContainer56: {
    width: 56,
    height: 62,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  candy3DBaseCylinder: {
    position: "absolute",
    bottom: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  candy3DFaceTop: {
    position: "absolute",
    top: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  /* --- DESIGN SYSTEM NODE DISCS (DESIGN.md) --- */
  completedCircle3DDesignSystem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    borderWidth: 1.5,
    borderColor: "#81C784",
    borderBottomWidth: 3.5,
    borderBottomColor: "#005313",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  activeNotificationBellCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#BECAB9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#002204",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lockedCircleDesignSystem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F1F4EF",
    borderWidth: 1.5,
    borderColor: "#BECAB9",
    alignItems: "center",
    justifyContent: "center",
  },
  completedBadge3D: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  completedBadgeText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "800",
    color: "#1B5E20",
  },
  activeHaloRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(76, 175, 80, 0.18)",
    borderWidth: 2,
    borderColor: "rgba(76, 175, 80, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },

  candy3DContainer50: {
    width: 50,
    height: 55,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  candy3DBaseCylinderSmall: {
    position: "absolute",
    bottom: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  candy3DFaceTopSmall: {
    position: "absolute",
    top: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  /* Glossy Top Arc Highlights */
  glossyTopArcWhite: {
    position: "absolute",
    top: 3,
    left: 8,
    right: 8,
    height: 15,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.42)",
    zIndex: 1,
  },
  glossyTopArcGreen: {
    position: "absolute",
    top: 3,
    left: 8,
    right: 8,
    height: 15,
    borderRadius: 10,
    backgroundColor: "rgba(76, 175, 80, 0.16)",
    zIndex: 1,
  },
  iconCenter: {
    zIndex: 2,
  },

  /* --- SIDE SPEECH POP-UP BUBBLE --- */
  sideBubbleCardWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  // Pointer Tail pointing LEFT (when bubble is on right)
  tailLeftBorder: {
    position: "absolute",
    left: -9,
    top: "50%",
    marginTop: -8,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 9,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#4CAF50",
    zIndex: 11,
  },
  tailLeftFill: {
    position: "absolute",
    left: -7,
    top: "50%",
    marginTop: -7,
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderRightWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FFFFFF",
    zIndex: 12,
  },

  // Pointer Tail pointing RIGHT (when bubble is on left)
  tailRightBorder: {
    position: "absolute",
    right: -9,
    top: "50%",
    marginTop: -8,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 9,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#4CAF50",
    zIndex: 11,
  },
  tailRightFill: {
    position: "absolute",
    right: -7,
    top: "50%",
    marginTop: -7,
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#FFFFFF",
    zIndex: 12,
  },

  activeSpeechBubbleCardSide: {
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: "#4CAF50",
    borderBottomWidth: 3.5,
    borderBottomColor: "#005313",
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "flex-start",
    gap: 3,
    shadowColor: "#006E1C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: 165,
    zIndex: 10,
  },
  activeTitleSide: {
    ...typography.headlineMd,
    fontSize: 14,
    fontWeight: "800",
    color: "#1B5E20",
    letterSpacing: -0.2,
  },
  startPillButtonSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  startPillButtonTextSide: {
    ...typography.labelSm,
    fontSize: 10.5,
    fontWeight: "800",
    color: "#16A34A",
    letterSpacing: 0.6,
  },

  /* --- CANDY CRUSH 3D LOCKED NODE --- */
  lockedCandy3DDisc: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E3DF",
    borderWidth: 2,
    borderColor: "#D8DBD6",
    borderBottomWidth: 5,
    borderBottomColor: "#A4ADA2",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  lockedText: {
    ...typography.labelSm,
    fontSize: 11.5,
    fontWeight: "700",
    color: "#7F8C7D",
  },

  /* --- 3D TROPHY END MILESTONE --- */
  trophyRow: {
    alignItems: "center",
  },
  trophyCircleNotificationStyle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F1F4EF",
    borderWidth: 1.5,
    borderColor: "#E0E3DF",
    borderBottomWidth: 3.5,
    borderBottomColor: "#C7CFC6",
    alignItems: "center",
    justifyContent: "center",
  },

  /* --- BLUR OVERLAY CONTAINER & LOAD MORE --- */
  blurOverlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 16,
    zIndex: 20,
    borderBottomLeftRadius: rounded.xl,
    borderBottomRightRadius: rounded.xl,
    overflow: "hidden",
  },
  loadMoreWrapper: {
    width: 210,
    zIndex: 25,
  },
  loadMoreButton: {
    width: "100%",
  },
});
