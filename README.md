# Kyra Events Website

Modern Next.js website for Kyra Events, a luxury Asian wedding and event stage decoration company.

## Getting Started

Install dependencies and run the local server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run test
npm run test:e2e
```

## Manual Lighthouse Review

Lighthouse is best run manually for this project rather than as a blocking CI check. Scores can vary
with machine load, browser version, network throttling and external widgets, so the automated suite
focuses on stable compatibility checks instead.

Recommended workflow:

```bash
npm run build
npm run start
```

Open Chrome DevTools at `http://localhost:3000`, run Lighthouse against the production build, and
check mobile and desktop reports for Performance, Accessibility, Best Practices and SEO. Review the
Home, Portfolio and Contact pages first because they contain the key imagery, navigation and enquiry
flows.

## Content

Business details are centralised in `data/site.ts`. Services and gallery entries are managed in
`data/services.ts` and `data/portfolio.ts`.

The current imagery is generated placeholder photography stored in `public/images`. Replace those
files with real Kyra Events portfolio photos when available, keeping the same filenames to avoid
code changes.
