import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cn } from "@/utils/cn";

export function FeaturedExperiences() {
  const { content } = useSiteContent();
  const { featuredExperiences } = content;

  return (
    <section className="border-b border-line bg-paper py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeader
              eyebrow={featuredExperiences.eyebrow}
              heading={featuredExperiences.heading}
              description={featuredExperiences.description}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:text-bronze"
            >
              View full portfolio
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {featuredExperiences.items.map((event, index) => (
            <Reveal
              key={event.slug}
              delay={index * 0.06}
              className={cn(
                index === 0 ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-6"
              )}
            >
              <article className="group h-full">
                <div
                  className={cn(
                    "relative overflow-hidden bg-ivory",
                    index === 0 ? "aspect-[4/5]" : "aspect-[16/10]"
                  )}
                >
                  <SmartImage
                    src={event.image.src}
                    alt={event.image.alt}
                    fill
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 46vw" : "(max-width: 1024px) 100vw, 46vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2 bg-paper px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                    <Calendar className="h-3 w-3 text-bronze" aria-hidden />
                    {event.year}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone">
                    <MapPin className="h-3 w-3 text-bronze" aria-hidden />
                    {event.location}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-bronze sm:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone">
                    {event.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
