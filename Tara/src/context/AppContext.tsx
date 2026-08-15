import type { ReactNode } from "react";
import { OnboardingProvider } from "./OnboardingContext";
import { UserProvider } from "./UserContext";
import { UpdateProvider } from "./UpdateContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <UpdateProvider>
      <UserProvider>
        <OnboardingProvider>{children}</OnboardingProvider>
      </UserProvider>
    </UpdateProvider>
  );
}

export * from "./OnboardingContext";
export * from "./UserContext";
export * from "./UpdateContext";

