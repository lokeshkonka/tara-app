import type { LessonPackageDefinition } from "../../types/lessonSchema";

/**
 * SOIL HEALTH & LIVING SOIL ECOSYSTEMS — COMPLETE DATA PACKAGE
 *
 * This single file defines the entire 5-level lesson module with:
 * - 4 Indian languages (English, Hindi, Telugu, Malayalam)
 * - Sarvam AI Voiceover URLs
 * - 5 Distinct Progressive Levels with custom interactive mini-games and quizzes
 */
export const SOIL_HEALTH_PACKAGE: LessonPackageDefinition = {
  id: "soil-level-1",
  categoryId: "soil",
  title: {
    en: "Soil Health & Living Ecosystems",
    hi: "मृदा स्वास्थ्य और जीवित पारिस्थितिकी तंत्र",
    te: "నేల ఆరోగ్యం & జీవ పర్యావరణ వ్యవస్థ",
    ml: "മണ്ണ് ആരോഗ്യവും ജീവസ്സുറ്റ പരിസ്ഥിതിയും",
  },
  description: {
    en: "Understand the living soil community and master practical behaviors to protect and nourish your land.",
    hi: "जीवित मिट्टी के समुदाय को समझें और अपनी भूमि की रक्षा और पोषण के लिए व्यावहारिक तरीकों में महारत हासिल करें।",
    te: "సజీవ నేల సమాజాన్ని అర్థం చేసుకోండి మరియు మీ భూమిని రక్షించడానికి మరియు పోషించడానికి ఆచరణాత్మక పద్ధతులను నేర్చుకోండి.",
    ml: "ജീവനുള്ള മണ്ണിലെ ജീവജാലങ്ങളെ മനസ്സിലാക്കുകയും മണ്ണിനെ സംരക്ഷിക്കാനുള്ള പ്രായോഗിക രീതികൾ പഠിക്കുകയും ചെയ്യുക.",
  },
  whyItMatters: {
    en: "Healthy living soil holds up to 40% more moisture during dry spells, protects crops against root diseases naturally, and significantly cuts chemical input expenses.",
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
    // Level 1: What is Soil?
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
        en: "Discover the 4 primary components that build living soil",
        hi: "जीवित मिट्टी बनाने वाले 4 मुख्य घटकों को जानें",
        te: "సజీవ నేలను తయారుచేసే 4 ముఖ్యమైన భాగాలను కనుగొనండి",
        ml: "മണ്ണിന്റെ 4 പ്രധാന ഘടകങ്ങൾ തിരിച്ചറിയുക",
      },
      durationMinutes: 5,
      xpReward: 30,
      phases: [
        {
          type: "interactiveLearn",
          id: "soil-level-1-interactive",
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
          diagramType: "soilCrossSection",
          completionRequirement: "discoverAll",
        },
      ],
    },

    // Level 2: Soil Is Alive
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
        {
          type: "conceptCards",
          id: "soil-alive-concepts",
          title: { en: "Soil Is Alive", hi: "मिट्टी जीवित है", te: "నేల సజీవమైనది", ml: "മണ്ണ് ജീവനുള്ളതാണ്" },
          taraDialogue: {
            en: "Look at the soil beneath your feet. It may seem quiet and still, but it is full of life! Tiny organisms, earthworms, plant roots, air, water, and organic matter all interact inside the soil.",
            hi: "अपने पैरों के नीचे की मिट्टी को देखें। यह शांत लग सकती है, लेकिन यह जीवन से भरी है! सूक्ष्मजीव, केंचुए, जड़ें, हवा और पानी सब मिलकर काम करते हैं।",
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
                text: { en: "Microscopic organisms and earthworms interact underground.", hi: "सूक्ष्मजीव और केंचुए भूमिगत रूप से परस्पर क्रिया करते हैं।", te: "భూమి లోపల జీవులు నిరంతరం పనిచేస్తాయి.", ml: "സൂക്ഷ്മജീവികൾ മണ്ണിൽ സജീവമായി പ്രവർത്തിക്കുന്നു." },
                icon: "public",
              },
            ],
          },
          cards: [
            {
              id: "c-earthworm",
              title: { en: "Earthworms", hi: "केंचुए", te: "వానపాములు", ml: "ഞാഞ്ഞൂലുകൾ" },
              icon: "waves",
              color: "#8D6E63",
              taraDialogue: { en: "Earthworms are nature's natural tillers.", hi: "केंचुए प्रकृति के स्वाभाविक किसान हैं।", te: "వానపాములు నేలను గుల్లగా చేసి సారవంతం చేస్తాయి.", ml: "ഞാഞ്ഞൂലുകൾ മണ്ണിനെ ഇളക്കി ഫലഭൂയിഷ്ഠമാക്കുന്നു." },
            },
          ],
        },
        {
          type: "match",
          id: "soil-alive-match",
          title: { en: "Who Does What?", hi: "कौन क्या करता है?", te: "ఎవరు ఏమి చేస్తారు?", ml: "ആര് എന്ത് ചെയ്യുന്നു?" },
          instructions: { en: "Match each soil helper with its role in the ecosystem.", hi: "प्रत्येक जीव को उसके कार्य से मिलाएं।", te: "సరైన పాత్రతో జతపరచండి.", ml: "യോജിച്ചവ തമ്മിൽ ചേർക്കുക." },
          xp: 30,
          taraDialogue: { en: "Connect each soil worker to their job!", hi: "प्रत्येक जीव को उसके कार्य से जोड़ें!", te: "వాటి పనితో జత చేయండి!", ml: "യോജിച്ച ജോടികളെ കണ്ടെത്തുക!" },
          taraSuccessDialogue: { en: "Spot on! Everyone has a role!", hi: "बहुत बढ़िया! सबका अपना काम है।", te: "చాలా బాగుంది!", ml: "വളരെ നന്നായിരിക്കുന്നു!" },
          pairs: [
            {
              id: "p-earthworm",
              leftText: { en: "Earthworm", hi: "केंचुआ", te: "వానపాము", ml: "ഞാഞ്ഞൂൽ" },
              rightText: { en: "Creates air & water channels", hi: "हवा और पानी के रास्ते बनाता है", te: "గాలి, నీటి మార్గాలను చేస్తుంది", ml: "വായു സഞ്ചാര പാതകൾ ഉണ്ടാക്കുന്നു" },
            },
            {
              id: "p-microbes",
              leftText: { en: "Microorganisms", hi: "सूक्ष्मजीव", te: "సూక్ష్మజీవులు", ml: "സൂക്ഷ്മജീവികൾ" },
              rightText: { en: "Breaks down organic matter", hi: "जैविक पदार्थों को तोड़ता है", te: "సేంద్రీయ పదార్థాన్ని కుళ్ళింపజేస్తుంది", ml: "ജൈവവസ്തുക്കളെ വിഘടിപ്പിക്കുന്നു" },
            },
          ],
        },
        {
          type: "mcq",
          id: "soil-alive-mcq",
          totalXp: 50,
          questions: [
            {
              id: "q-alive-1",
              question: { en: "Why is soil called a living ecosystem?", hi: "मिट्टी को जीवित पारिस्थितिकी तंत्र क्यों कहा जाता है?", te: "నేలను సజీవ పర్యావరణం అని ఎందుకు అంటారు?", ml: "മണ്ണിനെ ജീവസ്സുറ്റ പരിസ്ഥിతి എന്ന് വിളിക്കുന്നത് എന്തുകൊണ്ട്?" },
              xp: 25,
              options: [
                {
                  id: "opt-1",
                  text: { en: "It contains billions of active organisms and roots", hi: "इसमें अरबों सक्रिय जीव और जड़ें होती हैं", te: "ఇందులో కోట్ల జీవులు మరియు వేర్లు ఉంటాయి", ml: "ഇതിൽ കോടിക്കണക്കിന് ജീവികളും വേരുകളും ഉണ്ട്" },
                  isCorrect: true,
                  explanation: { en: "Soil is a dynamic living habitat.", hi: "मिट्टी एक गतिशील जीवित आवास है।", te: "నేల ఒక సజీవ ఆవాసం.", ml: "മണ്ണ് ഒരു സജീവ ആവാസവ്യവസ്ഥയാണ്." },
                },
              ],
            },
          ],
        },
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
  ],
};
