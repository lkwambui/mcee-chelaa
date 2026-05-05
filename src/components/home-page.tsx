"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import WhatsAppChatWidget from "@/components/WhatsAppChatWidget";
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
  Video,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
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

const achievements = [
  "2nd Runners Up, Content Creator Of The Year 2025 (Valuable Brands South Rift Awards)",
  "FEMA Awards 2025 - Mcee of the Year Recognition Award",
  "2nd Runners Up, AMWIK Content Creator of the Year",
  "Nominee, Zuri Awards 2024 (Arts, Culture & Entertainment)",
  "Nominee, SHE Awards East Africa - Most Promising Founder (Under 30)",
  "Miss Laikipia University (2019–2020)",
];

const events = [
  "Breaking the Barrier Summit (Naivasha)",
  "Gen Z Loves Jesus",
  "Mziki Gospel Tour",
  "Mama Glow Day",
  "Bongo Reunion Kenya",
  "Graduation Events",
  "Wedding Celebrations",
  "Corporate Events & Conferences",
  "Book Launches & Literary Events",
  "Baby Showers & Celebrations",
  "Youth Empowerment Summits",
  "Faith-Based Conferences",
];

const mediaShows = [
  {
    title: "Kicheko Dawa (MBCI)",
    description: "Live media personality showcase and audience-focused hosting segments.",
    image: "/images/media-appearance/media-appearance2.jpeg",
    alt: "MC Chelaa featured in Kicheko Dawa on MBCI",
  },
  {
    title: "The Edge Season 3",
    description: "Feature appearance highlighting voice, culture, and creative leadership.",
    image: "/images/media-appearance/media-appearance3.jpeg",
    alt: "MC Chelaa appearing on The Edge Season 3",
  },
  {
    title: "Voices of Artists Podcast",
    description: "Conversations around artistry, growth, and youth empowerment in Kenya.",
    image: "/images/studio-session/photo11.jpeg",
    alt: "MC Chelaa on the Voices of Artists Podcast",
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [submitState, setSubmitState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState({ status: "loading", message: "Sending your booking request..." });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
        return;
      }

      setSubmitState({ status: "success", message: data.message });
      setFormData({
        name: "",
        email: "",
        message: "",
        website: "",
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Unable to submit right now. Please try again shortly.",
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 shadow-sm backdrop-blur-md">
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

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
        <Image
          src="/images/studio-session/photo10.jpeg"
          alt="MC Chelaa performing on stage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] scale-[1.05]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

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
              Precious Owoko is a media creative, poetess, and premium event host crafting cinematic stage moments for brands, communities, and unforgettable experiences.
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
            src="/images/events/event4.jpeg"
            alt="Portrait of MC Chelaa — media creative, poetess, and MC"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
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

      <section id="achievements" className="bg-muted/35 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Achievements"
            title="Recognition & Awards"
            description="Milestones that reflect excellence, consistency, and meaningful influence in Kenya&apos;s creative and media space."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="glass flex items-center gap-3 rounded-2xl p-5"
              >
                <Award className="h-5 w-5 text-accent" />
                <p className="text-[15px] text-foreground/92">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        <SectionTitle
          eyebrow="Events"
          title="Featured Experience"
          description="Major stages and audiences where MC Chelaa has delivered high-impact hosting and creative excellence."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeInUp}
              transition={{ duration: 0.38, delay: index * 0.05 }}
            >
              <Card className="h-full p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-highlight/25 text-foreground">
                  <Star className="h-4 w-4" />
                </div>
                <p className="font-medium leading-relaxed text-foreground/90">{event}</p>
              </Card>
            </motion.div>
          ))}
        </div>
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
                  <div className="relative h-52">
                    <LocalImage
                      src={show.image}
                      alt={show.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                      <div className="rounded-full bg-background/70 p-4 text-accent">
                        <Video className="h-5 w-5" />
                      </div>
                    </div>
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
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      website: event.target.value,
                    }))
                  }
                  className="hidden"
                  autoComplete="off"
                  tabIndex={-1}
                />
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
                <Button className="w-full" size="lg" type="submit" disabled={submitState.status === "loading"}>
                  {submitState.status === "loading" ? "Sending..." : "Send Booking Request"}
                </Button>
                {submitState.status !== "idle" && (
                  <p
                    className={cn(
                      "text-sm",
                      submitState.status === "success" ? "text-green-600 dark:text-green-400" : submitState.status === "error" ? "text-rose-600 dark:text-rose-300" : "text-muted-foreground"
                    )}
                  >
                    {submitState.message}
                  </p>
                )}
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
