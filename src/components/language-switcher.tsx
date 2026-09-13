"use client";

import { Language, type Locale } from "@/i18n/language";
import { useLanguage } from "@/components/language-provider";

const LABELS: Record<Locale, string> = {
  it: "IT",
  eng: "ENG",
  fr: "FR",
};

export function LanguageSwitcher() {
  const { locale, setLocale, copy } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label={copy.nav.language}>
      {Language.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            className="lang-btn"
            aria-pressed={active}
            onClick={() => setLocale(code)}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
