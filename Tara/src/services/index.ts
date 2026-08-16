import { DummyDashboardRepository } from "./dummy/DummyDashboardRepository";
import { DummyLearnRepository } from "./dummy/DummyLearnRepository";
import { DummyOnboardingRepository } from "./dummy/DummyOnboardingRepository";
import { DummyProgressRepository } from "./dummy/DummyProgressRepository";
import { DummyUserRepository } from "./dummy/DummyUserRepository";
import type { IDashboardRepository } from "./repositories/IDashboardRepository";
import type { ILearnRepository } from "./repositories/ILearnRepository";
import type { IOnboardingRepository } from "./repositories/IOnboardingRepository";
import type { IProgressRepository } from "./repositories/IProgressRepository";
import type { IUserRepository } from "./repositories/IUserRepository";

// Environment switch: "dummy" | "api"
export const DATA_SOURCE: "dummy" | "api" = "dummy";

export const onboardingRepository: IOnboardingRepository =
  DATA_SOURCE === "dummy"
    ? new DummyOnboardingRepository()
    : new DummyOnboardingRepository(); // ApiOnboardingRepository in future

export const userRepository: IUserRepository =
  DATA_SOURCE === "dummy"
    ? new DummyUserRepository()
    : new DummyUserRepository(); // ApiUserRepository in future

export const dashboardRepository: IDashboardRepository =
  DATA_SOURCE === "dummy"
    ? new DummyDashboardRepository()
    : new DummyDashboardRepository(); // ApiDashboardRepository in future

export const progressRepository: IProgressRepository =
  DATA_SOURCE === "dummy"
    ? new DummyProgressRepository()
    : new DummyProgressRepository(); // ApiProgressRepository in future

export const learnRepository: ILearnRepository =
  DATA_SOURCE === "dummy"
    ? new DummyLearnRepository()
    : new DummyLearnRepository(); // ApiLearnRepository in future
