import * as Updates from "expo-updates";
import { StorageService } from "../storage/StorageService";
import type { IUpdateService, UpdateMetadata } from "./updateTypes";

const LATER_COOLDOWN_KEY = "tara_ota_dismissed_at";
const CHECK_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
const DISMISS_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

class UpdateServiceImpl implements IUpdateService {
  private lastCheckTimestamp: number = 0;
  private isChecking: boolean = false;
  private isDownloading: boolean = false;

  get isUpdatesEnabled(): boolean {
    return Updates.isEnabled;
  }

  get isEmbedded(): boolean {
    return Updates.isEmbeddedLaunch;
  }

  get updateId(): string | null {
    return Updates.updateId ?? null;
  }

  get channel(): string | null {
    return Updates.channel ?? null;
  }

  get runtimeVersion(): string | null {
    return Updates.runtimeVersion ?? null;
  }

  /**
   * Checks whether an OTA update check is allowed under cooldown rules
   */
  async canCheckForUpdate(force: boolean = false): Promise<boolean> {
    if (force) return true;

    // In dev mode without updates enabled, avoid unnecessary checks
    if (!this.isUpdatesEnabled && __DEV__) {
      return false;
    }

    const now = Date.now();
    if (now - this.lastCheckTimestamp < CHECK_COOLDOWN_MS) {
      if (__DEV__) {
        console.log("[OTA] Check skipped: inside 5-minute cooldown");
      }
      return false;
    }

    const dismissedAt = await StorageService.getItem<number>(LATER_COOLDOWN_KEY);
    if (dismissedAt && now - dismissedAt < DISMISS_COOLDOWN_MS) {
      if (__DEV__) {
        console.log("[OTA] Check skipped: user tapped 'Later' within 30 minutes");
      }
      return false;
    }

    return true;
  }

  /**
   * Checks for a new OTA update from EAS
   */
  async checkForUpdate(force: boolean = false): Promise<{
    isAvailable: boolean;
    manifest?: Record<string, unknown>;
    updateMetadata?: UpdateMetadata;
    error?: string;
  }> {
    if (this.isChecking) {
      return { isAvailable: false, error: "Check already in progress" };
    }

    if (!this.isUpdatesEnabled) {
      if (__DEV__) {
        console.log("[OTA] Updates are disabled in development mode.");
      }
      return { isAvailable: false };
    }

    const allowed = await this.canCheckForUpdate(force);
    if (!allowed) {
      return { isAvailable: false };
    }

    this.isChecking = true;
    this.lastCheckTimestamp = Date.now();

    try {
      if (__DEV__) {
        console.log("[OTA] Checking for update on channel:", this.channel);
      }
      const checkResult = await Updates.checkForUpdateAsync();

      if (checkResult.isAvailable) {
        if (__DEV__) {
          console.log("[OTA] Update available:", checkResult.manifest);
        }
        return {
          isAvailable: true,
          manifest: checkResult.manifest as Record<string, unknown>,
          updateMetadata: {
            manifest: checkResult.manifest as Record<string, unknown>,
            createdAt: checkResult.manifest && "createdAt" in checkResult.manifest
              ? String(checkResult.manifest.createdAt)
              : undefined,
            updateId: checkResult.manifest && "id" in checkResult.manifest
              ? String(checkResult.manifest.id)
              : undefined,
          },
        };
      }

      if (__DEV__) {
        console.log("[OTA] No update available. Current updateId:", this.updateId);
      }
      return { isAvailable: false };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown OTA check error";
      console.warn("[OTA] Update check failed gracefully:", msg);
      return { isAvailable: false, error: msg };
    } finally {
      this.isChecking = false;
    }
  }

  /**
   * Fetches/downloads the new OTA bundle
   */
  async downloadUpdate(): Promise<{ isSuccess: boolean; error?: string }> {
    if (this.isDownloading) {
      return { isSuccess: false, error: "Download already in progress" };
    }

    if (!this.isUpdatesEnabled) {
      return { isSuccess: false, error: "Updates disabled in current environment" };
    }

    this.isDownloading = true;

    try {
      if (__DEV__) {
        console.log("[OTA] Downloading update from EAS...");
      }
      const fetchResult = await Updates.fetchUpdateAsync();

      if (fetchResult.isNew) {
        if (__DEV__) {
          console.log("[OTA] Update downloaded and ready for reload.");
        }
        // Clear later cooldown since update is downloaded
        await StorageService.removeItem(LATER_COOLDOWN_KEY);
        return { isSuccess: true };
      }

      return { isSuccess: false, error: "Fetched bundle is not new" };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "OTA download failed";
      console.warn("[OTA] Update download failed:", msg);
      return { isSuccess: false, error: msg };
    } finally {
      this.isDownloading = false;
    }
  }

  /**
   * Reloads the app to launch the newly downloaded update
   */
  async reloadApp(): Promise<void> {
    try {
      if (__DEV__) {
        console.log("[OTA] Restarting application into new OTA version...");
      }
      await Updates.reloadAsync();
    } catch (err) {
      console.error("[OTA] Failed to reload app:", err);
    }
  }

  /**
   * Records that user chose 'Later' to avoid spamming
   */
  async recordDismissLater(): Promise<void> {
    await StorageService.setItem(LATER_COOLDOWN_KEY, Date.now());
  }
}

export const updateService = new UpdateServiceImpl();
