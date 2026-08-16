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

export const LEARN_GREEN: LearnChipTheme = {
  tint: "#E8F5E9",
  border: "rgba(27, 94, 32, 0.4)",
  edge: "rgba(27, 94, 32, 0.6)",
  text: "#1B5E20",
  solid: "#4CAF50",
  solidEdge: "#1B5E20",
};

export const LEARN_BLUE: LearnChipTheme = {
  tint: "#E3F2FD",
  border: "rgba(21, 101, 192, 0.4)",
  edge: "rgba(21, 101, 192, 0.6)",
  text: "#1565C0",
  solid: "#1E88E5",
  solidEdge: "#0D47A1",
};

export const LEARN_THEMES: LearnChipTheme[] = [LEARN_GREEN, LEARN_BLUE];
