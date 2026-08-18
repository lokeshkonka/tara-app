import { GeminiAIInterviewService } from "./GeminiAIInterviewService";
import { MockAIInterviewService } from "./MockAIInterviewService";
import type { IAIInterviewService } from "./IAIInterviewService";

export * from "./IAIInterviewService";
export * from "./MockAIInterviewService";
export * from "./GeminiAIInterviewService";

// Global singleton instance using Gemini with seamless offline fallback
export const aiInterviewService: IAIInterviewService = new GeminiAIInterviewService();
