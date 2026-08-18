import type {
  AIInterviewEvaluationResult,
  AIInterviewQuestion,
} from "../../types/learn";
import type { IAIInterviewService } from "./IAIInterviewService";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockAIInterviewService implements IAIInterviewService {
  /**
   * Evaluates user input by scanning for semantic keywords and expected agricultural concepts.
   */
  async evaluateAnswer(
    question: AIInterviewQuestion,
    userResponse: string,
    lang: string = "en"
  ): Promise<AIInterviewEvaluationResult> {
    // Simulate real-time LLM concept analysis latency
    await delay(650);

    const normalizedInput = (userResponse || "").trim().toLowerCase();
    const detectedConcepts: string[] = [];
    const missingConcepts: string[] = [];

    const expected = question.expectedConcepts || [];
    const passingThreshold = question.passingScore ?? 50;

    for (const concept of expected) {
      const conceptLabel = concept.label.toLowerCase();
      const keywords = (concept.keywords || []).map((k) => k.toLowerCase());

      // Match against concept label or any associated keyword
      const isMatched =
        normalizedInput.includes(conceptLabel) ||
        keywords.some((kw) => {
          if (!kw) return false;
          // Check word boundary or substring match
          return normalizedInput.includes(kw);
        });

      if (isMatched) {
        detectedConcepts.push(concept.label);
      } else {
        missingConcepts.push(concept.label);
      }
    }

    const totalConcepts = Math.max(expected.length, 1);
    const score = Math.round((detectedConcepts.length / totalConcepts) * 100);
    const passed = score >= passingThreshold;
    const followUpNeeded = !passed && detectedConcepts.length > 0;

    // Generate warm, contextual Tara feedback
    let feedbackText: string;

    if (passed) {
      if (detectedConcepts.length === totalConcepts) {
        feedbackText =
          lang === "hi"
            ? "अद्भुत समझ! आपने सभी मुख्य बिंदुओं को पूरी तरह से समझाया है।"
            : lang === "te"
            ? "అద్భుతమైన అవగాహన! మీరు అన్ని ముఖ్యమైన అంశాలను చాలా స్పష్టంగా వివరించారు."
            : lang === "ml"
            ? "മികച്ച അറിവ്! നിങ്ങൾ എല്ലാ പ്രധാന ആശയങ്ങളും കൃത്യമായി വിശദീകരിച്ചു."
            : "Outstanding explanation! You clearly articulated all the key living soil principles.";
      } else {
        feedbackText =
          lang === "hi"
            ? `बहुत बढ़िया! आपने ${detectedConcepts.join(", ")} को बहुत अच्छे से समझाया।`
            : lang === "te"
            ? `చాలా బాగుంది! మీరు ${detectedConcepts.join(", ")} అంశాలను చక్కగా వివరించారు.`
            : lang === "ml"
            ? `വളരെ നന്ന്! നിങ്ങൾ ${detectedConcepts.join(", ")} എന്നിവ നന്നായി മനസ്സിലാക്കിയിട്ടുണ്ട്.`
            : `Great work! You correctly highlighted ${detectedConcepts.join(", ")}.`;
      }
    } else if (followUpNeeded) {
      const missedStr = missingConcepts.join(", ");
      feedbackText =
        lang === "hi"
          ? `अच्छा प्रयास! आपने ${detectedConcepts.join(", ")} बताया, लेकिन ${missedStr} का भी ध्यान रखें।`
          : lang === "te"
          ? `మంచి ప్రయత్నం! మీరు ${detectedConcepts.join(", ")} గురించి చెప్పారు, అలాగే ${missedStr} గురించి కూడా ఆలోచించండి.`
          : lang === "ml"
          ? `നല്ല ശ്രമം! നിങ്ങൾ ${detectedConcepts.join(", ")} പറഞ്ഞു, എന്നാൽ ${missedStr} കൂടി ഓർക്കുക.`
          : `Good start! You covered ${detectedConcepts.join(", ")}, but think about how ${missedStr} connects as well.`;
    } else {
      feedbackText =
        question.hint ||
        (lang === "hi"
          ? "एक बार फिर सोचें। मिट्टी की जैविक गतिविधियों और हवा-पानी के संतुलन पर ध्यान दें।"
          : lang === "te"
          ? "మరొకసారి ఆలోచించండి. నేలలోని జీవులు మరియు గాలి, నీటి సమతుల్యతను గుర్తు చేసుకోండి."
          : lang === "ml"
          ? "ഒന്നുകൂടി ചിന്തിക്കൂ. മണ്ണിലെ ജീവജാലങ്ങളെയും വായു സഞ്ചാരത്തെയും പറ്റി ഓർക്കുക."
          : "Take another moment to reflect. Think about the living organisms and pore spaces underground.");
    }

    return {
      questionId: question.id,
      score,
      passed,
      detectedConcepts,
      missingConcepts,
      feedbackText,
      followUpNeeded,
    };
  }

  /**
   * Simulates real-time voice speech-to-text transcription.
   */
  async transcribeAudio(
    audioUri: string,
    _lang: string = "en"
  ): Promise<string> {
    await delay(500);
    return "Soil is a living ecosystem with earthworms, roots, and microorganisms that create spaces for air and water.";
  }
}
