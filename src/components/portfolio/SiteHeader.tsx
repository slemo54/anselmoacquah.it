"use client";

import { useEffect, useState } from "react";
import { LocaleCopy } from "@/content/locale";
import { ContactChannels } from "@/content/site";
import { useLocale } from "@/components/portfolio/LocaleProvider";

export function SiteHeader() {
  const { copy, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <nav
        className={`nav${scrolled ? " scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a className="logo" href="#home" aria-label="Anselmo Acquah, home">
          AA<span>.</span>
        </a>
        <div className="nav-links">
          <a className="availability" href={`mailto:${ContactChannels.email}`}>
            {copy.available}
          </a>
          <div
            className="language-switcher"
            role="group"
            aria-label={copy.languageGroup}
          >
            {LocaleCopy.all.map((code) => (
              <button
                key={code}
                className={`lang-btn${locale === code ? " active" : ""}`}
                type="button"
                data-lang={code}
                aria-pressed={locale === code}
                onClick={() => setLocale(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
