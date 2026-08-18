import type { LessonPackageDefinition } from "../../types/lessonSchema";
import { UNDERSTANDING_SOIL_HEALTH_AUDIO } from "./understandingSoilHealthAudio";

/**
 * UNDERSTANDING SOIL HEALTH — 5 COMPLETE LEVELS (3 TO 4 PHASES PER LEVEL)
 *
 * Each level has a complete sequence of 3 to 4 distinct modular phases:
 * - Level 1 (3 phases): Concept Cards (5 components) ➔ MCQ (1 question) ➔ Reward (Soil Explorer)
 * - Level 2 (4 phases): Concept Cards (5 cards) ➔ Match Game (4 pairs) ➔ MCQ (2 questions) ➔ Reward (Life in the Soil)
 * - Level 3 (4 phases): Concept Cards (5 cards) ➔ Scenario Challenge (4 rounds) ➔ MCQ (2 questions) ➔ Reward (Soil Health Steward)
 * - Level 4 (4 phases): Concept Cards (5 cards) ➔ Memory Connection (5 pairs) ➔ MCQ (2 questions) ➔ Reward (Soil Systems Explorer)
 * - Level 5 (4 phases): Concept Cards (4 cards) ➔ Decision Game (4 rounds) ➔ MCQ (2 questions) ➔ Reward (Soil Guardian Final Trophy)
 */
