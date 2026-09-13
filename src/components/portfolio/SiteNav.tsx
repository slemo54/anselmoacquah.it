"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";
import { LocaleCopy } from "@/content/locale";
import { HeroNavCopy } from "@/content/hero-nav-copy";
import { ContactChannels } from "@/content/site";
import { MotionGuard } from "@/lib/motion-guard";

type NavItem = {
  id: string;
  href: string;
  labelKey: "navHome" | "navAbout" | "navSkills" | "navProjects" | "navContact";
};

export class Magnetic {
  static bind(node: HTMLElement, strength = 0.32): () => void {
    if (!MotionGuard.canMagnetize()) return () => undefined;

    const xTo = gsap.quickTo(node, "x", { duration: 0.38, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.38, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      gsap.set(node, { x: 0, y: 0 });
    };
  }
}

export class SiteNavModel {
  static readonly compactOffset = 28;

  static readonly links: readonly NavItem[] = [
    { id: "about", href: "#about", labelKey: "navAbout" },
    { id: "skills", href: "#skills", labelKey: "navSkills" },
    { id: "projects", href: "#projects", labelKey: "navProjects" },
    { id: "contact", href: "#contact", labelKey: "navContact" },
  ];

  static readonly dock: readonly NavItem[] = [
    { id: "home", href: "#home", labelKey: "navHome" },
    { id: "about", href: "#about", labelKey: "navAbout" },
    { id: "projects", href: "#projects", labelKey: "navProjects" },
    { id: "contact", href: "#contact", labelKey: "navContact" },
  ];

  static dockIcon(id: string) {
    switch (id) {
      case "home":
        return Icons.home();
      case "about":
        return Icons.person();
      case "projects":
        return Icons.grid();
      case "contact":
        return Icons.chat();
      default:
        return null;
    }
  }

  static isCompact(scrollY: number): boolean {
    return scrollY > this.compactOffset;
  }

  static activeFromEntries(
    entries: IntersectionObserverEntry[],
    fallback: string,
  ): string {
    const visible = entries
      .filter((entry) => entry.isIntersecting && entry.target.id)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    return visible[0]?.target.id ?? fallback;
  }

  static morphIndicator(cluster: HTMLElement, active: HTMLElement | null): void {
    const indicator = cluster.querySelector<HTMLElement>("[data-nav-indicator]");
    if (!indicator) return;

    if (!active) {
      const hide = { width: 0, opacity: 0 };
      if (MotionGuard.canAnimate()) {
        gsap.to(indicator, { ...hide, duration: 0.28, ease: "power3.out", overwrite: true });
      } else {
        gsap.set(indicator, hide);
      }
      return;
    }

    const clusterBox = cluster.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    const next = {
      x: activeBox.left - clusterBox.left,
      width: activeBox.width,
      opacity: 1,
    };
    if (MotionGuard.canAnimate()) {
      gsap.to(indicator, {
        ...next,
        duration: 0.42,
        ease: "power3.out",
        overwrite: true,
      });
      return;
    }
    gsap.set(indicator, next);
  }
}

export function SiteNav() {
  const { locale, setLocale } = useLocale();
  const copy = HeroNavCopy.of(locale);
  const navRef = useRef<HTMLElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("home");

  const syncIndicator = useCallback(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    const current = cluster.querySelector<HTMLElement>(
      `[data-nav-id="${active}"]`,
    );
    SiteNavModel.morphIndicator(cluster, current);
  }, [active]);

  useEffect(() => {
    const onScroll = () => {
      setCompact(SiteNavModel.isCompact(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((current) => SiteNavModel.activeFromEntries(entries, current));
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.45] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    syncIndicator();
    window.addEventListener("resize", syncIndicator);
    return () => window.removeEventListener("resize", syncIndicator);
  }, [syncIndicator, locale]);

  useEffect(() => {
    const root = navRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll<HTMLElement>("[data-magnetic]");
    const cleanups = [...nodes].map((node) => Magnetic.bind(node));
    return () => cleanups.forEach((stop) => stop());
  }, [locale]);

  return (
    <>
      <a className="skip-link" href="#home">
        {copy.skip}
      </a>
      <header className="site-nav-wrap">
        <nav
          ref={navRef}
          className={compact ? "site-nav is-compact" : "site-nav"}
          aria-label="Primary"
        >
          <a
            className="nav-logo"
            href="#home"
            aria-label="Anselmo Acquah, home"
            data-magnetic
          >
            AA<span>.</span>
          </a>

          <div className="nav-cluster" ref={clusterRef}>
            <span className="nav-indicator" data-nav-indicator aria-hidden="true" />
            {SiteNavModel.links.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={isActive ? "nav-link is-active" : "nav-link"}
                  data-nav-id={item.id}
                  data-magnetic
                  aria-current={isActive ? "location" : undefined}
                >
                  {copy[item.labelKey]}
                </a>
              );
            })}
          </div>

          <div className="nav-aside">
            <a
              className="nav-available"
              href={`mailto:${ContactChannels.email}`}
              data-magnetic
            >
              <span className="nav-available-dot" aria-hidden="true" />
              <span className="nav-available-label">{copy.available}</span>
            </a>
            <div className="lang-switch" role="group" aria-label={copy.language}>
              {LocaleCopy.all.map((code) => {
                const pressed = code === locale;
                return (
                  <button
                    key={code}
                    type="button"
                    className={pressed ? "lang-btn is-active" : "lang-btn"}
                    aria-pressed={pressed}
                    data-lang={code}
                    onClick={() => setLocale(code)}
                  >
                    {code.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

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
    </>
  );
}
