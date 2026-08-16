import type { ImageSource } from "expo-image";

export interface FarmDetails {
  crops: string[];
  sizeAcres: number;
  locationState: string;
  locationDistrict: string;
  irrigationType?: string;
}

export interface PracticeItem {
  id: string;
  title: string;
  description: string;
  category: "soil" | "pest" | "water" | "compost";
  difficulty: "easy" | "medium" | "advanced";
  xpGain: number;
  completed: boolean;
  image?: ImageSource;
  durationMinutes?: number;
}
