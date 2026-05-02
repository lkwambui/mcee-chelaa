# MC Chelaa — Premium Personal Brand Website

High-end personal brand website for Precious Owoko (MC Chelaa), built with Next.js App Router, Tailwind CSS, Framer Motion, and reusable shadcn-style UI primitives.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide icons
- Neon Postgres for persistent bookings
- API route for bookings with validation and optional SMTP delivery

## Local Development

1. Install dependencies:

	```bash
	npm install
	```

2. Copy environment variables:

	```bash
	cp .env.example .env.local
	```

3. Run the dev server:

	```bash
	npm run dev
	```

4. Visit [http://localhost:3000](http://localhost:3000).

## Booking Form Delivery

The contact form posts to `POST /api/bookings`.

- With SMTP vars configured, submissions are emailed.
- Without SMTP, requests are still accepted and logged server-side as a safe fallback.
- Submissions are persisted in Neon Postgres for admin inbox review.

### Required Database

- `DATABASE_URL` (Neon Postgres connection string)

### Required for Email Sending

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

### Optional

- `BOOKING_TO_EMAIL` (defaults to `mcchelaa254@gmail.com`)
- `BOOKING_FROM_EMAIL` (defaults to `SMTP_USER`)
- `NEXT_PUBLIC_SITE_URL` (used for SEO metadata, sitemap, robots)

### Admin Inbox

- Route: `/admin/bookings`
- API source: `GET /api/bookings` (requires header token)
- Required env: `BOOKINGS_ADMIN_TOKEN`
- Enter the token in the admin page to load submissions.

## Quality Checks

```bash
npm run lint
npm run build
```

## Deployment Notes

- Set `NEXT_PUBLIC_SITE_URL` to your production domain (for example, `https://mcchelaa.com`).
- Add SMTP credentials in hosting environment variables to enable live booking emails.
- `robots.txt` and `sitemap.xml` are generated via App Router metadata file conventions.
