"use client";

import { useLocale } from "@/components/portfolio/LocaleProvider";
import { WorkCopy } from "@/content/work-copy";
import { CaseStudyCard } from "./case-study";
import { WorkCatalog } from "./data";

export function CaseStudies() {
  const { locale } = useLocale();
  const chrome = WorkCopy.section(locale);

  return (
    <section
      className="section page-shell work-section"
      id={WorkCatalog.sectionId}
    >
      <div className="section-heading">
        <p className="section-number">{chrome.number}</p>
        <h2>
          {chrome.titleLine1}
          <br />
          {chrome.titleLine2}
        </h2>
      </div>
      <div className="case-study-list">
        {WorkCatalog.items.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
