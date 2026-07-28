"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowUpRightIcon,
  CodeIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

/* ─── data ─── */

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  "WordPress / PHP",
  "React / Next.js",
  "Tailwind CSS",
  "SQL / PostgreSQL",
  "Supabase / Firebase",
  "Make.com / Zapier",
  "Git / GitHub",
  "Vercel / GCP",
  "AI tools integration",
];

const projects = [
  {
    number: "01",
    title: "Wine2Digital",
    subtitle: "Project Management Platform",
    description:
      "Full-stack web application with Kanban boards, task tracking, and collaboration workflows. Built for wine-industry teams managing complex editorial and production pipelines.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    live: "https://nextjsspace-topaz.vercel.app",
    repo: "https://github.com/slemo54/wine2digital-pm",
    preview: "kanban",
  },
  {
    number: "02",
    title: "IWP Directory",
    subtitle: "Interactive Podcast Map",
    description:
      "Interactive directory of Italian wine podcasts built with Leaflet. Features marker clustering, keyword filters, and location-based exploration across regions and topics.",
    tags: ["Leaflet", "React", "PostgreSQL", "Express"],
    live: null,
    repo: "https://github.com/slemo54/wine-podcast-directory",
    preview: "map",
  },
  {
    number: "03",
    title: "AI News Research",
    subtitle: "Wine Intelligence Assistant",
    description:
      "Internal research workflow powered by Claude AI. Supports source evaluation, content discovery, and editorial preparation — turning scattered wine-industry signals into structured briefings.",
    tags: ["Claude AI", "Make.com", "Automation", "Research"],
    live: null,
    repo: "https://github.com/slemo54/ai-social-automation",
    preview: "chat",
  },
];

/* ─── preview components ─── */

