import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { ArtDirection } from "@/theme/tokens";
import { MotionProvider } from "@/motion";
import { Seo } from "@/lib/seo";
import "./globals.css";

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

export const metadata: Metadata = Seo.metadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <JsonLd />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
