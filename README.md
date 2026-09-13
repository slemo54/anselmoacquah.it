# Anselmo Acquah — Portfolio

Personal portfolio for Anselmo Acquah, a web developer and IT specialist based
in Verona, Italy.

## Source of truth

The public UI is the Next.js 15 App Router route at `/portfolio`.

- `src/app/portfolio/page.tsx` is the only page that renders the site.
- `/` redirects to `/portfolio`.
- Static HTML is not served. `public/` may hold assets (portrait, icons), not a
  second homepage.

## Stack

- Next.js 15 with the App Router
- React 19 and TypeScript
- Tailwind CSS v4
- GSAP + Lenis motion system (`src/motion`)
- Hand-authored SVG icons

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000/portfolio](http://localhost:3000/portfolio).
The root URL redirects there.

## Quality checks

```bash
npm run lint
npm run validate
npm run build
```

`npm run validate` asserts that leftover HTML cannot become the served UI, that
contact uses `anselmo@anselmoacquah.it`, and that project cards only link to
real live URLs.

## Motion system

`MotionProvider` wraps the App Router tree and owns Lenis + the GSAP ticker.
Section UI should consume the shared language instead of fading whole blocks:

```tsx
import { useMagnetic, useStagger } from "@/motion";

const magnetic = useMagnetic({ strength: 0.2 });
const stagger = useStagger({ kind: "words" });

return (
  <section>
    <h2 ref={stagger}>Selected work</h2>
    <a ref={magnetic} href="#contact">Let’s talk</a>
  </section>
);
```

Or mark existing markup: `data-magnetic`, `data-spring`, `data-stagger`,
`data-scroll-linked`, `data-morph`, `data-shared-element`.

`prefers-reduced-motion: reduce` skips Lenis, tweens, and the cursor. The
custom cursor never mounts on `(pointer: coarse)` or touch pointers.
