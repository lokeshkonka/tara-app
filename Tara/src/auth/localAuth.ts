import { AuthAdapter, AuthResponse, AuthSession, AuthUser } from "./auth.types";
import { authStorage } from "../storage/authStorage";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Decodes a Google ID token (JWT) payload locally. The signature is NOT verified
// here - this is only for the local mock mode. The real backend verifies it.
function decodeIdToken(idToken: string): { email?: string; name?: string; picture?: string } | null {
  try {
    const payloadPart = idToken.split(".")[1];
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json) as { email?: string; name?: string; picture?: string };
  } catch (e) {
    console.log("Could not decode Google ID token in local auth mode", e);
    return null;
  }
}

export class LocalAuthAdapter implements AuthAdapter {
  async signInWithGoogle(idToken: string): Promise<AuthResponse> {
    // In local mode, we pretend the backend successfully authenticated the user.
    // We decode the idToken payload to get the user's real Google profile.

    let email = "farmer@tara.app";
    let name = "Tara Farmer";
    let avatarUrl = undefined;

    const decoded = decodeIdToken(idToken);
    if (decoded) {
      email = decoded.email || email;
      name = decoded.name || name;
      avatarUrl = decoded.picture || avatarUrl;
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
