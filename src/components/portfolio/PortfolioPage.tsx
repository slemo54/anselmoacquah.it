"use client";

import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Hero } from "@/components/portfolio/Hero";
import { LocaleProvider, useLocale } from "@/components/portfolio/LocaleProvider";
import { MobileDock } from "@/components/portfolio/MobileDock";
import { Projects } from "@/components/portfolio/Projects";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { Skills } from "@/components/portfolio/Skills";

function PortfolioShell() {
  const { fading } = useLocale();

  return (
    <div className={fading ? "language-fade" : undefined}>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
      <MobileDock />
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
