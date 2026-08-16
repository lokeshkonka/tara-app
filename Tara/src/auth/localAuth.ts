import { AuthAdapter, AuthResponse, AuthSession, AuthUser } from "./auth.types";
import { authStorage } from "../storage/authStorage";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export class LocalAuthAdapter implements AuthAdapter {
  async signInWithGoogle(idTokenOrAccessToken: string): Promise<AuthResponse> {
    // In local mode, we pretend the backend successfully authenticated the user
    // We would normally decode the idToken to get user details, or fetch them using the access token
    // For this local mockup, we'll fetch from Google's userinfo endpoint if it's an access token,
    // or just create a mock user if it's an idToken (for simplicity)
    
    let email = "farmer@tara.app";
    let name = "Tara Farmer";
    let avatarUrl = undefined;

    try {
      // Try fetching userinfo if it's an access token
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${idTokenOrAccessToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        email = data.email || email;
        name = data.name || name;
        avatarUrl = data.picture || avatarUrl;
      }
    } catch (e) {
      console.log("Could not fetch Google user info in local auth mode", e);
    }

    const user: AuthUser = {
      id: `local_${generateId()}`,
      email,
      name,
      avatarUrl,
      provider: "google",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const session: AuthSession = {
      user,
      accessToken: `local_access_${generateId()}`,
      refreshToken: `local_refresh_${generateId()}`,
    };

    await authStorage.saveSession(session);
    return { session };
  }

  async signOut(): Promise<void> {
    await authStorage.clearSession();
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const session = await authStorage.getSession();
    return session?.user || null;
  }

  async refreshSession(): Promise<AuthSession | null> {
    const session = await authStorage.getSession();
    return session; // In local mode, session doesn't expire
  }
}

export const localAuth = new LocalAuthAdapter();
