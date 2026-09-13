import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { Seo } from "@/lib/seo";

/** Public UI lives here. Do not serve a parallel HTML page from public/. */

export const metadata: Metadata = Seo.metadata();

export default function PortfolioRoute() {
  return <PortfolioPage />;
}
