import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.12 3.8 2 2 0 0 1 3.11 1.6h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L7 9.33a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.84.3 1.72.5 2.62.62A2 2 0 0 1 21 16.5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1-.9S17.9-1.3 15 1.6a14 14 0 0 0-6 0C6.1-1.3 4.9-.9 4.9-.9A5.4 5.4 0 0 0 4.7 3a5.8 5.8 0 0 0-1.5 4.1c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 9 18v4" />
      <path d="M9 19c-3 .9-3-1.5-4-2" />
    </svg>
  );
}
