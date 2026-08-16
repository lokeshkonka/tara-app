import { useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons, type MaterialIcons as MaterialIconsType } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Svg, { Polygon } from "react-native-svg";
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

const BADGE_COLORS: Record<string, string> = {
  "soil-guardian": "#66BB6A",
  "water-saver": "#29B6F6",
  "eco-grower": "#9CCC65",
  biodiversity: "#BA68C8",
  pollinator: "#FFA726",
};

const FALLBACK_BADGE_COLOR = "#66BB6A";

const LOCKED_BADGE_ICON = "#A5ADA6";

const BADGE_SIZE = 46;
const BADGE_DEPTH = 4;
const TOP_MARGIN = 4;
const BADGE_HEIGHT = BADGE_SIZE + BADGE_DEPTH + TOP_MARGIN;
const GLOW_MARGIN = 6;
const GLOW_RADIUS_DELTA = 5;

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
}

function HexagonBadge({ badge }: HexagonBadgeProps) {
  const [pressAnim] = useState(() => new Animated.Value(0));

  const handlePressIn = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {
        // ignore on unsupported platforms
      }
    }
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: false,
      tension: 250,
      friction: 16,
    }).start();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BADGE_DEPTH],
  });
  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });

  const isLocked = !badge.unlocked;

  const color = isLocked
    ? LOCKED_BADGE_ICON
    : (BADGE_COLORS[badge.id] ?? FALLBACK_BADGE_COLOR);

  const faceColor = isLocked
    ? componentColors.chipNeutralBackground
    : `${BADGE_COLORS[badge.id] ?? FALLBACK_BADGE_COLOR}2E`;
  const edgeColor = isLocked
    ? componentColors.chipNeutralBorder
    : `${BADGE_COLORS[badge.id] ?? FALLBACK_BADGE_COLOR}59`;
  const strokeColor = isLocked
    ? componentColors.chipNeutralBorder
    : (BADGE_COLORS[badge.id] ?? FALLBACK_BADGE_COLOR);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={`${badge.name} badge${badge.unlocked ? "" : " (locked)"}`}
      style={({ pressed }) => pressed && styles.pressOverlay}
    >
      <Animated.View
        style={{
          transform: [{ translateY }, { scale }],
        }}
      >
        <View style={{ width: BADGE_SIZE, height: BADGE_HEIGHT }}>
          {/* Golden glow behind unlocked badges */}
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
                fill="#CDA721"
                opacity={0.38}
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
              fill={edgeColor}
            />
            {/* Face */}
            <Polygon
              points={hexPoints(BADGE_SIZE, TOP_MARGIN)}
              fill={faceColor}
              stroke={strokeColor}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          </Svg>

          <View style={styles.iconWrap}>
            <MaterialIcons
              name={isLocked ? "help-outline" : (badge.icon as IconName)}
              size={isLocked ? 14 : 20}
              color={color}
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {t("badges.title")}
        </Text>

        <SquishyButton
          onPress={onSeeBadges}
          accessibilityLabel="See all badges"
          faceColor={componentColors.iconButtonBackground}
          borderColor={componentColors.iconButtonBorder}
          borderBottomColor={componentColors.iconButtonBorder}
          size={40}
          width={40}
          paddingHorizontal={0}
        >
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={componentColors.iconButtonIcon}
          />
        </SquishyButton>
      </View>

      <View style={styles.card}>
        <View style={styles.badges}>
          {badges.map((badge) => (
            <HexagonBadge key={badge.id} badge={badge} />
          ))}
        </View>
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

  headerTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "700",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },

  card: {
    width: "100%",
    backgroundColor: componentColors.cardBackground,
    borderRadius: rounded.lg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    paddingVertical: spacing.stackMd,
    paddingHorizontal: spacing.stackMd,
    alignItems: "center",
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
});
