import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cn } from "@/utils/cn";

const featuredIds = ["conference-01", "wedding-01", "spoken-02", "youth-01"];

export function PortfolioHighlights() {
  const { content } = useSiteContent();
  const { portfolio } = content;
  const items = featuredIds
    .map((id) => portfolio.items.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (!items.length) {
    return null;
  }

  return (
    <section className="border-b border-line bg-ivory py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeader
              eyebrow={portfolio.eyebrow}
              heading={portfolio.heading}
              description={portfolio.description}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:text-bronze"
            >
              Explore all work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.05}
              className={cn(
                "min-h-0",
                index === 0 && "col-span-2 row-span-2",
                index === 1 && "col-span-1 row-span-1",
                index === 2 && "col-span-1 row-span-1",
                index === 3 && "col-span-2 row-span-1"
              )}
            >
              <Link
                to="/portfolio"
                className="group relative block h-full w-full overflow-hidden bg-paper"
                aria-label={`View ${item.title} in the portfolio`}
              >
                <SmartImage
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-paper/95 px-4 py-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-bronze">
                    {item.category}
                  </p>
                  <p className="mt-1 truncate font-display text-base text-ink">
                    {item.title}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
