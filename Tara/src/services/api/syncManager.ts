import NetInfo from "@react-native-community/netinfo";
import { apiClient } from "./apiClient";
import { offlineCache, type QueuedMutation } from "./offlineCache";

class SyncManager {
  private isSyncing = false;

  init() {
    // Listen for network connectivity transitions
    NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        this.syncQueuedMutations();
      }
    });
  }

  /**
   * Replay all pending offline mutations to the live API
   */
  async syncQueuedMutations(): Promise<number> {
    if (this.isSyncing) return 0;
    this.isSyncing = true;

    let syncedCount = 0;
    try {
      const queue = await offlineCache.getQueuedMutations();
      if (queue.length === 0) {
        this.isSyncing = false;
        return 0;
      }

      console.log(`[SyncManager] Replaying ${queue.length} offline mutations...`);

      for (const mutation of queue) {
        try {
          await this.replayMutation(mutation);
          await offlineCache.removeMutation(mutation.id);
          syncedCount++;
        } catch (err) {
          console.warn(`[SyncManager] Failed to sync mutation ${mutation.id}:`, err);
          mutation.retryCount += 1;
          // If tried more than 5 times with persistent failure, discard to prevent blocking
          if (mutation.retryCount > 5) {
            await offlineCache.removeMutation(mutation.id);
          }
        }
      }
    } finally {
      this.isSyncing = false;
    }

    return syncedCount;
  }

  private async replayMutation(mutation: QueuedMutation): Promise<any> {
    switch (mutation.method) {
      case "POST":
        return await apiClient.post(mutation.endpoint, mutation.body);
      case "PUT":
        return await apiClient.put(mutation.endpoint, mutation.body);
      case "DELETE":
        return await apiClient.delete(mutation.endpoint);
      default:
        throw new Error(`Unsupported mutation method: ${mutation.method}`);
    }
  }
}

export const syncManager = new SyncManager();
