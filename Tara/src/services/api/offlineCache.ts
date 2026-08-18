import { StorageService } from "../storage/StorageService";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

export interface QueuedMutation {
  id: string;
  endpoint: string;
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  createdAt: number;
  retryCount: number;
}

const CACHE_PREFIX = "tara_cache_";
const QUEUE_KEY = "tara_offline_mutation_queue";

export const offlineCache = {
  /**
   * Save an API response into local persistent cache with TTL
   */
  async set<T>(key: string, data: T, ttlMinutes = 60 * 24): Promise<void> {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttlMs: ttlMinutes * 60 * 1000,
    };
    await StorageService.setItem(`${CACHE_PREFIX}${key}`, entry);
  },

  /**
   * Retrieve cached data if valid and not expired
   */
  async get<T>(key: string): Promise<T | null> {
    const entry = await StorageService.getItem<CacheEntry<T>>(
      `${CACHE_PREFIX}${key}`
    );
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttlMs;
    if (isExpired) {
      await StorageService.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return entry.data;
  },

  /**
   * Queue a mutation to be replayed when the device is back online
   */
  async enqueueMutation(mutation: Omit<QueuedMutation, "id" | "createdAt" | "retryCount">): Promise<void> {
    const queue = (await StorageService.getItem<QueuedMutation[]>(QUEUE_KEY)) || [];
    const item: QueuedMutation = {
      ...mutation,
      id: `mut_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: Date.now(),
      retryCount: 0,
    };
    queue.push(item);
    await StorageService.setItem(QUEUE_KEY, queue);
  },

  /**
   * Get all pending mutations in queue
   */
  async getQueuedMutations(): Promise<QueuedMutation[]> {
    return (await StorageService.getItem<QueuedMutation[]>(QUEUE_KEY)) || [];
  },

  /**
   * Remove a successfully synced mutation
   */
  async removeMutation(mutationId: string): Promise<void> {
    const queue = (await StorageService.getItem<QueuedMutation[]>(QUEUE_KEY)) || [];
    const filtered = queue.filter((m) => m.id !== mutationId);
    await StorageService.setItem(QUEUE_KEY, filtered);
  },
};
