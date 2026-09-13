"use client";

import { SiteNavModel } from "@/components/portfolio/SiteNav";
import { useLocale } from "@/components/portfolio/LocaleProvider";
import { HeroNavCopy } from "@/content/hero-nav-copy";

export function MobileDock({ active = "home" }: { active?: string }) {
  const { locale } = useLocale();
  const copy = HeroNavCopy.of(locale);

  return (
    <nav className="mobile-dock" aria-label={copy.navDock}>
      {SiteNavModel.dock.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            className={isActive ? "mobile-dock-link is-active" : "mobile-dock-link"}
            aria-label={copy[item.labelKey]}
            aria-current={isActive ? "page" : undefined}
            data-section={item.id}
          >
            {SiteNavModel.dockIcon(item.id)}
          </a>
        );
      })}
    </nav>
  );
}
