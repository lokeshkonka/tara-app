import type { ReactNode } from "react";
import { DashboardProvider } from "./DashboardContext";
import { OnboardingProvider } from "./OnboardingContext";
import { ProgressProvider } from "./ProgressContext";
import { UserProvider } from "./UserContext";
import { UpdateProvider } from "./UpdateContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <UpdateProvider>
      <UserProvider>
        <DashboardProvider>
          <ProgressProvider>
            <OnboardingProvider>{children}</OnboardingProvider>
          </ProgressProvider>
        </DashboardProvider>
      </UserProvider>
    </UpdateProvider>
  );
}

export * from "./OnboardingContext";
export * from "./UserContext";
export * from "./UpdateContext";
export * from "./DashboardContext";
export * from "./ProgressContext";

