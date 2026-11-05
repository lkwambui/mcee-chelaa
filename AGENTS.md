# Project Guidelines

This is a Vite + React 19 + TypeScript + Tailwind CSS 4 single-page application.

- Use the `@/` path alias for imports from `src`.
- Prefer functional React components and existing UI primitives in `src/components/ui`.
- Tailwind CSS is wired through the `@tailwindcss/vite` plugin and imported in `src/index.css`.
- Run `npm run lint` and `npm run build` before finishing changes.
- Static assets live in `public/`; source entry points are `index.html` and `src/main.tsx`.
