import type { LevelDefinition } from "../../types/learn";

export const STEP1_AUDIO_MAP: Record<string, any> = {
  en: require("../../../assets/Learn-Assets/step1-speech-en.mp3"),
  hi: require("../../../assets/Learn-Assets/step1-speech-hi.mp3"),
  te: require("../../../assets/Learn-Assets/step1-speech-te.mp3"),
  ml: require("../../../assets/Learn-Assets/step1-speech-ml.mp3"),
};

export const STEP1_TEXT_MAP: Record<
  string,
  {
    title: string;
    dialogue: string;
    explanation: {
      title: string;
      description: string;
      bulletPoints: { title: string; text: string; icon: string }[];
    };
  }
> = {
  en: {
    title: "What is Soil?",
    dialogue:
      "Soil is much more than the dirt we see on the ground.\n\nIt is a living home where plant roots grow. Inside soil, air, water, nutrients, organic matter, and tiny living organisms work together.\n\nHealthy soil gives plants a strong place to grow and provides the things they need to stay healthy.",
    explanation: {
      title: "What is Soil?",
      description:
        "Soil is a dynamic living system supporting root growth, water retention, and microbial life. It acts as an active biological engine providing crops with the essential foundation to flourish.",
      bulletPoints: [
        {
          title: "Living Home",
          text: "Billions of micro-organisms, earthworms, and roots cycle nutrients continuously.",
          icon: "bug-report",
        },
        {
          title: "Water & Air Balance",
          text: "Porous soil structures store moisture and oxygen required for healthy root respiration.",
          icon: "water-drop",
        },
        {
          title: "Nutrient Provider",
          text: "Rich organic matter releases vital minerals for robust crop yield.",
          icon: "eco",
        },
      ],
    },
  },
  hi: {
    title: "मिट्टी क्या है?",
    dialogue:
      "मिट्टी सिर्फ वह धूल या गंदगी नहीं है जो हमें जमीन पर दिखाई देती है।\n\nयह एक जीवित घर है, जहाँ पौधों की जड़ें बढ़ती हैं। मिट्टी के अंदर हवा, पानी, पोषक तत्व, जैविक पदार्थ और छोटे-छोटे जीव एक साथ मिलकर काम करते हैं।\n\nस्वस्थ मिट्टी पौधों को बढ़ने के लिए एक मजबूत जगह देती है और उन्हें स्वस्थ रहने के लिए जरूरी चीजें प्रदान करती है।",
    explanation: {
      title: "मिट्टी क्या है?",
      description:
        "मिट्टी एक गतिशील जीवित प्रणाली है जो पौधों की जड़ों, पानी के संरक्षण और सूक्ष्मजीवों के जीवन का समर्थन करती है।",
      bulletPoints: [
        {
          title: "जीवित घर",
          text: "करोड़ों सूक्ष्मजीव और जैविक पदार्थ मिलकर मिट्टी को उपजाऊ बनाते हैं।",
          icon: "bug-report",
        },
        {
          title: "जल और वायु संतुलन",
          text: "मिट्टी के छिद्र हवा और पानी को संजोकर रखते हैं जो जड़ों के लिए आवश्यक हैं।",
          icon: "water-drop",
        },
        {
          title: "पोषक तत्वों का स्रोत",
          text: "जैविक पदार्थ पौधों के स्वस्थ विकास के लिए खनिज उपलब्ध कराते हैं।",
          icon: "eco",
        },
      ],
    },
  },
  te: {
    title: "నేల అంటే ఏమిటి?",
    dialogue:
      "నేల అంటే మనకు నేలపై కనిపించే మట్టి లేదా దుమ్ము మాత్రమే కాదు.\n\nఇది మొక్కల వేర్లు పెరిగే ఒక జీవంతమైన ఇల్లు. నేలలో గాలి, నీరు, పోషకాలు, సేంద్రియ పదార్థాలు మరియు చిన్న చిన్న జీవులు కలిసి పనిచేస్తాయి.\n\nఆరోగ్యకరమైన నేల మొక్కలు బలంగా పెరగడానికి మంచి స్థలాన్ని అందిస్తుంది మరియు అవి ఆరోగ్యంగా ఉండటానికి అవసరమైన వాటిని అందిస్తుంది.",
    explanation: {
      title: "నేల అంటే ఏమిటి?",
      description:
        "నేల అనేది మొక్కల వేర్లు, నీటి నిల్వ మరియు సూక్ష్మజీవుల జీవనాన్ని సమర్ధించే ఒక జీవంతమైన వ్యవస్థ.",
      bulletPoints: [
        {
          title: "జీవంతమైన ఇల్లు",
          text: "కోట్లాది సూక్ష్మజీవులు మరియు సేంద్రియ పదార్థాలు కలిసి నేలను సారవంతం చేస్తాయి.",
          icon: "bug-report",
        },
        {
          title: "నీరు & గాలి సమతుల్యత",
          text: "నేలలోని రంధ్రాలు వేర్లకు అవసరమైన తేమ మరియు ప్రాణవాయువును అందిస్తాయి.",
          icon: "water-drop",
        },
        {
          title: "పోషకాల భాండాగారం",
          text: "సేంద్రియ పదార్థాలు పంటల బలమైన ఎదుగుదలకు అవసరమైన పోషకాలను అందిస్తాయి.",
          icon: "eco",
        },
      ],
    },
  },
  ml: {
    title: "മണ്ണ് എന്താണ്?",
    dialogue:
      "മണ്ണ് എന്നത് നമുക്ക് നിലത്ത് കാണുന്ന പൊടിയോ അഴുക്കോ മാത്രമല്ല.\n\nചെടികളുടെ വേരുകൾ വളരുന്ന ഒരു ജീവിക്കുന്ന വീടാണ് മണ്ണ്. മണ്ണിനുള്ളിൽ വായു, വെള്ളം, പോഷകങ്ങൾ, ജൈവവസ്തുക്കൾ, ചെറിയ ജീവികൾ എന്നിവ ഒരുമിച്ച് പ്രവർത്തിക്കുന്നു.\n\nആരോഗ്യമുള്ള മണ്ണ് ചെടികൾക്ക് ശക്തമായി വളരാൻ നല്ലൊരു ഇടം നൽകുകയും അവ ആരോഗ്യത്തോടെ വളരാൻ ആവശ്യമായ കാര്യങ്ങൾ ലഭ്യമാക്കുകയും ചെയ്യുന്നു.",
    explanation: {
      title: "മണ്ണ് എന്താണ്?",
      description:
        "ചെടികളുടെ വേരുകൾ, ജലസംഭരണം, സൂക്ഷ്മാണുക്കളുടെ പ്രവർത്തനം എന്നിവയെ പിന്തുണയ്ക്കുന്ന ഒരു ജീവനുള്ള വ്യവസ്ഥയാണ് മണ്ണ്.",
      bulletPoints: [
        {
          title: "ജീവനുള്ള വീട്",
          text: "കോടിക്കണക്കിന് സൂക്ഷ്മാണുക്കളും ജൈവവസ്തുക്കളും ചേർന്ന് മണ്ണിനെ ഫലഭൂയിഷ്ഠമാക്കുന്നു.",
          icon: "bug-report",
        },
        {
          title: "ജലവും വായുവും",
          text: "മണ്ണിലെ സൂക്ഷ്മ സുഷിരങ്ങൾ വേരുകൾക്ക് ആവശ്യമായ ഈർപ്പവും വായുവും നൽകുന്നു.",
          icon: "water-drop",
        },
        {
          title: "പോഷകങ്ങളുടെ ഉറവിടം",
          text: "ജൈവവസ്തുക്കൾ ചെടികളുടെ വളർച്ചയ്ക്ക് ആവശ്യമായ പോഷകങ്ങൾ ലഭ്യമാക്കുന്നു.",
          icon: "eco",
        },
      ],
    },
  },
};

