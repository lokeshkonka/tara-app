import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, type MaterialIcons as MaterialIconsType } from "@expo/vector-icons";
import {
  colors,
  componentColors,
  rounded,
  spacing,
  typography,
} from "../../theme/theme";
import { SquishyButton } from "../dashboard/DashboardTopBar";
import type { ProgressMetric } from "../../types/progress";
import { useTranslation } from "../../hooks/useTranslation";

type IconName = React.ComponentProps<typeof MaterialIconsType>["name"];

interface MetricIconStyle {
  icon: IconName;
  color: string;
}

const METRIC_ICONS: Record<string, MetricIconStyle> = {
  "soil-health": { icon: "terrain", color: "#8D6E63" },
  "water-saving": { icon: "water-drop", color: "#0288D1" },
  biodiversity: { icon: "eco", color: "#43A047" },
};

const FALLBACK_ICON: MetricIconStyle = {
  icon: "spa",
  color: colors.primary,
};

interface ImpactMetricsProps {
  metrics: ProgressMetric[];
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      {metrics.map((metric) => {
        const style = METRIC_ICONS[metric.id] ?? FALLBACK_ICON;

        const percentage =
          metric.percentage ??
          (metric.maxValue && metric.maxValue > 0
            ? Math.min(100, Math.round((metric.value / metric.maxValue) * 100))
            : 0);

        return (
          <View key={metric.id} style={styles.tile}>
            {/* 3D icon button (streak-style, pressable feel) */}
            <SquishyButton
              faceColor={`${style.color}1F`}
              borderColor={`${style.color}4D`}
              borderBottomColor={`${style.color}4D`}
              size={38}
              width={38}
              borderRadius={rounded.full}
              paddingHorizontal={0}
            >
              <MaterialIcons
                name={style.icon}
                size={18}
                color={style.color}
              />
            </SquishyButton>

            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {t(metric.title)}
            </Text>

            <View style={styles.track}>
              <View style={[styles.fill, { width: `${percentage}%` }]} />
            </View>

            <Text style={styles.value} numberOfLines={1}>
              {metric.value}
              {metric.unit ? <Text style={styles.unit}>{t(metric.unit)}</Text> : null}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.stackSm,
    width: "100%",
  },

  tile: {
    flex: 1,
    backgroundColor: componentColors.cardBackground,
    borderRadius: rounded.md,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 3,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackSm,
    paddingTop: spacing.stackMd,
    alignItems: "center",
  },

  title: {
    ...typography.labelSm,
    color: componentColors.sectionTitle,
    textAlign: "center",
    marginTop: spacing.stackSm,
  },

  track: {
    marginTop: 10,
    height: 6,
    width: "100%",
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainer,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    borderWidth: 1.5,
    borderColor: "#8BD48F",
    borderBottomWidth: 2,
    borderBottomColor: "#2E7D32",
  },

  value: {
    ...typography.labelLg,
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.stackSm,
  },

  unit: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.outline,
  },
});
