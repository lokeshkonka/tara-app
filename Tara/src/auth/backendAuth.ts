import { AuthAdapter, AuthResponse, AuthSession, AuthUser } from "./auth.types";
import { authStorage } from "../storage/authStorage";
import { ApiClient, setAuthRefreshHandler } from "../api/apiClient";

interface BackendUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
  profile?: { language?: string };
}

interface BackendSession {
  user: BackendUser;
  accessToken: string;
  refreshToken?: string;
}

interface BackendResponse {
  success: boolean;
  message?: string;
  session?: BackendSession;
  user?: BackendUser;
}

function mapUser(user: BackendUser): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    provider: "google",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    profile: user.profile,
  };
}

function toSession(session: BackendSession): AuthSession {
  return {
    user: mapUser(session.user),
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  };
}

export class BackendAuthAdapter implements AuthAdapter {
  async signInWithGoogle(idToken: string): Promise<AuthResponse> {
    const response = await ApiClient.post<BackendResponse>("/api/auth/google", { idToken });
    if (!response?.session) {
      throw new Error(response?.message || "Sign-in failed: unexpected server response");
    }
    const session = toSession(response.session);
    await authStorage.saveSession(session);
    return { session };
  }

  async signOut(): Promise<void> {
    try {
      const session = await authStorage.getSession();
      await ApiClient.post("/api/auth/logout", { refreshToken: session?.refreshToken });
    } catch (e) {
      console.warn("Failed to notify backend of logout", e);
    } finally {
      await authStorage.clearSession();
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const response = await ApiClient.get<{ user: BackendUser }>("/api/auth/me");
      return response?.user ? mapUser(response.user) : null;
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
      const response = await ApiClient.post<BackendResponse>("/api/auth/refresh", {
        refreshToken: session.refreshToken,
      });
      if (!response?.session) {
        return null;
      }
      const newSession = toSession(response.session);
      await authStorage.saveSession(newSession);
      return newSession;
    } catch (e) {
      console.error("Failed to refresh session with backend", e);
      return null;
    }
  }

  async updatePreferences(language: string): Promise<AuthUser> {
    const response = await ApiClient.put<BackendResponse>("/api/auth/preferences", { language });
    if (!response?.user) {
      throw new Error(response?.message || "Failed to update preferences");
    }
    const updatedUser = mapUser(response.user);

    // Update the stored session so the local state reflects the new language
    const existingSession = await authStorage.getSession();
    if (existingSession) {
      await authStorage.saveSession({ ...existingSession, user: updatedUser });
    }

    return updatedUser;
  }
}

export const backendAuth = new BackendAuthAdapter();

setAuthRefreshHandler(async () => {
  const newSession = await backendAuth.refreshSession();
  return !!newSession;
});
