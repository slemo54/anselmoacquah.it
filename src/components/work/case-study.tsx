"use client";

import { Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";
import { WorkCopy } from "@/content/work-copy";
import { WorkCatalog, type CaseStudy } from "./data";

type CaseStudyCardProps = {
  study: CaseStudy;
};

function CaseStudyField({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="case-study-field">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const { locale } = useLocale();
  const chrome = WorkCopy.section(locale);
  const copy = WorkCopy.study(locale, study.id);

  return (
    <article className="case-study" id={study.id}>
      <header className="case-study-header">
        <span className="case-study-number">{study.number}</span>
        <h3>{study.title}</h3>
        <p className="case-study-subtitle">{copy.subtitle}</p>
      </header>

      <dl className="case-study-body">
        <CaseStudyField label={chrome.problem}>{copy.problem}</CaseStudyField>
        <CaseStudyField label={chrome.system}>{copy.system}</CaseStudyField>
        <CaseStudyField label={chrome.result}>{copy.result}</CaseStudyField>
      </dl>

      <div className="case-study-footer">
        <div className="case-study-links">
          <a className="case-study-link" {...WorkCatalog.hrefProps(study.live)}>
            {chrome.live} {Icons.arrowUpRight({ width: 16, height: 16 })}
          </a>
          <a
            className="case-study-link"
            {...WorkCatalog.hrefProps(study.source)}
          >
            {Icons.github({ width: 16, height: 16 })} {chrome.source}
          </a>
        </div>
        <ul aria-label={WorkCopy.stackAria(locale, study.title)}>
          {study.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