function KanbanPreview() {
  const cols = [
    {
      label: "To Do",
      cards: ["API endpoints", "User auth", "CSV import"],
    },
    {
      label: "In Progress",
      cards: ["Kanban view", "Drag & drop"],
    },
    {
      label: "Done",
      cards: ["Project setup", "DB schema", "Deploy"],
    },
  ];
  return (
    <div className="preview-kanban">
      {cols.map((col) => (
        <div key={col.label} className="preview-kanban-col">
          <span>{col.label}</span>
          {col.cards.map((c) => (
            <div key={c} className="preview-kanban-card">
              {c}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function MapPreview() {
  const pins = [
    { left: "22%", top: "35%", delay: "0s" },
    { left: "38%", top: "28%", delay: "0.15s" },
    { left: "55%", top: "42%", delay: "0.3s" },
    { left: "70%", top: "55%", delay: "0.45s" },
    { left: "45%", top: "60%", delay: "0.6s" },
  ];
  return (
    <div className="preview-map">
      <div className="preview-map-grid" />
      <div className="preview-map-search">
        <span>🔍</span> Search podcasts...
      </div>
      {pins.map((p, i) => (
        <div
          key={i}
          className="preview-map-pin"
          style={{ left: p.left, top: p.top, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="preview-chat">
      <div className="preview-chat-msg user">
        Find recent coverage on natural wine trends in Europe.
      </div>
      <div className="preview-chat-msg ai">
        <span className="preview-chat-avatar">AI</span>
        <div>
          I found <strong>12 relevant sources</strong> across 4 publications.
          Top match: Wine Spectator&apos;s Q3 analysis on biodynamic viticulture
          in Burgundy and Piedmont…
          <span className="preview-chat-typing" />
        </div>
      </div>
    </div>
  );
}

const previewMap: Record<string, () => ReactNode> = {
  kanban: KanbanPreview,
  map: MapPreview,
  chat: ChatPreview,
};

/* ─── project modal ─── */

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{project.title}</h3>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {project.live ? (
          <div className="modal-embed">
            <div className="modal-embed-bar">
              <span className="modal-embed-dot" />
              <span className="modal-embed-dot" />
              <span className="modal-embed-dot" />
              <span className="modal-embed-url">{project.live}</span>
            </div>
            <iframe
              src={project.live}
              title={project.title}
              className="modal-iframe"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="modal-placeholder">
            {(() => {
              const Preview = previewMap[project.preview];
              return Preview ? <Preview /> : null;
            })()}
            <p className="modal-placeholder-text">
              Live demo available on request — source code on GitHub.
            </p>
          </div>
        )}

        <div className="modal-actions">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Open live <ArrowUpRightIcon />
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="button button-secondary"
          >
            <GithubIcon /> Source code
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── contact link ─── */

type ContactLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
};

function ContactLink({ href, icon, label, value }: ContactLinkProps) {
  const external = href.startsWith("http");

  return (
    <a
      className="contact-link group"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="contact-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="contact-label">{label}</span>
        <span className="contact-value">{value}</span>
      </span>
      <ArrowUpRightIcon className="contact-arrow" />
    </a>
  );
}

/* ─── page ─── */

export default function Home() {
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[number] | null
  >(null);

  return (
    <>
      <header className="site-header">
        <nav className="page-shell nav-inner" aria-label="Main navigation">
          <a className="logo" href="#top" aria-label="Anselmo Acquah, home">
            AA<span>.</span>
          </a>
          <div className="nav-links">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#contact">
            Let&apos;s talk
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ─── Hero ─── */}
        <section className="hero page-shell" aria-labelledby="hero-heading">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">
              <span className="status-dot" />
              Available for new opportunities
            </p>
            <h1 id="hero-heading">
              Anselmo
              <br />
              <span>Acquah.</span>
            </h1>
            <p className="hero-role">Web Developer &amp; IT Specialist</p>
            <p className="hero-copy">
              I build reliable digital experiences and smarter workflows—where
              thoughtful web development meets practical IT.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View my work <ArrowUpRightIcon />
              </a>
              <a className="button button-secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
          <div className="hero-aside">
            <div className="location-card">
              <MapPinIcon />
              <div>
                <span>Based in</span>
                <strong>Verona, Italy</strong>
              </div>
            </div>
            <div className="code-card" aria-hidden="true">
              <div className="code-bar">
                <i />
                <i />
                <i />
              </div>
              <pre>
                <code>
                  <span>const</span> developer = {"{"}
                  {"\n  "}focus: <b>&quot;useful work&quot;</b>,
                  {"\n  "}approach: <b>&quot;keep it simple&quot;</b>,
                  {"\n  "}status: <b>&quot;always learning&quot;</b>
                  {"\n"}
                  {"}"};
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ─── About ─── */}
        <section className="section page-shell" id="about">
          <div className="section-heading">
            <p className="section-number">01 / About</p>
            <h2>
              Technology that works
              <br />
              for people.
            </h2>
          </div>
          <div className="about-copy">
            <p>
              I&apos;m a web developer and IT specialist focused on building
              digital solutions that are clear, dependable, and easy to use.
            </p>
            <p>
              My experience spans <strong>WordPress development</strong>,
              hands-on IT operations, and workflow automation. I enjoy moving
              between code and real-world problem solving—whether that means
              launching a website, improving a process, or connecting the tools
              that keep a team productive.
            </p>
            <div className="about-detail">
              <CodeIcon />
              <span>Development, operations, and automation—connected.</span>
            </div>
          </div>
        </section>

        {/* ─── Skills ─── */}
        <section className="section page-shell skills-section" id="skills">
          <div className="section-heading">
            <p className="section-number">02 / Skills</p>
            <h2>
              Tools I use to
              <br />
              make things happen.
            </h2>
          </div>
          <div className="skill-grid">
            {skills.map((skill, index) => (
              <div className="skill-item" key={skill}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Projects ─── */}
        <section
          className="section page-shell projects-section"
          id="projects"
        >
          <div className="section-heading">
            <p className="section-number">03 / Projects</p>
            <h2>
              Selected work &amp;
              <br />
              ongoing builds.
            </h2>
          </div>
          <div className="project-list">
            {projects.map((project) => {
              const Preview = previewMap[project.preview];
              return (
                <article className="project-card" key={project.title}>
                  <button
                    className="project-preview"
                    onClick={() => setActiveProject(project)}
                    aria-label={`Open ${project.title} preview`}
                  >
                    {Preview ? <Preview /> : null}
                    <span className="project-preview-overlay">
                      <span>View project</span>
                    </span>
                  </button>
                  <div className="project-body">
                    <span className="project-number">{project.number}</span>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p>{project.description}</p>
                    <ul aria-label={`${project.title} technologies`}>
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                        >
                          Live <ArrowUpRightIcon />
                        </a>
                      )}
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        <GithubIcon /> Source
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section className="contact-section" id="contact">
          <div className="page-shell contact-inner">
            <div>
              <p className="section-number">04 / Contact</p>
              <h2>
                Have a project in mind?
                <br />
                <span>Let&apos;s build it.</span>
              </h2>
              <p className="contact-intro">
                I&apos;m always open to interesting work, collaborations, and
                conversations about technology.
              </p>
            </div>
            <div className="contact-list">
              <ContactLink
                href="mailto:anselmo.acquah54@gmail.com"
                icon={<MailIcon />}
                label="Email"
                value="anselmo.acquah54@gmail.com"
              />
              <ContactLink
                href="tel:+393482929483"
                icon={<PhoneIcon />}
                label="Phone"
                value="+39 348 292 9483"
              />
              <ContactLink
                href="https://it.linkedin.com/in/anselmo-acquah-185a3a215"
                icon={<LinkedinIcon />}
                label="LinkedIn"
                value="Anselmo Acquah"
              />
              <ContactLink
                href="https://github.com/slemo54"
                icon={<GithubIcon />}
                label="GitHub"
                value="@slemo54"
              />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-shell footer-inner">
          <p>© 2026 Anselmo Acquah</p>
          <p>Designed &amp; built with care in Verona.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
