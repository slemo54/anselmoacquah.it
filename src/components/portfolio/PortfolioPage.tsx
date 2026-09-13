"use client";

import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Hero } from "@/components/portfolio/Hero";
import { LocaleProvider, useLocale } from "@/components/portfolio/LocaleProvider";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteNav } from "@/components/portfolio/SiteNav";
import { CaseStudies } from "@/components/work/case-studies";

function PortfolioShell() {
  const { fading } = useLocale();

  return (
    <div className={fading ? "language-fade" : undefined}>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

export function PortfolioPage() {
  return (
    <LocaleProvider>
      <PortfolioShell />
    </LocaleProvider>
  );
}
