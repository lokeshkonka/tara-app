import type { LessonPackageDefinition } from "../../types/lessonSchema";

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
  id: "soil-level-1",
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
              title: { en: "Air", hi: "हवा", te: "గాలి", ml: "വായു" },
              icon: "air",
              color: "#81D4FA",
              taraDialogue: { en: "Soil has tiny spaces between its particles that hold air for roots to breathe.", hi: "मिट्टी के कणों के बीच छोटी जगह होती है जो जड़ों को सांस लेने के लिए हवा देती है।", te: "నేలలోని రంధ్రాలు వేర్లు శ్వాసించడానికి గాలిని అందిస్తాయి.", ml: "മണ്ണിലെ സൂക്ഷ്മ സുഷിരങ്ങൾ വേരുകൾക്ക് ശ്വസിക്കാൻ വായു നൽകുന്നു." },
            },
            {
              id: "card-water",
              title: { en: "Water", hi: "पानी", te: "నీరు", ml: "വെള്ളം" },
              icon: "water-drop",
              color: "#29B6F6",
              taraDialogue: { en: "Soil stores moisture and delivers dissolved nutrients directly to roots.", hi: "मिट्टी नमी को संजोती है और पोषक तत्व जड़ों तक पहुंचाती है।", te: "నేల తేమను నిల్వ చేసి వేర్లకు అందిస్తుంది.", ml: "മണ്ണ് ഈർപ്പം നിലനിർത്തി വേരുകൾക്ക് നൽകുന്നു." },
            },
            {
              id: "card-nutrients",
              title: { en: "Nutrients", hi: "पोषक तत्व", te: "పోషకాలు", ml: "പോഷകങ്ങൾ" },
              icon: "eco",
              color: "#4CAF50",
              taraDialogue: { en: "Healthy soil stores and cycles vital minerals like NPK naturally.", hi: "स्वस्थ मिट्टी प्राकृतिक रूप से आवश्यक खनिजों को संजोती है।", te: "ఆరోగ్యకరమైన నేల సహజంగా పోషకాలను అందిస్తుంది.", ml: "നല്ല മണ്ണ് സ്വാഭാവികമായി പോഷകങ്ങൾ ലഭ്യമാക്കുന്നു." },
            },
            {
              id: "card-organic-matter",
              title: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "ജൈവവസ്തുക്കൾ" },
              icon: "compost",
              color: "#8D6E63",
              taraDialogue: { en: "Crop residues and decaying plant material become natural soil food.", hi: "फसल अवशेष और सड़े-गले पत्ते प्राकृतिक खाद बन जाते हैं।", te: "పంట వ్యర్థాలు నేలకు సహజ ఎరువుగా మారతాయి.", ml: "സസ്യ അവശിഷ്ടങ്ങൾ പ്രകൃതിദത്ത വളമായി മാറുന്നു." },
            },
            {
              id: "card-living-organisms",
              title: { en: "Living Organisms", hi: "जीवित जीव", te: "సజీవ జీవులు", ml: "സൂക്ഷ്മജീവികൾ" },
              icon: "bug-report",
              color: "#7E57C2",
              taraDialogue: { en: "Billions of tiny underground helpers break down materials and aerate the ground.", hi: "करोड़ों सूक्ष्म जीव जमीन को भुरभुरा और उपजाऊ बनाते हैं।", te: "కోట్లాది జీవులు నేలను గుల్లగా చేసి సారవంతం చేస్తాయి.", ml: "കോടിക്കണക്കിന് ജീവികൾ മണ്ണിനെ ഫലഭൂയിഷ്ഠമാക്കുന്നു." },
            },
          ],
        },

        // Phase 2: MCQ Quiz
        {
          type: "mcq",
          id: "soil-level-1-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q1-components",
              question: {
                en: "What is found inside healthy living soil?",
                hi: "स्वस्थ जीवित मिट्टी के अंदर क्या पाया जाता है?",
                te: "ఆరోగ్యకరమైన సజీవ నేలలో ఏముంటుంది?",
                ml: "ആരോഗ്യമുള്ള മണ്ണിൽ എന്തെല്ലാമാണ് അടങ്ങിയിരിക്കുന്നത്?",
              },
              xp: 10,
              options: [
                {
                  id: "opt-1a",
                  text: { en: "Only dead dirt", hi: "केवल निर्जीव धूल", te: "కేవలం మట్టి మాత్రమే", ml: "വെറും മണ്ണ് മാത്രം" },
                  isCorrect: false,
                  explanation: { en: "Soil is a dynamic living habitat, not just dead dirt.", hi: "मिट्टी केवल धूल नहीं है, यह एक जीवित घर है।", te: "నేల కేవలం మట్టి కాదు, ఒక సజీవ వ్యవస్థ.", ml: "മണ്ണ് വെറുമൊരു മണ്ണല്ല." },
                },
                {
                  id: "opt-1b",
                  text: {
                    en: "Air, water, nutrients, organic matter, and living organisms",
                    hi: "हवा, पानी, पोषक तत्व, जैविक पदार्थ और जीवित जीव",
                    te: "గాలి, నీరు, పోషకాలు, సేంద్రీయ పదార్థాలు మరియు జీవులు",
                    ml: "വായു, വെള്ളം, പോഷകങ്ങൾ, ജൈവവസ്തുക്കൾ, സൂക്ഷ്മജീവികൾ",
                  },
                  isCorrect: true,
                  explanation: { en: "Correct! Healthy soil combines all 5 essential living elements.", hi: "बिल्कुल सही! स्वस्थ मिट्टी में ये सभी 5 तत्व होते हैं।", te: "సరిగ్గా చెప్పారు! నేలలో ఈ 5 అంశాలు ఉంటాయి.", ml: "തികച്ചും ശരി!" },
                },
              ],
            },
          ],
        },

        // Phase 3: Reward
        {
          type: "reward",
          id: "soil-level-1-reward",
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
              title: { en: "Soil Is Alive", hi: "मिट्टी जीवित है", te: "నేల సజీవమైనది", ml: "മണ്ണ് ജീവനുള്ളതാണ്" },
              icon: "public",
              color: "#4CAF50",
              taraDialogue: { en: "What looks like ordinary soil can actually be a busy little world!", hi: "जो साधारण मिट्टी दिखती है, वह वास्तव में एक व्यस्त दुनिया हो सकती है!", te: "సాధారణంగా కనిపించే నేల లోపల ఒక పెద్ద జీవ ప్రపంచం ఉంది!", ml: "സാധാരണ മണ്ണെന്ന് തോന്നുന്നിടത്ത് വലിയൊരു ജീവലോകമുണ്ട്!" },
            },
            {
              id: "card-earthworms",
              title: { en: "Meet the Earthworm", hi: "केंचुए से मिलें", te: "వానపాము", ml: "ഞാഞ്ഞൂൽ" },
              icon: "waves",
              color: "#8D6E63",
              taraDialogue: { en: "These little soil explorers spend their lives burrowing and creating channels in the ground.", hi: "ये छोटे जीव जमीन में रास्ते बनाकर हवा और पानी का प्रवाह आसान करते हैं।", te: "ఇవి నేలలో రంధ్రాలు చేసి గాలి, నీరు వెళ్ళేలా చేస్తాయి.", ml: "ഇവ മണ്ണിൽ തുരങ്കങ്ങളുണ്ടാക്കി വായുസഞ്ചാരം കൂട്ടുന്നു." },
            },
            {
              id: "card-microorganisms",
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

        // Phase 3: MCQ Quiz
        {
          type: "mcq",
          id: "soil-alive-mcq",
          totalXp: 50,
          questions: [
            {
              id: "q1-why-alive",
              question: { en: "Why do we say that soil is alive?", hi: "मिट्टी को जीवित क्यों कहा जाता है?", te: "నేలను సజీవమైనది అని ఎందుకు అంటారు?", ml: "മണ്ണിനെ ജീവനുള്ളത് എന്ന് പറയുന്നത് എന്തുകൊണ്ട്?" },
              xp: 25,
              options: [
                {
                  id: "opt-1a",
                  text: { en: "Because soil can walk", hi: "क्योंकि मिट्टी चल सकती है", te: "నేల నడవగలదు కాబట్టి", ml: "മണ്ണിന് നടക്കാൻ കഴിയുന്നതുകൊണ്ട്" },
                  isCorrect: false,
                  explanation: { en: "Soil doesn't walk, but living organisms move within it.", hi: "मिट्टी नहीं चलती, लेकिन जीव इसके अंदर चलते हैं।", te: "నేల నడవదు, కానీ జీవులు అందులో కదులుతాయి.", ml: "മണ്ണല്ല, അതിലെ ജീവികളാണ് ചലിക്കുന്നത്." },
                },
                {
                  id: "opt-1b",
                  text: { en: "Because soil contains living organisms that interact with plants and organic matter", hi: "क्योंकि इसमें जीवित जीव होते हैं जो पौधों और जैविक पदार्थों से जुड़ते हैं", te: "ఇందులో మొక్కలు మరియు సేంద్రీయ పదార్థాలతో పనిచేసే జీవులు ఉంటాయి", ml: "സസ്യങ്ങളോടും ജൈവാംശങ്ങളോടും ചേർന്ന് പ്രവർത്തിക്കുന്ന ജീവികൾ ഉള്ളതുകൊണ്ട്" },
                  isCorrect: true,
                  explanation: { en: "Exactly! Soil is home to many living organisms that interact together.", hi: "बिल्कुल सही! मिट्टी कई जीवित जीवों का घर है।", te: "సరిగ్గా చెప్పారు! నేల జీవులకు నిలయం.", ml: "തികച്ചും ശരി!" },
                },
              ],
            },
            {
              id: "q2-worm-role",
              question: { en: "What is an important role of earthworms in the soil?", hi: "मिट्टी में केंचुओं की क्या भूमिका है?", te: "నేలలో వానపాముల ముఖ్య పాత్ర ఏమిటి?", ml: "മണ്ണിൽ ഞാഞ്ഞൂലുകളുടെ പ്രധാന പങ്ക് എന്താണ്?" },
              xp: 25,
              options: [
                {
                  id: "opt-2a",
                  text: { en: "They burrow and create spaces for air and water", hi: "वे रास्ते बनाकर हवा और पानी के लिए जगह बनाते हैं", te: "ఇవి రంధ్రాలు చేసి గాలి, నీరు చేరేలా చేస్తాయి", ml: "അവ വായുവിനും വെള്ളത്തിനുമായി പാതകൾ ഉണ്ടാക്കുന്നു" },
                  isCorrect: true,
                  explanation: { en: "Earthworms mix the soil and create aeration channels.", hi: "केंचुए मिट्टी को भुरभुरा बनाते हैं।", te: "వానపాములు నేలను గుల్లగా ఉంచుతాయి.", ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ ഫലഭൂയിഷ്ഠമാക്കുന്നു." },
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
          title: { en: "Choose the Better Soil", hi: "बेहतर मिट्टी चुनें", te: "మంచి నేలను ఎంచుకోండి", ml: "മികച്ച മണ്ണ് തിരഞ്ഞെടുക്കുക" },
          subtitle: { en: "Healthy Soil Challenge", hi: "स्वस्थ मिट्टी चुनौती", te: "ఆరోగ్యకరమైన నేల సవాలు", ml: "മണ്ണ് ചലഞ്ച്" },
          instructions: { en: "Compare the situations and tap the option that shows healthier soil conditions.", hi: "विकल्पों की तुलना करें और बेहतर मिट्टी चुनें।", te: "మంచి నేల లక్షణాన్ని ఎంచుకోండి.", ml: "ശരിയായ സാഹചര്യം തിരഞ്ഞെടുക്കുക." },
          xp: 30,
          taraDialogue: { en: "Can you spot the signs of healthy soil? Choose the better option in each situation!", hi: "क्या आप स्वस्थ मिट्टी के संकेतों को पहचान सकते हैं?", te: "ఆరోగ్యకరమైన నేల సంకేతాలను గుర్తించగలరా?", ml: "നല്ല മണ്ണിന്റെ ലക്ഷണങ്ങൾ കണ്ടെത്താമോ?" },
          taraSuccessDialogue: { en: "Great job! You have a keen eye for healthy soil conditions!", hi: "बहुत बढ़िया! आपने स्वस्थ मिट्टी को पहचान लिया!", te: "చాలా బాగా గుర్తించారు!", ml: "മികച്ച വിജయం!" },
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
                  text: { en: "Soil with visible spaces and crumbly texture", hi: "भुरभुरी मिट्टी जिसमें हवा के छिद्र हों", te: "గుల్లగా రంధ్రాలు ఉన్న నేల", ml: "വാయు സഞ്ചారമുള്ള പൊടിഞ്ഞ മണ്ണ്" },
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

        // Phase 3: MCQ Quiz
        {
          type: "mcq",
          id: "soil-healthy-mcq",
          totalXp: 60,
          questions: [
            {
              id: "q1-healthy-def",
              question: { en: "Which statement best describes healthy soil?", hi: "स्वस्थ मिट्टी का सबसे अच्छा वर्णन कौन सा है?", te: "ఆరోగ్యకరమైన నేలను ఏది సరిగ్గా వివరిస్తుంది?", ml: "ആരോഗ്യമുള്ള മണ്ണിനെ ഏറ്റവും നന്നായി വിവരിക്കുന്നത് ഏതാണ്?" },
              xp: 30,
              options: [
                {
                  id: "opt-q1-a",
                  text: { en: "Soil is healthy when physical, chemical, and biological balance work together", hi: "जब भौतिक, रासायनिक और जैविक संतुलन एक साथ काम करते हैं", te: "భౌతిక, రసాయన మరియు జీవ సమతుల్యత కలిసి పనిచేసినప్పుడు", ml: "ഭൗതിക, രാസ, ജൈവ ഘടകങ്ങൾ ഒരുമിച്ച് പ്രവർത്തിക്കുമ്പോൾ" },
                  isCorrect: true,
                  explanation: { en: "Healthy soil is an integrated living ecosystem.", hi: "स्वस्थ मिट्टी एक संपूर्ण जीवित प्रणाली है।", te: "ఆరోగ్యకరమైన నేల ఒక సజీవ వ్యవస్థ.", ml: "ആരോഗ്യമുള്ള മണ്ണ് ഒരു സജീവ വ്യവസ്ഥയാണ്." },
                },
              ],
            },
            {
              id: "q2-waterlogged",
              question: { en: "What happens to roots when soil stays waterlogged for too long?", hi: "जलभराव होने पर जड़ों का क्या होता है?", te: "నీరు నిలిచిపోతే వేర్లకు ఏమి జరుగుతుంది?", ml: "വെള്ളം കെട്ടിക്കിടന്നാൽ വേരുകൾക്ക് എന്ത് സംഭവിക്കും?" },
              xp: 30,
              options: [
                {
                  id: "opt-q2-a",
                  text: { en: "Roots lose access to oxygen and struggle to breathe", hi: "जड़ों को ऑक्सीजन नहीं मिलती और वे सांस नहीं ले पातीं", te: "వేర్లకు ఆక్సిజన్ అందక ఉక్కిరిబిక్కిరి అవుతాయి", ml: "വേരുകൾക്ക് ശ്വസിക്കാൻ ഓക്സിജൻ ലഭിക്കാതെ വരുന്നു" },
                  isCorrect: true,
                  explanation: { en: "Water displaces oxygen pores, suffocating plant roots.", hi: "पानी हवा के छिद्रों को भर देता है।", te: "నీరు గాలిని బయటకు నెట్టేస్తుంది.", ml: "വായുസഞ്ചാരം നിലയ്ക്കുന്നു." },
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
              title: { en: "Life + Structure", hi: "जीवन + संरचना", te: "జీవం + నిర్మాణం", ml: "ജീവൻ + ഘടന" },
              icon: "grid-view",
              color: "#60A5FA",
              taraDialogue: { en: "Earthworms and roots create channels that keep soil crumbly.", hi: "केंचुए और जड़ें रास्ते बनाकर मिट्टी को भुरभुरा रखते हैं।", te: "వానపాములు నేలను గుల్లగా ఉంచుతాయి.", ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ ഇളക്കി വായുസഞ്ചാരം കൂട്ടുന്നു." },
            },
            {
              id: "card-living-crop",
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

        // Phase 3: MCQ Quiz
        {
          type: "mcq",
          id: "soil-connections-mcq",
          totalXp: 50,
          questions: [
            {
              id: "q1-structure-air",
              question: { en: "Why do soil structure and air matter to plant roots?", hi: "मिट्टी की संरचना और हवा पौधों की जड़ों के लिए क्यों मायने रखती है?", te: "నేల నిర్మాణం మరియు గాలి వేర్లకు ఎందుకు ముఖ్యం?", ml: "മണ്ണിന്റെ ഘടനയും വായുവും വേരുകൾക്ക് പ്രധാനമാകുന്നത് എന്തുകൊണ്ട്?" },
              xp: 25,
              options: [
                {
                  id: "opt-q1-a",
                  text: { en: "Good structure provides pore spaces where air is available", hi: "अच्छी संरचना हवा के छिद्र प्रदान करती है", te: "మంచి నిర్మాణం వేర్లకు గాలిని అందిస్తుంది", ml: "നല്ല ഘടന വായു സഞ്ചാരത്തിനുള്ള ഇടം നൽകുന്നു" },
                  isCorrect: true,
                  explanation: { en: "Roots need oxygen underground to respire and grow.", hi: "जड़ों को सांस लेने के लिए ऑक्सीजन चाहिए।", te: "వేర్లకు ఆక్సిజన్ అవసరం.", ml: "വേരുകൾക്ക് ഓക്സിജൻ ആവശ്യമാണ്." },
                },
              ],
            },
            {
              id: "q2-microbes-organic",
              question: { en: "Which element interacts with organic residues in soil to recycle nutrients?", hi: "पोषक तत्वों के पुनर्चक्रण के लिए कौन सा तत्व अवशेषों से जुड़ता है?", te: "సేంద్రీయ వ్యర్థాలను పోషకాలుగా మార్చేది ఏది?", ml: "ജൈവാവശിഷ്ടങ്ങളെ വളമാക്കി മാറ്റുന്നത് ഏതാണ്?" },
              xp: 25,
              options: [
                {
                  id: "opt-q2-a",
                  text: { en: "Soil microorganisms", hi: "मिट्टी के सूक्ष्मजीव", te: "నేలలోని సూక్ష్మజీవులు", ml: "മണ്ണിലെ സൂക്ഷ്മജീവികൾ" },
                  isCorrect: true,
                  explanation: { en: "Microorganisms break down plant materials into natural fertility.", hi: "सूक्ष्मजीव जैविक पदार्थों को विघटित करते हैं।", te: "సూక్ష్మజీవులు వ్యర్థాలను ఎరువుగా మారుస్తాయి.", ml: "സൂക്ഷ്മജീവികൾ ജൈവാംശത്തെ വളമാക്കുന്നു." },
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
    // LEVEL 5: PROTECT YOUR SOIL (4 PHASES)
    // ─────────────────────────────────────────────
    {
      id: "soil-level-5",
      levelNumber: 5,
      title: {
        en: "Protect Your Soil",
        hi: "मिट्टी की रक्षा करें",
        te: "మీ నేలను రక్షించండి",
        ml: "മണ്ണിനെ സംരക്ഷിക്കുക",
      },
      subtitle: {
        en: "Discover practical behaviors to protect and nourish the soil system",
        hi: "मिट्टी की सुरक्षा और पोषण के लिए व्यावहारिक व्यवहारों की खोज करें",
        te: "నేలను రక్షించడానికి ఆచరణాత్మక పద్ధతులను తెలుసుకోండి",
        ml: "മണ്ണ് സംprotectത്തിനായുള്ള പ്രായോഗിക രീതികൾ പഠിക്കുക",
      },
      durationMinutes: 5,
      xpReward: 80,
      phases: [
        // Phase 1: Concept Cards
        {
          type: "conceptCards",
          id: "soil-protect-cards",
          title: { en: "Protect Your Soil", hi: "मिट्टी की रक्षा करें", te: "మీ నేలను రక్షించండి", ml: "മണ്ണിനെ സംരക്ഷിക്കുക" },
          taraDialogue: {
            en: "Now you know that soil is alive and that its different parts work together. Simple farming practices can help protect the surface, support soil life, and maintain organic matter!",
            hi: "अब आप जानते हैं कि मिट्टी जीवित है। सरल खेती के तरीके सतह की रक्षा करने और जैविक पदार्थों को बनाए रखने में मदद कर सकते हैं!",
            te: "నేల సజీవమైనదని ఇప్పుడు మీకు తెలుసు. సరైన పద్ధతులు నేలను కాపాడతాయి!",
            ml: "മണ്ണ് ജീവനുള്ളതാണെന്ന് ഇപ്പോൾ നിങ്ങൾക്കറിയാം. ലളിതമായ കാര്യങ്ങളിലൂടെ മണ്ണിനെ കാത്തുസൂക്ഷിക്കാം!",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "SOIL CARE BEHAVIORS", hi: "मृदा देखभाल व्यवहार", te: "నేల సంరక్షణ పద్ధతులు", ml: "മണ്ണ് സംരക്ഷണ രീതികൾ" },
            title: { en: "Key Soil Protection Practices", hi: "मुख्य मृदा संरक्षण प्रथाएं", te: "ముఖ్యమైన నేల రక్షణ పద్ధతులు", ml: "പ്രധാന മണ്ണ് സംരക്ഷണ രീതികൾ" },
            description: { en: "The way we manage soil protects or harms the ecosystem.", hi: "जिस तरह से हम मिट्टी का प्रबंधन करते हैं वह पारिस्थितिकी तंत्र की रक्षा करता है।", te: "మనం చేసే పనులు నేల ఆరోగ్యాన్ని కాపాడతాయి.", ml: "നമ്മുടെ രീതികളാണ് മണ്ണിന്റെ ജീവൻ നിലനിർത്തുന്നത്." },
            bulletPoints: [
              {
                title: { en: "Keep Soil Covered", hi: "मिट्टी को ढँक कर रखें", te: "నేలను కప్పి ఉంచండి", ml: "മണ്ണ് മൂടി സൂക്ഷിക്കുക" },
                text: { en: "Acts like a protective blanket from rain and wind.", hi: "बारिश और हवा से सुरक्षात्मक कंबल की तरह काम करता है।", te: "వర్షం, గాలి నుండి నేలను కాపాడుతుంది.", ml: "മഴയിൽ നിന്നും കാറ്റിൽ നിന്നും സംരക്ഷണം നൽകുന്നു." },
                icon: "shield",
              },
              {
                title: { en: "Return Organic Matter", hi: "जैविक पदार्थ लौटाएं", te: "సేంద్రీయ వ్యర్థాలను కలపండి", ml: "ജൈവാവശിഷ്ടങ്ങൾ നൽകുക" },
                text: { en: "Plant residues recycle nutrients and feed biological workers.", hi: "अवशेष पोषक तत्वों को पुनर्चक्रित करते हैं।", te: "వ్యర్థాలు నేలకు పోషకాలనిస్తాయి.", ml: "സസ്യ അവശിഷ്ടങ്ങൾ മണ്ണിന് വളമാകുന്നു." },
                icon: "compost",
              },
              {
                title: { en: "Protect Structure", hi: "संरचना की रक्षा करें", te: "నిర్మాణాన్ని కాపాడండి", ml: "ഘടന നിലനിർത്തുക" },
                text: { en: "Minimizing heavy compaction preserves root channels.", hi: "दबाव कम करने से जड़ों के रास्ते सुरक्षित रहते हैं।", te: "గట్టిపడకుండా నేలను గుల్లగా ఉంచండి.", ml: "മണ്ണ് അധികം അമർന്ന് പോകാതെ സൂക്ഷിക്കുക." },
                icon: "grid-view",
              },
              {
                title: { en: "Support Soil Life", hi: "जीवों का समर्थन करें", te: "జీవులకు రక్షణ ఇవ్వండి", ml: "ജീവികളെ സംരക്ഷിക്കുക" },
                text: { en: "Nourishing soil maintains biological diversity.", hi: "मिट्टी का पोषण विविधता बनाए रखता है।", te: "నేలను పోషించడం వల్ల జీవులు వృద్ధి చెందుతాయి.", ml: "മണ്ണിലെ ജീവജാലങ്ങൾ പെരുകാൻ സഹായിക്കുക." },
                icon: "biotech",
              },
            ],
          },
          cards: [
            {
              id: "card-keep-covered",
              title: { en: "Keep Soil Covered", hi: "मिट्टी को ढँक कर रखें", te: "నేలను కప్పి ఉంచండి", ml: "മണ്ണ് മൂടി സൂക്ഷിക്കുക" },
              icon: "shield",
              color: "#2E7D32",
              taraDialogue: { en: "Think of soil cover like a protective blanket for the ground!", hi: "मिट्टी के आवरण को जमीन के लिए सुरक्षात्मक कंबल समझें!", te: "నేలను కప్పడం అంటే రక్షణ దుప్పటి లాంటిది!", ml: "മണ്ണ് മൂടുന്നത് ഒരു സംരക്ഷണ കവചം പോലെയാണ്!" },
            },
            {
              id: "card-return-organic",
              title: { en: "Return Organic Matter", hi: "जैविक पदार्थ लौटाएं", te: "సేంద్రీయ వ్యర్థాలు", ml: "ജൈവാവശിഷ്ടങ്ങൾ" },
              icon: "compost",
              color: "#795548",
              taraDialogue: { en: "When plant residues return to the soil, they feed the whole living community.", hi: "पौधों के अवशेष लौटने पर पूरे समुदाय को भोजन मिलता है।", te: "వ్యర్థాలు నేలలోని జీవులకు ఆహారంగా మారతాయి.", ml: "സസ്യ അവശിഷ്ടങ്ങൾ മണ്ണിലെ ജീവികൾക്ക് ആഹാരമാകുന്നു." },
            },
            {
              id: "card-protect-structure",
              title: { en: "Protect Soil Structure", hi: "संरचना की रक्षा करें", te: "నిర్మాణ రక్షణ", ml: "ഘടന സംരക്ഷണം" },
              icon: "grid-view",
              color: "#0284C7",
              taraDialogue: { en: "Protecting pore spaces helps roots, air, and water move freely.", hi: "छिद्रों की रक्षा जड़ों को आसानी से फैलने देती है।", te: "రంధ్రాలను కాపాడటం వల్ల గాలి, నీరు సులభంగా వెళ్తాయి.", ml: "വായുസഞ്ചാരം നിലനിർത്താൻ സുഷിരങ്ങൾ സംരക്ഷിക്കുക." },
            },
            {
              id: "card-support-life",
              title: { en: "Support Soil Life", hi: "जीवों का समर्थन करें", te: "జీవుల సంరక్షణ", ml: "ജീവി സംരക്ഷണം" },
              icon: "biotech",
              color: "#FFA000",
              taraDialogue: { en: "When we care for the soil environment, tiny workers thrive inside it.", hi: "मिट्टी की देखभाल करने से सूक्ष्म श्रमिक पनपते हैं।", te: "నేల బాగుంటే సూక్ష్మజీవులు ఆరోగ్యంగా ఉంటాయి.", ml: "നല്ല പരിചരണം ജീവികളെ സഹായിക്കുന്നു." },
            },
          ],
        },

        // Phase 2: Decision Choice Game ("Good Choice / Bad Choice")
        {
          type: "decisionChoice",
          id: "soil-protect-decisions",
          title: { en: "Good Choice / Bad Choice", hi: "अच्छा विकल्प / बुरा विकल्प", te: "మంచి నిర్ణయం / చెడు నిర్ణయం", ml: "നല്ല തീരുമാനം / തെറ്റായ തീരുമാനം" },
          instructions: { en: "A farmer has a choice. Can you choose the action that better protects the soil?", hi: "एक किसान के पास विकल्प है। बेहतर विकल्प चुनें!", te: "నేలకు మేలు చేసే సరైన నిర్ణయాన్ని ఎంచుకోండి!", ml: "മണ്ണിന് ഗുണകരമായ ശരിയായ തീരുമാനം എടുക്കുക!" },
          xp: 30,
          taraDialogue: { en: "A farmer has a choice. Can you choose the action that better protects the soil?", hi: "एक किसान के पास विकल्प है। बेहतर विकल्प चुनें!", te: "నేలకు మేలు చేసే సరైన నిర్ణయాన్ని ఎంచుకోండి!", ml: "മണ്ണിന് ഗുണകരമായ ശരിയായ തീരുമാനം എടുക്കുക!" },
          taraSuccessDialogue: { en: "Excellent! Good soil care means thinking about what our actions do to the whole soil system.", hi: "बहुत बढ़िया! अच्छी मिट्टी की देखभाल का मतलब है पूरे सिस्टम के बारे में सोचना।", te: "చాలా బాగుంది! సరైన నిర్ణయాలు నేలను కాపాడతాయి.", ml: "വളരെ മികച്ച തീരുമാനം!" },
          rounds: [
            {
              id: "round-1-cover",
              roundNumber: 1,
              topic: { en: "Soil Cover", hi: "मृदा आवरण", te: "నేల కవచం", ml: "മണ്ണ് കവചം" },
              situation: { en: "The soil is completely exposed before heavy rain.", hi: "भारी बारिश से पहले मिट्टी पूरी तरह से खुली है।", te: "భారీ వర్షానికి ముందు నేల పూర్తిగా ఖాళీగా ఉంది.", ml: "കനത്ത മഴയ്ക്ക് മുൻപ് മണ്ണ് മൂടാതെ കിടക്കുന്നു." },
              choices: [
                {
                  id: "opt-r1-a",
                  label: "Choice A",
                  text: { en: "Leave it exposed", hi: "इसे खुला छोड़ दें", te: "అలాగే వదిలేయండి", ml: "അങ്ങനെ തന്നെ ഇടുക" },
                  isGoodChoice: false,
                },
                {
                  id: "opt-r1-b",
                  label: "Choice B",
                  text: { en: "Use suitable soil cover", hi: "उपयुक्त आवरण का प्रयोग करें", te: "మంచి నేల కవచాన్ని వాడండి", ml: "മണ്ണ് മൂടി സൂക്ഷിക്കുക" },
                  isGoodChoice: true,
                  taraReaction: { en: "Good choice! Soil cover protects the surface from rain.", hi: "अच्छा विकल्प! आवरण बारिश से सतह की रक्षा करता है।", te: "మంచి నిర్ణయం! కవచం నేలను రక్షిస్తుంది.", ml: "നല്ല തീരുമാനം! കവചം മണ്ണിനെ സംരക്ഷിക്കുന്നു." },
                },
              ],
            },
            {
              id: "round-2-residue",
              roundNumber: 2,
              topic: { en: "Organic Matter", hi: "जैविक पदार्थ", te: "సేంద్రీయ పదార్థం", ml: "జైవవస్తుക്കൾ" },
              situation: { en: "There are suitable plant residues left after harvest.", hi: "फसल कटाई के बाद उपयुक्त अवशेष बचे हैं।", te: "పంట కోత తర్వాత వ్యర్థాలు మిగిలి ఉన్నాయి.", ml: "വിളവെടുപ്പിന് ശേഷം അവശിഷ്ടങ്ങൾ ബാക്കിയുണ്ട്." },
              choices: [
                {
                  id: "opt-r2-a",
                  label: "Choice A",
                  text: { en: "Return them appropriately as organic material", hi: "उन्हें जैविक सामग्री के रूप में उपयोग करें", te: "సేంద్రీయ ఎరువుగా ఉపయోగించండి", ml: "ജൈവ വളമായി മണ്ണിലേക്ക് ചേർക്കുക" },
                  isGoodChoice: true,
                  taraReaction: { en: "Spot on! Returning plant residues feeds soil life.", hi: "बिल्कुल सही! अवशेष मिट्टी के जीवन को पोषण देते हैं।", te: "సరిగ్గా చెప్పారు! వ్యర్థాలు నేలకు మేలు చేస్తాయి.", ml: "ശരിയാണ്! ഇത് മണ്ണിന് വളരെ നല്ലതാണ്." },
                },
                {
                  id: "opt-r2-b",
                  label: "Choice B",
                  text: { en: "Remove and discard all organic material", hi: "सभी जैविक सामग्री हटा दें", te: "వ్యర్థాలన్నీ తీసి పారేయండి", ml: "അവശിഷ്ടങ്ങൾ പൂർണ്ണമായി ഒഴിവാക്കുക" },
                  isGoodChoice: false,
                },
              ],
            },
            {
              id: "round-3-compaction",
              roundNumber: 3,
              topic: { en: "Soil Structure", hi: "संरचना", te: "నిర్మాణం", ml: "ഘടന" },
              situation: { en: "Heavy machinery frequently travels over the wet field.", hi: "गीले खेत पर भारी मशीनरी बार-बार चलती है।", te: "తడి నేలపై భారీ యంత్రాలు తిరుగుతున్నాయి.", ml: "നനഞ്ഞ മണ്ണിലൂടെ വലിയ യന്ത്രങ്ങൾ ഓടിക്കുന്നു." },
              choices: [
                {
                  id: "opt-r3-a",
                  label: "Choice A",
                  text: { en: "Avoid unnecessary traffic and compaction", hi: "अनावश्यक दबाव और आवाजाही से बचें", te: "అనవసరమైన గట్టిపడటాన్ని నివారించండి", ml: "അനാവശ്യ സമ്മർദ്ദം ഒഴിവാക്കുക" },
                  isGoodChoice: true,
                  taraReaction: { en: "Wise decision! Protecting soil from compaction preserves root spaces.", hi: "समझदारी भरा फैसला! दबाव से बचने से जड़ें सुरक्षित रहती हैं।", te: "మంచి నిర్ణయం! వేర్లకు చోటు ఉంటుంది.", ml: "നല്ല തീരുമാനം! വേരുകൾക്ക് ശ്വസിക്കാൻ എളുപ്പമാകും." },
                },
                {
                  id: "opt-r3-b",
                  label: "Choice B",
                  text: { en: "Drive repeatedly over the wet field", hi: "गीले खेत पर बार-बार चलाएं", te: "తడి నేలపై మళ్లీ మళ్లీ తిప్పండి", ml: "വീണ്ടും വീണ്ടും യന്ത്രങ്ങൾ ഓടിക്കുക" },
                  isGoodChoice: false,
                },
              ],
            },
            {
              id: "round-4-life",
              roundNumber: 4,
              topic: { en: "Supporting Life", hi: "जीवों का समर्थन", te: "జీవుల రక్షణ", ml: "ജീവ സംരക്ഷണം" },
              situation: { en: "The farmer wants to nourish underground beneficial organisms.", hi: "किसान भूमिगत लाभकारी जीवों का पोषण करना चाहता है।", te: "రైతు భూమిలోని జీవులను కాపాడాలనుకుంటున్నాడు.", ml: "കർഷകൻ മണ്ണിലെ സൂക്ഷ്മജീവികളെ പരിപാലിക്കാൻ ആഗ്രഹിക്കുന്നു." },
              choices: [
                {
                  id: "opt-r4-a",
                  label: "Choice A",
                  text: { en: "Maintain organic mulch and a welcoming environment", hi: "जैविक मल्च और अनुकूल वातावरण बनाए रखें", te: "సేంద్రీయ కవచం మరియు మంచి వాతావరణం కల్పించండి", ml: "ജൈവ പുതപ്പും നല്ല സാഹചര്യവും ഒരുക്കുക" },
                  isGoodChoice: true,
                  taraReaction: { en: "Exactly! Providing food and shelter nurtures beneficial soil biology.", hi: "बिल्कुल सही! भोजन और आश्रय देने से जीव पनपते हैं।", te: "సరిగ్గా చెప్పారు! ఆహారం ఇస్తే జీవులు వృద్ధి చెందుతాయి.", ml: "തികച്ചും ശരി! ഇത് ജീവികൾക്ക് അനുയോജ്യമാണ്." },
                },
                {
                  id: "opt-r4-b",
                  label: "Choice B",
                  text: { en: "Strip all residues and leave dry bare ground", hi: "सभी अवशेष हटा दें और सूखी खुली जमीन छोड़ें", te: "అన్నీ తీసేసి ఎండిపోయిన నేలను వదలండి", ml: "എല്ലാം മാറ്റി വരണ്ട നിലമാക്കുക" },
                  isGoodChoice: false,
                },
              ],
            },
          ],
        },

        // Phase 3: MCQ Quiz
        {
          type: "mcq",
          id: "soil-protect-mcq",
          totalXp: 50,
          questions: [
            {
              id: "q1-surface-protection",
              question: { en: "Which action can help protect the soil surface?", hi: "कौन सा कार्य मिट्टी की सतह की रक्षा कर सकता है?", te: "ఏ పని నేల ఉపరితలాన్ని కాపాడుతుంది?", ml: "മണ്ണിന്റെ ഉപരിതലം സംരക്ഷിക്കാൻ സഹായിക്കുന്നത് ഏത്?" },
              xp: 25,
              options: [
                {
                  id: "opt-q1-a",
                  text: { en: "Keeping suitable soil cover", hi: "उपयुक्त आवरण रखना", te: "నేలను కప్పి ఉంచడం", ml: "മണ്ണ് മൂടി സൂക്ഷിക്കുക" },
                  isCorrect: true,
                  explanation: { en: "Cover protects the soil surface from harsh wind and rain impact.", hi: "आवरण हवा और बारिश के प्रभाव से सतह की रक्षा करता है।", te: "కవచం నేలను కాపాడుతుంది.", ml: "കവചം മണ്ണിനെ സംരക്ഷിക്കുന്നു." },
                },
              ],
            },
            {
              id: "q2-residue-benefit",
              question: { en: "Why can returning organic residues to soil be useful?", hi: "मिट्टी में जैविक अवशेष लौटाना क्यों उपयोगी है?", te: "సేంద్రీయ వ్యర్థాలను నేలకు చేర్చడం ఎందుకు మంచిది?", ml: "ജൈവാവശിഷ്ടങ്ങൾ മണ്ണിലേക്ക് നൽകുന്നത് എന്ത് കൊണ്ട് പ്രയോജനകരമാണ്?" },
              xp: 25,
              options: [
                {
                  id: "opt-q2-a",
                  text: { en: "It contributes organic matter and feeds biological workers", hi: "यह जैविक पदार्थ बढ़ाता है और जीवों को भोजन देता है", te: "ఇది సేంద్రీయ పదార్థాన్ని పెంచి జీవులకు ఆహారాన్నిస్తుంది", ml: "ഇത് ജൈവാംശം വർദ്ധിപ്പിക്കുകയും ജീവികൾക്ക് ഭക്ഷണം നൽകുകയും ചെയ്യുന്നു" },
                  isCorrect: true,
                  explanation: { en: "Organic residues act as fuel for ongoing biological nutrient cycling.", hi: "जैविक अवशेष पोषक चक्र को शक्ति देते हैं।", te: "సేంద్రీయ వ్యర్థాలు పోషకాల చక్రాన్ని నడుపుతాయి.", ml: "ഇത് മണ്ണിന്റെ ഫലഭൂയിഷ്ഠത വർദ്ധിപ്പിക്കുന്നു." },
                },
              ],
            },
          ],
        },

        // Phase 4: Module Mastery Reward
        {
          type: "reward",
          id: "soil-level-5-reward",
          xp: 80,
          badgeTitle: { en: "Soil Guardian", hi: "मृदा संरक्षक", te: "నేల సంరక్షకుడు", ml: "മണ്ണ് സംരക്ഷകൻ" },
          badgeIcon: "eco",
          badgeDescription: { en: "Mastered all 5 levels of Soil Health & Living Soil Ecosystems", hi: "मृदा स्वास्थ्य के सभी 5 स्तरों में महारत हासिल की", te: "మొత్తం 5 స్థాయిలను పూర్తి చేసారు", ml: "5 ഘട്ടങ്ങളും വിജയകരമായി പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Congratulations! You completed all 5 levels of the Soil Health lesson and earned the prestigious Soil Guardian badge!", hi: "बधाई हो! आपने मृदा स्वास्थ्य के सभी 5 स्तर पूरे कर लिए और मृदा संरक्षक बैज अर्जित किया!", te: "అభినందనలు! మీరు మొత్తం 5 స్థాయిలను పూర్తి చేసి నేల సంరక్షకుడు బ్యాడ్జ్ పొందారు!", ml: "അഭിനന്ദനങ്ങൾ! നിങ്ങൾ മണ്ണ് സംരക്ഷകൻ ബാഡ്ജ് സ്വന്തമാക്കി!" },
          taraExpression: "excited",
        },
      ],
    },
  ],
};
