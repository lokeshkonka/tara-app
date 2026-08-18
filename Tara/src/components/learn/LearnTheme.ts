/**
 * Learn module color themes — shared by category chips and lesson cards so
 * the whole Learn tab alternates consistently between green and blue accents.
 */
export interface LearnChipTheme {
  /** Unselected chip face tint */
  tint: string;
  border: string;
  edge: string;
  text: string;
  /** Selected/solid accent color */
  solid: string;
  solidEdge: string;
}

export const LEARN_BLUE: LearnChipTheme = {
  tint: "#E3F2FD",
  border: "rgba(21, 101, 192, 0.4)",
  edge: "rgba(21, 101, 192, 0.6)",
  text: "#1565C0",
  solid: "#1E88E5",
  solidEdge: "#0D47A1",
};

export const LEARN_CYAN: LearnChipTheme = {
  tint: "#E0F7FA",
  border: "rgba(0, 131, 143, 0.4)",
  edge: "rgba(0, 131, 143, 0.6)",
  text: "#00838F",
  solid: "#0288D1",
  solidEdge: "#01579B",
};

export const LEARN_ORANGE: LearnChipTheme = {
  tint: "#FFF7ED",
  border: "rgba(234, 88, 12, 0.4)",
  edge: "rgba(194, 65, 12, 0.6)",
  text: "#C2410C",
  solid: "#EA580C",
  solidEdge: "#9A3412",
};

export const LEARN_GREEN: LearnChipTheme = {
  tint: "#E8F5E9",
  border: "rgba(27, 94, 32, 0.4)",
  edge: "rgba(27, 94, 32, 0.6)",
  text: "#1B5E20",
  solid: "#4CAF50",
  solidEdge: "#1B5E20",
};

export const LEARN_YELLOW: LearnChipTheme = {
  tint: "#FEF9C3",
  border: "rgba(202, 138, 4, 0.45)",
  edge: "rgba(161, 98, 7, 0.6)",
  text: "#854D0E",
  solid: "#EAB308",
  solidEdge: "#A16207",
};

export const LEARN_PURPLE: LearnChipTheme = {
  tint: "#F3E8FF",
  border: "rgba(147, 51, 234, 0.4)",
  edge: "rgba(126, 34, 206, 0.6)",
  text: "#7E22CE",
  solid: "#9333EA",
  solidEdge: "#6B21A8",
};

export const LEARN_MAROON: LearnChipTheme = {
  tint: "#FFF1F3",
  border: "rgba(190, 24, 93, 0.35)",
  edge: "rgba(159, 18, 57, 0.5)",
  text: "#9F1D43",
  solid: "#C24168",
  solidEdge: "#831F3A",
};

export const LEARN_THEMES: LearnChipTheme[] = [
  LEARN_MAROON,
  LEARN_CYAN,
  LEARN_ORANGE,
  LEARN_GREEN,
  LEARN_YELLOW,
  LEARN_PURPLE,
];

export function getCategoryTheme(categoryId: string, index: number = 0): LearnChipTheme {
  switch (categoryId) {
    case "soil":
      return LEARN_MAROON;
    case "water":
      return LEARN_CYAN;
    case "pest":
      return LEARN_ORANGE;
    case "crops":
      return LEARN_YELLOW;
    case "compost":
      return LEARN_GREEN;
    case "basics":
      return LEARN_PURPLE;
    case "all":
      return LEARN_GREEN;
    default:
      return LEARN_THEMES[index % LEARN_THEMES.length];
  }
}
