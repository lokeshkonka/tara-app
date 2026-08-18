import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AppState, type AppStateStatus } from "react-native";
import { updateService } from "../services/updates/updateService";
import type { UpdateState, UpdateStatus } from "../services/updates/updateTypes";

interface UpdateContextValue {
  status: UpdateStatus;
  isUpdateAvailable: boolean;
  isDownloading: boolean;
  isReadyToRestart: boolean;
  isModalVisible: boolean;
  updateId: string | null;
  error: string | null;
  checkForUpdate: (force?: boolean) => Promise<void>;
  downloadUpdate: () => Promise<void>;
  restartApp: () => Promise<void>;
  dismissUpdate: () => Promise<void>;
  retryDownload: () => Promise<void>;
  openUpdateModal: () => void;
}

const UpdateContext = createContext<UpdateContextValue | null>(null);

const INITIAL_STATE: UpdateState = {
  status: "idle",
  isUpdateAvailable: false,
  isDownloading: false,
  isReadyToRestart: false,
  isModalVisible: false,
  updateId: null,
  error: null,
  lastCheckedAt: null,
};

export function UpdateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UpdateState>(INITIAL_STATE);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const checkForUpdate = useCallback(async (force: boolean = false) => {
    try {
      setState((prev) => ({ ...prev, status: "checking", error: null }));
      const result = await updateService.checkForUpdate(force);

      if (result.isAvailable) {
        setState((prev) => ({
          ...prev,
          status: "available",
          isUpdateAvailable: true,
          isModalVisible: true,
          updateId: result.updateMetadata?.updateId ?? null,
          lastCheckedAt: Date.now(),
        }));
      } else {
        setState((prev) => ({
          ...prev,
          status: "idle",
          isUpdateAvailable: false,
          lastCheckedAt: Date.now(),
        }));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Update check failed";
      setState((prev) => ({
        ...prev,
        status: "error",
        error: msg,
      }));
    }
  }, []);

  const downloadUpdate = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      status: "downloading",
      isDownloading: true,
      error: null,
    }));

    try {
      const result = await updateService.downloadUpdate();
      if (result.isSuccess) {
        setState((prev) => ({
          ...prev,
          status: "ready",
          isDownloading: false,
          isReadyToRestart: true,
          isModalVisible: true,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          status: "error",
          isDownloading: false,
          error: result.error || "Update download failed",
        }));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Download failed";
      setState((prev) => ({
        ...prev,
        status: "error",
        isDownloading: false,
        error: msg,
      }));
    }
  }, []);

  const restartApp = useCallback(async () => {
    setState((prev) => ({ ...prev, isModalVisible: false }));
    await updateService.reloadApp();
  }, []);

  const dismissUpdate = useCallback(async () => {
    setState((prev) => ({ ...prev, isModalVisible: false }));
    await updateService.recordDismissLater();
  }, []);

  const retryDownload = useCallback(async () => {
    await downloadUpdate();
  }, [downloadUpdate]);

  const openUpdateModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalVisible: true }));
  }, []);

  // 1. Initial check on app startup
  useEffect(() => {
    const timer = setTimeout(() => {
      checkForUpdate(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [checkForUpdate]);

  // 2. Background -> Foreground resume check
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appStateRef.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // Returned from background
          checkForUpdate(false);
        }
        appStateRef.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [checkForUpdate]);

  return (
    <UpdateContext.Provider
      value={{
        status: state.status,
        isUpdateAvailable: state.isUpdateAvailable,
        isDownloading: state.isDownloading,
        isReadyToRestart: state.isReadyToRestart,
        isModalVisible: state.isModalVisible,
        updateId: state.updateId,
        error: state.error,
        checkForUpdate,
        downloadUpdate,
        restartApp,
        dismissUpdate,
        retryDownload,
        openUpdateModal,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
}

export function useOTAUpdates() {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error("useOTAUpdates must be used within an UpdateProvider");
  }
  return context;
}
