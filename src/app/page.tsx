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
import { CaseStudies, WorkCatalog } from "@/components/work";

const navigation = [
  { label: "About", href: "#about" },
  WorkCatalog.navItem,
  { label: "Contact", href: "#contact" },
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
              <a className="button button-primary" href={WorkCatalog.navItem.href}>
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

        <CaseStudies />

        <section className="contact-section" id="contact">
          <div className="page-shell contact-inner">
            <div>
              <p className="section-number">03 / Contact</p>
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
    </>
  );
}
