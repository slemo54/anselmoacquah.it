import { readFile } from 'node:fs/promises';

const sourcePath = new URL('../portfolio/index.html', import.meta.url);
const publicPath = new URL('../public/portfolio/index.html', import.meta.url);
const [source, publicCopy] = await Promise.all([
  readFile(sourcePath, 'utf8'),
  readFile(publicPath, 'utf8'),
]);

const checks = [
  ['source and public portfolio files are identical', source === publicCopy],
  ['mobile dock exists', source.includes('class="mobile-dock"')],
  ['mobile dock has four section links', (source.match(/class="mobile-dock-link(?: active)?"/g) || []).length === 4],
  ['mobile dock active-state observer exists', source.includes('mobileDockObserver')],
  ['CTA icons use reusable SVG markup', source.includes('class="btn-icon"')],
  ['footer icons use inline SVG', (source.match(/class="social-icon"/g) || []).length === 4],
  ['touch-active cards are supported', source.includes('.touch-active')],
  ['mobile motion breakpoint exists', source.includes('@media (max-width: 620px)')],
  ['reduced-motion handling is retained', source.includes('prefers-reduced-motion: reduce')],
  ['placeholder corruption is absent', !source.includes('__BASE64_PLACEHOLDER_')],
];

let failed = 0;
for (const [label, passed] of checks) {
  console.log(`${passed ? 'PASS' : 'FAIL'}: ${label}`);
  if (!passed) failed += 1;
}

if (failed) {
  console.error(`\n${failed} portfolio mobile validation check(s) failed.`);
  process.exit(1);
}
console.log('\nPortfolio mobile validation passed.');
