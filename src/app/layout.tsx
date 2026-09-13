import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import { ArtDirection } from "@/theme/tokens";
import "./globals.css";
import { SiteIdentity } from "@/content/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: ArtDirection.themeColor(),
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SiteIdentity.origin),
  title: "Anselmo Acquah | Web Developer & IT Specialist",
  description:
    "Web developer and IT specialist in Verona, Italy, building reliable websites, automations, and digital workflows.",
  openGraph: {
    title: "Anselmo Acquah | Web Developer & IT Specialist",
    description:
      "Web development, IT operations, and automation from Verona, Italy.",
    url: `${SiteIdentity.origin}${SiteIdentity.publicPath}`,
    siteName: "Anselmo Acquah",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
