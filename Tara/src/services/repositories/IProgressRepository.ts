import type { ProgressData } from "../../types/progress";

export interface IProgressRepository {
  getProgress(): Promise<ProgressData>;
}
