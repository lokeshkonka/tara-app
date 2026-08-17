import type {
  LearnLessonDetail,
  LevelDefinition,
  LevelNodeDetail,
  LevelPhase,
} from "../../types/learn";
import {
  type LessonPackageDefinition,
  type LevelPackageDefinition,
  type LevelPhasePackage,
  resolveLocalizedAudio,
  resolveLocalizedText,
} from "../../types/lessonSchema";

/**
 * Transforms a LevelPhasePackage into an active UI LevelPhase for the given language
 */
export function adaptLevelPhase(
  phase: LevelPhasePackage,
  lang: string = "en"
): LevelPhase {
  switch (phase.type) {
    case "interactiveLearn":
      return {
        type: "interactiveLearn",
        id: phase.id,
        title: resolveLocalizedText(phase.title, lang),
        taraDialogue: resolveLocalizedText(phase.taraDialogue, lang),
        taraExpression: phase.taraExpression,
        audioSource: resolveLocalizedAudio(phase.taraAudio, lang),
        diagramType: phase.diagramType || "soilCrossSection",
        hotspots: (phase.hotspots || []).map((h) => ({
          id: h.id,
          name: resolveLocalizedText(h.name, lang),
          icon: h.icon,
          color: h.color,
          description: resolveLocalizedText(h.description, lang),
          xPercent: h.xPercent,
          yPercent: h.yPercent,
        })),
        completionRequirement: phase.completionRequirement || "discoverAll",
        promptToProceed: phase.promptToProceed
          ? resolveLocalizedText(phase.promptToProceed, lang)
          : undefined,
      };

    case "conceptCards":
      return {
        type: "conceptCards",
        id: phase.id,
        title: resolveLocalizedText(phase.title, lang),
        taraDialogue: resolveLocalizedText(phase.taraDialogue, lang),
        taraAudio: resolveLocalizedAudio(phase.taraAudio, lang),
        taraExpression: phase.taraExpression,
        explanation: phase.explanation
          ? {
              tag: phase.explanation.tag
                ? resolveLocalizedText(phase.explanation.tag, lang)
                : undefined,
              title: phase.explanation.title
                ? resolveLocalizedText(phase.explanation.title, lang)
                : undefined,
              description: resolveLocalizedText(phase.explanation.description, lang),
              bulletPoints: phase.explanation.bulletPoints?.map((bp) => ({
                title: bp.title ? resolveLocalizedText(bp.title, lang) : undefined,
                text: resolveLocalizedText(bp.text, lang),
                icon: bp.icon,
              })),
            }
          : undefined,
        progressiveHighlights: phase.progressiveHighlights?.map((ph) =>
          resolveLocalizedText(ph, lang)
        ),
        transitionText: phase.transitionText
          ? resolveLocalizedText(phase.transitionText, lang)
          : undefined,
        cards: phase.cards.map((c) => ({
          id: c.id,
          title: resolveLocalizedText(c.title, lang),
          icon: c.icon,
          color: c.color,
          taraDialogue: resolveLocalizedText(c.taraDialogue, lang),
          taraAudio: resolveLocalizedAudio(c.taraAudio, lang),
        })),
      };

    case "match":
      return {
        type: "match",
        id: phase.id,
        title: resolveLocalizedText(phase.title, lang),
        instructions: phase.instructions
          ? resolveLocalizedText(phase.instructions, lang)
          : undefined,
        xp: phase.xp,
        taraDialogue: phase.taraDialogue
          ? resolveLocalizedText(phase.taraDialogue, lang)
          : undefined,
        taraAudio: resolveLocalizedAudio(phase.taraAudio, lang),
        taraExpression: phase.taraExpression,
        taraSuccessDialogue: phase.taraSuccessDialogue
          ? resolveLocalizedText(phase.taraSuccessDialogue, lang)
          : undefined,
        pairs: phase.pairs.map((p) => ({
          id: p.id,
          leftText: resolveLocalizedText(p.leftText, lang),
          rightText: resolveLocalizedText(p.rightText, lang),
        })),
      };

    case "scenarioChallenge":
      return {
        type: "scenarioChallenge",
        id: phase.id,
        title: resolveLocalizedText(phase.title, lang),
        subtitle: phase.subtitle ? resolveLocalizedText(phase.subtitle, lang) : undefined,
        instructions: phase.instructions
          ? resolveLocalizedText(phase.instructions, lang)
          : undefined,
        xp: phase.xp,
        taraDialogue: phase.taraDialogue
          ? resolveLocalizedText(phase.taraDialogue, lang)
          : undefined,
        taraAudio: resolveLocalizedAudio(phase.taraAudio, lang),
        taraExpression: phase.taraExpression,
        taraSuccessDialogue: phase.taraSuccessDialogue
          ? resolveLocalizedText(phase.taraSuccessDialogue, lang)
          : undefined,
        rounds: phase.rounds.map((r) => ({
          id: r.id,
          roundNumber: r.roundNumber,
          topic: resolveLocalizedText(r.topic, lang),
          prompt: resolveLocalizedText(r.prompt, lang),
          options: r.options.map((opt) => ({
            id: opt.id,
            label: opt.label,
            title: resolveLocalizedText(opt.title || opt.text || "", lang),
            text: resolveLocalizedText(opt.text || opt.title || "", lang),
            subtitle: opt.subtitle ? resolveLocalizedText(opt.subtitle, lang) : undefined,
            icon: opt.icon,
            isCorrect: opt.isCorrect,
            explanation: opt.explanation
              ? resolveLocalizedText(opt.explanation, lang)
              : undefined,
          })),
        })),
      };

    case "memory":
      return {
        type: "memory",
        id: phase.id,
        title: resolveLocalizedText(phase.title, lang),
        instructions: resolveLocalizedText(phase.instructions, lang),
        xp: phase.xp,
        taraDialogue: resolveLocalizedText(phase.taraDialogue, lang),
        taraAudio: resolveLocalizedAudio(phase.taraAudio, lang),
        taraExpression: phase.taraExpression,
        taraSuccessDialogue: resolveLocalizedText(phase.taraSuccessDialogue, lang),
        pairs: phase.pairs.map((p) => ({
          id: p.id,
          itemA: {
            label: resolveLocalizedText(p.itemA.label, lang),
            icon: p.itemA.icon,
            color: p.itemA.color,
          },
          itemB: {
            label: resolveLocalizedText(p.itemB.label, lang),
            icon: p.itemB.icon,
            color: p.itemB.color,
          },
          connectionExplanation: resolveLocalizedText(p.connectionExplanation, lang),
        })),
      };

    case "decisionChoice":
      return {
        type: "decisionChoice",
        id: phase.id,
        title: resolveLocalizedText(phase.title, lang),
        subtitle: phase.subtitle ? resolveLocalizedText(phase.subtitle, lang) : undefined,
        instructions: resolveLocalizedText(phase.instructions, lang),
        xp: phase.xp,
        taraDialogue: resolveLocalizedText(phase.taraDialogue, lang),
        taraAudio: resolveLocalizedAudio(phase.taraAudio, lang),
        taraExpression: phase.taraExpression,
        taraSuccessDialogue: resolveLocalizedText(phase.taraSuccessDialogue, lang),
        rounds: phase.rounds.map((r) => ({
          id: r.id,
          roundNumber: r.roundNumber,
          topic: r.topic ? resolveLocalizedText(r.topic, lang) : undefined,
          situation: resolveLocalizedText(r.situation, lang),
          choices: r.choices.map((c) => ({
            id: c.id,
            label: c.label,
            text: resolveLocalizedText(c.text, lang),
            isGoodChoice: c.isGoodChoice,
            taraReaction: c.taraReaction
              ? resolveLocalizedText(c.taraReaction, lang)
              : undefined,
          })),
        })),
      };

    case "mcq":
      return {
        type: "mcq",
        id: phase.id,
        totalXp: phase.totalXp,
        taraExpressionCorrect: phase.taraExpressionCorrect,
        taraExpressionIncorrect: phase.taraExpressionIncorrect,
        questions: phase.questions.map((q) => ({
          id: q.id,
          question: resolveLocalizedText(q.question, lang),
          xp: q.xp,
          options: q.options.map((o) => ({
            id: o.id,
            text: resolveLocalizedText(o.text, lang),
            isCorrect: o.isCorrect,
            explanation: resolveLocalizedText(o.explanation, lang),
          })),
        })),
      };

    case "reward":
      return {
        type: "reward",
        id: phase.id,
        xp: phase.xp,
        badgeTitle: phase.badgeTitle
          ? resolveLocalizedText(phase.badgeTitle, lang)
          : undefined,
        badgeIcon: phase.badgeIcon,
        badgeDescription: phase.badgeDescription
          ? resolveLocalizedText(phase.badgeDescription, lang)
          : undefined,
        taraDialogue: resolveLocalizedText(phase.taraDialogue, lang),
        taraExpression: phase.taraExpression,
      };
  }
}

