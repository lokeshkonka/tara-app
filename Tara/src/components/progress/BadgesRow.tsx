import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons, type MaterialIcons as MaterialIconsType } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Svg, { Polygon } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import {
  colors,
  componentColors,
  rounded,
  spacing,
  typography,
} from "../../theme/theme";
import { SquishyButton } from "../dashboard/DashboardTopBar";
import type { Badge } from "../../types/progress";
import { useTranslation } from "../../hooks/useTranslation";

type IconName = React.ComponentProps<typeof MaterialIconsType>["name"];

const BADGE_COLORS: Record<string, { main: string; edge: string; face: string; icon: string }> = {
  "soil-guardian": { main: "#16A34A", edge: "#15803D", face: "#DCFCE7", icon: "#15803D" },
  "water-saver": { main: "#0284C7", edge: "#0369A1", face: "#E0F2FE", icon: "#0284C7" },
  "eco-grower": { main: "#84CC16", edge: "#65A30D", face: "#ECFCCB", icon: "#4D7C0F" },
  biodiversity: { main: "#8B5CF6", edge: "#7C3AED", face: "#F3E8FF", icon: "#7C3AED" },
  pollinator: { main: "#F59E0B", edge: "#D97706", face: "#FEF3C7", icon: "#D97706" },
};

const FALLBACK_BADGE_STYLE = {
  main: "#16A34A",
  edge: "#15803D",
  face: "#DCFCE7",
  icon: "#15803D",
};

const LOCKED_BADGE_STYLE = {
  main: "#CBD5E1",
  edge: "#94A3B8",
  face: "#F1F5F9",
  icon: "#94A3B8",
};

const BADGE_SIZE = 48;
const BADGE_DEPTH = 4;
const TOP_MARGIN = 4;
const BADGE_HEIGHT = BADGE_SIZE + BADGE_DEPTH + TOP_MARGIN;
const GLOW_MARGIN = 6;
const GLOW_RADIUS_DELTA = 4;

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

interface HexagonBadgeProps {
  badge: Badge;
  isSelected?: boolean;
  onSelect?: () => void;
  index: number;
}

function HexagonBadge({ badge, isSelected, onSelect, index }: HexagonBadgeProps) {
  const [pressAnim] = useState(() => new Animated.Value(0));
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (badge.unlocked) {
      // Gentle floating stagger for unlocked badges
      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [badge.unlocked, index]);

  const handlePressIn = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {}
    }
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 250,
      friction: 16,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BADGE_DEPTH],
  });

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3],
  });

  const isLocked = !badge.unlocked;
  const style = isLocked
    ? LOCKED_BADGE_STYLE
    : (BADGE_COLORS[badge.id] ?? FALLBACK_BADGE_STYLE);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onSelect}
      accessibilityRole="button"
      accessibilityLabel={`${badge.name} badge${badge.unlocked ? "" : " (locked)"}`}
      style={({ pressed }) => pressed && styles.pressOverlay}
    >
      <Animated.View
        style={{
          transform: [
            { translateY: Animated.add(translateY, floatY) },
            { scale: isSelected ? 1.08 : 1 },
          ],
        }}
      >
        <View style={{ width: BADGE_SIZE, height: BADGE_HEIGHT }}>
          {/* Subtle Glow behind unlocked badges */}
          {!isLocked && (
            <Svg
              style={StyleSheet.absoluteFill}
              width={BADGE_SIZE}
              height={BADGE_HEIGHT}
              viewBox={`-${GLOW_MARGIN} -${GLOW_MARGIN} ${
                BADGE_SIZE + GLOW_MARGIN * 2
              } ${BADGE_HEIGHT + GLOW_MARGIN * 2}`}
            >
              <Polygon
                points={hexPoints(BADGE_SIZE, TOP_MARGIN, GLOW_RADIUS_DELTA)}
                fill={style.main}
                opacity={0.3}
              />
            </Svg>
          )}

          <Svg
            width={BADGE_SIZE}
            height={BADGE_HEIGHT}
            viewBox={`0 0 ${BADGE_SIZE} ${BADGE_HEIGHT}`}
          >
            {/* 3D bottom edge */}
            <Polygon
              points={hexPoints(BADGE_SIZE, TOP_MARGIN + BADGE_DEPTH)}
              fill={style.edge}
            />
            {/* Face */}
            <Polygon
              points={hexPoints(BADGE_SIZE, TOP_MARGIN)}
              fill={style.face}
              stroke={style.main}
              strokeWidth={isSelected ? 3 : 2}
              strokeLinejoin="round"
            />
          </Svg>

          <View style={styles.iconWrap}>
            <MaterialIcons
              name={isLocked ? "lock-outline" : (badge.icon as IconName)}
              size={isLocked ? 18 : 22}
              color={style.icon}
            />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

interface BadgesRowProps {
  badges: Badge[];
  onSeeBadges?: () => void;
}

export function BadgesRow({ badges, onSeeBadges }: BadgesRowProps) {
  const { t } = useTranslation();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
            {t("badges.title")}
          </Text>
          <View style={styles.counterChip}>
            <MaterialIcons name="emoji-events" size={13} color="#D97706" />
            <Text style={styles.counterText}>
              {unlockedCount}/{badges.length}
            </Text>
          </View>
        </View>

        <SquishyButton
          onPress={onSeeBadges}
          accessibilityLabel="See all badges"
          faceColor={componentColors.iconButtonBackground}
          borderColor={componentColors.iconButtonBorder}
          borderBottomColor={componentColors.iconButtonBorder}
          size={38}
          width={38}
          paddingHorizontal={0}
        >
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={componentColors.iconButtonIcon}
          />
        </SquishyButton>
      </View>

      <View style={styles.card}>
        <LinearGradient
          colors={["#FFFFFF", "#F9FBF8"]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.badges}>
          {badges.map((badge, index) => (
            <HexagonBadge
              key={badge.id}
              badge={badge}
              index={index}
              isSelected={selectedBadge?.id === badge.id}
              onSelect={() => {
                setSelectedBadge(selectedBadge?.id === badge.id ? null : badge);
              }}
            />
          ))}
        </View>

        {/* Interactive Badge Info Hint */}
        {selectedBadge ? (
          <View style={styles.badgeInfoPill}>
            <MaterialIcons
              name={selectedBadge.unlocked ? "check-circle" : "lock"}
              size={13}
              color={selectedBadge.unlocked ? "#16A34A" : "#64748B"}
            />
            <Text style={styles.badgeInfoText}>
              {selectedBadge.name} • {selectedBadge.unlocked ? "Unlocked" : "Locked"}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.unit,
    paddingBottom: spacing.stackSm,
  },

  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },

  counterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: rounded.full,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    gap: 3,
  },

  counterText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#B45309",
  },

  card: {
    width: "100%",
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3.5,
    borderBottomColor: componentColors.cardEdge,
    paddingVertical: spacing.stackMd,
    paddingHorizontal: spacing.stackMd,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  badges: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: spacing.unit,
    paddingBottom: spacing.unit,
  },

  iconWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: BADGE_SIZE,
    height: BADGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  pressOverlay: {
    opacity: 0.92,
  },

  badgeInfoPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: rounded.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
    gap: 4,
  },

  badgeInfoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },
});
