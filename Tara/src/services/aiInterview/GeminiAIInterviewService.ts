import axios from "axios";
import type {
  AIInterviewEvaluationResult,
  AIInterviewQuestion,
} from "../../types/learn";
import type { IAIInterviewService } from "./IAIInterviewService";
import { MockAIInterviewService } from "./MockAIInterviewService";

export class GeminiAIInterviewService implements IAIInterviewService {
  private mockFallback = new MockAIInterviewService();

  private getGeminiKey(): string | undefined {
    return (
      process.env.EXPO_PUBLIC_GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY
    );
  }

  private getOpenAIKey(): string | undefined {
    return (
      process.env.EXPO_PUBLIC_OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY
    );
  }

  /**
   * Evaluates candidate response using Google Gemini 2.0 Flash / 1.5 Flash
   * or OpenAI with structured JSON concept evaluation.
   */
  async evaluateAnswer(
    question: AIInterviewQuestion,
    userResponse: string,
    lang: string = "en"
  ): Promise<AIInterviewEvaluationResult> {
    const geminiKey = this.getGeminiKey();
    const openAiKey = this.getOpenAIKey();

    if (!geminiKey && !openAiKey) {
      // Fallback to local semantic concept matcher
      return this.mockFallback.evaluateAnswer(question, userResponse, lang);
    }

    if (geminiKey) {
      try {
        return await this.evaluateWithGemini(geminiKey, question, userResponse, lang);
      } catch (err) {
        console.warn("[GeminiAIInterview] Gemini API request failed, falling back:", err);
      }
    }

    if (openAiKey) {
      try {
        return await this.evaluateWithOpenAI(openAiKey, question, userResponse, lang);
      } catch (err) {
        console.warn("[GeminiAIInterview] OpenAI API request failed, falling back:", err);
      }
    }

    // Default robust fallback
    return this.mockFallback.evaluateAnswer(question, userResponse, lang);
  }

  /**
   * Direct Google Gemini REST API evaluation
   */
  private async evaluateWithGemini(
    apiKey: string,
    question: AIInterviewQuestion,
    userResponse: string,
    lang: string
  ): Promise<AIInterviewEvaluationResult> {
    const expectedConceptsList = (question.expectedConcepts || []).map((c) => ({
      id: c.id,
      label: c.label,
      keywords: c.keywords,
    }));

    const systemPrompt = `You are Tara, an intelligent, warm, and supportive AI agricultural companion and mentor for farmers in India.
Your task is to evaluate a candidate farmer's oral response to an agricultural question during their capstone certification.

Target Language: ${lang} (Respond in this language: "en" for English, "hi" for Hindi in Devanagari, "te" for Telugu, "ml" for Malayalam).

Question Asked: "${question.question}"
Candidate's Answer: "${userResponse}"

Expected Concepts to check:
${JSON.stringify(expectedConceptsList, null, 2)}

Passing Score Threshold: ${question.passingScore ?? 50}%

Evaluate whether the candidate understood and mentioned the expected concepts.
Return ONLY valid JSON matching this exact structure:
{
  "score": <number 0-100>,
  "passed": <boolean>,
  "detectedConcepts": [<array of concept label strings that were mentioned>],
  "missingConcepts": [<array of concept label strings that were missed>],
  "feedbackText": "<Warm, conversational feedback from Tara in ${lang} acknowledging what they said and gently guiding them on missing parts>",
  "followUpNeeded": <boolean true if partially answered but below passing threshold>
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      },
      {
        timeout: 10000,
        headers: { "Content-Type": "application/json" },
      }
    );

    const candidate = response.data?.candidates?.[0];
    const textContent = candidate?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error("Empty Gemini response");
    }

    const parsed = JSON.parse(textContent);

    return {
      questionId: question.id,
      score: typeof parsed.score === "number" ? parsed.score : 75,
      passed: Boolean(parsed.passed),
      detectedConcepts: Array.isArray(parsed.detectedConcepts) ? parsed.detectedConcepts : [],
      missingConcepts: Array.isArray(parsed.missingConcepts) ? parsed.missingConcepts : [],
      feedbackText: parsed.feedbackText || "Good explanation! You demonstrated solid understanding.",
      followUpNeeded: Boolean(parsed.followUpNeeded),
    };
  }

  /**
   * Direct OpenAI Chat Completion evaluation fallback
   */
  private async evaluateWithOpenAI(
    apiKey: string,
    question: AIInterviewQuestion,
    userResponse: string,
    lang: string
  ): Promise<AIInterviewEvaluationResult> {
    const expectedConceptsList = (question.expectedConcepts || []).map((c) => ({
      id: c.id,
      label: c.label,
      keywords: c.keywords,
    }));

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are Tara, a friendly AI agricultural mentor evaluating farmer responses in ${lang}. Output JSON only with keys: score (0-100), passed (boolean), detectedConcepts (string[]), missingConcepts (string[]), feedbackText (string in ${lang}), followUpNeeded (boolean).`,
          },
          {
            role: "user",
            content: `Question: "${question.question}"\nCandidate Answer: "${userResponse}"\nExpected Concepts: ${JSON.stringify(expectedConceptsList)}`,
          },
        ],
        temperature: 0.2,
      },
      {
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty OpenAI response");

    const parsed = JSON.parse(content);
    return {
      questionId: question.id,
      score: parsed.score ?? 75,
      passed: Boolean(parsed.passed),
      detectedConcepts: parsed.detectedConcepts || [],
      missingConcepts: parsed.missingConcepts || [],
      feedbackText: parsed.feedbackText || "Thank you for sharing your answer!",
      followUpNeeded: Boolean(parsed.followUpNeeded),
    };
  }

  async transcribeAudio(audioUri: string, lang?: string): Promise<string> {
    return this.mockFallback.transcribeAudio(audioUri, lang);
  }
}
