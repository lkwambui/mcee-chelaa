import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";

import { PortfolioLightbox } from "@/components/portfolio/PortfolioGrid";
import { BookingCta } from "@/components/sections/BookingCta";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { siteConfig } from "@/config/siteConfig";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { PortfolioItem } from "@/services/content/types";
import { cn } from "@/utils/cn";

const appearanceAspects = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
];

export function MediaPage() {
  const { content } = useSiteContent();
  const { media } = content;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const appearanceItems = useMemo<PortfolioItem[]>(
    () =>
      media.appearances.map((appearance) => ({
        id: appearance.id,
        title: appearance.title,
        category: "Media",
        description: "A media appearance from the MC Chelaa archive.",
        image: appearance.image,
      })),
    [media.appearances]
  );

  const handleNavigate = useCallback(
    (nextIndex: number) => {
      if (!appearanceItems.length) return;
      setActiveIndex((nextIndex + appearanceItems.length) % appearanceItems.length);
    },
    [appearanceItems.length]
  );

  const handleClose = useCallback(() => setActiveIndex(null), []);

  usePageMeta({
    title: "Media",
    description: media.description,
    path: "/media",
    image: media.featured.poster.src,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "VideoGallery",
      name: "MC Chelaa media",
      description: media.description,
      url: `${siteConfig.url}/media`,
      video: [media.featured, ...media.items]
        .filter((item) => item.src)
        .map((item) => ({
          "@type": "VideoObject",
          name: item.title,
          description: item.description,
          thumbnailUrl: `${siteConfig.url}${item.poster.src}`,
          contentUrl: `${siteConfig.url}${item.src}`,
        })),
    },
  });

  return (
    <>
      <PageHero
        eyebrow={media.eyebrow}
        title={media.heading}
        description={media.description}
      >
        <ButtonLink to="/contact" variant="secondary" size="md">
          Invite MC Chelaa
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </PageHero>

      <section className="border-b border-line bg-paper py-14 sm:py-16 lg:py-20">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze">
                  Featured film
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
                  {media.featured.title}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-stone">
                {media.featured.description}
              </p>
            </div>
            {media.featured.type === "video" && media.featured.src ? (
              <VideoPlayer
                src={media.featured.src}
                poster={media.featured.poster.src}
                title={media.featured.title}
              />
            ) : null}
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-ivory py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Clips"
              heading="More moments from the stage."
              description="Short films capturing hosting, recognition and live audience connection."
            />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {media.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <article>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-stone">
                        {item.description}
                      </p>
                    </div>
                    <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-bronze text-bronze">
                      <Play className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                  {item.type === "video" && item.src ? (
                    <VideoPlayer
                      src={item.src}
                      poster={item.poster.src}
                      title={item.title}
                    />
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Appearances"
              heading="In conversation and on air."
              description="A selection of interviews, studio visits and media engagements."
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {media.appearances.map((appearance, index) => (
              <Reveal key={appearance.id} delay={Math.min(index, 5) * 0.04}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group block w-full text-left"
                  aria-label={`Open ${appearance.title}`}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-ivory",
                      appearanceAspects[index % appearanceAspects.length]
                    )}
                  >
                    <SmartImage
                      src={appearance.image.src}
                      alt={appearance.image.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 font-display text-base text-ink transition-colors group-hover:text-bronze">
                    {appearance.title}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PortfolioLightbox
        items={appearanceItems}
        index={activeIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />

      <BookingCta />
    </>
  );
}
