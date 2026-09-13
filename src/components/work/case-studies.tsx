import { CaseStudyCard } from "./case-study";
import { WorkCatalog } from "./data";

export function CaseStudies() {
  return (
    <section
      className="section page-shell work-section"
      id={WorkCatalog.sectionId}
    >
      <div className="section-heading">
        <p className="section-number">02 / Work</p>
        <h2>
          Selected work,
          <br />
          shipped and live.
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
