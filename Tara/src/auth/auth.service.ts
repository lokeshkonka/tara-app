import { AuthAdapter } from "./auth.types";
import { localAuth } from "./localAuth";
import { backendAuth } from "./backendAuth";

const AUTH_MODE = process.env.EXPO_PUBLIC_AUTH_MODE || "local";

export const authService: AuthAdapter =
  AUTH_MODE === "backend" ? backendAuth : localAuth;
