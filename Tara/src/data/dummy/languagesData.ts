import type { LanguageOption } from "../../types/onboarding";

export const LANGUAGES_DATA: LanguageOption[] = [
  { id: "en", code: "en", name: "English", nativeName: "English", script: "Latin" },
  { id: "hi", code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari" },
  { id: "te", code: "te", name: "Telugu", nativeName: "తెలుగు", script: "Telugu" },
  { id: "ml", code: "ml", name: "Malayalam", nativeName: "മലയാളം", script: "Malayalam" },
  { id: "mr", code: "mr", name: "Marathi", nativeName: "मराठी", script: "Devanagari", isComingSoon: true },
  { id: "kn", code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", script: "Kannada", isComingSoon: true },
  { id: "ta", code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil", isComingSoon: true },
  { id: "gu", code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", script: "Gujarati", isComingSoon: true },
  { id: "bn", code: "bn", name: "Bengali", nativeName: "বাংলা", script: "Bengali", isComingSoon: true },
  { id: "pa", code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", script: "Gurmukhi", isComingSoon: true },
];
