export class SiteIdentity {
  static readonly displayName = "Anselmo Acquah";
  static readonly publicPath = "/portfolio";
  static readonly portraitSrc = "/portrait.png";
  static readonly portraitAlt = "Anselmo Acquah — Web Developer";
  static readonly origin = "https://anselmoacquah.it";
}

export class ContactChannels {
  static readonly email = "anselmo@anselmoacquah.it";
  static readonly phone = "+393482929483";
  static readonly phoneDisplay = "+39 348 292 9483";
  static readonly linkedin =
    "https://it.linkedin.com/in/anselmo-acquah-185a3a215";
  static readonly github = "https://github.com/slemo54";
  static readonly githubHandle = "@slemo54";
  static readonly location = "Verona, Italy";

  static introductionMailto(input: {
    name: string;
    location: string;
    topic: string;
    replyTo: string;
  }): string {
    const subject = encodeURIComponent(
      `${input.topic} inquiry from ${input.name}`,
    );
    const body = encodeURIComponent(
      [
        "Hey Anselmo,",
        "",
        `My name is ${input.name} and I am from ${input.location}.`,
        `I would like to discuss: ${input.topic}.`,
        "",
        `You can reach me at ${input.replyTo}.`,
      ].join("\n"),
    );

    return `mailto:${ContactChannels.email}?subject=${subject}&body=${body}`;
  }
}
