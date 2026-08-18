import type { LessonPackageDefinition } from "../../types/lessonSchema";
import { SUSTAINABLE_SOIL_AUDIO } from "./sustainableSoilAudio";

/**
 * SUSTAINABLE SOIL PACKAGE — 8 COMPLETE LEVELS
 *
 * Integrated with Sarvam AI Indian Text-To-Speech (Speaker: "ishita", bulbul:v3)
 * across English (en-IN), Hindi (hi-IN), Telugu (te-IN), and Malayalam (ml-IN).
 *
 * Designed to teach soil biology, soil structure, conservation decisions,
 * and practical field actions in a step-by-step modular journey:
 * - Level 1: Meet Your Soil (Concept Cards -> Scenario Challenge -> MCQ -> Reward)
 * - Level 2: Soil Is Alive (Match Game -> Scenario Challenge -> MCQ -> Reward)
 * - Level 3: Think Like a Soil-Smart Farmer (Scenario Challenge -> MCQ -> Reward)
 * - Level 4: Remember the Soil System (Memory Connection -> MCQ -> Reward)
 * - Level 5: Spot the Soil Problem (Scenario Challenge -> MCQ -> Reward)
 * - Level 6: Choose the Right Action (Scenario Challenge -> MCQ -> Reward)
 * - Level 7: Your Soil Mission (Field Mission Scenario -> Reward)
 * - Level 8: Become a Sustainable Soil Master (Final Challenge -> AI Interview -> Final Reward)
 */
