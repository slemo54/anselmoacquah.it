import eng from "./eng.json";
import fr from "./fr.json";
import it from "./it.json";

export const LOCALES = ["it", "eng", "fr"] as const;

export type Locale = (typeof LOCALES)[number];
export type Dictionary = typeof eng;

const dictionaries: Record<Locale, Dictionary> = {
  it: it as Dictionary,
  eng,
  fr: fr as Dictionary,
};

export class Language {
  static readonly locales = LOCALES;
  static readonly defaultLocale: Locale = "eng";
  static readonly storageKey = "portfolio-language";

  static isLocale(value: string | null | undefined): value is Locale {
    return Boolean(value && (LOCALES as readonly string[]).includes(value));
  }

  static htmlLang(locale: Locale) {
    if (locale === "it") return "it";
    if (locale === "fr") return "fr";
    return "en";
  }

  static copy(locale: Locale): Dictionary {
    return dictionaries[locale] ?? dictionaries[Language.defaultLocale];
  }

  static fromNavigator(language: string) {
    const lower = language.toLowerCase();
    if (lower.startsWith("it")) return "it" as const;
    if (lower.startsWith("fr")) return "fr" as const;
    return Language.defaultLocale;
  }

  static interpolate(template: string, values: Record<string, string>) {
    return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
  }
}

export const dictionariesByLocale = dictionaries;
