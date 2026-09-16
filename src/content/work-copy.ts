import type { Locale } from "@/content/locale";

export type WorkStudyCopy = {
  subtitle: string;
  problem: string;
  system: string;
  result: string;
};

export type WorkSectionCopy = {
  number: string;
  titleLine1: string;
  titleLine2: string;
  problem: string;
  system: string;
  result: string;
  live: string;
  source: string;
  stackAria: string;
};

type WorkStudyId = "wine2digital" | "iwp-directory" | "exam-checker-ai";

const section: Record<Locale, WorkSectionCopy> = {
  eng: {
    number: "02 / Work",
    titleLine1: "Selected work,",
    titleLine2: "shipped and live.",
    problem: "Problem",
    system: "System",
    result: "Result",
    live: "Live",
    source: "Source",
    stackAria: "{title} stack",
  },
  it: {
    number: "02 / Lavori",
    titleLine1: "Lavori selezionati,",
    titleLine2: "pubblicati e online.",
    problem: "Problema",
    system: "Sistema",
    result: "Risultato",
    live: "Live",
    source: "Codice",
    stackAria: "Stack di {title}",
  },
  fr: {
    number: "02 / Travaux",
    titleLine1: "Travaux choisis,",
    titleLine2: "livrés et en ligne.",
    problem: "Problème",
    system: "Système",
    result: "Résultat",
    live: "Live",
    source: "Code",
    stackAria: "Stack de {title}",
  },
};

