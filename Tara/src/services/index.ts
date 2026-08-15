import { DummyOnboardingRepository } from "./dummy/DummyOnboardingRepository";
import { DummyUserRepository } from "./dummy/DummyUserRepository";
import type { IOnboardingRepository } from "./repositories/IOnboardingRepository";
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
