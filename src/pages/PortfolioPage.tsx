import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { PortfolioGrid, PortfolioLightbox } from "@/components/portfolio/PortfolioGrid";
import { BookingCta } from "@/components/sections/BookingCta";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { PortfolioCategory } from "@/services/content/types";
import { siteConfig } from "@/config/siteConfig";

type FilterValue = "All" | PortfolioCategory;

export function PortfolioPage() {
  const { content } = useSiteContent();
  const { portfolio } = content;
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const counts = useMemo(() => {
    const result: Record<string, number> = { All: portfolio.items.length };
    for (const item of portfolio.items) {
      result[item.category] = (result[item.category] ?? 0) + 1;
    }
    return result;
  }, [portfolio.items]);

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? portfolio.items
        : portfolio.items.filter((item) => item.category === activeFilter),
    [activeFilter, portfolio.items]
  );

  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
    setActiveIndex(null);
  };

  const handleNavigate = useCallback(
    (nextIndex: number) => {
      if (!filteredItems.length) return;
      setActiveIndex((nextIndex + filteredItems.length) % filteredItems.length);
    },
    [filteredItems.length]
  );

  const handleClose = useCallback(() => setActiveIndex(null), []);

  usePageMeta({
    title: "Portfolio",
    description: portfolio.description,
    path: "/portfolio",
    image: portfolio.items[0]?.image.src,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "MC Chelaa portfolio",
      description: portfolio.description,
      url: `${siteConfig.url}/portfolio`,
      image: portfolio.items.slice(0, 12).map((item) => `${siteConfig.url}${item.image.src}`),
    },
  });

  return (
    <>
      <PageHero
        eyebrow={portfolio.eyebrow}
        title={portfolio.heading}
        description={portfolio.description}
      >
        <ButtonLink to="/contact" size="md">
          Book MC Chelaa
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </PageHero>

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <Container>
          <PortfolioFilter
            categories={portfolio.categories}
            active={activeFilter}
            counts={counts}
            onChange={handleFilterChange}
          />
          <PortfolioGrid items={filteredItems} onSelect={setActiveIndex} />
        </Container>
      </section>

      <PortfolioLightbox
        items={filteredItems}
        index={activeIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />

      <BookingCta />
    </>
  );
}
