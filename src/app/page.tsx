import type { ReactNode } from "react";
import {
  ArrowUpRightIcon,
  CodeIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
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
    title: "Italian Wine Academy",
    description:
      "Supporting a high-traffic education platform with WordPress and WooCommerce—from content architecture to dependable day-to-day site operations.",
    tags: ["WordPress", "WooCommerce", "Web Operations"],
  },
  {
    number: "02",
    title: "Italian Wine Podcast",
    description:
      "Keeping a global media platform moving through structured publishing workflows, content operations, and thoughtful digital execution.",
    tags: ["Content Ops", "Automation", "Publishing"],
  },
  {
    number: "03",
    title: "Client websites",
    description:
      "Designing and building focused, responsive websites that give businesses a polished online presence and remain simple to manage.",
    tags: ["Web Design", "Development", "SEO"],
  },
  {
    number: "04",
    title: "Personal projects",
    description:
      "Exploring modern web tools through practical builds, integrations, and automations that turn ideas into useful digital products.",
    tags: ["Next.js", "Supabase", "AI"],
  },
];

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

export default function Home() {
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
              <a className="button button-primary" href="#experience">
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

        <section className="section page-shell" id="about">
          <div className="section-heading">
            <p className="section-number">01 / About</p>
            <h2>Technology that works<br />for people.</h2>
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

        <section className="section page-shell skills-section" id="skills">
          <div className="section-heading">
            <p className="section-number">02 / Skills</p>
            <h2>Tools I use to<br />make things happen.</h2>
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

        <section className="section page-shell projects-section" id="experience">
          <div className="section-heading">
            <p className="section-number">03 / Experience</p>
            <h2>Selected work &amp;<br />ongoing projects.</h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <span className="project-number">{project.number}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-shell contact-inner">
            <div>
              <p className="section-number">04 / Contact</p>
              <h2>Have a project in mind?<br /><span>Let&apos;s build it.</span></h2>
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
    </>
  );
}
