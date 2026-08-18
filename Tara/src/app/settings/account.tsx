import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../components/ui/TactileButton";
import { useSettings } from "../../context/SettingsContext";
import { colors, rounded, spacing, typography } from "../../theme/theme";

const AVAILABLE_CROPS = [
  "Tomato",
  "Okra",
  "Paddy",
  "Cotton",
  "Wheat",
  "Sugarcane",
  "Chilli",
  "Maize",
  "Mustard",
  "Groundnut",
  "Marigold",
];

export default function AccountSettingsScreen() {
  const { accountProfile, updateAccountProfile } = useSettings();

  const [fullName, setFullName] = useState(accountProfile.fullName);
  const [email, setEmail] = useState(accountProfile.email);
  const [phone, setPhone] = useState(accountProfile.phone);
  const [farmLocation, setFarmLocation] = useState(accountProfile.farmLocation);
  const [villagePanchayat, setVillagePanchayat] = useState(
    accountProfile.villagePanchayat
  );
  const [farmSize, setFarmSize] = useState(
    accountProfile.farmSizeAcres.toString()
  );
  const [selectedCrops, setSelectedCrops] = useState<string[]>(
    accountProfile.primaryCrops
  );

  const toggleCrop = (crop: string) => {
    setSelectedCrops((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
    );
  };

  const handleSave = () => {
    updateAccountProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      farmLocation: farmLocation.trim(),
      villagePanchayat: villagePanchayat.trim(),
      farmSizeAcres: parseFloat(farmSize) || 3.5,
      primaryCrops: selectedCrops,
    });

    Alert.alert(
      "Profile Updated",
      "Your farm details and account profile have been successfully saved!",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Account & Farm</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>
                {fullName ? fullName.charAt(0) : "R"}
              </Text>
            </View>
            <View style={styles.cameraIconBtn}>
              <MaterialIcons name="photo-camera" size={16} color={colors.white} />
            </View>
          </View>
          <Text style={styles.avatarHint}>Tap to change farmer photo</Text>
        </View>

        {/* Farmer Details Form */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color={colors.outlineVariant} />
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your name"
                placeholderTextColor={colors.outlineVariant}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="phone" size={20} color={colors.outlineVariant} />
              <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="+91 Phone"
                placeholderTextColor={colors.outlineVariant}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail" size={20} color={colors.outlineVariant} />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="email@domain.com"
                placeholderTextColor={colors.outlineVariant}
              />
            </View>
          </View>
        </View>

        {/* Farm & Land Details Form */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Farm & Land Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Farm Location</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="location-on" size={20} color={colors.outlineVariant} />
              <TextInput
                style={styles.textInput}
                value={farmLocation}
                onChangeText={setFarmLocation}
                placeholder="Village / District, State"
                placeholderTextColor={colors.outlineVariant}
              />
              <Pressable
                onPress={() => setFarmLocation("Kalyan Rural, Maharashtra")}
              >
                <MaterialIcons name="my-location" size={20} color={colors.primary} />
              </Pressable>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Village Panchayat</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="holiday-village" size={20} color={colors.outlineVariant} />
              <TextInput
                style={styles.textInput}
                value={villagePanchayat}
                onChangeText={setVillagePanchayat}
                placeholder="Panchayat Name"
                placeholderTextColor={colors.outlineVariant}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Total Farm Size (Acres)</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="square-foot" size={20} color={colors.outlineVariant} />
              <TextInput
                style={styles.textInput}
                value={farmSize}
                onChangeText={setFarmSize}
                keyboardType="decimal-pad"
                placeholder="e.g. 3.5"
                placeholderTextColor={colors.outlineVariant}
              />
            </View>
          </View>

          {/* Primary Crops Selection */}
          <View style={styles.cropsGroup}>
            <Text style={styles.inputLabel}>Primary Crops Grown</Text>
            <View style={styles.cropsChipRow}>
              {AVAILABLE_CROPS.map((crop) => {
                const isSelected = selectedCrops.includes(crop);
                return (
                  <Pressable
                    key={crop}
                    style={[
                      styles.cropChip,
                      isSelected && styles.cropChipActive,
                    ]}
                    onPress={() => toggleCrop(crop)}
                  >
                    <Text
                      style={[
                        styles.cropChipText,
                        isSelected && styles.cropChipTextActive,
                      ]}
                    >
                      {crop}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TactileButton
          title="Save Changes"
          icon="save"
          variant="primary"
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(190, 202, 185, 0.3)",
  },
  backBtn: {
    padding: 6,
    borderRadius: rounded.full,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  scrollContainer: {
    padding: spacing.md,
    paddingBottom: 40,
    gap: spacing.lg,
  },
  avatarSection: {
    alignItems: "center",
    gap: 6,
    paddingTop: spacing.xs,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.outlineVariant,
  },
  avatarLetter: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary,
  },
  cameraIconBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: rounded.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatarHint: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  formSection: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.md,
  },
  formSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    color: colors.onSurface,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.xs,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.onSurface,
  },
  cropsGroup: {
    gap: 6,
  },
  cropsChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  cropChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  cropChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cropChipText: {
    fontSize: 12,
    color: colors.onSurface,
    fontWeight: "600",
  },
  cropChipTextActive: {
    color: colors.white,
  },
});
