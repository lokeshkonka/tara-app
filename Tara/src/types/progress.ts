export interface ProgressMetric {
  id: string;
  title: string;
  value: number;
  maxValue?: number;
  unit?: string;
  percentage?: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

export interface DailyGoal {
  completed: number;
  total: number;
}

export interface ProgressData {
  greenScore: number;
  greenScoreMax: number;
  level: number;
  metrics: ProgressMetric[];
  badges: Badge[];
  dailyGoal: DailyGoal;
}
