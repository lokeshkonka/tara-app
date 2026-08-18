import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Polygon } from "react-native-svg";
import { colors, componentColors, rounded, spacing, typography } from "../../theme/theme";
import { useTranslation } from "../../hooks/useTranslation";
import type { CategoryProgressCob } from "../../types/practice";

export interface CategoryCobwebGraphProps {
  categories: CategoryProgressCob[];
  graphSize?: number;
}

/**
 * Category Progress COB (Cobweb/Radar) Graph Component.
 * Visualizes farmer proficiency across 6 sustainable agriculture categories.
 */
export function CategoryCobwebGraph({
  categories,
  graphSize = 290,
}: CategoryCobwebGraphProps) {
  const { t } = useTranslation();

  const center = graphSize / 2;
  const maxRadius = graphSize / 2 - 45; // Leave padding for vertex labels
  const totalAxes = categories.length;

  if (totalAxes === 0) return null;

  // Calculate vertex coordinates for a given radius
  const getVertexPoints = (radius: number) => {
    return categories.map((_, index) => {
      const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, angle };
    });
  };

  // 5 Concentric web grid rings (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPolygons = gridLevels.map((level) => {
    const points = getVertexPoints(maxRadius * level);
    return points.map((p) => `${p.x},${p.y}`).join(" ");
  });

  // Outer 100% axis vertices for radial spokes
  const outerPoints = getVertexPoints(maxRadius);

  // User Progress Polygon points
  const userProgressPoints = categories.map((cat, index) => {
    const fraction = Math.max(0.1, Math.min(1.0, cat.progressPercentage / 100));
    const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
    const x = center + maxRadius * fraction * Math.cos(angle);
    const y = center + maxRadius * fraction * Math.sin(angle);
    return { x, y, percentage: cat.progressPercentage };
  });

  const userPolygonString = userProgressPoints
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Your Progress</Text>
        <Text style={styles.cardSubtitle}>Mastery across farming modules</Text>
      </View>

      <View style={[styles.graphWrapper, { height: graphSize }]}>
        <Svg width={graphSize} height={graphSize} viewBox={`0 0 ${graphSize} ${graphSize}`}>
          {/* --- CONCENTRIC COBWEB GRID RINGS --- */}
          {gridPolygons.map((pointsString, idx) => (
            <Polygon
              key={`grid-${idx}`}
              points={pointsString}
              fill={idx === gridPolygons.length - 1 ? "rgba(240, 247, 240, 0.4)" : "none"}
              stroke="#D2DCD0"
              strokeWidth={idx === gridPolygons.length - 1 ? "1.5" : "1"}
              strokeDasharray={idx === gridPolygons.length - 1 ? "none" : "3 3"}
            />
          ))}

          {/* --- RADIAL AXIS SPOKES --- */}
          {outerPoints.map((pt, idx) => (
            <Line
              key={`spoke-${idx}`}
              x1={center}
              y1={center}
              x2={pt.x}
              y2={pt.y}
              stroke="#CBD5C9"
              strokeWidth="1.2"
            />
          ))}

          {/* --- USER PROGRESS FILLED POLYGON --- */}
          <Polygon
            points={userPolygonString}
            fill="rgba(76, 175, 80, 0.32)"
            stroke="#2E7D32"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* --- GLOWING VERTEX NODES --- */}
          {userProgressPoints.map((pt, idx) => (
            <React.Fragment key={`node-${idx}`}>
              <Circle
                cx={pt.x}
                cy={pt.y}
                r="6"
                fill="#4CAF50"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </React.Fragment>
          ))}
        </Svg>

        {/* --- VERTEX CATEGORY BADGES AROUND GRAPH --- */}
        {outerPoints.map((pt, idx) => {
          const category = categories[idx];
          const categoryLabel = t(category.categoryKey);
          
          // Positioning offset for labels
          const isLeft = pt.x < center - 10;
          const isRight = pt.x > center + 10;
          const isTop = pt.y < center - 10;
          const isBottom = pt.y > center + 10;

          return (
            <View
              key={`label-${category.categoryId}`}
              style={[
                styles.vertexBadgeContainer,
                {
                  left: pt.x - 45,
                  top: pt.y - 14,
                },
              ]}
            >
              <View style={styles.vertexBadge}>
                <Text style={styles.vertexBadgeText} numberOfLines={1}>
                  {categoryLabel}
                </Text>
                <View style={styles.percentPill}>
                  <Text style={styles.percentPillText}>{category.progressPercentage}%</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 4,
    borderBottomColor: componentColors.cardEdge,
    padding: spacing.stackMd,
    gap: spacing.stackSm,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    gap: 2,
  },
  cardTitle: {
    ...typography.headlineMd,
    fontSize: 18,
    fontWeight: "800",
    color: componentColors.sectionTitle,
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    ...typography.bodyMd,
    fontSize: 12.5,
    color: colors.onSurfaceVariant,
    fontWeight: "500",
  },
  graphWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 4,
  },
  vertexBadgeContainer: {
    position: "absolute",
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  vertexBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: "#A8DEAC",
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  vertexBadgeText: {
    ...typography.labelSm,
    fontSize: 10,
    fontWeight: "800",
    color: "#1B5E20",
    maxWidth: 50,
  },
  percentPill: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  percentPillText: {
    ...typography.labelSm,
    fontSize: 9.5,
    fontWeight: "800",
    color: "#2E7D32",
  },
});
