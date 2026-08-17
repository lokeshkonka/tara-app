import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TactileButton } from "../../ui/TactileButton";
import { colors, componentColors, rounded, spacing, typography } from "../../../theme/theme";

export interface LevelExitModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirmExit: () => void;
}

export const LevelExitModal: React.FC<LevelExitModalProps> = ({
  visible,
  onCancel,
  onConfirmExit,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              {/* Alert Icon Badge */}
              <View style={styles.iconCircle}>
                <MaterialIcons name="warning-amber" size={32} color="#D97706" />
              </View>

              {/* Title & Body */}
              <Text style={styles.title}>Leave Level?</Text>
              <Text style={styles.body}>
                Your progress in this step won't be saved if you leave now. Are you sure you want to exit?
              </Text>

              {/* Action Buttons */}
              <View style={styles.buttonGroup}>
                <TactileButton
                  title="Keep Learning"
                  faceColor={colors.primaryContainer}
                  depthColor={colors.onPrimaryFixedVariant}
                  textColor="#FFFFFF"
                  height={48}
                  depth={4}
                  borderRadius={rounded.full}
                  onPress={onCancel}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onConfirmExit}
                  style={styles.exitTextButton}
                >
                  <Text style={styles.exitButtonText}>Quit Step</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.gutter,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    borderWidth: 1.5,
    borderColor: componentColors.cardBorder,
    borderBottomWidth: 4,
    borderBottomColor: componentColors.cardEdge,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FEF3C7",
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    ...typography.headlineMd,
    fontSize: 20,
    fontWeight: "800",
    color: colors.onSurface,
    textAlign: "center",
    marginBottom: 8,
  },
  body: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonGroup: {
    width: "100%",
    gap: 8,
  },
  exitTextButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  exitButtonText: {
    ...typography.labelLg,
    fontSize: 14,
    fontWeight: "700",
    color: "#BA1A1A",
  },
});
