export type AuthProviderType = "google";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: AuthProviderType;
  createdAt?: string;
  updatedAt?: string;
  profile?: {
    language?: string;
    location?: string;
    farmSize?: number;
    crops?: string[];
  };
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthResponse {
  session: AuthSession;
}

export interface AuthAdapter {
  signInWithGoogle(idToken: string): Promise<AuthResponse>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  refreshSession(): Promise<AuthSession | null>;
  updatePreferences(language: string): Promise<AuthUser>;
}
