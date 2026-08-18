import type { ReactNode } from "react";
import { CommunityProvider } from "./CommunityContext";
import { DashboardProvider } from "./DashboardContext";
import { FarmJourneyProvider } from "./FarmJourneyContext";
import { LearnProvider } from "./LearnContext";
import { OnboardingProvider } from "./OnboardingContext";
import { ProgressProvider } from "./ProgressContext";
import { SettingsProvider } from "./SettingsContext";
import { UpdateProvider } from "./UpdateContext";
import { UserProvider } from "./UserContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <UpdateProvider>
      <UserProvider>
        <SettingsProvider>
          <FarmJourneyProvider>
            <CommunityProvider>
              <DashboardProvider>
                <ProgressProvider>
                  <LearnProvider>
                    <OnboardingProvider>{children}</OnboardingProvider>
                  </LearnProvider>
                </ProgressProvider>
              </DashboardProvider>
            </CommunityProvider>
          </FarmJourneyProvider>
        </SettingsProvider>
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
export * from "./CommunityContext";
export * from "./SettingsContext";
export * from "./FarmJourneyContext";

