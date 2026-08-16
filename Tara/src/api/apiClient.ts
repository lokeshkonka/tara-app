import Constants from "expo-constants";
import { authStorage } from "../storage/authStorage";

const BACKEND_PORT = process.env.EXPO_PUBLIC_API_PORT || "3000";

function getApiBaseUrl(): string {
  const configured = (process.env.EXPO_PUBLIC_API_BASE_URL || "").trim();
  if (configured) {
    return configured;
  }

  // In dev, reuse the Expo dev-server host (the PC's LAN IP) so the backend is
  // reachable from emulators and physical devices. "localhost" only works on
  // the dev machine itself.
  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(":")[0];
  if (host) {
    return `http://${host}:${BACKEND_PORT}`;
  }

  return "";
}

const BASE_URL = getApiBaseUrl();

interface FetchOptions extends RequestInit {
  data?: any;
  _retried?: boolean;
}

type RefreshHandler = () => Promise<boolean>;
let refreshHandler: RefreshHandler | null = null;

// Registered by the auth layer (backend mode) so the client can transparently
// refresh an expired access token and retry the original request once.
export function setAuthRefreshHandler(handler: RefreshHandler) {
  refreshHandler = handler;
}

export class ApiClient {
  private static async getHeaders(): Promise<HeadersInit> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const session = await authStorage.getSession();
    if (session?.accessToken) {
      headers["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return headers;
  }

  private static async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const headers = await this.getHeaders();

    const { data, _retried, ...requestOptions } = options;

    const config: RequestInit = {
      ...requestOptions,
      headers: {
        ...headers,
        ...requestOptions.headers,
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const isAuthRefresh = endpoint === "/api/auth/refresh";

    try {
      const response = await fetch(url, config);
      const isJson = response.headers.get("content-type")?.includes("application/json");
      const dataJson = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        if (
          response.status === 401 &&
          !isAuthRefresh &&
          !_retried &&
          refreshHandler
        ) {
          const refreshed = await refreshHandler();
          if (refreshed) {
            return this.request<T>(endpoint, { ...options, _retried: true });
          }
        }

        throw new Error(
          (dataJson && (dataJson as any).message) ||
            response.statusText ||
            "Something went wrong"
        );
      }

      return dataJson as T;
    } catch (error) {
      console.error(`API Error on ${endpoint}:`, error);
      throw error;
    }
  }

  static get<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  static post<T>(endpoint: string, data: any, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: "POST", data });
  }

  static put<T>(endpoint: string, data: any, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: "PUT", data });
  }

  static patch<T>(endpoint: string, data: any, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: "PATCH", data });
  }

  static delete<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}
