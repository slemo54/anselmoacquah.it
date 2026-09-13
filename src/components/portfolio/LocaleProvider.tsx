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
import { LocaleCopy, type Copy, type Locale } from "@/content/locale";

type LocaleContextValue = {
  locale: Locale;
  copy: Copy;
  fading: boolean;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export class LocaleController {
  static applyDocument(locale: Locale): void {
    document.documentElement.lang = LocaleCopy.htmlLang(locale);
    LocaleCopy.persist(locale);
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(LocaleCopy.defaultLocale);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const stored = LocaleCopy.readStored();
    setLocaleState(stored);
    LocaleController.applyDocument(stored);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setFading(true);
    window.setTimeout(() => {
      setLocaleState(next);
      LocaleController.applyDocument(next);
      setFading(false);
    }, 180);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      copy: LocaleCopy.of(locale),
      fading,
      setLocale,
    }),
    [locale, fading, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
