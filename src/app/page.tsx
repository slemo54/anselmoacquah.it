import { redirect } from "next/navigation";
import { SiteIdentity } from "@/content/site";

export default function Home() {
  redirect(SiteIdentity.publicPath);
}
