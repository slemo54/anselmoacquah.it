import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anselmoacquah.it"),
  title: "Anselmo Acquah | Web Developer & IT Specialist",
  description:
    "Web developer and IT specialist in Verona, Italy, building reliable websites, automations, and digital workflows.",
  openGraph: {
    title: "Anselmo Acquah | Web Developer & IT Specialist",
    description:
      "Web development, IT operations, and automation from Verona, Italy.",
    url: "https://anselmoacquah.it",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
