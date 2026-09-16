"use client";

import { ContactChannels, SiteIdentity } from "@/content/site";
import { Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";
import { Language } from "@/i18n/language";

export function SiteFooter() {
  const { copy, locale } = useLocale();
  const i18n = Language.copy(locale);

  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-copy">
          <p>
            © {new Date().getFullYear()} {SiteIdentity.displayName}
          </p>
          <p className="footer-note">{copy.footerNote}</p>
        </div>
        <div className="footer-links">
          <a
            href={ContactChannels.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={i18n.contact.linkedinLabel}
            title={i18n.contact.linkedinLabel}
          >
            {Icons.linkedin({ className: "social-icon" })}
          </a>
          <a
            href={ContactChannels.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={i18n.contact.githubLabel}
            title={i18n.contact.githubLabel}
          >
            {Icons.github({ className: "social-icon" })}
          </a>
          <a
            href={`mailto:${ContactChannels.email}`}
            aria-label={i18n.contact.emailLabel}
            title={ContactChannels.email}
          >
            {Icons.mail({ className: "social-icon" })}
          </a>
          <a
            href={`tel:${ContactChannels.phone}`}
            aria-label={i18n.contact.phoneLabel}
            title={ContactChannels.phoneDisplay}
          >
            {Icons.phone({ className: "social-icon" })}
          </a>
        </div>
        <button
          className="back-top"
          type="button"
          aria-label={i18n.footer.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {Icons.chevronUp()}
        </button>
      </div>
    </footer>
  );
}
