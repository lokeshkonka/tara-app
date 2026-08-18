import { FARMING_BASICS_PACKAGE } from "../../data/lessons/farmingBasicsPackage";
import { adaptLessonPackage } from "../../data/lessons/lessonPackageAdapter";
import {
  LEVEL_DEFINITIONS_REGISTRY,
} from "../../data/lessons/soilHealthLesson";
import { UNDERSTANDING_SOIL_HEALTH_PACKAGE } from "../../data/lessons/UnderstandingSoilHealth2package";
import type { LevelDefinition } from "../../types/learn";

// PHASE 4: bundled level-definition fallback.
// The backend serves curriculum metadata + progress but does not (yet) host the
// heavy authored level play content (schemaPayload). When the backend returns
// null for a level, this resolves the LevelDefinition from the bundled lesson
// packages, mirroring the DummyLearnRepository behaviour exactly.
export function getBundledLevelDefinition(
  levelId: string,
  lang: string = "en"
): LevelDefinition | null {
  if (levelId.startsWith("basics-")) {
    const { levelDefinitions } = adaptLessonPackage(FARMING_BASICS_PACKAGE, lang);
    if (levelDefinitions[levelId]) {
      return levelDefinitions[levelId];
    }
  }

  const { levelDefinitions } = adaptLessonPackage(
    UNDERSTANDING_SOIL_HEALTH_PACKAGE,
    lang
  );
  if (levelDefinitions[levelId]) {
    return levelDefinitions[levelId];
  }

  if (LEVEL_DEFINITIONS_REGISTRY[levelId]) {
    return LEVEL_DEFINITIONS_REGISTRY[levelId];
  }

  return levelDefinitions["soil-level-1"] ?? null;
}