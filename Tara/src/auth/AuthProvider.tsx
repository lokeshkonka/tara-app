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
import { useOnboarding } from "../context/OnboardingContext";


interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: (customName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const GOOGLE_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ||
  "82182901130-vrdmterhc7rpll7ektf90hdlrif5kkas.apps.googleusercontent.com";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const { state: onboardingState } = useOnboarding();

  useEffect(() => {
    if (GOOGLE_CLIENT_ID) {
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
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
    if (!GOOGLE_CLIENT_ID) {
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

  const signInAsGuest = async (customName: string = "Farmer") => {
    try {
      setIsLoading(true);
      setError(null);
      const guestUser: AuthUser = {
        id: `guest_${Date.now()}`,
        email: "farmer@tara.app",
        name: customName,
        provider: "google",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const session = {
        user: guestUser,
        accessToken: `local_guest_${Date.now()}`,
      };
      await authStorage.saveSession(session);
      setUser(guestUser);
    } catch (e: any) {
      setError(e.message || "Failed to continue as guest");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authService.signOut();
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

    if (!user) {
      // Always enforce login on launch
      if (!inAuthGroup) {
        router.replace("/login");
      }
    } else {
      // User is authenticated
      if (inAuthGroup || atRoot) {
        if (!onboardingState.isComplete) {
          router.replace("/onboarding" as any);
        } else {
          router.replace("/(tabs)");
        }
      }
    }
  }, [user, segments, isLoading, onboardingState.isComplete]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        signInAsGuest,
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
