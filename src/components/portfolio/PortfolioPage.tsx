"use client";

import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Hero } from "@/components/portfolio/Hero";
import { LocaleProvider, useLocale } from "@/components/portfolio/LocaleProvider";
import { Projects } from "@/components/portfolio/Projects";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteNav } from "@/components/portfolio/SiteNav";
import { Skills } from "@/components/portfolio/Skills";

function PortfolioShell() {
  const { fading } = useLocale();

  return (
    <div className={fading ? "language-fade" : undefined}>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
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
