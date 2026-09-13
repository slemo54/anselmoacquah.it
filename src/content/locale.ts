export type Locale = "eng" | "it" | "fr";

export type TitleCopy = {
  lead: string;
  accent: string;
};

export type Copy = {
  available: string;
  specialist: string;
  heroBack: string;
  heroIntro: string;
  viewProjects: string;
  getInTouch: string;
  scroll: string;
  whatIDo: string;
  aboutTitle: TitleCopy;
  aboutCopy: string;
  wpExpert: string;
  fullStack: string;
  automation: string;
  aiIntegration: string;
  toolkit: string;
  skillsTitle: TitleCopy;
  skillsIntro: string;
  selectedWork: string;
  projectsTitle: TitleCopy;
  projectsNote: string;
  live: string;
  source: string;
  startConversation: string;
  contactTitle: TitleCopy;
  heyName: string;
  from: string;
  discuss: string;
  reach: string;
  collaboration: string;
  potential: string;
  freelance: string;
  hi: string;
  sendIntro: string;
  namePlaceholder: string;
  locationPlaceholder: string;
  emailPlaceholder: string;
  formStatus: string;
  languageGroup: string;
  footerNote: string;
};

const catalog: Record<Locale, Copy> = {
  eng: {
    available: "Available for work",
    specialist: "IT Specialist",
    heroBack: "DEVELOPER",
    heroIntro:
      "I build reliable digital products, intelligent automations, and web experiences that make complex work feel effortless.",
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
    scroll: "Scroll",
    whatIDo: "What I do",
    aboutTitle: { lead: "Ideas into ", accent: "impact." },
    aboutCopy:
      "I’m Anselmo Acquah, a Web Developer & IT Specialist combining full-stack engineering with practical automation. From WordPress platforms to AI-enhanced workflows, I focus on thoughtful systems that perform.",
    wpExpert: "WordPress Expert",
    fullStack: "Full-Stack Dev",
    automation: "Automation",
    aiIntegration: "AI Integration",
    toolkit: "Technical toolkit",
    skillsTitle: { lead: "Built with ", accent: "range." },
    skillsIntro:
      "A practical, evolving stack for taking products from idea to production—without losing sight of clarity, performance, or the people using them.",
    selectedWork: "Selected work",
    projectsTitle: { lead: "Projects with ", accent: "purpose." },
    projectsNote: "Open a live build or the public source. No placeholder URLs.",
    live: "Live",
    source: "Source",
    startConversation: "Start a conversation",
    contactTitle: { lead: "Have something in ", accent: "mind?" },
    heyName: "Hey, my name is",
    from: "and I am from",
    discuss: "I would like to discuss",
    reach: "You can reach me at",
    collaboration: "Collaboration",
    potential: "Potential Project",
    freelance: "Freelance Work",
    hi: "Just Saying Hi",
    sendIntro: "Send introduction",
    namePlaceholder: "your name",
    locationPlaceholder: "your location",
    emailPlaceholder: "your@email.com",
    formStatus: "Opening your email app…",
    languageGroup: "Language",
    footerNote: "Designed & built with care in Verona.",
  },
  it: {
    available: "Disponibile per lavoro",
    specialist: "Specialista IT",
    heroBack: "SVILUPPATORE",
    heroIntro:
      "Creo prodotti digitali affidabili, automazioni intelligenti ed esperienze web che rendono semplice il lavoro complesso.",
    viewProjects: "Vedi Progetti",
    getInTouch: "Contattami",
    scroll: "Scorri",
    whatIDo: "Cosa faccio",
    aboutTitle: { lead: "Dalle idee all’", accent: "impatto." },
    aboutCopy:
      "Sono Anselmo Acquah, sviluppatore web e specialista IT che combina ingegneria full-stack con automazione pratica. Dalle piattaforme WordPress ai flussi di lavoro potenziati dall'AI, mi concentro su sistemi pensati che funzionano.",
    wpExpert: "Esperto WordPress",
    fullStack: "Sviluppatore Full-Stack",
    automation: "Automazione",
    aiIntegration: "Integrazione AI",
    toolkit: "Competenze tecniche",
    skillsTitle: { lead: "Costruito con ", accent: "versatilità." },
    skillsIntro:
      "Uno stack pratico e in evoluzione per portare i prodotti dall'idea alla produzione—senza perdere di vista chiarezza, prestazioni o le persone che li usano.",
    selectedWork: "Progetti selezionati",
    projectsTitle: { lead: "Progetti con uno ", accent: "scopo." },
    projectsNote:
      "Apri una build live o il codice pubblico. Nessun URL inventato.",
    live: "Live",
    source: "Codice",
    startConversation: "Inizia una conversazione",
    contactTitle: { lead: "Hai qualcosa in ", accent: "mente?" },
    heyName: "Ciao, mi chiamo",
    from: "e vengo da",
    discuss: "vorrei discutere di",
    reach: "Puoi contattarmi a",
    collaboration: "Collaborazione",
    potential: "Progetto Potenziale",
    freelance: "Lavoro Freelance",
    hi: "Solo un Saluto",
    sendIntro: "Invia presentazione",
    namePlaceholder: "il tuo nome",
    locationPlaceholder: "la tua città",
    emailPlaceholder: "tua@email.com",
    formStatus: "Apertura dell’app di posta…",
    languageGroup: "Lingua",
    footerNote: "Progettato e realizzato con cura a Verona.",
  },
  fr: {
    available: "Disponible pour travail",
    specialist: "Spécialiste IT",
    heroBack: "DÉVELOPPEUR",
    heroIntro:
      "Je crée des produits numériques fiables, des automatisations intelligentes et des expériences web qui simplifient le travail complexe.",
    viewProjects: "Voir Projets",
    getInTouch: "Me Contacter",
    scroll: "Défiler",
    whatIDo: "Ce que je fais",
    aboutTitle: { lead: "Des idées à l’", accent: "impact." },
    aboutCopy:
      "Je suis Anselmo Acquah, développeur web et spécialiste IT alliant ingénierie full-stack et automatisation pratique. Des plateformes WordPress aux flux de travail augmentés par l'IA, je me concentre sur des systèmes réfléchis et performants.",
    wpExpert: "Expert WordPress",
    fullStack: "Développeur Full-Stack",
    automation: "Automatisation",
    aiIntegration: "Intégration IA",
    toolkit: "Compétences techniques",
    skillsTitle: { lead: "Construit avec ", accent: "polyvalence." },
    skillsIntro:
      "Une stack pratique et évolutive pour passer de l’idée à la production—sans perdre de vue la clarté, la performance, ni les personnes qui l’utilisent.",
    selectedWork: "Projets sélectionnés",
    projectsTitle: { lead: "Des projets avec un ", accent: "but." },
    projectsNote:
      "Ouvrez une démo live ou le code public. Aucune URL inventée.",
    live: "Live",
    source: "Code",
    startConversation: "Lancer une conversation",
    contactTitle: { lead: "Vous avez un projet en ", accent: "tête ?" },
    heyName: "Salut, je m’appelle",
    from: "et je viens de",
    discuss: "je voudrais discuter de",
    reach: "Vous pouvez me joindre à",
    collaboration: "Collaboration",
    potential: "Projet Potentiel",
    freelance: "Travail Freelance",
    hi: "Dire Bonjour",
    sendIntro: "Envoyer présentation",
    namePlaceholder: "votre nom",
    locationPlaceholder: "votre ville",
    emailPlaceholder: "vous@email.com",
    formStatus: "Ouverture de votre messagerie…",
    languageGroup: "Langue",
    footerNote: "Conçu et réalisé avec soin à Vérone.",
  },
};

export class LocaleCopy {
  static readonly defaultLocale: Locale = "eng";
  static readonly storageKey = "portfolio-language";
  static readonly all: readonly Locale[] = ["it", "fr", "eng"];

  static isLocale(value: string | null | undefined): value is Locale {
    return value === "eng" || value === "it" || value === "fr";
  }

  static htmlLang(locale: Locale): string {
    return locale === "eng" ? "en" : locale;
  }

  static of(locale: Locale): Copy {
    return catalog[locale] ?? catalog.eng;
  }

  static readStored(): Locale {
    if (typeof window === "undefined") {
      return LocaleCopy.defaultLocale;
    }

    const stored = window.localStorage.getItem(LocaleCopy.storageKey);
    return LocaleCopy.isLocale(stored) ? stored : LocaleCopy.defaultLocale;
  }

  static persist(locale: Locale): void {
    window.localStorage.setItem(LocaleCopy.storageKey, locale);
  }
}
