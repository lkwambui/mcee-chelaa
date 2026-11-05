import { FeaturedExperiences } from "@/components/home/FeaturedExperiences";
import { FeaturedVideo } from "@/components/home/FeaturedVideo";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { PortfolioHighlights } from "@/components/home/PortfolioHighlights";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { SocialPresence } from "@/components/home/SocialPresence";
import { Testimonials } from "@/components/home/Testimonials";
import { BookingCta } from "@/components/sections/BookingCta";
import { siteConfig } from "@/config/siteConfig";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSiteContent } from "@/hooks/useSiteContent";

export function HomePage() {
  const { content } = useSiteContent();

  usePageMeta({
    title: siteConfig.title,
    description: content.hero.description,
    path: "/",
    image: content.hero.image.src,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.personName,
        alternateName: ["MC Chelaa", "Mcee Chelaa", "MC Chelah"],
        jobTitle: [
          "Master of Ceremonies",
          "Spoken Word Artist",
          "Event Host",
          "Youth Empowerment Advocate",
          "Public Speaker",
        ],
        slogan: siteConfig.tagline,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}${content.hero.image.src}`,
        email: `mailto:${siteConfig.email}`,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nakuru",
          addressCountry: "KE",
        },
        founder: {
          "@type": "Organization",
          name: "Walking Shadow Poetry Kenya",
        },
        sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
  });

  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesPreview />
      <FeaturedExperiences />
      <PortfolioHighlights />
      <FeaturedVideo />
      <Testimonials />
      <SocialPresence />
      <BookingCta />
    </>
  );
}
