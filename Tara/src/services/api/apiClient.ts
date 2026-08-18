import { StorageService } from "../storage/StorageService";
import { offlineCache } from "./offlineCache";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

const DEFAULT_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.EXPO_PUBLIC_API_URL || "https://api.tara-app.org/v1";
  }

  private async getAuthToken(): Promise<string | null> {
    return await StorageService.getItem<string>("tara_auth_token");
  }

  /**
   * Universal fetch with timeout, retry, auth headers and offline fallback
   */
  async request<T>(
    endpoint: string,
    options: RequestInit & {
      useCache?: boolean;
      cacheTtlMinutes?: number;
      retry?: boolean;
    } = {}
  ): Promise<T> {
    const {
      useCache = true,
      cacheTtlMinutes = 60 * 24,
      retry = true,
      headers: customHeaders,
      ...fetchOptions
    } = options;

    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const token = await this.getAuthToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((customHeaders as Record<string, string>) || {}),
    };

    // Cache key for GET requests
    const isGet = !fetchOptions.method || fetchOptions.method.toUpperCase() === "GET";
    const cacheKey = `api_${endpoint}`;

    let lastError: any = null;
    const maxAttempts = retry && isGet ? MAX_RETRIES : 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorJson = await response.json().catch(() => ({}));
          throw {
            status: response.status,
            message: errorJson.message || `HTTP ${response.status} error`,
            details: errorJson,
          } as ApiError;
        }

        const json: ApiResponse<T> = await response.json();
        const responseData = json.data ?? (json as unknown as T);

        // Update offline cache for successful GET responses
        if (isGet && useCache) {
          await offlineCache.set(cacheKey, responseData, cacheTtlMinutes);
        }

        return responseData;
      } catch (err: any) {
        clearTimeout(timeoutId);
        lastError = err;

        // If this is a network failure or abort and we have a cached copy, serve cache immediately
        if (isGet && useCache) {
          const cachedData = await offlineCache.get<T>(cacheKey);
          if (cachedData !== null) {
            console.log(`[ApiClient] Serving offline cached data for ${endpoint}`);
            return cachedData;
          }
        }

        // If not last attempt, wait briefly before retrying
        if (attempt < maxAttempts) {
          await new Promise((res) => setTimeout(res, 600 * attempt));
        }
      }
    }

    // If mutation fails offline, queue for later replay
    if (!isGet && (fetchOptions.method === "POST" || fetchOptions.method === "PUT")) {
      await offlineCache.enqueueMutation({
        endpoint,
        method: fetchOptions.method as any,
        body: fetchOptions.body ? JSON.parse(fetchOptions.body as string) : undefined,
      });
      console.log(`[ApiClient] Offline queued mutation for ${endpoint}`);
    }

    throw lastError || new Error(`Network request to ${endpoint} failed`);
  }

  // Convenience methods
  async get<T>(endpoint: string, options?: { useCache?: boolean; cacheTtlMinutes?: number }): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", ...options });
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
