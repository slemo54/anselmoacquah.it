import { Icons } from "@/components/icons";
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
  return (
    <article className="case-study" id={study.id}>
      <header className="case-study-header">
        <span className="case-study-number">{study.number}</span>
        <h3>{study.title}</h3>
        <p className="case-study-subtitle">{study.subtitle}</p>
      </header>

      <dl className="case-study-body">
        <CaseStudyField label="Problem">{study.problem}</CaseStudyField>
        <CaseStudyField label="System">{study.system}</CaseStudyField>
        <CaseStudyField label="Result">{study.result}</CaseStudyField>
      </dl>

      <div className="case-study-footer">
        <div className="case-study-links">
          <a className="case-study-link" {...WorkCatalog.hrefProps(study.live)}>
            Live {Icons.arrowUpRight({ width: 16, height: 16 })}
          </a>
          <a
            className="case-study-link"
            {...WorkCatalog.hrefProps(study.source)}
          >
            {Icons.github({ width: 16, height: 16 })} Source
          </a>
        </div>
        <ul aria-label={`${study.title} stack`}>
          {study.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
