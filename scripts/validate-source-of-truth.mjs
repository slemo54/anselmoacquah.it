import { access, readFile, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readIfPresent(relativePath) {
  try {
    return await readFile(path.join(root, relativePath), "utf8");
  } catch {
    return "";
  }
}

async function collectSource(dir, files = []) {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true });
  for (const entry of entries) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectSource(relative, files);
    } else if (/\.(tsx|ts|css|mjs|json)$/.test(entry.name)) {
      files.push(await readFile(path.join(root, relative), "utf8"));
    }
  }
  return files;
}

const vercel = await readIfPresent("vercel.json");
const nextConfig = await readIfPresent("next.config.ts");
const rootPage = await readIfPresent("src/app/page.tsx");
const portfolioPage = await readIfPresent("src/app/portfolio/page.tsx");
const source = (
  await collectSource("src")
).concat(nextConfig, vercel).join("\n");

const checks = [
  [
    "portrait asset exists at public/portrait.png",
    await exists("public/portrait.png"),
  ],
  [
    "static HTML is not present at public/portfolio/index.html",
    !(await exists("public/portfolio/index.html")),
  ],
  [
    "duplicate HTML is not present at portfolio/index.html",
    !(await exists("portfolio/index.html")),
  ],
  [
    "App Router portfolio route exists",
    await exists("src/app/portfolio/page.tsx"),
  ],
  [
    "root page redirects to /portfolio",
    rootPage.includes('redirect(SiteIdentity.publicPath)') ||
      rootPage.includes('redirect("/portfolio")'),
  ],
  [
    "next.config redirects / to /portfolio",
    nextConfig.includes('destination: "/portfolio"') &&
      nextConfig.includes('source: "/"'),
  ],
  [
    "next.config does not send traffic to index.html",
    !nextConfig.includes('destination: "/portfolio/index.html"') &&
      !nextConfig.includes('destination: "/portfolio/"'),
  ],
  [
    "vercel.json does not rewrite to leftover HTML",
    !vercel.includes("index.html"),
  ],
  [
    "portfolio page mounts the App Router shell",
    portfolioPage.includes("PortfolioPage"),
  ],
  [
    "canonical email is anselmo@anselmoacquah.it",
    source.includes("anselmo@anselmoacquah.it"),
  ],
  [
    "Gmail is not used as the contact address",
    !source.includes("anselmo.acquah54@gmail.com"),
  ],
  [
    "Wine2Digital live URL is the real host",
    source.includes("https://pm.wine2digital.com"),
  ],
  [
    "IWP Directory live URL is the real host",
    source.includes("https://kimi-podcast-map.vercel.app"),
  ],
  [
    "Exam Checker AI live URL is the real host",
    source.includes("https://openai-exam-checker.vercel.app"),
  ],
  [
    "IT/ENG/FR language hooks exist",
    source.includes('"it"') &&
      source.includes('"fr"') &&
      source.includes('"eng"') &&
      source.includes("Available for work"),
  ],
  [
    "portrait identity is wired",
    source.includes("/portrait.png") && source.includes("Anselmo Acquah"),
  ],
  [
    "mobile dock section links exist",
    source.includes("mobile-dock") && source.includes('id: "home"'),
  ],
  [
    "skill catalog has no invented percentages",
    !source.includes("skill-value") && !source.includes("--level:"),
  ],
];

let failed = 0;
for (const [label, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}: ${label}`);
  if (!passed) failed += 1;
}

if (failed) {
  console.error(`\n${failed} source-of-truth check(s) failed.`);
  process.exit(1);
}

console.log("\nApp Router is the only UI source of truth.");
