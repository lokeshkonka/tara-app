import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { HotspotElement } from "../../../types/learn";

interface SoilCrossSectionDiagramProps {
  hotspots: HotspotElement[];
  discoveredIds: string[];
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: HotspotElement) => void;
}

export const SoilCrossSectionDiagram: React.FC<SoilCrossSectionDiagramProps> = ({
  hotspots,
  discoveredIds,
  activeHotspotId,
  onSelectHotspot,
}) => {
  return (
    <View style={styles.container}>
      {/* Visual Soil Cross-Section Layers Canvas */}
      <View style={styles.canvasContainer}>
        {/* Layer 1: Surface Grass & Sky */}
        <View style={styles.surfaceLayer}>
          <View style={styles.grassBladeContainer}>
            <MaterialIcons name="grass" size={36} color="#4CAF50" />
            <MaterialIcons name="eco" size={28} color="#2E7D32" style={{ marginLeft: -10 }} />
            <MaterialIcons name="grass" size={32} color="#4CAF50" style={{ marginLeft: -8 }} />
          </View>
          <View style={styles.groundLine} />
        </View>

        {/* Layer 2: Topsoil (Dark & Nutritious) */}
        <View style={styles.topsoilLayer}>
          <View style={styles.organicCluster}>
            <MaterialIcons name="compost" size={22} color="#8D6E63" />
            <MaterialIcons name="grain" size={18} color="#A1887F" />
          </View>
          {/* Animated Root Strands */}
          <View style={styles.rootNetwork}>
            <MaterialIcons name="alt-route" size={54} color="#C8E6C9" style={{ transform: [{ rotate: "180deg" }] }} />
          </View>
        </View>

        {/* Layer 3: Subsoil (Mineral Particles & Air Pockets) */}
        <View style={styles.subsoilLayer}>
          <View style={styles.airDropRow}>
            <MaterialIcons name="air" size={20} color="#81D4FA" />
            <MaterialIcons name="water-drop" size={18} color="#29B6F6" />
            <MaterialIcons name="texture" size={22} color="#8D6E63" />
          </View>
        </View>

        {/* Layer 4: Deep Bedrock & Water Table */}
        <View style={styles.waterTableLayer}>
          <MaterialIcons name="waves" size={24} color="#0288D1" />
          <Text style={styles.layerLabel}>Sub-surface Water Table</Text>
        </View>

        {/* Hotspot Interactive Nodes Overlaid on Diagram */}
        {hotspots.map((spot) => {
          const isDiscovered = discoveredIds.includes(spot.id);
          const isActive = activeHotspotId === spot.id;

          return (
            <TouchableOpacity
              key={spot.id}
              activeOpacity={0.8}
              onPress={() => onSelectHotspot(spot)}
              style={[
                styles.hotspotNode,
                {
                  left: `${spot.xPercent}%`,
                  top: `${spot.yPercent}%`,
                  backgroundColor: spot.color,
                },
                isActive && styles.activeHotspotNode,
                isDiscovered && styles.discoveredHotspotNode,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Discover ${spot.name}`}
            >
              <MaterialIcons
                name={spot.icon as any}
                size={isActive ? 22 : 18}
                color="#FFFFFF"
              />

              {isDiscovered && (
                <View style={styles.checkBadge}>
                  <MaterialIcons name="check" size={10} color="#FFFFFF" />
                </View>
              )}

              <View style={styles.hotspotLabelPill}>
                <Text style={styles.hotspotLabelText}>{spot.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: spacing.stackSm,
  },
  canvasContainer: {
    height: 250,
    width: "100%",
    borderRadius: rounded.xl,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: componentColors.cardBorder,
    backgroundColor: "#3E2723",
  },
  surfaceLayer: {
    height: 48,
    backgroundColor: "#E8F5E9",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.gutter,
  },
  grassBladeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: -4,
  },
  groundLine: {
    height: 6,
    backgroundColor: "#2E7D32",
    width: "100%",
  },
  topsoilLayer: {
    height: 80,
    backgroundColor: "#4E342E",
    padding: spacing.stackSm,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  organicCluster: {
    flexDirection: "row",
    gap: 4,
    opacity: 0.7,
  },
  rootNetwork: {
    alignItems: "center",
    opacity: 0.85,
  },
  subsoilLayer: {
    height: 72,
    backgroundColor: "#3E2723",
    paddingHorizontal: spacing.gutter,
    justifyContent: "center",
  },
  airDropRow: {
    flexDirection: "row",
    gap: 16,
    opacity: 0.6,
  },
  waterTableLayer: {
    height: 50,
    backgroundColor: "#01579B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  layerLabel: {
    ...typography.labelSm,
    color: "#E0F7FA",
    fontWeight: "700",
  },
  hotspotNode: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    transform: [{ translateX: -19 }, { translateY: -19 }],
  },
  activeHotspotNode: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
    transform: [{ translateX: -19 }, { translateY: -19 }, { scale: 1.25 }],
    zIndex: 10,
  },
  discoveredHotspotNode: {
    borderWidth: 1.5,
    borderColor: "#A5D6A7",
  },
  checkBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  hotspotLabelPill: {
    position: "absolute",
    bottom: -18,
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  hotspotLabelText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

