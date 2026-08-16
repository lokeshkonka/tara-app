import { LEARN_CATEGORIES, LEARN_LESSONS, LEARN_SUMMARY } from "../../data/dummy/learnData";
import type { LearnCategory, LearnLesson, LearnSummary } from "../../types/learn";
import type { ILearnRepository } from "../repositories/ILearnRepository";

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export class DummyLearnRepository implements ILearnRepository {
  async getSummary(): Promise<LearnSummary> {
    await delay(100);
    return LEARN_SUMMARY;
  }

  async getCategories(): Promise<LearnCategory[]> {
    await delay(100);
    return LEARN_CATEGORIES;
  }

  async getLessons(): Promise<LearnLesson[]> {
    await delay(100);
    return LEARN_LESSONS;
  }
}