/**
 * Transforms a LevelPackageDefinition into a LevelDefinition for the target language
 */
export function adaptLevelDefinition(
  pkg: LevelPackageDefinition,
  lessonId: string,
  lang: string = "en"
): LevelDefinition {
  return {
    id: pkg.id,
    lessonId,
    levelNumber: pkg.levelNumber,
    title: resolveLocalizedText(pkg.title, lang),
    subtitle: pkg.subtitle ? resolveLocalizedText(pkg.subtitle, lang) : undefined,
    xpReward: pkg.xpReward,
    phases: pkg.phases.map((p) => adaptLevelPhase(p, lang)),
  };
}

/**
 * Transforms a full LessonPackageDefinition into LearnLessonDetail and registry map
 */
export function adaptLessonPackage(
  pkg: LessonPackageDefinition,
  lang: string = "en",
  completedLevelIds: Set<string> = new Set(),
  unlockedLevelIds: Set<string> = new Set([pkg.levels[0]?.id || ""])
): {
  detail: LearnLessonDetail;
  levelDefinitions: Record<string, LevelDefinition>;
} {
  const levels: LevelNodeDetail[] = pkg.levels.map((lvl, index) => {
    const isCompleted = completedLevelIds.has(lvl.id);
    const isFirstLevel = index === 0;
    const isUnlocked = isFirstLevel || unlockedLevelIds.has(lvl.id) || isCompleted;

    return {
      id: lvl.id,
      levelNumber: lvl.levelNumber,
      titleKey: `lesson.${pkg.id}.${lvl.id}.title`,
      title: resolveLocalizedText(lvl.title, lang),
      descriptionKey: `lesson.${pkg.id}.${lvl.id}.desc`,
      description: resolveLocalizedText(lvl.subtitle || lvl.title, lang),
      durationMinutes: lvl.durationMinutes,
      xp: lvl.xpReward,
      status: isCompleted ? "completed" : isUnlocked ? "available" : "locked",
      progressFraction: isCompleted ? 1 : 0,
    };
  });

  const detail: LearnLessonDetail = {
    id: pkg.id,
    categoryId: pkg.categoryId,
    titleKey: `lesson.${pkg.id}.title`,
    title: resolveLocalizedText(pkg.title, lang),
    descriptionKey: `lesson.${pkg.id}.desc`,
    description: resolveLocalizedText(pkg.description, lang),
    durationMinutes: pkg.durationMinutes,
    totalLevels: pkg.levels.length,
    totalXp: pkg.totalXp,
    whyItMattersKey: `lesson.${pkg.id}.whyItMatters`,
    whyItMattersText: resolveLocalizedText(pkg.whyItMatters, lang),
    learningOutcomes: pkg.learningOutcomes.map((lo) => ({
      id: lo.id,
      textKey: `lesson.${pkg.id}.outcome.${lo.id}`,
      text: resolveLocalizedText(lo.text, lang),
    })),
    taraQuoteKey: `lesson.${pkg.id}.taraQuote`,
    taraQuoteText: resolveLocalizedText(pkg.taraQuote, lang),
    taraExpression: pkg.taraExpression,
    levels,
  };

  const levelDefinitions: Record<string, LevelDefinition> = {};
  pkg.levels.forEach((lvl) => {
    levelDefinitions[lvl.id] = adaptLevelDefinition(lvl, pkg.id, lang);
  });

  return { detail, levelDefinitions };
}
