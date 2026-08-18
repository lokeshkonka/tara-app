import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Svg, { Polygon } from "react-native-svg";
import type { TaraExpression } from "../../Tara/Tara.types";
import { TaraSideMessageCard } from "../../tara-messages/TaraSideMessageCard";
import { TactileButton } from "../../ui/TactileButton";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

const HEX_BADGE_SIZE = 50;
const HEX_BADGE_DEPTH = 4.5;
const HEX_TOP_MARGIN = 2;
const HEX_BADGE_HEIGHT = HEX_BADGE_SIZE + HEX_BADGE_DEPTH + HEX_TOP_MARGIN;

function hexPoints(size: number, offsetY = 0, radiusDelta = 0): string {
  const r = size / 2 + radiusDelta;
  const c = size / 2;
  const angles = [30, 90, 150, 210, 270, 330];
  return angles
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x = c + r * Math.cos(rad);
      const y = c + r * Math.sin(rad) + offsetY;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const BADGE_THEMES: Record<string, { main: string; edge: string; face: string; icon: string }> = {
  "soil-guardian": { main: "#16A34A", edge: "#15803D", face: "#DCFCE7", icon: "#15803D" },
  "water-saver": { main: "#0284C7", edge: "#0369A1", face: "#E0F2FE", icon: "#0284C7" },
  "eco-grower": { main: "#84CC16", edge: "#65A30D", face: "#ECFCCB", icon: "#4D7C0F" },
  biodiversity: { main: "#8B5CF6", edge: "#7C3AED", face: "#F3E8FF", icon: "#7C3AED" },
  pollinator: { main: "#F59E0B", edge: "#D97706", face: "#FEF3C7", icon: "#D97706" },
  eco: { main: "#16A34A", edge: "#15803D", face: "#DCFCE7", icon: "#15803D" },
};

const DEFAULT_BADGE_THEME = {
  main: "#16A34A",
  edge: "#15803D",
  face: "#DCFCE7",
  icon: "#15803D",
};

export interface BadgeRewardItemProps {
  title: string;
  icon?: string;
  badgeId?: string;
}

/**
 * Reusable 3D Hexagon Badge Reward Component matching Your Progress
 */
export const BadgeRewardItem: React.FC<BadgeRewardItemProps> = ({
  title,
  icon = "eco",
  badgeId,
}) => {
  const themeKey = badgeId || icon || "default";
  const theme = BADGE_THEMES[themeKey] ?? DEFAULT_BADGE_THEME;

  return (
    <View style={badgeStyles.container}>
      {/* Authentic 3D Hexagon Badge from Your Progress */}
      <View style={badgeStyles.hexContainer}>
        <Svg width={HEX_BADGE_SIZE} height={HEX_BADGE_HEIGHT} viewBox={`0 0 ${HEX_BADGE_SIZE} ${HEX_BADGE_HEIGHT}`}>
          {/* 3D bottom depth edge */}
          <Polygon points={hexPoints(HEX_BADGE_SIZE, HEX_TOP_MARGIN + HEX_BADGE_DEPTH)} fill={theme.edge} />
          {/* Hexagon Face */}
          <Polygon
            points={hexPoints(HEX_BADGE_SIZE, HEX_TOP_MARGIN)}
            fill={theme.face}
            stroke={theme.main}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </Svg>
        <View style={badgeStyles.hexIconWrap}>
          <MaterialIcons name={(icon as any) || "eco"} size={24} color={theme.icon} />
        </View>
      </View>

      <View style={badgeStyles.textColumn}>
        <View style={badgeStyles.tagRow}>
          <Text style={badgeStyles.badgeTag}>BADGE UNLOCKED</Text>
        </View>
        <Text style={badgeStyles.badgeTitle}>{title}</Text>
      </View>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: "#BBF7D0",
    borderBottomWidth: 3.5,
    borderBottomColor: "#16A34A",
    marginBottom: spacing.stackMd,
  },
  hexContainer: {
    width: HEX_BADGE_SIZE,
    height: HEX_BADGE_HEIGHT,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  hexIconWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: HEX_BADGE_SIZE,
    height: HEX_BADGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  textColumn: {
    flex: 1,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  badgeTag: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: "800",
    color: "#15803D",
    letterSpacing: 0.8,
  },
  badgeTitle: {
    ...typography.labelLg,
    fontSize: 16,
    fontWeight: "800",
    color: "#14532D",
  },
});

export interface LevelCompleteCardProps {
  levelNumber?: number;
  levelTitle?: string;
  xpEarned: number;
  badgeTitle?: string;
  badgeIcon?: string;
  badgeId?: string;
  conceptsCount?: number;
  accuracyPercentage?: number;
  taraMessage?: string;
  taraExpression?: TaraExpression;
  taraAudioSource?: any;
  primaryButtonTitle?: string;
  onPrimaryAction: () => void;
  secondaryButtonTitle?: string;
  onSecondaryAction?: () => void;
}

export const LevelCompleteCard: React.FC<LevelCompleteCardProps> = ({
  levelNumber = 1,
  levelTitle = "Level Complete!",
  xpEarned,
  badgeTitle,
  badgeIcon = "eco",
  badgeId,
  conceptsCount = 5,
  accuracyPercentage = 100,
  taraMessage = "Wonderful job! You have mastered this level and strengthened your farming knowledge!",
  taraExpression = "excited",
  taraAudioSource,
  primaryButtonTitle = "Continue Journey",
  onPrimaryAction,
  secondaryButtonTitle,
  onSecondaryAction,
}) => {
  const trophyScaleAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const statsSlideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}

    Animated.sequence([
      Animated.spring(trophyScaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(contentFadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(statsSlideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [trophyScaleAnim, contentFadeAnim, statsSlideAnim]);

  return (
    <View style={styles.container}>
      {/* Main Tactile Reward Card */}
      <View style={styles.cardSurface}>
        {/* 3D Tactile Trophy Medallion */}
        <Animated.View style={[styles.trophyWrapper, { transform: [{ scale: trophyScaleAnim }] }]}>
          <View style={styles.trophy3DShadowRing}>
            <View style={styles.trophy3DOuterDisc}>
              <View style={styles.trophy3DInnerBevel}>
                <View style={styles.trophy3DCoreCircle}>
                  <MaterialIcons name="emoji-events" size={46} color="#D97706" />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Title & Level Tag */}
        <Animated.View style={[styles.headerTexts, { opacity: contentFadeAnim }]}>
          <View style={styles.levelPill}>
            <Text style={styles.levelPillText}>LEVEL {levelNumber} COMPLETED</Text>
          </View>
          <Text style={styles.congratsHeading}>{levelTitle}</Text>
        </Animated.View>

        {/* Dynamic Badge Component (Renders whenever badge is in data) */}
        {badgeTitle && (
          <Animated.View style={[styles.badgeWrapper, { opacity: contentFadeAnim }]}>
            <BadgeRewardItem
              title={badgeTitle}
              icon={badgeIcon}
              badgeId={badgeId}
            />
          </Animated.View>
        )}

        {/* Stats Grid */}
        <Animated.View
          style={[
            styles.statsGrid,
            {
              opacity: contentFadeAnim,
              transform: [{ translateY: statsSlideAnim }],
            },
          ]}
        >
          {/* XP Box */}
          <View style={[styles.statBox, styles.statBoxXp]}>
            <View style={styles.statIconBadgeXp}>
              <MaterialIcons name="stars" size={18} color="#D97706" />
            </View>
            <Text style={styles.statNumberXp}>+{xpEarned}</Text>
            <Text style={styles.statLabelXp}>XP EARNED</Text>
          </View>

          {/* Accuracy Box */}
          <View style={[styles.statBox, styles.statBoxAccuracy]}>
            <View style={styles.statIconBadgeAccuracy}>
              <MaterialIcons name="verified" size={18} color="#2E7D32" />
            </View>
            <Text style={styles.statNumberAccuracy}>{accuracyPercentage}%</Text>
            <Text style={styles.statLabelAccuracy}>ACCURACY</Text>
          </View>

          {/* Concepts Box */}
          <View style={[styles.statBox, styles.statBoxConcepts]}>
            <View style={styles.statIconBadgeConcepts}>
              <MaterialIcons name="menu-book" size={18} color="#1565C0" />
            </View>
            <Text style={styles.statNumberConcepts}>{conceptsCount}</Text>
            <Text style={styles.statLabelConcepts}>CONCEPTS</Text>
          </View>
        </Animated.View>
      </View>

      {/* Tara Side Message Card with integrated character avatar and speech bubble */}
      <Animated.View style={[styles.taraSection, { opacity: contentFadeAnim }]}>
        <TaraSideMessageCard
          title="Great Milestone!"
          expression={taraExpression}
          message={taraMessage}
          audioSource={taraAudioSource}
          showVoiceControl={true}
          autoPlay={true}
        />
      </Animated.View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TactileButton
          title={primaryButtonTitle || "Claim & Continue"}
          icon="arrow-forward"
          iconPosition="right"
          faceColor="#16A34A"
          depthColor="#15803D"
          textColor="#FFFFFF"
          height={56}
          depth={4}
          borderRadius={rounded.full}
          onPress={onPrimaryAction}
        />

        {secondaryButtonTitle && onSecondaryAction && (
          <View style={styles.secondaryButtonWrapper}>
            <TactileButton
              title={secondaryButtonTitle}
              faceColor={colors.surfaceContainerLowest}
              depthColor={componentColors.cardEdge}
              textColor={colors.primary}
              height={48}
              depth={3}
              borderRadius={rounded.full}
              onPress={onSecondaryAction}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  cardSurface: {
    width: "100%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.stackLg,
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    borderBottomWidth: 4,
    borderBottomColor: "#D97706",
    alignItems: "center",
  },
  trophyWrapper: {
    marginTop: -4,
    marginBottom: spacing.stackSm,
    alignItems: "center",
    justifyContent: "center",
  },
  trophy3DShadowRing: {
    borderRadius: 50,
    backgroundColor: "#B45309",
    paddingBottom: 4.5,
  },
  trophy3DOuterDisc: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#F59E0B",
    borderWidth: 2,
    borderColor: "#FCD34D",
    alignItems: "center",
    justifyContent: "center",
  },
  trophy3DInnerBevel: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FEF3C7",
    borderWidth: 1.5,
    borderColor: "#FBBF24",
    alignItems: "center",
    justifyContent: "center",
  },
  trophy3DCoreCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTexts: {
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.stackSm,
  },
  levelPill: {
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  levelPillText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.8,
  },
  congratsHeading: {
    ...typography.headlineLg,
    fontSize: 22,
    fontWeight: "800",
    color: colors.onSurface,
    textAlign: "center",
  },
  badgeWrapper: {
    width: "100%",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderBottomWidth: 3,
  },
  statBoxXp: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
    borderBottomColor: "#F59E0B",
  },
  statBoxAccuracy: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
    borderBottomColor: "#4ADE80",
  },
  statBoxConcepts: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderBottomColor: "#60A5FA",
  },
  statIconBadgeXp: {
    marginBottom: 2,
  },
  statIconBadgeAccuracy: {
    marginBottom: 2,
  },
  statIconBadgeConcepts: {
    marginBottom: 2,
  },
  statNumberXp: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "900",
    color: "#B45309",
  },
  statLabelXp: {
    ...typography.labelSm,
    fontSize: 9.5,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.4,
    marginTop: 1,
  },
  statNumberAccuracy: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "900",
    color: "#166534",
  },
  statLabelAccuracy: {
    ...typography.labelSm,
    fontSize: 9.5,
    fontWeight: "800",
    color: "#166534",
    letterSpacing: 0.4,
    marginTop: 1,
  },
  statNumberConcepts: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "900",
    color: "#1E40AF",
  },
  statLabelConcepts: {
    ...typography.labelSm,
    fontSize: 9.5,
    fontWeight: "800",
    color: "#1E40AF",
    letterSpacing: 0.4,
    marginTop: 1,
  },
  taraSection: {
    width: "100%",
    marginTop: spacing.stackMd,
    marginBottom: spacing.stackLg,
    zIndex: 1,
  },
  actionsSection: {
    width: "100%",
    gap: spacing.stackSm,
    zIndex: 1,
  },
  secondaryButtonWrapper: {
    marginTop: 4,
  },
});
