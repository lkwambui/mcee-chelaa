import { ArrowUpRight, Clock, MapPin, MessageCircle } from "lucide-react";

import { BookingForm } from "@/components/booking/BookingForm";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/config/siteConfig";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { IconName } from "@/services/content/types";

const contactRows: Array<{
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}> = [
  {
    icon: "mail",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: "phone",
    label: "Phone",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Message directly",
    href: `https://wa.me/${siteConfig.whatsapp}`,
    external: true,
  },
  {
    icon: "map",
    label: "Based in",
    value: siteConfig.location,
  },
];

export function ContactPage() {
  const { content } = useSiteContent();
  const { contact } = content;

  usePageMeta({
    title: "Contact & Booking",
    description: contact.description,
    path: "/contact",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact MC Chelaa",
      description: contact.description,
      url: `${siteConfig.url}/contact`,
      mainEntity: {
        "@type": "Person",
        name: siteConfig.personName,
        alternateName: siteConfig.name,
        email: `mailto:${siteConfig.email}`,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nakuru",
          addressCountry: "KE",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "booking",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          availableLanguage: ["English", "Swahili"],
        },
      },
    },
  });

  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.heading}
        description={contact.description}
      />

      <section className="border-b border-line bg-paper py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
              Direct contact
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Reach out directly.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
              Prefer a conversation first? Use any of the channels below. For full event
              details, the enquiry form is the best place to start.
            </p>

            <div className="mt-8 border-t border-line">
              {contactRows.map((row) => {
                const content = (
                  <span className="flex items-start gap-4">
                    <Icon name={row.icon} className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-stone">
                        {row.label}
                      </span>
                      <span className="mt-1 block break-words font-display text-xl text-ink transition-colors group-hover:text-bronze">
                        {row.value}
                      </span>
                    </span>
                  </span>
                );

                return row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-line py-5"
                  >
                    {content}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-stone transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze" aria-hidden />
                  </a>
                ) : (
                  <div key={row.label} className="group flex items-center border-b border-line py-5">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone">
                Follow the work
              </p>
              <SocialLinks className="mt-3" />
            </div>

            <div className="mt-8 flex items-start gap-3 border border-line bg-ivory p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden />
              <p className="text-xs leading-relaxed text-stone">
                Based in Nakuru, Kenya and available for events across the country and beyond.
                Please include your date and location so availability can be checked accurately.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-line bg-ivory p-6 sm:p-8 lg:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
                Booking enquiry
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
                Tell us what you are planning.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                Fields marked with an asterisk are required.
              </p>
              <div className="mt-7">
                <BookingForm contact={contact} />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-ivory py-12">
        <Container className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-bronze" aria-hidden />
            <div>
              <p className="font-display text-xl text-ink">Prefer a quick message?</p>
              <p className="mt-1 text-sm text-stone">
                WhatsApp is often the fastest way to begin a conversation.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:text-bronze"
          >
            Chat on WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </Container>
      </section>

      <section className="bg-paper py-10">
        <Container className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-stone">
          <MapPin className="h-4 w-4 text-bronze" aria-hidden />
          {siteConfig.location}
        </Container>
      </section>
    </>
  );
}
