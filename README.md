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
