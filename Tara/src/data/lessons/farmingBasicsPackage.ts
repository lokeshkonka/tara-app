import type { LessonPackageDefinition } from "../../types/lessonSchema";

/**
 * THE BASICS OF AGRICULTURE — 10 COMPLETE LEVELS
 *
 * Comprehensive production-grade lesson package in 4 Indian languages (EN, HI, TE, ML):
 * - Level 1: The Circle of Farming (Concept Cards ➔ Match Game ➔ MCQs ➔ Seed & Sprout Badge)
 * - Level 2: Sunlight & Plant Energy (Concept Cards ➔ Scenario Challenge ➔ MCQs ➔ Solar Grower Badge)
 * - Level 3: Water Wisely (Concept Cards ➔ Decision Game ➔ MCQs ➔ Water Wise Farmer Badge)
 * - Level 4: Seeds & Germination (Concept Cards ➔ Match Game ➔ MCQs ➔ Seed Guardian Badge)
 * - Level 5: Plant Nutrition & Bio-Fertility (Concept Cards ➔ Memory Game ➔ MCQs ➔ Nutrient Alchemist Badge)
 * - Level 6: Crop Spacing & Canopy (Concept Cards ➔ Scenario Challenge ➔ MCQs ➔ Canopy Architect Badge)
 * - Level 7: Weeds & Living Mulch (Concept Cards ➔ Decision Game ➔ MCQs ➔ Ground Steward Badge)
 * - Level 8: Natural Pest Management (Concept Cards ➔ Match Game ➔ MCQs ➔ Ecosystem Defender Badge)
 * - Level 9: Harvesting & Curing (Concept Cards ➔ Scenario Challenge ➔ MCQs ➔ Harvest Master Badge)
 * - Level 10: Farm Resilience & Circular Loops (Concept Cards ➔ Decision Game ➔ MCQs ➔ Master Agri-Pioneer Mastery Trophy)
 */
