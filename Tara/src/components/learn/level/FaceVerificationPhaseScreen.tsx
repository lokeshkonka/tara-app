import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { TaraMessageCard } from "../../tara-messages/TaraMessageCard";
import { TactileButton } from "../../ui/TactileButton";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";
import type { FaceVerificationPhase } from "../../../types/learn";

interface FaceVerificationPhaseScreenProps {
  phase: FaceVerificationPhase;
  onCompletePhase: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

type ScanStatus = "requesting" | "aligning" | "verifying" | "verified";

export const FaceVerificationPhaseScreen: React.FC<FaceVerificationPhaseScreenProps> = ({
  phase,
  onCompletePhase,
  onScroll,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanStatus, setScanStatus] = useState<ScanStatus>("aligning");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);

  // Biometric Scan Animations
  const scanBarAnim = useRef(new Animated.Value(0)).current;
  const pulseRingAnim = useRef(new Animated.Value(1)).current;
  const verifyCheckAnim = useRef(new Animated.Value(0)).current;

  // Pulse animation loop
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseRingAnim, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseRingAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // Laser bar scan animation
    const scanLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanBarAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scanBarAnim, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    scanLoop.start();

    return () => {
      pulseLoop.stop();
      scanLoop.stop();
    };
  }, [pulseRingAnim, scanBarAnim]);

  // Automated presence check simulation once camera is active
  useEffect(() => {
    if (permission?.granted) {
      setScanStatus("aligning");

      const t1 = setTimeout(() => {
        setScanStatus("verifying");
        if (Platform.OS !== "web") {
          try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } catch {}
        }
      }, 1200);

      const t2 = setTimeout(() => {
        setScanStatus("verified");
        if (Platform.OS !== "web") {
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch {}
        }
        Animated.spring(verifyCheckAnim, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }).start();
      }, 2400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [permission?.granted, verifyCheckAnim]);

  const handleStartInterview = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}
    }
    onCompletePhase();
  };

  const handleSkipCamera = () => {
    setScanStatus("verified");
    setIsCameraActive(false);
  };

  const isVerified = scanStatus === "verified";

  const taraDialogue = isVerified
    ? phase.taraSuccessDialogue ||
      "Camera & microphone verified! You are ready to start the live AI oral assessment."
    : phase.taraDialogue ||
      "Please center your face inside the camera view so we can verify your presence for the certification.";

  const scanTranslateY = scanBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-110, 110],
  });

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* Verification Status Header Pill */}
        <View style={styles.headerPillRow}>
          <View
            style={[
              styles.statusPill,
              isVerified ? styles.statusPillVerified : styles.statusPillScanning,
            ]}
          >
            <MaterialIcons
              name={isVerified ? "verified-user" : "camera-front"}
              size={15}
              color={isVerified ? "#15803D" : "#B45309"}
            />
            <Text
              style={[
                styles.statusPillText,
                isVerified ? styles.statusTextVerified : styles.statusTextScanning,
              ]}
            >
              {isVerified
                ? "PRESENCE VERIFIED"
                : scanStatus === "verifying"
                ? "CHECKING LIGHTING..."
                : "CAMERA SCANNING"}
            </Text>
          </View>
        </View>

        {/* Tara Mentor Introduction */}
        <View style={styles.taraWrapper}>
          <TaraMessageCard
            title={phase.title || "Oral Interview Verification"}
            expression={isVerified ? "happy" : "thinking"}
            message={taraDialogue}
            showVoiceControl={true}
          />
        </View>

        {/* Live Selfie Camera / Biometric Scan Frame */}
        {permission?.granted && isCameraActive ? (
          <View style={styles.cameraContainer}>
            <Animated.View
              style={[
                styles.cameraWrapper,
                isVerified && styles.cameraWrapperVerified,
                { transform: [{ scale: pulseRingAnim }] },
              ]}
            >
              <CameraView
                style={styles.cameraView}
                facing="front"
                active={true}
              >
                {/* Biometric HUD Overlay */}
                <View style={styles.hudOverlay}>
                  {/* Corner Brackets */}
                  <View style={[styles.cornerBracket, styles.cornerTopLeft]} />
                  <View style={[styles.cornerBracket, styles.cornerTopRight]} />
                  <View style={[styles.cornerBracket, styles.cornerBottomLeft]} />
                  <View style={[styles.cornerBracket, styles.cornerBottomRight]} />

                  {/* Face Oval Alignment Guide */}
                  <View
                    style={[
                      styles.faceOvalGuide,
                      isVerified && styles.faceOvalVerified,
                    ]}
                  />

                  {/* Scanning Laser Line */}
                  {!isVerified && (
                    <Animated.View
                      style={[
                        styles.laserLine,
                        { transform: [{ translateY: scanTranslateY }] },
                      ]}
                    />
                  )}

                  {/* Success Check Badge Overlay */}
                  {isVerified && (
                    <Animated.View
                      style={[
                        styles.verifiedBadgeCircle,
                        { transform: [{ scale: verifyCheckAnim }] },
                      ]}
                    >
                      <MaterialIcons name="check" size={32} color="#FFFFFF" />
                    </Animated.View>
                  )}
                </View>
              </CameraView>
            </Animated.View>

            <Text style={styles.cameraNudgeText}>
              {isVerified
                ? "Face aligned & audio ready"
                : "Keep your face visible and illuminated"}
            </Text>
          </View>
        ) : (
          /* Camera Permission Request or Audio-Only Fallback Card */
          <View style={styles.permissionCard}>
            <View style={styles.permissionIconCircle}>
              <MaterialIcons name="videocam" size={36} color={colors.primary} />
            </View>

            <Text style={styles.permissionTitle}>Enable Front Camera</Text>
            <Text style={styles.permissionDesc}>
              To verify identity and simulate a real viva-voce oral assessment with Tara, please grant camera access.
            </Text>

            <TactileButton
              title="Grant Camera Access"
              icon="camera-alt"
              iconPosition="left"
              faceColor={colors.primaryContainer}
              depthColor={colors.onPrimaryFixedVariant}
              textColor="#FFFFFF"
              height={48}
              depth={4}
              borderRadius={rounded.full}
              onPress={requestPermission}
            />

            <TouchableOpacity
              onPress={handleSkipCamera}
              style={styles.skipButton}
              activeOpacity={0.7}
            >
              <Text style={styles.skipButtonText}>Continue with Audio-Only</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Pinned Bottom CTA Bar */}
      <View style={styles.fixedBottomContainer}>
        <TactileButton
          title={isVerified ? "Start AI Oral Interview" : "Verifying Readiness..."}
          icon="mic"
          iconPosition="right"
          faceColor={isVerified ? colors.primaryContainer : "#E2E8F0"}
          depthColor={isVerified ? colors.onPrimaryFixedVariant : "#CBD5E1"}
          textColor={isVerified ? "#FFFFFF" : "#94A3B8"}
          height={54}
          depth={4}
          borderRadius={rounded.full}
          disabled={!isVerified}
          onPress={handleStartInterview}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackSm,
    paddingBottom: 110,
  },
  headerPillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.stackSm,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
  },
  statusPillScanning: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  statusPillVerified: {
    backgroundColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  statusPillText: {
    ...typography.labelSm,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  statusTextScanning: {
    color: "#B45309",
  },
  statusTextVerified: {
    color: "#15803D",
  },
  taraWrapper: {
    marginBottom: spacing.stackMd,
  },
  cameraContainer: {
    alignItems: "center",
    gap: 12,
    marginVertical: spacing.stackSm,
  },
  cameraWrapper: {
    width: 240,
    height: 240,
    borderRadius: 120,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#F59E0B",
    backgroundColor: "#000000",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cameraWrapperVerified: {
    borderColor: "#16A34A",
  },
  cameraView: {
    width: "100%",
    height: "100%",
  },
  hudOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  faceOvalGuide: {
    width: 170,
    height: 200,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "rgba(245, 158, 11, 0.7)",
    borderStyle: "dashed",
  },
  faceOvalVerified: {
    borderColor: "rgba(34, 197, 94, 0.9)",
    borderStyle: "solid",
  },
  laserLine: {
    position: "absolute",
    width: 200,
    height: 2.5,
    backgroundColor: "#EF4444",
    borderRadius: 1,
  },
  verifiedBadgeCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  cornerBracket: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#FFFFFF",
  },
  cornerTopLeft: {
    top: 25,
    left: 25,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTopRight: {
    top: 25,
    right: 25,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 25,
    left: 25,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBottomRight: {
    bottom: 25,
    right: 25,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  cameraNudgeText: {
    ...typography.labelSm,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
  permissionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.stackLg,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    alignItems: "center",
    gap: 12,
    marginVertical: spacing.stackSm,
  },
  permissionIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#DCFCE7",
  },
  permissionTitle: {
    ...typography.headlineMd,
    fontSize: 17,
    fontWeight: "800",
    color: colors.onSurface,
  },
  permissionDesc: {
    ...typography.bodyMd,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 18,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipButtonText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  fixedBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
});
