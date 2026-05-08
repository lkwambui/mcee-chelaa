"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FeaturedEvent } from "@/lib/featured-events";

type LightboxModalProps = {
  event: FeaturedEvent | null;
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
};

export function LightboxModal({ event, isOpen, initialIndex = 0, onClose }: LightboxModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goToPrevious = (totalImages: number) => {
    setActiveIndex((current) => (current - 1 + totalImages) % totalImages);
  };

  const goToNext = (totalImages: number) => {
    setActiveIndex((current) => (current + 1) % totalImages);
  };

  const images = useMemo(() => {
    if (!event) {
      return [];
    }

    return [event.coverImage, ...event.galleryImages];
  }, [event]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const previousGalleryState = document.body.dataset.galleryOpen;
    document.body.style.overflow = "hidden";
    document.body.dataset.galleryOpen = "true";

    const onKeyDown = (event: KeyboardEvent) => {
      if (!images.length) {
        return;
      }

      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        goToNext(images.length);
      }

      if (event.key === "ArrowLeft") {
        goToPrevious(images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;

      if (previousGalleryState) {
        document.body.dataset.galleryOpen = previousGalleryState;
      } else {
        delete document.body.dataset.galleryOpen;
      }
    };
  }, [images.length, isOpen, onClose]);

  if (!isOpen || !event || !images.length) {
    return null;
  }

  const currentImage = images[activeIndex];

  const onImageDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeDistance = info.offset.x;
    const swipeVelocity = info.velocity.x;
    const thresholdDistance = 90;
    const thresholdVelocity = 500;

    if (swipeDistance <= -thresholdDistance || swipeVelocity <= -thresholdVelocity) {
      goToNext(images.length);
      return;
    }

    if (swipeDistance >= thresholdDistance || swipeVelocity >= thresholdVelocity) {
      goToPrevious(images.length);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-120 bg-black/85 px-3 py-6 backdrop-blur-md sm:px-5"
        onClick={onClose}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col" onClick={(event) => event.stopPropagation()}>
          <div className="group relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-black/40">
            <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-3 opacity-85 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 sm:inset-x-4 sm:top-4 md:opacity-75">
              <div className="max-w-[70%] rounded-2xl border border-white/15 bg-black/35 px-3 py-2 text-white backdrop-blur-sm sm:px-4 sm:py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs">{event.year}</p>
                <h3 className="mt-1 font-serif text-lg leading-tight sm:text-2xl">{event.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm hover:bg-black/65"
                  onClick={onClose}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to events
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Close gallery"
                  className="rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm hover:bg-black/65"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <motion.div
              drag="x"
              dragElastic={0.08}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onImageDragEnd}
              className="relative h-full w-full max-h-[72vh] cursor-grab active:cursor-grabbing"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goToPrevious(images.length)}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white opacity-80 transition duration-300 hover:bg-black/65 hover:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 md:opacity-65"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goToNext(images.length)}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white opacity-80 transition duration-300 hover:bg-black/65 hover:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 md:opacity-65"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition sm:h-24 sm:w-24 ${
                  activeIndex === index
                    ? "border-accent ring-2 ring-accent/45"
                    : "border-white/20 opacity-75 hover:opacity-100"
                }`}
                aria-label={`Show image ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-white/65 sm:text-sm">
            Tap Back to events, press Esc, or click outside the gallery to return.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
