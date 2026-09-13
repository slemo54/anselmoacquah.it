"use client";

import { SkillCatalog } from "@/content/catalog";
import { useLocale } from "@/components/portfolio/LocaleProvider";

export function Skills() {
  const { copy } = useLocale();

  return (
    <section className="skills" id="skills">
      <div className="container skills-layout">
        <div className="skills-sticky">
          <span className="eyebrow">{copy.toolkit}</span>
          <h2 className="section-title">
            {copy.skillsTitle.lead}
            <span className="gradient-text">{copy.skillsTitle.accent}</span>
          </h2>
          <p>{copy.skillsIntro}</p>
        </div>
        <div className="skill-list" aria-label="Technical skills">
          {SkillCatalog.names().map((skill, index) => (
            <div className="skill-item" key={skill}>
              <span className="skill-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
