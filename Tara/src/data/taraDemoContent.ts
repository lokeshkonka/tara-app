import type { AudioSource } from "expo-audio";

export type TaraLanguage = "english" | "hindi" | "malayalam" | "telugu";

export interface TaraDemoContent {
  audio: AudioSource;
  messages: string[];
}

export const TARA_DEMO_CONTENT: Record<TaraLanguage, TaraDemoContent> = {
  english: {
    audio: require("../../assets/dummy_voices/english-speech.mp3"),
    messages: [
      "Hi! I'm Tara.",
      "Welcome to your sustainable farming journey.",
      "Today, we are going to learn about soil health.",
      "Did you know that healthy soil is the foundation of a healthy farm?",
      "Good soil helps plants grow stronger.",
      "It supports useful organisms and holds water and nutrients.",
      "In this lesson, we'll discover simple ways to care for our soil.",
      "We'll learn, play a quick challenge, and try a real farming practice.",
      "Ready?",
      "Let's get started!",
      "Healthy soil, healthy crops, happy farmers!",
    ],
  },
  hindi: {
    audio: require("../../assets/dummy_voices/hindi-speech.mp3"),
    messages: [
      "नमस्ते! मैं तारा हूँ।",
      "आपकी टिकाऊ खेती की यात्रा में आपका स्वागत है।",
      "आज हम मिट्टी के स्वास्थ्य के बारे में सीखेंगे।",
      "क्या आप जानते हैं कि स्वस्थ मिट्टी एक स्वस्थ खेत की नींव होती है?",
      "अच्छी मिट्टी पौधों को मजबूत बनाने में मदद करती है।",
      "यह पानी तथा पोषक तत्वों को बनाए रखती है।",
      "इस पाठ में हम सीखेंगे कि अपनी मिट्टी की अच्छी तरह देखभाल कैसे करें।",
      "हम सीखेंगे, एक छोटा सा खेल खेलेंगे और फिर खेती में एक आसान तरीका आज़माएँगे।",
      "तैयार हैं?",
      "चलिए शुरू करते हैं!",
      "स्वस्थ मिट्टी, स्वस्थ फसल, खुशहाल किसान!",
    ],
  },
  malayalam: {
    audio: require("../../assets/dummy_voices/malyalam-speech.mp3"),
    messages: [
      "നമസ്കാരം! ഞാൻ താരയാണ്.",
      "നിങ്ങളുടെ സുസ്ഥിര കൃഷിയാത്രയിലേക്ക് സ്വാഗതം.",
      "ഇന്ന് നമ്മൾ മണ്ണിന്റെ ആരോഗ്യം കുറിച്ച് പഠിക്കാം.",
      "ആരോഗ്യമുള്ള മണ്ണാണ് നല്ല കൃഷിയുടെ അടിസ്ഥാനം എന്ന് നിങ്ങൾക്കറിയാമോ?",
      "നല്ല മണ്ണ് ചെടികൾക്ക് ശക്തമായി വളരാൻ സഹായിക്കുന്നു.",
      "ഇത് വെള്ളവും പോഷകങ്ങളും നിലനിർത്തുന്നു.",
      "ഈ പാഠത്തിൽ, നമ്മുടെ മണ്ണിനെ എങ്ങനെ നന്നായി പരിപാലിക്കാമെന്ന് പഠിക്കാം.",
      "നമുക്ക് പഠിക്കാം, ഒരു ചെറിയ ഗെയിം കളിക്കാം, ഒരു ലളിതമായ രീതി പരീക്ഷിക്കാം.",
      "തയ്യാറാണോ?",
      "നമുക്ക് തുടങ്ങാം!",
      "ആരോഗ്യമുള്ള മണ്ണ്, നല്ല വിള, സന്തോഷമുള്ള കർഷകൻ!",
    ],
  },
  telugu: {
    audio: require("../../assets/dummy_voices/telugu-speech.mp3"),
    messages: [
      "నమస్కారం! నేను తారను.",
      "మీ సుస్థిర వ్యవసాయ ప్రయాణానికి స్వాగతం.",
      "ఈరోజు మనం నేల ఆరోగ్యం గురించి నేర్చుకుందాం.",
      "ఆరోగ్యకరమైన నేల మంచి వ్యవసాయానికి పునాది అని మీకు తెలుసా?",
      "మంచి నేల మొక్కలు బలంగా పెరగడానికి సహాయపడుతుంది.",
      "అలాగే నీటిని మరియు పోషకాలను నిల్వ చేసుకోవడానికి సహాయపడుతుంది.",
      "ఈ పాఠంలో మన నేలను ఎలా ఆరోగ్యంగా ఉంచుకోవాలో నేర్చుకుందాం.",
      "మనం నేర్చుకుందాం, ఒక చిన్న ఆట ఆడదాం, పొలంలో ప్రయత్నించగల సులభమైన పద్ధతిని తెలుసుకుందాం.",
      "సిద్ధంగా ఉన్నారా?",
      "మరి, ప్రారంభిద్దాం!",
      "ఆరోగ్యకరమైన నేల, మంచి పంట, సంతోషకరమైన రైతు!",
    ],
  },
};

export const TARA_DEMO_LANGUAGES: TaraLanguage[] = [
  "english",
  "hindi",
  "malayalam",
  "telugu",
];
