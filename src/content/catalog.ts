import type { Copy } from "@/content/locale";

export type Feature = {
  key: "wordpress" | "fullstack" | "automation" | "ai";
  title: string;
  body: string;
};

export type ProjectPreview = "kanban" | "map" | "chat";

export type Project = {
  id: "wine" | "iwp" | "exam";
  index: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: readonly string[];
  live: string;
  source: string;
  preview: ProjectPreview;
};

type Particle = {
  x: string;
  y: string;
  size: string;
  duration: string;
  delay: string;
  color: string;
};

export class FeatureCatalog {
  static items(copy: Copy): readonly Feature[] {
    return [
      {
        key: "wordpress",
        title: copy.wpExpert,
        body: "Custom PHP themes, performant builds, and maintainable content systems tailored to real business needs.",
      },
      {
        key: "fullstack",
        title: copy.fullStack,
        body: "Modern React interfaces, robust backends, and scalable data layers built as one cohesive product.",
      },
      {
        key: "automation",
        title: copy.automation,
        body: "Connected workflows with Make.com and Zapier that remove repetitive tasks and accelerate teams.",
      },
      {
        key: "ai",
        title: copy.aiIntegration,
        body: "Useful AI features embedded into products and operations to improve research, content, and decisions.",
      },
    ];
  }
}

export class SkillCatalog {
  static names(): readonly string[] {
    return [
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
  }
}

export class ProjectCatalog {
  static all(): readonly Project[] {
    return [
      {
        id: "wine",
        index: "01",
        category: "PRODUCTIVITY",
        title: "Wine2Digital",
        subtitle: "Project Management Platform",
        description:
          "A focused project workspace for planning, organizing, and shipping collaborative work.",
        tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
        live: "https://pm.wine2digital.com",
        source: "https://github.com/slemo54/wine2digital-pm",
        preview: "kanban",
      },
      {
        id: "iwp",
        index: "02",
        category: "DISCOVERY",
        title: "IWP Directory",
        subtitle: "Interactive Podcast Map",
        description:
          "A geographic discovery experience connecting wine podcast audiences with voices around the world.",
        tags: ["Leaflet", "React", "PostgreSQL", "Express"],
        live: "https://kimi-podcast-map.vercel.app",
        source: "https://github.com/slemo54/wine-podcast-directory",
        preview: "map",
      },
      {
        id: "exam",
        index: "03",
        category: "AI TOOLS",
        title: "Exam Checker AI",
        subtitle: "AI-Powered Exam Evaluation",
        description:
          "An AI tool that evaluates exam answers using computer vision, Supabase, and automated scoring workflows.",
        tags: ["OpenAI Vision", "Supabase", "Vercel"],
        live: "https://openai-exam-checker.vercel.app",
        source: "https://github.com/slemo54/examchecker-ai",
        preview: "chat",
      },
    ];
  }
}

export class Atmosphere {
  static particles(): readonly Particle[] {
    const colors = ["#a5ff66", "#8b5cf6", "#3b82f6", "#ffffff"];

    return Array.from({ length: 18 }, (_, i) => ({
      x: `${4 + ((i * 37) % 92)}%`,
      y: `${10 + ((i * 53) % 80)}%`,
      size: `${2 + (i % 4)}px`,
      duration: `${6 + (i % 7)}s`,
      delay: `${-(i % 9)}s`,
      color: colors[i % colors.length],
    }));
  }
}
