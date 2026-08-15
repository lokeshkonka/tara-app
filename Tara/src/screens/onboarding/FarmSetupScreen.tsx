import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { SelectionCard } from "../../components/ui/SelectionCard";
import { TactileButton } from "../../components/ui/TactileButton";
import { LOCATIONS_DATA } from "../../data/dummy/locationsData";
import { useOnboarding } from "../../hooks/useOnboarding";
import { colors, rounded, spacing, typography } from "../../theme/theme";

interface FarmSetupScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function FarmSetupScreen({ onComplete, onBack }: FarmSetupScreenProps) {
  const { crops, state, saveFarmDetails } = useOnboarding();
  const [selectedCrops, setSelectedCrops] = useState<string[]>(state.selectedCrops || ["banana"]);
  const [farmSize, setFarmSize] = useState<number>(state.farmSizeAcres || 2.5);
  const [selectedState, setSelectedState] = useState<string>(state.locationState || "Kerala");
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    state.locationDistrict || "Wayanad"
  );

  const toggleCrop = (cropId: string) => {
    if (selectedCrops.includes(cropId)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter((c) => c !== cropId));
      }
    } else {
      setSelectedCrops([...selectedCrops, cropId]);
    }
  };

  const handleFinish = async () => {
    await saveFarmDetails(selectedCrops, farmSize, selectedState, selectedDistrict);
    onComplete();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Text style={styles.title}>Tell Tara About Your Farm</Text>
            <Text style={styles.subtitle}>
              This enables customized natural crop protection, seasonal advisory, and soil recommendations.
            </Text>
          </View>

          {/* Farm Size Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Farm Size</Text>
            <View style={styles.sizeRow}>
              {[1.0, 2.5, 5.0, 10.0].map((size) => (
                <Pressable
                  key={size}
                  onPress={() => setFarmSize(size)}
                  style={[
                    styles.sizePill,
                    farmSize === size && styles.sizePillSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      farmSize === size && styles.sizeTextSelected,
                    ]}
                  >
                    {size} Acres
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Location State & District Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.locationsRow}
            >
              {LOCATIONS_DATA.map((loc) => (
                <Pressable
                  key={loc.state}
                  onPress={() => {
                    setSelectedState(loc.state);
                    setSelectedDistrict(loc.districts[0]);
                  }}
                  style={[
                    styles.locationPill,
                    selectedState === loc.state && styles.locationPillSelected,
                  ]}
                >
                  <MaterialIcons
                    name="location-on"
                    size={16}
                    color={
                      selectedState === loc.state
                        ? colors.primaryContainer
                        : colors.outline
                    }
                  />
                  <Text
                    style={[
                      styles.locationText,
                      selectedState === loc.state && styles.locationTextSelected,
                    ]}
                  >
                    {loc.state}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Select Crops */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Primary Crops (Select all that apply)</Text>
            {crops.map((crop) => {
              const isSelected = selectedCrops.includes(crop.id);
              return (
                <SelectionCard
                  key={crop.id}
                  title={crop.name}
                  subtitle={crop.category}
                  icon="eco"
                  selected={isSelected}
                  onPress={() => toggleCrop(crop.id)}
                />
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TactileButton
            title="Complete Setup & Enter Farm"
            icon="check-circle"
            variant="primary"
            onPress={handleFinish}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: spacing.marginMobile,
  },
  scroll: {
    paddingVertical: spacing.stackLg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.stackLg,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.primary,
    textAlign: "center",
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 6,
  },
  section: {
    marginBottom: spacing.stackLg,
  },
  sectionTitle: {
    ...typography.labelLg,
    fontSize: 16,
    color: colors.onSurface,
    marginBottom: 10,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 8,
  },
  sizePill: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: rounded.md,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  sizePillSelected: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.primaryContainer,
    borderWidth: 2,
  },
  sizeText: {
    ...typography.labelSm,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  sizeTextSelected: {
    color: colors.primary,
  },
  locationsRow: {
    gap: 8,
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    gap: 4,
  },
  locationPillSelected: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.primaryContainer,
    borderWidth: 2,
  },
  locationText: {
    ...typography.labelSm,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
  },
  locationTextSelected: {
    color: colors.primary,
  },
  footer: {
    paddingVertical: spacing.stackLg,
  },
});
