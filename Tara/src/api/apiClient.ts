import { authStorage } from "../storage/authStorage";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "";

interface FetchOptions extends RequestInit {
  data?: any;
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

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    try {
      const response = await fetch(url, config);
      const isJson = response.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        throw new Error(
          (data && data.message) || response.statusText || "Something went wrong"
        );
      }

      return data as T;
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