export const FARMING_BASICS_PACKAGE: LessonPackageDefinition = {
  id: "farming-basics",
  categoryId: "basics",
  title: {
    en: "The Basics of Agriculture",
    hi: "कृषि की मूल बातें",
    te: "వ్యవసాయ ప్రాథమిక సూత్రాలు",
    ml: "കൃഷിയുടെ അടിസ്ഥാന പാഠങ്ങൾ",
  },
  description: {
    en: "Master the foundational laws of nature, seed care, natural bio-inputs, and resilient farm management from start to harvest.",
    hi: "प्रकृति के नियमों, बीज देखभाल, प्राकृतिक उर्वरकों और टिकाऊ खेत प्रबंधन की मूल बातें समझें।",
    te: "ప్రకృతి నియమాలు, విత్తన సంరక్షణ, సహజ ఎరువులు మరియు పంట నిర్వహణ ప్రాథమికాలను నేర్చుకోండి.",
    ml: "പ്രകൃതി നിയമങ്ങളും വിത്തുപരിപാലനവും വിളവെടുപ്പും വരെയുള്ള അടിസ്ഥാന കൃഷിരീതികൾ പഠിക്കുക.",
  },
  whyItMatters: {
    en: "Understanding the core fundamentals of sunlight, soil biology, water management, and diversity helps any farmer double yields while cutting chemical costs to zero.",
    hi: "सूर्य के प्रकाश, मिट्टी के जीव, जल प्रबंधन और विविधता के सिद्धांतों को समझने से लागत घटती है और उपज बढ़ती है।",
    te: "సూర్యరశ్మి, నేల జీవం, నీటి నిర్వహణను అర్థం చేసుకోవడం వల్ల ఖర్చులు తగ్గి నాణ్యమైన దిగుబడి వస్తుంది.",
    ml: "സൂര്യപ്രകാശം, മണ്ണിലെ ജീവൻ, ജലനിയന്ത്രണം എന്നിവ മനസ്സിലാക്കുന്നത് ഉത്പാദനം വർദ്ധിപ്പിക്കാൻ സഹായിക്കുന്നു.",
  },
  taraQuote: {
    en: "Farming is a dance with nature! When you understand how sun, soil, and seeds connect, the land will reward you abundantly.",
    hi: "खेती प्रकृति के साथ एक सुंदर तालमेल है! जब आप धूप, मिट्टी और बीज के संबंध को समझते हैं, तो धरती भरपूर फल देती है।",
    te: "వ్యవసాయం ప్రకృతితో చేసే ఒక అందమైన ప్రయాణం! సూర్యుడు, నేల, విత్తనాల బంధాన్ని తెలుసుకుంటే పంటలు సమృద్ధిగా పండుతాయి.",
    ml: "കൃഷി എന്നത് പ്രകൃതിയോടൊപ്പമുള്ള ഒരു യാത്രയാണ്! മണ്ണും സൂര്യനും വിത്തും തമ്മിലുള്ള ബന്ധം അറിഞ്ഞു കൃഷി ചെയ്യുക.",
  },
  taraExpression: "excited",
  durationMinutes: 50,
  totalXp: 500,
  learningOutcomes: [
    {
      id: "outcome-1",
      text: {
        en: "Understand the circular agricultural cycle: soil preparation, seeding, canopy care, and harvesting",
        hi: "खेती के चक्र को समझें: मिट्टी की तैयारी, बुआई, फसल की देखभाल और कटाई",
        te: "వ్యవసాయ చక్రాన్ని అర్థం చేసుకోండి: నేల తయారీ, విత్తనాలు, పంట సంరక్షణ మరియు కోత",
        ml: "കൃഷിചക്രം മനസ്സിലാക്കുക: നിലമൊരുക്കൽ, വിത്തുവിതയ്ക്കൽ, വിളപരിപാലനം, വിളവെടുപ്പ്",
      },
    },
    {
      id: "outcome-2",
      text: {
        en: "Master natural bio-fertilizers, companion planting, and moisture-retaining irrigation methods",
        hi: "प्राकृतिक खाद, सह-फसल और नमी बचाने वाली सिंचाई विधियों में महारत हासिल करें",
        te: "సహజ ఎరువులు, అంతర పంటలు మరియు నీటి పొదుపు పద్ధతులను నేర్చుకోండి",
        ml: "പ്രകൃതിദത്ത വളങ്ങളും ഇടവിളകളും ജലസംരക്ഷണ രീതികളും പ്രാവർത്തികമാക്കുക",
      },
    },
    {
      id: "outcome-3",
      text: {
        en: "Design a chemical-free, resilient farming ecosystem that recycles organic farm biomass",
        hi: "रसायन मुक्त, टिकाऊ खेत का निर्माण करें जो जैविक कचरे को प्राकृतिक खाद में बदलता है",
        te: "వ్యర్థాలను రీసైకిల్ చేస్తూ రసాయనాలు లేని స్థిరమైన వ్యవసాయాన్ని రూపొందించండి",
        ml: "രാസവസ്തുക്കളില്ലാതെ അവശിഷ്ടങ്ങൾ പുനരുപയോഗിക്കുന്ന സുസ്ഥിര കൃഷിരീതി വികസിപ്പിക്കുക",
      },
    },
  ],
  badgeReward: {
    id: "master-agri-pioneer",
    title: {
      en: "Master Agri-Pioneer",
      hi: "कृषि अग्रणी मास्टर",
      te: "మాస్టర్ వ్యవసాయ సారథి",
      ml: "മാസ്റ്റർ അഗ്രി പയനിയർ",
    },
    icon: "workspace-premium",
    description: {
      en: "Completed all 10 Levels of The Basics of Agriculture",
      hi: "कृषि की मूल बातें के सभी 10 स्तर सफलतापूर्वक पूरे किए",
      te: "వ్యవసాయ ప్రాథమికాల యొక్క మొత్తం 10 స్థాయిలను పూర్తి చేసారు",
      ml: "കൃഷിയുടെ 10 അടിസ്ഥാന ഘട്ടങ്ങളും വിജയകരമായി പൂർത്തിയാക്കി",
    },
  },
  levels: [
    // ─────────────────────────────────────────────
    // LEVEL 1: THE CIRCLE OF FARMING
    // ─────────────────────────────────────────────
    {
      id: "basics-level-1",
      levelNumber: 1,
      title: {
        en: "The Circle of Farming",
        hi: "खेती का चक्र",
        te: "వ్యవసాయ చక్రం",
        ml: "കൃഷിയുടെ ചക്രം",
      },
      subtitle: {
        en: "Discover how nature connects seeds, soil, sun, and harvest in a continuous loop",
        hi: "जानें कि प्रकृति कैसे बीज, मिट्टी, धूप और फसल को एक चक्र में जोड़ती है",
        te: "విత్తనం, నేల, ఎండ మరియు పంట కలిసి ఎలా ఒక చక్రాన్ని ఏర్పరుస్తాయో తెలుసుకోండి",
        ml: "വിത്തും മണ്ണും സൂര്യനും വിളവെടുപ്പും തമ്മിലുള്ള ബന്ധം മനസ്സിലാക്കുക",
      },
      durationMinutes: 5,
      xpReward: 40,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l1-concepts",
          title: { en: "The Circle of Farming", hi: "खेती का चक्र", te: "వ్యవసాయ చక్రం", ml: "കൃഷിയുടെ ചക്രം" },
          taraDialogue: {
            en: "Every farm is a living loop. A healthy seed goes into living soil, drinks rainwater, captures golden sunlight, grows into a bountiful crop, and gives back organic residue to nourish the next generation!",
            hi: "हर खेत एक जीवित चक्र है। एक अच्छा बीज जीवित मिट्टी में जाता है, धूप और पानी लेता है और भरपूर फसल देता है!",
            te: "ప్రతి పొలం ఒక సజీవ చక్రం. మంచి విత్తనం నేలలో చేరి, ఎండ, నీటితో పెరిగి మళ్లీ నేలను సారవంతం చేస్తుంది!",
            ml: "ഓരോ കൃഷിയിടവും ജീവസ്സുറ്റ ഒരു ചക്രമാണ്. വിത്ത് മണ്ണിൽ മുളച്ച് വളർന്ന് വീണ്ടും മണ്ണിന് വളമാകുന്നു!",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "NATURE'S CYCLE", hi: "प्रकृति का चक्र", te: "ప్రకృతి చక్రం", ml: "പ്രകൃതി നിയമം" },
            title: { en: "The 4 Natural Pillars", hi: "प्रकृति के 4 मुख्य स्तंभ", te: "ప్రకృతిలోని 4 ముఖ్య స్తంభాలు", ml: "പ്രകൃതിയുടെ 4 ഘടകങ്ങൾ" },
            description: { en: "Farming works best when we harmonize with nature's circular energy flow.", hi: "खेती तब सबसे अच्छी होती है जब हम प्रकृति के चक्र के साथ तालमेल बिठाते हैं।", te: "ప్రకృతి చక్రంతో కలిసి పనిచేసినప్పుడు వ్యవసాయం బాగుంటుంది.", ml: "പ്രകൃതിയോട് ഇണങ്ങി കൃഷി ചെയ്യുമ്പോൾ മികച്ച ഫലം ലഭിക്കുന്നു." },
            bulletPoints: [
              { title: { en: "Living Soil", hi: "जीवित मिट्टी", te: "సజీవ నేల", ml: "നല്ല മണ്ണ്" }, text: { en: "The foundation storing moisture and beneficial microbes.", hi: "नमी और सूक्ष्मजीवों का आधार।", te: "తేమ మరియు సూక్ష్మజీవుల ఆధారం.", ml: "ഈർപ്പവും സൂക്ഷ്മജീവികളും അടങ്ങിയ അടിത്തറ." }, icon: "public" },
              { title: { en: "Sun & Water", hi: "धूप और पानी", te: "ఎండ & నీరు", ml: "സൂര്യനും വെള്ളവും" }, text: { en: "The primary power sources fueling leaf photosynthesis.", hi: "पत्तियों को भोजन बनाने की ऊर्जा देने वाले स्रोत।", te: "మొక్కలకు శక్తినిచ్చే సహజ వనరులు.", ml: "ചെടികൾക്ക് ജീവനേകുന്ന പ്രധാന ഉറവിടങ്ങൾ." }, icon: "wb-sunny" },
            ],
          },
          cards: [
            { id: "c-seed", title: { en: "The Seed", hi: "बीज", te: "విత్తనం", ml: "വിത്ത്" }, icon: "grain", color: "#8D6E63", taraDialogue: { en: "The seed carries the genetic blueprint and vitality for the entire plant life.", hi: "बीज के भीतर पूरे पौधे का जीवन और ऊर्जा छिपी होती है।", te: "విత్తనంలో మొక్కకు కావాల్సిన ప్రాణం దాగి ఉంటుంది.", ml: "വിത്തിൽ ഒരു ചെടിയുടെ മുഴുവൻ ജീവനും അടങ്ങിയിരിക്കുന്നു." } },
            { id: "c-soil", title: { en: "The Soil", hi: "मिट्टी", te: "నేల", ml: "മണ്ണ്" }, icon: "terrain", color: "#4CAF50", taraDialogue: { en: "Living soil anchors the roots and feeds them with continuous moisture and minerals.", hi: "जीवित मिट्टी जड़ों को सहारा देती है और पोषण पहुंचाती है।", te: "సజీవ నేల వేర్లకు బలాన్ని, పోషకాలను ఇస్తుంది.", ml: "മണ്ണ് വേരുകൾക്ക് ഉറപ്പും പോഷണവും നൽകുന്നു." } },
            { id: "c-sun", title: { en: "Sunlight", hi: "सूर्य का प्रकाश", te: "సూర్యరశ్మి", ml: "സൂര്യപ്രകാശം" }, icon: "wb-sunny", color: "#F59E0B", taraDialogue: { en: "Sunlight powers photosynthesis, creating sugars inside the green leaves.", hi: "धूप पत्तियों में भोजन और ऊर्जा बनाने का काम करती है।", te: "సూర్యరశ్మి ఆకులలో ఆహార తయారీకి అవసరం.", ml: "സൂര്യപ്രകാശം ഇലകളിൽ അന്നജം നിർമ്മിക്കാൻ സഹായിക്കുന്നു." } },
            { id: "c-return", title: { en: "Returning Residues", hi: "अवशेष लौटाना", te: "వ్యర్థాలను చేర్చడం", ml: "അവശിഷ്ടങ്ങൾ തിരികെ നൽകൽ" }, icon: "compost", color: "#0284C7", taraDialogue: { en: "What comes from the soil must return to the soil to keep fertility eternal!", hi: "जो मिट्टी से आता है, उसे मिट्टी में वापस जाना चाहिए ताकि उर्वरता बनी रहे!", te: "నేల నుండి వచ్చినదాన్ని మళ్లీ నేలకే చేరిస్తే బలం పెరుగుతుంది!", ml: "മണ്ണിൽ നിന്ന് ലഭിച്ചത് മണ്ണിലേക്ക് തന്നെ നൽകിയാൽ ഫലഭൂയിഷ്ഠത നിലനിൽക്കും!" } },
          ],
        },
        {
          type: "match",
          id: "basics-l1-match",
          title: { en: "Match Natural Roles", hi: "प्राकृतिक कार्यों को मिलाएं", te: "సహజ పాత్రలను జతపరచండి", ml: "ധർമ്മങ്ങൾ യോജിപ്പിക്കുക" },
          instructions: { en: "Connect each farming pillar to its primary contribution.", hi: "प्रत्येक स्तंभ को उसके मुख्य कार्य से जोड़ें।", te: "సరైన పాత్రతో జత చేయండి.", ml: "യോജിച്ചവ തമ്മിൽ ചേർക്കുക." },
          xp: 20,
          taraDialogue: { en: "Connect each farming element with its vital role!", hi: "हर तत्व को उसके सही कार्य से जोड़ें!", te: "ప్రతి అంశాన్ని దాని పనితో జత చేయండి!", ml: "യോജിച്ച ജോടികളെ കണ്ടെത്തുക!" },
          taraSuccessDialogue: { en: "Spot on! The farm circle is united!", hi: "शानदार! खेती का चक्र पूरा हुआ!", te: "చాలా బాగుంది! సహజ చక్రం పూర్తయింది!", ml: "വളരെ നന്നായിരിക്കുന്നു!" },
          pairs: [
            { id: "p-seed", leftText: { en: "Healthy Seed", hi: "स्वस्थ बीज", te: "మంచి విత్తనం", ml: "നല്ല വിത്ത്" }, rightText: { en: "Sprouts vigorous crop genetics", hi: "मजबूत पौधे को जन्म देता है", te: "బలమైన మొక్కను ఇస్తుంది", ml: "മികച്ച ചെടിയെ നൽകുന്നു" } },
            { id: "p-sun", leftText: { en: "Sunlight", hi: "धूप", te: "ఎండ", ml: "സൂര്യപ്രകാശം" }, rightText: { en: "Drives food production in leaves", hi: "पत्तियों में भोजन बनाता है", te: "ఆకులలో ఆహారాన్ని తయారుచేస్తుంది", ml: "ഇലകളിൽ ഭക്ഷണം ഉണ്ടാക്കുന്നു" } },
            { id: "p-soil", leftText: { en: "Living Soil", hi: "जीवित मिट्टी", te: "సజీవ నేల", ml: "നല്ല മണ്ണ്" }, rightText: { en: "Anchors roots & cycles nutrients", hi: "जड़ों को थामती है और पोषण देती है", te: "వేర్లను పట్టి ఉంచి బలాన్నిస్తుంది", ml: "വേരുകൾക്ക് പോഷണം നൽകുന്നു" } },
            { id: "p-compost", leftText: { en: "Crop Residue", hi: "फसल अवशेष", te: "పంట వ్యర్థాలు", ml: "വിള അവശിഷ്ടങ്ങൾ" }, rightText: { en: "Recharges biological organic fertility", hi: "जैविक उर्वरता को बढ़ाता है", te: "సేంద్రీయ బలాన్ని తిరిగి ఇస్తుంది", ml: "മണ്ണിന്റെ ഫലഭൂയിഷ്ഠത കൂട്ടുന്നു" } },
          ],
        },
        {
          type: "mcq",
          id: "basics-l1-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-basics-1",
              question: { en: "Why is returning plant residues back to the soil essential in natural farming?", hi: "प्राकृतिक खेती में फसल अवशेषों को मिट्टी में वापस मिलाना क्यों जरूरी है?", te: "పంట వ్యర్థాలను మళ్లీ నేలలో కలపడం ఎందుకు ముఖ్యం?", ml: "വിള അവശിഷ്ടങ്ങൾ മണ്ണിലേക്ക് തിരികെ ചേർക്കുന്നത് എന്തിനാണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "It replenishes organic carbon and feeds soil microbes", hi: "यह जैविक कार्बन बढ़ाता है और सूक्ष्मजीवों को भोजन देता है", te: "ఇది సేంద్రీయ కర్బనాన్ని పెంచి జీవులకు ఆహారాన్నిస్తుంది", ml: "ഇത് ജൈവാംശം വർദ്ധിപ്പിക്കുകയും ജീവികൾക്ക് ഭക്ഷണം നൽകുകയും ചെയ്യുന്നു" }, isCorrect: true, explanation: { en: "Residues maintain perpetual organic cycles.", hi: "अवशेष निरंतर पोषण का चक्र बनाए रखते हैं।", te: "వ్యర్థాలు సహజ చక్రాన్ని నడుపుతాయి.", ml: "ഇത് മണ്ണിന്റെ ജീവൻ നിലനിർത്തുന്നു." } },
                { id: "opt-2", text: { en: "It stops plants from growing roots", hi: "यह जड़ों को बढ़ने से रोकता है", te: "ఇది వేర్లను పెరగనివ్వదు", ml: "വേരുകൾ വളരുന്നത് തടയുന്നു" }, isCorrect: false, explanation: { en: "Residues actually encourage deep root networks.", hi: "अवशेष जड़ों को गहरा जाने में मदद करते हैं।", te: "ఇది వేర్లకు మేలు చేస్తుంది.", ml: "വേരുകൾക്ക് ഗുണകരമാണ്." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l1-reward",
          xp: 40,
          badgeTitle: { en: "Seed & Sprout", hi: "बीज और अंकुर", te: "విత్తనం & మొలక", ml: "വിത്തും മുളയും" },
          badgeIcon: "eco",
          badgeDescription: { en: "Mastered Level 1: The Circle of Farming", hi: "स्तर 1 में महारत हासिल की", te: "స్థాయి 1 పూర్తి చేసారు", ml: "ലെവൽ 1 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Wonderful! You understand how nature powers the agricultural loop!", hi: "शानदार! आपने समझ लिया कि प्रकृति खेती के चक्र को कैसे चलाती है!", te: "అద్భుతం! ప్రకృతి చక్రం గురించి తెలుసుకున్నారు!", ml: "മികച്ച തുടക്കം!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 2: SUNLIGHT & PLANT ENERGY
    // ─────────────────────────────────────────────
    {
      id: "basics-level-2",
      levelNumber: 2,
      title: {
        en: "Sunlight & Plant Energy",
        hi: "धूप और पौधे की ऊर्जा",
        te: "సూర్యరశ్మి & మొక్క శక్తి",
        ml: "സൂര്യപ്രകാശവും സസ്യോർജ്ജവും",
      },
      subtitle: {
        en: "Learn how green leaves turn solar energy into carbohydrates and root exudates",
        hi: "जानें कि हरी पत्तियां सौर ऊर्जा को भोजन में कैसे बदलती हैं",
        te: "ఆకులు సూర్యరశ్మిని ఆహారంగా ఎలా మారుస్తాయో తెలుసుకోండి",
        ml: "ഇലകൾ സൂര്യപ്രകാശത്തിൽ നിന്ന് ഭക്ഷണം ഉണ്ടാക്കുന്നത് എങ്ങനെയെന്ന് പഠിക്കുക",
      },
      durationMinutes: 5,
      xpReward: 40,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l2-concepts",
          title: { en: "Sunlight & Plant Energy", hi: "धूप और पौधे की ऊर्जा", te: "సూర్యరశ్మి & మొక్క శక్తి", ml: "സൂര്യപ്രകാശവും സസ്യോർജ്ജവും" },
          taraDialogue: {
            en: "Leaves are nature's solar panels! Through photosynthesis, green leaves capture photons and carbon dioxide from the air to make sugars. Half of these sugars feed the plant, and half flow down into the roots to feed beneficial soil microbes!",
            hi: "पत्तियां प्रकृति के सोलर पैनल हैं! वे धूप से भोजन बनाती हैं जो पौधे और मिट्टी के जीवों दोनों को पोषित करता है।",
            te: "ఆకులు ప్రకృతి సోలార్ ప్యానెల్స్ లాంటివి! సూర్యకాంతితో తయారుచేసిన ఆహారం మొక్కకు మరియు నేల జీవులకు అందుతుంది.",
            ml: "ഇലകൾ പ്രകൃതിയുടെ സോളാർ പാനലുകളാണ്! അവ സൂര്യപ്രകാശം ആഗിരണം ചെയ്ത് ചെടിക്കും മണ്ണിനും ഭക്ഷണം നൽകുന്നു.",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "PHOTOSYNTHESIS", hi: "प्रकाश संश्लेषण", te: "కిరణజన్య సంయోగక్రియ", ml: "പ്രകാശസംശ്ലേഷണം" },
            title: { en: "Solar Food Factories", hi: "सूर्य से भोजन निर्माण", te: "సహజ ఆహార కర్మాగారాలు", ml: "സൗരോർജ്ജ ഫാക്ടറികൾ" },
            description: { en: "Maximizing sunlight capture through proper plant spacing supercharges growth.", hi: "उचित दूरी से धूप का सही उपयोग पौधे की वृद्धि को तेज करता है।", te: "సరైన దూరంలో నాటడం వల్ల ఎండ బాగా తగిలి పంట బలంగా పెరుగుతుంది.", ml: "ശരിയായ അകലത്തിൽ നടുമ്പോൾ കൂടുതൽ സൂര്യപ്രകാശം ലഭിക്കുന്നു." },
            bulletPoints: [
              { title: { en: "Solar Factory", hi: "सोलर फैक्ट्री", te: "సౌర శక్తి", ml: "സൗരോർജ്ജം" }, text: { en: "Leaves absorb red and blue light spectrums to build sugars.", hi: "पत्तियां धूप सोखकर शर्करा बनाती हैं।", te: "ఆకులు ఎండను గ్రహించి ఆహారాన్ని తయారుచేస్తాయి.", ml: "ഇലകൾ പ്രകാശം ആഗിരണം ചെയ്ത് വളരുന്നു." }, icon: "wb-sunny" },
              { title: { en: "Root Exudates", hi: "जड़ स्राव", te: "వేర్ల స్రావాలు", ml: "വേരുകളിലെ സ്രവം" }, text: { en: "Plants trade liquid carbon with microbes in exchange for minerals.", hi: "पौधे खनिजों के बदले सूक्ष्मजीवों को तरल कार्बन देते हैं।", te: "మొక్కలు సూక్ష్మజీవులకు ఆహారాన్ని ఇచ్చి బలాన్ని తీసుకుంటాయి.", ml: "ചെടികൾ മണ്ണിലെ ജീവികൾക്ക് കാർബൺ നൽകുന്നു." }, icon: "bubble-chart" },
            ],
          },
          cards: [
            { id: "c-leaf", title: { en: "Green Chlorophyll", hi: "हरा क्लोरोफिल", te: "హరితరేణువు", ml: "ഹരിതകം" }, icon: "grass", color: "#4CAF50", taraDialogue: { en: "Chlorophyll pigments absorb solar rays like microscopic solar cells.", hi: "क्लोरोफिल धूप की किरणों को सोखता है।", te: "హరితరేణువులు సూర్యరశ్మిని గ్రహిస్తాయి.", ml: "ഹരിതകം പ്രകാശത്തെ ആകർഷിക്കുന്നു." } },
            { id: "c-canopy", title: { en: "Canopy Layout", hi: "छतरी की बनावट", te: "కొమ్మల అమరిక", ml: "മേലാപ്പ് ഘടന" }, icon: "grid-view", color: "#0284C7", taraDialogue: { en: "Orientation from East to West maximizes daylight hours for every single leaf.", hi: "पूर्व से पश्चिम दिशा हर पत्ती को धूप देती है।", te: "తూర్పు-పడమర దిశలో నాటడం వల్ల ఎండ బాగా తగులుతుంది.", ml: "കിഴക്ക്-പടിഞ്ഞാറ് ദിശയിൽ നടുമ്പോൾ നല്ല വെളിച്ചം കിട്ടും." } },
          ],
        },
        {
          type: "scenarioChallenge",
          id: "basics-l2-challenge",
          title: { en: "Optimal Sunlight Challenge", hi: "धूप प्रबंधन चुनौती", te: "సూర్యరశ్మి సవాలు", ml: "സൂര്യപ്രകാശ ചലഞ്ച്" },
          instructions: { en: "Pick the planting arrangement that captures more sunlight effectively.", hi: "वह तरीका चुनें जो धूप का सबसे अच्छा उपयोग करे।", te: "ఎండ బాగా తగిలే సరైన పద్ధతిని ఎంచుకోండి.", ml: "നല്ല വെളിച്ചം ലഭിക്കുന്ന രീതി തിരഞ്ഞെടുക്കുക." },
          xp: 20,
          taraDialogue: { en: "Which farm layout allows leaves to absorb maximum sun without overcrowding?", hi: "कौन सा तरीका पत्तियों को बिना भीड़ के भरपूर धूप देता है?", te: "ఏ పద్ధతిలో మొక్కలకు తగినంత ఎండ తగులుతుంది?", ml: "ചെടികൾക്ക് ശരിയായ വെളിച്ചം നൽകുന്നത് ഏതാണ്?" },
          taraSuccessDialogue: { en: "Smart choice! Proper sunlight spacing maximizes yield!", hi: "सही फैसला! धूप का सही प्रबंधन उपज बढ़ाता है!", te: "సరైన నిర్ణయం! మంచి ఎండతో దిగుబడి పెరుగుతుంది!", ml: "മികച്ച തിരഞ്ഞെടുപ്പ്!" },
          rounds: [
            {
              id: "r1-spacing",
              roundNumber: 1,
              topic: { en: "Canopy Spacing", hi: "पौधों की दूरी", te: "మొక్కల మధ్య దూరం", ml: "ചെടികൾക്കിടയിലെ അകലം" },
              prompt: { en: "Which planting style captures sunlight more evenly?", hi: "कौन सा तरीका धूप को समान रूप से पहुंचाता है?", te: "ఏ పద్ధతిలో అన్ని ఆకులకు సమానంగా ఎండ అందుతుంది?", ml: "എല്ലാ ഇലകളിലേക്കും വെളിച്ചം എത്തിക്കുന്നത് ഏതാണ്?" },
              options: [
                { id: "opt-a", label: "A", text: { en: "Overcrowded dense thicket with shaded lower leaves", hi: "अत्यधिक घनी बुआई जहाँ नीचे की पत्तियां छांव में रहें", te: "కింది ఆకులకు ఎండ తగలని రద్దీ అమరిక", ml: "അടിയിലെ ഇലകളിൽ വെളിച്ചം വീഴാത്ത രീതി" }, isCorrect: false, explanation: { en: "Shaded leaves turn yellow and invite fungal molds.", hi: "छांव वाली पत्तियां पीली पड़ जाती हैं और फफूंद लगती है।", te: "ఎండ లేకపోతే తెగుళ్లు వస్తాయి.", ml: "വെളിച്ചമില്ലെങ്കിൽ കുമിൾ രോഗം വരും." } },
                { id: "opt-b", label: "B", text: { en: "Staggered rows with open air and light channels", hi: "उचित दूरी वाली कतारें जहाँ हवा और धूप का प्रवाह हो", te: "గాలి, వెలుతురు ధారాళంగా వచ్చే సరైన వరుసలు", ml: "ധാരാളം വായുവും വെളിച്ചവും ലഭിക്കുന്ന നിരകൾ" }, isCorrect: true, explanation: { en: "Every leaf gets direct sun, fueling peak carbohydrate production.", hi: "हर पत्ती को सीधी धूप मिलती है।", te: "ప్రతి ఆకుకు ఎండ తగిలి ఆహారం బాగా తయారవుతుంది.", ml: "എല്ലാ ഇലകളിലും പ്രകാശം ലഭിക്കുന്നു." } },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "basics-l2-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l2-1",
              question: { en: "What do plant roots release into the soil to feed friendly microorganisms?", hi: "पौधों की जड़ें सूक्ष्मजीवों को पोषण देने के लिए मिट्टी में क्या छोड़ती हैं?", te: "మొక్కల వేర్లు సూక్ష్మజీవుల కోసం నేలలోకి ఏమి విడుదల చేస్తాయి?", ml: "സൂക്ഷ്മജീവികൾക്ക് ഭക്ഷണമായി വേരുകൾ മണ്ണിലേക്ക് നൽകുന്നത് എന്താണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "Liquid carbon exudates made from photosynthesis", hi: "प्रकाश संश्लेषण से बनी तरल कार्बन शर्करा", te: "కిరణజన్య సంయోగక్రియ ద్వారా తయారైన కార్బన్ ద్రవాలు", ml: "പ്രകാശസംശ്ലേഷണം വഴി ഉണ്ടായ കാർബൺ സ്രവങ്ങൾ" }, isCorrect: true, explanation: { en: "Plants invest up to 40% of their photosynthate into microbial soil food.", hi: "पौधे अपने भोजन का 40% हिस्सा जीवों को देते हैं।", te: "మొక్కలు తయారుచేసిన ఆహారాన్ని జీవులతో పంచుకుంటాయి.", ml: "ചെടികൾ ജീവികൾക്ക് ആഹാരം നൽകുന്നു." } },
                { id: "opt-2", text: { en: "Plastic polymers", hi: "प्लास्टिक पॉलिमर", te: "ప్లాస్టిక్ పదార్థాలు", ml: "പ്ലാസ്റ്റിക് മാലിന്യങ്ങൾ" }, isCorrect: false, explanation: { en: "Plants produce natural organic compounds.", hi: "पौधे प्राकृतिक कार्बनिक यौगिक बनाते हैं।", te: "మొక్కలు సహజ పదార్థాలను మాత్రమే ఇస్తాయి.", ml: "പ്രകൃതിദത്ത ഘടകങ്ങൾ മാത്രമാണ് ഉണ്ടാവുന്നത്." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l2-reward",
          xp: 40,
          badgeTitle: { en: "Solar Grower", hi: "सौर कृषक", te: "సౌర రైతు", ml: "സോളാർ ഗ്രോവർ" },
          badgeIcon: "wb-sunny",
          badgeDescription: { en: "Mastered Level 2: Sunlight & Plant Energy", hi: "स्तर 2 में महारत हासिल की", te: "స్థాయి 2 పూర్తి చేసారు", ml: "ലെവൽ 2 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Brilliant! You know how to capture free solar energy to fuel heavy yields!", hi: "शानदार! आप मुफ्त सौर ऊर्जा से बंपर पैदावार लेना सीख गए हैं!", te: "అద్భుతం! సూర్యకాంతితో అధిక దిగుబడి సాధించే మార్గం తెలుసుకున్నారు!", ml: "വളരെ നല്ല അറിവ്!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 3: WATER WISELY
    // ─────────────────────────────────────────────
    {
      id: "basics-level-3",
      levelNumber: 3,
      title: {
        en: "Water Wisely",
        hi: "समझदारी से जल प्रबंधन",
        te: "నీటిని పొదుపుగా వాడండి",
        ml: "കാര്യക്ഷമമായ ജലസേചനം",
      },
      subtitle: {
        en: "Master root-zone hydration, morning watering, and moisture retention",
        hi: "जड़ क्षेत्र में सही नमी, सुबह की सिंचाई और पानी बचाने के तरीके सीखें",
        te: "వేర్ల వద్ద తేమను కాపాడే పద్ధతులు మరియు నీటి నిర్వహణ నేర్చుకోండి",
        ml: "വേരുഭാഗത്ത് ഈർപ്പം നിലനിർത്തുന്ന രീതികൾ ശീലിക്കുക",
      },
      durationMinutes: 5,
      xpReward: 45,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l3-concepts",
          title: { en: "Water Wisely", hi: "समझदारी से जल प्रबंधन", te: "నీటిని పొదుపుగా వాడండి", ml: "കാര്യക്ഷമമായ ജലസേചനം" },
          taraDialogue: {
            en: "Watering is about precision, not flooding! Excess standing water drowns root oxygen, while scorching midday watering evaporates into thin air. Early morning root-zone hydration combined with protective mulch keeps soil moist 3x longer!",
            hi: "सिंचाई का मतलब खेत डुबाना नहीं, सही जगह पानी देना है! सुबह के समय गीली घास की मल्चिंग के साथ पानी देने से नमी 3 गुना अधिक टिकती है।",
            te: "నీరు పెట్టడం అంటే పొలాన్ని ముంచడం కాదు! ఉదయాన్నే వేర్ల వద్ద మల్చింగ్ తో నీరిస్తే తేమ 3 రెట్లు ఎక్కువ కాలం ఉంటుంది.",
            ml: "വെള്ളം കൂടുതൽ ഒഴിക്കുകയല്ല, മറിച്ച് ആവശ്യത്തിന് നൽകുകയാണ് വേണ്ടത്! പുതയിട്ട് നനച്ചാൽ ഈർപ്പം ദീർഘനേരം നിൽക്കും.",
          },
          taraExpression: "happy",
          explanation: {
            tag: { en: "IRRIGATION MASTERY", hi: "सिंचाई में महारत", te: "నీటి నిర్వహణ", ml: "നന രീതികൾ" },
            title: { en: "The Golden Rules of Farm Water", hi: "खेत में पानी के सुनहरे नियम", te: "నీటి నిర్వహణ సువర్ణ సూత్రాలు", ml: "ജലസേചന നിയമങ്ങൾ" },
            description: { en: "Deliver moisture directly to root zones during cool hours to eliminate waste.", hi: "अपव्यय रोकने के लिए ठंडे समय में सीधे जड़ों तक नमी पहुंचाएं।", te: "నీరు వృధా కాకుండా చల్లని వేళల్లో వేర్లకు అందించండి.", ml: "തണുപ്പുള്ള സമയങ്ങളിൽ നനച്ച് വെള്ളം പാഴാകാതെ സൂക്ഷിക്കുക." },
            bulletPoints: [
              { title: { en: "Cool Timing", hi: "सही समय", te: "సరైన సమయం", ml: "അനുയോജ്യമായ സമയം" }, text: { en: "Early morning watering minimizes sun evaporation loss.", hi: "सुबह की सिंचाई वाष्पीकरण को रोकती है।", te: "ఉదయాన్నే నీరిస్తే ఎండకు ఆవిరి కాదు.", ml: "രാവിലെ നനച്ചാൽ ബാഷ്പീകരണം കുറയും." }, icon: "schedule" },
              { title: { en: "Mulch Shield", hi: "मल्च सुरक्षा", te: "మల్చింగ్ రక్షణ", ml: "പുതയിടൽ സംരക്ഷണം" }, text: { en: "Covered soil stays moist for days without re-watering.", hi: "ढकी हुई मिट्टी कई दिनों तक नम रहती है।", te: "కప్పబడిన నేలలో తేమ ఎక్కువ రోజులు ఉంటుంది.", ml: "പുതയിട്ട മണ്ണിൽ ദിവസങ്ങളോളം ഈർപ്പം നിൽക്കും." }, icon: "shield" },
            ],
          },
          cards: [
            { id: "c-root-zone", title: { en: "Root Zone Soak", hi: "जड़ क्षेत्र की सिंचाई", te: "వేర్ల వద్ద తడి", ml: "വേരുഭാഗത്തെ നന" }, icon: "water-drop", color: "#0284C7", taraDialogue: { en: "Aim directly at the soil perimeter where feeder root hairs absorb moisture.", hi: "सीधे उस परिधि में पानी दें जहाँ जड़ें नमी सोखती हैं।", te: "వేర్ల చివర్లకు చేరేలా నీటిని అందించండి.", ml: "വേരുകളിലേക്ക് നേരിട്ട് വെള്ളം നൽകുക." } },
            { id: "c-sponge", title: { en: "Soil as Sponge", hi: "स्पंज जैसी मिट्टी", te: "స్పాంజ్ లాంటి నేల", ml: "സ്പോഞ്ച് പോലെയുള്ള മണ്ണ്" }, icon: "layers", color: "#795548", taraDialogue: { en: "Adding organic matter turns hard ground into a porous water-holding sponge.", hi: "जैविक पदार्थ मिट्टी को स्पंज जैसा बना देते हैं।", te: "సేంద్రీయ పదార్థాలు నేలను స్పాంజ్ లా మారుస్తాయి.", ml: "ജൈവാംശം മണ്ണിനെ ഈർപ്പം ശേഖരിക്കുന്ന സ്പോഞ്ചാക്കി മാറ്റുന്നു." } },
          ],
        },
        {
          type: "decisionChoice",
          id: "basics-l3-decisions",
          title: { en: "Smart Watering Decisions", hi: "स्मार्ट जल निर्णय", te: "స్మార్ట్ నీటి నిర్ణయాలు", ml: "ബുദ്ധിപരമായ ജലസേചനം" },
          instructions: { en: "Select the action that best preserves soil moisture and root health.", hi: "वह विकल्प चुनें जो नमी और जड़ों के स्वास्थ्य की रक्षा करे।", te: "నేల తేమను కాపాడే సరైన నిర్ణయాన్ని ఎంచుకోండి.", ml: "ഈർപ്പം നിലനിർത്താൻ സഹായിക്കുന്ന തീരുമാനം എടുക്കുക." },
          xp: 25,
          taraDialogue: { en: "A farmer is planning irrigation. Help choose the smarter water-saving behavior!", hi: "किसान सिंचाई की योजना बना रहा है। पानी बचाने वाला सही विकल्प चुनें!", te: "రైతు నీటి పారుదల చేస్తున్నాడు. సరైన పొదుపు నిర్ణయాన్ని ఎంచుకోండి!", ml: "വെള്ളം ലാഭിക്കാനുള്ള ശരിയായ വഴി തിരഞ്ഞെടുക്കുക!" },
          taraSuccessDialogue: { en: "Great instincts! Your crops will stay hydrated and healthy!", hi: "बहुत खूब! आपकी फसलें हमेशा हरी-भरी और नम रहेंगी!", te: "చాలా బాగుంది! పంటలకు సమృద్ధిగా నీరందుతుంది!", ml: "മികച്ച തിരഞ്ഞെടുപ്പ്!" },
          rounds: [
            {
              id: "r1-time",
              roundNumber: 1,
              topic: { en: "Watering Schedule", hi: "सिंचाई का समय", te: "నీటి సమయం", ml: "നന സമയം" },
              situation: { en: "The sun is beating down fiercely at 1:00 PM on dry soil.", hi: "दोपहर 1:00 बजे तेज धूप में मिट्टी सूखी है।", te: "మధ్యాహ్నం 1:00 గంటలకు ఎండ చాలా తీవ్రంగా ఉంది.", ml: "ഉച്ചയ്ക്ക് 1 മണിക്ക് കടുത്ത വെയിലാണ്." },
              choices: [
                { id: "c1", label: "Choice A", text: { en: "Flood the soil under direct blistering afternoon sun", hi: "दोपहर की तेज धूप में पानी बहा दें", te: "మధ్యాహ్నం మండుటెండలో నీరు పెట్టడం", ml: "ഉച്ചവെയിലിൽ വെള്ളം ഒഴുക്കുക" }, isGoodChoice: false },
                { id: "c2", label: "Choice B", text: { en: "Irrigate gently in early morning or late evening with mulch cover", hi: "सुबह या शाम के समय गीली घास की मल्च के साथ पानी दें", te: "ఉదయం లేదా సాయంత్రం వేళల్లో మల్చింగ్ తో నీరివ్వడం", ml: "രാവിലെയോ വൈകുന്നേരമോ പുതയിട്ട് നനയ്ക്കുക" }, isGoodChoice: true, taraReaction: { en: "Spot on! Cool hours avoid instant evaporation loss.", hi: "सही! ठंडे समय में पानी भाप बनकर नहीं उड़ता।", te: "సరైన నిర్ణయం! ఎండకు ఆవిరి కాదు.", ml: "നല്ല തീരുമാനം! വെള്ളം നഷ്ടപ്പെടില്ല." } },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "basics-l3-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l3-1",
              question: { en: "What is the primary danger of persistent standing water in crop beds?", hi: "खेत में लगातार पानी भरे रहने का मुख्य खतरा क्या है?", te: "పొలంలో నీరు నిలిచిపోవడం వల్ల వచ్చే ప్రమాదం ఏమిటి?", ml: "പാടത്ത് എപ്പോഴും വെള്ളം കെട്ടിക്കിടന്നാലുള്ള ദോഷം എന്താണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "It cuts off root oxygen, causing root rot and fungal suffocation", hi: "यह जड़ों की ऑक्सीजन रोक देता है, जिससे जड़ें सड़ने लगती हैं", te: "ఇది వేర్లకు గాలిని ఆపేసి కుళ్ళిపోయేలా చేస్తుంది", ml: "വേരുകളിലേക്ക് വായു സഞ്ചാരം തടഞ്ഞ് അഴുകാൻ ഇടയാക്കുന്നു" }, isCorrect: true, explanation: { en: "Roots require oxygen pores to stay disease-free.", hi: "जड़ों को स्वस्थ रहने के लिए हवा की आवश्यकता होती है।", te: "వేర్లకు ప్రాణవాయువు అవసరం.", ml: "വേരുകൾക്ക് ഓക്സിജൻ അത്യാവശ്യമാണ്." } },
                { id: "opt-2", text: { en: "It makes crops produce too many flowers", hi: "इससे बहुत अधिक फूल आने लगते हैं", te: "ఇది ఎక్కువ పూలను పూయిస్తుంది", ml: "കൂടുതൽ പൂക്കൾ ഉണ്ടാക്കുന്നു" }, isCorrect: false, explanation: { en: "Waterlogging stresses plants and halts flowering.", hi: "जलभराव से पौधे तनाव में आ जाते हैं।", te: "నీరు ఎక్కువైతే మొక్క దెబ్బతింటుంది.", ml: "ചെടികൾ നശിച്ചുപോകും." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l3-reward",
          xp: 45,
          badgeTitle: { en: "Water Wise Farmer", hi: "जल-दक्ष किसान", te: "నీటి పొదుపు రైతు", ml: "വാട്ടർ വൈസ് ഫാർമർ" },
          badgeIcon: "water-drop",
          badgeDescription: { en: "Mastered Level 3: Water Wisely", hi: "स्तर 3 में महारत हासिल की", te: "స్థాయి 3 పూర్తి చేసారు", ml: "ലെവൽ 3 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Exceptional! You have mastered the balance of root hydration and conservation!", hi: "लाजवाब! आपने जड़ों की नमी और जल संरक्षण का सही संतुलन सीख लिया!", te: "అద్భుతం! నీటిని పొదుపుగా వాడటం నేర్చుకున్నారు!", ml: "വളരെ മികച്ച മുന്നേറ്റം!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 4: SEEDS & GERMINATION
    // ─────────────────────────────────────────────
    {
      id: "basics-level-4",
      levelNumber: 4,
      title: {
        en: "Seeds & Germination",
        hi: "बीज और अंकुरण",
        te: "విత్తనాలు & మొలకలు",
        ml: "വിത്തുകളും മുളപ്പിക്കലും",
      },
      subtitle: {
        en: "Select indigenous seeds and protect them with natural bio-coatings like Beejamrit",
        hi: "देसी बीजों का चयन करें और बीजामृत जैसे प्राकृतिक लेप से उनकी रक्षा करें",
        te: "నాటు విత్తనాలను ఎంచుకోండి మరియు బీజామృతంతో సంరక్షించండి",
        ml: "നാടൻ വിത്തുകൾ തിരഞ്ഞെടുക്കാനും ബീജാമൃതം ഉപയോഗിച്ച് സംരക്ഷിക്കാനും പഠിക്കുക",
      },
      durationMinutes: 5,
      xpReward: 45,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l4-concepts",
          title: { en: "Seeds & Germination", hi: "बीज और अंकुरण", te: "విత్తనాలు & మొలకలు", ml: "വിത്തുകളും മുളപ്പിക്കലും" },
          taraDialogue: {
            en: "A strong crop begins with a healthy seed! Indigenous heirloom seeds are naturally adapted to local climates and pests. Treating seeds with beneficial microbial coatings (like Beejamrit) shields young seedlings against seed-borne pathogens right from day one!",
            hi: "एक मजबूत फसल स्वस्थ बीज से शुरू होती है! देसी बीज स्थानीय मौसम के अनुकूल होते हैं। बीजामृत जैसे प्राकृतिक उपचार से अंकुरण मजबूत होता है।",
            te: "బలమైన పంట మంచి విత్తనంతో మొదలవుతుంది! బీజామృతంతో విత్తన శుద్ధి చేస్తే మొక్కలకు తెగుళ్లు రావు.",
            ml: "നല്ല വിളവ് ലഭിക്കാൻ നല്ല വിത്ത് വേണം! ബീജാമൃതം പോലുള്ള സ്വാഭാവിക ചികിത്സകൾ വിത്തുകൾക്ക് രോഗപ്രതിരോധശേഷി നൽകുന്നു.",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "SEED VITALITY", hi: "बीज की शक्ति", te: "విత్తన బలం", ml: "വിത്തുഗുണം" },
            title: { en: "Indigenous Seed Guardianship", hi: "देसी बीजों का संरक्षण", te: "దేశీ విత్తనాల రక్షణ", ml: "നാടൻ വിത്തുസംരക്ഷണം" },
            description: { en: "Heirloom seeds preserve natural biodiversity and resilience against local droughts.", hi: "देसी बीज सूखे और बीमारियों के प्रति अधिक सहनशील होते हैं।", te: "నాటు విత్తనాలు కరువును మరియు తెగుళ్లను తట్టుకుంటాయి.", ml: "നാടൻ വിത്തുകൾക്ക് കാലാവസ്ഥാ വ്യതിയാനങ്ങളെ അതിജീവിക്കാൻ കഴിയും." },
            bulletPoints: [
              { title: { en: "Heirloom Vigor", hi: "देसी शक्ति", te: "నాటు బలం", ml: "നാടൻ കരുത്ത്" }, text: { en: "Local varieties produce fertile seeds you can save year after year.", hi: "देसी बीजों को आप हर साल खुद सहेज सकते हैं।", te: "ఈ విత్తనాలను ప్రతి ఏటా భద్రపరుచుకోవచ్చు.", ml: "ഓരോ വർഷവും വിത്തുകൾ സൂക്ഷിച്ചുവെക്കാം." }, icon: "grain" },
              { title: { en: "Natural Inoculation", hi: "प्राकृतिक बीजोपचार", te: "సహజ విత్తన శుద్ధి", ml: "സ്വാഭാവിക പരിചരണം" }, text: { en: "Bio-priming with cow dung & lime protects against soil fungi.", hi: "गोबर और चूने से बीजोपचार फफूंद से बचाता है।", te: "సహజ పద్ధతులలో శుద్ధి చేయడం వల్ల రోగాలు రావు.", ml: "കുമിൾ രോഗങ്ങളെ പ്രതിരോധിക്കുന്നു." }, icon: "shield" },
            ],
          },
          cards: [
            { id: "c-heirloom", title: { en: "Desi Seeds", hi: "देसी बीज", te: "నాటు విత్తనాలు", ml: "നാടൻ വിത്തുകൾ" }, icon: "grain", color: "#8D6E63", taraDialogue: { en: "Heirloom seeds have evolved over generations with deep root genetics.", hi: "देसी बीज पीढ़ियों से मौसम को सहन करने के लिए तैयार हुए हैं।", te: "నాటు విత్తనాలు బలమైన వేర్లను కలిగి ఉంటాయి.", ml: "തലമുറകളായി പകർന്നു കിട്ടിയ കരുത്തുറ്റ വിത്തുകൾ." } },
            { id: "c-beejamrit", title: { en: "Beejamrit Coat", hi: "बीजामृत लेप", te: "బీజామృతం", ml: "ബീജാമൃതം" }, icon: "biotech", color: "#2E7D32", taraDialogue: { en: "A natural microbial shield made from cow dung, urine, lime, and native soil.", hi: "गोबर, गोमूत्र और चूने से बना प्राकृतिक सुरक्षा कवच।", te: "గోవు పేడ, మూత్రంతో చేసే సహజ రక్షణ కవచం.", ml: "പ്രകൃതിദത്ത വിത്തുചികിത്സാ രീതി." } },
          ],
        },
        {
          type: "match",
          id: "basics-l4-match",
          title: { en: "Match Seed Steps", hi: "बीज चरणों को मिलाएं", te: "విత్తన దశలను జతపరచండి", ml: "വിത്തുഘട്ടങ്ങൾ" },
          instructions: { en: "Connect each seed care practice to its farming benefit.", hi: "प्रत्येक बीज उपचार को उसके लाभ से जोड़ें।", te: "సరైన ప్రయోజనంతో జత చేయండి.", ml: "യോജിച്ചവ തമ്മിൽ ചേർക്കുക." },
          xp: 25,
          taraDialogue: { en: "Connect each seed step to how it protects the future crop!", hi: "हर बीज चरण को उसके लाभ से जोड़ें!", te: "విత్తన సంరక్షణను దాని ప్రయోజనంతో జత చేయండి!", ml: "യോജിച്ച ജോടികളെ കണ്ടെത്തുക!" },
          taraSuccessDialogue: { en: "Masterful! Your seeds will germinate with high vigor!", hi: "शानदार! आपके बीज तेजी से और स्वस्थ अंकुरित होंगे!", te: "చాలా బాగుంది! విత్తనాలు బలంగా మొలకెత్తుతాయి!", ml: "വിത്തുകൾ നന്നായി മുളയ്ക്കും!" },
          pairs: [
            { id: "p-select", leftText: { en: "Heirloom Selection", hi: "देसी बीज चयन", te: "నాటు విత్తన ఎంపిక", ml: "നാടൻ വിത്ത് തിരഞ്ഞെടുപ്പ്" }, rightText: { en: "Ensures climate & drought adaptation", hi: "मौसम और सूखे को सहन करने की क्षमता", te: "వాతావరణాన్ని తట్టుకునే శక్తిని ఇస్తుంది", ml: "കാലാവസ്ഥയെ അതിജീവിക്കുന്നു" } },
            { id: "p-beej", leftText: { en: "Beejamrit Treatment", hi: "बीजामृत उपचार", te: "బీజామృత శుద్ధి", ml: "ബീജാമൃത പരിചരണം" }, rightText: { en: "Shields against fungal damping-off", hi: "फफूंद और सड़न से सुरक्षा देता है", te: "శిలీంధ్రాల నుండి కాపాడుతుంది", ml: "കുമിൾ രോഗങ്ങളിൽ നിന്ന് രക്ഷിക്കുന്നു" } },
            { id: "p-depth", leftText: { en: "Optimum Sowing Depth", hi: "उचित बुआई गहराई", te: "సరైన విత్తే లోతు", ml: "ശരിയായ വിത്ത് താഴ്ച" }, rightText: { en: "2-3x seed thickness for moisture & air", hi: "बीज के आकार से 2-3 गुना गहराई", te: "విత్తనం పరిమాణానికి తగిన లోతు", ml: "ഈർപ്പവും വായുവും ഉറപ്പാക്കുന്നു" } },
          ],
        },
        {
          type: "mcq",
          id: "basics-l4-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l4-1",
              question: { en: "Why is natural seed treatment (like Beejamrit) recommended prior to sowing?", hi: "बुआई से पहले प्राकृतिक बीजोपचार (जैसे बीजामृत) की सलाह क्यों दी जाती है?", te: "విత్తే ముందు బీజామృతంతో శుద్ధి ఎందుకు చేయాలి?", ml: "വിത്തുവിതയ്ക്കുന്നതിന് മുൻപ് ബീജാമൃതം ഉപയോഗിക്കുന്നത് എന്തിനാണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "It coats the seed with beneficial microbes to block fungal pathogens", hi: "यह बीज को लाभकारी जीवाणुओं से ढककर फफूंद से बचाता है", te: "ఇది సూక్ష్మజీవుల రక్షణనిచ్చి తెగుళ్లను అడ్డుకుంటుంది", ml: "രോഗകാരികളായ കുമിളുകളെ തടയുന്നു" }, isCorrect: true, explanation: { en: "Beneficial bacteria outcompete disease pathogens immediately upon sprouting.", hi: "अच्छे जीवाणु अंकुरण के साथ ही रोगों को रोकते हैं।", te: "మంచి సూక్ష్మజీవులు తెగుళ్లను రానివ్వవు.", ml: "ചെടികൾക്ക് നല്ല പ്രതിരോധശേഷി നൽകുന്നു." } },
                { id: "opt-2", text: { en: "It dyes the seeds purple for aesthetics", hi: "यह बीजों को सुंदर रंग देने के लिए होता है", te: "ఇది విత్తనాలకు రంగు వేయడానికి మాత్రమే", ml: "നിറം മാറ്റാൻ വേണ്ടി മാത്രം" }, isCorrect: false, explanation: { en: "Seed treatment is biological, not cosmetic.", hi: "बीजोपचार जैविक सुरक्षा के लिए है।", te: "ఇది కేవలం అందం కోసం కాదు.", ml: "ഇത് സംരക്ഷണത്തിനാണ്." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l4-reward",
          xp: 45,
          badgeTitle: { en: "Seed Guardian", hi: "बीज संरक्षक", te: "విత్తన సంరక్షకుడు", ml: "വിത്ത് സംരക്ഷകൻ" },
          badgeIcon: "grain",
          badgeDescription: { en: "Mastered Level 4: Seeds & Germination", hi: "स्तर 4 में महारत हासिल की", te: "స్థాయి 4 పూర్తి చేసారు", ml: "ലെവൽ 4 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Incredible! Your seed knowledge will birth healthy, resilient seedlings!", hi: "शानदार! आपके ज्ञान से स्वस्थ और मजबूत पौधे तैयार होंगे!", te: "అద్భుతం! ఆరోగ్యకరమైన పంటలకు పునాది వేశారు!", ml: "അഭിനന്ദനങ്ങൾ!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 5: PLANT NUTRITION & BIO-FERTILITY
    // ─────────────────────────────────────────────
    {
      id: "basics-level-5",
      levelNumber: 5,
      title: {
        en: "Plant Nutrition & Bio-Fertility",
        hi: "पौधों का पोषण और जैविक खाद",
        te: "మొక్కల పోషణ & జీవ ఎరువులు",
        ml: "സസ്യപോഷണവും ജൈവവളങ്ങളും",
      },
      subtitle: {
        en: "Harness natural Jeevamrit, Panchagavya, and botanical extracts to feed soil biology",
        hi: "जीवामृत, पंचगव्य और प्राकृतिक खादों से मिट्टी के जीवन को पोषण दें",
        te: "జీవామృతం, పంచగవ్యలతో నేలను సారవంతం చేసే పద్ధతులు తెలుసుకోండి",
        ml: "ജീവാമൃതവും പഞ്ചഗവ്യവും ഉപയോഗിച്ച് മണ്ണിലെ ജീവൻ നിലനിർത്തുക",
      },
      durationMinutes: 6,
      xpReward: 50,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l5-concepts",
          title: { en: "Plant Nutrition & Bio-Fertility", hi: "पौधों का पोषण और जैविक खाद", te: "మొక్కల పోషణ & జీవ ఎరువులు", ml: "സസ്യപോഷണവും ജൈവവളങ്ങളും" },
          taraDialogue: {
            en: "In nature, nobody buys chemical fertilizer bags in the forest, yet giant trees flourish! Why? Because billions of microbes convert minerals into bio-available plant food. Liquid bio-stimulants like Jeevamrit act as a microbial culture to accelerate this natural digestion!",
            hi: "जंगल में कोई रासायनिक खाद नहीं डालता, फिर भी पेड़ लहलहाते हैं! जीवामृत मिट्टी के जीवों को सक्रिय करके प्राकृतिक पोषण उपलब्ध कराता है।",
            te: "అడవులలో ఎవరూ రసాయన ఎరువులు వేయరు, అయినా చెట్లు ఏపుగా పెరుగుతాయి! జీవామృతం సూక్ష్మజీవులను పెంచి సహజ బలాన్నిస్తుంది.",
            ml: "കാട്ടിൽ ആരും രാസവളം ഇടുന്നില്ല, എങ്കിലും മരങ്ങൾ തഴച്ചുവളരുന്നു! ജീവാമൃതം മണ്ണിലെ സൂക്ഷ്മജീവികളെ ഉണർത്തുന്നു.",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "BIO-FERTILITY", hi: "जैविक उर्वरता", te: "జీవ ఎరువులు", ml: "ജൈവ വളക്കൂറ്" },
            title: { en: "Feeding the Soil, Not the Chemical Store", hi: "मिट्टी को खिलाएं, रसायन नहीं", te: "నేల జీవానికి ఆహారం", ml: "മണ്ണിനെ പോഷിപ്പിക്കുക" },
            description: { en: "Fermented microbial preparations unlock locked soil minerals continuously.", hi: "किण्वित जैविक घोल मिट्टी में बंद खनिजों को पौधों के लिए खोलते हैं।", te: "జీవామృతం లాంటి సహజ ద్రావణాలు నేలలోని పోషకాలను అందిస్తాయి.", ml: "പ്രകൃതിദത്ത ജീവാമൃതം പോഷകങ്ങൾ ലഭ്യമാക്കുന്നു." },
            bulletPoints: [
              { title: { en: "Jeevamrit Culture", hi: "जीवामृत घोल", te: "జీవామృతం", ml: "ജീവാമൃതം" }, text: { en: "Desi cow dung, urine, jaggery, and pulse flour multiply microbial counts.", hi: "गोबर, गोमूत्र, गुड़ और बेसन से सूक्ष्मजीवों की संख्या कई गुना बढ़ती है।", te: "ఆవు పేడ, మూత్రం, బెల్లం మరియు పిండితో సూక్ష్మజీవులు పెరుగుతాయి.", ml: "സൂക്ഷ്മജീവികളുടെ എണ്ണം വർദ്ധിപ്പിക്കുന്നു." }, icon: "biotech" },
              { title: { en: "Nutrient Cycling", hi: "पोषक चक्र", te: "పోషకాల చక్రం", ml: "പോഷക ചക്രം" }, text: { en: "Organic carbon fuels mycorrhizal fungal highways into root tissues.", hi: "जैविक कार्बन जड़ों तक पोषक तत्वों की सड़कें बनाता है।", te: "సేంద్రీయ కర్బనం వేర్లకు పోషకాలను చేరవేస్తుంది.", ml: "വേരുകളിലേക്ക് പോഷകങ്ങൾ എത്തിക്കുന്നു." }, icon: "hub" },
            ],
          },
          cards: [
            { id: "c-jeevamrit", title: { en: "Jeevamrit", hi: "जीवामृत", te: "జీవామృతం", ml: "ജീവാമൃതം" }, icon: "biotech", color: "#15803D", taraDialogue: { en: "A fermented microbial tonic applied twice a month with irrigation water.", hi: "महीने में दो बार पानी के साथ दिया जाने वाला जैविक टॉनिक।", te: "నెలకు రెండుసార్లు నీటితో ఇచ్చే సహజ టానిక్.", ml: "മാസത്തിൽ രണ്ടുതവണ നൽകാവുന്ന ജൈവ ടോണിക്ക്." } },
            { id: "c-panchagavya", title: { en: "Panchagavya", hi: "पंचगव्य", te: "పంచగవ్య", ml: "പഞ്ചഗവ്യം" }, icon: "eco", color: "#F59E0B", taraDialogue: { en: "Rich in amino acids, gibberellins, and growth boosters for foliar spraying.", hi: "पत्तियों पर छिड़काव के लिए प्राकृतिक विकास वर्धक।", te: "ఆకులపై పిచికారీ చేయడానికి అనువైన పోషక ద్రావణం.", ml: "ഇലകളിൽ തളിക്കാൻ പറ്റിയ മികച്ച വളർച്ചാ ത്വരകം." } },
          ],
        },
        {
          type: "memory",
          id: "basics-l5-memory",
          title: { en: "Bio-Nutrient Connections", hi: "जैविक पोषण संबंध", te: "జీవ పోషక అనుసంధానం", ml: "ജൈവപോഷക ജോടികൾ" },
          instructions: { en: "Match each natural input with the plant nutrition it provides.", hi: "प्राकृतिक खाद को उसके पोषण लाभ से मिलाएं।", te: "సహజ ఎరువును దాని పోషక గుణంతో కలపండి.", ml: "യോജിച്ചവ തമ്മിൽ ചേർക്കുക." },
          xp: 30,
          taraDialogue: { en: "Match each organic source to its plant nourishing superpower!", hi: "प्राकृतिक स्रोत को उसकी पोषण शक्ति से जोड़ें!", te: "సేంద్రీయ వనరును దాని శక్తితో జత చేయండి!", ml: "യോജിച്ച ജോടികളെ കണ്ടെത്തുക!" },
          taraSuccessDialogue: { en: "Awesome! Nature has all the fertilizer you ever need!", hi: "अद्भुत! प्रकृति में वह सारा पोषण है जिसकी आपको जरूरत है!", te: "అద్భుతం! ప్రకృతిలోనే సమస్త పోషకాలు ఉన్నాయి!", ml: "മികച്ച മുന്നേറ്റം!" },
          pairs: [
            { id: "p-jeev", itemA: { label: { en: "Jeevamrit", hi: "जीवामृत", te: "జీవామృతం", ml: "ജീവാമൃതം" }, icon: "biotech", color: "#15803D" }, itemB: { label: { en: "Microbial Digestion", hi: "सूक्ष्मजीव पाचन", te: "సూక్ష్మజీవుల బలం", ml: "സൂക്ഷ്മജീവികൾ" }, icon: "scatter-plot", color: "#0284C7" }, connectionExplanation: { en: "Multiplies billions of active biological decomposers.", hi: "अरबों सक्रिय सूक्ष्मजीवों को बढ़ाता है।", te: "కోట్లాది జీవులను పెంచుతుంది.", ml: "സൂക്ഷ്മജീവികളെ വർദ്ധിപ്പിക്കുന്നു." } },
            { id: "p-legume", itemA: { label: { en: "Legume Cover Crop", hi: "दलहनी फसल", te: "పప్పుధాన్యాల పంట", ml: "പയറുവർഗ്ഗ വിളകൾ" }, icon: "grass", color: "#4CAF50" }, itemB: { label: { en: "Atmospheric Nitrogen", hi: "हवा से नाइट्रोजन", te: "నత్రజని స్థిరీకరణ", ml: "നൈട്രജൻ ലഭ്യത" }, icon: "air", color: "#60A5FA" }, connectionExplanation: { en: "Root nodules fix nitrogen straight from the air for free.", hi: "जड़ें हवा से नाइट्रोजन को मिट्टी में संजोती हैं।", te: "గాలిలోని నత్రజనిని నేలలో స్థిరీకరిస్తాయి.", ml: "വായുവിൽ നിന്ന് നൈട്രജൻ ആഗിരണം ചെയ്യുന്നു." } },
          ],
        },
        {
          type: "mcq",
          id: "basics-l5-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l5-1",
              question: { en: "What is the primary role of Jeevamrit in natural farming?", hi: "प्राकृतिक खेती में जीवामृत का मुख्य कार्य क्या है?", te: "సహజ వ్యవసాయంలో జీవామృతం ప్రధాన పాత్ర ఏమిటి?", ml: "പ്രകൃതികൃഷിയിൽ ജീവാമൃതത്തിന്റെ പ്രധാന പങ്ക് എന്താണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "It serves as a catalytic culture to multiply beneficial soil microorganisms", hi: "यह मिट्टी के सूक्ष्मजीवों को तेजी से बढ़ाने वाले कल्चर का काम करता है", te: "ఇది నేలలోని మంచి సూక్ష్మజీవులను పెంచే సాధనంగా పనిచేస్తుంది", ml: "മണ്ണിലെ സൂക്ഷ്മജീവികളെ വൻതോതിൽ വർദ്ധിപ്പിക്കുന്നു" }, isCorrect: true, explanation: { en: "Jeevamrit is a microbial inoculant that unlocks soil fertility.", hi: "जीवामृत मिट्टी के पोषक तत्वों को सक्रिय करता है।", te: "ఇది నేలలోని పోషకాలను చైతన్యవంతం చేస్తుంది.", ml: "മണ്ണിലെ പോഷകങ്ങൾ ലഭ്യമാക്കുന്നു." } },
                { id: "opt-2", text: { en: "It acts as a toxic synthetic poison", hi: "यह एक रासायनिक जहर है", te: "ఇది రసాయన విషం", ml: "ഇതൊരു രാസവിഷമാണ്" }, isCorrect: false, explanation: { en: "Jeevamrit is 100% organic and life-giving.", hi: "जीवामृत पूरी तरह से प्राकृतिक और जीवनदायी है।", te: "జీవామృతం సంపూర్ణ సహజమైనది.", ml: "ഇത് തികച്ചും പ്രകൃതിദത്തമാണ്." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l5-reward",
          xp: 50,
          badgeTitle: { en: "Nutrient Alchemist", hi: "पोषण विशेषज्ञ", te: "పోషక నిపుణుడు", ml: "പോഷക വിദഗ്ദ്ധൻ" },
          badgeIcon: "science",
          badgeDescription: { en: "Mastered Level 5: Plant Nutrition & Bio-Fertility", hi: "स्तर 5 में महारत हासिल की", te: "స్థాయి 5 పూర్తి చేసారు", ml: "ലെവൽ 5 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Incredible! You know how to unlock endless natural nutrition right from your farm!", hi: "अद्भुत! आप अपने खेत पर ही अंतहीन प्राकृतिक खाद बनाना सीख गए हैं!", te: "అద్భుతం! సహజ ఎరువుల తయారీలో నైపుణ్యం సాధించారు!", ml: "വളരെ മികച്ച വിജയം!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 6: CROP SPACING & CANOPY MANAGEMENT
    // ─────────────────────────────────────────────
    {
      id: "basics-level-6",
      levelNumber: 6,
      title: {
        en: "Crop Spacing & Canopy",
        hi: "फसल दूरी और छतरी प्रबंधन",
        te: "మొక్కల దూరం & కొమ్మల నిర్వహణ",
        ml: "വിള അകലവും മേലാപ്പ് പരിപാലനവും",
      },
      subtitle: {
        en: "Optimize plant density, prevent fungal humidity traps, and layer multi-tier crops",
        hi: "फसल के बीच सही दूरी रखें, फफूंद से बचाएं और बहुस्तरीय खेती करें",
        te: "సరైన దూరాన్ని పాటించి తెగుళ్లు రాకుండా బహుళ పంటలు సాగు చేయండి",
        ml: "ശരിയായ അകലം പാലിച്ച് കുമിൾ രോഗങ്ങൾ തടയുക",
      },
      durationMinutes: 5,
      xpReward: 50,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l6-concepts",
          title: { en: "Crop Spacing & Canopy", hi: "फसल दूरी और छतरी प्रबंधन", te: "మొక్కల దూరం & కొమ్మల నిర్వహణ", ml: "വിള അകലവും മേലാപ്പ് പരിപാലനവും" },
          taraDialogue: {
            en: "Plants need personal space to breathe! Crowding crops together creates dark, damp pockets where fungal blights multiply. Smart spacing lets breeze flow freely while multi-tier layering (tall trees + medium bushes + ground cover) captures every ray of sunlight!",
            hi: "पौधों को सांस लेने के लिए जगह चाहिए! ज्यादा घनी बुआई से फफूंद लगती है। सही दूरी और बहुस्तरीय खेती से हर पत्ती को हवा और धूप मिलती है।",
            te: "మొక్కలకు గాలి ఆడేలా ఖాళీ ఉండాలి! సరైన దూరంలో నాటితే తెగుళ్లు రావు మరియు ఎండ బాగా తగులుతుంది.",
            ml: "ചെടികൾക്ക് വായുസഞ്ചാരം അത്യാവശ്യമാണ്! ശരിയായ അകലത്തിൽ നടുമ്പോൾ കുമിൾ രോഗങ്ങൾ ഉണ്ടാകില്ല.",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "CANOPY ARCHITECTURE", hi: "छतरी वास्तुकला", te: "కొమ్మల నిర్మాణం", ml: "മേലാപ്പ് ഘടന" },
            title: { en: "Multi-Tier Sunlight Stacking", hi: "बहुस्तरीय सूर्य प्रकाश प्रबंधन", te: "బహుళ అంచెల సాగు", ml: "ബഹുതല കൃഷിരീതി" },
            description: { en: "Layering crops by height creates complementary sunlight capture.", hi: "ऊंचाई के अनुसार फसलें लगाने से धूप का पूरा उपयोग होता है।", te: "ఎత్తుల వారీగా పంటలను వేయడం వల్ల ఎండ బాగా ఉపయోగపడుతుంది.", ml: "വിവിധ ഉയരങ്ങളിലുള്ള വിളകൾ കൃഷി ചെയ്യുക." },
            bulletPoints: [
              { title: { en: "Air Corridors", hi: "हवा के रास्ते", te: "గాలి మార్గాలు", ml: "വായു സഞ്ചാരം" }, text: { en: "Fresh airflow prevents humidity build-up and fungal spore germination.", hi: "ताजी हवा से नमी नहीं जमती और फफूंद नहीं लगती।", te: "గాలి ప్రసరణ వల్ల తెగుళ్లు రావు.", ml: "വായുസഞ്ചാരം ഈർപ്പം കുറയ്ക്കുന്നു." }, icon: "air" },
              { title: { en: "3D Layering", hi: "3D परतें", te: "3D అంచెలు", ml: "3D തട്ടുകൾ" }, text: { en: "Tall palms over fruit bushes over ground creepers.", hi: "ऊंचे पेड़ों के नीचे झाड़ियां और जमीन पर लताएं।", te: "ఎత్తైన చెట్ల కింద చిన్న పొదలు, నేలమీద తీగలు.", ml: "ഉയരമുള്ള മരങ്ങൾക്ക് താഴെ ചെറിയ ചെടികൾ." }, icon: "layers" },
            ],
          },
          cards: [
            { id: "c-spacing", title: { en: "Plant Density", hi: "पौध घनत्व", te: "మొక్కల సాంద్రత", ml: "ചെടികളുടെ എണ്ണം" }, icon: "grid-on", color: "#0284C7", taraDialogue: { en: "Calculate root spread to prevent underground competition for water.", hi: "जड़ों के फैलाव को ध्यान में रखकर दूरी तय करें।", te: "వేర్ల వ్యాప్తిని బట్టి దూరాన్ని నిర్ణయించండి.", ml: "വേരുകൾ പടരാൻ ആവശ്യമായ അകലം നൽകുക." } },
            { id: "c-multitier", title: { en: "Multi-Tier Farm", hi: "बहुस्तरीय खेत", te: "బహుళ అంచెల తోట", ml: "അടുക്ക് കൃഷി" }, icon: "park", color: "#15803D", taraDialogue: { en: "Stack tall, medium, and low crops together to multiply yield per square foot!", hi: "ऊंची, मध्यम और छोटी फसलों को मिलाकर प्रति एकड़ ज्यादा उपज लें!", te: "ఎత్తుల వారీగా పంటలు వేసి ఎక్కువ దిగుబడి సాధించండి!", ml: "വിവിധ തട്ടുകളിലായി കൂടുതൽ വിളവ് നേടുക!" } },
          ],
        },
        {
          type: "scenarioChallenge",
          id: "basics-l6-challenge",
          title: { en: "Canopy Airflow Challenge", hi: "हवा और छतरी चुनौती", te: "గాలి ప్రసరణ సవాలు", ml: "വായുസഞ്ചാര ചലഞ്ച്" },
          instructions: { en: "Choose the field setup that minimizes fungal dampness.", hi: "वह तरीका चुनें जो फफूंद और नमी को रोके।", te: "తెగుళ్లు రాని సరైన అమరికను ఎంచుకోండి.", ml: "കുമിൾ രോഗങ്ങൾ തടയുന്ന രീതി തിരഞ്ഞെടുക്കുക." },
          xp: 25,
          taraDialogue: { en: "Which farm configuration prevents stagnant humid air traps?", hi: "कौन सी बनावट उमस और फफूंद को रोकती है?", te: "ఏ పద్ధతిలో గాలి బాగా ఆడి రోగాలు రావు?", ml: "ഈർപ്പം കെട്ടിക്കിടക്കാത്ത ശരിയായ രീതി ഏതാണ്?" },
          taraSuccessDialogue: { en: "Great call! Airflow keeps leaves dry and disease-free!", hi: "शानदार फैसला! हवा के प्रवाह से पत्तियां सूखी और रोगमुक्त रहती हैं!", te: "సరైన నిర్ణయం! గాలి బాగా ఆడి పంట ఆరోగ్యంగా ఉంటుంది!", ml: "മികച്ച തിരഞ്ഞെടുപ്പ്!" },
          rounds: [
            {
              id: "r1-air",
              roundNumber: 1,
              topic: { en: "Air Circulation", hi: "हवा का प्रवाह", te: "గాలి ప్రసరణ", ml: "വായു സഞ്ചാരം" },
              prompt: { en: "How should crop rows be aligned for optimal ventilation?", hi: "बेहतर वेंटिलेशन के लिए फसल की कतारें कैसी होनी चाहिए?", te: "గాలి బాగా ఆడటానికి వరుసలు ఎలా ఉండాలి?", ml: "നല്ല വായുസഞ്ചാരത്തിന് വരികൾ എങ്ങനെ ക്രമീകരിക്കണം?" },
              options: [
                { id: "opt-a", label: "A", text: { en: "Aligned with prevailing wind direction and optimal spacing", hi: "हवा की दिशा के अनुकूल और उचित दूरी पर", te: "గాలి వీచే దిశకు అనుకూలంగా సరైన దూరంలో", ml: "കാറ്റിന്റെ ദിശയ്ക്ക് അനുസൃതമായി ശരിയായ അകലത്തിൽ" }, isCorrect: true, explanation: { en: "Wind flows naturally between rows, sweeping away moisture spores.", hi: "हवा कतारों के बीच से बहकर फफूंद को हटाती है।", te: "గాలి ధారాళంగా వీచి తెగుళ్లను పోగొడుతుంది.", ml: "ഈർപ്പവും കുമിളുകളും അടിഞ്ഞുകൂടില്ല." } },
                { id: "opt-b", label: "B", text: { en: "Packed tightly like grass without walking space", hi: "बिना जगह के बिल्कुल सटाकर लगाना", te: "నడవడానికి కూడా చోటు లేకుండా దట్టంగా వేయడం", ml: "തീരെ ഇടമില്ലാതെ തിങ്ങിനിറഞ്ഞു നടുക" }, isCorrect: false, explanation: { en: "Trapped damp air invites fungal powdery mildew.", hi: "उमस से फफूंद रोग तेजी से फैलते हैं।", te: "ఉక్కపోత వల్ల తెగుళ్లు వస్తాయి.", ml: "കുമിൾ രോഗങ്ങൾക്ക് കാരണമാകും." } },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "basics-l6-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l6-1",
              question: { en: "What is the primary benefit of a multi-tier cropping system?", hi: "बहुस्तरीय फसल प्रणाली का मुख्य लाभ क्या है?", te: "బహుళ అంచెల పంట విధానం వల్ల ప్రధాన ప్రయోజనం ఏమిటి?", ml: "അടുക്ക് കൃഷിരീതി കൊണ്ടുള്ള പ്രധാന നേട്ടം എന്താണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "It harvests sunlight at different canopy heights simultaneously", hi: "यह अलग-अलग ऊंचाई पर धूप का पूरा उपयोग करती है", te: "ఇది వేర్వేరు ఎత్తులలో సూర్యకాంతిని పూర్తిగా వినియోగించుకుంటుంది", ml: "വ്യത്യസ്ത ഉയരങ്ങളിൽ സൂര്യപ്രകാശം പൂർണ്ണമായി ഉപയോഗിക്കുന്നു" }, isCorrect: true, explanation: { en: "Vertical stacking dramatically boosts land productivity.", hi: "यह जमीन की उत्पादकता को कई गुना बढ़ाती है।", te: "ఇది భూమి ఉత్పాదకతను పెంచుతుంది.", ml: "ഉത്പാദനം വർദ്ധിപ്പിക്കുന്നു." } },
                { id: "opt-2", text: { en: "It makes plants stop needing water", hi: "इससे पौधों को पानी की जरूरत नहीं रहती", te: "మొక్కలకు నీరు అవసరం లేకుండా చేస్తుంది", ml: "വെള്ളം തീരെ വേണ്ടാതാക്കുന്നു" }, isCorrect: false, explanation: { en: "All plants still need water, but layered shade conserves moisture.", hi: "छांव से नमी बचती है, लेकिन पानी जरूरी है।", te: "నీరు అవసరమే కానీ తక్కువ పడుతుంది.", ml: "ഈർപ്പം നിലനിൽക്കും." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l6-reward",
          xp: 50,
          badgeTitle: { en: "Canopy Architect", hi: "छतरी वास्तुकार", te: "తోట రూపశిల్పి", ml: "മേലാപ്പ് ശില്പി" },
          badgeIcon: "grid-view",
          badgeDescription: { en: "Mastered Level 6: Crop Spacing & Canopy Management", hi: "स्तर 6 में महारत हासिल की", te: "స్థాయి 6 పూర్తి చేసారు", ml: "ലെവൽ 6 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Stunning! You know how to build a 3D sunlight engine on your land!", hi: "शानदार! आप अपनी जमीन पर 3D सौर ऊर्जा मॉडल बनाना सीख गए हैं!", te: "అద్భుతం! బహుళ అంచెల సాగులో నైపుణ్యం సాధించారు!", ml: "അഭിനന്ദനങ്ങൾ!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 7: WEEDS & LIVING MULCH
    // ─────────────────────────────────────────────
    {
      id: "basics-level-7",
      levelNumber: 7,
      title: {
        en: "Weeds & Living Mulch",
        hi: "खरपतवार और सजीव मल्च",
        te: "కలుపు మొక్కలు & సజీవ మల్చింగ్",
        ml: "കളകളും ജൈവ പുതപ്പും",
      },
      subtitle: {
        en: "Turn weeds into organic mulch biomass instead of spraying toxic chemical poisons",
        hi: "जहरीले रसायनों के बजाय खरपतवार को काटकर जैविक खाद में बदलें",
        te: "రసాయనాలు కొట్టకుండా కలుపు మొక్కలను కత్తిరించి ఎరువుగా మార్చండి",
        ml: "കളനാശിനികൾക്ക് പകരം കളകളെ പുതയാക്കി മാറ്റുക",
      },
      durationMinutes: 5,
      xpReward: 50,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l7-concepts",
          title: { en: "Weeds & Living Mulch", hi: "खरपतवार और सजीव मल्च", te: "కలుపు మొక్కలు & సజీవ మల్చింగ్", ml: "കളകളും ജൈവ പുതപ്പും" },
          taraDialogue: {
            en: "In nature, bare soil is treated as an open wound—weeds are simply nature's band-aids trying to heal it! Instead of spraying toxic herbicides that kill earthworms, slash weeds at the surface and lay them down as organic mulch blanket!",
            hi: "प्रकृति में खुली मिट्टी एक घाव की तरह है—खरपतवार उसे भरने आते हैं! जहरीली दवाइयों के बजाय खरपतवार को काटकर जमीन पर बिछा दें!",
            te: "ఖాళీ నేల ఒక గాయం లాంటిది—కలుపు మొక్కలు దాన్ని కప్పడానికి వస్తాయి! మందులు కొట్టకుండా వాటిని కోసి నేలమీద వేయండి!",
            ml: "തുറന്ന മണ്ണ് ഒരു മുറിവ് പോലെയാണ്—കളകൾ അതിനെ സംരക്ഷിക്കാൻ വളരുന്നു! അവയെ മുറിച്ച് പുതയായി മണ്ണിലിടുക!",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "WEED STEWARDSHIP", hi: "खरपतवार प्रबंधन", te: "కలుపు నిర్వహణ", ml: "കളപരിപാലനം" },
            title: { en: "Slashing Over Poisoning", hi: "कटाई बनाम कीटनाशक", te: "కత్తిరించడం మేలు", ml: "മുറിച്ചിടൽ രീതി" },
            description: { en: "Weeds mined deep minerals and organic matter. Slashing recycles nutrients onto the surface.", hi: "खरपतवार गहरी मिट्टी से खनिज लाते हैं। उन्हें काटने से वे खाद बन जाते हैं।", te: "కలుపు మొక్కలు లోపలి పోషకాలను పైకి తెస్తాయి. వాటిని కోసి వేస్తే ఎరువు అవుతాయి.", ml: "കളകൾ മണ്ണിന്റെ അടിയിലെ പോഷകങ്ങളെ മുകളിലെത്തിക്കുന്നു." },
            bulletPoints: [
              { title: { en: "Surface Slash", hi: "सतह पर कटाई", te: "పైపైన కోయడం", ml: "മുകളിൽ മുറിക്കൽ" }, text: { en: "Cut above root crowns so biomass decomposes on soil surface.", hi: "जड़ के ऊपर से काटें ताकि अवशेष खाद बन जाएं।", te: "మొక్క మొదలు పైన కోస్తే అది ఎరువుగా మారుతుంది.", ml: "മുകളിൽ മുറിച്ചിട്ടാൽ പെട്ടെന്ന് അഴുകി വളമാകും." }, icon: "content-cut" },
              { title: { en: "Living Cover", hi: "सजीव आवरण", te: "సజీవ కవచం", ml: "ജീവനുള്ള പുതപ്പ്" }, text: { en: "Planting cowpea or clover suppresses noxious invasive weeds.", hi: "लोबिया या दलहन लगाने से हानिकारक खरपतवार दब जाते हैं।", te: "అలసందలు వేస్తే పిచ్చి కలుపు మొక్కలు రావు.", ml: "പയർ ചെടികൾ നട്ടാൽ കളകളെ നിയന്ത്രിക്കാം." }, icon: "grass" },
            ],
          },
          cards: [
            { id: "c-slash", title: { en: "Slash & Drop", hi: "काटो और बिछाओ", te: "కోసి పరచడం", ml: "മുറിച്ചിടുക" }, icon: "content-cut", color: "#15803D", taraDialogue: { en: "Turn green wild growth into free carbon mulch right where it stands!", hi: "हरी घास को वहीं काटकर मुफ्त जैविक खाद बनाएं!", te: "కలుపును కోసి అక్కడే ఎరువుగా వేయండి!", ml: "കളകളെ അവിടെത്തന്നെ വളമാക്കി മാറ്റുക!" } },
            { id: "c-covercrop", title: { en: "Cover Crops", hi: "कवर फसलें", te: "ఆచ్ఛాదన పంటలు", ml: "പുതപ്പ് വിളകൾ" }, icon: "spa", color: "#4CAF50", taraDialogue: { en: "Low-growing legumes crowd out sunlight from unwanted grass naturally.", hi: "कम ऊंचाई वाले दलहन अवांछित घास को धूप नहीं लेने देते।", te: "చిన్న పప్పుధాన్యాల పంటలు కలుపును రానివ్వవు.", ml: "ചെറിയ പയർവർഗ്ഗങ്ങൾ കളകളെ തടയുന്നു." } },
          ],
        },
        {
          type: "decisionChoice",
          id: "basics-l7-decisions",
          title: { en: "Weed Control Choices", hi: "खरपतवार नियंत्रण विकल्प", te: "కలుపు నివారణ నిర్ణయాలు", ml: "കളനിയന്ത്രണ മാർഗ്ഗങ്ങൾ" },
          instructions: { en: "Choose the practice that protects soil life from chemical toxicity.", hi: "वह तरीका चुनें जो मिट्टी के जीवों को रसायनों से बचाए।", te: "నేల జీవులకు హాని కలగని సరైన పద్ధతిని ఎంచుకోండి.", ml: "മണ്ണിന് ദോഷകരമല്ലാത്ത രീതി തിരഞ്ഞെടുക്കുക." },
          xp: 25,
          taraDialogue: { en: "Wild growth has appeared between crop rows. What is the eco-friendly move?", hi: "कतारों के बीच घास उग आई है। सबसे सुरक्षित तरीका क्या है?", te: "వరుసల మధ్య కలుపు పెరిగింది. సరైన పరిష్కారం ఏమిటి?", ml: "വരികൾക്കിടയിൽ കളകൾ വളർന്നു. എന്ത് ചെയ്യണം?" },
          taraSuccessDialogue: { en: "Spot on! Slashing feeds the soil and spares your earthworms!", hi: "शानदार! घास काटने से मिट्टी को खाद मिलती है और केंचुए सुरक्षित रहते हैं!", te: "సరైన నిర్ణయం! నేల సారవంతమవుతుంది, జీవులు బ్రతుకుతాయి!", ml: "മികച്ച തീരുമാനം!" },
          rounds: [
            {
              id: "r1-weed",
              roundNumber: 1,
              topic: { en: "Herbicide vs Biomass", hi: "रसायन बनाम जैविक कचरा", te: "మందులు vs సేంద్రీయ ఎరువు", ml: "കളനാശിനി vs ജൈവ പുതപ്പ്" },
              situation: { en: "Weeds are 1 foot tall between your fruit tree rows.", hi: "पेड़ों के बीच 1 फुट ऊंची घास उग गई है।", te: "చెట్ల మధ్య కలుపు ఒక అడుగు ఎత్తు పెరిగింది.", ml: "മരങ്ങൾക്കിടയിൽ കളകൾ ഉയരത്തിൽ വളർന്നു." },
              choices: [
                { id: "c1", label: "Choice A", text: { en: "Spray chemical herbicide poisons that leach into groundwater", hi: "जहरीले खरपतवारनाशक का छिड़काव करें", te: "రసాయన కలుపు మందులు కొట్టడం", ml: "രാസ കളനാശിനികൾ തളിക്കുക" }, isGoodChoice: false },
                { id: "c2", label: "Choice B", text: { en: "Mow/slash the biomass and lay it flat under tree drip lines as mulch", hi: "घास काटकर पेड़ों की जड़ों के पास मल्च के रूप में बिछाएं", te: "కలుపును కోసి చెట్ల మొదళ్ల వద్ద మల్చింగ్ గా వేయడం", ml: "മുറിച്ച് മരങ്ങൾക്ക് താഴെ പുതയായി ഇടുക" }, isGoodChoice: true, taraReaction: { en: "Brilliant! You created free moisture-holding mulch!", hi: "बहुत बढ़िया! आपने मुफ्त में नमी रोकने वाली खाद बना ली!", te: "చాలా బాగుంది! ఉచితంగా సేంద్రీయ ఎరువు తయారైంది!", ml: "നല്ല തീരുമാനം! മികച്ച പുതപ്പായി മാറി!" } },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "basics-l7-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l7-1",
              question: { en: "Why is spraying chemical herbicides destructive to long-term soil health?", hi: "रासायनिक खरपतवारनाशकों का छिड़काव मिट्टी के लिए हानिकारक क्यों है?", te: "రసాయన కలుపు మందులు నేలకు ఎందుకు నష్టం కలిగిస్తాయి?", ml: "രാസ കളനാശിനികൾ മണ്ണിന് ദോഷകരമാകുന്നത് എന്തുകൊണ്ട്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "They kill beneficial soil fungi, earthworms, and contaminate root zones", hi: "वे केंचुओं और अच्छे सूक्ष्मजीवों को मारते हैं और जमीन को जहरीला बनाते हैं", te: "ఇవి వానపాములు, మంచి సూక్ష్మజీవులను చంపేస్తాయి", ml: "അവ മണ്ണിരകളെയും നല്ല സൂക്ഷ്മജീവികളെയും നശിപ്പിക്കുന്നു" }, isCorrect: true, explanation: { en: "Chemical toxins disrupt natural microbial biological food webs.", hi: "रसायन मिट्टी के जीवन जाल को तोड़ देते हैं।", te: "రసాయనాలు నేల సహజత్వాన్ని దెబ్బతీస్తాయి.", ml: "മണ്ണിന്റെ സ്വാഭാവിക ഘടന തകരുന്നു." } },
                { id: "opt-2", text: { en: "They make earthworms grow wings", hi: "इससे केंचुओं के पंख निकल आते हैं", te: "ఇది వానపాములకు రెక్కలను తెస్తుంది", ml: "മണ്ണിരകൾക്ക് ചിറക് മുളപ്പിക്കുന്നു" }, isCorrect: false, explanation: { en: "Poisons kill soil fauna.", hi: "जहर जीवों को खत्म करता है।", te: "విషం జీవులను చంపుతుంది.", ml: "വിഷം ജീവികളെ നശിപ്പിക്കുന്നു." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l7-reward",
          xp: 50,
          badgeTitle: { en: "Ground Steward", hi: "भूमि संरक्षक", te: "భూమి సంరక్షకుడు", ml: "ഭൂമി സംരക്ഷകൻ" },
          badgeIcon: "content-cut",
          badgeDescription: { en: "Mastered Level 7: Weeds & Living Mulch", hi: "स्तर 7 में महारत हासिल की", te: "స్థాయి 7 పూర్తి చేసారు", ml: "ലെവൽ 7 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Outstanding! You view weeds as valuable biomass builders rather than enemies!", hi: "लाजवाब! आपने खरपतवार को दुश्मन के बजाय उपयोगी खाद के रूप में देखना सीख लिया!", te: "అద్భుతం! కలుపును కూడా ఉపయోగకరమైన వనరుగా మార్చారు!", ml: "വളരെ നല്ല അറിവ്!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 8: NATURAL PEST MANAGEMENT & COMPANION CROPS
    // ─────────────────────────────────────────────
    {
      id: "basics-level-8",
      levelNumber: 8,
      title: {
        en: "Natural Pest Control",
        hi: "प्राकृतिक कीट नियंत्रण",
        te: "సహజ తెగులు నివారణ",
        ml: "സ്വാഭാവിക കീടനിയന്ത്രണം",
      },
      subtitle: {
        en: "Attract friendly predator bugs, plant trap crops, and prepare botanical sprays like Neemastra",
        hi: "मित्र कीटों को आकर्षित करें, ट्रैप फसलें लगाएं और नीमास्त्र तैयार करें",
        te: "మిత్ర పురుగులను కాపాడండి, అంతర పంటలు మరియు వేప కషాయం వాడండి",
        ml: "ഉപകാരികളായ പ്രാണികളെ ആകർഷിക്കുകയും വേപ്പെണ്ണ പ്രയോഗിക്കുകയും ചെയ്യുക",
      },
      durationMinutes: 5,
      xpReward: 55,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l8-concepts",
          title: { en: "Natural Pest Control", hi: "प्राकृतिक कीट नियंत्रण", te: "సహజ తెగులు నివారణ", ml: "സ്വാഭാവിക കീടനിയന്ത്രണം" },
          taraDialogue: {
            en: "Only 1% of insects on your farm are harmful pests—the other 99% are pollinators, ladybugs, and friendly predators! When you plant companion flowers like Marigolds, pests get diverted to trap crops while beneficial wasps hunt harmful caterpillars naturally!",
            hi: "खेत में सिर्फ 1% कीट हानिकारक होते हैं, बाकी 99% मित्र कीट और परागणकर्ता हैं! गेंदा लगाने से कीट आकर्षित होकर मुख्य फसल को छोड़ देते हैं।",
            te: "పొలంలో 1% పురుగులు మాత్రమే హాని చేస్తాయి, 99% మిత్ర పురుగులే! బంతి పూలు నాటితే తెగుళ్లు ప్రధాన పంటను వదిలేస్తాయి.",
            ml: "കൃഷിയിടത്തിലെ 1% പ്രാണികൾ മാത്രമേ ശല്യക്കാരായുള്ളൂ, 99 ശതമാനവും മിത്രങ്ങളാണ്! ചെണ്ടുമല്ലി നട്ടാൽ കീടങ്ങൾ പ്രധാന വിളയെ ബാധിക്കില്ല.",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "AGRO-ECOLOGY", hi: "कृषि पारिस्थितिकी", te: "జీవ నియంత్రణ", ml: "ജൈവ കീടനിയന്ത്രണം" },
            title: { en: "The 3 Pillars of Eco-Defense", hi: "प्राकृतिक सुरक्षा के 3 स्तंभ", te: "సహజ రక్షణ సూత్రాలు", ml: "പ്രകൃതിദത്ത പ്രതിരോധം" },
            description: { en: "Diverse habitats maintain natural predator-pest equilibrium without chemical sprays.", hi: "विविधता कीटों और उनके शिकारियों में प्राकृतिक संतुलन बनाती है।", te: "వైవిధ్యం వల్ల తెగుళ్లు సహజంగానే అదుపులో ఉంటాయి.", ml: "വൈവിധ്യം കീടങ്ങളെ സ്വാഭാവികമായി നിയന്ത്രിക്കുന്നു." },
            bulletPoints: [
              { title: { en: "Companion Borders", hi: "सह-फसल सीमाएं", te: "అంతర పంటలు", ml: "ഇടവിളകൾ" }, text: { en: "Marigolds release alpha-terthienyl, deterring root-knot nematodes.", hi: "गेंदे की जड़ें हानिकारक कीड़ों को रोकती हैं।", te: "బంతి మొక్కలు వేరు పురుగులను రానివ్వవు.", ml: "ചെണ്ടുമല്ലി നിമാവിരകളെ തുരത്തുന്നു." }, icon: "local-florist" },
              { title: { en: "Botanical Sprays", hi: "वानस्पतिक स्प्रे", te: "కషాయాలు", ml: "പ്രകൃതിദത്ത സ്പ്രേകൾ" }, text: { en: "Neemastra and Agniastra repel chewers without poisoning pollinators.", hi: "नीमास्त्र मित्र कीटों को नुकसान पहुंचाए बिना कीटों को भगाता है।", te: "వేప కషాయం మిత్ర పురుగులను చంపకుండా తెగుళ్లను ఆపుతుంది.", ml: "നീമാസ്ത്രം മിത്രപ്രാണികളെ ഉപദ്രവിക്കാതെ കീടങ്ങളെ തുരത്തുന്നു." }, icon: "science" },
            ],
          },
          cards: [
            { id: "c-marigold", title: { en: "Marigold Trap", hi: "गेंदा ट्रैप", te: "బంతి పూలు", ml: "ചെണ്ടുമല്ലി" }, icon: "local-florist", color: "#F59E0B", taraDialogue: { en: "Bright yellow petals lure pests away from your vulnerable vegetables!", hi: "गेंदे के पीले फूल कीटों को सब्जियों से दूर खींच लेते हैं!", te: "పసుపు పూలు పురుగులను కూరగాయల పంటల నుండి దూరం చేస్తాయి!", ml: "മഞ്ഞപ്പൂക്കൾ കീടങ്ങളെ ആകർഷിച്ച് മാറ്റുന്നു!" } },
            { id: "c-neemastra", title: { en: "Neemastra", hi: "नीमास्त्र", te: "నీమాస్త్రం", ml: "നീമാസ്ത്രം" }, icon: "eco", color: "#15803D", taraDialogue: { en: "Neem leaves, cow urine, and dung brewed into a safe natural repellent.", hi: "नीम की पत्तियां और गोमूत्र से बना सुरक्षित प्राकृतिक अर्क।", te: "వేపాకు, గోమూత్రంతో చేసే సురక్షిత సహజ కషాయం.", ml: "വേപ്പിലയും ഗോമൂത്രവും ചേർത്ത പ്രകൃതിദത്ത കൂട്ട്." } },
          ],
        },
        {
          type: "match",
          id: "basics-l8-match",
          title: { en: "Companion Crop Pairings", hi: "सह-फसल जोड़ियां", te: "అంతర పంటల జతలు", ml: "ഇടവിള ജോടികൾ" },
          instructions: { en: "Match companion crops with their beneficial protection partner.", hi: "मुख्य फसल को उसकी रक्षक सह-फसल से मिलाएं।", te: "సరైన రక్షణ పంటతో జత చేయండి.", ml: "യോജിച്ചവ തമ്മിൽ ചേർക്കുക." },
          xp: 25,
          taraDialogue: { en: "Match each primary crop to its protective plant bodyguard!", hi: "मुख्य फसल को उसके सुरक्षात्मक साथी से जोड़ें!", te: "పంటను దాన్ని కాపాడే తోటి మొక్కతో జత చేయండి!", ml: "യോജിച്ച ജോടികളെ കണ്ടെത്തുക!" },
          taraSuccessDialogue: { en: "Excellent! Your farm is now a balanced ecological fortress!", hi: "शानदार! आपका खेत अब प्राकृतिक रूप से सुरक्षित है!", te: "చాలా బాగుంది! పొలం సహజంగా సురక్షితమైంది!", ml: "മികച്ച വിജയം!" },
          pairs: [
            { id: "p-tomato", leftText: { en: "Tomato Crop", hi: "टमाटर की फसल", te: "టమాటా పంట", ml: "തക്കാളി വിള" }, rightText: { en: "Marigold (Diverts worms & nematodes)", hi: "गेंदा (कीटों को दूर रखता है)", te: "బంతి పూలు (పురుగులను ఆపుతుంది)", ml: "ചെണ്ടുമല്ലി (നിമാവിരകളെ തടയുന്നു)" } },
            { id: "p-cabbage", leftText: { en: "Cabbage / Cauliflower", hi: "पत्तागोभी / गोभी", te: "క్యాబేజీ / కాలీఫ్లవర్", ml: "കാബേജ് / കോളിഫ്ലവർ" }, rightText: { en: "Mint / Coriander (Masks scent from moths)", hi: "पुदीना / धनिया (खुशबू से कीटों को भटकाता है)", te: "పుదీనా / కొత్తిమీర (సువాసనతో కీటకాలను రానివ్వదు)", ml: "പുതിന / മല്ലി (കീടങ്ങളെ വഴിതിരിച്ചുവിടുന്നു)" } },
            { id: "p-maize", leftText: { en: "Maize / Corn", hi: "मक्का", te: "మొక్కజొన్న", ml: "ചോളം" }, rightText: { en: "Cowpea / Beans (Climbs stalk & fixes N)", hi: "लोबिया (तने पर चढ़कर नाइट्रोजन देती है)", te: "అలసందలు (నత్రజనిని ఇస్తుంది)", ml: "പയർ (നൈട്രജൻ നൽകുന്നു)" } },
          ],
        },
        {
          type: "mcq",
          id: "basics-l8-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l8-1",
              question: { en: "Why is companion planting with flowers like Marigold beneficial around vegetables?", hi: "सब्जियों के चारों ओर गेंदे जैसे फूल लगाना क्यों फायदेमंद है?", te: "కూరగాయల చుట్టూ బంతి పూలను నాటడం వల్ల ఉపయోగం ఏమిటి?", ml: "പച്ചക്കറികൾക്ക് ചുറ്റും ചെണ്ടുമല്ലി നടുന്നത് കൊണ്ടുള്ള പ്രയോജനം എന്താണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "It repels root nematodes and lures pests away from the main food crop", hi: "यह जड़ों के कीड़ों को भगाता है और कीटों को मुख्य फसल से दूर रखता है", te: "ఇది వేరు పురుగులను నివారిస్తుంది మరియు తెగుళ్లను ఆకర్షిస్తుంది", ml: "നിമാവിരകളെ തുരത്തുകയും പ്രധാന വിളയെ സംരക്ഷിക്കുകയും ചെയ്യുന്നു" }, isCorrect: true, explanation: { en: "Marigolds act as natural bio-fumigants and decoy trap crops.", hi: "गेंदा प्राकृतिक रक्षक और ट्रैप का काम करता है।", te: "బంతి పూలు సహజ రక్షణ కవచం.", ml: "ചെണ്ടുമല്ലി ഒരു പ്രകൃതിദത്ത കെണിയാണ്." } },
                { id: "opt-2", text: { en: "It turns all vegetables into fruit juices automatically", hi: "यह सब्जियों को मीठा जूस बना देता है", te: "ఇది కూరగాయలను పండ్లుగా మారుస్తుంది", ml: "പച്ചക്കറികളെ ജ്യൂസാക്കി മാറ്റുന്നു" }, isCorrect: false, explanation: { en: "Companion planting is an ecological pest deterrence strategy.", hi: "यह कीट नियंत्रण की प्राकृतिक रणनीति है।", te: "ఇది పురుగుల నివారణ పద్ధతి.", ml: "ഇതൊരു കീടനിയന്ത്രണ മാർഗ്ഗമാണ്." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l8-reward",
          xp: 55,
          badgeTitle: { en: "Ecosystem Defender", hi: "पारिस्थितिकी रक्षक", te: "పర్యావరణ రక్షకుడు", ml: "ഇക്കോസിസ്റ്റം ഡിഫെൻഡർ" },
          badgeIcon: "shield",
          badgeDescription: { en: "Mastered Level 8: Natural Pest Management", hi: "स्तर 8 में महारत हासिल की", te: "స్థాయి 8 పూర్తి చేసారు", ml: "ലെവൽ 8 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Bravo! Your field is protected by nature's living bio-police!", hi: "शाबाश! आपका खेत अब प्रकृति की सुरक्षा में है!", te: "అద్భుతం! మీ పొలం సహజ రక్షణలో ఉంది!", ml: "വളരെ മികച്ച മുന്നേറ്റം!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 9: HARVESTING & POST-HARVEST CURING
    // ─────────────────────────────────────────────
    {
      id: "basics-level-9",
      levelNumber: 9,
      title: {
        en: "Harvesting & Curing",
        hi: "कटाई और संरक्षण",
        te: "కోత & నిల్వ పద్ధతులు",
        ml: "വിളവെടുപ്പും സൂക്ഷിപ്പും",
      },
      subtitle: {
        en: "Pick at peak maturity, harvest during cool hours, and dry in airy shade",
        hi: "सही परिपक्वता पर काटें, सुबह के समय कटाई करें और हवादार छांव में सुखाएं",
        te: "సరైన సమయంలో కోయండి, చల్లని వేళల్లో కోసి నీడలో ఆరబెట్టండి",
        ml: "പാകമാകുമ്പോൾ വിളവെടുത്ത് തണലിൽ ഉണക്കി സൂക്ഷിക്കുക",
      },
      durationMinutes: 5,
      xpReward: 55,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l9-concepts",
          title: { en: "Harvesting & Curing", hi: "कटाई और संरक्षण", te: "కోత & నిల్వ పద్ధతులు", ml: "വിളവെടുപ്പും സൂക്ഷിപ്പും" },
          taraDialogue: {
            en: "Harvesting at the right moment preserves full nutritional value and flavor! Always pick crops during cool early mornings before heat stresses the produce. Curing onions and tubers in shaded airy breeze strengthens outer skins for months of natural shelf life without rotting!",
            hi: "सही समय पर कटाई से स्वाद और पोषण बना रहता है! हमेशा सुबह के ठंडे समय में फल-सब्जियां तोड़ें और छांव में सुखाकर रखें।",
            te: "సరైన సమయంలో కోస్తే నాణ్యత, రుచి బాగుంటాయి! ఎప్పుడూ ఉదయం చల్లని వేళల్లో కోసి నీడలో ఆరబెట్టాలి.",
            ml: "ശരിയായ സമയത്ത് വിളവെടുത്താൽ ഗുണനിലവാരം നിലനിൽക്കും! രാവിലെ തണുപ്പുള്ളപ്പോൾ വിളവെടുത്ത് തണലിൽ സൂക്ഷിക്കുക.",
          },
          taraExpression: "happy",
          explanation: {
            tag: { en: "POST-HARVEST CARE", hi: "कटाई उपरांत प्रबंधन", te: "కోత అనంతర సంరక్షణ", ml: "വിളവെടുപ്പാനന്തര പരിചരണം" },
            title: { en: "Preserving Harvest Longevity", hi: "फसल को लंबे समय तक सुरक्षित रखना", te: "దిగుబడిని ఎక్కువ కాలం నిల్వ చేయడం", ml: "വിളവിന്റെ ആയുസ്സ് കൂട്ടുക" },
            description: { en: "Gentle handling and moisture curing prevent post-harvest mold and spoilage.", hi: "सही तरीके से सुखाने से फसल में फफूंद और सड़न नहीं लगती।", te: "సరిగ్గా ఆరబెడితే పంట బూజు పట్టకుండా ఎక్కువ కాలం ఉంటుంది.", ml: "നല്ലപോലെ ഉണക്കി സൂക്ഷിച്ചാൽ കേടുപാടുകൾ വരില്ല." },
            bulletPoints: [
              { title: { en: "Cool Morning Pick", hi: "सुबह की तुड़ाई", te: "ఉదయపు కోత", ml: "രാവിലെയുള്ള വിളവെടുപ്പ്" }, text: { en: "Turgid cool produce resists wilting and bruising.", hi: "सुबह तोड़ी गई फसल जल्दी नहीं मुरझाती।", te: "ఉదయం కోసిన పంట త్వరగా వాడిపోదు.", ml: "രാവിലെ വിളവെടുത്താൽ പെട്ടെന്ന് വാടില്ല." }, icon: "wb-twilight" },
              { title: { en: "Shade Curing", hi: "छांव में सुखाना", te: "నీడలో ఆరబెట్టడం", ml: "തണലിൽ ഉണക്കൽ" }, text: { en: "Gentle airflow dries excess moisture without sun scalding.", hi: "हवादार छांव में सुखाने से फसल खराब नहीं होती।", te: "నీడలో ఆరబెడితే నాణ్యత తగ్గదు.", ml: "തണലിൽ ഉണക്കുമ്പോൾ സൂര്യാഘാതം ഏൽക്കില്ല." }, icon: "air" },
            ],
          },
          cards: [
            { id: "c-maturity", title: { en: "Peak Maturity", hi: "पूर्ण परिपक्वता", te: "సరైన పరిపక్వత", ml: "പൂർണ്ണ വളർച്ച" }, icon: "verified", color: "#15803D", taraDialogue: { en: "Look for natural indicators like stem drying and vibrant coloration.", hi: "डंठल सूखने और प्राकृतिक रंग आने पर ही तुड़ाई करें।", te: "కాడ ఎండినప్పుడు, మంచి రంగు వచ్చినప్పుడు కోయండి.", ml: "തണ്ട് ഉണങ്ങുമ്പോഴും നിറം മാറുമ്പോഴും വിളവെടുക്കുക." } },
            { id: "c-storage", title: { en: "Aerated Storage", hi: "हवादार भंडारण", te: "గాలి ఆడే నిల్వ", ml: "വായുസഞ്ചാരമുള്ള സംഭരണം" }, icon: "inventory-2", color: "#795548", taraDialogue: { en: "Store in breathable natural jute sacks in dry, rat-free structures.", hi: "जूट की बोरियों में सूखी और सुरक्षित जगह पर रखें।", te: "జనుము సంచులలో తేమ లేని ప్రదేశంలో భద్రపరచండి.", ml: "ചാക്കുകളിൽ ഈർപ്പമില്ലാത്ത സ്ഥലത്ത് സൂക്ഷിക്കുക." } },
          ],
        },
        {
          type: "scenarioChallenge",
          id: "basics-l9-challenge",
          title: { en: "Harvest Timing Challenge", hi: "कटाई का समय चुनौती", te: "కోత సమయ సవాలు", ml: "വിളവെടുപ്പ് സമയ ചലഞ്ച്" },
          instructions: { en: "Choose the condition that guarantees longer shelf life.", hi: "वह तरीका चुनें जिससे फसल लंबे समय तक सुरक्षित रहे।", te: "పంట ఎక్కువ కాలం నిల్వ ఉండే సరైన విధానాన్ని ఎంచుకోండి.", ml: "കൂടുതൽ നാൾ സൂക്ഷിക്കാൻ പറ്റിയ രീതി തിരഞ്ഞെടുക്കുക." },
          xp: 25,
          taraDialogue: { en: "When should tender vegetables be picked for the highest freshness?", hi: "सब्जियों को सबसे ताजा रखने के लिए कब तोड़ना चाहिए?", te: "కూరగాయలు తాజాగా ఉండాలంటే ఎప్పుడు కోయాలి?", ml: "പച്ചക്കറികൾ ഫ്രഷായിരിക്കാൻ എപ്പോഴാണ് വിളവെടുക്കേണ്ടത്?" },
          taraSuccessDialogue: { en: "Spot on! Early morning harvest keeps produce crisp and sweet!", hi: "शानदार! सुबह तोड़ी गई सब्जियां ताजी और स्वादिष्ट रहती हैं!", te: "సరైన నిర్ణయం! ఉదయం కోస్తే పంట ఎంతో తాజాగా ఉంటుంది!", ml: "മികച്ച തിരഞ്ഞെടുപ്പ്!" },
          rounds: [
            {
              id: "r1-pick",
              roundNumber: 1,
              topic: { en: "Harvest Time", hi: "तुड़ाई का समय", te: "కోసే సమయం", ml: "വിളവെടുപ്പ് സമയം" },
              prompt: { en: "Which environment preserves harvest quality better?", hi: "कौन सा समय फसल की गुणवत्ता को सबसे अच्छा रखता है?", te: "ఏ సమయంలో కోస్తే నాణ్యత బాగుంటుంది?", ml: "ഏത് സമയമാണ് വിളവെടുപ്പിന് ഏറ്റവും അനുയോജ്യം?" },
              options: [
                { id: "opt-a", label: "A", text: { en: "Crisp early morning hours while leaves and fruit are cool", hi: "सुबह का ठंडा समय जब फल और पत्तियां ताजी हों", te: "ఉదయం చల్లని వేళల్లో పంట తాజాగా ఉన్నప్పుడు", ml: "രാവിലെ നല്ല തണുപ്പുള്ള സമയത്ത്" }, isCorrect: true, explanation: { en: "Cool temperature slows respiration and moisture loss.", hi: "ठंडा मौसम नमी को बनाए रखता है।", te: "చల్లని వాతావరణం తేమను కాపాడుతుంది.", ml: "തണുപ്പ് ഈർപ്പനഷ്ടം കുറയ്ക്കുന്നു." } },
                { id: "opt-b", label: "B", text: { en: "Blistering 2:00 PM afternoon under blazing heat", hi: "दोपहर 2:00 बजे की भीषण गर्मी में", te: "మధ్యాహ్నం 2:00 గంటల మండుటెండలో", ml: "ഉച്ചയ്ക്ക് 2 മണിയുടെ കടുത്ത ചൂടിൽ" }, isCorrect: false, explanation: { en: "Hot harvest wilts greens within minutes.", hi: "गर्मी में तोड़ी गई सब्जियां तुरंत मुरझा जाती हैं।", te: "ఎండలో కోస్తే వెంటనే వాడిపోతాయి.", ml: "ചൂടിൽ വിളവെടുത്താൽ പെട്ടെന്ന് വാടും." } },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "basics-l9-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l9-1",
              question: { en: "Why is shade curing beneficial for crops like onions and garlic prior to storage?", hi: "प्याज और लहसुन को भंडारण से पहले छांव में सुखाना क्यों फायदेमंद है?", te: "ఉల్లిపాయలు, వెల్లుల్లిని నిల్వ చేసే ముందు నీడలో ఎందుకు ఆరబెట్టాలి?", ml: "ഉള്ളിയും വെളുത്തുള്ളിയും സൂക്ഷിക്കുന്നതിന് മുൻപ് തണലിൽ ഉണക്കുന്നത് എന്തിനാണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "It dries outer skins into a protective paper shield against rot pathogens", hi: "यह बाहरी छिलके को सुखाकर सड़न पैदा करने वाले जीवाणुओं से बचाता है", te: "ఇది పై పొరను ఎండబెట్టి కుళ్ళిపోకుండా కాపాడుతుంది", ml: "പുറംതൊലി ഉണങ്ങി അഴുകൽ രോഗങ്ങളിൽ നിന്ന് സംരക്ഷിക്കുന്നു" }, isCorrect: true, explanation: { en: "Cured outer tunics seal in bulb moisture while keeping microbes out.", hi: "सूखा छिलका कंद को सुरक्षित रखता है।", te: "ఎండిన పొర లోపలి భాగాన్ని కాపాడుతుంది.", ml: "ഉണങ്ങിയ തൊലി സംരക്ഷണം നൽകുന്നു." } },
                { id: "opt-2", text: { en: "It makes them turn into potato tubers", hi: "इससे वे आलू बन जाते हैं", te: "ఇది వాటిని బంగాళాదుంపలుగా మారుస్తుంది", ml: "അവയെ ഉരുളക്കിഴങ്ങാക്കി മാറ്റുന്നു" }, isCorrect: false, explanation: { en: "Curing is a preservation technique.", hi: "यह फसल को सुरक्षित रखने की तकनीक है।", te: "ఇది నిల్వ చేసుకునే పద్ధతి.", ml: "ഇതൊരു സൂക്ഷിപ്പ് രീതിയാണ്." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l9-reward",
          xp: 55,
          badgeTitle: { en: "Harvest Master", hi: "फसल विशेषज्ञ", te: "కోత నిపుణుడు", ml: "ഹാർവെസ്റ്റ് മാസ്റ്റർ" },
          badgeIcon: "verified",
          badgeDescription: { en: "Mastered Level 9: Harvesting & Curing", hi: "स्तर 9 में महारत हासिल की", te: "స్థాయి 9 పూర్తి చేసారు", ml: "ലെവൽ 9 പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Phenomenal! Your harvests will stay fresh and command premium value at the market!", hi: "अद्भुत! आपकी फसलें बाजार में सबसे ताजी और बेहतरीन दाम पाने वाली रहेंगी!", te: "అద్భుతం! మీ పంట ఎక్కువ కాలం తాజాగా ఉండి మంచి ధర పలుకుతుంది!", ml: "അഭിനന്ദനങ്ങൾ!" },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // LEVEL 10: FARM RESILIENCE & CIRCULAR SYSTEMS
    // ─────────────────────────────────────────────
    {
      id: "basics-level-10",
      levelNumber: 10,
      title: {
        en: "Farm Resilience & Circular Loops",
        hi: "खेत की मजबूती और चक्रीय प्रणाली",
        te: "స్థిరమైన వ్యవసాయం & సమగ్ర నమూనా",
        ml: "സുസ്ഥിര കൃഷിയും പുനരുപയോഗവും",
      },
      subtitle: {
        en: "Integrate animals, multi-cropping, compost cycling, and zero-waste design",
        hi: "पशुपालन, विविध फसलें, खाद चक्र और शून्य अपशिष्ट खेत का निर्माण करें",
        te: "పశువులు, విభిన్న పంటలు, కంపోస్ట్ చక్రాన్ని కలిపి లాభదాయక వ్యవసాయం చేయండి",
        ml: "പശുവളർത്തലും വിവിധ വിളകളും ചേർത്ത് മാലിന്യമുക്ത കൃഷിരീതി രൂപകൽപ്പന ചെയ്യുക",
      },
      durationMinutes: 6,
      xpReward: 70,
      phases: [
        {
          type: "conceptCards",
          id: "basics-l10-concepts",
          title: { en: "Farm Resilience & Circular Loops", hi: "खेत की मजबूती और चक्रीय प्रणाली", te: "స్థిరమైన వ్యవసాయం & సమగ్ర నమూనా", ml: "സുസ്ഥിര കൃഷിയും പുനരുപയോഗവും" },
          taraDialogue: {
            en: "Congratulations on reaching Level 10! The ultimate mastery of natural agriculture is circularity. Animals feed the soil through dung and urine. The soil feeds the crops. The crops feed the farmer and animals. Nothing is wasted, and outside input costs drop to zero!",
            hi: "स्तर 10 पर पहुंचने की बधाई! सबसे बड़ी समझ चक्रीय खेती है। पशु मिट्टी को खाद देते हैं, मिट्टी फसल को, और फसल सबको भोजन देती है। कोई खर्च नहीं, सिर्फ समृद्धि!",
            te: "స్థాయి 10 కి చేరుకున్నందుకు అభినందనలు! సమగ్ర వ్యవసాయంలో వ్యర్థాలు ఉండవు. పశువుల పేడ నేలకు, నేల పంటకు, పంట అందరికీ ఆహారమిస్తుంది!",
            ml: "പത്താം ഘട്ടത്തിലേക്ക് സ്വാഗതം! കൃഷിയിലെ എല്ലാം പരസ്പരം ബന്ധപ്പെട്ടിരിക്കുന്നു. ഒന്നും പാഴാകുന്നില്ല, ചെലവുകൾ പൂർണ്ണമായി കുറയുന്നു!",
          },
          taraExpression: "excited",
          explanation: {
            tag: { en: "ZERO-INPUT FARMING", hi: "शून्य लागत खेती", te: "పెట్టుబడి లేని సాగు", ml: "സീറോ ബജറ്റ് കൃഷി" },
            title: { en: "The Closed Loop Farm", hi: "आत्मनिर्भर चक्रीय खेत", te: "ఆత్మనిర్భర సమగ్ర పొలం", ml: "സ്വാശ്രയ കൃഷിയിടം" },
            description: { en: "When energy and biomass circulate internally, the farm becomes immune to market shocks.", hi: "जब खेत का कचरा खेत में ही खाद बनता है, तो बाजार से कुछ खरीदने की जरूरत नहीं रहती।", te: "వ్యర్థాలను ఎరువులుగా మారిస్తే బయటి కొనుగోళ్లు ఉండవు.", ml: "കൃഷിയിടത്തിലെ അവശിഷ്ടങ്ങൾ ഉള്ളിൽ തന്നെ പുനരുപയോഗിക്കുക." },
            bulletPoints: [
              { title: { en: "Animal Integration", hi: "पशु एकीकरण", te: "పాడి-పంట సమగ్రత", ml: "പശുപാലനം" }, text: { en: "One indigenous cow provides bio-fertilizer for up to 30 acres of land.", hi: "एक देसी गाय 30 एकड़ जमीन के लिए प्राकृतिक खाद दे सकती है।", te: "ఒక దేశీ ఆవుతో 30 ఎకరాలకు సరిపడా జీవామృతం తయారుచేయవచ్చు.", ml: "ഒരു നാടൻ പശുവിൽ നിന്ന് 30 ഏക്കറിലേക്കുള്ള വളം ലഭിക്കും." }, icon: "pets" },
              { title: { en: "Climate Resilience", hi: "जलवायु सहनशीलता", te: "వాతావరణ సమతుల్యత", ml: "കാലാവസ്ഥാ പ്രതിരോധം" }, text: { en: "Multi-species polycultures survive unseasonal rains and severe droughts.", hi: "विविध फसलें बेमौसम बारिश और सूखे को आसानी से झेल लेती हैं।", te: "విభిన్న పంటలు వర్షాభావ పరిస్థితులను తట్టుకుంటాయి.", ml: "വിവിധ വിളകൾ കഠിനമായ വരൾച്ചയെയും അതിജീവിക്കുന്നു." }, icon: "shield" },
            ],
          },
          cards: [
            { id: "c-loop", title: { en: "Circular Energy", hi: "चक्रीय ऊर्जा", te: "చక్రీయ శక్తి", ml: "ചക്രിയ ഊർജ്ജം" }, icon: "autorenew", color: "#15803D", taraDialogue: { en: "Zero trash, zero burning: every blade of grass is cycled into fertility.", hi: "कोई कचरा नहीं, कोई जलाना नहीं: हर तिनका खाद में बदल जाता है।", te: "ఏదీ వ్యర్థం కాదు, దేన్నీ కాల్చవద్దు: ప్రతి గడ్డి పరక ఎరువుగా మారుతుంది.", ml: "ഒന്നും പാഴാക്കരുത്: എല്ലാ അവശിഷ്ടങ്ങളും മണ്ണിലേക്ക് ചേർക്കുക." } },
            { id: "c-sovereignty", title: { en: "Farmer Independence", hi: "किसान आत्मनिर्भरता", te: "రైతు స్వావలంబన", ml: "കർഷക സ്വാശ്രയത്വം" }, icon: "workspace-premium", color: "#F59E0B", taraDialogue: { en: "Produce your own seeds, fertilizers, and pest repellents with zero loan burden!", hi: "अपने बीज, खाद और दवा खुद बनाएं, बिना किसी कर्ज के बोझ के!", te: "మీ విత్తనాలు, ఎరువులు మీరే తయారుచేసుకుని రుణభారం లేకుండా ఉండండి!", ml: "സ്വന്തമായി വിത്തും വളവും ഉണ്ടാക്കി കടബാധ്യതയില്ലാതെ കൃഷി ചെയ്യുക!" } },
          ],
        },
        {
          type: "decisionChoice",
          id: "basics-l10-decisions",
          title: { en: "Circular Farm Planning", hi: "चक्रीय खेत की योजना", te: "సమగ్ర పొలం ప్రణాళిక", ml: "സുസ്ഥിര കൃഷി ആസൂത്രണം" },
          instructions: { en: "Make long-term decisions that build permanent soil and farm resilience.", hi: "ऐसे फैसले लें जो खेत और मिट्टी को हमेशा के लिए मजबूत बनाएं।", te: "భూమికి శాశ్వత మేలు చేసే సరైన నిర్ణయాన్ని ఎంచుకోండి.", ml: "സ്ഥിരമായ നേട്ടം നൽകുന്ന തീരുമാനം എടുക്കുക." },
          xp: 30,
          taraDialogue: { en: "You are designing your farm for the next 10 years. What is the most resilient strategy?", hi: "आप अगले 10 वर्षों के लिए अपने खेत की योजना बना रहे हैं। सबसे मजबूत तरीका क्या है?", te: "వచ్చే 10 ఏళ్ల కోసం పొలాన్ని సిద్ధం చేస్తున్నారు. ఏది సరైన వ్యూహం?", ml: "വരും വർഷങ്ങളിലേക്ക് അനുയോജ്യമായ കൃഷിരീതി ഏതാണ്?" },
          taraSuccessDialogue: { en: "Masterful strategy! You have graduated as a true Agri-Pioneer!", hi: "शानदार रणनीति! आप एक सच्चे प्राकृतिक कृषि विशेषज्ञ बन गए हैं!", te: "అద్భుతమైన వ్యూహం! మీరు ఆదర్శవంతమైన రైతుగా మారారు!", ml: "അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ഒരു മാതൃകാ കർഷകനായി മാറി!" },
          rounds: [
            {
              id: "r1-diversity",
              roundNumber: 1,
              topic: { en: "Farm Diversity", hi: "खेत की विविधता", te: "పొలం వైవిధ్యం", ml: "കൃഷി വൈവിധ്യം" },
              situation: { en: "Planning your 5-acre farm model.", hi: "अपने 5 एकड़ के खेत की योजना बनाना।", te: "మీ 5 ఎకరాల పొలానికి ప్రణాళిక వేస్తున్నారు.", ml: "5 ഏക്കർ കൃഷിയിടം ആസൂത്രണം ചെയ്യുന്നു." },
              choices: [
                { id: "c1", label: "Choice A", text: { en: "Single mono-crop relying on expensive purchased hybrid seeds and chemicals", hi: "केवल एक फसल लगाना जो महंगे बीजों और रसायनों पर निर्भर हो", te: "ఖరీదైన రసాయనాలపై ఆధారపడే ఒకే రకమైన పంట వేయడం", ml: "രാസവളങ്ങളെ ആശ്രയിക്കുന്ന ഒരൊറ്റ വിള മാത്രം നടുക" }, isGoodChoice: false },
                { id: "c2", label: "Choice B", text: { en: "Diverse polyculture with trees, pulses, cattle, and on-farm Jeevamrit loops", hi: "विविध फसलें, पेड़, पशु और घर पर बनी जीवामृत खाद का संगम", te: "చెట్లు, పప్పుధాన్యాలు, ఆవులు మరియు జీవామృతంతో కూడిన సమగ్ర నమూనా", ml: "മരങ്ങളും പയറുവർഗ്ഗങ്ങളും പശുക്കളും ചേർന്ന സ്വാശ്രയ കൃഷിരീതി" }, isGoodChoice: true, taraReaction: { en: "Masterstroke! Multi-species circular farming is unbreakable!", hi: "अद्भुत! विविध और चक्रीय खेती सबसे ज्यादा सुरक्षित और लाभदायक है!", te: "అద్భుతం! సమగ్ర వ్యవసాయం ఎప్పటికీ నష్టపోదు!", ml: "മികച്ച തിരഞ്ഞെടുപ്പ്! ഇത് എപ്പോഴും ലാഭം തരും!" } },
              ],
            },
          ],
        },
        {
          type: "mcq",
          id: "basics-l10-mcq",
          totalXp: 10,
          questions: [
            {
              id: "q-l10-1",
              question: { en: "What makes a circular natural farm economically independent and climate resilient?", hi: "एक चक्रीय प्राकृतिक खेत को आर्थिक रूप से स्वतंत्र और मजबूत क्या बनाता है?", te: "సమగ్ర సహజ వ్యవసాయాన్ని ఆర్థికంగా లాభదాయకంగా మార్చేది ఏమిటి?", ml: "ഒരു സ്വാശ്രയ കൃഷിയിടത്തെ സാമ്പത്തികമായി ഭദ്രമാക്കുന്നത് എന്താണ്?" },
              xp: 10,
              options: [
                { id: "opt-1", text: { en: "All fertility and pest protections are generated internally from farm biomass with zero outside debt", hi: "सभी खाद और दवाइयां बिना किसी कर्ज के खेत पर ही तैयार होती हैं", te: "ఎరువులు, కషాయాలు అన్నీ పొలంలోనే తయారై ఖర్చులు శూన్యమవుతాయి", ml: "എല്ലാ വളങ്ങളും കീടനാശിനികളും കൃഷിയിടത്തിൽ തന്നെ നിർമ്മിക്കപ്പെടുന്നു" }, isCorrect: true, explanation: { en: "Zero input expenses combined with high diverse yields creates true farmer sovereignty.", hi: "शून्य लागत और बंपर पैदावार किसान को सच में आत्मनिर्भर बनाती है।", te: "ఖర్చులు లేకపోవడం వల్ల రైతుకు పూర్తి లాభం వస్తుంది.", ml: "ചെലവുകൾ കുറഞ്ഞ് കർഷകന് പൂർണ്ണ സ്വാതന്ത്ര്യം ലഭിക്കുന്നു." } },
                { id: "opt-2", text: { en: "Buying synthetic chemicals on bank interest every month", hi: "हर महीने बैंक से कर्ज लेकर खाद खरीदना", te: "బ్యాంకు అప్పులతో రసాయనాలు కొనడం", ml: "കടം വാങ്ങി രാസവളങ്ങൾ വാങ്ങിക്കൂട്ടുക" }, isCorrect: false, explanation: { en: "Debt cycles erode farm profitability.", hi: "कर्ज खेती को नुकसान पहुंचाता है।", te: "అప్పులు వ్యవసాయాన్ని దెబ్బతీస్తాయి.", ml: "കടം കർഷകനെ തളർത്തുന്നു." } },
              ],
            },
          ],
        },
        {
          type: "reward",
          id: "basics-l10-reward",
          xp: 70,
          badgeTitle: { en: "Master Agri-Pioneer", hi: "कृषि अग्रणी मास्टर", te: "మాస్టర్ వ్యవసాయ సారథి", ml: "മാസ്റ്റർ അഗ്രി പയനിയർ" },
          badgeIcon: "workspace-premium",
          badgeDescription: { en: "Mastered all 10 Levels of The Basics of Agriculture", hi: "कृषि की मूल बातें के सभी 10 स्तरों में पूर्ण महारत हासिल की", te: "వ్యవసాయ ప్రాథమికాల యొక్క మొత్తం 10 స్థాయిలను విజయవంతంగా పూర్తి చేసారు", ml: "കൃഷിയുടെ 10 അടിസ്ഥാന ഘട്ടങ്ങളും പൂർത്തിയാക്കി" },
          taraDialogue: { en: "Heartiest Congratulations! You have completed all 10 Levels of The Basics of Agriculture and unlocked the Master Agri-Pioneer certification! You have the wisdom to heal the soil, nurture flourishing crops, and inspire fellow farmers!", hi: "हार्दिक बधाई! आपने कृषि की मूल बातें के सभी 10 स्तर पूरे कर लिए हैं और मास्टर कृषि अग्रणी की उपाधि प्राप्त की है! अब आप धरती को समृद्ध बनाने में सक्षम हैं!", te: "హృదయపూర్వక అభినందనలు! మీరు మొత్తం 10 స్థాయిలను పూర్తి చేసి మాస్టర్ వ్యవసాయ సారథి బ్యాడ్జ్ పొందారు! మీ నేల, పంటలు ఎల్లప్పుడూ సమృద్ధిగా ఉంటాయి!", ml: "ഹൃദയം നിറഞ്ഞ അഭിനന്ദനങ്ങൾ! നിങ്ങൾ 10 ലെവലുകളും പൂർത്തിയാക്കി മാസ്റ്റർ അഗ്രി പയനിയർ സർട്ടിഫിക്കേഷൻ നേടിയിരിക്കുന്നു! ഇനി നിങ്ങൾക്ക് സമൃദ്ധമായ കൃഷി ചെയ്യാം!" },
          taraExpression: "excited",
        },
      ],
    },
  ],
};
