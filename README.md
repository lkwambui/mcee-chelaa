# MC Chelaa — Personal Brand Website

Official website for Precious Owoko (MC Chelaa), built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
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
   cp .env.example .env.local
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — Start local dev server
- `npm run build` — Build production bundle
- `npm run start` — Run production server
- `npm run lint` — Run ESLint

## Booking API

The booking/contact form submits to `POST /api/bookings`.

Current behavior:

- Validates payload using Zod.
- Uses simple rate limiting by requester IP.
- Uses a honeypot (`website`) field for spam mitigation.
- Sends email when SMTP environment variables are configured.
- Falls back to server logging when SMTP is not configured.

### Environment Variables

Required for email sending:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

Optional:

- `BOOKING_TO_EMAIL` (default: `mcchelaa254@gmail.com`)
- `BOOKING_FROM_EMAIL` (default: `SMTP_USER`)
- `NEXT_PUBLIC_SITE_URL` (used for SEO metadata, `robots.ts`, and `sitemap.ts`)

## Admin Bookings

- UI route: `/admin/bookings`
- API route: `GET /api/bookings`
- `BOOKINGS_ADMIN_TOKEN` is required for authenticated access.

Note: the current `GET /api/bookings` endpoint responds with `410` (not available), so the admin inbox page is currently non-functional until backend retrieval is re-enabled.

## Deployment Notes

- Set `NEXT_PUBLIC_SITE_URL` to your production domain.
- Configure SMTP variables in your hosting environment for live email delivery.
- `robots.txt` and `sitemap.xml` are generated via App Router metadata routes.