/**
 * Level 1 — Meet Your Soil
 * Step 1 — What Is Soil?
 * 
 * Phase 1: Tara Concept Cards (Overview + 5 Component Cards)
 * Phase 2: Quick MCQ ("What can be found in healthy soil?")
 * Phase 3: Reward (+20 XP)
 */
export const SOIL_STEP_1_LEVEL_DEFINITION: LevelDefinition = {
  id: "soil-level-1",
  lessonId: "soil-level-1",
  levelNumber: 1,
  title: "What is Soil?",
  subtitle: "Level 1 — Meet Your Soil: Discover what healthy soil is made of.",
  xpReward: 20,
  phases: [
    {
      type: "conceptCards",
      id: "phase-concept-1",
      title: "What is Soil?",
      taraDialogue:
        "Soil is much more than the dirt we see on the ground.\n\nIt is a living home where plant roots grow. Inside soil, air, water, nutrients, organic matter, and tiny living organisms work together.\n\nHealthy soil gives plants a strong place to grow and provides the things they need to stay healthy.",
      taraExpression: "happy",
      audioSource: STEP1_AUDIO_MAP.en,
      progressiveHighlights: [
        "Air",
        "Water",
        "Nutrients",
        "Organic Matter",
        "Living Organisms",
      ],
      transitionText: "Now let's take a closer look at what makes up healthy soil.",
      cards: [
        {
          id: "card-air",
          title: "Air",
          icon: "air",
          color: "#81D4FA",
          taraDialogue:
            "Soil has tiny spaces between its particles. These spaces can hold air, which roots and soil organisms need to live.",
        },
        {
          id: "card-water",
          title: "Water",
          icon: "water-drop",
          color: "#29B6F6",
          taraDialogue:
            "Soil stores water and makes it available to plant roots. How much water soil can hold depends on the soil and its condition.",
        },
        {
          id: "card-nutrients",
          title: "Nutrients",
          icon: "eco",
          color: "#4CAF50",
          taraDialogue:
            "Plants need nutrients to grow. Healthy soil helps store and cycle nutrients so plants can access them.",
        },
        {
          id: "card-organic-matter",
          title: "Organic Matter",
          icon: "compost",
          color: "#8D6E63",
          taraDialogue:
            "Leaves, roots, crop residues, and other natural materials can become organic matter in the soil. It is an important part of a healthy soil system.",
        },
        {
          id: "card-living-organisms",
          title: "Living Organisms",
          icon: "bug-report",
          color: "#7E57C2",
          taraDialogue:
            "Soil is home to many living organisms. They help break down organic materials and play important roles in the soil ecosystem.",
        },
      ],
    },
    {
      type: "mcq",
      id: "phase-mcq-1",
      questions: [
        {
          id: "q1",
          question: "What can be found in healthy soil?",
          xp: 20,
          options: [
            {
              id: "A",
              text: "Only dirt",
              isCorrect: false,
              explanation: "Soil is much more than dirt—it is a thriving, living environment!",
            },
            {
              id: "B",
              text: "Only water",
              isCorrect: false,
              explanation: "Water is essential, but soil also contains air, nutrients, organic matter, and organisms.",
            },
            {
              id: "C",
              text: "Air, water, nutrients, organic matter and living organisms",
              isCorrect: true,
              explanation:
                "Correct! Healthy soil combines air, water, nutrients, organic matter, and living organisms.",
            },
            {
              id: "D",
              text: "Only plant roots",
              isCorrect: false,
              explanation: "Roots grow in soil, but soil itself is built from air, water, nutrients, organic matter, and organisms.",
            },
          ],
        },
      ],
      taraExpressionCorrect: "excited",
      taraExpressionIncorrect: "thinking",
      totalXp: 20,
    },
    {
      type: "reward",
      id: "phase-reward-1",
      xp: 20,
      badgeTitle: "Soil Explorer",
      badgeIcon: "eco",
      badgeDescription: "Mastered fundamental soil components & living ecosystem.",
      taraDialogue:
        "Wonderful job! You've learned what makes up healthy soil!",
      taraExpression: "excited",
    },
  ],
};

export function getSoilStep1Definition(lang: string = "en"): LevelDefinition {
  const langKey = STEP1_TEXT_MAP[lang] ? lang : "en";
  const localized = STEP1_TEXT_MAP[langKey];
  const audio = STEP1_AUDIO_MAP[langKey];

  return {
    ...SOIL_STEP_1_LEVEL_DEFINITION,
    title: localized.title,
    phases: SOIL_STEP_1_LEVEL_DEFINITION.phases.map((phase, idx) => {
      if (idx === 0 && phase.type === "conceptCards") {
        return {
          ...phase,
          title: localized.title,
          taraDialogue: localized.dialogue,
          audioSource: audio,
          explanation: localized.explanation,
        };
      }
      return phase;
    }),
  };
}
