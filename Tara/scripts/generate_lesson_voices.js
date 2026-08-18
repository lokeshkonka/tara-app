#!/usr/bin/env node

/**
 * TARA AI — Automated Lesson Voice Asset Generator (Sarvam AI TTS)
 *
 * Traverses lesson packages, extracts Tara dialogues in EN, HI, TE, ML,
 * calls Sarvam AI TTS API with the 'ishita' voice model (bulbul:v3),
 * saves .wav audio files neatly organized by lesson and level in `assets/lessons/<lessonId>/level-<levelNumber>/`,
 * and generates audio binding mappings for zero-latency offline playback in the app.
 *
 * Usage:
 *   node scripts/generate_lesson_voices.js
 *   node scripts/generate_lesson_voices.js --package SustainableSoilPackage
 *   node scripts/generate_lesson_voices.js --package SustainableSoilPackage --level 1
 *   node scripts/generate_lesson_voices.js --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Load .env file
function loadEnv() {
  const envPath = path.join(ROOT_DIR, ".env");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const match = line.trim().match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const SARVAM_API_KEY =
  process.env.EXPO_PUBLIC_SARVAM_API_KEY ||
  process.env.SARVAM_API_KEY ||
  "sk_d1s767h3_IYhi0EwQz5P2IwnekKivXd2k";

const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";
const SPEAKER = "ishita";
const MODEL = "bulbul:v3";

const LANGUAGE_CODE_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  te: "te-IN",
  ml: "ml-IN",
};

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const forceRegenerate = args.includes("--force");
const targetPackageName = getArgValue("--package") || "SustainableSoilPackage";
const targetLevelNumber = getArgValue("--level") ? parseInt(getArgValue("--level"), 10) : null;

function getArgValue(name) {
  const idx = args.indexOf(name);
  if (idx !== -1 && idx + 1 < args.length) {
    return args[idx + 1];
  }
  return null;
}

// Rate-limiting delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callSarvamTTS(text, langCode) {
  if (!text || text.trim().length === 0) return null;

  const body = {
    inputs: [text.trim()],
    target_language_code: langCode,
    speaker: SPEAKER,
    model: MODEL,
  };

  const response = await fetch(SARVAM_TTS_URL, {
    method: "POST",
    headers: {
      "api-subscription-key": SARVAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sarvam TTS API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  if (!data.audios || !data.audios[0]) {
    throw new Error("Sarvam TTS returned empty audio payload");
  }

  return Buffer.from(data.audios[0], "base64");
}

/**
 * Extracts dialogue targets from a lesson package
 */
function extractVoiceTargets(lessonPackage) {
  const targets = [];
  const lessonId = lessonPackage.id || "lesson";

  if (lessonPackage.levels && Array.isArray(lessonPackage.levels)) {
    for (const level of lessonPackage.levels) {
      if (targetLevelNumber && level.levelNumber !== targetLevelNumber) {
        continue;
      }

      const levelNum = level.levelNumber;
      const levelDirName = `level-${levelNum}`;

      if (level.phases && Array.isArray(level.phases)) {
        for (const phase of level.phases) {
          const phaseId = phase.id;

          // 1. Main Phase Tara Dialogue
          if (phase.taraDialogue) {
            targets.push({
              lessonId,
              levelNum,
              levelDirName,
              key: `${phaseId}-dialogue`,
              dialogue: phase.taraDialogue,
              phaseId,
              type: "phaseDialogue",
            });
          }

          // 2. Phase Tara Success Dialogue
          if (phase.taraSuccessDialogue) {
            targets.push({
              lessonId,
              levelNum,
              levelDirName,
              key: `${phaseId}-success`,
              dialogue: phase.taraSuccessDialogue,
              phaseId,
              type: "phaseSuccessDialogue",
            });
          }

          // 3. Concept Cards Tara Dialogue
          if (phase.type === "conceptCards" && phase.cards && Array.isArray(phase.cards)) {
            for (const card of phase.cards) {
              if (card.taraDialogue) {
                targets.push({
                  lessonId,
                  levelNum,
                  levelDirName,
                  key: `${phaseId}-card-${card.id}`,
                  dialogue: card.taraDialogue,
                  phaseId,
                  cardId: card.id,
                  type: "cardDialogue",
                });
              }
            }
          }

          // 4. AI Interview Question Tara Dialogue
          if (phase.type === "aiInterview" && phase.questions && Array.isArray(phase.questions)) {
            for (const q of phase.questions) {
              if (q.taraDialogue) {
                targets.push({
                  lessonId,
                  levelNum,
                  levelDirName,
                  key: `${phaseId}-question-${q.id}`,
                  dialogue: q.taraDialogue,
                  phaseId,
                  questionId: q.id,
                  type: "interviewQuestionDialogue",
                });
              }
            }
          }
        }
      }
    }
  }

  return targets;
}

