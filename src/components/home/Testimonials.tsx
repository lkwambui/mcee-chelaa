import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cn } from "@/utils/cn";

export function Testimonials() {
  const { content } = useSiteContent();
  const { testimonials } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = testimonials.items[activeIndex];
  const total = testimonials.items.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  if (!active) {
    return null;
  }

  return (
    <section className="border-b border-line bg-ivory py-20 lg:py-28">
      <Container className="max-w-4xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
          {testimonials.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {testimonials.heading}
        </h2>

        <div className="relative mt-12">
          <Quote className="mx-auto h-8 w-8 text-bronze" aria-hidden />
          <div className="mt-6 min-h-[210px] sm:min-h-[180px]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={activeIndex}
                initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-display text-2xl leading-snug text-balance text-ink sm:text-3xl">
                  “{active.quote}”
                </p>
                <footer className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                    {active.author}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone">
                    {active.context}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-bronze hover:text-bronze"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.items.map((item, index) => (
              <button
                key={`${item.author}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={activeIndex === index}
                className={cn(
                  "h-2 w-2 transition-colors",
                  activeIndex === index ? "bg-bronze" : "bg-line hover:bg-stone"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-bronze hover:text-bronze"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </Container>
    </section>
  );
}
