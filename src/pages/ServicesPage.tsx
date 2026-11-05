import { ArrowUpRight, Check } from "lucide-react";

import { BookingCta } from "@/components/sections/BookingCta";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { siteConfig } from "@/config/siteConfig";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cn } from "@/utils/cn";

export function ServicesPage() {
  const { content } = useSiteContent();
  const { services } = content;

  usePageMeta({
    title: "Services",
    description: services.description,
    path: "/services",
    image: services.items[0]?.image.src,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "MC Chelaa services",
      itemListElement: services.items.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          provider: {
            "@type": "Person",
            name: siteConfig.personName,
            alternateName: siteConfig.name,
            url: siteConfig.url,
          },
          areaServed: "Kenya",
        },
      })),
    },
  });

  return (
    <>
      <PageHero
        eyebrow={services.eyebrow}
        title={services.heading}
        description={services.description}
      >
        <ButtonLink to="/contact" size="md">
          Make an enquiry
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </PageHero>

      <div className="bg-paper">
        {services.items.map((service, index) => {
          const isReversed = index % 2 === 1;

          return (
            <section
              key={service.id}
              id={service.id}
              className={cn(
                "scroll-mt-24 border-b border-line py-16 sm:py-20 lg:py-24",
                index % 2 === 1 ? "bg-ivory" : "bg-paper"
              )}
            >
              <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <Reveal className={cn(isReversed && "lg:order-2")}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                    <SmartImage
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.08} className={cn(isReversed && "lg:order-1")}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center border border-bronze text-bronze">
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
                      0{index + 1} · Service
                    </p>
                  </div>

                  <h2 className="mt-5 font-display text-4xl leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-stone sm:text-[17px]">
                    {service.description}
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze">
                        What to expect
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {service.expectations.map((expectation) => (
                          <li key={expectation} className="flex items-start gap-2.5 text-sm text-stone">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden />
                            {expectation}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze">
                        Ideal for
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {service.idealFor.map((item) => (
                          <li
                            key={item}
                            className="border border-line px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-stone"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <ButtonLink to="/contact" variant="secondary" size="sm" className="mt-8">
                    Enquire about this service
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </ButtonLink>
                </Reveal>
              </Container>
            </section>
          );
        })}
      </div>

      <BookingCta />
    </>
  );
}
