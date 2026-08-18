import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
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

export default function SecuritySettingsScreen() {
  const { security, updateSecurity, logoutDevice } = useSettings();
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSavePin = () => {
    if (newPin.length !== 4) {
      Alert.alert("Invalid PIN", "Please enter a 4-digit security PIN.");
      return;
    }
    if (newPin !== confirmPin) {
      Alert.alert("Mismatch", "Confirmation PIN does not match.");
      return;
    }

    updateSecurity({ pinEnabled: true, pinCode: newPin });
    setPinModalVisible(false);
    setNewPin("");
    setConfirmPin("");
    Alert.alert("PIN Updated", "Your 4-digit security PIN has been set successfully.");
  };

  const handleDeviceLogout = (deviceId: string, deviceName: string) => {
    Alert.alert(
      "Log Out Device",
      `Are you sure you want to remotely log out ${deviceName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => logoutDevice(deviceId),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Security & Privacy</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Authentication Card */}
        <Text style={styles.sectionTitle}>Authentication & Lock</Text>
        <View style={styles.cardContainer}>
          {/* PIN Lock */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>4-Digit App PIN Lock</Text>
              <Text style={styles.toggleSub}>
                Protect your farm records and certificates with a secure PIN.
              </Text>
            </View>
            <Switch
              value={security.pinEnabled}
              onValueChange={(val) => {
                if (val) {
                  setPinModalVisible(true);
                } else {
                  updateSecurity({ pinEnabled: false });
                }
              }}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          {security.pinEnabled && (
            <Pressable
              style={styles.changePinBtn}
              onPress={() => setPinModalVisible(true)}
            >
              <MaterialIcons name="lock-reset" size={18} color={colors.primary} />
              <Text style={styles.changePinText}>Change 4-Digit PIN</Text>
            </Pressable>
          )}

          <View style={styles.divider} />

          {/* Biometrics */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>FaceID / Fingerprint Login</Text>
              <Text style={styles.toggleSub}>
                Quick biometric authentication on app launch.
              </Text>
            </View>
            <Switch
              value={security.biometricsEnabled}
              onValueChange={(val) =>
                updateSecurity({ biometricsEnabled: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          {/* 2FA */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Two-Factor Authentication (2FA)</Text>
              <Text style={styles.toggleSub}>
                Require an SMS verification code for logins on new devices.
              </Text>
            </View>
            <Switch
              value={security.twoFactorEnabled}
              onValueChange={(val) =>
                updateSecurity({ twoFactorEnabled: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Logged-In Devices */}
        <Text style={styles.sectionTitle}>Active Logged-in Devices</Text>
        <View style={styles.cardContainer}>
          {security.activeDevices.map((device, idx) => {
            const isLast = idx === security.activeDevices.length - 1;
            return (
              <View key={device.id}>
                <View style={styles.deviceRow}>
                  <View style={styles.deviceIconWrap}>
                    <MaterialIcons
                      name={
                        device.type === "mobile"
                          ? "smartphone"
                          : device.type === "tablet"
                          ? "tablet"
                          : "computer"
                      }
                      size={22}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.deviceInfo}>
                    <View style={styles.deviceNameRow}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      {device.isCurrent && (
                        <View style={styles.currentBadge}>
                          <Text style={styles.currentBadgeText}>
                            Current Device
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.deviceMeta}>
                      {device.location} • {device.lastActive}
                    </Text>
                  </View>

                  {!device.isCurrent && (
                    <Pressable
                      style={styles.logoutDeviceBtn}
                      onPress={() =>
                        handleDeviceLogout(device.id, device.name)
                      }
                    >
                      <MaterialIcons name="logout" size={18} color={colors.error} />
                    </Pressable>
                  )}
                </View>
                {!isLast && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

        {/* Privacy Preferences */}
        <Text style={styles.sectionTitle}>Privacy & Leaderboard Visibility</Text>
        <View style={styles.cardContainer}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Display Name on Leaderboard</Text>
              <Text style={styles.toggleSub}>
                Allow fellow farmers in your Panchayat to see your rankings and badges.
              </Text>
            </View>
            <Switch
              value={security.showNameOnLeaderboard}
              onValueChange={(val) =>
                updateSecurity({ showNameOnLeaderboard: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Share Anonymous Eco Impact</Text>
              <Text style={styles.toggleSub}>
                Help aggregate collective Panchayat water and carbon offset metrics.
              </Text>
            </View>
            <Switch
              value={security.shareAnonymousImpact}
              onValueChange={(val) =>
                updateSecurity({ shareAnonymousImpact: val })
              }
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
          </View>
        </View>
      </ScrollView>

      {/* Set PIN Modal */}
      <Modal
        visible={pinModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPinModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setPinModalVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Set 4-Digit Security PIN</Text>
              <Pressable onPress={() => setPinModalVisible(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter 4-Digit PIN</Text>
              <TextInput
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                placeholder="••••"
                placeholderTextColor={colors.outlineVariant}
                value={newPin}
                onChangeText={setNewPin}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm 4-Digit PIN</Text>
              <TextInput
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                placeholder="••••"
                placeholderTextColor={colors.outlineVariant}
                value={confirmPin}
                onChangeText={setConfirmPin}
              />
            </View>

            <TactileButton
              title="Save Security PIN"
              icon="lock"
              variant="primary"
              onPress={handleSavePin}
            />
          </Pressable>
        </Pressable>
      </Modal>
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
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginTop: spacing.xs,
  },
  cardContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  toggleTextWrap: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
  },
  toggleSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  changePinBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
  },
  changePinText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(190, 202, 185, 0.3)",
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  deviceIconWrap: {
    width: 38,
    height: 38,
    borderRadius: rounded.lg,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  deviceInfo: {
    flex: 1,
  },
  deviceNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
  },
  currentBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: rounded.full,
    backgroundColor: "rgba(0, 110, 28, 0.08)",
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
  deviceMeta: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  logoutDeviceBtn: {
    padding: 8,
    borderRadius: rounded.full,
    backgroundColor: "rgba(186, 26, 26, 0.08)",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: rounded.xxl,
    borderTopRightRadius: rounded.xxl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetTitle: {
    fontSize: 18,
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
  pinInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 8,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
});
