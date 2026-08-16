import { useCallback } from "react";
import { useUser } from "../context/UserContext";
import { getTranslation, type TranslationKey } from "../i18n";

export function useTranslation() {
  const { user } = useUser();
  const lang = user?.language || "en";

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      return getTranslation(lang, key, params);
    },
    [lang]
  );

  return { t, lang };
}
