export type UpdateStatus =
  | "idle"
  | "checking"
  | "available"
  | "downloading"
  | "ready"
  | "error";

export interface UpdateMetadata {
  manifest?: Record<string, unknown>;
  createdAt?: string;
  updateId?: string;
}

export interface UpdateState {
  status: UpdateStatus;
  isUpdateAvailable: boolean;
  isDownloading: boolean;
  isReadyToRestart: boolean;
  isModalVisible: boolean;
  updateId: string | null;
  error: string | null;
  lastCheckedAt: number | null;
}

export interface IUpdateService {
  isUpdatesEnabled: boolean;
  checkForUpdate(): Promise<{ isAvailable: boolean; manifest?: Record<string, unknown>; error?: string }>;
  downloadUpdate(): Promise<{ isSuccess: boolean; error?: string }>;
  reloadApp(): Promise<void>;
}
