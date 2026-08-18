import type {
  AIInterviewEvaluationResult,
  AIInterviewQuestion,
} from "../../types/learn";

/**
 * Service contract for conversational AI concept analysis & speech evaluation
 */
export interface IAIInterviewService {
  /**
   * Evaluates the learner's spoken or typed answer against expected concepts
   */
  evaluateAnswer(
    question: AIInterviewQuestion,
    userResponse: string,
    lang?: string
  ): Promise<AIInterviewEvaluationResult>;

  /**
   * Transcribes voice recording audio file into text (or simulation)
   */
  transcribeAudio(audioUri: string, lang?: string): Promise<string>;
}
