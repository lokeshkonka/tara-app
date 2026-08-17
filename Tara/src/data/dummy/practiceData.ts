import type { PracticeScreenData } from "../../types/practice";
import { SOIL_HEALTH_LESSON_DETAIL } from "./learnData";

export const DUMMY_PRACTICE_DATA: PracticeScreenData = {
  stats: {
    totalLessonsCompleted: 3,
    totalXp: 800,
    totalAwards: 5,
  },
  cobCategories: [
    { categoryId: "soil", categoryKey: "learn.category.soil", progressPercentage: 85 },
    { categoryId: "water", categoryKey: "learn.category.water", progressPercentage: 60 },
    { categoryId: "compost", categoryKey: "learn.category.compost", progressPercentage: 45 },
    { categoryId: "pest", categoryKey: "learn.category.pest", progressPercentage: 70 },
    { categoryId: "crops", categoryKey: "learn.category.crops", progressPercentage: 40 },
    { categoryId: "basics", categoryKey: "learn.category.basics", progressPercentage: 90 },
  ],
  recentLessonDetail: SOIL_HEALTH_LESSON_DETAIL,
};
