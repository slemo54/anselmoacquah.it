import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteIdentity } from "@/content/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

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
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
