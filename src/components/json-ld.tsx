import { Site } from "@/lib/site";

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${Site.canonical}#website`,
        url: Site.canonical,
        name: Site.displayName,
        inLanguage: ["en", "it", "fr"],
      },
      {
        "@type": "Person",
        "@id": `${Site.canonical}#person`,
        name: Site.displayName,
        jobTitle: Site.role,
        email: `mailto:${Site.email}`,
        telephone: Site.phoneDisplay,
        url: Site.canonical,
        image: `${Site.origin}${Site.portraitPath}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: Site.city,
          addressCountry: Site.country,
        },
        sameAs: [Site.linkedin, Site.github],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
