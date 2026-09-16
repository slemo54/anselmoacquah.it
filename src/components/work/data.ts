export type CaseStudy = {
  id: string;
  number: string;
  title: string;
  live: string;
  source: string;
  stack: readonly string[];
};

export class WorkCatalog {
  static readonly sectionId = "work";

  static readonly navItem = {
    label: "Work",
    href: "#work",
  } as const;

  static readonly items: readonly CaseStudy[] = [
    {
      id: "wine2digital",
      number: "01",
      title: "Wine2Digital",
      live: "https://pm.wine2digital.com",
      source: "https://github.com/slemo54/wine2digital-pm",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "iwp-directory",
      number: "02",
      title: "IWP Directory",
      live: "https://kimi-podcast-map.vercel.app",
      source: "https://github.com/slemo54/wine-podcast-directory",
      stack: ["React", "TypeScript", "PostgreSQL", "Express"],
    },
    {
      id: "exam-checker-ai",
      number: "03",
      title: "Exam Checker AI",
      live: "https://openai-exam-checker.vercel.app",
      source: "https://github.com/slemo54/examchecker-ai",
      stack: ["OpenAI Vision", "Next.js", "Vercel"],
    },
  ];

  static hrefProps(href: string) {
    const external = href.startsWith("http");
    return {
      href,
      ...(external
        ? { target: "_blank" as const, rel: "noreferrer" as const }
        : {}),
    };
  }
}
