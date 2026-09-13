"use client";

import { FeatureCatalog } from "@/content/catalog";
import { FeatureIconMap, Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";

export function About() {
  const { copy } = useLocale();
  const features = FeatureCatalog.items(copy);

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
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.key}>
              <div className="feature-icon">
                {FeatureIconMap.render(feature.key)}
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            </article>
          ))}
          <div className="grid-star" aria-hidden="true">
            {Icons.star()}
          </div>
        </div>
      </div>
    </section>
  );
}
