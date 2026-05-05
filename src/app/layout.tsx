import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "MC in Kenya",
    "Event Host Nakuru",
    "Spoken Word Artist Kenya",
    "MC Chelaa",
    "Precious Owoko",
    "Walking Shadow Poetry Kenya",
    "Youth Empowerment",
    "Mental Health Advocate",
    "Media Creative",
    "Content Creator Kenya",
  ],
  openGraph: {
    title: siteConfig.title,
    description:
      "Book MC Chelaa for premium event hosting, spoken word performances, media collaborations, and empowerment initiatives in Kenya.",
    url: siteConfig.url,
    siteName: "MC Chelaa",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1400,
        height: 900,
        alt: "MC Chelaa - Spoken Word Artist and Media Creative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      "Furaha Yako ni Choice Yako — MC Chelaa uses poetry and storytelling for healing, empowerment, and youth advocacy in Kenya.",
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 ease-in-out">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
