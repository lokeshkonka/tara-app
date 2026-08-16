import type { PracticeItem } from "../../types/farm";

export const TODAYS_PRACTICE: PracticeItem = {
  id: "practice_mulch",
  title: "Mulch 5 plants",
  description: "Protect soil moisture and improve health.",
  category: "soil",
  difficulty: "easy",
  xpGain: 40,
  completed: false,
  durationMinutes: 10,
  image: require("../../../assets/Home-assets/practice-card-image.jpg"),
};
