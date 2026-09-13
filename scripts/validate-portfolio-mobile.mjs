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

async function collectSource(dir, files = []) {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true });
  for (const entry of entries) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectSource(relative, files);
    } else if (/\.(tsx|ts|css|mjs)$/.test(entry.name)) {
      files.push(await readFile(path.join(root, relative), "utf8"));
    }
  }
  return files;
}

const source = (await collectSource("src")).join("\n");

const checks = [
  [
    "static HTML is not present at public/portfolio/index.html",
    !(await exists("public/portfolio/index.html")),
  ],
  [
    "duplicate HTML is not present at portfolio/index.html",
    !(await exists("portfolio/index.html")),
  ],
  ["mobile dock exists", source.includes("mobile-dock")],
  [
    "mobile dock has four section links",
    source.includes('id: "home"') &&
      source.includes('id: "about"') &&
      source.includes('id: "projects"') &&
      source.includes('id: "contact"'),
  ],
  ["skip link exists", source.includes('className="skip-link"')],
  ["focus-visible styles exist", source.includes(":focus-visible")],
  [
    "portrait uses fetchpriority high",
    source.includes('fetchPriority="high"'),
  ],
  [
    "portrait has width and height",
    source.includes("width: 1274") && source.includes("height: 1235"),
  ],
  ["portrait webp source exists", source.includes("portrait.webp")],
  ["compressed webp asset exists", await exists("public/portrait.webp")],
  ["font fallback size-adjust exists", source.includes("size-adjust:")],
  ["horizontal overflow is clipped", source.includes("overflow-x: clip")],
  [
    "reduced-motion handling is retained",
    source.includes("prefers-reduced-motion: reduce"),
  ],
  [
    "reduced-motion disables animations",
    source.includes("animation: none !important"),
  ],
];

let failed = 0;
for (const [label, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}: ${label}`);
  if (!passed) failed += 1;
}

if (failed) {
  console.error(`\n${failed} portfolio mobile validation check(s) failed.`);
  process.exit(1);
}
console.log("\nPortfolio mobile validation passed.");
