import type { Metadata } from "next";
import { Language } from "@/i18n/language";
import { Site } from "@/lib/site";

export class Seo {
  static metadata(): Metadata {
    const copy = Language.copy(Language.defaultLocale);

    return {
      metadataBase: new URL(Site.origin),
      title: {
        default: copy.seo.title,
        template: "%s",
      },
      description: copy.seo.description,
      applicationName: Site.displayName,
      authors: [{ name: Site.displayName, url: Site.canonical }],
      creator: Site.displayName,
      keywords: [
        Site.displayName,
        "web developer",
        "IT specialist",
        "Verona",
        "WordPress",
        "Next.js",
        "automation",
      ],
      alternates: {
        canonical: Site.canonical,
        languages: {
          en: Site.canonical,
          it: Site.canonical,
          fr: Site.canonical,
          "x-default": Site.canonical,
        },
      },
      openGraph: {
        type: "website",
        locale: "en_IE",
        alternateLocale: ["it_IT", "fr_FR"],
        url: Site.canonical,
        siteName: Site.displayName,
        title: copy.seo.ogTitle,
        description: copy.seo.ogDescription,
      },
      twitter: {
        card: "summary_large_image",
        title: copy.seo.ogTitle,
        description: copy.seo.ogDescription,
      },
      robots: {
        index: true,
        follow: true,
      },
      category: "portfolio",
    };
  }
}
