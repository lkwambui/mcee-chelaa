import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { useSiteContent } from "@/hooks/useSiteContent";

export function HeroSection() {
  const { content } = useSiteContent();
  const { hero } = content;
  const reduceMotion = useReducedMotion();

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid px-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:py-24 lg:pl-12 lg:pr-16">
          <motion.div {...fade} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-bronze" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
                {hero.eyebrow}
              </p>
            </div>

            <h1 className="mt-7 font-display text-[clamp(2.9rem,7vw,5.4rem)] leading-[0.98] tracking-[-0.035em] text-ink">
              {hero.title}
              <span className="mt-2 block italic text-bronze">{hero.titleAccent}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink to={hero.primaryCta.to} size="lg">
                {hero.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink to={hero.secondaryCta.to} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>

            <ul className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[11px] uppercase tracking-[0.18em] text-stone sm:flex-row sm:gap-8">
              {hero.meta.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-bronze" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-[62vh] overflow-hidden bg-ivory lg:min-h-[calc(100svh-5rem)]"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
              })}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <SmartImage
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover object-[center_18%]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-ivory/20 bg-ink px-5 py-4 text-ivory sm:px-7">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-bronze">
                On stage
              </p>
              <p className="mt-1 font-display text-lg">{hero.image.caption}</p>
            </div>
            <a
              href="#introduction"
              aria-label="Scroll to introduction"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/30 text-ivory transition-colors hover:border-bronze hover:text-bronze"
            >
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
