import { Award, Check } from "lucide-react";

import { BookingCta } from "@/components/sections/BookingCta";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { siteConfig } from "@/config/siteConfig";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cn } from "@/utils/cn";

export function AboutPage() {
  const { content } = useSiteContent();
  const { about, achievements } = content;

  usePageMeta({
    title: "About MC Chelaa",
    description: about.intro,
    path: "/about",
    image: about.image.src,
    type: "profile",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: siteConfig.personName,
        alternateName: siteConfig.name,
        description: about.intro,
        url: `${siteConfig.url}/about`,
        image: `${siteConfig.url}${about.image.src}`,
        jobTitle: "Master of Ceremonies, Spoken Word Artist and Event Host",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nakuru",
          addressCountry: "KE",
        },
      },
    },
  });

  const featuredAchievement =
    achievements.items.find((item) => item.featured) ?? achievements.items[0];
  const otherAchievements = achievements.items.filter((item) => item !== featuredAchievement);

  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.heading}
        description={about.intro}
        image={about.image}
      />

      <section className="border-b border-line bg-paper py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
              The story
            </p>
            <div className="mt-6 space-y-5">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-stone sm:text-[17px]">
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-bronze pl-5">
              <p className="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
                “{about.quote}”
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
              <SmartImage
                src={about.secondaryImage.src}
                alt={about.secondaryImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone">
              {about.secondaryImage.alt}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-ivory py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="What guides the work"
              heading="Values that shape every room."
              description="The practice is built on a few steady commitments that carry across hosting, performance and advocacy."
            />
          </Reveal>

          <div className="mt-12 grid border-t border-line sm:grid-cols-2">
            {about.values.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 0.05}
                className={cn(
                  "border-b border-line py-7 sm:py-9",
                  index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center border border-bronze text-bronze">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ink">{value.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-stone">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow="The journey"
              heading="A practice built over time."
              description="Selected milestones from a creative path spanning stage, media, community and recognition."
            />
          </Reveal>

          <ol className="border-t border-line">
            {about.journey.map((entry, index) => (
              <Reveal key={`${entry.year}-${entry.title}`} delay={index * 0.04}>
                <li className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-6 sm:grid-cols-[100px_1fr] sm:gap-8 sm:py-7">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze">
                    {entry.year}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      {entry.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line bg-ivory py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={achievements.eyebrow}
              heading={achievements.heading}
              description={achievements.description}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {featuredAchievement ? (
              <Reveal>
                <article className="flex h-full flex-col justify-between border border-line bg-paper p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 border border-bronze px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-bronze">
                        <Award className="h-3.5 w-3.5" aria-hidden />
                        Featured recognition
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-stone">
                        {featuredAchievement.year}
                      </span>
                    </div>
                    <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                      {featuredAchievement.result}
                    </p>
                    <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
                      {featuredAchievement.title}
                    </h3>
                    <p className="mt-2 text-sm text-stone">{featuredAchievement.organisation}</p>
                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-stone">
                      {featuredAchievement.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ) : null}

            <div className="border-t border-line">
              {otherAchievements.map((item, index) => (
                <Reveal key={`${item.organisation}-${item.title}`} delay={index * 0.04}>
                  <article className="border-b border-line py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze">
                        {item.result}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-stone">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone">{item.organisation}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <BookingCta />
    </>
  );
}
