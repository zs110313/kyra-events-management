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
```

## Content

Business details are centralised in `data/site.ts`. Services and gallery entries are managed in
`data/services.ts` and `data/portfolio.ts`.

The current imagery is generated placeholder photography stored in `public/images`. Replace those
files with real Kyra Events portfolio photos when available, keeping the same filenames to avoid
code changes.
