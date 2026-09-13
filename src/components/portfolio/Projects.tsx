"use client";

import { ProjectCatalog, type Project } from "@/content/catalog";
import { Icons } from "@/components/icons";
import { useLocale } from "@/components/portfolio/LocaleProvider";

function ProjectPreview({ project }: { project: Project }) {
  if (project.preview === "map") {
    return (
      <span className="demo-window mini-map">
        <i className="demo-pin" />
        <i className="demo-pin" />
        <i className="demo-pin" />
      </span>
    );
  }

  if (project.preview === "chat") {
    return (
      <span className="demo-window">
        <span className="demo-top">
          <i />
          <i />
          <i />
        </span>
        <span className="chat-demo">
          <span className="chat-bubble">
            Upload your exam paper for instant AI evaluation.
          </span>
          <span className="chat-bubble ai">
            I found 12 answers to review. 9 correct, 3 need revision.
          </span>
          <span className="chat-bubble typing">
            <i />
            <i />
            <i />
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className="demo-window">
      <span className="demo-top">
        <i />
        <i />
        <i />
      </span>
      <span className="kanban">
        <span className="kanban-col">
          <b>BACKLOG</b>
          <i className="kanban-card" />
          <i className="kanban-card" />
        </span>
        <span className="kanban-col">
          <b>IN PROGRESS</b>
          <i className="kanban-card" />
        </span>
        <span className="kanban-col">
          <b>DONE</b>
          <i className="kanban-card" />
          <i className="kanban-card" />
        </span>
      </span>
    </span>
  );
}

export function Projects() {
  const { copy } = useLocale();

  return (
    <section id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <span className="eyebrow">{copy.selectedWork}</span>
            <h2 className="section-title">
              {copy.projectsTitle.lead}
              <span className="gradient-text">{copy.projectsTitle.accent}</span>
            </h2>
          </div>
          <p className="projects-note">{copy.projectsNote}</p>
        </div>
        <div className="project-grid">
          {ProjectCatalog.all().map((project) => (
            <article className="project-card" key={project.id}>
              <a
                className="project-preview"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.live} ${project.title}`}
              >
                <span className="preview-grid" />
                <ProjectPreview project={project} />
              </a>
              <div className="project-content">
                <span className="project-index">
                  {project.index} / {project.category}
                </span>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    className="btn"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.live} ↗
                  </a>
                  <a
                    className="btn"
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.source} {Icons.arrowUpRight({ className: "btn-icon" })}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
