import { DEFAULT_PROGRESS } from "../../data/dummy/progressData";
import type { ProgressData } from "../../types/progress";
import type { IProgressRepository } from "../repositories/IProgressRepository";

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyProgressRepository implements IProgressRepository {
  async getProgress(): Promise<ProgressData> {
    await delay(100);
    return DEFAULT_PROGRESS;
  }
}