async function main() {
  console.log("==================================================================");
  console.log("🌱 TARA AI — Lesson Voice Downloader (Sarvam AI TTS)");
  console.log(`🎙️  Speaker: "${SPEAKER}" | Model: "${MODEL}"`);
  console.log(`📦 Target Package: ${targetPackageName}`);
  if (targetLevelNumber) console.log(`🎯 Level Filter: Level ${targetLevelNumber}`);
  if (isDryRun) console.log("🔍 DRY RUN MODE (No API calls will be made)");
  console.log("==================================================================");

  // Dynamic import of the requested package
  const packageFilePath = path.join(
    ROOT_DIR,
    "src",
    "data",
    "lessons",
    `${targetPackageName}.ts`
  );

  if (!fs.existsSync(packageFilePath)) {
    console.error(`❌ Lesson package file not found: ${packageFilePath}`);
    process.exit(1);
  }

  // Load module
  const module = await import(`file://${packageFilePath}`);
  const lessonPackage =
    module.SUSTAINABLE_SOIL_PACKAGE ||
    module.SOIL_HEALTH_PACKAGE ||
    module.FARMING_BASICS_PACKAGE ||
    module.UNDERSTANDING_SOIL_HEALTH_PACKAGE ||
    Object.values(module)[0];

  if (!lessonPackage || !lessonPackage.id) {
    console.error("❌ Could not find a valid LessonPackageDefinition in module");
    process.exit(1);
  }

  console.log(`\n📖 Loaded Lesson: "${lessonPackage.title?.en || lessonPackage.id}" (${lessonPackage.levels?.length || 0} levels)`);

  const targets = extractVoiceTargets(lessonPackage);
  console.log(`📋 Found ${targets.length} dialogue entries across levels.`);

  const languages = ["en", "hi", "te", "ml"];
  let totalGenerated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  const bindingFileName =
    targetPackageName === "SustainableSoilPackage"
      ? "sustainableSoilAudio.ts"
      : targetPackageName === "UnderstandingSoilHealth2package"
      ? "understandingSoilHealthAudio.ts"
      : `${targetPackageName}Audio.ts`;

  const audioBindingFile = path.join(
    ROOT_DIR,
    "src",
    "data",
    "lessons",
    bindingFileName
  );
  const bindingDir = path.dirname(audioBindingFile);

  const audioMap = {};

  for (const target of targets) {
    const { lessonId, levelNum, levelDirName, key, dialogue, phaseId } = target;

    const baseOutputDir = path.join(ROOT_DIR, "assets", "lessons", lessonId, levelDirName);
    if (!fs.existsSync(baseOutputDir)) {
      fs.mkdirSync(baseOutputDir, { recursive: true });
    }

    if (!audioMap[levelNum]) {
      audioMap[levelNum] = {};
    }
    if (!audioMap[levelNum][key]) {
      audioMap[levelNum][key] = {};
    }

    for (const lang of languages) {
      const text = dialogue[lang] || dialogue.en;
      if (!text) continue;

      const langCode = LANGUAGE_CODE_MAP[lang];
      const filename = `${key}-${lang}.wav`;
      const filePath = path.join(baseOutputDir, filename);

      // Compute exact relative path for require statement
      let relativeRequirePath = path.relative(bindingDir, filePath).replace(/\\/g, "/");
      if (!relativeRequirePath.startsWith(".")) {
        relativeRequirePath = `./${relativeRequirePath}`;
      }

      audioMap[levelNum][key][`${lang}Url`] = relativeRequirePath;

      if (fs.existsSync(filePath) && !forceRegenerate) {
        // Already exists
        totalSkipped++;
        continue;
      }

      console.log(`▶️ Generating [${lang.toUpperCase()} / Level ${levelNum}]: "${text.substring(0, 45)}..." -> ${filename}`);

      if (isDryRun) {
        totalGenerated++;
        continue;
      }

      try {
        const audioBuffer = await callSarvamTTS(text, langCode);
        fs.writeFileSync(filePath, audioBuffer);
        totalGenerated++;
        // Small rate limit delay
        await delay(250);
      } catch (err) {
        console.error(`❌ Failed to generate ${filename}:`, err.message);
        totalFailed++;
      }
    }
  }

  console.log("\n==================================================================");
  console.log(`✨ Voice Generation Summary:`);
  console.log(`   - Generated: ${totalGenerated}`);
  console.log(`   - Skipped (already exists): ${totalSkipped}`);
  console.log(`   - Failed: ${totalFailed}`);
  console.log("==================================================================");

  // Write audio bindings file
  const exportConstName =
    targetPackageName === "SustainableSoilPackage"
      ? "SUSTAINABLE_SOIL_AUDIO"
      : targetPackageName === "UnderstandingSoilHealth2package"
      ? "UNDERSTANDING_SOIL_HEALTH_AUDIO"
      : "LESSON_AUDIO";

  const tsContent = generateAudioBindingsTypeScript(lessonPackage.id, exportConstName, audioMap);
  fs.writeFileSync(audioBindingFile, tsContent, "utf8");
  console.log(`📁 Generated audio bindings at: ${path.relative(ROOT_DIR, audioBindingFile)}`);
}

function generateAudioBindingsTypeScript(lessonId, exportConstName, audioMap) {
  let output = `import type { LocalizedAudio } from "../../types/lessonSchema";

/**
 * Auto-generated Sarvam AI Audio Bindings for ${lessonId}
 * Speaker: "${SPEAKER}" (Model: "${MODEL}")
 * Generated on: ${new Date().toISOString()}
 */
export const ${exportConstName}: Record<
  string,
  Record<string, LocalizedAudio>
> = {
`;

  for (const [levelNum, items] of Object.entries(audioMap)) {
    output += `  "level-${levelNum}": {\n`;
    for (const [key, paths] of Object.entries(items)) {
      output += `    "${key}": {\n`;
      if (paths.enUrl) output += `      enUrl: require("${paths.enUrl}"),\n`;
      if (paths.hiUrl) output += `      hiUrl: require("${paths.hiUrl}"),\n`;
      if (paths.teUrl) output += `      teUrl: require("${paths.teUrl}"),\n`;
      if (paths.mlUrl) output += `      mlUrl: require("${paths.mlUrl}"),\n`;
      output += `    },\n`;
    }
    output += `  },\n`;
  }

  output += `};\n`;
  return output;
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
