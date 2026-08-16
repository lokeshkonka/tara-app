import type { ReactNode } from "react";
import { DashboardProvider } from "./DashboardContext";
import { LearnProvider } from "./LearnContext";
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
            <LearnProvider>
              <OnboardingProvider>{children}</OnboardingProvider>
            </LearnProvider>
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
export * from "./LearnContext";

