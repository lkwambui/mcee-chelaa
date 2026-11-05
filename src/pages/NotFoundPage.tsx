import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/siteConfig";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSiteContent } from "@/hooks/useSiteContent";

const helpfulLinks = siteConfig.nav.filter((item) => item.to !== "/");

export function NotFoundPage() {
  const { content } = useSiteContent();
  const { notFound } = content;

  usePageMeta({
    title: "Page not found",
    description: notFound.description,
    path: "/404",
    noindex: true,
  });

  return (
    <section className="bg-paper">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="font-display text-[22vw] leading-none tracking-[-0.06em] text-line sm:text-[10rem] lg:text-[12rem]" aria-hidden>
            404
          </p>
          <p className="-mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
            {notFound.eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-ink sm:text-5xl">
            {notFound.heading}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-stone">
            {notFound.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink to="/" size="md">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back home
            </ButtonLink>
            <ButtonLink to={notFound.cta.to} variant="secondary" size="md">
              {notFound.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-line bg-ivory p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze">
              Try one of these
            </p>
            <div className="mt-4 border-t border-line">
              {helpfulLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center justify-between gap-4 border-b border-line py-4 text-ink transition-colors hover:text-bronze"
                >
                  <span className="font-display text-xl">{link.label}</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-stone transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
