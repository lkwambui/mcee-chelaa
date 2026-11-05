import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { useSiteContent } from "@/hooks/useSiteContent";

export function FeaturedVideo() {
  const { content } = useSiteContent();
  const { featured } = content.media;

  return (
    <section className="border-b border-line bg-paper py-20 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
            {content.media.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-ink sm:text-5xl">
            {content.media.heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            {content.media.description}
          </p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze">
              Featured
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink">{featured.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-stone">
              {featured.description}
            </p>
          </div>

          <Link
            to="/media"
            className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:text-bronze"
          >
            Visit the media library
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          {featured.type === "video" && featured.src ? (
            <VideoPlayer
              src={featured.src}
              poster={featured.poster.src}
              title={featured.title}
              caption={`${featured.title} · ${featured.poster.alt}`}
            />
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