export const UNDERSTANDING_SOIL_HEALTH_PACKAGE: LessonPackageDefinition = {
  id: "understanding-soil-health",
  categoryId: "soil",
  title: {
    en: "Understanding Soil Health",
    hi: "मृदा स्वास्थ्य को समझना",
    te: "నేల ఆరోగ్యాన్ని అర్థం చేసుకోండి",
    ml: "മണ്ണിന്റെ ആരോഗ്യം മനസ്സിലാക്കുക",
  },
  description: {
    en: "Understand the living soil community and master practical behaviors to protect and nourish your land.",
    hi: "जीवित मिट्टी के समुदाय को समझें और अपनी भूमि की रक्षा और पोषण के लिए व्यावहारिक तरीकों में महारत हासिल करें।",
    te: "సజీవ నేల సమాజాన్ని అర్థం చేసుకోండి మరియు మీ భూమిని రక్షించడానికి ఆచరణాత్మక పద్ధతులను నేర్చుకోండి.",
    ml: "ജീവനുള്ള മണ്ണിലെ ജീവജാലങ്ങളെ മനസ്സിലാക്കുകയും മണ്ണിനെ സംരക്ഷിക്കാനുള്ള പ്രായോഗിക രീതികൾ പഠിക്കുകയും ചെയ്യുക.",
  },
  whyItMatters: {
    en: "Healthy living soil holds up to 40% more moisture during dry spells, protects crops against root diseases naturally, and reduces expensive fertilizer input costs.",
    hi: "स्वस्थ जीवित मिट्टी सूखे के दौरान 40% तक अधिक नमी बनाए रखती है, प्राकृतिक रूप से फसलों को जड़ रोगों से बचाती है, और रासायनिक खर्चों को कम करती है।",
    te: "ఆరోగ్యకరమైన సజీవ నేల పొడి కాలంలో 40% ఎక్కువ తేమను నిలుపుకుంటుంది మరియు పంటలను సహజంగా కాపాడుతుంది.",
    ml: "ആരോഗ്യമുള്ള മണ്ണ് വരൾച്ചാ സമയത്ത് 40% വരെ കൂടുതൽ ഈർപ്പം നിലനിർത്തുകയും ചെടികളെ രോഗങ്ങളിൽ നിന്ന് സംരക്ഷിക്കുകയും ചെയ്യുന്നു.",
  },
  taraQuote: {
    en: "Healthy soil is the heart of a flourishing farm! Let's nurture your living land step-by-step.",
    hi: "स्वस्थ मिट्टी एक समृद्ध खेत का दिल है! आइए कदम-दर-कदम अपनी भूमि का पोषण करें।",
    te: "ఆరోగ్యకరమైన నేల సమృద్ధిగా ఉండే పొలానికి గుండెకాయ వంటిది! మీ భూమిని క్రమంగా పోషించుకుందాం.",
    ml: "ആരോഗ്യമുള്ള മണ്ണാണ് നല്ല കൃഷിയുടെ ജീവൻ! നമുക്ക് ഘട്ടം ഘട്ടമായി മണ്ണിനെ പരിപാലിക്കാം.",
  },
  taraExpression: "excited",
  durationMinutes: 26,
  totalXp: 360,
  learningOutcomes: [
    {
      id: "outcome-1",
      text: {
        en: "Recognize dark, nutrient-rich living soil vs depleted compacted dirt",
        hi: "गहरे, पोषक तत्वों से भरपूर जीवित मिट्टी और बंजर मिट्टी में अंतर पहचानें",
        te: "పోషకాలు సమృద్ధిగా ఉన్న నేలను మరియు పాడైపోయిన నేలను గుర్తించండి",
        ml: "പോഷക സമ്പന്നമായ നല്ല മണ്ണും ഫലഭൂയിഷ്ഠത നഷ്ടപ്പെട്ട മണ്ണും തിരിച്ചറിയുക",
      },
    },
    {
      id: "outcome-2",
      text: {
        en: "Understand how soil life, roots, air, and organic matter interact as a connected system",
        hi: "समझें कि मिट्टी के जीव, जड़ें, हवा और जैविक पदार्थ कैसे आपस में जुड़े हैं",
        te: "నేలలోని జీవులు, వేర్లు, గాలి మరియు సేంద్రీయ పదార్థాలు ఎలా కలిసి పనిచేస్తాయో అర్థం చేసుకోండి",
        ml: "മണ്ണിലെ ജീവികൾ, വേരുകൾ, വായു, ജൈവവസ്തുക്കൾ എന്നിവ തമ്മിലുള്ള ബന്ധം മനസ്സിലാക്കുക",
      },
    },
    {
      id: "outcome-3",
      text: {
        en: "Apply practical soil protection behaviors: surface cover, residue retention, and compaction control",
        hi: "मिट्टी की सुरक्षा के व्यावहारिक नियम लागू करें: सतह को ढकना, अवशेष छोड़ना और दबाव कम करना",
        te: "ఆచరణాత్మక నేల సంరక్షణ పద్ధతులను పాటించండి: నేలను కప్పడం మరియు సేంద్రీయ వ్యర్థాలను కలపడం",
        ml: "മണ്ണ് സംരക്ഷണ രീതികൾ പ്രായോഗികമാക്കുക: മണ്ണ് മൂടി സൂക്ഷിക്കലും ജൈവാവശിഷ്ടങ്ങൾ നിലനിർത്തലും",
      },
    },
  ],
  badgeReward: {
    id: "soil-guardian",
    title: {
      en: "Soil Guardian",
      hi: "मृदा संरक्षक",
      te: "నేల సంరక్షకుడు",
      ml: "മണ്ണ് സംരക്ഷകൻ",
    },
    icon: "eco",
    description: {
      en: "Mastered all 5 levels of Soil Health & Living Soil Ecosystems",
      hi: "मृदा स्वास्थ्य के सभी 5 स्तरों में महारत हासिल की",
      te: "నేల ఆరోగ్యం యొక్క మొత్తం 5 స్థాయిలను పూర్తి చేసారు",
      ml: "മണ്ണ് ആരോഗ്യത്തിന്റെ 5 ഘട്ടങ്ങളും വിജയകരമായി പൂർത്തിയാക്കി",
    },
  },
  levels: [
    // ─────────────────────────────────────────────
    // LEVEL 1: WHAT IS SOIL? (3 PHASES)
    // ─────────────────────────────────────────────
    {
      id: "soil-level-1",
      levelNumber: 1,
      title: {
        en: "What Is Soil?",
        hi: "मिट्टी क्या है?",
        te: "నేల అంటే ఏమిటి?",
        ml: "എന്താണ് മണ്ണ്?",
      },
      subtitle: {
        en: "Level 1 — Meet Your Soil: Discover what healthy soil is made of",
        hi: "स्तर 1 — अपनी मिट्टी से मिलें: जानें कि स्वस्थ मिट्टी किससे बनती है",
        te: "స్థాయి 1 — మీ నేలను తెలుసుకోండి: ఆరోగ్యకరమైన నేల దేనితో తయారవుతుందో తెలుసుకోండి",
        ml: "ലെവൽ 1 — മണ്ണിനെ അറിയുക: മണ്ണ് എന്തിനാലാണ് നിർമ്മിച്ചിരിക്കുന്നത് എന്ന് കണ്ടെത്തുക",
      },
      durationMinutes: 5,
      xpReward: 30,
      phases: [
        // Phase 1: Concept Cards
        {
          type: "conceptCards",
          id: "soil-level-1-concepts",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-1"]?.["soil-level-1-concepts-dialogue"],
          title: {
            en: "What is Soil?",
            hi: "मिट्टी क्या है?",
            te: "నేల అంటే ఏమిటి?",
            ml: "എന്താണ് മണ്ണ്?",
          },
          taraDialogue: {
            en: "Soil is much more than the dirt we see on the ground. It is a living home where plant roots grow. Inside soil, air, water, nutrients, organic matter, and tiny living organisms work together.",
            hi: "मिट्टी सिर्फ वह धूल नहीं है जो हम जमीन पर देखते हैं। यह एक जीवित घर है जहाँ पौधों की जड़ें बढ़ती हैं।",
            te: "నేల అనేది కేవలం మట్టి మాత్రమే కాదు. ఇది మొక్కల వేర్లు పెరిగే ఒక సజీవ గృహం.",
            ml: "മണ്ണ് വെറുമൊരു മണ്ണല്ല, അത് സസ്യങ്ങളുടെ വേരുകൾ വളരുന്ന ജീവസ്സുറ്റ വീടാണ്.",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "SOIL BASICS", hi: "मृदा मूल बातें", te: "నేల ప్రాథమికాలు", ml: "മണ്ണ് അടിസ്ഥാനങ്ങൾ" },
            title: { en: "The 5 Soil Components", hi: "मिट्टी के 5 मुख्य घटक", te: "నేలలోని 5 భాగాలు", ml: "മണ്ണിലെ 5 പ്രധാന ഘടകങ്ങൾ" },
            description: {
              en: "Soil is a dynamic living system supporting root growth, water retention, and microbial life.",
              hi: "मिट्टी एक गतिशील जीवित प्रणाली है जो जड़ों, पानी के संरक्षण और सूक्ष्मजीवों का समर्थन करती है।",
              te: "నేల అనేది మొక్కల వేర్లు, నీటి నిల్వ మరియు సూక్ష్మజీవుల జీవనాన్ని సమర్ధించే ఒక సజీవ వ్యవస్థ.",
              ml: "മണ്ണ് വേരുകളുടെ വളർച്ചയും ജലസംഭരണവും സൂക്ഷ്മജീവികളെയും പിന്തുണയ്ക്കുന്ന സജീവ വ്യവസ്ഥയാണ്.",
            },
            bulletPoints: [
              {
                title: { en: "Living Home", hi: "जीवित घर", te: "జీవంతమైన ఇల్లు", ml: "ജീവനുള്ള വീട്" },
                text: { en: "Billions of microorganisms and roots cycle nutrients continuously.", hi: "करोड़ों सूक्ष्मजीव पोषक तत्वों का चक्र चलाते हैं।", te: "కోట్లాది సూక్ష్మజీవులు పోషకాలను అందిస్తాయి.", ml: "സൂക്ഷ്മജീവികൾ നിരന്തരം പോഷകങ്ങൾ ലഭ്യമാക്കുന്നു." },
                icon: "bug-report",
              },
              {
                title: { en: "Water & Air Balance", hi: "जल और वायु संतुलन", te: "నీరు & గాలి సమతుల్యత", ml: "വെള്ളവും വായുവും" },
                text: { en: "Porous structures store moisture and oxygen required for roots.", hi: "छिद्र हवा और पानी को संजोकर रखते हैं।", te: "రంధ్రాలు వేర్లకు అవసరమైన తేమ, గాలిని అందిస్తాయి.", ml: "സുഷിരങ്ങൾ ഈർപ്പവും വായുവും സംഭരിക്കുന്നു." },
                icon: "water-drop",
              },
              {
                title: { en: "Nutrient Provider", hi: "पोषक तत्वों का स्रोत", te: "పోషకాల భాండాగారం", ml: "പോഷക സ്രോതസ്സ്" },
                text: { en: "Rich organic matter releases vital minerals for crop growth.", hi: "जैविक पदार्थ पौधों के विकास के लिए खनिज उपलब्ध कराते हैं।", te: "సేంద్రియ పదార్థాలు పంట ఎదుగుదలకు పోషకాలను అందిస్తాయి.", ml: "ജൈവാംശം സസ്യങ്ങൾക്ക് ആവശ്യമായ ധാതുക്കൾ നൽകുന്നു." },
                icon: "eco",
              },
            ],
          },
          progressiveHighlights: [
            { en: "Air", hi: "हवा", te: "గాలి", ml: "വായു" },
            { en: "Water", hi: "पानी", te: "నీరు", ml: "വെള്ളം" },
            { en: "Nutrients", hi: "पोषक तत्व", te: "పోషకాలు", ml: "പോഷകങ്ങൾ" },
            { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" },
            { en: "Living Organisms", hi: "जीवित जीव", te: "సజీవ జీవులు", ml: "സൂക്ഷ്മജീവികൾ" },
          ],
          transitionText: { en: "Now let's take a closer look at what makes up healthy soil.", hi: "आइए देखें कि स्वस्थ मिट्टी किससे बनती है।", te: "ఆరోగ్యకరమైన నేలలో ఏముంటాయో చూద్దాం.", ml: "ആരോഗ്യമുള്ള മണ്ണിൽ എന്തെല്ലാമുണ്ടെന്ന് നോക്കാം." },
          cards: [
            {
              id: "card-air",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-1"]?.["soil-level-1-concepts-card-card-air"],
              title: { en: "Air", hi: "हवा", te: "గాలి", ml: "വായു" },
              icon: "air",
              color: "#81D4FA",
              taraDialogue: { en: "Soil has tiny spaces between its particles that hold air for roots to breathe.", hi: "मिट्टी के कणों के बीच छोटी जगह होती है जो जड़ों को सांस लेने के लिए हवा देती है।", te: "నేలలోని రంధ్రాలు వేర్లు శ్వాసించడానికి గాలిని అందిస్తాయి.", ml: "മണ്ണിലെ സൂക്ഷ്മ സുഷിരങ്ങൾ വേരുകൾക്ക് ശ്വസിക്കാൻ വായു നൽകുന്നു." },
            },
            {
              id: "card-water",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-1"]?.["soil-level-1-concepts-card-card-water"],
              title: { en: "Water", hi: "पानी", te: "నీరు", ml: "വെള്ളം" },
              icon: "water-drop",
              color: "#29B6F6",
              taraDialogue: { en: "Soil stores moisture and delivers dissolved nutrients directly to roots.", hi: "मिट्टी नमी को संजोती है और पोषक तत्व जड़ों तक पहुंचाती है।", te: "నేల తేమను నిల్వ చేసి వేర్లకు అందిస్తుంది.", ml: "മണ്ണ് ഈർപ്പം നിലനിർത്തി വേരുകൾക്ക് നൽകുന്നു." },
            },
            {
              id: "card-nutrients",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-1"]?.["soil-level-1-concepts-card-card-nutrients"],
              title: { en: "Nutrients", hi: "पोषक तत्व", te: "పోషకాలు", ml: "പോഷകങ്ങൾ" },
              icon: "eco",
              color: "#4CAF50",
              taraDialogue: { en: "Healthy soil stores and cycles vital minerals like NPK naturally.", hi: "स्वस्थ मिट्टी प्राकृतिक रूप से आवश्यक खनिजों को संजोती है।", te: "ఆరోగ్యకరమైన నేల సహజంగా పోషకాలను అందిస్తుంది.", ml: "നല്ല മണ്ണ് സ്വാഭാവികമായി പോഷകങ്ങൾ ലഭ്യമാക്കുന്നു." },
            },
            {
              id: "card-organic-matter",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-1"]?.["soil-level-1-concepts-card-card-organic-matter"],
              title: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" },
              icon: "compost",
              color: "#8D6E63",
              taraDialogue: { en: "Crop residues and decaying plant material become natural soil food.", hi: "फसल अवशेष और सड़े-गले पत्ते प्राकृतिक खाद बन जाते हैं।", te: "పంట వ్యర్థాలు నేలకు సహజ ఎరువుగా మారతాయి.", ml: "സസ്യ അവശിഷ്ടങ്ങൾ പ്രകൃതിദത്ത വളമായി മാറുന്നു." },
            },
            {
              id: "card-living-organisms",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-1"]?.["soil-level-1-concepts-card-card-living-organisms"],
              title: { en: "Living Organisms", hi: "जीवित जीव", te: "సజీవ జీవులు", ml: "സൂക്ഷ്മജീവികൾ" },
              icon: "bug-report",
              color: "#7E57C2",
              taraDialogue: { en: "Billions of tiny underground helpers break down materials and aerate the ground.", hi: "करोड़ों सूक्ष्म जीव जमीन को भुरभुरा और उपजाऊ बनाते हैं।", te: "కోట్లాది జీవులు నేలను గుల్లగా చేసి సారవంతం చేస్తాయి.", ml: "കോടിക്കണക്കിന് ജീവികൾ മണ്ണിനെ ഫലഭൂയിഷ്ഠമാക്കുന്നു." },
            },
          ],
        },

                // Phase 2: MCQ Quiz (2 Questions, 4 Options Each)
        {
          type: "mcq",
          id: "soil-level-1-mcq",
          totalXp: 15,
          questions: [
            {
              id: "q1-components",
              question: {
                en: "What essential elements make up healthy living soil?",
                hi: "स्वस्थ जीवित मिट्टी में कौन से आवश्यक तत्व होते हैं?",
                te: "ఆరోగ్యకరమైన సజీవ నేలలో ఏ ముఖ్యమైన అంశాలు ఉంటాయి?",
                ml: "ആരോഗ്യമുള്ള മണ്ണിൽ അടങ്ങിയിരിക്കുന്ന പ്രധാന ഘടകങ്ങൾ ഏതെല്ലാമാണ്?",
              },
              xp: 8,
              options: [
                {
                  id: "opt-1a",
                  text: {
                    en: "Air, water, minerals, organic matter, and living microorganisms",
                    hi: "हवा, पानी, खनिज, जैविक पदार्थ और जीवित सूक्ष्मजीव",
                    te: "గాలి, నీరు, ఖనిజాలు, సేంద్రీయ పదార్థం మరియు సూక్ష్మజీవులు",
                    ml: "വായു, ജലം, ധാതുക്കൾ, ജൈവാംശം, സൂക്ഷ്മജീവികൾ",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! Healthy soil is a balanced living mixture of mineral particles, pore spaces (air & water), organic matter, and billions of microbes.",
                    hi: "बिल्कुल सही! स्वस्थ मिट्टी खनिज, हवा, पानी, जैविक पदार्थ और सूक्ष्मजीवों का एक संतुलित जीवित मिश्रण है।",
                    te: "సరిగ్గా చెప్పారు! నేలలో ఖనిజాలు, గాలి, నీరు, సేంద్రీయ పదార్థాలు మరియు సూక్ష్మజీవులు సమతుల్యంగా ఉంటాయి.",
                    ml: "ശരിയാണ്! ധാതുക്കൾ, വായു, ജലം, ജൈവാംശം, സൂക്ഷ്മജീവികൾ എന്നിവയുടെ സന്തുലിത മിശ്രിതമാണ് നല്ല മണ്ണ്.",
                  },
                },
                {
                  id: "opt-1b",
                  text: {
                    en: "Only dry crushed stone and dead dust particles",
                    hi: "केवल सूखी कुचली हुई रेत और धूल के कण",
                    te: "కేవలం ఎండిన రాతి పొడి మరియు దుమ్ము",
                    ml: "വെറും ഉണങ്ങിയ പൊടിയും കല്ലും മാത്രം",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Crushed stone alone cannot support plant life without biology, water, and organic matter.",
                    hi: "बिना जैविक पदार्थ और सूक्ष्मजीवों के केवल पत्थर पौधों को पोषण नहीं दे सकते।",
                    te: "జీవం మరియు సేంద్రీయ పదార్థం లేకుండా రాతి పొడి పంటలకు ఉపయోగపడదు.",
                    ml: "ജീവജാലങ്ങളില്ലാത്ത വെറും പൊടിയിൽ സസ്യങ്ങൾ വളരില്ല.",
                  },
                },
                {
                  id: "opt-1c",
                  text: {
                    en: "Pure chemical fertilizer crystals without any moisture",
                    hi: "बिना नमी के शुद्ध रासायनिक उर्वरक के दाने",
                    te: "తేమ లేని రసాయన ఎరువుల గుళికలు",
                    ml: "ഈർപ്പമില്ലാത്ത വെറും രാസവളങ്ങൾ മാത്രം",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Synthetic fertilizer crystals are not soil; soil requires natural biology and structure.",
                    hi: "रासायनिक उर्वरक मिट्टी नहीं होते; मिट्टी को प्राकृतिक संरचना की आवश्यकता होती है।",
                    te: "రసాయన ఎరువులు నేల కాదు; నేలకు సహజ పోషకాలు కావాలి.",
                    ml: "രാസവളങ്ങൾ മണ്ണല്ല; മണ്ണിൽ സ്വാഭാവിക ഘടന ആവശ്യമാണ്.",
                  },
                },
                {
                  id: "opt-1d",
                  text: {
                    en: "Compacted plastic and synthetic pesticide residue",
                    hi: "दबा हुआ प्लास्टिक और कीटनाशक अवशेष",
                    te: "ప్లాస్టిక్ మరియు పురుగుమందుల అవశేషాలు",
                    ml: "പ്ലാസ്റ്റിക്കും കീടനാശിനികളും നിറഞ്ഞ അവശിഷ്ടം",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Plastic residues pollute and suffocate soil ecosystems instead of nourishing them.",
                    hi: "प्लास्टिक अवशेष मिट्टी के पारिस्थितिकी तंत्र को नुकसान पहुंचाते हैं।",
                    te: "ప్లాస్టిక్ నేలను పాడుచేస్తుంది.",
                    ml: "പ്ലാസ്റ്റിക് മണ്ണിന്റെ ആരോഗ്യത്തെ നശിപ്പിക്കുന്നു.",
                  },
                },
              ],
            },
            {
              id: "q2-soil-air",
              question: {
                en: "Why are open pores (air and water channels) critical inside the soil?",
                hi: "मिट्टी के अंदर हवा और पानी के रास्ते (छिद्र) क्यों आवश्यक हैं?",
                te: "నేల లోపల గాలి మరియు నీటి రంధ్రాలు ఎందుకు అవసరం?",
                ml: "മണ്ണിലെ വായുസഞ്ചാരവും ജലവും എന്തിനാണ് ആവശ്യമായി വരുന്നത്?",
              },
              xp: 7,
              options: [
                {
                  id: "opt-2a",
                  text: {
                    en: "They allow plant roots to breathe and absorb dissolved moisture and nutrients",
                    hi: "वे पौधों की जड़ों को सांस लेने और नमी व पोषक तत्व सोखने में मदद करते हैं",
                    te: "ఇవి వేర్లు శ్వాస తీసుకోవడానికి మరియు పోషకాలను పీల్చుకోవడానికి సహాయపడతాయి",
                    ml: "വേരുകൾക്ക് ശ്വസിക്കാനും വെള്ളവും വളവും വലിച്ചെടുക്കാനും സഹായിക്കുന്നു",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! Plant roots and beneficial microbes need oxygen and water pathways to stay alive and thrive.",
                    hi: "बिल्कुल सही! जड़ों और लाभकारी रोगाणुओं को जीवित रहने के लिए ऑक्सीजन और पानी की आवश्यकता होती है।",
                    te: "సరిగ్గా చెప్పారు! వేర్లు మరియు సూక్ష్మజీవులు బతకడానికి ఆక్సిజన్ మరియు నీరు అవసరం.",
                    ml: "ശരിയാണ്! വേരുകൾക്കും സൂക്ഷ്മജീവികൾക്കും ജീവിക്കാൻ വായുവും വെള്ളവും ആവശ്യമാണ്.",
                  },
                },
                {
                  id: "opt-2b",
                  text: {
                    en: "They make the ground collapse and prevent plants from standing upright",
                    hi: "वे जमीन को कमजोर कर देते हैं जिससे पौधे गिर जाते हैं",
                    te: "ఇవి నేలను బలహీనపరిచి మొక్కలు పడిపోయేలా చేస్తాయి",
                    ml: "ഇവ മണ്ണിലെ ബലം കുറച്ച് ചെടികൾ വീണുപോകാൻ കാരണമാകുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Good soil structure with crumb pores actually anchors roots firmly.",
                    hi: "भुरभुरी मिट्टी की संरचना जड़ों को मजबूती से पकड़ने में मदद करती है।",
                    te: "మంచి నేల నిర్మాణం వేర్లను గట్టిగా పట్టి ఉంచుతుంది.",
                    ml: "നല്ല മണ്ണിലെ ഘടന വേരുകൾക്ക് ഉറപ്പ് നൽകുന്നു.",
                  },
                },
                {
                  id: "opt-2c",
                  text: {
                    en: "They evaporate all water immediately leaving the soil bone dry",
                    hi: "वे तुरंत सारा पानी सुखा देते हैं जिससे जमीन बंजर हो जाती है",
                    te: "ఇవి నేలలోని నీటిని వెంటనే ఆవిరి చేస్తాయి",
                    ml: "ഇവ വെള്ളമെല്ലാം പെട്ടെന്ന് വറ്റിച്ചു കളയുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Pores act like a sponge, storing capillary moisture for dry periods.",
                    hi: "छिद्र स्पंज की तरह काम करते हैं और सूखे के समय नमी बनाए रखते हैं।",
                    te: "రంధ్రాలు స్పాంజ్ లాగా పనిచేసి తేమను నిల్వ చేస్తాయి.",
                    ml: "മണ്ണിലെ സുഷിരങ്ങൾ സ്പോഞ്ച് പോലെ ഈർപ്പം ശേഖരിച്ചു വെക്കുന്നു.",
                  },
                },
                {
                  id: "opt-2d",
                  text: {
                    en: "They attract harmful rodents and underground pests",
                    hi: "वे हानिकारक चूहों और कीटों को आकर्षित करते हैं",
                    te: "ఇవి హానికరమైన కీటకాలను ఆకర్షిస్తాయి",
                    ml: "ഇവ ഉപദ്രവകാരികളായ ജീവികളെ ആകർഷിക്കുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Micro-pores are microscopic channels for roots and water, not large rodent holes.",
                    hi: "सूक्ष्म छिद्र जड़ों और पानी के लिए होते हैं, कीटों के लिए नहीं।",
                    te: "సూక్ష్మ రంధ్రాలు వేర్లు మరియు నీటి ప్రవాహానికి మాత్రమే ఉపయోగపడతాయి.",
                    ml: "സൂക്ഷ്മ സുഷിരങ്ങൾ വേരുകൾക്കും ജലത്തിനും വേണ്ടിയുള്ളതാണ്.",
                  },
                },
              ],
            },
          ],
        },

        // Phase 3: Reward
        {
          type: "reward",
          id: "soil-level-1-reward",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-1"]?.["soil-level-1-reward-dialogue"],
          xp: 20,
          badgeTitle: { en: "Soil Explorer", hi: "मृदा खोजकर्ता", te: "నేల అన్వేషకుడు", ml: "മണ്ണ് അറിവ്" },
          badgeIcon: "eco",
          badgeDescription: { en: "Mastered fundamental soil components & living ecosystem.", hi: "मिट्टी के बुनियादी घटकों में महारत हासिल की।", te: "నేల ప్రాథమిక అంశాలను తెలుసుకున్నారు.", ml: "മണ്ണിന്റെ ഘടകങ്ങളെക്കുറിച്ച് പഠിച്ചു." },
          taraDialogue: { en: "Wonderful job! You've learned what makes up healthy soil!", hi: "शानदार काम! आपने सीख लिया है कि स्वस्थ मिट्टी किससे बनती है!", te: "చాలా బాగుంది! ఆరోగ్యకరమైన నేల గురించి తెలుసుకున్నారు!", ml: "മികച്ച മുന്നേറ്റം!" },
          taraExpression: "excited",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 2: SOIL IS ALIVE (4 PHASES)
    // ─────────────────────────────────────────────
    {
      id: "soil-level-2",
      levelNumber: 2,
      title: {
        en: "Soil Is Alive",
        hi: "मिट्टी जीवित है",
        te: "నేల సజీవమైనది",
        ml: "മണ്ണ് ജീവനുള്ളതാണ്",
      },
      subtitle: {
        en: "Discover the living ecosystem beneath your feet",
        hi: "अपने पैरों के नीचे जीवित पारिस्थितिकी तंत्र की खोज करें",
        te: "మీ పాదాల కింద ఉన్న సజీవ పర్యావరణాన్ని కనుగొనండి",
        ml: "ഭൂമിക്കടിയിലെ ജീവന്റെ ലോകത്തെ അറിയുക",
      },
      durationMinutes: 4,
      xpReward: 80,
      phases: [
        // Phase 1: Concept Cards
        {
          type: "conceptCards",
          id: "soil-alive-concept-cards",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-2"]?.["soil-alive-concept-cards-dialogue"],
          title: { en: "Soil Is Alive", hi: "मिट्टी जीवित है", te: "నేల సజీవమైనది", ml: "മണ്ണ് ജീവനുള്ളതാണ്" },
          taraDialogue: {
            en: "Look at the soil beneath your feet. It may seem quiet and still, but it is full of life! Tiny organisms, earthworms, plant roots, air, water, and organic matter all interact inside the soil.",
            hi: "अपने पैरों के नीचे की मिट्टी को देखें। यह शांत लग सकती है, लेकिन यह जीवन से भरी है!",
            te: "మీ పాదాల కింద ఉన్న నేలను చూడండి. ఇది నిశ్శబ్దంగా కనిపించవచ్చు, కానీ జీవంతో నిండి ఉంది!",
            ml: "നിങ്ങളുടെ കാലിനടിയിലെ മണ്ണ് കാണുക. അത് ജീവനില്ലാത്തതല്ല, മറിച്ച് അനേകം സൂക്ഷ്മജീവികളുടെ വീടാണ്!",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "SOIL ECOSYSTEM", hi: "मृदा पारिस्थितिकी", te: "నేల పర్యావరణం", ml: "മണ്ണ് പരിസ്ഥിതി" },
            title: { en: "Soil is a Living Community", hi: "मिट्टी एक जीवित समुदाय है", te: "నేల ఒక సజీవ సమాజం", ml: "മണ്ണ് ജീവനുള്ള ഒരു കൂട്ടായ്മയാണ്" },
            description: {
              en: "Soil contains many living organisms interacting with roots and organic material to create a thriving living system.",
              hi: "मिट्टी में कई जीवित जीव होते हैं जो जड़ों और जैविक पदार्थों के साथ मिलकर एक समृद्ध प्रणाली बनाते हैं।",
              te: "నేలలో అనేక జీవులు వేర్లతో కలిసి సమృద్ధిగా పనిచేస్తాయి.",
              ml: "മണ്ണിലെ ജീവികൾ വേരുകളോടും ജൈവാംശങ്ങളോടും ചേർന്ന് പ്രവർത്തിക്കുന്നു.",
            },
            bulletPoints: [
              {
                title: { en: "Living Community", hi: "जीवित समुदाय", te: "సజీవ సమాజం", ml: "ജീവനുള്ള ലോകം" },
                text: { en: "Soil contains microscopic organisms to earthworms interacting together.", hi: "सूक्ष्मजीव और केंचुए भूमिगत रूप से परस्पर क्रिया करते हैं।", te: "భూమి లోపల జీవులు నిరంతరం పనిచేస్తాయి.", ml: "സൂക്ഷ്മജീവികൾ മണ്ണിൽ സജീവമായി പ്രവർത്തിക്കുന്നു." },
                icon: "public",
              },
              {
                title: { en: "Channels & Air", hi: "रास्ते और हवा", te: "గాలి & నీటి మార్గాలు", ml: "വായു സഞ്ചാര പാതകൾ" },
                text: { en: "Earthworms and root systems move through the soil, mixing nutrients.", hi: "केंचुए और जड़ें मिट्टी में घूमते हैं और पोषक तत्वों को मिलाते हैं।", te: "వానపాములు నేలను గుల్లగా చేసి గాలి వెళ్లేలా చేస్తాయి.", ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ ഇളക്കി വായുസഞ്ചാരം കൂട്ടുന്നു." },
                icon: "waves",
              },
              {
                title: { en: "Nutrient Recycling", hi: "पोषक तत्व पुनर्चक्रण", te: "పోషకాల రీసైక్లింగ్", ml: "പോഷക പുനരുപയോഗം" },
                text: { en: "Microorganisms break down plant materials into natural fertility.", hi: "सूक्ष्मजीव पौधों की सामग्री को प्राकृतिक उर्वरता में बदलते हैं।", te: "సూక్ష్మజీవులు వ్యర్థాలను కుళ్ళింపజేసి బలాన్నిస్తాయి.", ml: "സൂക്ഷ്മജീവികൾ ജൈവവസ്തുക്കളെ വളമാക്കി മാറ്റുന്നു." },
                icon: "eco",
              },
            ],
          },
          cards: [
            {
              id: "card-soil-alive",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-2"]?.["soil-alive-concept-cards-card-card-soil-alive"],
              title: { en: "Soil Is Alive", hi: "मिट्टी जीवित है", te: "నేల సజీవమైనది", ml: "മണ്ണ് ജീവനുള്ളതാണ്" },
              icon: "public",
              color: "#4CAF50",
              taraDialogue: { en: "What looks like ordinary soil can actually be a busy little world!", hi: "जो साधारण मिट्टी दिखती है, वह वास्तव में एक व्यस्त दुनिया हो सकती है!", te: "సాధారణంగా కనిపించే నేల లోపల ఒక పెద్ద జీవ ప్రపంచం ఉంది!", ml: "സാധാരണ മണ്ണെന്ന് തോന്നുന്നിടത്ത് വലിയൊരു ജീവലോകമുണ്ട്!" },
            },
            {
              id: "card-earthworms",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-2"]?.["soil-alive-concept-cards-card-card-earthworms"],
              title: { en: "Meet the Earthworm", hi: "केंचुए से मिलें", te: "వానపాము", ml: "ഞാഞ്ഞൂൽ" },
              icon: "waves",
              color: "#8D6E63",
              taraDialogue: { en: "These little soil explorers spend their lives burrowing and creating channels in the ground.", hi: "ये छोटे जीव जमीन में रास्ते बनाकर हवा और पानी का प्रवाह आसान करते हैं।", te: "ఇవి నేలలో రంధ్రాలు చేసి గాలి, నీరు వెళ్ళేలా చేస్తాయి.", ml: "ഇവ മണ്ണിൽ തുരങ്കങ്ങളുണ്ടാക്കി വായുസഞ്ചാരം കൂട്ടുന്നു." },
            },
            {
              id: "card-microorganisms",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-2"]?.["soil-alive-concept-cards-card-card-microorganisms"],
              title: { en: "The Tiny Workers", hi: "सूक्ष्म श्रमिक", te: "సూక్ష్మజీవులు", ml: "സൂക്ഷ്മ പ്രവർത്തകർ" },
              icon: "scatter-plot",
              color: "#0284C7",
              taraDialogue: { en: "Some of the most important soil workers are so tiny that we can't see them with our eyes!", hi: "सबसे महत्वपूर्ण कार्यकर्ता इतने छोटे हैं कि हम उन्हें अपनी आंखों से नहीं देख सकते!", te: "కంటికి కనిపించని సూక్ష్మజీవులు ఎంతో మేలు చేస్తాయి!", ml: "നഗ്നനേത്രങ്ങൾ കൊണ്ട് കാണാനാവാത്ത സൂക്ഷ്മജീവികൾ മണ്ണിൽ അത്ഭുതങ്ങൾ ചെയ്യുന്നു!" },
            },
            {
              id: "card-organic-matter",
              title: { en: "Food for the Soil", hi: "मिट्टी का भोजन", te: "నేలకు ఆహారం", ml: "മണ്ണിനുള്ള ഭക്ഷണം" },
              icon: "compost",
              color: "#795548",
              taraDialogue: { en: "The leaves and plant materials that return to the soil become food for soil life.", hi: "मिट्टी में लौटने वाले पत्ते और अवशेष मिट्टी के जीवों का भोजन बन जाते हैं।", te: "ఆకులు మరియు వ్యర్థాలు నేలలోని జీవులకు ఆహారంగా మారతాయి.", ml: "മണ്ണിൽ വീഴുന്ന ഇലകൾ ജീവികൾക്ക് ആഹാരമായി മാറുന്നു." },
            },
            {
              id: "card-soil-community",
              title: { en: "Everyone Has a Role", hi: "सबकी अपनी भूमिका", te: "అందరి బాధ్యత", ml: "എല്ലാവർക്കും പങ്കുണ്ട്" },
              icon: "hub",
              color: "#F59E0B",
              taraDialogue: { en: "Soil health isn't about one hero. It's about the whole community working together!", hi: "मिट्टी का स्वास्थ्य पूरे समुदाय के मिलकर काम करने पर निर्भर करता है!", te: "నేల ఆరోగ్యం అనేది అందరూ కలిసి పనిచేయడం పై ఆధారపడి ఉంటుంది!", ml: "മണ്ണ് ആരോഗ്യം എന്നത് എല്ലാവരും ഒത്തൊരുമിച്ച് പ്രവർത്തിക്കുന്നതാണ്!" },
            },
          ],
        },

        // Phase 2: Match-Up Game
        {
          type: "match",
          id: "soil-alive-matchup",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-2"]?.["soil-alive-matchup-dialogue"],
          taraSuccessAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-2"]?.["soil-alive-matchup-success"],
          title: { en: "Who Does What?", hi: "कौन क्या करता है?", te: "ఎవరు ఏమి చేస్తారు?", ml: "ആര് എന്ത് ചെയ്യുന്നു?" },
          instructions: { en: "Connect each soil friend with their role in the community.", hi: "प्रत्येक जीव को उसके कार्य से मिलाएं।", te: "సరైన పాత్రతో జతపరచండి.", ml: "യോജിച്ചവ തമ്മിൽ ചേർക്കുക." },
          xp: 30,
          taraDialogue: { en: "Who does what in the soil? Tap a soil friend on the left, then connect their role on the right!", hi: "बाईं ओर के जीव को दाईं ओर के सही कार्य से जोड़ें!", te: "ఎడమ వైపు ఉన్న జీవిని కుడి వైపు పనితో జత చేయండి!", ml: "യോജിച്ച ജോടികളെ കണ്ടെത്തുക!" },
          taraExpression: "happy",
          taraSuccessDialogue: { en: "You just met some of the important members of the soil community!", hi: "आपने मिट्टी के महत्वपूर्ण सदस्यों को पहचान लिया!", te: "మీరు నేల స్నేహితులను సరిగ్గా గుర్తించారు!", ml: "വളരെ നന്നായിരിക്കുന്നു!" },
          pairs: [
            {
              id: "pair-earthworm",
              leftText: { en: "Earthworm", hi: "केंचुआ", te: "వానపాము", ml: "ഞാഞ്ഞൂൽ" },
              rightText: { en: "Creates channels / aerates soil", hi: "रास्ते बनाता है / हवा का प्रवाह करता है", te: "గాలి, నీటి మార్గాలను చేస్తుంది", ml: "വായു സഞ്ചാര പാതകൾ ഉണ്ടാക്കുന്നു" },
            },
            {
              id: "pair-microorganisms",
              leftText: { en: "Microorganisms", hi: "सूक्ष्मजीव", te: "సూక్ష్మజీవులు", ml: "സൂക്ഷ്മജീവികൾ" },
              rightText: { en: "Help break down organic materials", hi: "जैविक पदार्थों को तोड़ते हैं", te: "సేంద్రీయ పదార్థాన్ని కుళ్ళింపజేస్తుంది", ml: "ജൈവവസ്തുക്കളെ വിഘടിപ്പിക്കുന്നു" },
            },
            {
              id: "pair-roots",
              leftText: { en: "Plant roots", hi: "पौधों की जड़ें", te: "మొక్కల వేర్లు", ml: "സസ്യങ്ങളുടെ വേരുകൾ" },
              rightText: { en: "Take up water and nutrients", hi: "पानी और पोषक तत्व सोखती हैं", te: "నీరు మరియు పోషకాలను తీసుకుంటాయి", ml: "വെള്ളവും പോഷകങ്ങളും ആഗിരണം ചെയ്യുന്നു" },
            },
            {
              id: "pair-organic",
              leftText: { en: "Organic matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" },
              rightText: { en: "Provides food for soil life", hi: "मिट्टी के जीवन के लिए भोजन देता है", te: "జీవులకు ఆహారాన్ని అందిస్తుంది", ml: "ജീവികൾക്ക് ഭക്ഷണം നൽകുന്നു" },
            },
          ],
        },

                // Phase 3: MCQ Quiz (2 Questions, 4 Options Each)
        {
          type: "mcq",
          id: "soil-level-2-mcq",
          totalXp: 15,
          questions: [
            {
              id: "q1-living-soil",
              question: {
                en: "Why is fertile soil classified as a living ecosystem rather than just dirt?",
                hi: "उपजाऊ मिट्टी को केवल धूल मानने के बजाय एक जीवित पारिस्थितिकी तंत्र क्यों माना जाता है?",
                te: "సారవంతమైన నేలను కేవలం మట్టిగా కాకుండా సజీవ పర్యావరణంగా ఎందుకు పరిగణిస్తారు?",
                ml: "ഫലഭൂയിഷ്ഠമായ മണ്ണിനെ വെറുമൊരു മണ്ണായി കാണാതെ ജീവനുള്ള ഒരു വ്യവസ്ഥയായി കാണുന്നത് എന്തുകൊണ്ട്?",
              },
              xp: 8,
              options: [
                {
                  id: "opt-l2-1a",
                  text: {
                    en: "It is teeming with earthworms, mycorrhizal fungi, and billions of microbes actively recycling nutrients",
                    hi: "यह केंचुओं, कवक और करोड़ों सूक्ष्मजीवों से भरी होती है जो सक्रिय रूप से पोषक तत्वों का चक्रण करते हैं",
                    te: "ఇది వానపాములు, శిలీంధ్రాలు మరియు కోట్లాది సూక్ష్మజీవులతో నిండి ఉండి పోషకాలను అందిస్తుంది",
                    ml: "ഞാഞ്ഞൂലുകൾ, ഫംഗസുകൾ, കോടിക്കണക്കിന് സൂക്ഷ്മജീവികൾ എന്നിവ മണ്ണിൽ സജീവമായി പ്രവർത്തിക്കുന്നു",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! One teaspoon of healthy soil contains more living microorganisms than there are people on Earth!",
                    hi: "बिल्कुल सही! स्वस्थ मिट्टी के एक चम्मच में पृथ्वी की कुल मानव आबादी से भी अधिक सूक्ष्मजीव होते हैं!",
                    te: "సరిగ్గా చెప్పారు! ఒక చెంచా ఆరోగ్యకరమైన నేలలో భూమిపై ఉన్న మనుషుల కంటే ఎక్కువ సూక్ష్మజీవులు ఉంటాయి!",
                    ml: "ശരിയാണ്! ഒരു സ്പൂൺ നല്ല മണ്ണിൽ ലോകത്തിലെ ജനങ്ങളേക്കാൾ കൂടുതൽ സൂക്ഷ്മജീവികളുണ്ട്!",
                  },
                },
                {
                  id: "opt-l2-1b",
                  text: {
                    en: "It can walk and move physically across farm fields on its own",
                    hi: "यह खेतों में अपने आप चलकर एक जगह से दूसरी जगह जा सकती है",
                    te: "ఇది పొలంలో తనంతట తాను కదలగలదు",
                    ml: "ഇതിന് സ്വന്തമായി ഒരിടത്തുനിന്ന് മറ്റൊരിടത്തേക്ക് നീങ്ങാൻ കഴിയും",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Soil does not move on its own; it is called living because of the organisms residing inside it.",
                    hi: "मिट्टी स्वयं नहीं चलती; इसे इसके अंदर रहने वाले जीवों के कारण जीवित कहा जाता है।",
                    te: "నేల కదలదు; అందులోని జీవుల వల్ల దాన్ని సజీవమైనది అంటారు.",
                    ml: "മണ്ണ് സഞ്ചരിക്കില്ല; അതിലെ ജീവജാലങ്ങൾ കാരണമാണ് അതിനെ ജീവനുള്ളത് എന്ന് പറയുന്നത്.",
                  },
                },
                {
                  id: "opt-l2-1c",
                  text: {
                    en: "It contains only artificial synthetic chemical nutrients injected in factories",
                    hi: "इसमें केवल कारखानों में बने कृत्रिम रासायनिक पोषक तत्व होते हैं",
                    te: "ఇందులో కేవలం ఫ్యాక్టరీలలో తయారుచేసిన రసాయనాలు మాత్రమే ఉంటాయి",
                    ml: "ഫാക്ടറികളിൽ ഉണ്ടാക്കുന്ന കൃത്രിമ രാസവസ്തുക്കൾ മാത്രമാണ് ഇതിലുള്ളത്",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Living soil relies on natural biological cycles and organic decomposition.",
                    hi: "जीवित मिट्टी प्राकृतिक जैविक चक्रों और सड़न पर निर्भर करती है।",
                    te: "సజీవ నేల సహజ జీవక్రియలపై ఆధారపడుతుంది.",
                    ml: "സ്വാഭാവിക ജൈവ പ്രക്രിയകളിലൂടെയാണ് മണ്ണ് ജീവസ്സുറ്റതാകുന്നത്.",
                  },
                },
                {
                  id: "opt-l2-1d",
                  text: {
                    en: "It is composed entirely of dry solid rock without any air or pores",
                    hi: "यह बिना किसी हवा या छिद्र के पूरी तरह से ठोस चट्टान से बनी होती है",
                    te: "ఇది గాలి లేని గట్టి రాతి పొరలతో మాత్రమే ఉంటుంది",
                    ml: "വായു സഞ്ചാരമില്ലാത്ത കട്ടിയുള്ള പാറക്കഷണങ്ങൾ മാത്രമാണിത്",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Solid rock without pores or moisture cannot support living biological communities.",
                    hi: "बिना छिद्रों वाली ठोस चट्टान में जैविक समुदाय जीवित नहीं रह सकते।",
                    te: "రంధ్రాలు లేని రాతిలో జీవులు బతకలేవు.",
                    ml: "സുഷിരങ്ങളില്ലാത്ത പാറകളിൽ ജീവജാലങ്ങൾക്ക് നിലനിൽക്കാനാവില്ല.",
                  },
                },
              ],
            },
            {
              id: "q2-earthworms",
              question: {
                en: "How do earthworms benefit crop growth and soil structure underground?",
                hi: "केंचुए भूमिगत रूप से फसल की वृद्धि और मिट्टी की संरचना को कैसे लाभ पहुंचाते हैं?",
                te: "వానపాములు పంటల పెరుగుదలకు మరియు నేల నిర్మాణానికి ఎలా ఉపయోగపడతాయి?",
                ml: "ഞാഞ്ഞൂലുകൾ ചെടികളുടെ വളർച്ചയ്ക്കും മണ്ണിന്റെ ഘടനയ്ക്കും എങ്ങനെയാണ് ഗുണം ചെയ്യുന്നത്?",
              },
              xp: 7,
              options: [
                {
                  id: "opt-l2-2a",
                  text: {
                    en: "They dig aeration tunnels that let roots breathe and produce rich humus vermicompost",
                    hi: "वे हवा के रास्ते बनाते हैं जिससे जड़ें सांस लेती हैं और समृद्ध वर्मीकम्पोस्ट पैदा करते हैं",
                    te: "ఇవి రంధ్రాలు చేసి వేర్లకు గాలి అందిస్తాయి మరియు సారవంతమైన ఎరువును తయారు చేస్తాయి",
                    ml: "മണ്ണിൽ തുരങ്കങ്ങളുണ്ടാക്കി വായുസഞ്ചാരം കൂട്ടുകയും മികച്ച ജൈവവളം ഉൽപ്പാദിപ്പിക്കുകയും ചെയ്യുന്നു",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! Earthworms are natural underground plows that aerate the soil and enrich it with organic castings.",
                    hi: "बिल्कुल सही! केंचुए प्राकृतिक हल की तरह काम करते हैं और मिट्टी को उपजाऊ बनाते हैं।",
                    te: "సరిగ్గా చెప్పారు! వానపాములు నేలను గుల్లగా చేసి సహజ ఎరువును అందిస్తాయి.",
                    ml: "ശരിയാണ്! ഞാഞ്ഞൂലുകൾ മണ്ണിനെ ഇളക്കി ഫലഭൂയിഷ്ഠമാക്കുന്നു.",
                  },
                },
                {
                  id: "opt-l2-2b",
                  text: {
                    en: "They chew and destroy live green plant roots causing crops to wilt",
                    hi: "वे जीवित जड़ों को चबाकर नष्ट कर देते हैं जिससे फसल सूख जाती है",
                    te: "ఇవి పచ్చి వేర్లను తిని పంటలను నాశనం చేస్తాయి",
                    ml: "ഇവ ചെടികളുടെ പച്ച വേരുകൾ തിന്ന് നശിപ്പിക്കുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Earthworms feed on decaying dead matter and microbes, not healthy live roots.",
                    hi: "केंचुए सड़े-गले पत्तों को खाते हैं, जीवित जड़ों को नुकसान नहीं पहुंचाते।",
                    te: "వానపాములు కుళ్ళిన వ్యర్థాలను మాత్రమే తింటాయి.",
                    ml: "ഞാഞ്ഞൂലുകൾ ഉണങ്ങിയ സസ്യ അവശിഷ്ടങ്ങൾ മാത്രമാണ് കഴിക്കുന്നത്.",
                  },
                },
                {
                  id: "opt-l2-2c",
                  text: {
                    en: "They compact the soil into hard solid stone slabs",
                    hi: "वे मिट्टी को दबाकर कठोर पत्थर जैसी बना देते हैं",
                    te: "ఇవి నేలను గట్టి రాయిలా మారుస్తాయి",
                    ml: "ഇവ മണ്ണിനെ കട്ടിയുള്ള പാറപോലെ ആക്കി മാറ്റുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Earthworms loosen and aerate the soil, preventing compaction.",
                    hi: "केंचुए मिट्टी को भुरभुरा बनाते हैं, कठोर नहीं।",
                    te: "వానపాములు నేలను మెత్తగా చేస్తాయి.",
                    ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ മൃദുവാക്കുകയാണ് ചെയ്യുന്നത്.",
                  },
                },
                {
                  id: "opt-l2-2d",
                  text: {
                    en: "They poison the groundwater with harmful chemical salts",
                    hi: "वे हानिकारक रसायनों से भूजल को जहरीला बना देते हैं",
                    te: "ఇవి భూగర్భ జలాలను విషపూరితం చేస్తాయి",
                    ml: "ഇവ ഭൂഗർഭജലത്തെ മലിനമാക്കുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Earthworm casts are 100% natural, clean, and purify the soil environment.",
                    hi: "केंचुओं की खाद पूरी तरह से प्राकृतिक और लाभकारी होती है।",
                    te: "వానపాముల వ్యర్థాలు పూర్తిగా సహజమైనవి మరియు నేలకు ఎంతో మంచివి.",
                    ml: "ഞാഞ്ഞൂൽ വളം പ്രകൃതിദത്തവും മണ്ണിന് അതീവ ഗുണകരവുമാണ്.",
                  },
                },
              ],
            },
          ],
        },

        // Phase 4: Reward
        {
          type: "reward",
          id: "soil-alive-reward",
          xp: 80,
          badgeTitle: { en: "Life in the Soil", hi: "मिट्टी में जीवन", te: "నేలలో జీవం", ml: "മണ്ണിലെ ജീവൻ" },
          badgeIcon: "eco",
          taraDialogue: { en: "Great work! You now understand living soil!", hi: "शानदार काम! अब आप जीवित मिट्टी को समझ गए हैं!", te: "అద్భుతం! మీరు సజీవ నేలను అర్థం చేసుకున్నారు!", ml: "മികച്ച മുന്നേറ്റം!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 3: WHAT MAKES SOIL HEALTHY? (4 PHASES)
    // ─────────────────────────────────────────────
    {
      id: "soil-level-3",
      levelNumber: 3,
      title: {
        en: "What Makes Soil Healthy?",
        hi: "स्वस्थ मिट्टी क्या है?",
        te: "నేలను ఆరోగ్యంగా ఉంచేది ఏమిటి?",
        ml: "മണ്ണിനെ ആരോഗ്യകരമാക്കുന്നത് എന്താണ്?",
      },
      subtitle: {
        en: "Explore structure, water, air, and the clues of healthy soil",
        hi: "संरचना, पानी, हवा और स्वस्थ मिट्टी के संकेतों को जानें",
        te: "నేల నిర్మాణం, నీరు, గాలి మరియు ఆరోగ్య సంకేతాలను తెలుసుకోండి",
        ml: "മണ്ണിന്റെ ഘടനയും വായുവും ഈർപ്പവും മനസ്സിലാക്കുക",
      },
      durationMinutes: 6,
      xpReward: 90,
      phases: [
        // Phase 1: Concept Cards
        {
          type: "conceptCards",
          id: "soil-healthy-concept-cards",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-3"]?.["soil-healthy-concept-cards-dialogue"],
          title: { en: "What Makes Soil Healthy?", hi: "स्वस्थ मिट्टी क्या है?", te: "నేలను ఆరోగ్యంగా ఉంచేది ఏమిటి?", ml: "മണ്ണിനെ ആരോഗ്യകരമാക്കുന്നത് എന്താണ്?" },
          taraDialogue: {
            en: "Healthy soil isn't just about chemicals or fertilizer. It's about balance! Good structure gives roots room to grow. Pore spaces hold both water and air. Organic matter feeds the living community.",
            hi: "स्वस्थ मिट्टी सिर्फ उर्वरकों के बारे में नहीं है, यह संतुलन के बारे में है! अच्छी संरचना जड़ों को बढ़ने देती है।",
            te: "ఆరోగ్యకరమైన నేల అంటే సమతుల్యత! మంచి నిర్మాణం వేర్లకు బలాన్నిస్తుంది.",
            ml: "ആരോഗ്യമുള്ള മണ്ണ് എന്നാൽ ശരിയായ സന്തുലിതാവസ്ഥയാണ്!",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "SOIL HEALTH CLUES", hi: "मृदा स्वास्थ्य संकेत", te: "నేల ఆరోగ్య సంకేతాలు", ml: "മണ്ണ് ആരോഗ്യ ലക്ഷണങ്ങൾ" },
            title: { en: "The 5 Pillars of Soil Health", hi: "मृदा स्वास्थ्य के 5 स्तंभ", te: "నేల ఆరోగ్యం యొక్క 5 స్తంభాలు", ml: "മണ്ണ് ആരോഗ്യത്തിന്റെ 5 ഘടകങ്ങൾ" },
            description: { en: "Healthy soil is an interconnected living system.", hi: "स्वस्थ मिट्टी एक दूसरे से जुड़ी जीवित प्रणाली है।", te: "ఆరోగ్యకరమైన నేల ఒక సజీవ వ్యవస్థ.", ml: "ആരോഗ്യമുള്ള മണ്ണ് ഒരു സജീവ വ്യവസ്ഥയാണ്." },
            bulletPoints: [
              {
                title: { en: "Soil Structure", hi: "मिट्टी की संरचना", te: "నేల నిర్మాణం", ml: "മണ്ണിന്റെ ഘടന" },
                text: { en: "Crumbly soil with visible pore spaces.", hi: "भुरभुरी मिट्टी जिसमें हवा के छिद्र हों।", te: "రంధ్రాలు కలిగి గుల్లగా ఉండే నేల.", ml: "വായുസഞ്ചാരമുള്ള പൊടിഞ്ഞ മണ്ണ്." },
                icon: "grid-view",
              },
              {
                title: { en: "Water & Air", hi: "पानी और हवा", te: "నీరు & గాలి", ml: "വെള്ളവും വായുവും" },
                text: { en: "Balanced moisture with oxygen channels.", hi: "हवा और पानी का सही संतुलन।", te: "తేమ మరియు గాలి సమతుల్యత.", ml: "ഈർപ്പവും വായുവും ചേർന്ന അവസ്ഥ." },
                icon: "water-drop",
              },
              {
                title: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" },
                text: { en: "Decomposed carbon sponge storing moisture.", hi: "नमी बनाए रखने वाला जैविक स्पंज।", te: "తేమను నిలిపే సేంద్రీయ పదార్థం.", ml: "ഈർപ്പം നിലനിർത്തുന്ന ജൈവാംശം." },
                icon: "compost",
              },
            ],
          },
          cards: [
            {
              id: "card-structure",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-3"]?.["soil-healthy-concept-cards-card-card-structure"],
              title: { en: "Soil Structure", hi: "मिट्टी की संरचना", te: "నేల నిర్మాణం", ml: "മണ്ണിന്റെ ഘടന" },
              icon: "grid-view",
              color: "#795548",
              taraDialogue: { en: "Soil structure creates pore channels for roots to breathe.", hi: "संरचना जड़ों के लिए हवा के रास्ते बनाती है।", te: "మంచి నిర్మాణం వేర్లు శ్వాసించడానికి సహాయపడుతుంది.", ml: "മണ്ണിന്റെ ഘടന വേരുകൾക്ക് ശ്വസിക്കാൻ ഇടം നൽകുന്നു." },
            },
            {
              id: "card-water",
              title: { en: "Water in Soil", hi: "मिट्टी में पानी", te: "నేలలో నీరు", ml: "മണ്ണിലെ ഈർപ്പം" },
              icon: "water-drop",
              color: "#0284C7",
              taraDialogue: { en: "Soil acts like a sponge, holding water for plants without suffocating roots.", hi: "मिट्टी स्पंज की तरह पानी रखती है बिना जड़ों का दम घोंटे।", te: "నేల స్పాంజ్ లాంటిది, నీటిని నిలుపుకుంటుంది.", ml: "മണ്ണ് ഒരു സ്പോഞ്ച് പോലെ വെള്ളം ശേഖരിക്കുന്നു." },
            },
            {
              id: "card-air",
              title: { en: "Air in Soil", hi: "मिट्टी में हवा", te: "నేలలో గాలి", ml: "മണ്ണിലെ വായു" },
              icon: "air",
              color: "#60A5FA",
              taraDialogue: { en: "Roots and microbes need oxygen just like we do!", hi: "जड़ों और सूक्ष्मजीवों को हमारी तरह ऑक्सीजन चाहिए!", te: "వేర్లకు మరియు సూక్ష్మజీవులకు ఆక్సిజన్ అవసరం!", ml: "വേരുകൾക്കും ജീവികൾക്കും വായു അത്യാവശ്യമാണ്!" },
            },
            {
              id: "card-organic",
              title: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీय पदार्थ", ml: "ജൈവവസ്തുക്കൾ" },
              icon: "compost",
              color: "#8D6E63",
              taraDialogue: { en: "Organic matter feeds soil organisms and improves sponge-like water holding.", hi: "जैविक पदार्थ मिट्टी के जीवों को भोजन देते हैं।", te: "సేంద్రీయ పదార్థం నేలకు బలాన్నిస్తుంది.", ml: "ജൈവവസ്തുക്കൾ മണ്ണിന്റെ ഫലഭൂയിഷ്ഠത കൂട്ടുന്നു." },
            },
            {
              id: "card-soil-life",
              title: { en: "Soil Life", hi: "मिट्टी का जीवन", te: "నేల జీవం", ml: "മണ്ണിലെ ജീവൻ" },
              icon: "biotech",
              color: "#FFA000",
              taraDialogue: { en: "Active biology is the engine turning minerals into food for crops!", hi: "सक्रिय जीव खनिजों को पौधों के भोजन में बदलते हैं!", te: "నేలలోని జీవులు పంటలకు పోషకాలను అందిస్తాయి!", ml: "മണ്ണിലെ ജീവികൾ സസ്യങ്ങൾക്ക് പോഷകങ്ങൾ ലഭ്യമാക്കുന്നു!" },
            },
          ],
        },

        // Phase 2: Scenario Challenge ("Choose the Better Soil")
        {
          type: "scenarioChallenge",
          id: "soil-healthy-challenge",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-3"]?.["soil-healthy-challenge-dialogue"],
          taraSuccessAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-3"]?.["soil-healthy-challenge-success"],
          title: { en: "Choose the Better Soil", hi: "बेहतर मिट्टी चुनें", te: "మంచి నేలను ఎంచుకోండి", ml: "മികച്ച മണ്ണ് തിരഞ്ഞെടുക്കുക" },
          subtitle: { en: "Healthy Soil Challenge", hi: "स्वस्थ मिट्टी चुनौती", te: "ఆరోగ్యకరమైన నేల సవాలు", ml: "മണ്ണ് ചലഞ്ച്" },
          instructions: { en: "Compare the situations and tap the option that shows healthier soil conditions.", hi: "विकल्पों की तुलना करें और बेहतर मिट्टी चुनें।", te: "మంచి నేల లక్షణాన్ని ఎంచుకోండి.", ml: "ശരിയായ സാഹചര്യം തിരഞ്ഞെടുക്കുക." },
          xp: 30,
          taraDialogue: { en: "Can you spot the signs of healthy soil? Choose the better option in each situation!", hi: "क्या आप स्वस्थ मिट्टी के संकेतों को पहचान सकते हैं?", te: "ఆరోగ్యకరమైన నేల సంకేతాలను గుర్తించగలరా?", ml: "നല്ല മണ്ണിന്റെ ലക്ഷണങ്ങൾ കണ്ടെത്താമോ?" },
          taraSuccessDialogue: { en: "Great job! You have a keen eye for healthy soil conditions!", hi: "बहुत बढ़िया! आपने स्वस्थ मिट्टी को पहचान लिया!", te: "చాలా బాగా గుర్తించారు!", ml: "മികച്ച വിജയം!" },
          rounds: [
            {
              id: "round-1-structure",
              roundNumber: 1,
              topic: { en: "Structure", hi: "संरचना", te: "నిర్మాణం", ml: "ഘടന" },
              prompt: { en: "Which soil gives roots more room to grow?", hi: "कौन सी मिट्टी जड़ों को बढ़ने के लिए अधिक जगह देती है?", te: "ఏ నేల వేర్లు పెరగడానికి ఎక్కువ స్థలాన్ని ఇస్తుంది?", ml: "വേരുകൾ വളരാൻ കൂടുതൽ ഇടം നൽകുന്നത് ഏത് മണ്ണാണ്?" },
              options: [
                {
                  id: "opt-r1-a",
                  label: "A",
                  title: { en: "Very compact, hard soil", hi: "कठोर मिट्टी", te: "గట్టి నేల", ml: "കട്ടിയുള്ള മണ്ണ്" },
                  text: { en: "Very compact, hard soil", hi: "बहुत कठोर, कड़क मिट्टी", te: "చాలా గట్టిపడిన నేల", ml: "വളരെ കട്ടിയുള്ള മണ്ണ്" },
                  isCorrect: false,
                  explanation: { en: "Compact soil restricts root penetration and reduces pore spaces.", hi: "कठोर मिट्टी जड़ों को फैलने नहीं देती।", te: "గట్టి నేలలో వేర్లు సరిగ్గా పెరగలేవు.", ml: "കട്ടിയുള്ള മണ്ണിൽ വേരുകൾക്ക് ഇറങ്ങാൻ പ്രയാസമാണ്." },
                },
                {
                  id: "opt-r1-b",
                  label: "B",
                  title: { en: "Soil with visible pore spaces", hi: "भुरभुरी मिट्टी", te: "గుల్ల నేల", ml: "പൊടിഞ്ഞ മണ്ണ്" },
                  text: { en: "Soil with visible spaces and crumbly texture", hi: "भुरभुरी मिट्टी जिसमें हवा के छिद्र हों", te: "గుల్లగా రంధ్రాలు ఉన్న నేల", ml: "വായു സഞ്ചാരമുള്ള പൊടിഞ്ഞ മണ്ണ്" },
                  isCorrect: true,
                  explanation: { en: "Crumbly soil with pore spaces lets roots grow freely!", hi: "भुरभुरी मिट्टी जड़ों को स्वतंत्र रूप से बढ़ने देती है!", te: "గుల్ల నేలలో వేర్లు బలంగా పెరుగుతాయి!", ml: "പൊടിഞ്ഞ മണ്ണിൽ വേരുകൾ നന്നായി പടരും!" },
                },
              ],
            },
            {
              id: "round-2-water",
              roundNumber: 2,
              topic: { en: "Water", hi: "पानी", te: "నీరు", ml: "വെള്ളം" },
              prompt: { en: "Which soil has the best balance for plant roots?", hi: "पौधों की जड़ों के लिए कौन सी मिट्टी सबसे अच्छी है?", te: "వేర్లకు ఏ పరిస్థితి అనుకూలం?", ml: "വേരുകൾക്ക് ഏറ്റവും അനുയോജ്യമായത് ഏത്?" },
              options: [
                {
                  id: "opt-r2-a",
                  label: "A",
                  title: { en: "Completely dry soil", hi: "पूरी तरह सूखी मिट्टी", te: "ఎండిపోయిన నేల", ml: "വളരെ വരണ്ട മണ്ണ്" },
                  text: { en: "Completely dry soil with zero moisture", hi: "पूरी तरह से सूखी मिट्टी", te: "తేమ లేని పొడి నేల", ml: "ഈർപ്പമില്ലാത്ത വരണ്ട മണ്ണ്" },
                  isCorrect: false,
                  explanation: { en: "Without water, plants cannot absorb essential nutrients.", hi: "बिना पानी के पौधे पोषक तत्व नहीं ले सकते।", te: "నీరు లేకపోతే పోషకాలు అందవు.", ml: "വെള്ളമില്ലാതെ ചെടികൾക്ക് ജീവിക്കാനാവില്ല." },
                },
                {
                  id: "opt-r2-b",
                  label: "B",
                  title: { en: "Moist sponge with air spaces", hi: "नमीयुक्त स्पंज जैसी", te: "తేమ & గాలి సమతుల్యత", ml: "ഈർപ്പമുള്ള മണ്ണ്" },
                  text: { en: "Soil holding some water with spaces remaining", hi: "स्पंज जैसी नमीयुक्त मिट्टी", te: "తగినంత తేమ ఉన్న గుల్ల నేల", ml: "ഈർപ്പവും വായുവും ഉള്ള മണ്ണ്" },
                  isCorrect: true,
                  explanation: { en: "This ideal balance provides both moisture and oxygen for roots!", hi: "यह संतुलन जड़ों को पानी और हवा दोनों देता है!", te: "ఇది వేర్లకు తేమ, గాలి రెండింటినీ ఇస్తుంది!", ml: "ഇത് ചെടികൾക്ക് വളരെ അനുയോജ്യമാണ്!" },
                },
              ],
            },
            {
              id: "round-3-organic",
              roundNumber: 3,
              topic: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" },
              prompt: { en: "Which soil has a visible source of organic material?", hi: "किस मिट्टी में जैविक पदार्थ का स्रोत है?", te: "సేంద్రీయ పదార్థం ఉన్న నేల ఏది?", ml: "ജൈവാംശമുള്ള മണ്ണ് ഏതാണ്?" },
              options: [
                {
                  id: "opt-r3-a",
                  label: "A",
                  title: { en: "Bare, exposed soil", hi: "खुली बंजर मिट्टी", te: "ఖాళీ నేల", ml: "തുറന്ന മണ്ണ്" },
                  text: { en: "Bare soil with no plant residues", hi: "खुली मिट्टी बिना किसी अवशेष के", te: "ఏ ఆచ్ఛాదన లేని నేల", ml: "അവശിഷ്ടങ്ങളില്ലാത്ത മണ്ണ്" },
                  isCorrect: false,
                  explanation: { en: "Bare soil lacks protective cover and organic inputs.", hi: "खुली मिट्टी में जैविक पदार्थों की कमी होती है।", te: "ఖాళీ నేలలో సేంద్రీయ బలం ఉండదు.", ml: "ഇതിൽ ജൈവാംശം കുറവാണ്." },
                },
                {
                  id: "opt-r3-b",
                  label: "B",
                  title: { en: "Soil with plant residues", hi: "अवशेषों वाली मिट्टी", te: "వ్యర్థాలు కలిసిన నేల", ml: "ജൈവാവശിഷ്ടങ്ങളുള്ള മണ്ണ്" },
                  text: { en: "Soil covered with decomposing plant residues", hi: "पौधों के अवशेषों से ढकी मिट्टी", te: "మొక్కల వ్యర్థాలతో కప్పబడిన నేల", ml: "സസ്യ അവശിഷ്ടങ്ങൾ ചേർന്ന മണ്ണ്" },
                  isCorrect: true,
                  explanation: { en: "Plant residues protect the surface and nourish soil organisms.", hi: "अवशेष सतह की रक्षा करते हैं और जीवों को पोषण देते हैं।", te: "వ్యర్థాలు నేలకు బలాన్నిస్తాయి.", ml: "ഇത് മണ്ണിന് സംരക്ഷണവും പോഷണവും നൽകുന്നു." },
                },
              ],
            },
            {
              id: "round-4-life",
              roundNumber: 4,
              topic: { en: "Soil Life", hi: "मिट्टी का जीवन", te: "నేల జీవం", ml: "മണ്ണിലെ ജീവൻ" },
              prompt: { en: "Which is a useful clue of healthy soil activity?", hi: "सक्रिय मिट्टी का संकेत क्या है?", te: "సజీవ నేలకు సంకేతం ఏది?", ml: "ആരോഗ്യമുള്ള മണ്ണിന്റെ ലക്ഷണം ഏതാണ്?" },
              options: [
                {
                  id: "opt-r4-a",
                  label: "A",
                  title: { en: "Signs of biological activity", hi: "जैविक गतिविधि के संकेत", te: "జీవుల సంకేతాలు", ml: "ജീവികളുടെ സാന്നിധ്യം" },
                  text: { en: "Soil with earthworm castings and root networks", hi: "केंचुओं और जड़ों के संकेत वाली मिट्टी", te: "వానపాములు, వేర్ల వ్యవస్థ ఉన్న నేల", ml: "ഞാഞ്ഞൂലുകളുടെ സാന്നിധ്യമുള്ള മണ്ണ്" },
                  isCorrect: true,
                  explanation: { en: "Biological activity is a vital indicator of an active soil ecosystem.", hi: "जैविक गतिविधि स्वस्थ मिट्टी का प्रमुख संकेत है।", te: "జీవుల ఉనికి మంచి నేలకు నిదర్శనం.", ml: "ഇത് മണ്ണിന്റെ ആരോഗ്യം വ്യക്തമാക്കുന്നു." },
                },
                {
                  id: "opt-r4-b",
                  label: "B",
                  title: { en: "Inert ground with zero signs", hi: "निर्जीव मिट्टी", te: "జీవం లేని నేల", ml: "നിർജ്ജീവമായ മണ്ണ്" },
                  text: { en: "Soil with no visible signs of life", hi: "बिना किसी जीवन के संकेत वाली मिट्टी", te: "ఎటువంటి జీవం లేని నేల", ml: "ജീവനില്ലാത്ത മണ്ണ്" },
                  isCorrect: false,
                  explanation: { en: "Lack of life often indicates low fertility.", hi: "जीवन की कमी कम उर्वरता दर्शाती है।", te: "జీవం లేకపోతే సారవంతం కాదు.", ml: "ഫലഭൂയിഷ്ഠത കുറവാണ്." },
                },
              ],
            },
          ],
        },

                // Phase 3: MCQ Quiz (2 Questions, 4 Options Each)
        {
          type: "mcq",
          id: "soil-level-3-mcq",
          totalXp: 15,
          questions: [
            {
              id: "q1-bare-soil-risk",
              question: {
                en: "What severe damage occurs when fertile topsoil is left bare under hot sun and heavy rains?",
                hi: "तेज धूप और भारी बारिश में उपजाऊ मिट्टी को खुला छोड़ने पर क्या गंभीर नुकसान होता है?",
                te: "ఎండ మరియు భారీ వర్షంలో నేలను కప్పకుండా ఉంచితే ఏమి జరుగుతుంది?",
                ml: "കഠിനമായ വെയിലും മഴയും ഏൽക്കുമ്പോൾ തുറസ്സായ മണ്ണിന് എന്ത് സംഭവിക്കുന്നു?",
              },
              xp: 8,
              options: [
                {
                  id: "opt-l3-1a",
                  text: {
                    en: "Raindrops erode topsoil, sunlight bakes soil biology, and surface crusting blocks water infiltration",
                    hi: "बारिश की बूंदें मिट्टी को बहा देती हैं, धूप रोगाणुओं को मारती है और कठोर पपड़ी पानी को रोकती है",
                    te: "వర్షపు నీరు మట్టిని కొట్టుకుపోయేలా చేస్తుంది, ఎండ సూక్ష్మజీవులను చంపుతుంది మరియు నేల గట్టిపడుతుంది",
                    ml: "മണ്ണൊലിപ്പ് ഉണ്ടാവുകയും സൂക്ഷ്മജീവികൾ നശിക്കുകയും വെള്ളം താഴേക്ക് ഇറങ്ങാതെ വരികയും ചെയ്യുന്നു",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! Bare soil suffers from erosion, UV biological damage, and crusting that repels rainfall.",
                    hi: "बिल्कुल सही! खुली मिट्टी में कटाव होता है और धूप से लाभकारी सूक्ष्मजीव नष्ट हो जाते हैं।",
                    te: "సరిగ్గా చెప్పారు! నేలను కప్పకపోతే సారవంతమైన మట్టి కొట్టుకుపోతుంది.",
                    ml: "ശരിയാണ്! മണ്ണ് മൂടി സൂക്ഷിച്ചില്ലെങ്കിൽ മണ്ണൊലിപ്പും ജീവികളുടെ നാശവും സംഭവിക്കും.",
                  },
                },
                {
                  id: "opt-l3-1b",
                  text: {
                    en: "The soil naturally generates new organic humus without needing any plant cover",
                    hi: "मिट्टी बिना किसी पौधे के अपने आप नई जैविक खाद बना लेती है",
                    te: "ఎలాంటి మొక్కలు లేకుండా నేల తనంతట తాను సారవంతమవుతుంది",
                    ml: "സസ്യങ്ങളില്ലാതെ തന്നെ മണ്ണ് തനിയെ വളക്കൂറുള്ളതായി മാറുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Humus requires plant material, roots, and microbes to form.",
                    hi: "ह्यूमस बनने के लिए पौधों के अवशेष और रोगाणुओं की आवश्यकता होती है।",
                    te: "సేంద్రీయ పదార్థం ఏర్పడటానికి మొక్కల వ్యర్థాలు అవసరం.",
                    ml: "സസ്യ അവശിഷ്ടങ്ങൾ ഉണ്ടെങ്കിലേ മണ്ണിൽ വളം രൂപപ്പെടൂ.",
                  },
                },
                {
                  id: "opt-l3-1c",
                  text: {
                    en: "Underground earthworms multiply ten times faster in baked dry soil",
                    hi: "सूखी गर्म मिट्टी में केंचुए दस गुना तेजी से बढ़ते हैं",
                    te: "ఎండిన నేలలో వానపాములు పది రెట్లు వేగంగా పెరుగుతాయి",
                    ml: "വരണ്ട മണ്ണിൽ ഞാഞ്ഞൂലുകൾ വളരെ വേഗത്തിൽ പെരുകുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Earthworms need cool, moist conditions with food to survive.",
                    hi: "केंचुओं को जीवित रहने के लिए नमी और भोजन की आवश्यकता होती है।",
                    te: "వానపాములు బతకడానికి తేమ మరియు చల్లదనం అవసరం.",
                    ml: "ഞാഞ്ഞൂലുകൾക്ക് ജീവിക്കാൻ ഈർപ്പമുള്ള തണുത്ത മണ്ണാണ് ആവശ്യം.",
                  },
                },
                {
                  id: "opt-l3-1d",
                  text: {
                    en: "All weed seeds are permanently eliminated forever",
                    hi: "सभी खरपतवार के बीज हमेशा के लिए समाप्त हो जाते हैं",
                    te: "కలుపు మొక్కల విత్తనాలు పూర్తిగా నశిస్తాయి",
                    ml: "കളകളുടെ വിത്തുകൾ പൂർണ്ണമായി ഇല്ലാതാകുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Pioneer weeds thrive on disturbed bare soil.",
                    hi: "खुली मिट्टी में खरपतवार और तेजी से उगते हैं।",
                    te: "కప్పని నేలలో కలుపు మొక్కలు మరింత వేగంగా పెరుగుతాయి.",
                    ml: "തുറസ്സായ മണ്ണിൽ കളകൾ കൂടുതൽ വേഗത്തിൽ വളരുന്നു.",
                  },
                },
              ],
            },
            {
              id: "q2-mulch-practice",
              question: {
                en: "What is the single best practice to protect soil moisture and stop surface runoff during hot seasons?",
                hi: "गर्मियों में मिट्टी की नमी बचाने और पानी के बहाव को रोकने का सबसे अच्छा उपाय क्या है?",
                te: "ఎండాకాలంలో నేలలో తేమను నిలుపుకోవడానికి మరియు నేల కోతను ఆపడానికి ఉత్తమ మార్గం ఏది?",
                ml: "വേനൽക്കാലത്ത് ഈർപ്പം നിലനിർത്താനും മണ്ണൊലിപ്പ് തടയാനും ഏറ്റവും നല്ല മാർഗ്ഗം ഏതാണ്?",
              },
              xp: 7,
              options: [
                {
                  id: "opt-l3-2a",
                  text: {
                    en: "Covering the ground with organic mulch, crop residue, or living cover crops",
                    hi: "मिट्टी को जैविक गीली घास (मल्च), फसल अवशेष या कवर फसलों से ढकना",
                    te: "నేలను సేంద్రీయ వ్యర్థాలు, ఆకులు లేదా కవర్ పంటలతో కప్పడం",
                    ml: "കരിയില, വൈക്കോൽ എന്നിവ കൊണ്ടുള്ള പുതയിടൽ അല്ലെങ്കിൽ ആവരണ വിളകൾ വളർത്തൽ",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! Surface mulch acts like an umbrella, keeping soil cool, moist, and protected from rainfall impact.",
                    hi: "बिल्कुल सही! मल्च मिट्टी को धूप से बचाता है और नमी बनाए रखता है।",
                    te: "సరిగ్గా చెప్పారు! మల్చింగ్ నేలను చల్లగా మరియు తేమగా ఉంచుతుంది.",
                    ml: "ശരിയാണ്! പുതയിടുന്നത് മണ്ണിന് തണൽ നൽകുകയും ഈർപ്പം നിലനിർത്തുകയും ചെയ്യുന്നു.",
                  },
                },
                {
                  id: "opt-l3-2b",
                  text: {
                    en: "Burning all crop residues and clearing every trace of organic matter",
                    hi: "सभी फसल अवशेषों को जलाना और खेत को पूरी तरह साफ करना",
                    te: "పంట వ్యర్థాలను కాల్చివేసి నేలను పూర్తిగా శుభ్రం చేయడం",
                    ml: "സസ്യ അവശിഷ്ടങ്ങൾ കത്തിച്ച് മണ്ണ് വൃത്തിയാക്കുക",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Burning residues destroys organic carbon and kills beneficial surface biology.",
                    hi: "अवशेष जलाने से मिट्टी के पोषक तत्व और रोगाणु नष्ट हो जाते हैं।",
                    te: "వ్యర్థాలను కాల్చడం వల్ల నేలలోని జీవం నశిస్తుంది.",
                    ml: "അവശിഷ്ടങ്ങൾ കത്തിക്കുന്നത് മണ്ണിന്റെ ജീവനെ ഇല്ലാതാക്കും.",
                  },
                },
                {
                  id: "opt-l3-2c",
                  text: {
                    en: "Deep tilling the field 3 times every week in direct afternoon heat",
                    hi: "दोपहर की तेज धूप में हर हफ्ते 3 बार गहरी जुताई करना",
                    te: "తీవ్రమైన ఎండలో వారానికి మూడు సార్లు లోతుగా దున్నడం",
                    ml: "ഉച്ചവെയിലിൽ ആഴ്ചയിൽ മൂന്ന് തവണ നിലം ഉഴുതു മറിക്കുക",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Frequent deep tillage breaks soil aggregates and accelerates moisture evaporation.",
                    hi: "बार-बार जुताई करने से मिट्टी की नमी जल्दी उड़ जाती है।",
                    te: "ఎక్కువగా దున్నడం వల్ల తేమ వేగంగా ఆవిరవుతుంది.",
                    ml: "കൂടുതൽ ഉഴുന്നത് മണ്ണിന്റെ ഈർപ്പം നഷ്ടപ്പെടുത്തും.",
                  },
                },
                {
                  id: "opt-l3-2d",
                  text: {
                    en: "Spraying chemical sealants to waterproof the field",
                    hi: "खेत को वाटरप्रूफ बनाने के लिए रासायनिक सीलेंट का छिड़काव करना",
                    te: "నేలను వాటర్‌ప్రూఫ్ చేయడానికి రసాయనాలు చల్లడం",
                    ml: "മണ്ണിൽ വെള്ളം ഇറങ്ങാതിരിക്കാൻ രാസവസ്തുക്കൾ തളിക്കുക",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Soil must absorb water, not repel it; sealants kill crop roots.",
                    hi: "मिट्टी को पानी सोखना चाहिए, वाटरप्रूफिंग से जड़ें दम तोड़ देती हैं।",
                    te: "నేల నీటిని పీల్చుకోవాలి; వాటర్‌ప్రూఫింగ్ పంటలను చంపుతుంది.",
                    ml: "മണ്ണ് വെള്ളം വലിച്ചെടുക്കുകയാണ് വേണ്ടത്, തടയുകയല്ല.",
                  },
                },
              ],
            },
          ],
        },

        // Phase 4: Reward
        {
          type: "reward",
          id: "soil-level-3-reward",
          xp: 90,
          badgeTitle: { en: "Soil Health Steward", hi: "मृदा स्वास्थ्य प्रबंधक", te: "నేల ఆరోగ్య సారథి", ml: "മണ്ണ് പരിപാലകൻ" },
          badgeIcon: "verified",
          taraDialogue: { en: "Incredible! You understand what makes soil truly healthy!", hi: "अद्भुत! आप समझ गए हैं कि मिट्टी वास्तव में स्वस्थ कैसे होती है!", te: "అద్భుతం! మీరు నేల ఆరోగ్యాన్ని తెలుసుకున్నారు!", ml: "അഭിനന്ദനങ്ങൾ!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 4: SOIL CONNECTIONS (4 PHASES)
    // ─────────────────────────────────────────────
    {
      id: "soil-level-4",
      levelNumber: 4,
      title: {
        en: "Soil Connections",
        hi: "मिट्टी के संबंध",
        te: "నేల అనుసంధానాలు",
        ml: "മണ്ണിലെ ബന്ധങ്ങൾ",
      },
      subtitle: {
        en: "Discover how different parts of the soil system connect",
        hi: "जानें कि मिट्टी के विभिन्न हिस्से कैसे आपस में जुड़ते हैं",
        te: "నేల భాగాలు ఎలా అనుసంధానించబడి ఉన్నాయో తెలుసుకోండి",
        ml: "മണ്ണിലെ ഘടകങ്ങൾ പരസ്പരം എങ്ങനെ ബന്ധപ്പെട്ടിരിക്കുന്നു എന്ന് മനസ്സിലാക്കുക",
      },
      durationMinutes: 6,
      xpReward: 80,
      phases: [
        // Phase 1: Concept Cards
        {
          type: "conceptCards",
          id: "soil-connections-cards",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-4"]?.["soil-connections-cards-dialogue"],
          title: { en: "Soil Connections", hi: "मिट्टी के संबंध", te: "నేల అనుసంధానాలు", ml: "മണ്ണിലെ ബന്ധങ്ങൾ" },
          taraDialogue: {
            en: "Everything in the soil system is connected! Roots need water and air. Microbes interact with organic matter. Good structure manages both moisture and air. When one changes, it influences everything!",
            hi: "मिट्टी में सब कुछ आपस में जुड़ा है! जड़ें हवा और पानी चाहती हैं। सूक्ष्मजीव जैविक पदार्थों से जुड़ते हैं।",
            te: "నేలలో అన్నీ ఒకదానితో ఒకటి ముడిపడి ఉన్నాయి! వేర్లకు నీరు, గాలి కావాలి.",
            ml: "മണ്ണിലെല്ലാം പരസ്പരം ബന്ധപ്പെട്ടിരിക്കുന്നു!",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "SYSTEM CONNECTIONS", hi: "सिस्टम संबंध", te: "వ్యవస్థ అనుసంధానం", ml: "ബന്ധങ്ങൾ" },
            title: { en: "How Soil Elements Interact", hi: "मिट्टी के तत्व कैसे जुड़ते हैं", te: "నేల అంశాలు ఎలా పనిచేస్తాయి", ml: "ഘടകങ്ങളുടെ പ്രവർത്തനം" },
            description: { en: "Changes in one part affect the whole soil system.", hi: "एक हिस्से में बदलाव पूरे सिस्टम को प्रभावित करता है।", te: "ఒక భాగంలో మార్పు మొత్తం వ్యవస్థను ప్రభావితం చేస్తుంది.", ml: "ഒരു മാറ്റം എല്ലാത്തിനെയും ബാധിക്കുന്നു." },
            bulletPoints: [
              {
                title: { en: "Roots & Water", hi: "जड़ें और पानी", te: "వేర్లు & నీరు", ml: "വേരുകളും വെള്ളവും" },
                text: { en: "Roots depend on soil structure to reach moisture.", hi: "जड़ें नमी तक पहुँचने के लिए संरचना पर निर्भर करती हैं।", te: "వేర్లకు తేమ అవసరం.", ml: "വേരുകൾക്ക് ഈർപ്പം ആവശ്യമാണ്." },
                icon: "eco",
              },
            ],
          },
          cards: [
            {
              id: "card-roots-water",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-4"]?.["soil-connections-cards-card-card-roots-water"],
              title: { en: "Soil + Roots", hi: "मिट्टी + जड़ें", te: "నేల + వేర్లు", ml: "മണ്ണ് + വേരുകൾ" },
              icon: "eco",
              color: "#4CAF50",
              taraDialogue: { en: "Roots depend on soil structure to access water and anchor the crop.", hi: "जड़ें पानी पाने के लिए मिट्टी की संरचना पर निर्भर करती हैं।", te: "వేర్లు నీటిని తీసుకోవడానికి నేల నిర్మాణం ముఖ్యం.", ml: "വേരുകൾക്ക് വെള്ളം ലഭിക്കാൻ മണ്ണിന്റെ ഘടന പ്രധാനം." },
            },
            {
              id: "card-water-air",
              title: { en: "Water + Air", hi: "पानी + हवा", te: "నీరు + గాలి", ml: "വെള്ളം + వాయു" },
              icon: "water-drop",
              color: "#0284C7",
              taraDialogue: { en: "Pore spaces hold both air and water in balance.", hi: "छिद्र हवा और पानी दोनों को संतुलित रखते हैं।", te: "రంధ్రాలు గాలి, నీటిని సమతుల్యంగా ఉంచుతాయి.", ml: "സുഷിരങ്ങൾ വായുവും വെള്ളവും ക്രമീകരിക്കുന്നു." },
            },
            {
              id: "card-organic-microbes",
              title: { en: "Organic + Microbes", hi: "जैविक + सूक्ष्मजीव", te: "సేంద్రీయ + సూక్ష్మజీవులు", ml: "ജൈവം + സൂക്ഷ്മാണുക്കൾ" },
              icon: "compost",
              color: "#795548",
              taraDialogue: { en: "Microorganisms break down plant materials into natural fertility.", hi: "सूक्ष्मजीव पौधों की सामग्री को खाद में बदलते हैं।", te: "సూక్ష్మజీవులు వ్యర్థాలను ఎరువుగా మారుస్తాయి.", ml: "സൂക്ഷ്മജീവികൾ ജൈവാംശത്തെ വളമാക്കുന്നു." },
            },
            {
              id: "card-life-structure",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-4"]?.["soil-connections-cards-card-card-life-structure"],
              title: { en: "Life + Structure", hi: "जीवन + संरचना", te: "జీవం + నిర్మాణం", ml: "ജീവൻ + ഘടന" },
              icon: "grid-view",
              color: "#60A5FA",
              taraDialogue: { en: "Earthworms and roots create channels that keep soil crumbly.", hi: "केंचुए और जड़ें रास्ते बनाकर मिट्टी को भुरभुरा रखते हैं।", te: "వానపాములు నేలను గుల్లగా ఉంచుతాయి.", ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ ഇളക്കി വായുസഞ്ചാരം കൂട്ടുന്നു." },
            },
            {
              id: "card-living-crop",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-4"]?.["soil-connections-cards-card-card-living-crop"],
              title: { en: "Living Soil + Healthy Crop", hi: "जीवित मिट्टी + स्वस्थ फसल", te: "సజీవ నేల + మంచి పంట", ml: "നല്ല മണ്ണ് + നല്ല വിളവ്" },
              icon: "grass",
              color: "#FFA000",
              taraDialogue: { en: "When the entire system works together, crops thrive naturally!", hi: "जब पूरा सिस्टम मिलकर काम करता है, फसलें फलती-फूलती हैं!", te: "వ్యవస్థ మొత్తం కలిసి పనిచేస్తే పంటలు బాగా పండుతాయి!", ml: "എല്ലാം ഒത്തുചേരുമ്പോൾ സമൃദ്ധമായ വിളവ് ലഭിക്കുന്നു!" },
            },
          ],
        },

        // Phase 2: Memory Connection Game
        {
          type: "memory",
          id: "soil-connections-memory",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-4"]?.["soil-connections-memory-dialogue"],
          taraSuccessAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-4"]?.["soil-connections-memory-success"],
          title: { en: "Soil Connections", hi: "संबंध याद रखें", te: "అనుసంధానాన్ని గుర్తుంచుకోండి", ml: "ബന്ധങ്ങൾ ഓർക്കുക" },
          instructions: { en: "Match connected soil pairs to discover how the system interacts.", hi: "मिट्टी प्रणाली में एक साथ जुड़ने वाले दो कार्ड मिलाएं।", te: "నేలలో కలిసి పనిచేసే జతలను కలపండి.", ml: "പരസ്പരം ബന്ധമുള്ള ജോടികൾ കണ്ടെത്തുക." },
          xp: 30,
          taraDialogue: { en: "Soil works as a connected system. Tap two cards that belong together!", hi: "मिट्टी एक जुड़े हुए सिस्टम के रूप में काम करती है। दो जुड़े हुए कार्ड टैप करें!", te: "కలిసి పనిచేసే రెండు కార్డులను ఎంచుకోండి!", ml: "പരസ്പരം ബന്ധപ്പെട്ട ജോടികളെ കണ്ടെത്തുക!" },
          taraSuccessDialogue: { en: "Amazing! Soil works as a connected system!", hi: "अद्भुत! मिट्टी एक जुड़े हुए सिस्टम के रूप में काम करती है!", te: "అద్భుతం! నేల ఒక సజీవ వ్యవస్థ!", ml: "വളരെ മികച്ച മുന്നേറ്റം!" },
          pairs: [
            {
              id: "pair-roots-water",
              itemA: { label: { en: "Roots", hi: "जड़ें", te: "వేర్లు", ml: "വേരുകൾ" }, icon: "eco", color: "#4CAF50" },
              itemB: { label: { en: "Water", hi: "पानी", te: "నీరు", ml: "വെള്ളം" }, icon: "water-drop", color: "#0284C7" },
              connectionExplanation: { en: "Roots need water in the soil to absorb essential dissolved nutrients.", hi: "जड़ों को मिट्टी में पानी तक पहुंच की आवश्यकता होती है।", te: "వేర్లకు నీరు అవసరం.", ml: "വേരുകൾക്ക് വെള്ളം ആവശ്യമാണ്." },
            },
            {
              id: "pair-structure-air",
              itemA: { label: { en: "Structure", hi: "संरचना", te: "నిర్మాణం", ml: "ഘടന" }, icon: "grid-view", color: "#795548" },
              itemB: { label: { en: "Air Pores", hi: "हवा छिद्र", te: "గాలి రంధ్రాలు", ml: "വായു സുഷിരങ്ങൾ" }, icon: "air", color: "#60A5FA" },
              connectionExplanation: { en: "Good structure preserves pore spaces for roots to breathe oxygen.", hi: "अच्छी संरचना जड़ों को सांस लेने के लिए हवा के छिद्र देती है।", te: "మంచి నిర్మాణం గాలిని అందిస్తుంది.", ml: "നല്ല ഘടന വായുസഞ്ചാരം ഉറപ്പാക്കുന്നു." },
            },
            {
              id: "pair-organic-microbes",
              itemA: { label: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" }, icon: "compost", color: "#8D6E63" },
              itemB: { label: { en: "Microorganisms", hi: "सूक्ष्मजीव", te: "సూక్ష్మజీవులు", ml: "സൂക്ഷ്മజీവികൾ" }, icon: "scatter-plot", color: "#0284C7" },
              connectionExplanation: { en: "Microorganisms feed on and recycle plant residues into natural fertility.", hi: "सूक्ष्मजीव जैविक पदार्थों को विघटित करते हैं।", te: "సూక్ష్మజీవులు వ్యర్థాలను కుళ్ళింపజేస్తాయి.", ml: "സൂക്ഷ്മജീവികൾ ജൈവാവശിഷ്ടങ്ങൾ വിഘടിപ്പിക്കുന്നു." },
            },
            {
              id: "pair-life-structure",
              itemA: { label: { en: "Earthworms", hi: "केंचुए", te: "వానపాములు", ml: "ഞാഞ്ഞൂലുകൾ" }, icon: "waves", color: "#FFA000" },
              itemB: { label: { en: "Channels", hi: "रास्ते", te: "మార్గాలు", ml: "പാതകൾ" }, icon: "hub", color: "#16A34A" },
              connectionExplanation: { en: "Earthworms burrow through the ground, creating natural air channels.", hi: "केंचुए रास्ते बनाकर मिट्टी में हवा का प्रवाह बनाए रखते हैं।", te: "వానపాములు నేలను గుల్లగా ఉంచుతాయి.", ml: "ഞാഞ്ഞൂലുകൾ വായു സഞ്ചാര പാതകൾ ഉണ്ടാക്കുന്നു." },
            },
            {
              id: "pair-living-crop",
              itemA: { label: { en: "Living Soil", hi: "जीवित मिट्टी", te: "సజీవ నేల", ml: "നല്ല മണ്ണ്" }, icon: "public", color: "#059669" },
              itemB: { label: { en: "Healthy Crop", hi: "स्वस्थ फसल", te: "మంచి పంట", ml: "നല്ല വിളവ്" }, icon: "grass", color: "#EAB308" },
              connectionExplanation: { en: "A balanced living soil system directly powers strong, resilient crops.", hi: "संतुलित जीवित मिट्टी मजबूत फसलों को पोषण देती है।", te: "సజీవ నేల పంటలకు బలాన్నిస్తుంది.", ml: "സന്തുലിതമായ മണ്ണ് സമൃദ്ധമായ വിളവ് നൽകുന്നു." },
            },
          ],
        },

                // Phase 3: MCQ Quiz (2 Questions, 4 Options Each)
        {
          type: "mcq",
          id: "soil-level-4-mcq",
          totalXp: 15,
          questions: [
            {
              id: "q1-connected-system",
              question: {
                en: "In a connected living soil system, how do plant roots and soil microbes collaborate?",
                hi: "एक जुड़े हुए जीवित मिट्टी सिस्टम में, पौधों की जड़ें और सूक्ष्मजीव आपस में कैसे सहयोग करते हैं?",
                te: "సజీవ నేల వ్యవస్థలో, వేర్లు మరియు సూక్ష్మజీవులు పరస్పరం ఎలా సహకరించుకుంటాయి?",
                ml: "സസ്യങ്ങളുടെ വേരുകളും മണ്ണിലെ സൂക്ഷ്മജീവികളും പരസ്പരം എങ്ങനെയാണ് സഹായിക്കുന്നത്?",
              },
              xp: 8,
              options: [
                {
                  id: "opt-l4-1a",
                  text: {
                    en: "Roots exude sugars to feed microbes, while microbes solubilize and deliver locked minerals to roots",
                    hi: "जड़ें सूक्ष्मजीवों को पोषण देने के लिए शर्करा छोड़ती हैं, जबकि सूक्ष्मजीव खनिजों को घोलकर जड़ों तक पहुंचाते हैं",
                    te: "వేర్లు సూక్ష్మజీవులకు ఆహారంగా కార్బోహైడ్రేట్లను అందిస్తాయి, సూక్ష్మజీవులు పోషకాలను వేర్లకు అందిస్తాయి",
                    ml: "വേരുകൾ സൂക്ഷ്മജീവികൾക്ക് അന്നജം നൽകുമ്പോൾ, സൂക്ഷ്മജീവികൾ ധാതുക്കൾ വേരുകൾക്ക് നൽകുന്നു",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! The root-microbe symbiosis (rhizosphere partnership) is nature's two-way nutrient exchange pipeline.",
                    hi: "बिल्कुल सही! जड़ें और रोगाणु एक-दूसरे को भोजन और आवश्यक खनिज प्रदान करते हैं।",
                    te: "సరిగ్గా చెప్పారు! వేర్లు మరియు సూక్ష్మజీవులు కలిసి పనిచేసి పంటలను పోషిస్తాయి.",
                    ml: "ശരിയാണ്! സസ്യങ്ങളും സൂക്ഷ്മജീവികളും തമ്മിലുള്ള ഈ ബന്ധമാണ് വളർച്ചയ്ക്ക് ആധാരം.",
                  },
                },
                {
                  id: "opt-l4-1b",
                  text: {
                    en: "Roots fight aggressively against all bacteria to starve them out",
                    hi: "जड़ें सभी जीवाणुओं से लड़ती हैं ताकि उन्हें भूखा रखा जा सके",
                    te: "వేర్లు అన్ని బ్యాక్టీరియాలతో పోరాడి వాటిని నాశనం చేస్తాయి",
                    ml: "വേരുകൾ എല്ലാ ബാക്ടീരിയകളോടും പോരാടുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Roots actively invite and feed beneficial bacteria around the root zone.",
                    hi: "जड़ें लाभकारी जीवाणुओं को अपने पास आकर्षित करती हैं और उन्हें पोषण देती हैं।",
                    te: "వేర్లు మేలు చేసే బ్యాక్టీరియాను ఆకర్షిస్తాయి.",
                    ml: "വേരുകൾ ഗുണകരമായ ബാക്ടീരിയകളെ പരിപാലിക്കുകയാണ് ചെയ്യുന്നത്.",
                  },
                },
                {
                  id: "opt-l4-1c",
                  text: {
                    en: "Microbes consume the entire root system and turn it into dry sawdust",
                    hi: "सूक्ष्मजीव पूरी जड़ प्रणाली को खाकर सूखी लकड़ी के बुरादे में बदल देते हैं",
                    te: "సూक्ष्मజీవులు వేర్లను పూర్తిగా తినేస్తాయి",
                    ml: "സൂക്ഷ്മജീവികൾ വേരുകളെ പൂർണ്ണമായി നശിപ്പിക്കുന്നു",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Beneficial mycorrhizae protect and extend the root absorption network.",
                    hi: "लाभकारी कवक जड़ों की रक्षा करते हैं और उनका दायरा बढ़ाते हैं।",
                    te: "మేలు చేసే శిలీంధ్రాలు వేర్లను కాపాడతాయి.",
                    ml: "ഗുണകരമായ ഫംഗസുകൾ വേരുകളെ സംരക്ഷിക്കുകയാണ് ചെയ്യുന്നത്.",
                  },
                },
                {
                  id: "opt-l4-1d",
                  text: {
                    en: "There is zero contact between roots and soil biology",
                    hi: "जड़ों और मिट्टी के जीवों के बीच कोई संपर्क नहीं होता",
                    te: "వేర్లకు మరియు నేలలోని జీవులకు ఎలాంటి సంబంధం ఉండదు",
                    ml: "വേരുകൾക്കും ജീവികൾക്കും തമ്മിൽ യാതൊരു ബന്ധവുമില്ല",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "The rhizosphere is one of the most biologically active zones on Earth.",
                    hi: "जड़ों के आसपास का क्षेत्र सबसे अधिक जैविक रूप से सक्रिय होता है।",
                    te: "వేర్ల చుట్టూ ఉన్న ప్రాంతం అత్యంత చురుకైన జీవ మండలం.",
                    ml: "വേരുകൾക്ക് ചുറ്റുമുള്ള ഭാഗം ജീവൻ നിറഞ്ഞതാണ്.",
                  },
                },
              ],
            },
            {
              id: "q2-soil-sponge",
              question: {
                en: "What builds the remarkable soil sponge that absorbs heavy downpours without waterlogging?",
                hi: "वह कौन सी चीज है जो मिट्टी को स्पंज जैसा बनाती है ताकि भारी बारिश का पानी आसानी से सोख सके?",
                te: "వర్షపు నీటిని నేల స్పాంజ్ లాగా పీల్చుకోవడానికి ఏది సహాయపడుతుంది?",
                ml: "മഴവെള്ളം എളുപ്പത്തിൽ വലിച്ചെടുക്കാൻ മണ്ണിനെ സ്പോഞ്ച് പോലെയാക്കുന്നത് എന്താണ്?",
              },
              xp: 7,
              options: [
                {
                  id: "opt-l4-2a",
                  text: {
                    en: "Organic matter, fungal glues (glomalin), stable crumb aggregates, and biological pore channels",
                    hi: "जैविक पदार्थ, कवक गोंद (ग्लोमालिन), भुरभुरी संरचना और जैविक छिद्र",
                    te: "సేంద్రీయ పదార్థం, శిలీంధ్రాలు, మంచి నేల నిర్మాణం మరియు రంధ్రాలు",
                    ml: "ജൈവാംശം, ഫംഗസുകൾ, മികച്ച മൺതരികൾ, ജൈവ സുഷിരങ്ങൾ",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! Glomalin and organic matter bind particles into stable crumbs with open pores that drink rainfall rapidly.",
                    hi: "बिल्कुल सही! जैविक पदार्थ और फंगस मिलकर मिट्टी को भुरभुरा बनाते हैं जो पानी को अच्छी तरह सोखती है।",
                    te: "సరిగ్గా చెప్పారు! సేంద్రీయ పదార్థం మరియు శిలీంధ్రాలు నేలను స్పాంజ్ లాగా మారుస్తాయి.",
                    ml: "ശരിയാണ്! ജൈവാംശവും ഫംഗസും ചേരുമ്പോൾ മണ്ണ് വെള്ളം നന്നായി ആഗിരണം ചെയ്യുന്നു.",
                  },
                },
                {
                  id: "opt-l4-2b",
                  text: {
                    en: "Heavy compaction with industrial rollers until all air is expelled",
                    hi: "औद्योगिक रोलर्स से मिट्टी को इतना दबाना कि सारी हवा बाहर निकल जाए",
                    te: "భారీ రోలర్లతో నేలను గట్టిగా తొక్కించడం",
                    ml: "കനത്ത റോളറുകൾ ഉപയോഗിച്ച് മണ്ണിനെ ഉറപ്പിക്കുക",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Compaction destroys pore spaces and creates immediate surface flooding.",
                    hi: "मिट्टी दबाने से छिद्र नष्ट हो जाते हैं और पानी ऊपर ही जमा हो जाता है।",
                    te: "నేల గట్టిపడితే నీరు లోపలికి ఇంకదు.",
                    ml: "മണ്ണ് ഉറച്ചുപോയാൽ വെള്ളം താഴേക്ക് ഇറങ്ങില്ല.",
                  },
                },
                {
                  id: "opt-l4-2c",
                  text: {
                    en: "Applying excess chemical weedkillers that kill all ground cover",
                    hi: "अत्यधिक रासायनिक खरपतवारनाशकों का छिड़काव करना",
                    te: "రసాయన మందులు ఎక్కువగా వాడి అన్ని మొక్కలను చంపడం",
                    ml: "രാസകീടനാശിനികൾ അമിതമായി തളിക്കുക",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Killing all cover removes the root networks needed to aggregate soil crumbs.",
                    hi: "कवर हटाने से जड़ें नष्ट हो जाती हैं और मिट्टी बह जाती है।",
                    te: "వేర్లు లేకపోతే నేల నిర్మాణం దెబ్బతింటుంది.",
                    ml: "വേരുകൾ ഇല്ലെങ്കിൽ മണ്ണിന്റെ ഘടന നശിക്കും.",
                  },
                },
                {
                  id: "opt-l4-2d",
                  text: {
                    en: "Covering the field in concrete plaster",
                    hi: "खेत को कंक्रीट के प्लास्टर से ढक देना",
                    te: "పొలం మొత్తాన్ని కాంక్రీటుతో కప్పడం",
                    ml: "നിലം മുഴുവൻ കോൺക്രീറ്റ് ചെയ്യുക",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Concrete prevents all agricultural use and blocks biological activity.",
                    hi: "कंक्रीट से खेती असंभव हो जाती है।",
                    te: "కాంక్రీట్ వల్ల వ్యవసాయం చేయలేము.",
                    ml: "കോൺക്രീറ്റ് ചെയ്താൽ കൃഷി അസാധ്യമാകും.",
                  },
                },
              ],
            },
          ],
        },

        // Phase 4: Reward
        {
          type: "reward",
          id: "soil-level-4-reward",
          xp: 80,
          badgeTitle: { en: "Soil Systems Explorer", hi: "मृदा प्रणाली खोजकर्ता", te: "నేల అన్వేషకుడు", ml: "മണ്ണ് ഗവേഷകൻ" },
          badgeIcon: "hub",
          taraDialogue: { en: "Incredible! You understand how soil systems work together!", hi: "शानदार! आप समझ गए हैं कि मिट्टी के सिस्टम कैसे मिलकर काम करते हैं!", te: "అద్భుతం! నేల వ్యవస్థలను అర్థం చేసుకున్నారు!", ml: "മികച്ച വിജയം!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 5: TARA AI CAPSTONE ORAL ASSESSMENT & CERTIFICATION (3 PHASES)
    // ─────────────────────────────────────────────
    {
      id: "soil-level-5",
      levelNumber: 5,
      title: {
        en: "Tara AI Capstone Interview",
        hi: "तारा एआई मौखिक साक्षात्कार",
        te: "తారా AI ముఖాముఖి ఇంటర్వ్యూ",
        ml: "താര AI സർട്ടിഫിക്കേഷൻ ഇന്റർവ്യൂ",
      },
      subtitle: {
        en: "Face Verification & Live Oral Assessment with Tara",
        hi: "चेहरा सत्यापन और तारा के साथ लाइव मौखिक मूल्यांकन",
        te: "ముఖ ధృవీకరణ మరియు తారాతో ప్రత్యక్ష ముఖాముఖి",
        ml: "ഫെയ്സ് വെരിഫിക്കേഷനും ലൈവ് അഭിമുഖവും",
      },
      durationMinutes: 6,
      xpReward: 150,
      phases: [
        // Phase 1: Camera Face Verification & Audio Check
        {
          type: "faceVerification",
          id: "soil-level-5-face-verify",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-5"]?.["soil-level-5-face-verify-dialogue"],
          taraSuccessAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-5"]?.["soil-level-5-face-verify-success"],
          title: {
            en: "Oral Interview Verification",
            hi: "मौखिक साक्षात्कार सत्यापन",
            te: "ముఖాముఖి ధృవీకరణ",
            ml: "അഭിമുഖ വെരിഫിക്കേഷൻ",
          },
          subtitle: {
            en: "Verify face presence and microphone readiness",
            hi: "चेहरे की उपस्थिति और माइक्रोफ़ोन की तत्परता सत्यापित करें",
            te: "ముఖ ఉనికి మరియు మైక్రోఫోన్ సంసిద్ధతను ధృవీకరించండి",
            ml: "ക്യാമറയും മൈക്രോഫോണും പരിശോധിക്കുക",
          },
          instructions: {
            en: "Align your face in the camera frame to initialize your AI viva-voce session.",
            hi: "एआई मौखिक सत्र शुरू करने के लिए कैमरे में अपना चेहरा संरेखित करें।",
            te: "AI ముఖాముఖి ప్రారంభించడానికి మీ ముఖాన్ని సరిగ్గా చూపించండి.",
            ml: "AI അഭിമുഖം ആരംഭിക്കാൻ ക്യാമറയിലേക്ക് നോക്കുക.",
          },
          taraDialogue: {
            en: "Welcome to your Capstone Assessment! Please align your face so I can verify your presence and microphone before we begin.",
            hi: "अपने अंतिम मूल्यांकन में आपका स्वागत है! साक्षात्कार शुरू करने से पहले कृपया अपना चेहरा संरेखित करें।",
            te: "తుది ముఖాముఖికి స్వాగతం! సంభాషణ ప్రారంభించే ముందు మీ ముఖాన్ని చూపించండి.",
            ml: "ഫൈനൽ അസസ്സ്മെന്റിലേക്ക് സ്വാഗതം! സംഭാഷണം ആരംഭിക്കുന്നതിന് മുൻപ് ക്യാമറയിലേക്ക് നോക്കുക.",
          },
          taraExpression: "happy",
          taraSuccessDialogue: {
            en: "Face and audio verified! Let's begin your oral concept interview with Tara.",
            hi: "चेहरा और ऑडियो सत्यापित! आइए तारा के साथ मौखिक साक्षात्कार शुरू करें।",
            te: "ధృవీకరణ పూర్తయింది! తారాతో సంభాషణ ప్రారంభించండి.",
            ml: "വെരിഫിക്കേഷൻ പൂർത്തിയായി! നമുക്ക് അഭിമുഖം ആരംഭിക്കാം.",
          },
          totalXp: 20,
        },

        // Phase 2: Tara AI Oral Assessment Interview (Multilingual Gemini 2.0 Flash)
        {
          type: "aiInterview",
          id: "soil-level-5-ai-interview",
          taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-5"]?.["soil-level-5-ai-interview-dialogue"],
          taraSuccessAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-5"]?.["soil-level-5-ai-interview-success"],
          title: {
            en: "Oral Concept Check with Tara",
            hi: "तारा के साथ मौखिक अवधारणा जांच",
            te: "తారాతో ముఖాముఖి సంభాషణ",
            ml: "താരയുമായുള്ള ആശയ വിനിമയം",
          },
          subtitle: {
            en: "Explain key living soil practices in your own words",
            hi: "जीवित मिट्टी के नियमों को अपने शब्दों में समझाएं",
            te: "సజీవ నేల పద్ధతులను మీ స్వంత మాటలలో వివరించండి",
            ml: "മണ്ണ് സംരക്ഷണ ആശയങ്ങൾ നിങ്ങളുടെ സ്വന്തം വാക്കുകളിൽ പറയുക",
          },
          instructions: {
            en: "Speak or type your answer. Tara AI will evaluate your practical agricultural reasoning.",
            hi: "बोलें या टाइप करें। तारा एआई आपकी समझ का विश्लेषण करेगी।",
            te: "మాట్లాడండి లేదా టైప్ చేయండి. తారా మీ సమాధానాన్ని పరిశీలిస్తుంది.",
            ml: "സംസാരിക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക. താര നിങ്ങളുടെ ആശയം വിലയിരുത്തും.",
          },
          totalXp: 80,
          taraDialogue: {
            en: "Before awarding your Soil Guardian badge, let's talk! In your own words, how do living organisms, organic residues, and good soil structure protect your land?",
            hi: "मृदा संरक्षक बैज प्राप्त करने से पहले, आइए बातचीत करें! अपने शब्दों में बताएं कि मिट्टी के जीव, जैविक अवशेष और अच्छी संरचना आपकी भूमि की रक्षा कैसे करते हैं?",
            te: "మృదా సంరక్షకుడు బ్యాడ్జ్ పొందే ముందు, నేలలోని జీవులు, సేంద్రీయ వ్యర్థాలు మరియు నేల నిర్మాణం మీ పొలాన్ని ఎలా కాపాడతాయో చెప్పండి!",
            ml: "മണ്ണ് സംരക്ഷകൻ ബാഡ്ജ് നേടുന്നതിന് മുൻപ്, മണ്ണിലെ ജീവികളും ജൈവവസ്തുക്കളും മണ്ണിന്റെ ഘടനയും എങ്ങനെയാണ് ഭൂമിയെ സംരക്ഷിക്കുന്നതെന്ന് സ്വന്തം വാക്കുകളിൽ പറയൂ!",
          },
          taraExpression: "thinking",
          taraSuccessDialogue: {
            en: "Brilliant! You have a profound practical understanding of living soil management!",
            hi: "शानदार! आपके पास जीवित मिट्टी के प्रबंधन की गहरी व्यावहारिक समझ है!",
            te: "అద్భుతం! సజీవ నేల నిర్వహణపై మీకు స్పష్టమైన అవగాహన ఉంది!",
            ml: "വളരെ പ്രശംസനീയം! മണ്ണിന്റെ ആരോഗ്യത്തെക്കുറിച്ച് നിങ്ങൾക്ക് മികച്ച പ്രായോഗിക ധാരണയുണ്ട്!",
          },
          questions: [
            {
              id: "q-soil-guardian-capstone",
              taraAudio: UNDERSTANDING_SOIL_HEALTH_AUDIO["level-5"]?.["soil-level-5-ai-interview-question-q-soil-guardian-capstone"],
              question: {
                en: "How do living soil organisms, plant residues, and soil structure work together to nourish your crops?",
                hi: "जीवित मिट्टी के जीव, फसल अवशेष और मिट्टी की संरचना मिलकर आपकी फसलों का पोषण कैसे करते हैं?",
                te: "నేలలోని జీవులు, సేంద్రీయ వ్యర్థాలు మరియు నేల నిర్మాణం కలిసి పంటలకు ఎలా మేలు చేస్తాయి?",
                ml: "മണ്ണിലെ ജീവികളും സസ്യ അവശിഷ്ടങ്ങളും മണ്ണിന്റെ ഘടനയും ചേർന്ന് എങ്ങനെയാണ് വിളകളെ పోഷിപ്പിക്കുന്നത്?",
              },
              taraDialogue: {
                en: "Think about what happens underground: earthworms, decomposing residues, and pore spaces holding air and water.",
                hi: "भूमिगत क्या होता है सोचें: केंचुए, जैविक पदार्थों का टूटना, और छिद्रों में हवा-पानी का संचयन।",
                te: "భూమి లోపల జరిగే ప్రక్రియను గుర్తు చేసుకోండి: వానపాములు, సేంద్రీయ వ్యర్థాలు, గాలి-నీటి రంధ్రాలు.",
                ml: "ഭൂമിക്കടിയിലെ കാര്യങ്ങൾ ഓർക്കുക: ഞാഞ്ഞൂലുകൾ, ജൈവവസ്തുക്കൾ, വായుവും വെള്ളവും സംഭരിക്കുന്ന സുഷിరങ്ങൾ.",
              },
              taraExpression: "thinking",
              expectedConcepts: [
                {
                  id: "concept-soil-life",
                  label: {
                    en: "Soil Organisms & Life",
                    hi: "मिट्टी के जीव और सूक्ष्मजीव",
                    te: "నేలలోని సూక్ష్మజీవులు మరియు వానపాములు",
                    ml: "മണ്ണിലെ ജീവികളും സൂക്ഷ്മജീവികളും",
                  },
                  keywords: [
                    { en: "organism", hi: "जीव", te: "జీవులు", ml: "ജീവികൾ" },
                    { en: "earthworm", hi: "केंचुआ", te: "వానపాము", ml: "ഞാഞ്ഞൂൽ" },
                    { en: "microbes", hi: "सूक्ष्मजीव", te: "సూक्ष्मజీవులు", ml: "സൂക്ഷ്മജീവികൾ" },
                    { en: "life", hi: "जीवन", te: "జీవం", ml: "ജീവൻ" },
                  ],
                },
                {
                  id: "concept-organic-matter",
                  label: {
                    en: "Organic Matter & Plant Residue",
                    hi: "जैविक पदार्थ और फसल अवशेष",
                    te: "సేంద్రీయ వ్యర్థాలు మరియు ఎరువు",
                    ml: "ജൈവാവശിഷ്ടങ്ങളും വളവും",
                  },
                  keywords: [
                    { en: "organic", hi: "जैविक", te: "సేంద్రీయ", ml: "ജൈవ" },
                    { en: "residue", hi: "अवशेष", te: "వ్యర్థాలు", ml: "അവശിഷ്ടങ്ങൾ" },
                    { en: "compost", hi: "खाद", te: "ఎరువు", ml: "കമ്പോസ്റ്റ്" },
                    { en: "mulch", hi: "मल्च", te: "కవచం", ml: "പുതപ്പ്" },
                  ],
                },
                {
                  id: "concept-soil-structure",
                  label: {
                    en: "Pore Spaces & Soil Aeration",
                    hi: "छिद्र और हवा-पानी संतुलन",
                    te: "రంధ్రాలు మరియు గాలి-నీటి ప్రసరణ",
                    ml: "സുഷിരങ്ങളും വాయുസഞ്ചാരവും",
                  },
                  keywords: [
                    { en: "structure", hi: "संरचना", te: "నిర్మాణం", ml: "ഘടന" },
                    { en: "pores", hi: "छिद्र", te: "రంధ్రాలు", ml: "సుഷിరങ്ങൾ" },
                    { en: "air", hi: "हवा", te: "గాలి", ml: "വാయు" },
                    { en: "water", hi: "पानी", te: "నీరు", ml: "വെള്ളം" },
                    { en: "channels", hi: "रास्ते", te: "మార్గాలు", ml: "പാതകൾ" },
                  ],
                },
              ],
              hint: {
                en: "Mention how earthworms or microbes feed on organic residues and create pores for roots to breathe.",
                hi: "बताएं कि केंचुए या सूक्ष्मजीव कैसे अवशेषों को खाते हैं और जड़ों के लिए छिद्र बनाते हैं।",
                te: "వానపాములు వ్యర్థాలను ఆహారంగా తీసుకుని వేర్లకు గాలి అందేలా రంధ్రాలు ఎలా చేస్తాయో చెప్పండి.",
                ml: "ഞാഞ്ഞൂലുകൾ ജൈവവസ്തുക്കൾ ഭക്ഷിച്ച് വേരുകൾക്ക് വായുസഞ്ചാരം ഒരുക്കുന്ന വിധം വ്യക്തമാക്കുക.",
              },
              followUpDialogue: {
                en: "You're doing great! Don't forget to mention how pore spaces help water and air circulate.",
                hi: "आप बहुत अच्छा कर रहे हैं! यह बताना न भूलें कि छिद्र हवा और पानी के संचार में कैसे मदद करते हैं।",
                te: "చాలా బాగా చెప్పారు! రంధ్రాలు గాలి, నీటి ప్రసరణకు ఎలా సహాయపడతాయో కూడా చెప్పండి.",
                ml: "മികച്ച മുന്നേറ്റം! സുഷിരങ്ങൾ വായുവിനും വെള്ളത്തിനും എങ്ങനെ സഹായിക്കുന്നു എന്നും പറയുക.",
              },
              passingScore: 50,
              xp: 80,
            },
          ],
        },

        // Phase 3: Module Mastery Reward
        {
          type: "reward",
          id: "soil-level-5-reward",
          xp: 150,
          badgeTitle: { en: "Soil Guardian", hi: "मृदा संरक्षक", te: "నేల సంరక్షకుడు", ml: "മണ്ണ് സംരക്ഷകൻ" },
          badgeIcon: "eco",
          badgeDescription: { en: "Mastered all 5 levels of Soil Health & Living Soil Ecosystems", hi: "मृदा स्वास्थ्य के सभी 5 स्तरों में महारत हासिल की", te: "మొత్తం 5 స్థాయిలను పూర్తి చేసారు", ml: "5 ഘട്ടങ്ങളും വിജയകരമായി പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Congratulations! You completed the full Soil Health journey and oral capstone assessment! You've earned the prestigious Soil Guardian badge!", hi: "बधाई हो! आपने मृदा स्वास्थ्य यात्रा और मौखिक मूल्यांकन पूरा कर लिया और मृदा संरक्षक बैज अर्जित किया!", te: "అభినందనలు! మీరు మొత్తం శిక్షణ మరియు ముఖాముఖి పూర్తి చేసి నేల సంరక్షకుడు బ్యాడ్జ్ పొందారు!", ml: "അഭിനന്ദനങ്ങൾ! നിങ്ങൾ എല്ലാ ഘട്ടങ്ങളും പൂർത്തിയാക്കി മണ്ണ് സംരക്ഷകൻ ബാഡ്ജ് സ്വന്തമാക്കി!" },
          taraExpression: "excited",
        },
      ],
    },
  ],
};
