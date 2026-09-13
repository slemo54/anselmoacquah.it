import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults: IconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export class Icons {
  static arrowUpRight(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    );
  }

  static arrowRight(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }

  static chevronDown(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  }

  static chevronUp(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="m6 15 6-6 6 6" />
      </svg>
    );
  }

  static mail(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  static phone(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" />
      </svg>
    );
  }

  static linkedin(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a5 5 0 0 1 2-2Z" />
        <path d="M2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  static github(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.2 3 5.4 5.4 0 0 0 19 0s-1.2-.4-4 1.5a14 14 0 0 0-7 0C5.2-.4 4 0 4 0a5.4 5.4 0 0 0-.2 3A5.8 5.8 0 0 0 2.2 7c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 8 18v4" />
        <path d="M8 19c-3 .9-3-1.5-4-2" />
      </svg>
    );
  }

  static home(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </svg>
    );
  }

  static compass(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }

  static person(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19.2c.8-3.2 3.4-5 7-5s6.2 1.8 7 5" />
      </svg>
    );
  }

  static grid(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <rect x="3" y="4" width="8" height="7" rx="2" />
        <rect x="13" y="4" width="8" height="7" rx="2" />
        <rect x="3" y="13" width="8" height="7" rx="2" />
        <rect x="13" y="13" width="8" height="7" rx="2" />
      </svg>
    );
  }

  static chat(props: IconProps = {}) {
    return (
      <svg {...defaults} {...props}>
        <path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7.7 7.7 0 0 1 3 12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8v1" />
        <path d="M8 11h8M8 14h5" />
      </svg>
    );
  }

  static wordpress(props: IconProps = {}) {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props} aria-hidden>
        <circle cx="24" cy="24" r="19" />
        <path d="M12 18h24M17 12l7 24 7-24M12 29h24" />
      </svg>
    );
  }

  static code(props: IconProps = {}) {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props} aria-hidden>
        <path d="m18 14-10 10 10 10M30 14l10 10-10 10M27 8l-6 32" />
      </svg>
    );
  }

  static workflow(props: IconProps = {}) {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props} aria-hidden>
        <path d="M11 14h18a7 7 0 0 1 7 7v0M37 14l-5-5m5 5-5 5M37 34H19a7 7 0 0 1-7-7v0M11 34l5-5m-5 5 5 5" />
      </svg>
    );
  }

  static spark(props: IconProps = {}) {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" {...props} aria-hidden>
        <path d="M24 5v7M24 36v7M5 24h7M36 24h7M10.5 10.5l5 5M32.5 32.5l5 5M37.5 10.5l-5 5M15.5 32.5l-5 5" />
        <circle cx="24" cy="24" r="9" />
        <path d="M20 24h8M24 20v8" />
      </svg>
    );
  }

  static star(props: IconProps = {}) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props} aria-hidden>
        <path d="M12 1.5c.7 6.7 3.8 9.8 10.5 10.5-6.7.7-9.8 3.8-10.5 10.5C11.3 15.8 8.2 12.7 1.5 12 8.2 11.3 11.3 8.2 12 1.5Z" />
      </svg>
    );
  }
}

export class FeatureIconMap {
  static render(key: "wordpress" | "fullstack" | "automation" | "ai") {
    switch (key) {
      case "wordpress":
        return Icons.wordpress();
      case "fullstack":
        return Icons.code();
      case "automation":
        return Icons.workflow();
      case "ai":
        return Icons.spark();
    }
  }
}
