import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { PortfolioItem } from "@/services/content/types";
import { cn } from "@/utils/cn";

const aspectClasses = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[16/11]",
];

type PortfolioGridProps = {
  items: PortfolioItem[];
  onSelect: (index: number) => void;
};

export function PortfolioGrid({ items, onSelect }: PortfolioGridProps) {
  return (
    <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <Reveal
          key={item.id}
          delay={Math.min(index, 6) * 0.03}
          className="mb-6 break-inside-avoid"
        >
          <button
            type="button"
            onClick={() => onSelect(index)}
            className="group block w-full text-left"
            aria-label={`Open ${item.title} in the gallery`}
          >
            <div
              className={cn(
                "relative overflow-hidden bg-ivory",
                aspectClasses[index % aspectClasses.length]
              )}
            >
              <SmartImage
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center bg-paper text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
            <div className="border-b border-line py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">
                  {item.category}
                </p>
                {item.year ? (
                  <p className="text-[9px] uppercase tracking-[0.18em] text-stone">{item.year}</p>
                ) : null}
              </div>
              <h3 className="mt-2 font-display text-xl leading-snug text-ink transition-colors group-hover:text-bronze">
                {item.title}
              </h3>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

type PortfolioLightboxProps = {
  items: PortfolioItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function PortfolioLightbox({ items, index, onClose, onNavigate }: PortfolioLightboxProps) {
  const reduceMotion = useReducedMotion();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null && Boolean(items[index]);

  useEffect(() => {
    if (!isOpen || index === null) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onNavigate(index - 1);
      } else if (event.key === "ArrowRight") {
        onNavigate(index + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, index, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${items[index].title} preview`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchStartX === null) return;
            const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
            if (Math.abs(delta) > 50) {
              onNavigate(index + (delta < 0 ? 1 : -1));
            }
            setTouchStartX(null);
          }}
        >
          <motion.div
            className="relative flex max-h-full w-full max-w-6xl flex-col"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between gap-4 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/60">
                {index + 1} / {items.length}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-10 items-center gap-2 border border-ivory/25 px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
              >
                Close
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-ink">
              <div className="relative aspect-[4/3] max-h-[72vh] w-full">
                <SmartImage
                  src={items[index].image.src}
                  alt={items[index].image.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={() => onNavigate(index - 1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ivory/30 bg-ink/80 text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-ink sm:left-4"
              >
                <span aria-hidden className="text-lg">←</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate(index + 1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ivory/30 bg-ink/80 text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-ink sm:right-4"
              >
                <span aria-hidden className="text-lg">→</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze">
                  {items[index].category}
                  {items[index].year ? ` · ${items[index].year}` : ""}
                </p>
                <h2 className="mt-1 font-display text-2xl text-ivory sm:text-3xl">
                  {items[index].title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ivory/60">
                  {items[index].description}
                </p>
              </div>
              {items[index].videoSrc ? (
                <a
                  href={items[index].videoSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-bronze transition-colors hover:text-ivory"
                >
                  Watch clip
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
