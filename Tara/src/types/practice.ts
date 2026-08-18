import type { LearnLessonDetail } from "./learn";

export interface PracticeHeaderStats {
  totalLessonsCompleted: number;
  totalXp: number;
  totalAwards: number;
}

export interface CategoryProgressCob {
  categoryId: string;
  categoryKey: string;
  progressPercentage: number; // 0 - 100
}

export interface PracticeScreenData {
  stats: PracticeHeaderStats;
  cobCategories: CategoryProgressCob[];
  recentLessonDetail: LearnLessonDetail;
}
