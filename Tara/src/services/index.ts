import { DummyDashboardRepository } from "./dummy/DummyDashboardRepository";
import { DummyLearnRepository } from "./dummy/DummyLearnRepository";
import { DummyOnboardingRepository } from "./dummy/DummyOnboardingRepository";
import { DummyProgressRepository } from "./dummy/DummyProgressRepository";
import { DummyUserRepository } from "./dummy/DummyUserRepository";
import { DummyCommunityRepository } from "./dummy/DummyCommunityRepository";
import { DummySettingsRepository } from "./dummy/DummySettingsRepository";
import { DummyFarmJourneyRepository } from "./dummy/DummyFarmJourneyRepository";

import { ApiCommunityRepository } from "./api/ApiCommunityRepository";
import { ApiSettingsRepository } from "./api/ApiSettingsRepository";
import { ApiFarmJourneyRepository } from "./api/ApiFarmJourneyRepository";
import { ApiUserRepository } from "./api/ApiUserRepository";

import { GeminiAIInterviewService } from "./aiInterview/GeminiAIInterviewService";
import { MockAIInterviewService } from "./aiInterview/MockAIInterviewService";
import type { IAIInterviewService } from "./aiInterview/IAIInterviewService";

import type { IDashboardRepository } from "./repositories/IDashboardRepository";
import type { ILearnRepository } from "./repositories/ILearnRepository";
import type { IOnboardingRepository } from "./repositories/IOnboardingRepository";
import type { IProgressRepository } from "./repositories/IProgressRepository";
import type { IUserRepository } from "./repositories/IUserRepository";
import type { ICommunityRepository } from "./repositories/ICommunityRepository";
import type { ISettingsRepository } from "./repositories/ISettingsRepository";
import type { IFarmJourneyRepository } from "./repositories/IFarmJourneyRepository";

// Environment switch: "dummy" | "api".
// Default is now "api" — the app talks to the real backend. Override per-domain
// is handled below; domains without a live backend yet stay on Dummy so their
// screens keep working with demo data (Learn/Dashboard/Progress/Onboarding).
export const DATA_SOURCE: "dummy" | "api" =
  (process.env.EXPO_PUBLIC_DATA_SOURCE as "dummy" | "api") || "api";

export const onboardingRepository: IOnboardingRepository =
  new DummyOnboardingRepository();

export const userRepository: IUserRepository =
  DATA_SOURCE === "api"
    ? new ApiUserRepository()
    : new DummyUserRepository();

export const dashboardRepository: IDashboardRepository =
  new DummyDashboardRepository();

export const progressRepository: IProgressRepository =
  new DummyProgressRepository();

export const learnRepository: ILearnRepository =
  new DummyLearnRepository();

export const communityRepository: ICommunityRepository =
  DATA_SOURCE === "api"
    ? new ApiCommunityRepository()
    : new DummyCommunityRepository();

export const settingsRepository: ISettingsRepository =
  DATA_SOURCE === "api"
    ? new ApiSettingsRepository()
    : new DummySettingsRepository();

export const farmJourneyRepository: IFarmJourneyRepository =
  DATA_SOURCE === "api"
    ? new ApiFarmJourneyRepository()
    : new DummyFarmJourneyRepository();

export const aiInterviewService: IAIInterviewService =
  process.env.EXPO_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    ? new GeminiAIInterviewService()
    : new MockAIInterviewService();

export * from "./api/apiClient";
export * from "./api/offlineCache";
export * from "./storage/StorageService";
export type {
  IAIInterviewService,
  ICommunityRepository,
  IDashboardRepository,
  IFarmJourneyRepository,
  ILearnRepository,
  IOnboardingRepository,
  IProgressRepository,
  ISettingsRepository,
  IUserRepository,
};
