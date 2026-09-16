"use client";

import { useLocale } from "@/components/portfolio/LocaleProvider";

export function About() {
  const { copy } = useLocale();

  return (
    <section id="about">
      <div className="container">
        <div className="about-lead">
          <div>
            <span className="eyebrow">{copy.whatIDo}</span>
            <h2 className="section-title">
              {copy.aboutTitle.lead}
              <span className="gradient-text">{copy.aboutTitle.accent}</span>
            </h2>
          </div>
          <p className="about-copy">{copy.aboutCopy}</p>
        </div>
      </div>
    </section>
  );
}
