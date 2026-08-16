import { AuthAdapter, AuthResponse, AuthSession, AuthUser } from "./auth.types";
import { authStorage } from "../storage/authStorage";
import { ApiClient } from "../api/apiClient";

export class BackendAuthAdapter implements AuthAdapter {
  async signInWithGoogle(idToken: string): Promise<AuthResponse> {
    const response = await ApiClient.post<AuthResponse>("/auth/google", { idToken });
    await authStorage.saveSession(response.session);
    return response;
  }

  async signOut(): Promise<void> {
    try {
      await ApiClient.post("/auth/logout", {});
    } catch (e) {
      console.warn("Failed to notify backend of logout", e);
    } finally {
      await authStorage.clearSession();
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const response = await ApiClient.get<{ user: AuthUser }>("/auth/me");
      return response.user;
    } catch (e) {
      console.error("Failed to get current user from backend", e);
      return null;
    }
  }

  async refreshSession(): Promise<AuthSession | null> {
    const session = await authStorage.getSession();
    if (!session?.refreshToken) {
      return null;
    }
    
    try {
      const response = await ApiClient.post<AuthResponse>("/auth/refresh", {
        refreshToken: session.refreshToken,
      });
      await authStorage.saveSession(response.session);
      return response.session;
    } catch (e) {
      console.error("Failed to refresh session with backend", e);
      return null;
    }
  }
}

export const backendAuth = new BackendAuthAdapter();
