"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Language,
  type Dictionary,
  type Locale,
} from "@/i18n/language";

type LanguageContextValue = {
  locale: Locale;
  copy: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(Language.defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(Language.storageKey);
    const next = Language.isLocale(stored)
      ? stored
      : Language.fromNavigator(navigator.language);
    setLocaleState(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = Language.htmlLang(locale);
    document.title = Language.copy(locale).seo.title;
    window.localStorage.setItem(Language.storageKey, locale);
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    if (!Language.isLocale(next)) return;
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      copy: Language.copy(locale),
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
