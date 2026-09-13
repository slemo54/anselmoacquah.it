"use client";

import { ContactChannels, SiteIdentity } from "@/content/site";
import { Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";

export function SiteFooter() {
  const { copy } = useLocale();

  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} {SiteIdentity.displayName}</p>
          <p className="footer-note">{copy.footerNote}</p>
        </div>
        <div className="footer-links">
          <a
            href={ContactChannels.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            {Icons.linkedin({ className: "social-icon" })}
          </a>
          <a
            href={ContactChannels.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            {Icons.github({ className: "social-icon" })}
          </a>
          <a
            href={`mailto:${ContactChannels.email}`}
            aria-label="Email"
            title={ContactChannels.email}
          >
            {Icons.mail({ className: "social-icon" })}
          </a>
          <a
            href={`tel:${ContactChannels.phone}`}
            aria-label="Phone"
            title={ContactChannels.phoneDisplay}
          >
            {Icons.phone({ className: "social-icon" })}
          </a>
        </div>
        <button
          className="back-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {Icons.chevronUp()}
        </button>
      </div>
    </footer>
  );
}
