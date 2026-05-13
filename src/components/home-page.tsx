
"use client";


const curatedGallery = [
  // Graduation
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/images/graduation/graduation${i + 1}.jpeg`,
    alt: `MC Chelaa at graduation event ${i + 1}`,
    category: "Graduation Ceremony",
  })),
  // Wedding
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/images/wedding/wedding${i + 1}.jpeg`,
    alt: `MC Chelaa at wedding event ${i + 1}`,
    category: "Wedding Celebration",
  })),
  // Baby Shower
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/images/baby-shower/baby-shower${i + 1}.jpeg`,
    alt: `MC Chelaa at baby shower event ${i + 1}`,
    category: "Baby Shower",
  })),
];

import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import WhatsAppChatWidget from "@/components/WhatsAppChatWidget";
import { EventGallery } from "@/components/EventGallery";
import {
  AtSign,
  Award,
  Clapperboard,
  Compass,
  Globe,
  Mail,
  Megaphone,
  MicVocal,
  Phone,
  Quote,
  Radio,
  Sparkles,
  Star,
  Users,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { featuredEvents } from "@/lib/featured-events";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Events", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Master of Ceremonies (MC)",
    description: "Premium stage presence and audience command for corporate events, weddings, graduations, and celebrations. Seamless coordination with authentic energy.",
    icon: MicVocal,
  },
  {
    title: "Media Hosting (TV/Radio)",
    description: "On-air storytelling with confidence, warmth, and intelligent pacing. Dynamic broadcast experiences across television and radio platforms.",
    icon: Radio,
  },
  {
    title: "Spoken Word Performance",
    description: "Emotion-driven poetic performances that heal, empower, and inspire. Perfect for summits, faith-based events, and intimate artistic showcases.",
    icon: WandSparkles,
  },
  {
    title: "Mental Health & Empowerment",
    description: "Using storytelling and poetry as tools for healing, resilience, and youth empowerment. Speaking engagements and awareness campaigns.",
    icon: Sparkles,
  },
  {
    title: "Content Creation & Scripting",
    description: "Creative scripts, social campaigns, and concept storytelling crafted with precision. Digital media content and narrative development.",
    icon: Clapperboard,
  },
  {
    title: "Voice & Communication Coaching",
    description: "Personal branding, stage confidence, and communication training for emerging creatives, leaders, and content creators.",
    icon: Compass,
  },
  {
    title: "Social Media Management",
    description: "Strategic digital presence, content planning, and community engagement across platforms. Building authentic connections and growing your brand voice.",
    icon: Globe,
  },
  {
    title: "High-Fashion Modeling & Training",
    description: "Professional modeling services, personal styling, and model training for emerging talent. Confidence coaching and portfolio development.",
    icon: Sparkles,
  },
];

const portfolioImages = [
  {
    category: "AMWIK Event · 2026",
    src: "/images/Amwik-event-Golden-Tulip-Hotel-Westlands-Nairobi-2026/photo19.jpeg",
    alt: "MC Chelaa at the AMWIK event held at Golden Tulip Hotel, Westlands Nairobi in 2026",
  },
  {
    category: "Little Mr & Miss Nakuru · 2026",
    src: "/images/Little-Mr-and-Miss-Nakuru-2026/photo4.jpeg",
    alt: "MC Chelaa hosting Little Mr and Miss Nakuru 2026",
  },
  {
    category: "Shujaaz Nakuru Edition · 2026",
    src: "/images/Shujaaz-Nakuru-edition-2026/photo6.jpeg",
    alt: "MC Chelaa at Shujaaz Nakuru Edition 2026",
  },
  {
    category: "Events Hosted",
    src: "/images/events/event1.jpeg",
    alt: "MC Chelaa hosting a live event",
  },
  {
    category: "Spoken Word",
    src: "/images/studio-session/photo5.jpeg",
    alt: "MC Chelaa delivering a spoken word performance",
  },
  {
    category: "Media Appearance",
    src: "/images/media-appearance/media-appearance1.jpeg",
    alt: "MC Chelaa during a media appearance",
  },
  {
    category: "Corporate Event",
    src: "/images/corporate-events/corporate-events1.jpeg",
    alt: "MC Chelaa hosting a corporate event",
  },
  {
    category: "Wedding Celebration",
    src: "/images/wedding/wedding1.jpeg",
    alt: "MC Chelaa hosting a wedding celebration",
  },
  {
    category: "Studio Session",
    src: "/images/studio-session/photo12.jpeg",
    alt: "MC Chelaa in a studio session",
  },
];

type Achievement = {
  title: string;
  organization: string;
  year: string;
  result: string;
  detail: string;
  featured?: boolean;
};

const achievements: Achievement[] = [
  {
    title: "Content Creator of the Year",
    organization: "Valuable Brands South Rift Awards",
    year: "2025",
    result: "2nd Runner-Up",
    detail: "A standout milestone honoring consistent storytelling, audience connection, and visible creative impact.",
    featured: true,
  },
  {
    title: "MC of the Year Recognition Award",
    organization: "FEMA Awards",
    year: "2025",
    result: "Recognition Award",
    detail: "Celebrated for refined stage presence, audience command, and memorable event delivery.",
  },
  {
    title: "Content Creator of the Year",
    organization: "AMWIK",
    year: "Recent",
    result: "2nd Runner-Up",
    detail: "Recognized for compelling digital storytelling and consistent content performance.",
  },
  {
    title: "Arts, Culture & Entertainment",
    organization: "Zuri Awards",
    year: "2024",
    result: "Nominee",
    detail: "Shortlisted among emerging voices shaping arts, culture, and entertainment.",
  },
  {
    title: "Most Promising Founder (Under 30)",
    organization: "SHE Awards East Africa",
    year: "Recent",
    result: "Nominee",
    detail: "Highlighted for leadership, innovation, and youth-centered creative influence.",
  },
  {
    title: "Miss Laikipia University",
    organization: "Laikipia University",
    year: "2019–2020",
    result: "Title Holder",
    detail: "An early recognition that strengthened confidence, poise, and public presence.",
  },
];

const featuredAchievement = achievements.find((achievement) => achievement.featured) ?? achievements[0];
const supportingAchievements = achievements.filter((achievement) => achievement !== featuredAchievement);

const mediaShows = [
  {
    title: "Voices of Artists Podcast",
    description: "A reflective podcast segment where MC Chelaa shares her creative journey, purpose-driven storytelling, and media impact.",
    src: "/videos/voices-of-artists.mp4",
  },
  {
    title: "Awards Moment",
    description: "A highlight from award-stage recognition, capturing poise, gratitude, and her growing influence in Kenya's creative space.",
    src: "/videos/awards.mp4",
  },
  {
    title: "Mama Glow Event",
    description: "Live event hosting clip showcasing warm crowd connection, smooth stage transitions, and premium audience engagement.",
    src: "/videos/mama-glow-event.mp4",
  },
];

const testimonials = [
  {
    quote:
      "MC Chelaa brought an elegant energy to our gala and held every room transition with confidence and class.",
    author: "Corporate Events Lead, Nakuru",
  },
  {
    quote:
      "Her spoken word performance was powerful and deeply moving. Our audience still talks about it months later.",
    author: "Creative Director, Faith & Arts Summit",
  },
  {
    quote:
      "Professional, prepared, and emotionally intelligent on stage — exactly what premium events need.",
    author: "Wedding Planner, Rift Valley",
  },
];

const socialLinks = {
  instagram: "https://instagram.com/mcchelaa254",
  facebook: "https://facebook.com/mcchelaa254",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

type LocalImageProps = Omit<ComponentProps<typeof Image>, "src"> & {
  src: string;
  fallbackSrc?: string;
};

function LocalImage({ src, fallbackSrc = "/images/events/event1.jpeg", alt, onError, ...props }: LocalImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeInUp}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
    </motion.div>
  );
}

export function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Booking Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:mcchelaa254@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="bg-background text-foreground">
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 shadow-sm backdrop-blur-md",
          isGalleryOpen && "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-10">
          <Link href="#home" className="font-serif text-2xl tracking-tight">
            MC <span className="text-gradient">Chelaa</span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-foreground/80 transition hover:text-accent">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#contact" className={buttonVariants({ size: "sm" })}>
              Book Me
            </a>
          </div>
        </nav>
      </header>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-highlight/25">
        <div className="hero-cinematic-bg absolute inset-0" aria-hidden />
        <div className="hero-subject-ambient absolute inset-y-0 right-0 z-1 w-[62%]" aria-hidden />
        <Image
          src="/images/Little-Mr-and-Miss-Nakuru-2026/photo7.jpeg"
          alt="MC Chelaa performing on stage"
          fill
          priority
          sizes="100vw"
          className="hero-subject-soft object-cover object-[center_14%] sm:object-[center_12%] md:object-[58%_16%] lg:object-[60%_18%] xl:object-[61%_20%]"
        />
        <div className="hero-separation-blur absolute inset-0 z-2" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/35 to-transparent" />
        <div className="hero-lower-fade absolute inset-x-0 bottom-0 z-3 h-[40%]" aria-hidden />

        <div className="container relative z-10 mx-auto px-6 pt-28 pb-20 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl rounded-2xl border border-white/10 bg-black/40 px-6 py-8 shadow-2xl backdrop-blur-md transition duration-500 hover:bg-black/50 md:px-10 md:py-12"
          >
            <Badge className="border-white/30 bg-white/12 text-white">Nakuru, Kenya</Badge>
            <h1 className="mt-6 max-w-lg text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              MC Chelaa
              <span className="mt-3 block text-white/95">Furaha Yako ni Choice Yako</span>
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-yellow-500" />
            <p className="mt-4 max-w-lg leading-relaxed text-white/80">
              MC Chelaa is a media creative, poetess, and premium event host crafting cinematic stage moments for brands, communities, and unforgettable experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-yellow-500 px-6 py-3 font-medium text-black shadow-md transition duration-300 hover:scale-105 hover:bg-yellow-400"
              >
                Book Me
              </a>
              <a
                href="#portfolio"
                className="rounded-full border border-white/40 px-6 py-3 text-white transition duration-300 hover:bg-white/10"
              >
                View Portfolio
              </a>
            </div>
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-white/60">Grow from what&apos;s meant to kill you</p>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto grid w-full max-w-7xl gap-12 px-6 pt-28 pb-24 lg:px-12 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeInUp}
          transition={{ duration: 0.55 }}
          className="relative min-h-105 overflow-hidden rounded-3xl"
        >
          <LocalImage
            src="/images/corporate-events/corporate-events4.jpeg"
            alt="Portrait of MC Chelaa — media creative, poetess, and MC"
            fill
            quality={100}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeInUp}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <Badge>About</Badge>
          <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">Story, Voice, and Purpose</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            As the founder of Walking Shadow Poetry Kenya, MC Chelaa is a rising leader in Kenya's creative and media space, uniquely blending art, leadership, and social impact. She champions storytelling as a tool for healing, empowerment, mental health awareness, and resilience. Her voice blends elegance with emotional depth—from intimate spoken word sessions to high-level corporate stages.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            With experience in broadcasting, acting, poetry, and community engagement, she continues to influence and inspire through authentic storytelling, faith-driven purpose, and creative expression. She mentors young creatives and advocates for youth empowerment through media, artistry, and intentional visibility.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge className="border-highlight/45 bg-highlight/20 text-foreground">Founder · Walking Shadow Poetry Kenya</Badge>
            <Badge>Mental Health Advocate</Badge>
            <Badge>Youth Empowerment Advocate</Badge>
          </div>
        </motion.div>
      </section>

      <section id="services" className="bg-muted/35 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Services"
            title="Premium Creative Services"
            description="From stage hosting to media storytelling, every service is tailored for impact, clarity, and unforgettable audience connection."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="group h-full transition duration-300 hover:-translate-y-1.5 hover:border-accent/55">
                    <CardHeader>
                      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/12 text-accent transition group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription className="mt-3 text-[15px]">{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        <SectionTitle
          eyebrow="Portfolio"
          title="Moments in Motion"
          description="A glimpse into hosted events, spoken word showcases, and media appearances across Kenya."
        />

        <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
          {portfolioImages.map((item, index) => (
            <motion.figure
              key={`${item.category}-${index}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="relative break-inside-avoid overflow-hidden rounded-3xl border border-border"
            >
              <LocalImage
                src={item.src}
                alt={item.alt}
                width={700}
                height={index % 2 === 0 ? 920 : 740}
                className="h-auto w-full object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/85 to-transparent px-5 py-4 text-sm font-medium text-background">
                {item.category}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>


      {/* Curated Gallery Section: Graduation, Wedding, Baby Shower */}
      <section id="curated-gallery" className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        <SectionTitle
          eyebrow="Curated Moments"
          title="Ceremonies & Celebrations"
          description="A curated gallery of MC Chelaa elevating graduations, weddings, and baby showers with elegance, joy, and memorable experiences."
        />
        <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
          {curatedGallery.map((item, index) => (
            <motion.figure
              key={`curated-${index}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="relative break-inside-avoid overflow-hidden rounded-3xl border border-border"
            >
              <LocalImage
                src={item.src}
                alt={item.alt}
                width={700}
                height={index % 2 === 0 ? 920 : 740}
                className="h-auto w-full object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/85 to-transparent px-5 py-4 text-sm font-medium text-background">
                {item.category}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section id="achievements" className="bg-muted/35 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Achievements"
            title="Recognition & Awards"
            description="Milestones that reflect excellence, consistency, and meaningful influence in Kenya&apos;s creative and media space."
          />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeInUp}
              transition={{ duration: 0.45 }}
              className="achievement-featured-card glass group relative self-start overflow-hidden rounded-3xl border border-accent/20 p-7 md:p-8"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/8 via-transparent to-highlight/10 opacity-90" aria-hidden />
              <div className="absolute -top-24 -right-14 h-56 w-56 rounded-full bg-accent/12 blur-3xl" aria-hidden />
              <div className="absolute inset-y-0 left-0 w-1.5 bg-accent" aria-hidden />
              <div className="relative flex h-full flex-col pl-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border-accent/30 bg-accent/12 text-foreground">Featured Recognition</Badge>
                  <Badge className="border-border/80 bg-background/70 text-foreground/80">
                    {featuredAchievement.year}
                  </Badge>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-background/75 text-accent shadow-lg shadow-accent/10">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                      {featuredAchievement.result}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl leading-tight text-foreground md:text-4xl">
                      {featuredAchievement.title}
                    </h3>
                    <p className="mt-3 text-base text-foreground/85 md:text-lg">
                      {featuredAchievement.organization}
                    </p>
                  </div>
                </div>

                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  {featuredAchievement.detail}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Award Body", value: featuredAchievement.organization },
                    { label: "Recognition", value: featuredAchievement.result },
                    { label: "Year", value: featuredAchievement.year },
                  ].map((meta) => (
                    <div
                      key={meta.label}
                      className="rounded-2xl border border-white/40 bg-background/62 px-4 py-3 backdrop-blur-sm dark:border-white/8"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {meta.label}
                      </p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/90">
                        {meta.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="grid gap-4"
            >
              {supportingAchievements.map((item, index) => (
                <motion.li
                  key={`${item.organization}-${item.title}`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="achievement-card glass flex items-start gap-4 rounded-2xl border border-border/70 p-5"
                >
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Star className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                        {item.result}
                      </p>
                      <Badge className="border-border/80 bg-background/65 text-xs text-foreground/80">
                        {item.year}
                      </Badge>
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-foreground md:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/80">{item.organization}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <section id="experience" className="featured-events-bg relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-24 lg:px-12">
        <div className="featured-events-glow pointer-events-none absolute inset-0" aria-hidden />
        <SectionTitle
          eyebrow="Events"
          title="Featured Events"
          description="Cinematic highlights from premium hosted events across Nairobi and Nakuru, blending elegance, stage command, and audience connection."
        />

        <EventGallery events={featuredEvents} onOpenChange={setIsGalleryOpen} />
      </section>

      <section id="media" className="bg-muted/35 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Media"
            title="On-Air & Digital Presence"
            description="Television, podcast, and digital media touchpoints that amplify her voice and artistic mission."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {mediaShows.map((show, index) => (
              <motion.div
                key={show.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeInUp}
                transition={{ duration: 0.42, delay: index * 0.05 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="relative aspect-video bg-black">
                    <video controls preload="metadata" className="h-full w-full object-cover" aria-label={show.title}>
                      <source src={show.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{show.title}</CardTitle>
                    <CardDescription className="mt-3 text-[15px]">{show.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto w-full max-w-4xl px-5 py-24 text-center md:px-10">
        <SectionTitle
          eyebrow="Testimonials"
          title="Words from Clients"
          description="What partners and event organizers say about working with MC Chelaa."
        />

        <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="glass px-8 py-10 md:px-14">
            <Quote className="mx-auto h-9 w-9 text-accent" />
            <p className="mt-7 font-serif text-2xl leading-relaxed text-foreground">“{testimonials[activeTestimonial].quote}”</p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-accent">{testimonials[activeTestimonial].author}</p>
          </Card>
        </motion.div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={cn(
                "h-2.5 w-8 rounded-full transition",
                activeTestimonial === index ? "bg-accent" : "bg-border hover:bg-muted-foreground/45"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-10">
        <div className="glass rounded-3xl px-7 py-14 text-center md:px-12">
          <Sparkles className="mx-auto h-9 w-9 text-accent" />
          <h3 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">Let&apos;s Create Something Memorable</h3>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            From corporate stages to artistic showcases, MC Chelaa curates moments that leave lasting impact.
          </p>
          <a href="#contact" className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}>Book MC Chelaa</a>
        </div>
      </section>

      <section id="contact" className="bg-linear-to-b from-muted/45 to-transparent px-6 py-24 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeInUp}
            transition={{ duration: 0.45 }}
          >
            <Badge>Contact</Badge>
            <h3 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">Bookings & Collaborations</h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Let&apos;s shape a premium event experience that speaks to your audience and brand goals.
            </p>

            <div className="mt-8 space-y-4 text-foreground/90">
              <a href="tel:+254719360781" className="flex items-center gap-3 transition hover:text-accent">
                <Phone className="h-5 w-5" /> 0719 360 781
              </a>
              <a href="mailto:mcchelaa254@gmail.com" className="flex items-center gap-3 transition hover:text-accent">
                <Mail className="h-5 w-5" /> mcchelaa254@gmail.com
              </a>
              <p className="flex items-center gap-3 text-foreground/80">
                <Users className="h-5 w-5 text-accent" /> Nakuru, Kenya
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-border bg-card p-2.5 text-foreground/80 transition hover:border-accent hover:text-accent"
              >
                <AtSign className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-border bg-card p-2.5 text-foreground/80 transition hover:border-accent hover:text-accent"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a href="mailto:mcchelaa254@gmail.com" aria-label="Email" className="rounded-full border border-border bg-card p-2.5 text-foreground/80 transition hover:border-accent hover:text-accent">
                <Megaphone className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeInUp}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <Card className="glass p-6 md:p-8">
              <form className="space-y-4" onSubmit={handleBookingSubmit}>
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  minLength={2}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  required
                />
                <Textarea
                  placeholder="Tell me about your event..."
                  name="message"
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: event.target.value,
                    }))
                  }
                  minLength={10}
                  required
                />
                <Button className="w-full" size="lg" type="submit">
                  Send Booking Request
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground md:px-10">
        © {new Date().getFullYear()} MC Chelaa · Furaha Yako ni Choice Yako
      </footer>

      <WhatsAppChatWidget phone="254719 360 781" />
    </motion.main>
  );
}
