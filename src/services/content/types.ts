import type { ImageAsset } from "@/config/imageConfig";

export type IconName =
  | "mic"
  | "pen"
  | "users"
  | "radio"
  | "speaker"
  | "sparkles"
  | "star"
  | "calendar"
  | "map"
  | "mail"
  | "phone"
  | "instagram"
  | "facebook"
  | "whatsapp";

export type Cta = {
  label: string;
  to: string;
};

export type NavItem = {
  label: string;
  to: string;
};

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  description: string;
  expectations: string[];
  idealFor: string[];
  image: ImageAsset;
};

export type FeaturedExperience = {
  slug: string;
  title: string;
  location: string;
  year: string;
  description: string;
  image: ImageAsset;
};

export type PortfolioCategory =
  | "Corporate"
  | "Weddings & Celebrations"
  | "Conferences"
  | "Spoken Word"
  | "Community & Youth"
  | "Media";

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  image: ImageAsset;
  year?: string;
  videoSrc?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

export type Achievement = {
  title: string;
  organisation: string;
  year: string;
  result: string;
  description: string;
  featured?: boolean;
};

export type MediaItem = {
  id: string;
  title: string;
  description: string;
  type: "video" | "youtube";
  src?: string;
  youtubeId?: string;
  poster: ImageAsset;
  duration?: string;
};

export type MediaAppearance = {
  id: string;
  title: string;
  image: ImageAsset;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    meta: string[];
    image: ImageAsset;
  };
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    quote: string;
    image: ImageAsset;
    signature: string;
  };
  identities: {
    eyebrow: string;
    heading: string;
    description: string;
    items: Array<{
      icon: IconName;
      title: string;
      description: string;
      to: string;
    }>;
  };
  services: {
    eyebrow: string;
    heading: string;
    description: string;
    items: Service[];
  };
  featuredExperiences: {
    eyebrow: string;
    heading: string;
    description: string;
    items: FeaturedExperience[];
  };
  portfolio: {
    eyebrow: string;
    heading: string;
    description: string;
    categories: PortfolioCategory[];
    items: PortfolioItem[];
  };
  media: {
    eyebrow: string;
    heading: string;
    description: string;
    featured: MediaItem;
    items: MediaItem[];
    appearances: MediaAppearance[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: Testimonial[];
  };
  achievements: {
    eyebrow: string;
    heading: string;
    description: string;
    items: Achievement[];
  };
  about: {
    eyebrow: string;
    heading: string;
    intro: string;
    paragraphs: string[];
    image: ImageAsset;
    secondaryImage: ImageAsset;
    values: Array<{ title: string; description: string }>;
    journey: Array<{ year: string; title: string; description: string }>;
    quote: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    bookingNote: string;
    eventTypes: string[];
  };
  social: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  bookingCta: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: Cta;
  };
  footer: {
    introduction: string;
    services: string[];
  };
  notFound: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: Cta;
  };
};
