export type LoadingState = "idle" | "loading" | "success" | "error";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
