export type CaseStudy = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  problem: string;
  system: string;
  result: string;
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
      subtitle: "Project workspace",
      problem:
        "Project work needs a single place for status, owners, and deadlines instead of being split across separate chats and files.",
      system:
        "A web project-management workspace with Kanban boards, task assignment, progress tracking, and Google Workspace sign-in. Access is limited to an allowed workspace domain.",
      result:
        "The workspace is live at pm.wine2digital.com. Teams can move work across boards, assign owners, and track delivery in one place. Source is on GitHub.",
      live: "https://pm.wine2digital.com",
      source: "https://github.com/slemo54/wine2digital-pm",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "iwp-directory",
      number: "02",
      title: "IWP Directory",
      subtitle: "Italian Wine Podcast atlas",
      problem:
        "The Italian Wine Podcast archive is large and geographically scattered. Browsing by place is easy to fake if markers are placed without evidence.",
      system:
        "A searchable map of the published archive. Filters cover series, year, and map meaning. A marker is added only when an episode title supports a place, region, country, or editorial association; episodes without geographic evidence stay in the archive and remain searchable.",
      result:
        "The atlas is live at kimi-podcast-map.vercel.app. The full archive stays playable and searchable, with map labels that expose the evidence used. Source is on GitHub.",
      live: "https://kimi-podcast-map.vercel.app",
      source: "https://github.com/slemo54/wine-podcast-directory",
      stack: ["React", "TypeScript", "PostgreSQL", "Express"],
    },
    {
      id: "exam-checker-ai",
      number: "03",
      title: "Exam Checker AI",
      subtitle: "Answer-sheet evaluation",
      problem:
        "Marking multiple-choice answer sheets by hand is slow and easy to miscount, especially when the work arrives as scans rather than a digital form.",
      system:
        "A browser MVP that stores an answer key, accepts uploaded sheets, and scores them with OpenAI Vision. A review queue surfaces blanks, ambiguous marks, and low scores. The API key stays in the browser; exam data is stored locally until a backend is connected.",
      result:
        "The MVP is live at openai-exam-checker.vercel.app. It can create an exam, score submissions, export CSV, and open a review queue. Source is on GitHub.",
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