export const SUSTAINABLE_SOIL_PACKAGE: LessonPackageDefinition = {
  id: "sustainable-soil-package",
  categoryId: "soil",
  title: {
    en: "Sustainable Soil: From Knowing to Doing",
    hi: "सतत मिट्टी: जानने से करने तक",
    te: "సుస్థిర నేల: జ్ఞానం నుంచి ఆచరణ వరకు",
    ml: "സുസ്ഥിര മണ്ണ്: അറിവിൽ നിന്ന് പ്രവർത്തിയിലേക്ക്",
  },
  description: {
    en: "Learn how living soil works, make better farming decisions, solve soil problems, and complete a real-world soil-care mission.",
    hi: "जीवित मिट्टी को समझें, बेहतर खेती के निर्णय लें, मिट्टी की समस्याएँ हल करें और वास्तविक मिट्टी-संरक्षण मिशन पूरा करें।",
    te: "సజీవ నేలను అర్థం చేసుకుని, మంచి వ్యవసాయ నిర్ణయాలు తీసుకుని, నేల సమస్యలను పరిష్కరించి, నిజమైన నేల సంరక్షణ మిషన్ పూర్తి చేయండి.",
    ml: "ജീവനുള്ള മണ്ണിനെ മനസ്സിലാക്കി, മികച്ച കൃഷി തീരുമാനങ്ങൾ എടുത്ത്, മണ്ണിന്റെ പ്രശ്നങ്ങൾ പരിഹരിച്ച്, യഥാർത്ഥ മണ്ണ് സംരക്ഷണ മിഷൻ പൂർത്തിയാക്കുക.",
  },
  whyItMatters: {
    en: "Healthy soil supports roots, stores useful water, provides nutrients, and gives soil organisms a place to work. Sustainable soil care turns knowledge into everyday action.",
    hi: "स्वस्थ मिट्टी जड़ों को सहारा देती है, उपयोगी पानी संजोती है, पोषक तत्व उपलब्ध कराती है और मिट्टी के जीवों को काम करने का स्थान देती है।",
    te: "ఆరోగ్యకరమైన నేల వేర్లను బలపరుస్తుంది, నీటిని నిల్వ చేస్తుంది, పోషకాలను అందిస్తుంది మరియు నేల జీవులకు జీవించే స్థలాన్ని ఇస్తుంది.",
    ml: "ആരോഗ്യമുള്ള മണ്ണ് വേരുകളെ പിന്തുണയ്ക്കുകയും വെള്ളം നിലനിർത്തുകയും പോഷകങ്ങൾ നൽകുകയും മണ്ണിലെ ജീവികൾക്ക് പ്രവർത്തിക്കാൻ ഇടം നൽകുകയും ചെയ്യുന്നു.",
  },
  taraQuote: {
    en: "Ready? We will go from knowing your soil to caring for it. Learn it, choose it, do it!",
    hi: "तैयार हैं? हम मिट्टी को समझने से उसकी देखभाल करने तक जाएंगे। सीखो, चुनो और करो!",
    te: "సిద్ధంగా ఉన్నారా? నేలను తెలుసుకోవడం నుంచి సంరక్షించడం వరకు వెళ్దాం. నేర్చుకోండి, ఎంచుకోండి, ఆచరించండి!",
    ml: "തയ്യാറാണോ? മണ്ണിനെ മനസ്സിലാക്കുന്നതിൽ നിന്ന് സംരക്ഷിക്കുന്നതിലേക്ക് പോകാം. പഠിക്കൂ, തിരഞ്ഞെടുക്കൂ, ചെയ്യൂ!",
  },
  taraExpression: "excited",
  durationMinutes: 35,
  totalXp: 720,
  learningOutcomes: [
    {
      id: "outcome-1",
      text: {
        en: "Explain soil as a living system of air, water, nutrients, organic matter, roots, and living organisms.",
        hi: "हवा, पानी, पोषक तत्व, जैविक पदार्थ, जड़ों और जीवित जीवों वाली मिट्टी को जीवित प्रणाली के रूप में समझाएँ।",
        te: "గాలి, నీరు, పోషకాలు, సేంద్రీయ పదార్థం, వేర్లు మరియు జీవులతో నేలను సజీవ వ్యవస్థగా వివరించండి.",
        ml: "വായു, വെള്ളം, പോഷകങ്ങൾ, ജൈവവസ്തുക്കൾ, വേരുകൾ, ജീവികൾ എന്നിവ അടങ്ങിയ മണ്ണിനെ സജീവ വ്യവസ്ഥയായി വിശദീകരിക്കുക.",
      },
    },
    {
      id: "outcome-2",
      text: {
        en: "Recognize healthy and unhealthy soil clues.",
        hi: "स्वस्थ और अस्वस्थ मिट्टी के संकेत पहचानें।",
        te: "ఆరోగ్యకరమైన మరియు సమస్యాత్మక నేల సంకేతాలను గుర్తించండి.",
        ml: "ആരോഗ്യമുള്ളതും പ്രശ്നമുള്ളതുമായ മണ്ണിന്റെ ലക്ഷണങ്ങൾ തിരിച്ചറിയുക.",
      },
    },
    {
      id: "outcome-3",
      text: {
        en: "Choose practical actions that protect soil structure, surface cover, organic matter, air, and water balance.",
        hi: "मिट्टी की संरचना, सतह, जैविक पदार्थ और हवा-पानी के संतुलन की रक्षा करने वाले उपाय चुनें।",
        te: "నేల నిర్మాణం, ఉపరితల కవచం, సేంద్రీయ పదార్థం మరియు గాలి-నీటి సమతుల్యతను కాపాడే చర్యలను ఎంచుకోండి.",
        ml: "മണ്ണിന്റെ ഘടന, ഉപരിതല ആവരണം, ജൈവവസ്തുക്കൾ, വായു-വെള്ള സന്തുലനം എന്നിവ സംരക്ഷിക്കുന്ന നടപടികൾ തിരഞ്ഞെടുക്കുക.",
      },
    },
    {
      id: "outcome-4",
      text: {
        en: "Apply soil-health knowledge to a realistic farm situation and complete a practical observation mission.",
        hi: "वास्तविक खेती की स्थिति में मृदा स्वास्थ्य के ज्ञान को लागू करें और व्यावहारिक मिशन पूरा करें।",
        te: "నిజమైన వ్యవసాయ పరిస్థితిలో నేల ఆరోగ్య జ్ఞానాన్ని ఉపయోగించి ఆచరణాత్మక మిషన్ పూర్తి చేయండి.",
        ml: "യഥാർത്ഥ കൃഷി സാഹചര്യത്തിൽ മണ്ണ് ఆరోగ్య అറിവ് പ്രയോഗിച്ച് പ്രായോഗിക മിഷൻ പൂർത്തിയാക്കുക.",
      },
    },
  ],
  badgeReward: {
    id: "sustainable-soil-master",
    title: {
      en: "Sustainable Soil Master",
      hi: "सतत मृदा विशेषज्ञ",
      te: "సుస్థిర నేల నిపుణుడు",
      ml: "സുസ്ഥിര മണ്ണ് വിദഗ്ധൻ",
    },
    icon: "eco",
    description: {
      en: "Completed all 8 levels of sustainable soil mastery from knowledge to practical action.",
      hi: "ज्ञान से लेकर व्यावहारिक कार्रवाई तक सतत मृदा महारत के सभी 8 स्तर पूरे किए।",
      te: "జ్ఞానం నుండి ఆచరణ వరకు సుస్థిర నేల నైపుణ్యం యొక్క మొత్తం 8 స్థాయిలను పూర్తి చేసారు.",
      ml: "അറിവ് മുതൽ പ്രായോഗിക പ്രവർത്തനം വരെയുള്ള സുസ്ഥിര മണ്ണ് പാഠത്തിന്റെ 8 ലെവലുകളും പൂർത്തിയാക്കി.",
    },
  },
  levels: [
    // =========================================================
    // LEVEL 1 — KNOW: SOIL IS A LIVING ECOSYSTEM
    // =========================================================
    {
      id: "sustainable-soil-level-1",
      levelNumber: 1,
      title: {
        en: "Meet Your Soil",
        hi: "अपनी मिट्टी से मिलें",
        te: "మీ నేలను తెలుసుకోండి",
        ml: "നിങ്ങളുടെ മണ്ണിനെ അറിയുക",
      },
      subtitle: {
        en: "Discover what healthy soil is made of and how it breathes.",
        hi: "जानें कि स्वस्थ मिट्टी किस चीज से बनी है और यह कैसे सांस लेती है।",
        te: "ఆరోగ్యకరమైన నేల దేనితో తయారైందో మరియు అది ఎలా శ్వాసిస్తుందో తెలుసుకోండి.",
        ml: "ആരോഗ്യമുള്ള മണ്ണ് എന്തുകൊണ്ടാണ് നിർമ്മിച്ചിരിക്കുന്നതെന്നും അത് എങ്ങനെ ശ്വസിക്കുന്നുവെന്നും കണ്ടെത്തുക.",
      },
      durationMinutes: 4,
      xpReward: 70,
      phases: [
        {
          type: "conceptCards",
          id: "l1-theory",
          title: {
            en: "What Is Living Soil?",
            hi: "जीवित मिट्टी क्या है?",
            te: "సజీవ నేల అంటే ఏమిటి?",
            ml: "സജീവ മണ്ണ് എന്നാൽ എന്താണ്?",
          },
          taraDialogue: {
            en: "Soil is not just dead dirt. It is a living system with air, water, organic matter, and helpful organisms.",
            hi: "मिट्टी सिर्फ धूल नहीं है। यह हवा, पानी, जैविक पदार्थ और सहायक जीवों वाली एक जीवित प्रणाली है।",
            te: "నేల కేవలం నిర్జీవమైన మట్టి కాదు. ఇది గాలి, నీరు, సేంద్రీయ పదార్థం మరియు ఉపయోగకరమైన జీవులతో కూడిన సజీవ వ్యవస్థ.",
            ml: "മണ്ണ് വെറും ചത്ത മണ്ണല്ല. അത് വായുവും വെള്ളവും ജൈവവസ്തുക്കളും ഉപകാരപ്രദമായ ജീവികളുമുള്ള ഒരു സജീവ വ്യവസ്ഥയാണ്.",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-1"]?.["l1-theory-dialogue"],
          explanation: {
            title: {
              en: "The Living Soil System",
              hi: "जीवित मृदा प्रणाली",
              te: "సజీవ నేల వ్యవస్థ",
              ml: "സജീവ മണ്ണ് വ്യവസ്ഥ",
            },
            description: {
              en: "Healthy soil contains space for air, stores water, holds nutrients, and provides a home for roots and organisms.",
              hi: "स्वस्थ मिट्टी में हवा के लिए जगह होती है, पानी रुकता है, पोषक तत्व रहते हैं और यह जड़ों और जीवों का घर है।",
              te: "ఆరోగ్యకరమైన నేలలో గాలికి స్థలం ఉంటుంది, నీటిని నిల్వ చేస్తుంది, పోషకాలను కలిగి ఉంటుంది మరియు వేర్లకు, జీవులకు నివాసంగా ఉంటుంది.",
              ml: "ആരോഗ്യമുള്ള മണ്ണിൽ വായുവിന് ഇടമുണ്ട്, വെള്ളം സംഭരിക്കുന്നു, പോഷകങ്ങൾ അടങ്ങിയിരിക്കുന്നു, വേരുകൾക്കും ജീവികൾക്കും വാസസ്ഥലം നൽകുന്നു.",
            },
            bulletPoints: [
              {
                title: { en: "Air & Pore Space", hi: "हवा और छिद्र", te: "గాలి & రంధ్రాలు", ml: "വായുവും സുഷിരങ്ങളും" },
                text: { en: "Roots and soil organisms need air in pore spaces to breathe.", hi: "जड़ों और जीवों को सांस लेने के लिए छिद्रों में हवा चाहिए।", te: "వేర్లు, నేల జీవులు శ్వాసించడానికి రంధ్రాలలో గాలి అవసరం.", ml: "വേരുകൾക്കും ജീവികൾക്കും ശ്വസിക്കാൻ സുഷിരങ്ങളിൽ വായു വേണം." },
                icon: "air",
              },
              {
                title: { en: "Water Storage", hi: "जल संचयन", te: "నీటి నిల్వ", ml: "ജല സംഭരണം" },
                text: { en: "Good soil holds moisture for plants without drowning roots.", hi: "अच्छी मिट्टी जड़ों को डुबोए बिना पौधों के लिए नमी रखती है।", te: "మంచి నేల వేర్లకు నష్టం కలగకుండా తేమను నిలుపుకుంటుంది.", ml: "നല്ല മണ്ണ് വേരുകൾക്ക് ദോഷം വരാതെ ചെടികൾക്ക് ഈർപ്പം നിലനിർത്തുന്നു." },
                icon: "water-drop",
              },
              {
                title: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" },
                text: { en: "Plant residues can become food for soil life.", hi: "पौधों के अवशेष मिट्टी के जीवों का भोजन बन सकते हैं।", te: "పంట అవశేషాలు నేల జీవులకు ఆహారమవుతాయి.", ml: "സസ്യ അവശിഷ്ടങ്ങൾ മണ്ണിലെ ജീവികൾക്ക് ഭക്ഷണമാകാം." },
                icon: "compost",
              },
              {
                title: { en: "Living Organisms", hi: "जीवित जीव", te: "సజీవ జీవులు", ml: "ജീവികൾ" },
                text: { en: "Microbes and earthworms help the soil ecosystem work.", hi: "सूक्ष्मजीव और केंचुए मिट्टी की प्रणाली को चलाने में मदद करते हैं।", te: "సూక్ష్మజీవులు, వానపాములు నేల వ్యవస్థకు సహాయపడతాయి.", ml: "സൂക്ഷ്മജീവികളും ഞാഞ്ഞൂലുകളും മണ്ണ് വ്യവസ്ഥയെ സഹായിക്കുന്നു." },
                icon: "bug-report",
              },
            ],
          },
          cards: [
            {
              id: "l1-air",
              title: { en: "Air", hi: "हवा", te: "గాలి", ml: "വായു" },
              icon: "air",
              color: "#81D4FA",
              taraDialogue: {
                en: "Tiny pore spaces give roots and soil life room to breathe.",
                hi: "मिट्टी के छोटे छिद्र जड़ों और मिट्टी के जीवों को सांस लेने की जगह देते हैं।",
                te: "నేలలోని చిన్న రంధ్రాలు వేర్లు, జీవులకు గాలి అందిస్తాయి.",
                ml: "മണ്ണിലെ ചെറിയ സുഷിരങ്ങൾ വേരുകൾക്കും ജീവികൾക്കും ശ്വസിക്കാൻ ഇടം നൽകുന്നു.",
              },
              taraAudio: SUSTAINABLE_SOIL_AUDIO["level-1"]?.["l1-theory-card-l1-air"],
            },
            {
              id: "l1-water",
              title: { en: "Water", hi: "पानी", te: "నీరు", ml: "വെള്ളം" },
              icon: "water-drop",
              color: "#29B6F6",
              taraDialogue: {
                en: "Good soil holds useful moisture while keeping air spaces.",
                hi: "अच्छी मिट्टी उपयोगी नमी रखती है और हवा की जगह भी बचाती है।",
                te: "మంచి నేల తేమను ఉంచుతూ గాలి స్థలాన్ని కూడా కాపాడుతుంది.",
                ml: "നല്ല മണ്ണ് ഈർപ്പം നിലനിർത്തുമ്പോഴും വായു ഇടം സംരക്ഷിക്കുന്നു.",
              },
              taraAudio: SUSTAINABLE_SOIL_AUDIO["level-1"]?.["l1-theory-card-l1-water"],
            },
            {
              id: "l1-organic",
              title: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ पदार्थ", ml: "ജൈവവസ്തുക്കൾ" },
              icon: "compost",
              color: "#8D6E63",
              taraDialogue: {
                en: "Leaves and suitable crop residues can return useful material to the soil.",
                hi: "पत्ते और उपयुक्त फसल अवशेष मिट्टी में उपयोगी पदार्थ वापस ला सकते हैं।",
                te: "ఆకులు, తగిన పంట అవశేషాలు నేలకు ఉపయోగకరమైన పదార్థాన్ని తిరిగి ఇస్తాయి.",
                ml: "ഇലകളും അനുയോജ്യമായ വിള അവശിഷ്ടങ്ങളും മണ്ണിലേക്ക് ഉപകാരപ്രദമായ വസ്തുക്കൾ തിരികെ നൽകാം.",
              },
              taraAudio: SUSTAINABLE_SOIL_AUDIO["level-1"]?.["l1-theory-card-l1-organic"],
            },
          ],
        },

        {
          type: "scenarioChallenge",
          id: "l1-decision",
          title: {
            en: "Your First Soil Decision",
            hi: "आपका पहला मृदा निर्णय",
            te: "మీ మొదటి నేల నిర్ణయం",
            ml: "നിങ്ങളുടെ ആദ്യ മണ്ണ് തീരുമാനം",
          },
          instructions: {
            en: "Choose the field condition that gives roots the better environment.",
            hi: "जड़ों के लिए बेहतर खेत की स्थिति चुनें।",
            te: "వేర్లకు మెరుగైన పొల పరిస్థితిని ఎంచుకోండి.",
            ml: "വേരുകൾക്ക് മികച്ച വയൽ സാഹചര്യം തിരഞ്ഞെടുക്കുക.",
          },
          xp: 20,
          taraDialogue: {
            en: "Imagine this is your field. Which soil would you rather plant into?",
            hi: "मान लीजिए यह आपका खेत है। आप किस मिट्टी में पौधा लगाना चाहेंगे?",
            te: "ఇది మీ పొలం అని ఊహించండి. ఏ నేలలో పంట నాటాలనుకుంటారు?",
            ml: "ഇത് നിങ്ങളുടെ വയലാണെന്ന് കരുതൂ. ഏത് മണ്ണിലാണ് നിങ്ങൾ ചെടി നട്ടുപിടിപ്പിക്കുക?",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-1"]?.["l1-decision-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-1"]?.["l1-decision-success"],
          taraSuccessDialogue: {
            en: "Good choice. You looked for a balance of moisture, air, and root space.",
            hi: "सही चुनाव। आपने नमी, हवा और जड़ों की जगह का संतुलन देखा।",
            te: "మంచి ఎంపిక. మీరు తేమ, గాలి మరియు వేర్ల స్థలాన్ని గమనించారు.",
            ml: "നല്ല തിരഞ്ഞെടുപ്പ്. ഈർപ്പം, വായു, വേരുകൾക്കുള്ള ഇടം എന്നിവയുടെ സന്തുలనం നിങ്ങൾ കണ്ടു.",
          },
          rounds: [
            {
              id: "l1-decision-round-1",
              roundNumber: 1,
              topic: { en: "Root Environment", hi: "जड़ों का वातावरण", te: "వేర్ల వాతావరణం", ml: "വേരുകളുടെ അന്തരീക്ഷം" },
              prompt: {
                en: "Which soil condition is better for roots?",
                hi: "जड़ों के लिए कौन सी मिट्टी बेहतर है?",
                te: "వేర్లకు ఏ నేల పరిస్థితి మంచిది?",
                ml: "വേരുകൾക്ക് ഏത് മണ്ണ് സാഹచര്യം മികച്ചതാണ്?",
              },
              options: [
                {
                  id: "compact",
                  label: "A",
                  title: { en: "Very compact and waterlogged", hi: "बहुत कठोर और जलभराव वाली", te: "చాలా గట్టి, నీరు నిలిచిన", ml: "കട്ടിയുള്ള, വെള്ളക്കെട്ടുള്ള" },
                  text: { en: "Pore spaces are crushed, suffocating roots.", hi: "छिद्र दब गए हैं, जड़ें घुट रही हैं।", te: "రంధ్రాలు మూసుకుపోయాయి, వేర్లకు గాలి అందదు.", ml: "സുഷിരങ്ങൾ അടഞ്ഞുപോയി, വേരുകൾ ശ്വാസം മുട്ടുന്നു." },
                  isCorrect: false,
                  explanation: {
                    en: "Roots can struggle and rot when pore spaces are crushed and soil stays waterlogged.",
                    hi: "जब छिद्र दब जाते हैं और जलभराव होता है तो जड़ें सड़ने लगती हैं।",
                    te: "రంధ్రాలు మూసుకుపోయి నీరు నిలిస్తే వేర్లు కుళ్ళిపోతాయి.",
                    ml: "സുഷിരങ്ങൾ അടയുകയും വെള്ളക്കെട്ട് ഉണ്ടാവുകയും ചെയ്യുമ്പോൾ വേരുകൾ ചീഞ്ഞുപോകാം.",
                  },
                },
                {
                  id: "balanced",
                  label: "B",
                  title: { en: "Moist, loose, with organic material", hi: "नम, भुरभुरी, जैविक पदार्थ वाली", te: "తేమగా, గుల్లగా, సేంద్రీయ పదార్థంతో", ml: "ഈർപ്പമുള്ള, അയഞ്ഞ, ജൈവവസ്തുക്കളുള്ള" },
                  text: { en: "Has plenty of air spaces and moisture balance.", hi: "हवा की जगह और अच्छा नमी संतुलन है।", te: "గాలి రంధ్రాలు, మంచి తేమ సమతుల్యత ఉన్నాయి.", ml: "ധാരാളം വായു ഇടവും ഈർപ്പ സന്തുలనവുമുണ്ട്." },
                  isCorrect: true,
                  explanation: {
                    en: "A balance of moisture, air pores, and organic matter creates the optimal root zone.",
                    hi: "नमी, हवा के छिद्रों और जैविक पदार्थ का संतुलन जड़ों के लिए सबसे अच्छा वातावरण बनाता है।",
                    te: "తేమ, గాలి రంధ్రాలు మరియు సేంద్రీయ పదార్థాల సమతుల్యత వేర్లకు ఉత్తమ వాతావరణాన్ని అందిస్తుంది.",
                    ml: "ഈർപ്പം, വായു സുഷിരങ്ങൾ, ജൈവവസ്തുക്കൾ എന്നിവയുടെ സന്തുലനം വേരുകൾക്ക് അനുയോജ്യമായ വളർച്ച നൽകുന്നു.",
                  },
                },
              ],
            },
            {
              id: "l1-decision-round-2",
              roundNumber: 2,
              topic: { en: "Soil Surface Care", hi: "मिट्टी की सतह की देखभाल", te: "నేల ఉపరితల సంరక్షణ", ml: "മണ്ണിന്റെ ഉപరిതല సంരക്ഷണം" },
              prompt: {
                en: "How should you treat the soil surface to protect living soil organisms from harsh direct heat?",
                hi: "मिट्टी के जीवों को तेज धूप और गर्मी से बचाने के लिए सतह के साथ क्या करना चाहिए?",
                te: "కఠినమైన ఎండ నుండి నేల జీవులను రక్షించడానికి ఉపరితలాన్ని ఎలా ఉంచాలి?",
                ml: "കഠിനമായ വെയിലിൽ നിന്ന് മണ്ണിലെ ജീവികളെ സംരക്ഷിക്കാൻ ഉപരിതലം എങ്ങനെ നിലനിർത്തണം?",
              },
              options: [
                {
                  id: "mulched",
                  label: "A",
                  title: { en: "Covered with mulch or crop residue", hi: "मल्च या फसल अवशेषों से ढकी हुई", te: "మల్చింగ్ లేదా పంట అవశేషాలతో కప్పబడిన", ml: "പുതയിട്ടതോ വിള അവശിഷ്ടങ്ങൾ കൊണ്ട് മൂടിയതോ" },
                  text: { en: "Keeps soil cool, retains moisture, and feeds soil life.", hi: "मिट्टी को ठंडा रखता है, नमी बचाता है और जीवों को पोषण देता है।", te: "నేలను చల్లగా ఉంచుతుంది, తేమను కాపాడుతుంది మరియు జీవులను పోషిస్తుంది.", ml: "മണ്ണ് തണുപ്പിക്കുന്നു, ഈർപ്പം നിലനിർത്തുന്നു, ജീവികൾക്ക് ഭക്ഷണം നൽകുന്നു." },
                  isCorrect: true,
                  explanation: {
                    en: "Organic surface cover shields soil from baking sun, reduces evaporation, and provides food for earthworms and microbes.",
                    hi: "जैविक आवरण मिट्टी को तेज धूप से बचाता है, वाष्पीकरण कम करता है और केंचुओं तथा सूक्ष्मजीवों को भोजन देता है।",
                    te: "సేంద్రీయ కవచం నేలను ఎండ నుండి కాపాడుతుంది, నీటి ఆవిరిని తగ్గిస్తుంది మరియు సూక్ష్మజీవులకు ఆహారం ఇస్తుంది.",
                    ml: "ജൈവ ആവരണം മണ്ണിനെ ശക്തമായ വെയിലിൽ നിന്ന് സംരക്ഷിക്കുന്നു, ഈർപ്പം നഷ്ടപ്പെടാതെ കാക്കുന്നു, ജീവികൾക്ക് ഭക്ഷണം നൽകുന്നു.",
                  },
                },
                {
                  id: "bare",
                  label: "B",
                  title: { en: "Leave bare and fully exposed to baking sun", hi: "नंगी छोड़कर तेज धूप में तपने देना", te: "ఎలాంటి కవచం లేకుండా ఎండలో ఉంచడం", ml: "ഒരു ആവരണവുമില്ലാതെ ശക്തമായ വെയിലിൽ വിടുക" },
                  text: { en: "Causes soil baking, rapid water loss, and hard crusting.", hi: "मिट्टी सूखती है, तेजी से पानी उड़ता है और पपड़ी जम जाती है।", te: "నేల ఎండిపోయి, నీరు ఆవిరై, పైన గట్టి పొర ఏర్పడుతుంది.", ml: "മണ്ണ് വരണ്ടുപോകാനും ജലം വേഗത്തിൽ നഷ്ടപ്പെടാനും ഇടയാക്കുന്നു." },
                  isCorrect: false,
                  explanation: {
                    en: "Bare soil overheats rapidly, destroying beneficial surface microbes and accelerating moisture loss.",
                    hi: "नंगी मिट्टी बहुत जल्दी गर्म हो जाती है, जिससे लाभदायक सूक्ष्मजीव नष्ट होते हैं और नमी तेजी से खत्म होती है।",
                    te: "కవచం లేని నేల త్వరగా వేడెక్కి, ఉపయోగకరమైన సూక్ష్మజీవులు నశించి తేమ కోల్పోతుంది.",
                    ml: "തുറന്ന മണ്ണ് അതിവേഗം ചൂടാകുകയും ഉപകാരപ്രദമായ സൂക്ഷ്മജീവികളെ നശിപ്പിക്കുകയും ഈർപ്പം നഷ്ടപ്പെടുത്തുകയും ചെയ്യുന്നു.",
                  },
                },
              ],
            },
          ],
        },

        {
          type: "mcq",
          id: "l1-mcq",
          totalXp: 30,
          questions: [
            {
              id: "l1-q1",
              question: {
                en: "Which set best describes healthy living soil?",
                hi: "स्वस्थ जीवित मिट्टी का सबसे अच्छा वर्णन कौन सा है?",
                te: "ఆరోగ్యకరమైన సజీవ నేలను ఏది బాగా వివరిస్తుంది?",
                ml: "ആരോഗ്യമുള്ള ജീവനുള്ള മണ്ണിനെ ഏറ്റവും നന്നായി വിവരിക്കുന്നത് ഏതാണ്?",
              },
              xp: 15,
              options: [
                {
                  id: "l1-q1-opt1",
                  text: {
                    en: "Air, water, nutrients, organic matter, and living organisms",
                    hi: "हवा, पानी, पोषक तत्व, जैविक पदार्थ और जीवित जीव",
                    te: "గాలి, నీరు, పోషకాలు, సేంద్రీయ పదార్థం మరియు జీవులు",
                    ml: "വായു, വെള്ളം, പോഷകങ്ങൾ, ജൈവവസ്തുക്കൾ, ജീവികൾ",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Correct! Healthy soil is a complete living ecosystem with mineral particles, organic matter, pores for air and water, and active biological life.",
                    hi: "सही! स्वस्थ मिट्टी एक पूर्ण जीवित पारिस्थितिकी तंत्र है जिसमें खनिज कण, जैविक पदार्थ, हवा-पानी के छिद्र और सक्रिय जीव होते हैं।",
                    te: "సరైనది! ఆరోగ్యకరమైన నేల అనేది ఖనిజ కణాలు, సేంద్రీయ పదార్థం, గాలి-నీటి రంధ్రాలు మరియు సజీవ జీవులతో కూడిన పూర్తి పర్యావరణ వ్యవస్థ.",
                    ml: "ശരി! ധാതു കണികകൾ, ജൈവവസ്തുക്കൾ, വായു-ജല സുഷിരങ്ങൾ, സജീവ ജീവനുകൾ എന്നിവ അടങ്ങിയ സമ്പൂർണ്ണ സജീവ വ്യവസ്ഥയാണ് ആരോഗ്യമുള്ള മണ്ണ്.",
                  },
                },
                {
                  id: "l1-q1-opt2",
                  text: {
                    en: "Only inert rock powder and chemical fertilizer",
                    hi: "केवल निष्क्रिय पत्थर का चूर्ण और रासायनिक उर्वरक",
                    te: "కేవలం రాతి పొడి మరియు రసాయన ఎరువులు మాత్రమే",
                    ml: "പാറപ്പൊടിയും രാസവളങ്ങളും മാത്രം",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Soil is not dead rock powder; it requires organic carbon, air, moisture, and microbes to sustain plant roots.",
                    hi: "मिट्टी केवल बेजान पत्थर का चूर्ण नहीं है; पौधों के लिए जैविक कार्बन, हवा, नमी और सूक्ष्मजीवों की जरूरत होती है।",
                    te: "నేల నిర్జీవమైన రాతి పొడి కాదు; మొక్కల వేర్లకు సేంద్రీయ కర్బనం, గాలి, తేమ మరియు సూక్ష్మజీవులు అవసరం.",
                    ml: "മണ്ണ് വെറും പാറപ്പൊടിയല്ല; വേരുകൾക്ക് ജൈവ കാർബൺ, വായു, ഈർപ്പം, സൂക്ഷ്മജീവികൾ എന്നിവ ആവശ്യമാണ്.",
                  },
                },
                {
                  id: "l1-q1-opt3",
                  text: {
                    en: "Pure dry sand with zero moisture and no residues",
                    hi: "पूरी तरह सूखी रेत जिसमें कोई नमी और अवशेष न हों",
                    te: "ఎలాంటి తేమ మరియు అవశేషాలు లేని స్వచ్ఛమైన ఇసుక",
                    ml: "ഈർപ്പവും അവശിഷ്ടങ്ങളുമില്ലാത്ത വരണ്ട മണൽ",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Pure dry sand cannot retain nutrients or moisture, and lacks the organic sponge needed for life.",
                    hi: "शुद्ध सूखी रेत पोषक तत्वों या नमी को रोक नहीं सकती और इसमें जीवन के लिए जरूरी जैविक स्पंज नहीं होता।",
                    te: "స్వచ్ఛమైన ఇసుక పోషకాలను లేదా తేమను నిలుపుకోలేదు మరియు జీవులకు అవసరమైన సేంద్రీయత ఉండదు.",
                    ml: "വരണ്ട മണലിന് పోషകങ്ങളോ ഈർപ്പമോ നിലനിർത്താൻ കഴിയില്ല, ജീവന് ആവശ്യമായ ജൈവാംശം അതിലില്ല.",
                  },
                },
                {
                  id: "l1-q1-opt4",
                  text: {
                    en: "Compacted plastic clay without any air pore spaces",
                    hi: "ठोस चिकनी मिट्टी जिसमें हवा के लिए कोई छिद्र न हों",
                    te: "ఎలాంటి గాలి రంధ్రాలు లేని గట్టి బంకమట్టి",
                    ml: "വായു സുഷിരങ്ങളില്ലാത്ത ഉറച്ച കളിമണ്ണ്",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Compacted clay without pore spaces suffocates roots and beneficial aerobic microbes.",
                    hi: "बिना छिद्रों वाली ठोस मिट्टी जड़ों और लाभदायक सूक्ष्मजीवों का दम घोंट देती है।",
                    te: "రంధ్రాలు లేని గట్టి బంకమట్టి వేర్లను మరియు ఉపయోగకరమైన సూక్ష్మజీవులను ఊపిరాడకుండా చేస్తుంది.",
                    ml: "സുഷിരങ്ങളില്ലാത്ത ഉറച്ച കളിമണ്ണ് വേരുകൾക്കും ഉപകാരപ്രദമായ സൂക്ഷ്മജീവികൾക്കും ശ്വാസം മുട്ടിക്കുന്നു.",
                  },
                },
              ],
            },
            {
              id: "l1-q2",
              question: {
                en: "Why do roots and soil organisms need air in the soil?",
                hi: "जड़ों और मिट्टी के जीवों को मिट्टी में हवा की आवश्यकता क्यों होती है?",
                te: "వేర్లకు మరియు నేల జీవులకు నేలలో గాలి ఎందుకు అవసరం?",
                ml: "വേരുകൾക്കും മണ്ണിലെ ജീവികൾക്കും മണ്ണിൽ വായു എന്തിന് വേണം?",
              },
              xp: 15,
              options: [
                {
                  id: "l1-q2-opt1",
                  text: {
                    en: "To supply essential oxygen for respiration and healthy root growth",
                    hi: "श्वसन और स्वस्थ जड़ विकास के लिए आवश्यक ऑक्सीजन देने के लिए",
                    te: "శ్వాసక్రియ మరియు ఆరోగ్యకరమైన వేర్ల పెరుగుదలకు అవసరమైన ఆక్సిజన్ అందించడానికి",
                    ml: "ശ്വസനത്തിനും ആരോഗ്യകരമായ വേരുകളുടെ വളർച്ചയ്ക്കും ആവശ്യമായ ഓക്സിജൻ നൽകാൻ",
                  },
                  isCorrect: true,
                  explanation: {
                    en: "Roots and aerobic soil organisms actively respire; pore spaces allow oxygen to enter and excess carbon dioxide to vent.",
                    hi: "जड़ें और सूक्ष्मजीव लगातार सांस लेते हैं; मिट्टी के छिद्र ऑक्सीजन अंदर आने और अतिरिक्त कार्बन डाइऑक्साइड बाहर जाने में मदद करते हैं।",
                    te: "వేర్లు మరియు సూక్ష్మజీవులు నిరంతరం శ్వాసిస్తాయి; నేల రంధ్రాలు ఆక్సిజన్ అందించడానికి మరియు కార్బన్ డయాక్సైడ్ వెళ్లడానికి సహాయపడతాయి.",
                    ml: "വേരുകളും സൂക്ഷ്മജീവികളും ശ്വസിക്കുന്നു; മണ്ണിലെ സുഷിരങ്ങൾ ഓക്സിജൻ നൽകാനും കാർബൺ ഡയോക്సైഡ് പുറന്തള്ളാനും സഹായിക്കുന്നു.",
                  },
                },
                {
                  id: "l1-q2-opt2",
                  text: {
                    en: "To dry out the roots completely and stop nutrient absorption",
                    hi: "जड़ों को पूरी तरह सुखाकर पोषक तत्वों का अवशोषण रोकना",
                    te: "వేర్లను పూర్తిగా ఎండబెట్టి పోషకాల శోషణను ఆపడానికి",
                    ml: "വേരുകൾ പൂർണ്ണമായി ഉണക്കി പോഷകങ്ങൾ വലിച്ചെടുക്കുന്നത് തടയാൻ",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Air is needed for oxygen, not to dehydrate the plant roots.",
                    hi: "हवा ऑक्सीजन के लिए जरूरी है, जड़ों को सुखाने के लिए नहीं।",
                    te: "గాలి ఆక్సిజన్ కోసం అవసరం, వేర్లను ఎండబెట్టడానికి కాదు.",
                    ml: "വായു ഓക്സിജനാണ് ആവശ്യം, വേരുകൾ ഉണക്കാനല്ല.",
                  },
                },
                {
                  id: "l1-q2-opt3",
                  text: {
                    en: "To allow direct sunlight to reach deep under the ground",
                    hi: "ताकि सीधी धूप जमीन के गहरे नीचे तक पहुंच सके",
                    te: "నేల లోపలికి సూర్యరశ్మి నేరుగా చేరడానికి",
                    ml: "സൂര്യപ്രകാശം ഭൂമിക്കടിയിലേക്ക് നേരിട്ട് എത്താൻ",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Sunlight is captured by leaves above ground; underground roots require dark, humid, oxygenated pore space.",
                    hi: "धूप ऊपर पत्तियों द्वारा ग्रहण की जाती है; जमीन के नीचे जड़ों को अंधेरे, नमी और ऑक्सीजन युक्त छिद्रों की जरूरत होती है।",
                    te: "సూర్యరశ్మిని ఆకులు గ్రహిస్తాయి; నేల కింద వేర్లకు చీకటి, తేమ మరియు ఆక్సిజన్ ఉన్న రంధ్రాలు అవసరం.",
                    ml: "സൂര്യപ്രകാശം ഇലകളാണ് ഉപയോഗിക്കുന്നത്; മണ്ണിനടിയിലെ വേരുകൾക്ക് ഈർപ്പവും ഓക്സിജനുമുള്ള സുഷിരങ്ങളാണ് ആവശ്യം.",
                  },
                },
                {
                  id: "l1-q2-opt4",
                  text: {
                    en: "Air in soil is unnecessary because plants make their own oxygen underground",
                    hi: "मिट्टी में हवा अनावश्यक है क्योंकि पौधे जमीन के नीचे खुद ऑक्सीजन बनाते हैं",
                    te: "మొక్కలు నేల కింద సొంతంగా ఆక్సిజన్ తయారు చేసుకుంటాయి కాబట్టి గాలి అవసరం లేదు",
                    ml: "ചെടികൾ ഭൂമിക്കടിയിൽ സ്വന്തമായി ഓക്സിജൻ ഉണ്ടാക്കുന്നതിനാൽ മണ്ണിൽ വായു ആവശ്യമില്ല",
                  },
                  isCorrect: false,
                  explanation: {
                    en: "Photosynthesis happens in green leaves, but underground roots consume oxygen from soil pore spaces 24/7.",
                    hi: "प्रकाश संश्लेषण हरी पत्तियों में होता है, लेकिन जमीन के नीचे जड़ें चौबीसों घंटे मिट्टी के छिद्रों से ऑक्सीजन लेती हैं।",
                    te: "కిరణజన్య సంయోగక్రియ ఆకులలో జరుగుతుంది, కానీ నేల కింద వేర్లు నేలలోని ఆక్సిజన్ పై ఆధారపడతాయి.",
                    ml: "പ്രകാശസംശ്ലേഷണം ഇലകളിലാണ് നടക്കുന്നത്, എന്നാൽ ഭൂമിക്കടിയിലെ വേരുകൾ മണ്ണിലെ ഓക്സിജൻ ഉപയോഗിച്ചാണ് ജീവിക്കുന്നത്.",
                  },
                },
              ],
            },
          ],
        },

        {
          type: "reward",
          id: "l1-reward",
          xp: 70,
          badgeTitle: {
            en: "Soil Explorer",
            hi: "मृदा खोजकर्ता",
            te: "నేల అన్వేషకుడు",
            ml: "മണ്ണ് അന്വേഷകൻ",
          },
          badgeIcon: "eco",
          badgeDescription: {
            en: "You understand the basic parts of a living soil system.",
            hi: "आप जीवित मिट्टी प्रणाली के मूल घटकों को समझते हैं।",
            te: "మీరు సజీవ నేల వ్యవస్థలోని ప్రాథమిక అంశాలను అర్థం చేసుకున్నారు.",
            ml: "സജീവ മണ്ണ് വ്യവസ്ഥയുടെ അടിസ്ഥാന ഘടകങ്ങൾ നിങ്ങൾ മനസ്സിലാക്കി.",
          },
          taraDialogue: {
            en: "Level one complete! You know what is happening beneath your feet. Let's build on it.",
            hi: "पहला स्तर पूरा! अब आप जानते हैं कि आपके पैरों के नीचे क्या हो रहा है। आगे बढ़ते हैं।",
            te: "మొదటి స్థాయి పూర్తైంది! మీ పాదాల కింద ఏమి జరుగుతుందో ఇప్పుడు తెలుసు. ముందుకు సాగుదాం.",
            ml: "ആദ്യ ലെവൽ പൂർത്തിയായി! നിങ്ങളുടെ കാലിനടിയിൽ എന്താണ് നടക്കുന്നത് എന്ന് അറിയാം. മുന്നോട്ട് പോകാം.",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-1"]?.["l1-reward-dialogue"],
          taraExpression: "happy",
        },
      ],
    },

    // =========================================================
    // LEVEL 2 — CONNECT: MATCH UPS + SCENARIO
    // =========================================================
    {
      id: "sustainable-soil-level-2",
      levelNumber: 2,
      title: {
        en: "Soil Is Alive",
        hi: "मिट्टी जीवित है",
        te: "నేల సజీవమైనది",
        ml: "മണ്ണ് ജീവനുള്ളതാണ്",
      },
      subtitle: {
        en: "Connect soil friends with their jobs, then solve a field situation.",
        hi: "मिट्टी के जीवों को उनके काम से जोड़ें और खेत की स्थिति हल करें।",
        te: "నేలలోని జీవులను వారి పనులతో జత చేసి పొల పరిస్థితిని పరిష్కరించండి.",
        ml: "മണ്ണിലെ ജീവികളെ അവരുടെ ജോലികളുമായി ബന്ധിപ്പിച്ച് വയൽ സാഹചര്യം പരിഹരിക്കുക.",
      },
      durationMinutes: 4,
      xpReward: 80,
      phases: [
        {
          type: "match",
          id: "l2-match",
          title: { en: "Who Does What?", hi: "कौन क्या करता है?", te: "ఎవరు ఏమి చేస్తారు?", ml: "ആര് എന്ത് ചെയ്യുന്നു?" },
          instructions: { en: "Connect each soil friend to its role.", hi: "हर मिट्टी के मित्र को उसके काम से मिलाएँ।", te: "ప్రతి నేల మిత్రుడిని పనితో జత చేయండి.", ml: "ഓരോ മണ്ണിലെ സുഹൃത്തിനെയും ജോലിയുമായി പൊരുത്തപ്പെടുത്തുക." },
          xp: 30,
          taraDialogue: {
            en: "The soil community works as a team. Match each member with its job!",
            hi: "मिट्टी का समुदाय एक टीम की तरह काम करता है। हर सदस्य को उसके काम से मिलाएँ!",
            te: "నేల సమాజం ఒక జట్టులా పనిచేస్తుంది. ప్రతి సభ్యుడిని పనితో జత చేయండి!",
            ml: "മണ്ണിലെ സമൂഹം ഒരു ടീം പോലെ പ്രവർത്തിക്കുന്നു. ഓരോരുത്തരെയും ജോലിയുമായി പൊരുത്തപ്പെടുത്തൂ!",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-2"]?.["l2-match-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-2"]?.["l2-match-success"],
          taraSuccessDialogue: {
            en: "Perfect! Every member has a role in the soil community.",
            hi: "बिल्कुल सही! मिट्टी के समुदाय में हर सदस्य की भूमिका है।",
            te: "చాలా బాగా! నేల సమాజంలో ప్రతి ఒక్కరికీ పాత్ర ఉంది.",
            ml: "മികച്ചത്! മണ്ണിലെ സമൂഹത്തിൽ ഓരോരുത്തർക്കും ഒരു പങ്കുണ്ട്.",
          },
          pairs: [
            {
              id: "p1-earthworm",
              leftText: { en: "Earthworm", hi: "केंचुआ", te: "వానపాము", ml: "ഞാഞ്ഞൂൽ" },
              rightText: { en: "Makes channels for air and water", hi: "हवा और पानी के लिए रास्ते बनाता है", te: "గాలి, నీటి కోసం మార్గాలను చేస్తుంది", ml: "വായുവിനും വെള്ളത്തിനും വഴി ഉണ്ടാക്കുന്നു" },
            },
            {
              id: "p2-microbes",
              leftText: { en: "Microbes", hi: "सूक्ष्मजीव", te: "సూక్ష్మజీవులు", ml: "സൂക്ഷ്മജീവികൾ" },
              rightText: { en: "Break down matter into nutrients", hi: "पदार्थों को पोषक तत्वों में बदलते हैं", te: "పదార్థాలను పోషకాలుగా మారుస్తాయి", ml: "വസ്തുക്കളെ പോഷകങ്ങളാക്കി മാറ്റുന്നു" },
            },
            {
              id: "p3-roots",
              leftText: { en: "Roots", hi: "जड़ें", te: "వేర్లు", ml: "വേരുകൾ" },
              rightText: { en: "Hold soil together and feed organisms", hi: "मिट्टी को बाँधती हैं और जीवों को भोजन देती हैं", te: "నేలను పట్టి ఉంచి జీవులకు ఆహారం ఇస్తాయి", ml: "മണ്ണിനെ ഉറപ്പിച്ചുനിർത്തി ജീവികൾക്ക് ആഹാരം നൽകുന്നു" },
            },
            {
              id: "p4-residues",
              leftText: { en: "Plant Residues", hi: "फसल अवशेष", te: "పంట అవశేషాలు", ml: "വിള അവശിഷ്ടങ്ങൾ" },
              rightText: { en: "Protect surface and become organic matter", hi: "सतह बचाते हैं और जैविक पदार्थ बनते हैं", te: "ఉపరితలాన్ని కాపాడి సేంద్రీయ పదార్థంగా మారతాయి", ml: "ഉపరిതലം സംരക്ഷിച്ച് ജൈവവസ്തുവായി മാറുന്നു" },
            },
          ],
        },

        {
          type: "scenarioChallenge",
          id: "l2-scenario",
          title: { en: "The Hot Sun Challenge", hi: "तेज धूप की चुनौती", te: "ఎండ తీవ్రత సవాలు", ml: "കഠിന വെയിൽ ചലഞ്ച്" },
          instructions: { en: "Choose the action that protects soil life from harsh sun.", hi: "मिट्टी के जीवों को तेज धूप से बचाने वाला उपाय चुनें।", te: "నేల జీవులను తీవ్ర ఎండ నుంచి కాపాడే చర్యను ఎంచుకోండి.", ml: "മണ്ണിലെ ജീവികളെ കഠിന വെയിലിൽ നിന്ന് സംരക്ഷിക്കുന്ന വഴി തിരഞ്ഞെടുക്കുക." },
          xp: 20,
          taraDialogue: {
            en: "Bare soil under direct hot sun dries out fast. What is the better practice?",
            hi: "तेज धूप में खुली मिट्टी जल्दी सूख जाती है। बेहतर तरीका क्या है?",
            te: "తీవ్ర ఎండలో తెరిచి ఉన్న నేల త్వరగా ఎండిపోతుంది. ఏ పద్ధతి మంచిది?",
            ml: "തുറന്ന മണ്ണ് കഠിന വെയിലിൽ വേഗത്തിൽ ഉണങ്ങും. ഏതാണ് നല്ല രീതി?",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-2"]?.["l2-scenario-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-2"]?.["l2-scenario-success"],
          taraSuccessDialogue: {
            en: "Great decision! Covering soil protects moisture and soil life.",
            hi: "शानदार फैसला! मिट्टी को ढंकने से नमी और जीव सुरक्षित रहते हैं।",
            te: "మంచి నిర్ణయం! నేలను కప్పి ఉంచడం వల్ల తేమ, జీవులు రక్షించబడతాయి.",
            ml: "മികച്ച തീരുമാനം! മണ്ണ് മൂടിവെക്കുന്നത് ഈർപ്പത്തെയും ജീവികളെയും സംരക്ഷിക്കുന്നു.",
          },
          rounds: [
            {
              id: "l2-round-1",
              roundNumber: 1,
              topic: { en: "Soil Cover", hi: "मृदा आवरण", te: "నేల కవచం", ml: "മണ്ണ് ആവരണം" },
              prompt: { en: "How should you protect bare soil between crops?", hi: "फसलों के बीच खुली मिट्टी की रक्षा कैसे करें?", te: "పంటల మధ్య ఖాళీ నేలను ఎలా కాపాడాలి?", ml: "വിളകൾക്കിടയിൽ തുറന്ന മണ്ണിനെ എങ്ങനെ സംരക്ഷിക്കാം?" },
              options: [
                {
                  id: "leave-bare",
                  label: "A",
                  title: { en: "Leave it completely exposed", hi: "इसे पूरी तरह खुला छोड़ दें", te: "పూర్తిగా ఖాళీగా వదిలేయండి", ml: "പൂർണ്ണമായും തുറന്നിടുക" },
                  isCorrect: false,
                  explanation: { en: "Direct heat dries soil rapidly and harms surface organisms.", hi: "सीधी गर्मी मिट्टी को सुखा देती है और जीवों को नुकसान पहुँचाती है।", te: "ఎండ వేడి నేలను ఎండబెట్టి జీవులను దెబ్బతీస్తుంది.", ml: "നേരിട്ടുള്ള ചൂട് മണ്ണിനെ ഉണക്കുകയും ജീവികളെ നശിപ്പിക്കുകയും ചെയ്യും." },
                },
                {
                  id: "mulch-cover",
                  label: "B",
                  title: { en: "Cover with mulch or crop residues", hi: "मल्च या फसल अवशेषों से ढंकें", te: "మల్చింగ్ లేదా పంట అవశేషాలతో కప్పండి", ml: "മൾച്ച് അല്ലെങ്കിൽ വിള അവശിഷ്ടങ്ങൾ കൊണ്ട് മൂടുക" },
                  isCorrect: true,
                  explanation: { en: "Cover moderates temperature and conserves vital moisture.", hi: "आवरण तापमान संतुलित रखता है और नमी बचाता है।", te: "కవచం ఉష్ణోగ్రతను సమతుల్యంగా ఉంచి తేమను కాపాడుతుంది.", ml: "ആവരണം താപനില നിയന്ത്രിക്കുകയും ഈർപ്പം നിലനിർത്തുകയും ചെയ്യുന്നു." },
                },
              ],
            },
          ],
        },

        {
          type: "mcq",
          id: "l2-mcq",
          totalXp: 30,
          questions: [
            {
              id: "l2-q1",
              question: { en: "How do earthworms help soil stay healthy?", hi: "केंचुए मिट्टी को स्वस्थ रखने में कैसे मदद करते हैं?", te: "వానపాములు నేలను ఆరోగ్యంగా ఉంచడానికి ఎలా సహాయపడతాయి?", ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ ആരോഗ്യമുള്ളതാക്കാൻ എങ്ങനെ സഹായിക്കുന്നു?" },
              xp: 15,
              options: [
                { id: "opt-1", text: { en: "They create channels for air and roots", hi: "वे हवा और जड़ों के लिए रास्ते बनाते हैं", te: "గాలి, వేర్ల కోసం దారులు చేస్తాయి", ml: "അവ വായുവിനും വേരുകൾക്കും വഴി ഉണ്ടാക്കുന്നു" }, isCorrect: true, explanation: { en: "Earthworm burrows improve aeration and infiltration.", hi: "केंचुओं के छेद हवा और पानी के संचार को बेहतर बनाते हैं।", te: "వానపాము బొరియలు గాలి, నీటి ప్రవాహాన్ని మెరుగుపరుస్తాయి.", ml: "ഞാഞ്ഞൂലിന്റെ മാളങ്ങൾ വായുസഞ്ചാരവും നീരొഴുക്കും വർദ്ധിപ്പിക്കുന്നു." } },
                { id: "opt-2", text: { en: "They harden the topsoil", hi: "वे ऊपरी मिट्टी को कठोर करते हैं", te: "పై నేలను గట్టిగా చేస్తాయి", ml: "അവ മുകൾമണ്ണ് കട്ടിയാക്കുന്നു" }, isCorrect: false, explanation: { en: "Earthworms loosen soil, not harden it.", hi: "केंचुए मिट्टी को भुरभुरी बनाते हैं, कठोर नहीं।", te: "వానపాములు నేలను మెత్తగా చేస్తాయి.", ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ അയഞ്ഞതാക്കുന്നു." } },
              ],
            },
          ],
        },

        {
          type: "reward",
          id: "l2-reward",
          xp: 80,
          badgeTitle: { en: "Life in the Soil", hi: "मृदा में जीवन", te: "నేలలో జీవం", ml: "മണ്ണിലെ ജീവൻ" },
          badgeIcon: "bug-report",
          badgeDescription: { en: "Recognized the living community inside your farmland.", hi: "अपने खेत के भीतर जीवित समुदाय को पहचाना।", te: "మీ పొలంలోని సజీవ సమాజాన్ని గుర్తించారు.", ml: "വയലിലെ ജീവ സമൂഹത്തെ തിരിച്ചറിഞ്ഞു." },
          taraDialogue: { en: "Awesome! You now see your soil as a bustling community of living friends!", hi: "बहुत बढ़िया! अब आप अपनी मिट्टी को जीवित मित्रों का एक समुदाय मानते हैं!", te: "అద్భుతం! ఇప్పుడు మీ నేలను సజీవ మిత్రుల సమాజంగా చూస్తున్నారు!", ml: "മികച്ചത്! മണ്ണ് ജീവനുള്ള സുഹൃത്തുക്കളുടെ സമൂഹമാണെന്ന് നിങ്ങൾ മനസ്സിലാക്കി!" },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-2"]?.["l2-reward-dialogue"],
          taraExpression: "excited",
        },
      ],
    },

    // =========================================================
    // LEVEL 3 — DECIDE: THINK LIKE A SOIL-SMART FARMER
    // =========================================================
    {
      id: "sustainable-soil-level-3",
      levelNumber: 3,
      title: { en: "Think Like a Soil-Smart Farmer", hi: "मिट्टी-समझदार किसान की तरह सोचें", te: "నేల జ్ఞానం ఉన్న రైతులా ఆలోచించండి", ml: "മണ്ണിനെ മനസ്സിലാക്കിയ കർഷകനെ പോലെ ചിന്തിക്കൂ" },
      subtitle: { en: "Make choices and think about their consequences.", hi: "निर्णय लें और उनके परिणामों के बारे में सोचें।", te: "నిర్ణయాలు తీసుకుని వాటి ఫలితాలను ఆలోచించండి.", ml: "തീരുമാനങ്ങൾ എടുത്ത് അവയുടെ ఫలങ്ങളെക്കുറിച്ച് ചിന്തിക്കുക." },
      durationMinutes: 5,
      xpReward: 90,
      phases: [
        {
          type: "scenarioChallenge",
          id: "l3-decision",
          title: { en: "Farm Decision Game", hi: "खेत निर्णय खेल", te: "వ్యవసాయ నిర్ణయ ఆట", ml: "കൃഷി തീരുമാനം ഗെയിം" },
          instructions: { en: "Choose the action that best protects the soil in each situation.", hi: "हर स्थिति में मिट्टी की सबसे अच्छी रक्षा करने वाला उपाय चुनें।", te: "ప్రతి పరిస్థితిలో నేలను కాపాడే ఉత్తమ చర్యను ఎంచుకోండి.", ml: "ഓരോ സാഹചര്യത്തിലും മണ്ണിനെ സംരക്ഷിക്കുന്ന മികച്ച നടപടി തിരഞ്ഞെടുക്കുക." },
          xp: 50,
          taraDialogue: {
            en: "Do not choose only what is easiest now. Think about what your soil will need next.",
            hi: "सिर्फ अभी आसान विकल्प न चुनें। सोचें कि आपकी मिट्टी को आगे क्या चाहिए।",
            te: "ఇప్పుడు సులభమైనదాన్ని మాత్రమే ఎంచుకోకండి. తర్వాత మీ నేలకు ఏమి అవసరమో ఆలోచించండి.",
            ml: "ഇപ്പോൾ എളുപ്പമുള്ളത് മാത്രം തിരഞ്ഞെടുക്കരുത്. പിന്നീട് മണ്ണിന് എന്ത് വേണം എന്ന് ചിന്തിക്കൂ.",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-3"]?.["l3-decision-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-3"]?.["l3-decision-success"],
          taraSuccessDialogue: {
            en: "Excellent. You considered the soil system, not just the immediate task.",
            hi: "बहुत अच्छा। आपने सिर्फ काम नहीं, पूरी मिट्टी प्रणाली के बारे में सोचा।",
            te: "అద్భుతం. మీరు కేవలం పనిని కాకుండా మొత్తం నేల వ్యవస్థను ఆలోచించారు.",
            ml: "മികച്ചത്. നിങ്ങൾ ജോലി മാത്രം അല്ല, മുഴുവൻ മണ്ണ് വ്യവസ്ഥയും പരിഗണിച്ചു.",
          },
          rounds: [
            {
              id: "l3-residue",
              roundNumber: 1,
              topic: { en: "Residues", hi: "अवशेष", te: "అవశేషాలు", ml: "അവശിഷ്ടങ്ങൾ" },
              prompt: { en: "After harvest, which choice can support the soil system?", hi: "कटाई के बाद कौन सा विकल्प मिट्टी की प्रणाली को सहारा दे सकता है?", te: "కోత తర్వాత నేల వ్యవస్థకు ఏ ఎంపిక సహాయపడుతుంది?", ml: "വിളവെടുപ്പിന് ശേഷം മണ്ണ് വ്യവസ്ഥയെ സഹായിക്കുന്ന തിരഞ്ഞെടുപ്പ് ഏതാണ്?" },
              options: [
                {
                  id: "burn",
                  label: "A",
                  title: { en: "Remove or burn everything immediately", hi: "सब कुछ तुरंत हटा दें या जला दें", te: "అన్నింటినీ వెంటనే తొలగించండి లేదా కాల్చండి", ml: "എല്ലാം ഉടൻ നീക്കം ചെയ്യുക അല്ലെങ്കിൽ കത്തിക്കുക" },
                  isCorrect: false,
                  explanation: { en: "Useful plant material is removed from the soil cycle.", hi: "उपयोगी पौध सामग्री मिट्टी के चक्र से हट जाती है।", te: "ఉపయోగకరమైన పంట పదార్థం నేల చక్రం నుంచి తొలగిపోతుంది.", ml: "ഉപകാരപ്രദമായ സസ്യവസ്തുക്കൾ മണ്ണിന്റെ ചക്രത്തിൽ നിന്ന് നഷ്ടപ്പെടുന്നു." },
                },
                {
                  id: "retain",
                  label: "B",
                  title: { en: "Retain suitable residues", hi: "उपयुक्त अवशेष रखें", te: "తగిన అవశేషాలను ఉంచండి", ml: "അനുയോജ്യമായ അവശിഷ്ടങ്ങൾ നിലനിർത്തുക" },
                  isCorrect: true,
                  explanation: { en: "Suitable residues can protect the surface and return organic material.", hi: "उपयुक्त अवशेष सतह की रक्षा कर सकते हैं और जैविक पदार्थ वापस ला सकते हैं।", te: "తగిన అవశేషాలు నేలను కాపాడి సేంద్రీయ పదార్థాన్ని తిరిగి అందించగలవు.", ml: "അനുയോജ്യമായ അവശിഷ്ടങ്ങൾ മണ്ണിനെ സംരക്ഷിക്കുകയും ജൈവവസ്തുക്കൾ തിരികെ നൽകുകയും ചെയ്യും." },
                },
              ],
            },
            {
              id: "l3-compaction",
              roundNumber: 2,
              topic: { en: "Wet Soil", hi: "गीली मिट्टी", te: "తడి నేల", ml: "ഈർപ്പമുള്ള മണ്ണ്" },
              prompt: { en: "The field is very wet. What is the soil-smart choice?", hi: "खेत बहुत गीला है। मिट्टी-समझदार विकल्प क्या है?", te: "పొలం చాలా తడిగా ఉంది. నేల-స్మార్ట్ ఎంపిక ఏది?", ml: "വയൽ വളരെ ഈർപ്പമുള്ളതാണ്. മണ്ണിനെ മനസ്സിലാക്കിയുള്ള തിരഞ്ഞെടുപ്പ് ఏതാണ്?" },
              options: [
                {
                  id: "wait",
                  label: "A",
                  title: { en: "Avoid unnecessary traffic", hi: "अनावश्यक आवाजाही से बचें", te: "అనవసర రాకపోకలను తగ్గించండి", ml: "അനാവശ്യ സഞ്ചാരം ഒഴിവാക്കുക" },
                  isCorrect: true,
                  explanation: { en: "Reducing unnecessary traffic can help protect soil structure from compaction.", hi: "अनावश्यक आवाजाही कम करने से मिट्टी की संरचना को दबाव से बचाने में मदद मिल सकती है।", te: "అనవసర రాకపోకలు తగ్గించడం నేల గట్టిపడకుండా కాపాడుతుంది.", ml: "അനാവശ്യ സഞ്ചാരം കുറയ്ക്കുന്നത് മണ്ണ് കട്ടിയాകുന്നത് ഒഴിവാക്കാൻ സഹായിക്കും." },
                },
                {
                  id: "drive",
                  label: "B",
                  title: { en: "Drive repeatedly across the wet field", hi: "गीले खेत में बार-बार वाहन चलाएँ", te: "తడి పొలంలో పదేపదే వాహనం నడపండి", ml: "ഈർപ്പമുള്ള വയലിലൂടെ ആവർത്തിച്ച് വാഹനമോടിക്കുക" },
                  isCorrect: false,
                  explanation: { en: "Repeated traffic on wet soil can increase compaction risk.", hi: "गीली मिट्टी पर बार-बार आवाजाही दबाव का जोखिम बढ़ा सकती है।", te: "తడి నేలపై పదేపదే రాకపోకలు గట్టిపడే ప్రమాదాన్ని పెంచుతాయి.", ml: "ഈർപ്പമുള്ള മണ്ണിലൂടെ ആവർത്തിച്ച് സഞ്ചരിക്കുന്നത് കട്ടിയాകാനുള്ള സാധ്യത കൂട്ടാം." },
                },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "l3-rapid-quiz",
          totalXp: 40,
          questions: [
            {
              id: "l3-q1",
              question: { en: "Why avoid heavy machinery on very wet soil?", hi: "बहुत गीली मिट्टी पर भारी मशीनरी क्यों न चलाएँ?", te: "చాలా తడి నేలపై భారీ యంత్రాలను ఎందుకు నడపకూడదు?", ml: "വളരെ നനഞ്ഞ മണ്ണിൽ വലിയ യന്ത്രങ്ങൾ ഉപയോഗിക്കാത്തത് എന്തുകൊണ്ട്?" },
              xp: 20,
              options: [
                { id: "opt-1", text: { en: "It squashes air pores and causes deep compaction", hi: "यह हवा के छिद्रों को दबा देता है और गहरी कठोरता लाता है", te: "ఇది గాలి రంధ్రాలను మూసివేసి నేలను గట్టిపరుస్తుంది", ml: "ഇത് വായു സുഷിരങ്ങളെ അടച്ച് മണ്ണ് കട്ടിയാക്കുന്നു" }, isCorrect: true, explanation: { en: "Wet soil compacts easily, eliminating vital air channels.", hi: "गीली मिट्टी आसानी से दब जाती है जिससे हवा के रास्ते बंद हो जाते हैं।", te: "తడి నేల త్వరగా గట్టిపడి గాలి ప్రసరణను ఆపేస్తుంది.", ml: "നനഞ്ഞ മണ്ണ് വേഗത്തിൽ കട്ടിയാവുകയും വായുസഞ്ചാരം നഷ്ടപ്പെടുകയും ചെയ്യും." } },
                { id: "opt-2", text: { en: "It makes soil too fluffy", hi: "यह मिट्टी को बहुत भुरभुरा बनाता है", te: "ఇది నేలను చాలా మెత్తగా చేస్తుంది", ml: "ഇത് മണ്ണിനെ കൂടുതൽ അയഞ്ഞതാക്കുന്നു" }, isCorrect: false, explanation: { en: "Heavy pressure compacts wet soil rather than loosening it.", hi: "भारी दबाव गीली मिट्टी को दबाता है, ढीला नहीं करता।", te: "భారీ బరువు నేలను అణచివేస్తుంది.", ml: "ഭാരം മണ്ണിനെ അമർത്തുക മാത്രമേ ചെയ്യൂ." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "l3-reward",
          xp: 90,
          badgeTitle: { en: "Soil Thinker", hi: "मृदा चिंतक", te: "నేల ఆలోచనాపరుడు", ml: "മണ്ണ് ചിന്തകൻ" },
          badgeIcon: "psychology",
          badgeDescription: { en: "Made smart, long-term soil management choices.", hi: "स्मार्ट और दीर्घकालिक मृदा प्रबंधन निर्णय लिए।", te: "తెలివైన దీర్ఘకాలిక నేల నిర్వహణ నిర్ణయాలు తీసుకున్నారు.", ml: "മികച്ച ദീർഘകാല മണ്ണ് പരിപാലന തീരുമാനങ്ങൾ ఎടുത്തു." },
          taraDialogue: { en: "You're thinking like a seasoned soil steward now!", hi: "अब आप एक अनुभवी मृदा संरक्षक की तरह सोच रहे हैं!", te: "మీరు ఇప్పుడు అనుభవజ్ఞుడైన రైతులా ఆలోచిస్తున్నారు!", ml: "നിങ്ങൾ ഇപ്പോൾ പരിചയസമ്പന്നനായ കർഷകനെപ്പോലെ ചിന്തിക്കുന്നു!" },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-3"]?.["l3-reward-dialogue"],
          taraExpression: "happy",
        },
      ],
    },

    // =========================================================
    // LEVEL 4 — RECALL: REMEMBER THE SOIL SYSTEM
    // =========================================================
    {
      id: "sustainable-soil-level-4",
      levelNumber: 4,
      title: { en: "Remember the Soil System", hi: "मृदा प्रणाली याद रखें", te: "నేల వ్యవస్థను గుర్తుంచుకోండి", ml: "മണ്ണ് വ്യവസ്ഥ ഓർക്കാം" },
      subtitle: { en: "Reconnect soil components with the value they provide.", hi: "मिट्टी के घटकों को उनके लाभ से पुनः जोड़ें।", te: "నేల భాగాలను అవి అందించే ప్రయోజనాలతో అనుసంధానించండి.", ml: "മണ്ണ് ഘടകങ്ങളെ അവ നൽകുന്ന പ്രയോജനങ്ങളുമായി ബന്ധിപ്പിക്കുക." },
      durationMinutes: 4,
      xpReward: 80,
      phases: [
        {
          type: "memory",
          id: "l4-memory",
          title: { en: "Soil System Memory Grid", hi: "मृदा प्रणाली मेमोरी ग्रिड", te: "నేల వ్యవస్థ జ్ఞాపకశక్తి గ్రిడ్", ml: "മണ്ണ് വ്യവസ്ഥ മെമ്മറി గ్రిడ్" },
          instructions: { en: "Flip and match each soil factor with its beneficial farm function.", hi: "प्रत्येक मृदा कारक को उसके खेत लाभ के साथ मिलाएं।", te: "ప్రతి నేల అంశాన్ని దాని వ్యవసాయ ప్రయోజనంతో జత చేయండి.", ml: "ഓരോ മണ്ണ് ഘടകത്തെയും അതിന്റെ പ്രയോജനവുമായി പൊരുത്തപ്പെടുത്തുക." },
          xp: 40,
          taraDialogue: { en: "Can you remember what each soil factor brings to your crops?", hi: "क्या आपको याद है कि हर मृदा कारक आपकी फसलों को क्या देता है?", te: "ప్రతి నేల అంశం పంటలకు ఏమి ఇస్తుందో గుర్తుందా?", ml: "ഓരോ മണ്ണ് ഘടകവും വിളകൾക്ക് എന്ത് നൽകുന്നു എന്ന് ഓർമ്മയുണ്ടോ?" },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-4"]?.["l4-memory-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-4"]?.["l4-memory-success"],
          taraSuccessDialogue: { en: "Sharp memory! All system connections verified.", hi: "शानदार याददाश्त! सभी प्रणाली संबंध सत्यापित हुए।", te: "మంచి జ్ఞాపకశక్తి! అన్ని సంబంధాలు సరిగ్గా సరిపోయాయి.", ml: "മികച്ച ഓർമ്മശക്തി! എല്ലാം കൃത്യമായി പൊരുത്തപ്പെട്ടു." },
          pairs: [
            {
              id: "mem-pore",
              itemA: { label: { en: "Pore Space", hi: "छिद्र स्थान", te: "రంధ్ర స్థలం", ml: "സുഷിര ഇടം" }, icon: "air", color: "#0284C7" },
              itemB: { label: { en: "Root Breathing", hi: "जड़ों का श्वसन", te: "వేర్ల శ్వాసక్రియ", ml: "వేరുകളുടെ ശ്വസനം" }, icon: "eco", color: "#16A34A" },
              connectionExplanation: { en: "Open pores provide oxygen to roots.", hi: "खुले छिद्र जड़ों को ऑक्सीजन देते हैं।", te: "రంధ్రాలు వేర్లకు ఆక్సిజన్ అందిస్తాయి.", ml: "സുഷിരങ്ങൾ വേരുകൾക്ക് ഓക്സിജൻ നൽകുന്നു." },
            },
            {
              id: "mem-humus",
              itemA: { label: { en: "Organic Humus", hi: "जैविक ह्यूमस", te: "సేంద్రీయ హ్యూమస్", ml: "ജൈവ ഹ്യൂമസ്" }, icon: "compost", color: "#8D6E63" },
              itemB: { label: { en: "Moisture Retention", hi: "नमी संचयन", te: "తేమ నిల్వ", ml: "ഈർപ്പ സംരക്ഷണം" }, icon: "water-drop", color: "#0284C7" },
              connectionExplanation: { en: "Humus holds sponge-like water for roots.", hi: "ह्यूमस जड़ों के लिए स्पंज की तरह पानी रखता है।", te: "హ్యూమస్ స్పాంజిలా నీటిని పట్టి ఉంచుతుంది.", ml: "ഹ്യൂമസ് സ്പോഞ്ച് പോലെ ഈർപ്പം നിലനിർത്തുന്നു." },
            },
            {
              id: "mem-cover",
              itemA: { label: { en: "Soil Cover", hi: "मृदा आवरण", te: "నేల కవచం", ml: "മണ്ണ് ആവരണം" }, icon: "shield", color: "#F59E0B" },
              itemB: { label: { en: "Erosion Shield", hi: "कटाव से बचाव", te: "కోత నివారణ", ml: "മണ്ണൊലിപ്പ് തടയൽ" }, icon: "terrain", color: "#EA580C" },
              connectionExplanation: { en: "Cover blocks wind and raindrop impact.", hi: "आवरण हवा और बारिश के प्रभाव को रोकता है।", te: "కవచం గాలి, వర్షపు కోతను అడ్డుకుంటుంది.", ml: "ആവരണം കാറ്റിൽ നിന്നും മഴയിൽ നിന്നും സംരക്ഷിക്കുന്നു." },
            },
          ],
        },
        {
          type: "mcq",
          id: "l4-true-false",
          totalXp: 40,
          questions: [
            {
              id: "l4-q1",
              question: { en: "True or False: Compacted soil holds more breathable air than loose crumbly soil.", hi: "सही या गलत: कठोर मिट्टी में भुरभुरी मिट्टी की तुलना में अधिक सांस लेने योग्य हवा होती है।", te: "నిజమా కాదా: గట్టిపడిన నేలలో వదులైన నేల కంటే ఎక్కువ గాలి ఉంటుంది.", ml: "ശരിയോ തെറ്റോ: കട്ടിയുള്ള മണ്ണിൽ അയഞ്ഞ മണ്ണിനേക്കാൾ കൂടുതൽ വായു ഉണ്ട്." },
              xp: 20,
              options: [
                { id: "opt-f", text: { en: "False", hi: "गलत", te: "తప్పు", ml: "തെറ്റ്" }, isCorrect: true, explanation: { en: "Compaction crushes pore spaces, suffocating roots.", hi: "कठोरता छिद्रों को बंद कर देती है जिससे जड़ों का दम घुटता है।", te: "గట్టిపడటం వల్ల రంధ్రాలు మూసుకుపోయి వేర్లకు గాలి అందదు.", ml: "മണ്ണ് കട്ടിയാകുമ്പോൾ വായു സുഷിരങ്ങൾ ഇല്ലാതാകുന്നു." } },
                { id: "opt-t", text: { en: "True", hi: "सही", te: "నిజం", ml: "శరి" }, isCorrect: false, explanation: { en: "Compacted soil has far fewer air pores.", hi: "कठोर मिट्टी में हवा के छिद्र बहुत कम होते हैं।", te: "గట్టి నేలలో గాలి రంధ్రాలు చాలా తక్కువగా ఉంటాయి.", ml: "കട്ടിയുള്ള മണ്ണിൽ വായു വളരെ കുറവാണ്." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "l4-reward",
          xp: 80,
          badgeTitle: { en: "System Keeper", hi: "प्रणाली रक्षक", te: "వ్యవస్థ రక్షకుడు", ml: "വ്യവസ്ഥാ സംരക്ഷകൻ" },
          badgeIcon: "all-inclusive",
          badgeDescription: { en: "Mastered the interlocked cycles of soil living systems.", hi: "मृदा जीवित प्रणालियों के परस्पर जुड़े चक्रों में महारत हासिल की।", te: "నేల సజీవ వ్యవస్థల చక్రాలను నేర్చుకున్నారు.", ml: "മണ്ണിലെ പരസ്പരബന്ധിതമായ ചക്രങ്ങൾ മനസ്സിലാക്കി." },
          taraDialogue: { en: "Your grasp on soil ecosystems is getting deeper every day!", hi: "मृदा पारिस्थितिकी तंत्र पर आपकी समझ हर दिन गहरी हो रही है!", te: "నేల పర్యావరణంపై మీ అవగాహన రోజురోజుకూ పెరుగుతోంది!", ml: "മണ്ണ് വ്യവസ്ഥയെക്കുറിച്ചുള്ള നിങ്ങളുടെ അറിവ് മികച്ചതാകുന്നു!" },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-4"]?.["l4-reward-dialogue"],
          taraExpression: "happy",
        },
      ],
    },

    // =========================================================
    // LEVEL 5 — DIAGNOSE: SPOT THE SOIL PROBLEM
    // =========================================================
    {
      id: "sustainable-soil-level-5",
      levelNumber: 5,
      title: { en: "Spot the Soil Problem", hi: "मिट्टी की समस्या पहचानें", te: "నేల సమస్యను గుర్తించండి", ml: "മണ്ണിന്റെ പ്രശ്നം കണ്ടെത്തുക" },
      subtitle: { en: "Read the clues, identify the problem, and choose the remedy.", hi: "संकेतों को पढ़ें, समस्या पहचानें और उपचार चुनें।", te: "సంకేతాలను పరిశీలించి సమస్యను గుర్తించి పరిష్కారాన్ని ఎంచుకోండి.", ml: "ലക്ഷണങ്ങൾ മനസ്സിലാക്കി പ്രശ്നം കണ്ടെത്തി പരിഹാരം തിരഞ്ഞെടുക്കുക." },
      durationMinutes: 5,
      xpReward: 90,
      phases: [
        {
          type: "scenarioChallenge",
          id: "l5-spot-problem",
          title: { en: "Field Diagnosis Challenge", hi: "खेत निदान चुनौती", te: "పొల సమస్య గుర్తింపు సవాలు", ml: "വയൽ പ്രശ്നപരിഹാര ചലഞ്ച്" },
          instructions: { en: "Analyze visual soil symptoms and determine the root cause.", hi: "मिट्टी के लक्षणों का विश्लेषण करें और मूल कारण का पता लगाएं।", te: "నేల లక్షణాలను విశ్లేషించి ప్రధాన కారణాన్ని కనుగొనండి.", ml: "മണ്ണിന്റെ ലക്ഷണങ്ങൾ പരിശോധിച്ച് യഥാർത്ഥ കാരണം കണ്ടെത്തുക." },
          xp: 50,
          taraDialogue: { en: "Look closely at the field clues: surface crusting and standing puddles after light rain.", hi: "खेत के संकेतों को ध्यान से देखें: हल्की बारिश के बाद सतह पर पपड़ी और पानी का जमाव।", te: "పొల సంకేతాలను జాగ్రత్తగా చూడండి: చిన్న వర్షానికే నీరు నిలవడం, పైపొర గట్టిపడటం.", ml: "വയലിലെ ലക്ഷണങ്ങൾ ശ്രദ്ധിക്കൂ: ചെറിയ മഴയിലും വെള്ളക്കെട്ടും മുകൾഭാഗം വരണ്ടുണങ്ങലും." },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-5"]?.["l5-spot-problem-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-5"]?.["l5-spot-problem-success"],
          taraSuccessDialogue: { en: "Accurate diagnosis! Recognizing the symptom is the first step to healing land.", hi: "सटीक निदान! लक्षण पहचानना भूमि सुधार का पहला कदम है।", te: "ఖచ్చితమైన గుర్తింపు! సమస్యను తెలుసుకోవడమే పరిష్కారానికి మొదటి అడుగు.", ml: "കൃത്യമായ കണ്ടെത്തൽ! ലക്ഷണം തിരിച്ചറിയുന്നത് പരിഹാരത്തിന്റെ ആദ്യപടിയാണ്." },
          rounds: [
            {
              id: "l5-r1",
              roundNumber: 1,
              topic: { en: "Crusted Surface", hi: "सतह पर पपड़ी", te: "గట్టిపడిన పైపొర", ml: "വരണ്ട മുകൾഭാഗം" },
              prompt: { en: "Water pools on top and fails to soak in. What is happening?", hi: "पानी सतह पर जमा रहता है और अंदर नहीं जाता। क्या हो रहा है?", te: "నీరు ఇంకకుండా పైనే నిలిచిపోతోంది. ఏమి జరుగుతోంది?", ml: "വെള്ളം താഴേക്ക് ഇറങ്ങാതെ മുകളിൽ നിൽക്കുന്നു. കാരണം എന്താണ്?" },
              options: [
                { id: "opt-compaction", label: "A", title: { en: "Surface Compaction & Crusting", hi: "सतह का दबाव और पपड़ी", te: "ఉపరితల గట్టిపడటం", ml: "ഉపరిതല കട്ടിയാകൽ" }, isCorrect: true, explanation: { en: "Capping seals surface pores, preventing water infiltration.", hi: "पपड़ी सतह के छिद्रों को बंद कर देती है जिससे पानी अंदर नहीं जाता।", te: "గట్టి పొర రంధ్రాలను మూసివేసి నీటి ఇంకింపును అడ్డుకుంటుంది.", ml: "കട്ടിയായ ഉപരിതലം വെള്ളം താഴേക്ക് ഇറങ്ങുന്നത് തടయുന്നു." } },
                { id: "opt-fertility", label: "B", title: { en: "Excessive organic humus", hi: "अत्यधिक जैविक ह्यूमस", te: "అధిక సేంద్రీయ హ్యూమస్", ml: "കൂടുതൽ ജൈവ ഹ്യൂമസ്" }, isCorrect: false, explanation: { en: "Humus absorbs water rapidly; it does not cause ponding crusts.", hi: "ह्यूमस पानी को तेजी से सोखता है, पपड़ी नहीं बनाता।", te: "హ్యూమస్ నీటిని త్వరగా పీల్చుకుంటుంది.", ml: "ഹ്യൂമസ് വെള്ളം വേഗത്തിൽ വലിച്ചെടുക്കുന്നു." } },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "l5-reasoning",
          totalXp: 40,
          questions: [
            {
              id: "l5-q1",
              question: { en: "What is the best immediate remedy for crusted, compacted soil surface?", hi: "पपड़ीदार और कठोर मिट्टी की सतह के लिए सबसे अच्छा तात्कालिक उपाय क्या है?", te: "పైపొర గట్టిపడిన నేలకు ఉత్తమ తక్షణ పరిష్కారం ఏమిటి?", ml: "മുകൾഭാഗം കട്ടിയായ മണ്ണിന് ഏറ്റവും അനുയോജ്യമായ ഉടനടിയുള്ള പരിഹാരം എന്താണ്?" },
              xp: 20,
              options: [
                { id: "opt-mulch", text: { en: "Apply organic mulch cover and shallow aerating", hi: "जैविक मल्च का आवरण लगाएं और हल्की जुताई करें", te: "సేంద్రీయ మల్చింగ్ చేసి తేలికపాటి గాలి ప్రసరణ కల్పించండి", ml: "ജൈവ മൾച്ച് നൽകുകയും നേരിയ തോതിൽ ഇളക്കുകയും ചെയ്യുക" }, isCorrect: true, explanation: { en: "Mulch cushions raindrops and stimulates earthworms to open pores.", hi: "मल्च बारिश की बूंदों के प्रभाव को रोकता है और केंचुओं को सक्रिय करता है।", te: "మల్చింగ్ వర్షపు దెబ్బను తగ్గించి వానపాములను చురుగ్గా చేస్తుంది.", ml: "മൾച്ച് മഴത്തുള്ളികളുടെ ആഘാതം കുറയ്ക്കുകയും മണ്ണിനെ സംരക്ഷിക്കുകയും ചെയ്യുന്നു." } },
                { id: "opt-flood", text: { en: "Flood the soil continuously", hi: "मिट्टी में लगातार पानी भरें", te: "నిరంతరం నీటిని నింపండి", ml: "തുടർച്ചയായി വെള്ളം ഒഴുക്കുക" }, isCorrect: false, explanation: { en: "Continuous flooding displaces remaining air and worsens capping.", hi: "लगातार पानी भरने से बची हुई हवा भी निकल जाती है।", te: "ఎక్కువ నీరు గాలిని బయటకు నెట్టివేస్తుంది.", ml: "തുടർച്ചയായ വെള്ളക്കെട്ട് കൂടുതൽ ദോഷം ചെയ്യും." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "l5-reward",
          xp: 90,
          badgeTitle: { en: "Soil Detective", hi: "मृदा जासूस", te: "నేల పరిశోధకుడు", ml: "മണ്ണ് ഡിറ്റക്ടീവ്" },
          badgeIcon: "search",
          badgeDescription: { en: "Diagnosed soil physical stress signs like a professional agronomist.", hi: "एक पेशेवर कृषि विज्ञानी की तरह मिट्टी के तनाव संकेतों की पहचान की।", te: "నిపుణుడైన శాస్త్రవేత్తలా నేల ఒత్తిడి సంకేతాలను గుర్తించారు.", ml: "വിദഗ്ദ്ധനെപ്പോലെ മണ്ണിന്റെ പ്രശ്നങ്ങൾ തിരിച്ചറിഞ്ഞു." },
          taraDialogue: { en: "Great work! You can spot hidden soil stress before crops show damage.", hi: "शानदार काम! फसलों को नुकसान दिखने से पहले ही आप मिट्टी का तनाव पहचान सकते हैं।", te: "అద్భుతం! పంటలు దెబ్బతినక ముందే మీరు నేల సమస్యలను గుర్తిస్తున్నారు.", ml: "മികച്ച പ്രവർത്തനം! വിളകൾക്ക് കേടുപാടുകൾ വരുന്നതിന് മുമ്പ് തന്നെ പ്രശ്നം തിരിച്ചറിയാൻ കഴിഞ്ഞു." },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-5"]?.["l5-reward-dialogue"],
          taraExpression: "excited",
        },
      ],
    },

    // =========================================================
    // LEVEL 6 — SOLVE: CHOOSE THE RIGHT ACTION
    // =========================================================
    {
      id: "sustainable-soil-level-6",
      levelNumber: 6,
      title: { en: "Choose the Right Action", hi: "सही कार्रवाई चुनें", te: "సరైన చర్యను ఎంచుకోండి", ml: "ശരിയായ നടപടി തിരഞ്ഞെടുക്കുക" },
      subtitle: { en: "Solve a soil problem step by step and understand the long-term benefit.", hi: "मिट्टी की समस्या को चरणबद्ध हल करें और दीर्घकालिक लाभ समझें।", te: "నేల సమస్యను దశలవారీగా పరిష్కరించి దీర్ఘకాలిక ప్రయోజనాన్ని అర్థం చేసుకోండి.", ml: "മണ്ണിന്റെ പ്രശ്നം ഘട്ടം ഘട്ടമായി പരിഹരിച്ച് ദീർഘകാല ഗുണം മനസ്സിലാക്കുക." },
      durationMinutes: 5,
      xpReward: 100,
      phases: [
        {
          type: "scenarioChallenge",
          id: "l6-solve",
          title: { en: "The Soil Rescue", hi: "मिट्टी बचाओ चुनौती", te: "నేల రక్షణ సవాలు", ml: "മണ്ണ് രക്ഷാ ചലഞ്ച്" },
          instructions: { en: "Observe, choose an action, then choose again based on the new situation.", hi: "अवलोकन करें, उपाय चुनें और नई स्थिति के अनुसार फिर निर्णय लें।", te: "పరిశీలించి చర్యను ఎంచుకుని, కొత్త పరిస్థితి ఆధారంగా మళ్లీ ఎంచుకోండి.", ml: "നിരീക്ഷിച്ച് നടപടി തിരഞ്ഞെടുക്കുക, പുതിയ സാഹചര്യത്തിന് അനുസരിച്ച് വീണ്ടും തിരഞ്ഞെടുക്കുക." },
          xp: 60,
          taraDialogue: {
            en: "There is no one-click answer here. Observe, choose, and think about what happens next.",
            hi: "यहाँ एक क्लिक का जवाब नहीं है। देखें, चुनें और सोचें कि आगे क्या होगा।",
            te: "ఇక్కడ ఒకే క్లిక్ సమాధానం లేదు. గమనించి, ఎంచుకుని, తర్వాత ఏమవుతుందో ఆలోచించండి.",
            ml: "ഇവിടെ ഒറ്റ ക്ലിക്ക് ഉത്തരമില്ല. നിരീക്ഷിച്ച്, തിരഞ്ഞെടുക്കൂ, പിന്നെ എന്ത് സംഭവിക്കും എന്ന് ചിന്തിക്കൂ.",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-6"]?.["l6-solve-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-6"]?.["l6-solve-success"],
          taraSuccessDialogue: {
            en: "Excellent! You solved the problem as a connected system.",
            hi: "बहुत बढ़िया! आपने समस्या को पूरी प्रणाली के रूप में हल किया।",
            te: "అద్భుతం! మీరు సమస్యను మొత్తం వ్యవస్థగా పరిష్కరించారు.",
            ml: "മികച്ചത്! നിങ്ങൾ പ്രശ്നത്തെ മുഴുവൻ വ്യവസ്ഥയായി പരിഹരിച്ചു.",
          },
          rounds: [
            {
              id: "l6-observe",
              roundNumber: 1,
              topic: { en: "Observe", hi: "अवलोकन", te: "పరిశీలన", ml: "നിരീക്ഷണം" },
              prompt: { en: "The surface is bare and dries quickly. What should you focus on first?", hi: "सतह खुली है और जल्दी सूखती है। पहले किस पर ध्यान दें?", te: "ఉపరితలం ఖాళీగా ఉంది, త్వరగా ఎండిపోతోంది. ముందుగా దేనిపై దృష్టి పెట్టాలి?", ml: "ഉపరిതലം തുറന്നുകിടക്കുന്നു, വേഗത്തിൽ ഉണങ്ങുന്നു. ആദ്യം എന്തിൽ ശ്രദ്ധിക്കണം?" },
              options: [
                {
                  id: "protect",
                  label: "A",
                  title: { en: "Protect the soil surface", hi: "मिट्टी की सतह की रक्षा करें", te: "నేల ఉపరితలాన్ని కాపాడండి", ml: "മണ്ണിന്റെ ഉപരിതലം സംരക്ഷിക്കുക" },
                  isCorrect: true,
                  explanation: { en: "The next step can focus on suitable cover or residues.", hi: "अगला कदम उपयुक्त आवरण या अवशेषों पर केंद्रित हो सकता है।", te: "తదుపరి దశ తగిన కవచం లేదా అవశేషాలపై దృష్టి పెట్టవచ్చు.", ml: "അടുത്ത ഘട്ടം അനുയോജ്യമായ ആവരണം അല്ലെങ്കിൽ അവശിഷ്ടങ്ങളിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കാം." },
                },
                {
                  id: "ignore",
                  label: "B",
                  title: { en: "Ignore the surface clue", hi: "सतह के संकेत को नजरअंदाज करें", te: "ఉపరితల సంకేతాన్ని పట్టించుకోకండి", ml: "ഉపరిതല ലക്ഷണം അവഗണിക്കുക" },
                  isCorrect: false,
                  explanation: { en: "You miss the most visible clue in the situation.", hi: "आप स्थिति के सबसे स्पष्ट संकेत को छोड़ देते हैं।", te: "పరిస్థితిలోని ముఖ్య సంకేతాన్ని మీరు మిస్ చేస్తారు.", ml: "സാഹചര്യത്തിലെ ప్రధాన లక్షണം നിങ്ങൾ అవഗണിക്കുന്നു." },
                },
              ],
            },
            {
              id: "l6-action",
              roundNumber: 2,
              topic: { en: "Action", hi: "कार्रवाई", te: "చర్య", ml: "നടപടി" },
              prompt: { en: "Which practice fits the soil-protection goal?", hi: "मिट्टी की सुरक्षा के लक्ष्य से कौन सा उपाय मेल खाता है?", te: "నేల సంరక్షణ లక్ష్యానికి ఏ పద్ధతి సరిపోతుంది?", ml: "മണ്ണ് സംరക്ഷണ ലക്ഷ്യത്തിന് ഏത് രീതി അനുയോജ്യമാണ്?" },
              options: [
                {
                  id: "residues",
                  label: "A",
                  title: { en: "Retain suitable plant residues", hi: "उपयुक्त फसल अवशेष रखें", te: "తగిన పంట అవశేషాలను ఉంచండి", ml: "അനുയോജ്യമായ വിള അവശിഷ്ടങ്ങൾ നിലനിർത്തുക" },
                  isCorrect: true,
                  explanation: { en: "Suitable residues can protect the surface and contribute organic material.", hi: "उपयुक्त अवशेष सतह की रक्षा कर सकते हैं और जैविक पदार्थ दे सकते हैं।", te: "తగిన అవశేషాలు నేలను కాపాడి సేంద్రీయ పదార్థాన్ని అందించగలవు.", ml: "അനുയോജ്യമായ അവശിഷ്ടങ്ങൾ മണ്ണിനെ സംരക്ഷിക്കുകയും ജൈവവസ്തുക്കൾ നൽകുകയും ചെയ്യും." },
                },
              ],
            },
            {
              id: "l6-reason",
              roundNumber: 3,
              topic: { en: "Reason", hi: "कारण", te: "కారణం", ml: "കാരണം" },
              prompt: { en: "What is the main idea behind your choice?", hi: "आपके चुनाव के पीछे मुख्य विचार क्या है?", te: "మీ ఎంపిక వెనుక ప్రధాన ఆలోచన ఏమిటి?", ml: "നിങ്ങളുടെ തിരഞ്ഞെടുപ്പിന് പിന്നിലെ പ്രധാന ആശയം എന്താണ്?" },
              options: [
                {
                  id: "system",
                  label: "A",
                  title: { en: "Protect the system while supporting its natural cycles", hi: "प्रणाली की रक्षा करते हुए उसके प्राकृतिक चक्रों को सहारा देना", te: "వ్యవస్థను కాపాడుతూ సహజ చక్రాలకు మద్దతు ఇవ్వడం", ml: "വ്യവസ്ഥയെ സംരക്ഷിച്ച് സ്വാഭാവിക ചക്രങ്ങളെ പിന്തുണയ്ക്കുക" },
                  isCorrect: true,
                  explanation: { en: "You are thinking beyond the immediate task.", hi: "आप तत्काल काम से आगे सोच रहे हैं।", te: "మీరు వెంటనే జరిగే పనిని మించి ఆలోచిస్తున్నారు.", ml: "നിങ്ങൾ ഉടൻ ചെയ്യേണ്ട കാര്യത്തിന് അപ്പുറം ചിന്തിക്കുന്നു." },
                },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "l6-consequence-quiz",
          totalXp: 40,
          questions: [
            {
              id: "l6-q1",
              question: { en: "What makes a soil-care decision sustainable?", hi: "मृदा देखभाल का निर्णय सतत कब कहलाता है?", te: "నేల సంరక్షణ నిర్ణయం సుస్థిరంగా ఎప్పుడు ఉంటుంది?", ml: "മണ്ണ് സംരക്ഷണ തീരുമാനം സുസ്ഥിരമാകുന്നത് എപ്പോൾ?" },
              xp: 20,
              options: [
                { id: "opt-1", text: { en: "It protects long-term biology, structure, and productivity without degrading resources", hi: "यह संसाधनों को नष्ट किए बिना दीर्घकालिक जैविकता, संरचना और उत्पादकता की रक्षा करता है", te: "వనరులను నాశనం చేయకుండా దీర్ఘకాలిక నేల జీవం, నిర్మాణం మరియు ఉత్పాదకతను కాపాడుతుంది", ml: "വിഭവങ്ങൾ നശിപ്പിക്കാതെ ദീർഘകാല ജൈവീകതയും ഘടനയും ഉൽപാദനക്ഷമതയും സംരക്ഷിക്കുന്നു" }, isCorrect: true, explanation: { en: "Sustainability balances current yield with the future life of the soil.", hi: "सततता वर्तमान उपज को मिट्टी के भविष्य के जीवन के साथ संतुलित करती है।", te: "సుస్థిరత నేటి దిగుబడిని నేల భవిష్యత్తుతో సమతుల్యం చేస్తుంది.", ml: "സുസ്ഥിരത ഇന്നത്തെ വിളവും മണ്ണിന്റെ ഭാവിയും തമ്മിൽ సന്തുలనం ചെയ്യുന്നു." } },
                { id: "opt-2", text: { en: "It provides a quick fix even if it harms earthworms", hi: "यह त्वरित समाधान देता है भले ही केंचुओं को नुकसान हो", te: "వానపాములకు హాని జరిగినా వెంటనే ఫలితం ఇస్తుంది", ml: "ഞാഞ്ഞൂലുകൾക്ക് ദോഷം ചെയ്താലും പെട്ടെന്ന് ഫലം നൽകുന്നു" }, isCorrect: false, explanation: { en: "Harming soil life degrades future farm capability.", hi: "मिट्टी के जीवों को नुकसान पहुँचाने से भविष्य की क्षमता घटती है।", te: "నేల జీవులకు హాని భవిష్యత్ దిగుబడిని తగ్గిస్తుంది.", ml: "മണ്ണിലെ ജീവികൾക്ക് ദോഷം ചെയ്യുന്നത് ഭാവിയെ ബാധിക്കും." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "l6-reward",
          xp: 100,
          badgeTitle: { en: "Action Leader", hi: "कर्मवीर", te: "కార్యాచరణ నాయకుడు", ml: "കർമ്മ നായകൻ" },
          badgeIcon: "handyman",
          badgeDescription: { en: "Applied systematic problem-solving methods to farm soil challenges.", hi: "खेत की मृदा चुनौतियों के लिए व्यवस्थित समस्या-समाधान विधियों को लागू किया।", te: "వ్యవసాయ నేల సవాళ్లకు క్రమబద్ధమైన పరిష్కారాలను వర్తింపజేశారు.", ml: "മണ്ണ് പ്രശ്നങ്ങൾ പരിഹരിക്കുന്നതിനുള്ള ചിട്ടയായ രീതികൾ പ്രയോഗിച്ചു." },
          taraDialogue: { en: "Outstanding! You know how to make choices that nourish the land season after season!", hi: "उत्कृष्ट! अब आप ऐसे निर्णय लेना जानते हैं जो हर मौसम में भूमि का पोषण करते हैं!", te: "అద్భుతం! ప్రతి కాలంలోనూ భూమిని పోషించే నిర్ణయాలు తీసుకోవడం మీకు తెలుసు!", ml: "മികച്ചത്! ഓരോ കാലത്തും മണ്ണിനെ ഫലభూയിഷ്ഠമാക്കുന്ന തീരുമാനങ്ങൾ എടുക്കാൻ നിങ്ങൾ പഠിച്ചു!" },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-6"]?.["l6-reward-dialogue"],
          taraExpression: "excited",
        },
      ],
    },

    // =========================================================
    // LEVEL 7 — DO: REAL FARM MISSION + EVIDENCE
    // =========================================================
    {
      id: "sustainable-soil-level-7",
      levelNumber: 7,
      title: { en: "Your Soil Mission", hi: "आपका मृदा मिशन", te: "మీ నేల మిషన్", ml: "നിങ്ങളുടെ മണ്ണ് മിഷൻ" },
      subtitle: { en: "Take the lesson outside the screen with a simple field observation.", hi: "सरल खेत-अवलोकन के साथ सीख को स्क्रीन से बाहर ले जाएँ।", te: "సరళమైన పొల పరిశీలనతో నేర్చుకున్నదాన్ని స్క్రీన్ బయట ఆచరించండి.", ml: "ലളിതമായ വയൽ നിരീക്ഷണത്തിലൂടെ പഠിച്ചത് സ്ക്രീനിന് പുറത്തേക്ക് കൊണ്ടുപോകൂ." },
      durationMinutes: 4,
      xpReward: 110,
      phases: [
        {
          type: "scenarioChallenge",
          id: "l7-field-mission",
          title: { en: "Field Observation Mission", hi: "खेत अवलोकन मिशन", te: "పొల పరిశీలన మిషన్", ml: "വയൽ നിരീക്ഷണ മിഷൻ" },
          instructions: {
            en: "In a safe soil area, observe surface cover, moisture, structure, and signs of life. Record what you actually see.",
            hi: "किसी सुरक्षित मिट्टी वाले स्थान पर सतह का आवरण, नमी, संरचना और जीवन के संकेत देखें। जो दिखे उसे दर्ज करें।",
            te: "సురక్షితమైన నేల ప్రాంతంలో ఉపరితల కవచం, తేమ, నిర్మాణం మరియు జీవ సంకేతాలను గమనించి నిజంగా కనిపించినదాన్ని నమోదు చేయండి.",
            ml: "സുരക്ഷിതമായ മണ്ണ് പ്രദേശത്ത് ഉപരിതല ആവരണം, ഈർപ്പം, ഘടന, ജീവന്റെ ലക്ഷണങ്ങൾ എന്നിവ നിരീക്ഷിച്ച് കണ്ടത് രേഖപ്പെടുത്തുക.",
          },
          xp: 60,
          taraDialogue: {
            en: "This is where learning becomes action. You do not need a laboratory. Start by looking carefully at the soil around you.",
            hi: "यहीं सीख कार्रवाई बनती है। आपको प्रयोगशाला की जरूरत नहीं है। अपने आसपास की मिट्टी को ध्यान से देखकर शुरुआत करें।",
            te: "ఇక్కడే నేర్చుకోవడం ఆచరణగా మారుతుంది. ప్రయోగశాల అవసరం లేదు. మీ చుట్టూ ఉన్న నేలను జాగ్రత్తగా చూడండి.",
            ml: "ഇവിടെയാണ് പഠനം പ്രവർത്തിയാകുന്നത്. ലാബ് ആവശ്യമില്ല. നിങ്ങളുടെ ചുറ്റുമുള്ള മണ്ണ് ശ്രദ്ധിച്ച് നോക്കൂ.",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-7"]?.["l7-field-mission-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-7"]?.["l7-field-mission-success"],
          taraSuccessDialogue: {
            en: "Mission recorded! You just practiced real-world soil observation.",
            hi: "मिशन दर्ज हो गया! आपने वास्तविक दुनिया में मृदा-अवलोकन का अभ्यास किया।",
            te: "మిషన్ నమోదు అయింది! మీరు నిజ జీవితంలో నేల పరిశీలన చేశారు.",
            ml: "മിഷൻ രേഖപ്പെടുത്തി! നിങ്ങൾ യഥാർത്ഥ ലോകത്ത് മണ്ണ് നിരീക്ഷിച്ചു.",
          },
          rounds: [
            {
              id: "l7-cover",
              roundNumber: 1,
              topic: { en: "Surface Cover", hi: "सतह का आवरण", te: "ఉపరితల కవచం", ml: "ഉపరిതല ആവരണം" },
              prompt: { en: "What do you observe on the soil surface?", hi: "मिट्टी की सतह पर आप क्या देखते हैं?", te: "నేల ఉపరితలంపై మీరు ఏమి గమనించారు?", ml: "മണ്ണിന്റെ ഉപരിതലത്തിൽ നിങ്ങൾ എന്താണ് കാണുന്നത്?" },
              options: [
                {
                  id: "covered",
                  label: "A",
                  title: { en: "Plant cover or residues", hi: "पौध आवरण या अवशेष", te: "మొక్కల కవచం లేదా అవశేషాలు", ml: "സസ്യാവരണം അല്ലെങ്കിൽ അവശിഷ്ടങ്ങൾ" },
                  isCorrect: true,
                  explanation: { en: "Record what you actually see. Suitable cover can support soil protection.", hi: "जो दिखे उसे दर्ज करें। उपयुक्त आवरण मिट्टी की रक्षा में मदद कर सकता है।", te: "కనిపించినదాన్ని నమోదు చేయండి. తగిన కవచం నేలను కాపాడుతుంది.", ml: "കാണുന്നത് രേഖപ്പെടുത്തുക. അനുയോജ്യമായ ആവരണം മണ്ണിനെ സംരക്ഷിക്കാൻ സഹായിക്കും." },
                },
                {
                  id: "bare",
                  label: "B",
                  title: { en: "Bare surface", hi: "खुली सतह", te: "ఖాళీ ఉపరితలం", ml: "തുറന്ന ഉപരിതലം" },
                  isCorrect: true,
                  explanation: { en: "That is also a useful observation. The mission is to notice, not guess.", hi: "यह भी उपयोगी अवलोकन है। मिशन देखने का है, अनुमान लगाने का नहीं।", te: "ఇది కూడా ఉపయోగకరమైన గమనిక. మిషన్ గమనించడమే, ఊహించడం కాదు.", ml: "ഇതും ഉപകാരപ്രദമായ നിരീക്ഷണമാണ്. മിഷൻ ശ്രദ്ധിക്കലാണ്, ഊഹിക്കലല്ല." },
                },
              ],
            },
            {
              id: "l7-life",
              roundNumber: 2,
              topic: { en: "Signs of Life", hi: "जीवन के संकेत", te: "జీవ సంకేతాలు", ml: "ജീവന്റെ ലക്ഷണങ്ങൾ" },
              prompt: { en: "Do you notice roots, earthworm signs, insects, or other biological activity?", hi: "क्या आपको जड़ें, केंचुओं के संकेत, कीट या अन्य जैविक गतिविधि दिखाई देती है?", te: "వేర్లు, వానపాము సంకేతాలు, పురుగులు లేదా ఇతర జీవక్రియ కనిపిస్తున్నాయా?", ml: "വേരുകൾ, ഞാഞ്ഞൂൽ ലക്ഷണങ്ങൾ, കീടങ്ങൾ അല്ലെങ്കിൽ മറ്റ് ജൈവ പ്രവർത്തനം കാണുന്നുണ്ടോ?" },
              options: [
                {
                  id: "yes",
                  label: "A",
                  title: { en: "Yes, I noticed signs", hi: "हाँ, संकेत दिखे", te: "అవును, సంకేతాలు కనిపించాయి", ml: "അതെ, ലക്ഷണങ്ങൾ കണ്ടു" },
                  isCorrect: true,
                  explanation: { en: "Biological activity can be a useful clue when observing soil.", hi: "मिट्टी देखते समय जैविक गतिविधि उपयोगी संकेत हो सकती है।", te: "నేలను పరిశీలించేటప్పుడు జీవక్రియ ఉపయోగకరమైన సంకేతం.", ml: "മണ്ണ് നിരീക്ഷിക്കുമ്പോൾ ജൈവ പ്രവർത്തനം ഉപകാരപ്രദമായ ലക്ഷണമാകാം." },
                },
                {
                  id: "no",
                  label: "B",
                  title: { en: "I did not notice any", hi: "मुझे नहीं दिखा", te: "ఏమీ కనిపించలేదు", ml: "ഒന്നും ശ്രദ്ധിച്ചില്ല" },
                  isCorrect: true,
                  explanation: { en: "That is also valid. Careful observation includes recording what you do not see.", hi: "यह भी सही है। ध्यानपूर्वक अवलोकन में जो नहीं दिखा उसे दर्ज करना भी शामिल है।", te: "అది కూడా సరైన గమనిక. కనిపించనిదాన్ని కూడా నమోదు చేయాలి.", ml: "അതും സാധുവായ നിരീക്ഷണമാണ്. കാണാത്തതും രേഖപ്പെടുത്തണം." },
                },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "l7-reward",
          xp: 110,
          badgeTitle: { en: "Field Observer", hi: "खेत पर्यवेक्षक", te: "పొల పరిశీలకుడు", ml: "വയൽ നിരീക്ഷകൻ" },
          badgeIcon: "photo-camera",
          badgeDescription: { en: "Completed real field observation outside the screen.", hi: "स्क्रीन से बाहर वास्तविक खेत अवलोकन पूरा किया।", te: "స్క్రీన్ బయట నిజమైన పొల పరిశీలన పూర్తి చేసారు.", ml: "സ്ക്രീനിന് പുറത്ത് യഥാർത്ഥ വയൽ നിരീക്ഷണം പൂർത്തിയാക്കി." },
          taraDialogue: {
            en: "You took your learning outside the screen. That is the heart of TARA: learn, act, and keep improving.",
            hi: "आपने सीख को स्क्रीन से बाहर खेत तक पहुँचाया। यही TARA का उद्देश्य है: सीखना, करना और बेहतर बनते रहना।",
            te: "మీరు నేర్చుకున్నదాన్ని స్క్రీన్ బయట పొలంలో ఆచరించారు. ఇదే TARA లక్ష్యం: నేర్చుకోండి, ఆచరించండి, మెరుగుపడండి.",
            ml: "പഠിച്ചത് സ്ക്രീനിന് പുറത്തേക്ക് വയലിലേക്ക് കൊണ്ടുപോയി. അതാണ് TARAയുടെ ലക്ഷ്യം: പഠിക്കുക, ചെയ്യുക, മെച്ചപ്പെടുത്തുക.",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-7"]?.["l7-reward-dialogue"],
          taraExpression: "happy",
        },
      ],
    },

    // =========================================================
    // LEVEL 8 — MASTER: FINAL CHALLENGE + TARA AI INTERVIEW
    // =========================================================
    {
      id: "sustainable-soil-level-8",
      levelNumber: 8,
      title: { en: "Become a Sustainable Soil Master", hi: "सतत मृदा विशेषज्ञ बनें", te: "సుస్థిర నేల నిపుణుడిగా మారండి", ml: "സുസ്ഥിര മണ്ണ് വിദഗ്ധനാകൂ" },
      subtitle: { en: "Prove that you can observe, decide, explain, and act.", hi: "साबित करें कि आप देख, निर्णय, समझा और कार्रवाई कर सकते हैं।", te: "మీరు గమనించి, నిర్ణయించి, వివరించి, ఆచరించగలరని నిరూపించండి.", ml: "നിരീക്ഷിക്കാനും തീരുമാനിക്കാനും വിശദീകരിക്കാനും പ്രവർത്തിക്കാനും കഴിയുമെന്ന് തെളിയിക്കുക." },
      durationMinutes: 7,
      xpReward: 120,
      phases: [
        {
          type: "scenarioChallenge",
          id: "l8-final-challenge",
          title: { en: "The Final Soil Challenge", hi: "अंतिम मृदा चुनौती", te: "తుది నేల సవాలు", ml: "അവസാന മണ്ണ് ചലഞ്ച്" },
          instructions: { en: "Use everything you learned: identify, decide, and explain.", hi: "जो कुछ सीखा है उसका उपयोग करें: पहचानें, निर्णय लें और समझाएँ।", te: "మీరు నేర్చుకున్నదంతా ఉపయోగించండి: గుర్తించండి, నిర్ణయించండి, వివరించండి.", ml: "പഠിച്ചതെല്ലാം ഉപയോഗിക്കുക: കണ്ടെത്തുക, തീരുമാനിക്കുക, വിശദീകരിക്കുക." },
          xp: 50,
          taraDialogue: {
            en: "A soil-smart farmer does not just know the answer. They know why.",
            hi: "मिट्टी-समझदार किसान सिर्फ उत्तर नहीं जानता, वह कारण भी जानता है।",
            te: "నేల జ్ఞానం ఉన్న రైతు సమాధానం మాత్రమే కాదు, కారణం కూడా తెలుసుకుంటాడు.",
            ml: "മണ്ണിനെ മനസ്സിലാക്കിയ കർഷകന് ഉത്തരം മാത്രമല്ല, കാരണം കൂടി അറിയാം.",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-8"]?.["l8-final-challenge-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-8"]?.["l8-final-challenge-success"],
          taraSuccessDialogue: {
            en: "You connected the clue, the decision, and the outcome. That is mastery.",
            hi: "आपने संकेत, निर्णय और परिणाम को जोड़ दिया। यही महारत है।",
            te: "మీరు సంకేతం, నిర్ణయం, ఫలితాన్ని అనుసంధానించారు. ఇదే నైపుణ్యం.",
            ml: "ലക്ഷണം, തീരുമാനം, ഫലം എന്നിവ ബന്ധിപ്പിച്ചു. ഇതാണ് മികവ്.",
          },
          rounds: [
            {
              id: "l8-diagnose",
              roundNumber: 1,
              topic: { en: "Diagnose", hi: "समस्या पहचानें", te: "సమస్య గుర్తింపు", ml: "പ്രശ്നം കണ്ടെത്തുക" },
              prompt: { en: "The soil is hard, pore spaces are limited, and roots struggle. What is the strongest clue?", hi: "मिट्टी कठोर है, छिद्र कम हैं और जड़ों को कठिनाई है। सबसे मजबूत संकेत क्या है?", te: "నేల గట్టిగా ఉంది, రంధ్రాలు తక్కువ, వేర్లకు ఇబ్బంది. ప్రధాన సంకేతం ఏమిటి?", ml: "മണ്ണ് കട്ടിയുള്ളതാണ്, സുഷിരങ്ങൾ കുറവ്, വേരുകൾക്ക് ബുദ്ധിമുട്ട്. പ്രധാന ലക്ഷണം എന്താണ്?" },
              options: [
                {
                  id: "compaction",
                  label: "A",
                  title: { en: "Compaction", hi: "मिट्टी का दबाव", te: "నేల గట్టిపడటం", ml: "മണ്ണ് കട്ടിയാകൽ" },
                  isCorrect: true,
                  explanation: { en: "Dense soil and limited pore space are strong clues of compaction.", hi: "घनी मिट्टी और कम छिद्र दबाव के मजबूत संकेत हैं।", te: "గట్టి నేల, తక్కువ రంధ్రాలు గట్టిపడిన నేలకు సంకేతాలు.", ml: "കട്ടിയുള്ള മണ്ണും കുറഞ്ഞ സുഷിരങ്ങളും കട്ടിയാകലിന്റെ ശക്തമായ ലക്ഷണങ്ങളാണ്." },
                },
              ],
            },
            {
              id: "l8-action",
              roundNumber: 2,
              topic: { en: "Act", hi: "कार्रवाई", te: "చర్య", ml: "നടപടി" },
              prompt: { en: "Which approach best fits the goal of protecting soil structure?", hi: "मिट्टी की संरचना की रक्षा के लिए कौन सा तरीका बेहतर है?", te: "నేల నిర్మాణాన్ని కాపాడటానికి ఏ విధానం మంచిది?", ml: "മണ്ണിന്റെ ഘടന സംരക്ഷിക്കാൻ ఏത് സമീപనമാണ് മികച്ചത്?" },
              options: [
                {
                  id: "protect",
                  label: "A",
                  title: { en: "Reduce unnecessary compaction and protect structure", hi: "अनावश्यक दबाव कम करें और संरचना बचाएँ", te: "అనవసర గట్టిపడటాన్ని తగ్గించి నిర్మాణాన్ని కాపాడండి", ml: "അനാവശ്യ കട്ടിയാകൽ കുറച്ച് ഘടന സംരക്ഷിക്കുക" },
                  isCorrect: true,
                  explanation: { en: "The response should match the observed soil condition.", hi: "उपाय देखी गई मिट्टी की स्थिति के अनुसार होना चाहिए।", te: "చర్య గమనించిన నేల పరిస్థితికి అనుగుణంగా ఉండాలి.", ml: "നിരീക്ഷിച്ച മണ്ണിന്റെ അവസ്ഥയ്ക്ക് അനുസരിച്ചായിരിക്കണം നടപടി." },
                },
              ],
            },
            {
              id: "l8-explain",
              roundNumber: 3,
              topic: { en: "Explain", hi: "समझाएँ", te: "వివరించండి", ml: "വിശదീകരിക്കുക" },
              prompt: { en: "Why does soil structure matter?", hi: "मिट्टी की संरचना क्यों महत्वपूर्ण है?", te: "నేల నిర్మాణం ఎందుకు ముఖ్యం?", ml: "മണ്ണിന്റെ ഘടന എന്തുകൊണ്ട് പ്രധാനമാണ്?" },
              options: [
                {
                  id: "balance",
                  label: "A",
                  title: { en: "It helps maintain spaces for roots, air, and water", hi: "यह जड़ों, हवा और पानी के लिए जगह बनाए रखने में मदद करती है", te: "ఇది వేర్లు, గాలి, నీటికి స్థలాన్ని కాపాడుతుంది", ml: "ഇത് വേരുകൾക്കും വായുവിനും വെള്ളത്തിനും ഇടം നിലനിർത്താൻ സഹായിക്കുന്നു" },
                  isCorrect: true,
                  explanation: { en: "Structure influences root space and air/water movement.", hi: "संरचना जड़ों की जगह और हवा-पानी की आवाजाही को प्रभावित करती है।", te: "నిర్మాణం వేర్ల స్థలం, గాలి-నీటి ప్రసరణను ప్రభావితం చేస్తుంది.", ml: "ഘടന వేരുകളുടെ ഇടത്തെയും വായു-വെള്ള സഞ്ചാരത്തെയും స్వాധീనിക്കുന്നു." },
                },
              ],
            },
          ],
        },
        {
          type: "aiInterview",
          id: "l8-tara-interview",
          title: { en: "Talk to Tara", hi: "तारा से बात करें", te: "తారాతో మాట్లాడండి", ml: "താരയോട് സംസാരിക്കൂ" },
          subtitle: { en: "Explain your soil decision in your own words.", hi: "अपने शब्दों में अपना मृदा निर्णय समझाएँ।", te: "మీ నేల నిర్ణయాన్ని మీ స్వంత మాటల్లో వివరించండి.", ml: "നിങ്ങളുടെ മണ്ണ് തീരുമാനത്തെ സ്വന്തം വാക്കുകളിൽ വിശദീകരിക്കുക." },
          instructions: {
            en: "Speak or type. Tara checks whether you can connect the soil clue, action, and reason.",
            hi: "बोलें या टाइप करें। तारा देखेगी कि आप संकेत, उपाय और कारण को जोड़ सकते हैं या नहीं।",
            te: "మాట్లాడండి లేదా టైప్ చేయండి. సంకేతం, చర్య, కారణాన్ని మీరు అనుసంధానించగలరా అని తారా పరిశీలిస్తుంది.",
            ml: "സംസാരിക്കുകയോ ടൈപ്പ് ചെയ്യുകയോ ചെയ്യുക. ലക്ഷണം, നടപടി, കാരണം എന്നിവ ബന്ധിപ്പിക്കാനാകുമോ എന്ന് താര പരിശോധിക്കും.",
          },
          totalXp: 50,
          taraDialogue: {
            en: "Final conversation! Imagine your soil is hard and exposed. What would you do, and why?",
            hi: "अंतिम बातचीत! मान लीजिए आपकी मिट्टी कठोर और खुली है। आप क्या करेंगे और क्यों?",
            te: "చివరి సంభాషణ! మీ నేల గట్టిగా, బహిర్గతంగా ఉందని ఊహించండి. మీరు ఏమి చేస్తారు? ఎందుకు?",
            ml: "അവസാന സംഭാഷണം! നിങ്ങളുടെ മണ്ണ് കട്ടിയുള്ളതും തുറന്നുകിടക്കുന്നതുമാണെന്ന് കരുതൂ. നിങ്ങൾ എന്ത് ചെയ്യും? എന്തുകൊണ്ട്?",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-8"]?.["l8-tara-interview-dialogue"],
          taraSuccessAudio: SUSTAINABLE_SOIL_AUDIO["level-8"]?.["l8-tara-interview-success"],
          taraExpression: "thinking",
          taraSuccessDialogue: {
            en: "Excellent explanation. You are reasoning from the soil condition, not just repeating a fact.",
            hi: "उत्कृष्ट व्याख्या। आप केवल तथ्य दोहराने के बजाय मिट्टी की स्थिति के आधार पर सोच रहे हैं।",
            te: "అద్భుతమైన వివరణ. మీరు కేవలం విషయాన్ని చెప్పడం కాకుండా నేల పరిస్థితిని బట్టి ఆలోచిస్తున్నారు.",
            ml: "മികച്ച വിശദീകരണം. കാര്യങ്ങൾ വെറുതെ ആവർത്തിക്കാതെ മണ്ണിന്റെ അവസ്ഥ മനസ്സിലാക്കി നിങ്ങൾ പ്രതികരിച്ചു.",
          },
          questions: [
            {
              id: "l8-interview-q1",
              question: {
                en: "Imagine your soil is hard and exposed to intense heat. What practical action will you take to restore living structure?",
                hi: "मान लीजिए आपकी मिट्टी कठोर है और तेज धूप में खुली है। जीवित संरचना बहाल करने के लिए आप क्या व्यावहारिक कदम उठाएंगे?",
                te: "మీ నేల గట్టిగా ఉండి తీవ్ర ఎండకు బహిర్గతమైందని ఊహించండి. సజీవ నిర్మాణాన్ని పునరుద్ధరించడానికి మీరు ఏ ఆచరణాత్మక చర్య తీసుకుంటారు?",
                ml: "നിങ്ങളുടെ മണ്ണ് കട്ടിയുള്ളതും കഠിനമായ വെയിലിൽ തുറന്നുകിടക്കുന്നതുമാണെന്ന് കരുതുക. സജീവ ഘടന വീണ്ടെടുക്കാൻ നിങ്ങൾ എന്ത് പ്രായോഗിക നടപടി സ്വീകരിക്കും?",
              },
              taraDialogue: {
                en: "Think about mulch covering, avoiding heavy traffic on wet patches, and letting earthworms build root channels.",
                hi: "मल्च आवरण, गीली मिट्टी पर भारी आवाजाही से बचने और केंचुओं को रास्ते बनाने देने के बारे में सोचें।",
                te: "మల్చింగ్ కవచం, తడి నేలపై బరువులను నివారించడం మరియు వానపాములకు స్థలం ఇవ్వడం గురించి ఆలోచించండి.",
                ml: "മൾച്ച് ആവരണം, ഈർപ്പമുള്ള മണ്ണിലൂടെയുള്ള സഞ്ചാരം ഒഴിവാക്കൽ, ഞാഞ്ഞൂലുകൾക്ക് വഴി ഉണ്ടാക്കാൻ ഇടം നൽകൽ എന്നിവയെക്കുറിച്ച് ചിന്തിക്കൂ.",
              },
              taraAudio: SUSTAINABLE_SOIL_AUDIO["level-8"]?.["l8-tara-interview-question-l8-interview-q1"],
              taraExpression: "thinking",
              expectedConcepts: [
                {
                  id: "concept-cover",
                  label: { en: "Surface Cover / Mulch", hi: "सतह आवरण / मल्च", te: "ఉపరితల కవచం / మల్చింగ్", ml: "ഉపరిതല ആവരണം / മൾച്ച്" },
                  keywords: ["mulch", "cover", "residue", "आवरण", "मल्च", "కవచం", "మల్చింగ్", "ആവരണം", "മൾച്ച്"],
                },
                {
                  id: "concept-structure",
                  label: { en: "Protect Soil Structure", hi: "मृदा संरचना की रक्षा", te: "నేల నిర్మాణం కాపాడటం", ml: "മണ്ണിന്റെ ഘടന സംരക്ഷിക്കൽ" },
                  keywords: ["pore", "air", "compaction", "earthworm", "छिद्र", "दबाव", "केंचुआ", "రంధ్రాలు", "గట్టిపడటం", "വാయు", "ഞാഞ്ഞൂల్"],
                },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "l8-final-reward",
          xp: 120,
          badgeTitle: {
            en: "Sustainable Soil Master",
            hi: "सतत मृदा विशेषज्ञ",
            te: "సుస్థిర నేల నిపుణుడు",
            ml: "സുస్థിര മണ്ണ് വിദഗ്धൻ",
          },
          badgeIcon: "emoji-events",
          badgeDescription: {
            en: "Mastered all 8 levels of living soil science, diagnosis, and conservation.",
            hi: "जीवित मृदा विज्ञान, निदान और संरक्षण के सभी 8 स्तरों में महारत हासिल की।",
            te: "సజీవ నేల శాస్త్రం, సమస్య గుర్తింపు మరియు సంరక్షణ యొక్క మొత్తం 8 స్థాయిలలో నైపుణ్యం సాధించారు.",
            ml: "സജീവ മണ്ണ് ശാസ്ത്രം, പ്രശ്നപരിഹാരം, സംരക്ഷണം എന്നിവയുടെ 8 ലെവലുകളും പൂർത്തിയാക്കി.",
          },
          taraDialogue: {
            en: "Congratulations, Soil Master! You have completed the journey. Now carry this wisdom to your land every single day!",
            hi: "बधाई हो, मृदा विशेषज्ञ! आपने यह यात्रा पूरी कर ली है। अब इस ज्ञान को हर दिन अपनी भूमि पर लागू करें!",
            te: "అభినందనలు, నేల నిపుణుడా! మీరు ప్రయాణాన్ని పూర్తి చేసారు. ఇప్పుడు ప్రతిరోజూ ఈ జ్ఞానాన్ని మీ భూమికి వర్తింపజేయండి!",
            ml: "അഭിനന്ദനങ്ങൾ, മണ്ണ് വിദഗ്ധനേ! നിങ്ങൾ ഈ പാഠം പൂർത്തിയാക്കി. ഇനി ഈ അറിവ് നിങ്ങളുടെ കൃഷിഭൂമിയിൽ എന്നും പ്രയോജനപ്പെടുത്തൂ!",
          },
          taraAudio: SUSTAINABLE_SOIL_AUDIO["level-8"]?.["l8-final-reward-dialogue"],
          taraExpression: "excited",
        },
      ],
    },
  ],
};