const studies: Record<Locale, Record<WorkStudyId, WorkStudyCopy>> = {
  eng: {
    wine2digital: {
      subtitle: "Project workspace",
      problem:
        "Project work needs a single place for status, owners, and deadlines instead of being split across separate chats and files.",
      system:
        "A web project-management workspace with Kanban boards, task assignment, progress tracking, and Google Workspace sign-in. Access is limited to an allowed workspace domain.",
      result:
        "The workspace is live at pm.wine2digital.com. Teams can move work across boards, assign owners, and track delivery in one place. Source is on GitHub.",
    },
    "iwp-directory": {
      subtitle: "Italian Wine Podcast atlas",
      problem:
        "The Italian Wine Podcast archive is large and geographically scattered. Browsing by place is easy to fake if markers are placed without evidence.",
      system:
        "A searchable map of the published archive. Filters cover series, year, and map meaning. A marker is added only when an episode title supports a place, region, country, or editorial association; episodes without geographic evidence stay in the archive and remain searchable.",
      result:
        "The atlas is live at kimi-podcast-map.vercel.app. The full archive stays playable and searchable, with map labels that expose the evidence used. Source is on GitHub.",
    },
    "exam-checker-ai": {
      subtitle: "Answer-sheet evaluation",
      problem:
        "Marking multiple-choice answer sheets by hand is slow and easy to miscount, especially when the work arrives as scans rather than a digital form.",
      system:
        "A browser MVP that stores an answer key, accepts uploaded sheets, and scores them with OpenAI Vision. A review queue surfaces blanks, ambiguous marks, and low scores. The API key stays in the browser; exam data is stored locally until a backend is connected.",
      result:
        "The MVP is live at openai-exam-checker.vercel.app. It can create an exam, score submissions, export CSV, and open a review queue. Source is on GitHub.",
    },
  },
  it: {
    wine2digital: {
      subtitle: "Spazio di progetto",
      problem:
        "Il lavoro di progetto ha bisogno di un unico posto per stato, responsabili e scadenze, invece di restare sparso tra chat e file separati.",
      system:
        "Uno spazio web di project management con bacheche Kanban, assegnazione attività, monitoraggio avanzamento e accesso con Google Workspace. L’accesso è limitato a un dominio workspace autorizzato.",
      result:
        "Lo spazio è online su pm.wine2digital.com. I team possono spostare il lavoro tra le bacheche, assegnare responsabili e seguire le consegne in un solo posto. Il codice è su GitHub.",
    },
    "iwp-directory": {
      subtitle: "Atlante Italian Wine Podcast",
      problem:
        "L’archivio Italian Wine Podcast è ampio e geograficamente disperso. Esplorare per luogo è facile da falsificare se i marker vengono piazzati senza prove.",
      system:
        "Una mappa ricercabile dell’archivio pubblicato. I filtri coprono serie, anno e significato della mappa. Un marker viene aggiunto solo quando il titolo di un episodio supporta un luogo, una regione, un paese o un’associazione editoriale; gli episodi senza evidenza geografica restano nell’archivio e restano ricercabili.",
      result:
        "L’atlante è online su kimi-podcast-map.vercel.app. L’archivio completo resta ascoltabile e ricercabile, con etichette che mostrano l’evidenza usata. Il codice è su GitHub.",
    },
    "exam-checker-ai": {
      subtitle: "Valutazione di moduli d’esame",
      problem:
        "Correggere a mano fogli a scelta multipla è lento e facile da sbagliare, soprattutto quando arrivano come scansioni e non come modulo digitale.",
      system:
        "Un MVP nel browser che conserva la chiave di risposta, accetta fogli caricati e li valuta con OpenAI Vision. Una coda di revisione evidenzia vuoti, segni ambigui e punteggi bassi. La chiave API resta nel browser; i dati d’esame restano locali finché non si collega un backend.",
      result:
        "L’MVP è online su openai-exam-checker.vercel.app. Può creare un esame, valutare le consegne, esportare CSV e aprire una coda di revisione. Il codice è su GitHub.",
    },
  },
  fr: {
    wine2digital: {
      subtitle: "Espace de projet",
      problem:
        "Le travail de projet a besoin d’un seul endroit pour le statut, les responsables et les échéances, au lieu d’être dispersé entre chats et fichiers séparés.",
      system:
        "Un espace web de gestion de projet avec tableaux Kanban, attribution des tâches, suivi d’avancement et connexion Google Workspace. L’accès est limité à un domaine workspace autorisé.",
      result:
        "L’espace est en ligne sur pm.wine2digital.com. Les équipes peuvent déplacer le travail entre les tableaux, assigner des responsables et suivre les livraisons au même endroit. Le code est sur GitHub.",
    },
    "iwp-directory": {
      subtitle: "Atlas Italian Wine Podcast",
      problem:
        "Les archives Italian Wine Podcast sont vastes et géographiquement dispersées. Explorer par lieu est facile à falsifier si les marqueurs sont placés sans preuve.",
      system:
        "Une carte consultable des archives publiées. Les filtres couvrent la série, l’année et le sens de la carte. Un marqueur n’est ajouté que lorsqu’un titre d’épisode soutient un lieu, une région, un pays ou une association éditoriale ; les épisodes sans évidence géographique restent dans les archives et restent recherchables.",
      result:
        "L’atlas est en ligne sur kimi-podcast-map.vercel.app. Les archives complètes restent écoutables et recherchables, avec des libellés qui exposent l’évidence utilisée. Le code est sur GitHub.",
    },
    "exam-checker-ai": {
      subtitle: "Évaluation de copies",
      problem:
        "Corriger à la main des QCM est lent et facile à mal compter, surtout lorsque le travail arrive en scans plutôt qu’en formulaire numérique.",
      system:
        "Un MVP navigateur qui stocke une clé de réponses, accepte des feuilles téléversées et les note avec OpenAI Vision. Une file de revue signale les blancs, les marques ambiguës et les notes basses. La clé API reste dans le navigateur ; les données d’examen restent locales jusqu’à la connexion d’un backend.",
      result:
        "Le MVP est en ligne sur openai-exam-checker.vercel.app. Il peut créer un examen, noter les soumissions, exporter en CSV et ouvrir une file de revue. Le code est sur GitHub.",
    },
  },
};

export class WorkCopy {
  static isStudyId(id: string): id is WorkStudyId {
    return (
      id === "wine2digital" ||
      id === "iwp-directory" ||
      id === "exam-checker-ai"
    );
  }

  static section(locale: Locale): WorkSectionCopy {
    return section[locale] ?? section.eng;
  }

  static study(locale: Locale, id: string): WorkStudyCopy {
    const pack = studies[locale] ?? studies.eng;
    if (WorkCopy.isStudyId(id)) return pack[id];
    return studies.eng.wine2digital;
  }

  static stackAria(locale: Locale, title: string): string {
    return WorkCopy.section(locale).stackAria.replace("{title}", title);
  }
}
