# Emireq Mobile View

A **Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS v4** mobile-view web application with icon support via Lucide & React Icons, and data charts via Recharts.

---

## Tech Stack

### Core Framework & Runtime

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React framework with App Router, SSR/SSG, routing |
| **React** | 19.2.3 | UI component library |
| **React DOM** | 19.2.3 | React renderer for the browser |
| **Node.js** | ≥20 | Runtime environment |

### Language & Type System

| Technology | Version | Purpose |
|---|---|---|
| **TypeScript** | ^5 | Statically typed JavaScript, strict mode enabled |
| **ES2017** target | — | TypeScript compile target |
| **JSX** (react-jsx) | — | Component syntax transform |

### Styling

| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **@tailwindcss/postcss** | ^4 | PostCSS integration for Tailwind v4 |
| **PostCSS** | — | CSS transformation pipeline |
| **globals.css** | — | Global base styles |

### UI & Icon Libraries

| Technology | Version | Purpose |
|---|---|---|
| **lucide-react** | ^0.577.0 | Modern SVG icon set (used throughout components) |
| **react-icons** | ^5.6.0 | Large multi-source icon library |

### Data Visualization

| Technology | Version | Purpose |
|---|---|---|
| **Recharts** | ^3.7.0 | Chart & graph components built on D3 (used in Investors/Marketplace pages) |

### Linting & Code Quality

| Technology | Version | Purpose |
|---|---|---|
| **ESLint** | ^9 | JavaScript/TypeScript linter |
| **eslint-config-next** | 16.1.6 | Next.js ESLint rules + Core Web Vitals + TypeScript rules |

### Project Architecture

- **App Router** — Next.js 13+ file-based routing under `app/`
- **Component-based** — Reusable components in `components/`
- **Path alias** `@/*` — Maps to the project root for clean imports
- **Unoptimized images** — `next/image` with `unoptimized: true` for static/local asset serving

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
