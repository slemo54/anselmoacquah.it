import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["eng", "it", "fr"];

function keysOf(value, prefix = "") {
  if (Array.isArray(value) || value === null || typeof value !== "object") {
    return [prefix];
  }
  return Object.entries(value).flatMap(([key, child]) =>
    keysOf(child, prefix ? `${prefix}.${key}` : key),
  );
}

const dictionaries = {};
for (const locale of locales) {
  dictionaries[locale] = JSON.parse(
    await readFile(join(root, "src/i18n", `${locale}.json`), "utf8"),
  );
}

const reference = keysOf(dictionaries.eng).sort();
let failed = 0;

for (const locale of locales) {
  const keys = keysOf(dictionaries[locale]).sort();
  const missing = reference.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !reference.includes(key));
  const passed = missing.length === 0 && extra.length === 0;
  console.log(
    `${passed ? "PASS" : "FAIL"}: ${locale} dictionary keys match ENG (${keys.length})`,
  );
  if (!passed) {
    failed += 1;
    for (const key of missing) console.log(`  missing: ${key}`);
    for (const key of extra) console.log(`  extra: ${key}`);
  }

  const aboutBody = dictionaries[locale].about?.body ?? "";
  const hasHighlight = aboutBody.includes("{highlight}");
  console.log(
    `${hasHighlight ? "PASS" : "FAIL"}: ${locale} about.body keeps {highlight}`,
  );
  if (!hasHighlight) failed += 1;
}

const forbidden = "@gmail.com";
const scanDirs = ["src", "scripts"];
const skip = new Set(["node_modules", ".next", "public", "portfolio"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const scanned = [];
for (const dir of scanDirs) {
  scanned.push(...(await walk(join(root, dir))));
}

const leaks = [];
for (const file of scanned) {
  if (file.endsWith("validate-i18n.mjs")) continue;
  const source = await readFile(file, "utf8");
  if (source.toLowerCase().includes(forbidden)) leaks.push(file);
}

console.log(
  `${leaks.length === 0 ? "PASS" : "FAIL"}: public email is not Gmail`,
);
if (leaks.length) {
  failed += 1;
  for (const file of leaks) console.log(`  ${file}`);
}

const site = await readFile(join(root, "src/lib/site.ts"), "utf8");
const usesCanonical = site.includes("https://www.anselmoacquah.it");
const usesEmail = site.includes("anselmo@anselmoacquah.it");
console.log(
  `${usesCanonical ? "PASS" : "FAIL"}: canonical host is www.anselmoacquah.it`,
);
console.log(
  `${usesEmail ? "PASS" : "FAIL"}: public email is anselmo@anselmoacquah.it`,
);
if (!usesCanonical || !usesEmail) failed += 1;

if (failed) {
  console.error(`\n${failed} i18n/contact validation check(s) failed.`);
  process.exit(1);
}
console.log("\nContact, i18n, and SEO source checks passed.");
