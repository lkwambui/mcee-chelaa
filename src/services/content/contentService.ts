import { fallbackContent } from "@/data/fallbackContent";
import {
  fetchPages,
  fetchPortfolioEntries,
  isWordPressConfigured,
  type WordPressEntity,
} from "@/services/api/wordpressApi";
import type { PortfolioCategory, PortfolioItem, SiteContent } from "@/services/content/types";

export type ContentSource = "local" | "wordpress";

export type ContentLoadResult = {
  content: SiteContent;
  source: ContentSource;
  error: string | null;
};

const portfolioCategories: PortfolioCategory[] = [
  "Corporate",
  "Weddings & Celebrations",
  "Conferences",
  "Spoken Word",
  "Community & Youth",
  "Media",
];

function readRecord(value: unknown, key: string): Record<string, unknown> | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const next = record[key];

  return next && typeof next === "object" ? (next as Record<string, unknown>) : null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

function normaliseCategory(value: string | null): PortfolioCategory {
  if (!value) {
    return "Corporate";
  }

  const match = portfolioCategories.find(
    (category) => category.toLowerCase() === value.toLowerCase()
  );

  return match ?? "Corporate";
}

function mapPortfolioEntry(
  entry: WordPressEntity,
  index: number,
  fallbackItem: PortfolioItem | undefined
): PortfolioItem {
  const acf = readRecord(entry, "acf");
  const embeddedMedia = readRecord(entry._embedded, "wp:featuredmedia");
  const media = embeddedMedia ? readRecord(embeddedMedia, "0") : null;

  const title =
    readString(entry.title?.rendered) ?? fallbackItem?.title ?? `Portfolio entry ${index + 1}`;
  const description =
    readString(entry.excerpt?.rendered) ??
    fallbackItem?.description ??
    "A moment from the MC Chelaa portfolio.";

  return {
    id: String(entry.id ?? entry.slug ?? `wordpress-portfolio-${index}`),
    title: stripHtml(title),
    category: normaliseCategory(readString(acf?.category) ?? readString(acf?.portfolio_category)),
    description: stripHtml(description),
    image: {
      src:
        readString(media?.source_url) ??
        fallbackItem?.image.src ??
        "/images/events/event1.jpeg",
      alt:
        readString(media?.alt_text) ??
        fallbackItem?.image.alt ??
        `Portfolio image for ${stripHtml(title)}`,
    },
    year: readString(acf?.year) ?? fallbackItem?.year,
    videoSrc: readString(acf?.video_url) ?? fallbackItem?.videoSrc,
  };
}

export function adaptWordPressContent(
  pages: WordPressEntity[],
  portfolioEntries: WordPressEntity[]
): SiteContent {
  const content: SiteContent = structuredClone(fallbackContent);

  const homePage = pages.find((page) => page.slug === "home");
  if (homePage) {
    const acf = readRecord(homePage, "acf");
    const title = readString(acf?.hero_title);
    const accent = readString(acf?.hero_accent);
    const description = readString(acf?.hero_description);

    if (title) {
      content.hero.title = title;
    }

    if (accent) {
      content.hero.titleAccent = accent;
    }

    if (description) {
      content.hero.description = description;
    }
  }

  if (portfolioEntries.length) {
    content.portfolio.items = portfolioEntries.map((entry, index) =>
      mapPortfolioEntry(entry, index, content.portfolio.items[index])
    );
  }

  return content;
}

export async function loadSiteContent(): Promise<ContentLoadResult> {
  if (!isWordPressConfigured()) {
    return { content: fallbackContent, source: "local", error: null };
  }

  try {
    const [pages, portfolioEntries] = await Promise.all([
      fetchPages({ per_page: 100, _embed: true }),
      fetchPortfolioEntries({ per_page: 100, _embed: true }),
    ]);

    return {
      content: adaptWordPressContent(pages, portfolioEntries),
      source: "wordpress",
      error: null,
    };
  } catch (error) {
    return {
      content: fallbackContent,
      source: "local",
      error:
        error instanceof Error
          ? error.message
          : "WordPress content could not be loaded. Showing local content instead.",
    };
  }
}
