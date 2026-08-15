/**
 * StorageService abstraction
 * Uses window.localStorage on web or in-memory map for native/fallback
 */

class StorageServiceImpl {
  private memoryStore: Map<string, string> = new Map();

  async getItem<T>(key: string): Promise<T | null> {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const raw = window.localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
      }
      const memVal = this.memoryStore.get(key);
      return memVal ? (JSON.parse(memVal) as T) : null;
    } catch {
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, serialized);
      }
      this.memoryStore.set(key, serialized);
    } catch (e) {
      console.warn("StorageService setItem error:", e);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      this.memoryStore.delete(key);
    } catch (e) {
      console.warn("StorageService removeItem error:", e);
    }
  }

  async clear(): Promise<void> {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.clear();
      }
      this.memoryStore.clear();
    } catch (e) {
      console.warn("StorageService clear error:", e);
    }
  }
}

export const StorageService = new StorageServiceImpl();
