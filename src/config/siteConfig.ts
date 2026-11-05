export const siteConfig = {
  name: "MC Chelaa",
  personName: "Precious Owoko",
  tagline: "Furaha Yako ni Choice Yako",
  title: "MC Chelaa | Master of Ceremonies, Spoken Word Artist & Event Host",
  description:
    "MC Chelaa (Precious Owoko) is a Master of Ceremonies, spoken-word artist, event host and youth empowerment advocate based in Nakuru, Kenya.",
  url: (import.meta.env.VITE_SITE_URL || "http://localhost:5173").replace(/\/$/, ""),
  email: "mcchelaa254@gmail.com",
  phone: "+254719360781",
  phoneDisplay: "0719 360 781",
  whatsapp: "254719360781",
  location: "Nakuru, Kenya",
  social: {
    instagram: "https://instagram.com/mcchelaa254",
    facebook: "https://facebook.com/mcchelaa254",
  },
  bookingEndpoint: import.meta.env.VITE_BOOKING_ENDPOINT || "",
  nav: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Media", to: "/media" },
    { label: "Contact", to: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
