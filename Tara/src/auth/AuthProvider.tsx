import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter, useSegments } from "expo-router";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { AuthUser } from "./auth.types";
import { authService } from "./auth.service";
import { authStorage } from "../storage/authStorage";


interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID) {
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      });
    }
  }, []);

  const loadSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const session = await authStorage.getSession();
      if (session) {
        setUser(session.user);
      }
    } catch (e) {
      console.error("Failed to load auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const handleGoogleAuthSuccess = async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const authResponse = await authService.signInWithGoogle(token);
      setUser(authResponse.session.user);
    } catch (e: any) {
      console.error("Login failed:", e);
      setError(e.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    if (!process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID) {
      setError("Google Client ID is missing.");
      return;
    }
    setError(null);
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;
      if (idToken) {
        await handleGoogleAuthSuccess(idToken);
      } else {
        setError("Failed to get Google authentication token.");
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError("Sign in is already in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError("Google Play Services not available.");
      } else {
        setError(error.message || "An error occurred starting Google login.");
      }
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authService.signOut();
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        console.warn("Failed to sign out of Google", e);
      }
      setUser(null);
    } catch (e) {
      console.error("Sign out failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const session = await authService.refreshSession();
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const firstSegment = segments[0] as string | undefined;
    const inAuthGroup = firstSegment === "login";
    const atRoot = firstSegment === undefined || firstSegment === "index";

    if (!user && !inAuthGroup && !atRoot) {
      // Redirect to the login screen
      router.replace("/login");
    } else if (user && (inAuthGroup || atRoot)) {
      // Direct to dashboard if logged in
      router.replace("/(tabs)");
    }
  }, [user, segments, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        signOut,
        refreshSession,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
