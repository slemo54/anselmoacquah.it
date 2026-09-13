import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { SiteIdentity } from "@/content/site";

/** Public UI lives here. Do not serve a parallel HTML page from public/. */

export const metadata: Metadata = {
  title: "Anselmo Acquah | Web Developer & IT Specialist",
  description:
    "Portfolio of Anselmo Acquah, web developer and IT specialist based in Verona, Italy.",
  alternates: {
    canonical: SiteIdentity.publicPath,
  },
};

export default function PortfolioRoute() {
  return <PortfolioPage />;
}
