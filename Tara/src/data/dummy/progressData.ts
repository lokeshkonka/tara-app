import type { ProgressData } from "../../types/progress";

export const DEFAULT_PROGRESS: ProgressData = {
  greenScore: 890,
  greenScoreMax: 1200,
  level: 12,

  metrics: [
    {
      id: "soil-health",
      title: "Soil Health",
      value: 72,
      unit: "%",
      percentage: 72,
    },
    {
      id: "water-saving",
      title: "Water Saving",
      value: 58,
      unit: "%",
      percentage: 58,
    },
    {
      id: "biodiversity",
      title: "Biodiversity",
      value: 65,
      unit: "%",
      percentage: 65,
    },
  ],

  badges: [
    {
      id: "soil-guardian",
      name: "Soil Guardian",
      icon: "eco",
      unlocked: true,
    },
    {
      id: "water-saver",
      name: "Water Saver",
      icon: "water-drop",
      unlocked: true,
    },
    {
      id: "eco-grower",
      name: "Eco Grower",
      icon: "spa",
      unlocked: true,
    },
    {
      id: "biodiversity",
      name: "Biodiversity",
      icon: "forest",
      unlocked: true,
    },
    {
      id: "pollinator",
      name: "Pollinator",
      icon: "bug-report",
      unlocked: false,
    },
  ],

  dailyGoal: {
    completed: 2,
    total: 3,
  },
};
