import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/config/siteConfig";

export function Layout({ children }: { children: ReactNode }) {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi MC Chelaa, I would like to make a booking enquiry."
  )}`;

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <a
        href="#main"
        className="sr-only z-[100] bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 pt-20">
        {children}
      </main>
      <SiteFooter />
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 border border-ink bg-bronze px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink shadow-lg transition-colors hover:bg-ink hover:text-ivory"
        aria-label="Start a WhatsApp booking enquiry"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
