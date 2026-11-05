/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_WP_API_URL?: string;
  readonly VITE_WP_PORTFOLIO_ENDPOINT?: string;
  readonly VITE_BOOKING_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
