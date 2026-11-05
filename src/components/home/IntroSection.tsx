import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { useSiteContent } from "@/hooks/useSiteContent";

export function IntroSection() {
  const { content } = useSiteContent();
  const { intro } = content;

  return (
    <section id="introduction" className="border-b border-line bg-paper py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
            <SmartImage
              src={intro.image.src}
              alt={intro.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-4 max-w-[220px] border border-line bg-paper px-4 py-3 shadow-sm sm:right-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze">
              Founder
            </p>
            <p className="mt-1 font-display text-base leading-tight text-ink">
              Walking Shadow Poetry Kenya
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
            {intro.eyebrow}
          </p>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] tracking-[-0.02em] text-balance text-ink sm:text-5xl">
            {intro.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-2xl text-base leading-relaxed text-stone">
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="mt-9 border-l-2 border-bronze pl-5">
            <p className="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
              “{intro.quote}”
            </p>
            <footer className="mt-3 text-[11px] uppercase tracking-[0.22em] text-stone">
              {intro.signature}
            </footer>
          </blockquote>

          <Link
            to="/about"
            className="group mt-9 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:text-bronze"
          >
            Read the full story
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
