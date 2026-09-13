import type { Locale } from "@/content/locale";

export type HeroNavCopyShape = {
  skip: string;
  navHome: string;
  navAbout: string;
  navSkills: string;
  navProjects: string;
  navContact: string;
  navDock: string;
  available: string;
  language: string;
  headlineLine1: string;
  headlineLine2: string;
  lede: string;
  role: string;
  location: string;
  viewWork: string;
  getInTouch: string;
  portraitAlt: string;
};

export class HeroNavCopy {
  static readonly dictionary: Record<Locale, HeroNavCopyShape> = {
    eng: {
      skip: "Skip to content",
      navHome: "Home",
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Work",
      navContact: "Contact",
      navDock: "Mobile navigation",
      available: "Available for work",
      language: "Language",
      headlineLine1: "Anselmo",
      headlineLine2: "Acquah",
      lede: "I build digital systems that make complex work feel effortless.",
      role: "Web developer & IT specialist",
      location: "Verona, Italy",
      viewWork: "View work",
      getInTouch: "Get in touch",
      portraitAlt:
        "Portrait of Anselmo Acquah, web developer and IT specialist based in Verona, Italy",
    },
    it: {
      skip: "Salta al contenuto",
      navHome: "Home",
      navAbout: "Chi sono",
      navSkills: "Competenze",
      navProjects: "Lavori",
      navContact: "Contatti",
      navDock: "Navigazione mobile",
      available: "Disponibile per lavoro",
      language: "Lingua",
      headlineLine1: "Anselmo",
      headlineLine2: "Acquah",
      lede: "Creo sistemi digitali che rendono semplice il lavoro complesso.",
      role: "Sviluppatore web e specialista IT",
      location: "Verona, Italia",
      viewWork: "Vedi i lavori",
      getInTouch: "Contattami",
      portraitAlt:
        "Ritratto di Anselmo Acquah, sviluppatore web e specialista IT a Verona, Italia",
    },
    fr: {
      skip: "Aller au contenu",
      navHome: "Accueil",
      navAbout: "À propos",
      navSkills: "Compétences",
      navProjects: "Travaux",
      navContact: "Contact",
      navDock: "Navigation mobile",
      available: "Disponible pour travailler",
      language: "Langue",
      headlineLine1: "Anselmo",
      headlineLine2: "Acquah",
      lede: "Je conçois des systèmes numériques qui rendent le travail complexe fluide.",
      role: "Développeur web et spécialiste IT",
      location: "Vérone, Italie",
      viewWork: "Voir les travaux",
      getInTouch: "Me contacter",
      portraitAlt:
        "Portrait d'Anselmo Acquah, développeur web et spécialiste IT à Vérone, Italie",
    },
  };

  static of(lang: Locale): HeroNavCopyShape {
    return this.dictionary[lang] ?? this.dictionary.eng;
  }
}
