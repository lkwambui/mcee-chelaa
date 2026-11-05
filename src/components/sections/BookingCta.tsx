import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

export function BookingCta() {
  const { content } = useSiteContent();
  const { bookingCta } = content;

  return (
    <section className="bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
              {bookingCta.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl">
              {bookingCta.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/65">
              {bookingCta.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink to={bookingCta.cta.to} variant="bronze" size="lg">
              {bookingCta.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
