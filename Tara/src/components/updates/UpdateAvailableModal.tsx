import {
  Modal,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useOTAUpdates } from "../../hooks/useOTAUpdates";
import { colors, rounded, spacing, typography } from "../../theme/theme";
import { TactileButton } from "../ui/TactileButton";

export function UpdateAvailableModal() {
  const {
    status,
    isModalVisible,
    isDownloading,
    isReadyToRestart,
    downloadUpdate,
    restartApp,
    dismissUpdate,
    retryDownload,
  } = useOTAUpdates();

  if (!isModalVisible) {
    return null;
  }

  const isError = status === "error";

  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={dismissUpdate}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Header Icon */}
          <View
            style={[
              styles.iconWrapper,
              isReadyToRestart && styles.iconWrapperSuccess,
              isError && styles.iconWrapperError,
            ]}
          >
            <MaterialIcons
              name={
                isReadyToRestart
                  ? "check-circle"
                  : isError
                  ? "error-outline"
                  : isDownloading
                  ? "cloud-download"
                  : "system-update-alt"
              }
              size={32}
              color={
                isReadyToRestart
                  ? colors.primaryContainer
                  : isError
                  ? colors.error
                  : colors.primary
              }
            />
          </View>

          {/* Title and Description */}
          {isDownloading ? (
            <View style={styles.contentStack}>
              <Text style={styles.title}>Updating TARA...</Text>
              <Text style={styles.subtitle}>
                Downloading new features and improvements. Please keep the app open.
              </Text>
              <View style={styles.loaderRow}>
                <ActivityIndicator
                  color={colors.primaryContainer}
                  size="large"
                />
                <Text style={styles.loadingText}>Downloading update...</Text>
              </View>
            </View>
          ) : isReadyToRestart ? (
            <View style={styles.contentStack}>
              <Text style={styles.title}>Update Ready!</Text>
              <Text style={styles.subtitle}>
                The update has been downloaded. Restart TARA now to enjoy the latest version.
              </Text>
            </View>
          ) : isError ? (
            <View style={styles.contentStack}>
              <Text style={styles.title}>Update Couldn&apos;t Be Downloaded</Text>
              <Text style={styles.subtitle}>
                There was an issue downloading the update. Your current version will continue working normally.
              </Text>
            </View>
          ) : (
            <View style={styles.contentStack}>
              <Text style={styles.title}>A new TARA update is available</Text>
              <Text style={styles.subtitle}>
                {"We've improved TARA with new features and improvements. Update now to get the latest version."}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionsStack}>
            {isDownloading ? null : isReadyToRestart ? (
              <TactileButton
                title="Restart TARA"
                icon="restart-alt"
                variant="primary"
                onPress={restartApp}
              />
            ) : isError ? (
              <>
                <TactileButton
                  title="Try Again"
                  icon="refresh"
                  variant="primary"
                  onPress={retryDownload}
                />
                <TactileButton
                  title="Later"
                  variant="ghost"
                  onPress={dismissUpdate}
                />
              </>
            ) : (
              <>
                <TactileButton
                  title="Update Now"
                  icon="arrow-forward"
                  variant="primary"
                  onPress={downloadUpdate}
                />
                <TactileButton
                  title="Later"
                  variant="ghost"
                  onPress={dismissUpdate}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(24, 28, 26, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.marginMobile,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.stackLg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(76, 175, 80, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.stackMd,
  },
  iconWrapperSuccess: {
    backgroundColor: colors.secondaryContainer,
  },
  iconWrapperError: {
    backgroundColor: colors.errorContainer,
  },
  contentStack: {
    alignItems: "center",
    marginBottom: spacing.stackLg,
    width: "100%",
  },
  title: {
    ...typography.headlineMd,
    fontSize: 20,
    color: colors.onSurface,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
  loaderRow: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.stackLg,
    gap: 12,
  },
  loadingText: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: "700",
  },
  actionsStack: {
    width: "100%",
    gap: 10,
  },
});
