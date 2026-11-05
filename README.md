# MC Chelaa — Personal Brand Website

Official website for Precious Owoko (MC Chelaa), built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL printed by Vite (defaults to [http://localhost:5173](http://localhost:5173)).

## Scripts

- `npm run dev` — Start local dev server
- `npm run build` — Type-check and build the production bundle
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint

## Environment Variables

- `VITE_SITE_URL` — Public site URL used for SEO metadata and the generated `robots.txt` / `sitemap.xml`. Defaults to `http://localhost:5173` when unset.

## Booking Flow

The contact form opens the visitor's email client with a prefilled message addressed to `mcchelaa254@gmail.com`. No backend is required.

## SEO

- Page metadata and JSON-LD are defined in `index.html`.
- `robots.txt` and `sitemap.xml` are generated at build time from `VITE_SITE_URL` via a Vite plugin in `vite.config.ts`.

## Deployment Notes

Set `VITE_SITE_URL` to your production domain before building, then deploy the generated `dist` directory to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).

### Netlify

This repository includes a `netlify.toml` with the build command, publish directory, and SPA redirects.

1. Create a new Netlify site from the GitHub repository.
2. Add an environment variable `VITE_SITE_URL` set to your production URL (for example `https://mcchelaa.com`).
3. Deploy. Netlify runs `npm run build` and publishes `dist`.
