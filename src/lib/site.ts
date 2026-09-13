export class Site {
  static readonly displayName = "Anselmo Acquah";
  static readonly role = "Web Developer & IT Specialist";
  static readonly email = "anselmo@anselmoacquah.it";
  static readonly phoneDisplay = "+39 348 292 9483";
  static readonly phoneHref = "tel:+393482929483";
  static readonly linkedin =
    "https://it.linkedin.com/in/anselmo-acquah-185a3a215";
  static readonly github = "https://github.com/slemo54";
  static readonly githubHandle = "@slemo54";
  static readonly origin = "https://www.anselmoacquah.it";
  static readonly canonicalPath = "/portfolio";
  static readonly canonical = `${Site.origin}${Site.canonicalPath}`;
  static readonly city = "Verona";
  static readonly country = "IT";
  static readonly portraitPath = "/portrait.png";
  static readonly linkedinLabel = "Anselmo Acquah";

  static mailto(subject?: string, body?: string) {
    const parts = [];
    if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
    if (body) parts.push(`body=${encodeURIComponent(body)}`);
    return parts.length
      ? `mailto:${Site.email}?${parts.join("&")}`
      : `mailto:${Site.email}`;
  }
}
