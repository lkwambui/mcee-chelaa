import { HomePage } from "@/components/home-page";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Precious Owoko",
    alternateName: ["MC Chelaa", "Mcee Chelaa", "MC Chelah"],
    jobTitle: [
      "Media Creative",
      "Poetess & Spoken Word Artist",
      "Master of Ceremonies",
      "Media Personality",
      "Youth Empowerment Advocate",
    ],
    slogan: "Art from the Heart",
    description:
      "Premium MC in Kenya and spoken word artist based in Nakuru, available for corporate events, weddings, and creative collaborations.",
    url: siteConfig.url,
    image: siteConfig.ogImage,
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
    sameAs: ["https://instagram.com/mcchelaa254", "https://facebook.com/mcchelaa254"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HomePage />
    </>
  );
}
