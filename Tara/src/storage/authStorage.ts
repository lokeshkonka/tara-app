import * as SecureStore from "expo-secure-store";
import { AuthSession } from "../auth/auth.types";

const AUTH_SESSION_KEY = "tara_auth_session";

export const authStorage = {
  async saveSession(session: AuthSession): Promise<void> {
    try {
      await SecureStore.setItemAsync(AUTH_SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      console.error("Error saving auth session to secure store", error);
    }
  },

  async getSession(): Promise<AuthSession | null> {
    try {
      const sessionString = await SecureStore.getItemAsync(AUTH_SESSION_KEY);
      if (sessionString) {
        return JSON.parse(sessionString) as AuthSession;
      }
      return null;
    } catch (error) {
      console.error("Error getting auth session from secure store", error);
      return null;
    }
  },

  async clearSession(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
    } catch (error) {
      console.error("Error clearing auth session from secure store", error);
    }
  },
};
